# Cosmile O1 Golden Commerce Loop — Development Direction

```text
DOCUMENT_TYPE: STRATEGY_DEVELOPMENT_DIRECTION
ROLE: STRATEGY_DECISION_ARCHITECT
DATE_UTC: 2026-07-17
STATUS: COUNCIL_CORRECTED_FOR_LEO_GPT_REVIEW
O1_WORKING_DIRECTION: ADOPTED_BY_LEO
EXECUTABLE_AUTHORITY: NO
ADVISOR_IMPLEMENTATION_PLAN: NOT_STARTED
ADVISOR_DISPATCHED: NO
IMPLEMENTATION_AUTHORIZED: NO
PRODUCT_REPOSITORY_CHANGE_AUTHORIZED: NO
PRODUCTION_OR_REAL_MONEY_AUTHORIZED: NO
NEXT_MISSION_AUTO_START: NO
```

## 1. Strategic objective

Cosmile will not be broadly rewritten. The existing UI, cart, database order, and
admin foundations should be retained where they remain suitable. The immediate goal
is to replace mock behavior on the Paid Beta critical path with production-shaped
components and connect the path as one coherent **Golden Commerce Loop**.

The first integrated milestone is not “frontend complete” or “backend complete.” It is
a limited product set passing through both a successful order and a reversal scenario
with consistent evidence across UI, API, database, external providers, inventory, and
operator records.

Foundation AI, Memory V3, retrieval, recommendation UI, and unrelated product
expansion remain outside this Cosmile direction.

## 2. Audited starting point

The reviewed E2/static commercial baseline found meaningful Cosmile source but no
verified real-money path:

- catalog and price behavior rely on mock or in-memory product data;
- customer authentication is mock-based;
- checkout creates pending database orders but reprices from mock catalog data;
- payment is a simulated status transition without a PSP, verified webhook,
  idempotency, or reconciliation;
- inventory reservation, deduction, release, restoration, and oversell protection are
  absent;
- shipment and tracking have no established system of record;
- cancellation/refund lacks economic reversal and policy-based state restoration;
- admin foundations exist, but access hardening and scoped security review remain
  open.

This direction does not claim runtime readiness. Build, test, database, endpoint,
provider, staging, and operational evidence must be generated during the later
approved implementation mission.

## 3. Golden Commerce Loop

### Golden Order

```text
production-candidate SKU
-> real provider-backed sandbox identity
-> authoritative price and sellable state
-> cart and checkout
-> PSP sandbox payment
-> verified and idempotent webhook
-> confirmed order
-> inventory reservation/deduction
-> shipment and tracking
-> payment/order/inventory/operator reconciliation
```

### Golden Reversal

```text
cancellation or return request
-> approved policy decision
-> PSP sandbox refund or void
-> order-state transition
-> policy-based inventory release, restoration, quarantine, or disposal
-> payment/order/inventory/operator reconciliation
```

The two scenarios form one integrated milestone but must remain separate test cases.
A completed delivery and a cancellation/refund are not the same business path.

These arrows define scenario coverage, not a universal transaction order. The later
provider- and inventory-specific contract must select safe ordering and compensation.
Golden Reversal requires a captured-payment sandbox refund. A pre-capture void may be
retained as lower-level evidence but cannot close Golden Reversal.

## 4. Progressive Founder decision gates

Leo must receive concise, country-grounded options and recommendations for:

1. first selling country and currency;
2. initial real sellable SKU scope;
3. customer authentication model and provider;
4. PSP and payment/refund method;
5. inventory system of record and operating owner;
6. fulfillment, shipment, and tracking model;
7. cancellation, refund, and reconciliation operating ownership.

The decision package must also record two cross-cutting gates:

- merchant/legal entity, tax/VAT, receipts, privacy, terms, shipping, cancellation,
  and refund policy path;
- Paid Beta cohort, order and transaction limits, exit criteria, stop conditions, and
  incident/customer-support ownership.

Country selection comes first because it constrains currency, PSP, taxation, Legal,
fulfillment, identity, and provider options. Current provider and regulatory claims
must be verified against authoritative sources when the decision package is prepared.

