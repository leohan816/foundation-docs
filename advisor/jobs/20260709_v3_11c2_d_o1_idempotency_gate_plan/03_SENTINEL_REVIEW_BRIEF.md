# 03 Sentinel Review Brief - V3-11C2-D-O1 Idempotency Hardening

Date: 2026-07-09

## Required Skill

`/fable-sentinel`

## Review Timing

This review is now ready to run.

Worker returned:

- `../foundation-docs/runs/cosmile/20260709_v3_11c2_d_o1_idempotency_gate_plan/WORKER_RESULT.md`
- `../foundation-docs/advisor/jobs/20260709_v3_11c2_d_o1_idempotency_gate_plan/11_WORKER_RESULT_POINTER.md`

Use `07_SENTINEL_RUN_PROMPT.md` to start the Sentinel session.

## Sentinel Role

Sentinel must run in a separate session from Advisor and Worker.

Sentinel is read-only:

- inspect code/diff/tests/evidence directly
- do not trust Worker report
- do not patch
- do not stage
- do not commit
- do not push runtime repo
- do not approve final delivery

Result returns to Advisor.

## Target

- Target project: Cosmile
- Target repo: `../Cosmile`
- Target app root: `../Cosmile/app`
- Expected branch: `shadow/m4-cosmile-memory`
- Advisor job: `../foundation-docs/advisor/jobs/20260709_v3_11c2_d_o1_idempotency_gate_plan/`

## Review Scope

Review only the D-O1 implementation for:

- DB-level uniqueness on `RecOutcomeEvent.orderItemId`
- Prisma schema representation as `@@unique([orderItemId])`
- migration correctness
- rollback correctness
- duplicate preflight and duplicate rejection tests
- service handling of DB unique conflict as duplicate/idempotent skip and fail-open
- preservation of V3-11B constraints
- preservation of V3-11C2 default-OFF behavior

## Required Direct Inspections

Sentinel must inspect directly:

- `git diff` and `git status`
- `../Cosmile/app/prisma/schema.prisma`
- new D-O1 migration folder and SQL
- `../Cosmile/app/prisma/migrations/20260706120000_v3_11b_learning_commerce_memory/migration.sql`
- `../Cosmile/app/prisma/migrations/20260706120000_v3_11b_learning_commerce_memory/down.sql`
- `../Cosmile/app/src/lib/recOutcomeEventService.ts`
- D-O1 DB test script or updated V3-11B DB test script
- `../Cosmile/app/scripts/v3_11c2_rec_outcome.vitest.ts`
- Worker result file and pointer

## Required Review Questions

1. Is `RecOutcomeEvent.orderItemId` unique at both Prisma and migration/DB levels?
2. Did Worker avoid partial/composite uniqueness unless explicitly approved? The approved approach is full `orderItemId` uniqueness.
3. Is the prior normal `orderItemId` index handled correctly, without redundant or conflicting indexes unless justified?
4. Does rollback restore the prior state cleanly?
5. Does the migration preserve V3-11B CHECK/FK semantics?
6. Is duplicate preflight defined and reported?
7. Does duplicate `orderItemId` insertion fail at DB level?
8. Do different `orderItemId` rows still pass?
9. Does direct attribution mode still pass with a distinct `orderItemId`?
10. Does R-K2 still reject organic/unattributed/unknown rows with non-null `recommendationId`?
11. Does service existing-check still return duplicate skip?
12. Does DB unique conflict return duplicate/idempotent skip and fail-open instead of checkout failure?
13. Are non-idempotent write failures still observable as write failure?
14. Is `COSMILE_REC_OUTCOME_ENABLED` still default OFF?
15. Was there any prod/live/main/secret access?
16. Were SIASIU/foundation-control/Foundation contract files untouched?
17. Did Worker avoid group-buy/refund/reorder/direct/session/semantic expansion?
18. Did Worker avoid runtime commit/push unless separately approved?
19. Are Worker tests meaningful, not weakened?
20. Are foundation-docs result and pointer files present and committed/pushed?

## Tests Sentinel Should Reproduce or Verify

Run or verify Worker evidence for:

- `npx prisma validate`
- `npx vitest run scripts/v3_11c2_rec_outcome.vitest.ts`
- `npx vitest run scripts/v3_11c_rec_event.vitest.ts`
- `npx vitest run scripts/v3_11.vitest.ts`
- D-O1 DB test against non-prod/ephemeral Postgres
- duplicate rejection test
- service unique-conflict duplicate skip test

If Sentinel cannot run a DB test because infra is unavailable, mark it as blocked/needs verification, not pass.

Because Worker reported the D-O1 DB rehearsal as `SKIP (psycopg2 unavailable)`, Sentinel must pay special attention to whether DB rehearsal can be executed in the review environment.

Verdict guidance:

- `PASS` is allowed only if DB/schema/migration behavior is directly verified, including duplicate rejection.
- `PASS_WITH_RISK` is allowed if implementation looks correct but DB rehearsal remains unavailable; it must explicitly state that D-O1 flag-ON readiness is still blocked by missing DB rehearsal.
- `NEEDS_PATCH` is required for implementation, migration, rollback, or test defects within approved scope.
- `NEEDS_LEO_DECISION` is required if closure depends on provisioning a DB review environment or accepting unexecuted DB evidence.

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
  D-O1 touches DB/schema/migration and order outcome idempotency. This is Level 3 review territory. fable5 Sentinel is appropriate for the first required independent technical review because it must inspect migration, schema, tests, and runtime diff directly.

- Not selected:
  Control Reviewer: not selected as primary because this is Cosmile DB/schema implementation, not Foundation contract ownership.
  Opus 4.8 Sentinel: not selected as primary because this is higher than normal runtime wiring risk.
  Codex SOL / Codex 5.6 SOL Sentinel: reserved as optional second review if Worker result is complex, fable5 finds risk, DB migration evidence is incomplete, or Leo/GPT wants higher-grade assurance before D-O1 closure.
  Multi-reviewer: not required before Worker result, but may be selected after Advisor reads Worker and fable5 Sentinel results.

- Whether one reviewer is enough:
  One fable5 Sentinel review is enough to start. Advisor may require Codex SOL second review after reading Worker/Sentinel evidence if schema/migration risk remains material.

- Review level:
  Level 3

- Return result to:
  Advisor

- Status:
  READY_TO_USE

## Pass/Fail Verdict Options

Sentinel must choose one:

- `PASS`
- `PASS_WITH_RISK`
- `NEEDS_PATCH`
- `FAIL`
- `NEEDS_LEO_DECISION`

Use `PASS_WITH_RISK` only when the implementation meets the approved D-O1 scope and remaining risks are explicitly out of scope or accepted.

Use `NEEDS_PATCH` if there are fixable implementation/test/migration problems within approved scope.

Use `NEEDS_LEO_DECISION` if the implementation requires a scope, semantic, schema policy, or production decision not already approved.

## Expected Sentinel Result Format

Write long result to:

`../foundation-docs/runs/cosmile/20260709_v3_11c2_d_o1_idempotency_gate_plan/SENTINEL_REVIEW_RESULT.md`

Write pointer to:

`../foundation-docs/advisor/jobs/20260709_v3_11c2_d_o1_idempotency_gate_plan/12_SENTINEL_RESULT_POINTER.md`

Sentinel chat output must contain only:

1. `RESULT SUMMARY`
2. `NEXT ACTION ROUTING`
3. `POINTER BLOCK`

Return pointer block to Advisor.
