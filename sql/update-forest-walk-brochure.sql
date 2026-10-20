-- Update brochure_url for Forest Walk Villa
UPDATE properties
SET brochure_url = 'https://ebvzwbuigaaevkblmgcs.supabase.co/storage/v1/object/public/Celesta_Abode/FORESTWALK%20IN%20GHAZIABAD_compressed_compressed_compressed.pdf?download=forestwalk_villa_brochure.pdf'
WHERE slug = 'forest-walk-villa';

-- Verify the update
SELECT slug, project_name, brochure_url 
FROM properties 
WHERE slug = 'forest-walk-villa';

