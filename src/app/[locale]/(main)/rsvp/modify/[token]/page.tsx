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
      <main className="mx-auto max-w-lg px-6 py-16 text-center">
        <h1
          className="text-3xl text-[var(--color-primary)] mb-4"
          style={{ fontFamily: "var(--font-playfair), serif" }}
        >
          {t("invalidTitle")}
        </h1>
        <p className="text-sm leading-relaxed text-[var(--color-muted-foreground)]">
          {t("invalidMessage")}
        </p>
      </main>
    );
  }

  if (data.deadlinePassed) {
    return (
      <main className="mx-auto max-w-lg px-6 py-16 text-center">
        <h1
          className="text-3xl text-[var(--color-primary)] mb-4"
          style={{ fontFamily: "var(--font-playfair), serif" }}
        >
          {t("closedTitle")}
        </h1>
        <p className="text-sm leading-relaxed text-[var(--color-muted-foreground)]">
          {t("closedMessage")}
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-lg px-6 py-16">
      <ModifyRsvpClient household={data.household} token={token} />
    </main>
  );
}
