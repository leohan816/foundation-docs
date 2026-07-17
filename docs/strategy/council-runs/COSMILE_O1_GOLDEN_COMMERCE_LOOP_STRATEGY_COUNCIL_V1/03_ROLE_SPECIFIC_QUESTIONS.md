# Role-Specific Questions

```text
COUNCIL_MISSION_ID: COSMILE_O1_GOLDEN_COMMERCE_LOOP_STRATEGY_COUNCIL_V1
STATUS: FROZEN_BEFORE_ROUND_1
COMMON_BASELINE: 02_COMMON_MISSION_BRIEF.md
```

## PRODUCT_USER_AND_BUSINESS_VALUE_CHALLENGER

Report path: `10_PRODUCT_VALUE_INITIAL.md`

1. Is this the shortest credible route to a cofounder demonstration, real customer use,
   and commercial learning rather than another technical platform milestone?
2. Is the Golden Commerce Loop sufficiently thin, or does it pull Public Launch work
   into the first integrated milestone?
3. Do Golden Order and Golden Reversal prove the customer/operator value needed now?
4. Which features, policies, or operational capabilities are truly required before a
   controlled transaction versus before Paid Beta?
5. Could a simpler closed rehearsal or smaller SKU/cohort preserve the same value?
6. Are Leo decisions being requested too early, too late, or at the correct gates?

## SYSTEM_ARCHITECTURE_SAFETY_AND_GOVERNANCE_CHALLENGER

Report path: `11_SYSTEMS_RISK_INITIAL.md`

1. Are product/SKU/price/inventory/order/payment/shipment/refund ownership and contracts
   correctly separated?
2. Does the plan avoid making Foundation a runtime dependency for ordinary commerce
   while preserving canonical product binding?
3. Are payment, stock, webhook, order confirmation, refund, compensation, and
   reconciliation invariants specified at the right strategic depth?
4. What hidden DB/schema, PII, authorization, retention, rollback, or ownership decisions
   are embedded in the direction?
5. Is selective reuse reversible, and what evidence should trigger redesign rather than
   continued patching?
6. Could parallel tracks create conflicting state authority or unsafe partial activation?

## DELIVERY_SCOPE_EVIDENCE_AND_OPERATIONS_CHALLENGER

Report path: `12_DELIVERY_EVIDENCE_INITIAL.md`

1. Is the staged plan bounded enough to finish and useful if external vendors are delayed?
2. Are frontend/backend/operations/integration tracks independently closable and safely
   integrated?
3. Are the acceptance criteria measurable without confusing sandbox, controlled live,
   Paid Beta, and Public Launch readiness?
4. What exact evidence package should each stage produce?
5. Does the plan account for migration, review, documentation, cleanup, rollback,
   monitoring, backup, support, and external elapsed time?
6. What would prevent the Golden Commerce Loop from becoming an indefinite full-commerce
   rewrite?

## LEGAL_REGULATORY_AND_POLICY_CHALLENGER

Report path: `13_LEGAL_POLICY_INITIAL.md`

1. Does the plan correctly require country, seller/entity, product, customer, and
   transaction model before jurisdiction-specific advice?
2. Which consumer, privacy, payment, ecommerce, tax/accounting, receipt, shipping,
   cancellation, return, refund, product-claim, and platform-policy questions are
   materially missing?
3. Which questions can be resolved by authoritative text and which require qualified
   Legal or accounting counsel?
4. Are sandbox, controlled internal transaction, and Paid Beta legally/policy-distinct
   enough in the plan?
5. Does the plan avoid treating Council analysis as compliance approval?
6. What exact counsel questions should enter the Founder Decision Package after country,
   entity, and SKU are selected?

## SECURITY_THREAT_AND_ABUSE_CHALLENGER

Report path: `14_SECURITY_THREAT_INITIAL.md`

1. What are the most credible abuse/fraud paths across identity, account recovery, admin,
   price, stock, payment, webhook, refund, reconciliation, and operator intervention?
2. Are prevention, detection, containment, recovery, and evidence gates proportionate at
   sandbox, controlled-live, and Paid Beta stages?
3. What security controls must be contract requirements before implementation rather than
   discovered at final review?
4. Does the plan safely distinguish provider sandbox from production security?
5. What source controls could appear present yet remain unproven in configured runtime?
6. What exact security condition would require HOLD before real money or PII?

## UX_HUMAN_FACTORS_AND_ACCESSIBILITY_CHALLENGER

Report path: `15_UX_HUMAN_INITIAL.md`

1. Does the milestone cover the customer and operator states people must understand,
   including pending, delayed, failed, duplicate, out-of-stock, shipped, cancelled, and
   refunded?
2. Are error prevention, recovery, trust, accessibility, mobile, localization, and
   information hierarchy sufficiently represented?
3. Can a cofounder demonstration accidentally conceal operational or customer-recovery
   gaps behind a scripted happy path?
4. What minimum prototype/usability/accessibility evidence is required before controlled
   customer use?
5. Are customer cancellation/refund requests and operator exception handling separated
   clearly enough?
6. What bounded UX correction protects value without redesigning the whole product?

## DATA_QUALITY_LINEAGE_AND_GOVERNANCE_CHALLENGER

Report path: `16_DATA_GOVERNANCE_INITIAL.md`

1. Are authoritative sources and lineage explicit for product, SKU, price, stock,
   customer, order, payment, shipment, refund, and reconciliation data?
2. Is `foundation_product_id <-> cosmile_sku_id` sufficient, and what version/provenance
   semantics are missing?
3. What data must remain immutable, versioned, corrected, retracted, retained, or deleted?
4. How should derived status differ from raw provider events and authoritative business
   records?
5. What quality/freshness threshold is material for a production-candidate SKU and
   no-oversell claim?
6. Which data readiness claims require authoritative source evidence versus implementation
   validation?

## ADVERSARIAL_ASSUMPTION_AND_FAILURE_CHALLENGER

Report path: `17_ADVERSARIAL_INITIAL.md`

1. Steelman the Golden Commerce direction before challenging it.
2. What few hidden assumptions would most strongly invalidate the direction?
3. Could selective reuse create more delay than a narrower replacement, or could a
   rewrite destroy option value?
4. Could “touch every critical layer once” become checklist theater rather than a useful
   commercial milestone?
5. What credible failure chain could pass a scripted Golden Order while remaining unsafe
   for controlled live use?
6. What is the cheapest reversible experiment or evidence gate capable of falsifying the
   plan before substantial implementation?

## Shared boundary

Role-specific questions do not broaden canonical roles. Every Challenger must remain
inside its assigned lens, name overlap explicitly, use the frozen unknown taxonomy, and
return recommendation-only findings.
