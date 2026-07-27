# WORKER RESULT — MULTI-LINE GOLDEN ORDER INVARIANTS

Status: **PASS** — all seven invariants hold. Read-only; nothing mutated.

- Handoff `196` at docs `789d13ed0121fcaace17ddde8bc3263c84179065`; computed sha256 `7d4cc359245ed7e31cc0608ee24c8b1b6bfe78b7aab586bfc77453faf35acb58`.
- Product `b39e914bd65899b1dd05de277124fc9eb0ffc80a`, clean/upstream-equal. Leo evidence accepted as `MULTILINE_ORDER_VISUAL_OK`.

## The seven invariants

| # | Required | Observed | Verdict |
|---|---|---|---|
| 1 | orders `4` (`paid 2`, `pending 2`), exactly one new paid Order | 4 total, paid **2**, pending **2** (paid rose 1 → 2) | ✅ |
| 2 | exactly one new captured intent/transaction/economic effect; duplicates `0` | totals rose 1 → **2** for intents, transactions and succeeded captures; the new order has **1** intent, **1** succeeded capture, **1** transaction in total; orders with >1 succeeded capture **0**; orders with >1 intent **0** | ✅ |
| 3 | new order has `3` items, `3` distinct admitted candidate SKUs, quantity `3` | items **3**, distinct SKUs **3**, total quantity **3**, items on active `o1tc_` candidate SKUs bound to `missing_initial` snapshots **3** | ✅ |
| 4 | item sums, order total, intent and capture amount all bind to KRW `80,000` | item sum **80000** = order total **80000** = intent amount **80000** = capture amount **80000**; order currency KRW **true**; every transaction KRW **true** | ✅ |
| 5 | exactly one reservation/commit set for the three lines, committed quantity `3`, no duplicate active reservation | new-order reservations **3**, statuses `committed:3`, committed quantity **3**, duplicate active `(orderId, skuId)` sets **0** (global total 6 = 3 pre-existing + 3 new) | ✅ |
| 6 | checkout cart closed/consumed consistently | buyer active carts **0**, buyer active cart lines **0**, buyer `checked_out` carts **2** (the earlier golden order plus this one) | ✅ |
| 7 | refunds `0`, reconciliation/open anomaly `0`, no provider retry after the successful effect | refunds **0**, open/in-progress reconciliation tasks **0**, non-succeeded payment transactions **0** | ✅ |

Notably the multi-line path behaved exactly as the contract requires: three distinct SKUs produced **one** order, **one** intent, **one** capture and **one** committed reservation per line — no per-line duplication of economic effect, and no duplicate order from the deterministic replay boundary.

## Containment

Read-only throughout: a single `SET TRANSACTION READ ONLY`, `REPEATABLE READ` transaction with a bounded statement timeout, against the active non-production DB reached through the running runtime's environment (used internally, never printed). Only counts, categories and booleans are recorded — no identifier, order number, SKU key, provider reference, secret, raw body, timestamp or PII.

No product, test, DB, runtime, browser, provider, refund or economic action. Product tree untouched and clean; the runtime was not restarted and its one-shot remains OFF with the local substitute absent.

## Not proven

- The invariants are proven at the database level only. No HTTP, browser or provider verification was performed in this gate, so the visual/UI confirmation rests on Leo's accepted `MULTILINE_ORDER_VISUAL_OK`.
- Item 7's "no provider retry" is evidenced by DB facts (zero non-succeeded transactions, zero duplicate captures/intents); the runtime log was not consulted, since this handoff scopes evidence to the database.
- Detail placement confirmation and Golden Reversal status are outside this gate and unchanged by it.
