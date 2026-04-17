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
