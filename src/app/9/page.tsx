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

function Flourish({ className }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className ?? ""}`}>
      <div className="h-px flex-1 bg-[#DFD0D5]" />
      <span className="text-[#B8976B] text-lg">&#10087;</span>
      <div className="h-px flex-1 bg-[#DFD0D5]" />
    </div>
  );
}

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="mx-auto max-w-3xl px-6 py-20 sm:py-28 text-center">
        <h1
          className="text-5xl sm:text-6xl md:text-7xl text-[#8B6B82]"
          style={{
            fontFamily: "var(--font-display)",
            animation: "fadeInUp 1s ease forwards",
            opacity: 0,
          }}
        >
          {person1.firstName}
        </h1>

        <p
          className="my-3 text-3xl sm:text-4xl italic text-[#C9A8B5]"
          style={{
            fontFamily: "var(--font-display)",
            animation: "fadeInUp 1s ease forwards",
            animationDelay: "0.15s",
            opacity: 0,
          }}
        >
          &amp;
        </p>

        <h1
          className="text-5xl sm:text-6xl md:text-7xl text-[#8B6B82]"
          style={{
            fontFamily: "var(--font-display)",
            animation: "fadeInUp 1s ease forwards",
            animationDelay: "0.3s",
            opacity: 0,
          }}
        >
          {person2.firstName}
        </h1>

        {/* Date */}
        <p
          className="mt-8 text-lg italic text-[#B8976B]"
          style={{
            fontFamily: "var(--font-body)",
            animation: "fadeInUp 1s ease forwards",
            animationDelay: "0.45s",
            opacity: 0,
          }}
        >
          {formattedDate}
        </p>

        {/* Tagline */}
        <p
          className="mt-3 text-base italic text-[#7D7274]"
          style={{
            fontFamily: "var(--font-body)",
            animation: "fadeInUp 1s ease forwards",
            animationDelay: "0.6s",
            opacity: 0,
          }}
        >
          {weddingConfig.tagline}
        </p>

        {/* Flourish */}
        <div
          className="mx-auto mt-10 max-w-xs"
          style={{
            animation: "fadeIn 1s ease forwards",
            animationDelay: "0.75s",
            opacity: 0,
          }}
        >
          <Flourish />
        </div>
      </section>

      {/* Countdown */}
      <section className="mx-auto max-w-xl px-6 pb-20">
        <div
          style={{
            animation: "fadeInUp 1s ease forwards",
            animationDelay: "0.9s",
            opacity: 0,
          }}
        >
          <CountdownTimer />
        </div>
      </section>

      {/* Our Story */}
      <section className="bg-[#EDE6F0] py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-6">
          <div
            className="text-center mb-16"
            style={{
              animation: "fadeInUp 1s ease forwards",
              animationDelay: "0.15s",
              opacity: 0,
            }}
          >
            <h2
              className="text-4xl sm:text-5xl text-[#8B6B82]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {weddingConfig.ourStory.title}
            </h2>
            <p
              className="mt-4 text-base italic text-[#7D7274] max-w-md mx-auto"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {weddingConfig.ourStory.intro}
            </p>
            <div className="mx-auto mt-8 max-w-xs">
              <Flourish />
            </div>
          </div>

          {/* Milestones in bordered frames */}
          <div className="space-y-10">
            {weddingConfig.ourStory.milestones.map((milestone, i) => (
              <div
                key={milestone.year}
                className="border border-[#DFD0D5] p-6 sm:p-8 bg-[#FBF7F4]"
                style={{
                  animation: "fadeInUp 1s ease forwards",
                  animationDelay: `${0.3 + i * 0.15}s`,
                  opacity: 0,
                }}
              >
                <div className="ring-1 ring-[#DFD0D5] ring-offset-4 ring-offset-[#FBF7F4] p-6 sm:p-8">
                  <p
                    className="text-2xl italic text-[#B8976B]"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {milestone.year}
                  </p>
                  <h3
                    className="mt-2 text-xl font-bold text-[#8B6B82]"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {milestone.title}
                  </h3>
                  <p
                    className="mt-3 text-base leading-relaxed text-[#7D7274]"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {milestone.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RSVP CTA */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <div
            style={{
              animation: "fadeInUp 1s ease forwards",
              animationDelay: "0.15s",
              opacity: 0,
            }}
          >
            <h2
              className="text-3xl sm:text-4xl text-[#8B6B82]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Will You Join Us?
            </h2>
            <p
              className="mt-4 text-base italic text-[#7D7274] max-w-md mx-auto"
              style={{ fontFamily: "var(--font-body)" }}
            >
              We would be honored to celebrate this special day with you.
              Please let us know if you can attend.
            </p>
            <div className="mx-auto mt-6 max-w-xs">
              <Flourish />
            </div>
            <Link
              href="/9/rsvp"
              className="mt-8 inline-block border-2 border-[#B8976B] px-10 py-3 text-sm uppercase tracking-[0.15em] text-[#B8976B] transition-all duration-300 hover:bg-[#B8976B] hover:text-white"
              style={{ fontFamily: "var(--font-body)" }}
            >
              RSVP Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
