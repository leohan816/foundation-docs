# WORKER RESULT — DASHBOARD / ORDERS PRESENTATION, NAVIGATION AND KST CAPTURED SALES

Status: **PASS** — freeze `206/207` implemented; single focused gate green; six paths only.

- Correction `212` at docs `d68c12ae32604d6462ec190fcfa5cbf4a500f8a2`; computed sha256
  `57bf47adfa1037f1a846b9c8466fa2d3aaab508b6b42b8a023e10867877d65e4` — matched before acting.
- Handoff `208` (docs `3e15f9a`) bounds unchanged. Base `b39e914`; result commit `52343f5`, pushed non-force,
  tree clean and upstream-equal.
- The three uncommitted test deltas and the original RED (`4 failed | 30 passed`, exit `1`) were preserved; RED was
  **not** re-run, per the correction.

## Stale-oracle correction (test path already authorized, `o1_core_dashboard_reads.vitest.ts`)

Applied exactly as frozen, nothing more:

1. Renamed the assertion to what it can still prove — *no customer authority, direct data access, command surface,
   provider execution or identifying display*.
2. Removed only the five overbroad read-display tokens: `shipment`, `amount`, `currency`, `KRW`, `price`.
3. Retained every customer/session, direct-Prisma/query, form/input/button/onClick/fetch/POST, nonce/step-up,
   refund-execution, restock/recovery, email and phone prohibition — verified present after the edit.
4. Added the contract comment recording that accepted M3A and freeze `206` permit only **existing reviewed**
   shipment/economic read facts, and that the focused Orders/Payments suites separately pin source, fields,
   fail-closed behaviour and the no-write boundary.

## Contract → code

| Freeze clause | Landing | Proof |
|---|---|---|
| A — identity inversion | `src/app/dashboard/orders/page.tsx` | the anchor wraps `row.orderNo` on the **existing** encoded detail route; `row.title` + `외 N건` render as secondary text after `</Link>`; `row.orderId` still appears only as key and encoded href |
| B — pure captured-sales projection | `src/lib/operator/capturedSalesSummary.ts` (new) | sums only rows the reviewed read already classified `captured`, only when `captureAmount` is present and the row is KRW; KST (UTC+9) calendar windows compared as UTC instants; a read at its bound returns `{unavailable, bounded_read_limit_reached}` and **no** total |
| C — KST bounded basis on the home | `src/app/dashboard/page.tsx` | visible `KST (UTC+9)` basis and `조회 범위` scope line; unknown/denied states reuse the existing closed Korean copy instead of a fabricated zero |
| D — navigation and split destinations | `src/app/dashboard/page.tsx` | order count and Recent Orders link `/dashboard/orders`; each recent order number links its existing encoded detail route with `orderId` non-visible; captured count → `/dashboard/orders`, completed-refund count → `/dashboard/payments` |

## GREEN (frozen command, run once)

`3 passed (3)` files, `54 passed (54)`, exit `0`.

## Boundary

- Exactly six changed paths — three tests, two pages, one new pure helper. No seventh path; no scratchpad or log output.
- Reads unchanged: still exactly one `o1OperatorOrderList(50)` and one `readPaymentRefunds(` on the home. No new
  capability, destination, query or command surface; the action queue stays three rows and gains no payments row.
- No build, full suite, typecheck, DB, runtime, browser, provider, refund or economic action. Schema 0, DB writes 0.
- The helper is import-pure (a single erased type import) and derives no settlement, profit, rate, partial-refund,
  tax or fee figure — pinned by its own assertion.
- `orderId` was added to the home's bounded recent projection **only** as an encoded href binding; it is never
  rendered, and the projection widens to none of the prohibited fields.

## Not proven

- Only the three focused suites were run. No typecheck, build, browser or runtime verification of these surfaces was
  performed under this freeze, so compile-level and rendered-DOM behaviour remain unverified here.
- The captured-sales windows are proven over injected rows only; no live payment data was read.
- Rows whose timestamp cannot be resolved are excluded from every window (deterministic, never guessed); no test
  covers that case.

RETURN_TO: Advisor
