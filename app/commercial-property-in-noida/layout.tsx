import { Metadata } from "next";

const TITLE = "Commercial Property for Sale in Noida - Best Commercial Property for Investment";
const DESCRIPTION =
  "Find commercial property for sale in Noida with Celeste Abode consultants. Explore offices, retail shops, and premium investment spaces with expert advice.";
const PAGE_URL = "https://www.celesteabode.com/commercial-property-in-noida";
const HERO_IMAGE = "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/commercial-property-in-noida/commercial-property-in-noida.webp";
const IMAGE_ALT = "Commercial Property for Sale in Noida";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "commercial property for sale Noida",
    "commercial property Noida",
    "office space Noida",
    "retail shops Noida",
    "commercial investment Noida",
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
        alt: IMAGE_ALT,
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
        alt: IMAGE_ALT,
      },
    ],
  },
  alternates: {
    canonical: PAGE_URL,
  },
  robots: { index: true, follow: true },
};

export default function CommercialPropertyInNoidaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
