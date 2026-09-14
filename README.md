# Puerto Rico Insurance Observatory

Analytical platform built on the OCS (Oficina del Comisionado de Seguros) Annual Financial Reports of Insurers, NAIC Annual Statements, and CMS public data. Full Year 2025 and 2024 baselines, CMS 2026 and CY2027 context.

Powered by ePAC. Contact: elliotpac@gmail.com

## Site architecture (phase 1, 2026-09-14)

Five sections replace the former fifteen tabs. Nothing in the data changed; the same figures are grouped by the question they answer.

| Section | Question | Contents |
| --- | --- | --- |
| Overview | How is the market doing and where is it heading? | Market at a glance, four trend cards |
| Insurers | Who is gaining, who is losing, and why? | Executive lede, four KPIs, one sortable table of the nine entities with a per-row drill-down (full statement, balance sheet, NAIC code, source PDFs); detailed analyses folded under expandable panels |
| Coverage | How is premium distributed by type of coverage? | Executive lede, OCS Planilla coverage-type analysis with year selector; statutory lines of business and derived segments folded |
| Federal Context | What changes from CMS, HRSA and the national carriers? | CMS enrollment, Star Ratings, CY2027 ratebook, HRSA shortage areas, SEC comparators |
| Data & Method | Where does each number come from and how do I verify it? | Sources, Methodology, Downloads, Validation |

Legacy anchors (`go('ratio')`, `go('lobb')`, `go('val')` and the rest) still resolve: they open the section, expand the panel that holds the former tab and scroll to it.

## Structure

| Path | Purpose |
| --- | --- |
| `index.html` | Single-page application: styles, markup, data, and rendering logic. |
| `assets/chart.umd.min.js` | Chart.js 4.4.4 (UMD build), vendored so the site has no runtime CDN dependency. |
| `favicon.svg` | Site icon. |
| `.github/workflows/pages.yml` | Publishes the site to the `gh-pages` branch on every push to `main`; GitHub Pages serves that branch. |
| `.nojekyll` | Disables Jekyll processing on GitHub Pages. |
| `validation/validation_log.csv`, `validation/validation_log.json` | Field-level validation log: every published figure, its source value, page or file location, result and UTC timestamp. Regenerated on each validation pass. |

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

## Validation and timestamps

The site carries two timestamps, shown in the header badge, the footer and the Validation tab (Data menu):

- **Dataset vintage** (`2026-09-05`): the OCS, CMS, HRSA and SEC vintages the dataset was built from.
- **Data last updated / validation pass completed**: the UTC moment the last full-source validation finished and its corrections were applied.

The 2026-09-14 pass read every primary document and compared it with the value shown on the site:

| Source | Documents | Method |
| --- | --- | --- |
| OCS Planilla de Salud FY2024, FY2025, 1Q2026 | 3 PDFs | PyMuPDF text extraction; every coverage row and total compared with the detail and summary pages |
| OCS / NAIC-format annual statements, 9 entities | 18 PDFs | Statement of Revenue and Expenses, enrollment exhibit, balance sheet and Analysis of Operations by Lines of Business, field by field |
| CMS MA enrollment (Aug 2026), 2026 Star Ratings, CY2027 Rate Book | 3 ZIPs | Puerto Rico rows recomputed from the CSV and XLSX tables |
| HRSA HPSA quarterly summary | 1 PDF | Puerto Rico rows of Tables 3, 4 and 5 |
| SEC Forms 10-K FY2025 (UNH, ELV, HUM, CVS) and NYSE listings | 4 filings | Cover page, EDGAR index, ratios located and margins recomputed |
| Official index pages (OCS annual statements, OCS Planillas) | 2 pages | Captured independently with Firecrawl and Apify to confirm every cited PDF is listed |

Every card and every entity row on the site links to its primary document and to the official index page. All cited URLs are checked for a live HTTP response and listed in the Validation tab.

Corrections applied by the 2026-09-14 pass: HRSA Puerto Rico HPSA figures replaced with the source values; FY2024 core-entity comparatives aligned to the FY2024 statements as filed (restated figures disclosed in Methodology); three $1 to $2 source-rounding differences aligned to the Statement of Revenue and Expenses.

To re-run a validation pass, regenerate `validation/validation_log.*` and the `VALIDATION` object embedded in `index.html` from the per-source result files (see the `build_validation.py` approach described in the commit history), then redeploy.

## Provenance

This site was migrated from a Manus-hosted deployment. The migration removed the
Manus editor runtime, Manus PWA manifest, and Plausible analytics; the application
markup, data, and logic are unchanged.

## Disclaimer

Analytical platform. Not a legal conclusion, audit opinion, actuarial certification, or regulatory finding.

## Visual and calculation revision — September 14, 2026

The overview now opens with four scoped metrics, a shared-scale premium/claims comparison, all nine insurer results, all ten coverage categories, and a paid-claims ratio view. Its year selector switches FY2024/FY2025; the two-year comparison and latest-quarter context retain explicit periods. The insurer section adds simultaneous annual premium comparison and net-income change charts above the exact detail table. Responsive sidebar navigation, larger typography, direct labels, keyboard controls, light/dark support, existing CSV exports and source links remain available.

The independent review in `validation/independent_ocs_recheck.json` records 18 insurer PDFs and 3 Planillas checked, actual Composio/Firecrawl/Apify provenance, index-extraction limitations, and corrected calculations. Statutory totals now include zero-premium lines with financial activity. Benefits/admin ratios use matched eight-filer populations. Share changes are computed before rounding. Paid-claims ratios do not receive financial-health classifications.

`assets/observatory.css` and `assets/observatory.js` extend the original static application. No runtime API credentials or new backend service are needed.