These decisions do not all need to close at once:

- **Before country/provider research:** narrow the first country/currency, seller/entity
  path, SKU shortlist, and the qualitative learning question for each stage.
- **Before planning-only Advisor work:** approve O1, exclusions, the evidence claim
  ladder, selective-reuse presumption, and the country/entity/SKU planning envelope.
- **Before provider-specific contract freeze:** select identity, PSP/refund, inventory,
  fulfillment/tracking, and recovery/reconciliation models using current authoritative
  and vendor evidence; route applicable counsel/accounting questions.
- **Before controlled live:** approve the exact participant/transaction envelope,
  provider eligibility, support promise, limits, stop conditions, and Legal, security,
  privacy, runtime, human-use, and operational gates.
- **Before Paid Beta:** separately approve cohort, exposure, learning/exit criteria,
  support coverage, and next-decision rule.

No gate authorizes the next one automatically.

## 5. Build, buy, and open-source principle

### Cosmile-owned implementation

- commerce domain contracts and state machines;
- product/SKU/price/inventory binding;
- order, payment, shipment, cancellation, and refund consistency;
- webhook verification, idempotency, replay handling, and recovery;
- frontend/API/database integration;
- operator reconciliation and audit trail.

### Managed or commercial services, subject to Leo approval

- customer identity provider;
- PSP and payment methods;
- email/SMS delivery;
- carrier, 3PL, or tracking provider;
- appropriate hosting, monitoring, or operational services.

### Open-source components

Open source may be selected for database tooling, migrations, queues/jobs,
observability, or operator support only when compatibility, security, license,
maintenance responsibility, and operational cost are acceptable. Introducing a new
component solely to claim stack coverage is prohibited.

The goal is to exercise every material commerce boundary, not every available
technology.

Selective reuse is a reversible presumption, not a conclusion. Planning begins with
read-only evidence and exact reuse hypotheses. A disposable implementation spike needs
separate authority and is justified only where material uncertainty remains. If a
component fails its declared reuse criterion, the Advisor may return a bounded
replacement option to Leo; neither this direction nor a failed component authorizes a
whole-product rewrite.

## 6. Contract-first foundation

Before parallel frontend and backend implementation, the approved plan must freeze the
minimum shared contracts for:

- Customer;
- Product and SKU;
- Price and sellable state;
- Inventory and reservation;
- Cart and Checkout;
- Order;
- PaymentAttempt and PaymentEvent;
- Shipment and Tracking;
- Cancellation and Refund;
- ReconciliationRecord and AuditEvent.
- Experience and Recovery Contract;
- Data Authority and Lineage Contract;
- Environment, Evidence Claim, and Authorization record.

It must also freeze the invariants that determine:

- the final authority for price;
- when stock is reserved, deducted, released, or restored;
- when payment can be captured and an order confirmed;
- how duplicate or out-of-order provider events are handled;
- how payment success followed by order failure is recovered;
- how refund and inventory treatment vary by cancellation/return policy;
- which customer and operator permissions apply;
- what evidence proves each transition.

The early contract must also preserve server-authoritative item, price, amount,
currency, SKU and stock values; customer/order and privileged-action authorization;
provider-event authenticity, uniqueness, ordering, replay resistance and transaction
binding; environment separation; customer/operator-visible state and permitted action;
and distinct rollback, data recovery, economic compensation, and correction semantics.
This is an invariant set, not a completed security audit or Execution Manifest.

The strategy document must not prematurely prescribe a dangerous universal sequence
such as “capture payment, confirm order, then discover stock.” The Advisor-managed
technical plan must select a safe transaction and compensation design after the
provider and inventory decisions are known.

## 7. Parallel work tracks

| Track | Scope |
|---|---|
| Cosmile frontend | Provider-backed login, catalog/PDP, cart, checkout, payment result, orders, tracking, cancellation/refund request, admin/operator views |
| Cosmile backend | Identity boundary, SKU/price/stock persistence, order state machine, PSP adapter/webhook, inventory invariants, shipment, refund, reconciliation |
| Operations | Provider sandbox, fulfillment process, policy/runbook, customer support, monitoring, backup and recovery |
| Integration/evidence | Shared contracts, end-to-end trace, failure/recovery scenarios, test and runtime evidence |

