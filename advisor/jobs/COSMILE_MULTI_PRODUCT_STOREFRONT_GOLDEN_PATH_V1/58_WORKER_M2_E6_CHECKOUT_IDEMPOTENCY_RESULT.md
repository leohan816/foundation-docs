# M2 E6 CHECKOUT IDEMPOTENCY — WORKER RESULT

Status: **PASS**

- Pins verified: handoff 57 docs `f69dc383`, blob `d85ad32d`, sha256 `32e1f91a`; clarification 57A docs `4d9a3bd8`, blob `e28c83cf`, sha256 `aa09d619`.
- Base `e26e1aa1…` clean/upstream-equal → result commit `da0f5dadeeb17779928a6372c9f7ba3cad85015a`, non-force pushed, clean/upstream-equal.
- References loaded: `implementation-execution`, `contract-to-code-mapping`, `test-design-before-code`.

## Contract → code mapping

| Frozen contract element | Landing | Proven by |
|---|---|---|
| SHA-256 over owner + fixed KRW + sorted `{cosmileSkuId, foundationProductId, quantity, unitPrice}` | `deriveO1OrderNo` | cases 1–2 |
| No display text / client price / time / randomness / cookie / guest / provider / secret | derivation reads only the bound tuple | case 1 (decorated lines yield the same number) |
| Bounded opaque `O1-` shape kept | `"O1-" + sha256hex[0..20].toUpperCase()` | case 1 regex `^O1-[0-9A-F]{20}$` |
| Load by exact number; reuse only an exact pending match | `findOrderByNo` + `isExactO1CheckoutReplay` | cases 3, 5 |
| Any status/owner/amount/currency/line mismatch → `intent_rejected / checkout_attempt_conflict`, zero write | early return before create/reserve/intent | case 5 (12 shapes) |
| Absent → create once with the derived number | `createOrder` | case 3 |
| Lost unique race → reload, revalidate, else fail closed | catch → reload → same predicate | case 4 |
| Same order id into reserve and `o1ik_${orderId}` | unchanged lanes, reused id | cases 3–4 |

## Tests-first evidence

Command, identical both runs:

`cd app && ./node_modules/.bin/vitest run scripts/o1_checkout_start_idempotency.vitest.ts --config vitest.config.ts -t "checkout-start idempotent order boundary"`

- **RED** (test only): `6 failed (6)`, exit `1` — `deriveO1OrderNo is not a function`, `makeO1CheckoutStart is not a function`.
- **GREEN** (identical, once): `6 passed (6)`, exit `0`. Layer label: pure, no DB, no network, no provider.

Effect counts asserted on the in-memory fakes for both sequential and concurrent exact replay: orders `1`, committed creates `1`, active reservations `1`, intents `1`, distinct idempotency keys `1`. Concurrency is real: `createAttempts 2`, `uniqueViolations 1`. Provider/economic effect `0` — the only admitted layer is `DETERMINISTIC_LOCAL_COMPOSITION` and both attempts bind the identical `o1ik_${orderId}` key.

## Seam containment

`startO1Checkout` is one permanent binding — `makeO1CheckoutStart(REAL_O1_CHECKOUT_COLLABORATORS)` — with the exact prior lanes (`o1CatalogItem`, `prisma.order`, `wucReserve` + `prismaInventoryRepository`, `createIntent` + `paymentDeps`). Its exported signature is still `(env, owner, lines)`; a case asserts `startO1Checkout.length === 3`, so no caller-supplied collaborator argument exists. The route call site is unchanged. No env or request field can select the seam.

## Containment

- Exactly the two ceiling paths: `app/src/lib/runtime/o1CommerceRuntime.ts` (+230/−65), `app/scripts/o1_checkout_start_idempotency.vitest.ts` (new).
- `git diff --check` exit `0`; package/lock/schema unchanged (0 entries). No DB, runtime, browser, provider, checkout, refund, build, typecheck or install action. The two preserved legacy pending orders and holds were never queried or touched.

## Declared deviations and residue

1. One added fail-closed guard not in the frozen text: if the intent lane returns `action_required`/`idempotent_existing` **without** an intent id, the flow returns `intent_rejected / intent_unbound` instead of emitting a `ready` outcome with an empty id. It can only refuse, never admit.
2. Stale comments in a **third** path (`app/src/lib/runtime/o1LegacyLaneIsolation.ts` and its suite) still name `mintOrderNo()` when describing the order-number shape. The shape is unchanged and that classifier's regex still matches, so behavior is unaffected; correcting the wording would require a third path, so it was left alone.

## Not proven here

- No typecheck, build, DB or live request was authorized; correctness rests on this focused pure suite.
- Other suites importing `startO1Checkout` were not re-run (the handoff forbids other tests). The named export and its 3-argument call shape are unchanged.
- Real Prisma/inventory/payment behavior is unchanged but is exercised here only through fakes that mirror those boundaries; the real lanes' own reviewed suites remain their evidence.
