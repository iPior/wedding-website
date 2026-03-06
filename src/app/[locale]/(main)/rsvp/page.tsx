import { getTranslations } from "next-intl/server";
import { RsvpFlow } from "@/components/rsvp/rsvp-flow";

export default async function RsvpPage() {
  const t = await getTranslations("Rsvp");

  return (
    <main className="mx-auto max-w-3xl px-6 py-10 md:py-16 md:min-h-[calc(100vh-5rem)]">
      <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-accent)] mb-3">{t("sectionNumber")}</p>
      <h2
        className="text-5xl text-[var(--color-primary)] mb-4"
        style={{ fontFamily: "var(--font-playfair), serif" }}
      >
        {t("title")}
      </h2>
      <p className="text-base leading-relaxed text-[var(--color-foreground-soft)] mb-10">
        {t("subtitle")}
      </p>

      <div className="h-px bg-[var(--color-border)] mb-10" />

      <RsvpFlow />

      <p className="mt-10 text-xs uppercase tracking-[0.16em] w-2/3 mx-auto text-center text-[var(--color-muted-foreground)]">
        {t("issuesHelp")}
      </p>
    </main>
  );
}
