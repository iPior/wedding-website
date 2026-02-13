import { weddingConfig } from "../../wedding.config";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-semibold">
        {weddingConfig.couple.person1.firstName} &{" "}
        {weddingConfig.couple.person2.firstName}
      </h1>
      <p className="mt-3 text-zinc-600">
        Wedding template initialized. Continue with Phase 1 foundation tasks.
      </p>
    </main>
  );
}
