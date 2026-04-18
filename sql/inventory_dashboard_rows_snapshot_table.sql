-- Snapshot table: same columns as public.property_inventory_dashboard_rows (the view).
-- Step 1: create empty table with inferred schema from the view.
-- Step 2: load all current rows from the view.
--
-- Re-running replaces the snapshot (DROP + recreate empty + INSERT). Does not alter
-- properties_v2 or property_listing_configurations.

DROP TABLE IF EXISTS public.property_inventory_dashboard_rows_snapshot;

CREATE TABLE public.property_inventory_dashboard_rows_snapshot AS
SELECT *
FROM public.property_inventory_dashboard_rows
WITH NO DATA;

COMMENT ON TABLE public.property_inventory_dashboard_rows_snapshot IS
  'Copy of property_inventory_dashboard_rows view; refresh by re-running this script.';

INSERT INTO public.property_inventory_dashboard_rows_snapshot
SELECT *
FROM public.property_inventory_dashboard_rows;
