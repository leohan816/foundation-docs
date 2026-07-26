# ADVISOR HANDOFF — M2 CUSTOMERS

MISSION: `COSMILE_CORE_OPERATIONS_DASHBOARD_V1` · MODULE: `M2_CUSTOMERS`
VERDICT: `PROCEED_WITH_LIMITS`
ACTOR: existing `cosmile:claude.0` Worker · Opus 5/xhigh · exact product worktree
BASE: product `9bd0c7785ff49850010b021c75d765cd45a6a166`; docs `f13f32ba4a1c0859df9e7468a240d1938f7232ac`.
SKILL: `/fable-builder`; `implementation-execution`, `contract-to-code-mapping`, `test-design-before-code`; report template only at return.

## Exact product path ceiling

1. `app/src/lib/operator/capability.ts`
2. `app/src/lib/operator/customerRead.ts` (new)
3. `app/src/lib/operator/customerReadRepository.ts` (new)
4. `app/src/app/dashboard/customers/page.tsx` (new)
5. `app/src/components/operator/OperatorShell.tsx`
6. `app/scripts/o1_core_dashboard_customers.vitest.ts` (new)
7. `app/scripts/o1_core_dashboard_shell.vitest.ts`
8. `app/scripts/o1_core_dashboard_reads.vitest.ts`
9. `app/scripts/operator_authority_contract.vitest.ts`

Result only: `151_M2_CUSTOMERS_WORKER_RESULT.md`, `152_M2_CUSTOMERS_WORKER_POINTER.md`.

## Frozen read contract

- Add definition-only capability `customers.read`; it grants nothing by membership and is not non-live.
- Pure port/service returns `ok(rows) | invalid_bounds | repository_error`; limit integer `1..100`, runtime default `50`.
- Prisma repository reads the existing non-production `CustomerAccount` plus O1 `Order` rows where `orderNo LIKE 'O1-%'`, newest customers first, bounded once.
- Row shape: internal `customerRef` (React key only), `accountStatus`, `joinedAt`, `orderCount`, and nullable coherent latest O1 tuple `{ orderId, orderNo, dbStatus }`.
- `customerRef` and `orderId` never render; latest `orderId` may appear only in the existing encoded order-detail href.
- No `AuthIdentity`, issuer, subject, email, phone, session/token/hash, customer order contents, amount, payment/provider data, free text, or PII read.
- Malformed row/negative count/incoherent latest tuple fails the whole projection closed; no invented identifier/value.

## Page/UI contract

`/dashboard/customers`: runtime flag → `dashboard.operations.read` → `customers.read` same-principal → one bounded read.
Use the accepted Dashboard grammar: visible `고객` H1, description, synthetic non-production provenance, summaries derived only from returned rows (`현재 조회된 고객`, `활성 계정`, `O1 주문 고객`), stable table `가입 시각 / 계정 상태 / O1 주문 / 최근 주문`, zero inside tbody, real rows in same structure.
Map account/order states to closed Korean labels; unknown is `확인할 수 없음`. No filter/action/button/form/mutation. Add only `{ label: "고객", href: "/dashboard/customers" }`; other deferred priorities stay inert.

## Tests first and command inventory

First update/add only the four test paths to assert:
1. catalog contains exactly 15 definitions including `customers.read`; default-deny grant behavior unchanged;
2. nav activates Customers, total bounded Dashboard hrefs `8`, Products/Inventory/Payments remain inert;
3. pure service bounds, one repository call, repository failure, malformed-row fail-closed;
4. repository source selects only approved fields/tables and never identity/session/PII;
5. page gate order, one read, safe fields, truthful zero/denied/unavailable, same table for actual rows, no command/mock/demo.

RED once:
`cd app && ./node_modules/.bin/vitest run scripts/o1_core_dashboard_customers.vitest.ts scripts/o1_core_dashboard_shell.vitest.ts scripts/o1_core_dashboard_reads.vitest.ts scripts/operator_authority_contract.vitest.ts --config vitest.config.ts`

Implement only after meaningful RED. GREEN: the identical command exactly once. Then only `git diff --check`, exact nine-path inspection, one commit/non-force push, compact result.

## Hard boundaries

No schema/migration/DB write/grant/seed; no customer identity/authority conflation; no Customer Support; no product/catalog/inventory/payment implementation; no API command or alternate write path; no mock rows/KPI; no install/generate/build/typecheck/full suite; no runtime/browser/provider/economic/public-preview action.
STOP on a needed schema/FK/PII field/new identity decision/extra path. First GREEN failure returns HOLD without rerun.
