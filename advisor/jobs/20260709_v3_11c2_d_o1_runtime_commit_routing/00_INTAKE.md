# V3-11C2 + D-O1 Runtime Commit Routing - Intake

Date: 2026-07-09

## Leo/GPT Instruction Summary

Leo/GPT accepted the V3-11C2-D-O1 final audit verdict `PASS_WITH_RISK`.

Accepted scope:

- D-O1 shadow/schema implementation loop closure
- Worker implementation accepted
- Sentinel review accepted
- Advisor final audit accepted

Hard restrictions:

- `COSMILE_REC_OUTCOME_ENABLED` remains OFF
- no flag ON
- no live/prod/main/secret
- no production DB migration
- no operational use
- no claim that group-buy/refund/reorder/direct/session/semantic/V3-11D is covered

Next task:

Prepare runtime commit routing for the approved V3-11C2 + D-O1 default-OFF shadow implementation.

## Goal

Define exactly what the Cosmile Worker may stage and commit in `../Cosmile`, and provide a short run prompt for that Worker session.

## Non-Goals

- Advisor does not stage, commit, or push runtime repos.
- Do not turn any feature flag ON.
- Do not run live/prod/main/secret operations.
- Do not run production DB migrations.
- Do not perform operational RecOutcomeEvent writes.
- Do not modify runtime code.
- Do not add rework.
- Do not include unrelated docs or unrelated untracked files.
- Do not route to Sentinel yet.

## Source Inputs

- V3-11C2 closure record: `../foundation-docs/advisor/jobs/20260709_v3_11c2_worker_brief/14_CLOSURE_RECORD.md`
- D-O1 final audit: `../foundation-docs/advisor/jobs/20260709_v3_11c2_d_o1_idempotency_gate_plan/05_FINAL_AUDIT.md`
- D-O1 loop state: `../foundation-docs/advisor/jobs/20260709_v3_11c2_d_o1_idempotency_gate_plan/10_LOOP_STATE.md`
- Current `../Cosmile` git status

## Initial Advisor Finding

Runtime commit routing can be prepared with limits.

The current `../Cosmile` working tree contains the approved C2 + D-O1 files and unrelated untracked docs. The commit must stage exactly the approved files and exclude all unrelated docs.
