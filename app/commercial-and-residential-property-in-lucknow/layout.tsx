import { Metadata } from "next";

const TITLE = "Invest in Residential and Commercial Property in Lucknow with Expert Real Estate Consultants";
const DESCRIPTION =
  "Invest in residential and commercial property in Lucknow with expert real estate consultants. Gomti Nagar, Shaheed Path, Hazratganj and more. Verified projects, due diligence, and end-to-end advisory.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "commercial property in Lucknow",
    "residential property in Lucknow",
    "property in Lucknow",
    "commercial property for sale in Lucknow",
    "flats in Lucknow",
    "apartments in Lucknow",
    "villas in Lucknow",
    "real estate consultants in Lucknow",
    "Celeste Abode",
  ],
  authors: [{ name: "Celeste Abode" }],
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://www.celesteabode.com/commercial-and-residential-property-in-lucknow",
    siteName: "Celeste Abode",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  alternates: {
    canonical: "https://www.celesteabode.com/commercial-and-residential-property-in-lucknow",
  },
  robots: { index: true, follow: true },
};

export default function PropertyInLucknowLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

