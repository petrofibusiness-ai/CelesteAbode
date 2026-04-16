# Development log — April onward

**Purpose:** Running record of **new or changed development** after the main handover summary in `MAINTENANCE_UPDATES.md`. Add dated entries here when behavior or scope changes so the client and team have one place to look.

**How to update:** Append a new `## YYYY-MM-DD` or `## Month YYYY` block at the **top** (below this intro). Keep bullets factual: *what* changed, *where* (URL or area), *who it affects* (visitors, staff, SEO).

---

## April 2026 — baseline (already shipped)

### Role-based admin access

- **Two tiers:** After login, access depends on the **email** on the Supabase session JWT.
  - **`support@celesteabode.com`** — **full admin:** dashboard, leads, locations (list / create / edit), properties (list / create / edit).
  - **Any other** authenticated admin user — **leads only:** can open **`/admin/leads`** only; dashboard, locations, and properties are blocked on the server and hidden in the UI.
- **Where it is enforced**
  - **`middleware.ts`:** For any path under **`/admin`** except **`/admin/login`**, reads the `sb-access-token` cookie, decodes the JWT, and compares `email` (case-insensitive). No email → redirect to login. Email is not the support address → allow only **`/admin/leads`**; any other admin path redirects to **`/admin/leads`**.
  - **`app/admin/layout.tsx`:** After loading the session, non-support users are sent to **`/admin/leads`** if they land on another admin route; passes **`leadsOnly`** into the sidebar when email ≠ support.
  - **`app/admin/login/page.tsx`:** On successful login, **support** → **`/admin`**; **everyone else** → **`/admin/leads`**.
  - **`components/admin/admin-sidebar.tsx`:** When **`leadsOnly`** is true, navigation shows only **Leads**; full admin sees Dashboard, Leads, Locations, New Location, Properties, New Property.
- **Search engines:** Admin HTML responses get **`X-Robots-Tag: noindex, nofollow, …`** (and related cache headers) so internal tools are not indexed like marketing pages. The authenticated admin shell also injects noindex meta (login page excluded).

*Future notes:* If you add more roles or change the support email, update **`SUPPORT_ADMIN_EMAIL`** in **`middleware.ts`**, **`app/admin/layout.tsx`**, and **`app/admin/login/page.tsx`** together so server redirects and UI stay aligned.

---

### Internal inventory (private listing view)

- **URL:** **`/ca-internal-inventory-v1`** — implemented as **`app/ca-internal-inventory-v1/page.tsx`**. The path is intentionally **non-obvious**; share it only with trusted parties (see **`lib/private-property-listing-route.ts`** — `PRIVATE_PROPERTY_LISTING_PATH`).
- **What it is:** A **full-site style** page (header + footer) that renders **`PropertyListingsView`**: searchable, filterable **inventory table** with location/locality filters, text search, **price range slider**, pagination (**18** items per page in the current implementation), and related private-listing UX (e.g. session key for edit affordances where applicable). It is meant for **internal or partner** browsing, not the main public marketing catalogue.
- **Authentication:** **No login** is required to open this route in the current design — security is **obscurity of the URL** plus headers/metadata, not a password gate. Treat the link as confidential.
- **SEO / sitemap:** **Not** included in the public sitemap (`app/sitemap.ts` filters out this path and any URL containing **`ca-internal-inventory`**). Page metadata sets **`robots: noindex, nofollow`** (and related flags). **`middleware.ts`** adds strict **`X-Robots-Tag`** and **`Cache-Control: private, no-store`** for this path so crawlers and shared caches should not treat it as public content.

*Future notes:* If you rename the path, update **`PRIVATE_PROPERTY_LISTING_PATH`** and the middleware/sitemap string checks together. If you add login or IP allowlisting, document it here.

---

## Future entries

*(Add new dated sections above this line.)*
