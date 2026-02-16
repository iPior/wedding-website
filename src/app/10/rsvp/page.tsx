import { RsvpFlow } from "@/components/rsvp/rsvp-flow";

export default function Variant10RSVP() {
  return (
    <div>
      {/* Header */}
      <section className="px-6 py-20 text-center">
        <div className="mx-auto max-w-lg">
          {/* Geometric heading frame */}
          <div className="relative py-8">
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-10 h-10 border-l-2 border-t-2 border-[#C9A84C]" />
            <div className="absolute top-0 right-0 w-10 h-10 border-r-2 border-t-2 border-[#C9A84C]" />
            <div className="absolute bottom-0 left-0 w-10 h-10 border-l-2 border-b-2 border-[#C9A84C]" />
            <div className="absolute bottom-0 right-0 w-10 h-10 border-r-2 border-b-2 border-[#C9A84C]" />

            <div
              className="flex items-center justify-center gap-3 mb-4"
              style={{
                animation: "fadeIn 0.6s ease-out forwards",
                opacity: 0,
              }}
            >
              <div className="h-px w-8 bg-[#C9A84C]/50" />
              <div className="size-2 rotate-45 border border-[#C9A84C]" />
              <div className="h-px w-8 bg-[#C9A84C]/50" />
            </div>

            <h1
              className="font-[family-name:var(--font-display)] text-4xl tracking-wide text-[#2D4A3E] sm:text-5xl"
              style={{
                animation: "fadeInUp 0.6s ease-out forwards",
                animationDelay: "0.15s",
                opacity: 0,
              }}
            >
              RSVP
            </h1>

            <p
              className="mt-4 font-[family-name:var(--font-body)] text-sm font-light text-[#6B7B74]"
              style={{
                animation: "fadeInUp 0.6s ease-out forwards",
                animationDelay: "0.3s",
                opacity: 0,
              }}
            >
              We can&apos;t wait to celebrate with you.
            </p>
          </div>
        </div>
      </section>

      {/* RSVP Flow */}
      <section className="mx-auto max-w-lg px-6 pb-24">
        <div
          className="relative bg-[#EFF5F1] p-8 sm:p-10"
          style={{
            animation: "slideUp 0.6s ease-out forwards",
            animationDelay: "0.3s",
            opacity: 0,
            borderLeft: "2px solid #C9A84C",
            borderTop: "2px solid #C9A84C",
          }}
        >
          {/* Bottom-right corner accent */}
          <div className="absolute bottom-0 right-0 w-8 h-8 border-r border-b border-[#C9A84C]/30" />

          <RsvpFlow />
        </div>

        {/* Bottom ornament */}
        <div
          className="mt-12 flex items-center justify-center gap-3"
          style={{
            animation: "fadeIn 0.6s ease-out forwards",
            animationDelay: "0.6s",
            opacity: 0,
          }}
        >
          <div className="size-1.5 rotate-45 bg-[#C9A84C]/40" />
          <div className="size-2 rotate-45 bg-[#C9A84C]/60" />
          <div className="size-1.5 rotate-45 bg-[#C9A84C]/40" />
        </div>
      </section>
    </div>
  );
}
