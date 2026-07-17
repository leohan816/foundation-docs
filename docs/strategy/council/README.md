# Strategy Challenge Council v0

```text
STATUS: PILOT_NON_CANONICAL
AUTHORITY: RECOMMENDATION_ONLY
REPORTS_TO: STRATEGY_DECISION_ARCHITECT
CURRENT_COUNCIL_MISSION: NONE
```

Strategy Challenge Council v0 is a local Strategy-side advisory mechanism that gives
the Strategy Decision Architect three independent challenges before a material strategic
recommendation is finalized.

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

| Role | Runtime home | Primary question |
|---|---|---|
| `PRODUCT_USER_AND_BUSINESS_VALUE_CHALLENGER` | `rules/product-user-business-value/` | Why should this be done, and why now? |
| `SYSTEM_ARCHITECTURE_SAFETY_AND_GOVERNANCE_CHALLENGER` | `rules/systems-architecture-safety-governance/` | Is ownership, structure, safety, and risk treatment correct? |
| `DELIVERY_SCOPE_EVIDENCE_AND_OPERATIONS_CHALLENGER` | `rules/delivery-scope-evidence-operations/` | Can it be completed, verified, operated, and closed? |

These roles are not three general-purpose reviewers. Overlap is recorded explicitly,
and each role stays within its own primary lens.

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

- active role definitions: 3
- future challenger definitions: planned only
- Council mission: none
- debate: none
- product repository access/modification: none in setup
- Git commit/push: none

Runtime state is recorded in `state/CURRENT_SESSIONS.md`. Future mission output is stored
only under the Strategist-authorized `runs/<MISSION_ID>/` directory. Council reports and
Strategist disposition records are written in English; Leo-facing conversation remains
in the language Leo requests.
