import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { weddingConfig } from "../../../../wedding.config";

export default function FaqPage() {
  return (
    <>
      {/* ═══ SCENE 1 — Dark Header ═══ */}
      <section className="relative flex min-h-[50vh] items-center justify-center bg-neutral-950 overflow-hidden">
        {/* Noise */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
          }}
        />
        <div className="relative z-10 px-6 text-center">
          <h1
            className="text-4xl uppercase tracking-[0.3em] text-white sm:text-5xl lg:text-6xl"
            style={{
              fontFamily: "var(--font-display)",
              animation: "fadeInUp 1.2s ease forwards",
              animationDelay: "0.3s",
              opacity: 0,
            }}
          >
            Questions
          </h1>
          <div className="mx-auto mt-10 overflow-hidden">
            <div
              className="mx-auto h-[2px] bg-neutral-500"
              style={{
                animation: "grow 0.8s ease forwards",
                animationDelay: "1s",
                width: 0,
                maxWidth: "6rem",
              }}
            />
          </div>
          <p
            className="mt-8 text-[11px] font-light uppercase tracking-[0.3em] text-neutral-500"
            style={{
              animation: "fadeInUp 1s ease forwards",
              animationDelay: "1.3s",
              opacity: 0,
            }}
          >
            Everything you need to know
          </p>
        </div>
      </section>

      {/* ═══ SCENE 2 — FAQ Accordion ═══ */}
      <section className="bg-stone-50 py-32 sm:py-48">
        <div
          className="mx-auto max-w-3xl px-6"
          style={{
            animation: "fadeInUp 1s ease forwards",
            animationDelay: "0.3s",
            opacity: 0,
          }}
        >
          <Accordion type="single" collapsible className="w-full">
            {weddingConfig.faq.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-b border-neutral-200"
              >
                <AccordionTrigger
                  className="py-8 text-left text-base font-light tracking-wide text-neutral-900 hover:no-underline sm:text-lg"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="pb-8 text-sm font-light leading-relaxed text-neutral-500">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </>
  );
}
