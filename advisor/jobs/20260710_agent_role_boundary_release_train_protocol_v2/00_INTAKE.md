# Intake - Agent Role Boundary and Release Train Protocol V2

Date: 2026-07-10

## Instruction Summary

Leo/GPT designated Advisor as the temporary
`ROLE_PROTOCOL_MIGRATION_OPERATOR` for a single documentation/config migration
mission. Advisor must author one canonical V2 role/release-train protocol,
propagate short references into each actor's active instructions, perform a
repo-grounded self-check, route an independent Fable5 review, reload existing
actor sessions only after Fable5 PASS, and perform the final mission audit.

## Goal

Create and propagate a single authoritative protocol that separates actor
authority from model identity, restores the Foundation Worker as a repo-local
implementation actor, prevents Control expansion, separates Fable5 design and
implementation review passes, and makes Advisor responsible for field management
and final mission-completion audit without becoming Worker, Reviewer, or final
approver.

## Non-Goals

- No runtime implementation.
- No schema, migration, query, or DB work.
- No flag change, main merge, production/live access, or secret access.
- No new sub-agent or temporary role session.
- No independent review by Advisor.
- No final approval by Advisor.

## Target Workspaces

- Advisor: `../foundation-advisor`
- Control: `../foundation-control`
- Foundation Worker: `../FOUNDATION` (actual case-sensitive path)
- Shashu Worker: `../SIASIU`
- Cosmile Worker: `../Cosmile`
- Fable5 Reviewer instruction source: `../skill/fable-sentinel`
- Canonical/evidence archive: `../foundation-docs`

## Initial Safety Constraints

- Preserve unrelated dirty and untracked files.
- Stage only files changed for this protocol migration.
- Follow each repository's current non-main shadow branch where one is active.
- Do not reload sessions before independent review PASS.
- Return `PASS_WITH_RISK` and `FAIL` to Leo/GPT.

