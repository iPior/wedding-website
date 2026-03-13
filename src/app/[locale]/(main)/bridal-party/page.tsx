import Image from "next/image";
import { weddingConfig } from "../../../../../wedding.config";
import { FadeIn } from "@/components/fade-in";
import { getTranslations } from "next-intl/server";

export default async function BridalPartyPage() {
  const t = await getTranslations("BridalParty");

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

      <div className="grid grid-cols-2 gap-8">
        {weddingConfig.bridalParty.map((member, i) => (
          <FadeIn key={member.name} delay={Math.min(i * 0.15, 0.3)}>
            <div className="aspect-[3/4] overflow-hidden rounded-sm bg-gradient-to-br from-gradient-rose-light to-gradient-rose mb-3">
              {member.image ? (
                <Image
                  src={member.image}
                  alt={member.name}
                  width={300}
                  height={400}
                  sizes="(max-width: 768px) 45vw, 300px"
                  className="h-full w-full object-cover"
                />
              ) : null}
            </div>
            <h3
              className="text-lg text-primary mb-1"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              {member.name}
            </h3>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-1">
              {t(`roles.${member.role}`)}
            </p>
          </FadeIn>
        ))}
      </div>
    </main>
  );
}
