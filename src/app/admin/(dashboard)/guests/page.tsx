import { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import type { AttendanceStatus, Prisma } from "@prisma/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CsvUpload } from "@/components/admin/csv-upload";
import { AddGuestForm } from "@/components/admin/add-guest-form";
import { EditGuestButton, EditHouseholdButton } from "@/components/admin/edit-guest-modal";
import { GuestFilters } from "@/components/admin/guest-filters";
import { CsvExportButton } from "@/components/admin/csv-export-button";

type Props = {
  searchParams: Promise<{ search?: string; status?: string; sort?: string; dietary?: string }>;
};

export default async function AdminGuestsPage({ searchParams }: Props) {
  const { search, status, sort, dietary } = await searchParams;

  const whereConditions: Prisma.GuestWhereInput[] = [];
  const validStatuses: AttendanceStatus[] = ["YES", "NO", "PENDING"];
  const selectedStatus = status && validStatuses.includes(status as AttendanceStatus)
    ? (status as AttendanceStatus)
    : null;
  const selectedDietary = dietary === "with" || dietary === "without" ? dietary : null;

  if (selectedStatus) {
    whereConditions.push({ attending: selectedStatus });
  }

  if (search) {
    whereConditions.push({
      OR: [
        { firstName: { contains: search, mode: "insensitive" } },
        { lastName: { contains: search, mode: "insensitive" } },
      ],
    });
  }

  if (selectedDietary === "with") {
    whereConditions.push({ dietaryRestrictions: { not: null } });
    whereConditions.push({ dietaryRestrictions: { not: "" } });
  }

  if (selectedDietary === "without") {
    whereConditions.push({
      OR: [{ dietaryRestrictions: null }, { dietaryRestrictions: "" }],
    });
  }

  const where: Prisma.GuestWhereInput = whereConditions.length > 0
    ? { AND: whereConditions }
    : {};

  const validSorts = ["default", "name_asc", "name_desc", "rsvp_date_asc", "rsvp_date_desc"] as const;
  const selectedSort = validSorts.includes(sort as (typeof validSorts)[number]) ? sort : "default";

  let orderBy: Prisma.GuestOrderByWithRelationInput[] = [
    { firstName: "asc" },
    { lastName: "asc" },
    { id: "asc" },
  ];

  if (selectedSort === "name_desc") {
    orderBy = [{ firstName: "desc" }, { lastName: "desc" }, { id: "asc" }];
  }

  if (selectedSort === "rsvp_date_asc") {
    orderBy = [
      { rsvpSubmittedAt: { sort: "asc", nulls: "last" } },
      { firstName: "asc" },
      { lastName: "asc" },
      { id: "asc" },
    ];
  }

  if (selectedSort === "rsvp_date_desc") {
    orderBy = [
      { rsvpSubmittedAt: { sort: "desc", nulls: "last" } },
      { firstName: "asc" },
      { lastName: "asc" },
      { id: "asc" },
    ];
  }

  const guests = await prisma.guest.findMany({
    where,
    include: {
      household: {
        include: {
          plusOnes: {
            orderBy: [{ firstName: "asc" }, { lastName: "asc" }],
          },
        },
      },
    },
    orderBy,
  });

  const totalGuests = guests.length;
  const totalHouseholds = new Set(guests.map((guest) => guest.householdId)).size;
  const hasActiveFilters = Boolean(search || status || dietary);
  const plusOneDisplayRowByHousehold = new Map<string, string>();

  for (const guest of guests) {
    if (!plusOneDisplayRowByHousehold.has(guest.householdId)) {
      plusOneDisplayRowByHousehold.set(guest.householdId, guest.id);
    }

    if (guest.isPrimary) {
      plusOneDisplayRowByHousehold.set(guest.householdId, guest.id);
    }
  }

  return (
    <main className="space-y-10">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Manage</p>
          <h1
            className="mt-1 text-2xl tracking-wide text-primary"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            Guests
          </h1>
          <p className="mt-1 text-xs uppercase tracking-[0.15em] text-muted-foreground/70">
            {totalHouseholds} households | {totalGuests} guests
            {hasActiveFilters && " | filtered"}
          </p>
        </div>
        <CsvExportButton />
      </div>

      {/* CSV Import */}
      <div className="space-y-2">
        <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Import from CSV</p>
        <p className="text-[10px] tracking-wide text-muted-foreground/60">
          Expected columns: household_name, first_name, last_name, is_primary, max_plus_ones
        </p>
        <CsvUpload />
      </div>

      <div className="h-px bg-border" />

      <AddGuestForm />

      <Suspense fallback={null}>
        <GuestFilters />
      </Suspense>

      {guests.length > 0 && (
        <div className="border border-border bg-card/60">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-border hover:bg-transparent">
                <TableHead className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-normal">Household</TableHead>
                <TableHead className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-normal">Name</TableHead>
                <TableHead className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-normal">Email</TableHead>
                <TableHead className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-normal">Primary</TableHead>
                <TableHead className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-normal">RSVP</TableHead>
                <TableHead className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-normal">RSVP Date</TableHead>
                <TableHead className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-normal">Dietary</TableHead>
                <TableHead className="w-[80px]" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {guests.flatMap((guest) => {
                const showHouseholdPlusOnes = plusOneDisplayRowByHousehold.get(guest.householdId) === guest.id;
                const householdPlusOnes = showHouseholdPlusOnes
                  ? guest.household.plusOnes.filter((plusOne) => {
                    if (selectedStatus && selectedStatus !== "YES") {
                      return false;
                    }

                    if (selectedDietary === "with") {
                      return Boolean(plusOne.dietaryRestrictions?.trim());
                    }

                    if (selectedDietary === "without") {
                      return !plusOne.dietaryRestrictions?.trim();
                    }

                    return true;
                  })
                  : [];
                const rsvpDateText = guest.rsvpSubmittedAt ? guest.rsvpSubmittedAt.toLocaleDateString() : "-";

                const guestRow = (
                  <TableRow key={guest.id} className="border-b border-border hover:bg-background">
                    <TableCell className="text-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-primary">{guest.household.name}</span>
                        <span className="text-xs text-muted-foreground/60">(+{guest.household.maxPlusOnes})</span>
                        <EditHouseholdButton household={guest.household} />
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-primary">
                      {guest.firstName} {guest.lastName}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {guest.email ?? "-"}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {guest.isPrimary ? "Yes" : "-"}
                    </TableCell>
                    <TableCell>
                      <span
                        className="text-xs uppercase tracking-[0.15em]"
                        style={{
                          color:
                            guest.attending === "YES"
                              ? "var(--color-primary)"
                              : guest.attending === "NO"
                                ? "var(--color-accent)"
                                : "var(--color-muted-foreground)",
                        }}
                      >
                        {guest.attending ?? "PENDING"}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {guest.rsvpSubmittedAt ? guest.rsvpSubmittedAt.toLocaleDateString() : "-"}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {guest.dietaryRestrictions ?? "-"}
                    </TableCell>
                    <TableCell>
                      <EditGuestButton guest={guest} />
                    </TableCell>
                  </TableRow>
                );

                const plusOneRows = householdPlusOnes.map((plusOne) => (
                  <TableRow key={`plus-one-${plusOne.id}`} className="border-b border-border bg-background/40 hover:bg-background">
                    <TableCell className="text-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-primary">{guest.household.name}</span>
                        <span className="text-xs text-muted-foreground/60">(+{guest.household.maxPlusOnes})</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-primary">
                      {plusOne.firstName} {plusOne.lastName}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">-</TableCell>
                    <TableCell className="text-sm text-muted-foreground">No</TableCell>
                    <TableCell>
                      <span
                        className="text-xs uppercase tracking-[0.15em]"
                        style={{ color: "var(--color-primary)" }}
                      >
                        YES
                      </span>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{rsvpDateText}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {plusOne.dietaryRestrictions ?? "-"}
                    </TableCell>
                    <TableCell />
                  </TableRow>
                ));

                return [guestRow, ...plusOneRows];
              })}
            </TableBody>
          </Table>
        </div>
      )}

      {guests.length === 0 && (
        <p className="py-12 text-center text-xs uppercase tracking-[0.2em] text-muted-foreground">
          {hasActiveFilters
            ? "No guests match your filters."
            : "No guests yet. Import a CSV or add guests manually."}
        </p>
      )}
    </main>
  );
}
