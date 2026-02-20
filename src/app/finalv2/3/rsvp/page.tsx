import { RsvpFlow } from "@/components/rsvp/rsvp-flow";

export default function RsvpPage() {
  return (
    <>
      <style>{`
        /* ── Variant 3: Editorial / Playfair ── */
        .rsvp-v3 h1,
        .rsvp-v3 h2,
        .rsvp-v3 h3,
        .rsvp-v3 h4 {
          font-family: var(--font-playfair), serif !important;
          font-weight: 400 !important;
        }
        .rsvp-v3 label {
          font-size: 0.62rem !important;
          text-transform: uppercase !important;
          letter-spacing: 0.22em !important;
          color: #8a7f7f !important;
          font-weight: 400 !important;
        }
        .rsvp-v3 input,
        .rsvp-v3 textarea {
          border-color: #f0e0e4 !important;
          background-color: transparent !important;
          color: #2c2424 !important;
        }
        .rsvp-v3 input:focus-visible,
        .rsvp-v3 textarea:focus-visible {
          outline: none !important;
          box-shadow: 0 0 0 2px rgba(212, 160, 176, 0.2) !important;
          border-color: #d4a0b0 !important;
        }
        .rsvp-v3 input::placeholder,
        .rsvp-v3 textarea::placeholder {
          color: rgba(138, 127, 127, 0.45) !important;
          font-size: 0.82rem !important;
        }
        .rsvp-v3 button[type="submit"] {
          background: #2c2424 !important;
          color: white !important;
          letter-spacing: 0.15em !important;
          text-transform: uppercase !important;
          font-size: 0.7rem !important;
        }
        .rsvp-v3 button[type="submit"]:hover {
          background: #3d3030 !important;
        }
        .rsvp-v3 button[type="button"] {
          font-size: 0.72rem !important;
          letter-spacing: 0.08em !important;
          text-transform: uppercase !important;
          border-color: #f0e0e4 !important;
        }
        .rsvp-v3 [data-variant="default"],
        .rsvp-v3 button.bg-primary {
          background: #2c2424 !important;
          border-color: #2c2424 !important;
        }
        .rsvp-v3 hr,
        .rsvp-v3 [role="separator"] {
          border-color: #f0e0e4 !important;
        }
        .rsvp-v3 [class*="border"] {
          border-color: #f0e0e4 !important;
        }
        .rsvp-v3 .text-muted-foreground {
          color: #8a7f7f !important;
        }
        .rsvp-v3 p {
          color: #5a4f4f !important;
          font-size: 0.84rem !important;
        }
      `}</style>

      <main className="mx-auto max-w-3xl px-6 py-16">
        <p className="text-xs uppercase tracking-[0.3em] text-[#d4a0b0] mb-3">001</p>
        <h2
          className="text-5xl text-[#2c2424] mb-4"
          style={{ fontFamily: "var(--font-playfair), serif" }}
        >
          Kindly Respond
        </h2>
        <p className="text-base leading-relaxed text-[#5a4f4f] mb-10">
          We would love to celebrate with you. Search for your name below to let
          us know if you can make it.
        </p>

        <div className="h-px bg-[#f0e0e4] mb-10" />

        <div className="rsvp-v3">
          <RsvpFlow />
        </div>
      </main>
    </>
  );
}
