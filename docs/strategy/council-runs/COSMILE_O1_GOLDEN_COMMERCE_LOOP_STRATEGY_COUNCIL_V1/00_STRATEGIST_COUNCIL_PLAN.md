# Strategist Council Plan

```text
COUNCIL_MISSION_ID: COSMILE_O1_GOLDEN_COMMERCE_LOOP_STRATEGY_COUNCIL_V1
DOCUMENT_TYPE: STRATEGIST_COUNCIL_PLAN
STATUS: FROZEN_BEFORE_ROUND_1
DATE_UTC: 2026-07-17
AUTHORITY: RECOMMENDATION_ONLY
REPORT_LANGUAGE: ENGLISH
COUNCIL_DECISION: REQUIRED
COUNCIL_ROUNDS_MAXIMUM: 3
ADVISOR_DISPATCHED: NO
IMPLEMENTATION_AUTHORIZED: NO
```

## 1. Exact decision question

Is the pinned Cosmile O1 Golden Commerce Loop development direction the smallest safe,
commercially useful, evidence-producing implementation direction toward a controlled
real transaction and invite-only Paid Beta?

If it is directionally correct, what exact corrections, Founder decisions, factual
resolutions, provider/counsel confirmations, evidence gates, exclusions, and stop
conditions must be frozen before the Strategy Decision Architect may propose an Advisor
planning mission to Leo?

## 2. Trigger decision

```text
COUNCIL_DECISION: REQUIRED
HARD_TRIGGERS:
- explicit Leo request
- material Paid Beta scope and release-gate decision
- payment, PII, DB, security, refund, production, and external-provider risk
SOFT_TRIGGERS:
- impact across multiple actors and Foundation/Cosmile data boundaries
- expected implementation materially above three working days
- possible material delay to Paid Beta
- recommendation depends on material unverified business and external assumptions
RATIONALE: The direction is a high-consequence commerce strategy, not a routine factual check.
```

## 3. Pinned subject

```text
REPOSITORY: leohan816/foundation-docs
BRANCH: strategy/foundation-cosmile-commercial-baseline-preflight-20260717
SUBJECT_COMMIT: e88831c7793a79b6144c531b90e244401908ec1c
ENGLISH_SUBJECT_PATH: docs/strategy/20260717_COSMILE_O1_GOLDEN_COMMERCE_LOOP_DEVELOPMENT_DIRECTION_EN.md
ENGLISH_SUBJECT_BLOB: 9d8cef7b747b32494fac9654f5f2917bf093c788
ENGLISH_SUBJECT_SHA256: 2a4be8c9a2a9c66bd5694e84d94fff64e4546eded7ae0049746f02f36abb9fcb
KOREAN_SUBJECT_PATH: docs/strategy/20260717_COSMILE_O1_GOLDEN_COMMERCE_LOOP_DEVELOPMENT_DIRECTION_KO.md
KOREAN_SUBJECT_BLOB: c32107f26551d17d08f4732660732e741b743648
KOREAN_SUBJECT_SHA256: b7626449ae3a547863796eaeacc43a9312aebd01255c08d64154b6145b020c7c
DRAFT_PR: 2
SUBJECT_STATUS: NON_EXECUTABLE_DRAFT_FOR_LEO_GPT_REVIEW
```

The Council reviews the exact pinned English subject. The Korean document is a
translation pin and must not be treated as a separate proposal.

## 4. Common reviewed baseline

The Council may use these exact reviewed commercial-baseline artifacts as common
evidence, all from the Advisor branch at final pointer commit
`9ee9abaee83bd06ebc1d27373d8150ff328308b1`:

- `P2_CAPABILITY_EVIDENCE_MATRIX.md`
- `P3_RELEASE_GATE_AND_BLOCKER_MATRIX.md`
- `P4_DELIVERY_AND_DECISION_PACKAGE.md`
- `P5_INDEPENDENT_REVIEW_AND_ADVISOR_CLOSURE.md`
- `99_FINAL_POINTER.md`

Local evidence root:

`/home/leo/Project/.worktrees/foundation-docs/FOUNDATION_COSMILE_COMMERCIAL_CRITICAL_PATH_BASELINE_V1/runs/shared/FOUNDATION_COSMILE_COMMERCIAL_CRITICAL_PATH_BASELINE_V1/`

The audit was E2/static and decision-ready within its bounded scope. It did not prove
build, runtime, provider, staging, security-audit, Legal, or production readiness.

