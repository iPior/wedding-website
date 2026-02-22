import { weddingConfig } from "../../../../../wedding.config";

function OrnamentalDivider() {
  return (
    <div className="flex items-center justify-center gap-4 py-2">
      <div className="h-px flex-1 max-w-20 bg-neutral-300/50" />
      <svg width="14" height="14" viewBox="0 0 14 14" className="text-neutral-300">
        <path d="M7 1 L8.5 5.5 L13 7 L8.5 8.5 L7 13 L5.5 8.5 L1 7 L5.5 5.5 Z" fill="currentColor" />
      </svg>
      <div className="h-px flex-1 max-w-20 bg-neutral-300/50" />
    </div>
  );
}

export default function OurStoryPage() {
  const { ourStory } = weddingConfig;

  return (
    <div className="space-y-14 text-center">
      <div className="space-y-4">
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-light tracking-wide text-neutral-800 sm:text-4xl">
          {ourStory.title}
        </h1>
      </div>

      <OrnamentalDivider />

      <div className="space-y-14">
        {ourStory.milestones.map((milestone) => (
          <div key={milestone.year} className="space-y-3">
            <p className="font-[family-name:var(--font-display)] text-sm font-semibold uppercase tracking-[0.25em] text-neutral-400">
              <span className="inline-block w-8 border-t border-neutral-300/50 align-middle" />
              <span className="mx-3">{milestone.year}</span>
              <span className="inline-block w-8 border-t border-neutral-300/50 align-middle" />
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold tracking-wide text-neutral-700">
              {milestone.title}
            </h2>
            <p className="mx-auto max-w-sm font-[family-name:var(--font-body)] text-sm leading-relaxed text-neutral-500">
              {milestone.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
