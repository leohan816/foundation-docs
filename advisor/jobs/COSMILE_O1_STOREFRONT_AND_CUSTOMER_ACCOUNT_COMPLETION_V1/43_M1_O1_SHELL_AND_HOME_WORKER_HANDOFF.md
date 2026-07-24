# M1 O1 Customer Shell and Eligible Home — Worker Handoff

MISSION_ID: `COSMILE_O1_STOREFRONT_AND_CUSTOMER_ACCOUNT_COMPLETION_V1`
MODULE: `M1_O1_SHELL_AND_ELIGIBLE_HOME`
BASE: `68f13b8a4e7d2561efa7ab36e647c897514480c4`
DELTA_ONLY_VERIFICATION: `REQUIRED`

## Binding and skill

Use the existing Cosmile Worker at Claude Opus 4.8/xhigh in the exact mission worktree. Load `/fable-builder` with `implementation-execution`, `contract-to-code-mapping`, and `test-design-before-code`; use `implementation-report-template` only for the compact return.

## Exact changed/new path ceiling

1. `app/src/app/layout.tsx`
2. `app/src/app/page.tsx`
3. `app/src/components/layout/AppHeader.tsx`
4. `app/src/components/layout/CategoryNav.tsx`
5. `app/src/components/layout/MallTabs.tsx`
6. `app/src/components/category/CategoryDrawer.tsx`
7. `app/src/components/product/ProductCartFab.tsx`
8. `app/scripts/o1_storefront_navigation.vitest.ts` (new)

No helper, ninth path, config, manifest, lockfile, schema, migration, API, runtime library, auth/payment/provider/economic, cart/order, CSS, or console change.

## Frozen behavior

- `layout.tsx` calls existing `o1RuntimeEnabled(process.env)` and passes only the resulting boolean into the existing storefront shell components/provider. Console behavior remains unchanged.
- O1 ON home calls existing `o1EligibleCatalog(process.env)` and renders only: non-production TEST context, `테스트 상품`, `/shop` link, eligible `displayName`/server KRW price cards, or the directed eligible-empty state. No legacy `foundationProductClient`, brands, timer, discount/list price, group-buy, AI/personalization, `MOCK_USER`, claims, or fallback can execute in the O1 branch.
- O1 ON `MallTabs` keeps the existing five-slot family but maps exactly to 홈 `/`, 상품 `/shop`, 장바구니 `/cart`, 주문내역 `/account/orders`, MY `/account`; active destination uses `aria-current="page"`.
- O1 ON `AppHeader` keeps logo/back/home/cart and omits unsupported search. O1 OFF header remains behaviorally unchanged.
- O1 ON `CategoryNav` renders only the truthful `/shop` current destination and never calls the legacy product source. O1 OFF category behavior remains unchanged.
- O1 ON drawer reuses the overlay but renders only `전체 테스트 상품` and `MY`; no legacy tree, mock user, or static logout. It has dialog/modal labeling, initial focus, bounded Tab/Shift+Tab trap, Escape close, and focus return to the opener. O1 OFF content remains behaviorally unchanged.
- O1 ON `ProductCartFab` renders nothing; O1 OFF behavior remains unchanged.
- Existing `/shop` and `/products/[id]` eligible truth is reference evidence only and must not be edited.

## Tests first and exact command

Create the focused source-contract test first. It must adversarially prove:

- O1 root branch is exclusively `o1EligibleCatalog` and cannot reach the legacy/mock home sources;
- O1 nav destinations are exact and legacy destinations are absent from the O1 branch;
- O1 header/category/drawer/FAB conditions exist and the drawer keyboard/focus contract is complete;
- O1-OFF legacy arrays/content remain present and selected only when the boolean is false;
- existing shop/detail source still uses `o1EligibleCatalog`/`decideProductRoute` without modification.

Expected RED: current root has no O1 gate; tabs are group/event/consult/wishlist/account; drawer exposes mock/legacy content with no dialog/focus contract; FAB renders on every product detail; header exposes search.

If `app/node_modules` is absent, one lockfile-only worktree-local setup is allowed before RED:

`npm ci --ignore-scripts --no-audit --no-fund --prefer-offline`

Run from `app/`. Package and lock bytes must remain unchanged; no install script, generate, build, typecheck, broad test, shared dependency tree, or config change.

Run only:

`./node_modules/.bin/vitest run scripts/o1_storefront_navigation.vitest.ts -t "O1 customer shell and eligible home"`

Preserve RED exit and findings. Apply only the frozen seven source-path correction, then run the identical GREEN once.

## Closure

- Inspect exact eight-path diff, `git diff --check`, package/lock hashes, ignored dependency residue, and no unauthorized path.
- No browser/runtime/DB/provider/network beyond dependency retrieval, no full file/suite/build/typecheck/generate.
- One truthful commit and non-force push; clean/upstream-equal.
- Return <=60 lines with RED/GREEN commands/results, exact paths, package/lock unchanged, no schema/economic/auth/provider effect, Git state, and STOP.

If the behavior requires another path, new state/API, schema, new route family, or changed O1 economic/auth/provider semantics, do not patch; return `HOLD` with the exact need.

RETURN_TO: `foundation-advisor`
STOP before M2.
