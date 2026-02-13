import { SiteNav } from "@/components/layout/site-nav";

export default function RsvpPage() {
  return (
    <>
      <SiteNav />
      <main className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="text-2xl font-semibold">RSVP</h1>
        <p className="mt-2 text-zinc-600">
          Name lookup and RSVP form will be implemented in Phase 3.
        </p>
      </main>
    </>
  );
}
