# M2 A/B — Same-Reviewer Delta Design Review Handoff

```text
MISSION_ID: MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1
WORK_UNIT_ID: M2-AB-INDEPENDENT-DESIGN-DELTA-REVIEW
REVIEW_ID: M2-AB-DESIGN-DELTA-REVIEW-001
TARGET_ACTOR: foundation-reviewer-fable5
TARGET_SESSION: foundation-reviewer-fable5
TARGET_WINDOW_ID: @5
TARGET_PANE_ID: %5
ROLE: Independent Reviewer
REVIEW_PASS: DELTA_REVIEW
RESPONSIBLE_ADVISOR: foundation-advisor
RETURN_TO: foundation-advisor

TARGET_PROJECT: Cosmile
TARGET_WORKSPACE: /home/leo/Project/Cosmile
COSMILE_BRANCH: shadow/m4-cosmile-memory
COSMILE_BASELINE_HEAD: 6e44aa40ffb2960573839a01424761dc5e98d610
FOUNDATION_DOCS_REPOSITORY: /home/leo/Project/.worktrees/foundation-docs/FOUNDATION_TEAM_ROLE_ALIGNMENT_20260714
FOUNDATION_DOCS_BRANCH: advisor/foundation-team-role-alignment-20260714
PREVIOUS_SUBJECT_HEAD: 35cc5591456566ccdb02324974956b0c5ec7ce3a
PREVIOUS_REVIEW_RESULT_HEAD: 481a718e30bd060de365076225c3ca972180da9c
NEW_SUBJECT_HEAD: 9530b221d4430d29bfb545702390ebc9e6606d6a
SUBJECT_PATHS:
- runs/cosmile/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_AB_DESIGN_RESULT.md
- runs/cosmile/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_AB_DESIGN_RESULT_POINTER.md

ACTUAL_MODEL_REQUIRED: claude-fable-5
EFFORT_REQUIRED: max
REQUIRED_SKILL: /fable-sentinel

ALLOWED_WRITE:
- /home/leo/Project/.worktrees/foundation-docs/FOUNDATION_TEAM_ROLE_ALIGNMENT_20260714/runs/shared/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_AB_DESIGN_DELTA_REVIEW_RESULT.md
- /home/leo/Project/.worktrees/foundation-docs/FOUNDATION_TEAM_ROLE_ALIGNMENT_20260714/runs/shared/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_AB_DESIGN_DELTA_REVIEW_RESULT_POINTER.md

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

## Required direct reads

This is a narrow same-Reviewer re-review, not a new full review. Read directly:

1. `/home/leo/Project/agent-office/docs/agent/TEAM_OPERATING_MODEL.md`
2. `/home/leo/Project/agent-office/docs/agent/roles/reviewer.md`
3. this exact committed handoff;
4. the prior Reviewer result and pointer at
   `481a718e30bd060de365076225c3ca972180da9c`;
5. the two subject paths at both `PREVIOUS_SUBJECT_HEAD` and
   `NEW_SUBJECT_HEAD`;
6. `/home/leo/Project/skill/fable-sentinel/SKILL.md` and the delta-review
   reference it routes to;
7. only the current Cosmile source or authority clauses needed to resolve an
   ambiguity in the changed lines.

Do not repeat the complete source inventory or full original design review.
Do not rely on memory alone: verify ancestry and the exact path-filtered delta.

## Immutable delta

Run read-only equivalents of:

```text
git merge-base --is-ancestor PREVIOUS_SUBJECT_HEAD NEW_SUBJECT_HEAD
git diff --name-status PREVIOUS_SUBJECT_HEAD..NEW_SUBJECT_HEAD
git diff PREVIOUS_SUBJECT_HEAD..NEW_SUBJECT_HEAD -- SUBJECT_PATHS
```

The commits between the two subjects contain Advisor handoffs and Reviewer
reports. The verdict applies only to the two declared `SUBJECT_PATHS`; do not
treat intervening report-only paths as Designer product scope.

## Exact delta questions

Re-review only `REV-F1`, `REV-F2`, `REV-F3`, and `REV-N1` through `REV-N5`, plus
load-bearing clauses directly affected by those edits:

1. `REV-F1`: valid identified+checked+granted `skin_reaction`/`other`
   low/moderate/severe evidence is contained-outbox eligible; severe also keeps
   local human-safety review; unknown severity creates no outbox row. Adverse
   outbox rows have `queueExpiresAt=null` and
   `retentionState=duration_unconfigured`; no 30-day queue TTL, duration,
   consumer, delivery, or Foundation intake is invented.
2. `REV-F2`: canonical recommendation card view/click no longer also emits
   client-direct `/api/events` ledger rows; server-owned CommerceEvent and
   RecommendationEvent are paired atomically. Existing generic card behavior is
   preserved, and `showRecommendation=false` suppresses
   `recommendation_view`.
3. `REV-F3`: every evidence form starts unchecked; the checkbox is a
   per-evidence election, not inferred from a durable grant. Unchecked stays
   local without revoking. Checked establishes or uses a versioned grant.
   A/B provides only a narrow authenticated revocation API plus tests; no new
   account UI, and production/live remains blocked until a separately approved
   user-facing revocation design.
4. `REV-N1`: the domain name is `recommendationSessionId`, while the existing
   physical `RecommendationEvent.sessionId` column is explicitly identified.
5. `REV-N2`: each canonical evidence pair is atomic; cart/wishlist product
   mutation occurs first and outside the evidence transaction and is never
   rolled back; evidence-pair failure returns sanitized `failed_closed`.
6. `REV-N3`: feedback replay uniqueness is `(orderItemId, clientRequestId)`;
   ownership is checked before idempotency and cross-owner probes reveal no
   collision or prior result.
7. `REV-N4`: a refunded line with non-null `paidAt` remains feedback-eligible.
8. `REV-N5`: flags-OFF and generic consult cards retain the current read-only
   baseline, current generic emissions, no new CTAs, and no recommendation
   lifecycle writes.

Confirm the prior `R-Q1` ruling and its binding zero-row/disposable-DB/down.sql/
rollback/no-real-DB preconditions were not weakened. `REV-N6` is outside this
Designer delta and needs no new product-design patch.

## Verdict rule

- `PASS` only if every blocking and non-blocking delta finding above is closed
  without a new contradiction or scope expansion.
- `NEEDS_PATCH` must identify a stable finding ID, the exact changed clause,
  and the narrowest Designer-artifact correction.
- `PASS_WITH_RISK` requires Leo/GPT risk acceptance and cannot close this gate.
- `FAIL` only for an unrecoverable authority or design conflict.

Do not implement, patch the subject, run tests, access DB/env/secrets/network,
modify product/control files, commit, push, dispatch, accept risk, authorize C,
or start A/B implementation.

## Required output

```text
RESULT_PATH: /home/leo/Project/.worktrees/foundation-docs/FOUNDATION_TEAM_ROLE_ALIGNMENT_20260714/runs/shared/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_AB_DESIGN_DELTA_REVIEW_RESULT.md
POINTER_PATH: /home/leo/Project/.worktrees/foundation-docs/FOUNDATION_TEAM_ROLE_ALIGNMENT_20260714/runs/shared/MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1/M2_AB_DESIGN_DELTA_REVIEW_RESULT_POINTER.md
```

The result must record live runtime verification, independence, ancestry,
path-filtered delta, each finding's closure state, R-Q1 preservation, exact
verdict, residual risks, and:

```text
PRODUCT_REPO_WRITE_STATUS: ZERO
TEST_EXECUTION: NO
C_IMPLEMENTATION_STARTED: NO
FULL_PACKAGE_1B_STARTED: NO
RETURN_TO: foundation-advisor
STOP_AFTER_RETURN: true
```

Return only the compact pointer to `foundation-advisor` and STOP.
