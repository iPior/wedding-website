import { weddingConfig } from "../../../../../wedding.config";
import { getTranslations } from "next-intl/server";

// Gradient palettes — one per milestone, evocative of each story beat
const milestoneVisuals = [
  {
    gradient: "linear-gradient(145deg, var(--color-memory-gold-light) 0%, var(--color-memory-gold) 55%, var(--color-memory-gold-dark) 100%)",
  },
  {
    gradient: "linear-gradient(145deg, var(--color-memory-blue-light) 0%, var(--color-memory-blue) 55%, var(--color-memory-blue-dark) 100%)",
  },
  {
    gradient: "linear-gradient(145deg, var(--color-memory-clay-light) 0%, var(--color-memory-clay) 55%, var(--color-memory-clay-dark) 100%)",
  },
  {
    gradient: "linear-gradient(145deg, var(--color-memory-lavender-light) 0%, var(--color-memory-lavender) 55%, var(--color-memory-lavender-dark) 100%)",
  },
];

// Alternating polaroid tilts
const polaroidRotations = [-2.5, 1.8, -1.5, 2.2, -2, 5.5];

function PhotoFrame({ gradient, year, image }: { gradient: string; year: string; image?: string }) {
  if (image) {
    return (
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: "4/3" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} alt={year} className="absolute inset-0 w-full h-full object-cover" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "var(--gradient-photo-vignette)",
          }}
        />
      </div>
    );
  }

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ aspectRatio: "4/3", background: gradient }}
    >
      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "var(--gradient-photo-vignette)",
        }}
      />
      {/* Year watermark */}
      <div
        className="absolute inset-0 flex items-center justify-center select-none pointer-events-none"
        style={{
          fontFamily: "var(--font-playfair), serif",
          fontSize: "clamp(3rem, 8vw, 5rem)",
          fontWeight: 400,
          letterSpacing: "0.05em",
          color: "var(--color-watermark)",
        }}
      >
        {year}
      </div>
      {/* Camera indicator */}
      <div className="absolute bottom-3 right-3">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--color-camera-stroke)"
          strokeWidth="1.2"
        >
          <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
          <circle cx="12" cy="13" r="4" />
        </svg>
      </div>
    </div>
  );
}

export default async function OurStoryPage() {
  const t = await getTranslations("OurStory");
  const { milestones } = weddingConfig.ourStory;

  return (
    <main className="mx-auto max-w-3xl px-6 py-10 md:py-16">
      <p className="text-xs uppercase tracking-[0.3em] text-accent mb-3">{t("sectionNumber")}</p>
      <h1
        className="text-5xl text-primary mb-8 md:mb-16"
        style={{ fontFamily: "var(--font-playfair), serif" }}
      >
        {t("title")}
      </h1>
      {/* Timeline — alternating left/right with photos on opposing side */}
      <div className="relative max-w-4xl mx-auto">
        {/* Center spine */}
        <div
          className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px"
          style={{
            background:
              "var(--gradient-timeline-spine)",
          }}
        />

        {(() => {
          let polaroidCount = 0;
          return milestones.map((m, i) => {
          const isEven = i % 2 === 0;
          const visual = milestoneVisuals[i % milestoneVisuals.length];
          const polaroidIndex = m.image ? polaroidCount++ : 0;

          return (
            <div key={i} className="relative mb-20">
              {/* Spine dot */}
              <div className="absolute left-4 md:left-1/2 -translate-x-1/2  translate-y-1/2 top-3 w-3 h-3 rounded-full border-2 border-accent bg-background z-10" />

              <div
                className={`flex flex-col md:flex-row md:items-start gap-6 ${
                  !isEven ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Text side */}
                <div
                  className={`pl-12 md:pl-0 md:w-1/2 ${
                    isEven ? "md:pr-12 md:text-right" : "md:pl-12 md:text-left"
                  }`}
                >
                  <p
                    className="text-3xl text-accent/60 mb-1"
                    style={{ fontFamily: "var(--font-playfair), serif" }}
                  >
                    {m.year}
                  </p>
                  <h2
                    className="text-2xl text-primary mb-2"
                    style={{ fontFamily: "var(--font-playfair), serif" }}
                  >
                    {t(`milestones.${i}.title`)}
                  </h2>
                  <p className="text-sm text-muted-foreground">{t(`milestones.${i}.description`)}</p>
                </div>

                {/* Photo side — only rendered when an image is set */}
                {m.image && (
                  <div
                    className={`pl-12 md:pl-0 md:w-1/2 flex items-center justify-center ${
                      isEven ? "md:pl-12" : "md:pr-12"
                    }`}
                  >
                    {/* Polaroid frame */}
                    <div
                      style={{
                        transform: `rotate(${polaroidRotations[polaroidIndex % polaroidRotations.length]}deg)`,
                        backgroundColor: "var(--color-card)",
                        padding: "10px 10px 40px 10px",
                        boxShadow: "var(--shadow-polaroid)",
                        display: "inline-block",
                        width: "100%",
                        maxWidth: "320px",
                      }}
                    >
                      <PhotoFrame gradient={visual.gradient} year={m.year} image={m.image} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        });
        })()}
      </div>
    </main>
  );
}
