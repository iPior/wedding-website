import { weddingConfig } from "../../../../wedding.config";
import Image from "next/image";

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

export default function Variant6BridalParty() {
  const { bridalParty } = weddingConfig;

  return (
    <div className="space-y-16 text-center">
      {/* Page heading */}
      <div
        className="space-y-4"
        style={{ animation: "fadeInUp 0.8s ease forwards", opacity: 0 }}
      >
        <h1 className="font-[family-name:var(--font-display)] text-4xl font-light tracking-wide text-[#5B7B5E] sm:text-5xl">
          Wedding Party
        </h1>
        <div className="flex items-center justify-center gap-3">
          <div className="h-px w-12 bg-[#5B7B5E]/20" />
          <span className="text-sm text-[#5B7B5E]/40">✿</span>
          <div className="h-px w-12 bg-[#5B7B5E]/20" />
        </div>
        <p className="font-[family-name:var(--font-body)] text-sm font-light italic text-[#7A7A6E]">
          The wonderful people standing by our side.
        </p>
      </div>

      {/* Party members — 2 col grid */}
      <div className="grid grid-cols-1 gap-14 sm:grid-cols-2">
        {bridalParty.map((member, index) => (
          <div
            key={member.name}
            className="group flex flex-col items-center space-y-4"
            style={{
              animation: "fadeInUp 0.8s ease forwards",
              animationDelay: `${0.3 + index * 0.2}s`,
              opacity: 0,
            }}
          >
            {/* Portrait — rounded-full */}
            {member.image ? (
              <div className="relative size-32 overflow-hidden rounded-full border-2 border-[#DDD5CA] shadow-[0_2px_20px_rgba(91,123,94,0.08)] transition-shadow duration-300 group-hover:shadow-[0_4px_24px_rgba(91,123,94,0.14)] sm:size-36">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="flex size-32 items-center justify-center rounded-full border-2 border-[#DDD5CA] bg-[#EEE8E0] shadow-[0_2px_20px_rgba(91,123,94,0.08)] transition-shadow duration-300 group-hover:shadow-[0_4px_24px_rgba(91,123,94,0.14)] sm:size-36">
                <span className="font-[family-name:var(--font-display)] text-2xl font-light tracking-wider text-[#5B7B5E]/50">
                  {getInitials(member.name)}
                </span>
              </div>
            )}

            {/* Name in Fraunces */}
            <p className="font-[family-name:var(--font-display)] text-xl font-light italic tracking-wide text-neutral-800">
              {member.name}
            </p>

            {/* Role — sage uppercase */}
            <p className="font-[family-name:var(--font-body)] text-xs font-medium uppercase tracking-[0.2em] text-[#5B7B5E]">
              {member.role}
            </p>

            {/* Bio */}
            <p className="mx-auto max-w-xs font-[family-name:var(--font-body)] text-sm font-light leading-relaxed text-[#7A7A6E]">
              {member.bio}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
