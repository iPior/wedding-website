"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

type Props = {
  data: Array<{ date: string; count: number }>;
};

export function RsvpTimeline({ data }: Props) {
  if (data.length === 0) {
    return <p className="py-8 text-center text-sm text-muted-foreground">No RSVPs submitted yet.</p>;
  }

  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={data}>
        <XAxis dataKey="date" fontSize={12} />
        <YAxis allowDecimals={false} fontSize={12} />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="count"
          stroke="#8B7355"
          strokeWidth={2}
          dot={{ r: 3 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
