# M2 A/B — Independent Design Review Handoff

```text
MISSION_ID: MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1
WORK_UNIT_ID: M2-AB-INDEPENDENT-DESIGN-REVIEW
REVIEW_ID: M2-AB-DESIGN-REVIEW-001
TARGET_ACTOR: foundation-reviewer-fable5
TARGET_SESSION: foundation-reviewer-fable5
TARGET_WINDOW_ID: @5
TARGET_PANE_ID: %5
ROLE: Independent Reviewer
REVIEW_PASS: DESIGN_REVIEW
RESPONSIBLE_ADVISOR: foundation-advisor
RETURN_TO: foundation-advisor

TARGET_PROJECT: Cosmile
TARGET_WORKSPACE: /home/leo/Project/Cosmile
COSMILE_BRANCH: shadow/m4-cosmile-memory
COSMILE_BASELINE_HEAD: 6e44aa40ffb2960573839a01424761dc5e98d610
FOUNDATION_DOCS_REPOSITORY: /home/leo/Project/.worktrees/foundation-docs/FOUNDATION_TEAM_ROLE_ALIGNMENT_20260714
FOUNDATION_DOCS_BRANCH: advisor/foundation-team-role-alignment-20260714
SUBJECT_BASE: 5624ec7650f5e34754b77f113f299b5cf3eaabe7
VERDICT_TARGET_HEAD: 35cc5591456566ccdb02324974956b0c5ec7ce3a
VERDICT_TARGET_PATHS:
- runs/cosmile/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_AB_DESIGN_RESULT.md
- runs/cosmile/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_AB_DESIGN_RESULT_POINTER.md

ACTUAL_MODEL_REQUIRED: claude-fable-5
EFFORT_REQUIRED: max
REQUIRED_SKILL: /fable-sentinel

ALLOWED_WRITE:
- /home/leo/Project/.worktrees/foundation-docs/FOUNDATION_TEAM_ROLE_ALIGNMENT_20260714/runs/shared/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_AB_DESIGN_REVIEW_RESULT.md
- /home/leo/Project/.worktrees/foundation-docs/FOUNDATION_TEAM_ROLE_ALIGNMENT_20260714/runs/shared/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_AB_DESIGN_REVIEW_RESULT_POINTER.md

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

Read directly. Do not execute from prior Reviewer memory and do not trust the
Designer or Control summary without checking the exact subject and source.

1. `/home/leo/Project/agent-office/docs/agent/TEAM_OPERATING_MODEL.md`
2. `/home/leo/Project/agent-office/docs/agent/roles/reviewer.md`
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
11. Control result and pointer at commit
    `73889c86f5170cfe20718a237dff989d52960c9f`
12. Designer result and pointer at immutable subject commit
    `35cc5591456566ccdb02324974956b0c5ec7ce3a`
13. Current Cosmile source, schema, migrations, UI, API, and tests needed to
    verify every material design claim; read-only
14. `/home/leo/Project/skill/fable-sentinel/SKILL.md` and every reference it
    routes to for contract, safety, provenance, and design review

Historical foundation-docs role text is evidence only. Current role authority
comes from Agent Office and this handoff.

## Fixed Founder authority

The selected decisions are D1-A, D2-A, and D3-A with all twelve constraints in
`24_M2_FOUNDER_D1_D3_DECISION.md`. Review only the authorized A/B subset:

- A: contained write-only outbox hardening; no consumer, flush, network,
  Foundation intake, real target DB, production, or live activation.
- B: purchased-line closed-choice satisfaction/adverse feedback, deterministic
  versioned normalization, Cosmile-owned evidence envelope, and safe enqueue to
  that contained producer-only outbox.
- Purpose-specific consent is separate; login/userId is never consent; identity
  linking is OFF absent explicit action and versioned consent.
- Cosmile candidate/adverse-candidate creation and promotion calls remain zero.
- Append-only correction and retraction+tombstone are required.
- Satisfaction cannot reduce adverse severity or handling; static approved
  guidance only.
- Additive schema/migration work is local/non-prod/shadow only, with ephemeral
  rehearsal; flags remain OFF.

C implementation/delivery/intake, full Package 1B, production, and the next
mission remain unauthorized.

## Required independent checks

1. Verify the exact subject commit, ancestry, subject paths, Designer identity,
   model/effort/skill, and zero product-repo write claim.
2. Check Space, Behavior, Information, and Technology completeness against the
   approved A/B scope and actual Cosmile source.
3. Verify the recommendation presentation surfaces, first-presentation ID mint,
   lifecycle propagation, CommerceEvent/RecommendationEvent division, and
   deterministic duplicate prevention are implementable without policy choices.
4. Verify purchased-line feedback, separate satisfaction/adverse axes,
   closed-choice normalization, consent, identity, correction, retraction,
   lineage, provenance, retention representation, and static adverse guidance.
5. Verify the minimized versioned envelope and outbox remain producer-only,
   fail-closed, flag-OFF, no-network, no-consumer, and no Foundation intake.
6. Verify there is no Cosmile MemoryFactCandidate/adverse-candidate creation,
   candidate call, automatic promotion, ranking mutation, or safety mutation.
7. Verify the proposed Worker file allowlist is exact and sufficient, and that
   schema/migration/product code are assigned only to the Cosmile Worker.
8. Verify the migration, rollback, ephemeral rehearsal, and test matrix are safe,
   reversible, and do not imply real target DB authority.
9. Verify accessibility/error/loading/blocked behavior and requirement-to-file-
   to-test traceability are implementation-ready.
10. Identify policy invention, internal contradiction, omitted edge case, stale
    source assumption, overly broad scope, or any item that needs Founder choice.

## Mandatory ruling on two authority tensions

Record an explicit ruling and evidence for each:

```text
R-Q1 — ADDITIVE_SCHEMA_AUTHORITY
The design proposes replacing `RecommendationEvent.recommendationId` as primary
key with a new `eventId` primary key so multiple lifecycle events can share one
recommendationId. Decide whether this is permitted by the exact additive-only A/B
schema authority. Compare the narrowest safe alternative, including leaving the
existing table untouched and adding a dedicated lifecycle-event table. If the
proposal exceeds authority or is not safely reversible, issue NEEDS_PATCH with a
bounded design correction; do not choose implementation yourself.

