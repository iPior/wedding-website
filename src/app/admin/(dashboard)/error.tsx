"use client";

import { useEffect } from "react";
import * as Sentry from "@sentry/nextjs";

export default function AdminDashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error, {
      tags: { boundary: "admin-dashboard-error" },
      extra: { digest: error.digest },
    });
  }, [error]);

  return (
    <main className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-6 text-center">
      <h1 className="text-3xl font-semibold text-[var(--color-primary)]">Admin page failed to load</h1>
      <p className="mt-3 text-sm text-[var(--color-foreground-muted)]">Please retry. If it keeps failing, check Sentry for details.</p>
      <button
        className="mt-6 inline-flex rounded-md bg-[var(--color-primary)] px-4 py-2 text-sm font-semibold text-[var(--color-primary-foreground)]"
        onClick={() => reset()}
        type="button"
      >
        Retry
      </button>
    </main>
  );
}
