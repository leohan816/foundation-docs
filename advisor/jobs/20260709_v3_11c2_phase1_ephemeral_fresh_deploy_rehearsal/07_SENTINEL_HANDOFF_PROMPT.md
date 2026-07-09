TARGET_ACTOR: Sentinel
TARGET_SESSION: separate role session, never Advisor session
SOURCE_ADVISOR_JOB: ../foundation-docs/advisor/jobs/20260709_v3_11c2_phase1_ephemeral_fresh_deploy_rehearsal/
DO_NOT_PASTE_INTO: Advisor session
RETURN_RESULT_TO: Advisor
GPT_DIRECT_USE: inspect only, do not execute unless acting as the target session

이 지시문을 붙여넣을 대상: Sentinel
이 지시문을 붙여넣으면 안 되는 곳: Advisor 세션 / GPT 전략 세션
작업 결과 반환 대상: Advisor

# Sentinel Handoff Prompt - V3-11C2 Phase 1 Ephemeral Fresh Deploy Rehearsal

You are the independent Sentinel reviewer for Cosmile.

Required skill: `/fable-sentinel`

This is a read-only review of the Phase 1 disposable PostgreSQL rehearsal result.

Do not patch, stage, commit, push, access real DB, access prod/live/main/secret, or approve final release.

## Read First

Read and follow:

- `../foundation-docs/advisor/jobs/20260709_v3_11c2_phase1_ephemeral_fresh_deploy_rehearsal/00_INTAKE.md`
- `../foundation-docs/advisor/jobs/20260709_v3_11c2_phase1_ephemeral_fresh_deploy_rehearsal/01_ADVISOR_BRIEF.md`
- `../foundation-docs/advisor/jobs/20260709_v3_11c2_phase1_ephemeral_fresh_deploy_rehearsal/02_WORKER_BRIEF.md`
- `../foundation-docs/advisor/jobs/20260709_v3_11c2_phase1_ephemeral_fresh_deploy_rehearsal/03_SENTINEL_REVIEW_BRIEF.md`
- `../foundation-docs/runs/cosmile/20260709_v3_11c2_phase1_ephemeral_fresh_deploy_rehearsal/WORKER_RESULT.md`
- `../foundation-docs/advisor/jobs/20260709_v3_11c2_phase1_ephemeral_fresh_deploy_rehearsal/11_WORKER_RESULT_POINTER.md`
- `../Cosmile/docs/agent/RUN_PROTOCOL.md`
- `../Cosmile/docs/agent/RESULT_REPORTING_PROTOCOL.md`

Do not trust the Worker report. Verify directly where possible.

## Review Scope

Verify whether Worker:

- used only disposable/ephemeral PostgreSQL;
- avoided real target DB, staging, prod, live, main, and secrets;
- ran fresh deploy rehearsal against disposable DB only;
- verified active migration graph excludes `20260624181637_commerce_intelligence`;
- verified duplicate preflight `= 0`;
- verified D-O1 duplicate rejection with synthetic data only;
- tore down disposable DB or reported teardown status;
- left runtime repo unmodified, unstaged, uncommitted, and unpushed;
- kept `COSMILE_REC_OUTCOME_ENABLED` OFF.

## Required Direct Checks

In `../Cosmile`, inspect:

```bash
git status -sb
git rev-parse HEAD
git rev-parse origin/shadow/m4-cosmile-memory
git rev-list --left-right --count HEAD...origin/shadow/m4-cosmile-memory
git diff --cached --name-only
find app/prisma/migrations -maxdepth 2 -type f | sort
rg -n "20260624181637_commerce_intelligence|DATETIME|AUTOINCREMENT|datetime\\(|\\bREAL\\b" app/prisma/migrations
```

If available and safe, inspect disposable cleanup:

```bash
docker ps -a --filter name=cosmile-v3-11c2-phase1-rehearsal --format '{{.ID}} {{.Names}} {{.Status}}'
ss -ltn | grep ':55433' || true
```

Do not rerun migration deploy unless Advisor explicitly scopes a re-review with execution. This is a read-only review of Worker evidence and current repo/infra residue.

## Verdict Options

Return one of:

- `PASS`
- `PASS_WITH_RISK`
- `SKIP_INFRA_NOT_PASS`
- `NEEDS_PATCH`
- `FAIL`
- `NEEDS_LEO_DECISION`

## Result Files

Write the long result to:

`../foundation-docs/runs/cosmile/20260709_v3_11c2_phase1_ephemeral_fresh_deploy_rehearsal/SENTINEL_REVIEW_RESULT.md`

Write the Advisor pointer to:

`../foundation-docs/advisor/jobs/20260709_v3_11c2_phase1_ephemeral_fresh_deploy_rehearsal/12_SENTINEL_RESULT_POINTER.md`

If safe, commit and push only those foundation-docs result/pointer files.

Do not commit or push runtime repo changes.

## Chat Output

Return only:

```text
## RESULT SUMMARY

## NEXT ACTION ROUTING

## POINTER BLOCK
```

The result must return to Advisor.
