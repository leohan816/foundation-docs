# Facts, Assumptions, and Unknowns Register

```text
COUNCIL_MISSION_ID: COSMILE_O1_GOLDEN_COMMERCE_LOOP_STRATEGY_COUNCIL_V1
DOCUMENT_TYPE: FACTS_ASSUMPTIONS_UNKNOWNS_REGISTER
STATUS: FROZEN_BEFORE_ROUND_1
FREEZE_TIME_UTC: 2026-07-17T14:47:30Z
MUTABLE_AFTER_ROUND_1_START: NO
FACTUAL_UNKNOWNS_RESOLVABLE_BY_COUNCIL_REASONING: NO
```

## Register rules

- Facts require exact current evidence pins.
- Assumptions remain assumptions until an approved resolution method supplies evidence.
- Unknowns may not be silently converted into facts or assumptions.
- `RESOLVED_BY_COUNCIL_ANALYSIS` is limited to strategy, scope, architecture,
  prioritization, and risk reasoning. It may not close a factual unknown.
- Newly discovered unknowns do not modify this frozen file. They are recorded separately
  by the Strategist as `U-N01...` with full provenance and required fields.

## Verified facts

### F-001 — Working direction and authority

Leo adopted O1 as the current working commercial direction: Foundation AI and Memory V3
are excluded from the Paid Beta critical path while Cosmile real commerce is prioritized.
Leo explicitly withheld implementation and Advisor dispatch authority.

Evidence: current Leo instruction in the Strategy thread; pinned subject header at commit
`e88831c7793a79b6144c531b90e244401908ec1c`.

### F-002 — Reviewed baseline status

The Advisor commercial baseline completed with Advisor `PASS`, Independent Reviewer
`PASS`, zero blocking review findings, ten O1 Paid Beta blockers, and 21 total open Public
Launch blocker records.

Evidence: final pointer commit `9ee9abaee83bd06ebc1d27373d8150ff328308b1` and exact P3/P4/P5 artifacts.

### F-003 — Evidence ceiling

The baseline is E2/static decision evidence. It did not establish build, runtime, DB,
endpoint, PSP, provider, staging, production, security-audit, Legal, or operational
readiness.

Evidence: P5 Advisor closure and final pointer.

### F-004 — Current Cosmile critical-path gaps

The audited source shows mock/in-memory catalog and price data, mock customer identity,
simulated payment, and missing or incomplete inventory, fulfillment/tracking,
cancellation/refund reversal, monitoring, backup/recovery, and external readiness.

Evidence: P2 capability matrix and P3 blocker matrix.

### F-005 — Existing reusable source

Cosmile has meaningful UI, database cart/order, customer order-read, and admin source.
The direction proposes selective reuse, not a full rewrite.

Evidence: P2 capability matrix and the raw Cosmile audit incorporated by the reviewed
baseline.

### F-006 — Foundation isolation for O1

No verified Foundation capability blocks O1 while AI remains hidden or closed. Ordinary
commerce must continue when Foundation is unavailable.

Evidence: P3 blocker matrix and P4 recommendation.

### F-007 — Foundation/Cosmile data ownership direction

Foundation is the intended canonical owner of product identity/content, brand,
ingredient, claim, safety, and judgment. Cosmile owns sellable SKU, price, stock, cart,
order, payment, fulfillment, refund, customer, and admin behavior.

Evidence: reviewed baseline decision package and current Team operating direction. Exact
initial data availability and delivery remain unknown.

### F-008 — Current role boundary

Control is a subordinate architecture/contract actor, not a Worker. Historical code
placement grants no current implementation authority. Cosmile repository work belongs to
the Cosmile Worker under an Advisor-routed mission.

Evidence: current Agent Office operating model and reviewed baseline closure.

### F-009 — Memory and AI exclusion

Memory V3 remains paused at the reviewed pre-runtime boundary. Foundation AI runtime,
retrieval, recommendation UI, and Memory V3 resumption are excluded from the pinned
Cosmile direction.

Evidence: pinned subject and reviewed final pointer.

