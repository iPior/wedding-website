"use client";

import { useState } from "react";
import { exportGuestsCsv } from "@/actions/guests";

export function CsvExportButton() {
  const [loading, setLoading] = useState(false);

  async function handleExport() {
    setLoading(true);
    const csv = await exportGuestsCsv();
    setLoading(false);

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `guests-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <button
      onClick={handleExport}
      disabled={loading}
      className="border border-[var(--color-accent)] px-4 py-2 text-[11px] uppercase tracking-[0.25em] text-[var(--color-muted-foreground)] transition-colors hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] disabled:opacity-40"
    >
      {loading ? "Exporting..." : "Export CSV"}
    </button>
  );
}
