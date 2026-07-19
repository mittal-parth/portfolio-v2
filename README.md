# Parth Mittal — Canvas Portfolio

Personal portfolio with two switchable layouts: **Canvas** (full-page cutting mat) and **Clean** (paper site + one mat section).

## Stack

- Next.js 16 (App Router) + React 19
- Tailwind CSS v4
- pnpm (required)

## Getting started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). Use the **Canvas / Clean** toggle in the nav to compare layouts.

## Environment

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## Content

- Live data: `src/data/portfolio.ts`
- Reference export: `index.js`
- Images: `public/assets/`

## Scripts

- `pnpm dev` — development server
- `pnpm build` — production build
- `pnpm start` — serve production build
- `pnpm lint` — ESLint
