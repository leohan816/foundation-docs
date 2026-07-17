# Founder Timebox Correction

MISSION_ID: `FOUNDATION_COSMILE_COMMERCIAL_BASELINE_PREFLIGHT_COUNCIL_V1`

CORRECTION_STATUS: `ACTIVE`

CORRECTION_SOURCE: `LEO_EXPLICIT_DIRECTION`

CORRECTION_TIMING: `POST_COUNCIL_POST_PUBLICATION`

TARGET_DURATION: `APPROXIMATELY_3_WORKING_DAYS`

DAY_3_CHECKPOINT: `REQUIRED`

HARD_STOP_AT_DAY_3: `NO`

## Corrected operating rule

The commercial baseline audit is expected to take approximately three working days. Day 3 is a mandatory control checkpoint, not an automatic termination boundary.

At the Day 3 checkpoint, the Advisor-operated audit must:

1. freeze all completed evidence with exact pins;
2. identify every exact remaining question and its decision impact;
3. confirm whether the work remains inside the already approved audit scope;
4. confirm that no product implementation, architecture redesign, or unauthorized risk decision has entered the scope;
5. provide a revised bounded completion estimate with assumptions and confidence; and
6. record `CONTINUE_WITHIN_SCOPE | COMPLETE_AND_FREEZE_FINAL_PACKAGE | RETURN_TO_LEO`.

## Continuation after Day 3

Continue beyond Day 3 without a new Leo approval when all three conditions are true:

```text
REMAINING_WORK_NECESSARY: YES
REMAINING_WORK_BOUNDED: YES
WITHIN_ALREADY_APPROVED_SCOPE: YES
```

Continuation must remain directed at completing the actual current-state confirmation of Cosmile and Foundation and answering the intended commercial decision. It may not become a full-repository review, new product design, architecture project, implementation mission, or implicit risk-acceptance process.

Completed evidence remains immutable. Later evidence is appended as pinned deltas until final P1–P4 freeze.

## Return to Leo

Return through `foundation-advisor -> Strategy Decision Architect -> Leo` before completion only when at least one condition is true:

```text
MATERIAL_SCOPE_EXPANSION_REQUIRED: YES
NEW_HIGH_RISK_DECISION_REQUIRED: YES
REMAINING_DURATION_MATERIALLY_EXCEEDS_ORIGINAL_ESTIMATE: YES
INTENDED_DECISION_NO_LONGER_ANSWERABLE: YES
```

Ordinary bounded continuation, an unresolved but in-scope evidence question, or the passage of Day 3 alone does not require a return to Leo.

## Package and review sequence

- Day 3 creates a checkpoint snapshot, not necessarily final P1–P4.
- Final P1–P4 freezes when the bounded current-state investigation actually completes or returns under an exact escalation condition.
- P5 Independent Review and Advisor closure follows the final P1–P4 freeze.
- `AUDIT_COMPLETE` still grants no implementation, risk, branch, release, or next-mission authority.

## Historical-record handling

The blind initial reports, cross-reviews, and focused responses remain immutable evidence of the Council's original positions. Their maximum-three-day or no-extension wording is historical and is superseded only for current timebox authority by this Founder correction and the updated operative Strategy documents.

FROZEN_CHALLENGER_REPORTS_MODIFIED: NO

COMMERCIAL_AUDIT_STARTED: NO

ADVISOR_DISPATCHED: NO

PRODUCT_REPOSITORY_CHANGES: NONE

NEXT_MISSION_AUTHORIZED: NO

STOP: `LEO_GPT_REVIEW_REQUIRED`
