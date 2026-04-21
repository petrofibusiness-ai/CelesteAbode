"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Layers, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PropertyGridPagination } from "@/components/property-grid-pagination";
import type { PropertyInventoryRow } from "@/types/property-listing";
import type { Location } from "@/types/location";
import { formatInventoryPriceCrDisplay } from "@/lib/property-listings-price";
import { getPropertyUrl } from "@/lib/property-url";
import { cn } from "@/lib/utils";

interface PaginationState {
  page: number;
  perPage: number;
  totalProperties: number;
  totalPages: number;
}

const cellBorder = "border border-zinc-300 px-3 py-2.5 align-top";
const thBase =
  "border border-zinc-300 bg-zinc-100 px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-zinc-600";
const BHK_FILTER_OPTIONS = ["2 BHK", "3 BHK", "4 BHK"] as const;

/** So `3bhk`, `3.5bhk`, and `3 BHK` all normalize before matching. */
function normalizeConfigForGrouping(raw: string): string {
  return raw
    .trim()
    .replace(/(\d+(?:\.\d+)?)(bhk)/gi, "$1 $2")
    .replace(/\s+/g, " ");
}

/**
 * Bucket similar labels (e.g. "3 BHK", "3 BHK + Study", "3.5 BHK + Study") under one family.
 * Uses a single decimal-aware BHK match so "3.5 BHK" is never read as "5 BHK".
 */
function configurationGroupKeyFromLabel(label: string): string {
  const v = (label ?? "").trim();
  if (!v) return "Not set";
  const lowered = normalizeConfigForGrouping(v).toLowerCase();

  if (/\bstudio\b/.test(lowered)) return "Studio";
  if (/\b1\s*rk\b/.test(lowered)) return "1 RK";

  const bhk = lowered.match(/(\d+(?:\.\d+)?)\s*bhk\b/i);
  if (bhk) {
    const n = parseFloat(bhk[1] ?? "0");
    if (Number.isFinite(n) && n > 0 && n <= 32) {
      return `${n} BHK`;
    }
  }

  if (/\bduplex\b/i.test(v)) return "Duplex";
  if (/\bpenthouse\b/i.test(v)) return "Penthouse";
  if (/\bplot\b/.test(lowered) || /\bland\b/.test(lowered)) return "Plots / Land";
  if (/\bshop\b/.test(lowered) || /\boffice\b/.test(lowered)) return "Commercial";
  if (/\bvilla\b/.test(lowered)) return "Villas";

  return "Other layouts";
}

function bhkBedroomSortKey(key: string): number | null {
  const m = key.trim().match(/^(\d+(?:\.\d+)?)\s*BHK$/i);
  if (!m) return null;
  const n = parseFloat(m[1] ?? "");
  return Number.isFinite(n) ? n : null;
}

function orderedConfigurationGroupKeys(keys: Set<string>): string[] {
  const list = [...keys];
  const bhkKeys = list
    .filter((x) => bhkBedroomSortKey(x) != null)
    .sort((a, b) => {
      const da = bhkBedroomSortKey(a) ?? 0;
      const db = bhkBedroomSortKey(b) ?? 0;
      if (da !== db) return da - db;
      return a.localeCompare(b);
    });
  const head = ["Studio", "1 RK"] as const;
  const tail = [
    "Duplex",
    "Penthouse",
    "Villas",
    "Plots / Land",
    "Commercial",
    "Not set",
    "Other layouts",
  ] as const;
  const seen = new Set<string>();
  const out: string[] = [];
  for (const p of head) {
    if (keys.has(p)) {
      out.push(p);
      seen.add(p);
    }
  }
  for (const p of bhkKeys) {
    if (!seen.has(p)) {
      out.push(p);
      seen.add(p);
    }
  }
  for (const p of tail) {
    if (keys.has(p)) {
      out.push(p);
      seen.add(p);
    }
  }
  for (const k of list.sort((a, b) => a.localeCompare(b))) {
    if (!seen.has(k)) out.push(k);
  }
  return out;
}

