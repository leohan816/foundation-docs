# 62 — Pointer: Independent Cumulative Implementation Review

| Field | Value |
|---|---|
| Artifact / verdict | `61_INDEPENDENT_IMPLEMENTATION_REVIEW.md` · `IMPLEMENTATION_REVIEW` · `NORMAL_COMPLEX_BOUNDED_UI` · **`NEEDS_PATCH`** · blocking 1 · non-blocking 4 |
| Handoff / pins | `60` @ docs `96501b7` sha256 `2877d09b…` · product `8d4a3272..d233cd03` = 6 commits · 23 files · +1141/−118 · clean, upstream-equal |
| **B1 (blocking)** | `globals.css:477` `.o1-shell a, .o1-shell button, .o1-shell summary { … display: inline-flex; align-items: center }` — specificity `(0,1,1)` unconditionally beats `.o1-card-link` `(0,1,0)` at `:337`/`:421` and `.o1-history-card` at `:387`. Desktop card link is blockified to flex, so the frozen `312×194` / `112×170` rail never renders and overflows `height:194px`; mobile card media shrink-wraps; `/account/orders` cards lay out in a row |
| B1 correction | Stop setting `display` in the touch-target helper: scope it to real controls, or use `.o1-shell :where(a, button, summary) { min-height: 44px }` and add `inline-flex`/`align-items` per control. CSS-only, no component/route/behavior change |
| Why gates missed it | M2 oracle (`o1_storefront_home_catalog_visual.vitest.ts:163-164`) asserts CSS **text/order** for `.o1-card-link`; no run renders layout, so a cross-selector specificity conflict is invisible to it |
| Q1–Q8 | 1 PASS (O1-only shell, legacy branch and `ProductCartFab o1→null` intact) · 2 PASS (array-derived identity/count/`sequence`, no eighth/mock/image/claim) · 3 PASS (focus return, single live slot, per-line cart, Toss untouched) · 4 PASS (same-shopper read, exactly 3 destinations, no PII, no sixth tab) · 5 PASS (order/service-request class-only) · 6 **NEEDS_PATCH → B1** · 7 PASS (adversarial; `alert\s*\(` correction justified; account rule change stated) · 8 PASS (no package/lock/Prisma/API/DB/economic change) |
| Non-blocking | N1 wide-and-short viewport keeps facts/progress side by side (grid-column 1/2 not reset at `max-height:480`) · N2 `role="alert"` nested in `aria-live="polite"` · N3 no second non-production note on cart/checkout · N4 no visual render this cycle — B1 derived from cascade rules, not a screenshot |
| Effects | product commits 6 · runtime/DB/provider/browser/economic **0** · docs mutation 0 |
| Binding | actual `claude-opus-5` / `max` / `/fable-sentinel` · existing independent Reviewer · exact mission worktrees |
| Boundaries | read-only: no rerun of test/build/typecheck/runtime/browser/DB/provider, no product/docs mutation, **no commit/push** — `61`/`62` written uncommitted |
| `RETURN_TO` | `foundation-advisor` — route B1 (plus N1) as one bounded `globals.css` patch, then focused delta re-review; hold implementation past this gate until B1 closes |
