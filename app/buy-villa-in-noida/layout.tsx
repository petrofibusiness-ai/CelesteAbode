import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Buy Villa in Noida – Premium Homes for Refined Living | Celeste Abode",
  description:
    "Looking to buy a villa in Noida? Explore premium independent villas with Celeste Abode — modern designs, world-class amenities, and a lifestyle crafted for elegance and comfort.",
  keywords: [
    // Location-Focused Keywords
    "real estate consultants in Noida",
    "luxury homes in Noida",
    "properties in Noida",
    "NCR real estate experts",
    "luxury property consultants Delhi NCR",
    "property investment Delhi NCR",
    "premium real estate advisory Noida",
    "Noida property consultants",
    "Delhi NCR property investment advisors",
    
    // Villa-Specific Keywords
    "buy villa in Noida",
    "villas for sale Noida",
    "luxury villas Noida",
    "premium villas Noida",
    "villa Noida Expressway",
    "villa Sector 150 Noida",
    "Noida Extension villas",
    "RERA approved villas Noida",
    "villa investment Noida",
    "independent villas Noida",
  ],
  openGraph: {
    title: "Buy Villa in Noida – Premium Homes for Refined Living | Celeste Abode",
    description:
      "Looking to buy a villa in Noida? Explore premium independent villas with Celeste Abode — modern designs, world-class amenities, and a lifestyle crafted for elegance and comfort.",
    url: "https://www.celesteabode.com/buy-villa-in-noida",
    siteName: "Celeste Abode",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Buy Villa in Noida – Premium Homes for Refined Living",
    description:
      "Looking to buy a villa in Noida? Explore premium independent villas with Celeste Abode — modern designs, world-class amenities, and a lifestyle crafted for elegance and comfort.",
  },
  alternates: {
    canonical: "https://www.celesteabode.com/buy-villa-in-noida",
  },
};

export default function BuyVillaInNoidaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
