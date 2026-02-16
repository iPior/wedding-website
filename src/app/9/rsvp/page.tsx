import { RsvpFlow } from "@/components/rsvp/rsvp-flow";

function Flourish({ className }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className ?? ""}`}>
      <div className="h-px flex-1 bg-[#DFD0D5]" />
      <span className="text-[#B8976B] text-lg">&#10087;</span>
      <div className="h-px flex-1 bg-[#DFD0D5]" />
    </div>
  );
}

export default function RsvpPage() {
  return (
    <div>
      {/* Page heading */}
      <section className="mx-auto max-w-3xl px-6 py-20 sm:py-28 text-center">
        <h1
          className="text-4xl sm:text-5xl md:text-6xl text-[#8B6B82]"
          style={{
            fontFamily: "var(--font-display)",
            animation: "fadeInUp 1s ease forwards",
            opacity: 0,
          }}
        >
          Répondez S&apos;il Vous Plaît
        </h1>
        <p
          className="mt-4 text-base italic text-[#7D7274] max-w-md mx-auto"
          style={{
            fontFamily: "var(--font-body)",
            animation: "fadeInUp 1s ease forwards",
            animationDelay: "0.15s",
            opacity: 0,
          }}
        >
          Search for your name below to get started.
        </p>
        <div
          className="mx-auto mt-8 max-w-xs"
          style={{
            animation: "fadeIn 1s ease forwards",
            animationDelay: "0.3s",
            opacity: 0,
          }}
        >
          <Flourish />
        </div>
      </section>

      {/* RSVP Flow */}
      <section className="mx-auto max-w-lg px-6 pb-28">
        <div
          style={{
            animation: "fadeInUp 1s ease forwards",
            animationDelay: "0.45s",
            opacity: 0,
          }}
        >
          <RsvpFlow />
        </div>
      </section>
    </div>
  );
}
