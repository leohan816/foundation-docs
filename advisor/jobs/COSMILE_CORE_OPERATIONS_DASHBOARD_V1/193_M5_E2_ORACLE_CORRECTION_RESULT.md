# Worker result — M5 E2 oracle correction

OUTCOME: `PASS` — corrected four-file gate **79 passed (79)**, run once. Product committed and pushed once. This closes the `187/188` HOLD and completes M5.

MISSION: `COSMILE_CORE_OPERATIONS_DASHBOARD_V1` · MODULE `M5_PAYMENTS_REFUNDS_READ_E2`
ACTOR: same `cosmile:claude.0` · Opus 5/xhigh · `/fable-builder` test-design-before-code.
HANDOFF: docs `7c26dc7246ce7ca36d8ec06b3db866194f6bcfc9`, blob `f84c628f0466fb11814f2f88d943a319cc91a993`, SHA256 `a901d68737e29aeb79a0ba62c20377d7a5ff27ecbaaec49faf0bfe156deb3ec0` — verified.
BASE `2ccde154618f1bf31f48727ad33d4964495dc763` → HEAD `1efde21e2942696b585b8c27e2980e97795cb3e1`; upstream equal, worktree clean. Diagnostic docs `6c0be9a`; grant PASS `612507b` unaffected.

## The four corrections — three test paths only, no source touched this turn

- **F1** `o1_core_dashboard_payments.vitest.ts` — the ordering-sensitive `import { readPaymentRefunds` substring oracle is replaced by canonical module-source presence: the home must import from `@/lib/operator/paymentRefundRead` and from `@/lib/operator/paymentRefundReadRepository`. The exactly-one-call count and the `reconciliation.read` → read grant-order assertions are retained unchanged.
- **F2** `o1_core_dashboard_reads.vitest.ts` — the bare `prisma` ban is replaced by the precise direct-access tokens `@/lib/prisma` and `prisma.`, because a bare match also hits a canonical repository adapter's *name*. `PrismaClient` and `$queryRaw` stay banned, as do every authority, mutation, control-surface, economic and PII token in that list. Verified independently: the home contains **0** occurrences of `@/lib/prisma`, `prisma.`, `PrismaClient` or `$queryRaw`.
- **F3** `o1_dashboard_reads.vitest.ts` — the D01/D03/D05/D07 presence and D02/D04/D06 absence assertions are scoped to the literal `ACTION_QUEUE` and `EVIDENCE_GAPS` array blocks via a comment-stripping extractor, so neither a comment nor the closed-state legend can decide the verdict.
- **F4** same file — the D07 copy assertions are scoped to `EVIDENCE_GAPS`, now requiring both `UNAVAILABLE · 조회 계약 없음` and `현재 조회할 수 없음` inside that block while forbidding `0건` and `집계 조회 계약 없음` there. That is two added requirements, not a relaxation.

No assertion was deleted or weakened, and no product source changed in this turn.

## Gate

Identical four-file command, run once: exit 0, **Test Files 4 passed, Tests 79 passed (79)**, 0 failed, 0 skipped. Evidence chain: M5 RED **5 failed / 60 passed (65)** → first GREEN **4 failed / 75 passed** (HOLD `187`) → E1 diagnostic named all four → E2 **79/79**.

## Containment

`git diff --check` clean. Exactly the nine M5 ceiling paths staged and committed (5 modified, 4 new); leftover `0`; post-push delta `0`. `capability.ts` and `prisma/schema.prisma` show `0` changed lines — no capability added, no schema or migration.

## What M5 proves

At source and pure-behaviour level: the gate chain runtime flag → `dashboard.operations.read` → `orders.read` → `reconciliation.read` with all grants on the same `operatorRef`, and `refund.full_execute` never used as a read grant; bounds 1..100 with default 50; exactly one repository call; empty read as a confirmed zero; durable category mapping for payment and refund; whole-result fail-closed on throw, non-array, duplicate order number, malformed row, bad count/date/amount/currency, more than one succeeded capture, more than one non-failed refund, missing amount or currency, non-KRW, and any capture or refund amount unequal to the order total; a closed `repository_error` that leaks no driver text, gateway reference or secret; one bounded parameterized read-only query over the four existing tables selecting no identifier, customer, contact, gateway, idempotency, webhook or payload field and with no write path; six stable columns with an in-table zero panel and no control surface; and a home tile that is a row-count state with exactly one read and no new action-queue row.

## Not proven

Nothing rendered or executed against a database. The SQL — the four-table shape, the `O1-%` filter, the `EXISTS` intent bound, the `createdAt DESC, id DESC` order and the parameterized limit — is verified only as source contract plus pure-service behaviour over injected rows. Neither `/dashboard/payments` nor the home tile has been requested, so layout, the zero panel, focus order and Korean rendering are unverified at runtime, and the `ALLOW` authorization recorded in `185` was condition-level.

## Effects

`0` — no DB, runtime, provider, browser, economic, install, build, typecheck, capability or schema action. One commit, one non-force push. Grant reconciliation untouched; runtime PID and protected allowlist intact.

RETURN_TO: foundation-advisor
STOP
