import { getTranslations } from "next-intl/server";
import { RsvpFlow } from "@/components/rsvp/rsvp-flow";
import { RsvpHelpButton } from "@/components/rsvp/rsvp-help-button";

export default async function RsvpPage() {
  const t = await getTranslations("Rsvp");

  return (
    <main className="mx-auto max-w-3xl px-6 py-10 md:py-16 md:min-h-[calc(100vh-5rem)]">
      <p className="text-xs uppercase tracking-[0.3em] text-accent mb-3">{t("sectionNumber")}</p>
      <h2
        className="text-5xl text-primary mb-4"
        style={{ fontFamily: "var(--font-playfair), serif" }}
      >
        {t("title")}
      </h2>
      <p className="text-base leading-relaxed text-foreground-soft mb-10">
        {t("subtitle")}
      </p>

      <div className="h-px bg-border mb-10" />

      <RsvpFlow />

      <RsvpHelpButton />
    </main>
  );
}