### F-010 — Schedule uncertainty

The audit estimated Paid Beta Ready at 40–70 cumulative engineering workdays and 6–12
elapsed weeks with `LOW` confidence. Track ranges overlap and external provider calendars
may dominate.

Evidence: P4 decision package.

## Explicit assumptions

### A-001 — Selective reuse is preferable to full rewrite

The direction assumes the audited UI/cart/order/admin source can be evolved safely. This
is a strategic starting assumption, not runtime validation.

### A-002 — A deliberately small initial SKU set is commercially acceptable

The direction assumes Leo can select a small production-candidate assortment sufficient
for a Golden Commerce Loop and cofounder/customer learning.

### A-003 — Provider-backed sandbox environments will be available

The direction assumes appropriate identity, PSP, and fulfillment/tracking test surfaces
exist for the selected country. This remains provider- and jurisdiction-dependent.

### A-004 — Logical frontend/backend parallelism can be made safe

The direction assumes the Advisor can establish shared contracts, write ownership,
worktrees, integration order, and collision controls that allow useful parallel work.

### A-005 — A non-synchronous Foundation data handoff is feasible

The direction assumes an approved versioned snapshot or explicit synchronization can
provide initial canonical product data without putting Foundation runtime in checkout.

### A-006 — Bounded operations can support the first controlled transaction

The direction assumes named operators and a bounded manual or provider-backed
fulfillment/refund/reconciliation process can be established before real money.

## Frozen unknowns

### U-001

```text
ID: U-001
QUESTION: What is the first selling country and transaction currency?
CLASSIFICATION: FOUNDER_MARKET_DECISION
SIGNIFICANCE: Determines PSP, payment methods, tax, consumer rules, identity, localization, fulfillment, and provider eligibility.
EVIDENCE: Not fixed in the pinned subject or reviewed baseline.
OWNER: Leo
RESOLUTION_METHOD: Founder selection informed by the later authoritative decision package.
REQUIRED_TIMING: Before country-specific provider comparison and Advisor implementation planning.
BLOCKING_EFFECT: Blocks final provider, Legal, tax, and operating recommendations; does not block Council review of the generic direction.
FINAL_DISPOSITION: LEO_DECISION_REQUIRED
```

### U-002

```text
ID: U-002
QUESTION: Which legal entity will act as seller/merchant of record, receive settlement, and bear tax and consumer obligations?
CLASSIFICATION: FOUNDER_OPERATING_MODEL_DECISION
SIGNIFICANCE: Determines contracting, KYC, settlement account, invoicing, tax, privacy, and liability path.
EVIDENCE: No authoritative entity/account record was supplied to this Council.
OWNER: Leo
RESOLUTION_METHOD: Founder decision after authoritative entity/account facts and counsel/accounting input are available.
REQUIRED_TIMING: Before PSP/KYC commitment and controlled live transaction.
BLOCKING_EFFECT: Blocks real-money activation and final provider onboarding; does not block sandbox strategy review.
FINAL_DISPOSITION: LEO_DECISION_REQUIRED
```

### U-003

```text
ID: U-003
QUESTION: What exact initial sellable SKU set and commercial offer will the Golden Commerce Loop use?
CLASSIFICATION: FOUNDER_PRODUCT_SCOPE_DECISION
SIGNIFICANCE: Determines catalog, price, stock, claim, fulfillment, refund, data, and demonstration scope.
EVIDENCE: Audit recommends a deliberately small curated set but names no approved SKU.
OWNER: Leo
RESOLUTION_METHOD: Founder selection informed by product availability, margin, safety, and operations evidence.
REQUIRED_TIMING: Before contract freeze and real read-path implementation.
BLOCKING_EFFECT: Blocks exact catalog/data/stock implementation scope.
FINAL_DISPOSITION: LEO_DECISION_REQUIRED
```

### U-004

