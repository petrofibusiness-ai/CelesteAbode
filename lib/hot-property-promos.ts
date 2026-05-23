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
