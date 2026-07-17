# Challenger Registry v0

```text
STATUS: PILOT_NON_CANONICAL
AUTHORITY: RECOMMENDATION_ONLY
CURRENT_COUNCIL_MISSION: NONE
```

## Active role definitions

### PRODUCT_USER_AND_BUSINESS_VALUE_CHALLENGER

```text
STATUS: ACTIVE_ROLE_DEFINED
RUNTIME_HOME: /home/leo/Project/council/rules/product-user-business-value
REPORTS_TO: STRATEGY_DECISION_ARCHITECT
PRIMARY_QUESTION: Why should this be done, and why now?
```

### SYSTEM_ARCHITECTURE_SAFETY_AND_GOVERNANCE_CHALLENGER

```text
STATUS: ACTIVE_ROLE_DEFINED
RUNTIME_HOME: /home/leo/Project/council/rules/systems-architecture-safety-governance
REPORTS_TO: STRATEGY_DECISION_ARCHITECT
PRIMARY_QUESTION: Is ownership, structure, safety, and risk treatment correct?
```

### DELIVERY_SCOPE_EVIDENCE_AND_OPERATIONS_CHALLENGER

```text
STATUS: ACTIVE_ROLE_DEFINED
RUNTIME_HOME: /home/leo/Project/council/rules/delivery-scope-evidence-operations
REPORTS_TO: STRATEGY_DECISION_ARCHITECT
PRIMARY_QUESTION: Can it be completed, verified, operated, and closed?
```

## Future Challengers

```text
LEGAL_REGULATORY_CHALLENGER:
STATUS: PLANNED_NOT_DESIGNED

SECURITY_THREAT_CHALLENGER:
STATUS: PLANNED_NOT_DESIGNED

UX_HUMAN_FACTORS_CHALLENGER:
STATUS: PLANNED_NOT_DESIGNED

DATA_QUALITY_GOVERNANCE_CHALLENGER:
STATUS: PLANNED_NOT_DESIGNED

AI_MODEL_BEHAVIOR_CHALLENGER:
STATUS: PLANNED_NOT_DESIGNED

ADVERSARIAL_ASSUMPTION_CHALLENGER:
STATUS: PLANNED_NOT_DESIGNED
```

Future roles have no authority, runtime readiness, tmux session, or current mission. Each
requires a separately reviewed canonical `ROLE.md` before activation.

## Composition rule

Every mission must state `COUNCIL_COMPOSITION` with exact selected active roles. Only
selected roles receive the subject. The intended future Foundation + Cosmile Commercial
Baseline Strategy Preflight composition is all three active roles; the current mission is
still `NONE` and this registry does not activate it.
