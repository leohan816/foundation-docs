# M2 A/B — Designer Implementation-Ready Design Handoff

```text
MISSION_ID: MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1
WORK_UNIT_ID: M2-AB-DESIGN
TARGET_ACTOR: foundation-designer
TARGET_SESSION: foundation-designer
ROLE: Designer
MODE: COSMILE_AB_IMPLEMENTATION_READY_DESIGN
RESPONSIBLE_ADVISOR: foundation-advisor
RETURN_TO: foundation-advisor

TARGET_PROJECT: Cosmile
TARGET_WORKSPACE: /home/leo/Project/Cosmile
COSMILE_BRANCH: shadow/m4-cosmile-memory
COSMILE_BASELINE_HEAD: 6e44aa40ffb2960573839a01424761dc5e98d610
CONTROL_CONTRACT_COMMIT: 73889c86f5170cfe20718a237dff989d52960c9f
FOUNDATION_DOCS_BRANCH: advisor/foundation-team-role-alignment-20260714

ACTUAL_MODEL_REQUIRED: gpt-5.6-sol
EFFORT_REQUIRED: max
REQUIRED_SKILL: /fable-builder

ALLOWED_WRITE:
- /home/leo/Project/.worktrees/foundation-docs/FOUNDATION_TEAM_ROLE_ALIGNMENT_20260714/runs/cosmile/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_AB_DESIGN_RESULT.md
- /home/leo/Project/.worktrees/foundation-docs/FOUNDATION_TEAM_ROLE_ALIGNMENT_20260714/runs/cosmile/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_AB_DESIGN_RESULT_POINTER.md

FORBIDDEN_WRITE:
- /home/leo/Project/Cosmile/**
- /home/leo/Project/FOUNDATION/**
- /home/leo/Project/SIASIU/**
- /home/leo/Project/foundation-control/**
- every foundation-docs path not listed in ALLOWED_WRITE

COMMIT_PERMISSION: NO
PUSH_PERMISSION: NO
TEST_EXECUTION: NO
DB_ACCESS: NO
SECRET_OR_ENV_ACCESS: NO
NETWORK_OR_PROVIDER_ACCESS: NO
BRANCH_CREATE_SWITCH_MERGE: NO
ACTOR_OR_SUBAGENT_CREATION: NO
```

## Required reads

Read directly and apply the current Agent Office authority first. Historical
foundation-docs role protocols referenced by old project entry files are evidence
only and do not expand this role.

1. `/home/leo/Project/agent-office/docs/agent/TEAM_OPERATING_MODEL.md`
2. `/home/leo/Project/agent-office/docs/agent/roles/designer.md`
3. `/home/leo/Project/Cosmile/AGENTS.md`
4. `/home/leo/Project/Cosmile/CLAUDE.md`
5. `/home/leo/Project/Cosmile/app/AGENTS.md`
6. `/home/leo/Project/Cosmile/app/CLAUDE.md`
7. `/home/leo/Project/Cosmile/app/docs/security/SECURITY_AND_SECRET_GUARDRAILS.md`
8. `/home/leo/Project/Cosmile/app/docs/security/ENV_AND_MIGRATION_POLICY.md`
9. `/home/leo/Project/Cosmile/app/docs/testing/TEST_MEANING_POLICY.md`
10. Mission files `22_M2_D1_D3_FOUNDER_DECISION_PACKAGE.md`,
    `24_M2_FOUNDER_D1_D3_DECISION.md`, and
    `25_M2_ADVISOR_INTAKE_AND_ROUTING.md`
11. Committed Control contract result and pointer at commit
    `73889c86f5170cfe20718a237dff989d52960c9f`
12. Current Cosmile source/schema/migration/tests and actual UI surfaces needed to
    make the design implementation-ready; read-only
13. `/home/leo/Project/skill/fable-builder/SKILL.md` and the references it routes
    to for design-before-code, contract mapping, and test design

## Fixed authority and scope

Design only the authorized A/B subset:

