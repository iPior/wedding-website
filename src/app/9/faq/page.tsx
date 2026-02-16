import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { weddingConfig } from "../../../../wedding.config";

function Flourish({ className }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className ?? ""}`}>
      <div className="h-px flex-1 bg-[#DFD0D5]" />
      <span className="text-[#B8976B] text-lg">&#10087;</span>
      <div className="h-px flex-1 bg-[#DFD0D5]" />
    </div>
  );
}

export default function FaqPage() {
  return (
    <div>
      {/* Page heading */}
      <section className="mx-auto max-w-3xl px-6 py-20 sm:py-28 text-center">
        <h1
          className="text-4xl sm:text-5xl md:text-6xl text-[#8B6B82]"
          style={{
            fontFamily: "var(--font-display)",
            animation: "fadeInUp 1s ease forwards",
            opacity: 0,
          }}
        >
          Questions &amp; Answers
        </h1>
        <p
          className="mt-4 text-base italic text-[#7D7274] max-w-md mx-auto"
          style={{
            fontFamily: "var(--font-body)",
            animation: "fadeInUp 1s ease forwards",
            animationDelay: "0.15s",
            opacity: 0,
          }}
        >
          Everything you need to know about our special day.
        </p>
        <div
          className="mx-auto mt-8 max-w-xs"
          style={{
            animation: "fadeIn 1s ease forwards",
            animationDelay: "0.3s",
            opacity: 0,
          }}
        >
          <Flourish />
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="mx-auto max-w-2xl px-6 pb-20 sm:pb-28">
        <div
          className="bg-[#F5EDE8] border border-[#DFD0D5] p-6 sm:p-10"
          style={{
            animation: "fadeInUp 1s ease forwards",
            animationDelay: "0.3s",
            opacity: 0,
          }}
        >
          <Accordion type="single" collapsible className="w-full">
            {weddingConfig.faq.map((item, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border-b border-[#DFD0D5] last:border-b-0"
              >
                <AccordionTrigger
                  className="py-5 text-left text-base font-normal text-[#8B6B82] hover:text-[#B8976B] hover:no-underline transition-colors duration-300"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {item.question}
                </AccordionTrigger>
                <AccordionContent
                  className="text-[#7D7274] text-sm leading-relaxed"
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
