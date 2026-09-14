# Puerto Rico Insurance Observatory

Analytical platform built on the OCS (Oficina del Comisionado de Seguros) Annual Financial Reports of Insurers, NAIC Annual Statements, and CMS public data. Full Year 2025 and 2024 baselines, CMS 2026 and CY2027 context.

Powered by ePAC. Contact: elliotpac@gmail.com

## Structure

| Path | Purpose |
| --- | --- |
| `index.html` | Single-page application: styles, markup, data, and rendering logic. |
| `assets/chart.umd.min.js` | Chart.js 4.4.4 (UMD build), vendored so the site has no runtime CDN dependency. |
| `favicon.svg` | Site icon. |
| `.github/workflows/pages.yml` | Publishes the site to the `gh-pages` branch on every push to `main`; GitHub Pages serves that branch. |
| `.nojekyll` | Disables Jekyll processing on GitHub Pages. |

Typography is loaded from Google Fonts (Inter, Fraunces, Plus Jakarta Sans) with system fallbacks.

## Local preview

The site is static. Open `index.html` directly, or serve the folder:

```bash
python3 -m http.server 8000
# then open http://localhost:8000/
```

## Deployment

Live site: https://epac-hub.github.io/PR-Insurance-Observatory/

Pushes to `main` (or, until the default branch is renamed, to `claude/great-ptolemy-slaw15`)
run the workflow, which copies the repository root (minus `.github`, `README.md`, and
`.gitignore`) into the `gh-pages` branch. GitHub Pages is configured to deploy from that
branch, so the site updates within a minute or two of each run. Do not edit `gh-pages` by
hand; it is overwritten on every deploy.

## Provenance

This site was migrated from a Manus-hosted deployment. The migration removed the
Manus editor runtime, Manus PWA manifest, and Plausible analytics; the application
markup, data, and logic are unchanged.

## Disclaimer

Analytical platform. Not a legal conclusion, audit opinion, actuarial certification, or regulatory finding.
