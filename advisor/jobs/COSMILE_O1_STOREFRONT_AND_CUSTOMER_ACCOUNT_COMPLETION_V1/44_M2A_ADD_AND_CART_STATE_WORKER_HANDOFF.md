# M2A Add-to-cart and Cart State Coherence — Worker Handoff

MISSION_ID: `COSMILE_O1_STOREFRONT_AND_CUSTOMER_ACCOUNT_COMPLETION_V1`
MODULE: `M2A_ADD_AND_CART_STATE_COHERENCE`
BASE: `07765db`
DELTA_ONLY_VERIFICATION: `REQUIRED`

## Binding and skill

Use the existing Cosmile Worker at Claude Opus 4.8/xhigh in the exact mission worktree. Load `/fable-builder` with `implementation-execution`, `contract-to-code-mapping`, and `test-design-before-code`; use `implementation-report-template` only for the compact inline return.

## Exact changed/new path ceiling

1. `app/src/components/product/AddToCartButton.tsx`
2. `app/src/components/product/CartList.tsx`
3. `app/scripts/o1_cart_customer_state.vitest.ts` (new)

Do not change `O1TossCheckout`, API/runtime/repository/auth/payment/provider/economic logic, schema/migration, CSS, route/page, manifest/lock/config, or any fourth path.

## Frozen behavior

### Add-to-cart

- Replace the 1.6-second-only success with explicit `idle | adding | added | error` presentation.
- While adding: one request maximum, button disabled, `aria-busy`, `장바구니에 담는 중…`.
- Success: persistent inline `aria-live` result `장바구니에 담겼어요.` plus working `/cart` link; no timeout-only evidence.
- Non-OK/throw: generic Korean inline `role="alert"` copy, no raw category/body/identifier, and focus returns to the action.
- Sold out: `지금은 담을 수 없어요.`, disabled. Existing server price/SKU/offer authority remains unchanged.

### O1 cart only

- Existing O1/OFF checkout branch remains intact; do not modify the checkout component or mock/O1 economic routes.
- O1 must not fetch or render coupon/wishlist behavior; those remain unchanged in O1 OFF.
- Per-line quantity/remove operations may be optimistic only if the exact previous view is restored on non-OK/throw. Show bounded inline error and focusable retry context; never silently swallow.
- Disable only the affected line while its mutation is pending; expose bounded busy/live text.
- Sold-out line renders `지금 구매할 수 없는 상품이에요.`, permits remove, and blocks the O1 checkout trigger.
- Quantity decrement/increment and remove controls have explicit accessible names. O1 OFF behavior remains unchanged.
- Empty cart and total/count facts remain existing behavior; no client repricing or new cart semantics.

## Tests first

Create one focused adversarial source-contract test proving:

- durable added/error states, busy duplicate refusal, `aria-busy`/live/alert/focus return, and no success timeout;
- O1 coupon/wishlist fetch/render is unreachable while legacy O1-OFF code remains;
- O1 mutation rollback covers both non-OK and thrown transport, with affected-line busy/error;
- sold-out line blocks O1 checkout but remains removable;
- O1 mock checkout remains impossible and O1 OFF legacy checkout remains present;
- no raw server/provider error is rendered.

Expected RED: current add success is timeout-only and non-OK is silent; cart always fetches/renders coupons and wishlist; quantity/remove failure is swallowed without rollback; sold-out does not block O1 checkout.

Run only from `app/` using the existing worktree-local dependency state:

`./node_modules/.bin/vitest run scripts/o1_cart_customer_state.vitest.ts -t "O1 add and cart state coherence"`

Run once for RED, patch only the two source files, run the identical command once for GREEN. No install, generate, build, typecheck, broad test, DB/runtime/browser/provider/network.

## Closure

Inspect exact three-path diff, `git diff --check`, package/lock unchanged, no new ignored residue. Preserve the existing ignored worktree-local `node_modules` for later focused modules. One truthful additive commit and non-force push; clean/upstream-equal. Return <=60 lines inline and STOP before M2B.

If rollback requires an API change/new state contract or checkout/payment/economic semantics, return `HOLD` without patching outside the ceiling.

RETURN_TO: `foundation-advisor`
STOP.
