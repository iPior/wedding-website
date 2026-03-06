"use client";

import { useState, useRef } from "react";
import { importGuests, type ImportResult } from "@/actions/guests";

export function CsvUpload() {
  const [result, setResult] = useState<ImportResult | null>(null);
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setResult(null);
    const res = await importGuests(formData);
    setResult(res);
    setLoading(false);
    if (res.success) formRef.current?.reset();
  }

  return (
    <div className="space-y-3">
      <form ref={formRef} action={handleSubmit} className="flex items-center gap-3">
        <input
          type="file"
          name="file"
          accept=".csv"
          required
          className="flex-1 text-xs text-[var(--color-muted-foreground)] file:mr-3 file:border-0 file:bg-[var(--color-border)] file:px-3 file:py-1.5 file:text-[11px] file:uppercase file:tracking-[0.2em] file:text-[var(--color-primary)] file:cursor-pointer"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-[var(--color-primary)] px-5 py-2 text-[11px] uppercase tracking-[0.25em] text-[var(--color-background)] transition-colors hover:bg-[var(--color-accent)] disabled:opacity-40 whitespace-nowrap"
        >
          {loading ? "Importing..." : "Import CSV"}
        </button>
      </form>

      {result && (
        <div
          className={`border p-3 text-xs uppercase tracking-[0.15em] ${
            result.success
              ? "border-[var(--color-accent)]/40 bg-[var(--color-accent)]/10 text-[var(--color-primary)]"
              : "border-destructive/30 bg-destructive/10 text-destructive"
          }`}
        >
          {result.success ? (
            <p>
              Imported {result.householdsCreated} household(s) with {result.guestsCreated} guest(s).
            </p>
          ) : (
            <ul className="list-inside list-disc space-y-1">
              {result.errors.map((err, i) => (
                <li key={i}>{err}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
