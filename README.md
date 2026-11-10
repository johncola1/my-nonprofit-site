# Nonprofit website

A one-page site built with Next.js and Tailwind CSS.

## Edit the content
All text, contact details and links live in **`site.config.ts`**. Replace every `[BRACKETED]` value,
set `url` to your real web address, and set `email`. The About text, stats, programs and
"Get involved" cards are also in that file.

## Background image
The mountain scene at the top is an illustration drawn in code (`components/Landscape.tsx`).
To use a photo instead, put it in the `public` folder (e.g. `public/hero.jpg`) and set
`heroImage: "/hero.jpg"` in `site.config.ts`.

## Contact form
- **Out of the box:** submitting the form opens the visitor's email app with their message filled in.
- **Recommended:** create a free form at https://formspree.io (or a similar service), then paste its
  endpoint URL into `formEndpoint` in `site.config.ts`. Messages will then be emailed straight to you.

## Run locally
```bash
npm install
npm run dev     # http://localhost:3000
```

## Publish
The easiest host is Vercel (free for nonprofits/hobby use): push this folder to GitHub, import it at
vercel.com, and connect your domain. After launch, add the site in Google Search Console and submit
`https://your-domain/sitemap.xml`.
