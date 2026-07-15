# M2 C — Independent Implementation-Ready Design Review Handoff

```text
MISSION_ID: MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1
WORK_UNIT_ID: M2-C-INDEPENDENT-DESIGN-REVIEW-001
REVIEW_ID: M2-C-DESIGN-REVIEW-001
INSTRUCTION_CLASSIFICATION: PROCEED_WITH_LIMITS
TARGET_ACTOR: foundation-reviewer-fable5
TARGET_SESSION: foundation-reviewer-fable5
TARGET_WINDOW_ID: @5
TARGET_PANE_ID: %5
ROLE: Independent Reviewer (Sentinel)
REVIEW_PASS: C_IMPLEMENTATION_READY_DESIGN_REVIEW
RESPONSIBLE_ADVISOR: foundation-advisor
RETURN_TO: foundation-advisor

FOUNDATION_REPOSITORY: /home/leo/Project/FOUNDATION
FOUNDATION_BRANCH: shadow/foundation-shared-memory-v0
FOUNDATION_PINNED_HEAD: f6417004d9157766b2b23d4d0870ade7f0c7fe96
COSMILE_REPOSITORY: /home/leo/Project/Cosmile
COSMILE_BRANCH: shadow/m4-cosmile-memory
COSMILE_PINNED_HEAD: f26fa5ced7083bb8d0af00bda2a54951923ea22f

FOUNDATION_DOCS_REPOSITORY: /home/leo/Project/.worktrees/foundation-docs/FOUNDATION_TEAM_ROLE_ALIGNMENT_20260714
FOUNDATION_DOCS_BRANCH: advisor/foundation-team-role-alignment-20260714
SUBJECT_BASE: 0ef0508f3f2b23c5e79b04009c25f47bc7e2df0d
VERDICT_TARGET_HEAD: 7cbcb8d9bfe012b92d8bf8f1e0ba0957f1610117
VERDICT_TARGET_PATHS:
- runs/shared/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_C_IMPLEMENTATION_READY_DESIGN_RESULT.md
- runs/shared/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_C_IMPLEMENTATION_READY_DESIGN_RESULT_POINTER.md

ACTUAL_MODEL: verify live and record exactly
EFFORT: max
REQUIRED_SKILL: /fable-sentinel
INDEPENDENCE: separate Reviewer session required

ALLOWED_WRITE:
- /home/leo/Project/.worktrees/foundation-docs/FOUNDATION_TEAM_ROLE_ALIGNMENT_20260714/runs/shared/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_C_DESIGN_REVIEW_RESULT.md
- /home/leo/Project/.worktrees/foundation-docs/FOUNDATION_TEAM_ROLE_ALIGNMENT_20260714/runs/shared/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_C_DESIGN_REVIEW_RESULT_POINTER.md

FORBIDDEN_WRITE:
- /home/leo/Project/FOUNDATION/**
- /home/leo/Project/Cosmile/**
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
C_IMPLEMENTATION: NOT_AUTHORIZED
C_DELIVERY_OR_INTAKE: NOT_AUTHORIZED
CANDIDATE_RUNTIME: NOT_AUTHORIZED
FULL_PACKAGE_1B: NOT_AUTHORIZED
STOP_AFTER_RETURN: true
```

## Required direct reads

Do not execute from memory and do not trust Control, Designer, or Advisor prose
until direct evidence confirms it.

1. `/home/leo/Project/agent-office/docs/agent/TEAM_OPERATING_MODEL.md`
2. `/home/leo/Project/agent-office/docs/agent/roles/reviewer.md`
3. `/home/leo/Project/FOUNDATION/AGENTS.md`
4. `/home/leo/Project/FOUNDATION/CLAUDE.md`
5. `/home/leo/Project/Cosmile/AGENTS.md`
6. `/home/leo/Project/Cosmile/CLAUDE.md`
7. `/home/leo/Project/Cosmile/app/AGENTS.md`
8. `/home/leo/Project/Cosmile/app/CLAUDE.md`
9. Mission Founder authority files `20_M2_SCOPE_DECISION.md`,
   `22_M2_D1_D3_FOUNDER_DECISION_PACKAGE.md`,
   `24_M2_FOUNDER_D1_D3_DECISION.md`, and
   `25_M2_ADVISOR_INTAKE_AND_ROUTING.md`
10. C Control result and pointer at foundation-docs commit
    `c53855c6e191c24819e98555f83bf12b37e9a127`
11. C Designer handoff and launcher at commits
    `2f8c1c7f3382f67e523fe1e19aed7abffce3db11` and
    `0ef0508f3f2b23c5e79b04009c25f47bc7e2df0d`
12. The exact Designer result and pointer at immutable subject commit
    `7cbcb8d9bfe012b92d8bf8f1e0ba0957f1610117`
13. The pinned Foundation and Cosmile source, schema, migrations, tests, and
    policies needed to verify each material design claim, read-only
14. `/home/leo/Project/skill/fable-sentinel/SKILL.md` and every reference it
    routes to for contract, safety, provenance, and design review

Historical foundation-docs role text is evidence only. Current role authority
comes from Agent Office and this exact committed handoff.

## Fixed authority and review target

The subject is a design only. It may specify bounded future Foundation work but
must not claim present authority to implement, deliver, consume the outbox,
activate intake, connect candidate runtime, use a real database, enter
production/live, or authorize full Package 1B.

Founder decisions D1-A, D2-A, and D3-A remain fixed:

- Cosmile owns closed-choice deterministic normalization and the commerce
  evidence envelope; it never creates Foundation memory/adverse candidates.
- Foundation may validate and accept/reject evidence and may create
  Foundation-owned candidate drafts only in a separately approved future C
  implementation.
