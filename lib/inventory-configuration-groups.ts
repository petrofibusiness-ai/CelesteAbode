export function normalizeConfigForGrouping(raw: string): string {
  return raw
    .trim()
    .replace(/(\d+(?:\.\d+)?)(bhk)/gi, "$1 $2")
    .replace(/\s+/g, " ");
}

export function configurationGroupKeyFromLabel(label: string): string {
  const v = (label ?? "").trim();
  if (!v) return "Not set";
  const lowered = normalizeConfigForGrouping(v).toLowerCase();

  if (/\bstudio\b/.test(lowered)) return "Studio";
  if (/\b1\s*rk\b/.test(lowered)) return "1 RK";

  const bhk = lowered.match(/(\d+(?:\.\d+)?)\s*bhk\b/i);
  if (bhk) {
    const n = parseFloat(bhk[1] ?? "0");
    if (Number.isFinite(n) && n > 0 && n <= 32) {
      return `${n} BHK`;
    }
  }

  if (/\bduplex\b/i.test(v)) return "Duplex";
  if (/\bpenthouse\b/i.test(v)) return "Penthouse";
  if (/\bplot\b/.test(lowered) || /\bland\b/.test(lowered)) return "Plots / Land";
  if (/\bshop\b/.test(lowered) || /\boffice\b/.test(lowered)) return "Commercial";
  if (/\bvilla\b/.test(lowered)) return "Villas";

  return "Other layouts";
}
