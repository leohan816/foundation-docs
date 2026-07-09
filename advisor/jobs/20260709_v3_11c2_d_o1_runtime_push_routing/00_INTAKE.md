# 00 Intake - V3-11C2 + D-O1 Runtime Push Routing

Date: 2026-07-09

## Leo/GPT Instruction Summary

Leo/GPT clarified that runtime push routing is an approved follow-up step inside the already-approved V3-11C2 + D-O1 default-OFF shadow implementation mission.

Advisor must not send this intermediate routing back to the GPT strategy session. Advisor must prepare a push-only Worker handoff for the Cosmile Worker session.

## Goal

Prepare the role-specific Worker brief, full handoff prompt, short run prompt, and loop state for pushing exactly one already-created Cosmile runtime commit:

- commit: `004c52df14da9b2051597602575d33eb0211cdbc`
- short commit: `004c52d`
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
- No Sentinel review execution.
- No Service Reviewer execution.
- No final production or operational approval.

## Allowed Read

- Advisor operating rules.
- V3-11C2 + D-O1 final audit and closure artifacts.
- Runtime commit routing result and pointer.
- `../Cosmile` git status and commit identity only as needed to validate push routing.

## Allowed Write

- `../foundation-docs/advisor/jobs/20260709_v3_11c2_d_o1_runtime_push_routing/**`

## Forbidden Actions

- Advisor must not push the runtime repo.
- Advisor must not stage or commit runtime files.
- Advisor must not modify runtime source, tests, schema, migrations, or docs.
- Advisor must not access DB/prod/live/main/secret.
- Advisor must not authorize any branch except `origin/shadow/m4-cosmile-memory`.

## Initial Assumptions

- Runtime commit `004c52df14da9b2051597602575d33eb0211cdbc` already exists locally in `../Cosmile`.
- `../Cosmile` is on `shadow/m4-cosmile-memory`.
- The branch is ahead of `origin/shadow/m4-cosmile-memory` by one commit.
- Unrelated untracked `app/docs/**` files remain excluded and must not be staged or committed.
