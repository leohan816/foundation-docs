SESSION:
foundation-council-legal-policy
ROLE:
LEGAL_REGULATORY_AND_POLICY_CHALLENGER
ROLE_CATEGORY:
SPECIALIST
CWD:
/home/leo/Project/council/rules/legal-regulatory-policy
EXPECTED_CWD_MATCH: YES
ACTUAL_MODEL: gpt-5.6-sol
ACTUAL_EFFORT: xhigh
COUNCIL_MISSION_ID: COSMILE_O1_GOLDEN_COMMERCE_LOOP_STRATEGY_COUNCIL_V1
SUBJECT_COMMIT: e88831c7793a79b6144c531b90e244401908ec1c
SUBJECT_BLOB: 9d8cef7b747b32494fac9654f5f2917bf093c788
SUBJECT_SHA256: 2a4be8c9a2a9c66bd5694e84d94fff64e4546eded7ae0049746f02f36abb9fcb
FROZEN_REGISTER_READ: YES
FROZEN_REGISTER_SHA256: dcc4889489056da0e62639c3ce42df5db671a133085f5c877e526e775877054d
OTHER_CHALLENGER_CURRENT_OUTPUT_VISIBLE: NO
AUTHORITY: RECOMMENDATION_ONLY

EXECUTIVE_CHALLENGE:
The direction is legally supportable as a generic sandbox-first strategy, not as a legal-readiness or live-release approval. It correctly makes country, seller/entity, SKU, providers, operations, and jurisdiction-specific Legal/tax work prerequisites, preserves the factual unknowns, and distinguishes technical sandbox evidence from live readiness. However, the Stage 0 decision freeze does not yet pin the exact customer and transaction/channel model on which applicable obligations depend; the Stage 4–6 gates do not explicitly state that a controlled or invite-only real sale must satisfy the applicable live-commerce obligations; and Foundation's canonical-data ownership does not establish legal rights to use product, brand, image, ingredient, safety, or claim content. The final Strategy direction should correct those points and require an exact, counsel-routed Legal Readiness Record before any live transaction or Paid Beta activation.
VERDICT: PROCEED_WITH_CORRECTIONS
CONFIDENCE: MEDIUM

VERIFIED_FACTS:
- The pinned subject is a non-executable draft and expressly grants no implementation, repository-change, production, real-money, Advisor-dispatch, or risk-acceptance authority.
- Subject Section 4 requires country/currency, initial SKU scope, customer authentication, PSP/payment/refund model, inventory ownership, fulfillment/tracking, cancellation/refund/reconciliation ownership, a merchant/legal-entity and policy path, and bounded Paid Beta exposure decisions before Advisor planning.
- Subject Section 8 separates provider-backed sandbox work, an operational safety gate, a controlled live transaction, and invite-only Paid Beta; Section 10 requires evidence to distinguish sandbox capability from live and Paid Beta readiness.
- Subject Sections 5 and 9 address open-source license acceptability and a versioned Foundation data handoff, but do not establish any particular provider, license, intellectual-property right, data-use right, product-market authorization, or claim substantiation.
- Frozen unknowns U-001, U-002, U-003, U-005 through U-015, U-017, U-018, and U-021 leave the country, entity, offer, customer model, providers, operations, jurisdiction-specific obligations, beta bounds, canonical data, runtime controls, and authoritative external facts unresolved.
- U-013 expressly routes exact jurisdiction-specific ecommerce, consumer, privacy, tax/accounting, receipt/invoice, cancellation, return, refund, claims, and product obligations to qualified jurisdiction-specific Legal and accounting counsel after U-001, U-002, and U-003 are fixed.
- The admitted P3 baseline records PB-10 as open and the admitted P5 closure states that the evidence ceiling is E2/static and not legal-verified.

INFERENCES:
- Country selection is necessary but insufficient for jurisdiction-specific advice. The seller's roles, customer location/status/age, sales channel, shipping origin/destination, product classification, and transaction structure can change the applicable rules and contracts.
- A bounded internal or invite-only transaction may reduce exposure, but real goods, customer data, and real money can still create payment, tax, privacy, product, contract, and consumer obligations. No exemption is established by the words "controlled," "internal," "beta," or "invite-only."
- Several legal requirements may affect the contract-first schema before Stage 4, including tax-inclusive price fields, order-confirmation evidence, consent/terms versions, invoice/credit-note records, product/lot/label/claim provenance, withdrawal/return deadlines, and data-retention controls.
- Provider terms and official regulatory text can establish authoritative facts, but applying them to the selected entity, SKU, customer, and transaction remains a legal or accounting interpretation where U-013 requires qualified advice.

