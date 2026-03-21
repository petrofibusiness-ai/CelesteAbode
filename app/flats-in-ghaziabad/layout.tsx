import { Metadata } from "next";

const TITLE = "Buy Flats for Sale in Ghaziabad with Best Property Consultants";
const DESCRIPTION =
  "Buy flats for sale in Ghaziabad with Celeste Abode property consultants. Discover verified flats in prime locations with expert advice and buying assistance. Contact us today!";
const PAGE_URL = "https://www.celesteabode.com/flats-in-ghaziabad";
const HERO_IMAGE = "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/flats-in-ghaziabad/flats-in-ghaziabad.webp";
const IMAGE_ALT = "Flats for Sale in Ghaziabad";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "flats in Ghaziabad",
    "flat for sale in indirapuram ghaziabad",
    "3 bhk flats in indirapuram ghaziabad",
    "flat in ghaziabad for sale",
    "flats in Vaishali Ghaziabad",
    "flats in Vasundhara Ghaziabad",
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

export default function FlatsInGhaziabadLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

