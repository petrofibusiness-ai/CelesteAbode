"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PropertyListingTable } from "@/components/property-listings/property-listing-table";
import { PropertyListingsSkeleton } from "@/components/property-listings/property-listings-skeleton";
import { PropertyGridPagination } from "@/components/property-grid-pagination";
import { Slider } from "@/components/ui/slider";
import { formatRupeeCompact } from "@/lib/property-listing-format";
import type {
  PropertyListingItem,
  PropertyListingLocationOption,
  PropertyListingLocalityOption,
} from "@/types/property-listing";
import { ChevronDown, SlidersHorizontal, Search, Unlock, Loader2 } from "lucide-react";
import {
  PROPERTY_SEARCH_ANCHOR_ID,
  scrollPropertySearchSectionIntoView,
} from "@/lib/scroll-listings";

/** Keep in sync with app/api/property-listings/route.ts price filter bounds. */
const PRICE_SLIDER_MIN = 0;
const PRICE_SLIDER_MAX = 200_000_000;
const PRICE_SLIDER_STEP = 500_000;

const PER_PAGE = 18;
const FILTER_DEBOUNCE_MS = 300;
const SESSION_EDIT_KEY = "ca_private_pl_edit_key";

function isFullPriceRange(lo: number, hi: number): boolean {
  return lo <= PRICE_SLIDER_MIN && hi >= PRICE_SLIDER_MAX;
}

interface FilterSelection {
  locationId: string;
  localityId: string;
}

