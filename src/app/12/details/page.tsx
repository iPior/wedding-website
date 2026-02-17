import { weddingConfig } from "../../../../wedding.config";
import { MapPin, Clock } from "lucide-react";

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
      <div className="h-px max-w-20 flex-1 bg-neutral-300/50" />
      <span className="text-xs text-neutral-300">&#10045;</span>
      <div className="h-px max-w-20 flex-1 bg-neutral-300/50" />
    </div>
  );
}

export default function Variant12Details() {
  const { schedule, venue } = weddingConfig;

  return (
    <div className="mx-auto max-w-2xl px-6 py-20">
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
            <span className="text-xs text-neutral-300">&#10045;</span>
            <div className="h-px w-12 bg-neutral-300/50" />
          </div>
          <p className="font-[family-name:var(--font-body)] text-sm italic text-neutral-500">
            Everything you need for our special day.
          </p>
        </div>

        {/* Venue cards (from v6, adapted palette) */}
        <section
          className="grid gap-6 sm:grid-cols-2"
          style={{
            animation: "fadeIn 1s ease-out 0.2s forwards",
            opacity: 0,
          }}
        >
          <div className="rounded-2xl border border-[#DDD5CA] bg-[#EEE8E0] p-8 shadow-[0_2px_20px_rgba(184,151,107,0.08)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_4px_24px_rgba(184,151,107,0.12)]">
            <div className="mb-4 flex justify-center">
              <MapPin
                className="size-5 text-[#B8976B]/60"
                strokeWidth={1.5}
              />
            </div>
            <h2 className="font-[family-name:var(--font-body)] text-xs font-medium uppercase tracking-[0.2em] text-[#B8976B]">
              Ceremony
            </h2>
            <p className="mt-3 font-[family-name:var(--font-display)] text-xl font-light italic tracking-wide text-neutral-800">
              {venue.ceremony.name}
            </p>
            <p className="mt-2 font-[family-name:var(--font-body)] text-sm font-light text-[#7D7274]">
              {venue.ceremony.address}
            </p>
          </div>

          <div className="rounded-2xl border border-[#DDD5CA] bg-[#EEE8E0] p-8 shadow-[0_2px_20px_rgba(184,151,107,0.08)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_4px_24px_rgba(184,151,107,0.12)]">
            <div className="mb-4 flex justify-center">
              <MapPin
                className="size-5 text-[#B8976B]/60"
                strokeWidth={1.5}
              />
            </div>
            <h2 className="font-[family-name:var(--font-body)] text-xs font-medium uppercase tracking-[0.2em] text-[#B8976B]">
              Reception
            </h2>
            <p className="mt-3 font-[family-name:var(--font-display)] text-xl font-light italic tracking-wide text-neutral-800">
              {venue.reception.name}
            </p>
            <p className="mt-2 font-[family-name:var(--font-body)] text-sm font-light text-[#7D7274]">
              {venue.reception.address}
            </p>
          </div>
        </section>

        <OrnamentalDivider delay="0.4s" />

        {/* Schedule (from v6, adapted with gold accent) */}
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
          <div className="mx-auto max-w-sm space-y-0">
            {schedule.map((item, index) => (
              <div
                key={item.time}
                className="flex items-center gap-4 border-l-2 border-[#B8976B]/20 py-4 pl-6"
                style={{
                  animation: "fadeIn 1s ease-out forwards",
                  animationDelay: `${0.8 + index * 0.15}s`,
                  opacity: 0,
                }}
              >
                <Clock
                  className="size-3.5 shrink-0 text-[#B8976B]"
                  strokeWidth={1.5}
                />
                <span className="w-20 font-[family-name:var(--font-body)] text-sm font-light text-[#7D7274]">
                  {item.time}
                </span>
                <span className="font-[family-name:var(--font-display)] text-sm font-semibold uppercase tracking-wide text-neutral-700">
                  {item.event}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
