import { prisma } from "@/lib/prisma";
import { AttendanceChart } from "@/components/admin/charts/attendance-chart";
import { RsvpTimeline } from "@/components/admin/charts/rsvp-timeline";

export default async function AdminDashboardPage() {
  const [households, rsvpDates] =
    await Promise.all([
      prisma.household.findMany({
        select: {
          maxPlusOnes: true,
          guests: {
            select: {
              attending: true,
              rsvpSubmittedAt: true,
            },
          },
          plusOnes: {
            select: { id: true },
          },
        },
      }),
      prisma.guest.findMany({
        where: { rsvpSubmittedAt: { not: null } },
        select: { rsvpSubmittedAt: true },
        orderBy: { rsvpSubmittedAt: "asc" },
      }),
    ]);

  const householdCount = households.length;
  let guestCount = 0;
  let attending = 0;
  let declined = 0;
  let pending = 0;
  let theoreticalMax = 0;
  let respondedGuests = 0;

  for (const household of households) {
    guestCount += household.guests.length;
    theoreticalMax += household.guests.length + household.maxPlusOnes;

    const householdHasSubmittedRsvp = household.guests.some((guest) => Boolean(guest.rsvpSubmittedAt));

    for (const guest of household.guests) {
      if (guest.attending === "YES") {
        attending += 1;
        respondedGuests += 1;
      } else if (guest.attending === "NO") {
        declined += 1;
        respondedGuests += 1;
      } else {
        pending += 1;
      }
    }

    if (household.maxPlusOnes > 0) {
      if (!householdHasSubmittedRsvp) {
        pending += household.maxPlusOnes;
      } else {
        const acceptedPlusOnes = Math.min(household.maxPlusOnes, household.plusOnes.length);
        attending += acceptedPlusOnes;
        declined += household.maxPlusOnes - acceptedPlusOnes;
      }
    }
  }

  const responseRate = guestCount > 0
    ? Math.round((respondedGuests / guestCount) * 100)
    : 0;

  const topStats = [
    { label: "Households", value: householdCount },
    { label: "Guests", value: guestCount },
    { label: "Theoretical Max", value: theoreticalMax },
  ];

  const bottomStats = [
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
    <main className="space-y-10">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Overview</p>
        <h1
          className="mt-1 text-2xl tracking-wide text-primary"
          style={{ fontFamily: "var(--font-playfair), serif" }}
        >
          Dashboard
        </h1>
      </div>

      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        {topStats.map((stat) => (
          <div
            key={stat.label}
            className="border border-border bg-card/60 p-4"
          >
            <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              {stat.label}
            </p>
            <p
              className="mt-2 text-2xl text-primary"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {bottomStats.map((stat) => (
          <div
            key={stat.label}
            className="border border-border bg-card/60 p-4"
          >
            <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              {stat.label}
            </p>
            <p
              className="mt-2 text-2xl text-primary"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="h-px bg-border" />

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="border border-border bg-card/60 p-5">
          <p className="mb-4 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            Attendance Breakdown
          </p>
          <AttendanceChart data={attendanceData} />
        </div>

        <div className="border border-border bg-card/60 p-5">
          <p className="mb-4 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            RSVPs Over Time
          </p>
          <RsvpTimeline data={timelineData} />
        </div>
      </div>
    </main>
  );
}
