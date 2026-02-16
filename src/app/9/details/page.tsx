import { weddingConfig } from "../../../../wedding.config";

const weddingDate = new Date(weddingConfig.date);
const formattedDate = weddingDate.toLocaleDateString("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
  year: "numeric",
});

function Flourish({ className }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className ?? ""}`}>
      <div className="h-px flex-1 bg-[#DFD0D5]" />
      <span className="text-[#B8976B] text-lg">&#10087;</span>
      <div className="h-px flex-1 bg-[#DFD0D5]" />
    </div>
  );
}

export default function DetailsPage() {
  return (
    <div>
      {/* Page heading */}
      <section className="mx-auto max-w-3xl px-6 py-20 sm:py-28 text-center">
        <h1
          className="text-4xl sm:text-5xl md:text-6xl text-[#8B6B82]"
          style={{
            fontFamily: "var(--font-display)",
            animation: "fadeInUp 1s ease forwards",
            opacity: 0,
          }}
        >
          Wedding Details
        </h1>
        <p
          className="mt-4 text-lg italic text-[#B8976B]"
          style={{
            fontFamily: "var(--font-body)",
            animation: "fadeInUp 1s ease forwards",
            animationDelay: "0.15s",
            opacity: 0,
          }}
        >
          {formattedDate}
        </p>
        <div
          className="mx-auto mt-8 max-w-xs"
          style={{
            animation: "fadeIn 1s ease forwards",
            animationDelay: "0.3s",
            opacity: 0,
          }}
        >
          <Flourish />
        </div>
      </section>

      {/* Venues in double-bordered frames */}
      <section className="mx-auto max-w-3xl px-6 pb-20">
        <div className="grid gap-10 sm:grid-cols-2">
          {/* Ceremony */}
          <div
            className="border border-[#DFD0D5] p-6 bg-[#FBF7F4] text-center"
            style={{
              animation: "fadeInUp 1s ease forwards",
              animationDelay: "0.3s",
              opacity: 0,
            }}
          >
            <div className="ring-1 ring-[#DFD0D5] ring-offset-4 ring-offset-[#FBF7F4] p-6 sm:p-8">
              <p
                className="text-xs uppercase tracking-[0.2em] text-[#B8976B]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Ceremony
              </p>
              <h3
                className="mt-4 text-2xl text-[#8B6B82]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {weddingConfig.venue.ceremony.name}
              </h3>
              <p
                className="mt-3 text-sm leading-relaxed text-[#7D7274]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {weddingConfig.venue.ceremony.address}
              </p>
            </div>
          </div>

          {/* Reception */}
          <div
            className="border border-[#DFD0D5] p-6 bg-[#FBF7F4] text-center"
            style={{
              animation: "fadeInUp 1s ease forwards",
              animationDelay: "0.45s",
              opacity: 0,
            }}
          >
            <div className="ring-1 ring-[#DFD0D5] ring-offset-4 ring-offset-[#FBF7F4] p-6 sm:p-8">
              <p
                className="text-xs uppercase tracking-[0.2em] text-[#B8976B]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Reception
              </p>
              <h3
                className="mt-4 text-2xl text-[#8B6B82]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {weddingConfig.venue.reception.name}
              </h3>
              <p
                className="mt-3 text-sm leading-relaxed text-[#7D7274]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {weddingConfig.venue.reception.address}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Flourish divider */}
      <div className="mx-auto max-w-xs px-6 py-4">
        <Flourish />
      </div>

      {/* Schedule */}
      <section className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
        <h2
          className="text-center text-3xl sm:text-4xl text-[#8B6B82] mb-12"
          style={{
            fontFamily: "var(--font-display)",
            animation: "fadeInUp 1s ease forwards",
            animationDelay: "0.15s",
            opacity: 0,
          }}
        >
          Schedule
        </h2>
        <div className="mx-auto max-w-md">
          {weddingConfig.schedule.map((item, i) => (
            <div
              key={item.event}
              className="flex items-center py-5 border-b border-[#DFD0D5] first:border-t"
              style={{
                animation: "fadeInUp 1s ease forwards",
                animationDelay: `${0.3 + i * 0.15}s`,
                opacity: 0,
              }}
            >
              <span
                className="w-28 shrink-0 text-sm font-medium text-[#B8976B]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {item.time}
              </span>
              <span className="mx-3 text-[#DFD0D5]">&mdash;</span>
              <span
                className="text-lg text-[#8B6B82]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {item.event}
              </span>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
