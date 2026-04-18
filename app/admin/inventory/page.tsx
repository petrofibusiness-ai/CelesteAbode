"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Layers,
  Loader2,
  RefreshCw,
  Search,
  SlidersHorizontal,
} from "lucide-react";
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
import { cn } from "@/lib/utils";

interface PaginationState {
  page: number;
  perPage: number;
  totalProperties: number;
  totalPages: number;
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
      <div className="p-4 sm:p-6 md:p-8 flex items-center justify-center min-h-[50vh]">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-10 h-10 text-[#CBB27A] animate-spin" />
          <p className="text-gray-600 text-sm" style={{ fontFamily: "Poppins, sans-serif" }}>
            Loading inventory…
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 md:p-8 lg:p-10 bg-gradient-to-br from-gray-50 via-white to-gray-50 min-h-screen pb-24 md:pb-10">
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-8">
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-[#CBB27A] to-[#B8A068] rounded-xl flex items-center justify-center shadow-lg shrink-0">
              <Layers className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </div>
            <div>
              <h1
                className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Published inventory
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Button
              type="button"
              variant="outline"
              onClick={handleRefresh}
              disabled={refreshing || listLoading}
              className="h-11 px-4 rounded-xl border-2 border-gray-200 hover:border-[#CBB27A] hover:bg-[#CBB27A]/5"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              <RefreshCw className={cn("w-4 h-4 mr-2", refreshing && "animate-spin")} />
              Refresh
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-200/80 shadow-md p-4 sm:p-5 mb-6">
          <div className="flex items-center gap-2 text-gray-700 mb-4">
            <SlidersHorizontal className="w-4 h-4 text-[#CBB27A]" />
            <span className="text-sm font-semibold" style={{ fontFamily: "Poppins, sans-serif" }}>
              Filters
            </span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="relative lg:col-span-2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              <Input
                placeholder="Search project, location, slug, configuration, size, price…"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="pl-10 h-11 rounded-xl border-gray-200 focus-visible:ring-[#CBB27A]/30"
                style={{ fontFamily: "Poppins, sans-serif" }}
                aria-label="Search inventory"
              />
            </div>
            <Select value={locationId || "__all__"} onValueChange={(v) => setLocationId(v === "__all__" ? "" : v)}>
              <SelectTrigger className="h-11 rounded-xl w-full border-gray-200" style={{ fontFamily: "Poppins, sans-serif" }}>
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
            className="mb-6 rounded-xl border border-red-200 bg-red-50 text-red-800 px-4 py-3 text-sm"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            {error}
          </div>
        ) : null}

        {/* Table / cards */}
        <div className="relative">
          {listLoading ? (
            <div
              className="absolute inset-0 z-10 flex items-center justify-center rounded-2xl bg-white/60 backdrop-blur-[2px] min-h-[240px]"
              aria-busy
            >
              <Loader2 className="w-10 h-10 text-[#CBB27A] animate-spin" />
            </div>
          ) : null}

