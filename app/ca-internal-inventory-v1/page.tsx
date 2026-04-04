import type { Metadata } from "next";
import { PropertyListingsView } from "@/components/property-listings/property-listings-view";

/** Never statically cache HTML for this private route. */
export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Internal inventory | Celeste Abode",
  description: "Private listing view — not indexed by search engines.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    noarchive: true,
    nosnippet: true,
    noimageindex: true,
    notranslate: true,
    googleBot: {
      index: false,
      follow: false,
      nocache: true,
      noarchive: true,
      nosnippet: true,
      noimageindex: true,
      notranslate: true,
      "max-image-preview": "none",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  // No canonical: avoid implying a preferred public URL for this private page.
};

export default function CaInternalInventoryPage() {
  return <PropertyListingsView />;
}
