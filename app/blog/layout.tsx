import type { Metadata } from "next";
import { BreadcrumbSchema, BlogPageSchema } from "@/lib/structured-data";

const TITLE = "Real Estate Blogs | Property Investment Guides & Market Insights";
const DESCRIPTION = "Explore real estate insights, property investment guides, and market updates from Celeste Abode experts. Discover tips on buying property in Noida, NCR and more.";
const PAGE_URL = "https://www.celesteabode.com/blog";
const OG_IMAGE = "https://www.celesteabode.com/propertyhero.avif";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "real estate blogs",
    "property investment guides",
    "market insights",
    "Noida property tips",
    "NCR real estate",
    "property buying guide",
  ],
  authors: [{ name: "Celeste Abode Advisory Team" }],
  creator: "Celeste Abode",
  publisher: "Celeste Abode",
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: PAGE_URL,
    siteName: "Celeste Abode",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Real Estate Blogs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: OG_IMAGE, alt: "Real Estate Blogs" }],
    creator: "@celesteabode",
  },
  alternates: {
    canonical: PAGE_URL,
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
    { name: "Home", url: "https://www.celesteabode.com/" },
    { name: "Blog", url: "https://www.celesteabode.com/blog" },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <BlogPageSchema
        name="Celeste Abode Real Estate Blog"
        description="Expert insights on real estate markets, regulations, and investment trends across Delhi NCR—designed to support informed property decisions."
        url="https://www.celesteabode.com/blog"
        publisher={{
          name: "Celeste Abode",
          logo: "https://pub-8b549a102c1947ddb8ca422febdbc1dd.r2.dev/logocelesteabode.webp",
        }}
      />
      {children}
    </>
  );
}
