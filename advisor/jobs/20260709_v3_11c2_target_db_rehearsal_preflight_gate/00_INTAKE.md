# 00 Intake - V3-11C2 Target DB Rehearsal and Preflight Gate

Date: 2026-07-09

## Leo/GPT Instruction Context

V3-11C2 + D-O1 default-OFF shadow implementation is now implemented, reviewed, committed, and pushed to `origin/shadow/m4-cosmile-memory`.

F-2 sqlite migration quarantine is also implemented, reviewed, committed, and pushed to `origin/shadow/m4-cosmile-memory`.

Advisor should continue same-mission orchestration when the next step is clear, but must stop for new scope, high-risk decisions, or missing environment decisions.

## Goal

Define the next pre-flag gate for:

- target DB deployment rehearsal
- duplicate preflight `= 0`
- D-O1 live/target DB rehearsal readiness

This is a decision package and gate plan only.

## Non-Goals

- Do not run DB migration.
- Do not access any DB.
- Do not access prod/live/main/secret.
- Do not turn `COSMILE_REC_OUTCOME_ENABLED` ON.
- Do not create Worker implementation handoff yet for target DB actions.
- Do not claim operational readiness.
- Do not merge to main.

## Current Completed State

Runtime branch:

- repo: `../Cosmile`
- branch: `shadow/m4-cosmile-memory`
- local HEAD: `ac2ea4c02d4f648fc0b21aaf82f33c750b81fda9`
- origin HEAD: `ac2ea4c02d4f648fc0b21aaf82f33c750b81fda9`
- ahead/behind: `0 / 0`

Pushed runtime commits:

- `004c52d`: V3-11C2 + D-O1 default-OFF shadow implementation
- `ac2ea4c`: F-2 legacy sqlite migration quarantine

## Inputs

- `../foundation-docs/advisor/jobs/20260709_v3_11c2_d_o1_idempotency_gate_plan/05_FINAL_AUDIT.md`
- `../foundation-docs/runs/cosmile/20260709_v3_11c2_d_o1_idempotency_gate_plan/SENTINEL_REVIEW_RESULT.md`
- `../foundation-docs/advisor/jobs/20260709_v3_11c2_f2_runtime_push_routing/05_FINAL_AUDIT.md`
- `../Cosmile` git status and current branch identity

## Allowed Advisor Write Scope

- `../foundation-docs/advisor/jobs/20260709_v3_11c2_target_db_rehearsal_preflight_gate/**`

## Forbidden Advisor Actions

- Do not edit runtime repos.
- Do not stage/commit/push runtime repos.
- Do not run migration commands against any DB.
- Do not read secrets.
- Do not access prod/live/main.
- Do not create a target DB Worker handoff without Leo/GPT environment decision.

## Initial Assumptions

- Target DB identity is not yet specified.
- DB access credentials are not available to Advisor and must not be inferred.
- Real target DB action is higher-risk than prior shadow branch routing and requires explicit Leo/GPT decision.
- A disposable ephemeral DB rehearsal is lower-risk but does not replace target DB preflight.
