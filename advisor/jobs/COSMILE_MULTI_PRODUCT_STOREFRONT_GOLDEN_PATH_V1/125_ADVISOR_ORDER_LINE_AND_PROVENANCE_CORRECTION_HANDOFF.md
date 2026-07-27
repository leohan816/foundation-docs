# WORKER HANDOFF — ORDER LINE PROJECTION + FUTURE SNAPSHOT PROVENANCE

## Pins and decision

- Mission: `COSMILE_MULTI_PRODUCT_STOREFRONT_GOLDEN_PATH_V1`
- Product branch: `implementation/cosmile-multi-product-storefront-golden-path-v1-20260726`
- Base: `76497d6bbcd01b42e4a3c3871329bf150a95d1d6`, clean/upstream-equal
- Decision: `GOLDEN_ORDER_CAPTURED_WITH_BOUNDED_PROJECTION_GAPS`
- Runtime containment already complete: owned runtime restarted; one-shot `OFF`, local substitute `OFF`, TEST mode retained; provider/economic effects unchanged.

## Required binding

- Same existing Cosmile Worker only.
- Actual Claude Opus 5, effort `xhigh`, exact product worktree.
- Load current Agent Office/Worker rules and `/home/leo/Project/skill/fable-builder/SKILL.md` plus only its required references.
- Tests first. Preserve meaningful RED. No broad read, build, typecheck, DB, browser, runtime, provider, refund, or economic command.

## Exact eight-path ceiling

1. `app/src/lib/order/contracts.ts`
2. `app/src/lib/order/repository.ts`
3. `app/src/lib/order/service.ts`
4. `app/src/components/commerce/O1OperatorPanel.tsx`
5. `app/src/lib/runtime/o1CommerceRuntime.ts`
6. `app/scripts/o1_order_lifecycle.vitest.ts`
7. `app/scripts/o1_operator_request_detail_ui.vitest.ts`
8. `app/scripts/o1_checkout_start_idempotency.vitest.ts`

No ninth path. No schema/migration/config/manifest/lockfile change.

## Frozen contract

### A. Operator order-line read

- Extend the existing authorized operator order projection only.
- Repository reads existing `OrderItem` values only: `productNameSnapshot`, `skuId`, `quantity`, `unitPrice`, `totalPrice`, ordered by stable row id.
- Public bounded line shape: title, nullable SKU, positive integer quantity, non-negative integer unit/total price. Require `totalPrice === unitPrice * quantity`; malformed durable data fails closed as the existing `repository_error`, never partial/fabricated success.
- Preserve operator authorization before repository access and all current categorical order/payment/refund/inventory/reconciliation fields.
- No buyer/customer/contact/address/provider reference/internal order id.
- Dashboard detail panel adds one Korean table with `상품`, `SKU`, `수량`, `단가`, `합계`; nullable SKU displays `—`; integer KRW formatting only. Existing action surfaces remain byte-semantically unchanged.

### B. Future Foundation snapshot provenance

- Carry the already-verified `O1CatalogItem.snapshotContentSha256` through the server-priced line and `O1CheckoutOrderCreateInput`.
- Do **not** add it to `deriveO1OrderNo` or exact replay/economic tuple. Owner/SKU/product/qty/unit price remain the idempotency signature.
- In the one real Prisma `OrderItem` create mapping, connect `foundationSnapshot` by the unique `snapshotContentSha256`.
- New orders fail closed if that already-verified snapshot cannot be connected.
- No schema change, no fallback, no backfill. The already-captured historical row remains absent/null.

## Tests-first oracles

1. `o1_order_lifecycle.vitest.ts`
   - authorized operator receives exact line title/SKU/qty/unit/total;
   - SKU is the sole newly admitted catalog identifier; capture/payment/customer/internal ids remain absent;
   - invalid arithmetic/shape fails closed;
   - authorization still precedes repository access;
   - update only directly stale “count/category only / no SKU” wording or oracle.
2. `o1_operator_request_detail_ui.vitest.ts`
   - exact Korean headers and line values render in the existing detail panel;
   - nullable SKU renders `—`;
   - no buyer/contact/address field or invented value;
   - current request/refund/shipment/step-up surfaces stay intact.
3. `o1_checkout_start_idempotency.vitest.ts`
   - collaborator receives the verified snapshot SHA on every newly created line;
   - the derived order number and replay tuple remain unchanged by snapshot metadata;
   - static production binding proves the single real create path connects `foundationSnapshot` by `snapshotContentSha256`;
   - replay still yields one order/reservation/intent and no provider call.

## Exact focused command

Run this identical command once for RED after test edits, and once for GREEN after source edits:

```bash
cd app && ./node_modules/.bin/vitest run -c vitest.config.ts \
  scripts/o1_order_lifecycle.vitest.ts \
  scripts/o1_operator_request_detail_ui.vitest.ts \
  scripts/o1_checkout_start_idempotency.vitest.ts
```

No additional test command. First unexpected failure: STOP with its exact assertion/category; do not diagnose or retry.

## Return gate

- Confirm exact eight-path containment, `git diff --check`, no DB/runtime/provider/economic effect, and no generated residue.
- Commit once with truthful Worker attribution; non-force push.
- Write compact `127_WORKER_ORDER_LINE_AND_PROVENANCE_RESULT.md` and `128_WORKER_ORDER_LINE_AND_PROVENANCE_POINTER.md` in the existing docs job path, commit/non-force push, then STOP for Advisor.
- Keep seven-SKU shared-path evidence separate from the one-SKU captured economic evidence. No refund/reversal action.
