# M2 A/B — Foundation Control Contract Analysis Handoff

```text
MISSION_ID: MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1
WORK_UNIT_ID: M2-AB-CONTROL-CONTRACT-ANALYSIS
TARGET_ACTOR: foundation-control
TARGET_SESSION: foundation-control
ROLE: Control
MODE: READ_ONLY_CROSS_PROJECT_CONTRACT_ANALYSIS
RESPONSIBLE_ADVISOR: foundation-advisor
RETURN_TO: foundation-advisor

TARGET_WORKSPACE: /home/leo/Project/foundation-control
FOUNDATION_REPOSITORY: /home/leo/Project/FOUNDATION
SIASIU_REPOSITORY: /home/leo/Project/SIASIU
COSMILE_REPOSITORY: /home/leo/Project/Cosmile
FOUNDATION_DOCS_WORKTREE: /home/leo/Project/.worktrees/foundation-docs/FOUNDATION_TEAM_ROLE_ALIGNMENT_20260714
FOUNDATION_DOCS_BRANCH: advisor/foundation-team-role-alignment-20260714

ACTUAL_MODEL_REQUIRED: Opus 4.8 (1M)
EFFORT_REQUIRED: high
REQUIRED_SKILL: /fable-builder

ALLOWED_WRITE:
- /home/leo/Project/.worktrees/foundation-docs/FOUNDATION_TEAM_ROLE_ALIGNMENT_20260714/runs/shared/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_AB_CONTROL_CONTRACT_RESULT.md
- /home/leo/Project/.worktrees/foundation-docs/FOUNDATION_TEAM_ROLE_ALIGNMENT_20260714/runs/shared/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_AB_CONTROL_CONTRACT_RESULT_POINTER.md

FORBIDDEN_WRITE:
- /home/leo/Project/FOUNDATION/**
- /home/leo/Project/SIASIU/**
- /home/leo/Project/Cosmile/**
- /home/leo/Project/foundation-control/**
- every foundation-docs path not listed in ALLOWED_WRITE

COMMIT_PERMISSION: NO
PUSH_PERMISSION: NO
DB_ACCESS: NO
SECRET_OR_ENV_ACCESS: NO
NETWORK_OR_PROVIDER_ACCESS: NO
TEST_EXECUTION: NO
BRANCH_CREATE_SWITCH_MERGE: NO
ACTOR_OR_SUBAGENT_CREATION: NO
```

## Required reads

Read every file directly; do not execute from memory.

1. `/home/leo/Project/agent-office/docs/agent/TEAM_OPERATING_MODEL.md`
2. `/home/leo/Project/agent-office/docs/agent/roles/control.md`
3. `/home/leo/Project/foundation-control/CLAUDE.md`, treating historical
   foundation-docs role authority as superseded by Agent Office
4. `/home/leo/Project/Cosmile/AGENTS.md`
5. `/home/leo/Project/Cosmile/CLAUDE.md`
6. `/home/leo/Project/Cosmile/app/AGENTS.md`
7. `/home/leo/Project/Cosmile/app/CLAUDE.md`
8. `/home/leo/Project/Cosmile/app/docs/security/SECURITY_AND_SECRET_GUARDRAILS.md`
9. `/home/leo/Project/Cosmile/app/docs/security/ENV_AND_MIGRATION_POLICY.md`
10. `24_M2_FOUNDER_D1_D3_DECISION.md` in the mission job folder
11. `22_M2_D1_D3_FOUNDER_DECISION_PACKAGE.md` in the mission job folder
12. M1 baseline, Control result, and Cosmile Worker result in this mission's
    committed foundation-docs artifacts
13. Current relevant Cosmile and Foundation source/schema/migration/tests needed
    to substantiate the contract; read-only only
14. `/home/leo/Project/skill/fable-builder/SKILL.md` and only the references it
    routes to for this contract-analysis task

## Founder-fixed decisions

- D1-A, D2-A, and D3-A are fixed and must not be reopened or inferred away.
- `RecommendationEvent.sessionId` is nullable and Cosmile-local opaque.
- `recommendationId` originates at first actual presentation and propagates
  through view/click/save/dismiss/cart/purchase evidence.
- `CommerceEvent` remains the general ledger; `RecommendationEvent` is canonical
  for recommendation lifecycle evidence.
- Mapping occurs at producer time with deterministic idempotency and no duplicate
  aggregation.
- Cosmile owns versioned deterministic normalization from closed-choice inputs.
- Cosmile never creates MemoryFactCandidate or adverse candidates.
- Feedback-storage consent and cross-service evidence-use consent are separate.
- Login/userId never implies consent; identity linking is default OFF.
- Corrections are append-only; retractions retain a minimal tombstone.
- Satisfaction and adverse are separate axes; satisfaction cannot lower safety.
- No raw text, semantic provider, external regulatory reporting, network
  delivery, outbox consumer, Foundation intake, production/live, or real DB.

## Required analysis

Produce the smallest complete A/B cross-project contract package that a Designer
can turn into an implementation-ready Cosmile design without inventing policy.
It must include:

1. Current code/schema truth with exact evidence paths and any contradictions.
2. Ownership matrix for Cosmile, Foundation, and deferred components.
3. Canonical event taxonomy and producer-time mapping:
   creation/presentation, view, click, save, dismiss, cart, purchase.
4. `recommendationId`, nullable `sessionId`, opaque purchase-item reference, and
   subject/anonymous identity rules.
5. Deterministic idempotency-key inputs and duplicate-aggregation prevention.
6. Versioned closed-choice normalization and the minimal commerce evidence
   envelope.
7. Separate satisfaction/adverse axes and fail-closed invalid combinations.
8. Purpose-specific consent model, default-OFF identity linking, provenance,
   lineage, correction, retraction, minimal tombstone, and non-prod retention
   representation.
9. Contained write-only outbox boundary: producer only, flags OFF, no consumer,
   flush, retry transport, network, or Foundation intake.
10. Additive local/non-prod/shadow schema and migration needs for A/B only,
    including rollback/rehearsal constraints but no execution.
11. Explicit exclusions and STOP conditions.
12. Traceability from each Founder constraint to contract clause and evidence.
13. Designer acceptance inputs and objective design-review criteria.
14. A clearly marked C-boundary preview only: what the later C contract must
    accept/reject. Do not write C implementation design or grant C runtime
    authority in this work unit.

If a Founder-fixed rule conflicts with current code, record it as an implementation
delta. Do not change the code and do not reinterpret the Founder decision.

## Completion criteria

- Both declared result files exist and contain no secret, PII, raw identifier,
  payload sample, or real DB evidence.
- Every normative clause is traceable to a Founder decision or direct source.
- No product/control repository changed; record pre/post HEAD and porcelain hash.
- Result states clearly that this is contract analysis, not reviewed design and
  not implementation authority.
- Return only the compact pointer to `foundation-advisor`, then STOP.

## STOP conditions

Stop and return HOLD if actual actor/session/model/effort/workspace/skill does not
match, a required source cannot be read, product/control write is needed, a new
Founder decision is required, or any DB/secret/network/production action would be
needed.
