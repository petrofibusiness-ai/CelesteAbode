import { permanentRedirect } from "next/navigation";
import { PRIVATE_PROPERTY_LISTING_PATH } from "@/lib/private-property-listing-route";

/** Legacy URL — canonical route is {@link PRIVATE_PROPERTY_LISTING_PATH}. */
export default function PropertyListingsRedirectPage() {
  permanentRedirect(PRIVATE_PROPERTY_LISTING_PATH);
}