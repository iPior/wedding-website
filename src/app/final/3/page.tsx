import Link from "next/link";
import { weddingConfig } from "../../../../wedding.config";
import { CountdownTimer } from "@/components/countdown-timer";

const { person1, person2 } = weddingConfig.couple;
const weddingDate = new Date(weddingConfig.date);

function formatDate(d: Date) {
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function HomePage() {
  return (
    <main>
      {/* ───────── Hero ───────── */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pt-8 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-end">
          {/* Left — Names */}
          <div className="md:col-span-7">
            {/* Date label */}
            <p className="text-xs uppercase tracking-[0.3em] text-[#d4a0b0] mb-6">
              {formatDate(weddingDate)}
            </p>

            {/* First name */}
            <h1
              className="text-7xl md:text-[8rem] lg:text-[10rem] leading-[0.85] tracking-tight text-[#2c2424]"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              {person1.firstName}
            </h1>

            {/* Sage line + "and" */}
            <div className="flex items-center gap-4 my-4">
              <div className="h-px flex-1 bg-[#d2d98b]" />
              <span className="text-sm tracking-[0.3em] uppercase text-[#8a7f7f]">
                and
              </span>
              <div className="h-px flex-1 bg-[#d2d98b]" />
            </div>

            {/* Second name */}
            <h1
              className="text-7xl md:text-[8rem] lg:text-[10rem] leading-[0.85] tracking-tight text-[#2c2424]"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              {person2.firstName}
            </h1>
          </div>

          {/* Right — Photo placeholder + metadata */}
          <div className="md:col-span-5">
            <div className="aspect-[3/4] rounded-sm bg-gradient-to-br from-[#F7e0e8] to-[#ffdae9]" />
            <div className="mt-4 space-y-1">
              <p className="text-xs uppercase tracking-[0.2em] text-[#8a7f7f]">
                {weddingConfig.venue.ceremony.name}
              </p>
              <p className="text-xs uppercase tracking-[0.2em] text-[#8a7f7f]">
                Toronto, Ontario
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Countdown */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pb-24">
        <CountdownTimer />
      </section>

      {/* ───────── Our Story ───────── */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        {/* Centered header */}
        <div className="mx-auto max-w-3xl px-6 mb-16">
          <p className="text-xs uppercase tracking-[0.3em] text-[#d4a0b0] mb-3">
            001
          </p>
          <h2
            className="text-5xl text-[#2c2424] mb-4"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            {weddingConfig.ourStory.title}
          </h2>
          <p className="text-base leading-relaxed text-[#5a4f4f]">
            {weddingConfig.ourStory.intro}
          </p>
        </div>

        {/* Timeline — alternating left/right */}
        <div className="relative max-w-4xl mx-auto">
          <div
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px"
            style={{
              background:
                "linear-gradient(to bottom, transparent, rgba(212,160,176,0.3), transparent)",
            }}
          />
          {weddingConfig.ourStory.milestones.map((m, i) => {
            const isEven = i % 2 === 0;
            return (
              <div
                key={m.year}
                className={`relative flex flex-row items-start mb-20 ${
                  !isEven ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 top-2 w-3 h-3 rounded-full border-2 border-[#d4a0b0] bg-[#fff8f8] z-10" />
                <div
                  className={`pl-12 md:pl-0 md:w-1/2 ${
                    isEven ? "md:pr-12 md:text-right" : "md:pl-12 md:text-left"
                  }`}
                >
                  <p
                    className="text-3xl text-[#d4a0b0]/60 mb-1"
                    style={{ fontFamily: "var(--font-playfair), serif" }}
                  >
                    {m.year}
                  </p>
                  <h3
                    className="text-2xl text-[#2c2424] mb-2"
                    style={{ fontFamily: "var(--font-playfair), serif" }}
                  >
                    {m.title}
                  </h3>
                  <p className="text-sm text-[#8a7f7f]">{m.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ───────── RSVP CTA — Dark section ───────── */}
      <section className="bg-[#2c2424] py-24 mt-24">
        <div className="max-w-3xl mx-auto px-6 md:px-12 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-[#d4a0b0] mb-4">
            004
          </p>
          <h2
            className="text-4xl md:text-5xl text-white mb-6"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            Will You Join Us?
          </h2>
          <p className="text-lg leading-relaxed text-[#8a7f7f] mb-10 max-w-md mx-auto">
            We would be honored to have you celebrate this day with us. Please
            let us know if you can make it.
          </p>
          <Link
            href="/final/3/rsvp"
            className="inline-block bg-white text-[#2c2424] text-xs uppercase tracking-[0.3em] px-10 py-4 transition-colors duration-300 hover:bg-[#f0e0e4]"
          >
            RSVP Now
          </Link>
        </div>
      </section>
    </main>
  );
}
