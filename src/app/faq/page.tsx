import { SiteNav } from "@/components/layout/site-nav";
import { weddingConfig } from "../../../wedding.config";

export default function FaqPage() {
  return (
    <>
      <SiteNav />
      <main className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="text-2xl font-semibold">FAQ</h1>
        <div className="mt-6 space-y-4">
          {weddingConfig.faq.map((item) => (
            <article key={item.question} className="rounded-lg border p-4">
              <h2 className="font-medium">{item.question}</h2>
              <p className="mt-2 text-zinc-600">{item.answer}</p>
            </article>
          ))}
        </div>
      </main>
    </>
  );
}
