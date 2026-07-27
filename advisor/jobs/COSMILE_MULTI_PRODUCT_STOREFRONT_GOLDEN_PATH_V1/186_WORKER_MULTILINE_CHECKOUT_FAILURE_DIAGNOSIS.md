# WORKER DIAGNOSIS — MULTI-LINE CHECKOUT FAILURE

Status: **CAUSE PROVEN** (read-only; nothing mutated)

- Handoff `184` at docs `b082a7e088ebeb33affe822ce5f42536f19eaaaf`; computed sha256 `ff4ddc2109f8a4902e979b7acc0528f87039b571df02a0ee76a9d40ab19a3eab`.
- Product `b39e914bd65899b1dd05de277124fc9eb0ffc80a`, clean/upstream-equal before and after.

## 1. Durable effect of the failed attempt: **zero**

Current counts are byte-identical to the preserved baseline: orders total **3** (`paid:1, pending:2`), order items **3**, payment intents **1**, payment transactions **1**, succeeded captures **1**, refunds **0**, inventory reservations **3** (`committed:1, reserved:2`). No new Order, PaymentIntent, PaymentTransaction/capture or InventoryReservation was created.

Runtime log, `POST /api/o1/checkout/start` in order: **409 ×5 → 200 ×1 → 409 ×3**. The single 200 is the golden paid order; the trailing 409s are the recent attempts. One provider-route line exists in the whole log (the golden success); the recent attempts produced none.

## 2. First internal failure boundary: **transport preflight, before any Toss handoff**

The owned runtime has **no admitted transport**: `O1_TOSS_SANDBOX_ONE_SHOT` absent and `O1_TOSS_LOCAL_SUBSTITUTE` absent (Toss mode TEST, runtime enabled, `NODE_ENV=development`). `resolveO1Transport` returns `unavailable` when neither the official one-shot gate nor the local-substitute flag is satisfied.

Since the E5 correction, that check is the `(a0)` preflight at `o1CommerceRuntime.ts:372` — **before** the catalog loop (`:377`), before `createOrder` (`:420`), before `reserve` (`:442`) and before `createIntent` (`:451`). So the outcome is `intent_rejected` with category **`transport_unavailable`**, which the route maps to **HTTP 409**.

This is fully consistent with fact 1: the refusal happens before the first durable write, which is exactly why nothing was created. It is also independent of cart contents — with no transport admitted, *any* checkout start returns 409 at the same boundary.

## 3. Active customer cart facts

Two active customer carts exist, belonging to **two distinct owners** (5 lines, 5 distinct SKUs, total quantity 7 overall; zero lines with a null SKU; stock sufficient on all 5):

| cart (anon) | lines | distinct SKUs | total qty | candidate-SKU lines | superseded-snapshot lines | owner's orders |
|---|---|---|---|---|---|---|
| 1 | 2 | 2 | 4 | 1 | **1** | 2 |
| 2 | 3 | 3 | 3 | **3** | 0 | 1 |

- **4 of 5** lines satisfy the full admitted predicate (one of the seven active `o1tc_` candidate SKUs, non-hidden, positive server price, sufficient stock, `missing_initial` snapshot).
- The **one** non-admitted line is a legacy-prefix SKU whose binding resolves to a **`superseded`** snapshot — the old representative superseded when the F2 candidate import ran. Its SKU row still exists, is active, non-hidden and priced, so only the snapshot lifecycle disqualifies it.
- That stale line sits in cart 1. Cart 2 — the cart of the owner holding the single paid order — is **clean**: 3 lines, 3 distinct SKUs, all admitted.

## 4. Multi-line support: **no first-line or single-SKU assumption**

The route maps **every** cart item with a non-empty SKU (bounded to 20) into `lines`; the runtime loops every line through catalog revalidation and accumulates all of them into `priced`; reservation loops every priced line; the derived order number sorts the whole canonical line set. The client posts an empty body so the cart is the source. Nothing selects only the first line or a single SKU.

One genuine consequence, correct but worth stating: catalog revalidation is **all-or-nothing** — a single non-admitted line rejects the entire checkout. So cart 1 would additionally fail `catalog_rejected` on its superseded line *if* it ever got past the transport gate.

## 5. Smallest contained correction

**Primary (not a code fix):** the transport gate is a runtime-configuration state, not a defect. Admitting a transport for the attempt — the official sandbox one-shot, or the clearly-labelled local substitute — is an owned-runtime action requiring Advisor authority. **No existing mission authority covers it**, and this handoff forbids runtime action; no code change is warranted.

**Secondary (only if cart 1's owner must check out):** its stale legacy line can never be admitted while its snapshot is `superseded`. The smallest contained options, in preference order:
1. no code change — remove that one line from the cart (a customer/operator action needing its own authority); or
2. if the product decides a stale line should be surfaced rather than silently blocking, a bounded cart-view correction marking non-admitted lines unavailable. Exact ceiling would be `app/src/app/cart/page.tsx` plus `app/scripts/o1_multi_product_storefront.vitest.ts`. **Not covered by existing mission authority** — it needs a new freeze, and I did not implement or design it here.

No correction is needed in the checkout route, runtime algorithm, projector or idempotency contract.

## Containment

Read-only throughout: the seven named source/log boundaries and read-only Prisma counts/categories/booleans in transactions marked `SET TRANSACTION READ ONLY`. The runtime environment was used internally only — no value printed. No identifier, order number, SKU key, cookie, subject, address, secret, provider body or raw timestamp is reported. No code, test, DB, runtime, cart, session, provider, refund or economic action; no retry. Golden Reversal remains HOLD.

One correction to my own work during this diagnosis: an initial aggregate query failed with a SQL scoping error (`42P01`) inside a read-only transaction and was re-issued correctly. It read nothing and changed nothing.

## Not proven

- Which owner made the failed attempt is **not** established — that would require identifier output, which is forbidden. The transport-gate conclusion holds for either owner, since the preflight precedes every cart-dependent stage.
- The `409` category was inferred from the frozen flag state plus code order, not read from a response body: the log records status only.
