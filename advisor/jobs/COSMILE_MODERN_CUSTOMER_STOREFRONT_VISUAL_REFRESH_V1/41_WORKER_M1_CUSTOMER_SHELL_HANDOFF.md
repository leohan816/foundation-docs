# 41 — Worker M1 Customer-Shell Handoff

MISSION: `COSMILE_MODERN_CUSTOMER_STOREFRONT_VISUAL_REFRESH_V1`
MODULE: `M1_SHARED_CUSTOMER_SHELL`
ACTOR: existing Cosmile Worker, actual Claude Opus 5, effort `xhigh`, `/fable-builder`

## Pins

- Product worktree: `/home/leo/Project/.worktrees/Cosmile/COSMILE_MODERN_CUSTOMER_STOREFRONT_VISUAL_REFRESH_V1`
- Required clean/upstream-equal base: `8d4a3272c6baced193be4f9ed88710c39c90d739`
- Docs: `92cefdd0fb224b04a77e4a511b297d23dfe72215`
- Design contract: `11`/`12`; independent PASS: `32`/`33`; implementation freeze: `40`

Every command must use the exact product worktree. The tmux pane's inherited CWD is not authority.

## Exact seven-path ceiling

1. `app/src/app/layout.tsx`
2. `app/src/app/globals.css`
3. `app/src/components/layout/AppHeader.tsx`
4. `app/src/components/layout/CategoryNav.tsx`
5. `app/src/components/layout/MallTabs.tsx`
6. `app/scripts/o1_storefront_navigation.vitest.ts`
7. `app/scripts/o1_storefront_visual_shell.vitest.ts` (new)

## Tests first

Patch paths 6 and 7 first. Preserve the existing security/truth assertions and replace only the stale O1 phone-frame expectation.

The new test must prove:

- O1 layout uses a distinct full-viewport customer shell and never renders `.device`, `.screen`, fake `9:41` status, ShippingPopup, or ProductCartFab in that branch;
- legacy flag-off shell still retains its existing device/status/popup/FAB structure;
- operator-space short-circuit is unchanged;
- desktop ≥1024 has full-width header, centered existing route-safe navigation, account/cart, no mobile tabs, and a route-safe footer;
- tablet 640–1023 uses the existing disclosed menu with account/cart;
- mobile <640 is a true viewport with 64 px header, context strip, and the exact five existing routes in the safe-area bottom nav;
- O1 search, promotion, unsupported destination, new route, and duplicate Wishlist tab remain absent;
- active route uses `aria-current`, 44 px targets, focus, reduced-motion, and 200% reflow rules.

If Vitest is absent, run the one authorized lockfile install from `app/`. Then run this exact RED from `app/`:

```sh
./node_modules/.bin/vitest run --config vitest.config.ts \
  scripts/o1_storefront_navigation.vitest.ts \
  scripts/o1_storefront_a11y_floor.vitest.ts \
  scripts/o1_storefront_visual_shell.vitest.ts
```

## Implementation

- In `layout.tsx`, branch O1 customer presentation from the legacy flag-off shell before phone-frame markup. Preserve the operator-space branch.
- O1 gets a real full-viewport shell, shared header, one non-production context strip, centered main region, desktop footer, mobile-only five-route tabs, existing O1 drawer, and no fake status/device bezel.
- `AppHeader` owns existing route-safe desktop/tablet/mobile navigation only: `/`, `/shop`, `/wishlist` on desktop, `/account/orders`, `/account`, `/cart`; no route invention. Mobile Wishlist remains through the existing account row, not a sixth tab.
- `CategoryNav` must not query or expose legacy categories in O1; retain flag-off behavior.
- `MallTabs` keeps the exact reviewed five O1 destinations and is mobile-only by CSS.
- `globals.css` uses the accepted paper/ink/pine/mist/persimmon tokens, ≥44 px targets, focus visibility, responsive breakpoints, safe-area, reduced motion, and no legacy selector deletion.
- Do not touch page/card/detail/cart/account/order presentation yet.

Run the identical GREEN once. On PASS: inspect exact seven-path containment, `git diff --check`, commit with truthful Worker attribution, non-force push, and return compactly with RED/GREEN counts and commit. On any broader need or meaningful failure: preserve it and `HOLD`; do not explore M2.

