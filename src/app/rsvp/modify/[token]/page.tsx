import { SiteNav } from "@/components/layout/site-nav";
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
      <>
        <SiteNav />
        <main className="mx-auto max-w-lg px-4 py-12 text-center">
          <h1 className="text-2xl font-semibold">Invalid Link</h1>
          <p className="mt-2 text-muted-foreground">
            This RSVP modification link is invalid or has expired. Please contact
            the couple if you need to update your RSVP.
          </p>
        </main>
      </>
    );
  }

  if (data.deadlinePassed) {
    return (
      <>
        <SiteNav />
        <main className="mx-auto max-w-lg px-4 py-12 text-center">
          <h1 className="text-2xl font-semibold">Modifications Closed</h1>
          <p className="mt-2 text-muted-foreground">
            The RSVP deadline has passed. Please contact the couple directly if
            you need to make changes.
          </p>
        </main>
      </>
    );
  }

  return (
    <>
      <SiteNav />
      <main className="mx-auto max-w-lg px-4 py-12">
        <ModifyRsvpClient household={data.household} token={token} />
      </main>
    </>
  );
}
