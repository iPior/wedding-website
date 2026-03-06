"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

type Props = {
  data: Array<{ date: string; count: number }>;
};

export function RsvpTimeline({ data }: Props) {
  if (data.length === 0) {
    return (
      <p className="py-8 text-center text-xs uppercase tracking-[0.2em] text-[var(--color-muted-foreground)]">
        No RSVPs submitted yet.
      </p>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={data}>
        <XAxis dataKey="date" fontSize={10} tick={{ fill: "var(--color-muted-foreground)" }} axisLine={{ stroke: "var(--color-border)" }} tickLine={false} />
        <YAxis allowDecimals={false} fontSize={10} tick={{ fill: "var(--color-muted-foreground)" }} axisLine={false} tickLine={false} />
        <Tooltip
          contentStyle={{
            backgroundColor: "var(--color-background)",
            border: "1px solid var(--color-border)",
            borderRadius: 0,
            fontSize: 11,
            color: "var(--color-primary)",
          }}
        />
        <Line
          type="monotone"
          dataKey="count"
          stroke="var(--color-accent)"
          strokeWidth={2}
          dot={{ r: 3, fill: "var(--color-primary)", strokeWidth: 0 }}
          activeDot={{ r: 4, fill: "var(--color-accent)" }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
