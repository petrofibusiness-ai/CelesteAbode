"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { PropertyListingTable } from "@/components/property-listings/property-listing-table";
import { PropertyListingsSkeleton } from "@/components/property-listings/property-listings-skeleton";
import { PropertyGridPagination } from "@/components/property-grid-pagination";
import type { PropertyInventoryRow } from "@/types/property-listing";
import { Unlock, Loader2 } from "lucide-react";

const SESSION_EDIT_KEY = "ca_private_pl_edit_key";
const PER_PAGE = 10;

export function PropertyListingsView() {
  const [items, setItems] = useState<PropertyInventoryRow[]>([]);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    page: 1,
    perPage: PER_PAGE,
    totalProperties: 0,
    totalPages: 1,
  });
  const [listLoading, setListLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editModeAvailable, setEditModeAvailable] = useState(false);
  const [editKey, setEditKey] = useState<string | null>(null);
  const [keyInput, setKeyInput] = useState("");
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    try {
      const k = sessionStorage.getItem(SESSION_EDIT_KEY);
      if (k) setEditKey(k);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    if (abortRef.current) abortRef.current.abort();
    const ac = new AbortController();
    abortRef.current = ac;
    setListLoading(true);
    setError(null);

    (async () => {
      try {
        const qs = new URLSearchParams({ page: String(page), perPage: String(PER_PAGE) });
        const res = await fetch(`/api/property-listings?${qs}`, { signal: ac.signal });
        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new Error(typeof body.error === "string" ? body.error : "Couldn’t load this page.");
        }
        const data = await res.json();
        setItems(Array.isArray(data.items) ? data.items : []);
        if (data.pagination && typeof data.pagination === "object") {
          const p = data.pagination as {
            page?: number;
            perPage?: number;
            totalProperties?: number;
            totalPages?: number;
          };
          setPagination({
            page: typeof p.page === "number" ? p.page : page,
            perPage: typeof p.perPage === "number" ? p.perPage : PER_PAGE,
            totalProperties: typeof p.totalProperties === "number" ? p.totalProperties : 0,
            totalPages: typeof p.totalPages === "number" ? p.totalPages : 1,
          });
          if (typeof p.page === "number" && p.page !== page) {
            setPage(p.page);
          }
        }
        if (typeof data.editModeAvailable === "boolean") {
          setEditModeAvailable(data.editModeAvailable);
        }
      } catch (e) {
        if (e instanceof Error && e.name === "AbortError") return;
        setError(e instanceof Error ? e.message : "Something went wrong");
        setItems([]);
      } finally {
        if (!ac.signal.aborted) setListLoading(false);
      }
    })();

    return () => ac.abort();
  }, [page]);

  const reloadInventory = useCallback(async () => {
    try {
      const qs = new URLSearchParams({ page: String(page), perPage: String(PER_PAGE) });
      const res = await fetch(`/api/property-listings?${qs}`);
      if (!res.ok) return;
      const data = await res.json();
      setItems(Array.isArray(data.items) ? data.items : []);
      if (data.pagination && typeof data.pagination === "object") {
        const p = data.pagination as {
          page?: number;
          perPage?: number;
          totalProperties?: number;
          totalPages?: number;
        };
        setPagination({
          page: typeof p.page === "number" ? p.page : page,
          perPage: typeof p.perPage === "number" ? p.perPage : PER_PAGE,
          totalProperties: typeof p.totalProperties === "number" ? p.totalProperties : 0,
          totalPages: typeof p.totalPages === "number" ? p.totalPages : 1,
        });
        if (typeof p.page === "number" && p.page !== page) {
          setPage(p.page);
        }
      }
    } catch {
      /* ignore */
    }
  }, [page]);

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

  const handlePageChange = (next: number) => {
    if (next < 1 || next > pagination.totalPages || next === page || listLoading) return;
    setPage(next);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <main className="pb-10 sm:pb-12">
        <section className="border-b border-black/20">
          <div className="mx-auto max-w-7xl px-3 pb-8 pt-10 sm:px-6 sm:pb-10 sm:pt-12 md:pt-14 lg:px-8">
            <div className="mx-auto max-w-5xl text-center">
              <h1 className="font-serif text-5xl font-semibold tracking-tight text-foreground sm:text-6xl md:text-7xl md:leading-[1.02] lg:text-8xl">
                Property inventory
              </h1>
              <p className="mt-3 font-poppins text-sm text-muted-foreground sm:text-base md:text-lg">
                Quick reference for calls: size, configuration, and price by project. Use Save on each project when you
                finish editing.
              </p>
            </div>

            <div className="mx-auto mt-6 flex w-full flex-col items-center">
              {editModeAvailable ? (
                editKey ? (
                  <div className="flex max-w-md flex-wrap items-center justify-center gap-x-3 gap-y-2 text-center font-poppins text-xs text-muted-foreground">
                    <span className="leading-none">Editing unlocked on this device.</span>
                    <button
                      type="button"
                      onClick={lockEditing}
                      className="inline-flex h-10 min-w-[5.5rem] shrink-0 items-center justify-center gap-1.5 rounded-md border border-black bg-white px-3 font-poppins text-xs font-medium text-foreground transition hover:bg-neutral-50"
                    >
                      <Unlock className="h-3.5 w-3.5 shrink-0" aria-hidden />
                      Lock
                    </button>
                  </div>
                ) : (
                  <div className="flex w-full max-w-xs flex-col items-center gap-2">
                    <p className="w-full text-center font-poppins text-xs text-muted-foreground">
                      Enter password to unlock editing
                    </p>
                    <div className="flex w-full items-stretch gap-2">
                      <input
                        type="password"
                        value={keyInput}
                        onChange={(e) => setKeyInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") unlockEditing();
                        }}
                        placeholder="Password"
                        autoComplete="off"
                        className="h-10 min-h-10 min-w-0 flex-1 rounded-md border border-black bg-white px-3 font-poppins text-sm outline-none focus:border-black focus:ring-1 focus:ring-black/20"
                      />
                      <button
                        type="button"
                        onClick={unlockEditing}
                        className="inline-flex h-10 min-h-10 w-[6.5rem] shrink-0 items-center justify-center rounded-md border border-black bg-neutral-100 font-poppins text-sm font-medium text-foreground transition hover:bg-neutral-200/90"
                      >
                        Unlock
                      </button>
                    </div>
                  </div>
                )
              ) : (
                <p className="max-w-sm text-center font-poppins text-xs text-muted-foreground">
                  Editing isn’t available here. Ask your team lead if you need changes.
                </p>
              )}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-3 py-8 sm:px-6 sm:py-10 lg:px-8" aria-busy={listLoading}>
          {error && (
            <div
              role="alert"
              className="mb-6 rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 font-poppins text-sm text-destructive"
            >
              {error}
            </div>
          )}

          {listLoading ? (
            <div className="flex flex-col gap-4">
              <span className="inline-flex items-center gap-2 font-poppins text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 shrink-0 animate-spin text-neutral-900" aria-hidden />
                Loading…
              </span>
              <PropertyListingsSkeleton rows={4} />
            </div>
          ) : items.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-black/50 bg-white px-4 py-12 text-center font-poppins text-sm text-muted-foreground sm:px-6 sm:py-16 sm:text-base">
              Nothing to show here yet.
            </p>
          ) : (
            <>
              <PropertyListingTable items={items} editKey={editKey} onInventoryReload={reloadInventory} />
              {pagination.totalPages > 1 ? (
                <PropertyGridPagination
                  currentPage={pagination.page}
                  totalPages={pagination.totalPages}
                  onPageChange={handlePageChange}
                  isLoading={listLoading}
                  className="mt-10"
                />
              ) : null}
            </>
          )}
        </section>
      </main>
    </div>
  );
}
