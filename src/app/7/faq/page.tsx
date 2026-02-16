import { weddingConfig } from "../../../../wedding.config";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Variant7Faq() {
  const { faq } = weddingConfig;

  return (
    <div className="space-y-16 text-center">
      {/* Page heading */}
      <div
        className="space-y-4"
        style={{ animation: "fadeInUp 1s ease-out forwards", opacity: 0 }}
      >
        <h1 className="font-[family-name:var(--font-display)] text-4xl tracking-wide text-[#C47D5A] sm:text-5xl">
          Questions &amp; Answers
        </h1>
        <p className="font-[family-name:var(--font-body)] text-sm font-light text-[#8A7B72]">
          Everything you need to know about our celebration.
        </p>
      </div>

      {/* Accordion */}
      <div
        className="mx-auto max-w-xl"
        style={{
          animation: "scaleEntry 1s ease-out 0.3s forwards",
          opacity: 0,
        }}
      >
        <Accordion type="single" collapsible className="w-full">
          {faq.map((item, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border-b border-[#EDD8CC]"
            >
              <AccordionTrigger className="py-5 text-left font-[family-name:var(--font-display)] text-base tracking-wide text-[#3D2E2A] hover:text-[#C47D5A] [&>svg]:text-[#D4A8C8]">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="pb-5 font-[family-name:var(--font-body)] text-sm font-light leading-relaxed text-[#8A7B72]">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

    </div>
  );
}
