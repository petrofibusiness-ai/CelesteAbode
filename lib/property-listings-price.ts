const MAX_INVENTORY_DIGITS = 20;

/** Strip everything except digits (price, sq ft, towers, etc.). */
export function sanitizeInventoryDigitsInput(raw: string): string {
  return raw.replace(/\D/g, "").slice(0, MAX_INVENTORY_DIGITS);
}

/** @deprecated Use {@link sanitizeInventoryDigitsInput}. */
export const sanitizeInventoryPriceInput = sanitizeInventoryDigitsInput;

/** Non-empty price must be digits only (no comma, dot, spaces). */
export function isValidInventoryPriceDigits(value: string): boolean {
  const t = value.trim();
  if (!t) return false;
  return /^\d+$/.test(t);
}

/** Empty is allowed; otherwise digits only (size, towers). */
export function isValidInventoryDigitsOrEmpty(value: string): boolean {
  const t = value.trim();
  if (!t) return true;
  return /^\d+$/.test(t);
}