## 5. Facts, assumptions, and unknowns

The separately frozen source of truth for Round 1 is:

`01_FACTS_ASSUMPTIONS_UNKNOWNS_REGISTER.md`

```text
FROZEN_REGISTER_SHA256: dcc4889489056da0e62639c3ce42df5db671a133085f5c877e526e775877054d
```

No Challenger may silently convert an unknown into a fact or assumption. Factual
unknowns may not use `RESOLVED_BY_COUNCIL_ANALYSIS`. That disposition is limited to
strategy, scope, architecture, prioritization, and risk reasoning.

If a Challenger discovers a material unknown absent from the frozen register, it must
propose a new entry with every required field. The frozen register remains immutable.
The Strategist records post-freeze additions separately in the findings matrix with IDs
`U-N01...` and preserves their discovery provenance.

## 6. Selected composition

```text
COUNCIL_COMPOSITION:
- PRODUCT_USER_AND_BUSINESS_VALUE_CHALLENGER | CORE
- SYSTEM_ARCHITECTURE_SAFETY_AND_GOVERNANCE_CHALLENGER | CORE
- DELIVERY_SCOPE_EVIDENCE_AND_OPERATIONS_CHALLENGER | CORE
- LEGAL_REGULATORY_AND_POLICY_CHALLENGER | SPECIALIST
- SECURITY_THREAT_AND_ABUSE_CHALLENGER | SPECIALIST
- UX_HUMAN_FACTORS_AND_ACCESSIBILITY_CHALLENGER | SPECIALIST
- DATA_QUALITY_LINEAGE_AND_GOVERNANCE_CHALLENGER | SPECIALIST
- ADVERSARIAL_ASSUMPTION_AND_FAILURE_CHALLENGER | SPECIALIST
```

Selection rationale:

- Product tests commercial necessity and the minimum credible customer/operator outcome.
- Systems tests ownership, contracts, state invariants, safety, continuity, and reversibility.
- Delivery tests bounded completion, evidence, parallelism, operations, and closure.
- Legal tests jurisdiction, consumer, privacy, payment, policy, and counsel gates.
- Security tests authentication, PII, money, webhook, fraud, privilege, and recovery exposure.
- UX tests checkout, failure, delay, cancellation/refund, operator comprehension, and accessibility.
- Data tests SKU, price, stock, order/payment event authority, lineage, and Foundation binding.
- Adversarial tests hidden assumptions, failure chains, alternatives, and falsifiability.

## 7. Unselected role

```text
UNSELECTED_ROLE: AI_MODEL_BEHAVIOR_AND_EVALUATION_CHALLENGER
SELECTION_STATUS: NOT_SELECTED
CURRENT_MISSION: NONE
REASON: Foundation AI, Memory V3, retrieval, recommendation UI, and AI-controlled transaction behavior are explicitly excluded from the pinned Cosmile O1 direction.
```

The unselected AI session must remain `READY_IDLE` and receive no subject, mission
brief, report, matrix, or debate packet.

## 8. Allowed investigation depth

Allowed:

- read the pinned English subject;
- read the frozen facts/assumptions/unknowns register;
- read the common mission brief and the assigned role-specific questions;
- read the exact baseline artifacts listed in Section 4;
- use Council shared rules and the assigned local role files;
- analyze strategy, scope, architecture, priorities, risks, evidence gates, and unknown routing.

Prohibited:

- product repository inspection or a repeat commercial audit;
- build, lint, test, smoke, runtime, DB, endpoint, provider, or production execution;
- web/vendor/Legal research during this Council mission;
- access to secrets, PII, customer data, payment accounts, or shared infrastructure;
- patching the subject or any repository;
- implementation planning at file/task level;
- choosing providers, accepting risk, approving compliance, or making Founder decisions;
- Advisor, Control, Designer, Worker, Reviewer, or unselected Challenger dispatch.

The Council challenges the strategic direction. Later authoritative-source research,
vendor confirmation, counsel, and implementation validation remain distinct resolution
methods.

## 9. Round 1 — blind independent review

Each selected Challenger receives the same common baseline plus only its assigned
role-specific questions. Before analysis, it re-ACKs:

- exact mission ID and subject commit/blob/SHA256;
- exact role, category, session, CWD, model, and effort;
- the frozen register path and SHA256;
- no visibility into another Challenger's current mission output.

