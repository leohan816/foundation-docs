# Memory V3 M2 — Founder D1–D3 Decision

```text
DECISION_ID: FOUNDER_MEMORY_V3_D1_D3_DECISION
PARENT_MISSION: MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1
RESPONSIBLE_ADVISOR: foundation-advisor
DECISION_OWNER: Leo/GPT
DECISION_STATUS: RECEIVED

D1_SELECTED: D1-A
D2_SELECTED: D2-A
D3_SELECTED: D3-A

M2_SCOPE: AUTHORIZED_WITH_GATES
A_IMPLEMENTATION: AUTHORIZED_AFTER_REVIEWED_DESIGN
B_LIMITED_IMPLEMENTATION: AUTHORIZED_AFTER_REVIEWED_DESIGN
C_CONTRACT_AND_IMPLEMENTATION_READY_DESIGN: AUTHORIZED
C_INDEPENDENT_DESIGN_REVIEW: AUTHORIZED
C_IMPLEMENTATION_AND_DELIVERY: NOT_AUTHORIZED
FULL_PACKAGE_1B: NOT_AUTHORIZED
```

## Founder constraints

1. `RecommendationEvent.sessionId` is a nullable Cosmile-local opaque reference.
   `recommendationId` is created when a recommendation is first actually shown
   and is propagated through view, click, save, dismiss, cart, and purchase
   evidence.
2. `CommerceEvent` remains the general operational and analytics ledger.
   `RecommendationEvent` is canonical for the recommendation lifecycle.
   Producer-time mapping and deterministic idempotency must prevent duplicate
   aggregation.
3. Cosmile owns a deterministic, versioned normalization from closed-choice
   inputs to the commerce evidence envelope.
4. Cosmile must not create `MemoryFactCandidate` or an adverse candidate.
5. Under a separately approved future C implementation, Foundation validates
   evidence schema, consent, provenance, identity, lineage, and policy
   eligibility and returns accept/reject.
6. Under a separately approved future C implementation, Foundation may create
   and own `MemoryFactCandidate` and adverse candidates from validated evidence.
7. Consent for storing feedback and consent for cross-service commerce-evidence
   use are separate purposes. Login or the presence of `userId` never implies
   consent.
8. Identity linking is OFF by default and requires both an explicit user action
   and versioned consent.
9. Corrections are append-only. Retractions use a retraction record and minimal
   tombstone. Silent overwrite and destructive re-key are forbidden.
10. Satisfaction and adverse are independent axes. Satisfaction cannot reduce
    adverse severity or safety handling.
11. Adverse response is limited to pre-approved static guidance. Diagnosis and
    generated medical advice are forbidden. External regulatory reporting is
    excluded.
12. Proposed retention periods are non-production design inputs only. The actual
    `adverse_regulatory_hold` period must not be implemented or activated until
    jurisdiction and legal role are confirmed.

## Accepted and rejected risk

```text
RISK_ACCEPTED:
- additive schema and policy complexity in local/non-prod/shadow only
- limited UX friction from purpose-specific consent
- extra data-model complexity from append-only correction/retraction

RISK_NOT_ACCEPTED:
- automatic identity linking
- raw-text feedback
- external semantic provider
- Cosmile candidate creation
- outbox consumer or network delivery
- Foundation intake activation
- automatic durable memory promotion
- ranking or safety mutation
- real target DB access or migration
- production or live activation
```

## Authorized staged order

```text
Founder D1-D3 decision
-> Control cross-project contract analysis
-> Designer A/B implementation-ready design
-> independent A/B design review
-> Cosmile Worker A/B implementation
-> independent A/B implementation review and bounded delta loops
-> Control C contract design where required
-> Designer C implementation-ready design
-> independent C design review
-> HARD STOP
-> Leo/GPT
```

The HARD STOP applies before every C implementation, delivery, Foundation
intake, candidate runtime connection, outbox consumer, or network path.
