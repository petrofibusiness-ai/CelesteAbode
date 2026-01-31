import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Real Estate Vault - Property Terms, FAQs & Investment Guide | Celeste Abode",
  description:
    "Comprehensive real estate knowledge base: Property terms glossary, investment FAQs, legal aspects, and market trends. Your complete guide to property buying and investment in India. 50+ FAQs and essential terms.",
  keywords: [
    "real estate terms",
    "property buying guide",
    "real estate FAQ",
    "property investment guide",
    "RERA guide",
    "property glossary",
    "real estate knowledge base",
    "property buying questions",
    "real estate investment FAQ",
  ],
  openGraph: {
    title: "Real Estate Vault - Property Terms, FAQs & Investment Guide | Celeste Abode",
    description:
      "Comprehensive real estate knowledge base with terms, FAQs, and investment guidance.",
    url: "https://www.celesteabode.com/real-estate-insights",
    siteName: "Celeste Abode",
    images: [
      {
        url: "/vaulthero.avif",
        width: 1200,
        height: 630,
        alt: "Celeste Abode Vault - Real Estate Knowledge Base",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Real Estate Vault - Property Terms, FAQs & Investment Guide",
    description: "Comprehensive real estate knowledge base with terms, FAQs, and investment guidance.",
    images: ["/vaulthero.avif"],
  },
  alternates: {
    canonical: "https://www.celesteabode.com/real-estate-insights",
  },
};

export default function VaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

