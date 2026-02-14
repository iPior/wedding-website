"use client";

import { useState } from "react";
import { exportGuestsCsv } from "@/actions/guests";
import { Button } from "@/components/ui/button";

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
    <Button variant="outline" size="sm" onClick={handleExport} disabled={loading}>
      {loading ? "Exporting..." : "Export CSV"}
    </Button>
  );
}
