"use client";

import { useRouter, useSearchParams } from "next/navigation";

const STATUS_OPTIONS = [
  { value: "", label: "All" },
  { value: "YES", label: "Attending" },
  { value: "NO", label: "Declined" },
  { value: "PENDING", label: "Pending" },
];

export function GuestFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSearch = searchParams.get("search") ?? "";
  const currentStatus = searchParams.get("status") ?? "";

  function updateParams(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`?${params.toString()}`);
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
      <div className="flex-1">
        <input
          placeholder="Search by name..."
          defaultValue={currentSearch}
          onChange={(e) => updateParams("search", e.target.value)}
          className="w-full border border-border bg-card/60 px-3 py-2 text-sm text-primary outline-none transition-colors focus:border-accent placeholder:text-muted-foreground/40"
        />
      </div>
      <div className="flex gap-1">
        {STATUS_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => updateParams("status", opt.value)}
            className={`px-3 py-2 text-[11px] uppercase tracking-[0.2em] transition-colors ${
              currentStatus === opt.value
                ? "bg-primary text-background"
                : "border border-border text-muted-foreground hover:border-primary hover:text-primary"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