```text
ID: U-004
QUESTION: What authoritative supplier, stock, cost, lead-time, and sellability evidence exists for each candidate SKU?
CLASSIFICATION: FACTUAL_PRODUCT_AND_SUPPLY_UNKNOWN
SIGNIFICANCE: A production-candidate SKU cannot be treated as real without authoritative supply and stock facts.
EVIDENCE: No supplier or inventory record was included in the E2 audit.
OWNER: Product/operations owner designated by Leo
RESOLUTION_METHOD: Verify exact supplier, inventory, and commercial source records.
REQUIRED_TIMING: Before final SKU approval and controlled live transaction.
BLOCKING_EFFECT: Blocks calling the SKU actually sellable and blocks real-money release.
FINAL_DISPOSITION: RESOLVED_BY_AUTHORITATIVE_SOURCE
```

### U-005

```text
ID: U-005
QUESTION: What customer authentication model, provider, guest/account policy, and account-recovery boundary will be used?
CLASSIFICATION: FOUNDER_PRODUCT_AND_RISK_DECISION
SIGNIFICANCE: Determines identity, PII, checkout continuity, order ownership, recovery, and support requirements.
EVIDENCE: Current customer identity is mock; no provider decision exists in the baseline.
OWNER: Leo with Security/privacy and Cosmile input
RESOLUTION_METHOD: Founder decision after authoritative provider comparison and risk requirements.
REQUIRED_TIMING: Before C1 implementation planning.
BLOCKING_EFFECT: Blocks real customer identity implementation and Paid Beta.
FINAL_DISPOSITION: LEO_DECISION_REQUIRED
```

### U-006

```text
ID: U-006
QUESTION: What current country-specific capabilities, pricing, data locations, terms, support, and sandbox constraints do candidate identity providers actually offer?
CLASSIFICATION: EXTERNAL_PROVIDER_FACTUAL_UNKNOWN
SIGNIFICANCE: Provider feasibility and privacy/operations risk cannot be inferred from generic architecture.
EVIDENCE: No current official provider evidence is admitted in this Council mission.
OWNER: Later Strategy decision-package research owner
RESOLUTION_METHOD: Compare dated official provider documentation and terms for the selected country.
REQUIRED_TIMING: Before Leo selects the identity provider.
BLOCKING_EFFECT: Blocks a defensible provider recommendation, not the generic Council verdict.
FINAL_DISPOSITION: RESOLVED_BY_AUTHORITATIVE_SOURCE
```

### U-007

```text
ID: U-007
QUESTION: Which PSP, payment methods, capture/void/refund model, and settlement/reconciliation policy will be used?
CLASSIFICATION: FOUNDER_PAYMENT_AND_RISK_DECISION
SIGNIFICANCE: Determines the core money state machine, webhook contract, recovery, refund, fees, and operations.
EVIDENCE: Current payment is simulated; no PSP decision exists.
OWNER: Leo with finance, Legal, operations, Security, and Cosmile input
RESOLUTION_METHOD: Founder decision after authoritative comparison and vendor/account feasibility.
REQUIRED_TIMING: Before payment contract and implementation planning.
BLOCKING_EFFECT: Blocks C3/C6 implementation and any real-money progression.
FINAL_DISPOSITION: LEO_DECISION_REQUIRED
```

### U-008

```text
ID: U-008
QUESTION: Is the selected PSP willing and able to onboard the chosen entity, country, product category, bank account, refund model, and expected volume, and on what KYC timeline?
CLASSIFICATION: EXTERNAL_VENDOR_FACTUAL_UNKNOWN
SIGNIFICANCE: Official product pages do not prove account approval, underwriting, category acceptance, or onboarding time.
EVIDENCE: No vendor/account confirmation exists in the audit.
OWNER: Leo-designated finance/vendor owner
RESOLUTION_METHOD: Direct vendor/account confirmation and documented onboarding outcome.
REQUIRED_TIMING: Before controlled live payment; preferably initiated before payment implementation critical path.
BLOCKING_EFFECT: Blocks real-money activation and may materially change elapsed schedule.
FINAL_DISPOSITION: VENDOR_CONFIRMATION_REQUIRED
```

### U-009

