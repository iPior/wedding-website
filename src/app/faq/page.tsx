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

        {weddingConfig.accommodations && (
          <section className="mx-auto max-w-2xl rounded-lg border bg-muted/50 p-6 text-center">
            <h2 className="font-playfair text-xl font-semibold">
              Accommodations
            </h2>
            <p className="mt-2 font-medium">
              {weddingConfig.accommodations.hotel}
            </p>
            <p className="text-sm text-muted-foreground">
              {weddingConfig.accommodations.address}
            </p>
            {weddingConfig.accommodations.note && (
              <p className="mt-2 text-sm text-muted-foreground">
                {weddingConfig.accommodations.note}
              </p>
            )}
            {weddingConfig.accommodations.bookingUrl && (
              <a
                href={weddingConfig.accommodations.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block text-sm font-medium underline underline-offset-4 hover:text-foreground"
              >
                Book your room
              </a>
            )}
          </section>
        )}
      </div>
    </GuestLayout>
  );
}
