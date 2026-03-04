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
      <body className="flex min-h-screen items-center justify-center bg-[#fff8f8] px-6 text-[#2c2424]">
        <main className="max-w-md text-center">
          <h1 className="font-serif text-3xl">Something went wrong</h1>
          <p className="mt-3 text-sm text-[#6c5a5a]">
            We hit an unexpected issue. Please try again in a moment.
          </p>
          <button
            onClick={() => reset()}
            className="mt-6 inline-flex rounded-md bg-[#2c2424] px-4 py-2 text-sm font-semibold text-white"
            type="button"
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
