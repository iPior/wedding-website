"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
        <Input
          placeholder="Search by name..."
          defaultValue={currentSearch}
          onChange={(e) => updateParams("search", e.target.value)}
        />
      </div>
      <div className="flex gap-1">
        {STATUS_OPTIONS.map((opt) => (
          <Button
            key={opt.value}
            variant={currentStatus === opt.value ? "default" : "outline"}
            size="sm"
            onClick={() => updateParams("status", opt.value)}
          >
            {opt.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
