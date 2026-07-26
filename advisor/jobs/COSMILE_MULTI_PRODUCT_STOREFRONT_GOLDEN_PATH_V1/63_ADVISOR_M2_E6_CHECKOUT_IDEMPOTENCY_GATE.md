# M2 E6 — ADVISOR CHECKOUT IDEMPOTENCY GATE

Status: **PASS_CODE / CHECKOUT_RETRY_HOLD**

## Candidate

- Product: `e26e1aa18f1d58f1b6354a14b4a46bbd41aa5c97`
  → `da0f5dadeeb17779928a6372c9f7ba3cad85015a`
  → `4dd56c12c72a4e6921295ab26910fbc8abff2526`
- Final correction result: docs `da7e9a4`, files `61`/`62`.
- Product and docs are clean/upstream-equal.

## Advisor validation

- Exact cumulative product paths: runtime checkout composition, checkout-start route, and one focused test.
- The authenticated customer plus exact server-admitted KRW line tuples derive one opaque deterministic order number.
- Canonical JSON prevents separator/newline field-boundary collisions; different owner/quantity/price/binding differ.
- Existing order reuse requires pending status, exact owner, no guest, KRW, exact totals, zero discount/shipping, and the
  exact item multiset. Any mismatch refuses before create/reserve/intent.
- Concurrent create converges through existing unique `Order.orderNo`; the loser reloads and revalidates.
- The same order id feeds existing reservation idempotency and `o1ik_${orderId}` intent idempotency.
- Exactly one newly created intent returns `ready`. An existing intent returns `pending_replay`; the route converts it
  to category-only HTTP 409 with no success flag, order/intent identifier, client key, or evidence layer. It cannot
  reach the existing provider-opening client branch.
- Production `startO1Checkout` remains one fixed binding to the prior real catalog, Prisma order, inventory, and
  payment collaborators. The test factory is not request- or environment-selectable.

## Focused evidence

- Initial E6 RED: `6 failed`, exit `1`; GREEN: `6 passed`, exit `0`.
- Advisor safety correction RED: `5 failed / 4 passed`, exit `1`, reproducing both a second-ready response and a real
  delimiter collision.
- Corrected identical GREEN: `9 passed`, exit `0`.
- Sequential and concurrent replay each yield exactly one `ready`, one `pending_replay`, one order, one active
  reservation, one intent, one idempotency key, and zero provider call in the focused pure boundary.
- `git diff --check` passes; package, lockfile, and schema are unchanged.

## Preserved state and claim limit

- Customer history and Dashboard Orders agreeing on exactly two `payment_pending` orders remains a positive projection
  invariant only, not payment success.
- Those two legacy rows and their two reserved holds remain untouched and ambiguous; this change does not select,
  merge, cancel, release, or clean them.
- Payment intents, transactions, successful captures, refunds, provider calls, and duplicate economic effects in the
  preserved attempt remain zero. The two 409 responses occurred before Toss handoff and are not provider failures.
- No DB, runtime, browser, provider, checkout, refund, build, typecheck, install, or economic action ran in E6.
- The separate multi-product admission blocker remains open.

## Next checkpoint

No browser checkout retry is admitted yet. The next safe action is a separately authorized runtime/review admission
that proves the public process is bound to this product pin and grants exactly one provider window. The current
preserved rows must remain excluded from any automatic cleanup or canonical selection.

This payment-safety delta still requires the mission's final independent Fable 5/max `/fable-sentinel` review from a
fresh context. The existing Reviewer process is correctly Fable 5/max but retains prior-task context; no context-clear
authority was granted for this mission, so no independent-review claim is made at this module gate.
