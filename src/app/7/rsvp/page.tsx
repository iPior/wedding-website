import { RsvpFlow } from "@/components/rsvp/rsvp-flow";

export default function Variant7Rsvp() {
  return (
    <div className="space-y-12 text-center">
      {/* Page heading */}
      <div
        className="space-y-4"
        style={{ animation: "fadeInUp 1s ease-out forwards", opacity: 0 }}
      >
        <h1 className="font-[family-name:var(--font-display)] text-4xl tracking-wide text-[#C47D5A] sm:text-5xl">
          RSVP
        </h1>
        <div
          className="mx-auto h-px w-24"
          style={{
            background:
              "linear-gradient(to right, transparent, #C47D5A, #E8B87D, transparent)",
          }}
        />
        <p className="font-[family-name:var(--font-body)] text-sm font-light text-[#8A7B72]">
          Search for your name to get started.
        </p>
      </div>

      {/* RSVP Flow */}
      <div
        className="mx-auto max-w-lg"
        style={{
          animation: "scaleEntry 1s ease-out 0.3s forwards",
          opacity: 0,
        }}
      >
        <RsvpFlow />
      </div>
    </div>
  );
}