```text
ID: U-009
QUESTION: What is the inventory system of record, reservation authority, and named operating owner?
CLASSIFICATION: FOUNDER_OWNERSHIP_AND_OPERATIONS_DECISION
SIGNIFICANCE: Determines oversell protection, stock transitions, reconciliation, and correction authority.
EVIDENCE: Inventory reservation/deduction/restoration is absent and ownership is unresolved.
OWNER: Leo with product/operations and Cosmile input
RESOLUTION_METHOD: Founder ownership decision informed by actual supply/operations constraints.
REQUIRED_TIMING: Before inventory contract and implementation planning.
BLOCKING_EFFECT: Blocks C2/C4 design and Paid Beta.
FINAL_DISPOSITION: LEO_DECISION_REQUIRED
```

### U-010

```text
ID: U-010
QUESTION: Which fulfillment model, carrier/3PL/manual process, tracking system of record, and named operator will be used?
CLASSIFICATION: FOUNDER_OPERATIONS_DECISION
SIGNIFICANCE: Determines shipment lifecycle, customer promise, tracking, support, cancellation cutoff, and evidence.
EVIDENCE: No established shipment/tracking system of record was verified.
OWNER: Leo with operations input
RESOLUTION_METHOD: Founder selection after authoritative capability and operational feasibility evidence.
REQUIRED_TIMING: Before fulfillment implementation and controlled live order.
BLOCKING_EFFECT: Blocks C5 and Paid Beta shipment completion.
FINAL_DISPOSITION: LEO_DECISION_REQUIRED
```

### U-011

```text
ID: U-011
QUESTION: Can the chosen carrier, 3PL, or platform support the selected country, SKU category, pickup/returns, tracking, service levels, contracts, and sandbox/test needs?
CLASSIFICATION: EXTERNAL_VENDOR_FACTUAL_UNKNOWN
SIGNIFICANCE: Generic delivery architecture does not establish operational availability or contractual fit.
EVIDENCE: No carrier/3PL confirmation is in the audit.
OWNER: Leo-designated fulfillment/vendor owner
RESOLUTION_METHOD: Direct vendor confirmation and documented operational test/contract facts.
REQUIRED_TIMING: Before controlled live order and final Paid Beta schedule.
BLOCKING_EFFECT: Blocks real fulfillment and may change scope or elapsed duration.
FINAL_DISPOSITION: VENDOR_CONFIRMATION_REQUIRED
```

### U-012

```text
ID: U-012
QUESTION: Who owns cancellation approval, refund execution, payment/order/inventory reconciliation, customer support, incident response, and exception recovery?
CLASSIFICATION: FOUNDER_OPERATING_OWNERSHIP_DECISION
SIGNIFICANCE: Golden Reversal and real-money safety require named accountable operators rather than implicit manual work.
EVIDENCE: No named operators were verified.
OWNER: Leo
RESOLUTION_METHOD: Founder assignment of named roles, authority, coverage, and escalation path.
REQUIRED_TIMING: Before controlled live transaction.
BLOCKING_EFFECT: Blocks real-money and Paid Beta activation, not sandbox implementation.
FINAL_DISPOSITION: LEO_DECISION_REQUIRED
```

### U-013

```text
ID: U-013
QUESTION: What exact jurisdiction-specific ecommerce, consumer, privacy, tax/accounting, receipt/invoice, cancellation, return, refund, claims, and product obligations apply?
CLASSIFICATION: LEGAL_AND_ACCOUNTING_FACTUAL_INTERPRETATION_UNKNOWN
SIGNIFICANCE: The required disclosures, consent, retention, operations, and product policy depend on country, entity, customer, product, and transaction model.
EVIDENCE: Jurisdiction and entity are not fixed; this Council provides no binding legal or accounting advice.
OWNER: Leo-designated qualified Legal and accounting counsel
RESOLUTION_METHOD: Exact questions to qualified jurisdiction-specific counsel after U-001/U-002/U-003 are fixed.
REQUIRED_TIMING: Before policy approval and controlled live transaction; selected issues may affect implementation contract earlier.
BLOCKING_EFFECT: Blocks compliance claims and real-money release; does not block generic sandbox architecture review.
FINAL_DISPOSITION: LEGAL_OR_ACCOUNTING_COUNSEL_REQUIRED
```

