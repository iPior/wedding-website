import { weddingConfig } from "../../../../../wedding.config";
import { FadeIn } from "@/components/fade-in";
import { BridalPartyGrid } from "@/components/bridal-party-grid";
import { getTranslations } from "next-intl/server";

export default async function BridalPartyPage() {
  const t = await getTranslations("BridalParty");

  const roleLabels: Record<string, string> = {
    "Best Man": t("roles.Best Man"),
    "Maid of Honour": t("roles.Maid of Honour"),
    "Maid of Honor": t("roles.Maid of Honour"),
    Groomsman: t("roles.Groomsman"),
    Bridesmaid: t("roles.Bridesmaid"),
  };

  return (
    <main className="mx-auto max-w-3xl px-6 py-10 md:py-16">
      <FadeIn>
        <p className="text-xs uppercase tracking-[0.3em] text-accent mb-3">{t("sectionNumber")}</p>
        <h2
          className="text-5xl text-primary mb-4"
          style={{ fontFamily: "var(--font-playfair), serif" }}
        >
          {t("title")}
        </h2>
        <p className="text-base leading-relaxed text-foreground-soft mb-12">
          {t("subtitle")}
        </p>
      </FadeIn>

      <BridalPartyGrid members={weddingConfig.bridalParty} roleLabels={roleLabels} />
    </main>
  );
}
