import { getTranslations } from "next-intl/server";
import { getHouseholdByToken } from "@/actions/rsvp";
import { ModifyRsvpClient } from "@/components/rsvp/modify-rsvp-client";

type Props = {
  params: Promise<{ token: string }>;
};

export default async function ModifyRsvpPage({ params }: Props) {
  const { token } = await params;
  const t = await getTranslations("ModifyRsvp");
  const data = await getHouseholdByToken(token);

  if (!data) {
    return (
      <section className="flex min-h-[calc(100vh-15rem)] items-center justify-center px-6 py-16 text-center">
        <div className="w-full max-w-md space-y-6">
          <h1
            className="text-3xl text-primary"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            {t("invalidTitle")}
          </h1>
          <div className="mx-auto h-px w-16 bg-border" />
          <p className="text-sm leading-relaxed text-muted-foreground">
            {t("invalidMessage")}
          </p>
        </div>
      </section>
    );
  }

  if (data.deadlinePassed) {
    return (
      <section className="flex min-h-[calc(100vh-15rem)] items-center justify-center px-6 py-16 text-center">
        <div className="w-full max-w-md space-y-6">
          <h1
            className="text-3xl text-primary"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            {t("closedTitle")}
          </h1>
          <div className="mx-auto h-px w-16 bg-border" />
          <p className="text-sm leading-relaxed text-muted-foreground">
            {t("closedMessage")}
          </p>
        </div>
      </section>
    );
  }

  return (
    <main className="mx-auto max-w-lg px-6 py-16">
      <ModifyRsvpClient household={data.household} token={token} />
    </main>
  );
}
