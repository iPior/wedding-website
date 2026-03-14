"use server";

import { randomUUID } from "crypto";
import Fuse from "fuse.js";
import { z } from "zod";
import * as Sentry from "@sentry/nextjs";
import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/resend";
import { logger } from "@/lib/logger";
import { normalizeLocale, withLocalePath } from "@/lib/locale";
import { getEmailMessages } from "@/emails/i18n";
import { weddingConfig } from "../../wedding.config";
import RsvpConfirmationEmail from "@/emails/rsvp-confirmation";
import RsvpModifiedEmail from "@/emails/rsvp-modified";

// --- Types ---

export type SearchResult = {
  guests: Array<{
    id: string;
    firstName: string;
    lastName: string;
    isPrimary: boolean;
    householdId: string;
    primaryGuestName: string | null;
  }>;
};

export type HouseholdData = {
  householdId: string;
  householdName: string;
  maxPlusOnes: number;
  guests: Array<{
    id: string;
    firstName: string;
    lastName: string;
    isPrimary: boolean;
    attending: string | null;
    dietaryRestrictions: string | null;
    email: string | null;
  }>;
  existingPlusOnes: Array<{
    id: string;
    firstName: string;
    lastName: string;
    dietaryRestrictions: string | null;
  }>;
};

export type RsvpResult = {
  success: boolean;
  error?: string;
  alreadySubmitted?: boolean;
};

// --- Search ---

export async function searchGuests(firstName: string, lastName: string): Promise<SearchResult> {
  const allGuests = await prisma.guest.findMany({
    select: {
      id: true,
      firstName: true,
      lastName: true,
      isPrimary: true,
      householdId: true,
      household: {
        select: {
          guests: {
            where: { isPrimary: true },
            select: { firstName: true, lastName: true },
          },
        },
      },
    },
  });

  const guestsWithFullName = allGuests.map((g) => ({
    ...g,
    fullName: `${g.firstName} ${g.lastName}`,
  }));

  const fuse = new Fuse(guestsWithFullName, {
    keys: ["firstName", "lastName", "fullName"],
    threshold: 0.4,
    includeScore: true,
  });

  const query = `${firstName} ${lastName}`.trim();
  const results = fuse.search(query, { limit: 5 });

  return {
    guests: results.map((r) => {
      const g = r.item;
      const primary = g.household.guests[0];
      return {
        id: g.id,
        firstName: g.firstName,
        lastName: g.lastName,
        isPrimary: g.isPrimary,
        householdId: g.householdId,
        primaryGuestName: g.isPrimary
          ? null
          : primary
            ? `${primary.firstName} ${primary.lastName}`
            : null,
      };
    }),
  };
}

// --- Load Household ---

export async function getHouseholdForRsvp(householdId: string): Promise<HouseholdData | null> {
  const household = await prisma.household.findUnique({
    where: { id: householdId },
    include: {
      guests: {
        orderBy: { isPrimary: "desc" },
      },
      plusOnes: true,
    },
  });

  if (!household) return null;

  return {
    householdId: household.id,
    householdName: household.name,
    maxPlusOnes: household.maxPlusOnes,
    guests: household.guests.map((g) => ({
      id: g.id,
      firstName: g.firstName,
      lastName: g.lastName,
      isPrimary: g.isPrimary,
      attending: g.attending,
      dietaryRestrictions: g.dietaryRestrictions,
      email: g.email,
    })),
    existingPlusOnes: household.plusOnes.map((p) => ({
      id: p.id,
      firstName: p.firstName,
      lastName: p.lastName,
      dietaryRestrictions: p.dietaryRestrictions,
    })),
  };
}

// --- Submit RSVP ---

const guestRsvpSchema = z.object({
  id: z.string().uuid(),
  attending: z.enum(["YES", "NO"]),
  dietaryRestrictions: z.string().max(500).optional(),
});

const plusOneSchema = z.object({
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  dietaryRestrictions: z.string().max(500).optional(),
});

const submitRsvpSchema = z.object({
  householdId: z.string().uuid(),
  email: z.string().email(),
  preferredLocale: z.string().optional(),
  guests: z.array(guestRsvpSchema).min(1),
  plusOnes: z.array(plusOneSchema).default([]),
});

export type SubmitRsvpInput = z.infer<typeof submitRsvpSchema>;

function isDeadlinePassed(): boolean {
  return new Date() > new Date(weddingConfig.rsvpDeadline);
}

