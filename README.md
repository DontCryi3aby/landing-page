# XT Technical Services — Next.js (App Router, SSR)

Port of the original single-file design to Next.js 16 with server rendering, EN/VI routes and a working contact form.

## Run

```bash
npm install
npm run dev          # http://localhost:3000
npm run build && npm start
```

## Structure

- `src/app/(site)/[lang]/…` — public pages: `/` · `/services` · `/services/[slug]` · `/projects` · `/about` · `/contact`
- `src/app/(admin)/admin/…` — admin (Vietnamese): overview, contact requests (status + notes), bilingual text editor with show/hide per section, project references, contact settings & default language
- `src/lib/content.ts` — default copy (EN/VI), services, projects, clients
- `src/lib/site.ts` — admin overrides (`data/site-content.json`) merged over the defaults
- `src/app/globals.css` — the original stylesheet
- `src/proxy.ts` — redirects unprefixed URLs to `/en` or `/vi` (cookie → default language from admin settings), Basic Auth for `/admin`
- `src/app/actions.ts` — contact-form server action; requests are saved to `data/requests.json`

## Environment

See `.env.example`:

- `NEXT_PUBLIC_SITE_URL` — public URL, used for canonical/hreflang, sitemap and OG
- `ADMIN_PASSWORD` — enables `/admin` (HTTP Basic Auth, user `admin`)
- `DATA_DIR` — folder for `requests.json` and `site-content.json` (default `./data`)

Requests and admin edits are stored on local disk, so deploy on a host with a persistent filesystem (VPS, Docker, Render disk…).
On serverless hosts (Vercel), replace `src/lib/requests-store.ts` with a database or email provider.

Public pages are prerendered; saving in `/admin` revalidates them on the fly.
