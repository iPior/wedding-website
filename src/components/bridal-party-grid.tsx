"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { FadeIn } from "@/components/fade-in";

type Member = {
  name: string;
  role: string;
  image: string;
};

function BridalPartyRow({
  members,
  roleLabels,
  rowIndex,
}: {
  members: Member[];
  roleLabels: Record<string, string>;
  rowIndex: number;
}) {
  const withImages = members.filter((m) => m.image);
  const [loadedCount, setLoadedCount] = useState(0);
  const rowReady = withImages.length === 0 || loadedCount >= withImages.length;

  const handleLoad = useCallback(() => {
    setLoadedCount((c) => c + 1);
  }, []);

  return (
    <FadeIn delay={Math.min(rowIndex * 0.15, 0.45)} threshold={0.01}>
      <div className="grid grid-cols-2 gap-8">
        {members.map((member) => (
          <div key={member.name}>
            <div className="aspect-[3/4] overflow-hidden rounded-sm bg-gradient-to-br from-gradient-rose-light to-gradient-rose mb-3">
              {member.image ? (
                <Image
                  src={member.image}
                  alt={member.name}
                  width={300}
                  height={400}
                  sizes="(max-width: 768px) 45vw, 300px"
                  className="h-full w-full object-cover transition-opacity duration-500"
                  style={{ opacity: rowReady ? 1 : 0 }}
                  onLoad={handleLoad}
                />
              ) : null}
            </div>
            <h3
              className="text-lg text-primary mb-1"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              {member.name}
            </h3>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-1">
              {roleLabels[member.role]}
            </p>
          </div>
        ))}
      </div>
    </FadeIn>
  );
}

export function BridalPartyGrid({
  members,
  roleLabels,
}: {
  members: Member[];
  roleLabels: Record<string, string>;
}) {
  // Group members into rows of 2
  const rows: Member[][] = [];
  for (let i = 0; i < members.length; i += 2) {
    rows.push(members.slice(i, i + 2));
  }

  return (
    <div className="flex flex-col gap-8">
      {rows.map((row, rowIndex) => (
        <BridalPartyRow
          key={row.map((m) => m.name).join("-")}
          members={row}
          roleLabels={roleLabels}
          rowIndex={rowIndex}
        />
      ))}
    </div>
  );
}
