import { GuestLayout } from "@/components/layout/guest-layout";
import { RsvpFlow } from "@/components/rsvp/rsvp-flow";

export default function RsvpPage() {
  return (
    <GuestLayout className="max-w-lg">
      <RsvpFlow />
    </GuestLayout>
  );
}
