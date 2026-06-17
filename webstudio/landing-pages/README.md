# Custom landing pages

Two standalone landing pages ported from Lovable projects and hosted on
improveitmd.com as native React Router routes:

| URL | Source |
|-----|--------|
| `/community` | `community/route.tsx` ("CFE Community Connect") |
| `/roofing/slate-roofing` | `slate-roofing/route.tsx` ("Slate Roofing Page") |

This directory is the **source of truth**. The pages are injected into the
generated app on every deploy, because `webstudio build` wipes `app/routes/`
and `public/`.

## Why injection (not just editing app/routes)

`deploy.sh` runs `webstudio sync && webstudio build`, which regenerates
`app/routes/`, `app/__generated__/`, and `public/` from the Webstudio cloud
project. Anything placed there directly is lost. So — like every other
customization in `scripts/inject-*.cjs` — these pages are re-applied **after**
the build by `scripts/inject-landing-pages.cjs` (deploy.sh "Step 4h", last in
the inject chain so the canonical/schema/tracking patches don't touch them).

## Layout

```
landing-pages/
  community/route.tsx              # /community page (self-contained header+footer)
  slate-roofing/route.tsx          # /roofing/slate-roofing page
  slate-roofing/SiteHeader.tsx     # rebranded Capitol Improvements header
  slate-roofing/SiteFooter.tsx     # rebranded footer
  styles/community.input.css       # Tailwind v4 input (tokens + @source globs)
  styles/community.css             # COMPILED output (committed, bundled by the app build)
  styles/slate-roofing.input.css
  styles/slate-roofing.css         # COMPILED output (committed)
  assets/community/*               # re-hosted images/video  -> public/landing/community/
  assets/slate/*                   # re-hosted images        -> public/landing/slate/
  tailwind/build-css.sh            # offline CSS compile (NOT in the deploy path)
```

The injector copies route files into `app/routes/`, helper components + compiled
CSS into `app/landing/` (kept out of `app/routes/` so flatRoutes doesn't route
them), and assets into `public/landing/`.

## How they work

- Ported from TanStack Start to React Router v7: `createFileRoute().head()` →
  `meta` + `links` exports; each route renders its own `<body>` +
  `<ScrollRestoration/>` + `<Scripts/>` (the Webstudio `root.tsx` only renders
  `<html><head/><Outlet/></html>`).
- Styling is **pre-compiled** Tailwind v4, scoped per route via the `links()`
  stylesheet export, so Tailwind preflight + utilities load **only** on these
  two routes and never leak into the rest of the site (verified: neither page
  pulls the 101 KB webstudio `index.css`).
- GTM/analytics are inherited automatically from the root `<CustomCode/>`.
- Only runtime dep added to the app: `lucide-react` (Community icons).

## Editing a page

1. Edit the `.tsx` (and/or `SiteHeader`/`SiteFooter`).
2. Recompile the CSS (Tailwind only emits classes it sees in the source):
   ```bash
   cd landing-pages && npm run build:css      # or: bash tailwind/build-css.sh
   ```
3. Commit the `.tsx` **and** the regenerated `styles/*.css`.
4. Deploy normally — `inject-landing-pages.cjs` does the rest.

To preview locally without a full deploy:
```bash
node scripts/inject-landing-pages.cjs && npm run build && PORT=3999 npm run start
# then curl http://127.0.0.1:3999/community and /roofing/slate-roofing
```

## Assets

Re-hosted from the original Lovable CDN (their `/__l5e/...` URLs don't resolve
on improveitmd.com). Large JPEGs were re-encoded (≤1920px, q80) and the 1.7 MB
hero PNG converted to WebP — total ~12 MB → ~4 MB. To re-optimize, drop new
originals in `assets/` and re-run the sharp step (see git history of this dir).
