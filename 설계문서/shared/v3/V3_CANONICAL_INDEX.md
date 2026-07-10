# V3 Canonical Index

Status: `ACTIVE_CANONICAL_ENTRY_POINT`

Date: 2026-07-10

Authority: Leo/GPT

This is the single entry point for current V3 unknown, founder-decision, extension, and mission-gate authority.

## Current State

- Package 1A discovery: `FINAL_APPROVED_AND_CLOSED`
- Founder decisions: `D1`, `D2`, `D3`, `D4`, `D5-i`, and `D5-ii` recorded
- Founder acceptance sheet: `ACCEPTED_WITH_MODIFICATIONS`
- Package 1B: `NOT_STARTED_NOT_APPROVED`
- Packages 2, 3, and 4: must pass the Big-Block Unknown Gate before design or implementation
- Runtime/schema/API/DB authorization from this index: `NONE`

## Canonical Documents

1. [V3_UNKNOWN_DECISION_GATE_REGISTER.md](./V3_UNKNOWN_DECISION_GATE_REGISTER.md) - U-01 through U-09, all post-freeze addenda, preserved disagreements, safe defaults, and carry-forward gates.
2. [V3_FOUNDER_DECISION_LEDGER.md](./V3_FOUNDER_DECISION_LEDGER.md) - exact D1 through D5-ii interpretation and scenario decisions.
3. [V3_EXTENSION_ROADMAP.md](./V3_EXTENSION_ROADMAP.md) - deferred-but-designed-for additive extension points.
4. [V3_MISSION_ENTRY_EXIT_CHECKLIST.md](./V3_MISSION_ENTRY_EXIT_CHECKLIST.md) - mandatory entry and exit declarations for every future V3 mission.
5. [V3_BIG_BLOCK_UNKNOWN_GATE_PROTOCOL.md](./V3_BIG_BLOCK_UNKNOWN_GATE_PROTOCOL.md) - Level A/B/C unknown handling, mandatory for Packages 2, 3, and 4.

## Package 1A Evidence Package

Evidence remains in the closed Advisor job and run archives:

- Frozen unknown register: `advisor/jobs/20260710_v3_package1a_independent_unknown_resolution_founder_decision_package/V3_PACKAGE1A_UNKNOWN_REGISTER.md`
- Advisor independent assessment: `advisor/jobs/20260710_v3_package1a_independent_unknown_resolution_founder_decision_package/ADVISOR_INDEPENDENT_ASSESSMENT.md`
- Foundation independent assessment: `runs/foundation/20260710_v3_package1a_independent_unknown_resolution_founder_decision_package/FOUNDATION_INDEPENDENT_ASSESSMENT.md`
- Cosmile independent assessment: `runs/cosmile/20260710_v3_package1a_independent_unknown_resolution_founder_decision_package/COSMILE_INDEPENDENT_ASSESSMENT.md`
- Fable5 blind assessment: `runs/shared/20260710_v3_package1a_independent_unknown_resolution_founder_decision_package/FABLE5_BLIND_ASSESSMENT.md`
- Actor comparison: `advisor/jobs/20260710_v3_package1a_independent_unknown_resolution_founder_decision_package/ACTOR_COMPARISON_MATRIX.md`
- Founder decision package: `advisor/jobs/20260710_v3_package1a_independent_unknown_resolution_founder_decision_package/FOUNDER_DECISION_PACKAGE.md`
- Founder acceptance sheet: `advisor/jobs/20260710_v3_package1a_independent_unknown_resolution_founder_decision_package/FOUNDER_ACCEPTANCE_SHEET.md`
- Founder decision record: `advisor/jobs/20260710_v3_package1a_independent_unknown_resolution_founder_decision_package/28_FOUNDER_DECISION_RECORD.md`
- Final mission audit: `advisor/jobs/20260710_v3_package1a_independent_unknown_resolution_founder_decision_package/25_ADVISOR_FINAL_MISSION_AUDIT.md`
- Closure record and pointer: `advisor/jobs/20260710_v3_package1a_independent_unknown_resolution_founder_decision_package/29_PACKAGE1A_DECISION_CLOSURE_RECORD.md`, `30_FINAL_DECISION_CLOSURE_POINTER.md`
- Fable5 founder-package PASS: `runs/shared/20260710_v3_package1a_independent_unknown_resolution_founder_decision_package/FABLE5_FOUNDER_PACKAGE_DELTA_REREVIEW.md`

## Related Control Surfaces

- Active Commerce Memory design and its original R-1/R-2/R-3 gate names: `설계문서/cosmile/COSMILE_V3_11C2_COMMERCE_MEMORY_DESIGN.md`. Use the continuity map in `V3_UNKNOWN_DECISION_GATE_REGISTER.md`.
- V3-11 implementation-layer risk/gate register: `advisor/jobs/20260709_v3_11_risk_gate_register_audit/01_ADVISOR_BRIEF.md`. This is a related implementation evidence/control surface, not a replacement for this canonical index. Later implementation closures and actual runtime state supersede stale individual gate statuses in that 2026-07-09 snapshot.

## Authority and Precedence

For Package 1 and later V3 work:

1. Current explicit Leo/GPT mission decision.
2. `AGENT_ROLE_BOUNDARY_AND_RELEASE_TRAIN_PROTOCOL_V2.md` for actor authority and release-train sequencing.
3. This V3 canonical index and its five linked canonical documents.
4. A separately approved mission design and reviewed Advisor brief.
5. Repo-local active instructions for local safety and implementation constraints.
6. Historical V3 reports as evidence only.

Historical documents under `docs/reports/control/COSMILE_MEMORY_V3_*`, including older `CANONICAL`, `DESIGN_APPROVED_WITH_LIMITS`, ownership, or proposed-threshold language, do not authorize Package 1B and do not override this index. When their content conflicts with Package 1A founder decisions or current runtime evidence, the current decision ledger and actual runtime state control. Per-document supersession banners and gate-name reconciliation across still-active canonical designs remain tracked by `HISTORICAL_V3_DOC_STATUS_AND_SUPERSESSION_GATE`.

## Mandatory Mission Entry

Every future V3 Advisor brief must:

1. open this index;
2. complete `V3_MISSION_ENTRY_EXIT_CHECKLIST.md`;
3. declare impacted unknown, decision, scenario, extension, blocker, and safe-default IDs;
4. apply `V3_BIG_BLOCK_UNKNOWN_GATE_PROTOCOL.md`;
5. stop when a required founder/legal/experiment gate is unresolved;
6. update the canonical package at exit.

No V3 Worker handoff is valid without the completed entry checklist.

## Package 1B Boundary

Package 1B is not started and not approved. These canonical documents preserve the inputs a future Package 1B mission must use; they do not design Package 1B. Control must not be invoked until Leo/GPT separately opens the mission and the entry/unknown gates permit design.

## Explicit Non-Authorization

No document linked here authorizes runtime implementation, schema/API/migration work, DB access, feedback collection, signal flush, feature flag activation, main merge, or production/live use.
