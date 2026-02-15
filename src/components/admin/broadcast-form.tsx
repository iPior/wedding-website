"use client";

import { useState, useRef } from "react";
import { sendBroadcastEmail, type BroadcastResult } from "@/actions/emails";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function BroadcastForm({ subscriberCount }: { subscriberCount: number }) {
  const [result, setResult] = useState<BroadcastResult | null>(null);
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(formData: FormData) {
    if (!confirm(`Send this email to ${subscriberCount} subscriber(s)?`)) {
      return;
    }

    setLoading(true);
    setResult(null);
    const res = await sendBroadcastEmail(formData);
    setResult(res);
    setLoading(false);

    if (res.success) {
      formRef.current?.reset();
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium">Compose Broadcast</h2>

      <form ref={formRef} action={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="subject">Subject</Label>
          <Input
            id="subject"
            name="subject"
            placeholder="Wedding Update"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="body">Message</Label>
          <Textarea
            id="body"
            name="body"
            placeholder="Write your message here..."
            rows={8}
            required
          />
          <p className="text-xs text-muted-foreground">
            Use blank lines to separate paragraphs.
          </p>
        </div>

        <Button type="submit" disabled={loading || subscriberCount === 0}>
          {loading ? "Sending..." : `Send to ${subscriberCount} Subscriber(s)`}
        </Button>
      </form>

      {result && (
        <div
          className={`rounded-md border p-3 text-sm ${
            result.success
              ? "border-green-200 bg-green-50 text-green-800"
              : "border-red-200 bg-red-50 text-red-800"
          }`}
        >
          {result.success ? (
            <p>Successfully sent to {result.sentCount} subscriber(s).</p>
          ) : (
            <p>{result.error}</p>
          )}
        </div>
      )}
    </div>
  );
}
