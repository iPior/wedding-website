import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";
import { weddingConfig } from "../../../../wedding.config";

const { faq } = weddingConfig;

export default function Variant2Faq() {
  return (
    <div className="space-y-16">
      {/* Page Header */}
      <div
        style={{
          animation: "fadeInUp 0.6s ease forwards",
          opacity: 0,
        }}
      >
        <p className="text-[10px] font-medium tracking-[0.15em] uppercase text-neutral-400">
          Questions
        </p>
        <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl tracking-tight text-neutral-900 sm:text-5xl">
          Frequently Asked
        </h1>
        <p className="mt-3 max-w-md text-[15px] font-light leading-relaxed text-neutral-500">
          Everything you need to know before the big day.
        </p>
      </div>

      {/* FAQ Card */}
      <Card
        className="overflow-hidden rounded-xl border border-neutral-100 shadow-none"
        style={{
          animation: "fadeInUp 0.6s ease forwards",
          animationDelay: "0.1s",
          opacity: 0,
        }}
      >
        <div className="border-t-2 border-neutral-900" />
        <CardContent className="p-6 sm:p-8">
          <div className="mb-6 flex items-center gap-2">
            <HelpCircle className="h-3.5 w-3.5 text-neutral-400" />
            <span className="text-[10px] font-medium tracking-[0.15em] uppercase text-neutral-400">
              Common Questions
            </span>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {faq.map((item, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border-b border-neutral-100 last:border-b-0"
              >
                <AccordionTrigger className="py-5 text-left font-[family-name:var(--font-body)] text-[15px] font-normal text-neutral-900 hover:no-underline [&[data-state=open]]:font-medium">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-sm font-light leading-relaxed text-neutral-500">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

    </div>
  );
}
