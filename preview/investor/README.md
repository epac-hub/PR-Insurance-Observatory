# Insurance Observatory · investor research preview

A static, isolated research workspace for the nine insurer legal entities already in the Observatory. It does not replace the production index. English UI; Medicare Platino is the approved display label for the source's Medicare Platinum category.

## Use

Serve the repository root with any static HTTP server, then open `/preview/investor/`. No build, API keys or backend are required. Apache ECharts 6.0.0 is loaded from the existing local vendor asset. Direct links preserve view, reporting period, company, coverage group and coverage measure. The annual tabs share the same layout and compare FY2024 as filed with FY2025. Q1 2026 has market coverage data only and is not annualized.

- Company overview: sorted horizontal bars for profit/loss, premiums, average membership or premium growth. Signed amounts and full insurer names are directly labeled. Losses extend left of zero; profits extend right. Select a bar or company label to inspect it. Missing membership is explicitly labeled, and 2024 growth requires an unavailable 2023 baseline. Sort nine insurers and compare up to three.
- Company profile: current-period metrics, paired annual financials and PMPM, verified MMM coverage mix, FY2025 balance sheet and explicit outstanding diligence evidence.
- Coverage markets: ten source categories under five navigation groups, paired annual charts and table, plus the Q1 snapshot. Filter premiums, paid claims or reported lives.
- Export the current chart to PNG, the underlying scoped data to CSV, or print the current profile. Use the Sources button for primary reports and definitions.

## Data contract and replacement

`data.js` contains unchanged `D` and `PLANILLA` snapshots from production source commit `791d08ac84b52e66267ea4b2c042f654eac57fbf`. Replace their contents only with verified comparable filings, keeping legal-entity identifiers and source URLs. `mmm-coverage.json` is a page-level OCS extraction, also embedded as `window.MMM_COVERAGE` in `data.js` for offline portability. If updating it, update both copies together.

Statutory company fields: `p24/p25` net premiums; `ni24/ni25` net income; `tm24/tm25` total hospital and medical expenses; `a24/a25` administration; `mm24/mm25` member months; `s24/s25` filing URLs. `ast/lia/eq` are FY2025 only. Null means unavailable and must remain null. MCS Life uses a different statement form and has no comparable medical, administration or membership fields. Do not use the narrower `c` benefits field as total medical expenses.

Derived measures: average monthly membership = member months / 12; PMPM = annual amount / member months; NI / premiums = net income / premiums. The last measure is not a total-revenue margin, statutory MLR or acquisition multiple. These expenses do not form a complete net-income bridge. Keep all calculations tied to the selected legal entity and matching period. No monthly series are present; do not invent sparklines.

Coverage records use `t`, `prem`, `claims`, `lives` and `src`, grouped into `FY24`, `FY25`, `Q1_2026`. Ten categories reconcile exactly to each period's existing market totals. Commercial includes large private group, small private group and private individual plans. Others includes government employees, government retirees, federal government employees and Medicare Supplement plans. Source-reported covered lives are not average membership or deduplicated unique people.

MMM's 2024 report puts its business in Medicare Advantage; 2025 separates Advantage, Platino and Government Retirees. Category differences are not evidence of organic growth or migration. The FY2025 detailed claims total exceeds the report summary by $196,246; use the detailed total retained in the source dataset. Do not infer other companies' mixes from market shares. RBC, reserve quality, regulatory clearance and transaction value remain unverified.

## Visual system and art direction

Treat this as a precise investor research publication: warm white surfaces, graphite typography, ink-blue bars and restrained dark brick only for deficits or contraction. The selected company sits on a quiet neutral panel, not a contrasting colored block. Use one company per horizontal row with its name and amount directly visible. Never replace this ranking with bubble size, spatial quadrants or ornamental marks. Preserve the three-view hierarchy and matching annual controls. Keep the chart before secondary details on mobile. The relevant question is which entity merits further diligence and why.

`design-tokens.css` owns reusable colors and surface values; `chart-theme.js` owns ECharts axis, grid, typography and tooltip defaults; `style.css` owns layout and responsive/print rules. Charts use SVG, run a single 550ms entry animation per chart identity, and respect reduced motion. Ranking scales use the combined observed bounds of both annual periods for each metric. Recheck bounds and missing states when swapping the dataset.

## Validation

Verified unchanged source snapshots, all nine insurers, annual periods, sorted horizontal rankings, direct labels, signed values and consistent annual scales, member-month denominators, null handling for MCS Life, MMM page-level extraction, all coverage group/metric/period combinations and exact aggregate reconciliation. Tested unavailable quarterly-company states, comparison and source dialogs, sorting and SVG renders at narrow widths. Rendering, navigation and responsive screenshots are reviewed on the deployed preview before handoff.
