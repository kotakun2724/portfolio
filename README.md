# Portfolio (Astro + Tailwind) — Dark-first

## Local development

```sh
npm install
npm run dev
```

Open `http://localhost:4321`.

## Content editing (mock now, replace later)

- `src/content/profile.ts`: name/title/bio/links/skills
- `src/content/projects.ts`: projects list (featured + all)

## Pages

- `/` → `src/pages/index.astro`
- `/projects` → `src/pages/projects.astro`
- `/about` → `src/pages/about.astro`
- `/contact` → `src/pages/contact.astro`

## Vercel deploy

- Import this repo in Vercel
- Framework preset: **Astro**
- Build command: `npm run build`
- Output directory: `dist`

### Canonical / OG URL (recommended)

Set your site URL in `astro.config.mjs`:

- `site: 'https://your-domain.com'`

This will make canonical URLs and OG image URLs correct.

