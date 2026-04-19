"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Layers, Loader2, MapPin, RefreshCw, Search, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [locationId, setLocationId] = useState<string>("");
  const [page, setPage] = useState(1);
  const isFirstInventoryFetch = useRef(true);
  const filterRef = useRef({ debouncedSearch, locationId });

  const handleAuthError = useCallback(() => {
    router.push("/admin/login");
  }, [router]);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(searchInput.trim()), 380);
    return () => clearTimeout(t);
  }, [searchInput]);

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
      params.set("page", String(page));
      params.set("perPage", "15");
      if (debouncedSearch) params.set("q", debouncedSearch);
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
      setRefreshing(false);
    }
  }, [page, debouncedSearch, locationId, handleAuthError]);

  useEffect(() => {
    const prev = filterRef.current;
    const filtersChanged =
      prev.debouncedSearch !== debouncedSearch || prev.locationId !== locationId;

    if (filtersChanged && page !== 1) {
      setPage(1);
      return;
    }

    filterRef.current = { debouncedSearch, locationId };
    void loadInventory();
  }, [page, debouncedSearch, locationId, loadInventory]);

  const grouped = useMemo(() => chunkItemsByProperty(items), [items]);

  const handleRefresh = () => {
    setRefreshing(true);
    void loadInventory();
  };

  const onPageChange = (p: number) => {
    if (p < 1 || p > pagination.totalPages || p === page || listLoading) return;
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
          <div className="flex shrink-0 items-center gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleRefresh}
              disabled={refreshing || listLoading}
              className="h-11 rounded-xl border-2 border-gray-200 px-4 hover:border-[#CBB27A] hover:bg-[#CBB27A]/5"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              <RefreshCw className={cn("mr-2 h-4 w-4", refreshing && "animate-spin")} />
              Refresh
            </Button>
          </div>
        </div>

        {/* Filters (original) */}
        <div className="mb-6 rounded-2xl border border-gray-200/80 bg-white/90 p-4 shadow-md backdrop-blur-sm sm:p-5">
          <div className="mb-4 flex items-center gap-2 text-gray-700">
            <SlidersHorizontal className="h-4 w-4 text-[#CBB27A]" />
            <span className="text-sm font-semibold" style={{ fontFamily: "Poppins, sans-serif" }}>
              Filters
            </span>
          </div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <div className="relative lg:col-span-2">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search project, location, slug, configuration, size, price…"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="h-11 rounded-xl border-gray-200 pl-10 focus-visible:ring-[#CBB27A]/30"
                style={{ fontFamily: "Poppins, sans-serif" }}
                aria-label="Search inventory"
              />
            </div>
            <Select value={locationId || "__all__"} onValueChange={(v) => setLocationId(v === "__all__" ? "" : v)}>
              <SelectTrigger
                className="h-11 w-full rounded-xl border-gray-200"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
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
          </div>
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

          {grouped.length === 0 ? (
            <div className="rounded-lg border border-zinc-300 bg-white px-6 py-14 text-center shadow-sm">
              <Layers className="mx-auto mb-3 h-10 w-10 text-zinc-300" aria-hidden />
              <p className="font-medium text-zinc-800">No projects match these filters.</p>
              <p className="mt-2 text-sm text-zinc-600">Clear the search box or choose “All locations”.</p>
            </div>
          ) : (
            <ol className="space-y-6" aria-label="Published projects">
              {grouped.map((rows) => (
                <li key={`${rows[0].propertyId}-${rows[0].propertySerial}`}>
                  <InventoryProjectCard rows={rows} />
                </li>
              ))}
            </ol>
          )}
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

function InventoryProjectCard({ rows }: { rows: PropertyInventoryRow[] }) {
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
              className="text-lg font-bold tracking-tight text-zinc-900 sm:text-xl"
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
        nodes.push(
          <tr
            key={line.id ?? `blank-${line.propertyId}-${line.sortOrder}-${group.key}-${idx}`}
            className={stripe ? "bg-white" : "bg-zinc-50/90"}
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
          <div className="grid grid-cols-1 border-zinc-300 sm:grid-cols-[1fr_auto] sm:divide-x sm:divide-zinc-300">
            <div className="border-b border-zinc-300 p-3 sm:border-b-0 sm:p-4">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
                <h2 className="min-w-0 flex-1 text-base font-semibold leading-snug text-zinc-900 sm:text-lg">
                  {head.projectName}
                </h2>
                <Button
                  variant="outline"
                  size="sm"
                  className={cn(
                    "h-9 min-w-[6.25rem] shrink-0 self-end rounded-lg border-2 border-[#CBB27A]/75 bg-[#CBB27A]/15 px-4 text-sm font-semibold !text-zinc-900 shadow-sm",
                    "hover:border-[#CBB27A] hover:!bg-[#CBB27A]/28 hover:!text-zinc-900",
                    "active:!bg-[#CBB27A]/35 active:!text-zinc-900",
                    "focus-visible:ring-2 focus-visible:ring-[#CBB27A]/45 focus-visible:!text-zinc-900",
                    "sm:self-start"
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
            <div className="flex min-w-0 flex-col justify-center gap-1 p-3 sm:w-[13.5rem] sm:shrink-0 sm:p-4">
              <div className="flex items-start gap-2 text-sm text-zinc-800">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-zinc-400" aria-hidden />
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
