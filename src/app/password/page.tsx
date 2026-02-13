import { PasswordForm } from "@/components/layout/password-form";

type PasswordPageProps = {
  searchParams: Promise<{ error?: string }>;
};

const ERROR_MESSAGES: Record<string, string> = {
  invalid: "Incorrect password. Please try again.",
  misconfigured: "SITE_PASSWORD is not configured yet.",
};

export default async function PasswordPage({ searchParams }: PasswordPageProps) {
  const { error } = await searchParams;
  const errorMessage = error ? ERROR_MESSAGES[error] ?? "Something went wrong." : undefined;

  return (
    <main className="mx-auto flex min-h-screen max-w-md items-center px-4 py-12">
      <section className="w-full rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-semibold">Welcome to our wedding website</h1>
        <p className="mt-2 text-sm text-zinc-600">
          Enter the password from your invitation to continue.
        </p>
        <PasswordForm errorMessage={errorMessage} />
      </section>
    </main>
  );
}
