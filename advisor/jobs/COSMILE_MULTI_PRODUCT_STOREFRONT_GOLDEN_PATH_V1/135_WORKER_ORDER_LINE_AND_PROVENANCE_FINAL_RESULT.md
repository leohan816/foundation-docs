# WORKER RESULT — ORDER LINE PROJECTION + SNAPSHOT PROVENANCE (FINAL)

Status: **PASS**

## Pins

- Correction `133` at docs `f5897d26cd5b9bf5c29bca9702e407aebdbfd816`; computed sha256 `99236fcecb9a5435aa206ffd9100511165b4de25231f6db69563ac8c0ea6f8a4`.
- Handoff `125` (docs `36b9de4`) implemented; disposition `129` (docs `39c3997`) honored.
- Product base `76497d6bbcd01b42e4a3c3871329bf150a95d1d6` → commit `48939e86cc9c3e9da8cf55659ec247cc91e8e071`, non-force pushed, clean/upstream-equal.

## The two named corrections, and nothing else

1. `o1_checkout_start_idempotency.vitest.ts` — defined the missing local reader exactly as specified, using the suite's existing `node:fs` / `node:path` imports.
2. `o1_order_lifecycle.vitest.ts` — added the exact seeded line `{ title: "K-Beauty Item 1", sku: "sku_a", quantity: 1, unitPrice: 1000, totalPrice: 1000 }` to the one stale whole-object equality that predated the newly authorized `lines` key.

No other test or source edit; all prior eight-path deltas preserved.

## Corrected focused gate (run once)

`3 passed (3)` files, `18 passed | 85 skipped (103)`, exit `0`.

It proves: the fail-closed bounded line projection, SKU as the sole newly admitted catalog identifier with no buyer/capture/payment/internal id, authorization ahead of repository access, the exact Korean UI table with `—` and integer KRW and no PII, replay/idempotency unchanged, and the future snapshot connection. As disposition 129 stated, it intentionally makes no claim about the unrelated pre-existing M3F request-scope harness.

## Delivered contract

**A — operator order-line read.** Repository reads existing `OrderItem` values only (`productNameSnapshot`, `skuId`, `quantity`, `unitPrice`, `totalPrice`) ordered by row id, with no join to buyer, payment, provider or reservation data. The service validates rather than repairs: blank title, blank SKU, non-positive/fractional quantity, negative/fractional price, or `totalPrice !== unitPrice * quantity` each fail closed as the existing `repository_error`. Authorization still precedes repository access. The detail panel adds one Korean table (`상품`/`SKU`/`수량`/`단가`/`합계`), `—` for a null SKU, integer KRW only; all existing operator surfaces and action regions untouched.

**B — Foundation snapshot provenance.** The already-verified `snapshotContentSha256` flows through the server-priced line and `O1CheckoutOrderCreateInput`; the one real Prisma `OrderItem` create connects `foundationSnapshot` by that unique sha, failing closed if it cannot be connected — no fallback, no backfill, no invented ref, historical row still null. It is **not** in `deriveO1OrderNo` or the exact-replay tuple, so the idempotency signature remains owner/SKU/product/quantity/unit price and replay still yields one order, one active reservation, one intent, no provider call.

## Containment

- Exactly the eight ceiling paths; 270 insertions, 7 deletions. `git diff --check` exit `0`. `package.json`, `package-lock.json`, `prisma/` unchanged. No ninth path, no schema or migration change.
- No DB, runtime, browser, provider, build, typecheck, refund or economic action. Seven-SKU shared-path evidence and the one-SKU captured economic evidence remain separate; no refund or reversal was performed.

## Not proven

- Compile-time typecheck and build were not authorized in this WorkUnit and were not run; correctness rests on the focused gate.
- The three pre-existing M3F `cookies was called outside a request scope` harness failures are **still failing** and are explicitly outside this gate — they were neither fixed nor normalized.
- No runtime or database exercised the new SQL, the `foundationSnapshot` connect, or the rendered table; those remain for a later authorized runtime gate.
- The post-reversal 8-product storefront requirement is recorded separately and did not enter this correction.
