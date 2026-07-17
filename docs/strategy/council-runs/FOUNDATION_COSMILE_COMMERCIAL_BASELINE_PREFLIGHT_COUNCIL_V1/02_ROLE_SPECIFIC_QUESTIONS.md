# Role-Specific Questions

```text
MISSION_ID: FOUNDATION_COSMILE_COMMERCIAL_BASELINE_PREFLIGHT_COUNCIL_V1
DOCUMENT: 02_ROLE_SPECIFIC_QUESTIONS
CONTROL: STRATEGIST_COORDINATION_ONLY_DURING_BLIND_INITIAL
REPORT_LANGUAGE: ENGLISH
```

The Strategy Decision Architect records all three question sets here to prove role
differentiation. During Phase 1, the entire file is not supplied to any Challenger. Each
selected session receives only the common brief and its exact assigned section below.

## PRODUCT_USER_AND_BUSINESS_VALUE_CHALLENGER

```text
SESSION: foundation-council-product-value
ROLE_CATEGORY: CORE
INITIAL_REPORT_PATH: /home/leo/Project/council/runs/FOUNDATION_COSMILE_COMMERCIAL_BASELINE_PREFLIGHT_COUNCIL_V1/03_PRODUCT_VALUE_INITIAL.md
PRIMARY_QUESTION: Why should this be done, and why now?
```

1. Does this audit accelerate real customer use and commercial progress, or merely defer
   implementation behind another documentation exercise?
2. Is it the smallest sufficient path to a credible Paid Beta decision?
3. Is Foundation platform work being mistaken for product progress anywhere in the
   Preflight, audit method, or required outputs?
4. Are nonessential technical concerns likely to be promoted into Paid Beta release
   blockers? Identify the exact control needed to prevent that.
5. Which Founder decisions are genuinely needed before investigation, and which should be
   informed by the audit rather than required as admission inputs?
6. Is there a materially simpler alternative to the three-working-day audit? Steelman it
   and explain why it is better or insufficient.
7. Does the proposed separation of Paid Beta and Public Launch produce actionable product
   choices, or does it remain too abstract?
8. What minimum Day 3 package would let Leo confidently choose the next implementation
   priority without demanding premature product completeness?
9. What is the strongest business reason to return `HOLD` or `NOT_NEEDED`?
10. What exact commercial evidence would change your verdict?

Stay within product, user, operator, portfolio-priority, and business-value consequences.
Name architecture or delivery overlap without taking ownership of those lenses.

## SYSTEM_ARCHITECTURE_SAFETY_AND_GOVERNANCE_CHALLENGER

```text
SESSION: foundation-council-systems-risk
ROLE_CATEGORY: CORE
INITIAL_REPORT_PATH: /home/leo/Project/council/runs/FOUNDATION_COSMILE_COMMERCIAL_BASELINE_PREFLIGHT_COUNCIL_V1/04_SYSTEMS_RISK_INITIAL.md
PRIMARY_QUESTION: Is ownership, structure, safety, and risk treatment correct?
```

1. Are Foundation, Cosmile, and SIASIU ownership boundaries correctly framed for the
   proposed audit?
2. Does the audit preserve the requirement that ordinary commerce can continue when
   Foundation is unavailable, while AI suitability or consultation fails closed or is
   hidden?
3. Does the proposal expose or conceal payment, PII, DB, consent, authorization, retention,
   deletion, canonical-ownership, or external-risk decisions?
4. Is source existence correctly separated from static connection, local execution,
   integrated runtime, and external readiness?
5. Are Strategy, Advisor, Control, Worker, Independent Reviewer, and Leo authority
   boundaries safe and current?
6. Could any audit output, READY rule, branch-baseline recommendation, or safety envelope
   accidentally authorize architecture or risk decisions?
7. Is SIASIU boundary-only treatment safe and sufficient, or could it miss a material
   mandatory dependency?
8. Are degraded behavior, reversibility, rollback, and ordinary-commerce continuity framed
   as evidence questions rather than hidden implementation design?
9. Which high-risk questions require named Specialist, external owner, or Leo treatment,
   and at what point, without selecting a Specialist for this Council mission?
10. What exact governance or safety defect would justify `HOLD`?

Stay within ownership, contracts, safety, governance, authority, and reversibility. Do not
claim a security, privacy, compliance, legal, code, or independent audit.

## DELIVERY_SCOPE_EVIDENCE_AND_OPERATIONS_CHALLENGER

```text
SESSION: foundation-council-delivery-evidence
ROLE_CATEGORY: CORE
INITIAL_REPORT_PATH: /home/leo/Project/council/runs/FOUNDATION_COSMILE_COMMERCIAL_BASELINE_PREFLIGHT_COUNCIL_V1/05_DELIVERY_EVIDENCE_INITIAL.md
PRIMARY_QUESTION: Can it be completed, verified, operated, and closed?
```

1. Can the stated Day 1, Day 2, Day 3 work and all required final outputs actually be
   completed in three working days by the proposed roles?
2. Are the deliverables too numerous, duplicated, or insufficiently bounded? Identify the
   minimum closure package and any consolidation required.
3. Are evidence levels E0-E5, status enums, and READY rules operationally usable and
   proportional to a baseline audit?
4. Are admission, success, stop, timebox-expiry, and closure conditions measurable?
5. Can `UNVERIFIED` items close with owner and decision impact without automatically
   extending the audit?
6. Is the proposed investigation proportional to the implementation-priority decision it
   must support?
7. Could documentation, review, approval, evidence indexing, and handoff overhead become
   larger than the investigative work?
8. Does the audit distinguish engineering workdays from external elapsed-calendar
   dependencies and confidence well enough for planning?
9. What exact runtime evidence, if any, is necessary during this audit, and what can safely
   remain static-only or `UNVERIFIED`?
10. What is the strongest delivery reason to return `HOLD`, and what evidence would resolve
    it without extending the audit?

Stay within completion, evidence, timebox, operations, and closure. Do not redefine product
priority or architecture, execute the proposed audit, or claim independent review.

## Delivery control

Each section must be copied exactly into the corresponding session admission prompt. Do
not send the full file. Do not dispatch sequentially based on early findings. Wait for all
three admission ACKs, then send `PHASE_1_BLIND_REVIEW_GO` to all three without exposing any
other role's output.
