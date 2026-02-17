import { RsvpFlow } from "@/components/rsvp/rsvp-flow";

export default function Variant12Rsvp() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-20">
      <div className="space-y-12 text-center">
        {/* Page heading */}
        <div
          className="space-y-4"
          style={{ animation: "fadeIn 1s ease-out forwards", opacity: 0 }}
        >
          <h1 className="font-[family-name:var(--font-display)] text-4xl font-light tracking-wide text-neutral-800 sm:text-5xl">
            Respond
          </h1>
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-12 bg-neutral-300/50" />
            <span className="text-xs text-neutral-300">&#10045;</span>
            <div className="h-px w-12 bg-neutral-300/50" />
          </div>
          <p className="font-[family-name:var(--font-body)] text-sm italic text-neutral-500">
            Search for your name to get started.
          </p>
        </div>

        {/* RSVP Flow */}
        <div
          className="mx-auto max-w-lg"
          style={{
            animation: "fadeIn 1s ease-out 0.3s forwards",
            opacity: 0,
          }}
        >
          <RsvpFlow />
        </div>
      </div>
    </div>
  );
}
