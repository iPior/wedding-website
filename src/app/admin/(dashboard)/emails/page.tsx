import { prisma } from "@/lib/prisma";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BroadcastForm } from "@/components/admin/broadcast-form";

export default async function AdminEmailsPage() {
  const [subscribers, totalSubscribed, totalUnsubscribed] = await Promise.all([
    prisma.mailingListEntry.findMany({
      include: {
        guest: { select: { firstName: true, lastName: true } },
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.mailingListEntry.count({ where: { subscribed: true } }),
    prisma.mailingListEntry.count({ where: { subscribed: false } }),
  ]);

  return (
    <main className="space-y-10">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Manage</p>
        <h1
          className="mt-1 text-2xl tracking-wide text-primary"
          style={{ fontFamily: "var(--font-playfair), serif" }}
        >
          Emails
        </h1>
        <p className="mt-1 text-xs uppercase tracking-[0.15em] text-muted-foreground/70">
          {totalSubscribed} subscribed · {totalUnsubscribed} unsubscribed
        </p>
      </div>

      <BroadcastForm subscriberCount={totalSubscribed} />

      <div className="h-px bg-border" />

      <div className="space-y-4">
        <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Mailing List</p>

        {subscribers.length > 0 ? (
          <div className="border border-border bg-card/60">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-border hover:bg-transparent">
                  <TableHead className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-normal">Name</TableHead>
                  <TableHead className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-normal">Email</TableHead>
                  <TableHead className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-normal">Status</TableHead>
                  <TableHead className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-normal">Added</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {subscribers.map((entry) => (
                  <TableRow key={entry.id} className="border-b border-border hover:bg-background">
                    <TableCell className="text-sm text-primary">
                      {entry.guest.firstName} {entry.guest.lastName}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {entry.email}
                    </TableCell>
                    <TableCell>
                      <span
                        className="text-xs uppercase tracking-[0.15em]"
                        style={{ color: entry.subscribed ? "var(--color-primary)" : "var(--color-accent)" }}
                      >
                        {entry.subscribed ? "Subscribed" : "Unsubscribed"}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {entry.createdAt.toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <p className="py-12 text-center text-xs uppercase tracking-[0.2em] text-muted-foreground">
            No subscribers yet. Guests are added when they submit an RSVP.
          </p>
        )}
      </div>
    </main>
  );
}
