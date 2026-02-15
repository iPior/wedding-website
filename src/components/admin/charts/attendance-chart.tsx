"use client";

import { PieChart, Pie, Cell, Legend, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = { YES: "#16a34a", NO: "#dc2626", PENDING: "#a1a1aa" };

type Props = {
  data: Array<{ name: string; value: number }>;
};

export function AttendanceChart({ data }: Props) {
  if (data.every((d) => d.value === 0)) {
    return <p className="py-8 text-center text-sm text-muted-foreground">No RSVP data yet.</p>;
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
              fill={COLORS[entry.name as keyof typeof COLORS] ?? "#8884d8"}
            />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