export async function submitRsvp(input: SubmitRsvpInput): Promise<RsvpResult> {
  const requestId = randomUUID();
  const parsed = submitRsvpSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: "Invalid form data" };
  }

  if (isDeadlinePassed()) {
    return { success: false, error: "The RSVP deadline has passed. Please contact the couple directly." };
  }

  const { householdId, email, guests, plusOnes } = parsed.data;
  const preferredLocale = parsed.data.preferredLocale
    ? normalizeLocale(parsed.data.preferredLocale)
    : null;

  // Verify household exists and guests belong to it
  const household = await prisma.household.findUnique({
    where: { id: householdId },
    include: { guests: true },
  });

  if (!household) {
    return { success: false, error: "Household not found" };
  }

  const householdGuestIds = new Set(household.guests.map((g) => g.id));
  for (const g of guests) {
    if (!householdGuestIds.has(g.id)) {
      return { success: false, error: "Guest does not belong to this household" };
    }
  }

  if (plusOnes.length > household.maxPlusOnes) {
    return { success: false, error: `Maximum ${household.maxPlusOnes} plus-one(s) allowed` };
  }

  const rsvpToken = randomUUID();
  const primaryGuest = household.guests.find((g) => g.isPrimary);
  const now = new Date();

  let txResult: { alreadySubmitted: boolean };
  try {
  txResult = await prisma.$transaction(async (tx) => {
    // Check for existing submission inside the transaction to prevent race conditions
    const existingSubmission = await tx.guest.findFirst({
      where: { householdId, rsvpSubmittedAt: { not: null } },
    });

    if (existingSubmission) {
      return { alreadySubmitted: true } as const;
    }

    // Update guests with optimistic concurrency guard: only update where rsvpSubmittedAt is null
    for (const guestInput of guests) {
      const result = await tx.guest.updateMany({
        where: { id: guestInput.id, householdId, rsvpSubmittedAt: null },
        data: {
          attending: guestInput.attending,
          dietaryRestrictions: guestInput.attending === "YES" ? (guestInput.dietaryRestrictions ?? null) : null,
          rsvpSubmittedAt: now,
          ...(primaryGuest && guestInput.id === primaryGuest.id
            ? { email, rsvpToken }
            : {}),
        },
      });

      if (result.count === 0) {
        throw new Error("RSVP_RACE_CONDITION");
      }
    }

    // Create plus-ones
    if (plusOnes.length > 0 && primaryGuest) {
      await tx.plusOne.createMany({
        data: plusOnes.map((p) => ({
          householdId,
          confirmedBy: primaryGuest.id,
          firstName: p.firstName,
          lastName: p.lastName,
          dietaryRestrictions: p.dietaryRestrictions ?? null,
        })),
      });
    }

    // Add to mailing list
    if (primaryGuest) {
      await tx.mailingListEntry.upsert({
        where: {
          guestId_email: { guestId: primaryGuest.id, email },
        },
        create: { guestId: primaryGuest.id, email },
        update: {},
      });
    }

    if (preferredLocale) {
      await tx.household.update({
        where: { id: householdId },
        data: { preferredLocale },
      });
    }

    return { alreadySubmitted: false } as const;
  });
  } catch (error) {
    if (error instanceof Error && error.message === "RSVP_RACE_CONDITION") {
      return {
        success: false,
        error: "This household has already submitted an RSVP. Check your email for a link to modify it.",
        alreadySubmitted: true,
      };
    }

    logger.error("rsvp.submit.transaction_failed", { requestId, householdId }, error);
    Sentry.captureException(error, {
      tags: { action: "submitRsvp" },
      extra: { requestId, householdId },
    });

    throw error;
  }

  if (txResult.alreadySubmitted) {
    return {
      success: false,
      error: "This household has already submitted an RSVP. Check your email for a link to modify it.",
      alreadySubmitted: true,
    };
  }

  // Send confirmation email
  const locale = normalizeLocale(preferredLocale ?? household.preferredLocale ?? null);
  const modifyPath = withLocalePath(locale, `/rsvp/modify/${rsvpToken}`);
  const modifyUrl = `${process.env.NEXT_PUBLIC_SITE_URL}${modifyPath}`;
  const emailMessages = getEmailMessages(locale).rsvpConfirmation;
  const attendingGuests = guests.filter((g) => g.attending === "YES");
  const guestDetails = guests.map((g) => {
    const fullGuest = household.guests.find((hg) => hg.id === g.id);
    return {
      name: fullGuest ? `${fullGuest.firstName} ${fullGuest.lastName}` : "Guest",
      attending: g.attending === "YES",
    };
  });

  try {
    await sendEmail({
      from: process.env.EMAIL_FROM!,
      to: email,
      subject: emailMessages.subject,
      react: RsvpConfirmationEmail({
        householdName: household.name,
        guests: guestDetails,
        plusOnes: plusOnes.map((p) => ({
          name: `${p.firstName} ${p.lastName}`,
        })),
        modifyUrl,
        attendingCount: attendingGuests.length + plusOnes.length,
        locale,
      }),
    });
  } catch (error) {
    // Don't fail the RSVP if email fails — the data is saved
    logger.error("rsvp.submit.confirmation_email_failed", { requestId, householdId }, error);
    Sentry.captureException(error, {
      tags: { action: "submitRsvp", integration: "resend" },
      extra: { requestId, householdId },
    });
  }

  return { success: true };
}

// --- Modify RSVP ---

