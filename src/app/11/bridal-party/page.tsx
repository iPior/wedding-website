import Image from "next/image";
import { weddingConfig } from "../../../../wedding.config";

export default function BridalPartyPage() {
  return (
    <main className="max-w-7xl mx-auto px-6 md:px-12 py-24">
      {/* Section header — offset grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-16">
        <div className="md:col-span-4">
          <p className="text-xs uppercase tracking-[0.3em] text-[#d4a0b0] mb-3">
            001
          </p>
          <h2
            className="text-4xl md:text-5xl text-[#2c2424]"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            The Wedding
            <br />
            Party
          </h2>
        </div>
        <div className="md:col-start-6 md:col-span-6">
          <p className="text-lg leading-relaxed text-[#5a4f4f] md:mt-10">
            The people who have stood by us through it all, and who we are
            honored to have by our side on the big day.
          </p>
        </div>
      </div>

      {/* Asymmetric card grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
        {weddingConfig.bridalParty.map((member, i) => {
          // Alternate offset positions for asymmetric layout
          const colClasses = [
            "md:col-span-5 md:col-start-1",
            "md:col-span-5 md:col-start-7",
            "md:col-span-5 md:col-start-2",
            "md:col-span-5 md:col-start-8",
          ];
          const colClass = colClasses[i % 4];

          return (
            <div key={member.name} className={`${colClass} mb-8`}>
              {/* Photo / placeholder */}
              <div className="aspect-[4/5] rounded-sm overflow-hidden mb-5 bg-gradient-to-br from-[#F7e0e8] to-[#ffdae9]">
                {member.image ? (
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={500}
                    height={625}
                    className="w-full h-full object-cover"
                  />
                ) : null}
              </div>

              {/* Role label */}
              <p className="text-xs uppercase tracking-[0.2em] text-[#8a7f7f] mb-1">
                {member.role}
              </p>

              {/* Name */}
              <h3
                className="text-2xl text-[#2c2424] mb-2"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                {member.name}
              </h3>

              {/* Bio */}
              <p className="text-sm text-[#8a7f7f] leading-relaxed">
                {member.bio}
              </p>
            </div>
          );
        })}
      </div>
    </main>
  );
}
