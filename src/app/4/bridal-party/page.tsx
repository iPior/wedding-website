import { weddingConfig } from "../../../../wedding.config";
import Image from "next/image";
import { User } from "lucide-react";

export default function Variant4BridalParty() {
  const { bridalParty } = weddingConfig;

  return (
    <div>
      <h1
        className="mb-8 font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight sm:text-3xl"
        style={{ animation: "fadeIn 0.4s ease forwards" }}
      >
        Bridal Party
      </h1>

      <div className="flex items-baseline gap-3">
        <span className="font-[family-name:var(--font-display)] text-sm text-neutral-300">
          01 &mdash;
        </span>
        <h2 className="font-[family-name:var(--font-display)] text-sm font-bold uppercase tracking-wider">
          The Crew
        </h2>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-px border border-neutral-200 bg-neutral-200 sm:grid-cols-4">
        {bridalParty.map((member, i) => (
          <div
            key={member.name}
            className="flex flex-col items-center gap-3 bg-white p-4"
            style={{
              animation: "fadeIn 0.4s ease forwards",
              animationDelay: `${0.1 + i * 0.05}s`,
              opacity: 0,
            }}
          >
            {member.image ? (
              <Image
                src={member.image}
                alt={member.name}
                width={56}
                height={56}
                className="size-14 rounded-full object-cover grayscale transition-all duration-150 hover:grayscale-0"
              />
            ) : (
              <div className="flex size-14 items-center justify-center rounded-full border border-neutral-200 bg-neutral-50">
                <User className="size-5 text-neutral-400" />
              </div>
            )}
            <div className="text-center">
              <p className="text-sm font-medium leading-tight text-neutral-900">
                {member.name}
              </p>
              <p className="mt-0.5 font-[family-name:var(--font-display)] text-[10px] uppercase tracking-[0.15em] text-neutral-400">
                {member.role}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
