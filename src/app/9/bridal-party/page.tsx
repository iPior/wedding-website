import Image from "next/image";
import { weddingConfig } from "../../../../wedding.config";

function Flourish({ className }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className ?? ""}`}>
      <div className="h-px flex-1 bg-[#DFD0D5]" />
      <span className="text-[#B8976B] text-lg">&#10087;</span>
      <div className="h-px flex-1 bg-[#DFD0D5]" />
    </div>
  );
}

export default function BridalPartyPage() {
  return (
    <div>
      {/* Page heading */}
      <section className="mx-auto max-w-3xl px-6 py-20 sm:py-28 text-center">
        <h1
          className="text-4xl sm:text-5xl md:text-6xl text-[#8B6B82]"
          style={{
            fontFamily: "var(--font-display)",
            animation: "fadeInUp 1s ease forwards",
            opacity: 0,
          }}
        >
          Bridal Party
        </h1>
        <p
          className="mt-4 text-base italic text-[#7D7274] max-w-md mx-auto"
          style={{
            fontFamily: "var(--font-body)",
            animation: "fadeInUp 1s ease forwards",
            animationDelay: "0.15s",
            opacity: 0,
          }}
        >
          The wonderful people standing by our side.
        </p>
        <div
          className="mx-auto mt-8 max-w-xs"
          style={{
            animation: "fadeIn 1s ease forwards",
            animationDelay: "0.3s",
            opacity: 0,
          }}
        >
          <Flourish />
        </div>
      </section>

      {/* Party grid */}
      <section className="mx-auto max-w-3xl px-6 pb-20 sm:pb-28">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2">
          {weddingConfig.bridalParty.map((member, i) => (
            <div
              key={member.name}
              className="text-center"
              style={{
                animation: "fadeInUp 1s ease forwards",
                animationDelay: `${0.3 + i * 0.15}s`,
                opacity: 0,
              }}
            >
              {/* Image circle with rose border ring */}
              <div className="mx-auto mb-5 h-36 w-36 overflow-hidden rounded-full ring-2 ring-[#DFD0D5] ring-offset-4 ring-offset-[#FBF7F4]">
                {member.image ? (
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={144}
                    height={144}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-[#EDE6F0]">
                    <span
                      className="text-3xl text-[#C9A8B5]"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                )}
              </div>

              {/* Name */}
              <h3
                className="text-xl text-[#8B6B82]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {member.name}
              </h3>

              {/* Role — small caps style */}
              <p
                className="mt-1 text-xs uppercase tracking-[0.2em] text-[#B8976B]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {member.role}
              </p>

              {/* Bio */}
              <p
                className="mt-3 text-sm italic leading-relaxed text-[#7D7274] max-w-xs mx-auto"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
