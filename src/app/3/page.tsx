import Link from "next/link";
import { CountdownTimer } from "@/components/countdown-timer";
import { Button } from "@/components/ui/button";
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
    <>
      {/* ═══ SCENE 1 — Hero ═══ */}
      <section className="relative flex min-h-[80vh] items-center justify-center bg-neutral-950 overflow-hidden">
        {/* Subtle noise grain overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
          }}
        />

        <div className="relative z-10 px-6 text-center">
          {/* Tagline */}
          <p
            className="text-[10px] font-light uppercase tracking-[0.4em] text-neutral-500"
            style={{
              animation: "fadeInUp 1s ease forwards",
              animationDelay: "0.2s",
              opacity: 0,
            }}
          >
            {weddingConfig.tagline}
          </p>

          {/* Names — massive Italiana */}
          <h1
            className="mt-10 text-5xl uppercase leading-[1.1] tracking-[0.3em] text-white sm:text-7xl lg:text-[6rem]"
            style={{
              fontFamily: "var(--font-display)",
              animation: "fadeInUp 1.2s ease forwards",
              animationDelay: "0.5s",
              opacity: 0,
            }}
          >
            {person1.firstName}
            <span className="block text-[0.5em] tracking-[0.5em] text-neutral-600">
              &
            </span>
            {person2.firstName}
          </h1>

          {/* Animated rule */}
          <div className="mx-auto mt-12 overflow-hidden">
            <div
              className="mx-auto h-[2px] bg-neutral-400"
              style={{
                animation: "grow 0.8s ease forwards",
                animationDelay: "1.2s",
                width: 0,
                maxWidth: "6rem",
              }}
            />
          </div>

          {/* Date */}
          <p
            className="mt-10 text-[11px] font-light uppercase tracking-[0.3em] text-neutral-400"
            style={{
              animation: "fadeInUp 1s ease forwards",
              animationDelay: "1.5s",
              opacity: 0,
            }}
          >
            {formattedDate}
          </p>

          {/* Venue */}
          <p
            className="mt-3 text-[10px] tracking-[0.2em] text-neutral-600"
            style={{
              animation: "fadeInUp 1s ease forwards",
              animationDelay: "1.8s",
              opacity: 0,
            }}
          >
            {weddingConfig.venue.ceremony.name}
          </p>
        </div>
      </section>

      {/* ═══ SCENE 2 — Countdown ═══ */}
      <section className="bg-stone-50 py-32 sm:py-48">
        <div
          className="mx-auto max-w-4xl px-6 text-center"
          style={{
            animation: "fadeInUp 1s ease forwards",
            animationDelay: "0.3s",
            opacity: 0,
          }}
        >
          <h2
            className="text-[11px] uppercase tracking-[0.3em] text-neutral-400"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Counting Down
          </h2>
          <div className="mt-12">
            <CountdownTimer />
          </div>
        </div>
      </section>

      {/* ═══ SCENE 3 — Our Story Intro ═══ */}
      <section className="relative bg-neutral-950 py-32 sm:py-48 overflow-hidden">
        {/* Noise overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
          }}
        />
        <div
          className="relative z-10 mx-auto max-w-4xl px-6 text-center"
          style={{
            animation: "fadeInUp 1s ease forwards",
            animationDelay: "0.3s",
            opacity: 0,
          }}
        >
          <h2
            className="text-4xl uppercase tracking-[0.3em] text-white sm:text-5xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {weddingConfig.ourStory.title}
          </h2>
          {/* Animated rule */}
          <div className="mx-auto mt-12 overflow-hidden">
            <div
              className="mx-auto h-[2px] bg-neutral-700"
              style={{
                animation: "grow 0.8s ease forwards",
                animationDelay: "0.8s",
                width: 0,
                maxWidth: "4rem",
              }}
            />
          </div>
        </div>
      </section>

      {/* ═══ SCENES 4+ — Story Milestones ═══ */}
      {weddingConfig.ourStory.milestones.map((milestone, index) => {
        const isDark = index % 2 === 0;
        const delay = `${0.2 + index * 0.1}s`;

        return (
          <section
            key={milestone.year}
            className={`relative py-32 sm:py-40 overflow-hidden ${
              isDark ? "bg-neutral-950" : "bg-stone-50"
            }`}
          >
            {/* Noise for dark sections */}
            {isDark && (
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
                  backgroundRepeat: "repeat",
                }}
              />
            )}

            <div
              className="relative z-10 mx-auto max-w-4xl px-6"
              style={{
                animation: "fadeInUp 1s ease forwards",
                animationDelay: delay,
                opacity: 0,
              }}
            >
              {/* Massive year — cinematic display */}
              <p
                className={`text-[5rem] leading-none sm:text-[7rem] lg:text-[8rem] ${
                  isDark ? "text-neutral-800" : "text-neutral-200"
                }`}
                style={{ fontFamily: "var(--font-display)" }}
              >
                {milestone.year}
              </p>

              {/* Title + description — asymmetric left alignment */}
              <h3
                className={`mt-6 text-xl uppercase tracking-[0.15em] sm:text-2xl ${
                  isDark ? "text-white" : "text-neutral-900"
                }`}
                style={{ fontFamily: "var(--font-display)" }}
              >
                {milestone.title}
              </h3>
              <p
                className={`mt-4 max-w-xl text-sm font-light leading-relaxed ${
                  isDark ? "text-neutral-400" : "text-neutral-500"
                }`}
              >
                {milestone.description}
              </p>
            </div>
          </section>
        );
      })}

      {/* ═══ FINAL SCENE — RSVP CTA ═══ */}
      <section className="relative bg-neutral-950 py-32 sm:py-48 overflow-hidden">
        {/* Noise overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
          }}
        />

        <div
          className="relative z-10 mx-auto max-w-4xl px-6 text-center"
          style={{
            animation: "fadeInUp 1s ease forwards",
            animationDelay: "0.3s",
            opacity: 0,
          }}
        >
          <h2
            className="text-4xl uppercase tracking-[0.3em] text-white sm:text-5xl lg:text-6xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Join Us
          </h2>
          <p className="mt-8 text-sm font-light text-neutral-400">
            We would be honored to have you celebrate with us.
          </p>

          <Button
            asChild
            size="lg"
            className="mt-12 rounded-none border border-white bg-transparent px-14 py-7 text-[11px] uppercase tracking-[0.25em] text-white transition-all duration-300 hover:bg-white hover:text-neutral-950"
          >
            <Link href="/3/rsvp">RSVP Now</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
