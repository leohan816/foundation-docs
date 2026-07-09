# 02 Worker Brief - V3-11C2 + D-O1 Runtime Commit Routing

Date: 2026-07-09

## Required Skill

`/fable-builder`

## Validation Decision

`PROCEED_WITH_LIMITS`

## Exact Task

Create one local runtime commit in `../Cosmile` for the approved V3-11C2 + D-O1 default-OFF shadow implementation.

Do not edit runtime files. Do not push the runtime repo.

## Target Repo and Branch

- Target repo: `../Cosmile`
- Target app root: `../Cosmile/app`
- Required branch: `shadow/m4-cosmile-memory`

STOP if branch is not exactly `shadow/m4-cosmile-memory`.

## Required Reads

Read directly:

- `../Cosmile/CLAUDE.md`
- `../Cosmile/docs/agent/RUN_PROTOCOL.md`
- `../Cosmile/docs/agent/RESULT_REPORTING_PROTOCOL.md`
- `../foundation-docs/advisor/jobs/20260709_v3_11c2_worker_brief/14_CLOSURE_RECORD.md`
- `../foundation-docs/advisor/jobs/20260709_v3_11c2_d_o1_idempotency_gate_plan/05_FINAL_AUDIT.md`
- `../foundation-docs/advisor/jobs/20260709_v3_11c2_d_o1_runtime_commit_routing/01_ADVISOR_BRIEF.md`

## Stage Exactly These Files

```text
app/src/lib/ids.ts
app/src/lib/recOutcomeEventService.ts
app/src/app/api/checkout/mock-complete/route.ts
app/scripts/v3_11c2_rec_outcome.vitest.ts
app/prisma/schema.prisma
app/prisma/migrations/20260709120000_v3_11c2_d_o1_rec_outcome_orderitem_unique/migration.sql
app/prisma/migrations/20260709120000_v3_11c2_d_o1_rec_outcome_orderitem_unique/down.sql
app/scripts/v3_11b_db_integration.dbtest.py
```

No other runtime files are allowed.

## Exclude These Files

Do not stage or commit:

```text
app/docs/COSMILE_FOUNDATION_PARITY_CROSSCHECK_20260703.md
app/docs/COSMILE_FOUNDATION_USER_REF_ALIGNMENT_20260703.md
app/docs/COSMILE_FOUNDATION_USER_REF_V2_ALIGNMENT_20260703.md
app/docs/COSMILE_MEMORY_ARCHITECTURE_V1_REVIEW_20260704.md
app/docs/COSMILE_MEMORY_INVENTORY_20260704.md
app/docs/FOUNDATION_DOCS_SYNC_POLICY.md
```

Also exclude:

- any `app/docs/**`
- any file outside the approved include list
- secrets, `.env`, DB files, prod/live/main files, generated files, caches
- SIASIU, foundation-control, foundation-docs runtime-unrelated files

## Required Command Shape

Use non-interactive git commands.

Before staging:

```bash
git status --short
git diff --cached --name-status
```

STOP if anything is already staged.

Stage the approved files only:

```bash
git add \
  app/src/lib/ids.ts \
  app/src/lib/recOutcomeEventService.ts \
  app/src/app/api/checkout/mock-complete/route.ts \
  app/scripts/v3_11c2_rec_outcome.vitest.ts \
  app/prisma/schema.prisma \
  app/prisma/migrations/20260709120000_v3_11c2_d_o1_rec_outcome_orderitem_unique/migration.sql \
  app/prisma/migrations/20260709120000_v3_11c2_d_o1_rec_outcome_orderitem_unique/down.sql \
  app/scripts/v3_11b_db_integration.dbtest.py
```

Verify exact staged list:

```bash
git diff --cached --name-only
git diff --cached --name-status
```

The staged list must be exactly the 8 approved files. If not exact, STOP and report. Do not fix by guessing.

Commit:

```bash
git commit -m "feat(cosmile): add RecOutcomeEvent shadow outcome idempotency"
```

Do not push.

## Tests

This routing is commit-only. Do not modify code or broaden into a new test/rework pass.

Before commit, Worker may run:

```bash
git diff --cached --check
```

Do not rerun DB/prod/live tests. Do not access prod/live/main/secret.

## Forbidden

Do not:

- edit runtime source
- turn `COSMILE_REC_OUTCOME_ENABLED` ON
- push runtime repo
- access prod/live/main/secret
- run production DB migration
- perform operational DB writes
- merge to main
- include unrelated docs
- include `app/docs/**`
- include any unapproved file
- claim group-buy/refund/reorder/direct/session/semantic/V3-11D coverage

## Result Storage

Write long result to:

`../foundation-docs/runs/cosmile/20260709_v3_11c2_d_o1_runtime_commit_routing/WORKER_RESULT.md`

Write pointer to:

`../foundation-docs/advisor/jobs/20260709_v3_11c2_d_o1_runtime_commit_routing/11_WORKER_RESULT_POINTER.md`

Commit/push only those foundation-docs result/pointer files after the runtime commit. Do not push runtime repo.

## Required Worker Report

Report:

- runtime commit hash
- committed branch
- exact committed files
- confirmation that runtime push was not performed
- final `git status --short` for `../Cosmile`
- confirmation that excluded docs remain uncommitted
- confirmation that `COSMILE_REC_OUTCOME_ENABLED` remains OFF
- confirmation that no prod/live/main/secret access occurred
- post-commit restrictions:
  - no flag ON
  - no live/prod/main/secret
  - no production DB migration
  - no operational use
  - no group-buy/refund/reorder/direct/session/semantic/V3-11D coverage claim
  - real target DB deploy + duplicate preflight = 0 remains required before use
  - F-2 sqlite migration directory cleanup remains required before fresh deploy/flag-ON

Chat output must contain only:

1. `RESULT SUMMARY`
2. `NEXT ACTION ROUTING`
3. `POINTER BLOCK`
