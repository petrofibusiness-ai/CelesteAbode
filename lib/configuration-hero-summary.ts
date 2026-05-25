/**
 * Collapse inventory configuration lines (e.g. "4 BHK + 3T", "3 BHK + Study")
 * into a compact hero label: "2BHK/3BHK/4BHK".
 */
export function summarizeConfigurationLabelsForHero(labels: string[]): string {
  if (!labels.length) return "";

  const bhkValues = new Set<number>();

  for (const label of labels) {
    const trimmed = label.trim();
    if (!trimmed) continue;

    const match = trimmed.match(/(\d+(?:\.\d+)?)\s*BHK/i);
    if (!match) continue;

    const value = Number.parseFloat(match[1]);
    if (Number.isFinite(value)) {
      bhkValues.add(value);
    }
  }

  if (bhkValues.size === 0) return "";

  return [...bhkValues]
    .sort((a, b) => a - b)
    .map((n) => `${n}BHK`)
    .join("/");
}
