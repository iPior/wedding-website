"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

type Props = {
  data: Array<{ name: string; count: number }>;
};

export function MealChart({ data }: Props) {
  if (data.length === 0 || data.every((d) => d.count === 0)) {
    return <p className="py-8 text-center text-sm text-muted-foreground">No meal data yet.</p>;
  }

  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={data}>
        <XAxis dataKey="name" fontSize={12} />
        <YAxis allowDecimals={false} fontSize={12} />
        <Tooltip />
        <Bar dataKey="count" fill="#8B7355" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
