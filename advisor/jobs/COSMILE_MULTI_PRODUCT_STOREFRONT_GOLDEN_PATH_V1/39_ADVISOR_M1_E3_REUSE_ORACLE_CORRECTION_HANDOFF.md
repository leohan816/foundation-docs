# M1 E3 — reused favorite ownership oracle

MISSION_ID: `COSMILE_MULTI_PRODUCT_STOREFRONT_GOLDEN_PATH_V1`
BASE: product `1efde21e2942696b585b8c27e2980e97795cb3e1` plus the preserved
uncommitted exact eight-path M1/E1 delta.
ACTOR: same existing Cosmile Worker, Opus 5 / xhigh.

Diagnostic `37` proves the only failure is
`expect(card).toContain("wish-card-btn")`. That expectation assigns the reused
`WishlistButton`'s internal CSS class to its caller and contradicts the frozen
reuse boundary. The card correctly selects the canonical component contract
with `variant="card"`; `WishlistButton` owns the class. The same test separately
asserts the last standalone `.wish-card-btn { ... }` CSS rule and its 44px,
focus and reduced-motion guarantees.

## Exact correction and gate

Path ceiling: `app/scripts/o1_multi_product_storefront.vitest.ts` only.
Within the same 44px test, replace only:

`expect(card).toContain("wish-card-btn")`

with a normalized assertion that the card renders `WishlistButton` with
`variant="card"`. Keep all E1 standalone CSS block, 44px, focus, and
reduced-motion assertions unchanged. No other edit or read.

Run the identical focused command exactly once. Failure is HOLD with no rerun.
On PASS, inspect exact eight-path containment, `git diff --check`,
package/lock unchanged and effects 0; one truthful product commit and non-force
push, clean/upstream-equal. Write only `40_WORKER_M1_E3_RESULT.md` and
`41_WORKER_M1_E3_POINTER.md`, commit/push those docs, return to
`foundation-advisor`, STOP.
