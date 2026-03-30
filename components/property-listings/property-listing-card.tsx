"use client";

import { memo, useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Loader2, MapPin, Pencil } from "lucide-react";
import type { PropertyListingItem } from "@/types/property-listing";
import { getPropertyUrl } from "@/lib/property-url";
import { formatListingPriceDisplay } from "@/lib/property-listing-format";

export interface PropertyListingCardProps {
  item: PropertyListingItem;
  editKey: string | null;
  editModeAvailable: boolean;
  onItemUpdate: (id: string, patch: Partial<PropertyListingItem>) => void;
}

function PropertyListingCardInner({
  item,
  editKey,
  editModeAvailable,
  onItemUpdate,
}: PropertyListingCardProps) {
  const href = getPropertyUrl({
    slug: item.slug,
    locationSlug: item.locationSlug || undefined,
  });
  const priceDisplay = formatListingPriceDisplay(item);
  const canEdit = Boolean(editModeAvailable && editKey);

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
  }, [
    item.id,
    item.priceMin,
    item.priceMax,
    item.priceUnit,
    item.sizes,
  ]);

  const handleSave = useCallback(async () => {
    if (!editKey || !canEdit) return;
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
          "X-Ca-Property-Listings-Edit-Key": editKey,
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
  }, [
    editKey,
    canEdit,
    item.id,
    minStr,
    maxStr,
    unitStr,
    sizesStr,
    onItemUpdate,
  ]);

  return (
    <article className="group flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-border/60 bg-white shadow-sm transition hover:border-[#CBB27A]/40 hover:shadow-md">
      <Link
        href={href}
        className="relative block aspect-[16/10] w-full min-h-0 overflow-hidden bg-muted"
        aria-label={`View ${item.projectName}`}
      >
        {item.heroImage ? (
          <Image
            src={item.heroImage}
            alt={item.heroImageAlt || item.projectName}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1536px) 33vw, 25vw"
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
            loading="lazy"
            quality={75}
          />
        ) : (
          <div className="flex h-full w-full min-h-[8rem] items-center justify-center bg-gradient-to-br from-muted to-muted/60 px-4 text-center font-poppins text-sm text-muted-foreground">
            Image coming soon
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 transition group-hover:opacity-90" />
        <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
          <p className="font-poppins text-[clamp(0.9rem,2.8vw,1.125rem)] font-semibold leading-snug text-white drop-shadow [overflow-wrap:anywhere]">
            {item.projectName}
          </p>
        </div>
      </Link>

      <div className="flex min-h-0 flex-1 flex-col gap-3 p-4 sm:p-5">
        <div className="flex items-start gap-2 text-muted-foreground">
          <MapPin
            className="mt-0.5 h-4 w-4 shrink-0 text-[#CBB27A]"
            aria-hidden
          />
          <p className="min-w-0 font-poppins text-sm leading-relaxed text-foreground/80 [overflow-wrap:anywhere]">
            {item.locationLabel}
          </p>
        </div>

        <div className="space-y-1">
          <p className="font-poppins text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Price
          </p>
          {canEdit ? (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <label className="block font-poppins text-xs text-muted-foreground">
                Min (₹)
                <input
                  type="text"
                  inputMode="decimal"
                  value={minStr}
                  onChange={(e) => setMinStr(e.target.value)}
                  className="mt-1 min-h-11 w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-foreground outline-none focus:border-[#CBB27A] focus:ring-2 focus:ring-[#CBB27A]/20"
                  autoComplete="off"
                />
              </label>
              <label className="block font-poppins text-xs text-muted-foreground">
                Max (₹)
                <input
                  type="text"
                  inputMode="decimal"
                  value={maxStr}
                  onChange={(e) => setMaxStr(e.target.value)}
                  className="mt-1 min-h-11 w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-foreground outline-none focus:border-[#CBB27A] focus:ring-2 focus:ring-[#CBB27A]/20"
                  autoComplete="off"
                />
              </label>
              <label className="block font-poppins text-xs text-muted-foreground sm:col-span-2">
                Display line (optional)
                <input
                  type="text"
                  value={unitStr}
                  onChange={(e) => setUnitStr(e.target.value)}
                  placeholder="e.g. ₹25 Lakh – ₹50 Lakh"
                  className="mt-1 min-h-11 w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-foreground outline-none focus:border-[#CBB27A] focus:ring-2 focus:ring-[#CBB27A]/20"
                  autoComplete="off"
                />
              </label>
            </div>
          ) : (
            <p className="font-poppins text-base font-semibold leading-snug text-foreground [overflow-wrap:anywhere]">
              {priceDisplay}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <p className="font-poppins text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Sizes
          </p>
          {canEdit ? (
            <textarea
              value={sizesStr}
              onChange={(e) => setSizesStr(e.target.value)}
              rows={3}
              className="w-full min-h-[5.5rem] resize-y rounded-lg border border-border bg-white px-3 py-2 font-poppins text-sm text-foreground outline-none focus:border-[#CBB27A] focus:ring-2 focus:ring-[#CBB27A]/20"
            />
          ) : (
            <p className="font-poppins text-sm leading-relaxed text-foreground/90 [overflow-wrap:anywhere]">
              {item.sizes?.trim() ? item.sizes : "—"}
            </p>
          )}
        </div>

        {canEdit && (
          <div className="mt-1 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            {saveError && (
              <p className="font-poppins text-xs text-destructive">{saveError}</p>
            )}
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="inline-flex min-h-11 min-w-[8rem] items-center justify-center gap-2 rounded-xl border border-[#CBB27A] bg-[#CBB27A]/10 px-4 font-poppins text-sm font-semibold text-foreground transition hover:bg-[#CBB27A]/20 disabled:opacity-50"
            >
              {saving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                  Saving…
                </>
              ) : (
                <>
                  <Pencil className="h-4 w-4" aria-hidden />
                  Save changes
                </>
              )}
            </button>
          </div>
        )}

        {item.highlights.length > 0 && (
          <ul className="mt-auto space-y-1.5 border-t border-border/50 pt-3 text-sm text-muted-foreground">
            {item.highlights.map((line) => (
              <li key={line} className="flex gap-2 font-poppins leading-snug">
                <span
                  className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#CBB27A]"
                  aria-hidden
                />
                <span className="[overflow-wrap:anywhere]">{line}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}

export const PropertyListingCard = memo(PropertyListingCardInner);
