import Image from "next/image";
import { weddingConfig } from "../../../wedding.config";
import { GuestLayout } from "@/components/layout/guest-layout";

export default function BridalPartyPage() {
  return (
    <GuestLayout>
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="font-playfair text-3xl font-semibold">
            Bridal Party
          </h1>
          <p className="mt-2 text-muted-foreground">
            The people standing by our side.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {weddingConfig.bridalParty.map((member) => (
            <article
              key={member.name}
              className="flex flex-col items-center text-center"
            >
              <div className="relative size-32 overflow-hidden rounded-full bg-muted sm:size-40">
                {member.image ? (
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 128px, 160px"
                  />
                ) : (
                  <div className="flex size-full items-center justify-center text-2xl font-semibold text-muted-foreground">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                )}
              </div>
              <h2 className="mt-4 font-playfair text-lg font-semibold">
                {member.name}
              </h2>
              <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                {member.role}
              </p>
              {member.bio && (
                <p className="mt-2 max-w-xs text-sm text-muted-foreground">
                  {member.bio}
                </p>
              )}
            </article>
          ))}
        </div>
      </div>
    </GuestLayout>
  );
}
