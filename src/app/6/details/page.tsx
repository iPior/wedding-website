import { weddingConfig } from "../../../../wedding.config";
import { MapPin, Clock } from "lucide-react";

function BotanicalDivider({ delay = "0s" }: { delay?: string }) {
  return (
    <div
      className="flex items-center justify-center gap-4"
      style={{
        animation: "scaleIn 1.2s ease-out forwards",
        animationDelay: delay,
        opacity: 0,
      }}
    >
      <div className="h-px max-w-20 flex-1 bg-[#5B7B5E]/20" />
      <span className="text-sm text-[#5B7B5E]/40">❋</span>
      <div className="h-px max-w-20 flex-1 bg-[#5B7B5E]/20" />
    </div>
  );
}

export default function Variant6Details() {
  const { schedule, venue } = weddingConfig;

  return (
    <div className="space-y-16 text-center">
      {/* Page heading */}
      <div
        className="space-y-4"
        style={{ animation: "fadeInUp 0.8s ease forwards", opacity: 0 }}
      >
        <h1 className="font-[family-name:var(--font-display)] text-4xl font-light tracking-wide text-[#5B7B5E] sm:text-5xl">
          Wedding Details
        </h1>
        <div className="flex items-center justify-center gap-3">
          <div className="h-px w-12 bg-[#5B7B5E]/20" />
          <span className="text-sm text-[#5B7B5E]/40">✿</span>
          <div className="h-px w-12 bg-[#5B7B5E]/20" />
        </div>
      </div>

      {/* Venues — cream cards */}
      <section
        className="grid gap-6 sm:grid-cols-2"
        style={{
          animation: "fadeInUp 0.8s ease forwards",
          animationDelay: "0.2s",
          opacity: 0,
        }}
      >
        <div className="rounded-2xl border border-[#DDD5CA] bg-[#EEE8E0] p-8 shadow-[0_2px_20px_rgba(91,123,94,0.08)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_4px_24px_rgba(91,123,94,0.12)]">
          <div className="mb-4 flex justify-center">
            <MapPin className="size-5 text-[#5B7B5E]/60" strokeWidth={1.5} />
          </div>
          <h2 className="font-[family-name:var(--font-body)] text-xs font-medium uppercase tracking-[0.2em] text-[#5B7B5E]">
            Ceremony
          </h2>
          <p className="mt-3 font-[family-name:var(--font-display)] text-xl font-light italic tracking-wide text-neutral-800">
            {venue.ceremony.name}
          </p>
          <p className="mt-2 font-[family-name:var(--font-body)] text-sm font-light text-[#7A7A6E]">
            {venue.ceremony.address}
          </p>
        </div>

        <div className="rounded-2xl border border-[#DDD5CA] bg-[#EEE8E0] p-8 shadow-[0_2px_20px_rgba(91,123,94,0.08)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_4px_24px_rgba(91,123,94,0.12)]">
          <div className="mb-4 flex justify-center">
            <MapPin className="size-5 text-[#5B7B5E]/60" strokeWidth={1.5} />
          </div>
          <h2 className="font-[family-name:var(--font-body)] text-xs font-medium uppercase tracking-[0.2em] text-[#5B7B5E]">
            Reception
          </h2>
          <p className="mt-3 font-[family-name:var(--font-display)] text-xl font-light italic tracking-wide text-neutral-800">
            {venue.reception.name}
          </p>
          <p className="mt-2 font-[family-name:var(--font-body)] text-sm font-light text-[#7A7A6E]">
            {venue.reception.address}
          </p>
        </div>
      </section>

      <BotanicalDivider delay="0.4s" />

      {/* Schedule */}
      <section
        className="space-y-8"
        style={{
          animation: "fadeInUp 0.8s ease forwards",
          animationDelay: "0.6s",
          opacity: 0,
        }}
      >
        <h2 className="font-[family-name:var(--font-display)] text-3xl font-light tracking-wide text-[#5B7B5E]">
          Schedule
        </h2>
        <div className="mx-auto max-w-sm space-y-0">
          {schedule.map((item, index) => (
            <div
              key={item.time}
              className="flex items-center gap-4 border-l-2 border-[#5B7B5E]/20 py-4 pl-6"
              style={{
                animation: "fadeInUp 0.8s ease forwards",
                animationDelay: `${0.8 + index * 0.15}s`,
                opacity: 0,
              }}
            >
              <Clock className="size-3.5 shrink-0 text-[#D4A574]" strokeWidth={1.5} />
              <span className="w-20 font-[family-name:var(--font-body)] text-sm font-light text-[#7A7A6E]">
                {item.time}
              </span>
              <span className="font-[family-name:var(--font-display)] text-sm font-semibold tracking-wide text-neutral-700">
                {item.event}
              </span>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