export function PropertyListingsView() {
  const [locations, setLocations] = useState<PropertyListingLocationOption[]>([]);
  const [localities, setLocalities] = useState<PropertyListingLocalityOption[]>([]);
  const [localitiesLoading, setLocalitiesLoading] = useState(false);

  const [pending, setPending] = useState<FilterSelection>({ locationId: "", localityId: "" });
  const [applied, setApplied] = useState<FilterSelection>({ locationId: "", localityId: "" });

  const [pendingSearch, setPendingSearch] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");

  const [pendingPriceRange, setPendingPriceRange] = useState<[number, number]>([
    PRICE_SLIDER_MIN,
    PRICE_SLIDER_MAX,
  ]);
  const [appliedPriceRange, setAppliedPriceRange] = useState<[number, number]>([
    PRICE_SLIDER_MIN,
    PRICE_SLIDER_MAX,
  ]);

  const [pendingSizesQ, setPendingSizesQ] = useState("");
  const [appliedSizesQ, setAppliedSizesQ] = useState("");

  const [propertyTypeFilter, setPropertyTypeFilter] = useState("");
  const [propertyTypes, setPropertyTypes] = useState<string[]>([]);

  const [page, setPage] = useState(1);
  const [items, setItems] = useState<PropertyListingItem[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [listLoading, setListLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editModeAvailable, setEditModeAvailable] = useState(false);
  const [editKey, setEditKey] = useState<string | null>(null);
  const [keyInput, setKeyInput] = useState("");

  const abortRef = useRef<AbortController | null>(null);
  const prevAppliedKeyRef = useRef<string | null>(null);
  const prevAppliedLocationIdRef = useRef<string>("");

  useEffect(() => {
    try {
      const k = sessionStorage.getItem(SESSION_EDIT_KEY);
      if (k) setEditKey(k);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/property-listings/locations");
        if (!res.ok) throw new Error("Failed to load cities");
        const data = (await res.json()) as PropertyListingLocationOption[];
        if (!cancelled) setLocations(data);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Could not load filters");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!pending.locationId) {
      setLocalities([]);
      return;
    }
    let cancelled = false;
    setLocalitiesLoading(true);
    (async () => {
      try {
        const res = await fetch(
          `/api/property-listings/localities?locationId=${encodeURIComponent(pending.locationId)}`
        );
        if (!res.ok) throw new Error("Failed to load areas");
        const data = (await res.json()) as PropertyListingLocalityOption[];
        if (!cancelled) setLocalities(data);
      } catch {
        if (!cancelled) setLocalities([]);
      } finally {
        if (!cancelled) setLocalitiesLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [pending.locationId]);

  useEffect(() => {
    const t = window.setTimeout(() => {
      setApplied(pending);
    }, FILTER_DEBOUNCE_MS);
    return () => window.clearTimeout(t);
  }, [pending]);

  useEffect(() => {
    const t = window.setTimeout(() => {
      setAppliedSearch(pendingSearch);
    }, FILTER_DEBOUNCE_MS);
    return () => window.clearTimeout(t);
  }, [pendingSearch]);

  useEffect(() => {
    const lo = pendingPriceRange[0];
    const hi = pendingPriceRange[1];
    const t = window.setTimeout(() => {
      setAppliedPriceRange([lo, hi]);
    }, FILTER_DEBOUNCE_MS);
    return () => window.clearTimeout(t);
  }, [pendingPriceRange[0], pendingPriceRange[1]]);

  useEffect(() => {
    const t = window.setTimeout(() => {
      setAppliedSizesQ(pendingSizesQ);
    }, FILTER_DEBOUNCE_MS);
    return () => window.clearTimeout(t);
  }, [pendingSizesQ]);

  useEffect(() => {
    if (prevAppliedLocationIdRef.current !== applied.locationId) {
      setPropertyTypeFilter("");
      prevAppliedLocationIdRef.current = applied.locationId;
    }
    let cancelled = false;
    (async () => {
      try {
        const params = new URLSearchParams();
        if (applied.locationId) params.set("locationId", applied.locationId);
        if (applied.localityId) params.set("localityId", applied.localityId);
        const qs = params.toString();
        const res = await fetch(
          `/api/property-listings/property-types${qs ? `?${qs}` : ""}`
        );
        if (!res.ok) throw new Error("types");
        const data = (await res.json()) as string[];
        if (!cancelled) setPropertyTypes(Array.isArray(data) ? data : []);
      } catch {
        if (!cancelled) setPropertyTypes([]);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [applied.locationId, applied.localityId]);

  const fetchList = useCallback(
    async (
      filters: FilterSelection,
      search: string,
      priceLo: number,
      priceHi: number,
      sizesQ: string,
      propType: string,
      pageNum: number,
      mode: "filter" | "page"
    ) => {
      if (abortRef.current) abortRef.current.abort();
      const ac = new AbortController();
      abortRef.current = ac;

      if (mode === "filter") setListLoading(true);
      else setPageLoading(true);
      setError(null);

      const offset = (pageNum - 1) * PER_PAGE;
      const params = new URLSearchParams();
      params.set("limit", String(PER_PAGE));
      params.set("offset", String(offset));
      if (filters.locationId) params.set("locationId", filters.locationId);
      if (filters.localityId) params.set("localityId", filters.localityId);
      const q = search.trim();
      if (q) params.set("q", q);

      const [plo, phi] = [Math.min(priceLo, priceHi), Math.max(priceLo, priceHi)];
      if (!isFullPriceRange(plo, phi)) {
        params.set("priceMin", String(plo));
        params.set("priceMax", String(phi));
      }
      const sq = sizesQ.trim();
      if (sq) params.set("sizesQ", sq);
      if (propType.trim()) params.set("propertyType", propType.trim());

      try {
        const res = await fetch(`/api/property-listings?${params.toString()}`, {
          signal: ac.signal,
        });
        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new Error(typeof body.error === "string" ? body.error : "Failed to load listings");
        }
        const data = await res.json();
        setItems(data.items || []);
        setTotalCount(typeof data.totalCount === "number" ? data.totalCount : 0);
        if (typeof data.editModeAvailable === "boolean") {
          setEditModeAvailable(data.editModeAvailable);
        }
      } catch (e) {
        if (e instanceof Error && e.name === "AbortError") return;
        setError(e instanceof Error ? e.message : "Something went wrong");
        if (mode === "filter") setItems([]);
        setTotalCount(0);
      } finally {
        if (!ac.signal.aborted) {
          setListLoading(false);
          setPageLoading(false);
        }
      }
    },
    []
  );

  const appliedKey = `${applied.locationId}|${applied.localityId}|${appliedSearch}|${appliedPriceRange[0]}|${appliedPriceRange[1]}|${appliedSizesQ}|${propertyTypeFilter}`;

  useEffect(() => {
    const keyChanged =
      prevAppliedKeyRef.current !== null && prevAppliedKeyRef.current !== appliedKey;
    prevAppliedKeyRef.current = appliedKey;
    if (keyChanged && page !== 1) {
      setPage(1);
      return;
    }
    fetchList(
      applied,
      appliedSearch,
      appliedPriceRange[0],
      appliedPriceRange[1],
      appliedSizesQ,
      propertyTypeFilter,
      page,
      page === 1 ? "filter" : "page"
    );
  }, [
    appliedKey,
    page,
    fetchList,
    applied,
    appliedSearch,
    appliedPriceRange,
    appliedSizesQ,
    propertyTypeFilter,
  ]);

  const handleItemUpdate = useCallback((id: string, patch: Partial<PropertyListingItem>) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, ...patch } : i))
    );
  }, []);

  const totalPages = Math.max(1, Math.ceil(totalCount / PER_PAGE));

  const handlePageChange = (next: number) => {
    if (next < 1 || next > totalPages || next === page || listLoading || pageLoading) return;
    scrollPropertySearchSectionIntoView();
    setPage(next);
  };

  const onLocationChange = (value: string) => {
    setPending({ locationId: value, localityId: "" });
  };

  const onLocalityChange = (value: string) => {
    setPending((p) => ({ ...p, localityId: value }));
  };

  const unlockEditing = () => {
    const k = keyInput.trim();
    if (!k) return;
    try {
      sessionStorage.setItem(SESSION_EDIT_KEY, k);
    } catch {
      /* ignore */
    }
    setEditKey(k);
    setKeyInput("");
  };

  const lockEditing = () => {
    try {
      sessionStorage.removeItem(SESSION_EDIT_KEY);
    } catch {
      /* ignore */
    }
    setEditKey(null);
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <Header />
      <main className="pb-12 pt-16 sm:pb-16 sm:pt-20 md:pt-24">
        <section
          id={PROPERTY_SEARCH_ANCHOR_ID}
          className="scroll-mt-24 border-b border-border/60 bg-white md:scroll-mt-28"
        >
          <div className="mx-auto max-w-7xl px-3 py-8 sm:px-6 sm:py-10 lg:px-8">
            <p className="font-poppins text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[#CBB27A] sm:text-xs">
              Inventory
            </p>
            <h1 className="mt-2 font-serif text-2xl font-semibold tracking-tight text-foreground sm:text-3xl md:text-[2.75rem] md:leading-tight">
              Property inventory
            </h1>
            <p className="mt-3 max-w-2xl font-poppins text-sm text-muted-foreground sm:text-base md:text-lg">
              Filter by city, area, price, size, type, and project name. Each row shows amenities; use
              Save on a row after you change price or sizes.
            </p>

            <div className="mt-6 rounded-2xl border border-border/60 bg-[#FAFAF8]/90 p-4 shadow-sm sm:p-5">
              {editModeAvailable ? (
                <>
                  <p className="font-poppins text-sm font-medium text-foreground">
                    Enter your key to unlock price and sizes, then press Save on each row you change.
                  </p>
                  <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    {editKey ? (
                      <button
                        type="button"
                        onClick={lockEditing}
                        className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-border px-4 font-poppins text-sm font-medium text-foreground transition hover:bg-muted sm:w-auto"
                      >
                        <Unlock className="h-4 w-4" aria-hidden />
                        Lock
                      </button>
                    ) : (
                      <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center">
                        <input
                          type="password"
                          value={keyInput}
                          onChange={(e) => setKeyInput(e.target.value)}
                          placeholder="Key"
                          autoComplete="off"
                          className="min-h-11 w-full min-w-0 rounded-xl border border-border bg-white px-4 font-poppins text-sm outline-none focus:border-[#CBB27A] focus:ring-2 focus:ring-[#CBB27A]/20 sm:min-w-[220px]"
                        />
                        <button
                          type="button"
                          onClick={unlockEditing}
                          className="inline-flex min-h-11 min-w-[8rem] items-center justify-center rounded-xl border border-[#CBB27A] bg-[#CBB27A]/15 px-4 font-poppins text-sm font-semibold text-foreground transition hover:bg-[#CBB27A]/25"
                        >
                          Unlock
                        </button>
                      </div>
                    )}
                  </div>
                  {editKey ? (
                    <p className="mt-2 font-poppins text-xs text-muted-foreground">
                      You’re unlocked on this device until you lock.
                    </p>
                  ) : null}
                </>
              ) : (
                <p className="font-poppins text-sm text-muted-foreground">
                  Saving changes isn’t available on this site right now. Ask whoever runs it if you need
                  to update prices or sizes.
                </p>
              )}
            </div>

            <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-12 lg:items-end lg:gap-4">
              <div className="lg:col-span-4">
                <label
                  htmlFor="pl-search"
                  className="mb-2 flex items-center gap-2 font-poppins text-xs font-semibold uppercase tracking-wide text-muted-foreground"
                >
                  <Search className="h-3.5 w-3.5" aria-hidden />
                  Search by name
                </label>
                <div className="relative">
                  <input
                    id="pl-search"
                    type="search"
                    value={pendingSearch}
                    onChange={(e) => setPendingSearch(e.target.value)}
                    placeholder="Project name…"
                    autoComplete="off"
                    className="min-h-12 w-full rounded-xl border border-border bg-white py-3 pl-4 pr-10 font-poppins text-sm text-foreground shadow-sm outline-none transition focus:border-[#CBB27A] focus:ring-2 focus:ring-[#CBB27A]/20"
                  />
                  <Search
                    className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                    aria-hidden
                  />
                </div>
              </div>

              <div className="lg:col-span-3">
                <label
                  htmlFor="pl-city"
                  className="mb-2 flex items-center gap-2 font-poppins text-xs font-semibold uppercase tracking-wide text-muted-foreground"
                >
                  <SlidersHorizontal className="h-3.5 w-3.5" aria-hidden />
                  City
                </label>
                <div className="relative">
                  <select
                    id="pl-city"
                    value={pending.locationId}
                    onChange={(e) => onLocationChange(e.target.value)}
                    className="min-h-12 w-full appearance-none rounded-xl border border-border bg-white px-4 pr-10 font-poppins text-sm text-foreground shadow-sm outline-none transition focus:border-[#CBB27A] focus:ring-2 focus:ring-[#CBB27A]/20"
                  >
                    <option value="">All cities</option>
                    {locations.map((loc) => (
                      <option key={loc.id} value={loc.id}>
                        {loc.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                    aria-hidden
                  />
                </div>
              </div>

              <div className="lg:col-span-3">
                <label
                  htmlFor="pl-area"
                  className="mb-2 block font-poppins text-xs font-semibold uppercase tracking-wide text-muted-foreground"
                >
                  Area
                </label>
                <div className="relative">
                  <select
                    id="pl-area"
                    value={pending.localityId}
                    onChange={(e) => onLocalityChange(e.target.value)}
                    disabled={!pending.locationId || localitiesLoading}
                    className="min-h-12 w-full appearance-none rounded-xl border border-border bg-white px-4 pr-10 font-poppins text-sm text-foreground shadow-sm outline-none transition focus:border-[#CBB27A] focus:ring-2 focus:ring-[#CBB27A]/20 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <option value="">
                      {!pending.locationId
                        ? "Select a city first"
                        : localitiesLoading
                          ? "Loading areas…"
                          : "All areas"}
                    </option>
                    {localities.map((loc) => (
                      <option key={loc.id} value={loc.id}>
                        {loc.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                    aria-hidden
                  />
                </div>
              </div>

              <div className="flex min-h-12 items-center font-poppins text-sm text-muted-foreground lg:col-span-2">
                {pageLoading ? (
                  <span className="inline-flex items-center gap-2">
                    <Loader2 className="h-4 w-4 shrink-0 animate-spin text-[#CBB27A]" aria-hidden />
                    Loading page…
                  </span>
                ) : listLoading ? (
                  <span className="animate-pulse">Updating…</span>
                ) : (
                  <>
                    <span className="font-semibold text-foreground">{totalCount}</span>
                    &nbsp;{totalCount === 1 ? "listing" : "listings"}
                  </>
                )}
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-6">
              <div className="lg:col-span-6">
                <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                  <label className="flex items-center gap-2 font-poppins text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    <SlidersHorizontal className="h-3.5 w-3.5" aria-hidden />
                    Price range (₹)
                  </label>
                  <span className="font-poppins text-xs text-muted-foreground">
                    {formatRupeeCompact(pendingPriceRange[0])} –{" "}
                    {formatRupeeCompact(pendingPriceRange[1])}
                    {isFullPriceRange(pendingPriceRange[0], pendingPriceRange[1]) ? (
                      <span className="text-muted-foreground/80"> (no filter)</span>
                    ) : null}
                  </span>
                </div>
                <Slider
                  value={pendingPriceRange}
                  min={PRICE_SLIDER_MIN}
                  max={PRICE_SLIDER_MAX}
                  step={PRICE_SLIDER_STEP}
                  minStepsBetweenThumbs={1}
                  onValueChange={(v) => {
                    const a = v[0] ?? PRICE_SLIDER_MIN;
                    const b = v[1] ?? PRICE_SLIDER_MAX;
                    setPendingPriceRange([Math.min(a, b), Math.max(a, b)]);
                  }}
                  className="py-2 [&_[data-slot=slider-range]]:bg-[#CBB27A] [&_[data-slot=slider-thumb]]:border-[#CBB27A]"
                />
                <button
                  type="button"
                  onClick={() =>
                    setPendingPriceRange([PRICE_SLIDER_MIN, PRICE_SLIDER_MAX])
                  }
                  className="mt-1 font-poppins text-xs font-medium text-[#8a7344] underline-offset-2 hover:underline"
                >
                  Reset price filter
                </button>
              </div>

              <div className="lg:col-span-3">
                <label
                  htmlFor="pl-property-type"
                  className="mb-2 block font-poppins text-xs font-semibold uppercase tracking-wide text-muted-foreground"
                >
                  Property type
                </label>
                <div className="relative">
                  <select
                    id="pl-property-type"
                    value={propertyTypeFilter}
                    onChange={(e) => setPropertyTypeFilter(e.target.value)}
                    className="min-h-12 w-full appearance-none rounded-xl border border-border bg-white px-4 pr-10 font-poppins text-sm text-foreground shadow-sm outline-none transition focus:border-[#CBB27A] focus:ring-2 focus:ring-[#CBB27A]/20"
                  >
                    <option value="">All types</option>
                    {propertyTypes.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                    aria-hidden
                  />
                </div>
              </div>

              <div className="lg:col-span-3">
                <label
                  htmlFor="pl-sizes-q"
                  className="mb-2 block font-poppins text-xs font-semibold uppercase tracking-wide text-muted-foreground"
                >
                  Size contains
                </label>
                <input
                  id="pl-sizes-q"
                  type="search"
                  value={pendingSizesQ}
                  onChange={(e) => setPendingSizesQ(e.target.value)}
                  placeholder="e.g. 1200, sq ft, BHK…"
                  autoComplete="off"
                  className="min-h-12 w-full rounded-xl border border-border bg-white px-4 font-poppins text-sm text-foreground shadow-sm outline-none transition focus:border-[#CBB27A] focus:ring-2 focus:ring-[#CBB27A]/20"
                />
              </div>
            </div>
          </div>
        </section>

        <section
          className="mx-auto max-w-7xl px-3 py-8 sm:px-6 sm:py-10 lg:px-8"
          aria-busy={pageLoading || listLoading}
        >
          {error && (
            <div
              role="alert"
              className="mb-6 rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 font-poppins text-sm text-destructive"
            >
              {error}
            </div>
          )}

          {listLoading ? (
            <PropertyListingsSkeleton rows={PER_PAGE} />
          ) : items.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-border bg-white px-4 py-12 text-center font-poppins text-sm text-muted-foreground sm:px-6 sm:py-16 sm:text-base">
              No properties match these filters. Try another name, city, or area.
            </p>
          ) : (
            <div className="relative min-h-[min(70vh,28rem)]">
              {pageLoading && (
                <div
                  className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 rounded-2xl bg-[#FAFAF8]/85 backdrop-blur-sm"
                  role="status"
                  aria-live="polite"
                  aria-label="Loading page"
                >
                  <div className="flex flex-col items-center gap-3 rounded-2xl border border-[#CBB27A]/25 bg-white/95 px-10 py-8 shadow-lg">
                    <Loader2
                      className="h-11 w-11 animate-spin text-[#CBB27A]"
                      aria-hidden
                    />
                    <p className="font-poppins text-sm font-medium text-foreground">
                      Loading page…
                    </p>
                  </div>
                </div>
              )}
              <div
                className={`transition-opacity duration-200 ${
                  pageLoading ? "opacity-45" : "opacity-100"
                }`}
              >
                <PropertyListingTable
                  items={items}
                  editKey={editKey}
                  onItemUpdate={handleItemUpdate}
                />
              </div>
            </div>
          )}

          {!listLoading && items.length > 0 && (
            <PropertyGridPagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              isLoading={pageLoading}
              className="mt-10"
            />
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