Each writes exactly one English report to its assigned path. No Challenger sees another
initial report. The Strategist supplies no intermediate defense or correction. All eight
reports must be complete and frozen before Round 2.

## 10. Round 2 — material cross-review

The Strategist creates a complete findings matrix that preserves every material and
minority position. The matrix classifies issues as:

```text
CONSENSUS
COMPATIBLE_DIFFERENCE
MATERIAL_DISAGREEMENT
FOUNDER_DECISION_REQUIRED
FACTUAL_RESOLUTION_REQUIRED
OUT_OF_SCOPE
```

All eight selected Challengers receive the same frozen initial reports, complete matrix,
and cross-review packet. Original reports remain immutable. Each role responds only
through its own lens and identifies agreements, disagreements, position changes, and
remaining material issues.

## 11. Round 3 — focused rebuttal

Round 3 occurs only when material disagreement remains after Round 2. The Strategist
creates one identical focused packet containing exact propositions, evidence, decision
impact, and resolution question. Each selected role may respond once only to
decision-relevant disagreements within its lens.

No fourth Challenger round is permitted without new explicit Leo authorization. The
Council must not seek artificial consensus.

## 12. Deliberation termination

The Council cycle ends when:

1. all selected roles have stable final positions;
2. no new material evidence or reasoning emerged in the final allowed round;
3. every issue is classified;
4. every unknown is routed through the approved disposition taxonomy;
5. Founder decisions are separated from evidence, provider/counsel questions, and implementation validation;
6. minority positions remain visible.

## 13. Unknown final-disposition taxonomy

```text
RESOLVED_BY_COUNCIL_ANALYSIS
RESOLVED_BY_REPOSITORY_EVIDENCE
RESOLVED_BY_AUTHORITATIVE_SOURCE
LEO_DECISION_REQUIRED
VENDOR_CONFIRMATION_REQUIRED
LEGAL_OR_ACCOUNTING_COUNSEL_REQUIRED
IMPLEMENTATION_VALIDATION_REQUIRED
OUT_OF_SCOPE
```

`RESOLVED_BY_COUNCIL_ANALYSIS` applies only to strategy, scope, architecture,
prioritization, and risk reasoning. It may not close a factual unknown.

## 14. Strategist synthesis

The Strategy Decision Architect, not a majority vote, produces the final synthesis.
Every material finding is recorded as:

```text
ACCEPTED
REJECTED_WITH_REASON
UNRESOLVED
FOUNDER_DECISION_REQUIRED
OUT_OF_SCOPE
```

The Strategist will:

- preserve original reports and minority views;
- apply only necessary traceable corrections to the bilingual subject documents;
- separate current facts, Council analysis, recommendations, and Founder choices;
- create one consolidated Founder Decision Package in English and Korean;
- publish the complete run snapshot and corrected documents to the existing Strategy branch and Draft PR #2;
- return the package to Leo and stop.

## 15. Planned output paths

Local Council outputs remain under this mission directory. Round 1 uses files
`10_...` through `17_...`; Round 2 uses `20_...` through `29_...`; conditional Round 3
uses `30_...` through `39_...`; final Strategist records use `40_...` through
`45_...`.

GitHub snapshot destination:

`docs/strategy/council-runs/COSMILE_O1_GOLDEN_COMMERCE_LOOP_STRATEGY_COUNCIL_V1/`

Existing publication target only:

```text
BRANCH: strategy/foundation-cosmile-commercial-baseline-preflight-20260717
DRAFT_PR: 2
CREATE_NEW_BRANCH: NO
CREATE_NEW_PR: NO
MERGE: NO
```

## 16. Stop and escalation conditions

Stop early only when:

- the subject or frozen register cannot be pinned exactly;
- a selected role/session/model/CWD binding conflicts materially with the mission;
- another Challenger's output is exposed during the blind round;
- completing the review requires product repository access, execution, or prohibited depth;
- material scope expansion or a new high-risk decision is required to answer the decision question;
- evidence conflict makes a meaningful bounded conclusion impossible.

Routine unknowns, individual findings, and ordinary Challenger disagreement do not
interrupt Leo. They are consolidated in the final package.

```text
PLAN_GATE: PASS
PRODUCT_MODIFICATION_AUTHORIZED: NO
ADVISOR_DISPATCH_AUTHORIZED: NO
IMPLEMENTATION_AUTHORIZED: NO
```
