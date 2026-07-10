# V3 Package 1A Founder Decision Record

Date: 2026-07-10

Authority: `Leo/GPT`

Mission: `V3_PACKAGE1A_INDEPENDENT_UNKNOWN_RESOLUTION_AND_FOUNDER_DECISION_PACKAGE`

Mission audit decision: `MISSION_COMPLETE_ACCEPTED`

Decision state: `FOUNDER_DECISIONS_RECORDED`

Package 1B authorization: `NO`

## D1 - Initial Feedback Product Scope

Decision: `D1-B STRUCTURED_PURCHASED_ITEM`

Approved boundary:

- explicit purchased line-item selection;
- structured answers only;
- no free text;
- no consultation-derived outcome evidence;
- no inferred OrderItem provenance;
- timing, eligibility, refund/cancel, and sensitive-population rules remain future design/legal gates.

## D2 - Identity And Provenance Default

Decision: `D2-A NO_LINK_EXPLICIT_ITEM`

Approved boundary:

- no guest-to-login feedback or memory stitching;
- no destructive re-keying;
- existing cart/wishlist merge is not feedback consent or identity evidence;
- D2-B remains a future separately approved threat-reviewed option only.

## D3 - Raw Text, External Provider, And Deletion Promise

Decision: `D3-A STRUCTURED_ONLY_NO_PROVIDER`

Approved boundary:

- no feedback free text in the initial scope;
- no Foundation or external-provider processing of feedback;
- D3-B remains a future gated option;
- D3-C is rejected;
- user-linkable raw and derived feedback must be correctable, erasable, and reusable only under approved policy;
- exact periods and legal/processor obligations remain unresolved.

## D4 - Primary Value Hypothesis And Automation Boundary

Decision: `POST_PURCHASE_SATISFACTION_SERVICE_UX`

Approved pilot question:

> Can users understand and submit low-friction structured purchased-item feedback, and does it measurably improve the post-purchase service experience?

Approved automation boundary:

- observation only;
- no automatic ranking change;
- no automatic durable-memory promotion;
- no canonical-evidence upgrade;
- no automatic safety downgrade;
- no recommendation-uplift claim;
- no unstaffed human-review promise;
- pilot blocked until metric owner, denominator, horizon, stop rule, abuse controls, retention gates, representative auth, and kill switch exist.

## D5-i - Contract Governance

Decision: `D5-i-A JOINT_GOVERNANCE`

Approved authority split:

- Cosmile owns raw commerce evidence, provenance, and producer mapping;
- Foundation owns semantic authority and canonical acceptance constraints;
- shared contract changes require both-side review and Leo/GPT approval;
- joint governance does not transfer raw commerce ownership to Foundation.

## D5-ii - Outbox Containment

Decision: `D5-ii-A CONTAINMENT_GATE_REQUIRED`

Approved boundary:

- no flush;
- do not rely on absence of a consumer;
- current enqueue/consent/identifier shape is not an approved signal contract;
- `OUTBOX_CONSENT_IDENTIFIER_CONTAINMENT_GATE` is required before Package 1B may rely on Foundation signals;
- no DB inspection, cleanup, runtime patch, or flush worker is approved by this decision.

## Founder Acceptance Sheet

Overall decision: `ACCEPTED_WITH_MODIFICATIONS`

| Scenario | Decision |
|---|---|
| 1 Mixed positive and adverse feedback | Accepted with initial structured-only separate positive/adverse axes; no initial free-text semantic path |
| 2 Deletion request | Accepted as written |
| 3 Guest purchase followed by shared-device login | Accepted as written |
| 4 Foundation semantic API failure | Accepted as future-gated; semantic API outside initial scope |
| 5 Raw text in log/trace/queue | Accepted as future-gated; raw text outside initial scope |
| 6 Semantic result later proven wrong | Accepted as future-gated; corrections require versioned supersession |
| 7 No measurable KPI improvement | Accepted with KPI changed to the frozen primary pilot KPI: post-purchase satisfaction/service UX |
| 8 Fake/incentivized/replayed/competitor feedback | Accepted as written |

## Unresolved Gates Preserved

These decisions do not resolve or waive:

- timing and eligibility rules;
- refund/cancel behavior;
- sensitive-population legal/safety policy;
- retention periods, erasure propagation, processor/provider obligations, and backup/log behavior;
- real-auth identity evidence and future threat-reviewed D2-B;
- external-provider or free-text processing under D3-B;
- classifier calibration, semantic versioning, and correction authorization;
- human-review ownership and safety duty;
- pilot metric owner, denominator, horizon, stop rule, abuse controls, representative auth, and kill switch;
- outbox consent/identifier/contract/lifecycle containment;
- existing consultation external-egress review;
- historical V3 document status/supersession treatment;
- M4 governance-overlay hold.

## Explicit Non-Authorization

This record does not authorize:

- Control invocation;
- Package 1B design or implementation;
- Worker handoff;
- runtime/schema/API changes;
- DB inspection/query/write/cleanup;
- outbox flush or consumer;
- feature flag changes;
- secrets, main, production, or live access.

Next state: `PACKAGE1A_FOUNDER_DECISIONS_RECORDED__PACKAGE1B_AWAITING_SEPARATE_LEO_GPT_MISSION`.
