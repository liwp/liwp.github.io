# lauripesonen.com

Personal resume site, built with [Astro](https://astro.build) and [GSAP](https://gsap.com).
Deployed to GitHub Pages via `.github/workflows/deploy.yml` on every push to `master`
(set the repository's Pages source to **GitHub Actions** once, in Settings → Pages).

## Editing content

All copy lives in [`src/data/resume.ts`](src/data/resume.ts) — jobs, education,
skills, projects, links. The current entries are **dummy data**; replace them
with real ones and the components pick them up automatically.

## Development

```sh
npm install
npm run dev       # local dev server at localhost:4321
npm run build     # static build into dist/
npm run preview   # serve the production build locally
```

## Structure

- `src/pages/index.astro` — the single page, composed of section components
- `src/components/` — Hero, Experience, Education, Skills, Projects, Contact
- `src/layouts/Base.astro` — head, fonts, CRT chrome (scanlines, vignette, status bar)
- `src/scripts/main.ts` — GSAP animations (scramble text, terminal print reveals, gauges)
- `src/styles/global.css` — design tokens and shared styles
- `public/CNAME` — custom domain for GitHub Pages
