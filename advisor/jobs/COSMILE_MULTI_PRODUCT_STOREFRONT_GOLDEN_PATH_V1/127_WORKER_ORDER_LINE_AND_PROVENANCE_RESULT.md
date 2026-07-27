# WORKER RESULT — ORDER LINE PROJECTION + SNAPSHOT PROVENANCE

Status: **HOLD** — the single RED run surfaced four failures outside my intended RED set. Stopped before any source edit, no diagnosis, no retry, per handoff 125 §"Exact focused command".

## Pins

- Handoff `125` at docs `36b9de4caa1c67e960eb06193de04f2eeaf85fb1`; computed sha256 `5b6f5629df78fe7c96c076613ff18a0b42007710617692f8c1b6bbd06250dbea` (no sha was pinned in the dispatch — recorded as evidence).
- Product base `76497d6bbcd01b42e4a3c3871329bf150a95d1d6`, clean/upstream-equal at start.
- Worker rules loaded: `docs/agent/RUN_PROTOCOL.md`, `docs/agent/RESULT_REPORTING_PROTOCOL.md`. `/fable-builder` references already loaded and previously verified byte-identical.

## What I completed

Tests-first edits to exactly the three authorized focused test paths, encoding the frozen oracles:

- `o1_order_lifecycle.vitest.ts` — fake repository now returns existing `OrderItem` values only (`productNameSnapshot`, `skuId`, `quantity`, `unitPrice`, `totalPrice`) in stable row order; new cases for exact line title/SKU/qty/unit/total, null SKU carried as `null`, SKU as the sole newly admitted catalog identifier with no buyer/capture/payment/internal id, and eight malformed-shape/arithmetic cases failing closed as `repository_error`. The directly stale describe wording "count/category only" was updated to "bounded line + count/category projection".
- `o1_operator_request_detail_ui.vitest.ts` — exact Korean headers `상품`/`SKU`/`수량`/`단가`/`합계`, `l.sku ?? "—"`, integer KRW via `toLocaleString("ko-KR")` with no `toFixed`/할인/쿠폰/적립/무료배송, no buyer/contact/address field, and all eleven pre-existing operator surfaces asserted intact.
- `o1_checkout_start_idempotency.vitest.ts` — the verified snapshot SHA reaches every newly created line; the derived order number is unchanged by that metadata; `deriveO1OrderNo` and `isExactO1CheckoutReplay` regions must not mention `snapshotContentSha256`; the one real create path connects `foundationSnapshot` by `snapshotContentSha256` with no `connectOrCreate`/`upsert`/direct-ref fallback; replay still yields one order/reservation/intent.

## RED (run once, exactly the frozen command)

`3 failed (3)` files, `12 failed | 91 passed (103)`, exit `1`.

**Eight failures are the intended RED** — three in `o1_order_lifecycle`, two in `o1_operator_request_detail_ui`, three in `o1_checkout_start_idempotency`, each on a newly added oracle (e.g. `the already-verified snapshot identity: expected undefined to be 'sha-csku-a'`; `the line table lives in the existing detail panel: expected … to contain 'op-order-lines'`; `arithmetic mismatch must fail closed: expected { kind: 'ok', … } to deeply equal { kind: 'repository_error' }`).

**Four failures are unexpected and are in tests I did not author or modify** — the stop point:

| Test | Exact failure |
|---|---|
| `M3F disabled/denied/failed-order-view make zero downstream request or nonce calls` | `Error: cookies was called outside a request scope` |
| `M3F ok view reads the request exactly once and mints a nonce only for null or refund_request` | `Error: cookies was called outside a request scope` |
| `M3F detail invalid_input is 400 and repository_error/unknown is 500` | `Error: cookies was called outside a request scope` |
| `WU-1 default legacy behavior stays compatible and legacyActionsEnabled=false yields HOLD/control 0` | `AssertionError: expected '"use client";\n\nimport { useEffect, …' to contain 'operatorActionSurface(mode, legacyActionsEnabled)'` |

All four live in `o1_operator_request_detail_ui.vitest.ts`. My edit to that file only appended one `describe` block before the closing brace and changed no existing case. Three of the four fail with a Next request-scope runtime error that a test-only append cannot cause.

**I did not diagnose them and did not re-run anything**, so I have *not* established whether they pre-exist at base `76497d6` or were somehow provoked here. Determining that needs one command the handoff forbids.

## State

- Product delta is **test-only and uncommitted**: the three authorized test files are modified in the working tree; no source file was touched, so paths 1–5 of the ceiling are byte-identical to base. No ninth path. No commit, no push.
- No DB, runtime, browser, provider, build, typecheck, schema, migration, config, manifest or lockfile action. No refund/reversal. No economic effect.
- Seven-SKU shared-path evidence and the one-SKU captured economic evidence remain separate and untouched.

## Blocker for the Advisor

Either (a) confirm the four failures pre-exist at base and authorize one re-run plus the source phase, or (b) authorize a bounded diagnosis of `o1_operator_request_detail_ui.vitest.ts`. I will not choose between them unilaterally, and I did not weaken or skip any failing case to get past them.
