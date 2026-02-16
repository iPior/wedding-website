import { RsvpFlow } from "@/components/rsvp/rsvp-flow";

export default function RsvpPage() {
  return (
    <main className="max-w-7xl mx-auto px-6 md:px-12 py-24">
      {/* Section header — offset grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-16">
        <div className="md:col-span-4">
          <p className="text-xs uppercase tracking-[0.3em] text-[#d4a0b0] mb-3">
            001
          </p>
          <h2
            className="text-4xl md:text-5xl text-[#2c2424]"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            Kindly
            <br />
            Respond
          </h2>
        </div>
        <div className="md:col-start-6 md:col-span-6">
          <p className="text-lg leading-relaxed text-[#5a4f4f] md:mt-10">
            We would love to celebrate with you. Search for your name below to
            let us know if you can make it.
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-[#f0e0e4] mb-16" />

      {/* RSVP Flow */}
      <div className="max-w-2xl md:ml-auto">
        <RsvpFlow />
      </div>
    </main>
  );
}
