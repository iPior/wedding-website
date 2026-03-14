import { describe, it, expect, vi, beforeEach } from "vitest";
import { randomUUID } from "crypto";

// --- Mocks (must use vi.hoisted so they're available in vi.mock factories) ---

const { mockPrisma } = vi.hoisted(() => {
  const fn = vi.fn;
  return {
    mockPrisma: {
      household: { findUnique: fn() },
      guest: { findFirst: fn(), findUnique: fn(), update: fn(), updateMany: fn() },
      plusOne: { createMany: fn(), deleteMany: fn() },
      mailingListEntry: { upsert: fn(), deleteMany: fn() },
      $transaction: fn(),
    },
  };
});

vi.mock("@/lib/prisma", () => ({ prisma: mockPrisma }));
vi.mock("@/lib/resend", () => ({
  sendEmail: vi.fn().mockResolvedValue({}),
  resend: { emails: { send: vi.fn().mockResolvedValue({}) } },
}));
vi.mock("@/emails/rsvp-confirmation", () => ({ default: vi.fn() }));
vi.mock("@/emails/rsvp-modified", () => ({ default: vi.fn() }));
vi.mock("next-intl/server", () => ({
  getLocale: vi.fn().mockResolvedValue("en"),
}));

// The "use server" directive is a no-op in test context but the module imports fine
import { submitRsvp, modifyRsvp } from "@/actions/rsvp";
import type { SubmitRsvpInput, ModifyRsvpInput } from "@/actions/rsvp";

// --- Helpers ---

function makeHousehold(overrides: Partial<{
  id: string;
  maxPlusOnes: number;
  guests: Array<{
    id: string;
    isPrimary: boolean;
    rsvpSubmittedAt: Date | null;
    firstName: string;
    lastName: string;
  }>;
}> = {}) {
  const householdId = overrides.id ?? randomUUID();
  const primaryGuestId = randomUUID();
  return {
    id: householdId,
    name: "Test Household",
    maxPlusOnes: overrides.maxPlusOnes ?? 0,
    guests: overrides.guests ?? [
      {
        id: primaryGuestId,
        householdId,
        firstName: "Jane",
        lastName: "Doe",
        isPrimary: true,
        rsvpSubmittedAt: null,
        email: null,
        attending: null,
      },
    ],
  };
}

function makeSubmitInput(householdId: string, guestIds: string[]): SubmitRsvpInput {
  return {
    householdId,
    email: "test@example.com",
    guests: guestIds.map((id) => ({
      id,
      attending: "YES" as const,
    })),
    plusOnes: [],
  };
}

// Set up the transaction mock to execute the callback
function setupTransaction() {
  mockPrisma.$transaction.mockImplementation(async (cb: (tx: typeof mockPrisma) => Promise<unknown>) => {
    return cb(mockPrisma);
  });
}

beforeEach(() => {
  vi.clearAllMocks();
  // Default: deadline not passed (wedding config says 2026-06-01)
  vi.useFakeTimers();
  vi.setSystemTime(new Date("2026-04-01T12:00:00Z"));
});

// --- Submit RSVP Tests ---

