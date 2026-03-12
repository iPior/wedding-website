import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getTranslations } from "next-intl/server";

export default async function FaqPage() {
  const t = await getTranslations("FAQ");
  const items = t.raw("items") as Record<string, { question: string; answer: string }>;
  const itemCount = Object.keys(items).length;

  return (
    <main className="mx-auto max-w-3xl px-6 py-10 md:py-16">
      <p className="text-xs uppercase tracking-[0.3em] text-accent mb-3">{t("sectionNumber")}</p>
      <h2
        className="text-5xl text-primary mb-8"
        style={{ fontFamily: "var(--font-playfair), serif" }}
      >
        {t("title")}
      </h2>

      <Accordion type="single" collapsible className="w-full">
        {Array.from({ length: itemCount }, (_, i) => (
          <AccordionItem
            key={i}
            value={`faq-${i}`}
            className="border-b border-border"
          >
            <AccordionTrigger
              className="py-7 text-left text-lg text-primary hover:no-underline"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              {t(`items.${i}.question`)}
            </AccordionTrigger>
            <AccordionContent className="pb-7 text-sm leading-relaxed text-foreground-soft">
              {t(`items.${i}.answer`)}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </main>
  );
}
