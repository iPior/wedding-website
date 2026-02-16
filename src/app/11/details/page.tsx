import { weddingConfig } from "../../../../wedding.config";

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
    <main className="max-w-7xl mx-auto px-6 md:px-12 py-24">
      {/* ───────── 001 — When & Where ───────── */}
      <section className="mb-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-12">
          <div className="md:col-span-4">
            <p className="text-xs uppercase tracking-[0.3em] text-[#d4a0b0] mb-3">
              001
            </p>
            <h2
              className="text-4xl md:text-5xl text-[#2c2424]"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              When &<br />
              Where
            </h2>
          </div>
          <div className="md:col-start-6 md:col-span-6">
            <p className="text-lg leading-relaxed text-[#5a4f4f] md:mt-10">
              Join us on {formatDate(weddingDate)} as we celebrate our love with
              family and friends.
            </p>
          </div>
        </div>

        {/* Venue grid with thin divider */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#f0e0e4]">
          {/* Ceremony */}
          <div className="bg-[#fff8f8] p-8 md:p-12">
            <p className="text-xs uppercase tracking-[0.2em] text-[#8a7f7f] mb-4">
              Ceremony
            </p>
            <h3
              className="text-2xl text-[#2c2424] mb-2"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              {weddingConfig.venue.ceremony.name}
            </h3>
            <p className="text-sm text-[#8a7f7f]">
              {weddingConfig.venue.ceremony.address}
            </p>
          </div>

          {/* Reception */}
          <div className="bg-[#fff8f8] p-8 md:p-12">
            <p className="text-xs uppercase tracking-[0.2em] text-[#8a7f7f] mb-4">
              Reception
            </p>
            <h3
              className="text-2xl text-[#2c2424] mb-2"
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

      {/* Divider */}
      <div className="h-px bg-[#f0e0e4] mb-24" />

      {/* ───────── 002 — Schedule ───────── */}
      <section className="mb-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-12">
          <div className="md:col-span-4">
            <p className="text-xs uppercase tracking-[0.3em] text-[#d4a0b0] mb-3">
              002
            </p>
            <h2
              className="text-4xl md:text-5xl text-[#2c2424]"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              Schedule
            </h2>
          </div>
          <div className="md:col-start-6 md:col-span-6">
            <div className="space-y-6 md:mt-10">
              {weddingConfig.schedule.map((item) => (
                <div key={item.event} className="flex items-center gap-4">
                  <span className="text-sm text-[#8a7f7f] w-24 shrink-0">
                    {item.time}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-[#d4a0b0]" />
                  <span className="text-lg text-[#2c2424]">{item.event}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