ASSUMPTIONS_TESTED:
- A-002: A deliberately small SKU set reduces the review and operating surface but does not remove per-SKU market-access, labeling, safety, claims, IP, shipping, recall, or consumer obligations.
- A-003: Provider-backed sandboxes may support technical testing, but sandbox availability does not prove live merchant eligibility, permitted product category, data-processing terms, payment-method eligibility, or production-policy compliance.
- A-005: A versioned Foundation snapshot can preserve runtime isolation, but canonical status alone does not prove data provenance, legal-use rights, claim substantiation, localization, or authority to publish the content.
- A-006: Bounded manual fulfillment, refund, or reconciliation may be operationally feasible, but it is not a legal exemption and still requires disclosed policies, named authority, records, deadlines, and compliant handling.

MATERIAL_UNKNOWNS:
- U-001/U-002/U-003: country/currency, seller or merchant entity, and exact SKU/offer are unresolved and therefore prevent exact applicable-law, tax, provider, and product advice.
- U-005/U-007/U-009/U-010/U-012/U-014: customer, payment, inventory, fulfillment, reversal/support ownership, and beta-exposure decisions remain unresolved.
- U-006/U-008/U-011/U-021: provider capabilities, terms, geography, data locations, category acceptance, onboarding, and operational fit require authoritative current sources or direct vendor confirmation.
- U-004/U-015: sellability/supply evidence and approved canonical product/brand/ingredient/claim/safety data remain unverified.
- U-013: the exact jurisdiction-specific Legal and accounting interpretation remains unresolved and cannot be closed by Council reasoning.
- U-017/U-018: configured privacy/security control effectiveness and accessible customer/operator behavior remain unvalidated; both may affect legal readiness but remain implementation-validation questions.
- U-N01 and U-N02 below are proposed because the register does not expressly pin the participant/transaction classification or the legal-use rights for commerce content.

REGISTER_ADDITIONS_PROPOSED:
  - ID_PROPOSAL: U-N01
    QUESTION: What exact customer and transaction model applies at controlled-live and Paid Beta stages, including customer location, consumer-or-business status, age boundary, invited/internal/employee relationship, sales channel, shipping origin and destination, one-off or recurring payment structure, and whether the transaction is cross-border?
    CLASSIFICATION: FOUNDER_MARKET_AND_RELEASE_MODEL_DECISION
    SIGNIFICANCE: These facts determine applicable consumer, contract, privacy, payment, tax, product, shipping, accessibility, and platform-policy obligations; "controlled" or "invite-only" does not answer them.
    EVIDENCE: The pinned subject fixes neither an exact participant profile nor the complete transaction/channel and shipping model; U-014 bounds exposure but does not classify the participant or transaction.
    OWNER: Leo with qualified Legal, accounting, privacy, and operations input
    RESOLUTION_METHOD: Founder selection and documented transaction map after country, entity, and candidate SKU facts are available.
    REQUIRED_TIMING: Before final jurisdiction-specific advice and Advisor implementation planning; in all cases before controlled live use.
    BLOCKING_EFFECT: Blocks exact Legal/tax/provider recommendations and all live-customer activation; does not block generic sandbox architecture review.
    FINAL_DISPOSITION: LEO_DECISION_REQUIRED
  - ID_PROPOSAL: U-N02
    QUESTION: What exact contracts, licenses, permissions, and provenance authorize Cosmile to copy, transform, publish, localize, and commercially use each initial SKU's product identity, brand, image, ingredient, safety, and claim content, and what correction, withdrawal, expiry, or attribution duties apply?
    CLASSIFICATION: FACTUAL_INTELLECTUAL_PROPERTY_AND_DATA_USE_RIGHTS_UNKNOWN
    SIGNIFICANCE: Canonical ownership and data quality do not establish legal-use rights or permission to make customer-facing product and marketing claims.
    EVIDENCE: Subject Section 9 defines intended canonical data ownership and U-015 asks whether approved canonical data exists, but neither supplies the governing contracts, licenses, permissions, or restrictions.
    OWNER: Leo-designated product/data-rights owner with Legal input
    RESOLUTION_METHOD: Verify executed contracts, licenses, supplier permissions, source provenance, and approval records; route disputed scope or sufficiency to U-013 counsel.
    REQUIRED_TIMING: Before production-candidate content or claims are exposed to controlled customers and before the snapshot is approved for commercial use.
    BLOCKING_EFFECT: Blocks customer-facing use of content or claims lacking verified rights; does not block clearly synthetic, non-public sandbox integration data.
    FINAL_DISPOSITION: RESOLVED_BY_AUTHORITATIVE_SOURCE