export async function getHouseholdByToken(token: string): Promise<{
  household: HouseholdData;
  deadlinePassed: boolean;
} | null> {
  const guest = await prisma.guest.findUnique({
    where: { rsvpToken: token },
    select: { householdId: true },
  });

  if (!guest) return null;

  const household = await getHouseholdForRsvp(guest.householdId);
  if (!household) return null;

  return {
    household,
    deadlinePassed: isDeadlinePassed(),
  };
}

const modifyRsvpSchema = submitRsvpSchema.extend({
  token: z.string(),
});

export type ModifyRsvpInput = z.infer<typeof modifyRsvpSchema>;

export async function modifyRsvp(input: ModifyRsvpInput): Promise<RsvpResult> {
  const requestId = randomUUID();
  const parsed = modifyRsvpSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: "Invalid form data" };
  }

  if (isDeadlinePassed()) {
    return { success: false, error: "The RSVP deadline has passed. Please contact the couple directly." };
  }

  const { token, householdId, email, guests, plusOnes } = parsed.data;
  const preferredLocale = parsed.data.preferredLocale
    ? normalizeLocale(parsed.data.preferredLocale)
    : null;

  // Verify token
  const tokenGuest = await prisma.guest.findUnique({
    where: { rsvpToken: token },
    select: { householdId: true },
  });

  if (!tokenGuest || tokenGuest.householdId !== householdId) {
    return { success: false, error: "Invalid modification link" };
  }

  const household = await prisma.household.findUnique({
    where: { id: householdId },
    include: { guests: true },
  });

  if (!household) {
    return { success: false, error: "Household not found" };
  }

  const householdGuestIds = new Set(household.guests.map((g) => g.id));
  for (const g of guests) {
    if (!householdGuestIds.has(g.id)) {
      return { success: false, error: "Guest does not belong to this household" };
    }
  }

  if (plusOnes.length > household.maxPlusOnes) {
    return { success: false, error: `Maximum ${household.maxPlusOnes} plus-one(s) allowed` };
  }

  const newToken = randomUUID();
  const primaryGuest = household.guests.find((g) => g.isPrimary);
  const now = new Date();

  try {
    await prisma.$transaction(async (tx) => {
      for (const guestInput of guests) {
        await tx.guest.update({
          where: { id: guestInput.id },
          data: {
            attending: guestInput.attending,
            dietaryRestrictions: guestInput.attending === "YES" ? (guestInput.dietaryRestrictions ?? null) : null,
            rsvpSubmittedAt: now,
            ...(primaryGuest && guestInput.id === primaryGuest.id
              ? { email, rsvpToken: newToken }
              : {}),
          },
        });
      }

      // Delete old plus-ones and re-create
      await tx.plusOne.deleteMany({ where: { householdId } });

      if (plusOnes.length > 0 && primaryGuest) {
        await tx.plusOne.createMany({
          data: plusOnes.map((p) => ({
            householdId,
            confirmedBy: primaryGuest.id,
            firstName: p.firstName,
            lastName: p.lastName,
            dietaryRestrictions: p.dietaryRestrictions ?? null,
          })),
        });
      }

      // Update mailing list email — remove stale entries with different emails first
      if (primaryGuest) {
        await tx.mailingListEntry.deleteMany({
          where: {
            guestId: primaryGuest.id,
            email: { not: email },
          },
        });

        await tx.mailingListEntry.upsert({
          where: {
            guestId_email: { guestId: primaryGuest.id, email },
          },
          create: { guestId: primaryGuest.id, email },
          update: {},
        });
      }

      if (preferredLocale) {
        await tx.household.update({
          where: { id: householdId },
          data: { preferredLocale },
        });
      }
    });
  } catch (error) {
    logger.error("rsvp.modify.transaction_failed", { requestId, householdId }, error);
    Sentry.captureException(error, {
      tags: { action: "modifyRsvp" },
      extra: { requestId, householdId },
    });
    throw error;
  }

  // Send modified email
  const locale = normalizeLocale(preferredLocale ?? household.preferredLocale ?? null);
  const modifyPath = withLocalePath(locale, `/rsvp/modify/${newToken}`);
  const modifyUrl = `${process.env.NEXT_PUBLIC_SITE_URL}${modifyPath}`;
  const emailMessages = getEmailMessages(locale).rsvpModified;
  const guestDetails = guests.map((g) => {
    const fullGuest = household.guests.find((hg) => hg.id === g.id);
    return {
      name: fullGuest ? `${fullGuest.firstName} ${fullGuest.lastName}` : "Guest",
      attending: g.attending === "YES",
    };
  });

  try {
    await sendEmail({
      from: process.env.EMAIL_FROM!,
      to: email,
      subject: emailMessages.subject,
      react: RsvpModifiedEmail({
        householdName: household.name,
        guests: guestDetails,
        plusOnes: plusOnes.map((p) => ({
          name: `${p.firstName} ${p.lastName}`,
        })),
        modifyUrl,
        locale,
      }),
    });
  } catch (error) {
    logger.error("rsvp.modify.email_failed", { requestId, householdId }, error);
    Sentry.captureException(error, {
      tags: { action: "modifyRsvp", integration: "resend" },
      extra: { requestId, householdId },
    });
  }

  return { success: true };
}