          {grouped.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-12 text-center">
              <Layers className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 font-medium" style={{ fontFamily: "Poppins, sans-serif" }}>
                No rows match your filters.
              </p>
              <p className="text-sm text-gray-500 mt-2" style={{ fontFamily: "Poppins, sans-serif" }}>
                Try clearing search or switching the location filter.
              </p>
            </div>
          ) : (
            <>
              {/* Desktop table */}
              <div className="hidden lg:block bg-white rounded-2xl border border-gray-200/80 shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left min-w-[720px]">
                    <thead>
                      <tr className="bg-gradient-to-r from-gray-50 to-gray-100/80 border-b border-gray-200">
                        <th className="px-4 py-3 font-semibold text-gray-700 w-10" style={{ fontFamily: "Poppins, sans-serif" }}>
                          #
                        </th>
                        <th className="px-4 py-3 font-semibold text-gray-700" style={{ fontFamily: "Poppins, sans-serif" }}>
                          Project
                        </th>
                        <th
                          className="px-3 py-3 font-semibold text-gray-700 w-[7.5rem] max-w-[7.5rem] align-top whitespace-normal break-words"
                          style={{ fontFamily: "Poppins, sans-serif" }}
                        >
                          Location
                        </th>
                        <th className="px-4 py-3 font-semibold text-gray-700" style={{ fontFamily: "Poppins, sans-serif" }}>
                          Configuration
                        </th>
                        <th className="px-4 py-3 font-semibold text-gray-700 whitespace-nowrap" style={{ fontFamily: "Poppins, sans-serif" }}>
                          Size (sq ft)
                        </th>
                        <th className="px-4 py-3 font-semibold text-gray-700 whitespace-nowrap" style={{ fontFamily: "Poppins, sans-serif" }}>
                          Price (Cr)
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {grouped.map((rows) => {
                        const head = rows[0];
                        return (
                          <DesktopPropertyGroupRows
                            key={`${head.propertyId}-${head.propertySerial}`}
                            rows={rows}
                          />
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Mobile / tablet cards */}
              <div className="lg:hidden space-y-4">
                {grouped.map((rows) => {
                  const head = rows[0];
                  return (
                    <article
                      key={`m-${head.propertyId}-${head.propertySerial}`}
                      className="bg-white rounded-2xl border border-gray-200/80 shadow-md overflow-hidden"
                    >
                      <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-[#CBB27A]/8 to-transparent">
                        <div>
                          <p className="text-xs text-gray-500 font-medium" style={{ fontFamily: "Poppins, sans-serif" }}>
                            #{head.propertySerial}
                          </p>
                          <h2
                            className="text-base font-bold text-gray-900 mt-0.5"
                            style={{ fontFamily: "Poppins, sans-serif" }}
                          >
                            {head.projectName}
                          </h2>
                          <p className="text-xs text-gray-600 mt-1" style={{ fontFamily: "Poppins, sans-serif" }}>
                            {head.locationLabel}
                          </p>
                        </div>
                      </div>
                      <ul className="divide-y divide-gray-100">
                        {rows.map((line) => (
                          <li key={line.id ?? `blank-${line.propertyId}-${line.sortOrder}`} className="p-4 space-y-2">
                            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
                              <span className="text-gray-500" style={{ fontFamily: "Poppins, sans-serif" }}>
                                Config
                              </span>
                              <span className="font-medium text-gray-900" style={{ fontFamily: "Poppins, sans-serif" }}>
                                {line.configuration?.trim() ? (
                                  line.configuration
                                ) : (
                                  <span className="text-red-600 font-semibold">NA</span>
                                )}
                              </span>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
                              <div>
                                <span className="text-gray-500 block" style={{ fontFamily: "Poppins, sans-serif" }}>
                                  Size (sq ft)
                                </span>
                                <span className="font-medium text-gray-900" style={{ fontFamily: "Poppins, sans-serif" }}>
                                  {line.sizeSqft || "—"}
                                </span>
                              </div>
                              <div>
                                <span className="text-gray-500 block" style={{ fontFamily: "Poppins, sans-serif" }}>
                                  Price (Cr)
                                </span>
                                <span className="font-medium text-gray-900 tabular-nums" style={{ fontFamily: "Poppins, sans-serif" }}>
                                  {line.priceCr?.trim() ? line.priceCr : "—"}
                                </span>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </article>
                  );
                })}
              </div>
            </>
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

function DesktopPropertyGroupRows({ rows }: { rows: PropertyInventoryRow[] }) {
  const head = rows[0];
  return (
    <>
      {rows.map((line, idx) => (
        <tr key={line.id ?? `blank-${line.propertyId}-${line.sortOrder}-${idx}`} className="hover:bg-[#CBB27A]/[0.04]">
          <td className="px-4 py-3 text-gray-500 align-top whitespace-nowrap" style={{ fontFamily: "Poppins, sans-serif" }}>
            {idx === 0 ? head.propertySerial : ""}
          </td>
          <td className="px-4 py-3 align-top">
            {idx === 0 ? (
              <span className="font-semibold text-gray-900" style={{ fontFamily: "Poppins, sans-serif" }}>
                {line.projectName}
              </span>
            ) : (
              <span className="text-gray-400 text-xs">″</span>
            )}
          </td>
          <td
            className="px-3 py-3 text-gray-700 align-top w-[7.5rem] max-w-[7.5rem] whitespace-normal break-words"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            {idx === 0 ? (
              <span className="block leading-snug break-words">{line.locationLabel}</span>
            ) : (
              ""
            )}
          </td>
          <td className="px-4 py-3 text-gray-900 align-top" style={{ fontFamily: "Poppins, sans-serif" }}>
            {line.configuration?.trim() ? (
              line.configuration
            ) : (
              <span className="text-red-600 font-semibold">NA</span>
            )}
          </td>
          <td className="px-4 py-3 text-gray-800 align-top tabular-nums" style={{ fontFamily: "Poppins, sans-serif" }}>
            {line.sizeSqft || "—"}
          </td>
          <td className="px-4 py-3 text-gray-800 align-top tabular-nums" style={{ fontFamily: "Poppins, sans-serif" }}>
            {line.priceCr?.trim() ? line.priceCr : "—"}
          </td>
        </tr>
      ))}
    </>
  );
}