These are logical tracks, not automatic actor assignments. The Advisor must define
write ownership, worktrees, integration order, and collision controls before allowing
parallel edits to one repository.

## 8. Staged delivery

### Stage 0 — Decision freeze

Record the decisions in Section 4. No product code or external commitment begins from
this document.

### Stage 1 — Real read path

Connect a provider-backed sandbox identity to a production-candidate SKU stored in the
approved system of record with authoritative price, sellable state, and inventory.
Connect catalog, PDP, cart, and checkout to that data.

### Stage 2 — Sandbox Golden Order

Integrate the PSP sandbox, verified webhook, idempotent order confirmation, inventory
transition, customer/admin order visibility, shipment/tracking record, and
reconciliation evidence.

### Stage 3 — Golden Reversal and recovery

Verify cancellation/return, void/refund, order-state transition, policy-based inventory
treatment, and reconciliation. Verify the minimum material failure cases:

- payment failure and timeout;
- duplicate or out-of-order webhook;
- payment success followed by order-confirmation failure;
- concurrent attempts to buy the last available stock;
- provider refund success followed by internal transition failure;
- operator recovery and audit evidence.

Stages 2 and 3 together form `GOLDEN_COMMERCE_REHEARSAL`. They may earn only
`SANDBOX_WALKING_SKELETON_EVIDENCE`, and only when Golden Order and captured-refund
Golden Reversal separately pass under the same pinned contract, build/configuration,
provider-backed sandbox, and bounded evidence set. Every attempt generated by the
rehearsal must reconcile, including relevant immediate authorization, authoritative
value binding, duplicate/out-of-order/idempotency, last-stock, and partial-failure
cases. The result makes no live, reliability, usability, or commercial claim.

### Stage 4 — Operational safety gate

A later `NONPRODUCTION_BACKBONE_EVIDENCE` claim requires a separately declared bounded
reliability and recovery predicate, including applicable crash/restart durability,
delayed or missing-event detection, broader bounded-population reconciliation,
monitoring/containment, backup/restore, recovery rehearsal, and repeatability evidence.
It still does not authorize controlled live.

Before real money or customer PII, require proportionate evidence for:

- customer and operator authorization;
- PII-safe logging and secret handling;
- scoped security review and critical-finding closure;
- monitoring, alerting, incident response, and rollback;
- backup and restore;
- payment/order/inventory reconciliation;
- Legal, privacy, tax, shipping, cancellation, and refund requirements;
- named fulfillment, support, refund, incident, and reconciliation operators.

### Stage 5 — Controlled live transaction

Only after explicit Leo approval and the safety gate, perform a tightly bounded real
order and real refund with named participants, transaction limits, stop conditions,
and complete reconciliation.

### Stage 6 — Invite-only Paid Beta

Advance only after the controlled transaction passes and Leo approves the cohort,
order threshold, exit criteria, support model, and stop conditions. There is no
automatic progression to Public Launch.

## 9. Foundation boundary during Cosmile O1

Cosmile must not synchronously depend on Foundation during catalog, cart, checkout,
payment, order, fulfillment, or refund.

Foundation remains the intended canonical owner of product identity/content, brand,
ingredient, claim, and safety data. For the initial SKU set, Cosmile should consume an
approved versioned snapshot or explicit synchronization and preserve:

```text
foundation_product_id <-> cosmile_sku_id
```

Cosmile remains authoritative for sellable SKU, price, stock, sales state, customer,
cart, order, payment, fulfillment, and refund. Foundation unavailability must not stop
ordinary commerce.

The location, quality, approval owner, and delivery mechanism for the initial
Foundation canonical data remain decision-package questions. They are not silently
assumed here.

## 10. Acceptance criteria

The first Cosmile integration milestone is complete only when:

- Golden Order and captured-refund Golden Reversal separately pass in one pinned
  provider-backed non-production context without mock behavior on the claimed path;
