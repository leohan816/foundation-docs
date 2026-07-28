# 48 — Advisor M3 First-GREEN Correction

MISSION: `COSMILE_MODERN_CUSTOMER_STOREFRONT_VISUAL_REFRESH_V1`
MODULE: `M3_DETAIL_WISHLIST_CART_CHECKOUT_PRESENTATION`
BASE: product `dc2ac49a2a51f568b58b3e0410fcbb205b69530f`
STATE: preserve the current eight-path uncommitted M3 delta
ACTOR: same Cosmile Worker, actual Opus 5/xhigh, `/fable-builder`

## Preserved evidence

- RED: 8 failed / 40 passed (48), exit 1.
- First GREEN: 2 failed / 46 passed (48), exit 1; no rerun.
- Static source-contract evaluation identified both failures without another
  Vitest execution.

## Exact two-path correction

1. `app/scripts/o1_storefront_detail_cart_visual.vitest.ts`
   - Replace only the region-scoped `detailO1` catalog assertion with a
     whole-file `detail` assertion.
   - Reason: `o1EligibleCatalog(process.env)` necessarily runs before
     `route === "o1_detail"` and remains the fail-closed admission boundary.
   - Preserve every other assertion.
2. `app/src/components/product/AddToCartButton.tsx`
   - In the explanatory JSX comment only, replace the literal token
     `generic alert(` with wording that cannot resemble a browser
     `alert(...)` call, for example `generic 오류 알림(`.
   - Do not change markup, state, focus, request, or error behavior.

The second failure is a comment-token collision with the existing strong
`alert(`-forbidden oracle. Correcting the comment preserves that oracle and
continues to catch an actual browser alert call.

## One allowed command

After the two edits, run the identical six-file M3 command from handoff 47
exactly once. No diagnostic command, no second GREEN, no build, typecheck,
runtime, browser, provider, DB, or M4 work.

On PASS: `git diff --check`, verify only the existing eight changed paths remain
inside the ten-path ceiling and generated Prisma client is absent; commit
without a co-author trailer, non-force push, compact return, STOP.

On failure: preserve the first failure and HOLD without another command.
