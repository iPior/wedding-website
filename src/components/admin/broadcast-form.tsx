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
      <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Compose Broadcast</p>

      <form ref={formRef} action={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="subject" className="block text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            Subject
          </label>
          <input
            id="subject"
            name="subject"
            placeholder="Wedding Update"
            required
            className="mt-2 w-full border border-border bg-card/60 px-3 py-2 text-sm text-primary outline-none transition-colors focus:border-accent placeholder:text-muted-foreground/40"
          />
        </div>

        <div>
          <label htmlFor="body" className="block text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            Message
          </label>
          <textarea
            id="body"
            name="body"
            placeholder="Write your message here..."
            rows={8}
            required
            className="mt-2 w-full border border-border bg-card/60 px-3 py-2 text-sm text-primary outline-none transition-colors focus:border-accent placeholder:text-muted-foreground/40 resize-none"
          />
          <p className="mt-1 text-[10px] uppercase tracking-[0.15em] text-muted-foreground/60">
            Use blank lines to separate paragraphs.
          </p>
        </div>

        <button
          type="submit"
          disabled={loading || subscriberCount === 0}
          className="bg-primary px-6 py-3 text-[11px] uppercase tracking-[0.25em] text-background transition-colors hover:bg-accent disabled:opacity-40"
        >
          {loading ? "Sending..." : `Send to ${subscriberCount} Subscriber(s)`}
        </button>
      </form>

      {result && (
        <div
          className={`border p-3 text-xs uppercase tracking-[0.15em] ${
            result.success
              ? "border-accent/40 bg-accent/10 text-primary"
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
