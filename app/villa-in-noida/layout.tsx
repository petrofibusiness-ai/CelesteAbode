import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Luxury Villa in Noida – Discover Elegant Living with Celeste Abode",
  description:
    "Explore exquisite villas in Noida with Celeste Abode. Experience modern design, serene surroundings, and timeless luxury — where every home tells a story of elegance and comfort.",
  keywords: [
    // Location-Focused Keywords
    "real estate consultants in Noida",
    "luxury homes in Greater Noida",
    "properties on Yamuna Expressway",
    "NCR real estate experts",
    "luxury property consultants Delhi NCR",
    "property investment Delhi NCR",
    "premium real estate advisory Greater Noida",
    "Yamuna Expressway property consultants",
    "Delhi NCR property investment advisors",
    
    // Villa-Specific Keywords
    "villa in Noida",
    "luxury villas Noida",
    "villas for sale Noida",
    "premium villas Noida",
    "3 BHK villa Noida",
    "4 BHK villa Noida",
    "villa Noida Expressway",
    "villa Sector 150 Noida",
    "Noida Extension villas",
    "RERA approved villas Noida",
  ],
  openGraph: {
    title: "Luxury Villa in Noida – Discover Elegant Living with Celeste Abode",
    description:
      "Explore exquisite villas in Noida with Celeste Abode. Experience modern design, serene surroundings, and timeless luxury.",
    url: "https://www.celesteabode.com/villa-in-noida",
    siteName: "Celeste Abode",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Luxury Villa in Noida – Discover Elegant Living",
    description:
      "Explore exquisite villas in Noida with Celeste Abode. Experience modern design, serene surroundings, and timeless luxury.",
  },
  alternates: {
    canonical: "https://www.celesteabode.com/villa-in-noida",
  },
};

export default function VillaInNoidaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

