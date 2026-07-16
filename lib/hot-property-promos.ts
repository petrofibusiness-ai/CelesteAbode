/** Continuous announcement lines for the sitewide ticker (edit copy here). */
export const HOT_PROPERTY_ANNOUNCEMENTS = [
  "Forest Walk Villas · Nature-Inspired Township in Ghaziabad · Exclusive Early Access Available · Premium Villa Living Experience",
  "Kviraaj Mayfair Residency · Move in with just 20% down · Pay the remaining 80% only on possession",
  "Irish ETA-1 Greater Noida · Pre-launch from ₹8,500/sq ft* · EOI 25% · 25:25:25:25 plan",
  "Ace Sector 150 Noida · Pre-launch ultra-luxury 3, 4 & 4.5 BHK · EOI open for early allotment",
  "Karyan NH-24 Ghaziabad · Pre-launch from ₹6,400/sq ft* · EOI ₹5 Lakh · 25×4 payment plan",
  "Fusion Vasundhara · Pre-launch premium apartments in Sector 7, Vasundhara · Early pricing available",
] as const;

export type HotPropertyProjectLink = {
  label: string;
  href: string;
  location?: string;
};

/** Dropdown destinations from the banner CTA */
export const HOT_PROPERTY_PROJECT_LINKS: HotPropertyProjectLink[] = [
  {
    label: "Forest Walk Villas",
    href: "/properties-in-ghaziabad/forest-walk-villa",
    location: "Ghaziabad",
  },
  {
    label: "Kviraaj Mayfair Residency",
    href: "/properties-in-greater-noida/kviraaj-mayfair-residency",
    location: "Greater Noida",
  },
  {
    label: "Irish ETA-1 Greater Noida",
    href: "/properties-in-greater-noida/irish-eta-1-greater-noida",
    location: "Greater Noida",
  },
  {
    label: "Ace Sector 150 Noida",
    href: "/properties-in-noida/ace-sector-150-noida",
    location: "Noida",
  },
  {
    label: "Karyan NH-24 Ghaziabad",
    href: "/properties-in-ghaziabad/karyan-nh24-ghaziabad",
    location: "Ghaziabad",
  },
  {
    label: "Fusion Vasundhara",
    href: "/properties-in-ghaziabad/fusion-vasundhara",
    location: "Ghaziabad",
  },
  {
    label: "All Pre-Launch Properties",
    href: "/pre-launch-properties",
    location: "NCR",
  },
];

export const HOT_PROPERTY_BADGE_LABEL = "Spotlight";
export const HOT_PROPERTY_CTA_LABEL = "Explore projects";
