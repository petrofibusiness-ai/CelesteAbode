/** Location slugs available on the pre-launch properties page. */
export const PRE_LAUNCH_LOCATION_SLUGS = [
  "noida",
  "greater-noida",
  "yamuna-expressway",
  "ghaziabad",
] as const;

export type PreLaunchLocationSlug = (typeof PRE_LAUNCH_LOCATION_SLUGS)[number];

export const PRE_LAUNCH_LOCATION_OPTIONS: Array<{ value: PreLaunchLocationSlug; label: string }> = [
  { value: "noida", label: "Noida" },
  { value: "greater-noida", label: "Greater Noida" },
  { value: "yamuna-expressway", label: "Yamuna Expressway" },
  { value: "ghaziabad", label: "Ghaziabad" },
];

export function isPreLaunchLocationSlug(slug: string): slug is PreLaunchLocationSlug {
  return (PRE_LAUNCH_LOCATION_SLUGS as readonly string[]).includes(slug);
}