function groupInventoryRowsByConfiguration(
  rows: PropertyInventoryRow[]
): { key: string; label: string; lines: PropertyInventoryRow[] }[] {
  const map = new Map<string, PropertyInventoryRow[]>();
  const ordered = [...rows].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
  for (const line of ordered) {
    const key = configurationGroupKeyFromLabel(line.configuration ?? "");
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(line);
  }
  return orderedConfigurationGroupKeys(new Set(map.keys())).map((key) => ({
    key,
    label: key === "Not set" ? "Not set" : key,
    lines: map.get(key) ?? [],
  }));
}

function chunkItemsByProperty(items: PropertyInventoryRow[]): PropertyInventoryRow[][] {
  const chunks: PropertyInventoryRow[][] = [];
  let current: PropertyInventoryRow[] = [];
  let lastSerial: number | undefined;
  for (const row of items) {
    const serial = row.propertySerial;
    if (serial !== lastSerial) {
      if (current.length) chunks.push(current);
      current = [row];
      lastSerial = serial;
    } else {
      current.push(row);
    }
  }
  if (current.length) chunks.push(current);
  return chunks;
}

function formatOptionalLine(label: string, value: string | undefined): string | null {
  const v = (value ?? "").trim();
  if (!v) return null;
  return `${label}: ${v}`;
}

function parsePriceCr(value: string | undefined): number | null {
  const cleaned = (value ?? "").replace(/[^0-9.]/g, "");
  if (!cleaned) return null;
  const parsed = Number.parseFloat(cleaned);
  return Number.isFinite(parsed) ? parsed : null;
}

function parseSizeSqft(value: string | undefined): number | null {
  const cleaned = (value ?? "").replace(/[^0-9.]/g, "");
  if (!cleaned) return null;
  const parsed = Number.parseFloat(cleaned);
  return Number.isFinite(parsed) ? parsed : null;
}

function toRupeesFromCr(cr: number): number {
  return Math.round(cr * 10000000);
}

