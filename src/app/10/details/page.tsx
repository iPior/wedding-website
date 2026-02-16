import { weddingConfig } from "../../../../wedding.config";

function GeometricDiamondDivider() {
  return (
    <div className="flex items-center justify-center gap-4 py-2">
      <div className="h-px flex-1 bg-[#C5D5CD]" />
      <div className="size-3 rotate-45 border border-[#C9A84C]" />
      <div className="h-px flex-1 bg-[#C5D5CD]" />
    </div>
  );
}

export default function Variant10Details() {
  const { venue, schedule } = weddingConfig;
  const weddingDate = new Date(weddingConfig.date);
  const formattedDate = weddingDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div>
      {/* Header */}
      <section className="px-6 py-20 text-center">
        <div className="mx-auto max-w-4xl">
          <div
            className="flex items-center justify-center gap-3 mb-4"
            style={{
              animation: "fadeIn 0.6s ease-out forwards",
              opacity: 0,
            }}
          >
            <div className="h-px w-12 bg-[#C9A84C]/50" />
            <div className="size-2 rotate-45 border border-[#C9A84C]" />
            <div className="h-px w-12 bg-[#C9A84C]/50" />
          </div>

          <h1
            className="font-[family-name:var(--font-display)] text-4xl tracking-wide text-[#2D4A3E] sm:text-5xl"
            style={{
              animation: "fadeInUp 0.6s ease-out forwards",
              animationDelay: "0.15s",
              opacity: 0,
            }}
          >
            Wedding Details
          </h1>
          <p
            className="mt-4 font-[family-name:var(--font-body)] text-sm font-light uppercase tracking-[0.2em] text-[#C9A84C]"
            style={{
              animation: "fadeInUp 0.6s ease-out forwards",
              animationDelay: "0.3s",
              opacity: 0,
            }}
          >
            {formattedDate}
          </p>
        </div>
      </section>

      {/* Venues — geometric-framed cards */}
      <section className="mx-auto max-w-4xl px-6 pb-20">
        <div className="grid gap-8 sm:grid-cols-2">
          {/* Ceremony */}
          <div
            className="relative bg-[#EFF5F1] p-8 border-l-2 border-t-2 border-[#C9A84C]"
            style={{
              animation: "slideUp 0.6s ease-out forwards",
              animationDelay: "0.15s",
              opacity: 0,
            }}
          >
            <div className="absolute bottom-0 right-0 w-8 h-8 border-r border-b border-[#C9A84C]/30" />

            <p className="font-[family-name:var(--font-body)] text-[10px] font-medium uppercase tracking-[0.25em] text-[#C9A84C]">
              Ceremony
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-2xl tracking-wide text-[#2D4A3E]">
              {venue.ceremony.name}
            </h2>
            <p className="mt-3 font-[family-name:var(--font-body)] text-sm font-light leading-relaxed text-[#6B7B74]">
              {venue.ceremony.address}
            </p>
          </div>

          {/* Reception */}
          <div
            className="relative bg-[#F5EDE8] p-8 border-l-2 border-t-2 border-[#C9A84C]"
            style={{
              animation: "slideUp 0.6s ease-out forwards",
              animationDelay: "0.3s",
              opacity: 0,
            }}
          >
            <div className="absolute bottom-0 right-0 w-8 h-8 border-r border-b border-[#C9A84C]/30" />

            <p className="font-[family-name:var(--font-body)] text-[10px] font-medium uppercase tracking-[0.25em] text-[#C9A84C]">
              Reception
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-2xl tracking-wide text-[#2D4A3E]">
              {venue.reception.name}
            </h2>
            <p className="mt-3 font-[family-name:var(--font-body)] text-sm font-light leading-relaxed text-[#6B7B74]">
              {venue.reception.address}
            </p>
          </div>
        </div>
      </section>

      {/* Schedule — structured grid */}
      <section className="bg-[#F5EDE8] px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2
              className="font-[family-name:var(--font-display)] text-3xl tracking-wide text-[#2D4A3E]"
              style={{
                animation: "fadeInUp 0.6s ease-out forwards",
                animationDelay: "0.15s",
                opacity: 0,
              }}
            >
              Schedule
            </h2>
          </div>

          <div className="grid gap-px bg-[#C5D5CD] sm:grid-cols-2">
            {schedule.map((item, index) => (
              <div
                key={item.event}
                className="bg-[#F5EDE8] p-6 text-center"
                style={{
                  animation: "slideUp 0.6s ease-out forwards",
                  animationDelay: `${0.3 + index * 0.1}s`,
                  opacity: 0,
                }}
              >
                <p className="font-[family-name:var(--font-display)] text-xl text-[#C9A84C]">
                  {item.time}
                </p>
                <p className="mt-2 font-[family-name:var(--font-body)] text-sm font-light uppercase tracking-[0.15em] text-[#2D4A3E]">
                  {item.event}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
