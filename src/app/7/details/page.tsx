import { weddingConfig } from "../../../../wedding.config";

function GradientDivider({ delay = "0s" }: { delay?: string }) {
  return (
    <div
      className="flex items-center justify-center"
      style={{
        animation: "fadeIn 1.2s ease-out forwards",
        animationDelay: delay,
        opacity: 0,
      }}
    >
      <div
        className="h-px w-32 sm:w-48"
        style={{
          background:
            "linear-gradient(to right, transparent, #C47D5A, #E8B87D, transparent)",
        }}
      />
    </div>
  );
}

export default function Variant7Details() {
  const { schedule, venue } = weddingConfig;

  return (
    <div className="space-y-16 text-center">
      {/* Page heading */}
      <div
        className="space-y-4"
        style={{ animation: "fadeInUp 1s ease-out forwards", opacity: 0 }}
      >
        <h1 className="font-[family-name:var(--font-display)] text-4xl tracking-wide text-[#C47D5A] sm:text-5xl">
          Wedding Details
        </h1>
        <p className="font-[family-name:var(--font-body)] text-sm font-light text-[#8A7B72]">
          Everything you need to know about the day.
        </p>
      </div>

      {/* Venues — warm cream cards */}
      <section
        className="space-y-6"
        style={{
          animation: "scaleEntry 1s ease-out 0.2s forwards",
          opacity: 0,
        }}
      >
        <div className="rounded-xl bg-[#FFF0E8] p-8 shadow-[0_4px_24px_rgba(196,125,90,0.06)] sm:p-12">
          <h2 className="font-[family-name:var(--font-body)] text-xs font-semibold uppercase tracking-[0.2em] text-[#D4A8C8]">
            Ceremony
          </h2>
          <p className="mt-4 font-[family-name:var(--font-display)] text-2xl tracking-wide text-[#C47D5A]">
            {venue.ceremony.name}
          </p>
          <p className="mt-2 font-[family-name:var(--font-body)] text-sm font-light text-[#8A7B72]">
            {venue.ceremony.address}
          </p>
        </div>

        <div className="rounded-xl bg-[#FFF0E8] p-8 shadow-[0_4px_24px_rgba(196,125,90,0.06)] sm:p-12">
          <h2 className="font-[family-name:var(--font-body)] text-xs font-semibold uppercase tracking-[0.2em] text-[#D4A8C8]">
            Reception
          </h2>
          <p className="mt-4 font-[family-name:var(--font-display)] text-2xl tracking-wide text-[#C47D5A]">
            {venue.reception.name}
          </p>
          <p className="mt-2 font-[family-name:var(--font-body)] text-sm font-light text-[#8A7B72]">
            {venue.reception.address}
          </p>
        </div>
      </section>

      <GradientDivider delay="0.4s" />

      {/* Schedule — copper times */}
      <section
        className="space-y-8"
        style={{
          animation: "fadeInUp 1s ease-out 0.6s forwards",
          opacity: 0,
        }}
      >
        <h2 className="font-[family-name:var(--font-display)] text-3xl tracking-wide text-[#C47D5A]">
          Schedule
        </h2>
        <div className="mx-auto max-w-sm space-y-0">
          {schedule.map((item, index) => (
            <div
              key={item.time}
              className="flex items-center gap-5 border-b border-[#EDD8CC]/60 py-4 last:border-b-0"
              style={{
                animation: "fadeInUp 1s ease-out forwards",
                animationDelay: `${0.8 + index * 0.15}s`,
                opacity: 0,
              }}
            >
              <span className="w-24 text-right font-[family-name:var(--font-display)] text-lg text-[#C47D5A]">
                {item.time}
              </span>
              <span className="font-[family-name:var(--font-body)] text-sm font-light text-[#8A7B72]">
                {item.event}
              </span>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