function formatINR(value: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

function extractBhkKeys(text: string): string[] {
  const out = new Set<string>();
  const normalized = normalizeConfigForGrouping(text).toLowerCase();
  const matches = normalized.matchAll(/(\d+(?:\.\d+)?)\s*bhk\b/g);
  for (const match of matches) {
    const n = Number.parseFloat(match[1] ?? "");
    if (Number.isFinite(n) && n > 0) out.add(`${n} BHK`);
  }
  return [...out];
}

function rowMatchesAnyBhk(row: PropertyInventoryRow, selectedBhk: Set<string>): boolean {
  if (selectedBhk.size === 0) return true;
  const key = configurationGroupKeyFromLabel(row.configuration ?? "");
  return selectedBhk.has(key);
}

export default function AdminInventoryPage() {
  const router = useRouter();
  const [items, setItems] = useState<PropertyInventoryRow[]>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    page: 1,
    perPage: 15,
    totalProperties: 0,
    totalPages: 1,
  });
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [listLoading, setListLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedBhk, setSelectedBhk] = useState<string[]>([]);
  const [locationId, setLocationId] = useState<string>("");
  const [projectFilter, setProjectFilter] = useState("");
  const [variantFilter, setVariantFilter] = useState("");
  const [sizeFilter, setSizeFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [budgetRangeRs, setBudgetRangeRs] = useState<[number, number]>([0, 0]);
  const [page, setPage] = useState(1);
  const isFirstInventoryFetch = useRef(true);

  const handleAuthError = useCallback(() => {
    router.push("/admin/login");
  }, [router]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/admin/locations", { credentials: "include", cache: "no-store" });
        if (res.status === 401) {
          handleAuthError();
          return;
        }
        if (!res.ok) return;
        const data = (await res.json()) as Location[];
        if (!cancelled) setLocations(Array.isArray(data) ? data : []);
      } catch {
        /* ignore */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [handleAuthError]);

  const loadInventory = useCallback(async () => {
    try {
      if (isFirstInventoryFetch.current) {
        setLoading(true);
      } else {
        setListLoading(true);
      }
      setError("");

      const params = new URLSearchParams();
      const perPage = "80";
      params.set("page", String(page));
      params.set("perPage", perPage);
      if (locationId) params.set("locationId", locationId);

      const res = await fetch(`/api/admin/inventory-dashboard?${params}`, {
        credentials: "include",
        cache: "no-store",
      });

      if (res.status === 401) {
        handleAuthError();
        return;
      }

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error((body as { error?: string }).error || "Failed to load inventory");
      }

      const data = await res.json();
      setItems((data.items || []) as PropertyInventoryRow[]);
      setPagination(
        (data.pagination || {
          page: 1,
          perPage: 15,
          totalProperties: 0,
          totalPages: 1,
        }) as PaginationState
      );
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      isFirstInventoryFetch.current = false;
      setLoading(false);
      setListLoading(false);
    }
  }, [page, locationId, handleAuthError]);

  useEffect(() => {
    void loadInventory();
  }, [page, locationId, loadInventory]);

  const priceBoundsRs = useMemo(() => {
    const all = items
      .map((row) => parsePriceCr(row.priceCr))
      .filter((v): v is number => v != null)
      .map((v) => toRupeesFromCr(v));
    if (all.length === 0) return { min: 0, max: 0 };
    return {
      min: Math.floor(Math.min(...all) / 100000) * 100000,
      max: Math.ceil(Math.max(...all) / 100000) * 100000,
    };
  }, [items]);

  useEffect(() => {
    if (priceBoundsRs.max === 0) {
      setBudgetRangeRs([0, 0]);
      return;
    }
    setBudgetRangeRs((prev) => {
      const [prevMin, prevMax] = prev;
      if (!prevMin && !prevMax) return [priceBoundsRs.min, priceBoundsRs.max];
      const nextMin = Math.max(priceBoundsRs.min, Math.min(prevMin, priceBoundsRs.max));
      const nextMax = Math.max(nextMin, Math.min(prevMax, priceBoundsRs.max));
      return [nextMin, nextMax];
    });
  }, [priceBoundsRs.min, priceBoundsRs.max]);

  const selectedBhkSet = useMemo(() => new Set(selectedBhk), [selectedBhk]);
  const highlightedBhkKeys = useMemo(() => {
    const keys = new Set<string>(selectedBhk);
    for (const key of extractBhkKeys(variantFilter)) keys.add(key);
    return keys;
  }, [selectedBhk, variantFilter]);

  const projectFilterLower = projectFilter.trim().toLowerCase();
  const variantFilterLower = variantFilter.trim().toLowerCase();
  const sizeDigitsFilter = sizeFilter.replace(/[^\d]/g, "");
  const priceDigitsFilter = priceFilter.replace(/[^\d]/g, "");

  const filteredItems = useMemo(() => {
    return items.filter((row) => {
      if (projectFilterLower && !row.projectName.toLowerCase().includes(projectFilterLower)) {
        return false;
      }

      if (locationId && row.locationId !== locationId) return false;
      if (variantFilterLower && !(row.configuration ?? "").toLowerCase().includes(variantFilterLower)) {
        return false;
      }
      if (!rowMatchesAnyBhk(row, selectedBhkSet)) return false;

      const size = parseSizeSqft(row.sizeSqft);
      if (sizeDigitsFilter && size != null) {
        const normalizedSizeDigits = String(Math.round(size));
        if (!normalizedSizeDigits.includes(sizeDigitsFilter)) return false;
      }

      const price = parsePriceCr(row.priceCr);
      if (price == null) return true;
      const priceRs = toRupeesFromCr(price);
      if (budgetRangeRs[0] > 0 && priceRs < budgetRangeRs[0]) return false;
      if (budgetRangeRs[1] > 0 && priceRs > budgetRangeRs[1]) return false;
      if (priceDigitsFilter) {
        const normalizedPriceDigits = String(priceRs);
        if (!normalizedPriceDigits.includes(priceDigitsFilter)) return false;
      }
      return true;
    });
  }, [
    items,
    projectFilterLower,
    locationId,
    variantFilterLower,
    selectedBhkSet,
    sizeDigitsFilter,
    budgetRangeRs,
    priceDigitsFilter,
  ]);

  const flatRows = useMemo(() => {
    return [...filteredItems].sort((a, b) => {
      const pa = parsePriceCr(a.priceCr);
      const pb = parsePriceCr(b.priceCr);
      if (pa != null && pb != null && pa !== pb) return pa - pb;
      if (pa != null && pb == null) return -1;
      if (pa == null && pb != null) return 1;
      return a.projectName.localeCompare(b.projectName);
    });
  }, [filteredItems]);

  const onPageChange = (p: number) => {
    if (p < 1 || p > pagination.totalPages || p === page || listLoading) return;
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const serialStart = (pagination.page - 1) * pagination.perPage;

  if (loading && items.length === 0) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-50 px-4">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-10 w-10 animate-spin text-[#CBB27A]" aria-hidden />
          <p className="text-sm text-gray-600" style={{ fontFamily: "Poppins, sans-serif" }}>
            Loading inventory…
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 pb-28 font-poppins pt-4 sm:pt-6 md:pb-10 md:pt-8 lg:pt-10">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 md:px-8 lg:px-10">
        {/* Header (original) */}
        <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#CBB27A] to-[#B8A068] shadow-lg sm:h-14 sm:w-14">
              <Layers className="h-6 w-6 text-white sm:h-7 sm:w-7" />
            </div>
            <div>
              <h1
                className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-2xl font-bold text-transparent sm:text-3xl md:text-4xl"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Published inventory
              </h1>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2" />
        </div>

        {error ? (
          <div
            className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900"
            role="alert"
          >
            {error}
          </div>
        ) : null}

        {/* List */}
        <div className="relative">
          {listLoading ? (
            <div
              className="absolute inset-0 z-10 flex items-center justify-center rounded-lg border border-zinc-200 bg-white/80 backdrop-blur-[1px]"
              aria-busy
              aria-label="Updating results"
            >
              <Loader2 className="h-9 w-9 text-[#9a8648] animate-spin" />
            </div>
          ) : null}

          <div className="mb-3 rounded-lg border border-zinc-300 bg-white px-4 py-3 shadow-sm">
            <div className="mb-2 flex items-center justify-between gap-3">
              <span className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Price range</span>
              <span className="text-sm font-medium text-zinc-700">
                {budgetRangeRs[0] > 0 ? formatINR(budgetRangeRs[0]) : "—"} -{" "}
                {budgetRangeRs[1] > 0 ? formatINR(budgetRangeRs[1]) : "—"}
              </span>
            </div>
            <Slider
              min={priceBoundsRs.min}
              max={priceBoundsRs.max}
              step={100000}
              value={budgetRangeRs}
              onValueChange={(value) => {
                if (value.length === 2) {
                  setBudgetRangeRs([value[0] ?? priceBoundsRs.min, value[1] ?? priceBoundsRs.max]);
                }
              }}
              className="w-full data-[orientation=horizontal]:h-6 [&_[data-slot=slider-track]]:h-2.5 [&_[data-slot=slider-range]]:bg-[#CBB27A] [&_[data-slot=slider-thumb]]:size-5 [&_[data-slot=slider-thumb]]:border-[#CBB27A] [&_[data-slot=slider-thumb]]:bg-white"
              aria-label="Global price range in rupees"
            />
            <div className="mt-2 flex items-center gap-2">
              {BHK_FILTER_OPTIONS.map((opt) => {
                const active = selectedBhk.includes(opt);
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() =>
                      setSelectedBhk((prev) =>
                        prev.includes(opt) ? prev.filter((item) => item !== opt) : [...prev, opt]
                      )
                    }
                    className={cn(
                      "rounded-md border px-3 py-1.5 text-xs font-semibold transition-colors",
                      active
                        ? "border-[#CBB27A] bg-[#CBB27A]/20 text-zinc-900"
                        : "border-gray-300 bg-white text-zinc-700 hover:border-[#CBB27A]/70"
                    )}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="overflow-hidden rounded-lg border border-zinc-300 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[920px] border-collapse text-sm">
                <thead className="sticky top-0 z-20 bg-white shadow-sm">
                  <tr>
                    <th className={cn(thBase, "w-[72px] min-w-[72px] bg-white px-2 py-2")} />
                    <th className={cn(thBase, "bg-white px-3 py-2")}>
                      <Input
                        value={projectFilter}
                        onChange={(e) => setProjectFilter(e.target.value)}
                        placeholder="Search project"
                        className="h-9 w-full border-2 border-zinc-300 bg-white text-[13px] placeholder:font-medium placeholder:text-zinc-500 focus-visible:ring-[#CBB27A]/35"
                        aria-label="Project filter"
                      />
                    </th>
                    <th className={cn(thBase, "bg-white px-3 py-2")}>
                      <Select value={locationId || "__all__"} onValueChange={(v) => setLocationId(v === "__all__" ? "" : v)}>
                        <SelectTrigger className="h-9 w-full border-2 border-zinc-300 bg-white text-left text-[13px] font-medium text-zinc-700 focus:ring-[#CBB27A]/35">
                          <SelectValue placeholder="All locations" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="__all__">All locations</SelectItem>
                          {locations.map((loc) => (
                            <SelectItem key={loc.id} value={loc.id}>
                              {loc.locationName}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </th>
                    <th className={cn(thBase, "bg-white px-3 py-2")}>
                      <Input
                        value={variantFilter}
                        onChange={(e) => setVariantFilter(e.target.value)}
                        placeholder="Search variant"
                        className="h-9 w-full border-2 border-zinc-300 bg-white text-[13px] placeholder:font-medium placeholder:text-zinc-500 focus-visible:ring-[#CBB27A]/35"
                        aria-label="Variant filter"
                      />
                    </th>
                    <th className={cn(thBase, "bg-white px-3 py-2")}>
                      <Input
                        value={sizeFilter}
                        onChange={(e) => setSizeFilter(e.target.value.replace(/[^\d]/g, ""))}
                        placeholder="Size"
                        className="h-9 w-full border-2 border-zinc-300 bg-white font-mono text-[13px] placeholder:font-medium placeholder:text-zinc-500 focus-visible:ring-[#CBB27A]/35"
                        inputMode="numeric"
                        aria-label="Size filter"
                      />
                    </th>
                    <th className={cn(thBase, "bg-white px-3 py-2")}>
                      <Input
                        value={priceFilter}
                        onChange={(e) => setPriceFilter(e.target.value.replace(/[^\d]/g, ""))}
                        placeholder="Price ₹"
                        className="h-9 w-full border-2 border-zinc-300 bg-white font-mono text-[13px] placeholder:font-medium placeholder:text-zinc-500 focus-visible:ring-[#CBB27A]/35"
                        inputMode="numeric"
                        aria-label="Price filter"
                      />
                    </th>
                    <th className={cn(thBase, "bg-white px-3 py-2")} />
                  </tr>
                  <tr>
                    <th scope="col" className={cn(thBase, "w-[72px] min-w-[72px] bg-black px-2 text-center text-white border-black")}>Sr. No.</th>
                    <th scope="col" className={cn(thBase, "bg-black text-white border-black")}>Project</th>
                    <th scope="col" className={cn(thBase, "bg-black text-white border-black")}>Location</th>
                    <th scope="col" className={cn(thBase, "bg-black text-white border-black")}>Variant</th>
                    <th scope="col" className={cn(thBase, "bg-black text-white border-black")}>Size (sq ft)</th>
                    <th scope="col" className={cn(thBase, "bg-black text-white border-black")}>Price (₹)</th>
                    <th scope="col" className={cn(thBase, "bg-black text-white border-black")}>View</th>
                  </tr>
                </thead>
                <tbody>
                  {flatRows.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="border border-zinc-300 px-6 py-14 text-center">
                        <Layers className="mx-auto mb-3 h-10 w-10 text-zinc-300" aria-hidden />
                        <p className="font-medium text-zinc-800">No units match these filters.</p>
                        <p className="mt-2 text-sm text-zinc-600">
                          Change location to &quot;All locations&quot; or clear other filters above.
                        </p>
                      </td>
                    </tr>
                  ) : (
                    flatRows.map((row, idx) => {
                      const confKey = configurationGroupKeyFromLabel(row.configuration ?? "");
                      const isHighlighted = highlightedBhkKeys.has(confKey);
                      return (
                        <tr
                          key={row.id ?? `${row.propertyId}-${row.sortOrder}-${idx}`}
                          className={cn(
                            idx % 2 === 0 ? "bg-white" : "bg-zinc-50/80",
                            isHighlighted && "bg-[#CBB27A]/20",
                            "hover:bg-[rgba(197,168,124,0.10)]"
                          )}
                        >
                          <td className={cn(cellBorder, "w-[72px] min-w-[72px] px-2 text-center")}>
                            <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-md border border-zinc-300 bg-zinc-50 px-1 text-[11px] font-semibold text-zinc-600">
                              {serialStart + idx + 1}
                            </span>
                          </td>
                          <td className={cn(cellBorder, "pl-4")}>
                            <span className="font-medium text-zinc-900">{row.projectName}</span>
                          </td>
                          <td className={cn(cellBorder, "pl-4")}>{row.locationLabel || "—"}</td>
                          <td className={cn(cellBorder, "pl-4")}>{row.configuration?.trim() || "—"}</td>
                          <td className={cn(cellBorder, "pl-4 font-mono tabular-nums")}>{row.sizeSqft?.trim() || "—"}</td>
                          <td className={cn(cellBorder, "pl-4 font-mono font-medium tabular-nums")}>
                            {row.priceCr?.trim() ? formatInventoryPriceCrDisplay(row.priceCr) : "—"}
                          </td>
                          <td className={cn(cellBorder, "pl-4")}>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 rounded-md border border-black bg-black px-3 text-xs font-semibold text-white hover:bg-zinc-900 hover:text-white"
                              asChild
                            >
                              <Link
                                href={getPropertyUrl({
                                  slug: row.slug,
                                  locationSlug: row.locationSlug || null,
                                })}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                View page
                              </Link>
                            </Button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {pagination.totalPages > 1 ? (
          <PropertyGridPagination
            currentPage={pagination.page}
            totalPages={pagination.totalPages}
            onPageChange={onPageChange}
            isLoading={listLoading}
            className="mt-10"
          />
        ) : null}
      </div>
    </div>
  );
}

function InventoryProjectCard({
  rows,
  highlightedBhkKeys,
}: {
  rows: PropertyInventoryRow[];
  highlightedBhkKeys?: Set<string>;
}) {
  const head = rows[0];
  const serial = head.propertySerial ?? "—";
  const towers = formatOptionalLine("Towers", head.inventoryTowers);
  const possession = formatOptionalLine("Possession", head.possessionDate);
  const metaLines = [towers, possession].filter(Boolean) as string[];
  const configGroups = useMemo(() => groupInventoryRowsByConfiguration(rows), [rows]);

  const configurationTableRows = useMemo(() => {
    let zebra = 0;
    const nodes: ReactNode[] = [];
    for (const group of configGroups) {
      nodes.push(
        <tr key={`grp-h-${group.key}`} className="bg-gradient-to-r from-[#CBB27A]/22 via-[#CBB27A]/12 to-[#CBB27A]/8">
          <td
            colSpan={3}
            className="border border-zinc-300 border-b-2 border-b-[#CBB27A]/55 px-3 py-3 text-left sm:px-4 sm:py-3.5"
          >
            <span
              className="text-left text-base font-semibold tracking-tight text-zinc-600 sm:text-lg"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              {group.label}
            </span>
          </td>
        </tr>
      );
      for (let idx = 0; idx < group.lines.length; idx++) {
        const line = group.lines[idx]!;
        const stripe = zebra % 2 === 0;
        zebra += 1;
        const isHighlighted = Boolean(highlightedBhkKeys?.has(group.key));
        nodes.push(
          <tr
            key={line.id ?? `blank-${line.propertyId}-${line.sortOrder}-${group.key}-${idx}`}
            className={cn(
              stripe ? "bg-white" : "bg-zinc-50/90",
              isHighlighted && "bg-[#CBB27A]/18"
            )}
          >
            <td className={cn(cellBorder, "text-zinc-900")}>
              <ConfigurationCell value={line.configuration} />
            </td>
            <td className={cn(cellBorder, "tabular-nums text-zinc-800")}>
              {line.sizeSqft?.trim() ? line.sizeSqft : "—"}
            </td>
            <td className={cn(cellBorder, "font-medium text-zinc-900 tabular-nums")}>
              {line.priceCr?.trim() ? formatInventoryPriceCrDisplay(line.priceCr) : "—"}
            </td>
          </tr>
        );
      }
    }
    return nodes;
  }, [configGroups]);

  return (
    <article className="overflow-hidden rounded-lg border border-zinc-300 bg-white shadow-sm">
      {/* Accent + project header (grid with visible lines) */}
      <div className="flex border-b border-zinc-300">
        <div
          className="flex w-12 shrink-0 flex-col items-center justify-center border-r border-zinc-300 bg-[#CBB27A]/12 px-2 py-3 sm:w-14"
          aria-label={`List number ${serial}`}
        >
          <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">#</span>
          <span className="text-lg font-semibold tabular-nums text-zinc-900">{serial}</span>
        </div>
        <div className="min-w-0 flex-1">
          <div className="grid grid-cols-1 border-zinc-300 sm:grid-cols-[1fr_auto] sm:divide-x sm:divide-zinc-300 sm:items-stretch">
            <div className="flex flex-col justify-center border-b border-zinc-300 p-3 sm:border-b-0 sm:min-h-[4.25rem] sm:p-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                <div className="min-w-0 flex-1">
                  <h2
                    className="text-left text-lg font-bold leading-snug tracking-tight text-zinc-900 sm:text-xl md:text-2xl"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    {head.projectName}
                  </h2>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className={cn(
                    "h-9 min-w-[6.25rem] shrink-0 self-start rounded-lg border-2 border-[#CBB27A]/75 bg-[#CBB27A]/15 px-4 text-sm font-semibold !text-zinc-900 shadow-sm sm:self-center",
                    "hover:border-[#CBB27A] hover:!bg-[#CBB27A]/28 hover:!text-zinc-900",
                    "active:!bg-[#CBB27A]/35 active:!text-zinc-900",
                    "focus-visible:ring-2 focus-visible:ring-[#CBB27A]/45 focus-visible:!text-zinc-900"
                  )}
                  asChild
                >
                  <Link
                    href={getPropertyUrl({
                      slug: head.slug,
                      locationSlug: head.locationSlug || null,
                    })}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View page
                  </Link>
                </Button>
              </div>
            </div>
            <div className="flex min-h-0 min-w-0 flex-col justify-center p-3 sm:w-[13.5rem] sm:shrink-0 sm:p-4">
              <div className="flex items-center gap-2 text-left text-sm text-zinc-800">
                <MapPin className="h-4 w-4 shrink-0 text-zinc-400" aria-hidden />
                <span className="leading-snug">{head.locationLabel || "—"}</span>
              </div>
            </div>
          </div>
          {metaLines.length > 0 ? (
            <div className="border-t border-zinc-200 bg-zinc-50/80 px-3 py-2 sm:px-4">
              <ul className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-zinc-600">
                {metaLines.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>

      {/* Configuration lines — grouped by similar unit type */}
      <div className="border-t border-zinc-300 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[520px] border-collapse text-sm">
            <thead>
              <tr>
                <th scope="col" className={cn(thBase, "w-[38%]")}>
                  Variant
                </th>
                <th scope="col" className={cn(thBase, "w-[28%]")}>
                  Size (sq ft)
                </th>
                <th scope="col" className={cn(thBase, "w-[34%]")}>
                  Price (₹)
                </th>
              </tr>
            </thead>
            <tbody>{configurationTableRows}</tbody>
          </table>
        </div>
      </div>
    </article>
  );
}

function ConfigurationCell({ value }: { value: string }) {
  const v = value?.trim();
  if (!v) {
    return (
      <span className="inline-flex items-center rounded border border-amber-200/80 bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-900">
        Not set — add in CMS
      </span>
    );
  }
  return <span>{v}</span>;
}
