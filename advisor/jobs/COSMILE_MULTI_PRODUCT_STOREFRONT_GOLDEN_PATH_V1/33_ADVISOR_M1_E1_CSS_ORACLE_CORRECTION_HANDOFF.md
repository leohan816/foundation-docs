# M1 E1 — CSS oracle correction

MISSION_ID: `COSMILE_MULTI_PRODUCT_STOREFRONT_GOLDEN_PATH_V1`
MODULE: `M1_MULTI_PRODUCT_STOREFRONT_E1`
BASE: product `1efde21e2942696b585b8c27e2980e97795cb3e1` plus the preserved,
uncommitted, exact eight-path M1 delta from result `31`.
ACTOR: same existing Cosmile Worker, actual Opus 5 / xhigh.

The first GREEN is preserved: `1 failed / 10 passed (11)`. Direct Advisor
inspection confirms the single failure is an oracle defect:

- existing CSS has an earlier `.wish-card-btn { width:30px; height:30px; ... }`;
- M1 appends a later standalone `.wish-card-btn { ... min-width:44px;
  min-height:44px; ... }`, followed by pseudo/focus/media selectors;
- the test helper `region(css, ".wish-card-btn", "}")` always selects the first
  old rule, so it cannot observe the cascade-winning standalone rule.

## Exact correction

Path ceiling: `app/scripts/o1_multi_product_storefront.vitest.ts` only.

In the existing test
`gives the card favorite a 44px target and keeps focus and reduced-motion rules`,
select the block starting at the **last exact standalone marker**
`.wish-card-btn {` and ending at its next `}`. Assert the marker and closing
brace exist, then keep the current assertions unchanged:

- `min-width:44px`
- `min-height:44px`
- global `:focus-visible`
- global `prefers-reduced-motion`

Do not select the last generic `.wish-card-btn` occurrence because later
pseudo/focus/media selectors are not the standalone sizing declaration.
No other test/source edit, no oracle removal/weakening, no source read.

Run the identical focused command exactly once:

`cd app && ./node_modules/.bin/vitest run scripts/o1_multi_product_storefront.vitest.ts --config vitest.config.ts`

If GREEN, inspect exact eight-path containment, `git diff --check`,
package/lock unchanged, and effects 0. Commit and non-force push the exact M1
product delta once; verify clean/upstream-equal. Write compact correction result
`34_WORKER_M1_E1_RESULT.md` and pointer `35_WORKER_M1_E1_POINTER.md`, commit and
push only those two docs files, return to `foundation-advisor`, STOP.
Any failure is HOLD; no second diagnostic or rerun.
