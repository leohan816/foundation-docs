TARGET_ACTOR: Worker
TARGET_SESSION: separate role session, never Advisor session
SOURCE_ADVISOR_JOB: ../foundation-docs/advisor/jobs/20260709_v3_11c2_d_o1_runtime_push_routing/
DO_NOT_PASTE_INTO: Advisor session
RETURN_RESULT_TO: Advisor
GPT_DIRECT_USE: inspect only, do not execute unless acting as the target session

이 지시문을 붙여넣을 대상: Worker
이 지시문을 붙여넣으면 안 되는 곳: Advisor 세션 / GPT 전략 세션
작업 결과 반환 대상: Advisor

# Worker Handoff Prompt - V3-11C2 + D-O1 Runtime Push Routing

You are the Cosmile Worker.

Required skill: `/fable-builder`

This is a push-only task for the already-approved V3-11C2 + D-O1 default-OFF shadow implementation mission.

Do not implement. Do not edit files. Do not stage. Do not create a new commit.

## Read First

Read and follow:

- `../foundation-docs/advisor/jobs/20260709_v3_11c2_d_o1_runtime_push_routing/00_INTAKE.md`
- `../foundation-docs/advisor/jobs/20260709_v3_11c2_d_o1_runtime_push_routing/01_ADVISOR_BRIEF.md`
- `../foundation-docs/advisor/jobs/20260709_v3_11c2_d_o1_runtime_push_routing/02_WORKER_BRIEF.md`
- `../Cosmile/docs/agent/RUN_PROTOCOL.md`
- `../Cosmile/docs/agent/RESULT_REPORTING_PROTOCOL.md`

Do not execute from memory.

## Exact Task

Push exactly this local runtime commit:

`004c52df14da9b2051597602575d33eb0211cdbc`

from:

`shadow/m4-cosmile-memory`

to:

`origin/shadow/m4-cosmile-memory`

## Pre-Push Verification

In `../Cosmile`, verify:

- current branch is `shadow/m4-cosmile-memory`
- HEAD is exactly `004c52df14da9b2051597602575d33eb0211cdbc`
- upstream is `origin/shadow/m4-cosmile-memory`
- branch is ahead of origin by exactly one approved commit
- staged diff is empty

Use read-only commands only before pushing.

## Allowed Command

If and only if every pre-push condition passes, run:

```bash
git push origin shadow/m4-cosmile-memory
```

## Forbidden

Do not:

- edit any file
- stage any file
- create any new commit
- amend commit `004c52df14da9b2051597602575d33eb0211cdbc`
- force push
- push any branch except `shadow/m4-cosmile-memory`
- push to main
- merge to main
- turn `COSMILE_REC_OUTCOME_ENABLED` ON
- access DB/prod/live/main/secret
- run production DB migration
- claim operational readiness
- change unrelated `app/docs/**`
- touch SIASIU or foundation-control

## STOP Conditions

STOP and return to Advisor if any required condition is false, or if any forbidden action is needed.

## Post-Push Verification

After push, verify:

- local HEAD remains `004c52df14da9b2051597602575d33eb0211cdbc`
- `origin/shadow/m4-cosmile-memory` points to `004c52df14da9b2051597602575d33eb0211cdbc`
- local branch is no longer ahead of origin
- no runtime file is staged
- no new runtime commit was created

## Result Files

Write the long result to:

`../foundation-docs/runs/cosmile/20260709_v3_11c2_d_o1_runtime_push_routing/WORKER_RESULT.md`

Write the Advisor pointer to:

`../foundation-docs/advisor/jobs/20260709_v3_11c2_d_o1_runtime_push_routing/11_WORKER_RESULT_POINTER.md`

If safe, commit and push only those foundation-docs result/pointer files.

## Chat Output

Return only:

```text
## RESULT SUMMARY

## NEXT ACTION ROUTING

## POINTER BLOCK
```

The result must return to Advisor.
