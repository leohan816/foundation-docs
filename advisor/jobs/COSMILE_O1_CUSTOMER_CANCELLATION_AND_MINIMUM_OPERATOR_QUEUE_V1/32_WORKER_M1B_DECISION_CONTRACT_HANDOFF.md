# Advisor Worker Handoff — M1B Closed Decision Contract

MISSION_ID: COSMILE_O1_CUSTOMER_CANCELLATION_AND_MINIMUM_OPERATOR_QUEUE_V1
MODULE: M1B_CLOSED_REQUEST_DECISION_CONTRACT
PRODUCT_BASE: b1ba6d6fc5e20e190736fb33cdcfeec0dba25158
M1A_ADVISOR_VERDICT: PASS
RETURN_TO: foundation-advisor

## Binding

- Actor: existing Cosmile Worker only.
- Runtime: Claude Opus 4.8, effort max, exact mission worktree.
- Skill: `/fable-builder` with `implementation-execution`, `contract-to-code-mapping`, and `test-design-before-code`; load `implementation-report-template` only for the compact return.
- Current Agent Office authority overrides historical foundation-docs role text.

## Exact path ceiling

1. `app/src/lib/order/serviceRequestContracts.ts`
2. `app/src/lib/order/serviceRequestService.ts`
3. `app/scripts/o1_order_service_request.vitest.ts`

No other product or documentation path may change.

## Objective

Implement a pure, closed, repository-free decision contract that maps already-established O1 facts to exactly one customer service-request disposition. It performs no persistence, locking, provider, payment, refund, inventory, shipment, audit, reconciliation, auth, route, UI, environment, or runtime action.

## Closed vocabulary

- Request kind: `pre_capture_cancel | paid_unshipped_cancel | shipped_support`.
- Durable status: `requested | processing | accepted | refused | completed | recovery_hold`.
- Reservation category: `exact_reserved | exact_committed | missing | mixed | unknown`.
- Shipment category: `none | pending | preparing | shipped | delivered | unknown`.
- Decision: `not_found | terminal | recovery_hold | existing_request | eligible_pre_capture | eligible_paid_unshipped | eligible_shipped_support | unavailable`.
- Unknown or contradictory facts always map to `recovery_hold` or `unavailable`; never infer success or eligibility.

## Required priority and eligibility

Evaluate in this order:

1. non-O1 or ownership mismatch -> `not_found` (indistinguishable externally);
2. order `cancelled | refunded` -> `terminal`, no action;
3. open/in-progress reconciliation or any explicitly unknown/contradictory economic fact -> `recovery_hold`, no action;
4. existing request -> `existing_request`, returning only its closed kind/status and no new action;
5. shipment `shipped | delivered` -> `eligible_shipped_support` only when the non-terminal order truth is otherwise coherent; this is request-only and has zero economic/inventory/shipment/courier effect;
6. paid-unshipped -> `eligible_paid_unshipped` only for order `paid`, exactly one captured intent/capture, zero successful refund, exact committed coverage, and shipment `none | pending | preparing`; request creation alone has zero economic effect;
7. safe pre-capture -> `eligible_pre_capture` only for order `pending`, exactly one intent in `created | action_required`, zero successful capture/refund, exact reserved coverage, and shipment `none`; later repository work may perform the atomic cancellation;
8. every other combination -> `unavailable`, no action.

The pure contract must also enforce the closed transition graph:

- create pre-capture: `none -> completed` only;
- create paid-unshipped/shipped-support: `none -> requested` only;
- paid-unshipped: `requested -> processing -> completed | recovery_hold | refused`;
- shipped-support: `requested -> accepted | refused`;
- replay/current-state requests return the same state and never rewind;
- terminal states never transition;
- any other edge is denied categorically.

Do not introduce reason/free text, identifiers, PII, provider references, amounts, currency, timestamps, or persistence-shaped DTOs in this pure module.

## Tests-first focused verification

1. Add the exact focused test first and run only this file; preserve meaningful RED and exit status.
2. Implement only the two frozen source paths.
3. Run the identical focused file and require GREEN.
4. Tests must cover the priority order, every eligible lane, terminal/reconciliation/existing precedence, ambiguous/multiple/missing intent and coverage cases, unknown shipment/economic facts, ownership indistinguishability, the complete allowed transition graph, denial of every non-allowed edge, replay/no-rewind, and zero injected side-effect calls.

Use only the existing worktree-local toolchain. No install, generate, build, typecheck, full suite, DB/container, runtime, provider/network, credentials, or Reviewer.

## Stop conditions

STOP and return if any fourth path, schema/repository/runtime dependency, new state/kind, economic semantic change, or external effect is required. M1C and later modules remain blocked.

## Return ceiling

Compact evidence index only: exact changed paths; RED/GREEN command/count/exit; closed decisions/transitions proven; side effects `0`; Git commit/upstream/clean state; skill references; material blocker/STOP only. Commit and non-force push once, then STOP.
