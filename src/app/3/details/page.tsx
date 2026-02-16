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
    <>
      {/* ═══ SCENE 1 — Page Header ═══ */}
      <section className="relative flex min-h-[50vh] items-center justify-center bg-neutral-950 overflow-hidden">
        {/* Noise */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
          }}
        />
        <div className="relative z-10 px-6 text-center">
          <h1
            className="text-4xl uppercase tracking-[0.3em] text-white sm:text-5xl lg:text-6xl"
            style={{
              fontFamily: "var(--font-display)",
              animation: "fadeInUp 1.2s ease forwards",
              animationDelay: "0.3s",
              opacity: 0,
            }}
          >
            Wedding Details
          </h1>
          <div className="mx-auto mt-10 overflow-hidden">
            <div
              className="mx-auto h-[2px] bg-neutral-500"
              style={{
                animation: "grow 0.8s ease forwards",
                animationDelay: "1s",
                width: 0,
                maxWidth: "6rem",
              }}
            />
          </div>
          <p
            className="mt-8 text-[11px] font-light uppercase tracking-[0.3em] text-neutral-400"
            style={{
              animation: "fadeInUp 1s ease forwards",
              animationDelay: "1.3s",
              opacity: 0,
            }}
          >
            {formattedDate}
          </p>
        </div>
      </section>

      {/* ═══ SCENE 2 — Ceremony ═══ */}
      <section className="bg-stone-50 py-32 sm:py-48">
        <div
          className="mx-auto max-w-4xl px-6"
          style={{
            animation: "fadeInUp 1s ease forwards",
            animationDelay: "0.2s",
            opacity: 0,
          }}
        >
          <p
            className="text-[11px] uppercase tracking-[0.3em] text-neutral-400"
            style={{ fontFamily: "var(--font-display)" }}
          >
            The Ceremony
          </p>
          <h2
            className="mt-8 text-3xl uppercase tracking-[0.15em] text-neutral-900 sm:text-4xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {weddingConfig.venue.ceremony.name}
          </h2>
          <p className="mt-4 text-sm font-light leading-relaxed text-neutral-500">
            {weddingConfig.venue.ceremony.address}
          </p>
          <div
            className="mt-10 h-[2px] bg-neutral-200"
            style={{
              animation: "grow 0.8s ease forwards",
              animationDelay: "0.6s",
              width: 0,
              maxWidth: "4rem",
            }}
          />
        </div>
      </section>

      {/* ═══ SCENE 3 — Reception ═══ */}
      <section className="relative bg-neutral-950 py-32 sm:py-48 overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
          }}
        />
        <div
          className="relative z-10 mx-auto max-w-4xl px-6"
          style={{
            animation: "fadeInUp 1s ease forwards",
            animationDelay: "0.2s",
            opacity: 0,
          }}
        >
          <p
            className="text-[11px] uppercase tracking-[0.3em] text-neutral-500"
            style={{ fontFamily: "var(--font-display)" }}
          >
            The Reception
          </p>
          <h2
            className="mt-8 text-3xl uppercase tracking-[0.15em] text-white sm:text-4xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {weddingConfig.venue.reception.name}
          </h2>
          <p className="mt-4 text-sm font-light leading-relaxed text-neutral-400">
            {weddingConfig.venue.reception.address}
          </p>
          <div
            className="mt-10 h-[2px] bg-neutral-700"
            style={{
              animation: "grow 0.8s ease forwards",
              animationDelay: "0.6s",
              width: 0,
              maxWidth: "4rem",
            }}
          />
        </div>
      </section>

      {/* ═══ SCENE 4 — Schedule ═══ */}
      <section className="bg-white py-32 sm:py-48">
        <div className="mx-auto max-w-4xl px-6">
          <div
            className="text-center"
            style={{
              animation: "fadeInUp 1s ease forwards",
              animationDelay: "0.2s",
              opacity: 0,
            }}
          >
            <h2
              className="text-3xl uppercase tracking-[0.3em] text-neutral-900 sm:text-4xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Schedule
            </h2>
            <div className="mx-auto mt-10 overflow-hidden">
              <div
                className="mx-auto h-[2px] bg-neutral-300"
                style={{
                  animation: "grow 0.8s ease forwards",
                  animationDelay: "0.6s",
                  width: 0,
                  maxWidth: "4rem",
                }}
              />
            </div>
          </div>

          <div className="mt-20 space-y-0">
            {weddingConfig.schedule.map((item, index) => (
              <div
                key={index}
                className="flex items-baseline justify-between border-b border-neutral-100 py-8 last:border-b-0"
                style={{
                  animation: "fadeInUp 0.8s ease forwards",
                  animationDelay: `${0.4 + index * 0.15}s`,
                  opacity: 0,
                }}
              >
                <span
                  className="text-lg uppercase tracking-[0.1em] text-neutral-900"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {item.event}
                </span>
                <span className="text-[11px] tracking-[0.2em] text-neutral-400">
                  {item.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

    </>
  );
}
