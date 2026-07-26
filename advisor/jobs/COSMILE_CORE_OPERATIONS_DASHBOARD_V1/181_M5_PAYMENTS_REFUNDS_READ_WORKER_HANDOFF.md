# Worker handoff — M5 Payments & Refunds real-read surface

VERDICT: `PROCEED_WITH_LIMITS`

MISSION: `COSMILE_CORE_OPERATIONS_DASHBOARD_V1`
MODULE: `M5_PAYMENTS_REFUNDS_READ`
BASE: `2ccde154618f1bf31f48727ad33d4964495dc763`
ACTOR: existing `cosmile:claude.0` Worker
RUNTIME: Claude Opus 5 / xHigh, exact mission worktree, same role/session
SKILL: `/fable-builder` with implementation-execution, contract-to-code-mapping, test-design-before-code; implementation-report-template only at completion

## Exact path ceiling

1. `app/src/lib/operator/paymentRefundRead.ts` — new
2. `app/src/lib/operator/paymentRefundReadRepository.ts` — new
3. `app/src/app/dashboard/payments/page.tsx` — new
4. `app/src/app/dashboard/page.tsx`
5. `app/src/components/operator/OperatorShell.tsx`
6. `app/scripts/o1_core_dashboard_payments.vitest.ts` — new
7. `app/scripts/o1_core_dashboard_reads.vitest.ts`
8. `app/scripts/o1_core_dashboard_shell.vitest.ts`
9. `app/scripts/o1_dashboard_reads.vitest.ts`

No schema, migration, capability catalog, existing payment command/service, route handler, fixture, manifest, config, or other path.

## Frozen read contract

- Read-only only. Use existing `dashboard.operations.read`, then existing `orders.read` and `reconciliation.read`, all resolving to the same `operatorRef`. Do not use `refund.full_execute` as a read grant.
- Add no capability. Do not edit `capability.ts`.
- Bound the service to integer limit `1..100`, default page/home limit `50`, exactly one repository call, and whole-result fail-closed `repository_error` on throw, non-array, duplicate order number, malformed row, invalid count/date/amount/currency, or incoherent money tuple.
- Repository uses exactly one bounded parameterized read over existing `Order`, `PaymentIntent`, `PaymentTransaction`, and `Refund` truth. It selects only:
  - `Order.orderNo`, `Order.status`, `Order.total`, `Order.currency`, `Order.createdAt`;
  - counts of total/open/captured intents;
  - count and amount/currency of succeeded capture transactions;
  - count/status/amount/currency of non-failed refunds and count of failed refunds.
- Include only O1 orders with non-null `orderNo` and at least one bound `PaymentIntent`; deterministic order `createdAt DESC, id DESC`; limit is parameterized.
- Never select or return internal order/intent/transaction/refund IDs, customer/user/guest/contact/session fields, provider names/references/keys, idempotency keys, webhook/raw payload/body/digest, driver errors, or secrets.
- Durable category mapping only:
  - payment: `pending` when open intent exists and no succeeded capture; `captured` only for exactly one succeeded full-KRW capture; otherwise `not_captured`;
  - refund: `none`, `in_progress`, `refunded`, or `failed_recorded` from the exact persisted counts/status;
  - more than one succeeded capture or more than one non-failed refund, missing amount/currency for an existing capture/refund, non-KRW, negative/noninteger money/count, or capture/refund amount unequal to `Order.total` fails the whole projection closed.
- Do not infer provider truth, settlement, authorization, profitability, net sales, partial refund, inventory restoration, or latest-row state. Show `Order.status`, payment category, capture amount, refund category, and refund amount as distinct durable facts so cross-layer mismatch stays visible.

## UI contract

- `/dashboard/payments`: Korean-first title `결제·환불`; synthetic non-production label; stable columns `주문번호 / 주문 상태 / 결제 상태 / 결제 금액 / 환불 상태 / 환불 금액`; exact persisted KRW amounts only; no provider/internal identifiers or PII.
- Summary cards: bounded row count, succeeded-capture row count, completed-full-refund row count only. No revenue, trends, rates, invented KPI, or aggregate money.
- Zero rows keep the same headers and an in-table confirmed `0건` panel. Denied/unavailable/disabled remain distinct and never become zero.
- No button, form, input, select, link-to-command, fetch, POST, handler, action, step-up, nonce, refund execution, inventory/order mutation, or reconciliation recovery control.
- Home uses the same read service/repository once after the same two grants; its Payments & Refunds overview tile becomes a truthful row-count state. No second home payment read or action queue.
- Activate only the existing `결제·환불` nav row at `/dashboard/payments`; bounded Dashboard href total becomes `11`.
- Rebase `o1_dashboard_reads.vitest.ts` only for the already-accepted M4 D04 removal and this exact M5 Payments read/tile; preserve every other assertion.

## Tests first and exact commands

First change only the four test paths. Add pure injected-repository tests for bounds, one-call, empty confirmed zero, mapping, malformed/duplicate/incoherent fail-closed, full-KRW equality, and secret/PII/error non-exposure; add source-contract tests for one parameterized read, allowed fields only, no writes; add page/home/nav/zero-shell/no-command assertions.

Run RED once:

```bash
cd -- /home/leo/Project/.worktrees/Cosmile/COSMILE_CORE_OPERATIONS_DASHBOARD_V1/app
./node_modules/.bin/vitest run scripts/o1_core_dashboard_payments.vitest.ts scripts/o1_core_dashboard_reads.vitest.ts scripts/o1_core_dashboard_shell.vitest.ts scripts/o1_dashboard_reads.vitest.ts --config vitest.config.ts
```

Then implement only the five source paths and run the identical GREEN once. First unexpected command failure or GREEN failure is HOLD: no diagnosis, correction, or rerun.

## PASS path / STOP

On PASS only: inspect exact nine paths, run `git diff --check`, confirm `capability.ts` and schema untouched and effects `0`, commit once as `feat(cosmile): add payments and refunds read view`, non-force push once, verify clean/upstream-equal, write:

- `advisor/jobs/COSMILE_CORE_OPERATIONS_DASHBOARD_V1/182_M5_PAYMENTS_REFUNDS_READ_RESULT.md`
- `advisor/jobs/COSMILE_CORE_OPERATIONS_DASHBOARD_V1/183_M5_PAYMENTS_REFUNDS_READ_POINTER.md`

No install, build, typecheck, DB, grant, runtime, browser, provider/network, economic effect, Reviewer, M6, or next mission. Result ≤80 lines; pointer ≤25 lines. Return to `foundation-advisor` and STOP.
