/** Default outreach line when opening WhatsApp without a fixed recipient (user picks contact). */
export const CELESTE_WHATSAPP_OUTREACH_TEMPLATE =
  "Hi, this is Ashish from Celeste Abode.";

export function getCelesteWhatsAppOutreachTemplateForProperty(params: {
  propertyName: string;
  location?: string | null;
}): string {
  const propertyName = (params.propertyName ?? "").trim();
  const location = (params.location ?? "").trim();

  const propertyBit = propertyName ? ` "${propertyName}"` : "";
  const locationBit = location ? ` in ${location}` : "";

  // Important: keep it short enough to look good on mobile WhatsApp.
  return `${CELESTE_WHATSAPP_OUTREACH_TEMPLATE} I'm reaching out regarding${propertyBit}${locationBit}.`;
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
