import { SiteNav } from "@/components/layout/site-nav";
import { weddingConfig } from "../../../wedding.config";

export default function BridalPartyPage() {
  return (
    <>
      <SiteNav />
      <main className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="text-2xl font-semibold">Bridal Party</h1>
        <div className="mt-6 space-y-4">
          {weddingConfig.bridalParty.map((member) => (
            <article key={member.name} className="rounded-lg border p-4">
              <h2 className="font-medium">{member.name}</h2>
              <p className="text-sm text-zinc-500">{member.role}</p>
              <p className="mt-2 text-zinc-600">{member.bio}</p>
            </article>
          ))}
        </div>
      </main>
    </>
  );
}
