import { weddingConfig } from "../../../../wedding.config";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Variant8FAQ() {
  const { faq } = weddingConfig;

  return (
    <div>
      {/* Heading */}
      <div className="mx-auto max-w-4xl px-6 pt-24 pb-8 text-center">
        <h1
          className="font-[family-name:var(--font-display)] text-4xl tracking-wide text-[#4A7C8A] sm:text-5xl"
          style={{
            animation: "fadeInUp 0.9s ease-in-out forwards",
            opacity: 0,
          }}
        >
          Frequently Asked Questions
        </h1>
        <svg
          viewBox="0 0 1200 40"
          className="mx-auto mt-6 h-6 w-full max-w-xs text-[#D0DDE3]"
          style={{
            animation: "fadeIn 0.9s ease-in-out forwards",
            animationDelay: "0.15s",
            opacity: 0,
          }}
        >
          <path
            d="M0,20 Q150,0 300,20 T600,20 T900,20 T1200,20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
        </svg>
      </div>

      {/* Sandstone background section */}
      <div className="bg-[#FFF5EE] px-6 py-16">
        <div className="mx-auto max-w-2xl">
          <Accordion type="single" collapsible className="space-y-4">
            {faq.map((item, index) => (
              <AccordionItem
                key={index}
                value={`faq-${index}`}
                className="overflow-hidden rounded-xl border border-[#D0DDE3] bg-[#EDF3F6] px-6 shadow-sm"
                style={{
                  animation: "fadeInUp 0.9s ease-in-out forwards",
                  animationDelay: `${0.3 + index * 0.15}s`,
                  opacity: 0,
                }}
              >
                <AccordionTrigger className="py-5 font-[family-name:var(--font-body)] text-left text-base font-medium tracking-wide text-[#4A7C8A] transition-colors duration-500 hover:text-[#D4956A] hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="pb-5 font-[family-name:var(--font-body)] text-sm font-light leading-relaxed text-[#6B7F8A]">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>

      {/* Wave divider at bottom */}
      <div className="flex justify-center py-8">
        <svg
          viewBox="0 0 1200 40"
          className="h-8 w-full max-w-xl text-[#D0DDE3]"
        >
          <path
            d="M0,20 Q150,0 300,20 T600,20 T900,20 T1200,20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
        </svg>
      </div>
    </div>
  );
}
