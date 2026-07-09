# 01 Advisor Brief - V3-11C2 Target DB Rehearsal and Preflight Gate

Date: 2026-07-09

## Verdict

`TARGET_DB_GATE_NEEDS_LEO_DECISION`

The shadow branch implementation loop is complete, but the next pre-flag gate requires a target environment decision before any Worker handoff can safely execute DB-affecting actions.

## Executive Summary

The prior routine is complete for shadow branch state:

- V3-11C2 organic RecOutcomeEvent MVI is implemented, reviewed, committed, and pushed.
- D-O1 `FULL_ORDER_ITEM_UNIQUE` hard idempotency is implemented, reviewed, committed, and pushed.
- F-2 active sqlite migration cleanup is implemented, reviewed, committed, and pushed.
- `COSMILE_REC_OUTCOME_ENABLED` remains OFF.

The remaining pre-flag blocker is not code implementation. It is environment/database readiness:

1. run a fresh migration deploy rehearsal against a non-production target or disposable DB;
2. verify duplicate preflight returns `0`;
3. verify D-O1 uniqueness behavior on the target-like DB path;
4. keep flag OFF and avoid operational use.

Advisor must not route actual target DB work until Leo/GPT identifies the allowed DB environment and confirms DB access boundaries.

## Current Runtime State

Advisor verified:

```text
repo: ../Cosmile
branch: shadow/m4-cosmile-memory
local HEAD: ac2ea4c02d4f648fc0b21aaf82f33c750b81fda9
origin/shadow/m4-cosmile-memory: ac2ea4c02d4f648fc0b21aaf82f33c750b81fda9
ahead/behind: 0 / 0
staged files: none
```

Unrelated `app/docs/**` files remain untracked and outside this gate.

## Closed Items

### V3-11C2 MVI

Closed with risk for default-OFF shadow implementation:

- organic checkout MVI
- `recommendationId = null`
- `attributionMode = organic`
- fail-open behavior
- no semantic feedback
- no group-buy/refund/reorder/direct/session expansion

### D-O1 Idempotency

Closed with risk for shadow/schema implementation:

- `@@unique([orderItemId])`
- D-O1 migration/down migration
- P2002 duplicate/idempotent skip
- code-level existing-check retained
- Sentinel ephemeral rehearsal verified duplicate rejection

### F-2 Migration Graph Cleanup

Closed for shadow branch state:

- legacy sqlite migration `20260624181637_commerce_intelligence` moved out of active `migrations/`
- active PostgreSQL migration graph no longer contains that sqlite migration
- cleanup committed and pushed as `ac2ea4c`

## Remaining Blockers

### B1 - Target DB Identity Missing

No target DB has been identified.

Advisor cannot infer:

- whether the target is disposable local Postgres, CI ephemeral Postgres, staging, preview, or another non-prod DB;
- whether credentials exist;
- whether the DB contains existing `RecOutcomeEvent` rows;
- whether migration history is clean.

### B2 - Duplicate Preflight Not Run On Target DB

Required preflight before applying the D-O1 unique index in any target DB:

```sql
SELECT "orderItemId", COUNT(*)
FROM "RecOutcomeEvent"
WHERE "orderItemId" IS NOT NULL
GROUP BY "orderItemId"
HAVING COUNT(*) > 1;
```

Pass condition:

`0 rows`

Any non-zero result is a STOP condition requiring a data cleanup/backfill decision.

### B3 - Target DB Migration Deploy Not Rehearsed

F-2 cleanup removes the known active sqlite migration blocker, but the actual target migration path still needs proof on a permitted DB:

- `prisma migrate deploy` against the chosen target-like DB;
- no prod/live unless separately approved;
- no real customer data output in reports;
- evidence must be counts/status only.

### B4 - D-O1 Target Behavior Not Verified

The Sentinel ephemeral rehearsal verified D-O1 behavior earlier. The target path still needs a safe target-like confirmation after F-2 cleanup:

