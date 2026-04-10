"use client";

import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Loader2, Pencil, Plus } from "lucide-react";
import type { PropertyInventoryRow } from "@/types/property-listing";
import { CONFIGURATIONS } from "@/lib/property-enums";
import { propertyListingsEditFetchHeaders } from "@/lib/property-listings-edit-headers";
import { sanitizeInventoryDigitsInput } from "@/lib/property-listings-price";
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
    return a.id.localeCompare(b.id);
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
          id: l.id,
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

  useEffect(() => {
    setHeaderTowers(sanitizeInventoryDigitsInput(first.inventoryTowers ?? ""));
    setHeaderPossession((first.possessionDate ?? "").slice(0, 200));
  }, [first.propertyId, first.inventoryTowers, first.possessionDate]);

  useEffect(() => {
    const base: DraftRow[] = sorted.map((l, i) => ({
      key: l.id,
      id: l.id,
      sizeSqft: sanitizeInventoryDigitsInput(l.sizeSqft ?? ""),
      configuration: (l.configuration ?? "").trim() || presetConfiguration(i),
      priceCr: sanitizeInventoryDigitsInput(l.priceCr ?? ""),
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
        field === "priceCr" || field === "sizeSqft" ? sanitizeInventoryDigitsInput(value) : value;
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
          <table className="w-full min-w-[32rem] table-fixed border-collapse text-left">
            <colgroup>
              <col className="w-[34%] sm:w-[32%]" />
              <col className="w-[26%] sm:w-[24%]" />
              <col className="w-[24%] sm:w-[22%]" />
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
                  Price (Cr)
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
                      Price
                    </label>
                    <input
                      id={`plc-pr-${row.key}`}
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      value={row.priceCr}
                      onChange={(e) => updateDraft(row.key, "priceCr", e.target.value)}
                      disabled={!unlocked}
                      placeholder="Digits only"
                      title="Numbers only"
                      className={`${inputClass} tabular-nums`}
                      autoComplete="off"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
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
