import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const household = await prisma.household.create({
    data: {
      name: "The Johnson Family",
      maxPlusOnes: 1,
      guests: {
        create: [
          {
            firstName: "Marcus",
            lastName: "Johnson",
            isPrimary: true,
          },
          {
            firstName: "Lisa",
            lastName: "Johnson",
            isPrimary: false,
          },
        ],
      },
    },
  });

  console.log(`Seeded household ${household.name}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