- the same order and transition history can be traced across UI, API, database, PSP,
  inventory, shipment/refund, and operator records;
- webhook verification and idempotency are evidenced;
- no-oversell and compensation/recovery behavior are evidenced;
- cancellation/refund and policy-based inventory treatment reconcile correctly;
- customer and operator authorization boundaries are evidenced;
- every generated rehearsal attempt reconciles and relevant immediate authorization,
  value-binding, duplicate/out-of-order, last-stock, and partial-failure cases pass;
- customer- and operator-visible state, available/prohibited actions, and recovery
  route accompany the technical trace without claiming later human-readiness evidence;
- evidence distinguishes the rehearsal ceiling, later non-production backbone,
  operational safety, controlled live, and Paid Beta readiness.

Passing this milestone proves only `SANDBOX_WALKING_SKELETON_EVIDENCE`. It does not
prove a reliable non-production backbone, operational safety, controlled-live
eligibility, Paid Beta readiness, commercial validation, full feature completion,
production scale, Public Launch readiness, or Foundation AI readiness.

All stage results use the compact status set
`NOT_STARTED | IN_PROGRESS_WITHIN_AUTHORITY | EXTERNAL_PENDING |
EVIDENCE_INCOMPLETE | PASS | HOLD`. Each records a claim ceiling, environment/exposure,
exact applicable evidence pins, unresolved IDs, accountable owner, review disposition,
and authorization state. `PASS` never authorizes progression.

## 11. Explicit exclusions

- Foundation AI runtime;
- Memory V3 resumption or U1/U2/U3 closure;
- retrieval or recommendation UI;
- SIASIU integration;
- broad catalog expansion;
- B2B2C, influencer, advanced dashboard, voice commerce, AI pricing, or AI CRM;
- unrelated Public Launch features;
- migration of the Control-located historical AI service.

Any later Foundation AI work must be a separately approved, non-blocking track with
its own ownership and evidence model.

## 12. Role and routing

```text
Leo + Strategy Decision Architect
-> approved objective and Founder decisions
-> foundation-advisor
-> selected Foundation Team Actors
-> independent Reviewer when required
-> foundation-advisor audited result
-> Strategy Decision Architect
-> Leo
```

- The Advisor owns execution orchestration and integrated reporting.
- The Cosmile Worker owns Cosmile repository implementation.
- Designer may own approved experience/design work.
- Control performs subordinate contract, dependency, state-invariant, and architecture
  analysis only; it does not implement.
- Independent Reviewer verifies the approved result without becoming the implementer.
- Strategy does not directly dispatch subordinate actors or claim independent review.

## 13. Council requirement

```text
COUNCIL_DECISION: REQUIRED
TRIGGERS:
- material Paid Beta scope and release-gate decision
- payment, PII, DB, security, refund, and external-provider risk
- multi-actor and cross-project impact
- expected work materially above three working days
COUNCIL_REVIEW_COMPLETED_FOR_THIS_DIRECTION: YES
COUNCIL_MISSION_ID: COSMILE_O1_GOLDEN_COMMERCE_LOOP_STRATEGY_COUNCIL_V1
COUNCIL_COMPOSITION: SELECTED_8
COUNCIL_ROUNDS_COMPLETED: 3
COUNCIL_FINAL_ROLE_VERDICTS: 8_PROCEED_WITH_CORRECTIONS
STRATEGIST_FINAL_VERDICT: PROCEED_WITH_CORRECTIONS
```

Council review corrected this direction but did not provide independent review,
implementation authority, live approval, or risk acceptance. The Advisor remains
undispatched.

## 14. Next decision

Leo and GPT should review this corrected direction and the bilingual consolidated
Founder Decision Package. After Leo records the applicable progressive Gate A/B
decisions and explicitly authorizes a bounded next step, Strategy may prepare the exact
instruction for the Advisor. Only a separate Leo approval may start Advisor planning or
orchestration.

```text
LEO_GPT_REVIEW_REQUIRED: YES
DECISION_PACKAGE_COMPLETED: YES
ADVISOR_DISPATCHED: NO
IMPLEMENTATION_STARTED: NO
STOP
```