- feedback-storage consent and cross-service-use consent are separate; login or
  user ID does not imply consent; identity linking is OFF by default.
- correction is append-only; retraction uses a tombstone; satisfaction never
  reduces adverse handling.
- source hashes are integrity evidence, not authentication.
- raw text, external semantic providers, automatic promotion/reuse/ranking or
  safety mutation, delivery/intake activation, production, and real target DB
  remain forbidden.

## Required independent checks

1. Verify exact subject commit/paths, ancestry, result hash, actor/model/effort/
   skill evidence, and zero product/control repository writes.
2. Verify every v1 input field, type, nullability, conditional invariant,
   identity boundary, privacy exclusion, normalization rule, consent purpose,
   lineage field, and retention representation against pinned Cosmile source.
3. Verify the deterministic first-failure gate order and exact mapping to all
   18 reserved C reason codes. Unknown diagnostics must collapse safely without
   becoming an oracle or leaking payload/identity.
4. Verify `source_hash` is recomputed only as integrity evidence and a separate
   authenticity/provenance verifier fails closed when unconfigured, errors, or
   cannot bind the authenticated envelope digest.
5. Verify current consent freshness/revocation cannot be inferred from the v1
   snapshot and the consent adapter accepts zero when unconfigured. Login,
   subject shape, historic consent, and user ID must not substitute for current
   purpose-specific consent.
6. Verify replay, duplicate/collision, correction, retraction, retention, race,
   transaction, audit-failure, and one-process concurrency semantics are exact,
   deterministic, and make no durability claim.
7. Verify accepted evidence is distinct from eligibility, candidate-draft
   creation, review, approval, reuse, runtime memory, ranking, and safety
   mutation. No stage may silently imply the next.
8. Verify the two proposed Foundation-owned draft forms do not pretend to be the
   current `MemoryCandidate`, synthesize missing `furef_v2`, write the current
   store, or bypass adverse/manual-review policy.
9. Verify satisfaction and adverse axes remain independent, severe/unknown
   adverse behavior is conservative, and the unresolved legal retention policy
   accepts/creates nothing rather than inventing a duration.
10. Verify response, audit, metrics, IDs, hashes, and lineage pointers are
    minimized and do not expose producer identifiers, raw payload, PII, secret,
    medical advice, or diagnostic detail.
11. Verify the proposed Foundation module/file plan is additive, dedicated,
    default-OFF, does not overload `ingest_event_signal`, has no transport/
    endpoint/consumer/import activation, and is assigned only to a future
    Foundation Worker after new Founder approval.
12. Verify test, property, malicious-input, concurrency, containment, rollback,
    kill-switch, threat, and traceability plans are sufficient and honestly
    distinguish synthetic/ephemeral proof from real DB/network/runtime claims.
13. Identify any policy invention, internal contradiction, missing edge case,
    stale source assumption, overly broad WorkUnit, or unresolved choice hidden
    as an implementation detail.

## Mandatory explicit rulings

Record an evidence-backed ruling for each:

```text
C-R1 AUTHENTICITY_AND_SOURCE_HASH
C-R2 CURRENT_CONSENT_FRESHNESS_AND_REVOCATION
C-R3 EXACT_18_REASON_CODE_TAXONOMY_AND_GUARD
C-R4 REPLAY_COLLISION_CORRECTION_RETRACTION_CONCURRENCY
C-R5 FUREF_V2_AND_CURRENT_MEMORYCANDIDATE_BOUNDARY
C-R6 ADVERSE_RETENTION_AND_SAFETY_ASYMMETRY
C-R7 DEFAULT_OFF_NO_TRANSPORT_NO_INTAKE_NO_RUNTIME
C-R8 FUTURE_WORKUNIT_AUTHORITY_AND_HARD_STOP
```

For unresolved authenticity, consent freshness, legal hold, guest exception,
durable storage, or current-candidate bridge decisions, determine whether the
design fails closed cleanly or improperly claims implementation-readiness by
inventing policy. Do not resolve those decisions yourself.

## Review boundaries

Do not implement or patch the subject, run tests, access DB/env/secrets/network,
modify any product/control file, commit, push, dispatch, accept risk, authorize C,
or start another mission. Write only the two declared Reviewer-owned artifacts.

## Required output

```text
RESULT_PATH: /home/leo/Project/.worktrees/foundation-docs/FOUNDATION_TEAM_ROLE_ALIGNMENT_20260714/runs/shared/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_C_DESIGN_REVIEW_RESULT.md
POINTER_PATH: /home/leo/Project/.worktrees/foundation-docs/FOUNDATION_TEAM_ROLE_ALIGNMENT_20260714/runs/shared/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_C_DESIGN_REVIEW_RESULT_POINTER.md
```

The result must state the verified runtime, subject, direct source/evidence
reads, every required check and mandatory ruling, then one verdict:

```text
VERDICT: PASS | PASS_WITH_RISK | NEEDS_PATCH | FAIL
BLOCKING_FINDINGS:
NON_BLOCKING_FINDINGS:
AUTHORITY_CONFLICTS:
REQUIRED_PATCHES:
RESIDUAL_RISKS:
PRODUCT_REPO_WRITE_STATUS: ZERO
CONTROL_REPO_WRITE_STATUS: ZERO
C_IMPLEMENTATION_STARTED: NO
C_DELIVERY_INTAKE_STARTED: NO
CANDIDATE_RUNTIME_STARTED: NO
FULL_PACKAGE_1B_STARTED: NO
RETURN_TO: foundation-advisor
STOP_AFTER_RETURN: true
```

For `NEEDS_PATCH`, use stable finding IDs, exact evidence, and the narrowest
Designer-owned artifact corrections. Do not patch. Return only the compact
pointer to `foundation-advisor` and STOP.
