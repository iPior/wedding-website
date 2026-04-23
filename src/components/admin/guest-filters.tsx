"use client";

import { useRouter, useSearchParams } from "next/navigation";

const STATUS_OPTIONS = [
  { value: "", label: "All" },
  { value: "YES", label: "Attending" },
  { value: "NO", label: "Declined" },
  { value: "PENDING", label: "Pending" },
];

const SORT_OPTIONS = [
  { value: "default", label: "Default" },
  { value: "name_asc", label: "Name (A-Z)" },
  { value: "name_desc", label: "Name (Z-A)" },
  { value: "rsvp_date_asc", label: "RSVP Date (Oldest)" },
  { value: "rsvp_date_desc", label: "RSVP Date (Newest)" },
];

const DIETARY_OPTIONS = [
  { value: "", label: "All" },
  { value: "with", label: "With restrictions" },
  { value: "without", label: "Without restrictions" },
];

export function GuestFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSearch = searchParams.get("search") ?? "";
  const statusFromQuery = searchParams.get("status") ?? "";
  const sortFromQuery = searchParams.get("sort") ?? "default";
  const dietaryFromQuery = searchParams.get("dietary") ?? "";
  const currentStatus = STATUS_OPTIONS.some((opt) => opt.value === statusFromQuery)
    ? statusFromQuery
    : "";

  const currentSort = SORT_OPTIONS.some((opt) => opt.value === sortFromQuery)
    ? sortFromQuery
    : "default";
  const currentDietary = DIETARY_OPTIONS.some((opt) => opt.value === dietaryFromQuery)
    ? dietaryFromQuery
    : "";

  function updateParams(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`?${params.toString()}`);
  }

  function updateSort(value: string) {
    updateParams("sort", value === "default" ? "" : value);
  }

  return (
    <div className="grid gap-2 sm:grid-cols-[minmax(240px,1fr)_160px_180px_180px] sm:items-end">
      <label className="space-y-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        Search
        <input
          placeholder="Search by name..."
          defaultValue={currentSearch}
          onChange={(e) => updateParams("search", e.target.value)}
          className="w-full border border-border bg-card/60 px-3 py-2 text-sm normal-case tracking-normal text-primary outline-none transition-colors focus:border-accent placeholder:text-muted-foreground/40"
        />
      </label>

      <label className="space-y-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        RSVP
        <select
          value={currentStatus}
          onChange={(e) => updateParams("status", e.target.value)}
          className="w-full border border-border bg-card/60 px-3 py-2 text-xs uppercase tracking-[0.12em] text-primary outline-none transition-colors focus:border-accent"
        >
          {STATUS_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </label>

      <label className="space-y-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        Sort
        <select
          value={currentSort}
          onChange={(e) => updateSort(e.target.value)}
          className="w-full border border-border bg-card/60 px-3 py-2 text-xs uppercase tracking-[0.12em] text-primary outline-none transition-colors focus:border-accent"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </label>

      <label className="space-y-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        Dietary
        <select
          value={currentDietary}
          onChange={(e) => updateParams("dietary", e.target.value)}
          className="w-full border border-border bg-card/60 px-3 py-2 text-xs uppercase tracking-[0.12em] text-primary outline-none transition-colors focus:border-accent"
        >
          {DIETARY_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
