# Puerto Rico Insurance Observatory

Analytical platform built on the OCS (Oficina del Comisionado de Seguros) Annual Financial Reports of Insurers, NAIC Annual Statements, and CMS public data. Full Year 2025 and 2024 baselines, CMS 2026 and CY2027 context.

Powered by ePAC. Contact: elliotpac@gmail.com

## Structure

| Path | Purpose |
| --- | --- |
| `index.html` | Single-page application: styles, markup, data, and rendering logic. |
| `assets/chart.umd.min.js` | Chart.js 4.4.4 (UMD build), vendored so the site has no runtime CDN dependency. |
| `favicon.svg` | Site icon. |
| `.github/workflows/pages.yml` | Deploys the site to GitHub Pages on every push to `main`. |
| `.nojekyll` | Disables Jekyll processing on GitHub Pages. |

Typography is loaded from Google Fonts (Inter, Fraunces, Plus Jakarta Sans) with system fallbacks.

## Local preview

The site is static. Open `index.html` directly, or serve the folder:

```bash
python3 -m http.server 8000
# then open http://localhost:8000/
```

## Deployment

Pushes to `main` (or, until the default branch is renamed, to `claude/great-ptolemy-slaw15`) trigger the GitHub Pages workflow. The published URL is
`https://<owner>.github.io/<repository>/` unless a custom domain is configured under
Settings, Pages.

If the first run fails with a Pages permissions error, enable Pages once under
Settings, Pages, with "GitHub Actions" as the source, then re-run the workflow.

## Provenance

This site was migrated from a Manus-hosted deployment. The migration removed the
Manus editor runtime, Manus PWA manifest, and Plausible analytics; the application
markup, data, and logic are unchanged.

## Disclaimer

Analytical platform. Not a legal conclusion, audit opinion, actuarial certification, or regulatory finding.
