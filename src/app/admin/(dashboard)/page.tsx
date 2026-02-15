import { prisma } from "@/lib/prisma";
import { Separator } from "@/components/ui/separator";
import { AttendanceChart } from "@/components/admin/charts/attendance-chart";
import { RsvpTimeline } from "@/components/admin/charts/rsvp-timeline";

export default async function AdminDashboardPage() {
  const [householdCount, guestCount, rsvpCounts, rsvpDates] =
    await Promise.all([
      prisma.household.count(),
      prisma.guest.count(),
      prisma.guest.groupBy({
        by: ["attending"],
        _count: true,
      }),
      prisma.guest.findMany({
        where: { rsvpSubmittedAt: { not: null } },
        select: { rsvpSubmittedAt: true },
        orderBy: { rsvpSubmittedAt: "asc" },
      }),
    ]);

  const attending = rsvpCounts.find((r) => r.attending === "YES")?._count ?? 0;
  const declined = rsvpCounts.find((r) => r.attending === "NO")?._count ?? 0;
  const pending = rsvpCounts.find((r) => r.attending === "PENDING")?._count ?? 0;
  const responded = attending + declined;
  const responseRate = guestCount > 0 ? Math.round((responded / guestCount) * 100) : 0;

  const stats = [
    { label: "Households", value: householdCount },
    { label: "Total Guests", value: guestCount },
    { label: "Attending", value: attending },
    { label: "Declined", value: declined },
    { label: "Pending", value: pending },
    { label: "Response Rate", value: `${responseRate}%` },
  ];

  const attendanceData = [
    { name: "YES", value: attending },
    { name: "NO", value: declined },
    { name: "PENDING", value: pending },
  ];

  // Build cumulative RSVP timeline by date
  const timelineMap = new Map<string, number>();
  for (const r of rsvpDates) {
    if (r.rsvpSubmittedAt) {
      const date = r.rsvpSubmittedAt.toISOString().slice(0, 10);
      timelineMap.set(date, (timelineMap.get(date) ?? 0) + 1);
    }
  }
  const timelineData: { date: string; count: number }[] = [];
  const sorted = Array.from(timelineMap.entries()).sort(([a], [b]) =>
    a.localeCompare(b)
  );
  for (const [date, count] of sorted) {
    const prev = timelineData.length > 0 ? timelineData[timelineData.length - 1].count : 0;
    timelineData.push({ date, count: prev + count });
  }

  return (
    <main className="space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
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

      <Separator />

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-lg border p-4">
          <h2 className="mb-4 text-sm font-medium">Attendance Breakdown</h2>
          <AttendanceChart data={attendanceData} />
        </div>

        <div className="rounded-lg border p-4">
          <h2 className="mb-4 text-sm font-medium">RSVPs Over Time</h2>
          <RsvpTimeline data={timelineData} />
        </div>
      </div>
    </main>
  );
}
