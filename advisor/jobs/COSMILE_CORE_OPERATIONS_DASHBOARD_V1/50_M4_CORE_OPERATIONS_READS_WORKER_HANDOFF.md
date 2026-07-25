# M4 Core Operations Reads — Worker Handoff

MISSION_ID: `COSMILE_CORE_OPERATIONS_DASHBOARD_V1`
MODULE: `M4_CORE_OPERATIONS_READ_SURFACES`
ACTOR: existing Cosmile Worker
MODEL/EFFORT: `claude-opus-5/xhigh`
SKILL: `/fable-builder`
REFERENCES: `implementation-execution`, `contract-to-code-mapping`, `test-design-before-code`; `implementation-report-template` only at return

## Exact subject

- Product worktree: `/home/leo/Project/.worktrees/Cosmile/COSMILE_CORE_OPERATIONS_DASHBOARD_V1`
- Branch: `implementation/cosmile-core-operations-dashboard-v1-20260725`
- Base HEAD: `1ee8df08c95f2ef295881807faa3f4990e21c20b`
- M3 evidence: docs `1ae087642ea0570995f76acfc3443e9c579bc9b8`
- Frozen design: docs `5c2312572f6438a7301b6e824e4907398b25bd00`
- Public runtime is a separate worktree/process and must not be touched.

## Exact write ceiling

1. `app/src/app/dashboard/page.tsx`
2. `app/src/components/operator/OperatorShell.tsx`
3. `app/src/app/dashboard/orders/page.tsx` (new)
4. `app/scripts/o1_core_dashboard_reads.vitest.ts` (new)

No fifth product path. Existing request, fulfillment, finance, activity, settings, detail, runtime, repository, component, API, schema, migration, config, manifest, and lock paths are read-only.

## Frozen current sources and behavior

- Home reads remain exactly:
  - `service_requests.read` → `o1OperatorServiceRequestQueue(50)`;
  - `orders.read` + `fulfillment.read` → `o1OperatorOrderList(50)`;
  - `reconciliation.read` → `readO1ReconciliationProjection()`.
- Each read remains behind `dashboard.operations.read` and the same internal `operatorRef`.
- Orders page reuses only `o1OperatorOrderList(50)` and `O1ConsoleFulfillment`.
- Existing order-detail target remains `/dashboard/requests/<encoded internal order id>` and retains its independently reviewed capability/action removal boundary. Do not copy or change it.
- Aggregate inventory risk and sensitive audit list have no read contract: show `UNAVAILABLE`/`NOT_IMPLEMENTED`, never a number.
- No authoritative operator tracking-reference read exists: do not invent or add one.

## Tests first

First add only the new focused source-contract test. It must make these assertions RED:

1. Dashboard home is an action-first ledger: persistent thesis `오늘 처리할 일`; D01 request, D03 order/fulfillment and D05 reconciliation rows occur before D04 inventory-risk and D07 audit summary facts.
2. Every ledger row visibly carries exact truth token plus Korean label, confirmed fact/copy, required authority, permitted read-only next step, prohibited action, and recovery copy.
3. Exact six-state legend is labeled `표현 규칙 · 운영 데이터 아님`: `CONFIRMED`, `CONFIRMED_ZERO`, `UNAVAILABLE`, `NOT_CONFIGURED`, `NOT_IMPLEMENTED`, `DENIED`.
4. D04 remains `UNAVAILABLE · 집계 조회 계약 없음`; D07 remains `UNAVAILABLE · 조회 계약 없음`; neither renders a numeric zero.
5. `/dashboard/orders` performs flag → root `dashboard.operations.read` → `orders.read` + `fulfillment.read` with same-principal checks → exactly one bounded `o1OperatorOrderList(50)` call.
6. Orders repository/read failure is `UNAVAILABLE`; a successful empty array is `CONFIRMED_ZERO`; nonempty rows reuse `O1ConsoleFulfillment`.
7. Operations nav makes only Orders newly active at `/dashboard/orders`; Customers, Products, aggregate Inventory and Payments & Refunds remain inert with no href/action.
8. No customer-session authority, direct Prisma/SQL, form, input, button, fetch, POST, nonce, step-up, mutation, provider, payment/refund/shipment/inventory/recovery execution, fabricated KPI, PII, amount, currency or identifier display is introduced by these four paths.

Run exactly:

`./node_modules/.bin/vitest run scripts/o1_core_dashboard_reads.vitest.ts`

Preserve meaningful RED with the real exit code. Then implement only:

- replace equal home cards with the frozen action-first ledger and summary/legend presentation, preserving all current read functions, capability order, truth-state distinctions, D01/D03/D04/D05/D07 ceiling and Korean synthetic label;
- add the read-only `/dashboard/orders` page with the exact gates/read/error/empty behavior above;
- activate only the Orders nav destination.

Run the identical new test for GREEN. Then run exactly one affected focused compatibility gate:

`./node_modules/.bin/vitest run scripts/o1_core_dashboard_reads.vitest.ts scripts/o1_dashboard_reads.vitest.ts scripts/o1_core_dashboard_shell.vitest.ts`

No other test, build, typecheck, generate, DB, browser or runtime command.

## Boundaries

- Economic/provider/DB/runtime effect: `0`.
- No new read model, endpoint, capability, grant, authority, action or customer projection.
- No write control moves onto the home or orders page.
- HOLD/unknown/denied never becomes zero or actionable.
- Preserve Console and Lab behavior; no Storefront change.
- Use the existing real ignored worktree `app/node_modules`; no install, copy, symlink, generate or cache mutation.

## Completion

Inspect the exact four-path diff and `git diff --check`; preserve failures honestly. On PASS, commit once with truthful attribution, non-force push once, verify clean/upstream-equal, write only compact Worker result/pointer in this job, and STOP before M5.

STOP on a fifth product path, missing read contract, new action/authority, schema/migration/config/manifest/lock need, dependency command, runtime/DB/provider/economic effect, public-host action, or any change to Golden Commerce semantics.
