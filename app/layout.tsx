import type React from "react";
import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { GoogleAnalytics } from "@/components/google-analytics";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-poppins",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.celesteabode.com"),
  title: {
    default: "Luxury Real Estate NCR | Investment Advisory | Celeste Abode",
    template: "%s | Celeste Abode",
  },
  description:
    "Luxury real estate consulting in Noida, Gurugram, and Delhi NCR. Data-driven property investment advisory with RERA compliance. Expert guidance for luxury apartments and high-value investments.",
  keywords: [
    // Primary Keywords
    "luxury real estate consulting NCR",
    "strategic property investment advisory",
    "data-driven real estate consulting",
    "RERA compliant property advisory",
    "property investment consultant NCR",
    
    // Location-based Keywords - Noida
    "real estate consultant Noida",
    "property advisor Noida",
    "property dealer Noida",
    "real estate agent Noida",
    "best property consultant Noida",
    "top real estate advisor Noida",
    "Noida property investment",
    "Noida real estate market",
    "Noida Sector 62 property consultant",
    "Noida Sector 150 property advisor",
    "Noida Extension property dealer",
    "Noida City Center property",
    "Noida Golf Course property",
    "Noida Expressway property consultant",
    "Noida property near metro",
    
    // Location-based Keywords - Greater Noida
    "Greater Noida real estate advisor",
    "Greater Noida property consultant",
    "Greater Noida property dealer",
    "Greater Noida investment property",
    "Greater Noida West property",
    "Greater Noida property near Jewar Airport",
    "Greater Noida residential plots",
    "Greater Noida commercial property",
    
    // Location-based Keywords - Gurugram/Gurgaon
    "property advisor Gurugram",
    "Gurugram property investment advisory",
    "Gurugram real estate consultant",
    "Gurgaon property dealer",
    "Gurugram property near Golf Course",
    "Gurugram Sector property consultant",
    "Gurugram luxury property",
    "Gurugram commercial real estate",
    
    // Location-based Keywords - Delhi NCR
    "luxury property consultant Delhi NCR",
    "Delhi NCR real estate consulting",
    "NCR property investment",
    "Delhi NCR property advisor",
    "NCR real estate market",
    "Delhi NCR luxury apartments",
    "NCR property dealer",
    "Delhi NCR property consultant",
    
    // Location-based Keywords - Other Areas
    "Ghaziabad property advisor",
    "Ghaziabad real estate consultant",
    "Yamuna Expressway property investment",
    "Yamuna Expressway property dealer",
    "Noida Expressway property investment",
    "Jewar Airport property investment",
    "Jewar Airport real estate",
    
    // Property Type Keywords
    "luxury apartment consultant",
    "luxury apartments Noida",
    "luxury apartments Gurugram",
    "luxury villas NCR",
    "villa investment advisory",
    "luxury villas Noida",
    "luxury villas Gurugram",
    "premium apartments NCR",
    "signature residences NCR",
    "residential plots Noida",
    "residential plots Greater Noida",
    "commercial property Noida",
    "commercial real estate NCR",
    "office space Noida",
    "retail space NCR",
    
    // BHK-specific Keywords
    "2 BHK apartments Noida",
    "3 BHK apartments Noida",
    "4 BHK apartments Noida",
    "2 BHK flats Noida",
    "3 BHK flats Noida",
    "4 BHK flats Noida",
    "2 BHK ready to move Noida",
    "3 BHK ready to move Noida",
    "2 BHK apartments Greater Noida",
    "3 BHK apartments Greater Noida",
    "2 BHK apartments Gurugram",
    "3 BHK apartments Gurugram",
    
    // Property Status Keywords
    "ready to move property NCR",
    "ready to move apartments Noida",
    "ready to move flats Noida",
    "ready to move property Greater Noida",
    "under construction property Noida",
    "pre-launch property investment",
    "pre-launch property Noida",
    "pre-launch property Greater Noida",
    "new launch property NCR",
    "upcoming projects Noida",
    "upcoming projects Greater Noida",
    
    // Investment & ROI Keywords
    "property investment consultant NCR",
    "high-value property investment",
    "property ROI strategy",
    "property investment Noida",
    "property investment Greater Noida",
    "best investment property NCR",
    "property investment returns NCR",
    "real estate investment NCR",
    "property investment advisory",
    
    // Service-based Keywords
    "bespoke lifestyle curation",
    "investment security NCR",
    "AI-powered property intelligence",
    "end-to-end transaction security",
    "legal property verification NCR",
    "property documentation NCR",
    "property legal verification",
    "property due diligence NCR",
    
    // NRI & Specialized Services
    "NRI property services NCR",
    "NRI property consultant Noida",
    "global Indian property investment",
    "remote property management",
    "NRI property investment NCR",
    "overseas property investment",
    
    // Builder & Developer Keywords
    "top builders Noida",
    "reputed builders Noida",
    "RERA registered builders Noida",
    "best developers Noida",
    "luxury builders NCR",
    "premium developers NCR",
    
    // Connectivity & Infrastructure Keywords
    "property near metro Noida",
    "metro connectivity property Noida",
    "property near expressway Noida",
    "property near airport Noida",
    "property near Jewar Airport",
    "property near Golf Course Noida",
    "property near schools Noida",
    "property near hospitals Noida",
    
    // Price Range Keywords
    "affordable property Noida",
    "budget property Noida",
    "premium property Noida",
    "luxury property Noida",
    "high-end property NCR",
    "property under 1 crore Noida",
    "property under 2 crore Noida",
    
    // Market Intelligence Keywords
    "real estate market intelligence",
    "property market analysis NCR",
    "real estate trends NCR",
    "property price trends Noida",
    "real estate market report NCR",
    
    // Arihant Abode Project Keywords
    "Arihant Abode",
    "Arihant Abode Greater Noida West",
    "Arihant Abode Sector 10",
    "Arihant Abode 2 BHK",
    "Arihant Abode 3 BHK",
    "Arihant Abode apartments",
    "Arihant Abode price",
    "Arihant Abode possession March 2026",
    "Arihant Abode RERA UPRERAPRJ15792",
    "Luxury apartments Greater Noida West",
    "Ready to Move apartments Noida Extension",
    "2 BHK flats Greater Noida West",
    "3 BHK flats Greater Noida West",
    "Affordable luxury flats Noida Extension",
    "Arihant Group Noida",
    "Arihant Abode 1020–1270 sq.ft flats",
    "Arihant Abode 1020 sq.ft 2 BHK",
    "Arihant Abode 1270 sq.ft 3 BHK",
    "Arihant Abode project amenities",
    "Arihant Abode swimming pool",
    "Arihant Abode gym",
    "Arihant Abode kids zone",
    "Arihant Abode 24/7 security gated community",
    "Arihant Abode central green area",
    "Arihant Abode open space",
    "Arihant Abode close to Noida Expressway",
    "Arihant Abode near Gaur City Mall",
    "Arihant Abode cross-ventilated apartments",
    "Arihant Abode high ceiling homes",
    "Arihant Abode wellness facilities",
    "Arihant Abode tennis courts",
    "Arihant Abode kids play area",
    "Arihant Abode good connectivity Noida Metro",
    "Arihant Abode ready to move flats Noida Extension",
    "Arihant Abode investment property Greater Noida",
    "Noida Extension apartments for sale",
    "Greater Noida West real estate",
    "Noida West 2 BHK flats",
    "Noida West 3 BHK apartments",
    "Real estate investment Noida Extension",
    "Affordable housing Noida West",
    "Ready possession flats Noida Extension",
    "Flats with amenities in Noida West",
    "Gated community apartments Noida",
    "Flats near Noida Expressway",
    
    // Real Estate Consulting & Advisory Keywords
    "Real estate consulting firm",
    "Property advisory services",
    "Real estate consultancy india",
    "Property investment consulting",
    "Real estate advisory services",
    "Residential real estate consultancy",
    "Real estate consulting company",
    "Real estate experts",
    "Real estate consultant Greater Noida",
    "Property advisor Greater Noida West",
    "Real estate consultancy Delhi NCR",
    "Flats consultancy Noida Extension",
    "Property advisor near me",
    "Real estate consultant Delhi",
    "Housing consultant NCR",
    "Property consultant Techzone 4",
    "Real estate investment guidance",
    "Best property investment in Greater Noida",
    "ROI property consultant in Noida",
    "Real estate market analysis Delhi",
    "Long-term real estate investment",
    "Investment advisory real estate",
    "How to choose a real estate consultant",
    "Affordable flats consultancy",
    "Tips for buying property in Delhi NCR",
    "Guide to investing in Greater Noida West",
    "Best locations for investment in Noida",
    "First-time home buyer guidance India",
    "Luxury apartments consultancy",
    "Residential projects Greater Noida West",
    "Gated community consultant NCR",
    "Under-construction flats advice",
    "Ready-to-move projects consultancy",
    
    // Additional Competitor Keywords
    "property consultant near me",
    "real estate agent near me",
    "property dealer near me",
    "best property consultant in Noida",
    "best real estate agent Noida",
    "trusted property advisor NCR",
    "reliable property consultant Noida",
    "verified property dealer NCR",
    "certified property consultant",
    "licensed real estate agent NCR",
  ],
  authors: [{ name: "Celeste Abode" }],
  creator: "Celeste Abode",
  publisher: "Celeste Abode",
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
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.celesteabode.com",
    siteName: "Celeste Abode",
    title: "Luxury Real Estate NCR | Investment Advisory | Celeste Abode",
    description:
      "Luxury real estate consulting in Noida, Gurugram, and Delhi NCR. Data-driven property investment advisory with RERA compliance. Expert guidance for luxury apartments and high-value investments.",
    images: [
      {
        url: "/propertyhero.avif",
        width: 1200,
        height: 630,
        alt: "Celeste Abode - Luxury Real Estate Consulting in NCR",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Luxury Real Estate NCR | Investment Advisory | Celeste Abode",
    description:
      "Luxury real estate consulting in Noida, Gurugram, and Delhi NCR. Data-driven property investment advisory with RERA compliance. Expert guidance for luxury apartments and high-value investments.",
    images: ["/propertyhero.avif"],
    creator: "@celesteabode",
  },
  alternates: {
    canonical: "https://www.celesteabode.com",
  },
  category: "Real Estate",
  classification: "Real Estate Consulting",
  other: {
    "geo.region": "IN-UP",
    "geo.placename": "Noida",
    "geo.position": "28.5355;77.3910",
    "ICBM": "28.5355, 77.3910",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="dns-prefetch" href="https://elfsightcdn.com" />
        
        {/* Preload critical resources */}
        <link rel="preload" href="/propertyhero.avif" as="image" type="image/avif" />
        <link rel="preload" href="/hero.avif" as="image" type="image/avif" />
        
        {/* Additional SEO Meta Tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="language" content="en" />
        <meta name="revisit-after" content="7 days" />
        <meta name="author" content="Celeste Abode" />
        <meta name="copyright" content="Celeste Abode" />
        <meta name="theme-color" content="#0B1020" />
        <meta name="format-detection" content="telephone=yes" />
        
        {/* Geographic Meta Tags */}
        <meta name="geo.region" content="IN-UP" />
        <meta name="geo.placename" content="Noida" />
        <meta name="geo.position" content="28.5355;77.3910" />
        <meta name="ICBM" content="28.5355, 77.3910" />
        
        {/* Business Information */}
        <meta name="contact" content="support@celesteabode.com" />
        <meta name="coverage" content="Worldwide" />
        <meta name="distribution" content="Global" />
        <meta name="rating" content="General" />
        
        {/* Favicon */}
        <link rel="icon" href="/logoceleste.ico" type="image/x-icon" />
        <link rel="shortcut icon" href="/logoceleste.ico" type="image/x-icon" />
        <link rel="apple-touch-icon" href="/logoceleste.ico" sizes="180x180" />
        <meta name="msapplication-TileImage" content="/logoceleste.ico" />
        <meta name="msapplication-TileColor" content="#000000" />
      </head>
      <body className={`${inter.variable} ${poppins.variable} antialiased`}>
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
