"use client";

import { useRouter, useSearchParams } from "next/navigation";

const STATUS_OPTIONS = [
  { value: "", label: "All" },
  { value: "YES", label: "Attending" },
  { value: "NO", label: "Declined" },
  { value: "PENDING", label: "Pending" },
];

const SORT_OPTIONS = [
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
  const currentStatus = searchParams.get("status") ?? "";
  const sortFromQuery = searchParams.get("sort") ?? "name_asc";
  const dietaryFromQuery = searchParams.get("dietary") ?? "";

  const currentSort = SORT_OPTIONS.some((opt) => opt.value === sortFromQuery)
    ? sortFromQuery
    : "name_asc";
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
    updateParams("sort", value === "name_asc" ? "" : value);
  }

  return (
    <div className="space-y-3">
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

      <div className="grid gap-2 sm:max-w-md sm:grid-cols-2">
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
    </div>
  );
}
