import { MetadataRoute } from 'next';
import { getSupabaseAdminClient } from '@/lib/supabase-server';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.celesteabode.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = getSupabaseAdminClient();
  
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/properties`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/philosophy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/services`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/vault`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/advisory-session`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/villa-in-noida`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/villas-in-greater-noida`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/villa-in-noida-extension`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/buy-villa-in-noida`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/plots-in-noida`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/plots-in-greater-noida`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  // Fetch published locations
  const { data: locationsData } = await supabase
    .from('locations')
    .select('slug, updated_at')
    .eq('is_published', true);

  const locationPages: MetadataRoute.Sitemap = (locationsData || []).map((location) => ({
    url: `${SITE_URL}/properties-in-${location.slug}`,
    lastModified: location.updated_at ? new Date(location.updated_at) : new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Fetch published properties
  const { data: propertiesData } = await supabase
    .from('properties')
    .select('slug, location_category, updated_at')
    .eq('is_published', true);

  const propertyPages: MetadataRoute.Sitemap = (propertiesData || []).map((property) => {
    const locationCategory = property.location_category || 'noida';
    return {
      url: `${SITE_URL}/properties-in-${locationCategory}/${property.slug}`,
      lastModified: property.updated_at ? new Date(property.updated_at) : new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    };
  });

  return [...staticPages, ...locationPages, ...propertyPages];
}

