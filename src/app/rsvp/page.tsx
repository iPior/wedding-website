import { SiteNav } from "@/components/layout/site-nav";
import { RsvpFlow } from "@/components/rsvp/rsvp-flow";

export default function RsvpPage() {
  return (
    <>
      <SiteNav />
      <main className="mx-auto max-w-lg px-4 py-12">
        <RsvpFlow />
      </main>
    </>
  );
}
