# 02 Worker Brief - V3-11C2 Phase 1 Ephemeral Fresh Deploy Rehearsal

Date: 2026-07-09

## Required Skill

`/fable-builder`

## Exact Task

Run a disposable PostgreSQL fresh deploy rehearsal for the current pushed Cosmile shadow branch.

This is rehearsal-only. Do not edit, stage, commit, or push runtime files.

## Target Repo

- repo: `../Cosmile`
- app root: `../Cosmile/app`
- branch: `shadow/m4-cosmile-memory`
- expected HEAD: `ac2ea4c02d4f648fc0b21aaf82f33c750b81fda9`

## Approved Scope

You may:

- start a disposable PostgreSQL instance;
- bind to loopback only if needed by Prisma tooling;
- run `npx prisma validate`;
- run `npx prisma migrate deploy` against the disposable DB only;
- run synthetic/count-only SQL checks against the disposable DB;
- tear down the disposable DB;
- write result/pointer files to foundation-docs.

## Forbidden Scope

Do not:

- use real target DB;
- use staging/prod/live DB;
- read secrets;
- use existing `.env` secret values;
- use real customer/order/payment data;
- edit runtime files;
- stage runtime files;
- commit runtime files;
- push runtime repo;
- turn `COSMILE_REC_OUTCOME_ENABLED` ON;
- merge to main;
- claim operational readiness;
- perform Phase 2 target DB preflight.

## Required Pre-Checks

In `../Cosmile`, verify:

```bash
git branch --show-current
git rev-parse HEAD
git rev-parse origin/shadow/m4-cosmile-memory
git rev-list --left-right --count HEAD...origin/shadow/m4-cosmile-memory
git status -sb
git diff --cached --name-only
find app/prisma/migrations -maxdepth 2 -type f | sort
```

Expected:

- branch: `shadow/m4-cosmile-memory`
- HEAD: `ac2ea4c02d4f648fc0b21aaf82f33c750b81fda9`
- local equals origin
- ahead/behind: `0 / 0`
- staged diff: empty
- active migrations exclude `20260624181637_commerce_intelligence`

STOP if any expected condition fails.

## Disposable PostgreSQL Setup

Preferred method:

- Docker container using `postgres:16-alpine`
- no persistent volume
- `--rm`
- bind host port to `127.0.0.1` only if host Prisma needs it
- synthetic password only

Suggested example:

```bash
CONTAINER="cosmile-v3-11c2-phase1-$(date +%s)"
PORT="55433"
docker run --rm --name "$CONTAINER" \
  -e POSTGRES_PASSWORD=phase1_ephemeral_pw \
  -e POSTGRES_DB=cosmile_phase1 \
  -p 127.0.0.1:${PORT}:5432 \
  -d postgres:16-alpine
```

If port `55433` is unavailable, choose another loopback-only local port and record it.

Wait for readiness:

```bash
docker exec "$CONTAINER" pg_isready -U postgres -d cosmile_phase1
```

If Docker or equivalent disposable PostgreSQL is unavailable, report `SKIP_INFRA_NOT_PASS`. Do not use a real DB as a fallback.

## Migration Rehearsal

From `../Cosmile/app`, run with a synthetic disposable URL only:

```bash
DATABASE_URL="postgresql://postgres:phase1_ephemeral_pw@127.0.0.1:${PORT}/cosmile_phase1?schema=cosmile" \
  npx prisma validate --schema prisma/schema.prisma

DATABASE_URL="postgresql://postgres:phase1_ephemeral_pw@127.0.0.1:${PORT}/cosmile_phase1?schema=cosmile" \
  npx prisma migrate deploy --schema prisma/schema.prisma
```

If `migrate deploy` fails, stop. Do not patch. Capture the error summary in the result.

If safe, run:

```bash
DATABASE_URL="postgresql://postgres:phase1_ephemeral_pw@127.0.0.1:${PORT}/cosmile_phase1?schema=cosmile" \
  npx prisma migrate status --schema prisma/schema.prisma
```

## Required SQL Checks

Use the disposable DB only.

Duplicate preflight must return 0:

```sql
SELECT COUNT(*)
FROM (
  SELECT "orderItemId"
  FROM "RecOutcomeEvent"
  WHERE "orderItemId" IS NOT NULL
  GROUP BY "orderItemId"
  HAVING COUNT(*) > 1
) d;
```

D-O1 smoke should use synthetic rows only:

1. insert one synthetic `Order`;
2. insert two synthetic `OrderItem` rows;
3. insert one organic `RecOutcomeEvent` for the first `orderItemId`;
4. verify a second `RecOutcomeEvent` for the same `orderItemId` is rejected;
5. verify a distinct `orderItemId` can be accepted if CHECK constraints are satisfied.

Do not report raw real IDs. Synthetic IDs are acceptable, but keep result output to status/counts.

You may implement these checks with `docker exec ... psql` or an equivalent disposable DB client. Do not create or edit repo files to run the checks.

## Teardown

Always try to remove the disposable DB:

```bash
docker rm -f "$CONTAINER"
```

Report teardown status.

## STOP Conditions

STOP and return to Advisor if:

- a real DB would be needed;
- any credential/secret is needed;
- Docker/disposable PostgreSQL is unavailable;
- branch/HEAD does not match expected state;
- active migration graph includes `20260624181637_commerce_intelligence`;
- `prisma migrate deploy` fails;
- duplicate preflight is non-zero;
- D-O1 duplicate rejection does not occur;
- runtime file changes are needed;
- flag ON/prod/live/main/secret access is requested.

## Result Storage

Write the long result to:

`../foundation-docs/runs/cosmile/20260709_v3_11c2_phase1_ephemeral_fresh_deploy_rehearsal/WORKER_RESULT.md`

Write the Advisor pointer to:

`../foundation-docs/advisor/jobs/20260709_v3_11c2_phase1_ephemeral_fresh_deploy_rehearsal/11_WORKER_RESULT_POINTER.md`

Commit and push only those foundation-docs result/pointer files, if safe.

Do not commit or push runtime repo files.

## Chat Output Format

Return only:

```text
## RESULT SUMMARY

## NEXT ACTION ROUTING

## POINTER BLOCK
```

The result must return to Advisor.

## Completion Criteria

This Worker task is complete only if:

- disposable DB rehearsal is executed or explicitly reported as `SKIP_INFRA_NOT_PASS`;
- no real DB/secret/prod/live/main access occurs;
- runtime repo remains unmodified and uncommitted;
- result and pointer files are archived in foundation-docs.
