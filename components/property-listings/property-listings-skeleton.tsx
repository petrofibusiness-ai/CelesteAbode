"use client";

function SkeletonCard() {
  return (
    <div
      className="overflow-hidden rounded-2xl border border-black bg-white shadow-sm"
      aria-hidden
    >
      <div className="border-b border-black/20 bg-[#FAFAF8] px-4 py-4 sm:px-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="h-10 w-10 shrink-0 animate-pulse rounded-lg bg-muted" />
            <div className="h-14 w-14 shrink-0 animate-pulse rounded-xl bg-muted" />
            <div className="space-y-2 pt-1">
              <div className="h-4 w-40 animate-pulse rounded bg-muted sm:w-52" />
              <div className="h-3 w-32 animate-pulse rounded bg-muted sm:w-44" />
            </div>
          </div>
          <div className="flex w-full flex-col gap-2 sm:w-40">
            <div className="h-9 w-full animate-pulse rounded-lg bg-muted" />
            <div className="h-9 w-full animate-pulse rounded-lg bg-muted" />
          </div>
        </div>
      </div>
      <div className="border-b border-black/20 bg-muted/30 px-4 py-2 sm:px-5">
        <div className="h-3 w-28 animate-pulse rounded bg-muted" />
      </div>
      <div className="px-4 py-2 sm:px-5">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="flex gap-3 border-b border-black/15 py-2 last:border-0"
          >
            <div className="h-9 flex-1 animate-pulse rounded-md bg-muted" />
            <div className="h-9 flex-[1.4] animate-pulse rounded-md bg-muted" />
            <div className="h-9 flex-1 animate-pulse rounded-md bg-muted" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function PropertyListingsSkeleton({ rows: cardCount = 4 }: { rows?: number }) {
  return (
    <div className="flex flex-col gap-10 sm:gap-12" aria-hidden>
      {Array.from({ length: cardCount }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
