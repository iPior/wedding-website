import { weddingConfig } from "../../../../../wedding.config";

export default function OurStoryPage() {
  const { ourStory } = weddingConfig;

  return (
    <>
      {/* Page Header */}
      <section className="flex min-h-[25vh] items-center justify-center bg-[#fff8f8] px-6 text-center">
        <div>
          <h1
            className="text-4xl uppercase tracking-[0.3em] text-[#2c2424] sm:text-5xl lg:text-6xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {ourStory.title}
          </h1>
          <div className="mx-auto mt-6 overflow-hidden">
            <div
              className="mx-auto h-[2px] bg-[#d4a0b0]"
              style={{ animation: "grow 0.8s ease forwards", animationDelay: "0.5s", width: 0, maxWidth: "6rem" }}
            />
          </div>
          <p className="mx-auto mt-4 max-w-lg text-sm font-light leading-relaxed text-[#8a7f7f]">
            {ourStory.intro}
          </p>
        </div>
      </section>

      {/* Milestones */}
      {ourStory.milestones.map((milestone, index) => {
        const delay = `${0.2 + index * 0.1}s`;
        return (
          <section
            key={milestone.year}
            className="border-t border-[#f0e0e4] bg-[#fff8f8] py-12 sm:py-16"
          >
            <div
              className="mx-auto max-w-4xl px-6"
              style={{ animation: "fadeInUp 1s ease forwards", animationDelay: delay, opacity: 0 }}
            >
              <p
                className="text-[5rem] leading-none text-[#f0e0e4] sm:text-[7rem] lg:text-[8rem]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {milestone.year}
              </p>
              <h2
                className="mt-4 text-xl uppercase tracking-[0.15em] text-[#2c2424] sm:text-2xl"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {milestone.title}
              </h2>
              <p className="mt-3 max-w-xl text-sm font-light leading-relaxed text-[#8a7f7f]">
                {milestone.description}
              </p>
            </div>
          </section>
        );
      })}
    </>
  );
}
