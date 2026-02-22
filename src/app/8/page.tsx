import { weddingConfig } from "../../../wedding.config";
import { CountdownTimer } from "@/components/countdown-timer";
import Link from "next/link";
import { Button } from "@/components/ui/button";

function WaveDivider({ delay = "0s" }: { delay?: string }) {
  return (
    <div
      className="flex justify-center py-4"
      style={{
        animation: "fadeIn 0.9s ease-in-out forwards",
        animationDelay: delay,
        opacity: 0,
      }}
    >
      <svg viewBox="0 0 1200 40" className="h-8 w-full max-w-xl text-[#D0DDE3]">
        <path
          d="M0,20 Q150,0 300,20 T600,20 T900,20 T1200,20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        />
      </svg>
    </div>
  );
}

export default function Variant8Home() {
  const { couple, date, tagline, ourStory } = weddingConfig;
  const { person1, person2 } = couple;
  const weddingDate = new Date(date);
  const formattedDate = weddingDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div>
      {/* Hero — ocean-blue radial gradient */}
      <section
        className="relative px-6 py-28 text-center sm:py-36"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(168,197,214,0.2) 0%, transparent 60%)",
        }}
      >
        <h1
          className="font-[family-name:var(--font-display)] text-5xl leading-tight tracking-wide text-[#4A7C8A] sm:text-6xl"
          style={{
            animation: "fadeInUp 0.9s ease-in-out forwards",
            opacity: 0,
          }}
        >
          {person1.firstName}
          <span className="mx-3 text-[#A8C5D6]">&amp;</span>
          {person2.firstName}
        </h1>

        <p
          className="mt-5 font-[family-name:var(--font-body)] text-base font-light tracking-wide text-[#6B7F8A]"
          style={{
            animation: "fadeInUp 0.9s ease-in-out forwards",
            animationDelay: "0.15s",
            opacity: 0,
          }}
        >
          {formattedDate}
        </p>

        <p
          className="mt-3 font-[family-name:var(--font-body)] text-sm font-light italic tracking-wider text-[#6B7F8A]/70"
          style={{
            animation: "fadeInUp 0.9s ease-in-out forwards",
            animationDelay: "0.3s",
            opacity: 0,
          }}
        >
          {tagline}
        </p>

        <div className="mt-10">
          <WaveDivider delay="0.45s" />
        </div>
      </section>

      {/* Countdown */}
      <section className="mx-auto max-w-4xl px-6 py-12 text-center">
        <div
          style={{
            animation: "fadeInUp 0.9s ease-in-out forwards",
            animationDelay: "0.6s",
            opacity: 0,
          }}
        >
          <CountdownTimer />
        </div>
      </section>

      <WaveDivider delay="0.75s" />

      {/* Our Story */}
      <section className="mx-auto max-w-4xl px-6 py-24">
        <div
          className="space-y-4 text-center"
          style={{
            animation: "fadeInUp 0.9s ease-in-out forwards",
            animationDelay: "0.9s",
            opacity: 0,
          }}
        >
          <h2 className="font-[family-name:var(--font-display)] text-3xl tracking-wide text-[#4A7C8A] sm:text-4xl">
            {ourStory.title}
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative mt-16 space-y-0">
          {/* Vertical line */}
          <div className="absolute left-4 top-0 h-full w-px bg-[#A8C5D6]/50 sm:left-1/2 sm:-translate-x-px" />

          {ourStory.milestones.map((milestone, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={milestone.year}
                className="relative flex items-start gap-8 py-8"
                style={{
                  animation: "fadeInUp 0.9s ease-in-out forwards",
                  animationDelay: `${1.05 + index * 0.15}s`,
                  opacity: 0,
                }}
              >
                {/* Dot */}
                <div className="absolute left-4 top-10 z-10 -translate-x-1/2 sm:left-1/2">
                  <div className="size-3 rounded-full border-2 border-[#A8C5D6] bg-[#F5F8FA]" />
                </div>

                {/* Content — alternating sides on desktop */}
                <div
                  className={`ml-10 sm:ml-0 sm:w-1/2 ${
                    isEven
                      ? "sm:pr-12 sm:text-right"
                      : "sm:ml-auto sm:pl-12 sm:text-left"
                  }`}
                >
                  <span className="font-[family-name:var(--font-display)] text-sm tracking-[0.15em] text-[#4A7C8A]">
                    {milestone.year}
                  </span>
                  <h3 className="mt-1 font-[family-name:var(--font-display)] text-xl tracking-wide text-[#1E3A42]">
                    {milestone.title}
                  </h3>
                  <p className="mt-2 max-w-sm font-[family-name:var(--font-body)] text-sm font-light leading-relaxed text-[#6B7F8A]">
                    {milestone.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* RSVP CTA — deep ocean */}
      <section className="bg-[#1E3A42] px-6 py-24 text-center">
        <div className="mx-auto max-w-4xl">
          <p
            className="font-[family-name:var(--font-body)] text-base font-light tracking-wide text-[#A8C5D6]"
            style={{
              animation: "fadeInUp 0.9s ease-in-out forwards",
              animationDelay: "0.15s",
              opacity: 0,
            }}
          >
            We would be honored by your presence.
          </p>
          <div
            className="mt-8"
            style={{
              animation: "fadeInUp 0.9s ease-in-out forwards",
              animationDelay: "0.3s",
              opacity: 0,
            }}
          >
            <Link href="/8/rsvp">
              <Button className="rounded-full bg-[#D4956A] px-12 py-3 font-[family-name:var(--font-body)] text-xs font-medium uppercase tracking-[0.2em] text-white shadow-none transition-all duration-500 hover:bg-[#c0844e] hover:shadow-[0_4px_24px_rgba(212,149,106,0.3)]">
                RSVP Now
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
