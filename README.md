# Celeste Abode

Next.js site for Celeste Abode: public property pages, lead forms, and the admin panel.

## Run locally

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

Fill `.env.local` from `.env.example`. Setup notes live in `docs/setup/`.

## Scripts

- `pnpm dev` — local dev server
- `pnpm build` — production build
- `pnpm start` — serve the production build
- `pnpm lint` — Next.js lint

## Where things live

| Path | What it is |
|------|------------|
| `app/` | Pages and API routes. The folder path is the URL. |
| `components/` | UI, including `components/ui` and per-project folders |
| `lib/` | Auth, data, uploads, validation |
| `sql/` | Supabase SQL |
| `scripts/` | One-off maintenance scripts |
| `docs/setup/` | Environment, Supabase, R2, admin, leads |
| `docs/architecture/` | How pages, caching, and inventory fit together |
| `docs/security/` | Security notes from past reviews |
| `docs/seo/` | SEO audits and meta inventories |
| `docs/content/` | Page copy drafts |
| `docs/archive/` | Old status and maintenance notes |

Do not commit `.env.local` or real keys. Placeholders only belong in docs and `.env.example`.