FINDINGS:
  - FINDING_ID: LEGAL-POLICY-01
    SEVERITY: MATERIAL
    CLAIM: The decision order is directionally correct, but country, entity, and SKU selection alone are insufficient; the plan must also freeze the exact participant and transaction/channel model before jurisdiction-specific advice or implementation-contract freeze.
    EVIDENCE: Subject Sections 4, 6, and 8; frozen U-001, U-002, U-003, U-005, U-014; proposed U-N01.
    LENS_BASIS: Applicable consumer, privacy, payment, tax, ecommerce, shipping, product, and platform duties turn on the parties, customer status/location, channel, goods flow, and transaction structure as well as country and entity.
    UNKNOWN_IDS_AFFECTED: U-001, U-002, U-003, U-005, U-013, U-014, U-N01
    OVERLAP_WITH_OTHER_LENS: PRODUCT_USER_AND_BUSINESS_VALUE_CHALLENGER_AND_UX_HUMAN_FACTORS_AND_ACCESSIBILITY_CHALLENGER — cohort design and customer comprehension overlap those lenses, while this finding is limited to facts needed to determine legal and policy applicability.
    RECOMMENDATION: Add U-N01's fields to Stage 0 and make the resulting transaction map an input to the Legal/accounting work package and the minimum contract freeze.
  - FINDING_ID: LEGAL-POLICY-02
    SEVERITY: BLOCKING
    CLAIM: The phases are operationally distinct but not legally distinct enough: the direction does not expressly state that a controlled real transaction and invite-only Paid Beta require the applicable live-sale obligations unless qualified counsel identifies a specific exemption.
    EVIDENCE: Subject Section 8 requires a generic Legal/privacy/tax/shipping/cancellation/refund gate before real money, while Sections 8 and 10 distinguish evidence stages; U-013 remains unresolved and blocks real-money release.
    LENS_BASIS: A limited cohort or named participant does not by itself negate mandatory consumer, product, privacy, payment, tax, invoice, shipping, withdrawal, refund, or provider-contract rules.
    UNKNOWN_IDS_AFFECTED: U-001, U-002, U-003, U-007, U-008, U-010, U-011, U-012, U-013, U-014, U-N01
    OVERLAP_WITH_OTHER_LENS: SYSTEM_ARCHITECTURE_SAFETY_AND_GOVERNANCE_CHALLENGER — release-gate structure overlaps governance, while this finding addresses the legal meaning and non-exemption of each exposure stage.
    RECOMMENDATION: Add a phase-specific Legal Readiness Record: sandbox uses provider-approved test instruments and non-live data only; controlled live requires the complete applicable live-commerce package for the exact transaction; Paid Beta additionally requires cohort terms, scalable rights/support handling, and confirmation that invitation or beta labels do not waive mandatory rights.
  - FINDING_ID: LEGAL-POLICY-03
    SEVERITY: MATERIAL
    CLAIM: Initial SKU selection is not yet a product-market-access decision; the plan omits an explicit legal-role and product-obligation determination that may affect data contracts and operations before implementation.
    EVIDENCE: Subject Sections 4, 6, 8, and 9; U-003, U-004, U-013, and U-015.
    LENS_BASIS: Depending on SKU and market, the seller may also be a manufacturer, importer, distributor, or responsible person, and obligations may include classification, registration/notification, labeling/language, ingredient restrictions, safety substantiation, claims evidence, batch/lot traceability, recall, and adverse-event handling.
    UNKNOWN_IDS_AFFECTED: U-003, U-004, U-013, U-015
    OVERLAP_WITH_OTHER_LENS: DATA_QUALITY_LINEAGE_AND_GOVERNANCE_CHALLENGER — provenance and traceability overlap data governance, while this finding addresses legal market access, responsibility, claims, and records.
    RECOMMENDATION: Before contract freeze for a production-candidate SKU, obtain authoritative product records and a country-specific counsel determination of product classification, legal actor roles, permitted claims, required labels/records, and recall/adverse-event duties.
  - FINDING_ID: LEGAL-POLICY-04
    SEVERITY: MATERIAL
    CLAIM: The cross-cutting Legal gate is too compressed to prove that all decision-critical consumer, privacy, payment, tax/accounting, receipt, shipping, cancellation, return, refund, and complaint obligations have owners and evidence.
    EVIDENCE: Subject Sections 4 and 8 name broad policy categories; P3 PB-10 remains open; P4 D-02, D-04, and D-07 identify unresolved provider, refund, privacy, terms, shipping, and policy decisions; P5 confirms no legal verification.
    LENS_BASIS: A release gate must separate authoritative source facts, vendor/contract confirmation, Founder policy choices, counsel interpretation, accounting advice, implementation evidence, and final operational approval; a generic "Legal requirements" check can hide unresolved ownership.
    UNKNOWN_IDS_AFFECTED: U-005, U-006, U-007, U-008, U-010, U-011, U-012, U-013, U-014, U-017, U-018, U-021
    OVERLAP_WITH_OTHER_LENS: DELIVERY_SCOPE_EVIDENCE_AND_OPERATIONS_CHALLENGER — evidence ownership and closure overlap delivery, while this finding defines the legally required categories and resolution authorities.
    RECOMMENDATION: Require a dated Legal Readiness Record that maps each obligation to jurisdiction, source and effective date, factual inputs, responsible legal/entity role, owner, required artifact, counsel/accounting conclusion where needed, implementation evidence, stage gate, and unresolved blocker.
  - FINDING_ID: LEGAL-POLICY-05
    SEVERITY: MATERIAL
    CLAIM: Foundation's intended canonical ownership does not establish Cosmile's intellectual-property, contractual, or data-use rights, nor the legal approval and change-control status of customer-facing claims.
    EVIDENCE: Subject Section 9 defines canonical and commerce ownership and acknowledges unknown data location, quality, approval owner, and delivery; U-015 covers existence and provenance but not governing rights; proposed U-N02.
    LENS_BASIS: Product data may be accurate and canonical yet still be restricted by supplier contracts, copyright, trademark, database rights, confidentiality, territorial limits, attribution duties, or claim-approval conditions.
    UNKNOWN_IDS_AFFECTED: U-013, U-015, U-N02
    OVERLAP_WITH_OTHER_LENS: DATA_QUALITY_LINEAGE_AND_GOVERNANCE_CHALLENGER — data quality and versioning overlap that lens, while this finding is limited to licenses, legal-use permissions, and claim responsibility.
    RECOMMENDATION: Add a commercial-use-rights manifest to the approved snapshot, with source, rights holder, license/permission, territory/channel, approved claim text and evidence owner, version/effective date, attribution, expiry, and correction/withdrawal path.
  - FINDING_ID: LEGAL-POLICY-06
    SEVERITY: ADVISORY
    CLAIM: Managed-service, platform, and open-source choices are correctly deferred but need explicit policy and contracting acceptance criteria rather than a generic compatibility/license statement.
    EVIDENCE: Subject Section 5; U-006, U-008, U-011, and U-021.
    LENS_BASIS: Provider production terms, restricted-product rules, DPAs/subprocessors/transfers, sandbox-use restrictions, card-network obligations, messaging consent rules, carrier restrictions, and open-source license/notice/source-disclosure duties can materially change a proposed component or channel.
    UNKNOWN_IDS_AFFECTED: U-006, U-008, U-011, U-013, U-021
    OVERLAP_WITH_OTHER_LENS: SECURITY_THREAT_AND_ABUSE_CHALLENGER_AND_DELIVERY_SCOPE_EVIDENCE_AND_OPERATIONS_CHALLENGER — provider security and maintenance overlap those lenses, while this finding addresses contractual and platform-policy permission.
    RECOMMENDATION: For every selected service, channel, or open-source component, record the current authoritative terms/version, contracting entity, permitted country/product/use, data terms, required notices, operational restrictions, acceptance owner, and any counsel question; obtain direct vendor confirmation where the register requires it.

