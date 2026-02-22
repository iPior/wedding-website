import Link from "next/link";
import { CountdownTimer } from "@/components/countdown-timer";
import { weddingConfig } from "../../../wedding.config";

const { person1, person2 } = weddingConfig.couple;
const weddingDate = new Date(weddingConfig.date);
const formattedDate = weddingDate.toLocaleDateString("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
  year: "numeric",
});

export default function HomePage() {
  return (
    <div>
      {/* Hero — left-aligned, massive type */}
      <section className="mx-auto max-w-2xl px-6 pb-32 pt-20 sm:pt-32">
        <div className="max-w-xl">
          {/* Name line 1 */}
          <h1
            className="text-[4.5rem] font-light leading-[0.85] tracking-[-0.04em] text-neutral-900 sm:text-[8rem]"
            style={{
              fontFamily: "var(--font-display)",
              animation: "fadeInUp 0.8s ease forwards",
              opacity: 0,
            }}
          >
            {person1.firstName}
          </h1>

          {/* Ampersand — offset, lighter */}
          <span
            className="my-3 inline-block text-[1.5rem] font-light tracking-[-0.02em] text-neutral-300 sm:my-4 sm:text-[2rem]"
            style={{
              fontFamily: "var(--font-display)",
              animation: "fadeInUp 0.8s ease forwards",
              animationDelay: "0.08s",
              opacity: 0,
            }}
          >
            &amp;
          </span>

          {/* Name line 2 */}
          <h1
            className="text-[4.5rem] font-light leading-[0.85] tracking-[-0.04em] text-neutral-900 sm:text-[8rem]"
            style={{
              fontFamily: "var(--font-display)",
              animation: "fadeInUp 0.8s ease forwards",
              animationDelay: "0.15s",
              opacity: 0,
            }}
          >
            {person2.firstName}
          </h1>

          {/* Date */}
          <p
            className="mt-10 text-[0.7rem] font-light uppercase tracking-[0.2em] text-neutral-400 sm:mt-14"
            style={{
              fontFamily: "var(--font-body)",
              animation: "fadeInUp 0.8s ease forwards",
              animationDelay: "0.3s",
              opacity: 0,
            }}
          >
            {formattedDate}
          </p>

          {/* Thin rule */}
          <div
            className="mt-8 h-px bg-neutral-200"
            style={{
              animation: "revealLine 0.8s ease forwards",
              animationDelay: "0.5s",
              width: 0,
            }}
          />
        </div>
      </section>

      {/* Countdown — narrow, understated */}
      <section className="mx-auto max-w-xl px-6 pb-36">
        <div
          style={{
            animation: "fadeInUp 0.8s ease forwards",
            animationDelay: "0.6s",
            opacity: 0,
          }}
        >
          <CountdownTimer />
        </div>
      </section>

      {/* Divider */}
      <div className="mx-auto max-w-2xl px-6">
        <div className="border-t border-neutral-200" />
      </div>

      {/* Our Story — vertical line accent on left */}
      <section className="mx-auto max-w-2xl px-6 py-36 sm:py-48">
        <div
          className="mb-16"
          style={{
            animation: "fadeInUp 0.8s ease forwards",
            animationDelay: "0.1s",
            opacity: 0,
          }}
        >
          <h2
            className="text-[3rem] font-light leading-[0.9] tracking-[-0.04em] text-neutral-900 sm:text-[4.5rem]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {weddingConfig.ourStory.title}
          </h2>
        </div>

        {/* Milestones with left vertical line */}
        <div className="relative border-l border-neutral-200 pl-8 sm:pl-12">
          {/* The vertical line is the border-l itself */}
          <div className="space-y-20 sm:space-y-28">
            {weddingConfig.ourStory.milestones.map((milestone, i) => (
              <div
                key={milestone.year}
                style={{
                  animation: "fadeInUp 0.8s ease forwards",
                  animationDelay: `${0.15 + i * 0.12}s`,
                  opacity: 0,
                }}
              >
                {/* Year — oversized display */}
                <p
                  className="text-[3.5rem] font-light leading-none tracking-[-0.04em] text-neutral-200 sm:text-[5rem]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {milestone.year}
                </p>

                {/* Title */}
                <h3
                  className="mt-3 text-sm font-normal tracking-[-0.01em] text-neutral-900"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {milestone.title}
                </h3>

                {/* Description */}
                <p
                  className="mt-2 max-w-sm text-sm font-light leading-relaxed text-neutral-400"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {milestone.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="mx-auto max-w-2xl px-6">
        <div className="border-t border-neutral-200" />
      </div>

      {/* RSVP CTA — just a text link, editorial */}
      <section className="mx-auto max-w-2xl px-6 py-36 sm:py-48">
        <div
          style={{
            animation: "fadeInUp 0.8s ease forwards",
            animationDelay: "0.1s",
            opacity: 0,
          }}
        >
          <p
            className="mb-4 text-[0.65rem] uppercase tracking-[0.25em] text-neutral-300"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Join us
          </p>
          <Link
            href="/1/rsvp"
            className="group inline-flex items-baseline gap-3"
          >
            <span
              className="text-[1.8rem] font-light tracking-[-0.03em] text-neutral-900 underline decoration-neutral-200 underline-offset-8 transition-all duration-500 group-hover:decoration-neutral-900 sm:text-[2.5rem]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Let us know if you can make it
            </span>
            <span
              className="text-xl text-neutral-300 transition-all duration-500 group-hover:translate-x-1 group-hover:text-neutral-900"
              aria-hidden
            >
              &rarr;
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}
