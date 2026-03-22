"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

export type PageItem = number | "ellipsis";

/** Build compact page list with ellipses (no duplicate / missing pages). */
export function getPaginationRange(current: number, total: number): PageItem[] {
  if (total <= 1) return [1];
  if (total <= 9) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  const pages = new Set<number>();
  pages.add(1);
  pages.add(total);
  for (let d = 0; d <= 2; d++) {
    if (current - d >= 1) pages.add(current - d);
    if (current + d <= total) pages.add(current + d);
  }
  const sorted = Array.from(pages).sort((a, b) => a - b);
  const out: PageItem[] = [];
  let prev = 0;
  for (const p of sorted) {
    if (p - prev > 1) out.push("ellipsis");
    out.push(p);
    prev = p;
  }
  return out;
}

export interface PropertyGridPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
  className?: string;
}

export function PropertyGridPagination({
  currentPage,
  totalPages,
  onPageChange,
  isLoading = false,
  className = "",
}: PropertyGridPaginationProps) {
  const items = getPaginationRange(currentPage, totalPages);
  const isFirst = currentPage <= 1;
  const isLast = currentPage >= totalPages;

  return (
    <nav
      className={`flex flex-col items-center gap-4 mt-12 px-4 ${className}`}
      aria-label="Property list pagination"
    >
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={isFirst || isLoading}
          className="inline-flex h-10 min-w-[2.5rem] items-center justify-center rounded-full border border-gray-200 bg-white px-3 text-sm font-medium text-foreground transition hover:border-[#CBB27A] hover:bg-[#CBB27A]/5 disabled:pointer-events-none disabled:opacity-40 font-poppins gap-1"
          aria-label="Previous page"
        >
          <ChevronLeft className="h-5 w-5 shrink-0" />
          <span className="hidden sm:inline">Back</span>
        </button>

        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
          {items.map((item, idx) =>
            item === "ellipsis" ? (
              <span
                key={`e-${idx}`}
                className="flex h-10 w-10 items-center justify-center text-gray-400 font-poppins select-none"
                aria-hidden
              >
                …
              </span>
            ) : (
              <button
                key={item}
                type="button"
                onClick={() => onPageChange(item)}
                disabled={isLoading}
                aria-label={`Page ${item}`}
                aria-current={item === currentPage ? "page" : undefined}
                className={`flex h-10 min-w-[2.5rem] items-center justify-center rounded-full px-3 text-sm font-semibold transition font-poppins ${
                  item === currentPage
                    ? "bg-[#CBB27A] text-black shadow-md ring-2 ring-[#CBB27A]/40 scale-105"
                    : "border border-gray-200 bg-white text-foreground hover:border-[#CBB27A] hover:bg-[#CBB27A]/10"
                } disabled:opacity-50`}
              >
                {item}
              </button>
            )
          )}
        </div>

        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={isLast || isLoading}
          className="inline-flex h-10 min-w-[2.5rem] items-center justify-center rounded-full border border-gray-200 bg-white px-3 text-sm font-medium text-foreground transition hover:border-[#CBB27A] hover:bg-[#CBB27A]/5 disabled:pointer-events-none disabled:opacity-40 font-poppins gap-1"
          aria-label="Next page"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="h-5 w-5 shrink-0" />
        </button>
      </div>
    </nav>
  );
}
