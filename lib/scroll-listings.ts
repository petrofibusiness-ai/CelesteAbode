/** Same id on `/properties` and `properties-in/*` so pagination can scroll to the search/filters block. */
export const PROPERTY_SEARCH_ANCHOR_ID = "property-search-anchor";

/**
 * Scroll a listings anchor into view after React has painted.
 * Put `scroll-mt-*` on the anchor so a fixed header doesn’t cover the first row.
 */
export function scrollListingsAnchorIntoView(el: HTMLElement | null) {
  if (typeof window === "undefined" || !el) return;
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

/** Scroll to the property search / filters section (used after pagination page change). */
export function scrollPropertySearchSectionIntoView() {
  if (typeof document === "undefined") return;
  const el = document.getElementById(PROPERTY_SEARCH_ANCHOR_ID);
  scrollListingsAnchorIntoView(el);
}
