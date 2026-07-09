# 01 Advisor Brief - V3-11C2 F-2 Runtime Push Routing

Date: 2026-07-09

## Verdict

`F2_RUNTIME_PUSH_ROUTING_READY_WITH_LIMITS`

Advisor may route a push-only task to the separate Cosmile Worker session.

Advisor must not push the runtime repo.

## Executive Summary

The F-2 runtime commit routing passed final audit. This routing authorizes the Cosmile Worker to push exactly one existing runtime commit:

- commit: `ac2ea4c02d4f648fc0b21aaf82f33c750b81fda9`
- short commit: `ac2ea4c`
- source branch: `shadow/m4-cosmile-memory`
- target branch: `origin/shadow/m4-cosmile-memory`

This routing does not authorize code edits, staging, a new commit, force push, main merge, flag ON, live/prod exposure, DB migration, operational use, or scope expansion.

## Repo State Checked

Advisor checked `../Cosmile` before writing this routing:

- branch: `shadow/m4-cosmile-memory`
- branch status: ahead 1
- HEAD: `ac2ea4c02d4f648fc0b21aaf82f33c750b81fda9`
- latest commit: `ac2ea4c chore(cosmile): quarantine legacy sqlite migration`
- staged runtime files: none
- unrelated untracked docs: present under `app/docs/**`

## Approved Push Scope

Worker may perform exactly:

```text
git push origin shadow/m4-cosmile-memory
```

Only after verifying all of the following:

- current branch is `shadow/m4-cosmile-memory`
- `HEAD` is exactly `ac2ea4c02d4f648fc0b21aaf82f33c750b81fda9`
- upstream target is `origin/shadow/m4-cosmile-memory`
- branch is ahead of origin by exactly one approved commit
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

## STOP Conditions

Worker must STOP and return to Advisor if:

- `HEAD` is not `ac2ea4c02d4f648fc0b21aaf82f33c750b81fda9`
- current branch is not `shadow/m4-cosmile-memory`
- upstream is not `origin/shadow/m4-cosmile-memory`
- branch is not exactly ahead by one approved commit
- any file is staged
- any code edit, staging, new commit, force push, main merge, flag ON, DB/prod/live/main/secret access, or scope expansion is requested
- push target differs from `origin/shadow/m4-cosmile-memory`
- push would include unreviewed commits

## Expected Worker Result

Worker should write:

- result: `../foundation-docs/runs/cosmile/20260709_v3_11c2_f2_runtime_push_routing/WORKER_RESULT.md`
- pointer: `../foundation-docs/advisor/jobs/20260709_v3_11c2_f2_runtime_push_routing/11_WORKER_RESULT_POINTER.md`

Worker chat output should contain only:

- `RESULT SUMMARY`
- `NEXT ACTION ROUTING`
- `POINTER BLOCK`

## Required Worker Evidence

Worker result must include:

- pre-push branch and HEAD verification
- pre-push staged diff verification
- exact push command used
- post-push verification that `origin/shadow/m4-cosmile-memory` contains `ac2ea4c02d4f648fc0b21aaf82f33c750b81fda9`
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
- Real target DB deploy plus duplicate preflight `= 0` remains required before any use.
- D-O1 live DB rehearsal remains required before flag-ON readiness if not completed on the target environment.

## Next Required Actor

`Worker`

Target session: separate Cosmile Worker session.

Short run prompt:

`../foundation-docs/advisor/jobs/20260709_v3_11c2_f2_runtime_push_routing/06_WORKER_RUN_PROMPT.md`
