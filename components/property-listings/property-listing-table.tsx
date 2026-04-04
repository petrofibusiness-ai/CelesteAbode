"use client";

import { memo, useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Loader2, MapPin, Pencil } from "lucide-react";
import type { PropertyListingItem } from "@/types/property-listing";
import { getPropertyUrl } from "@/lib/property-url";

export interface PropertyListingTableProps {
  items: PropertyListingItem[];
  editKey: string | null;
  onItemUpdate: (id: string, patch: Partial<PropertyListingItem>) => void;
}

const AMENITY_VISIBLE = 8;

function PropertyListingTableRow({
  item,
  editKey,
  onItemUpdate,
}: {
  item: PropertyListingItem;
  editKey: string | null;
  onItemUpdate: (id: string, patch: Partial<PropertyListingItem>) => void;
}) {
  const href = getPropertyUrl({
    slug: item.slug,
    locationSlug: item.locationSlug || undefined,
  });
  const hasImage = Boolean(item.heroImage?.trim());

  const [minStr, setMinStr] = useState(() =>
    item.priceMin != null ? String(item.priceMin) : ""
  );
  const [maxStr, setMaxStr] = useState(() =>
    item.priceMax != null ? String(item.priceMax) : ""
  );
  const [unitStr, setUnitStr] = useState(() => item.priceUnit ?? "");
  const [sizesStr, setSizesStr] = useState(() => item.sizes ?? "");
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  useEffect(() => {
    setMinStr(item.priceMin != null ? String(item.priceMin) : "");
    setMaxStr(item.priceMax != null ? String(item.priceMax) : "");
    setUnitStr(item.priceUnit ?? "");
    setSizesStr(item.sizes ?? "");
    setSaveError(null);
  }, [item.id, item.priceMin, item.priceMax, item.priceUnit, item.sizes]);

  const handleSave = useCallback(async () => {
    setSaving(true);
    setSaveError(null);
    const priceMin =
      minStr.trim() === "" ? null : Number(minStr.replace(/,/g, ""));
    const priceMax =
      maxStr.trim() === "" ? null : Number(maxStr.replace(/,/g, ""));
    if (priceMin !== null && Number.isNaN(priceMin)) {
      setSaveError("Invalid min price");
      setSaving(false);
      return;
    }
    if (priceMax !== null && Number.isNaN(priceMax)) {
      setSaveError("Invalid max price");
      setSaving(false);
      return;
    }
    try {
      const res = await fetch(`/api/property-listings/${item.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "X-Ca-Property-Listings-Edit-Key": editKey ?? "",
        },
        body: JSON.stringify({
          priceMin,
          priceMax,
          priceUnit: unitStr.trim() || null,
          sizes: sizesStr,
        }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(typeof body.error === "string" ? body.error : "Save failed");
      }
      onItemUpdate(item.id, {
        priceMin,
        priceMax,
        priceUnit: unitStr.trim() || undefined,
        sizes: sizesStr,
      });
    } catch (e) {
      setSaveError(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }, [editKey, item.id, minStr, maxStr, unitStr, sizesStr, onItemUpdate]);

  const amenities = item.amenities ?? [];
  const extraAmenities = Math.max(0, amenities.length - AMENITY_VISIBLE);

  return (
    <tr className="border-b border-border/60 align-top transition-colors hover:bg-[#FAFAF8]/80">
      <td className="w-[4.5rem] min-w-[4.5rem] p-3">
        <Link
          href={href}
          className="relative block h-14 w-14 overflow-hidden rounded-xl border border-border/50 bg-muted shadow-sm"
          aria-label={`View ${item.projectName}`}
        >
          {hasImage ? (
            <Image
              src={item.heroImage}
              alt={item.heroImageAlt || item.projectName}
              fill
              sizes="56px"
              className="object-cover"
              loading="lazy"
              quality={70}
            />
          ) : (
            <span className="flex h-full w-full items-center justify-center bg-gradient-to-br from-muted via-muted/80 to-[#CBB27A]/10 px-1 text-center font-poppins text-[0.6rem] font-medium leading-tight text-muted-foreground">
              No image
            </span>
          )}
        </Link>
      </td>
      <td className="min-w-[10rem] max-w-[14rem] p-3">
        <Link
          href={href}
          className="font-poppins text-sm font-semibold text-foreground underline-offset-2 hover:text-[#8a7344] hover:underline [overflow-wrap:anywhere]"
        >
          {item.projectName}
        </Link>
        {item.propertyType?.trim() ? (
          <p className="mt-1 font-poppins text-xs text-muted-foreground [overflow-wrap:anywhere]">
            {item.propertyType}
          </p>
        ) : null}
      </td>
      <td className="min-w-[9rem] max-w-[12rem] p-3">
        <div className="flex items-start gap-1.5 text-muted-foreground">
          <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#CBB27A]" aria-hidden />
          <span className="font-poppins text-xs leading-relaxed text-foreground/85 [overflow-wrap:anywhere]">
            {item.locationLabel}
          </span>
        </div>
      </td>
      <td className="min-w-[11rem] p-3">
        <div className="flex flex-col gap-2">
          <div className="grid grid-cols-2 gap-1.5">
            <input
              type="text"
              inputMode="decimal"
              value={minStr}
              onChange={(e) => setMinStr(e.target.value)}
              placeholder="Min ₹"
              title="Minimum price (rupees)"
              className="min-h-9 w-full rounded-lg border border-border bg-white px-2 py-1.5 font-poppins text-xs text-foreground outline-none focus:border-[#CBB27A] focus:ring-2 focus:ring-[#CBB27A]/20"
              autoComplete="off"
            />
            <input
              type="text"
              inputMode="decimal"
              value={maxStr}
              onChange={(e) => setMaxStr(e.target.value)}
              placeholder="Max ₹"
              title="Maximum price (rupees)"
              className="min-h-9 w-full rounded-lg border border-border bg-white px-2 py-1.5 font-poppins text-xs text-foreground outline-none focus:border-[#CBB27A] focus:ring-2 focus:ring-[#CBB27A]/20"
              autoComplete="off"
            />
          </div>
          <input
            type="text"
            value={unitStr}
            onChange={(e) => setUnitStr(e.target.value)}
            placeholder="Display line (optional)"
            className="min-h-9 w-full rounded-lg border border-border bg-white px-2 py-1.5 font-poppins text-xs text-foreground outline-none focus:border-[#CBB27A] focus:ring-2 focus:ring-[#CBB27A]/20"
            autoComplete="off"
          />
        </div>
      </td>
      <td className="min-w-[10rem] max-w-[16rem] p-3">
        <textarea
          value={sizesStr}
          onChange={(e) => setSizesStr(e.target.value)}
          rows={3}
          className="w-full min-w-[8rem] resize-y rounded-lg border border-border bg-white px-2 py-1.5 font-poppins text-xs text-foreground outline-none focus:border-[#CBB27A] focus:ring-2 focus:ring-[#CBB27A]/20"
        />
      </td>
      <td className="min-w-[12rem] max-w-[22rem] p-3">
        {amenities.length > 0 ? (
          <div className="flex flex-wrap gap-1">
            {amenities.slice(0, AMENITY_VISIBLE).map((a) => (
              <span
                key={a}
                className="inline-flex max-w-full rounded-md border border-[#CBB27A]/25 bg-[#CBB27A]/8 px-2 py-0.5 font-poppins text-[0.65rem] font-medium leading-snug text-foreground/90 [overflow-wrap:anywhere]"
              >
                {a}
              </span>
            ))}
            {extraAmenities > 0 ? (
              <span className="inline-flex items-center rounded-md border border-border/60 bg-muted/50 px-2 py-0.5 font-poppins text-[0.65rem] text-muted-foreground">
                +{extraAmenities} more
              </span>
            ) : null}
          </div>
        ) : (
          <span className="font-poppins text-xs text-muted-foreground">—</span>
        )}
      </td>
      <td className="w-[7rem] min-w-[7rem] p-3">
        <div className="flex flex-col gap-2">
          <Link
            href={href}
            className="inline-flex items-center gap-1 font-poppins text-xs font-semibold text-[#8a7344] underline-offset-2 hover:underline"
          >
            Open
            <ExternalLink className="h-3 w-3 shrink-0 opacity-80" aria-hidden />
          </Link>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            title="Save this row’s price and sizes"
            className="inline-flex min-h-9 w-full items-center justify-center gap-1 rounded-lg border border-[#CBB27A] bg-[#CBB27A]/10 px-2 font-poppins text-xs font-semibold text-foreground transition hover:bg-[#CBB27A]/20 disabled:cursor-not-allowed disabled:opacity-50"
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
      </td>
    </tr>
  );
}

const Row = memo(PropertyListingTableRow);

export function PropertyListingTable({
  items,
  editKey,
  onItemUpdate,
}: PropertyListingTableProps) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-border/60 bg-white shadow-sm">
      <table className="w-full min-w-[56rem] border-collapse text-left">
        <thead>
          <tr className="border-b border-border/80 bg-[#FAFAF8]/90">
            <th className="p-3 font-poppins text-[0.65rem] font-semibold uppercase tracking-wide text-muted-foreground">
              Image
            </th>
            <th className="p-3 font-poppins text-[0.65rem] font-semibold uppercase tracking-wide text-muted-foreground">
              Project
            </th>
            <th className="p-3 font-poppins text-[0.65rem] font-semibold uppercase tracking-wide text-muted-foreground">
              Location
            </th>
            <th className="p-3 font-poppins text-[0.65rem] font-semibold uppercase tracking-wide text-muted-foreground">
              Price
            </th>
            <th className="p-3 font-poppins text-[0.65rem] font-semibold uppercase tracking-wide text-muted-foreground">
              Sizes
            </th>
            <th className="p-3 font-poppins text-[0.65rem] font-semibold uppercase tracking-wide text-muted-foreground">
              Amenities
            </th>
            <th className="p-3 font-poppins text-[0.65rem] font-semibold uppercase tracking-wide text-muted-foreground">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <Row
              key={item.id}
              item={item}
              editKey={editKey}
              onItemUpdate={onItemUpdate}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
