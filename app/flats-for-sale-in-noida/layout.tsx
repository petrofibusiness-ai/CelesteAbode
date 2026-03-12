import { Metadata } from "next";

const TITLE = "Buy 2 & 3 BHK Flats for Sale in Noida | Best Property Consultants";
const DESCRIPTION =
  "Explore 2 & 3 BHK flats for sale in Noida with Celeste Abode property consultants. Get expert guidance, verified listings, and the best options to buy your ideal home.";
const PAGE_URL = "https://www.celesteabode.com/flats-for-sale-in-noida";
const HERO_IMAGE = "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/flat-for-sale-in-noida/flat-for-sale-in-noida.webp";
const IMAGE_ALT = "Flats for Sale in Noida - 2 & 3 BHK Apartments";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "flats for sale in Noida",
    "2 BHK flat Noida",
    "3 BHK flat Noida",
    "buy flats Noida",
    "apartments in Noida",
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

export default function FlatsForSaleInNoidaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
