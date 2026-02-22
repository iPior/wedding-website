import { weddingConfig } from "../../../wedding.config";
import { CountdownTimer } from "@/components/countdown-timer";
import Link from "next/link";

function OrnamentalDivider({ delay = "0s" }: { delay?: string }) {
  return (
    <div
      className="flex items-center justify-center gap-4 py-2"
      style={{
        animation: "scaleIn 1.2s ease-out forwards",
        animationDelay: delay,
        opacity: 0,
      }}
    >
      <div className="h-px flex-1 max-w-20 bg-neutral-300/50" />
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        className="text-neutral-300"
      >
        <path
          d="M7 1 L8.5 5.5 L13 7 L8.5 8.5 L7 13 L5.5 8.5 L1 7 L5.5 5.5 Z"
          fill="currentColor"
        />
      </svg>
      <div className="h-px flex-1 max-w-20 bg-neutral-300/50" />
    </div>
  );
}

export default function Variant5Home() {
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
      <section className="space-y-6 pt-4">
        <h1
          className="font-[family-name:var(--font-display)] text-5xl font-light leading-tight tracking-wide text-neutral-800 sm:text-6xl md:text-7xl"
          style={{
            animation: "fadeIn 1.2s ease-out forwards",
            opacity: 0,
          }}
        >
          {person1.firstName}
        </h1>

        {/* Ornamental flourish between names */}
        <div
          className="flex items-center justify-center gap-3"
          style={{
            animation: "scaleIn 1s ease-out 0.3s forwards",
            opacity: 0,
          }}
        >
          <div className="h-px w-16 bg-neutral-300/60" />
          <span className="font-[family-name:var(--font-display)] text-lg font-light text-neutral-400">
            &amp;
          </span>
          <div className="h-px w-16 bg-neutral-300/60" />
        </div>

        <h1
          className="font-[family-name:var(--font-display)] text-5xl font-light leading-tight tracking-wide text-neutral-800 sm:text-6xl md:text-7xl"
          style={{
            animation: "fadeIn 1.2s ease-out 0.4s forwards",
            opacity: 0,
          }}
        >
          {person2.firstName}
        </h1>

        <p
          className="font-[family-name:var(--font-body)] text-lg italic text-neutral-500"
          style={{
            animation: "fadeIn 1s ease-out 0.6s forwards",
            opacity: 0,
          }}
        >
          {formattedDate}
        </p>

        <p
          className="font-[family-name:var(--font-body)] text-base italic text-neutral-400"
          style={{
            animation: "fadeIn 1s ease-out 0.8s forwards",
            opacity: 0,
          }}
        >
          {tagline}
        </p>
      </section>

      {/* Countdown */}
      <div
        style={{
          animation: "fadeIn 1s ease-out 1s forwards",
          opacity: 0,
        }}
      >
        <CountdownTimer />
      </div>

      <OrnamentalDivider delay="1.1s" />

      {/* Our Story */}
      <section
        className="space-y-12"
        style={{
          animation: "fadeIn 1s ease-out 1.2s forwards",
          opacity: 0,
        }}
      >
        <div className="space-y-4">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-light tracking-wide text-neutral-800 sm:text-4xl">
            {ourStory.title}
          </h2>
        </div>

        <div className="space-y-14">
          {ourStory.milestones.map((milestone, index) => (
            <div
              key={milestone.year}
              className="space-y-3"
              style={{
                animation: "fadeIn 1s ease-out forwards",
                animationDelay: `${1.4 + index * 0.2}s`,
                opacity: 0,
              }}
            >
              {/* Year marker — elegant treatment */}
              <p className="font-[family-name:var(--font-display)] text-sm font-semibold uppercase tracking-[0.25em] text-neutral-400">
                <span className="inline-block w-8 border-t border-neutral-300/50 align-middle" />
                <span className="mx-3">{milestone.year}</span>
                <span className="inline-block w-8 border-t border-neutral-300/50 align-middle" />
              </p>
              <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold tracking-wide text-neutral-700">
                {milestone.title}
              </h3>
              <p className="mx-auto max-w-sm font-[family-name:var(--font-body)] text-sm leading-relaxed text-neutral-500">
                {milestone.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <OrnamentalDivider delay="2s" />

      {/* RSVP CTA */}
      <section
        className="space-y-6"
        style={{
          animation: "fadeIn 1s ease-out 2.2s forwards",
          opacity: 0,
        }}
      >
        <p className="font-[family-name:var(--font-body)] text-base italic text-neutral-500">
          We would be honored by your presence.
        </p>
        <Link
          href="/5/rsvp"
          className="inline-block border border-neutral-300 bg-transparent px-10 py-3.5 font-[family-name:var(--font-display)] text-sm uppercase tracking-[0.2em] text-neutral-700 transition-all duration-300 hover:border-neutral-500 hover:bg-neutral-800 hover:text-white"
        >
          Respond
        </Link>
      </section>
    </div>
  );
}
