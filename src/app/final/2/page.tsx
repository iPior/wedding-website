import Link from "next/link";
import { CountdownTimer } from "@/components/countdown-timer";
import { Button } from "@/components/ui/button";
import { weddingConfig } from "../../../../wedding.config";

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
      <section className="flex min-h-[50vh] items-center justify-center bg-[#fff8f8] px-6 text-center">
        <div>
          <p
            className="text-[10px] font-light uppercase tracking-[0.4em] text-[#8a7f7f]"
            style={{
              animation: "fadeInUp 1s ease forwards",
              animationDelay: "0.2s",
              opacity: 0,
            }}
          >
            {weddingConfig.tagline}
          </p>

          <h1
            className="mt-8 text-5xl uppercase leading-[1.1] tracking-[0.3em] text-[#2c2424] sm:text-7xl lg:text-[6rem]"
            style={{
              fontFamily: "var(--font-display)",
              animation: "fadeInUp 1.2s ease forwards",
              animationDelay: "0.5s",
              opacity: 0,
            }}
          >
            {person1.firstName}
            <span className="block text-[0.5em] tracking-[0.5em] text-[#d4a0b0]">
              &
            </span>
            {person2.firstName}
          </h1>

          <div className="mx-auto mt-8 overflow-hidden">
            <div
              className="mx-auto h-[2px] bg-[#d4a0b0]"
              style={{
                animation: "grow 0.8s ease forwards",
                animationDelay: "1.2s",
                width: 0,
                maxWidth: "6rem",
              }}
            />
          </div>

          <p
            className="mt-6 text-[11px] font-light uppercase tracking-[0.3em] text-[#8a7f7f]"
            style={{
              animation: "fadeInUp 1s ease forwards",
              animationDelay: "1.5s",
              opacity: 0,
            }}
          >
            {formattedDate}
          </p>

          <p
            className="mt-2 text-[10px] tracking-[0.2em] text-[#8a7f7f]/60"
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
      <section className="border-t border-[#f0e0e4] bg-[#fff8f8] py-16 sm:py-20">
        <div
          className="mx-auto max-w-4xl px-6 text-center"
          style={{
            animation: "fadeInUp 1s ease forwards",
            animationDelay: "0.3s",
            opacity: 0,
          }}
        >
          <h2
            className="text-[11px] uppercase tracking-[0.3em] text-[#d4a0b0]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Counting Down
          </h2>
          <div className="mt-8">
            <CountdownTimer />
          </div>
        </div>
      </section>

      {/* ═══ SCENE 3 — Our Story Intro ═══ */}
      <section className="border-t border-[#f0e0e4] bg-[#fff8f8] py-16 sm:py-20">
        <div
          className="mx-auto max-w-4xl px-6 text-center"
          style={{
            animation: "fadeInUp 1s ease forwards",
            animationDelay: "0.3s",
            opacity: 0,
          }}
        >
          <h2
            className="text-4xl uppercase tracking-[0.3em] text-[#2c2424] sm:text-5xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {weddingConfig.ourStory.title}
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-sm font-light leading-relaxed text-[#8a7f7f]">
            {weddingConfig.ourStory.intro}
          </p>
          <div className="mx-auto mt-8 overflow-hidden">
            <div
              className="mx-auto h-[2px] bg-[#f0e0e4]"
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
        const delay = `${0.2 + index * 0.1}s`;

        return (
          <section
            key={milestone.year}
            className="border-t border-[#f0e0e4] bg-[#fff8f8] py-12 sm:py-16"
          >
            <div
              className="mx-auto max-w-4xl px-6"
              style={{
                animation: "fadeInUp 1s ease forwards",
                animationDelay: delay,
                opacity: 0,
              }}
            >
              <p
                className="text-[5rem] leading-none text-[#f0e0e4] sm:text-[7rem] lg:text-[8rem]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {milestone.year}
              </p>

              <h3
                className="mt-4 text-xl uppercase tracking-[0.15em] text-[#2c2424] sm:text-2xl"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {milestone.title}
              </h3>
              <p className="mt-3 max-w-xl text-sm font-light leading-relaxed text-[#8a7f7f]">
                {milestone.description}
              </p>
            </div>
          </section>
        );
      })}

      {/* ═══ FINAL SCENE — RSVP CTA ═══ */}
      <section className="border-t border-[#f0e0e4] bg-[#fff8f8] py-16 sm:py-20">
        <div
          className="mx-auto max-w-4xl px-6 text-center"
          style={{
            animation: "fadeInUp 1s ease forwards",
            animationDelay: "0.3s",
            opacity: 0,
          }}
        >
          <h2
            className="text-4xl uppercase tracking-[0.3em] text-[#2c2424] sm:text-5xl lg:text-6xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Join Us
          </h2>
          <p className="mt-6 text-sm font-light text-[#8a7f7f]">
            We would be honored to have you celebrate with us.
          </p>

          <Button
            asChild
            size="lg"
            className="mt-10 rounded-none border border-[#d4a0b0] bg-transparent px-14 py-7 text-[11px] uppercase tracking-[0.25em] text-[#d4a0b0] transition-all duration-300 hover:bg-[#d4a0b0] hover:text-white"
          >
            <Link href="/final/2/rsvp">RSVP Now</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
