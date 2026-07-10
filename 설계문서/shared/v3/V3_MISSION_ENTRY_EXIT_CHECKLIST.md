# V3 Mission Entry and Exit Checklist

Status: `ACTIVE_CANONICAL__MANDATORY`

Date: 2026-07-10

Applies to: every future V3 mission, including Packages 1B, 2, 3, and 4.

No future V3 Worker handoff may be created until the entry section is completed and the applicable unknown-gate level is recorded.

## Entry Declaration

Copy this block into the Advisor brief before any Worker or Control handoff:

```text
V3_MISSION_ENTRY
MISSION_ID:
MISSION_OBJECTIVE:
RISK_LEVEL: LEVEL_A | LEVEL_B | LEVEL_C
RISK_LEVEL_RATIONALE:
IMPACTED_UNKNOWN_IDS:
IMPACTED_DECISION_IDS:
IMPACTED_ACCEPTANCE_SCENARIOS:
OPEN_BLOCKERS:
LEGAL_POLICY_HOLDS:
EXPERIMENT_REQUIRED_ITEMS:
EXTENSION_POINTS_AFFECTED:
SAFE_DEFAULTS_TO_PRESERVE:
REQUIRED_GATES:
REVERSIBILITY_CLASS: HIGH | MEDIUM | LOW | IRREVERSIBLE
COST_IF_WRONG:
CANONICAL_SOURCES_READ:
CURRENT_FACTS:
CURRENT_ASSUMPTIONS:
MISSING_EVIDENCE:
AUTHORITY_DECISIONS_ALREADY_APPROVED:
AUTHORITY_DECISIONS_STILL_REQUIRED:
FORBIDDEN_SCOPE:
STOP_CONDITIONS:
```

## Entry Gate Questions

- Are every impacted U-ID and addendum named rather than summarized generically?
- Does any item remain `OPEN_BLOCKER`, `LEGAL_POLICY_HOLD`, or `EXPERIMENT_REQUIRED`?
- Is the mission attempting to turn an experiment or legal question into a technical assumption?
- Does the mission preserve D1-D5-ii exactly, including D5 containment independent of ownership?
- Are all affected acceptance scenarios cited?
- Are historical V3 documents being used only under the precedence in `V3_CANONICAL_INDEX.md`?
- Is Package 1B or another package explicitly approved, rather than inferred from a prior closure?
- Is the work additive and reversible, with no destructive re-key, silent overwrite, or historical reinterpretation?
- Does the selected risk level satisfy `V3_BIG_BLOCK_UNKNOWN_GATE_PROTOCOL.md`?
- If any escalation trigger appears, has the mission been raised to Level A before routing?

If any answer is unclear, status is `HOLD` or `NEEDS_LEO_DECISION`; no Worker handoff is ready.

## Handoff Gate

Before writing a Worker handoff, Advisor must record:

```text
ENTRY_CHECKLIST_STATUS: COMPLETE
UNKNOWN_GATE_STATUS: PASSED_FOR_CURRENT_SCOPE | HOLD | NEEDS_LEO_DECISION
DESIGN_DOC_STATUS:
DESIGN_REVIEW_STATUS:
LEO_GPT_SCOPE_APPROVAL:
WORKER_HANDOFF_AUTHORIZED: true | false
```

`WORKER_HANDOFF_AUTHORIZED` must remain `false` when:

- the required design doc or design review is absent;
- a dependent `OPEN_BLOCKER` remains;
- a `LEGAL_POLICY_HOLD` is being guessed;
- an `EXPERIMENT_REQUIRED` item is presented as resolved;
- product/canonical authority is missing;
- Package 1B or another package is not explicitly started;
- risk level is downgraded despite a Level A trigger.

## Exit Declaration

Copy this block into the Advisor final audit:

```text
V3_MISSION_EXIT
MISSION_ID:
MISSION_VERDICT:
UNKNOWNS_RESOLVED:
UNKNOWNS_STILL_OPEN:
NEWLY_DISCOVERED_UNKNOWNS:
FOUNDER_DECISIONS_IMPLEMENTED:
FOUNDER_DECISIONS_NOT_IMPLEMENTED:
ACCEPTANCE_SCENARIOS_COVERED:
EXTENSION_POINTS_ADDED_OR_CHANGED:
SAFE_DEFAULTS_PRESERVED:
SAFE_DEFAULTS_CHANGED:
SAFE_DEFAULT_CHANGE_AUTHORITY:
CANONICAL_REGISTER_UPDATED:
FOUNDER_LEDGER_UPDATED:
EXTENSION_ROADMAP_UPDATED:
CANONICAL_INDEX_UPDATED:
NEXT_BLOCKED_CAPABILITY:
NEXT_REQUIRED_GATE:
NEXT_REQUIRED_LEO_GPT_DECISION:
RUNTIME_SCHEMA_API_DB_SECRET_STATUS:
REVIEW_ARTIFACTS:
COMMIT_AND_POINTER_EVIDENCE:
```

## Exit Gate Questions

- Did the mission resolve only what its evidence and authority allowed?
- Are experimental, legal/policy, and operational unknowns still visibly unresolved?
- Were disagreements preserved rather than rewritten into consensus?
- Are new unknowns added with source, reason, safe default, and blocked capability?
- Are every implemented founder decision and every unimplemented founder decision explicit?
- Are extension points still additive and backward-compatible?
- Were any safe defaults changed? If so, is Leo/GPT authority recorded?
- Are canonical documents updated before final closure?
- Does independent review cover the actual artifacts and exact versions?
- Is the next blocked capability and next required decision explicit?

## Mandatory Outcome

A V3 mission cannot receive `MISSION_COMPLETE` when the exit checklist is incomplete, canonical state is stale, required review coverage is absent, or a blocker has been hidden in narrative text.

Historical evidence may inform a mission, but it cannot replace this checklist or current canonical authority.
