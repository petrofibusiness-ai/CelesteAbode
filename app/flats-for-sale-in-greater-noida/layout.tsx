import { Metadata } from "next";

const TITLE = "Flats for Sale in Greater Noida | Buy 1/2/3 Bhk Flats & Apartments";
const DESCRIPTION =
  "Buy 1, 2 & 3 BHK flats in Greater Noida with Celeste Abode consultants. Discover verified apartments, compare projects, and get expert advice before you invest.";
const PAGE_URL = "https://www.celesteabode.com/flats-for-sale-in-greater-noida";
const HERO_IMAGE = "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/flat-for-sale-in-greater-noida/flat-for-sale-in-greater-noida.webp";
const IMAGE_ALT = "Flats for Sale in Greater Noida - 1/2/3 BHK Apartments";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "flats for sale in Greater Noida",
    "1 BHK flat Greater Noida",
    "2 BHK flat Greater Noida",
    "3 BHK flat Greater Noida",
    "apartments Greater Noida",
    "Celeste Abode consultants",
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

export default function FlatsForSaleInGreaterNoidaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
