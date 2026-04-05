import type { NextRequest } from "next/server";

/** Shared auth for inventory PATCH routes (header or Bearer). */
export function isPropertyListingsEditAuthorized(request: NextRequest): boolean {
  const env = process.env.PROPERTY_LISTINGS_EDIT_SECRET?.trim();
  if (!env) return false;
  const header = request.headers.get("x-ca-property-listings-edit-key")?.trim();
  const auth = request.headers.get("authorization");
  const bearerMatch = auth?.match(/^Bearer\s+(.+)$/i);
  const bearer = bearerMatch?.[1]?.trim() ?? null;
  const token = header || bearer;
  return token === env;
}
