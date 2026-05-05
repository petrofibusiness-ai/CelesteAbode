/**
 * Full admin: dashboard, leads, locations, properties, inventory, messaging.
 * Any other authenticated admin email is limited to `/admin/inventory/*` (inventory + WhatsApp messaging).
 */
const FULL_ADMIN_EMAILS_LOWER = new Set([
  "support@celesteabode.com",
  "support@admin.celesteabode.com",
]);

export function isFullAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  return FULL_ADMIN_EMAILS_LOWER.has(email.toLowerCase().trim());
}
