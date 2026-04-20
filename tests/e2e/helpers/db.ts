import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL must be set for e2e tests.");
}

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

type FixtureGuest = {
  id: string;
  firstName: string;
  lastName: string;
  isPrimary: boolean;
  email?: string;
  attending?: "YES" | "NO";
  dietaryRestrictions?: string;
  rsvpSubmittedAt?: Date;
  rsvpToken?: string;
};

type FixtureHousehold = {
  id: string;
  name: string;
  maxPlusOnes: number;
  preferredLocale?: "en" | "pl";
  guests: FixtureGuest[];
  plusOnes?: Array<{
    id: string;
    confirmedBy: string;
    firstName: string;
    lastName: string;
    dietaryRestrictions?: string;
  }>;
};

export const TOKENS = {
  modifyAdd: "11111111-1111-4111-8111-111111111111",
  modifyRemove: "22222222-2222-4222-8222-222222222222",
  submitted: "33333333-3333-4333-8333-333333333333",
} as const;

const fixtures: FixtureHousehold[] = [
  {
    id: "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa1",
    name: "E2E Solo No Plus",
    maxPlusOnes: 0,
    guests: [
      {
        id: "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaa101",
        firstName: "Alice",
        lastName: "Solo",
        isPrimary: true,
      },
    ],
  },
  {
    id: "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa2",
    name: "E2E Couple",
    maxPlusOnes: 0,
    guests: [
      {
        id: "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaa201",
        firstName: "Bob",
        lastName: "Pair",
        isPrimary: true,
      },
      {
        id: "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaa202",
        firstName: "Cara",
        lastName: "Pair",
        isPrimary: false,
      },
    ],
  },
  {
    id: "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa3",
    name: "E2E Solo Plus",
    maxPlusOnes: 1,
    guests: [
      {
        id: "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaa301",
        firstName: "Dan",
        lastName: "Guest",
        isPrimary: true,
      },
    ],
  },
  {
    id: "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa4",
    name: "E2E Submitted",
    maxPlusOnes: 0,
    guests: [
      {
        id: "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaa401",
        firstName: "Finn",
        lastName: "Done",
        isPrimary: true,
        email: "submitted@example.com",
        attending: "YES",
        rsvpSubmittedAt: new Date("2026-01-01T00:00:00.000Z"),
        rsvpToken: TOKENS.submitted,
      },
    ],
  },
  {
    id: "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa5",
    name: "E2E Modify Add",
    maxPlusOnes: 1,
    guests: [
      {
        id: "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaa501",
        firstName: "Mila",
        lastName: "Edit",
        isPrimary: true,
        email: "mila@example.com",
        attending: "YES",
        rsvpSubmittedAt: new Date("2026-01-01T00:00:00.000Z"),
        rsvpToken: TOKENS.modifyAdd,
      },
    ],
  },
  {
    id: "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa6",
    name: "E2E Modify Remove",
    maxPlusOnes: 1,
    guests: [
      {
        id: "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaa601",
        firstName: "Nora",
        lastName: "Edit",
        isPrimary: true,
        email: "nora@example.com",
        attending: "YES",
        rsvpSubmittedAt: new Date("2026-01-01T00:00:00.000Z"),
        rsvpToken: TOKENS.modifyRemove,
      },
    ],
    plusOnes: [
      {
        id: "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaa611",
        confirmedBy: "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaa601",
        firstName: "Old",
        lastName: "PlusOne",
      },
    ],
  },
  {
    id: "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa7",
    name: "E2E Polish",
    maxPlusOnes: 0,
    preferredLocale: "en",
    guests: [
      {
        id: "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaa701",
        firstName: "Pawel",
        lastName: "Polski",
        isPrimary: true,
      },
    ],
  },
  {
    id: "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa8",
    name: "E2E Dual Primary",
    maxPlusOnes: 0,
    guests: [
      {
        id: "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaa801",
        firstName: "Alex",
        lastName: "Johne",
        isPrimary: true,
      },
      {
        id: "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaa802",
        firstName: "Rachel",
        lastName: "Johne",
        isPrimary: true,
      },
    ],
  },
];

export async function resetAndSeedRsvpFixtures() {
  const existing = await prisma.household.findMany({
    where: { name: { startsWith: "E2E " } },
    select: { id: true, guests: { select: { id: true } } },
  });

  if (existing.length > 0) {
    const householdIds = existing.map((h) => h.id);
    const guestIds = existing.flatMap((h) => h.guests.map((g) => g.id));

    await prisma.plusOne.deleteMany({ where: { householdId: { in: householdIds } } });
    await prisma.mailingListEntry.deleteMany({ where: { guestId: { in: guestIds } } });
    await prisma.guest.deleteMany({ where: { householdId: { in: householdIds } } });
    await prisma.household.deleteMany({ where: { id: { in: householdIds } } });
  }

  for (const fixture of fixtures) {
    await prisma.household.create({
      data: {
        id: fixture.id,
        name: fixture.name,
        maxPlusOnes: fixture.maxPlusOnes,
        preferredLocale: fixture.preferredLocale,
        guests: {
          create: fixture.guests.map((guest) => ({
            id: guest.id,
            firstName: guest.firstName,
            lastName: guest.lastName,
            isPrimary: guest.isPrimary,
            email: guest.email,
            attending: guest.attending,
            dietaryRestrictions: guest.dietaryRestrictions,
            rsvpSubmittedAt: guest.rsvpSubmittedAt,
            rsvpToken: guest.rsvpToken,
          })),
        },
        plusOnes: fixture.plusOnes
          ? {
              create: fixture.plusOnes.map((plusOne) => ({
                id: plusOne.id,
                confirmedBy: plusOne.confirmedBy,
                firstName: plusOne.firstName,
                lastName: plusOne.lastName,
                dietaryRestrictions: plusOne.dietaryRestrictions,
              })),
            }
          : undefined,
      },
    });
  }
}

export async function getGuest(firstName: string, lastName: string) {
  return prisma.guest.findFirst({
    where: { firstName, lastName },
    include: {
      household: true,
    },
  });
}

export async function getPlusOnesByHouseholdName(name: string) {
  const household = await prisma.household.findFirst({
    where: { name },
    select: { id: true },
  });

  if (!household) return [];

  return prisma.plusOne.findMany({
    where: { householdId: household.id },
    orderBy: { createdAt: "asc" },
  });
}

export async function disconnectDb() {
  await prisma.$disconnect();
  await pool.end();
}
