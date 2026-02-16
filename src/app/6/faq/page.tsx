import { weddingConfig } from "../../../../wedding.config";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Variant6Faq() {
  const { faq } = weddingConfig;

  return (
    <div className="space-y-16 text-center">
      {/* Page heading */}
      <div
        className="space-y-4"
        style={{ animation: "fadeInUp 0.8s ease forwards", opacity: 0 }}
      >
        <h1 className="font-[family-name:var(--font-display)] text-4xl font-light tracking-wide text-[#5B7B5E] sm:text-5xl">
          Questions & Answers
        </h1>
        <div className="flex items-center justify-center gap-3">
          <div className="h-px w-12 bg-[#5B7B5E]/20" />
          <span className="text-sm text-[#5B7B5E]/40">✿</span>
          <div className="h-px w-12 bg-[#5B7B5E]/20" />
        </div>
        <p className="font-[family-name:var(--font-body)] text-sm font-light italic text-[#7A7A6E]">
          Everything you need to know about our celebration.
        </p>
      </div>

      {/* Accordion */}
      <div
        className="mx-auto max-w-xl"
        style={{
          animation: "fadeInUp 0.8s ease forwards",
          animationDelay: "0.3s",
          opacity: 0,
        }}
      >
        <Accordion type="single" collapsible className="w-full">
          {faq.map((item, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border-b border-[#DDD5CA]"
            >
              <AccordionTrigger className="py-5 text-left font-[family-name:var(--font-display)] text-base font-light tracking-wide text-neutral-700 hover:text-[#5B7B5E] [&>svg]:text-[#5B7B5E]/40">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="pb-5 font-[family-name:var(--font-body)] text-sm font-light leading-relaxed text-[#7A7A6E]">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

    </div>
  );
}
