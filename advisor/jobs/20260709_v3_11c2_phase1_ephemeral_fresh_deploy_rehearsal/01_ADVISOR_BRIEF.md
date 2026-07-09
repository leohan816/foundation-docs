# 01 Advisor Brief - V3-11C2 Phase 1 Ephemeral Fresh Deploy Rehearsal

Date: 2026-07-09

## Verdict

`PHASE1_EPHEMERAL_REHEARSAL_WORKER_HANDOFF_READY_WITH_LIMITS`

Leo/GPT approved Phase 1 only. Advisor may route a scoped disposable PostgreSQL rehearsal to the separate Cosmile Worker session.

Advisor must not execute the rehearsal.

## Executive Summary

The shadow branch implementation loop is complete:

- `004c52d`: V3-11C2 + D-O1 default-OFF shadow implementation
- `ac2ea4c`: F-2 legacy sqlite migration quarantine

The next allowed gate is not a real target DB action. It is a disposable PostgreSQL fresh deploy rehearsal intended to verify that the current migration graph can deploy cleanly after F-2 cleanup and D-O1.

This does not approve Phase 2, real DB access, staging/prod/live access, secrets, flag ON, main merge, or operational use.

## Approved Phase 1 Scope

Worker may:

- use a disposable local/CI PostgreSQL instance only;
- run `prisma validate`;
- run `prisma migrate deploy` against the disposable DB only;
- verify active migration graph file list;
- run duplicate preflight on the empty/synthetic disposable DB;
- run a synthetic D-O1 duplicate rejection smoke;
- tear down the disposable DB;
- write Worker result and pointer files to foundation-docs.

## Forbidden Phase 1 Scope

Worker must not:

- use any real target DB;
- use staging/prod/live DB;
- read secrets or `.env` secret values;
- use real customer/order/payment data;
- modify runtime code, schema, migrations, tests, or docs;
- stage/commit/push runtime repo;
- turn `COSMILE_REC_OUTCOME_ENABLED` ON;
- merge to main;
- claim operational readiness;
- perform Phase 2 target DB preflight.

## Expected Runtime Starting Point

Advisor checked before preparing this routing:

```text
repo: ../Cosmile
branch: shadow/m4-cosmile-memory
HEAD: ac2ea4c02d4f648fc0b21aaf82f33c750b81fda9
origin/shadow/m4-cosmile-memory: ac2ea4c02d4f648fc0b21aaf82f33c750b81fda9
ahead/behind: 0 / 0
```

Unrelated `app/docs/**` files remain untracked and outside this gate.

## Required Worker Evidence

Worker result must include:

- runtime branch and HEAD;
- confirmation local equals origin before rehearsal;
- active migration file list;
- `prisma validate` result;
- disposable PostgreSQL creation method;
- `DATABASE_URL` shape with password redacted or synthetic only;
- `prisma migrate deploy` result;
- `prisma migrate status` result if safe;
- duplicate preflight result count;
- D-O1 uniqueness smoke result;
- teardown confirmation;
- final runtime repo status;
- confirmation of no real DB/staging/prod/live/secret/flag ON/main access.

## Pass Criteria

Phase 1 can be considered passed only if:

- disposable PostgreSQL starts successfully;
- `prisma validate` passes;
- `prisma migrate deploy` succeeds against the disposable DB;
- the active migration graph does not include `20260624181637_commerce_intelligence`;
- duplicate preflight returns `0`;
- D-O1 duplicate insert is rejected by the DB unique constraint;
- disposable DB is torn down or explicitly reported as ephemeral and removed;
- runtime repo has no new edits/staging/commit/push.

## Acceptable Non-Pass Outcome

If infrastructure is unavailable, Worker should report:

`SKIP_INFRA_NOT_PASS`

Examples:

- Docker unavailable;
- no disposable PostgreSQL mechanism available;
- local port conflict cannot be resolved safely;
- Prisma tooling unavailable.

If migration or DB smoke fails, Worker should report:

`FAILED_REHEARSAL`

Worker must not patch or retry with code/schema changes unless Advisor writes a separate rework handoff.

## Required Sentinel Review

Technical review is required after Worker result if Worker reports `COMPLETED`.

Recommended reviewer route:

- Target actor: Sentinel
- Selected reviewer: fable5 Sentinel
- Required skill: `/fable-sentinel`
- Review level: Level 2

Reason:

The Worker will execute migration deployment against an ephemeral DB. Sentinel should independently inspect the result evidence, command scope, runtime status, and no-real-DB/no-secret/no-flag constraints.

If Worker reports `SKIP_INFRA_NOT_PASS` or `FAILED_REHEARSAL`, Advisor should classify the result before deciding whether Sentinel review is useful or whether rework/Leo decision is needed.

## What Remains Out Of Scope After Phase 1

Even if Phase 1 passes:

- Phase 2 real target DB identity remains undecided;
- duplicate preflight on the real non-prod target DB remains undone;
- flag ON remains forbidden;
- production migration remains forbidden;
- operational use remains forbidden;
- main merge remains forbidden.

## Next Required Actor

Worker.

Target session: separate Cosmile Worker session.

Short run prompt:

`../foundation-docs/advisor/jobs/20260709_v3_11c2_phase1_ephemeral_fresh_deploy_rehearsal/06_WORKER_RUN_PROMPT.md`
