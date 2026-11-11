# MKP Technical Services — Next.js (App Router, SSR)

Port of the original single-file design to Next.js 16 with server rendering, EN/VI routes and a working contact form.

## Run

```bash
npm install
npm run dev          # http://localhost:3000
npm run build && npm start
```

## Structure

- `src/app/[lang]/…` — pages: `/` · `/services` · `/services/[slug]` · `/projects` · `/about` · `/contact` · `/requests` (admin)
- `src/lib/content.ts` — all copy (EN/VI), services, projects
- `src/app/globals.css` — the original stylesheet
- `src/proxy.ts` — redirects unprefixed URLs to `/en` or `/vi` (cookie → Accept-Language), Basic Auth for `/requests`
- `src/app/actions.ts` — contact-form server action; requests are saved to `data/requests.json`

## Environment

See `.env.example`:

- `NEXT_PUBLIC_SITE_URL` — public URL, used for canonical/hreflang, sitemap and OG
- `ADMIN_PASSWORD` — enables `/<lang>/requests` (user `admin`)
- `DATA_DIR` — folder for `requests.json` (default `./data`)

Requests are stored on local disk, so deploy on a host with a persistent filesystem (VPS, Docker, Render disk…).
On serverless hosts (Vercel), replace `src/lib/requests-store.ts` with a database or email provider.
