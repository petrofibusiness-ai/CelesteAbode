import type React from "react";
import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { GoogleAnalytics } from "@/components/google-analytics";
import { FacebookPixel } from "@/components/facebook-pixel";
import "./globals.css";
import { Chatbot } from "@/components/chatbot";
import { ConsultationModalGlobal } from "@/components/consultation-modal-global";
import { validateEnv } from "@/lib/env-validation";

// Validate environment variables in production
if (process.env.NODE_ENV === 'production') {
  try {
    validateEnv();
  } catch (error) {
    console.error('Environment validation failed:', error);
    // In production, this should fail the build or startup
  }
}

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
  preload: true,
  adjustFontFallback: true,
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-poppins",
  preload: true,
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.celesteabode.com"),
  title: {
    default: "Trusted Real Estate Consultant for Properties in Delhi NCR",
    template: "%s",
  },
  description:
    "Guiding confident property decisions across Noida, Greater Noida, and Yamuna Expressway through data-backed analysis, RERA discipline, and local market expertise.",
  keywords: [
    "real estate consultant Delhi NCR",
    "property advisory Noida",
    "property investment advisory NCR",
    "RERA compliant property guidance",
    "Noida Greater Noida Yamuna Expressway properties",
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
    title: "Luxury Real Estate NCR | Investment Advisory",
    description:
      "Premium real estate consulting in Noida, Gurugram & Delhi NCR. Data-driven property investment advisory with RERA compliance. Expert guidance for luxury apartments & villas.",
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
    title: "Luxury Real Estate NCR | Investment Advisory",
    description:
      "Premium real estate consulting in Noida, Gurugram & Delhi NCR. Data-driven property investment advisory with RERA compliance. Expert guidance for luxury apartments & villas.",
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
    "geo.position": "28.6076655;77.4354885",
    "ICBM": "28.6076655, 77.4354885",
  },
  icons: {
    // Keep a root /favicon.ico for crawlers (Google SERP often expects this).
    icon: [
      { url: "/favicon.ico", sizes: "any", type: "image/x-icon" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/favicon_celeste/apple-touch-icon.png", sizes: "180x180" }],
    other: [{ rel: "manifest", url: "/favicon_celeste/site.webmanifest" }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#0B1020",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect only. Skip fonts.googleapis.com / fonts.gstatic.com — next/font (Inter, Poppins) adds them. */}
        <link rel="preconnect" href="https://elfsightcdn.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.celesteabode.com" />
        
        {/* Preload critical LCP image - highest priority - earliest possible - Mobile optimized */}
        <link rel="preload" href="/propertyhero.avif" as="image" type="image/avif" fetchPriority="high" />
        
        {/* Preload critical fonts - async load to prevent render blocking - Mobile optimized */}
        {/* Defer decorative fonts on mobile - only load on desktop */}
        <link rel="preload" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&display=swap" as="style" media="(min-width: 768px)" />
        {/* Load Satoshi font CSS asynchronously - prevents CSS chain blocking - Defer on mobile */}
        <link 
          rel="stylesheet" 
          href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,600,700&display=swap&text=CelesteAbodeRealEstateLuxuryPropertiesPhilosophyServicesContactBookConsultationMasterpiecesLivingExplorePropertiesWhatOurClientsSayGetInTouchOurPhilosophyServicesAtCelesteAbodeExplorePremiumProperties" 
          media="print"
          id="satoshi-font-stylesheet"
          suppressHydrationWarning
        />
        {/* Load Cormorant Garamond font CSS asynchronously - Desktop only */}
        <link 
          rel="stylesheet" 
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&display=swap" 
          media="print"
          id="cormorant-font-stylesheet"
          suppressHydrationWarning
        />
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                if (typeof window === 'undefined') return;
                // Load fonts asynchronously after initial render to prevent render blocking
                // Defer decorative fonts on mobile for better performance
                var isMobile = window.innerWidth < 768;
                var cormorantLink = document.getElementById('cormorant-font-stylesheet');
                var satoshiLink = document.getElementById('satoshi-font-stylesheet');
                
                // Load fonts after page is interactive
                if (document.readyState === 'loading') {
                  document.addEventListener('DOMContentLoaded', function() {
                    setTimeout(function() {
                      if (cormorantLink && !isMobile) {
                        requestAnimationFrame(function() {
                          cormorantLink.media = 'all';
                        });
                      }
                      if (satoshiLink && !isMobile) {
                        requestAnimationFrame(function() {
                          satoshiLink.media = 'all';
                        });
                      }
                    }, 100);
                  });
                } else {
                  setTimeout(function() {
                    if (cormorantLink && !isMobile) {
                      requestAnimationFrame(function() {
                        cormorantLink.media = 'all';
                      });
                    }
                    if (satoshiLink && !isMobile) {
                      requestAnimationFrame(function() {
                        satoshiLink.media = 'all';
                      });
                    }
                  }, 100);
                }
              })();
            `,
          }}
        />
        <noscript>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&display=swap" media="(min-width: 768px)" />
          <link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,600,700&display=swap&text=CelesteAbodeRealEstateLuxuryPropertiesPhilosophyServicesContactBookConsultationMasterpiecesLivingExplorePropertiesWhatOurClientsSayGetInTouchOurPhilosophyServicesAtCelesteAbodeExplorePremiumProperties" media="(min-width: 768px)" />
        </noscript>
        
        {/* Additional meta (viewport & geo come from root layout metadata/viewport export to avoid duplicates) */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="language" content="en" />
        <meta name="revisit-after" content="7 days" />
        <meta name="copyright" content="Celeste Abode" />
        <meta name="format-detection" content="telephone=yes" />
        
        {/* Business Information */}
        <meta name="contact" content="support@celesteabode.com" />
        <meta name="coverage" content="Worldwide" />
        <meta name="distribution" content="Global" />
        <meta name="rating" content="General" />
        
        {/* Search Engine Verification */}
        <meta name="msvalidate.01" content="B8F3AC31F09EF60F080EB603250077D8" />
        
        {/* Favicons: rendered by Next.js metadata.icons (single source of truth). */}
        <meta name="msapplication-TileImage" content="/favicon_celeste/android-chrome-192x192.png" />
        <meta name="msapplication-TileColor" content="#000000" />
      </head>
      <body className={`${inter.variable} ${poppins.variable} antialiased`} suppressHydrationWarning>
        {children}
        <Chatbot />
        <ConsultationModalGlobal />
        {/* Defer analytics to improve initial load performance - load after page is interactive */}
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                if (typeof window === 'undefined') return;
                // Defer analytics until after page load
                function loadAnalytics() {
                  // Analytics will be loaded by their respective components after page load
                }
                if (document.readyState === 'loading') {
                  window.addEventListener('load', loadAnalytics);
                } else {
                  setTimeout(loadAnalytics, 2000);
                }
              })();
            `,
          }}
        />
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        <FacebookPixel pixelId={process.env.NEXT_PUBLIC_FB_PIXEL_ID} />
        <Analytics />
      </body>
    </html>
  );
}
