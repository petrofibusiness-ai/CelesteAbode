import type { PropertyLocationAdvantageRow } from "@/types/property";
import { parseLeadingCroreFromPriceText } from "@/lib/property-listings-price";

/** One inventory line from `property_listing_configurations` (via `property_inventory_dashboard_rows`). */
export interface MessagingInventoryLine {
  configuration: string;
  sizeSqft: string;
  priceCr: string;
}

export interface CelesteWhatsAppMessagingTemplateInput {
  projectName: string;
  location: string;
  projectSnapshot: string[];
  locationAdvantage: PropertyLocationAdvantageRow[];
  inventoryLines: MessagingInventoryLine[];
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, " ").replace(/&nbsp;/gi, " ").replace(/\s+/g, " ").trim();
}

function plainText(s: string): string {
  return stripHtml(s).trim();
}

function parseSqft(raw: string): number | null {
  const cleaned = String(raw ?? "").replace(/[^\d.]/g, "");
  if (!cleaned) return null;
  const n = parseFloat(cleaned);
  return Number.isFinite(n) && n > 0 ? n : null;
}

function formatCroresForTemplate(crores: number): string {
  if (Number.isInteger(crores)) return String(crores);
  const s = crores.toFixed(2).replace(/\.?0+$/, "");
  return s;
}

function formatConfigurationsBlock(lines: MessagingInventoryLine[]): string {
  if (!lines.length) return "Available on request.";
  const rows = lines
    .map((l) => {
      const cfg = l.configuration.trim();
      const sz = l.sizeSqft.trim();
      const pr = l.priceCr.trim();
      const parts: string[] = [];
      if (cfg) parts.push(cfg);
      if (sz) parts.push(`${sz} sq.ft.`);
      if (pr) parts.push(pr);
      return parts.length ? `• ${parts.join(" · ")}` : null;
    })
    .filter((x): x is string => Boolean(x));
  return rows.length ? rows.join("\n") : "Available on request.";
}

function pickStartingPriceLine(
  lines: MessagingInventoryLine[]
): { crores: number; priceCrDisplay: string; pricePerSqftDisplay: string } | null {
  let best: { crores: number; line: MessagingInventoryLine } | null = null;

  for (const line of lines) {
    const parsed = parseLeadingCroreFromPriceText(line.priceCr.trim());
    const sqft = parseSqft(line.sizeSqft);
    if (!parsed || !sqft) continue;
    if (!best || parsed.crores < best.crores) {
      best = { crores: parsed.crores, line };
    }
  }

  if (!best) return null;

  const rupeesPerCrore = 10_000_000;
  const rupees = best.crores * rupeesPerCrore;
  const sqft = parseSqft(best.line.sizeSqft);
  if (!sqft) return null;

  const ppsf = rupees / sqft;
  const pricePerSqftDisplay = new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
  }).format(Math.round(ppsf));

  return {
    crores: best.crores,
    priceCrDisplay: formatCroresForTemplate(best.crores),
    pricePerSqftDisplay,
  };
}

function advantageBullet(row: PropertyLocationAdvantageRow): string {
  const l = (row.label ?? "").trim();
  const t = (row.text ?? "").trim();
  if (l && t) return `${l} — ${t}`;
  return l || t || "";
}

/**
 * Rich WhatsApp copy for the admin messaging module: project + inventory + highlights.
 */
export function buildCelesteWhatsAppMessagingTemplate(input: CelesteWhatsAppMessagingTemplateInput): string {
  const projectName = plainText(input.projectName || "") || "This project";
  const location = plainText(input.location || "") || "—";

  const snapshotLines = (input.projectSnapshot ?? [])
    .map((s) => plainText(String(s)))
    .filter(Boolean)
    .slice(0, 3);
  const highlightSlots = [0, 1, 2].map((i) => snapshotLines[i] ?? "—");

  const advantageLines = (input.locationAdvantage ?? [])
    .map(advantageBullet)
    .filter(Boolean)
    .slice(0, 3);
  const advantageSlots = [0, 1, 2].map((i) => advantageLines[i] ?? "—");

  const highlightsBlock = highlightSlots.map((s) => `* ${s}`).join("\n");

  const advantagesBlock = advantageSlots.map((a) => `* ${a}`).join("\n");

  const configurationBlock = formatConfigurationsBlock(input.inventoryLines ?? []);

  const pricing = pickStartingPriceLine(input.inventoryLines ?? []);
  const priceCr = pricing?.priceCrDisplay ?? "—";
  const pricePerSqft = pricing?.pricePerSqftDisplay ?? "—";

  return `✨ Greetings from Celeste Abode

🏙️ ${projectName} — ${location}

📌 Project Highlights
${highlightsBlock}

🏠 Configurations Available
${configurationBlock}

💰 Pricing
Starting from ₹${priceCr} Cr onwards
₹${pricePerSqft} / sq.ft.

📍 Location Advantages
${advantagesBlock}

We also have access to detailed inventory updates, tower-specific availability, floor plans, and current pricing insights for this project.

Let us know if you'd like us to share the complete details with you.`;
}

/**
 * Opens WhatsApp with prefilled message only; user chooses the chat (mobile / desktop app).
 * Uses the whatsapp:// custom scheme (no phone number).
 */
export function whatsAppComposeUrlNoRecipient(text: string): string {
  return `whatsapp://send?text=${encodeURIComponent(text)}`;
}

function normalizePhoneDigits(phone: string): string {
  return phone.replace(/\D/g, "");
}

/**
 * Opens WhatsApp to a specific number with a prefilled message.
 * Uses the wa.me URL (works across platforms).
 */
export function whatsAppComposeUrlWithRecipient(phone: string, text: string): string {
  const digits = normalizePhoneDigits(phone);
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
}
