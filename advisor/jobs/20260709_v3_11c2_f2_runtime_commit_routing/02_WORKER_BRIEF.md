# 02 Worker Brief - V3-11C2 F-2 Runtime Commit Routing

Date: 2026-07-09

## Required Skill

`/fable-builder`

## Exact Task

Create one local Cosmile runtime commit for the reviewed F-2 migration cleanup move.

This is commit-only. Do not push runtime repo.

## Target Repo

- repo: `../Cosmile`
- app root: `../Cosmile/app`
- branch: `shadow/m4-cosmile-memory`
- expected starting HEAD: `004c52df14da9b2051597602575d33eb0211cdbc`

## Allowed Runtime Staging

Stage exactly:

```text
app/prisma/migrations/20260624181637_commerce_intelligence/migration.sql
app/prisma/migrations_legacy_sqlite/20260624181637_commerce_intelligence/migration.sql
```

No other runtime path may be staged.

## Required Pre-Commit Checks

Before staging, verify:

```bash
git branch --show-current
git rev-parse HEAD
git rev-parse --abbrev-ref --symbolic-full-name @{u}
git rev-list --left-right --count HEAD...origin/shadow/m4-cosmile-memory
git status -sb
git diff --cached --name-only
test ! -e app/prisma/migrations/20260624181637_commerce_intelligence
test -f app/prisma/migrations_legacy_sqlite/20260624181637_commerce_intelligence/migration.sql
```

Expected:

- branch: `shadow/m4-cosmile-memory`
- HEAD: `004c52df14da9b2051597602575d33eb0211cdbc`
- upstream: `origin/shadow/m4-cosmile-memory`
- ahead/behind: `0 / 0`
- staged diff: empty

Verify file identity:

```bash
git show HEAD:app/prisma/migrations/20260624181637_commerce_intelligence/migration.sql > /tmp/f2_original_migration.sql
cmp /tmp/f2_original_migration.sql app/prisma/migrations_legacy_sqlite/20260624181637_commerce_intelligence/migration.sql
```

## Commit Instructions

Stage exactly the two approved paths:

```bash
git add app/prisma/migrations/20260624181637_commerce_intelligence/migration.sql \
  app/prisma/migrations_legacy_sqlite/20260624181637_commerce_intelligence/migration.sql
```

Verify staged diff exactly:

```bash
git diff --cached --name-status
git diff --cached --check
```

Expected staged name-status:

```text
D	app/prisma/migrations/20260624181637_commerce_intelligence/migration.sql
A	app/prisma/migrations_legacy_sqlite/20260624181637_commerce_intelligence/migration.sql
```

Commit message:

```text
chore(cosmile): quarantine legacy sqlite migration
```

Use the repo's normal non-interactive commit path. If the commit hooks or signing block execution, follow local repo protocol and report the exact command used.

## Forbidden Runtime Actions

Do not:

- edit any file before committing
- stage any file outside the approved two paths
- stage or commit `app/docs/**`
- stage or commit schema/source/test changes
- amend `004c52d`
- create more than one runtime commit
- push runtime repo
- run `prisma migrate deploy`
- access DB/prod/live/main/secret
- turn `COSMILE_REC_OUTCOME_ENABLED` ON
- merge or push to main
- claim operational readiness

## Required Post-Commit Checks

After commit, verify:

```bash
git status -sb
git status --short
git log --oneline -1
git show --name-status --format='%H%n%s' HEAD
git diff --cached --name-only
```

Expected:

- latest commit contains only the two approved migration move paths
- runtime push not performed
- local branch is ahead 1 of `origin/shadow/m4-cosmile-memory`
- staged diff is empty
- unrelated `app/docs/**` files remain untracked if still present

## Result Storage

Write the long result to:

`../foundation-docs/runs/cosmile/20260709_v3_11c2_f2_runtime_commit_routing/WORKER_RESULT.md`

Write the Advisor pointer to:

`../foundation-docs/advisor/jobs/20260709_v3_11c2_f2_runtime_commit_routing/11_WORKER_RESULT_POINTER.md`

Commit and push only those foundation-docs result/pointer files, if safe.

Do not push runtime repo.

## Chat Output Format

Return only:

```text
## RESULT SUMMARY

## NEXT ACTION ROUTING

## POINTER BLOCK
```

The result must return to Advisor.

## Completion Criteria

This task is complete only if:

- one local runtime commit captures exactly the reviewed F-2 move
- no runtime push occurs
- no extra runtime path is staged/committed
- result and pointer are archived in foundation-docs

Final approval remains with Leo/GPT.
