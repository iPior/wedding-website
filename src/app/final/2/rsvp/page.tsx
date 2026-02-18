import { RsvpFlow } from "@/components/rsvp/rsvp-flow";

export default function RsvpPage() {
  return (
    <>
      {/* ═══ SCENE 1 — Page Header ═══ */}
      <section className="flex min-h-[25vh] items-center justify-center bg-[#fff8f8] px-6 text-center">
        <div>
          <h1
            className="text-4xl uppercase tracking-[0.3em] text-[#2c2424] sm:text-5xl lg:text-6xl"
            style={{
              fontFamily: "var(--font-display)",
              animation: "fadeInUp 1.2s ease forwards",
              animationDelay: "0.3s",
              opacity: 0,
            }}
          >
            RSVP
          </h1>
          <div className="mx-auto mt-6 overflow-hidden">
            <div
              className="mx-auto h-[2px] bg-[#d4a0b0]"
              style={{
                animation: "grow 0.8s ease forwards",
                animationDelay: "1s",
                width: 0,
                maxWidth: "6rem",
              }}
            />
          </div>
          <p
            className="mt-4 text-[11px] font-light uppercase tracking-[0.3em] text-[#8a7f7f]"
            style={{
              animation: "fadeInUp 1s ease forwards",
              animationDelay: "1.3s",
              opacity: 0,
            }}
          >
            Please let us know if you can make it
          </p>
        </div>
      </section>

      {/* ═══ SCENE 2 — RSVP Form ═══ */}
      <section className="border-t border-[#f0e0e4] bg-[#fff8f8] py-14 sm:py-20">
        <div
          className="mx-auto max-w-3xl px-6"
          style={{
            animation: "fadeInUp 1s ease forwards",
            animationDelay: "0.3s",
            opacity: 0,
          }}
        >
          <RsvpFlow />
        </div>
      </section>
    </>
  );
}
