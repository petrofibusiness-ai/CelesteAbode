import { permanentRedirect } from "next/navigation";
import { PRIVATE_PROPERTY_LISTING_PATH } from "@/lib/private-property-listing-route";

export default function PropertiesListingsRedirectPage() {
  permanentRedirect(PRIVATE_PROPERTY_LISTING_PATH);
}
