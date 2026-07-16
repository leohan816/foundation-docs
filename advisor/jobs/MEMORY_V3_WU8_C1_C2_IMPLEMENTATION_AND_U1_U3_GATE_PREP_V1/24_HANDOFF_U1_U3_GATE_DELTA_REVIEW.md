# Handoff — U1–U3 Gate Package Delta Review 1

```text
MISSION_ID: MEMORY_V3_WU8_C1_C2_IMPLEMENTATION_AND_U1_U3_GATE_PREP_V1
REVIEW_ID: WU8-U1-U3-GATE-PACKAGE-DELTA-REVIEW-001
REVIEW_PASS: DELTA_REVIEW
PREVIOUS_REVIEW_ID: WU8-U1-U3-GATE-PACKAGE-REVIEW-001
PREVIOUS_VERDICT: NEEDS_PATCH
FINDING_ID: GP-1
CORRECTION_CYCLE: 1 of maximum 2
TARGET_ACTOR: foundation-reviewer-fable5
TARGET_SESSION: foundation-reviewer-fable5
TARGET_WINDOW: @5
TARGET_PANE: %5
ROLE: Same Independent Reviewer
ACTUAL_MODEL_REQUIRED: Fable 5 family
EFFORT_REQUIRED: max
REQUIRED_SKILL: /fable-sentinel
RETURN_TO: foundation-advisor
```

## Immutable delta subject

```text
SUBJECT_FILE: advisor/jobs/MEMORY_V3_WU8_C1_C2_IMPLEMENTATION_AND_U1_U3_GATE_PREP_V1/20_U1_U3_GATE_PACKAGE.md
PREVIOUS_SUBJECT_COMMIT: a30aa663ee978253ac4918bbda7e34856a35be04
PREVIOUS_SUBJECT_BLOB: bdd7d175a7ba4791f4378f9554d511d8b5403b35
PREVIOUS_SUBJECT_SHA256: 8c036ffa960cae614ae0adc94627d32b617f9de918e26839bbee8c281567e3c3
NEW_SUBJECT_COMMIT: 1eb7f884bbe2ebc86db6d06d36831607bc815100
NEW_SUBJECT_BLOB: de2178af4300c003ecac2f6d11f6595b763659f8
NEW_SUBJECT_SHA256: bb43a18405c8f2d0103b2b695e16249f12b38a5e55fe0c57bdc4182409fc990e
```

The first full-review result is:

```text
runs/shared/MEMORY_V3_WU8_C1_C2_IMPLEMENTATION_AND_U1_U3_GATE_PREP_V1/U1_U3_GATE_PACKAGE_REVIEW_RESULT.md
COMMIT: 95e7238da9b274aeba137aad88e1c0a4bd2f6d2d
RESULT_SHA256: be0aac4395f08175ea58dc770198a911c2d7a728d14f379b4fa9a5776abdb488
```

## Required delta review

Read the prior full-review result and compare only the exact subject file between the old and new subject commits.
Intervening commits contain report, handoff, launcher, and review artifacts and are not part of this delta subject.

Verify:

1. GP-1 is corrected by replacing the inaccurate counted set with the reviewed design section 5.7 canonical six:
   - `(service, source_event_id)`;
   - `(service, evidence_id)`;
   - `(service, idempotency_key)`;
   - `(service, predecessor/target_evidence_id)` across correction and retraction;
   - `(service, evidence_id, candidate_slot)`;
   - `(service, root_evidence_id)` tombstone plus the purchase-lineage replay block.
2. The review-draft slot uniqueness is present and lineage-head uniqueness is no longer substituted into the canonical six.
3. No other subject sentence, option, owner, dependency, path-truth block, status, authority, or exclusion changed.
4. The correction selects no option, accepts no risk, closes no gate, and authorizes no implementation.

Do not re-run the full review. This pass is delta-only. Inherit the prior review's `ALL_OTHER_CRITERIA: VERIFIED` only
if this exact delta closes GP-1 without regression.

## Verdict and write scope

Return exactly one of `PASS`, `PASS_WITH_RISK`, `NEEDS_PATCH`, or `FAIL`.

Write only:

```text
/home/leo/Project/.worktrees/foundation-docs/FOUNDATION_TEAM_ROLE_ALIGNMENT_20260714/runs/shared/MEMORY_V3_WU8_C1_C2_IMPLEMENTATION_AND_U1_U3_GATE_PREP_V1/U1_U3_GATE_PACKAGE_DELTA_REVIEW_RESULT.md
/home/leo/Project/.worktrees/foundation-docs/FOUNDATION_TEAM_ROLE_ALIGNMENT_20260714/runs/shared/MEMORY_V3_WU8_C1_C2_IMPLEMENTATION_AND_U1_U3_GATE_PREP_V1/U1_U3_GATE_PACKAGE_DELTA_REVIEW_POINTER.md
```

Do not patch, stage, commit, push, accept risk, select policy, close U1/U2/U3, or modify any product/control file.
Return to `foundation-advisor` and STOP.
