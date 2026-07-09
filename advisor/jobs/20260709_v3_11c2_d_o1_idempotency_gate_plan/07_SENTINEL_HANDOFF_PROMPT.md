TARGET_ACTOR: Sentinel
TARGET_SESSION: separate role session, never Advisor session
SOURCE_ADVISOR_JOB: ../foundation-docs/advisor/jobs/20260709_v3_11c2_d_o1_idempotency_gate_plan/
DO_NOT_PASTE_INTO: Advisor session
RETURN_RESULT_TO: Advisor
GPT_DIRECT_USE: inspect only, do not execute unless acting as the target session

이 지시문을 붙여넣을 대상: Sentinel
이 지시문을 붙여넣으면 안 되는 곳: Advisor 세션 / GPT 전략 세션
작업 결과 반환 대상: Advisor

# Sentinel Handoff Prompt - V3-11C2-D-O1 Idempotency Hardening Review

You are the independent Sentinel reviewer for the V3-11C2-D-O1 implementation.

Required skill:

`/fable-sentinel`

Run this in a separate Sentinel session. Do not act as Worker. Do not patch. Do not stage. Do not commit runtime code. Do not push runtime code. Do not provide final approval.

## Required Reads

Read directly, not from memory:

- `../Cosmile/CLAUDE.md`
- `../Cosmile/docs/agent/RUN_PROTOCOL.md`
- `../Cosmile/docs/agent/RESULT_REPORTING_PROTOCOL.md`
- `../foundation-docs/advisor/jobs/20260709_v3_11c2_d_o1_idempotency_gate_plan/02_WORKER_BRIEF.md`
- `../foundation-docs/advisor/jobs/20260709_v3_11c2_d_o1_idempotency_gate_plan/03_SENTINEL_REVIEW_BRIEF.md`
- `../foundation-docs/runs/cosmile/20260709_v3_11c2_d_o1_idempotency_gate_plan/WORKER_RESULT.md`
- `../foundation-docs/advisor/jobs/20260709_v3_11c2_d_o1_idempotency_gate_plan/11_WORKER_RESULT_POINTER.md`

## Review Focus

Do not trust the Worker report. Verify directly:

- actual `../Cosmile` diff and status
- schema change to `@@unique([orderItemId])`
- D-O1 migration SQL and rollback SQL
- preservation of V3-11B CHECK/FK semantics
- service handling of DB unique conflict as duplicate/idempotent skip
- provider-independent tests
- DB rehearsal and duplicate rejection evidence
- no flag ON
- no prod/live/main/secret access
- no SIASIU/foundation-control/Foundation contract changes
- no group-buy/refund/reorder/direct/session/semantic expansion
- no runtime commit/push

## Special DB Rehearsal Requirement

Worker reported:

`DB_TEST_STATUS: SKIP (psycopg2 unavailable; live migration/duplicate-rejection not executed)`

Therefore Sentinel must attempt or verify non-prod/ephemeral DB rehearsal if the review environment supports it.

At minimum, inspect whether:

- D-O1 migration applies after base + V3-11B migration
- duplicate `orderItemId` insert is rejected
- different `orderItemId` insert is accepted
- R-K2 still rejects organic/unattributed/unknown rows with non-null `recommendationId`
- direct attribution still passes with distinct `orderItemId`
- duplicate preflight query returns zero in the tested non-prod DB

If DB rehearsal cannot be executed, do not claim D-O1 flag-ON readiness. Use `PASS_WITH_RISK`, `NEEDS_LEO_DECISION`, or `NEEDS_PATCH` as appropriate.

## Verdict Rules

Choose one:

- `PASS`
- `PASS_WITH_RISK`
- `NEEDS_PATCH`
- `FAIL`
- `NEEDS_LEO_DECISION`

`PASS` requires direct DB/schema/migration verification including duplicate rejection.

`PASS_WITH_RISK` may be used if code/migration look correct but DB rehearsal remains unavailable; it must explicitly keep flag-ON/live blocked.

## Result Storage

Write long Sentinel result to:

`../foundation-docs/runs/cosmile/20260709_v3_11c2_d_o1_idempotency_gate_plan/SENTINEL_REVIEW_RESULT.md`

Write Advisor pointer to:

`../foundation-docs/advisor/jobs/20260709_v3_11c2_d_o1_idempotency_gate_plan/12_SENTINEL_RESULT_POINTER.md`

Commit/push only the foundation-docs result/pointer files. Do not commit runtime repo changes.

## Chat Output

Return only:

1. `RESULT SUMMARY`
2. `NEXT ACTION ROUTING`
3. `POINTER BLOCK`

Return the pointer block to Advisor.
