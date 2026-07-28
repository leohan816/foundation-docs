# 67 — Correction Re-review (B1/N1)

VERDICT: **`NEEDS_PATCH`** · blocking **1** (new, narrow, CSS-only) · B1 `CLOSED` · N1 `CLOSED` · `RETURN_TO: foundation-advisor`

Binding: actual `claude-opus-5` / `max` / `/fable-sentinel`; docs `868977d`, handoff `66` sha256 `786fc58f…`; product `d233cd03..4374617e` = 1 commit, **exactly 4 paths**, +30/−5, clean/upstream-equal. Read-only; no rerun, no mutation, no commit.

**Q1 — B1 CLOSED.** `globals.css:479` is now `.o1-shell :where(a, button, summary) { min-height: 44px; }`. `:where()` adds nothing, so the selector is `(0,1,0)` and declares no `display`/`align-items`; `.o1-card-link` keeps `display:flex` (`:337`) and `display:grid` at `min-width:1280` (`:421`), and `.o1-history-card` keeps `display:block` (`:387`). The 312×194 rail and the stacked history card are no longer overridden.

**Q2 — N1 CLOSED.** The `max-height:480` block now also sets `> .o1-order-facts` and `> .o1-order-progress` to `grid-column: 1`. Both are `(0,2,0)` like their `min-width:1024` counterparts and come later, so the implicit second column is gone; the tall-desktop 1/2 placement is untouched because the query no longer matches.

**Q3 — partially: C1 below.** The oracles were genuinely strengthened (zero-specificity shell rule asserted to carry no `display`/`align-items`, old comma selector asserted absent, card flex+grid and history block re-asserted, both short-viewport resets pinned).

**Q4 — PASS.** Four paths only; CSS and test text; no component, route, semantic, authority, data, package, lock, schema, API, provider, or economic change. Effects: product commits 1, runtime/DB/provider/economic 0.

## C1 (blocking, introduced by this delta)

Dropping `display: inline-flex` removed the 44 px guarantee for anchors left in **inline flow**, because `min-height` does not apply to non-replaced inline boxes. Two customer controls regress from a 44 px target to text height:

- `AddToCartButton.tsx:101` — the persistent `장바구니 보기` link inside `<p>`; the design contract names this exact control as the success affordance.
- `page.tsx` home lead `.o1-lead-action` — `globals.css` contains **no** `.o1-lead*` rule at all, so it has no display of its own.

`/account/orders` links are unaffected (Tailwind `inline-block`, so `min-height` applies), as are all flex/grid/block controls. No test covers effective target size, so the suite stays green.

*Exact correction (CSS only, same file):* give those two an explicit control box, e.g. `.o1-add-status a, .o1-lead-action { display: inline-flex; align-items: center; min-height: 44px; }` — keeps `:where()` at zero specificity and restores the prior contract without touching layout or behavior.

## Residual

`.o1-lead`, `.o1-lead-title`, `.o1-lead-body` are also unstyled in `globals.css`; that gap predates this delta but is now unmasked. Not verified by rendering — findings are derived from cascade and box-model rules only.
