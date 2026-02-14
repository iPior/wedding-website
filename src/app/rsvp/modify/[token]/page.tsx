import { GuestLayout } from "@/components/layout/guest-layout";
import { getHouseholdByToken } from "@/actions/rsvp";
import { ModifyRsvpClient } from "@/components/rsvp/modify-rsvp-client";

type Props = {
  params: Promise<{ token: string }>;
};

export default async function ModifyRsvpPage({ params }: Props) {
  const { token } = await params;
  const data = await getHouseholdByToken(token);

  if (!data) {
    return (
      <GuestLayout className="max-w-lg">
        <div className="text-center">
          <h1 className="font-playfair text-2xl font-semibold">
            Invalid Link
          </h1>
          <p className="mt-2 text-muted-foreground">
            This RSVP modification link is invalid or has expired. Please
            contact the couple if you need to update your RSVP.
          </p>
        </div>
      </GuestLayout>
    );
  }

  if (data.deadlinePassed) {
    return (
      <GuestLayout className="max-w-lg">
        <div className="text-center">
          <h1 className="font-playfair text-2xl font-semibold">
            Modifications Closed
          </h1>
          <p className="mt-2 text-muted-foreground">
            The RSVP deadline has passed. Please contact the couple directly if
            you need to make changes.
          </p>
        </div>
      </GuestLayout>
    );
  }

  return (
    <GuestLayout className="max-w-lg">
      <ModifyRsvpClient household={data.household} token={token} />
    </GuestLayout>
  );
}
