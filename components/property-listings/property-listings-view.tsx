"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PropertyListingCard } from "@/components/property-listings/property-listing-card";
import { PropertyListingsSkeleton } from "@/components/property-listings/property-listings-skeleton";
import { PropertyGridPagination } from "@/components/property-grid-pagination";
import type {
  PropertyListingItem,
  PropertyListingLocationOption,
  PropertyListingLocalityOption,
} from "@/types/property-listing";
import { ChevronDown, SlidersHorizontal, Search, Lock, Unlock, Loader2 } from "lucide-react";
import {
  PROPERTY_SEARCH_ANCHOR_ID,
  scrollPropertySearchSectionIntoView,
} from "@/lib/scroll-listings";

const PER_PAGE = 12;
const FILTER_DEBOUNCE_MS = 300;
const SESSION_EDIT_KEY = "ca_private_pl_edit_key";

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

  const fetchList = useCallback(
    async (filters: FilterSelection, search: string, pageNum: number, mode: "filter" | "page") => {
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

  const appliedKey = `${applied.locationId}|${applied.localityId}|${appliedSearch}`;

  useEffect(() => {
    const keyChanged =
      prevAppliedKeyRef.current !== null && prevAppliedKeyRef.current !== appliedKey;
    prevAppliedKeyRef.current = appliedKey;
    if (keyChanged && page !== 1) {
      setPage(1);
      return;
    }
    fetchList(applied, appliedSearch, page, page === 1 ? "filter" : "page");
  }, [appliedKey, page, fetchList, applied, appliedSearch]);

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
              Filter by city, area, and project name.
            </p>

            {editModeAvailable && (
              <div className="mt-6 rounded-2xl border border-border/60 bg-[#FAFAF8]/90 p-4 shadow-sm sm:p-5">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-2 font-poppins text-sm font-semibold text-foreground">
                    <Lock className="h-4 w-4 shrink-0 text-[#CBB27A]" aria-hidden />
                    Inline price &amp; sizes editing
                  </div>
                  {editKey ? (
                    <button
                      type="button"
                      onClick={lockEditing}
                      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-border px-4 font-poppins text-sm font-medium text-foreground transition hover:bg-muted"
                    >
                      <Unlock className="h-4 w-4" aria-hidden />
                      Lock editing
                    </button>
                  ) : (
                    <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
                      <input
                        type="password"
                        value={keyInput}
                        onChange={(e) => setKeyInput(e.target.value)}
                        placeholder="Edit key"
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
                <p className="mt-2 font-poppins text-xs text-muted-foreground">
                  The key is stored in this browser only until you lock.
                </p>
              </div>
            )}

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
            <PropertyListingsSkeleton count={PER_PAGE} />
          ) : items.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-border bg-white px-4 py-12 text-center font-poppins text-sm text-muted-foreground sm:px-6 sm:py-16 sm:text-base">
              No properties match these filters. Try another name, city, or area.
            </p>
          ) : (
            <div
              className={`relative min-h-[min(70vh,28rem)] ${pageLoading ? "pointer-events-none" : ""}`}
            >
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
                className={`grid grid-cols-1 gap-5 transition-opacity duration-200 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3 2xl:grid-cols-4 ${
                  pageLoading ? "opacity-45" : "opacity-100"
                }`}
              >
                {items.map((item) => (
                  <PropertyListingCard
                    key={item.id}
                    item={item}
                    editKey={editKey}
                    editModeAvailable={editModeAvailable}
                    onItemUpdate={handleItemUpdate}
                  />
                ))}
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
