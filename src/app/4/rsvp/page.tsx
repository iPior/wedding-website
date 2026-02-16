import { RsvpFlow } from "@/components/rsvp/rsvp-flow";

export default function Variant4Rsvp() {
  return (
    <div>
      <h1
        className="mb-8 font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight sm:text-3xl"
        style={{ animation: "fadeIn 0.4s ease forwards" }}
      >
        RSVP
      </h1>

      <div className="flex items-baseline gap-3">
        <span className="font-[family-name:var(--font-display)] text-sm text-neutral-300">
          01 &mdash;
        </span>
        <h2 className="mb-4 font-[family-name:var(--font-display)] text-sm font-bold uppercase tracking-wider">
          Confirm Attendance
        </h2>
      </div>

      <div
        className="mt-4 max-w-lg border-t border-neutral-200 pt-6"
        style={{ animation: "fadeIn 0.4s ease forwards", animationDelay: "0.1s", opacity: 0 }}
      >
        <RsvpFlow />
      </div>
    </div>
  );
}
