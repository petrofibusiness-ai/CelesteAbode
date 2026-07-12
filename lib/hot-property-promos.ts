export type HotPropertyPromoAction =
  | { type: "link"; href: string }
  | { type: "consultation" }
  | { type: "contact" };

export type HotPropertyPromo = {
  /** Badge label on the left (e.g. Spotlight, New) */
  badgeLabel: string;
  /** Single line shown in the marquee ticker */
  marqueeText: string;
  ctaLabel: string;
  action: HotPropertyPromoAction;
};

/** Site-wide property ticker (edit copy & link here) */
export const HOT_PROPERTY_PROMO: HotPropertyPromo = {
  badgeLabel: "Spotlight",
  marqueeText:
    "Forest Walk Villas | Nature-Inspired Township in Ghaziabad · Exclusive Early Access Available · Premium Villa Living Experience",
  ctaLabel: "Explore now",
  action: { type: "link", href: "/properties-in-ghaziabad/forest-walk-villa" },
};

/** Pathname of the Mayfair property page (banner override applies here only) */
export const MAYFAIR_PROPERTY_PATH = "/properties-in-greater-noida/kviraaj-mayfair-residency";

/** Banner shown only while browsing the Mayfair page */
export const MAYFAIR_PAGE_PROMO: HotPropertyPromo = {
  badgeLabel: "Offer",
  marqueeText:
    "Kviraaj Mayfair Residency · Move in with just 20% down · Pay the remaining 80% only on possession",
  ctaLabel: "Claim offer",
  action: { type: "consultation" },
};

export function getHotPropertyPromoForPath(pathname: string | null): HotPropertyPromo {
  if (pathname === MAYFAIR_PROPERTY_PATH) {
    return MAYFAIR_PAGE_PROMO;
  }
  return HOT_PROPERTY_PROMO;
}
