# 03 Sentinel Review Brief - V3-11C2 Phase 1 Ephemeral Fresh Deploy Rehearsal

Date: 2026-07-09

## Required Skill

`/fable-sentinel`

## Reviewer Route

- Target actor: Sentinel
- Recommended reviewer: fable5 Sentinel
- Target project: Cosmile
- Target repo: `../Cosmile`
- Review level: Level 2

This review must run in a separate Sentinel session after Worker result returns to Advisor if Worker reports `COMPLETED`.

## Sentinel Role

Sentinel is read-only.

Do not trust the Worker report. Directly inspect:

- Worker result
- Advisor brief
- Worker brief
- runtime repo status
- migration graph state
- foundation-docs pointer

Do not patch.
Do not stage.
Do not commit.
Do not push.
Do not access real DB/prod/live/main/secret.
Do not approve final release.

Return result to Advisor.

## Review Scope

Verify whether Worker:

- used only disposable/ephemeral PostgreSQL;
- avoided real target DB, staging, prod, live, main, and secrets;
- ran fresh deploy rehearsal against disposable DB only;
- verified duplicate preflight `= 0`;
- verified D-O1 duplicate rejection with synthetic data only;
- tore down disposable DB or reported teardown status;
- did not modify/stage/commit/push runtime repo;
- did not turn `COSMILE_REC_OUTCOME_ENABLED` ON.

## Verdict Options

- `PASS`
- `PASS_WITH_RISK`
- `SKIP_INFRA_NOT_PASS`
- `NEEDS_PATCH`
- `FAIL`
- `NEEDS_LEO_DECISION`

## Required Result Files

Write long result to:

`../foundation-docs/runs/cosmile/20260709_v3_11c2_phase1_ephemeral_fresh_deploy_rehearsal/SENTINEL_REVIEW_RESULT.md`

Write pointer to:

`../foundation-docs/advisor/jobs/20260709_v3_11c2_phase1_ephemeral_fresh_deploy_rehearsal/12_SENTINEL_RESULT_POINTER.md`

Commit and push only foundation-docs result/pointer files, if safe.

Return chat output only as:

```text
## RESULT SUMMARY

## NEXT ACTION ROUTING

## POINTER BLOCK
```
