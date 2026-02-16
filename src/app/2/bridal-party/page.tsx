import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { weddingConfig } from "../../../../wedding.config";

const { bridalParty } = weddingConfig;

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

export default function Variant2BridalParty() {
  return (
    <div className="space-y-16">
      {/* Page Header */}
      <div
        style={{
          animation: "fadeInUp 0.6s ease forwards",
          opacity: 0,
        }}
      >
        <p className="text-[10px] font-medium tracking-[0.15em] uppercase text-neutral-400">
          Our People
        </p>
        <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl tracking-tight text-neutral-900 sm:text-5xl">
          Bridal Party
        </h1>
        <p className="mt-3 max-w-md text-[15px] font-light leading-relaxed text-neutral-500">
          The people who mean the most to us.
        </p>
      </div>

      {/* Party Grid — asymmetric: first two cards span wider */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {bridalParty.map((member, i) => (
          <Card
            key={member.name}
            className="group overflow-hidden rounded-xl border border-neutral-100 shadow-none transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            style={{
              animation: "fadeInUp 0.6s ease forwards",
              animationDelay: `${(i + 1) * 0.1}s`,
              opacity: 0,
            }}
          >
            <div className="border-t-2 border-neutral-900" />
            <CardContent className="flex flex-col items-center p-6 text-center sm:p-7">
              {/* Avatar */}
              {member.image ? (
                <div className="relative h-20 w-20 overflow-hidden rounded-full ring-2 ring-neutral-100 ring-offset-2 transition-all duration-300 group-hover:ring-neutral-200">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-neutral-100 ring-2 ring-neutral-100 ring-offset-2 transition-all duration-300 group-hover:bg-neutral-200">
                  <span className="font-[family-name:var(--font-display)] text-lg text-neutral-500">
                    {getInitials(member.name)}
                  </span>
                </div>
              )}

              {/* Info */}
              <h2 className="mt-5 font-[family-name:var(--font-display)] text-lg text-neutral-900">
                {member.name}
              </h2>
              <p className="mt-1 text-[10px] font-medium tracking-[0.15em] uppercase text-neutral-400">
                {member.role}
              </p>
              <p className="mt-3 text-sm font-light leading-relaxed text-neutral-500">
                {member.bio}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
