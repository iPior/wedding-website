import { weddingConfig } from "../../../../wedding.config";

const weddingDate = new Date(weddingConfig.date);
const formattedDate = weddingDate.toLocaleDateString("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
  year: "numeric",
});

export default function DetailsPage() {
  return (
    <div>
      {/* Page heading */}
      <section className="mx-auto max-w-2xl px-6 pb-24 pt-16 sm:pt-24">
        <div className="max-w-xl">
          <h1
            className="text-[3.5rem] font-light leading-[0.85] tracking-[-0.04em] text-neutral-900 sm:text-[6rem]"
            style={{
              fontFamily: "var(--font-display)",
              animation: "fadeInUp 0.8s ease forwards",
              opacity: 0,
            }}
          >
            Details
          </h1>
          <p
            className="mt-8 text-[0.7rem] font-light uppercase tracking-[0.2em] text-neutral-400"
            style={{
              fontFamily: "var(--font-body)",
              animation: "fadeInUp 0.8s ease forwards",
              animationDelay: "0.15s",
              opacity: 0,
            }}
          >
            {formattedDate}
          </p>
          <div
            className="mt-8 h-px bg-neutral-200"
            style={{
              animation: "revealLine 0.8s ease forwards",
              animationDelay: "0.3s",
              width: 0,
            }}
          />
        </div>
      </section>

      {/* Ceremony */}
      <section className="mx-auto max-w-2xl px-6 pb-20">
        <div
          style={{
            animation: "fadeInUp 0.8s ease forwards",
            animationDelay: "0.2s",
            opacity: 0,
          }}
        >
          <p
            className="text-[0.6rem] uppercase tracking-[0.25em] text-neutral-300"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Ceremony
          </p>
          <p
            className="mt-4 text-[1.8rem] font-light leading-[1] tracking-[-0.03em] text-neutral-900 sm:text-[2.2rem]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {weddingConfig.venue.ceremony.name}
          </p>
          <p
            className="mt-3 text-sm font-light leading-relaxed text-neutral-400"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {weddingConfig.venue.ceremony.address}
          </p>
        </div>
      </section>

      {/* Rule */}
      <div className="mx-auto max-w-xl px-6">
        <div className="border-t border-neutral-100" />
      </div>

      {/* Reception */}
      <section className="mx-auto max-w-2xl px-6 py-20">
        <div
          style={{
            animation: "fadeInUp 0.8s ease forwards",
            animationDelay: "0.25s",
            opacity: 0,
          }}
        >
          <p
            className="text-[0.6rem] uppercase tracking-[0.25em] text-neutral-300"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Reception
          </p>
          <p
            className="mt-4 text-[1.8rem] font-light leading-[1] tracking-[-0.03em] text-neutral-900 sm:text-[2.2rem]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {weddingConfig.venue.reception.name}
          </p>
          <p
            className="mt-3 text-sm font-light leading-relaxed text-neutral-400"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {weddingConfig.venue.reception.address}
          </p>
        </div>
      </section>

      {/* Rule */}
      <div className="mx-auto max-w-xl px-6">
        <div className="border-t border-neutral-100" />
      </div>

      {/* Schedule */}
      <section className="mx-auto max-w-2xl px-6 py-20 sm:py-28">
        <div
          style={{
            animation: "fadeInUp 0.8s ease forwards",
            animationDelay: "0.3s",
            opacity: 0,
          }}
        >
          <p
            className="mb-10 text-[0.6rem] uppercase tracking-[0.25em] text-neutral-300"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Schedule
          </p>
          <ul className="space-y-0">
            {weddingConfig.schedule.map((item, i) => (
              <li
                key={item.event}
                className="flex items-baseline border-b border-neutral-100 py-5 first:border-t"
                style={{
                  animation: "fadeInUp 0.6s ease forwards",
                  animationDelay: `${0.35 + i * 0.08}s`,
                  opacity: 0,
                }}
              >
                <span
                  className="w-28 shrink-0 text-[0.7rem] font-light uppercase tracking-[0.15em] text-neutral-400"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {item.time}
                </span>
                <span
                  className="text-lg font-light tracking-[-0.02em] text-neutral-900"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {item.event}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

    </div>
  );
}
