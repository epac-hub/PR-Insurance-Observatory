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

The targeted federal review in `validation/federal_recheck.json` matched 62 retained CMS, HRSA and SEC numeric fields. CMS suppression language now correctly states counts of 10 or less; suppressed cells are not zero and are not imputed. Source hashes and comparison scopes are recorded.

## Interactive visual revision — September 14, 2026

The second design pass adds `assets/explorer.js` and `assets/explorer.css`: a scoped market pulse, premium composition ring (Medicare categories, Vital, other seven coverages), a four-metric insurer explorer, an entity spotlight linked to filings, a net-income-change waterfall, growth/profitability bubbles, and an eight-Health-filer ratio comparison. Year, metric and entity state survive theme changes. Native controls and exact-value tables support keyboard and touch use. The waterfall and growth comparison explicitly retain FY2024/FY2025 periods. Existing detailed analysis, federal context, exports and validation records remain.

All new calculations derive from the existing verified data objects. The nine-entity share denominator excludes the wider Planilla market; NI/premiums is not a revenue net margin; missing Health-blank fields are omitted. Bubble area scales with premiums. Annual and Q1 2026 values stay separate.

Lovable was used to create an editable Visual Lab prototype and explore the editorial-finance palette and interactive ranking/spotlight pattern. Canva was queried for existing Observatory/ePAC assets and brand kits; no relevant reusable asset was found. Wix account context and design-system chart documentation were consulted; the production site remains on GitHub Pages. No unrelated pharmacy data or site was modified.

### Apache ECharts integration and period tabs

The overview, insurer and coverage pages use locally vendored Apache ECharts
6.0.0 (SVG renderer), with license and notice under `assets/vendor/`.
English-language period tabs select 2024, 2025 or Q1 2026 consistently across
these pages. Shareable URLs use `?period=2024`, `?period=2025` or
`?period=q1-2026`. The same component structure, chart types, colors, controls
and units serve all periods. Annual charts use matching scales where applicable.

Eight main views cover market premiums/claims, a ten-coverage treemap with a
three-group ring toggle, coverage premiums/claims, coverage enrollment and paid
claims ratio, insurer ranking with optional paired-year comparison, a signed
net-income contribution waterfall, insurer scale and result, and an eight-filer
medical/administrative cost heatmap. Insurer selection links the ranking,
spotlight, waterfall, scatter and heatmap. Keyboard entity buttons, period-tab
arrow navigation, exact-value tables and source links are provided. Reused
instances animate updates, respecting reduced-motion preferences.

Q1 2026 has the same four market/coverage visualizations using actual quarterly
Planilla data. The four insurer views show explicit unavailable states because
verified quarterly insurer statements are not in the dataset. No annual values
are substituted, extrapolated or annualized. Legacy annual filing comparisons
remain explicitly labeled; they are hidden on the quarterly insurer page.
Dollar chart labels use M = millions, explained visibly in English.

Validation with the actual ECharts library checked equal annual structures,
exact selected-period values, signed waterfall reconciliation, linked selection,
instance reuse, all period/toggle controls, quarterly coverage totals, explicit
missing-data states, synchronized navigation, theme state and shareable URLs.
No inline source data or legacy calculation code was changed.

### Executive landing view

The default landing view has three period tabs, three market KPIs, and two
horizontal bar charts: insurer premiums and coverage premiums. One Dollars /
Share switch controls both charts, using their separate statutory-insurer and
market-wide denominators. Labels show complete reported names and direct values.
Selecting an insurer opens a dismissible native dialog with profit/loss,
medical and administrative expense ratios, and its source filing. Keyboard
users can reach the same insurer choices. The additional visualizations and
tables live under a closed-by-default View details disclosure and initialize
only when opened. Q1 2026 explicitly lacks insurer financial statements; its
market KPIs and coverage chart use actual quarterly values.