describe("submitRsvp", () => {
  it("submits successfully for a single guest attending YES", async () => {
    const household = makeHousehold();
    const guestId = household.guests[0].id;

    mockPrisma.household.findUnique.mockResolvedValue(household);
    mockPrisma.guest.findFirst.mockResolvedValue(null); // no existing submission
    mockPrisma.guest.updateMany.mockResolvedValue({ count: 1 });
    mockPrisma.mailingListEntry.upsert.mockResolvedValue({});
    setupTransaction();

    const result = await submitRsvp(makeSubmitInput(household.id, [guestId]));

    expect(result).toEqual({ success: true });
    expect(mockPrisma.$transaction).toHaveBeenCalledOnce();
    expect(mockPrisma.guest.updateMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          id: guestId,
          householdId: household.id,
          rsvpSubmittedAt: null,
        }),
      })
    );
  });

  it("submits successfully with plus-ones", async () => {
    const household = makeHousehold({ maxPlusOnes: 2 });
    const guestId = household.guests[0].id;

    mockPrisma.household.findUnique.mockResolvedValue(household);
    mockPrisma.guest.findFirst.mockResolvedValue(null);
    mockPrisma.guest.updateMany.mockResolvedValue({ count: 1 });
    mockPrisma.plusOne.createMany.mockResolvedValue({ count: 1 });
    mockPrisma.mailingListEntry.upsert.mockResolvedValue({});
    setupTransaction();

    const result = await submitRsvp({
      householdId: household.id,
      email: "test@example.com",
      guests: [{ id: guestId, attending: "YES" }],
      plusOnes: [{ firstName: "Plus", lastName: "One" }],
    });

    expect(result).toEqual({ success: true });
    expect(mockPrisma.plusOne.createMany).toHaveBeenCalledWith(
      expect.objectContaining({
        data: [expect.objectContaining({ firstName: "Plus", lastName: "One" })],
      })
    );
  });

  it("saves correctly when all guests decline", async () => {
    const guest2Id = randomUUID();
    const household = makeHousehold({
      guests: [
        { id: randomUUID(), isPrimary: true, rsvpSubmittedAt: null, firstName: "Jane", lastName: "Doe" },
        { id: guest2Id, isPrimary: false, rsvpSubmittedAt: null, firstName: "John", lastName: "Doe" },
      ],
    });

    mockPrisma.household.findUnique.mockResolvedValue(household);
    mockPrisma.guest.findFirst.mockResolvedValue(null);
    mockPrisma.guest.updateMany.mockResolvedValue({ count: 1 });
    mockPrisma.mailingListEntry.upsert.mockResolvedValue({});
    setupTransaction();

    const result = await submitRsvp({
      householdId: household.id,
      email: "test@example.com",
      guests: household.guests.map((g) => ({
        id: g.id,
        attending: "NO" as const,
      })),
      plusOnes: [],
    });

    expect(result).toEqual({ success: true });
    // Verify dietary restrictions are null when declining
    for (const call of mockPrisma.guest.updateMany.mock.calls) {
      expect(call[0].data.dietaryRestrictions).toBeNull();
    }
  });

  it("blocks duplicate submission (already submitted)", async () => {
    const household = makeHousehold();
    const guestId = household.guests[0].id;

    mockPrisma.household.findUnique.mockResolvedValue(household);
    // Inside transaction: existing submission found
    mockPrisma.guest.findFirst.mockResolvedValue({ id: guestId, rsvpSubmittedAt: new Date() });
    setupTransaction();

    const result = await submitRsvp(makeSubmitInput(household.id, [guestId]));

    expect(result.success).toBe(false);
    expect(result.alreadySubmitted).toBe(true);
    expect(result.error).toContain("already submitted");
  });

  it("blocks submission after deadline", async () => {
    vi.setSystemTime(new Date("2026-07-01T12:00:00Z")); // After June 1 deadline

    const household = makeHousehold();
    const result = await submitRsvp(makeSubmitInput(household.id, [household.guests[0].id]));

    expect(result.success).toBe(false);
    expect(result.error).toContain("deadline has passed");
  });

  it("rejects guest IDs that don't belong to the household", async () => {
    const household = makeHousehold();
    const foreignGuestId = randomUUID();

    mockPrisma.household.findUnique.mockResolvedValue(household);

    const result = await submitRsvp(makeSubmitInput(household.id, [foreignGuestId]));

    expect(result.success).toBe(false);
    expect(result.error).toContain("does not belong to this household");
  });

  it("rejects too many plus-ones", async () => {
    const household = makeHousehold({ maxPlusOnes: 1 });
    const guestId = household.guests[0].id;

    mockPrisma.household.findUnique.mockResolvedValue(household);

    const result = await submitRsvp({
      householdId: household.id,
      email: "test@example.com",
      guests: [{ id: guestId, attending: "YES" }],
      plusOnes: [
        { firstName: "Plus", lastName: "One" },
        { firstName: "Plus", lastName: "Two" },
      ],
    });

    expect(result.success).toBe(false);
    expect(result.error).toContain("plus-one");
  });

  it("returns error for household not found", async () => {
    mockPrisma.household.findUnique.mockResolvedValue(null);

    const result = await submitRsvp(makeSubmitInput(randomUUID(), [randomUUID()]));

    expect(result.success).toBe(false);
    expect(result.error).toContain("Household not found");
  });

  it("handles race condition (updateMany returns count 0)", async () => {
    const household = makeHousehold();
    const guestId = household.guests[0].id;

    mockPrisma.household.findUnique.mockResolvedValue(household);
    mockPrisma.guest.findFirst.mockResolvedValue(null);
    // Simulate race: updateMany finds no rows (another request already wrote)
    mockPrisma.guest.updateMany.mockResolvedValue({ count: 0 });

    mockPrisma.$transaction.mockImplementation(async (cb: (tx: typeof mockPrisma) => Promise<unknown>) => {
      // The callback should throw RSVP_RACE_CONDITION
      return cb(mockPrisma);
    });

    const result = await submitRsvp(makeSubmitInput(household.id, [guestId]));

    expect(result.success).toBe(false);
    expect(result.alreadySubmitted).toBe(true);
  });

  it("rejects invalid email", async () => {
    const household = makeHousehold();
    const result = await submitRsvp({
      householdId: household.id,
      email: "not-an-email",
      guests: [{ id: household.guests[0].id, attending: "YES" }],
      plusOnes: [],
    });

    expect(result.success).toBe(false);
    expect(result.error).toContain("Invalid form data");
  });

  it("rejects empty guest list", async () => {
    const result = await submitRsvp({
      householdId: randomUUID(),
      email: "test@example.com",
      guests: [],
      plusOnes: [],
    });

    expect(result.success).toBe(false);
    expect(result.error).toContain("Invalid form data");
  });

  it("rejects oversized dietary restrictions", async () => {
    const household = makeHousehold();
    const result = await submitRsvp({
      householdId: household.id,
      email: "test@example.com",
      guests: [{ id: household.guests[0].id, attending: "YES", dietaryRestrictions: "a".repeat(501) }],
      plusOnes: [],
    });

    expect(result.success).toBe(false);
    expect(result.error).toContain("Invalid form data");
  });

  it("rejects oversized plus-one names", async () => {
    const household = makeHousehold({ maxPlusOnes: 1 });
    const result = await submitRsvp({
      householdId: household.id,
      email: "test@example.com",
      guests: [{ id: household.guests[0].id, attending: "YES" }],
      plusOnes: [{ firstName: "a".repeat(101), lastName: "Doe" }],
    });

    expect(result.success).toBe(false);
    expect(result.error).toContain("Invalid form data");
  });
});

