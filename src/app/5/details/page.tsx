import { weddingConfig } from "../../../../wedding.config";

function OrnamentalDivider({ delay = "0s" }: { delay?: string }) {
  return (
    <div
      className="flex items-center justify-center gap-4"
      style={{
        animation: "scaleIn 1.2s ease-out forwards",
        animationDelay: delay,
        opacity: 0,
      }}
    >
      <div className="h-px flex-1 max-w-16 bg-neutral-300/50" />
      <svg
        width="12"
        height="12"
        viewBox="0 0 14 14"
        className="text-neutral-300"
      >
        <path
          d="M7 1 L8.5 5.5 L13 7 L8.5 8.5 L7 13 L5.5 8.5 L1 7 L5.5 5.5 Z"
          fill="currentColor"
        />
      </svg>
      <div className="h-px flex-1 max-w-16 bg-neutral-300/50" />
    </div>
  );
}

export default function Variant5Details() {
  const { schedule, venue } = weddingConfig;

  return (
    <div className="space-y-16 text-center">
      {/* Page heading */}
      <div
        className="space-y-4"
        style={{ animation: "fadeIn 1s ease-out forwards", opacity: 0 }}
      >
        <h1 className="font-[family-name:var(--font-display)] text-4xl font-light tracking-wide text-neutral-800 sm:text-5xl">
          Wedding Details
        </h1>
        <div className="flex items-center justify-center gap-4">
          <div className="h-px w-12 bg-neutral-300/50" />
          <span className="text-xs text-neutral-300">✽</span>
          <div className="h-px w-12 bg-neutral-300/50" />
        </div>
      </div>

      {/* Venues — bordered frames */}
      <section
        className="space-y-10"
        style={{
          animation: "fadeIn 1s ease-out 0.2s forwards",
          opacity: 0,
        }}
      >
        <div className="border border-neutral-200 p-8 sm:p-12">
          <h2 className="font-[family-name:var(--font-display)] text-sm font-semibold uppercase tracking-[0.2em] text-neutral-400">
            Ceremony
          </h2>
          <p className="mt-4 font-[family-name:var(--font-display)] text-2xl font-light tracking-wide text-neutral-700">
            {venue.ceremony.name}
          </p>
          <p className="mt-2 font-[family-name:var(--font-body)] text-sm text-neutral-500">
            {venue.ceremony.address}
          </p>
        </div>

        <div className="border border-neutral-200 p-8 sm:p-12">
          <h2 className="font-[family-name:var(--font-display)] text-sm font-semibold uppercase tracking-[0.2em] text-neutral-400">
            Reception
          </h2>
          <p className="mt-4 font-[family-name:var(--font-display)] text-2xl font-light tracking-wide text-neutral-700">
            {venue.reception.name}
          </p>
          <p className="mt-2 font-[family-name:var(--font-body)] text-sm text-neutral-500">
            {venue.reception.address}
          </p>
        </div>
      </section>

      <OrnamentalDivider delay="0.4s" />

      {/* Schedule — centered pairs */}
      <section
        className="space-y-8"
        style={{
          animation: "fadeIn 1s ease-out 0.6s forwards",
          opacity: 0,
        }}
      >
        <h2 className="font-[family-name:var(--font-display)] text-3xl font-light tracking-wide text-neutral-800">
          Schedule
        </h2>
        <div className="space-y-4">
          {schedule.map((item, index) => (
            <div
              key={item.time}
              className="flex items-center justify-center gap-4"
              style={{
                animation: "fadeIn 1s ease-out forwards",
                animationDelay: `${0.8 + index * 0.15}s`,
                opacity: 0,
              }}
            >
              <span className="w-24 text-right font-[family-name:var(--font-body)] text-sm text-neutral-500">
                {item.time}
              </span>
              <span className="text-neutral-300">&mdash;</span>
              <span className="w-24 text-left font-[family-name:var(--font-display)] text-sm font-semibold uppercase tracking-[0.1em] text-neutral-600">
                {item.event}
              </span>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
