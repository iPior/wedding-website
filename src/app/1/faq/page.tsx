import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { weddingConfig } from "../../../../wedding.config";

export default function FaqPage() {
  return (
    <div>
      {/* Page heading */}
      <section className="mx-auto max-w-2xl px-6 pb-20 pt-16 sm:pt-24">
        <div className="max-w-xl">
          <h1
            className="text-[3.5rem] font-light leading-[0.85] tracking-[-0.04em] text-neutral-900 sm:text-[6rem]"
            style={{
              fontFamily: "var(--font-display)",
              animation: "fadeInUp 0.8s ease forwards",
              opacity: 0,
            }}
          >
            Questions
          </h1>
          <p
            className="mt-8 max-w-sm text-sm font-light leading-relaxed text-neutral-400"
            style={{
              fontFamily: "var(--font-body)",
              animation: "fadeInUp 0.8s ease forwards",
              animationDelay: "0.15s",
              opacity: 0,
            }}
          >
            Everything you might need to know before the day.
          </p>
          <div
            className="mt-8 h-px bg-neutral-200"
            style={{
              animation: "revealLine 0.8s ease forwards",
              animationDelay: "0.3s",
              width: 0,
            }}
          />
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="mx-auto max-w-2xl px-6 pb-32">
        <div
          style={{
            animation: "fadeInUp 0.8s ease forwards",
            animationDelay: "0.35s",
            opacity: 0,
          }}
        >
          <Accordion type="single" collapsible>
            {weddingConfig.faq.map((item, index) => (
              <AccordionItem
                key={index}
                value={`faq-${index}`}
                className="border-b border-neutral-100 first:border-t"
              >
                <AccordionTrigger
                  className="py-6 text-left text-[0.95rem] font-light tracking-[-0.01em] text-neutral-900 hover:no-underline"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {item.question}
                </AccordionTrigger>
                <AccordionContent
                  className="pb-6 text-sm font-light leading-relaxed text-neutral-400"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </div>
  );
}