### U-014

```text
ID: U-014
QUESTION: What Paid Beta cohort, maximum order/transaction exposure, exit criteria, stop conditions, and rollback authority will apply?
CLASSIFICATION: FOUNDER_RELEASE_SCOPE_AND_RISK_DECISION
SIGNIFICANCE: Bounds customer, money, support, inventory, and incident exposure and defines whether beta evidence is sufficient.
EVIDENCE: No threshold or cohort is fixed in the baseline.
OWNER: Leo
RESOLUTION_METHOD: Founder decision informed by the final Council package and later implementation evidence.
REQUIRED_TIMING: Before controlled live transaction for initial limits and before Paid Beta activation for final beta gate.
BLOCKING_EFFECT: Blocks controlled exposure and Paid Beta activation, not sandbox work.
FINAL_DISPOSITION: LEO_DECISION_REQUIRED
```

### U-015

```text
ID: U-015
QUESTION: What exact approved Foundation canonical product/brand/ingredient/claim/safety data exists for the initial SKUs, with what provenance, quality, version, and approval owner?
CLASSIFICATION: FACTUAL_CANONICAL_DATA_UNKNOWN
SIGNIFICANCE: The direction requires real product data without making Foundation runtime a checkout dependency.
EVIDENCE: The audit found external vault contracts but did not verify current data availability or quality.
OWNER: Leo-designated Foundation/product data owner
RESOLUTION_METHOD: Inspect and attest the authoritative canonical data source and approval record; repository source alone is insufficient if the data is external.
REQUIRED_TIMING: Before production-candidate SKU data is called canonical or exposed to controlled customers.
BLOCKING_EFFECT: Blocks canonical-data claims and initial snapshot approval; a clearly labeled non-canonical sandbox record may still support technical integration only if Leo approves that distinction.
FINAL_DISPOSITION: RESOLVED_BY_AUTHORITATIVE_SOURCE
```

### U-016

```text
ID: U-016
QUESTION: Do the approved implementation, build, migrations, tests, sandbox endpoints, database transitions, provider events, and end-to-end traces actually satisfy the Golden Order and Golden Reversal contracts?
CLASSIFICATION: IMPLEMENTATION_AND_RUNTIME_FACTUAL_UNKNOWN
SIGNIFICANCE: Static strategy and source cannot prove functioning integrated commerce.
EVIDENCE: No implementation mission or runtime validation has started.
OWNER: Future Advisor-routed implementation actors and Independent Reviewer
RESOLUTION_METHOD: Proportional build/test/runtime/sandbox evidence under a separately approved mission.
REQUIRED_TIMING: Before claiming the integration milestone complete or starting controlled live transactions.
BLOCKING_EFFECT: Blocks Golden Commerce completion and every live-readiness claim.
FINAL_DISPOSITION: IMPLEMENTATION_VALIDATION_REQUIRED
```

### U-017

```text
ID: U-017
QUESTION: Are authentication, authorization, PII handling, secrets, admin controls, webhook verification, fraud controls, monitoring, backup/restore, and recovery effective in the configured runtime?
CLASSIFICATION: SECURITY_AND_OPERATIONS_RUNTIME_FACTUAL_UNKNOWN
SIGNIFICANCE: Source intent does not prove deployed control effectiveness for users, money, and data.
EVIDENCE: Baseline was not a security audit and did not execute runtime controls.
OWNER: Future Advisor-routed Security/implementation owners and Independent Reviewer
RESOLUTION_METHOD: Scoped implementation validation and security review under separate authority.
REQUIRED_TIMING: Before real PII/money and again before Paid Beta activation.
BLOCKING_EFFECT: Blocks controlled live and Paid Beta risk gates.
FINAL_DISPOSITION: IMPLEMENTATION_VALIDATION_REQUIRED
```

### U-018

