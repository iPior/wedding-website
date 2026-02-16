import Image from "next/image";
import { weddingConfig } from "../../../../wedding.config";

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

export default function BridalPartyPage() {
  return (
    <>
      {/* ═══ SCENE 1 — Dark Header ═══ */}
      <section className="relative flex min-h-[50vh] items-center justify-center bg-neutral-950 overflow-hidden">
        {/* Noise */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
          }}
        />
        <div className="relative z-10 px-6 text-center">
          <h1
            className="text-4xl uppercase tracking-[0.3em] text-white sm:text-5xl lg:text-6xl"
            style={{
              fontFamily: "var(--font-display)",
              animation: "fadeInUp 1.2s ease forwards",
              animationDelay: "0.3s",
              opacity: 0,
            }}
          >
            Bridal Party
          </h1>
          <div className="mx-auto mt-10 overflow-hidden">
            <div
              className="mx-auto h-[2px] bg-neutral-500"
              style={{
                animation: "grow 0.8s ease forwards",
                animationDelay: "1s",
                width: 0,
                maxWidth: "6rem",
              }}
            />
          </div>
        </div>
      </section>

      {/* ═══ SCENES — Each member gets their own cinematic section ═══ */}
      {weddingConfig.bridalParty.map((member, index) => {
        const isDark = index % 2 === 0;
        const delay = `${0.2 + index * 0.1}s`;

        return (
          <section
            key={member.name}
            className={`relative py-32 sm:py-44 overflow-hidden ${
              isDark ? "bg-neutral-950" : "bg-stone-50"
            }`}
          >
            {/* Noise for dark sections */}
            {isDark && (
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
                  backgroundRepeat: "repeat",
                }}
              />
            )}

            <div
              className="relative z-10 mx-auto max-w-4xl px-6"
              style={{
                animation: "fadeInUp 1s ease forwards",
                animationDelay: delay,
                opacity: 0,
              }}
            >
              <div className="flex flex-col items-start gap-10 sm:flex-row sm:items-center sm:gap-16">
                {/* Portrait or Initials */}
                <div className="shrink-0">
                  {member.image ? (
                    <div className="relative h-36 w-36 overflow-hidden sm:h-44 sm:w-44">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover grayscale"
                      />
                    </div>
                  ) : (
                    <div
                      className={`flex h-36 w-36 items-center justify-center sm:h-44 sm:w-44 ${
                        isDark ? "bg-neutral-800" : "bg-neutral-200"
                      }`}
                    >
                      <span
                        className={`text-3xl tracking-[0.2em] sm:text-4xl ${
                          isDark ? "text-neutral-500" : "text-neutral-400"
                        }`}
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {getInitials(member.name)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div>
                  <p
                    className={`text-[10px] uppercase tracking-[0.3em] ${
                      isDark ? "text-neutral-500" : "text-neutral-400"
                    }`}
                  >
                    {member.role}
                  </p>
                  <h2
                    className={`mt-4 text-2xl uppercase tracking-[0.15em] sm:text-3xl ${
                      isDark ? "text-white" : "text-neutral-900"
                    }`}
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {member.name}
                  </h2>
                  <p
                    className={`mt-4 max-w-md text-sm font-light leading-relaxed ${
                      isDark ? "text-neutral-400" : "text-neutral-500"
                    }`}
                  >
                    {member.bio}
                  </p>
                  <div
                    className={`mt-8 h-[2px] ${
                      isDark ? "bg-neutral-800" : "bg-neutral-200"
                    }`}
                    style={{
                      animation: "grow 0.8s ease forwards",
                      animationDelay: `${parseFloat(delay) + 0.3}s`,
                      width: 0,
                      maxWidth: "3rem",
                    }}
                  />
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}
