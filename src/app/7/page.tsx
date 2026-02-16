import { weddingConfig } from "../../../wedding.config";
import { CountdownTimer } from "@/components/countdown-timer";
import Link from "next/link";

function GradientDivider({ delay = "0s" }: { delay?: string }) {
  return (
    <div
      className="flex items-center justify-center py-2"
      style={{
        animation: "fadeIn 1.2s ease-out forwards",
        animationDelay: delay,
        opacity: 0,
      }}
    >
      <div
        className="h-px w-32 sm:w-48"
        style={{
          background:
            "linear-gradient(to right, transparent, #C47D5A, #E8B87D, transparent)",
        }}
      />
    </div>
  );
}

export default function Variant7Home() {
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
    <div className="space-y-20 text-center">
      {/* Hero */}
      <section className="relative space-y-5 pt-4">
        {/* Date label floating above */}
        <p
          className="font-[family-name:var(--font-body)] text-xs font-semibold uppercase tracking-[0.25em] text-[#E8B87D]"
          style={{
            animation: "fadeInUp 1s ease-out forwards",
            opacity: 0,
          }}
        >
          {formattedDate}
        </p>

        {/* Name 1 */}
        <h1
          className="font-[family-name:var(--font-display)] text-5xl leading-tight tracking-wide text-[#C47D5A] sm:text-7xl"
          style={{
            animation: "fadeInUp 1s ease-out 0.2s forwards",
            opacity: 0,
          }}
        >
          {person1.firstName}
        </h1>

        {/* Ampersand in lavender */}
        <p
          className="font-[family-name:var(--font-display)] text-3xl text-[#D4A8C8] sm:text-4xl"
          style={{
            animation: "fadeIn 1s ease-out 0.35s forwards",
            opacity: 0,
          }}
        >
          &amp;
        </p>

        {/* Name 2 */}
        <h1
          className="font-[family-name:var(--font-display)] text-5xl leading-tight tracking-wide text-[#C47D5A] sm:text-7xl"
          style={{
            animation: "fadeInUp 1s ease-out 0.4s forwards",
            opacity: 0,
          }}
        >
          {person2.firstName}
        </h1>

        {/* Tagline */}
        <p
          className="font-[family-name:var(--font-body)] text-lg font-light text-[#8A7B72]"
          style={{
            animation: "fadeInUp 1s ease-out 0.6s forwards",
            opacity: 0,
          }}
        >
          {tagline}
        </p>
      </section>

      {/* Countdown */}
      <div
        style={{
          animation: "fadeInUp 1s ease-out 0.8s forwards",
          opacity: 0,
        }}
      >
        <CountdownTimer />
      </div>

      <GradientDivider delay="1s" />

      {/* Our Story */}
      <section
        className="space-y-14"
        style={{
          animation: "fadeInUp 1s ease-out 1.1s forwards",
          opacity: 0,
        }}
      >
        <div className="space-y-4">
          <h2 className="font-[family-name:var(--font-display)] text-3xl tracking-wide text-[#C47D5A] sm:text-4xl">
            {ourStory.title}
          </h2>
          <p className="mx-auto max-w-md font-[family-name:var(--font-body)] text-sm font-light leading-relaxed text-[#8A7B72]">
            {ourStory.intro}
          </p>
        </div>

        {/* Milestones — warm left border, copper years */}
        <div className="mx-auto max-w-lg space-y-10 text-left">
          {ourStory.milestones.map((milestone, index) => (
            <div
              key={milestone.year}
              className="relative border-l-2 border-[#EDD8CC] pl-8"
              style={{
                animation: "scaleEntry 1s ease-out forwards",
                animationDelay: `${1.3 + index * 0.2}s`,
                opacity: 0,
              }}
            >
              {/* Lavender dot on the timeline */}
              <div className="absolute -left-[5px] top-1 size-2 rounded-full bg-[#D4A8C8]" />

              <p className="font-[family-name:var(--font-display)] text-2xl text-[#C47D5A]">
                {milestone.year}
              </p>
              <h3 className="mt-1 font-[family-name:var(--font-body)] text-sm font-semibold uppercase tracking-[0.1em] text-[#3D2E2A]">
                {milestone.title}
              </h3>
              <p className="mt-2 font-[family-name:var(--font-body)] text-sm font-light leading-relaxed text-[#8A7B72]">
                {milestone.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <GradientDivider delay="2s" />

      {/* RSVP CTA — dark chocolate section */}
      <section className="-mx-6 rounded-xl bg-[#3D2E2A] px-8 py-16 sm:px-12">
        <p
          className="font-[family-name:var(--font-body)] text-sm font-light tracking-wide text-[#8A7B72]"
          style={{
            animation: "fadeInUp 1s ease-out 2.2s forwards",
            opacity: 0,
          }}
        >
          We would be honored by your presence
        </p>
        <h2
          className="mt-4 font-[family-name:var(--font-display)] text-3xl tracking-wide text-[#FFF0E8] sm:text-4xl"
          style={{
            animation: "fadeInUp 1s ease-out 2.4s forwards",
            opacity: 0,
          }}
        >
          Join Our Celebration
        </h2>
        <div
          style={{
            animation: "fadeInUp 1s ease-out 2.6s forwards",
            opacity: 0,
          }}
        >
          <Link
            href="/7/rsvp"
            className="mt-8 inline-block rounded-full bg-[#E8B87D] px-10 py-3.5 font-[family-name:var(--font-body)] text-sm font-semibold uppercase tracking-[0.15em] text-[#3D2E2A] transition-all duration-400 hover:bg-[#C47D5A] hover:text-[#FFF9F5] hover:shadow-[0_0_24px_rgba(232,184,125,0.3)]"
          >
            RSVP Now
          </Link>
        </div>
      </section>
    </div>
  );
}
