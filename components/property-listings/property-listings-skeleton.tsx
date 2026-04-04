"use client";

export function PropertyListingsSkeleton({ rows = 12 }: { rows?: number }) {
  return (
    <div
      className="overflow-hidden rounded-2xl border border-border/60 bg-white shadow-sm"
      aria-hidden
    >
      <div className="min-w-[56rem]">
        <div className="flex border-b border-border/80 bg-[#FAFAF8]/90 px-3 py-3">
          {["w-14", "w-28", "w-24", "w-32", "w-36", "w-48", "w-20"].map((w, i) => (
            <div key={i} className={`mr-4 h-3 animate-pulse rounded bg-muted ${w}`} />
          ))}
        </div>
        {Array.from({ length: rows }).map((_, i) => (
          <div
            key={i}
            className="flex items-start gap-3 border-b border-border/40 px-3 py-3 last:border-0"
          >
            <div className="h-14 w-14 shrink-0 animate-pulse rounded-xl bg-muted" />
            <div className="grid flex-1 grid-cols-6 gap-3 pt-1">
              <div className="h-4 w-full animate-pulse rounded bg-muted" />
              <div className="h-4 w-full animate-pulse rounded bg-muted" />
              <div className="h-4 w-full animate-pulse rounded bg-muted" />
              <div className="h-10 w-full animate-pulse rounded bg-muted" />
              <div className="h-8 w-full animate-pulse rounded bg-muted" />
              <div className="h-4 w-16 animate-pulse rounded bg-muted" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
