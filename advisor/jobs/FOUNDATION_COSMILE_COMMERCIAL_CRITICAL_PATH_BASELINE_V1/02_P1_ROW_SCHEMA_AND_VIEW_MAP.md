# P1 Authoritative Evidence Row Schema and View Map

All P1-P5 outputs derive from one authoritative evidence-row set. No view may silently change a row's evidence level or status.

## Row schema

```text
ROW_ID
DOMAIN
CAPABILITY_OR_FLOW
REPOSITORY
PINNED_HEAD
OBSERVED_TRACKED_PATHS
CURRENT_IMPLEMENTATION
EVIDENCE_LEVEL: E0 | E1 | E2
STATUS: IMPLEMENTED_STATIC | PARTIAL | MOCK | SHADOW | SOURCE_ONLY | UNVERIFIED | MISSING | BLOCKED | DEFERRED | DEAD_OR_OBSOLETE
AUTHORITY_OR_OWNERSHIP
DEPENDENCIES
FAILURE_OR_FALLBACK_BEHAVIOR
PAID_BETA_IMPACT
PUBLIC_LAUNCH_IMPACT
BLOCKING: YES | NO | CONDITIONAL
REQUIRED_OWNER
REQUIRED_FOLLOWUP
ENGINEERING_WORKDAYS_RANGE
EXTERNAL_CALENDAR_DEPENDENCY
ESTIMATE_CONFIDENCE: LOW | MEDIUM | HIGH
UNKNOWN_OR_ASSUMPTION
SOURCE_ACTOR
SOURCE_RESULT_PATH
```

## Evidence ceiling

```text
E0: authority or existence not established
E1: committed documentation or declaration only
E2: committed tracked source/config/schema/test artifact statically inspected
E3: NOT GENERATED IN THIS MISSION
E4: NOT GENERATED IN THIS MISSION
```

No static row may claim runtime, end-to-end, production, vendor, or operational verification.

## P1-P5 projections

- **P1 — Audit manifest and closure:** authority, pins, methods, evidence ceiling, selected actors, Day 1 gate, Day 3 checkpoint, completeness/unknown ledger.
- **P2 — Capability evidence matrix:** the authoritative rows grouped by Foundation, Cosmile, and shared contracts.
- **P3 — Gate and blocker matrix:** rows projected into Commercial MVP Feature Complete, Paid Beta Ready, Paid Beta Exit, and Public Launch Ready without weakening minimum gates.
- **P4 — Delivery and decision package:** provisional beta options, branch-baseline decision, parallel tracks, workdays, elapsed dependencies, explicit no-build list, and Founder/Strategy decisions.
- **P5 — Independent review and Advisor closure:** exact P1-P4 subject pin, full review, correction records, delta-only re-review, final audit, and final pointer.

## Publication rule

Actor-authored results remain attributable. The Advisor publishes their content without changing the underlying evidence claims, integrates the authoritative rows, and owns cross-row reconciliation and final mission audit.
