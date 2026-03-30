import { MetadataRoute } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.celesteabode.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Default rule for all crawlers
        userAgent: '*',
        allow: [
          '/',
          '/properties-in-*',  // Explicitly allow all location and property pages
        ],
        disallow: [
          '/admin/',      // Admin panel - private
          '/api/',        // API routes - not for indexing
          '/_next/',      // Next.js internal files
          '/ca-internal-inventory-v1',
        ],
      },
      {
        // Google-specific rules (more permissive for better indexing)
        userAgent: 'Googlebot',
        allow: [
          '/',
          '/properties-in-*',  // Explicitly allow all location and property pages
        ],
        disallow: [
          '/admin/',
          '/api/',
          '/ca-internal-inventory-v1',
        ],
      },
      {
        // Bing-specific rules
        userAgent: 'Bingbot',
        allow: [
          '/',
          '/properties-in-*',  // Explicitly allow all location and property pages
        ],
        disallow: [
          '/admin/',
          '/api/',
          '/ca-internal-inventory-v1',
        ],
      },
      {
        // Yandex (Russian search engine)
        userAgent: 'Yandex',
        allow: [
          '/',
          '/properties-in-*',  // Explicitly allow all location and property pages
        ],
        disallow: [
          '/admin/',
          '/api/',
          '/ca-internal-inventory-v1',
        ],
      },
      {
        // Baidu (Chinese search engine)
        userAgent: 'Baiduspider',
        allow: [
          '/',
          '/properties-in-*',  // Explicitly allow all location and property pages
        ],
        disallow: [
          '/admin/',
          '/api/',
          '/ca-internal-inventory-v1',
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}

