import { weddingConfig } from "../../../../wedding.config";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Variant4Details() {
  const { schedule, venue } = weddingConfig;

  const sections = [
    { number: "01", label: "Schedule" },
    { number: "02", label: "Venues" },
  ];

  return (
    <div className="space-y-0">
      <h1
        className="mb-8 font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight sm:text-3xl"
        style={{ animation: "fadeIn 0.4s ease forwards" }}
      >
        Details
      </h1>

      {/* Schedule */}
      <section
        className="border-t border-neutral-200 py-6"
        style={{ animation: "fadeIn 0.4s ease forwards", animationDelay: "0.05s", opacity: 0 }}
      >
        <div className="mb-4 flex items-baseline gap-3">
          <span className="font-[family-name:var(--font-display)] text-sm text-neutral-300">
            {sections[0].number} &mdash;
          </span>
          <h2 className="font-[family-name:var(--font-display)] text-sm font-bold uppercase tracking-wider">
            {sections[0].label}
          </h2>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="border-neutral-200 hover:bg-transparent">
              <TableHead className="w-[100px] font-[family-name:var(--font-display)] text-[10px] uppercase tracking-[0.15em] text-neutral-400">
                Time
              </TableHead>
              <TableHead className="font-[family-name:var(--font-display)] text-[10px] uppercase tracking-[0.15em] text-neutral-400">
                Event
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {schedule.map((item, i) => (
              <TableRow
                key={item.time}
                className="border-neutral-100 transition-colors duration-150 hover:bg-neutral-50"
                style={{
                  animation: "fadeIn 0.4s ease forwards",
                  animationDelay: `${0.1 + i * 0.05}s`,
                  opacity: 0,
                }}
              >
                <TableCell className="font-[family-name:var(--font-display)] text-xs tabular-nums text-neutral-600">
                  {item.time}
                </TableCell>
                <TableCell className="text-sm text-neutral-800">
                  {item.event}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>

      {/* Venues */}
      <section
        className="border-t border-neutral-200 py-6"
        style={{ animation: "fadeIn 0.4s ease forwards", animationDelay: "0.2s", opacity: 0 }}
      >
        <div className="mb-4 flex items-baseline gap-3">
          <span className="font-[family-name:var(--font-display)] text-sm text-neutral-300">
            {sections[1].number} &mdash;
          </span>
          <h2 className="font-[family-name:var(--font-display)] text-sm font-bold uppercase tracking-wider">
            {sections[1].label}
          </h2>
        </div>

        <div className="space-y-4">
          {[
            { label: "Ceremony", data: venue.ceremony },
            { label: "Reception", data: venue.reception },
          ].map((v) => (
            <div key={v.label} className="grid grid-cols-[80px_1fr] gap-2 text-sm">
              <span className="font-[family-name:var(--font-display)] text-[11px] uppercase tracking-wider text-neutral-400">
                {v.label}
              </span>
              <div>
                <p className="font-medium text-neutral-900">{v.data.name}</p>
                <p className="text-neutral-500">{v.data.address}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
