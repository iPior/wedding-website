import { prisma } from "@/lib/prisma";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { BroadcastForm } from "@/components/admin/broadcast-form";

export default async function AdminEmailsPage() {
  const [subscribers, totalSubscribed, totalUnsubscribed] = await Promise.all([
    prisma.mailingListEntry.findMany({
      include: {
        guest: {
          select: { firstName: true, lastName: true },
        },
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.mailingListEntry.count({ where: { subscribed: true } }),
    prisma.mailingListEntry.count({ where: { subscribed: false } }),
  ]);

  return (
    <main className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Emails</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {totalSubscribed} subscribed, {totalUnsubscribed} unsubscribed
        </p>
      </div>

      <BroadcastForm subscriberCount={totalSubscribed} />

      <Separator />

      <div>
        <h2 className="text-lg font-medium">Mailing List</h2>
        {subscribers.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Added</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subscribers.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell>
                    {entry.guest.firstName} {entry.guest.lastName}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {entry.email}
                  </TableCell>
                  <TableCell>
                    <span
                      className={
                        entry.subscribed ? "text-green-600" : "text-red-600"
                      }
                    >
                      {entry.subscribed ? "Subscribed" : "Unsubscribed"}
                    </span>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {entry.createdAt.toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p className="py-8 text-center text-sm text-muted-foreground">
            No subscribers yet. Guests are added when they submit an RSVP.
          </p>
        )}
      </div>
    </main>
  );
}
