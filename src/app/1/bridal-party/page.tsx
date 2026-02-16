import Image from "next/image";
import { weddingConfig } from "../../../../wedding.config";

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export default function BridalPartyPage() {
  return (
    <div>
      {/* Page heading */}
      <section className="mx-auto max-w-2xl px-6 pb-20 pt-16 sm:pt-24">
        <div className="max-w-xl">
          <h1
            className="text-[3.5rem] font-light leading-[0.85] tracking-[-0.04em] text-neutral-900 sm:text-[6rem]"
            style={{
              fontFamily: "var(--font-display)",
              animation: "fadeInUp 0.8s ease forwards",
              opacity: 0,
            }}
          >
            Bridal Party
          </h1>
          <div
            className="mt-8 h-px bg-neutral-200"
            style={{
              animation: "revealLine 0.8s ease forwards",
              animationDelay: "0.2s",
              width: 0,
            }}
          />
        </div>
      </section>

      {/* Members */}
      <section className="mx-auto max-w-2xl px-6 pb-32">
        <div className="space-y-0">
          {weddingConfig.bridalParty.map((member, i) => (
            <div
              key={member.name}
              className="group flex items-start gap-8 border-b border-neutral-100 py-10 first:border-t sm:gap-12"
              style={{
                animation: "fadeInUp 0.7s ease forwards",
                animationDelay: `${0.25 + i * 0.1}s`,
                opacity: 0,
              }}
            >
              {/* Portrait / Initials */}
              <div className="relative h-20 w-20 shrink-0 overflow-hidden bg-neutral-50 sm:h-24 sm:w-24">
                {member.image ? (
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover grayscale transition-all duration-700 group-hover:grayscale-0"
                    sizes="96px"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <span
                      className="text-lg font-light tracking-[-0.02em] text-neutral-300"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {getInitials(member.name)}
                    </span>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="pt-1">
                <p
                  className="text-[1.4rem] font-light leading-[1] tracking-[-0.03em] text-neutral-900 sm:text-[1.7rem]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {member.name}
                </p>
                <p
                  className="mt-2 text-[0.6rem] uppercase tracking-[0.25em] text-neutral-300"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {member.role}
                </p>
                <p
                  className="mt-3 max-w-xs text-sm font-light leading-relaxed text-neutral-400"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
