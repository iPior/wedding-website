import { weddingConfig } from "../../../wedding.config";
import { CountdownTimer } from "@/components/countdown-timer";
import Link from "next/link";
import { Button } from "@/components/ui/button";

function BotanicalDivider({ delay = "0s" }: { delay?: string }) {
  return (
    <div
      className="flex items-center justify-center gap-4 py-2"
      style={{
        animation: "scaleIn 1.2s ease-out forwards",
        animationDelay: delay,
        opacity: 0,
      }}
    >
      <div className="h-px max-w-24 flex-1 bg-[#5B7B5E]/20" />
      <span className="text-sm text-[#5B7B5E]/40">❋</span>
      <div className="h-px max-w-24 flex-1 bg-[#5B7B5E]/20" />
    </div>
  );
}

export default function Variant6Home() {
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
    <div className="space-y-20">
      {/* Hero — radial gradient background */}
      <section
        className="relative -mx-6 -mt-20 px-6 pt-24 pb-20 text-center"
        style={{
          background:
            "radial-gradient(ellipse at center, #F7F5F0 0%, #F2EDE6 60%, #EDE6DD 100%)",
        }}
      >
        <h1
          className="font-[family-name:var(--font-display)] text-5xl font-light leading-tight tracking-wide text-[#5B7B5E] sm:text-6xl"
          style={{
            animation: "fadeInUp 0.8s ease forwards",
            opacity: 0,
          }}
        >
          {person1.firstName}
          <span className="mx-3 text-[#E8C4C8]">&amp;</span>
          {person2.firstName}
        </h1>

        <p
          className="mt-5 font-[family-name:var(--font-body)] text-base italic text-[#7A7A6E]"
          style={{
            animation: "fadeInUp 0.8s ease forwards",
            animationDelay: "0.2s",
            opacity: 0,
          }}
        >
          {formattedDate}
        </p>

        <p
          className="mt-3 font-[family-name:var(--font-body)] text-sm font-light tracking-wide text-[#7A7A6E]/80"
          style={{
            animation: "fadeInUp 0.8s ease forwards",
            animationDelay: "0.4s",
            opacity: 0,
          }}
        >
          {tagline}
        </p>

        {/* Botanical divider under hero */}
        <div
          className="mt-8 flex items-center justify-center gap-3"
          style={{
            animation: "scaleIn 1.2s ease-out forwards",
            animationDelay: "0.5s",
            opacity: 0,
          }}
        >
          <div className="h-px w-16 bg-[#5B7B5E]/20" />
          <span className="text-sm text-[#5B7B5E]/40">✿</span>
          <div className="h-px w-16 bg-[#5B7B5E]/20" />
        </div>
      </section>

      {/* Countdown */}
      <div
        className="text-center"
        style={{
          animation: "fadeInUp 0.8s ease forwards",
          animationDelay: "0.6s",
          opacity: 0,
        }}
      >
        <CountdownTimer />
      </div>

      <BotanicalDivider delay="0.8s" />

      {/* Our Story */}
      <section
        className="space-y-12"
        style={{
          animation: "fadeInUp 0.8s ease forwards",
          animationDelay: "1s",
          opacity: 0,
        }}
      >
        <div className="text-center space-y-4">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-light tracking-wide text-[#5B7B5E] sm:text-4xl">
            {ourStory.title}
          </h2>
        </div>

        <div className="space-y-10">
          {ourStory.milestones.map((milestone, index) => (
            <div
              key={milestone.year}
              className="border-l-2 border-[#5B7B5E]/25 pl-6 sm:pl-8"
              style={{
                animation: "fadeInUp 0.8s ease forwards",
                animationDelay: `${1.2 + index * 0.2}s`,
                opacity: 0,
              }}
            >
              <span className="font-[family-name:var(--font-display)] text-sm font-semibold tracking-[0.15em] text-[#5B7B5E]">
                {milestone.year}
              </span>
              <h3 className="mt-1 font-[family-name:var(--font-display)] text-xl font-light italic tracking-wide text-neutral-800">
                {milestone.title}
              </h3>
              <p className="mt-2 max-w-md font-[family-name:var(--font-body)] text-sm font-light leading-relaxed text-[#7A7A6E]">
                {milestone.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <BotanicalDivider delay="2s" />

      {/* RSVP CTA */}
      <section
        className="space-y-6 text-center"
        style={{
          animation: "fadeInUp 0.8s ease forwards",
          animationDelay: "2.2s",
          opacity: 0,
        }}
      >
        <p className="font-[family-name:var(--font-body)] text-base italic text-[#7A7A6E]">
          We would be honored by your presence.
        </p>
        <Link href="/6/rsvp">
          <Button className="rounded-full bg-[#D4A574] px-10 py-3 font-[family-name:var(--font-body)] text-xs font-medium uppercase tracking-[0.2em] text-white shadow-none transition-all duration-300 hover:bg-[#5B7B5E] hover:shadow-[0_2px_20px_rgba(91,123,94,0.15)]">
            RSVP Now
          </Button>
        </Link>
      </section>
    </div>
  );
}
