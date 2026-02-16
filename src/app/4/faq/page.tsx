import { weddingConfig } from "../../../../wedding.config";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Variant4Faq() {
  const { faq } = weddingConfig;

  return (
    <div>
      <h1
        className="mb-8 font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight sm:text-3xl"
        style={{ animation: "fadeIn 0.4s ease forwards" }}
      >
        FAQ
      </h1>

      <div className="flex items-baseline gap-3">
        <span className="font-[family-name:var(--font-display)] text-sm text-neutral-300">
          01 &mdash;
        </span>
        <h2 className="font-[family-name:var(--font-display)] text-sm font-bold uppercase tracking-wider">
          Common Questions
        </h2>
      </div>

      <Accordion type="single" collapsible className="mt-4 w-full">
        {faq.map((item, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className="border-neutral-100"
            style={{
              animation: "fadeIn 0.4s ease forwards",
              animationDelay: `${0.1 + index * 0.05}s`,
              opacity: 0,
            }}
          >
            <AccordionTrigger className="py-3 text-left text-sm font-normal hover:no-underline [&>svg]:size-3 [&>svg]:text-neutral-400">
              <div className="flex items-baseline gap-3">
                <span className="font-[family-name:var(--font-display)] text-[11px] tabular-nums text-neutral-300">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="font-medium text-neutral-900">
                  {item.question}
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-4 pl-[38px] text-sm leading-relaxed text-neutral-500">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