// --- Modify RSVP Tests ---

describe("modifyRsvp", () => {
  const token = "valid-token-123";

  it("modifies successfully and rotates token", async () => {
    const household = makeHousehold();
    const guestId = household.guests[0].id;

    mockPrisma.guest.findUnique.mockResolvedValue({ householdId: household.id });
    mockPrisma.household.findUnique.mockResolvedValue(household);
    mockPrisma.guest.update.mockResolvedValue({});
    mockPrisma.plusOne.deleteMany.mockResolvedValue({});
    mockPrisma.mailingListEntry.deleteMany.mockResolvedValue({});
    mockPrisma.mailingListEntry.upsert.mockResolvedValue({});
    setupTransaction();

    const result = await modifyRsvp({
      token,
      householdId: household.id,
      email: "new@example.com",
      guests: [{ id: guestId, attending: "YES" }],
      plusOnes: [],
    });

    expect(result).toEqual({ success: true });
    // Verify token rotation: update call includes a new rsvpToken
    const updateCall = mockPrisma.guest.update.mock.calls[0][0];
    expect(updateCall.data.rsvpToken).toBeDefined();
    expect(updateCall.data.rsvpToken).not.toBe(token);
  });

  it("rejects guest IDs from wrong household", async () => {
    const household = makeHousehold();
    const foreignGuestId = randomUUID();

    mockPrisma.guest.findUnique.mockResolvedValue({ householdId: household.id });
    mockPrisma.household.findUnique.mockResolvedValue(household);

    const result = await modifyRsvp({
      token,
      householdId: household.id,
      email: "test@example.com",
      guests: [{ id: foreignGuestId, attending: "YES" }],
      plusOnes: [],
    });

    expect(result.success).toBe(false);
    expect(result.error).toContain("does not belong to this household");
  });

  it("rejects invalid token", async () => {
    mockPrisma.guest.findUnique.mockResolvedValue(null); // token not found

    const result = await modifyRsvp({
      token: "bad-token",
      householdId: randomUUID(),
      email: "test@example.com",
      guests: [{ id: randomUUID(), attending: "YES" }],
      plusOnes: [],
    });

    expect(result.success).toBe(false);
    expect(result.error).toContain("Invalid modification link");
  });

  it("rejects token for wrong household", async () => {
    const householdA = randomUUID();
    const householdB = randomUUID();

    mockPrisma.guest.findUnique.mockResolvedValue({ householdId: householdA });

    const result = await modifyRsvp({
      token,
      householdId: householdB,
      email: "test@example.com",
      guests: [{ id: randomUUID(), attending: "YES" }],
      plusOnes: [],
    });

    expect(result.success).toBe(false);
    expect(result.error).toContain("Invalid modification link");
  });

  it("cleans up stale mailing list entries on email change", async () => {
    const household = makeHousehold();
    const guestId = household.guests[0].id;

    mockPrisma.guest.findUnique.mockResolvedValue({ householdId: household.id });
    mockPrisma.household.findUnique.mockResolvedValue(household);
    mockPrisma.guest.update.mockResolvedValue({});
    mockPrisma.plusOne.deleteMany.mockResolvedValue({});
    mockPrisma.mailingListEntry.deleteMany.mockResolvedValue({});
    mockPrisma.mailingListEntry.upsert.mockResolvedValue({});
    setupTransaction();

    await modifyRsvp({
      token,
      householdId: household.id,
      email: "new-email@example.com",
      guests: [{ id: guestId, attending: "YES" }],
      plusOnes: [],
    });

    // Verify stale entries are deleted before upsert
    expect(mockPrisma.mailingListEntry.deleteMany).toHaveBeenCalledWith({
      where: {
        guestId: guestId,
        email: { not: "new-email@example.com" },
      },
    });
  });

  it("blocks modification after deadline", async () => {
    vi.setSystemTime(new Date("2026-07-01T12:00:00Z"));

    const result = await modifyRsvp({
      token,
      householdId: randomUUID(),
      email: "test@example.com",
      guests: [{ id: randomUUID(), attending: "YES" }],
      plusOnes: [],
    });

    expect(result.success).toBe(false);
    expect(result.error).toContain("deadline has passed");
  });

  it("rejects too many plus-ones", async () => {
    const household = makeHousehold({ maxPlusOnes: 0 });

    mockPrisma.guest.findUnique.mockResolvedValue({ householdId: household.id });
    mockPrisma.household.findUnique.mockResolvedValue(household);

    const result = await modifyRsvp({
      token,
      householdId: household.id,
      email: "test@example.com",
      guests: [{ id: household.guests[0].id, attending: "YES" }],
      plusOnes: [{ firstName: "Not", lastName: "Allowed" }],
    });

    expect(result.success).toBe(false);
    expect(result.error).toContain("plus-one");
  });
});