- unique constraint present after migration;
- duplicate `orderItemId` rejected;
- distinct `orderItemId` accepted;
- R-K2 CHECK behavior preserved where applicable;
- no raw IDs or PII in report output.

## Recommended Plan

### Phase 1 - Ephemeral Fresh Deploy Rehearsal

Recommended first because it does not require real DB secrets or prod/live access.

Purpose:

- prove the current pushed shadow branch migration graph can fresh-deploy after F-2 cleanup;
- prove D-O1 migration still applies cleanly from an empty disposable PostgreSQL DB;
- verify active migration graph no longer fails due to sqlite syntax.

Allowed target:

- disposable local/CI PostgreSQL only;
- no app DB;
- no customer data;
- no network-exposed port unless required by local tooling;
- no retained DB volume unless explicitly documented and cleaned.

Expected Worker evidence:

- branch and HEAD;
- active migration file list;
- `prisma validate`;
- `prisma migrate deploy` result on disposable DB;
- duplicate preflight count after migration;
- D-O1 duplicate rejection smoke;
- teardown confirmation.

### Phase 2 - Real Non-Prod Target DB Gate

Requires Leo/GPT decision before Worker handoff.

Purpose:

- run duplicate preflight on the chosen non-prod target DB before D-O1 uniqueness is applied;
- run or rehearse migration deploy on the target environment;
- confirm target DB state is safe for flag-ON readiness discussion.

Required Leo/GPT decisions:

1. target DB environment name;
2. whether it is disposable, preview, staging, or another non-prod DB;
3. whether Worker may access credentials through an approved local env mechanism;
4. whether migration deploy may be executed or only dry-run/rehearsed;
5. whether existing data may be inspected only via aggregate/count queries;
6. expected rollback/restore procedure if migration fails.

### Phase 3 - Flag-ON Readiness Review

Only after Phase 1 and Phase 2 pass.

Still out of scope until separately approved:

- `COSMILE_REC_OUTCOME_ENABLED=1`
- live/prod exposure
- operational writes
- main merge
- production DB migration

## Recommended Decision

Advisor recommendation:

1. Proceed next with Phase 1 ephemeral fresh deploy rehearsal.
2. Do not touch any real target DB yet.
3. After Phase 1 passes, ask Leo/GPT to identify the non-prod target DB for Phase 2.

Reason:

- Phase 1 can verify F-2 cleanup plus D-O1 migration graph integrity without secrets or live data.
- Phase 2 is high-risk because it touches a named DB environment and may require credentials/migration execution.

## Why No Worker Brief Is Written Yet

No Worker brief is written for target DB execution in this job because target DB identity and access boundaries are missing.

Advisor may write a Phase 1 ephemeral rehearsal Worker brief next if Leo/GPT accepts that no real DB is touched.

Advisor must not write a Phase 2 target DB Worker brief until Leo/GPT provides the target DB decision.

## STOP Conditions

STOP and ask Leo/GPT if any next step requires:

- real target DB access;
- DB credentials;
- prod/live/main/secret access;
- migration deploy against a persistent DB;
- output of raw customer/order/payment IDs;
- flag ON;
- operational use;
- main merge;
- data cleanup/backfill.

## What Should Not Be Done Next

- Do not route directly to Worker for real target DB work.
- Do not turn the flag ON.
- Do not run production migration.
- Do not access prod/live/main/secret.
- Do not claim operational readiness.
- Do not ask Sentinel to review a DB action that has not been scoped.
- Do not use GPT strategy session for routine same-mission handoffs, but do use Leo/GPT decision for target DB identity.

## Next Recommended Action

Ask Leo/GPT to approve Phase 1 ephemeral fresh deploy rehearsal or identify the non-prod target DB for Phase 2.

If Leo/GPT approves Phase 1, Advisor can prepare a Worker handoff for disposable PostgreSQL rehearsal only.
