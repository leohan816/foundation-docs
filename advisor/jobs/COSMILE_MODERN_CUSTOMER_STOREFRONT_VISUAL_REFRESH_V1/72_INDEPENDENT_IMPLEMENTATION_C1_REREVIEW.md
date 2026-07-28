# 72 — C1 Delta Re-review

VERDICT: **`PASS`** · blocking **0** · C1 `CLOSED` · B1/N1 remain closed · `RETURN_TO: foundation-advisor`

Binding: actual `claude-opus-5` / `max` / `/fable-sentinel`; handoff `71` @ docs `b44becd` sha256 `c42275fe…`; product `4374617e..07561dcc` = 1 commit, **exactly 3 paths**, clean/upstream-equal. Read-only; no rerun, render, or mutation.

**Q1 — closed.** `globals.css:483` `.o1-lead-action, .o1-add-status a { display: inline-flex; align-items: center; min-height: 44px; }` gives both proven anchors a real box: `.o1-lead-action` `(0,1,0)` has no competing declaration, and `.o1-add-status a` `(0,1,1)` outranks the layout-free shell rule. Both now generate an inline-flex box, so `min-height` applies; their label text exceeds 44 px horizontally.

**Q2 — closed.** The rule names exactly those two selectors. It cannot reach `.o1-card-link` or `.o1-history-card` (neither is inside `.o1-add-status`), and `:479` stays `.o1-shell :where(a, button, summary) { min-height: 44px }` with no `display`/`align-items` — the harmful `(0,1,1)` comma helper is not restored.

**Q3 — closed.** Both suites re-assert the shell rule "still imposes no layout" (B1 kept) and pin C1 by matching the new rule for `display: inline-flex`, `align-items: center`, and `min-height: 44px`; the detail suite additionally ties the success link to the status slot. Nothing was weakened.

**Q4 — PASS.** CSS plus two test files only: no component, behavior, authority, data, package, lock, schema, API, provider, or economic change. Effects: product commits 1; runtime/DB/provider/economic 0.

**Non-blocking N2.** The catalog card also renders `AddToCartButton`, so on a successful add the card's status slot grows from `min-height: 20px` to ~44 px inside the desktop card's fixed `height: 194px` (`:415`). The `1fr` first row absorbs it, which can transiently squeeze or clip the two-line product name. This restores pre-B1 behavior rather than introducing new scope; if it matters, reserve the slot height or let the desktop card grow. Not verified by rendering — derived from cascade and box-model rules only.
