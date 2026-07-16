# Control Handoff — WU8 Selected-Direction Cross-Project Contract

```text
MISSION_ID: MEMORY_V3_WU8_IMPLEMENTATION_READY_DESIGN_V1
WORK_UNIT_ID: WU8-DESIGN-CONTROL-001
TARGET_ACTOR: foundation-control
TARGET_SESSION: foundation-control
ROLE: Control
MODE: READ_ONLY_SELECTED_DIRECTION_CONTRACT_ANALYSIS
RESPONSIBLE_ADVISOR: foundation-advisor

TARGET_WORKSPACE: /home/leo/Project/foundation-control
TARGET_BRANCH: shadow/m5-ingress-gate
BASELINE_COMMIT: c89b792bed177aad9322e09debecc76caab0c8a0

FOUNDATION_REPOSITORY: /home/leo/Project/FOUNDATION
FOUNDATION_BRANCH: shadow/foundation-shared-memory-v0
FOUNDATION_HEAD: 33570b9d7db79c991bb216b6a2dc80880ba1f2d6

COSMILE_REPOSITORY: /home/leo/Project/Cosmile
COSMILE_BRANCH: shadow/m4-cosmile-memory
COSMILE_HEAD: f26fa5ced7083bb8d0af00bda2a54951923ea22f

REQUIRED_SKILL: /fable-builder
MODEL_EFFORT: high
```

## Required reads

Read directly; do not execute from memory:

1. `/home/leo/Project/agent-office/docs/agent/TEAM_OPERATING_MODEL.md`
2. `/home/leo/Project/agent-office/docs/agent/roles/control.md`
3. `advisor/jobs/MEMORY_V3_WU8_READINESS_AND_FOUNDER_DECISION_PACKAGE_V1/11_FOUNDER_WU8_DIRECTION_DECISION.md` at commit `25ec350584fc2df0a9ae77a1bb5192dbaa36630a`
4. `advisor/jobs/MEMORY_V3_WU8_READINESS_AND_FOUNDER_DECISION_PACKAGE_V1/04_FOUNDER_DECISION_PACKAGE.md` at commit `bd4b3c985a386e704b27538dbe45093442101167`
5. `runs/shared/MEMORY_V3_WU8_READINESS_AND_FOUNDER_DECISION_PACKAGE_V1/CONTROL_READ_ONLY_ANALYSIS_RESULT.md` at commit `ec81b5490030f27c36d1ce69c8eb1f774babb91d`
6. `runs/shared/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_C_IMPLEMENTATION_READY_DESIGN_RESULT.md` at commit `7cbcb8d9bfe012b92d8bf8f1e0ba0957f1610117`
7. Current pinned source/contract paths cited by those artifacts, using `git show` where necessary.

## Goal

Turn the five Founder-selected directions into a bounded, transport-neutral cross-project
ownership and contract constraint package that the Designer can use without inventing
policy. This is contract coordination only, not the final implementation-ready design.

## Required content

- Exact ownership map for Cosmile producer/outbox, infrastructure/gateway authenticity,
  Cosmile current-consent authority, Foundation ingress/decision/durable evidence state,
  and later candidate boundaries.
- Exact messages/interfaces between these owners, including minimized attestation verdict
  shape and current-consent verification request/response semantics without choosing or
  implementing credentials.
- Required at-least-once, idempotent commit, per-root ordering, retry, category-only
  dead-letter, backpressure, rollback, kill-switch, and fail-closed invariants.
- Durable state responsibilities and atomic boundaries expressed without selecting a DB,
  broker, provider, endpoint, migration, or production topology.
- Explicit handling of correction, retraction, replay, erasure state, lineage, collision,
  poison input, authority unavailability, and transition-time current-consent checks.
- Exact stop at accepted evidence and review-only drafts; current `MemoryCandidate`,
  `SharedMemoryStore`, approval/reuse/promotion/ranking/safety mutation remain excluded.
- Adverse and identity fail-closed boundaries.
- Security/Legal decisions that remain required, and the point at which each becomes a
  blocking gate rather than an implementation detail.
- A proposed ordered design work-unit map for the Designer, with no implementation
  authorization and a HARD STOP before implementation.
- Direct evidence paths and exact pinned commits; distinguish verified fact, selected
  direction, design constraint, and unresolved gate.

## Allowed actions and writes

Read-only inspection of the four repositories and committed foundation-docs evidence.
Write only:

```text
runs/shared/MEMORY_V3_WU8_IMPLEMENTATION_READY_DESIGN_V1/CONTROL_SELECTED_DIRECTION_CONTRACT_RESULT.md
runs/shared/MEMORY_V3_WU8_IMPLEMENTATION_READY_DESIGN_V1/CONTROL_SELECTED_DIRECTION_CONTRACT_POINTER.md
```

Do not stage, commit, push, fetch, switch branches, run product tests, or modify any other
file. The Advisor will validate and publish the result.

## STOP conditions

Stop and return evidence if any pinned branch/HEAD differs, if a new Founder decision is
required to express the selected contract, if a product-repository write or runtime/DB/
network/secret/credential action becomes necessary, or if the exact result paths cannot
be used.

```text
IMPLEMENTATION: NOT_AUTHORIZED
NEW_POLICY_OR_OPTION_SELECTION: NOT_AUTHORIZED
RETURN_TO: foundation-advisor
STOP_AFTER_RETURN: true
```
