import type { Metadata } from "next";
import { PropertyListingsView } from "@/components/property-listings/property-listings-view";
import { PRIVATE_PROPERTY_LISTING_PATH } from "@/lib/private-property-listing-route";

const site =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://www.celesteabode.com";

export const metadata: Metadata = {
  title: "Internal inventory | Celeste Abode",
  description: "Private listing view — not indexed by search engines.",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
  alternates: {
    canonical: `${site}${PRIVATE_PROPERTY_LISTING_PATH}`,
  },
};

export default function CaInternalInventoryPage() {
  return <PropertyListingsView />;
}
