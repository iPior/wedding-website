import { weddingConfig } from "../../../wedding.config";
import { CountdownTimer } from "@/components/countdown-timer";
import Link from "next/link";
import { Button } from "@/components/ui/button";

function ArtDecoDivider({ delay = "0s" }: { delay?: string }) {
  return (
    <div
      className="flex items-center justify-center gap-4 py-6"
      style={{
        animation: "fadeIn 0.6s ease-out forwards",
        animationDelay: delay,
        opacity: 0,
      }}
    >
      <div className="h-px flex-1 max-w-16 bg-[#C5D5CD]" />
      <div className="flex items-center gap-2">
        <div className="h-4 w-px bg-[#C9A84C]/60 rotate-[-20deg]" />
        <div className="h-5 w-px bg-[#C9A84C]/80" />
        <div className="h-6 w-px bg-[#C9A84C]" />
        <div className="h-7 w-px bg-[#C9A84C]" />
        <div className="h-6 w-px bg-[#C9A84C]" />
        <div className="h-5 w-px bg-[#C9A84C]/80" />
        <div className="h-4 w-px bg-[#C9A84C]/60 rotate-[20deg]" />
      </div>
      <div className="h-px flex-1 max-w-16 bg-[#C5D5CD]" />
    </div>
  );
}

function GeometricDiamondDivider({ delay = "0s" }: { delay?: string }) {
  return (
    <div
      className="flex items-center justify-center gap-4"
      style={{
        animation: "growLine 0.6s ease-out forwards",
        animationDelay: delay,
        opacity: 0,
        animationFillMode: "forwards",
      }}
    >
      <div className="h-px flex-1 bg-[#C5D5CD]" />
      <div className="size-3 rotate-45 border border-[#C9A84C]" />
      <div className="h-px flex-1 bg-[#C5D5CD]" />
    </div>
  );
}

export default function Variant10Home() {
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
      {/* Subtle geometric background pattern */}
      <div
        className="fixed inset-0 pointer-events-none -z-10 opacity-[0.03]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 59px,
            #2D4A3E 59px,
            #2D4A3E 60px
          ),
          repeating-linear-gradient(
            90deg,
            transparent,
            transparent 59px,
            #2D4A3E 59px,
            #2D4A3E 60px
          )`,
        }}
      />

      {/* Hero */}
      <section className="relative px-6 py-28 text-center sm:py-40">
        {/* Geometric corner accents */}
        <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-[#C9A84C]/30 hidden sm:block" />
        <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-[#C9A84C]/30 hidden sm:block" />
        <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-[#C9A84C]/30 hidden sm:block" />
        <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-[#C9A84C]/30 hidden sm:block" />

        <p
          className="font-[family-name:var(--font-body)] text-xs font-light uppercase tracking-[0.3em] text-[#C9A84C]"
          style={{
            animation: "fadeIn 0.6s ease-out forwards",
            opacity: 0,
          }}
        >
          {tagline}
        </p>

        <h1
          className="mt-6 font-[family-name:var(--font-display)] text-5xl leading-tight text-[#2D4A3E] sm:text-7xl"
          style={{
            animation: "fadeInUp 0.6s ease-out forwards",
            animationDelay: "0.15s",
            opacity: 0,
          }}
        >
          {person1.firstName}
          <span className="mx-3 inline-block text-[#C9A84C] sm:mx-4">&#9671;</span>
          {person2.firstName}
        </h1>

        <p
          className="mt-6 font-[family-name:var(--font-body)] text-sm font-light uppercase tracking-[0.2em] text-[#6B7B74]"
          style={{
            animation: "fadeInUp 0.6s ease-out forwards",
            animationDelay: "0.3s",
            opacity: 0,
          }}
        >
          {formattedDate}
        </p>

        <ArtDecoDivider delay="0.45s" />
      </section>

      {/* Countdown */}
      <section className="mx-auto max-w-4xl px-6 pb-16 text-center">
        <div
          style={{
            animation: "fadeInUp 0.6s ease-out forwards",
            animationDelay: "0.6s",
            opacity: 0,
          }}
        >
          <CountdownTimer />
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-6">
        <GeometricDiamondDivider delay="0.75s" />
      </div>

      {/* Our Story */}
      <section className="mx-auto max-w-4xl px-6 py-20">
        <div
          className="text-center"
          style={{
            animation: "fadeInUp 0.6s ease-out forwards",
            animationDelay: "0.15s",
            opacity: 0,
          }}
        >
          <h2 className="font-[family-name:var(--font-display)] text-3xl tracking-wide text-[#2D4A3E] sm:text-4xl">
            {ourStory.title}
          </h2>
          <p className="mx-auto mt-4 max-w-md font-[family-name:var(--font-body)] text-sm font-light leading-relaxed text-[#6B7B74]">
            {ourStory.intro}
          </p>
        </div>

        {/* Milestones — 2-col grid with gold accents */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {ourStory.milestones.map((milestone, index) => (
            <div
              key={milestone.year}
              className="relative border-l-2 border-[#C9A84C]/60 bg-[#EFF5F1] p-6 pl-8"
              style={{
                animation: "slideUp 0.6s ease-out forwards",
                animationDelay: `${0.3 + index * 0.15}s`,
                opacity: 0,
              }}
            >
              {/* Geometric corner top-right */}
              <div className="absolute top-0 right-0 w-6 h-6 border-r border-t border-[#C9A84C]/30" />

              <span className="font-[family-name:var(--font-display)] text-2xl text-[#C9A84C]">
                {milestone.year}
              </span>
              <h3 className="mt-2 font-[family-name:var(--font-display)] text-lg tracking-wide text-[#2D4A3E]">
                {milestone.title}
              </h3>
              <p className="mt-2 font-[family-name:var(--font-body)] text-sm font-light leading-relaxed text-[#6B7B74]">
                {milestone.description}
              </p>
            </div>
          ))}
        </div>

        {/* Geometric dots between sections */}
        <div className="mt-12 flex items-center justify-center gap-3">
          <div className="size-1.5 rotate-45 bg-[#C9A84C]/40" />
          <div className="size-2 rotate-45 bg-[#C9A84C]/60" />
          <div className="size-1.5 rotate-45 bg-[#C9A84C]/40" />
        </div>
      </section>

      {/* RSVP CTA — dark forest */}
      <section className="relative bg-[#1A2E26] px-6 py-24 text-center">
        {/* Geometric border frame */}
        <div className="absolute inset-6 border border-[#C9A84C]/20 pointer-events-none hidden sm:block" />
        <div className="absolute inset-8 border border-[#C9A84C]/10 pointer-events-none hidden sm:block" />

        <div className="relative mx-auto max-w-4xl">
          <p
            className="font-[family-name:var(--font-body)] text-sm font-light uppercase tracking-[0.2em] text-[#B5CDC3]/80"
            style={{
              animation: "fadeInUp 0.6s ease-out forwards",
              animationDelay: "0.15s",
              opacity: 0,
            }}
          >
            We would be honored by your presence
          </p>

          <ArtDecoDivider delay="0.3s" />

          <div
            className="mt-4"
            style={{
              animation: "fadeInUp 0.6s ease-out forwards",
              animationDelay: "0.45s",
              opacity: 0,
            }}
          >
            <Link href="/10/rsvp">
              <Button className="border-2 border-[#C9A84C] bg-transparent px-12 py-3 font-[family-name:var(--font-body)] text-xs font-medium uppercase tracking-[0.2em] text-[#C9A84C] shadow-none transition-all duration-500 hover:bg-[#C9A84C] hover:text-[#1A2E26]">
                RSVP Now
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
