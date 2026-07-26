# WORKER HANDOFF — M2 E6 CHECKOUT IDEMPOTENCY ONLY

Status: **ACTION_REQUIRED / TESTS_FIRST**

## Pins and binding

- Mission: `COSMILE_MULTI_PRODUCT_STOREFRONT_GOLDEN_PATH_V1`
- Product base: `e26e1aa18f1d58f1b6354a14b4a46bbd41aa5c97`, clean/upstream-equal.
- Read-only diagnosis: docs `97c98c9a93617c4664562cc09f1f7a0047ee5af5`, files `55`/`56`.
- Worker: existing Cosmile Worker only, Claude Opus 5/xhigh, exact mission worktree.
- SKILL: `/home/leo/Project/skill/fable-builder/SKILL.md`; read only
  `implementation-execution`, `contract-to-code-mapping`, and `test-design-before-code`.
  Read `implementation-report-template` only when returning the compact result.

## Exact path ceiling

1. `app/src/lib/runtime/o1CommerceRuntime.ts`
2. `app/scripts/o1_checkout_start_idempotency.vitest.ts` (new)

No third path.

## Frozen contract

After the existing config/owner/non-empty/transport/catalog/price gates, derive one opaque deterministic `Order.orderNo`
from a canonical SHA-256 representation of:

- authenticated `owner.userId`;
- fixed currency `KRW`;
- every admitted server-priced line, sorted deterministically and bound to exact
  `{cosmileSkuId, foundationProductId, quantity, unitPrice}`.

Do not use display text, client price, timestamp, randomness, cookie, guest identity, provider value, or secret in the
signature. Keep the existing bounded opaque `O1-...` order-number shape.

Before creating an order, load by that exact `orderNo`:

- reuse only an exact `pending` order with the same authenticated owner, `guestId=null`, KRW totals, zero
  discount/shipping, and the exact order-item multiset/quantities/server prices;
- any status, owner, amount, currency, or line mismatch fails closed as
  `intent_rejected / checkout_attempt_conflict` with zero write;
- when absent, create the order once with the deterministic `orderNo`;
- if concurrent create loses the existing unique `Order.orderNo` race, reload and reuse only after the same exact
  validation; otherwise fail closed.

Continue the existing reviewed lanes with the reused `orderId`:

- `wucReserve` must receive the same order/line tuple, so its existing idempotent boundary creates no second active
  reservation;
- `createIntent` keeps the existing `o1ik_${orderId}` key, so the existing intent is returned and no second intent or
  economic effect is created;
- return the same pending order/orderNo/intent on sequential or concurrent replay.

The two preserved legacy pending orders have non-derived order numbers and remain untouched. Do not query, select,
merge, cancel, release, or clean them.

An in-file injected order-persistence port is allowed only when needed for deterministic focused tests. It must default
to the real Prisma boundary, must not be environment/caller selectable from a route, and must not bypass any production
check. No new public route contract or alternative write path.

## Tests first

Add one focused suite named exactly `checkout-start idempotent order boundary`. It must prove:

1. canonical line ordering yields the same derived order number;
2. changing owner, quantity, or server price yields a different order number;
3. sequential exact replay returns the same pending order/intent with effect counts:
   order `1`, active reservation `1`, intent `1`, provider/economic `0`;
4. concurrent exact replay converges to those same counts through the unique-order race;
5. same derived number with owner/status/amount/line mismatch fails closed with zero additional effect.

Run exactly:

`cd app && ./node_modules/.bin/vitest run scripts/o1_checkout_start_idempotency.vitest.ts --config vitest.config.ts -t "checkout-start idempotent order boundary"`

- Run once before source change and preserve meaningful RED with exit code.
- Implement only the frozen source contract.
- Run the identical command once and require GREEN.
- No other test, suite, DB, browser, runtime, build, typecheck, install, provider, checkout, refund, or economic action.

## Completion

- Inspect the exact two-path diff and `git diff --check`.
- Verify package/lock/schema unchanged and no runtime/DB/provider effect.
- One additive product commit and non-force push; clean/upstream-equal.
- Write only:
  - `58_WORKER_M2_E6_CHECKOUT_IDEMPOTENCY_RESULT.md`
  - `59_WORKER_M2_E6_CHECKOUT_IDEMPOTENCY_POINTER.md`
- Commit/push those two docs only, then return compact PASS or HOLD and STOP.

STOP on any schema need, inability to prove concurrency with the existing unique boundary, new route/client contract,
legacy-row mutation, provider/economic effect, third product path, or change to established payment/inventory semantics.
