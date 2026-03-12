import { Metadata } from "next";

const TITLE = "Residential Property in Noida | Buy Home & Luxury Property for Sale";
const DESCRIPTION =
  "Explore residential property in Noida with Celeste Abode property consultants. Get expert advice, verified projects, and complete support for buying the right home.";
const PAGE_URL = "https://www.celesteabode.com/residential-property-in-noida";
const HERO_IMAGE = "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/residential-property-in-noida/residential-property-in-noida.webp";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "residential property in Noida",
    "buy home in Noida",
    "property for sale Noida",
    "apartments in Noida",
    "villas in Noida",
    "Celeste Abode property consultants",
  ],
  authors: [{ name: "Celeste Abode" }],
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: PAGE_URL,
    siteName: "Celeste Abode",
    type: "website",
    images: [
      {
        url: HERO_IMAGE,
        width: 1200,
        height: 630,
        alt: "Residential Property in Noida",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: HERO_IMAGE,
        alt: "Residential Property in Noida",
      },
    ],
  },
  alternates: {
    canonical: PAGE_URL,
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
