import { isValidConfiguration } from "@/lib/property-enums";
import { getPublishedPreLaunchStaticProperties } from "@/lib/featured-static-properties";
import {
  propertyMatchesListingTypeFilter,
  type LocationListingPropertyTypeFilter,
} from "@/lib/fetch-location-listing-data";
import { isPreLaunchLocationSlug } from "@/lib/pre-launch-locations";
import type { Property } from "@/types/property";

export interface PreLaunchSearchFilters {
  locations: string[];
  propertyType: string;
  configuration: string[];
}

function mapConfigurationFilter(filterValue: string): string | null {
  const mapping: Record<string, string> = {
    "2bhk": "2 BHK",
    "2bhk-study": "2 BHK + Study",
    "3bhk": "3 BHK",
    "3bhk-study": "3 BHK + Study",
    "4bhk": "4 BHK",
    "5bhk": "5 BHK",
  };
  return mapping[filterValue] || null;
}

function staticMatchesConfiguration(
  property: Property,
  configurationFilters: string[]
): boolean {
  if (configurationFilters.length === 0) return true;
  const labels = configurationFilters
    .map(mapConfigurationFilter)
    .filter((config): config is string => config !== null && isValidConfiguration(config));
  if (labels.length === 0) return true;
  const propertyConfigs = property.configuration ?? [];
  return labels.some((label) => propertyConfigs.includes(label as (typeof propertyConfigs)[number]));
}

function filterPreLaunchCatalog(
  properties: (Property & { locationSlug: string })[],
  filters: PreLaunchSearchFilters
): (Property & { locationSlug: string })[] {
  const listingTypeFilter: LocationListingPropertyTypeFilter =
    filters.propertyType === "apartments" ||
    filters.propertyType === "residential" ||
    filters.propertyType === "commercial"
      ? filters.propertyType
      : "all";

  const locationFilters = filters.locations.filter(isPreLaunchLocationSlug);

  return properties.filter((property) => {
    if (locationFilters.length > 0 && !(locationFilters as readonly string[]).includes(property.locationSlug)) {
      return false;
    }
    if (!propertyMatchesListingTypeFilter(property, listingTypeFilter)) {
      return false;
    }
    if (filters.propertyType === "commercial") {
      return true;
    }
    return staticMatchesConfiguration(property, filters.configuration);
  });
}

/** Search only the curated pre-launch catalog (static dedicated pages). */
export function searchPreLaunchProperties(
  filters: PreLaunchSearchFilters,
  options: { limit: number; offset: number }
): { properties: Property[]; totalCount: number } {
  const { limit, offset } = options;
  const filtered = filterPreLaunchCatalog(getPublishedPreLaunchStaticProperties(), filters);
  const totalCount = filtered.length;
  const properties = filtered.slice(offset, offset + limit);

  return { properties, totalCount };
}
