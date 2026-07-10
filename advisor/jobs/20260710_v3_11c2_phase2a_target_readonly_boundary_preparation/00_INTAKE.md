# Intake - V3-11C2 Phase 2A Target and Read-Only Boundary Preparation

Date: 2026-07-10

## Mission

`V3_11C2_PHASE2A_TARGET_AND_READONLY_BOUNDARY_PREPARATION`

## Objective

Complete the prerequisite design/admin package needed to prepare the current
Cosmile development DB candidate for a future, separately approved Phase 2A
read-only preflight.

This mission does not approve or execute Phase 2A and does not provision a DB
role or change permissions.

## Current State

- Prior Phase 2A execution-plan design mission:
  `FINAL_APPROVED_AND_CLOSED_WITH_PHASE2A_HOLD`.
- Fable5 design re-review: `PASS_ACCEPTED`.
- Phase 2A execution: `NOT_APPROVED`.
- Entry state:
  `PHASE2A_HELD__AWAITING_TARGET_AND_READONLY_BOUNDARY_MISSION`.

## Intended Direction

The preferred candidate is the current Cosmile development DB, represented by
the non-secret alias `COSMILE_CURRENT_DEV_DB`. It must not be called an approved
target until identity, schema, environment classification, read-only privileges,
masked access, secret hygiene, and review routing are proven and approved.

## Actor Boundaries

- Advisor: inventory, scope validation, Worker routing, evidence validation,
  Fable5 routing, and mission audit.
- Cosmile Worker: design/admin preparation document only.
- Fable5 Reviewer: independent `DESIGN_REVIEW` after Worker completion.
- Leo/GPT: attestation, admin/execution decisions, risk acceptance, and final
  approval.

## Prohibited

- DB connection or connection test.
- Query, migration, role provisioning, or permission change.
- Secret/env value access or output.
- Runtime source, schema, migration, test, package, flag, or main change.
- Phase 2A execution prompt or Phase 2B work.
- Production/live access or new sub-agent creation.

