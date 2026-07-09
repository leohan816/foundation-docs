# 00 Intake - V3-11C2 F-2 Runtime Push Routing

Date: 2026-07-09

## Leo/GPT Instruction Context

Runtime push routing is an internal follow-up step inside the already-approved V3-11C2 F-2 cleanup mission.

Advisor should prepare a push-only Worker handoff. Advisor must not push the runtime repo.

## Goal

Prepare the role-specific Worker brief, full handoff prompt, short run prompt, and loop state for pushing exactly one already-created Cosmile runtime commit:

- commit: `ac2ea4c02d4f648fc0b21aaf82f33c750b81fda9`
- short commit: `ac2ea4c`
- target branch: `origin/shadow/m4-cosmile-memory`
- action: push only

## Non-Goals

- No new runtime commit.
- No runtime code edits.
- No staging.
- No force push.
- No main merge.
- No flag ON.
- No DB/prod/live/main/secret access.
- No production migration.
- No operational readiness claim.

## Allowed Read

- Advisor artifacts for F-2 cleanup and commit routing.
- Worker result and pointer for F-2 runtime commit.
- `../Cosmile` git status and commit identity only as needed to validate push routing.

## Allowed Write

- `../foundation-docs/advisor/jobs/20260709_v3_11c2_f2_runtime_push_routing/**`

## Forbidden Advisor Actions

- Advisor must not push the runtime repo.
- Advisor must not stage or commit runtime files.
- Advisor must not modify runtime source, tests, schema, migrations, or docs.
- Advisor must not access DB/prod/live/main/secret.

## Initial Assumptions

- Runtime commit `ac2ea4c02d4f648fc0b21aaf82f33c750b81fda9` already exists locally in `../Cosmile`.
- `../Cosmile` is on `shadow/m4-cosmile-memory`.
- The branch is ahead of `origin/shadow/m4-cosmile-memory` by one commit.
- Unrelated untracked `app/docs/**` files remain excluded and must not be staged or committed.
