# ADVISOR HANDOFF — M2-E1 OWNERSHIP BINDING CLARIFICATION

MISSION: `COSMILE_CORE_OPERATIONS_DASHBOARD_V1` · MODULE: `M2_CUSTOMERS_E1`
VERDICT: `PROCEED_WITH_LIMITS`
ACTOR/BINDING/SKILL: same `cosmile:claude.0`, Opus 5/xhigh, `/fable-builder`; no context/session/model/effort change.
BASE: product HEAD `9bd0c778`; preserve the current uncommitted edit to `operator_authority_contract.vitest.ts` as authorized tests-first work.
EVIDENCE: `151/152` preserve the initial HOLD; no product source, DB, runtime, provider, or economic action occurred.

## Closed interpretation

No schema/FK is needed. The reviewed customer ownership boundary is:
1. Google login/session resolves `CustomerAccount.id`;
2. checkout stores that same value in `Order.userId`;
3. `orderRepository.customerOrderData` returns `Order.userId`;
4. `projectCustomerView` authorizes only `data.owner.userId === owner.ownerRef`.

Therefore the frozen M2 repository may join `CustomerAccount.id = Order.userId` with `orderNo LIKE 'O1-%'`. This reuses existing ownership truth; it does not infer identity or create a relationship.

## Execution

Resume exact handoff `150` with its unchanged nine-path ceiling, contracts, RED/GREEN commands, and hard boundaries.
Keep the existing single test edit; complete only the remaining tests-first oracle changes, run the one RED, then implement.
No further schema/history/identity exploration. The initial HOLD does not count as a correction of product behavior.
Result paths: `154_M2_E1_CUSTOMERS_WORKER_RESULT.md`, `155_M2_E1_CUSTOMERS_WORKER_POINTER.md`.
First GREEN failure returns HOLD without rerun. On PASS commit/push once and STOP.
