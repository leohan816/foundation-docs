# 02 Worker Brief - V3-11C2 + D-O1 Runtime Push Routing

Date: 2026-07-09

## Required Skill

`/fable-builder`

## Exact Task

Push the already-created Cosmile runtime commit to the approved shadow branch.

Push exactly:

- commit: `004c52df14da9b2051597602575d33eb0211cdbc`
- from local branch: `shadow/m4-cosmile-memory`
- to remote branch: `origin/shadow/m4-cosmile-memory`

This is push-only.

## Target Repo

- repo: `../Cosmile`
- app root: `../Cosmile/app`
- branch: `shadow/m4-cosmile-memory`

## Allowed Runtime Action

Only this runtime command is authorized after verification:

```bash
git push origin shadow/m4-cosmile-memory
```

## Required Pre-Push Checks

Before pushing, verify and record:

```bash
git branch --show-current
git rev-parse HEAD
git status -sb
git diff --cached --name-only
git rev-parse --abbrev-ref --symbolic-full-name @{u}
```

Required values:

- branch: `shadow/m4-cosmile-memory`
- HEAD: `004c52df14da9b2051597602575d33eb0211cdbc`
- upstream: `origin/shadow/m4-cosmile-memory`
- branch status: ahead 1 of origin
- staged diff: empty

## Forbidden Runtime Actions

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
- run schema/migration changes beyond the existing committed D-O1 files
- access DB/prod/live/main/secret
- run production DB migration
- claim operational readiness
- touch SIASIU or foundation-control
- change unrelated `app/docs/**`

## STOP Conditions

STOP and return to Advisor if:

- current branch is not `shadow/m4-cosmile-memory`
- HEAD is not `004c52df14da9b2051597602575d33eb0211cdbc`
- upstream is not `origin/shadow/m4-cosmile-memory`
- branch is not ahead by the single approved commit
- any file is staged
- push would require a new commit
- push would require force
- push target is not `origin/shadow/m4-cosmile-memory`
- any flag ON, live/prod/main/secret, DB write, main merge, or scope expansion is requested

## Required Post-Push Checks

After push, verify and record:

```bash
git status -sb
git rev-parse HEAD
git ls-remote origin refs/heads/shadow/m4-cosmile-memory
git log --oneline -1 origin/shadow/m4-cosmile-memory
```

Required post-push state:

- local HEAD remains `004c52df14da9b2051597602575d33eb0211cdbc`
- remote branch `origin/shadow/m4-cosmile-memory` points to `004c52df14da9b2051597602575d33eb0211cdbc`
- local branch is not ahead of origin
- unrelated `app/docs/**` files remain untracked and uncommitted if still present
- no runtime files are staged

## Result Storage

Write the long result to:

`../foundation-docs/runs/cosmile/20260709_v3_11c2_d_o1_runtime_push_routing/WORKER_RESULT.md`

Write the Advisor pointer to:

`../foundation-docs/advisor/jobs/20260709_v3_11c2_d_o1_runtime_push_routing/11_WORKER_RESULT_POINTER.md`

Commit and push only those foundation-docs result/pointer files, if safe.

## Chat Output Format

Return only:

```text
## RESULT SUMMARY

## NEXT ACTION ROUTING

## POINTER BLOCK
```

The `NEXT ACTION ROUTING` target must be `Advisor`.

## Completion Criteria

This task is complete only if:

- runtime commit `004c52df14da9b2051597602575d33eb0211cdbc` is pushed to `origin/shadow/m4-cosmile-memory`
- no new runtime commit is created
- no file is edited or staged
- no force push occurs
- no main merge occurs
- no flag ON, DB/prod/live/main/secret access occurs
- result and pointer files are archived in foundation-docs

Final approval remains with Leo/GPT.
