import { weddingConfig } from "../../../wedding.config";
import { CountdownTimer } from "@/components/countdown-timer";
import Link from "next/link";

const NOISE_BG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`;

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
      <div className="h-px max-w-20 flex-1 bg-neutral-300/50" />
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
      <div className="h-px max-w-20 flex-1 bg-neutral-300/50" />
    </div>
  );
}

export default function Variant12Home() {
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
      {/* ═══ SECTION 1 — Dark Cinematic Hero (from Variant 3) ═══ */}
      <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-neutral-950">
        {/* Noise grain overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: NOISE_BG,
            backgroundRepeat: "repeat",
          }}
        />

        <div className="relative z-10 px-6 text-center">
          {/* Tagline */}
          <p
            className="font-[family-name:var(--font-body)] text-[10px] font-light uppercase tracking-[0.4em] text-neutral-500"
            style={{
              animation: "fadeInUp 1s ease forwards",
              animationDelay: "0.2s",
              opacity: 0,
            }}
          >
            {tagline}
          </p>

          {/* Name 1 */}
          <h1
            className="mt-10 font-[family-name:var(--font-display)] text-5xl font-light leading-tight tracking-wide text-white sm:text-6xl md:text-7xl"
            style={{
              animation: "fadeInUp 1.2s ease forwards",
              animationDelay: "0.5s",
              opacity: 0,
            }}
          >
            {person1.firstName}
          </h1>

          {/* Ornamental ampersand with horizontal lines (v5 style on dark) */}
          <div
            className="mt-6 flex items-center justify-center gap-3"
            style={{
              animation: "scaleIn 1s ease forwards",
              animationDelay: "0.8s",
              opacity: 0,
            }}
          >
            <div className="h-px w-16 bg-neutral-600" />
            <span className="font-[family-name:var(--font-display)] text-lg font-light text-neutral-500">
              &amp;
            </span>
            <div className="h-px w-16 bg-neutral-600" />
          </div>

          {/* Name 2 */}
          <h1
            className="mt-6 font-[family-name:var(--font-display)] text-5xl font-light leading-tight tracking-wide text-white sm:text-6xl md:text-7xl"
            style={{
              animation: "fadeInUp 1.2s ease forwards",
              animationDelay: "1s",
              opacity: 0,
            }}
          >
            {person2.firstName}
          </h1>

          {/* Animated rule (from v3) */}
          <div className="mx-auto mt-12 overflow-hidden">
            <div
              className="mx-auto h-[2px] bg-neutral-400"
              style={{
                animation: "grow 0.8s ease forwards",
                animationDelay: "1.4s",
                width: 0,
                maxWidth: "6rem",
              }}
            />
          </div>

          {/* Date */}
          <p
            className="mt-10 font-[family-name:var(--font-body)] text-[11px] font-light uppercase italic tracking-[0.3em] text-neutral-400"
            style={{
              animation: "fadeInUp 1s ease forwards",
              animationDelay: "1.7s",
              opacity: 0,
            }}
          >
            {formattedDate}
          </p>
        </div>
      </section>

      {/* ═══ SECTION 2 — Countdown (light, constrained) ═══ */}
      <section className="bg-[#FDFBF7]">
        <div className="mx-auto max-w-2xl px-6 py-20 text-center">
          <p
            className="font-[family-name:var(--font-display)] text-[11px] uppercase tracking-[0.3em] text-neutral-400"
            style={{
              animation: "fadeIn 1s ease-out forwards",
              animationDelay: "0.3s",
              opacity: 0,
            }}
          >
            Counting Down
          </p>
          <div
            className="mt-10"
            style={{
              animation: "fadeIn 1s ease-out 0.5s forwards",
              opacity: 0,
            }}
          >
            <CountdownTimer />
          </div>
          <div className="mt-12">
            <OrnamentalDivider delay="0.7s" />
          </div>
        </div>
      </section>

      {/* ═══ SECTION 3 — Our Story (v7 timeline style) ═══ */}
      <section className="bg-[#FDFBF7]">
        <div className="mx-auto max-w-2xl px-6 py-20 text-center">
          {/* Heading */}
          <h2
            className="font-[family-name:var(--font-display)] text-3xl font-light tracking-wide text-neutral-800 sm:text-4xl"
            style={{
              animation: "fadeIn 1s ease-out forwards",
              animationDelay: "0.2s",
              opacity: 0,
            }}
          >
            {ourStory.title}
          </h2>
          <p
            className="mx-auto mt-4 max-w-md font-[family-name:var(--font-body)] text-sm italic leading-relaxed text-neutral-500"
            style={{
              animation: "fadeIn 1s ease-out 0.4s forwards",
              opacity: 0,
            }}
          >
            {ourStory.intro}
          </p>

          <div className="mt-6">
            <OrnamentalDivider delay="0.5s" />
          </div>

          {/* Timeline (from v7) */}
          <div className="mx-auto mt-14 max-w-lg space-y-10 text-left">
            {ourStory.milestones.map((milestone, index) => (
              <div
                key={milestone.year}
                className="relative border-l-2 border-[#DDD5CA] pl-8"
                style={{
                  animation: "fadeIn 1s ease-out forwards",
                  animationDelay: `${0.7 + index * 0.2}s`,
                  opacity: 0,
                }}
              >
                {/* Gold dot on the timeline */}
                <div className="absolute -left-[5px] top-1 size-2 rounded-full bg-[#B8976B]" />

                <p className="font-[family-name:var(--font-display)] text-2xl text-[#B8976B]">
                  {milestone.year}
                </p>
                <h3 className="mt-1 font-[family-name:var(--font-body)] text-sm font-medium uppercase tracking-[0.1em] text-neutral-800">
                  {milestone.title}
                </h3>
                <p className="mt-2 font-[family-name:var(--font-body)] text-sm leading-relaxed text-neutral-500">
                  {milestone.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SECTION 4 — Dark RSVP CTA (from Variant 3) ═══ */}
      <section className="relative overflow-hidden bg-neutral-950 py-28 sm:py-36">
        {/* Noise grain overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: NOISE_BG,
            backgroundRepeat: "repeat",
          }}
        />

        <div className="relative z-10 mx-auto max-w-2xl px-6 text-center">
          <p
            className="font-[family-name:var(--font-body)] text-sm font-light tracking-wide text-neutral-400"
            style={{
              animation: "fadeInUp 1s ease forwards",
              animationDelay: "0.2s",
              opacity: 0,
            }}
          >
            We would be honored by your presence
          </p>
          <h2
            className="mt-5 font-[family-name:var(--font-display)] text-3xl font-light tracking-wide text-white sm:text-4xl"
            style={{
              animation: "fadeInUp 1s ease forwards",
              animationDelay: "0.4s",
              opacity: 0,
            }}
          >
            Join Our Celebration
          </h2>

          {/* Animated rule */}
          <div className="mx-auto mt-8 overflow-hidden">
            <div
              className="mx-auto h-[2px] bg-neutral-700"
              style={{
                animation: "grow 0.8s ease forwards",
                animationDelay: "0.7s",
                width: 0,
                maxWidth: "4rem",
              }}
            />
          </div>

          <div
            style={{
              animation: "fadeInUp 1s ease forwards",
              animationDelay: "0.9s",
              opacity: 0,
            }}
          >
            <Link
              href="/12/rsvp"
              className="mt-10 inline-block border border-white bg-transparent px-10 py-3.5 font-[family-name:var(--font-display)] text-sm uppercase tracking-[0.2em] text-white transition-all duration-300 hover:bg-white hover:text-neutral-950"
            >
              Respond
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
