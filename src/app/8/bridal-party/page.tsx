import { weddingConfig } from "../../../../wedding.config";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { User } from "lucide-react";

export default function Variant8BridalParty() {
  const { bridalParty } = weddingConfig;

  return (
    <div className="mx-auto max-w-4xl px-6 py-24">
      {/* Heading */}
      <div
        className="text-center"
        style={{
          animation: "fadeInUp 0.9s ease-in-out forwards",
          opacity: 0,
        }}
      >
        <h1 className="font-[family-name:var(--font-display)] text-4xl tracking-wide text-[#4A7C8A] sm:text-5xl">
          Wedding Party
        </h1>
        <svg
          viewBox="0 0 1200 40"
          className="mx-auto mt-6 h-6 w-full max-w-xs text-[#D0DDE3]"
        >
          <path
            d="M0,20 Q150,0 300,20 T600,20 T900,20 T1200,20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
        </svg>
      </div>

      {/* Grid */}
      <div className="mt-16 grid gap-8 sm:grid-cols-2">
        {bridalParty.map((member, index) => (
          <Card
            key={member.name}
            className="overflow-hidden rounded-xl border-[#D0DDE3] bg-[#EDF3F6] shadow-sm transition-shadow duration-500 hover:shadow-md"
            style={{
              animation: "fadeInUp 0.9s ease-in-out forwards",
              animationDelay: `${0.15 + index * 0.15}s`,
              opacity: 0,
            }}
          >
            <CardContent className="flex flex-col items-center p-8 text-center">
              {/* Photo circle with pale blue ring */}
              <div className="relative mb-5 size-28 overflow-hidden rounded-full ring-3 ring-[#A8C5D6] ring-offset-2 ring-offset-[#EDF3F6]">
                {member.image ? (
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex size-full items-center justify-center bg-[#A8C5D6]/20">
                    <User
                      className="size-10 text-[#A8C5D6]"
                      strokeWidth={1}
                    />
                  </div>
                )}
              </div>

              <h3 className="font-[family-name:var(--font-display)] text-lg tracking-wide text-[#4A7C8A]">
                {member.name}
              </h3>
              <p className="mt-1 font-[family-name:var(--font-body)] text-xs font-medium uppercase tracking-[0.2em] text-[#D4956A]">
                {member.role}
              </p>
              <p className="mt-3 font-[family-name:var(--font-body)] text-sm font-light leading-relaxed text-[#6B7F8A]">
                {member.bio}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
