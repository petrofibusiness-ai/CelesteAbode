const MAX_INVENTORY_DIGITS = 20;

/** Max length for internal inventory `price_cr` (free text, e.g. "2.5 Cr + GST"). */
export const MAX_INVENTORY_PRICE_CR_LENGTH = 500;

/** Strip everything except digits (sq ft, towers, etc.). */
export function sanitizeInventoryDigitsInput(raw: string): string {
  return raw.replace(/\D/g, "").slice(0, MAX_INVENTORY_DIGITS);
}

/** @deprecated Use {@link sanitizeInventoryDigitsInput}. */
export const sanitizeInventoryPriceInput = sanitizeInventoryDigitsInput;

/** Price in Cr: allow any characters; cap length for DB/API safety. */
export function sanitizeInventoryPriceCrInput(raw: string): string {
  return raw.slice(0, MAX_INVENTORY_PRICE_CR_LENGTH);
}

/** Non-empty price after trim; any characters allowed up to {@link MAX_INVENTORY_PRICE_CR_LENGTH}. */
export function isValidInventoryPriceText(value: string): boolean {
  const t = value.trim();
  if (!t) return false;
  return value.length <= MAX_INVENTORY_PRICE_CR_LENGTH;
}

/** Empty is allowed; otherwise digits only (size, towers). */
export function isValidInventoryDigitsOrEmpty(value: string): boolean {
  const t = value.trim();
  if (!t) return true;
  return /^\d+$/.test(t);
}

const RUPEES_PER_CRORE = 10_000_000;

/** Leading crore figure at start of string, e.g. `1.05`, `  2.5 Cr + GST`. */
export function parseLeadingCroreFromPriceText(text: string): { crores: number; consumedEnd: number } | null {
  const m = text.match(/^\s*(\d+(?:\.\d+)?)/);
  if (!m || m.index === undefined) return null;
  const crores = parseFloat(m[1] ?? "");
  if (!Number.isFinite(crores) || crores < 0) return null;
  return { crores, consumedEnd: m.index + m[0].length };
}

/** Integer rupees with Indian digit grouping (lakhs / crores). */
export function formatIndianRupeeInteger(amountRupees: number): string {
  return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(Math.round(amountRupees));
}

/** True if `text` contains at least one token that looks like a crore figure (`1`, `1.05`, etc.). */
export function hasCroreNumberToken(text: string): boolean {
  return /\d+(?:\.\d+)?/.test(text.trim());
}

function spaceAroundRupeeSeparators(s: string): string {
  return s
    .replace(/\s*([–—-])\s*/g, " $1 ")
    .replace(/(₹)\s*([–—-])\s*(₹)/g, "$1 $2 $3")
    .replace(/\s+/g, " ")
    .trim();
}

/** Index after the last `₹ 1,23,456`-style block in `s`, or -1 if none. */
function lastFormattedRupeeEnd(s: string): number {
  const re = /₹\s[\d,]+/g;
  let end = -1;
  let m: RegExpExecArray | null;
  while ((m = re.exec(s)) !== null) {
    end = re.lastIndex;
  }
  return end;
}

/**
 * After all crore numbers are turned into ₹ amounts, put trailing descriptive text in parentheses.
 * Leading words (e.g. "between … and …") stay outside; only the tail after the last ₹ amount is bracketed.
 */
function bracketTrailingLetterSuffix(s: string): string {
  const trimmed = s.trim();
  const end = lastFormattedRupeeEnd(trimmed);
  if (end === -1) return trimmed;

  const core = trimmed.slice(0, end).trimEnd();
  let suffix = trimmed.slice(end).trim();
  suffix = suffix.replace(/\bCr\b\.?/gi, "").trim();
  if (!suffix || /^[-–—\s+]+$/u.test(suffix)) {
    return core.trim();
  }
  const inner = suffix.replace(/^[-–—+\s]+/u, "").trim();
  if (!inner) return core.trim();
  if (/^\([^)]+\)$/.test(inner)) {
    return `${core.trim()} ${inner}`;
  }
  return `${core.trim()} (${inner})`;
}

/**
 * Show stored `price_cr` as full rupees (Indian grouping). Every numeric crore token is converted
 * (including ranges like `1.05 - 1.25`). Redundant `Cr` markers are removed. Trailing words (GST, notes, etc.)
 * appear in parentheses; hyphens / dashes between amounts are preserved with spacing.
 * If there are no digits, returns the trimmed original string.
 */
export function formatInventoryPriceCrDisplay(priceCr: string): string {
  const raw = priceCr.trim();
  if (!raw) return "";
  if (!/\d/.test(raw)) return raw;

  const re = /\d+(?:\.\d+)?/g;
  let out = "";
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(raw)) !== null) {
    out += raw.slice(last, m.index);
    const cr = parseFloat(m[0] ?? "");
    out +=
      Number.isFinite(cr) && cr >= 0
        ? `₹ ${formatIndianRupeeInteger(cr * RUPEES_PER_CRORE)}`
        : (m[0] ?? "");
    last = re.lastIndex;
  }
  out += raw.slice(last);

  out = out.replace(/\bCr\b\.?/gi, "");
  out = spaceAroundRupeeSeparators(out);
  return bracketTrailingLetterSuffix(out);
}
