"use client";

import { useEffect } from "react";
import * as Sentry from "@sentry/nextjs";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error, {
      tags: { boundary: "global-error" },
      extra: { digest: error.digest },
    });
  }, [error]);

  return (
    <html>
      <body className="flex min-h-screen items-center justify-center bg-background px-6 text-primary">
        <main className="max-w-md text-center">
          <h1 className="font-serif text-3xl">Something went wrong</h1>
          <p className="mt-3 text-sm text-foreground-muted">
            We hit an unexpected issue. Please try again in a moment.
          </p>
          <button
            onClick={() => reset()}
            className="mt-6 inline-flex rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
            type="button"
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
