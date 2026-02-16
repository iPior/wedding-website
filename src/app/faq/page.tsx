import { weddingConfig } from "../../../wedding.config";
import { GuestLayout } from "@/components/layout/guest-layout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FaqPage() {
  return (
    <GuestLayout>
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="font-playfair text-3xl font-semibold">
            Frequently Asked Questions
          </h1>
          <p className="mt-2 text-muted-foreground">
            Everything you need to know about our big day.
          </p>
        </div>

        <Accordion type="single" collapsible className="mx-auto max-w-2xl">
          {weddingConfig.faq.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left font-medium">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

      </div>
    </GuestLayout>
  );
}
