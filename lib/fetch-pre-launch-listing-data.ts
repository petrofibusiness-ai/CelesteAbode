import { getPublishedPreLaunchStaticProperties } from "@/lib/featured-static-properties";

/** Pre-launch catalog only — dedicated static pages, not DB new-launch listings. */
export async function fetchPreLaunchListingData(options: { limit?: number } = {}) {
  const { limit = 6 } = options;
  const properties = getPublishedPreLaunchStaticProperties();

  return {
    properties: properties.slice(0, limit),
    totalCount: properties.length,
  };
}
