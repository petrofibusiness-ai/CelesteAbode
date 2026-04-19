# April 2026 — Maintenance & client handover

*Consolidated handover for **April 2026** work: **admin panel** (role-based access, properties tooling), **two inventory experiences** (internal data entry vs admin read-only pitch sheet), **pricing display**, and **security / indexing** behaviour. For the long-running numbered engineering log, see **`MAINTENANCE_UPDATES.md`**.*

---

## 1. At a glance — three pieces to remember

| Piece | Who uses it | URL / entry | Role |
|--------|-------------|-------------|------|
| **Internal inventory (data entry)** | Ops / data team | **`/ca-internal-inventory-v1`** | **Edit** published lines (configurations, sizes, prices in crore text, towers, possession) via unlock + save; uses **`/api/property-listings/*`**. |
| **Admin — Published inventory (read-only)** | Sales / anyone on outreach | **`/admin/inventory`** (after **admin login**) | **Read-only** call sheet: same published data, formatted for calls; uses **`/api/admin/inventory-dashboard`**. |
| **Admin — rest of panel** | Support vs leads staff | **`/admin/*`** | **Role-based:** full CMS vs leads + inventory only (see §2). |

---

## 2. Role-based admin access (two tiers)

### Policy

| Tier | Email rule | What they can open |
|------|------------|-------------------|
| **Full admin** | JWT **`email`** equals **`support@celesteabode.com`** (constant **`SUPPORT_ADMIN_EMAIL`**) | All admin routes: **Dashboard**, **Leads**, **Locations**, **Properties** (list / new / edit), **Inventory**. |
| **Leads / sales staff** | Any **other** admin user who can log in | **`/admin/leads`** (and subpaths) and **`/admin/inventory`** (and subpaths) **only**. Any other **`/admin/*`** path is redirected to **`/admin/leads`**. |

### Where it is enforced

| Layer | File | Behaviour |
|--------|------|-----------|
| **Server (first line of defence)** | **`middleware.ts`** | For **`/admin`** except **`/admin/login`**: reads **`sb-access-token`** cookie, decodes JWT payload for **`email`**. No email → **`/admin/login`**. Email ≠ support → only **`/admin/leads`** and **`/admin/inventory`** allowed; else **302** to **`/admin/leads`**. |
| **Client (matches server)** | **`app/admin/layout.tsx`** | After **`GET /api/admin/auth/session`**, same rule: **`router.replace('/admin/leads')`** if leads-only user is on a disallowed path. |
| **Post-login landing** | **`app/admin/login/page.tsx`** | Support user → **`/admin`**; everyone else → **`/admin/leads`**. |
| **Sidebar** | **`components/admin/admin-sidebar.tsx`** | Prop **`leadsOnly`**: **Leads** + **Inventory** only for non-support; full nav for support. |

### API note

- **`lib/admin-auth-guard.ts`** (and per-route **`getCurrentUser`**) require an **authenticated admin session** (401 if missing).
- **Fine-grained “support only” checks are not applied on every admin API** by email today — **route access for non-support users is primarily enforced on admin UI URLs** via middleware + layout. Tighten per-route role checks later if product requires it.

### Search engines & caching (admin)

- **`middleware.ts`** sets **`X-Robots-Tag: noindex, nofollow, noarchive, nosnippet`** and **`Cache-Control: no-store…`** for **`/admin`** and **`/api/admin`** responses.
- **`app/admin/layout.tsx`** injects **`noindex, nofollow`** (and **`googlebot`**) on the authenticated shell (**`/admin/login`** excluded).

---

## 3. Internal inventory — **data entry** (`/ca-internal-inventory-v1`)

### Purpose

- **Excel-style** view of **published** projects from Supabase.
- Each **project** (`properties_v2`) has many **configuration lines** in **`property_listing_configurations`** (BHK label, size sq ft, price in Cr text, sort order).
- Header fields **Towers** and **Possession** map to **`properties_v2.inventory_towers`** and **`properties_v2.possession_date`** (shared with other admin flows).

### Key files

| Area | Path |
|------|------|
| Page | **`app/ca-internal-inventory-v1/page.tsx`** |
| List UI | **`components/property-listings/property-listings-view.tsx`** |
| Editable table / cards | **`components/property-listings/property-listing-table.tsx`** |
| Skeleton | **`components/property-listings/property-listings-skeleton.tsx`** |
| Full technical spec | **`docs/internal-inventory-dashboard.md`** |

### Data flow (short)

1. **Load:** **`GET /api/property-listings`** → `items`, `pagination`, **`editModeAvailable`** (true only if server env **`PROPERTY_LISTINGS_EDIT_SECRET`** is set).
2. **Edit:** User enters edit key (stored in **`sessionStorage`**); table enables saves.
3. **Save:** **PATCH** property header → per-line **PATCH** / **POST** / **DELETE** on **`/api/property-listings/configurations/*`** and related routes (see doc §6).

