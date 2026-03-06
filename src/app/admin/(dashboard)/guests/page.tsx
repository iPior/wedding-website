import { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import type { AttendanceStatus } from "@prisma/client";
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
import { DeleteGuestButton, DeleteHouseholdButton } from "@/components/admin/delete-button";
import { GuestFilters } from "@/components/admin/guest-filters";
import { CsvExportButton } from "@/components/admin/csv-export-button";

type Props = {
  searchParams: Promise<{ search?: string; status?: string }>;
};

export default async function AdminGuestsPage({ searchParams }: Props) {
  const { search, status } = await searchParams;

  const where: Record<string, unknown> = {};
  if (status && ["YES", "NO", "PENDING"].includes(status)) {
    where.attending = status as AttendanceStatus;
  }
  if (search) {
    where.OR = [
      { firstName: { contains: search, mode: "insensitive" } },
      { lastName: { contains: search, mode: "insensitive" } },
    ];
  }

  const households = await prisma.household.findMany({
    where: { guests: { some: where } },
    include: {
      guests: {
        where,
        orderBy: { isPrimary: "desc" },
      },
    },
    orderBy: { name: "asc" },
  });

  const totalGuests = households.reduce((sum, h) => sum + h.guests.length, 0);

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
            {households.length} household(s) · {totalGuests} guest(s)
            {(search || status) && " · filtered"}
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

      {households.length > 0 && (
        <div className="border border-border bg-card/60">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-border hover:bg-transparent">
                <TableHead className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-normal">Household</TableHead>
                <TableHead className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-normal">Name</TableHead>
                <TableHead className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-normal">Email</TableHead>
                <TableHead className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-normal">Primary</TableHead>
                <TableHead className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-normal">RSVP</TableHead>
                <TableHead className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-normal">Dietary</TableHead>
                <TableHead className="w-[80px]" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {households.flatMap((household) =>
                household.guests.map((guest, guestIdx) => (
                  <TableRow key={guest.id} className="border-b border-border hover:bg-background">
                    <TableCell className="text-sm">
                      {guestIdx === 0 ? (
                        <div className="flex items-center gap-2">
                          <span className="text-primary">{household.name}</span>
                          <span className="text-xs text-muted-foreground/60">(+{household.maxPlusOnes})</span>
                          <DeleteHouseholdButton householdId={household.id} />
                        </div>
                      ) : null}
                    </TableCell>
                    <TableCell className="text-sm text-primary">
                      {guest.firstName} {guest.lastName}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {guest.email ?? "—"}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {guest.isPrimary ? "Yes" : "—"}
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
                      {guest.dietaryRestrictions ?? "—"}
                    </TableCell>
                    <TableCell>
                      <DeleteGuestButton guestId={guest.id} />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}

      {households.length === 0 && (
        <p className="py-12 text-center text-xs uppercase tracking-[0.2em] text-muted-foreground">
          {search || status
            ? "No guests match your filters."
            : "No guests yet. Import a CSV or add guests manually."}
        </p>
      )}
    </main>
  );
}