REQUIRED_CORRECTIONS:
1. Expand Stage 0 to freeze U-001, U-002, U-003, and U-N01's participant/transaction facts before exact jurisdiction-specific advice, provider recommendation, or implementation-contract freeze.
2. Replace the single generic Legal gate with a phase-specific Legal Readiness Record and state expressly that controlled live and invite-only Paid Beta are live commerce, not presumed exemptions.
3. Add product-market-access, legal-role, content/claim-rights, and change/recall requirements to the initial SKU and Foundation snapshot decisions.
4. After country, entity, SKU, customer, channel, shipping route, and payment model are fixed, place these exact questions in the Founder Decision Package for qualified counsel or accounting advice:
   - CQ-01: For the selected entity selling the selected SKU from the stated origin to the stated customer/cohort and destination through the selected channel, which entity is seller and merchant of record, and which manufacturer, importer, distributor, responsible-person, data-controller/processor, tax, and product-liability roles attach?
   - CQ-02: How is each SKU legally classified in the selected market; may it be sold through the selected channel; and what registration/notification, responsible-person, ingredient/restriction, safety-file, label/language/warning, batch/lot, claims-substantiation, recall, and adverse-event duties apply?
   - CQ-03: What pre-contract price/tax/shipping/delivery disclosures, terms-incorporation and acceptance evidence, order acknowledgement/confirmation and durable-medium records, cancellation/withdrawal, return, defect/guarantee, refund timing/method, complaint, and alternative-dispute-resolution duties apply, including any non-waivable rights or exceptions?
   - CQ-04: For the exact data flow among Cosmile, Foundation, identity, PSP, carrier/3PL, messaging, hosting, support, and monitoring providers, who is controller, joint controller, or processor; what purposes and lawful bases apply; and what notices, consent/cookie controls, DPAs, subprocessors, international-transfer safeguards, retention/deletion, data-subject rights, age rules, breach handling, and recordkeeping are required?
   - CQ-05: For the selected payment model and PSP, what payment-law, authentication/SCA, card-network, PCI-scope, stored-credential, capture/void/refund, surcharge, chargeback, prohibited-product, settlement, and reconciliation requirements apply, distinct from vendor onboarding confirmation?
   - CQ-06: What VAT/sales-tax or equivalent registrations, nexus/place-of-supply treatment, price-display rules, invoice/receipt and credit-note fields, numbering, retention, customs/import duties, settlement accounting, and refund accounting apply to the exact goods and routes? This question requires qualified tax/accounting input in addition to Legal where appropriate.
   - CQ-07: What shipping restrictions, carrier terms, delivery promises, title/risk transfer, lost/damaged parcel liability, customs documentation, cancellation cutoff, return address/cost, refund deadline, and restricted-or-dangerous-goods treatment apply?
   - CQ-08: Does the proposed controlled-live participant or invite-only Paid Beta cohort have consumer, employee, contractor, compensated-tester, minor, or other protected status; what beta/invitation disclosures and consents are enforceable; and which mandatory rights cannot be waived or narrowed by the beta label?
   - CQ-09: Do the executed contracts and licenses authorize the proposed use, modification, localization, and publication of product, brand, image, ingredient, safety, and claim content in the selected territory/channel, and who may approve, correct, withdraw, or defend each claim?

