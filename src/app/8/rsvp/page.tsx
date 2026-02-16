import { RsvpFlow } from "@/components/rsvp/rsvp-flow";

export default function Variant8RSVP() {
  return (
    <div className="mx-auto max-w-lg px-6 py-24">
      {/* Heading */}
      <div
        className="text-center"
        style={{
          animation: "fadeInUp 0.9s ease-in-out forwards",
          opacity: 0,
        }}
      >
        <h1 className="font-[family-name:var(--font-display)] text-4xl tracking-wide text-[#4A7C8A] sm:text-5xl">
          RSVP
        </h1>
        <svg
          viewBox="0 0 1200 40"
          className="mx-auto mt-6 h-6 w-full max-w-xs text-[#D0DDE3]"
        >
          <path
            d="M0,20 Q150,0 300,20 T600,20 T900,20 T1200,20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
        </svg>
        <p
          className="mt-6 font-[family-name:var(--font-body)] text-sm font-light leading-relaxed text-[#6B7F8A]"
          style={{
            animation: "fadeInUp 0.9s ease-in-out forwards",
            animationDelay: "0.15s",
            opacity: 0,
          }}
        >
          Search for your name to let us know if you can make it.
        </p>
      </div>

      {/* RSVP Flow */}
      <div
        className="mt-12"
        style={{
          animation: "fadeInUp 0.9s ease-in-out forwards",
          animationDelay: "0.3s",
          opacity: 0,
        }}
      >
        <RsvpFlow />
      </div>
    </div>
  );
}
