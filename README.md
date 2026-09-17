# Puerto Rico Insurance Observatory

The **Puerto Rico Insurance Observatory** is a public, source-verified dashboard covering Puerto Rico’s health-insurance market. It includes FY2024, FY2025, and quarter-ended 03-31-2026 views, together with statutory insurer filings and federal context from CMS, HRSA, and SEC sources.

**Live site:** <https://epac-hub.github.io/PR-Insurance-Observatory/>

## Current release

**Release:** `2026-09-16.2`

**Website updated:** 09-16-2026 08:01 PM AST

**Data and source links last verified in the dashboard:** 09-15-2026 04:38 PM AST

The current interface contains 16 sections:

1. Overview
2. Analysis
3. Market Performance
4. Ratios
5. Segments
6. Statutory LOB
7. Profiles
8. Financial
9. Claims/MLR
10. Market Share
11. Federal Context
12. Data Verification
13. Reports
14. Sources
15. Methodology
16. Downloads

## Verified behavior

The dashboard preserves distinct FY2024, FY2025, 2024-vs-2025, and 1Q2026 reporting modes. Areas without verified quarterly source data show an unavailable state rather than substituted, carried-forward, annualized, or inferred values.

Every chart includes reading guidance, CSV and JSON exports, source provenance, clickable official links, exact PDF-page or workbook references where applicable, and source-verification timestamps. The interface also provides fullscreen presentation mode and complete-dashboard PDF preparation.

The Overview premium and covered-lives donuts use compact circular in-ring labels rather than rectangular overlays. The label shows the market denominator by default and the focused category’s exact value and share on hover or keyboard focus. The Overview ratio is labeled **Paid Claims Ratio** and shows the exact claims-paid ÷ premium calculation, a plain-language interpretation, and a 100% claims-versus-arithmetic-remainder composition. The remainder is explicitly not represented as profit.

## Verification status

| Verification area | Result |
|---|---:|
| Normalized-data checks | 45 / 45 passed |
| Published-number and formula checks | 515 / 515 passed |
| Official-PDF page citations | 81 / 81 passed |
| Unique live official URLs | 30 / 30 passed |
| Period-chart export states | 97 |
| Non-empty CSV/JSON payloads | 246 |
| Deterministic visual states | 32 / 32 |

The deterministic visual review covered all 16 sections at 1440 × 900 and 390 × 844. TypeScript, generated inline JavaScript, the production build, two-pass generation idempotence, production/portable artifact identity, and clean browser runtime checks passed before this GitHub deployment.

## Source and methodology safeguards

The dashboard separates market-wide OCS Planilla data from the Core 9 statutory insurer universe. It also keeps MCS Life’s NAIC Life-blank Accident & Health fields separate from Health-blank values. Threshold colors and interpretive labels are Observatory analytical cues and are not represented as regulatory standards.

The Data Verification, Sources, and Methodology sections provide detailed provenance, limitations, source conflicts, report definitions, and release history.

## Repository structure

| Path | Purpose |
|---|---|
| `index.html` | Complete standalone production dashboard |
| `favicon.svg` | Repository site icon |
| `.github/workflows/pages.yml` | Publishes the repository root to `gh-pages` |
| `.nojekyll` | Disables Jekyll processing |
| `assets/` | Retained historical static assets from earlier releases |
| `validation/` | Retained historical validation artifacts |
| `preview/` | Retained historical design and analysis previews |

The current production dashboard is self-contained except for Google Fonts and Chart.js 4.4.4 loaded from public CDNs. All insurance data and application logic required for the published interface are embedded in `index.html`.

## Deployment

The default branch is `claude/great-ptolemy-slaw15`. A push to that branch triggers `.github/workflows/pages.yml`, which republishes the repository root to the `gh-pages` branch. GitHub Pages serves the `gh-pages` branch with HTTPS enforced.

Do not edit `gh-pages` directly; the deployment workflow recreates it from the source branch.

## Disclaimer

Analytical platform. Not a legal conclusion, audit opinion, actuarial certification, or regulatory finding.
