import { weddingConfig } from "../../../../../wedding.config";

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

        <div className="grid grid-cols-1 gap-px bg-[#f0e0e4] sm:grid-cols-2">
          <div className="bg-[#fff8f8] p-8">
            <p className="text-xs uppercase tracking-[0.2em] text-[#8a7f7f] mb-4">
              Ceremony
            </p>
            <h3
              className="text-xl text-[#2c2424] mb-2"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              {weddingConfig.venue.ceremony.name}
            </h3>
            <p className="text-sm text-[#8a7f7f]">
              {weddingConfig.venue.ceremony.address}
            </p>
          </div>
          <div className="bg-[#fff8f8] p-8">
            <p className="text-xs uppercase tracking-[0.2em] text-[#8a7f7f] mb-4">
              Reception
            </p>
            <h3
              className="text-xl text-[#2c2424] mb-2"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              {weddingConfig.venue.reception.name}
            </h3>
            <p className="text-sm text-[#8a7f7f]">
              {weddingConfig.venue.reception.address}
            </p>
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
        <div className="space-y-5">
          {weddingConfig.schedule.map((item) => (
            <div key={item.event} className="flex items-center gap-4">
              <span className="w-20 shrink-0 text-sm text-[#8a7f7f]">
                {item.time}
              </span>
              <span className="size-2 shrink-0 rounded-full bg-[#d4a0b0]" />
              <span
                className="text-lg text-[#2c2424]"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                {item.event}
              </span>
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}
