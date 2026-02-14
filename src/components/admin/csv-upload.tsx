"use client";

import { useState, useRef } from "react";
import { importGuests, type ImportResult } from "@/actions/guests";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
    if (res.success) {
      formRef.current?.reset();
    }
  }

  return (
    <div className="space-y-3">
      <form ref={formRef} action={handleSubmit} className="flex items-end gap-3">
        <div className="flex-1">
          <Input type="file" name="file" accept=".csv" required />
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? "Importing..." : "Import CSV"}
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
            <p>
              Imported {result.householdsCreated} household(s) with{" "}
              {result.guestsCreated} guest(s).
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
