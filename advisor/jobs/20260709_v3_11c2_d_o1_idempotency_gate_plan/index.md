# V3-11C2-D-O1 Idempotency Gate Plan

Date: 2026-07-09

## Job Overview

- Job ID: `20260709_v3_11c2_d_o1_idempotency_gate_plan`
- Type: Advisor decision package and gate plan
- Scope: hard idempotency plan for `RecOutcomeEvent.orderItemId`
- Non-goal: no implementation, no schema/migration execution, no DB write, no runtime commit

## Generated Artifacts

- `00_INTAKE.md`
- `01_ADVISOR_BRIEF.md`
- `02_WORKER_BRIEF.md`
- `03_SENTINEL_REVIEW_BRIEF.md`
- `06_WORKER_HANDOFF_PROMPT.md`
- `06_WORKER_RUN_PROMPT.md`
- `10_LOOP_STATE.md`
- `index.md`

## Verdict

`D_O1_WORKER_BRIEF_READY`

## Links

- [00 Intake](./00_INTAKE.md)
- [01 Advisor Brief / Decision Package](./01_ADVISOR_BRIEF.md)
- [02 Worker Brief](./02_WORKER_BRIEF.md)
- [03 Sentinel Review Brief](./03_SENTINEL_REVIEW_BRIEF.md)
- [06 Worker Handoff Prompt](./06_WORKER_HANDOFF_PROMPT.md)
- [06 Worker Run Prompt](./06_WORKER_RUN_PROMPT.md)
- [10 Loop State](./10_LOOP_STATE.md)

## Recommended D-O1 Approach

`FULL_ORDER_ITEM_UNIQUE`

Add DB-backed uniqueness for `RecOutcomeEvent.orderItemId`, retain code-level existing-check, and treat DB unique conflicts as duplicate skips/fail-open behavior.

## Next Recommended Action

Leo should paste `06_WORKER_RUN_PROMPT.md` into a separate Cosmile Worker session.
