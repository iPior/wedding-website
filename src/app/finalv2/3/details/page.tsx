import { weddingConfig } from "../../../../../wedding.config";

const CEREMONY_EMBED =
  "https://maps.google.com/maps?q=4260+Cawthra+Rd+Mississauga+ON+L4Z+1V8&t=&z=16&ie=UTF8&iwloc=B&output=embed";
const RECEPTION_EMBED =
  "https://maps.google.com/maps?q=20+Polonia+Ave+Brampton+ON+L6Y+5W8&t=&z=16&ie=UTF8&iwloc=B&output=embed";
const CEREMONY_LINK =
  "https://maps.google.com/maps?q=4260+Cawthra+Rd+Mississauga+ON+L4Z+1V8";
const RECEPTION_LINK =
  "https://maps.google.com/maps?q=20+Polonia+Ave+Brampton+ON+L6Y+5W8";

const weddingDate = new Date(weddingConfig.date);

function formatDate(d: Date) {
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function DetailsPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">

      {/* ───────── 001 — When & Where ───────── */}
      <section className="mb-14">
        <p className="text-xs uppercase tracking-[0.3em] text-[#d4a0b0] mb-3">001</p>
        <h2
          className="text-5xl text-[#2c2424] mb-4"
          style={{ fontFamily: "var(--font-playfair), serif" }}
        >
          When & Where
        </h2>
        <p className="text-base leading-relaxed text-[#5a4f4f] mb-10">
          Join us on {formatDate(weddingDate)} as we celebrate our love with
          family and friends.
        </p>

        {/* Venue cards */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          <div className="border border-[#f0e0e4] bg-[#fff8f8] p-6 text-center">
            <div className="ring-1 ring-[#f0e0e4] ring-offset-4 ring-offset-[#fff8f8] p-6 sm:p-8">
              <p className="text-xs uppercase tracking-[0.2em] text-[#d4a0b0]">
                Ceremony
              </p>
              <h3
                className="mt-4 text-2xl text-[#2c2424]"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                {weddingConfig.venue.ceremony.name}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#8a7f7f]">
                {weddingConfig.venue.ceremony.address}
              </p>
            </div>
          </div>

          <div className="border border-[#f0e0e4] bg-[#fff8f8] p-6 text-center">
            <div className="ring-1 ring-[#f0e0e4] ring-offset-4 ring-offset-[#fff8f8] p-6 sm:p-8">
              <p className="text-xs uppercase tracking-[0.2em] text-[#d4a0b0]">
                Reception
              </p>
              <h3
                className="mt-4 text-2xl text-[#2c2424]"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                {weddingConfig.venue.reception.name}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#8a7f7f]">
                {weddingConfig.venue.reception.address}
              </p>
            </div>
          </div>
        </div>

        {/* Maps */}
        <div className="mt-12 space-y-10">
          {/* Ceremony Map */}
          <div>
            <div className="flex items-baseline gap-3 mb-4">
              <p className="text-xs uppercase tracking-[0.3em] text-[#d4a0b0]">
                Ceremony Map
              </p>
              <div className="h-px flex-1 bg-[#f0e0e4]" />
            </div>
            <div className="ring-1 ring-[#f0e0e4] overflow-hidden">
              <div className="relative w-full" style={{ paddingBottom: "50%" }}>
                <iframe
                  src={CEREMONY_EMBED}
                  className="absolute inset-0 h-full w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ceremony venue map"
                />
              </div>
            </div>
            <a
              href={CEREMONY_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 text-xs tracking-[0.15em] text-[#8a7f7f] transition-colors hover:text-[#2c2424]"
            >
              Open in Maps
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M2 8 L8 2 M4 2 H8 V6" />
              </svg>
            </a>
          </div>

          {/* Reception Map */}
          <div>
            <div className="flex items-baseline gap-3 mb-4">
              <p className="text-xs uppercase tracking-[0.3em] text-[#d4a0b0]">
                Reception Map
              </p>
              <div className="h-px flex-1 bg-[#f0e0e4]" />
            </div>
            <div className="ring-1 ring-[#f0e0e4] overflow-hidden">
              <div className="relative w-full" style={{ paddingBottom: "50%" }}>
                <iframe
                  src={RECEPTION_EMBED}
                  className="absolute inset-0 h-full w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Reception venue map"
                />
              </div>
            </div>
            <a
              href={RECEPTION_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 text-xs tracking-[0.15em] text-[#8a7f7f] transition-colors hover:text-[#2c2424]"
            >
              Open in Maps
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M2 8 L8 2 M4 2 H8 V6" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      <div className="h-px bg-[#f0e0e4] mb-14" />

      {/* ───────── 002 — Schedule ───────── */}
      <section>
        <p className="text-xs uppercase tracking-[0.3em] text-[#d4a0b0] mb-3">002</p>
        <h2
          className="text-5xl text-[#2c2424] mb-10"
          style={{ fontFamily: "var(--font-playfair), serif" }}
        >
          Schedule
        </h2>
        <div>
          {weddingConfig.schedule.map((item) => (
            <div
              key={item.event}
              className="flex items-baseline justify-between border-b border-[#f0e0e4] py-5 last:border-b-0"
            >
              <span
                className="text-lg text-[#2c2424]"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                {item.event}
              </span>
              <span className="text-xs tracking-[0.2em] text-[#8a7f7f]">
                {item.time}
              </span>
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}