OPTIONAL_IMPROVEMENTS:
- Give each customer-facing policy and consent an immutable version/effective date and link the accepted version to the order or relevant event.
- Add legal-change and provider-terms-change monitoring owners before Paid Beta; this is not a substitute for initial counsel/vendor review.
- Maintain a narrow open-source and third-party notice/license inventory for components entering the commerce path.

FOUNDER_DECISIONS:
- Leo must select U-001, U-002, U-003, U-005, U-007, U-009, U-010, U-012, U-014, and proposed U-N01 within their stated timing. These are business, market, operating, and risk-boundary decisions, not Founder determinations of what the law requires.
- Leo must approve the customer-facing policy choices, limits, and operational owners only after the authoritative facts and counsel/accounting constraints are recorded; Council advice does not supply legal approval or risk acceptance.
- Leo must decide whether the Advisor planning mission is limited to sandbox contracts/evidence or also anticipates later live stages; no mission may authorize real money, customer PII, provider commitment, or customer exposure merely by incorporating this direction.

FACTUAL_RESOLUTIONS_REQUIRED:
- Resolve U-004 and U-015, plus U-N02 if accepted, from supplier, inventory, canonical-data, contract/license, provenance, and approval records.
- Resolve U-006 and U-021 from dated official provider/platform/regulatory materials after U-001 and the relevant business constraints are fixed.
- Resolve U-008 and U-011 through direct vendor/account confirmation; official marketing or generic product pages are insufficient.
- Resolve U-013 through exact jurisdiction-specific Legal and accounting counsel after U-001, U-002, U-003, and U-N01 are fixed. Official statutes, regulator/tax-authority guidance, provider terms/DPAs, and supplier records are authoritative inputs but do not by themselves close applicability or interpretation.
- Resolve U-016, U-017, and U-018 only through separately authorized implementation, security, usability, and accessibility validation; Council reasoning cannot establish configured compliance or live control effectiveness.

