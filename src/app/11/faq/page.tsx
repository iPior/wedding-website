import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { weddingConfig } from "../../../../wedding.config";

export default function FaqPage() {
  return (
    <main className="max-w-7xl mx-auto px-6 md:px-12 py-24">
      {/* Section header — offset grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-16">
        <div className="md:col-span-4">
          <p className="text-xs uppercase tracking-[0.3em] text-[#d4a0b0] mb-3">
            001
          </p>
          <h2
            className="text-4xl md:text-5xl text-[#2c2424]"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            Frequently
            <br />
            Asked
          </h2>
        </div>
        <div className="md:col-start-6 md:col-span-6">
          <p className="text-lg leading-relaxed text-[#5a4f4f] md:mt-10">
            We have gathered answers to some common questions. If you need
            anything else, do not hesitate to reach out.
          </p>
        </div>
      </div>

      {/* Accordion */}
      <div className="max-w-3xl md:ml-auto">
        <Accordion type="single" collapsible className="w-full">
          {weddingConfig.faq.map((item, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="border-b border-[#f0e0e4]"
            >
              <AccordionTrigger
                className="py-6 text-left text-lg text-[#2c2424] hover:no-underline"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="pb-6 text-[#5a4f4f] leading-relaxed">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </main>
  );
}
