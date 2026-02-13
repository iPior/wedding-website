import { weddingConfig } from "../../wedding.config";
import { SiteNav } from "@/components/layout/site-nav";

export default function HomePage() {
  return (
    <>
      <SiteNav />
      <main className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="text-3xl font-semibold">
          {weddingConfig.couple.person1.firstName} &{" "}
          {weddingConfig.couple.person2.firstName}
        </h1>
        <p className="mt-3 text-zinc-600">
          {new Date(weddingConfig.date).toLocaleDateString()} at{" "}
          {weddingConfig.venue.reception.name}
        </p>
      </main>
    </>
  );
}
