-- Replace the inventory dashboard view with the physical snapshot table.
-- Prerequisites: public.property_inventory_dashboard_rows_snapshot exists and is populated
-- (see inventory_dashboard_rows_snapshot_table.sql). The view must still exist under
-- public.property_inventory_dashboard_rows.
--
-- After this script: relation public.property_inventory_dashboard_rows is a TABLE, not a VIEW.
-- Re-running fails if the snapshot was already renamed; restore from backup or recreate snapshot.

DROP VIEW IF EXISTS public.property_inventory_dashboard_rows;

ALTER TABLE public.property_inventory_dashboard_rows_snapshot
  RENAME TO property_inventory_dashboard_rows;

COMMENT ON TABLE public.property_inventory_dashboard_rows IS
  'Flattened ops lines for GET /api/property-listings; published projects only; line_id null when no PLC rows. Former view replaced by snapshot table.';
