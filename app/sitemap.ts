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

  // Fetch published locations from locations_v2
  const { data: locationsData, error: locationsError } = await supabase
    .from('locations_v2')
    .select('id, slug, updated_at')
    .eq('is_published', true);

  if (locationsError) {
    console.error('Error fetching locations for sitemap:', locationsError);
  }

  const locationPages: MetadataRoute.Sitemap = (locationsData || []).map((location) => ({
    url: `${SITE_URL}/properties-in-${location.slug}`,
    lastModified: location.updated_at ? new Date(location.updated_at) : new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Fetch published properties from properties_v2
  // Only include properties that have a valid location_id
  const { data: propertiesData, error: propertiesError } = await supabase
    .from('properties_v2')
    .select('id, slug, location_id, updated_at')
    .eq('is_published', true)
    .not('location_id', 'is', null);

  if (propertiesError) {
    console.error('Error fetching properties for sitemap:', propertiesError);
  }

  // Get unique location IDs from properties
  const locationIds = [...new Set((propertiesData || []).map(p => p.location_id).filter(Boolean))];
  
  // Fetch location slugs for all property location_ids
  const { data: locationSlugsData } = await supabase
    .from('locations_v2')
    .select('id, slug')
    .in('id', locationIds)
    .eq('is_published', true);

  // Create a map of location_id -> slug for quick lookup
  const locationSlugMap = new Map(
    (locationSlugsData || []).map(loc => [loc.id, loc.slug])
  );

  // Generate property URLs with resolved location slugs
  // Only include properties where we can resolve the location slug
  const propertyPages = (propertiesData || [])
    .map((property) => {
      if (!property.location_id) {
        console.warn(`Property ${property.id} (slug: ${property.slug}) has no location_id - excluding from sitemap`);
        return null;
      }

      const locationSlug = locationSlugMap.get(property.location_id);
      if (!locationSlug) {
        console.warn(`Property ${property.id} (slug: ${property.slug}) has location_id ${property.location_id} that cannot be resolved to a slug - excluding from sitemap`);
        return null;
      }

      return {
        url: `${SITE_URL}/properties-in-${locationSlug}/${property.slug}`,
        lastModified: property.updated_at ? new Date(property.updated_at) : new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      };
    })
    .filter((entry): entry is MetadataRoute.Sitemap[0] => entry !== null);

  // Combine all pages and ensure no duplicates by URL
  const allPages = [...staticPages, ...locationPages, ...propertyPages];
  const uniquePages = Array.from(
    new Map(allPages.map(page => [page.url, page])).values()
  );

  return uniquePages;
}

