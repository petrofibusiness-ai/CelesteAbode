import type { PropertyListingItem } from "@/types/property-listing";

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
