import { weddingConfig } from "../../../../wedding.config";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Variant10FAQ() {
  const { faq } = weddingConfig;

  return (
    <div>
      {/* Header */}
      <section className="px-6 py-20 text-center">
        <div className="mx-auto max-w-4xl">
          <div
            className="flex items-center justify-center gap-3 mb-4"
            style={{
              animation: "fadeIn 0.6s ease-out forwards",
              opacity: 0,
            }}
          >
            <div className="h-px w-12 bg-[#C9A84C]/50" />
            <div className="size-2 rotate-45 border border-[#C9A84C]" />
            <div className="h-px w-12 bg-[#C9A84C]/50" />
          </div>

          <h1
            className="font-[family-name:var(--font-display)] text-4xl tracking-wide text-[#2D4A3E] sm:text-5xl"
            style={{
              animation: "fadeInUp 0.6s ease-out forwards",
              animationDelay: "0.15s",
              opacity: 0,
            }}
          >
            Questions & Answers
          </h1>
          <p
            className="mt-4 font-[family-name:var(--font-body)] text-sm font-light text-[#6B7B74]"
            style={{
              animation: "fadeInUp 0.6s ease-out forwards",
              animationDelay: "0.3s",
              opacity: 0,
            }}
          >
            Everything you need to know for the celebration.
          </p>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="bg-[#EFF5F1] px-6 py-20">
        <div className="mx-auto max-w-2xl">
          <Accordion type="single" collapsible className="space-y-4">
            {faq.map((item, index) => (
              <AccordionItem
                key={index}
                value={`faq-${index}`}
                className="overflow-hidden border-none bg-[#F9F7F2] px-6 shadow-none"
                style={{
                  animation: "slideUp 0.6s ease-out forwards",
                  animationDelay: `${0.15 + index * 0.1}s`,
                  opacity: 0,
                  borderLeft: "2px solid #C9A84C",
                }}
              >
                <AccordionTrigger className="py-5 font-[family-name:var(--font-display)] text-lg tracking-wide text-[#2D4A3E] hover:no-underline hover:text-[#C9A84C] transition-colors duration-300 [&[data-state=open]]:text-[#C9A84C]">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="pb-5 font-[family-name:var(--font-body)] text-sm font-light leading-relaxed text-[#6B7B74]">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* Bottom ornament */}
          <div
            className="mt-12 flex items-center justify-center gap-3"
            style={{
              animation: "fadeIn 0.6s ease-out forwards",
              animationDelay: "0.8s",
              opacity: 0,
            }}
          >
            <div className="size-1.5 rotate-45 bg-[#C9A84C]/40" />
            <div className="size-2 rotate-45 bg-[#C9A84C]/60" />
            <div className="size-2.5 rotate-45 border border-[#C9A84C]" />
            <div className="size-2 rotate-45 bg-[#C9A84C]/60" />
            <div className="size-1.5 rotate-45 bg-[#C9A84C]/40" />
          </div>
        </div>
      </section>
    </div>
  );
}