### Security / ops reminders

- Page metadata: **`robots: noindex`**; **`middleware.ts`** adds strong **`X-Robots-Tag`** + **`no-store`** for **`/ca-internal-inventory-v1`** — still treat URL as **private** (network / VPN / access control as you require).
- **Never** ship the edit **secret** to client bundles; only **`editModeAvailable`** reflects whether writes are possible.
- DB: view/table **`property_inventory_dashboard_rows`**, tables **`property_listing_configurations`**, **`properties_v2`** — SQL under **`sql/`** (see internal doc §5–7).

---

## 4. Admin — **Published inventory** (read-only pitch sheet)

### Purpose

- Same **published** configuration data as the internal tool, but **no editing** — built for **calls and in-person pitches** (non-technical readers).
- **Not** a replacement for **`/ca-internal-inventory-v1`** or **`/admin/properties`**.

### URL & auth

| Item | Detail |
|------|--------|
| **URL** | **`/admin/inventory`** |
| **Auth** | Normal **admin session** cookie; **401** → **`/admin/login`**. |
| **Leads-only users** | Allowed here (same as **Leads**); see §2. |

### Implementation

| Item | Path |
|------|------|
| UI | **`app/admin/inventory/page.tsx`** |
| API | **`GET`** **`app/api/admin/inventory-dashboard/route.ts`** (`requireAdminAuth`, Supabase **`property_inventory_dashboard_rows`**) |
| Shared processing | **`lib/inventory-dashboard-rows.ts`** (filters, grouping by property, location slugs, caps, timeout) |
| Locations filter | **`GET /api/admin/locations`** |

### UX highlights (April polish)

- **Header / filters:** “Published inventory”, **Layers** icon, **Filters** (debounced search + location), **Refresh**.
- **Cards:** **#** rail, **project name**, **View page** (live listing via **`getPropertyUrl`**, new tab), **location**, optional **towers / possession**; **no slug** under title.
- **Table:** **Variant** (exact CMS line), **Size (sq ft)**, **Price (₹)** with clear **grid borders**.
- **Grouping:** Similar **BHK families** under one **gold band** title (e.g. **3 BHK** + **3 BHK + Study**). **Decimal-safe** parsing so **3.5 BHK** is not mis-bucketed as **5 BHK**. Zebra rows inside each project.
- **Pagination:** **`PropertyGridPagination`** at bottom when needed; inline “total matching / page X of Y” summary **removed** by design.
- **View page** button: strong gold styling; **hover** keeps **dark text** (overrides default outline theme).

---

## 5. Pricing — full **₹** display on inventory surfaces

- **Library:** **`lib/property-listings-price.ts`** — **`formatInventoryPriceCrDisplay`**, **`formatIndianRupeeInteger`**, **`hasCroreNumberToken`**, etc.
- Converts **crore-style numeric tokens** in stored text to **Indian-grouped rupees** (supports **ranges**; strips redundant **“Cr”**; puts leftover words in parentheses where applicable).
- **Admin inventory** table and **internal** **`property-listing-table`** use this for display / preview; **CMS still stores** the underlying **`price_cr`** text as before.

---

## 6. Related admin work (same programme of record)

These items are captured in more detail (with global numbering) in **`MAINTENANCE_UPDATES.md`** under **March 2026**; they belong to the **same admin / inventory programme** and should be read together for handover:

- **Admin properties — price fields:** **`price_min` / `price_max`** (bigint) + **`price_unit`**, validation, admin form + API (**items ~136–138** in that log).
- **Admin properties list:** **Numbered pagination** (20 per page), loaders, re-fetch behaviour (**~item 162**).
- **Inventory dashboard API refactor** and **`line_id` nullable** / all-published SQL narrative appear in **git history** and **`docs/internal-inventory-dashboard.md`**; wire **Supabase** per error hints on first deploy.

---

## 7. Checklist for ops / new engineers

- [ ] **Supabase:** `property_inventory_dashboard_rows` + **`property_listing_configurations`** migrations applied as in repo **`sql/`**.
- [ ] **Internal edits:** **`PROPERTY_LISTINGS_EDIT_SECRET`** set in production if edit mode should work on **`/ca-internal-inventory-v1`**.
- [ ] **Admin users:** Confirm who is **`support@celesteabode.com`** (full access) vs leads-only logins.
- [ ] **Training:** Data entry → **internal inventory**; calls / pitch → **`/admin/inventory`** after login.

---

## 8. Doc hygiene

| File | Use |
|------|-----|
| **`MAINTENANCE_APRIL.md`** | This narrative — April **admin + inventory** handover. |
| **`MAINTENANCE_UPDATES.md`** | Chronological numbered log (March block includes related admin bullets **214–221** and property list **162**). |
| **`docs/internal-inventory-dashboard.md`** | Deep technical reference for **internal** inventory APIs and schema. |
