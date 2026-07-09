# 00 Intake - V3-11C2 Phase 1 Ephemeral Fresh Deploy Rehearsal

Date: 2026-07-09

## Leo/GPT Decision

Leo/GPT approved Phase 1 only for the target DB rehearsal/preflight gate.

Approved scope:

- disposable/ephemeral PostgreSQL only
- fresh deploy rehearsal only
- current shadow branch migration graph verification
- no real target DB
- no production/staging/live DB
- no secrets
- no flag ON
- no main merge
- no operational use

Phase 2 is not approved.

## Goal

Prepare a Worker handoff for an ephemeral PostgreSQL fresh deploy rehearsal that verifies the current pushed shadow branch migration graph after V3-11C2 + D-O1 + F-2.

## Non-Goals

- No real target DB access.
- No staging/prod/live DB access.
- No persistent DB migration.
- No DB credentials or secrets.
- No runtime code changes.
- No runtime commit/push.
- No flag ON.
- No main merge.
- No operational use.
- No Phase 2 target DB preflight.

## Current Runtime State

Expected runtime state:

- repo: `../Cosmile`
- branch: `shadow/m4-cosmile-memory`
- local HEAD: `ac2ea4c02d4f648fc0b21aaf82f33c750b81fda9`
- origin HEAD: `ac2ea4c02d4f648fc0b21aaf82f33c750b81fda9`
- ahead/behind: `0 / 0`
- active migrations:
  - `00000000000000_init_postgres`
  - `20260706120000_v3_11b_learning_commerce_memory`
  - `20260709120000_v3_11c2_d_o1_rec_outcome_orderitem_unique`
  - `migration_lock.toml`

## Allowed Advisor Write Scope

- `../foundation-docs/advisor/jobs/20260709_v3_11c2_phase1_ephemeral_fresh_deploy_rehearsal/**`

## Forbidden Advisor Actions

- Do not run DB commands.
- Do not modify runtime repos.
- Do not stage/commit/push runtime repos.
- Do not access DB/prod/live/main/secret.
- Do not act as Worker or Sentinel.

## Initial Assumptions

- The Worker may use Docker or an equivalent disposable local PostgreSQL mechanism.
- If no disposable PostgreSQL mechanism is available, Worker must report `SKIP_INFRA` rather than calling it pass.
- The rehearsal may bind a local loopback port only if needed by Prisma tooling.
- All evidence must be synthetic/count/status only.
