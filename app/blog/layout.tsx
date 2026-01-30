import type { Metadata } from "next";
import { BreadcrumbSchema, BlogPageSchema } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Real Estate Blog & Market Insights | Celeste Abode - Delhi NCR Property Intelligence",
  description:
    "Expert real estate blog covering Delhi NCR property market analysis, investment strategies, legal guidance, NRI advisory, and location intelligence for Noida, Greater Noida, and Yamuna Expressway.",
  keywords: [
    "real estate blog",
    "Delhi NCR property insights",
    "real estate market analysis",
    "property investment guide",
    "Noida real estate news",
    "Greater Noida property updates",
    "Yamuna Expressway investment",
    "RERA compliance guide",
    "NRI property investment",
    "real estate legal advice",
    "property buying tips",
    "real estate consulting blog",
    "Delhi NCR property trends",
    "real estate advisory insights",
    "property market intelligence",
  ],
  authors: [{ name: "Celeste Abode Advisory Team" }],
  creator: "Celeste Abode",
  publisher: "Celeste Abode",
  openGraph: {
    title: "Real Estate Blog & Market Insights | Celeste Abode",
    description:
      "Expert analysis, market intelligence, and strategic guidance for property investment in Delhi NCR - Noida, Greater Noida, and Yamuna Expressway.",
    url: "https://celesteabode.com/blog",
    siteName: "Celeste Abode",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/propertyhero.avif",
        width: 1200,
        height: 630,
        alt: "Celeste Abode Real Estate Blog - Delhi NCR Property Intelligence",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Real Estate Blog & Market Insights | Celeste Abode",
    description:
      "Expert property market analysis and investment guidance for Delhi NCR real estate.",
    images: ["/propertyhero.avif"],
    creator: "@celesteabode",
  },
  alternates: {
    canonical: "https://celesteabode.com/blog",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "Real Estate",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const breadcrumbItems = [
    { name: "Home", url: "https://celesteabode.com/" },
    { name: "Blog", url: "https://celesteabode.com/blog" },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <BlogPageSchema
        name="Celeste Abode Real Estate Blog"
        description="Expert real estate insights, market analysis, and advisory guidance for property investment in Delhi NCR"
        url="https://celesteabode.com/blog"
        publisher={{
          name: "Celeste Abode",
          logo: "https://celesteabode.com/logoceleste.avif",
        }}
      />
      {children}
    </>
  );
}
