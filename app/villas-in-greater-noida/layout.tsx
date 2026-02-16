import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Villas in Greater Noida – Redefining Luxury & Lifestyle | Celeste Abode",
  description:
    "Find spacious villas in Greater Noida across Jaypee Greens, Omega, and the Yamuna belt. Compare value, connectivity, and future growth with transparent guidance.",
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
    "villas in Greater Noida",
    "luxury villas Greater Noida",
    "villas for sale Greater Noida",
    "premium villas Greater Noida",
    "Jaypee Greens villas",
    "Omega villas Greater Noida",
    "Yamuna Expressway villas",
    "Greater Noida West villas",
    "Noida Extension villas",
    "RERA approved villas Greater Noida",
  ],
  openGraph: {
    title: "Villas in Greater Noida – Redefining Luxury & Lifestyle | Celeste Abode",
    description:
      "Find spacious villas in Greater Noida across Jaypee Greens, Omega, and the Yamuna belt. Compare value, connectivity, and future growth with transparent guidance.",
    url: "https://www.celesteabode.com/villas-in-greater-noida",
    siteName: "Celeste Abode",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Villas in Greater Noida – Redefining Luxury & Lifestyle",
    description:
      "Compare Greater Noida villa options by locality, pricing logic, and growth potential before you shortlist.",
  },
  alternates: {
    canonical: "https://www.celesteabode.com/villas-in-greater-noida",
  },
};

export default function VillasInGreaterNoidaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