- A: contained write-only outbox hardening, payload minimization, opaque
  purchased-line reference, consent/provenance/idempotency/correction/audit,
  retention representation, fail-closed behavior, local/non-prod/shadow only,
  flags OFF.
- B: purchased-line selection, closed-choice satisfaction/adverse feedback,
  deterministic versioned normalization, Cosmile-owned evidence envelope, safe
  enqueue into the contained outbox, correction/retraction/audit, local/non-prod/
  shadow only, flags OFF.

Founder D1-A/D2-A/D3-A and all twelve constraints in
`24_M2_FOUNDER_D1_D3_DECISION.md` are fixed. In particular:

- `RecommendationEvent.sessionId` nullable and Cosmile-local opaque.
- `recommendationId` minted at first actual presentation and propagated through
  view/click/save/dismiss/cart/purchase.
- `CommerceEvent` remains general ledger; `RecommendationEvent` is canonical
  lifecycle evidence; producer-time mapping prevents duplicate aggregation.
- Cosmile owns closed-choice deterministic normalization and the evidence
  envelope.
- B1 is `RESOLVED_BY_FOUNDER_F4_FOR_A_B`: zero Cosmile candidate/adverse-candidate
  creation, zero candidate creation/promotion calls; legacy local model untouched
  and outside A/B scope.
- Separate purpose-specific consent; userId/login is not consent.
- Identity linking default OFF; append-only correction; retraction+tombstone.
- Satisfaction cannot lower adverse handling; static adverse guidance only.

## Required design package

Create a single directly implementable A/B design with no policy invention. It
must cover Space, Behavior, Information, then Technology and include:

1. Current UX and source inventory at original context, identifying the exact
   recommendation presentation surfaces and purchased-item feedback entry point.
2. User journeys and state machines for recommendation presentation/interaction,
   purchased-item selection, feedback consent, structured satisfaction/adverse
   input, submit, correction, retraction, expired/revoked consent, duplicate,
   fail-closed, and static adverse guidance.
3. Mobile-first responsive, keyboard, focus, screen-reader, reduced-motion,
   static/high-text, error/loading/empty/blocked/UNKNOWN behavior.
4. Exact event taxonomy, ID mint/propagation, producer-time dual-recording, and
   deterministic idempotency inputs.
5. Exact versioned envelope fields, closed choices, nullability, validation,
   normalization table, invalid combinations, and stable reason codes.
6. Exact purpose-specific consent and identity-linking state model. Login/userId
   must never imply consent. No guest cross-service enqueue in this pilot.
7. Exact append-only correction/retraction/lineage/tombstone model.
8. Non-prod retention-class representation, including unimplemented/unactivated
   `adverse_regulatory_hold` duration.
9. Exact outbox containment invariants: producer only; no consumer/flush/retry
   transport/network/Foundation intake; flags OFF.
10. Additive schema/migration plan and rollback/ephemeral rehearsal plan for A/B
    only. Never plan a real target DB action.
11. Exact product-repo file allowlist for the Worker, including the canonical
    product design-document path that the Worker must create from this reviewed
    design before code changes.
12. Exact implementation sequence with code-owner mapping; no Control/Designer
    product writes.
13. Test-first matrix: unit/contract/API/UI/migration/rollback/no-network/no-live/
    no-candidate/no-consumer invariants. Mark which checks are safe and which are
    prohibited.
14. Requirement-to-design-to-file-to-test traceability.
15. Explicit exclusions, rollback, kill switch, residual risks, and HARD STOP.

Do not implement, patch, run tests, change schema, create product design files,
commit, push, dispatch, or issue a review verdict.

## Design completion gate

Return `DESIGN_READY_FOR_INDEPENDENT_REVIEW` only if a Cosmile Worker could
implement A/B without choosing field meaning, UX policy, consent policy,
normalization policy, or file scope. Otherwise return `DESIGN_NOT_READY` with the
exact missing decision. Return only the pointer to the Advisor and STOP.
