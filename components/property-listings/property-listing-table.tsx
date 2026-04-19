"use client";

import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { Loader2, Pencil, Plus, Trash2 } from "lucide-react";
import type { PropertyInventoryRow } from "@/types/property-listing";
import { CONFIGURATIONS } from "@/lib/property-enums";
import { propertyListingsEditFetchHeaders } from "@/lib/property-listings-edit-headers";
import {
  formatInventoryPriceCrDisplay,
  hasCroreNumberToken,
  sanitizeInventoryDigitsInput,
  sanitizeInventoryPriceCrInput,
} from "@/lib/property-listings-price";
import { getPropertyUrl } from "@/lib/property-url";

export interface PropertyListingTableProps {
  items: PropertyInventoryRow[];
  editKey: string | null;
  onInventoryReload: () => void | Promise<void>;
}

const N_PRESETS = CONFIGURATIONS.length;

function presetConfiguration(slotIndex: number): string {
  return CONFIGURATIONS[slotIndex % N_PRESETS] ?? "";
}

function groupContiguousByPropertyId(items: PropertyInventoryRow[]): PropertyInventoryRow[][] {
  const groups: PropertyInventoryRow[][] = [];
  let current: PropertyInventoryRow[] = [];
  let lastPid: string | null = null;
  for (const item of items) {
    if (item.propertyId !== lastPid) {
      if (current.length) groups.push(current);
      current = [item];
      lastPid = item.propertyId;
    } else {
      current.push(item);
    }
  }
  if (current.length) groups.push(current);
  return groups;
}

function sortLines(lines: PropertyInventoryRow[]): PropertyInventoryRow[] {
  return [...lines].sort((a, b) => {
    if (a.sortOrder !== b.sortOrder) return a.sortOrder - b.sortOrder;
    return (a.id ?? "").localeCompare(b.id ?? "");
  });
}

type DraftRow = {
  key: string;
  id?: string;
  sizeSqft: string;
  configuration: string;
  priceCr: string;
};

function isPresetTemplateRow(r: DraftRow, propertyId: string): boolean {
  return !r.id && !r.priceCr.trim() && r.key.startsWith(`nb-${propertyId}-`);
}

function ensureTrailingBlankRows(
  rows: DraftRow[],
  propertyId: string,
  seqRef: { current: number }
): DraftRow[] {
  let emptyTail = 0;
  for (let i = rows.length - 1; i >= 0; i--) {
    const r = rows[i]!;
    if (r.id) break;
    if (isPresetTemplateRow(r, propertyId)) emptyTail += 1;
    else break;
  }
  const need = Math.max(0, 2 - emptyTail);
  if (need === 0) return rows;
  const add: DraftRow[] = [];
  for (let k = 0; k < need; k++) {
    seqRef.current += 1;
    const slot = rows.length + k;
    add.push({
      key: `nb-${propertyId}-${seqRef.current}`,
      id: undefined,
      sizeSqft: "",
      configuration: presetConfiguration(slot),
      priceCr: "",
    });
  }
  return [...rows, ...add];
}

const inputClass =
  "h-10 w-full rounded-md border border-black bg-white px-2.5 font-poppins text-xs text-foreground outline-none transition focus:border-black focus:ring-2 focus:ring-black/15 disabled:cursor-not-allowed disabled:bg-muted/50";

const cardActionBtnClass =
  "inline-flex h-10 w-full items-center justify-center gap-1.5 rounded-md border border-black px-3 font-poppins text-xs font-medium text-slate-800 shadow-sm transition disabled:cursor-not-allowed disabled:opacity-50";
const headerFieldLabelClass =
  "block font-poppins text-[0.65rem] font-semibold uppercase tracking-wide text-slate-600";

