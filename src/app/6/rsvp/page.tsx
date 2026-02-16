import { RsvpFlow } from "@/components/rsvp/rsvp-flow";

export default function Variant6Rsvp() {
  return (
    <div className="space-y-12 text-center">
      {/* Page heading */}
      <div
        className="space-y-4"
        style={{ animation: "fadeInUp 0.8s ease forwards", opacity: 0 }}
      >
        <h1 className="font-[family-name:var(--font-display)] text-4xl font-light tracking-wide text-[#5B7B5E] sm:text-5xl">
          RSVP
        </h1>
        <div className="flex items-center justify-center gap-3">
          <div className="h-px w-12 bg-[#5B7B5E]/20" />
          <span className="text-sm text-[#5B7B5E]/40">✿</span>
          <div className="h-px w-12 bg-[#5B7B5E]/20" />
        </div>
        <p className="font-[family-name:var(--font-body)] text-sm font-light italic text-[#7A7A6E]">
          Search for your name to get started.
        </p>
      </div>

      {/* RSVP Flow */}
      <div
        className="mx-auto max-w-lg"
        style={{
          animation: "fadeInUp 0.8s ease forwards",
          animationDelay: "0.3s",
          opacity: 0,
        }}
      >
        <RsvpFlow />
      </div>
    </div>
  );
}
