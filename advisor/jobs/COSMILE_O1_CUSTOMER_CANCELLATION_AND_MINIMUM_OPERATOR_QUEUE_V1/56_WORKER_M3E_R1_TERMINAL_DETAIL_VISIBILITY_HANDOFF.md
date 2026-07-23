# ADVISOR -> COSMILE WORKER — M3E-R1 TERMINAL DETAIL VISIBILITY

MISSION: `COSMILE_O1_CUSTOMER_CANCELLATION_AND_MINIMUM_OPERATOR_QUEUE_V1`
MODULE: `M3E_R1_TERMINAL_DETAIL_VISIBILITY`
BASE: `3269ad82416d25382f5f9a46bd8f46a563f5f641`
INSTRUCTION_GATE: `PROCEED_WITH_LIMITS`
DELTA_ONLY_VERIFICATION: `REQUIRED`
REVIEW_TIER: `SMALL` — focused Worker evidence + Advisor validation; no independent Reviewer.

## Exact defect and objective

M3E correctly projects active work but maps terminal service-request rows to `not_found`. After a shipped-support acknowledgement, a refreshed operator detail would therefore lose the durable `accepted` truth and could fall back to unrelated legacy controls. Correct only the read-only selected-order projection so every valid durable request remains visible while actionable categories stay closed. No mutation, route, UI, step-up, provider, or economic behavior is added.

## Exact path ceiling

1. `app/src/lib/order/serviceRequestContracts.ts`
2. `app/src/lib/order/serviceRequestService.ts`
3. `app/src/lib/order/serviceRequestRepository.ts`
4. `app/src/lib/runtime/o1CommerceRuntime.ts`
5. `app/scripts/o1_order_service_request.dbtest.vitest.ts`

No sixth path.

## Frozen correction

- Replace the detail outcome discriminator `active` with truthful `found`; keep `not_found | invalid_input | repository_error`.
- The detail projection remains exactly three fields, but its detail-only category is:
  `actionCategory: "refund_request" | "support_request" | "hold" | "none"`.
  Do not widen or alter the M3A queue category/list contract.
- Exact mapping, after exact O1 namespace and bound-intent checks:
  - any active reconciliation `open|in_progress` -> `hold`;
  - `paid_unshipped_cancel/requested` -> `refund_request`;
  - `paid_unshipped_cancel/processing|recovery_hold` -> `hold`;
  - `shipped_support/requested` -> `support_request`;
  - `pre_capture_cancel/completed`, `paid_unshipped_cancel/completed|refused`, and `shipped_support/accepted|refused` -> `none`;
  - every other kind/status/category combination -> `repository_error`, never `none` by default.
- Missing request/order, non-O1, or no bound intent remains opaque `not_found`.
- Service and runtime remain one-call/read-only composition and return the closed result unchanged.
- Output still exposes no order/request/customer/operator identifier, order number, PII, money/provider/refund/inventory/shipment/tracking value, timestamp, audit data, secret, or raw error.

## Tests first and exact command

First change only the named `M3E ` tests to require `found/actionCategory` and explicit terminal visibility, then run the exact command and preserve meaningful RED against the uncorrected implementation. Implement only the four source paths and rerun the identical command:

`./node_modules/.bin/vitest run scripts/o1_order_service_request.dbtest.vitest.ts -t 'M3E ' --config vitest.config.ts --reporter=verbose --cache=false`

Require tests for every mapping above, reconciliation precedence, malformed/ambiguous/future row closure, parameterization, and byte-equivalent durable state. Do not weaken or remove the existing read-only/error/zero-write assertions.

Use only the mission-authorized temporary canonical dependency symlink for the exact command, then remove it and prove canonical hashes plus DB/container/port/process/cache cleanup.

## Worker binding and skill

Primary: existing Cosmile Claude Worker, Opus 4.8/`xhigh`, same CWD/role; `/fable-builder` with `implementation-execution`, `contract-to-code-mapping`, `test-design-before-code`; report template only at return. On documented zero-delta execution non-convergence, return to Advisor for the already-approved existing Codex fallback; do not self-route.

## Prohibited

No route/UI/page/component, no queue-list behavior change, no mutation/ack/refund/step-up/provider/economic path, no schema/migration/DB write, no build/typecheck/full suite/other test, no dependency/config/manifest change, no next module or Reviewer.

After GREEN: exact five-path audit, one additive commit without inaccurate attribution, non-force push, clean/upstream-equal, compact return, STOP.
