# Handoff — Foundation Control Read-Only U1–U3 Discovery

```text
MISSION_ID: MEMORY_V3_U1_U3_DISCOVERY_AND_CLOSURE_READINESS_V1
WORK_UNIT_ID: U1-U3-DISCOVERY-CONTROL-001
TARGET_ACTOR: foundation-control
TARGET_SESSION: foundation-control
ROLE: Control
MODE: READ_ONLY_CROSS_PROJECT_DISCOVERY
TARGET_WORKSPACE: /home/leo/Project/foundation-control
TARGET_BRANCH: shadow/m5-ingress-gate
BASELINE_COMMIT: c89b792bed177aad9322e09debecc76caab0c8a0
EFFORT: high
REQUIRED_SKILL: /fable-builder
RETURN_TO: foundation-advisor
```

## Required reads

1. `/home/leo/Project/agent-office/docs/agent/TEAM_OPERATING_MODEL.md`
2. `/home/leo/Project/agent-office/docs/agent/roles/control.md`
3. This handoff and `00_MISSION_AUTHORITY.md`.
4. Gate Package at commit `1eb7f884bbe2ebc86db6d06d36831607bc815100`.
5. Prior final audit at commit `8859574b28086ea8ce56b58ec10650de8839128a`.
6. Direct pinned source/doc/config evidence in the four named repositories.

## Exact repository pins

- FOUNDATION: `shadow/foundation-shared-memory-v0` at
  `33570b9d7db79c991bb216b6a2dc80880ba1f2d6`.
- Cosmile: `shadow/m4-cosmile-memory` at
  `b8b61d746e2bdbb8d7ab26405bf44fb665ad87a6`.
- SIASIU: `shadow/m4-siasiu-memory` at
  `e1830b45c6d2b22b2471bb5957b6aaf7fa6dd602`.
- foundation-control: `shadow/m5-ingress-gate` at
  `c89b792bed177aad9322e09debecc76caab0c8a0`.

## Work

Perform direct read-only discovery for U1, U2, and U3 exactly as defined in
`00_MISSION_AUTHORITY.md`. Separate verified facts from inference. Search actual
deployment/config/docs/source for a qualifying non-production workload-identity
capability and exact owners/paths; do not infer capability from generic library
or product support. Build the exact U2-A fail-closed contract without selecting
or implementing transport. Inspect actual Foundation architecture for verified
durable-storage technology/tool/path facts and report whether an architecture
recommendation is evidence-supported.

For each gate return all required output fields, candidate closure text, exact
citations to commit/path/line, decision owners, blocked/unlocked WorkUnits, and
fail-closed default. `CLOSURE_READY` remains advisory only.

## Allowed writes

Only:

- `runs/shared/MEMORY_V3_U1_U3_DISCOVERY_AND_CLOSURE_READINESS_V1/10_CONTROL_DISCOVERY_RESULT.md`
- `runs/shared/MEMORY_V3_U1_U3_DISCOVERY_AND_CLOSURE_READINESS_V1/11_CONTROL_DISCOVERY_POINTER.md`

under the authorized foundation-docs worktree. Do not commit or push; the
Advisor publishes exact artifacts.

## Forbidden

No modification to FOUNDATION, Cosmile, SIASIU, or foundation-control. No DB,
schema, migration, credential/auth implementation, consent adapter/transport,
network activation, Worker/Designer/Reviewer dispatch, option selection, gate
closure, risk acceptance, or later WorkUnit.

## Completion

Write the exact result and pointer, verify all repository pins and tracked status
remain unchanged, return the compact pointer to `foundation-advisor`, and STOP.
