import { weddingConfig } from "../../../../../wedding.config";

export default function OurStoryPage() {
  const { ourStory } = weddingConfig;

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <p className="text-xs uppercase tracking-[0.3em] text-[#d4a0b0] mb-3">001</p>
      <h1
        className="text-5xl text-[#2c2424] mb-4"
        style={{ fontFamily: "var(--font-playfair), serif" }}
      >
        {ourStory.title}
      </h1>

      {/* Timeline — alternating left/right */}
      <div className="relative max-w-4xl mx-auto">
        <div
          className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px"
          style={{
            background: "linear-gradient(to bottom, transparent, rgba(212,160,176,0.3), transparent)",
          }}
        />
        {ourStory.milestones.map((m, i) => {
          const isEven = i % 2 === 0;
          return (
            <div
              key={m.year}
              className={`relative flex flex-row items-start mb-20 ${!isEven ? "md:flex-row-reverse" : ""}`}
            >
              <div className="absolute left-4 md:left-1/2 -translate-x-1/2 top-2 w-3 h-3 rounded-full border-2 border-[#d4a0b0] bg-[#fff8f8] z-10" />
              <div
                className={`pl-12 md:pl-0 md:w-1/2 ${
                  isEven ? "md:pr-12 md:text-right" : "md:pl-12 md:text-left"
                }`}
              >
                <p
                  className="text-3xl text-[#d4a0b0]/60 mb-1"
                  style={{ fontFamily: "var(--font-playfair), serif" }}
                >
                  {m.year}
                </p>
                <h2
                  className="text-2xl text-[#2c2424] mb-2"
                  style={{ fontFamily: "var(--font-playfair), serif" }}
                >
                  {m.title}
                </h2>
                <p className="text-sm text-[#8a7f7f]">{m.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