function PropertyInventoryCard({
  lines,
  editKey,
  onInventoryReload,
}: {
  lines: PropertyInventoryRow[];
  editKey: string | null;
  onInventoryReload: () => void | Promise<void>;
}) {
  const sorted = useMemo(() => sortLines(lines), [lines]);
  const first = sorted[0];
  const linesSnapshot = useMemo(
    () =>
      JSON.stringify(
        sorted.map((l) => ({
          id: l.id ?? null,
          pid: l.propertyId,
          s: l.sizeSqft,
          c: l.configuration,
          p: l.priceCr,
          o: l.sortOrder,
        }))
      ),
    [sorted]
  );

  const blankSeqRef = useRef(0);
  const [draftRows, setDraftRows] = useState<DraftRow[]>([]);
  const [headerTowers, setHeaderTowers] = useState("");
  const [headerPossession, setHeaderPossession] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [deleteModal, setDeleteModal] = useState<
    | null
    | { mode: "api"; id: string; summary: string }
    | { mode: "draft"; key: string; summary: string }
  >(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const cancelDeleteBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setHeaderTowers(sanitizeInventoryDigitsInput(first.inventoryTowers ?? ""));
    setHeaderPossession((first.possessionDate ?? "").slice(0, 200));
  }, [first.propertyId, first.inventoryTowers, first.possessionDate]);

  useEffect(() => {
    const base: DraftRow[] = sorted.map((l, i) => ({
      key: l.id ?? `np-${l.propertyId}`,
      id: l.id,
      sizeSqft: sanitizeInventoryDigitsInput(l.sizeSqft ?? ""),
      configuration: (l.configuration ?? "").trim() || presetConfiguration(i),
      priceCr: sanitizeInventoryPriceCrInput(l.priceCr ?? ""),
    }));
    const minTrailing = Math.max(2, 6 - base.length);
    const blanks: DraftRow[] = [];
    for (let i = 0; i < minTrailing; i++) {
      blankSeqRef.current += 1;
      const slot = base.length + i;
      blanks.push({
        key: `nb-${first.propertyId}-${blankSeqRef.current}`,
        id: undefined,
        sizeSqft: "",
        configuration: presetConfiguration(slot),
        priceCr: "",
      });
    }
    setDraftRows([...base, ...blanks]);
  }, [linesSnapshot, first.propertyId]);

  const href = getPropertyUrl({
    slug: first.slug,
    locationSlug: first.locationSlug || undefined,
  });
  const hasImage = Boolean(first.heroImage?.trim());
  const unlocked = Boolean(editKey?.trim());
  const serialLabel = first.propertySerial != null ? String(first.propertySerial) : "—";

  const editKeyRef = useRef(editKey);
  editKeyRef.current = editKey;

  const closeDeleteModal = useCallback(() => {
    if (deleteLoading) return;
    setDeleteModal(null);
    setDeleteError(null);
  }, [deleteLoading]);

  useEffect(() => {
    if (!deleteModal) return;
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => cancelDeleteBtnRef.current?.focus(), 0);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeDeleteModal();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(t);
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [deleteModal, closeDeleteModal]);

  const openDeleteConfirm = useCallback(
    (row: DraftRow) => {
      if (!unlocked || saving || deleteLoading) return;
      setDeleteError(null);
      const priceLine = row.priceCr.trim()
        ? hasCroreNumberToken(row.priceCr)
          ? formatInventoryPriceCrDisplay(row.priceCr)
          : row.priceCr.trim()
        : "";
      const parts = [row.configuration.trim(), row.sizeSqft.trim() ? `${row.sizeSqft} sq ft` : "", priceLine].filter(
        Boolean
      );
      const summary = parts.length ? parts.join(" · ") : "Empty line";
      if (row.id) setDeleteModal({ mode: "api", id: row.id, summary });
      else setDeleteModal({ mode: "draft", key: row.key, summary });
    },
    [unlocked, saving, deleteLoading]
  );

  const patchPropertyHeader = useCallback(
    async (body: { inventoryTowers: string; possessionDate: string }) => {
      const res = await fetch(`/api/property-listings/properties/${first.propertyId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...propertyListingsEditFetchHeaders(editKeyRef.current),
        },
        body: JSON.stringify(body),
      });
      const errBody = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(typeof errBody.error === "string" ? errBody.error : "Header save failed");
      }
    },
    [first.propertyId]
  );

  const patchRow = useCallback(async (id: string, body: { configuration: string; sizeSqft: string; priceCr: string }) => {
    const res = await fetch(`/api/property-listings/configurations/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...propertyListingsEditFetchHeaders(editKeyRef.current),
      },
      body: JSON.stringify(body),
    });
    const errBody = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(typeof errBody.error === "string" ? errBody.error : "Save failed");
    }
  }, []);

  const postRow = useCallback(
    async (body: { propertyId: string; configuration: string; sizeSqft: string; priceCr: string }) => {
      const res = await fetch("/api/property-listings/configurations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...propertyListingsEditFetchHeaders(editKeyRef.current),
        },
        body: JSON.stringify(body),
      });
      const errBody = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(typeof errBody.error === "string" ? errBody.error : "Could not create row");
      }
    },
    []
  );

  const deleteRow = useCallback(async (id: string) => {
    const res = await fetch(`/api/property-listings/configurations/${id}`, {
      method: "DELETE",
      headers: propertyListingsEditFetchHeaders(editKeyRef.current),
    });
    const errBody = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(typeof errBody.error === "string" ? errBody.error : "Could not remove row");
    }
  }, []);

  const confirmDelete = useCallback(async () => {
    if (!deleteModal) return;
    setDeleteError(null);
    if (deleteModal.mode === "draft") {
      setDraftRows((rows) => {
        const filtered = rows.filter((r) => r.key !== deleteModal.key);
        return ensureTrailingBlankRows(filtered, first.propertyId, blankSeqRef);
      });
      setDeleteModal(null);
      return;
    }
    setDeleteLoading(true);
    try {
      await deleteRow(deleteModal.id);
      setDeleteModal(null);
      await onInventoryReload();
    } catch (e) {
      setDeleteError(e instanceof Error ? e.message : "Could not delete");
    } finally {
      setDeleteLoading(false);
    }
  }, [deleteModal, deleteRow, first.propertyId, onInventoryReload]);

  const handleSaveAll = useCallback(async () => {
    if (!unlocked) return;
    setSaving(true);
    setSaveError(null);
    try {
      await patchPropertyHeader({
        inventoryTowers: headerTowers,
        possessionDate: headerPossession,
      });
      const patchedIds = new Set<string>();
      const deletedIds = new Set<string>();
      for (const row of draftRows) {
        const hasPrice = Boolean(row.priceCr.trim());
        if (row.id) {
          if (hasPrice) {
            if (patchedIds.has(row.id)) continue;
            patchedIds.add(row.id);
            await patchRow(row.id, {
              configuration: row.configuration,
              sizeSqft: row.sizeSqft,
              priceCr: row.priceCr,
            });
          } else {
            if (deletedIds.has(row.id)) continue;
            deletedIds.add(row.id);
            await deleteRow(row.id);
          }
        } else if (hasPrice) {
          await postRow({
            propertyId: first.propertyId,
            configuration: row.configuration,
            sizeSqft: row.sizeSqft,
            priceCr: row.priceCr,
          });
        }
      }
      await onInventoryReload();
    } catch (e) {
      setSaveError(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }, [
    draftRows,
    first.propertyId,
    headerPossession,
    headerTowers,
    onInventoryReload,
    patchPropertyHeader,
    patchRow,
    postRow,
    deleteRow,
    unlocked,
  ]);

  const updateDraft = useCallback(
    (key: string, field: "configuration" | "priceCr" | "sizeSqft", value: string) => {
      const nextValue =
        field === "priceCr"
          ? sanitizeInventoryPriceCrInput(value)
          : field === "sizeSqft"
            ? sanitizeInventoryDigitsInput(value)
            : value;
      setDraftRows((rows) => {
        const next = rows.map((r) => (r.key === key ? { ...r, [field]: nextValue } : r));
        return ensureTrailingBlankRows(next, first.propertyId, blankSeqRef);
      });
    },
    [first.propertyId]
  );

  const handleAddConfiguration = useCallback(() => {
    if (!unlocked) return;
    setDraftRows((rows) => {
      const pid = first.propertyId;
      blankSeqRef.current += 1;
      const newRow: DraftRow = {
        key: `extra-${pid}-${blankSeqRef.current}`,
        id: undefined,
        sizeSqft: "",
        configuration: "",
        priceCr: "",
      };
      const firstTemplateIdx = rows.findIndex((r) => r.key.startsWith(`nb-${pid}-`));
      const insertAt = firstTemplateIdx === -1 ? rows.length : firstTemplateIdx;
      const next = [...rows.slice(0, insertAt), newRow, ...rows.slice(insertAt)];
      return ensureTrailingBlankRows(next, pid, blankSeqRef);
    });
  }, [first.propertyId, unlocked]);

  return (
    <article
      className="overflow-hidden rounded-2xl border border-black bg-white shadow-sm"
      aria-labelledby={`plc-project-${first.propertyId}`}
    >
      {/* Project strip — cool slate band (contrasts with white table + gold Save CTA) */}
      <div className="border-b border-black/25 bg-gradient-to-b from-[#D8E4EE] to-[#C5D5E3] px-4 py-3 sm:px-5 sm:py-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
          <div className="flex min-w-0 flex-1 items-start gap-3 sm:gap-4">
            <div className="flex shrink-0 items-center gap-3 sm:gap-4">
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-black bg-white/95 font-poppins text-sm font-bold tabular-nums text-slate-800 shadow-sm"
                aria-label={`Serial ${serialLabel}`}
              >
                {serialLabel}
              </div>
              <Link
                href={href}
                className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-black bg-slate-100/90 shadow-sm"
                aria-label={`View ${first.projectName}`}
              >
                {hasImage ? (
                  <Image
                    src={first.heroImage}
                    alt={first.heroImageAlt || first.projectName}
                    fill
                    sizes="56px"
                    className="object-cover"
                    loading="lazy"
                    quality={70}
                  />
                ) : (
                  <span className="flex h-full w-full items-center justify-center bg-slate-200/90 px-1 text-center font-poppins text-[0.6rem] font-medium text-slate-600">
                    No image
                  </span>
                )}
              </Link>
            </div>
            <div className="min-w-0 flex-1 space-y-2.5">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:gap-5">
                <div className="flex min-h-14 min-w-0 flex-1 items-center">
                  <h2
                    id={`plc-project-${first.propertyId}`}
                    className="font-poppins text-lg font-semibold leading-snug tracking-tight text-slate-900 sm:text-xl"
                  >
                    <Link
                      href={href}
                      className="hover:text-slate-700 hover:underline [overflow-wrap:anywhere]"
                    >
                      {first.projectName}
                    </Link>
                  </h2>
                </div>
                <div className="grid w-full shrink-0 grid-cols-2 gap-3 sm:max-w-sm lg:w-[min(100%,20rem)] lg:max-w-none">
                  <div className="min-w-0">
                    <label htmlFor={`plc-towers-${first.propertyId}`} className={headerFieldLabelClass}>
                      Towers
                    </label>
                    <input
                      id={`plc-towers-${first.propertyId}`}
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      value={headerTowers}
                      onChange={(e) => setHeaderTowers(sanitizeInventoryDigitsInput(e.target.value))}
                      disabled={!unlocked}
                      placeholder="—"
                      title="Digits only"
                      className={`${inputClass} mt-1 tabular-nums`}
                      autoComplete="off"
                    />
                  </div>
                  <div className="min-w-0">
                    <label htmlFor={`plc-poss-${first.propertyId}`} className={headerFieldLabelClass}>
                      Possession
                    </label>
                    <input
                      id={`plc-poss-${first.propertyId}`}
                      type="text"
                      value={headerPossession}
                      onChange={(e) => setHeaderPossession(e.target.value.slice(0, 200))}
                      disabled={!unlocked}
                      placeholder="e.g. Dec 2027"
                      className={`${inputClass} mt-1`}
                      autoComplete="off"
                    />
                  </div>
                </div>
              </div>
              <p className="font-poppins text-xs leading-relaxed text-slate-600 sm:text-[0.8125rem] [overflow-wrap:anywhere]">
                {first.locationLabel}
              </p>
            </div>
          </div>
          <div className="flex w-full shrink-0 flex-col gap-2 sm:w-[11.5rem] sm:shrink-0">
            <button
              type="button"
              onClick={handleAddConfiguration}
              disabled={!unlocked}
              title={unlocked ? "Add another configuration line" : "Unlock to edit"}
              className={`${cardActionBtnClass} bg-white hover:bg-neutral-50`}
            >
              <Plus className="h-3.5 w-3.5 shrink-0" aria-hidden />
              Add configuration
            </button>
            <button
              type="button"
              onClick={handleSaveAll}
              disabled={saving || !unlocked}
              title={unlocked ? "Save this project" : "Unlock to edit"}
              className={`${cardActionBtnClass} bg-neutral-100 font-semibold hover:bg-neutral-200/90`}
            >
              {saving ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden />
              ) : (
                <Pencil className="h-3.5 w-3.5" aria-hidden />
              )}
              Save
            </button>
            {saveError ? (
              <p className="font-poppins text-[0.65rem] leading-tight text-destructive">{saveError}</p>
            ) : null}
          </div>
        </div>
      </div>

      {/* Configuration grid */}
      <div className="px-0">
        <div className="border-b border-black/20 bg-muted/30 px-4 py-2 sm:px-5">
          <p className="font-poppins text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            Configurations
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[36rem] table-fixed border-collapse text-left sm:min-w-[40rem]">
            <colgroup>
              <col className="w-[26%] sm:w-[28%]" />
              <col className="w-[18%] sm:w-[18%]" />
              <col className="w-[22%] sm:w-[22%]" />
              <col className="w-[3.5rem] sm:w-20" />
            </colgroup>
            <thead>
              <tr className="border-b border-black/20 bg-white">
                <th className="px-4 py-2.5 font-poppins text-[0.65rem] font-semibold uppercase tracking-wide text-muted-foreground sm:px-5">
                  Configuration
                </th>
                <th className="px-4 py-2.5 font-poppins text-[0.65rem] font-semibold uppercase tracking-wide text-muted-foreground sm:px-5">
                  Size (sq ft)
                </th>
                <th className="px-4 py-2.5 font-poppins text-[0.65rem] font-semibold uppercase tracking-wide text-muted-foreground sm:px-5">
                  Price (₹)
                </th>
                <th className="px-2 py-2.5 text-center font-poppins text-[0.65rem] font-semibold uppercase tracking-wide text-muted-foreground sm:px-3">
                  <span className="sr-only">Delete configuration</span>
                  <Trash2 className="mx-auto h-3.5 w-3.5 text-muted-foreground opacity-80" aria-hidden />
                </th>
              </tr>
            </thead>
            <tbody>
              {draftRows.map((row, idx) => (
                <tr
                  key={row.key}
                  className={
                    idx % 2 === 0
                      ? "border-b border-black/15 bg-white"
                      : "border-b border-black/15 bg-[#FAFAF8]/70"
                  }
                >
                  <td className="px-4 py-2 align-middle sm:px-5">
                    <label className="sr-only" htmlFor={`plc-cfg-${row.key}`}>
                      Configuration
                    </label>
                    <input
                      id={`plc-cfg-${row.key}`}
                      type="text"
                      value={row.configuration}
                      onChange={(e) => updateDraft(row.key, "configuration", e.target.value)}
                      disabled={!unlocked}
                      placeholder="Configuration"
                      className={inputClass}
                      autoComplete="off"
                    />
                  </td>
                  <td className="px-4 py-2 align-middle sm:px-5">
                    <label className="sr-only" htmlFor={`plc-sz-${row.key}`}>
                      Size sq ft
                    </label>
                    <input
                      id={`plc-sz-${row.key}`}
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      value={row.sizeSqft}
                      onChange={(e) => updateDraft(row.key, "sizeSqft", e.target.value)}
                      disabled={!unlocked}
                      placeholder="Digits only"
                      title="Numbers only"
                      className={`${inputClass} tabular-nums`}
                      autoComplete="off"
                    />
                  </td>
                  <td className="px-4 py-2 align-middle sm:px-5">
                    <label className="sr-only" htmlFor={`plc-pr-${row.key}`}>
                      Price (crore figure; shown below in ₹)
                    </label>
                    <div className="space-y-1">
                      <input
                        id={`plc-pr-${row.key}`}
                        type="text"
                        value={row.priceCr}
                        onChange={(e) => updateDraft(row.key, "priceCr", e.target.value)}
                        disabled={!unlocked}
                        placeholder="e.g. 1.05"
                        title="Crore amount (e.g. 1.05 = ₹ 1,05,00,000)"
                        className={inputClass}
                        autoComplete="off"
                      />
                      {row.priceCr.trim() && hasCroreNumberToken(row.priceCr) ? (
                        <p className="font-poppins text-[0.65rem] leading-tight text-muted-foreground tabular-nums">
                          {formatInventoryPriceCrDisplay(row.priceCr)}
                        </p>
                      ) : null}
                    </div>
                  </td>
                  <td className="px-2 py-2 align-middle text-center sm:px-3">
                    <button
                      type="button"
                      onClick={() => openDeleteConfirm(row)}
                      disabled={!unlocked || saving || deleteLoading}
                      title={unlocked ? "Delete this configuration" : "Unlock to edit"}
                      className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-black/80 bg-white text-destructive transition hover:bg-destructive/5 disabled:cursor-not-allowed disabled:opacity-40 sm:h-9 sm:w-9"
                      aria-label={`Delete configuration: ${row.configuration || "line"}`}
                    >
                      <Trash2 className="h-4 w-4 shrink-0" aria-hidden />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {typeof document !== "undefined" && deleteModal
        ? createPortal(
            <div className="fixed inset-0 z-[200] flex flex-col justify-end sm:items-center sm:justify-center sm:p-3 md:p-4">
              <button
                type="button"
                className="absolute inset-0 z-0 bg-black/60 backdrop-blur-[1px] transition-opacity"
                aria-label="Dismiss dialog"
                onClick={closeDeleteModal}
                disabled={deleteLoading}
              />
              <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="plc-delete-title"
                className="relative z-[1] flex max-h-[min(92dvh,100%)] w-full max-w-lg flex-col overflow-hidden rounded-t-2xl border border-black bg-white shadow-2xl sm:max-h-[min(88dvh,36rem)] sm:rounded-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="max-h-[inherit] overflow-y-auto overscroll-contain px-4 pb-5 pt-5 sm:px-6 sm:pb-6 sm:pt-6">
                  <h3
                    id="plc-delete-title"
                    className="font-poppins text-lg font-semibold leading-snug text-foreground sm:text-xl"
                  >
                    Delete configuration?
                  </h3>
                  <p className="mt-2 font-poppins text-sm leading-relaxed text-muted-foreground sm:text-[0.9375rem]">
                    {deleteModal.mode === "api" ? (
                      <>
                        This removes the line for{" "}
                        <span className="font-medium text-foreground [overflow-wrap:anywhere]">
                          {deleteModal.summary}
                        </span>
                        . If it is the only line for this project, it will be cleared instead so the project stays in
                        the list.
                      </>
                    ) : (
                      <>
                        Remove the unsaved row{" "}
                        <span className="font-medium text-foreground [overflow-wrap:anywhere]">
                          {deleteModal.summary}
                        </span>{" "}
                        from this card. Nothing is saved until you press Save.
                      </>
                    )}
                  </p>
                  {deleteError ? (
                    <p
                      role="alert"
                      className="mt-3 rounded-md border border-destructive/40 bg-destructive/5 px-3 py-2 font-poppins text-sm text-destructive"
                    >
                      {deleteError}
                    </p>
                  ) : null}
                  <div className="mt-6 flex flex-col-reverse gap-2 sm:mt-8 sm:flex-row sm:justify-end sm:gap-3">
                    <button
                      ref={cancelDeleteBtnRef}
                      type="button"
                      onClick={closeDeleteModal}
                      disabled={deleteLoading}
                      className="inline-flex h-11 min-h-[2.75rem] w-full shrink-0 items-center justify-center rounded-md border border-black bg-white px-4 font-poppins text-sm font-medium text-foreground transition hover:bg-neutral-50 disabled:opacity-50 sm:h-10 sm:w-auto sm:min-w-[6.5rem]"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => void confirmDelete()}
                      disabled={deleteLoading}
                      className="inline-flex h-11 min-h-[2.75rem] w-full shrink-0 items-center justify-center rounded-md border border-destructive bg-destructive px-4 font-poppins text-sm font-semibold text-destructive-foreground shadow-sm transition hover:bg-destructive/90 disabled:opacity-50 sm:h-10 sm:w-auto sm:min-w-[7.5rem]"
                    >
                      {deleteLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 shrink-0 animate-spin" aria-hidden />
                          Deleting…
                        </>
                      ) : (
                        "Delete"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>,
            document.body
          )
        : null}
    </article>
  );
}

const PropertyCard = memo(PropertyInventoryCard);

export function PropertyListingTable({ items, editKey, onInventoryReload }: PropertyListingTableProps) {
  const groups = useMemo(() => groupContiguousByPropertyId(items), [items]);

  return (
    <div className="flex flex-col gap-10 sm:gap-12">
      {groups.map((group) => (
        <PropertyCard
          key={group[0]!.propertyId}
          lines={group}
          editKey={editKey}
          onInventoryReload={onInventoryReload}
        />
      ))}
    </div>
  );
}
