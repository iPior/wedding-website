import Image from "next/image";
import { weddingConfig } from "../../../../../wedding.config";

export default function BridalPartyPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <p className="text-xs uppercase tracking-[0.3em] text-[#d4a0b0] mb-3">001</p>
      <h2
        className="text-5xl text-[#2c2424] mb-4"
        style={{ fontFamily: "var(--font-playfair), serif" }}
      >
        The Wedding Party
      </h2>
      <p className="text-base leading-relaxed text-[#5a4f4f] mb-12">
        The people who have stood by us through it all, and who we are honored
        to have by our side on the big day.
      </p>

      <div className="grid grid-cols-2 gap-8">
        {weddingConfig.bridalParty.map((member) => (
          <div key={member.name}>
            {/* <div className="aspect-square object-center overflow-hidden rounded-sm bg-gradient-to-br from-[#F7e0e8] to-[#ffdae9] mb-3"> */}
            <div className="aspect-[3/4] overflow-hidden rounded-sm bg-gradient-to-br from-[#F7e0e8] to-[#ffdae9] mb-3">
              {member.image ? (
                <Image
                  src={member.image}
                  alt={member.name}
                  width={300}
                  height={400}
                  className="w-full object-cover"
                />
              ) : null}
            </div>
            <h3
              className="text-lg text-[#2c2424] mb-1"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              {member.name}
            </h3>
            <p className="text-xs uppercase tracking-[0.2em] text-[#8a7f7f] mb-1">
              {member.role}
            </p>
            {/* <p className="text-xs text-[#8a7f7f] leading-relaxed">
              {member.bio}
            </p> */}
          </div>
        ))}
      </div>
    </main>
  );
}
