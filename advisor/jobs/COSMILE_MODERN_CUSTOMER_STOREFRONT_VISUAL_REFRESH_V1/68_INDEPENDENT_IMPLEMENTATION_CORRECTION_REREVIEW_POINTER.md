# 68 — Pointer: Correction Re-review

| Field | Value |
|---|---|
| Artifact / verdict | `67_INDEPENDENT_IMPLEMENTATION_CORRECTION_REREVIEW.md` · **`NEEDS_PATCH`** · blocking 1 (C1) · B1 `CLOSED` · N1 `CLOSED` |
| Pins | handoff `66` @ docs `868977d` sha256 `786fc58f…` · product `d233cd03..4374617e` = 1 commit · exactly 4 paths · +30/−5 · clean/upstream-equal |
| B1 | `.o1-shell :where(a, button, summary) { min-height: 44px }` — zero-specificity, no `display`/`align-items`; card link keeps flex/grid, history card keeps block |
| N1 | `max-height:480` now resets facts **and** progress to `grid-column: 1`; desktop 1/2 placement untouched |
| C1 (blocking) | `min-height` is inert on inline boxes, so removing `inline-flex` drops the 44 px target for `AddToCartButton.tsx:101` (`장바구니 보기`) and `.o1-lead-action` (no `.o1-lead*` rule exists). Fix: `.o1-add-status a, .o1-lead-action { display: inline-flex; align-items: center; min-height: 44px }` |
| Q4 / effects | CSS + tests only; no component/route/semantic/authority/data/package/schema/API/provider/economic change · runtime/DB/provider/economic 0 |
| Binding / boundaries | actual `claude-opus-5` / `max` / `/fable-sentinel` · read-only, no rerun or render · `67`/`68` written **uncommitted** |
| `RETURN_TO` | `foundation-advisor` — route C1 as one more `globals.css`-only patch, then close |
