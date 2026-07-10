# V3 Big-Block Unknown Gate Protocol

Status: `ACTIVE_CANONICAL__MANDATORY_FOR_PACKAGES_2_3_4`

Date: 2026-07-10

Authority: Leo/GPT

This protocol prevents a large V3 package from entering design or implementation while material unknowns are being treated as facts. It is mandatory for Packages 2, 3, and 4 and may be applied to any earlier package when its risk requires it.

## Non-Negotiable Rules

1. Unknown resolution precedes design when the unknown can change product policy, authority, data meaning, safety, privacy, migration, or reversibility.
2. `EXPERIMENT_REQUIRED` is not a design decision and is not resolved by documentation.
3. `LEGAL_POLICY_HOLD` is never converted into a technical assumption.
4. `OPEN_BLOCKER` blocks every dependent handoff.
5. Actor disagreement is preserved with its evidence and conflict reason.
6. Advisor does not select product policy. Workers do not grant canonical authority. Fable5 does not author the final solution. Control is not invoked before the required Leo/GPT decisions.
7. Every mission uses `V3_MISSION_ENTRY_EXIT_CHECKLIST.md`.
8. A lower level cannot be selected to save time when an escalation trigger exists.

## LEVEL A - Full Unknown Discovery

### Required for

- identity or guest/login linkage;
- PII, privacy, retention, erasure, consent, or provider processing;
- safety, health, adverse reaction, sensitive populations, or human-review duty;
- DB schema, migration, backfill, destructive transformation, or irreversible writes;
- payment, order, refund, cancellation, or attribution that changes business truth;
- cross-repo contracts or canonical authority boundaries;
- memory, learning, ranking, promotion, or evidence contamination;
- production/live, protected branch, operational rollout, or customer-facing claims;
- any change whose historical data meaning cannot be restored by rollback.

### Required process

1. Advisor directly inventories current code, canonical documents, repository state, and unknown register entries.
2. Advisor freezes a common question/evidence register before actor answers when independent discovery is needed.
3. Relevant repo Workers independently assess their repo-local facts, feasibility, reversibility, and cost. They do not read another first-pass assessment.
4. Fable5 performs an adversarial discovery/design challenge with explicit coverage.
5. Advisor compares evidence without erasing disagreement or turning assumptions into facts.
6. Leo/GPT makes only the product, risk, or authority decisions that technical evidence cannot make.
7. Only after those decisions may Control be invoked for explicitly approved cross-project design, or a repo-local design/implementation mission be opened.
8. Independent design review precedes implementation. Independent implementation review precedes final closure.

### Exit condition

Level A passes only when all impacted unknowns have an evidence-backed state, every unresolved item has a safe default and blocked capability, founder/legal/experiment dependencies remain explicit, and the canonical register is updated.

## LEVEL B - Targeted Unknown Review

### Allowed for

Ordinary cross-module runtime, API, adapter, or event changes that are reversible and do not initially include a Level A trigger.

### Required process

1. Advisor inventories the affected code, contracts, unknown IDs, assumptions, rollback, and dirty state.
2. The relevant Worker performs a feasibility review or scoped design package without implementation when material assumptions remain.
3. Fable5 challenges assumptions, reversibility, contract compatibility, tests, and hidden expansion.
4. Leo/GPT is contacted only if a product, risk, accepted-risk, or authority decision remains.
5. The mission escalates to Level A immediately if any trigger below is found.

### Exit condition

Level B passes only when the change remains reversible, no Level A trigger is present, every assumption is bounded by tests or rollback, and canonical state is updated.

## LEVEL C - Lightweight Assumption Check

### Allowed only for

Low-risk, local, reversible, single-repo work with no runtime data-meaning change, no cross-repo authority effect, and no Level A trigger.

### Required process

1. Advisor records current facts, assumptions, rollback, tests, impacted unknown/decision IDs, and cost if wrong.
2. A full multi-actor discovery is not required unless a new high-risk unknown appears.
3. Required independent review follows the mission and role protocol; Level C does not waive an explicitly required reviewer.

### Exit condition

Level C passes only when scope stays local and reversible and no escalation trigger appears.

## Immediate Escalation to Level A

Any Level B or C mission stops and escalates to Level A when it discovers:

- PII, privacy, consent, retention, erasure, or identity ambiguity;
- schema change, data migration, backfill, re-key, or historical reinterpretation;
- safety/health/adverse effect or sensitive-population behavior;
- cross-repo contract, semantic authority, or ownership conflict;
- irreversible or customer-visible writes;
- legal/policy uncertainty;
- production/live/customer-facing exposure or protected-branch release;
- memory/learning/ranking/evidence contamination risk;
- payment/order/refund/cancel truth changes;
- missing provenance that could attach a result to the wrong user, product, order, or event;
- a reviewer finding that the selected level omitted a material unknown.

On escalation:

```text
UNKNOWN_GATE_ESCALATION
FROM_LEVEL:
TO_LEVEL: LEVEL_A
TRIGGER:
IMPACTED_UNKNOWN_IDS:
BLOCKED_CAPABILITY:
SAFE_DEFAULT:
RETURN_TO: Advisor
NEXT_DECISION_OWNER: Leo/GPT when product/risk/authority input is required
```

No Worker implementation continues while escalation is unresolved.

## Package Entry Requirements

Before Package 2, 3, or 4 design begins, Advisor must publish:

- completed V3 mission entry checklist;
- selected risk level and rationale;
- impacted unknown/decision/scenario set;
- frozen question register for Level A, when independent discovery is required;
- current safe defaults and blocked capabilities;
- actor routing and independence plan;
- explicit statement that no package design or implementation is authorized before the gate passes.

## Review and Verdict Contract

Fable5 review verdicts are:

- `PASS`
- `PASS_WITH_RISK`
- `NEEDS_PATCH`
- `FAIL`

`PASS_WITH_RISK` returns to Leo/GPT and never advances automatically. `NEEDS_PATCH` returns to Advisor for in-scope correction and same-session re-review. `FAIL` stops. A review must identify exact artifacts, versions, coverage, exclusions, conflicts, unresolved risks, and rationale.

## Relationship to Package 1A

Package 1A is the evidence-backed example of Level A discovery. Its decisions and gates are inputs, not permission to skip discovery for Packages 2, 3, or 4. Similar package names or historical designs do not waive this protocol.

## Explicit Non-Authorization

This protocol does not start Package 1B, Package 2, Package 3, or Package 4. It does not authorize Control, Worker implementation, DB access, schema/API changes, feature activation, main merge, or production/live work.
