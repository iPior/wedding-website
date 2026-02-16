import { RsvpFlow } from "@/components/rsvp/rsvp-flow";

export default function RsvpPage() {
  return (
    <div>
      {/* Page heading */}
      <section className="mx-auto max-w-2xl px-6 pb-16 pt-16 sm:pt-24">
        <div className="max-w-xl">
          <h1
            className="text-[3.5rem] font-light leading-[0.85] tracking-[-0.04em] text-neutral-900 sm:text-[6rem]"
            style={{
              fontFamily: "var(--font-display)",
              animation: "fadeInUp 0.8s ease forwards",
              opacity: 0,
            }}
          >
            RSVP
          </h1>
          <p
            className="mt-8 max-w-sm text-sm font-light leading-relaxed text-neutral-400"
            style={{
              fontFamily: "var(--font-body)",
              animation: "fadeInUp 0.8s ease forwards",
              animationDelay: "0.15s",
              opacity: 0,
            }}
          >
            Search for your name to get started.
          </p>
          <div
            className="mt-8 h-px bg-neutral-200"
            style={{
              animation: "revealLine 0.8s ease forwards",
              animationDelay: "0.3s",
              width: 0,
            }}
          />
        </div>
      </section>

      {/* RSVP Flow */}
      <section className="mx-auto max-w-xl px-6 pb-32">
        <div
          style={{
            animation: "fadeInUp 0.8s ease forwards",
            animationDelay: "0.4s",
            opacity: 0,
          }}
        >
          <RsvpFlow />
        </div>
      </section>
    </div>
  );
}
