import { configurationGroupKeyFromLabel } from "@/lib/inventory-configuration-groups";
import type { DashboardViewRow } from "@/lib/inventory-dashboard-rows";
import type { PropertyInventoryRow } from "@/types/property-listing";

export interface LocationConfigurationBucket {
  label: string;
  propertyCount: number;
  unitCount: number;
}

export interface LocationInventorySummary {
  locationId: string | null;
  locationLabel: string;
  propertyCount: number;
  unitCount: number;
  configurations: LocationConfigurationBucket[];
}

type LocationAccumulator = {
  locationId: string | null;
  locationLabel: string;
  propertyIds: Set<string>;
  unitCount: number;
  configPropertyIds: Map<string, Set<string>>;
  configUnitCount: Map<string, number>;
};

function locationKey(locationId: string | null): string {
  return locationId ?? "__unassigned__";
}

function getOrCreateBucket(
  map: Map<string, LocationAccumulator>,
  locationId: string | null,
  locationLabel: string
): LocationAccumulator {
  const key = locationKey(locationId);
  let bucket = map.get(key);
  if (!bucket) {
    bucket = {
      locationId,
      locationLabel: locationLabel.trim() || "Unassigned",
      propertyIds: new Set(),
      unitCount: 0,
      configPropertyIds: new Map(),
      configUnitCount: new Map(),
    };
    map.set(key, bucket);
  }
  return bucket;
}

function addConfigurationToBucket(
  bucket: LocationAccumulator,
  propertyId: string,
  configurationLabel: string
) {
  const cfg = configurationGroupKeyFromLabel(configurationLabel);
  bucket.configUnitCount.set(cfg, (bucket.configUnitCount.get(cfg) ?? 0) + 1);

  let props = bucket.configPropertyIds.get(cfg);
  if (!props) {
    props = new Set();
    bucket.configPropertyIds.set(cfg, props);
  }
  props.add(propertyId);
}

function finalizeSummaries(map: Map<string, LocationAccumulator>): LocationInventorySummary[] {
  return [...map.values()]
    .map((bucket) => ({
      locationId: bucket.locationId,
      locationLabel: bucket.locationLabel,
      propertyCount: bucket.propertyIds.size,
      unitCount: bucket.unitCount,
      configurations: [...bucket.configUnitCount.entries()]
        .map(([label, unitCount]) => ({
          label,
          unitCount,
          propertyCount: bucket.configPropertyIds.get(label)?.size ?? 0,
        }))
        .sort((a, b) => b.unitCount - a.unitCount || a.label.localeCompare(b.label)),
    }))
    .sort((a, b) => b.propertyCount - a.propertyCount || a.locationLabel.localeCompare(b.locationLabel));
}

export function buildLocationInventorySummary(groups: DashboardViewRow[][]): LocationInventorySummary[] {
  const map = new Map<string, LocationAccumulator>();

  for (const group of groups) {
    const head = group[0];
    if (!head) continue;

    const bucket = getOrCreateBucket(map, head.location_id, head.location_label);
    bucket.propertyIds.add(head.property_id);

    const linesWithConfig = group.filter((row) => row.line_id);
    if (linesWithConfig.length === 0) {
      addConfigurationToBucket(bucket, head.property_id, "");
      continue;
    }

    for (const row of linesWithConfig) {
      bucket.unitCount += 1;
      addConfigurationToBucket(bucket, head.property_id, row.configuration_label ?? "");
    }
  }

  return finalizeSummaries(map);
}

export function buildLocationInventorySummaryFromRows(
  rows: PropertyInventoryRow[]
): LocationInventorySummary[] {
  const map = new Map<string, LocationAccumulator>();

  for (const row of rows) {
    const bucket = getOrCreateBucket(map, row.locationId, row.locationLabel || "Unassigned");
    bucket.propertyIds.add(row.propertyId);
    bucket.unitCount += 1;
    addConfigurationToBucket(bucket, row.propertyId, row.configuration ?? "");
  }

  return finalizeSummaries(map);
}
