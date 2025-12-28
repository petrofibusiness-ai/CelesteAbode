import { MetadataRoute } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.celesteabode.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Default rule for all crawlers
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',      // Admin panel - private
          '/api/',        // API routes - not for indexing
          '/_next/',      // Next.js internal files
        ],
      },
      {
        // Google-specific rules (more permissive for better indexing)
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/admin/',
          '/api/',
        ],
      },
      {
        // Bing-specific rules
        userAgent: 'Bingbot',
        allow: '/',
        disallow: [
          '/admin/',
          '/api/',
        ],
      },
      {
        // Yandex (Russian search engine)
        userAgent: 'Yandex',
        allow: '/',
        disallow: [
          '/admin/',
          '/api/',
        ],
      },
      {
        // Baidu (Chinese search engine)
        userAgent: 'Baiduspider',
        allow: '/',
        disallow: [
          '/admin/',
          '/api/',
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}

