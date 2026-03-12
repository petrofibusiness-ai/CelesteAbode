import { Metadata } from "next";

const TITLE = "Commercial Property for Sale in Lucknow | Best Property Consultant";
const DESCRIPTION =
  "Explore commercial property for sale in Lucknow including shops, offices, and retail spaces. Connect with the best property consultant for verified deals and expert guidance.";
const PAGE_URL = "https://www.celesteabode.com/commercial-and-residential-property-in-lucknow";
const HERO_IMAGE = "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/commercial-and-residential-property-in-lucknow/commercial-and-residential-property-in-lucknow.webp";
const IMAGE_ALT = "Commercial Property for Sale in Lucknow";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "commercial property for sale in Lucknow",
    "commercial property Lucknow",
    "shops for sale Lucknow",
    "offices for sale Lucknow",
    "retail spaces Lucknow",
    "Celeste Abode property consultant",
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

export default function PropertyInLucknowLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