```text
ID: U-018
QUESTION: Can target customers and operators understand, complete, and recover from checkout, payment delay/failure, stock conflict, tracking, cancellation, refund, and exception states accessibly?
CLASSIFICATION: USER_AND_OPERATOR_BEHAVIOR_FACTUAL_UNKNOWN
SIGNIFICANCE: A technically connected flow may still fail customer trust, conversion, accessibility, or operator recovery.
EVIDENCE: No approved user research, accessibility test, or production-shaped usability evidence is in the baseline.
OWNER: Future Advisor-routed Designer/UX validation owner with Leo product input
RESOLUTION_METHOD: Approved prototype/usability/accessibility and implementation validation evidence.
REQUIRED_TIMING: Before controlled customer use and Paid Beta activation, proportionate to exposure.
BLOCKING_EFFECT: Blocks claims of usable/recoverable Paid Beta flow; does not block Council strategy analysis.
FINAL_DISPOSITION: IMPLEMENTATION_VALIDATION_REQUIRED
```

### U-019

```text
ID: U-019
QUESTION: Is the proposed Golden Order plus Golden Reversal vertical-slice strategy, including contract-first parallel tracks and staged exposure, the smallest safe strategic architecture?
CLASSIFICATION: STRATEGY_SCOPE_ARCHITECTURE_REASONING
SIGNIFICANCE: This is the Council's primary reasoning question and may materially change the direction before any mission.
EVIDENCE: Pinned subject, reviewed blocker matrix, and selected Challenger analysis.
OWNER: Strategy Decision Architect informed by Council
RESOLUTION_METHOD: Council analysis followed by explicit Strategist disposition.
REQUIRED_TIMING: In this Council mission before the Founder Decision Package.
BLOCKING_EFFECT: Blocks final Strategy recommendation but not factual provider research.
FINAL_DISPOSITION: RESOLVED_BY_COUNCIL_ANALYSIS
```

### U-020

```text
ID: U-020
QUESTION: Is selective reuse of current Cosmile source strategically preferable to a broader rewrite, and what evidence gate should reverse that presumption?
CLASSIFICATION: STRATEGY_SCOPE_AND_REVERSIBILITY_REASONING
SIGNIFICANCE: An incorrect reuse assumption could create hidden delivery risk, while premature rewrite could delay Paid Beta materially.
EVIDENCE: Audit confirms meaningful source and material gaps but no runtime validation.
OWNER: Strategy Decision Architect informed by Council; later implementation evidence may trigger reassessment.
RESOLUTION_METHOD: Council analysis sets the default and falsification gate; implementation validation tests it later.
REQUIRED_TIMING: Direction now; technical reassessment at contract/runtime validation if evidence contradicts reuse.
BLOCKING_EFFECT: Blocks final scope recommendation, not current Council admission.
FINAL_DISPOSITION: RESOLVED_BY_COUNCIL_ANALYSIS
```

### U-021

```text
ID: U-021
QUESTION: What current official provider, platform, and regulatory-source facts are needed to compare identity, PSP, fulfillment, messaging, hosting, and monitoring options in the selected country?
CLASSIFICATION: EXTERNAL_AUTHORITATIVE_FACT_RESEARCH_UNKNOWN
SIGNIFICANCE: Recommendations must be current, country-specific, and source-grounded rather than model-memory guesses.
EVIDENCE: This Council mission prohibits external research and contains no admitted provider comparison.
OWNER: Later Strategy decision-package research owner
RESOLUTION_METHOD: Targeted current official-source research after U-001 and relevant business constraints are fixed.
REQUIRED_TIMING: Before the consolidated provider recommendation is presented for Leo decision.
BLOCKING_EFFECT: Blocks named provider recommendations, not the Council verdict on the generic development direction.
FINAL_DISPOSITION: RESOLVED_BY_AUTHORITATIVE_SOURCE
```

## Freeze confirmation

```text
REGISTER_FROZEN: YES
ROUND_1_STARTED: NO
REGISTER_REWRITE_ALLOWED: NO
POST_FREEZE_UNKNOWN_PATH: STRATEGIST_FINDINGS_MATRIX_ONLY
```
