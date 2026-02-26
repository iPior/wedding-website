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
      <p className="text-xs uppercase tracking-[0.3em] text-[#d4a0b0] mb-3">{t("sectionNumber")}</p>
      <h2
        className="text-5xl text-[#2c2424] mb-8 border-b border-[#f0e0e4] pb-4"
        style={{ fontFamily: "var(--font-playfair), serif" }}
      >
        {t("title")}
      </h2>

      <Accordion type="single" collapsible className="w-full">
        {Array.from({ length: itemCount }, (_, i) => (
          <AccordionItem
            key={i}
            value={`faq-${i}`}
            className="border-b border-[#f0e0e4]"
          >
            <AccordionTrigger
              className="py-7 text-left text-lg text-[#2c2424] hover:no-underline"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              {t(`items.${i}.question`)}
            </AccordionTrigger>
            <AccordionContent className="pb-7 text-sm leading-relaxed text-[#5a4f4f]">
              {t(`items.${i}.answer`)}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </main>
  );
}
