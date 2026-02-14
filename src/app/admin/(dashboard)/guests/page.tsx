import { prisma } from "@/lib/prisma";
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

export default async function AdminGuestsPage() {
  const households = await prisma.household.findMany({
    include: {
      guests: {
        orderBy: { isPrimary: "desc" },
      },
    },
    orderBy: { name: "asc" },
  });

  const totalGuests = households.reduce((sum, h) => sum + h.guests.length, 0);

  return (
    <main className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Guests</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {households.length} household(s), {totalGuests} guest(s)
        </p>
      </div>

      <div className="space-y-2">
        <h2 className="text-sm font-medium">Import from CSV</h2>
        <p className="text-xs text-muted-foreground">
          Expected columns: household_name, first_name, last_name, is_primary, max_plus_ones
        </p>
        <CsvUpload />
      </div>

      <AddGuestForm />

      {households.length > 0 && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Household</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Primary</TableHead>
              <TableHead>RSVP</TableHead>
              <TableHead className="w-[100px]" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {households.flatMap((household) =>
              household.guests.map((guest, guestIdx) => (
                <TableRow key={guest.id}>
                  <TableCell>
                    {guestIdx === 0 ? (
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{household.name}</span>
                        <span className="text-xs text-muted-foreground">
                          (+{household.maxPlusOnes})
                        </span>
                        <DeleteHouseholdButton householdId={household.id} />
                      </div>
                    ) : null}
                  </TableCell>
                  <TableCell>
                    {guest.firstName} {guest.lastName}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {guest.email ?? "—"}
                  </TableCell>
                  <TableCell>{guest.isPrimary ? "Yes" : "—"}</TableCell>
                  <TableCell>
                    <span
                      className={
                        guest.attending === "YES"
                          ? "text-green-600"
                          : guest.attending === "NO"
                            ? "text-red-600"
                            : "text-muted-foreground"
                      }
                    >
                      {guest.attending ?? "PENDING"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <DeleteGuestButton guestId={guest.id} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      )}

      {households.length === 0 && (
        <p className="py-8 text-center text-sm text-muted-foreground">
          No guests yet. Import a CSV or add guests manually.
        </p>
      )}
    </main>
  );
}