R-Q2 — ADVERSE_SAFE_ENQUEUE_SCOPE
The design keeps skin/other adverse evidence local while
`adverse_regulatory_hold` duration is unset. Decide whether this correctly
implements the Founder constraints or improperly narrows the authorized B scope,
which includes structured adverse feedback and safe enqueue to the contained
write-only outbox. Distinguish retention-class representation from actual legal
hold duration and delivery/activation. If correction is needed, state the exact
bounded contract change; do not invent a production retention period.
```

## Review boundaries

Do not implement, patch the subject, run tests, access DB/env/secrets/network,
modify product/control files, commit, push, dispatch, accept risk, or authorize C.
The Reviewer may write only the declared Reviewer-owned result and pointer.

## Required output

```text
RESULT_PATH: /home/leo/Project/.worktrees/foundation-docs/FOUNDATION_TEAM_ROLE_ALIGNMENT_20260714/runs/shared/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_AB_DESIGN_REVIEW_RESULT.md
POINTER_PATH: /home/leo/Project/.worktrees/foundation-docs/FOUNDATION_TEAM_ROLE_ALIGNMENT_20260714/runs/shared/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_AB_DESIGN_REVIEW_RESULT_POINTER.md
```

The result must include the live runtime verification, exact subject and paths,
files/source read, every required check, both mandatory rulings, and:

```text
VERDICT: PASS | PASS_WITH_RISK | NEEDS_PATCH | FAIL
BLOCKING_FINDINGS
NON_BLOCKING_FINDINGS
AUTHORITY_CONFLICTS
REQUIRED_PATCHES
RESIDUAL_RISKS
PRODUCT_REPO_WRITE_STATUS: ZERO
C_IMPLEMENTATION_STARTED: NO
FULL_PACKAGE_1B_STARTED: NO
RETURN_TO: foundation-advisor
STOP_AFTER_RETURN: true
```

For `NEEDS_PATCH`, identify stable finding IDs, exact evidence, and the narrowest
Designer-owned artifact corrections. Do not patch. Return only the pointer to the
Advisor and STOP.
