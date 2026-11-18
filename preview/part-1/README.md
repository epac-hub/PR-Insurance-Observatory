# Part 1: review preview

This standalone preview does not modify the live index or existing assets. Open `preview/part-1/` on the existing GitHub Pages site.

Scope: compact header; English 2024/2025/Q1 2026 tabs; three market KPIs; coverage comparison; insurer metric selector (premiums, net income, total medical and administrative expenses); insurer detail; original source links; selected-period CSV. Annual side-by-side comparison remains for a later review stage.

`data.js` is an exact snapshot of the existing `D` and `PLANILLA` source objects. It preserves numbers, missing fields, filing links and separate reporting scopes. The source-copy commit is recorded with the snapshot. No monthly series or quarterly insurer data are invented. MCS Life expenses are N/A. Claims paid/premiums written is not regulatory MLR.

`style.css` owns the visual tokens and responsive layout. `app.js` uses the existing Apache ECharts 6.0.0 vendor asset with a custom linear bar series: every row in each chart shares the same zero and scale; negative net income extends left of zero. All displayed numbers are derived from the snapshot. Detailed figures and links are available by keyboard in the tables and dialogs. Only first rendering animates, with reduced-motion respected.

Art direction: a quiet financial work surface, with three immediately readable numbers and two useful comparisons. Graphite surfaces, teal premiums, neutral claims and rose losses. Keep the data above the fold; avoid slogans, sidebars, decorative imagery and additional default chart panels.
