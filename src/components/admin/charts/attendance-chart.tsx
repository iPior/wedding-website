"use client";

import { PieChart, Pie, Cell, Legend, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = { YES: "var(--color-primary)", NO: "var(--color-accent)", PENDING: "var(--color-status-pending)" };

type Props = {
  data: Array<{ name: string; value: number }>;
};

export function AttendanceChart({ data }: Props) {
  if (data.every((d) => d.value === 0)) {
    return (
      <p className="py-8 text-center text-xs uppercase tracking-[0.2em] text-[var(--color-muted-foreground)]">
        No RSVP data yet.
      </p>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={50}
          outerRadius={80}
          dataKey="value"
          label={({ name, value }) => `${name}: ${value}`}
        >
          {data.map((entry) => (
            <Cell
              key={entry.name}
              fill={COLORS[entry.name as keyof typeof COLORS] ?? "var(--color-muted-foreground)"}
            />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: "var(--color-background)",
            border: "1px solid var(--color-border)",
            borderRadius: 0,
            fontSize: 11,
            color: "var(--color-primary)",
          }}
        />
        <Legend
          formatter={(value) => (
            <span style={{ fontSize: 11, color: "var(--color-muted-foreground)", textTransform: "uppercase", letterSpacing: "0.15em" }}>
              {value}
            </span>
          )}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
