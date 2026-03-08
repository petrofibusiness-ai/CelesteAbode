import { Metadata } from "next";

const TITLE = "Buy Residential Property in Noida - Buy Home & Luxury Property for Sale";
const DESCRIPTION =
  "Noida has become one of NCR's most sought-after cities for homebuyers. Buy residential property in Noida with trusted consultants. Explore apartments, villas & luxury homes for sale.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "residential property in Noida",
    "buy home in Noida",
    "luxury property Noida",
    "apartments in Noida",
    "villas in Noida",
    "property for sale Noida",
    "Celeste Abode",
  ],
  authors: [{ name: "Celeste Abode" }],
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://www.celesteabode.com/residential-property-in-noida",
    siteName: "Celeste Abode",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  alternates: {
    canonical: "https://www.celesteabode.com/residential-property-in-noida",
  },
  robots: { index: true, follow: true },
};

export default function ResidentialPropertyInNoidaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
