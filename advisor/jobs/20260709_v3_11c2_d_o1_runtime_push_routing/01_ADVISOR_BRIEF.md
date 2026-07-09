# 01 Advisor Brief - V3-11C2 + D-O1 Runtime Push Routing

Date: 2026-07-09

## Verdict

`RUNTIME_PUSH_ROUTING_READY_WITH_LIMITS`

Advisor may route a push-only task to the separate Cosmile Worker session.

Advisor must not push the runtime repo.

## Executive Summary

Leo/GPT approved push routing as an intermediate step inside the existing V3-11C2 + D-O1 default-OFF shadow implementation mission.

This routing authorizes the Cosmile Worker to push exactly one existing runtime commit:

- commit: `004c52df14da9b2051597602575d33eb0211cdbc`
- short commit: `004c52d`
- source branch: `shadow/m4-cosmile-memory`
- target branch: `origin/shadow/m4-cosmile-memory`

This routing does not authorize code edits, staging, a new commit, force push, main merge, flag ON, live/prod exposure, DB migration, operational use, or scope expansion.

## Repo State Checked

Advisor checked `../Cosmile` before writing this routing:

- branch: `shadow/m4-cosmile-memory`
- upstream: `origin/shadow/m4-cosmile-memory`
- branch status: ahead 1
- HEAD: `004c52df14da9b2051597602575d33eb0211cdbc`
- latest commit: `004c52d feat(cosmile): add RecOutcomeEvent shadow outcome idempotency`
- staged runtime files: none
- unrelated untracked docs: present under `app/docs/**`

## Approved Push Scope

Worker may perform exactly:

```text
git push origin shadow/m4-cosmile-memory
```

Only after verifying all of the following:

- current branch is `shadow/m4-cosmile-memory`
- `HEAD` is exactly `004c52df14da9b2051597602575d33eb0211cdbc`
- upstream target is `origin/shadow/m4-cosmile-memory`
- branch is ahead of origin by exactly one commit
- staged diff is empty
- no new runtime commit is needed
- no runtime source, test, schema, migration, or docs edits are needed

## Forbidden Push Scope

Worker must not:

- push any branch other than `shadow/m4-cosmile-memory`
- force push
- push to `main`
- merge to `main`
- create a new commit
- stage files
- edit files
- include or alter unrelated `app/docs/**`
- turn `COSMILE_REC_OUTCOME_ENABLED` ON
- run production DB migration
- access DB/prod/live/main/secret
- claim operational readiness
- expand into group-buy/refund/reorder/direct/session/semantic/V3-11D

## STOP Conditions

Worker must STOP and return to Advisor if:

- `HEAD` is not `004c52df14da9b2051597602575d33eb0211cdbc`
- current branch is not `shadow/m4-cosmile-memory`
- upstream is not `origin/shadow/m4-cosmile-memory`
- branch is not exactly ahead by one approved commit
- any file is staged
- any code edit, staging, new commit, force push, main merge, flag ON, DB/prod/live/main/secret access, or scope expansion is requested
- push target differs from `origin/shadow/m4-cosmile-memory`
- push would include unreviewed commits

## Expected Worker Result

Worker should write:

- result: `../foundation-docs/runs/cosmile/20260709_v3_11c2_d_o1_runtime_push_routing/WORKER_RESULT.md`
- pointer: `../foundation-docs/advisor/jobs/20260709_v3_11c2_d_o1_runtime_push_routing/11_WORKER_RESULT_POINTER.md`

Worker chat output should contain only:

- `RESULT SUMMARY`
- `NEXT ACTION ROUTING`
- `POINTER BLOCK`

## Required Worker Evidence

Worker result must include:

- pre-push branch and HEAD verification
- pre-push staged diff verification
- exact push command used
- post-push verification that `origin/shadow/m4-cosmile-memory` contains `004c52df14da9b2051597602575d33eb0211cdbc`
- post-push verification that local branch is no longer ahead of origin
- confirmation that no new runtime commit was created
- confirmation that no runtime files were edited or staged
- confirmation that unrelated `app/docs/**` files remain uncommitted
- confirmation that no flag ON, DB/prod/live/main/secret, main merge, or force push occurred

## Post-Push Restrictions

After push, these limits remain in force:

- `COSMILE_REC_OUTCOME_ENABLED` remains OFF.
- No flag ON.
- No live/prod/main/secret.
- No production DB migration.
- No operational use.
- No main merge without separate authorization.
- No claim that group-buy/refund/reorder/direct/session/semantic/V3-11D is covered.
- Real target DB deploy plus duplicate preflight `= 0` remains required before any use.
- F-2 sqlite migration directory cleanup remains required before fresh deploy/flag-ON.

## Next Required Actor

`Worker`

Target session: separate Cosmile Worker session.

Short run prompt:

`../foundation-docs/advisor/jobs/20260709_v3_11c2_d_o1_runtime_push_routing/06_WORKER_RUN_PROMPT.md`
