# 70 — M3A Worker Handoff: Dashboard Evidence-bounded Reads

```text
MISSION: COSMILE_CONSOLE_DASHBOARD_OPERATOR_AUTHORITY_CORRECTION_IMPLEMENTATION_V1
MODULE: M3A
BASE: ce13a74cf0cdd1151e1fdc57562edf83233c64f6
WORKTREE: /home/leo/Project/.worktrees/Cosmile/COSMILE_CONSOLE_DASHBOARD_OPERATOR_AUTHORITY_CORRECTION_IMPLEMENTATION_V1
ACTOR: existing Cosmile Worker; Claude Opus 4.8 / xhigh
SKILL: /fable-builder
REFERENCES: implementation-execution, contract-to-code-mapping, test-design-before-code; implementation-report-template only at return
SCHEMA_DB_PROVIDER_ECONOMIC_RUNTIME_EFFECT: 0
RESULT: advisor/jobs/COSMILE_CONSOLE_DASHBOARD_OPERATOR_AUTHORITY_CORRECTION_IMPLEMENTATION_V1/71_M3A_WORKER_RESULT.md
POINTER: advisor/jobs/COSMILE_CONSOLE_DASHBOARD_OPERATOR_AUTHORITY_CORRECTION_IMPLEMENTATION_V1/72_M3A_WORKER_POINTER.md
STOP_AFTER: M3A result
```

## Exact ten-path ceiling

1. `app/src/app/dashboard/page.tsx`
2. `app/src/app/dashboard/requests/page.tsx`
3. `app/src/app/dashboard/fulfillment/page.tsx`
4. `app/src/app/dashboard/finance/page.tsx`
5. `app/src/app/dashboard/activity/page.tsx`
6. `app/src/app/dashboard/settings/page.tsx`
7. `app/src/components/console/O1ConsoleQueue.tsx`
8. `app/src/components/console/O1ConsoleFulfillment.tsx`
9. `app/src/components/console/O1ConsoleFinance.tsx`
10. `app/scripts/o1_dashboard_reads.vitest.ts`

No eleventh path. Do not edit Dashboard layout/shell/nav, operator authority/API/runtime/repositories, Console or legacy pages, detail/actions, Lab, schema/migration, package/config or preview.

## Frozen data/authority mapping

Every page keeps `o1RuntimeEnabled` first and uses `authorizeConsoleOperator`; no `getShopper`, customer/AuthIdentity session, `o1OperatorForCustomer` or Console-role authority.

- Dashboard root requires global `dashboard.operations.read`. A denied root shows the closed Korean denied state and performs no O1 read.
- Root card D01 separately requires global `service_requests.read`, same principal as the root, then `o1OperatorServiceRequestQueue(50)`.
- Root card D03 separately requires global `orders.read` and `fulfillment.read`, both same principal as the root, then `o1OperatorOrderList(50)`.
- Root card D05 separately requires global `reconciliation.read`, same principal as the root, then `readO1ReconciliationProjection()`.
- Root shows only D01, D03, D04, D05 and D07. D04 and D07 have no current aggregate/list read contract and must show exactly `UNAVAILABLE · 집계 조회 계약 없음` and `UNAVAILABLE · 조회 계약 없음`; never numeric zero.
- A denied card performs zero corresponding read and renders DENIED, without hiding other authorized cards.
- Failed/throwing/null reads render UNAVAILABLE, never zero. Only a successful empty queue/list or successful returned zero count may render `CONFIRMED_ZERO`. Mark displayed runtime data `합성 비프로덕션 데이터`.

Subpages:

- `/dashboard/requests`: root capability + `service_requests.read`, same principal; exact queue read 50; repository error=UNAVAILABLE, successful empty=CONFIRMED_ZERO; render existing queue.
- `/dashboard/fulfillment`: root capability + `orders.read` + `fulfillment.read`, same principal; exact bounded O1 order/status list; do not call it a filtered “waiting count” because the current read is not filtered.
- `/dashboard/finance`: root capability + `reconciliation.read`, same principal; exact count-only projection. Separately evaluate global `reconciliation.recover`; show the existing desktop protected recovery form only when that grant resolves to the same principal. The POST API remains the final capability+nonce+step-up gate.
- `/dashboard/activity`: root capability + `audit.sensitive_read`, same principal; read nothing and show D07 UNAVAILABLE because no safe list projection exists.
- `/dashboard/settings`: root capability + `settings.boundary_read`, same principal; show only the existing fixed non-production/O1 boundary facts, read-only.

Any authorization error/mismatch is opaque and grants no read. Do not return internal deny reasons, IDs, PII, provider/payment/refund refs, raw errors or secrets.

## Reuse and presentation

- `O1ConsoleQueue` keeps the same closed row fields but changes its only detail href to `/dashboard/requests/[orderId]`.
- `O1ConsoleFulfillment` uses the same order/status projection and the same Dashboard detail href. Remove the misleading purchasing claim; do not add purchasing/inventory aggregation/courier semantics.
- `O1ConsoleFinance` adds a required boolean permission prop and omits the protected form entirely when false; counts, mobile read-only notice, single-use nonce flow, secret clearing and current API remain otherwise unchanged.
- Korean-first, one-column mobile, visible focus, semantic headings/status/alert, no fabricated KPI or unsupported state.

M3B owns the Dashboard detail/action page and old Console/O1 transition surfaces. Do not create that page, change old pages or start M3B.

## Tests first and focused command

1. Add only `o1_dashboard_reads.vitest.ts`.
2. Run only `./node_modules/.bin/vitest run scripts/o1_dashboard_reads.vitest.ts`; require meaningful RED from absent pages, M1 placeholder, old Console hrefs and unguarded finance form.
3. Change only the other nine paths.
4. Run the identical command; require GREEN.

The test must combine pure parser/view assertions with bounded source-contract checks proving the exact capability/read mapping, same-principal gates, flag→authority→read order, deny/error/empty truth states, root card ceiling, D04/D07 UNAVAILABLE wording, recovery-form permission hiding, Dashboard hrefs, Korean/mobile/accessibility markers, and absence of customer authority, fabricated reads/KPIs, purchases/courier/provider actions.

No DB/container/provider/network/Prisma generate/typecheck/build/full suite/app start/browser/public preview action. Finish with `git diff --check`, exact ten-path containment, package/lock unchanged, one truthful commit/non-force push, compact 71/72 return, then STOP.
