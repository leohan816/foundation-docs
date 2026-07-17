# Strategy Challenge Council v0

```text
STATUS: PILOT_NON_CANONICAL
AUTHORITY: RECOMMENDATION_ONLY
REPORTS_TO: STRATEGY_DECISION_ARCHITECT
CURRENT_COUNCIL_MISSION: NONE
```

Strategy Challenge Council v0 is a local Strategy-side advisory mechanism with three Core
and six Specialist Challenger roles. The Strategy Decision Architect selects the smallest
sufficient independent composition before a material strategic recommendation is
finalized.

The Council is not a decision-making body, a Foundation Team execution unit, or a code
review function. It does not replace Leo's product and risk decisions, the Strategist's
final synthesis, the Foundation Advisor's execution orchestration, Control, Worker,
Reviewer, or independent design and implementation review.

## Instruction architecture

Council instructions are separated into three layers.

1. **Root shared rules** — shared authority, routing, evidence, communication, and safety
2. **Role-specific rules** — each role directory's canonical `ROLE.md` and runtime adapter
3. **Mission-specific brief** — the exact subject, evidence, timebox, and output for one
   later authorized run

`ROLE.md` is the single model-independent canonical role definition. Local `AGENTS.md`
and `CLAUDE.md` files provide runtime-specific read order and hard guardrails without
duplicating the canonical contract.

## Active Challenger roles

| Category | Role | Runtime home |
|---|---|---|
| Core | `PRODUCT_USER_AND_BUSINESS_VALUE_CHALLENGER` | `rules/product-user-business-value/` |
| Core | `SYSTEM_ARCHITECTURE_SAFETY_AND_GOVERNANCE_CHALLENGER` | `rules/systems-architecture-safety-governance/` |
| Core | `DELIVERY_SCOPE_EVIDENCE_AND_OPERATIONS_CHALLENGER` | `rules/delivery-scope-evidence-operations/` |
| Specialist | `LEGAL_REGULATORY_AND_POLICY_CHALLENGER` | `rules/legal-regulatory-policy/` |
| Specialist | `SECURITY_THREAT_AND_ABUSE_CHALLENGER` | `rules/security-threat-abuse/` |
| Specialist | `UX_HUMAN_FACTORS_AND_ACCESSIBILITY_CHALLENGER` | `rules/ux-human-factors-accessibility/` |
| Specialist | `DATA_QUALITY_LINEAGE_AND_GOVERNANCE_CHALLENGER` | `rules/data-quality-lineage-governance/` |
| Specialist | `AI_MODEL_BEHAVIOR_AND_EVALUATION_CHALLENGER` | `rules/ai-model-behavior-evaluation/` |
| Specialist | `ADVERSARIAL_ASSUMPTION_AND_FAILURE_CHALLENGER` | `rules/adversarial-assumption-failure/` |

Core roles identify broad concerns. Specialists perform deeper professional challenge only
when selected. The nine roles are not general-purpose duplicate reviewers; every role
stays inside its exact lens and records overlap explicitly.

## Routing

```text
Leo
→ Strategy Decision Architect
→ exact selected Council Challengers
→ Strategy Decision Architect
→ Leo
```

Challengers do not instruct, dispatch, or report directly to one another or to Advisor,
Control, Designer, Worker, or Reviewer. Council closure does not automatically dispatch
the Advisor or start another mission.

## Current state

- active role definitions: 9
- Core roles: 3
- Specialist roles: 6, persistent and `READY_IDLE` when unselected
- upcoming Commercial Baseline Preflight composition: Core 3 only
- Specialists selected for that upcoming preflight: no
- Council mission: none
- debate: none
- product repository access/modification: none in setup
- automatic selection of all nine roles: prohibited

Runtime state is recorded in `state/CURRENT_SESSIONS.md`. Future mission output is stored
only under the Strategist-authorized `runs/<MISSION_ID>/` directory. Council reports and
Strategist disposition records are written in English; Leo-facing conversation remains
in the language Leo requests.