SIMPLER_OR_SAFER_ALTERNATIVE:
Limit the first Advisor planning mission to sandbox contract, data, and evidence planning with provider-approved test instruments, synthetic or expressly approved non-live data, no real customer exposure, no real PII or money, and no external commercial commitment. Run the country/entity/SKU/customer-transaction decision package and counsel/accounting/vendor work as explicit prerequisites in parallel. Do not plan or authorize Stage 5 or Stage 6 execution until the Legal Readiness Record is complete and Leo separately approves the bounded exposure.

STRONGEST_HOLD_REASON:
HOLD any controlled live transaction or Paid Beta activation if U-001, U-002, U-003, U-013, and U-N01 remain unresolved, or if product market access/claims, commercial-use rights, provider acceptance, privacy/terms, tax/invoice, shipping/returns/refunds, and named legal/operational responsibilities lack authoritative evidence and required counsel/accounting conclusions. Proceeding would risk an unlawful or contractually prohibited sale, unsupported product claims, unlawful data processing, incorrect tax/receipt treatment, or unenforceable consumer/refund handling without any evidence that "controlled" or "invite-only" supplies an exemption.

WHAT_WOULD_CHANGE_THE_VERDICT:
- Change to PROCEED if the subject adopts the required Stage 0 facts, phase-specific Legal Readiness Record, product/claim/data-rights gates, and exact counsel/accounting questions while preserving U-013 and all separate live-approval boundaries.
- Change to HOLD for the direction itself if a final revision treats sandbox success, named participants, internal status, or invite-only beta as compliance evidence or an exemption; permits contract freeze before decision-critical legal inputs; or permits live use while U-013 and the product/provider rights remain open.

TIMEBOX_OR_CLOSURE_IMPACT:
The document corrections are bounded strategy work. Country/entity/SKU/cohort decisions, counsel/accounting review, product records, provider terms, KYC/category acceptance, and vendor confirmations may determine the external critical path and cannot be estimated or closed by this Council. Sandbox-only architecture planning need not wait for every live obligation if it uses no real PII/money/customer exposure, but decision-critical legal fields must be represented before shared contracts are frozen.

MINORITY_OR_DISSENT_NOTE:
NONE. This report does not oppose O1 or the Golden Order/Golden Reversal strategy; it limits the legal conclusion to sandbox-first planning and rejects any inference of live compliance or legal approval.

BOUNDARY_CONFIRMATION:
  PRODUCT_DECISION_MADE: NO
  RISK_ACCEPTED: NO
  SUBJECT_PATCHED: NO
  PRODUCT_REPOSITORY_READ: NO
  PRODUCT_REPOSITORY_MODIFIED: NO
  ACTOR_DISPATCHED: NO
  INDEPENDENT_REVIEW_CLAIMED: NO
RETURN_TO: STRATEGY_DECISION_ARCHITECT
STOP.
