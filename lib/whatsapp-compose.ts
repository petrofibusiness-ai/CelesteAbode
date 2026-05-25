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
      const parts: string[] = [];
      if (cfg) parts.push(cfg);
      if (sz) parts.push(`${sz} sq.ft.`);
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
 * Uses whatsapp:// (same native handler as choose-chat) so UTF-8 emojis in text stay intact.
 * Phone must be digits only with country code (no + prefix).
 */
export function whatsAppComposeUrlWithRecipient(phone: string, text: string): string {
  const digits = normalizePhoneDigits(phone);
  return `whatsapp://send?phone=${digits}&text=${encodeURIComponent(text)}`;
}

export interface WhatsAppSendToNumberTargets {
  primary: string;
  fallback?: string;
}

/** Client-only: iOS (iPhone / iPad). */
export function isIOSClient(): boolean {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent;
  if (/iPad|iPhone|iPod/i.test(ua)) return true;
  return navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1;
}

/** Client-only: Windows desktop. */
export function isWindowsClient(): boolean {
  if (typeof navigator === "undefined") return false;
  return /Win/i.test(navigator.platform) || /Windows/i.test(navigator.userAgent);
}

function sendToNumberParams(phone: string, text: string): { digits: string; encodedText: string } {
  const digits = normalizePhoneDigits(phone);
  return { digits, encodedText: encodeURIComponent(text) };
}

/**
 * Primary (and optional fallback) URLs for “Send to entered number”.
 * - iOS: wa.me → api.whatsapp.com
 * - Windows: whatsapp:// → WhatsApp Web
 * - Android / other: whatsapp:// only
 */
export function getWhatsAppSendToNumberTargets(
  phone: string,
  text: string
): WhatsAppSendToNumberTargets {
  const { digits, encodedText } = sendToNumberParams(phone, text);

  if (isIOSClient()) {
    return {
      primary: `https://wa.me/${digits}?text=${encodedText}`,
      fallback: `https://api.whatsapp.com/send?phone=${digits}&text=${encodedText}`,
    };
  }

  if (isWindowsClient()) {
    return {
      primary: `whatsapp://send?phone=${digits}&text=${encodedText}`,
      fallback: `https://web.whatsapp.com/send?phone=${digits}&text=${encodedText}`,
    };
  }

  return {
    primary: whatsAppComposeUrlWithRecipient(phone, text),
  };
}

const SEND_TO_NUMBER_FALLBACK_MS = 2200;

/**
 * Opens send-to-number using platform primary URL; if the app/browser does not take
 * focus (still visible after a short delay), opens the fallback (iOS / Windows only).
 */
export function openWhatsAppSendToNumber(phone: string, text: string): void {
  const { primary, fallback } = getWhatsAppSendToNumberTargets(phone, text);

  if (!fallback) {
    window.location.href = primary;
    return;
  }

  let settled = false;

  const settle = () => {
    if (settled) return;
    settled = true;
    clearTimeout(timer);
    document.removeEventListener("visibilitychange", onVisibilityChange);
    window.removeEventListener("blur", onBlur);
    window.removeEventListener("pagehide", onPageHide);
  };

  const openFallback = () => {
    settle();
    window.open(fallback, "_blank", "noopener,noreferrer");
  };

  const onAppLikelyOpened = () => {
    settle();
  };

  const onVisibilityChange = () => {
    if (document.visibilityState === "hidden") onAppLikelyOpened();
  };

  const onBlur = () => {
    onAppLikelyOpened();
  };

  const onPageHide = () => {
    onAppLikelyOpened();
  };

  document.addEventListener("visibilitychange", onVisibilityChange);
  window.addEventListener("blur", onBlur);
  window.addEventListener("pagehide", onPageHide);

  const timer = window.setTimeout(() => {
    if (!settled && document.visibilityState === "visible") {
      openFallback();
      return;
    }
    settle();
  }, SEND_TO_NUMBER_FALLBACK_MS);

  window.location.href = primary;
}
