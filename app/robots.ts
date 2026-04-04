import { MetadataRoute } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.celesteabode.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/properties-in-*',
        ],
        disallow: [
          '/admin/',
          '/api/',
          '/_next/',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: [
          '/',
          '/properties-in-*',
        ],
        disallow: [
          '/admin/',
          '/api/',
        ],
      },
      {
        userAgent: 'Bingbot',
        allow: [
          '/',
          '/properties-in-*',
        ],
        disallow: [
          '/admin/',
          '/api/',
        ],
      },
      {
        userAgent: 'Yandex',
        allow: [
          '/',
          '/properties-in-*',
        ],
        disallow: [
          '/admin/',
          '/api/',
        ],
      },
      {
        userAgent: 'Baiduspider',
        allow: [
          '/',
          '/properties-in-*',
        ],
        disallow: [
          '/admin/',
          '/api/',
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
