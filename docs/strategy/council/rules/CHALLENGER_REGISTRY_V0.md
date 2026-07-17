# Challenger Registry v0

```text
STATUS: PILOT_NON_CANONICAL
AUTHORITY: RECOMMENDATION_ONLY
TOTAL_DEFINED_ROLES: 9
TOTAL_RUNTIME_SESSIONS: 9
CORE_ROLES: 3
SPECIALIST_ROLES: 6
CURRENT_COUNCIL_MISSION: NONE
UPCOMING_PREFLIGHT_COMPOSITION: CORE_3_ONLY
SPECIALISTS_FOR_UPCOMING_PREFLIGHT: NOT_SELECTED
```

## Core Challenger definitions

### PRODUCT_USER_AND_BUSINESS_VALUE_CHALLENGER

```text
STATUS: ACTIVE_ROLE_DEFINED
ROLE_CATEGORY: CORE
RUNTIME_HOME: /home/leo/Project/council/rules/product-user-business-value
SESSION: foundation-council-product-value
REPORTS_TO: STRATEGY_DECISION_ARCHITECT
PRIMARY_QUESTION: Why should this be done, and why now?
READINESS: READY
CURRENT_MISSION: NONE
```

### SYSTEM_ARCHITECTURE_SAFETY_AND_GOVERNANCE_CHALLENGER

```text
STATUS: ACTIVE_ROLE_DEFINED
ROLE_CATEGORY: CORE
RUNTIME_HOME: /home/leo/Project/council/rules/systems-architecture-safety-governance
SESSION: foundation-council-systems-risk
REPORTS_TO: STRATEGY_DECISION_ARCHITECT
PRIMARY_QUESTION: Is ownership, structure, safety, and risk treatment correct?
READINESS: READY
CURRENT_MISSION: NONE
```

### DELIVERY_SCOPE_EVIDENCE_AND_OPERATIONS_CHALLENGER

```text
STATUS: ACTIVE_ROLE_DEFINED
ROLE_CATEGORY: CORE
RUNTIME_HOME: /home/leo/Project/council/rules/delivery-scope-evidence-operations
SESSION: foundation-council-delivery-evidence
REPORTS_TO: STRATEGY_DECISION_ARCHITECT
PRIMARY_QUESTION: Can it be completed, verified, operated, and closed?
READINESS: READY
CURRENT_MISSION: NONE
```

## Specialist Challenger definitions

### LEGAL_REGULATORY_AND_POLICY_CHALLENGER

```text
STATUS: ACTIVE_ROLE_DEFINED
ROLE_CATEGORY: SPECIALIST
RUNTIME_HOME: /home/leo/Project/council/rules/legal-regulatory-policy
SESSION: foundation-council-legal-policy
REPORTS_TO: STRATEGY_DECISION_ARCHITECT
PRIMARY_QUESTION: Are applicable legal, regulatory, contractual, and platform-policy obligations resolved enough for this decision?
READINESS: READY_IDLE
CURRENT_MISSION: NONE
```

### SECURITY_THREAT_AND_ABUSE_CHALLENGER

```text
STATUS: ACTIVE_ROLE_DEFINED
ROLE_CATEGORY: SPECIALIST
RUNTIME_HOME: /home/leo/Project/council/rules/security-threat-abuse
SESSION: foundation-council-security-threat
REPORTS_TO: STRATEGY_DECISION_ARCHITECT
PRIMARY_QUESTION: How could this be exploited, bypassed, abused, or compromised, and is the proposed risk treatment adequate?
READINESS: READY_IDLE
CURRENT_MISSION: NONE
```

### UX_HUMAN_FACTORS_AND_ACCESSIBILITY_CHALLENGER

```text
STATUS: ACTIVE_ROLE_DEFINED
ROLE_CATEGORY: SPECIALIST
RUNTIME_HOME: /home/leo/Project/council/rules/ux-human-factors-accessibility
SESSION: foundation-council-ux-human
REPORTS_TO: STRATEGY_DECISION_ARCHITECT
PRIMARY_QUESTION: Can real users and operators understand, trust, use, and recover from this behavior under realistic conditions?
READINESS: READY_IDLE
CURRENT_MISSION: NONE
```

### DATA_QUALITY_LINEAGE_AND_GOVERNANCE_CHALLENGER

```text
STATUS: ACTIVE_ROLE_DEFINED
ROLE_CATEGORY: SPECIALIST
RUNTIME_HOME: /home/leo/Project/council/rules/data-quality-lineage-governance
SESSION: foundation-council-data-governance
REPORTS_TO: STRATEGY_DECISION_ARCHITECT
PRIMARY_QUESTION: Is the data accurate, traceable, sufficiently complete, governed, and fit for the proposed decision?
READINESS: READY_IDLE
CURRENT_MISSION: NONE
```

### AI_MODEL_BEHAVIOR_AND_EVALUATION_CHALLENGER

```text
STATUS: ACTIVE_ROLE_DEFINED
ROLE_CATEGORY: SPECIALIST
RUNTIME_HOME: /home/leo/Project/council/rules/ai-model-behavior-evaluation
SESSION: foundation-council-ai-behavior
REPORTS_TO: STRATEGY_DECISION_ARCHITECT
PRIMARY_QUESTION: Is the proposed AI behavior specified, testable, controllable, economical, and safe across realistic inputs?
READINESS: READY_IDLE
CURRENT_MISSION: NONE
```

### ADVERSARIAL_ASSUMPTION_AND_FAILURE_CHALLENGER

```text
STATUS: ACTIVE_ROLE_DEFINED
ROLE_CATEGORY: SPECIALIST
RUNTIME_HOME: /home/leo/Project/council/rules/adversarial-assumption-failure
SESSION: foundation-council-adversarial
REPORTS_TO: STRATEGY_DECISION_ARCHITECT
PRIMARY_QUESTION: What is the strongest credible case that this strategy or its expected outcome is wrong?
READINESS: READY_IDLE
CURRENT_MISSION: NONE
```

## Composition rule

Every mission must state `COUNCIL_COMPOSITION` with exact selected active roles. Only
selected roles receive the subject, another Challenger's findings, debate questions, and
report-writing authority. The Strategy Decision Architect selects the smallest sufficient
composition; all nine are not selected by default.

```text
UPCOMING_PREFLIGHT_COMPOSITION:
- PRODUCT_USER_AND_BUSINESS_VALUE_CHALLENGER
- SYSTEM_ARCHITECTURE_SAFETY_AND_GOVERNANCE_CHALLENGER
- DELIVERY_SCOPE_EVIDENCE_AND_OPERATIONS_CHALLENGER

SPECIALISTS_FOR_UPCOMING_PREFLIGHT: NOT_SELECTED
SPECIALIST_READINESS: READY_IDLE
CURRENT_SPECIALIST_MISSION: NONE
```

No Council mission is active, and this registry grants no mission authority.
