# ADVISOR HANDOFF — M1 ORDERS

MISSION: `COSMILE_CORE_OPERATIONS_DASHBOARD_V1` · MODULE: `M1_ORDERS`
VERDICT: `PROCEED_WITH_LIMITS`
ACTOR: existing `cosmile:claude.0` Worker · actual Opus 5 / xhigh · exact product worktree
ANCHORS: product `96b363c7f545da5b3d1b22178fc25313a749e143`; docs `c8f2110356dd072fe40a40887d849731858b7f50`; visual contract `122`; B1 recheck `136` PASS.
SKILL: `/fable-builder`; read `implementation-execution`, `contract-to-code-mapping`, `test-design-before-code`; read `implementation-report-template` only for return.

## Exact product path ceiling

1. `app/src/app/dashboard/orders/page.tsx`
2. `app/src/components/console/O1ConsoleFulfillment.tsx`
3. `app/scripts/o1_core_dashboard_orders.vitest.ts` (new)

Result only:
`advisor/jobs/COSMILE_CORE_OPERATIONS_DASHBOARD_V1/141_M1_ORDERS_WORKER_RESULT.md`
`advisor/jobs/COSMILE_CORE_OPERATIONS_DASHBOARD_V1/142_M1_ORDERS_WORKER_POINTER.md`

## Contract-to-code mapping

| Contract | Landing |
|---|---|
| Real order truth | existing `o1OperatorOrderList(50)` exactly once, after existing runtime/root/orders/fulfillment authorization gates |
| Visible fields | `orderNo`; `dbStatus` through existing `orderStatusLabel`; `orderId` only React key + encoded existing detail href |
| Summary | totals/status distribution derived only from the returned bounded array |
| Zero/non-zero | one stable semantic table with `주문번호 / 주문 상태 / 상세`; zero message inside `tbody`; real rows use the same columns |
| State truth | repository failure/denial/disabled remain distinct Korean closed states; successful empty is `0건`; no raw state token in primary copy |
| Interaction | existing detail link only; no fetch, mutation, filter requiring a new read, action button, bulk/export/sort/pagination |

## Tests first

Add one focused test file proving:
1. the page keeps the exact authorization order and one `o1OperatorOrderList(50)` call;
2. no Prisma/direct SQL/mock/demo/hard-coded business row/new read appears;
3. visible heading/description/provenance and bounded summary are present;
4. zero and non-zero share the table headers/body; row fields and encoded link are exact;
5. customer/payment/provider/amount/internal ID/action controls are absent.

Run RED first:
`cd app && ./node_modules/.bin/vitest run scripts/o1_core_dashboard_orders.vitest.ts --config vitest.config.ts`

After the smallest source delta, run one GREEN command only:
`cd app && ./node_modules/.bin/vitest run scripts/o1_core_dashboard_orders.vitest.ts scripts/o1_core_dashboard_reads.vitest.ts scripts/o1_console_fulfillment_ui.vitest.ts --config vitest.config.ts`

Preserve a meaningful RED. Do not weaken existing assertions. A pre-existing directly affected failure must be reported and may be corrected only when the frozen product contract, not green-count pursuit, requires it.

## Hard boundaries

No other path; no schema/migration/DB/fixture/provider/browser/runtime/restart/economic effect; no Customer Support correction; no customer/product/inventory/payment module; no install/generate/build/typecheck/full suite; no mock row/KPI/demo dataset; no public-preview command.
Do not touch or stop the listening preview. STOP on a missing field/contract, extra path, backend need, authorization change, or command/economic requirement.

Commit and non-force push the product once after GREEN; write/push the compact result (`<=80` lines). Report exact RED/GREEN, diff, paths, effects `0`, clean/upstream-equal, then `RETURN_TO: foundation-advisor` and STOP.
