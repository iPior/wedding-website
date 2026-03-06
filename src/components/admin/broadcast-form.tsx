"use client";

import { useState, useRef } from "react";
import { sendBroadcastEmail, type BroadcastResult } from "@/actions/emails";

export function BroadcastForm({ subscriberCount }: { subscriberCount: number }) {
  const [result, setResult] = useState<BroadcastResult | null>(null);
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(formData: FormData) {
    if (!confirm(`Send this email to ${subscriberCount} subscriber(s)?`)) return;
    setLoading(true);
    setResult(null);
    const res = await sendBroadcastEmail(formData);
    setResult(res);
    setLoading(false);
    if (res.success) formRef.current?.reset();
  }

  return (
    <div className="space-y-5">
      <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-muted-foreground)]">Compose Broadcast</p>

      <form ref={formRef} action={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="subject" className="block text-[10px] uppercase tracking-[0.25em] text-[var(--color-muted-foreground)]">
            Subject
          </label>
          <input
            id="subject"
            name="subject"
            placeholder="Wedding Update"
            required
            className="mt-2 w-full border border-[var(--color-border)] bg-card/60 px-3 py-2 text-sm text-[var(--color-primary)] outline-none transition-colors focus:border-[var(--color-accent)] placeholder:text-[var(--color-muted-foreground)]/40"
          />
        </div>

        <div>
          <label htmlFor="body" className="block text-[10px] uppercase tracking-[0.25em] text-[var(--color-muted-foreground)]">
            Message
          </label>
          <textarea
            id="body"
            name="body"
            placeholder="Write your message here..."
            rows={8}
            required
            className="mt-2 w-full border border-[var(--color-border)] bg-card/60 px-3 py-2 text-sm text-[var(--color-primary)] outline-none transition-colors focus:border-[var(--color-accent)] placeholder:text-[var(--color-muted-foreground)]/40 resize-none"
          />
          <p className="mt-1 text-[10px] uppercase tracking-[0.15em] text-[var(--color-muted-foreground)]/60">
            Use blank lines to separate paragraphs.
          </p>
        </div>

        <button
          type="submit"
          disabled={loading || subscriberCount === 0}
          className="bg-[var(--color-primary)] px-6 py-3 text-[11px] uppercase tracking-[0.25em] text-[var(--color-background)] transition-colors hover:bg-[var(--color-accent)] disabled:opacity-40"
        >
          {loading ? "Sending..." : `Send to ${subscriberCount} Subscriber(s)`}
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
            <p>Sent to {result.sentCount} subscriber(s).</p>
          ) : (
            <p>{result.error}</p>
          )}
        </div>
      )}
    </div>
  );
}
