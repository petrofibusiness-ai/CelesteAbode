import type { PropertyListingItem } from "@/types/property-listing";

/** Compact rupee label for sliders and filters (Indian numbering). */
export function formatRupeeCompact(n: number): string {
  if (!Number.isFinite(n) || n < 0) return "—";
  if (n >= 1e7) {
    const cr = n / 1e7;
    const s = cr >= 10 ? cr.toFixed(0) : cr.toFixed(1).replace(/\.0$/, "");
    return `₹${s} Cr`;
  }
  if (n >= 1e5) {
    const l = n / 1e5;
    const s = l >= 10 ? l.toFixed(0) : l.toFixed(1).replace(/\.0$/, "");
    return `₹${s} L`;
  }
  if (n >= 1e3) return `₹${(n / 1e3).toFixed(0)}k`;
  return `₹${n.toLocaleString("en-IN")}`;
}

export function formatListingPriceDisplay(item: PropertyListingItem): string {
  const unit = item.priceUnit?.trim();
  if (unit) return unit;
  const fmt = (n: number) => n.toLocaleString("en-IN");
  if (item.priceMin != null && item.priceMax != null) {
    return `₹${fmt(item.priceMin)} – ₹${fmt(item.priceMax)}`;
  }
  if (item.priceMin != null) return `From ₹${fmt(item.priceMin)}`;
  if (item.priceMax != null) return `Up to ₹${fmt(item.priceMax)}`;
  return "Price on request";
}
