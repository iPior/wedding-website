import { weddingConfig } from "../../../../wedding.config";
import Image from "next/image";

export default function Variant10BridalParty() {
  const { bridalParty } = weddingConfig;

  return (
    <div>
      {/* Header */}
      <section className="px-6 py-20 text-center">
        <div className="mx-auto max-w-4xl">
          <div
            className="flex items-center justify-center gap-3 mb-4"
            style={{
              animation: "fadeIn 0.6s ease-out forwards",
              opacity: 0,
            }}
          >
            <div className="h-px w-12 bg-[#C9A84C]/50" />
            <div className="size-2 rotate-45 border border-[#C9A84C]" />
            <div className="h-px w-12 bg-[#C9A84C]/50" />
          </div>

          <h1
            className="font-[family-name:var(--font-display)] text-4xl tracking-wide text-[#2D4A3E] sm:text-5xl"
            style={{
              animation: "fadeInUp 0.6s ease-out forwards",
              animationDelay: "0.15s",
              opacity: 0,
            }}
          >
            The Wedding Party
          </h1>
        </div>
      </section>

      {/* Party Members — 2-col grid */}
      <section className="mx-auto max-w-4xl px-6 pb-24">
        <div className="grid gap-8 sm:grid-cols-2">
          {bridalParty.map((member, index) => (
            <div
              key={member.name}
              className="relative bg-[#EFF5F1] p-8 text-center"
              style={{
                animation: "slideUp 0.6s ease-out forwards",
                animationDelay: `${0.15 + index * 0.12}s`,
                opacity: 0,
              }}
            >
              {/* Geometric corner accents */}
              <div className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-[#C9A84C]" />
              <div className="absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 border-[#C9A84C]" />
              <div className="absolute bottom-0 left-0 w-6 h-6 border-l-2 border-b-2 border-[#C9A84C]" />
              <div className="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 border-[#C9A84C]" />

              {/* Image circle with gold ring */}
              <div className="mx-auto mb-5 flex size-28 items-center justify-center rounded-full border-2 border-[#C9A84C] bg-[#F9F7F2]">
                {member.image ? (
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={112}
                    height={112}
                    className="size-[104px] rounded-full object-cover"
                  />
                ) : (
                  <div className="flex size-[104px] items-center justify-center rounded-full bg-[#B5CDC3]/30">
                    <span className="font-[family-name:var(--font-display)] text-3xl text-[#2D4A3E]/40">
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                )}
              </div>

              <h3 className="font-[family-name:var(--font-display)] text-xl tracking-wide text-[#2D4A3E]">
                {member.name}
              </h3>
              <p className="mt-1 font-[family-name:var(--font-body)] text-[10px] font-medium uppercase tracking-[0.25em] text-[#C9A84C]">
                {member.role}
              </p>
              <p className="mt-3 font-[family-name:var(--font-body)] text-sm font-light leading-relaxed text-[#6B7B74]">
                {member.bio}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom ornament */}
        <div
          className="mt-16 flex items-center justify-center gap-4"
          style={{
            animation: "fadeIn 0.6s ease-out forwards",
            animationDelay: "0.8s",
            opacity: 0,
          }}
        >
          <div className="h-px w-16 bg-[#C5D5CD]" />
          <div className="flex items-center gap-2">
            <div className="h-4 w-px bg-[#C9A84C]/60 rotate-[-20deg]" />
            <div className="h-5 w-px bg-[#C9A84C]/80" />
            <div className="h-6 w-px bg-[#C9A84C]" />
            <div className="h-7 w-px bg-[#C9A84C]" />
            <div className="h-6 w-px bg-[#C9A84C]" />
            <div className="h-5 w-px bg-[#C9A84C]/80" />
            <div className="h-4 w-px bg-[#C9A84C]/60 rotate-[20deg]" />
          </div>
          <div className="h-px w-16 bg-[#C5D5CD]" />
        </div>
      </section>
    </div>
  );
}
