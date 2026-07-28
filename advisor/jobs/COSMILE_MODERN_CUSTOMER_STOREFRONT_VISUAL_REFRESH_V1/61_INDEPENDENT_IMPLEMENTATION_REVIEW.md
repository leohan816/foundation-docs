# 61 — Independent Cumulative Implementation Review

PASS: `IMPLEMENTATION_REVIEW` · CLASS `NORMAL_COMPLEX_BOUNDED_UI` · VERDICT: **`NEEDS_PATCH`** (one CSS specificity defect; everything else clean) · `RETURN_TO: foundation-advisor`

**Binding.** Actual live `claude-opus-5` / effort `max` / `/fable-sentinel`; existing independent Reviewer; exact mission worktrees only. Docs `96501b7`, handoff `60` sha256 `2877d09b…`. Product `8d4a3272..d233cd03` = 6 commits · 23 files · +1141/−118 · **clean, upstream-equal**. Read-only: no test/build/typecheck/runtime/browser/DB/provider rerun, no mutation, no commit.

## Blocking finding

**B1 · `app/src/app/globals.css:477` overrides the accepted card and order-history composition.**
`\.o1-shell a, .o1-shell button, .o1-shell summary { min-height: 44px; display: inline-flex; align-items: center; }` is unconditional and its specificity `(0,1,1)` beats every single-class rule `(0,1,0)`, so it wins over:

- `:421` `.o1-card-link { … display: grid; grid-template-columns: 112px minmax(0,1fr); … }` inside `@media (min-width:1280px)`. Inside the grid `.o1-card` the link is blockified to **flex**, so its own tracks are inert: `.o1-card-media` (112×170) and `.o1-card-body` stack vertically inside the fixed `height:194px` card. The 312×194 horizontal rail frozen by correction `45` and design finding F2 does not render at desktop; content overflows the fixed height.
- `:337` `.o1-card-link { display: flex; flex-direction: column }` at every width — the inherited `align-items: center` shrink-wraps `.o1-card-media`, so the 4:3 pending media no longer fills the card on mobile/tablet.
- `:387` `.o1-history-card { display: block; … }`. Its parent is a plain block (`space-y-3`), so inline-flex is **not** blockified: each `/account/orders` card shrink-wraps and lays date/name/total/badge out in a row instead of stacked.

*Smallest correction (presentation-only):* stop letting the touch-target helper set `display`. Either scope it to the real controls (`.o1-nav-link, .o1-header-right a, .o1-footer-nav a, .o1-lead-action, .o1-account-row, .o1-shell .mall-tabs a, .o1-shell button, .o1-shell summary`), or keep it at zero specificity — `.o1-shell :where(a, button, summary) { min-height: 44px }` — and add `align-items`/`inline-flex` only where a control needs it. No component, route, or behavior change is required.

*Why the gates missed it:* the M2 card oracle (`o1_storefront_home_catalog_visual.vitest.ts:163-164`) asserts the CSS **text** of `.o1-card-link` (grid-column/grid-row) and declaration order; it cannot see a cross-selector specificity conflict, and no run renders layout. Non-promissory, but its coverage claim should be read as source-order only.

## Questions 1–8

1. **PASS** — the phone frame is bypassed only inside `o1 ? … : <div className="device">` (`layout.tsx`); the legacy branch, `CategoryDrawerProvider`, `ProductCartFab` (itself `if (o1) return null`) and every legacy selector are untouched. `O1CustomerHeader` uses only existing routes, marks `aria-current="page"` on the exact path (not colour alone), keeps the tablet disclosure, and `:focus-visible` outline is defined and never removed.
2. **PASS** — Home/Shop/Wishlist map the same `o1EligibleCatalog` array; counts are `items.length`; `tilt` decoration is replaced by `sequence={i + 1}` at all three call sites; no literal eighth, no legacy/mock fallback, no fabricated image (`제품 이미지 준비 중` text), no claim, promotion, or recommendation.
3. **PASS** — `AddToCartButton` keeps `btnRef.current?.focus()` on both outcomes; success and error are now one mutually exclusive `aria-live="polite"` slot with the error still `role="alert"`; sold-out stays the disabled button, not the slot. `CartList` changes are class names plus the media placeholder; per-line `aria-busy`, pending set, rollback, unavailable handling and totals are untouched. `O1TossCheckout` is outside the delta.
4. **PASS** — `/account` O1 branch reads `getWishedProductIds(o)` from the same `getShopper()` result, renders exactly `/wishlist`, `/account/orders`, `/cart`, drops the avatar and keeps neutral `게스트`/`회원` labels; no `MOCK_USER`, no PII, and `MallTabs` is not in the delta, so there is no sixth tab.
5. **PASS** — `O1OrderStatus` and `O1OrderServiceRequest` changes are class names only; ownership query, sanitized projection, progress derivation, endpoint, bodyless POST, single-flight, confirmation, recovery and fail-closed copy are byte-identical.
6. **NEEDS_PATCH → B1.** Otherwise correct: detail `7fr 5fr`, cart `span 8` / `span 4` sticky, and the order-detail grid sets `> * { grid-column: 1 / -1 }` before placing facts/progress, which is the right defence against auto-flow. Reduced motion and `max-height: 480px` reflow exist.
7. **PASS** — new suites are adversarial (count-independent lead, no literal eighth, no fabricated media); the `alert` oracle is corrected to call-shaped `alert\s*\(` because the bare token also matched the required `role="alert"`, while `window.confirm/open`, `dialog`, `modal` stay forbidden and `role="alert"` is now positively asserted; the account rule change from "no wishlist" to "exactly three destinations + runtime count" is explicitly justified by the reviewed design. No authority, privacy, or economic assertion was weakened.
8. **PASS** — delta is `app/src` + `app/scripts` only: zero package, lock, Prisma, schema, migration, API route, checkout-provider, DB, production/live, PII or economic-semantic change. Effects: product commits 6, runtime/DB/provider/economic **0**.

## Non-blocking limits

- **N1** At `min-width:1024` **and** `max-height:480`, `.o1-order-summary` returns to `1fr` but `> .o1-order-facts { grid-column: 1 }` / `> .o1-order-progress { grid-column: 2 }` are not reset, so an implicit second column keeps them side by side — the stated single-column reflow does not happen on a wide-but-short viewport.
- **N2** `role="alert"` now sits inside `aria-live="polite"`; the inner role governs, but the nesting is worth one comment.
- **N3** The non-production note moved to the shell, so it renders once per O1 route; the design also allows a second note where payment/order context requires it — cart/checkout still has none.
- **N4** Korean legibility, focus rings, contrast and the rendered card at 1280 are **not** visually verified this cycle (no render authorized); B1 is derived from cascade rules, not from a screenshot.

**Next action.** Route B1 as a bounded CSS-only Designer/Worker patch inside `globals.css`, then a focused delta re-review; N1 can ride the same patch. No product implementation should proceed past this gate until B1 closes.
