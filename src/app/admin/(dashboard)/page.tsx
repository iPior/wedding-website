import { prisma } from "@/lib/prisma";

export default async function AdminDashboardPage() {
  const [householdCount, guestCount, rsvpCounts] = await Promise.all([
    prisma.household.count(),
    prisma.guest.count(),
    prisma.guest.groupBy({
      by: ["attending"],
      _count: true,
    }),
  ]);

  const attending = rsvpCounts.find((r) => r.attending === "YES")?._count ?? 0;
  const declined = rsvpCounts.find((r) => r.attending === "NO")?._count ?? 0;
  const pending = rsvpCounts.find((r) => r.attending === "PENDING")?._count ?? 0;

  const stats = [
    { label: "Households", value: householdCount },
    { label: "Total Guests", value: guestCount },
    { label: "Attending", value: attending },
    { label: "Declined", value: declined },
    { label: "Pending", value: pending },
  ];

  return (
    <main className="space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-lg border bg-card p-4 text-card-foreground"
          >
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <p className="mt-1 text-2xl font-semibold">{stat.value}</p>
          </div>
        ))}
      </div>

      <p className="text-sm text-muted-foreground">
        Charts and detailed analytics will be added in Phase 5.
      </p>
    </main>
  );
}
