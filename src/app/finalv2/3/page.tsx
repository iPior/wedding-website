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
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pt-8 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-end">
          <div className="md:col-span-7">
            <p className="text-xs uppercase tracking-[0.3em] text-[#d4a0b0] mb-6">
              {formatDate(weddingDate)}
            </p>
            <h1
              className="text-7xl md:text-[8rem] lg:text-[10rem] leading-[0.85] tracking-tight text-[#2c2424]"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              {person1.firstName}
            </h1>
            <div className="flex items-center gap-4 my-4">
              <div className="h-px flex-1 bg-[#d2d98b]" />
              <span className="text-sm tracking-[0.3em] uppercase text-[#8a7f7f]">and</span>
              <div className="h-px flex-1 bg-[#d2d98b]" />
            </div>
            <h1
              className="text-7xl md:text-[8rem] lg:text-[10rem] leading-[0.85] tracking-tight text-[#2c2424]"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              {person2.firstName}
            </h1>
          </div>

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

      {/* RSVP CTA */}
      <section className="bg-[#2c2424] py-24">
        <div className="max-w-3xl mx-auto px-6 md:px-12 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-[#d4a0b0] mb-4">
            RSVP
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
            href="/finalv2/3/rsvp"
            className="inline-block bg-white text-[#2c2424] text-xs uppercase tracking-[0.3em] px-10 py-4 transition-colors duration-300 hover:bg-[#f0e0e4]"
          >
            RSVP Now
          </Link>
        </div>
      </section>
    </main>
  );
}
