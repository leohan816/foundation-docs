# 10 Loop State - V3-11C2-D-O1 Idempotency Hardening

Date: 2026-07-09

## Current Status

`READY_FOR_SENTINEL`

Leo/GPT approved the D-O1 recommended approach:

`FULL_ORDER_ITEM_UNIQUE`

## Approved Scope

- Implement DB-level uniqueness for `RecOutcomeEvent.orderItemId`.
- Represent uniqueness in Prisma schema as `@@unique([orderItemId])`.
- Keep code-level existing-check as fast-path duplicate skip.
- Treat DB unique conflict as duplicate/idempotent skip and fail-open.
- Require duplicate preflight before applying the unique index in any target DB.
- Require non-prod migration rehearsal and duplicate rejection tests.
- Keep `COSMILE_REC_OUTCOME_ENABLED` OFF.

## Forbidden Scope

- flag ON
- live/prod/main/secret
- production DB migration
- operational use
- group-buy/refund/reorder/direct/session/semantic expansion
- SIASIU/foundation-control changes
- runtime commit/push without separate Leo/GPT approval

## Completed Actors

- Advisor: decision package and gate plan complete.
- Leo/GPT: approved `FULL_ORDER_ITEM_UNIQUE`.
- Worker: D-O1 implementation reported complete; result archived at `../foundation-docs/runs/cosmile/20260709_v3_11c2_d_o1_idempotency_gate_plan/WORKER_RESULT.md`.

## Current Required Actor

Sentinel.

Leo should paste:

`../foundation-docs/advisor/jobs/20260709_v3_11c2_d_o1_idempotency_gate_plan/07_SENTINEL_RUN_PROMPT.md`

into a separate fable5 Sentinel session.

## Pending Actors

- Sentinel review: ready to run.
- Service review: not required unless Worker proposes service semantic changes.
- Advisor final audit: blocked until Worker and required Sentinel result exist.

## Reviewer Routing Decision

- Target actor:
  Sentinel

- Selected reviewer:
  fable5 Sentinel

- Target session:
  separate fable5 Sentinel session

- Required skill:
  `/fable-sentinel`

- Reason:
  D-O1 touches DB/schema/migration and order outcome idempotency. This is Level 3 review territory and requires independent direct diff/test/code/evidence inspection.

- Not selected:
  Control Reviewer: not primary because this is Cosmile DB/schema implementation, not Foundation contract ownership.
  Opus 4.8 Sentinel: not primary because schema/migration/order idempotency is higher than normal runtime wiring risk.
  Codex SOL / Codex 5.6 SOL Sentinel: optional second review after Worker/fable5 results if risk remains material or Leo/GPT wants higher-grade assurance.
  Multi-reviewer: deferred until Advisor reads Worker and first Sentinel results.

- Whether one reviewer is enough:
  One fable5 Sentinel review is enough to start. Advisor may require Codex SOL second review later.

- Review level:
  Level 3

- Return result to:
  Advisor

- Status:
  READY_TO_USE

## Worker Result Received

- result: `../foundation-docs/runs/cosmile/20260709_v3_11c2_d_o1_idempotency_gate_plan/WORKER_RESULT.md`
- pointer: `../foundation-docs/advisor/jobs/20260709_v3_11c2_d_o1_idempotency_gate_plan/11_WORKER_RESULT_POINTER.md`
- foundation-docs commit: `fa84d33`
- runtime commit status: not committed
- DB test status: `SKIP (psycopg2 unavailable; live migration/duplicate-rejection not executed)`
- flag status: `COSMILE_REC_OUTCOME_ENABLED OFF`

Advisor routing note:

Worker result is sufficient to route Sentinel review, but not sufficient for D-O1 final closure because DB rehearsal was skipped. Sentinel must directly inspect implementation and attempt/verify non-prod DB rehearsal if possible. If DB rehearsal remains unavailable, Sentinel must not claim flag-ON readiness.

## Result Pointers Expected

Worker:

- result: `../foundation-docs/runs/cosmile/20260709_v3_11c2_d_o1_idempotency_gate_plan/WORKER_RESULT.md`
- pointer: `../foundation-docs/advisor/jobs/20260709_v3_11c2_d_o1_idempotency_gate_plan/11_WORKER_RESULT_POINTER.md`

Sentinel:

- result: `../foundation-docs/runs/cosmile/20260709_v3_11c2_d_o1_idempotency_gate_plan/SENTINEL_REVIEW_RESULT.md`
- pointer: `../foundation-docs/advisor/jobs/20260709_v3_11c2_d_o1_idempotency_gate_plan/12_SENTINEL_RESULT_POINTER.md`

## Next Required Action

Run the Sentinel handoff via the short run prompt in a separate fable5 Sentinel session.
