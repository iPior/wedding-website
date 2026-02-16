import { weddingConfig } from "../../../../wedding.config";
import Image from "next/image";

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

export default function Variant7BridalParty() {
  const { bridalParty } = weddingConfig;

  return (
    <div className="space-y-16 text-center">
      {/* Page heading */}
      <div
        className="space-y-4"
        style={{ animation: "fadeInUp 1s ease-out forwards", opacity: 0 }}
      >
        <h1 className="font-[family-name:var(--font-display)] text-4xl tracking-wide text-[#C47D5A] sm:text-5xl">
          Wedding Party
        </h1>
        <p className="font-[family-name:var(--font-body)] text-sm font-light text-[#8A7B72]">
          The wonderful people standing by our side.
        </p>
      </div>

      {/* Party members grid */}
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
        {bridalParty.map((member, index) => (
          <div
            key={member.name}
            className="flex flex-col items-center space-y-4 rounded-xl bg-[#FFF0E8] px-6 py-8 shadow-[0_4px_24px_rgba(196,125,90,0.06)]"
            style={{
              animation: "scaleEntry 1s ease-out forwards",
              animationDelay: `${0.3 + index * 0.2}s`,
              opacity: 0,
            }}
          >
            {/* Portrait circle with lavender ring */}
            {member.image ? (
              <div className="relative size-28 overflow-hidden rounded-full ring-2 ring-[#D4A8C8] ring-offset-4 ring-offset-[#FFF0E8] sm:size-32">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="flex size-28 items-center justify-center rounded-full bg-[#FFF9F5] ring-2 ring-[#D4A8C8] ring-offset-4 ring-offset-[#FFF0E8] sm:size-32">
                <span className="font-[family-name:var(--font-display)] text-xl text-[#C47D5A]">
                  {getInitials(member.name)}
                </span>
              </div>
            )}

            {/* Name */}
            <p className="mt-2 font-[family-name:var(--font-display)] text-xl tracking-wide text-[#C47D5A]">
              {member.name}
            </p>

            {/* Role */}
            <p className="font-[family-name:var(--font-body)] text-xs font-semibold uppercase tracking-[0.2em] text-[#D4A8C8]">
              {member.role}
            </p>

            {/* Bio */}
            <p className="font-[family-name:var(--font-body)] text-sm font-light leading-relaxed text-[#8A7B72]">
              {member.bio}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
