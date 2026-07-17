# Council Report Schema v0

```text
STATUS: PILOT_NON_CANONICAL
AUTHORITY: RECOMMENDATION_ONLY
CURRENT_COUNCIL_MISSION: NONE
```

This schema applies only when a future mission brief authorizes a report.

## Challenger initial report

```text
COUNCIL_MISSION_ID:
ROLE:
ROLE_CATEGORY: CORE | SPECIALIST
PRIMARY_LENS:
SUBJECT_PIN:
COUNCIL_COMPOSITION:
SELECTION_PIN:
TIMEBOX:
AUTHORITY: RECOMMENDATION_ONLY
REPORT_LANGUAGE: ENGLISH

EXECUTIVE_CHALLENGE:

VERIFIED_FACTS:

INFERENCES:

MATERIAL_UNKNOWNS:

FINDINGS:
  - FINDING_ID:
    SEVERITY: BLOCKING | MATERIAL | ADVISORY
    CLAIM:
    EVIDENCE:
    LENS_BASIS:
    OVERLAP_WITH_OTHER_LENS: NONE | ROLE_NAME_AND_REASON
    RECOMMENDATION:

SIMPLER_OR_SAFER_ALTERNATIVE:

TIMEBOX_OR_CLOSURE_IMPACT:

MINORITY_OR_DISSENT_NOTE:

BOUNDARY_CONFIRMATION:
  PRODUCT_DECISION_MADE: NO
  RISK_ACCEPTED: NO
  SUBJECT_PATCHED: NO
  ACTOR_DISPATCHED: NO
  INDEPENDENT_REVIEW_CLAIMED: NO

RETURN_TO: STRATEGY_DECISION_ARCHITECT
STOP.
```

## Evidence rules

- The report, its findings, and the Strategist disposition record are written in English.
  Source evidence may remain in its original language when needed for an exact pin.
- A verified fact includes an exact path, commit, runtime record, external owner record,
  or other reproducible pin appropriate to the claim.
- Inference is labeled and must name its supporting facts.
- Unknown remains unknown; it is not converted into an assumption silently.
- Recommendation must stay within the assigned primary lens.
- Overlap is named explicitly instead of duplicating another role's finding as if it were
  independent evidence.

## Strategist disposition record

The Strategist keeps original reports unchanged and records:

```text
FINDING_ID:
SOURCE_ROLE:
DISPOSITION: ACCEPTED | REJECTED | UNRESOLVED
RATIONALE:
MINORITY_VIEW_PRESERVED: YES | NOT_APPLICABLE
FOUNDER_DECISION_REQUIRED: YES | NO
```

Neither Challenger reports nor Strategist dispositions are independent-review verdicts or
Founder approval.
