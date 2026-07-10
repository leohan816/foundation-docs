# V3 Package 1A Frozen Unknown Register

Date: 2026-07-10

Status: `FROZEN_ON_FIRST_PUBLISH`

Mission: `V3_PACKAGE1A_INDEPENDENT_UNKNOWN_RESOLUTION_AND_FOUNDER_DECISION_PACKAGE`

## Freeze Rule

This is the common blind-assessment question set. Its first published Git commit freezes the questions and field structure.

After freeze:

- do not edit an existing question to make an actor's answer easier;
- do not replace unknowns with inferred policy;
- do not read another actor's assessment before submitting a first pass;
- any newly discovered unknown must be appended under `Addenda After Freeze` with source, discovery time, and reason;
- corrections to evidence citations must be recorded as errata without silently changing the question.

The freeze commit and content hash are recorded in `10_LOOP_STATE.md` after publication.

## U-01

UNKNOWN_ID: U-01 FEEDBACK INPUT REALITY

QUESTION: What feedback will users actually provide: text, rating, structured choices, product-level, order-level, or mixed; when after purchase or use; whether consultation text can ever be valid outcome evidence; and what input path exists today?

WHY_IT_MATTERS: The semantic and learning pipeline has no valid source without a real, attributable user input. Treating consultation or inferred behavior as post-use feedback could create false safety, satisfaction, and recommendation-learning claims.

KNOWN_FACTS:
- Current Cosmile Prisma contains a `RecOutcomeFeedback` table shape, but source search found no create service, route, UI, or write call for it.
- Current order detail and order-history UI contain no review, rating, survey, or feedback control.
- Cosmile consultation accepts raw text, but the inspected route is a consultation path and does not link the text to an `OrderItem` feedback record.
- V3-11D gate evidence identifies post-order feedback input as G-D1 and does not authorize implementation.

CURRENT_ASSUMPTIONS:
- Historical V3 documents list review, survey, CS, return reason, consultation follow-up, and behavior as possible signal sources.
- These are option hypotheses, not approved Package 1 product policy or current runtime behavior.

MISSING_EVIDENCE:
- Founder-selected user experience and timing.
- Evidence that users will submit each proposed signal type.
- An approved provenance rule from input to product/order/OrderItem.
- Evidence that consultation text represents post-use outcome rather than pre-purchase intent or unrelated support context.

HOW_TO_RESOLVE:
- Leo/GPT chooses the initial product feedback mode and user-visible timing after reviewing actor options.
- Technical verification confirms whether any additional input path exists and what source identity it can prove.
- A reversible pilot measures completion, signal quality, and selection bias before broad learning use.

RESOLUTION_TYPE:
- EVIDENCE_RESOLVABLE
- EXPERIMENT_REQUIRED
- LEO_PRODUCT_DECISION_REQUIRED

COST_IF_WRONG:
- documentation rework
- runtime rewrite
- cross-repo contract rewrite
- DB migration/backfill
- customer trust damage
- low-value feature investment

SAFE_DEFAULT_BEFORE_RESOLUTION: Do not collect or write semantic feedback. Do not treat consultation text as purchase outcome evidence. Keep V3-11D and feedback-driven learning disabled.

REVERSIBILITY: High before collection begins; medium or low after data, contracts, and learning behavior depend on an input model.

CONFIDENCE: HIGH for current-path absence; LOW for future user behavior and value.

## U-02

UNKNOWN_ID: U-02 SEMANTIC CLASSIFICATION RELIABILITY

QUESTION: Can mixed statements such as "slightly stinging but effective" be represented safely; how multilingual, ambiguous, sarcastic, incomplete, or conflicting inputs are handled; what can be measured before pilot; what cannot; and what safe fallback is required?

WHY_IT_MATTERS: A single optimistic label can suppress an adverse component, reward unsafe recommendations, or create durable incorrect memory. Confidence numbers without calibrated evidence can create false certainty.

KNOWN_FACTS:
- Current `RecOutcomeFeedback.semanticLabel` allows one of ten labels, while adverse severity and certainty are separate nullable fields.
- Current Foundation consultation contract has safety/adverse semantic inputs and safety outputs, but it does not emit the V3-11D feedback tuple `semantic_label`, `adverse_severity`, and `adverse_certainty` as an approved feedback contract.
- foundation-control contains an AI semantic router and deterministic safety gates for consultation, not a calibrated post-order feedback classifier.
- Current tests prove contract enum and safety-gate behavior for fixtures; they do not prove mixed-feedback, sarcasm, multilingual, or real-user calibration.

CURRENT_ASSUMPTIONS:
- A multi-axis representation may be safer than forcing one exclusive label.
- Existing consultation safety logic may offer reusable principles but is not automatically a feedback classification contract.

MISSING_EVIDENCE:
- Labeled multilingual feedback corpus and annotation policy.
- Mixed-signal representation and precedence contract.
- Calibration, inter-rater agreement, false-negative and false-positive costs.
- Safe handling of sarcasm, ambiguity, contradiction, and later correction.
- Proven thresholds for any automatic learning or safety action.

HOW_TO_RESOLVE:
- Foundation Worker identifies current semantic capabilities and contract gaps without creating a contract.
- Define an evaluation corpus and annotation process only after Leo/GPT selects the product input mode.
- Pilot in observation-only mode with explicit unclear/mixed fallback and human escalation for safety-relevant uncertainty.

RESOLUTION_TYPE:
- EVIDENCE_RESOLVABLE
- EXPERIMENT_REQUIRED
- IRREDUCIBLE_BEFORE_LIVE_USE

COST_IF_WRONG:
- runtime rewrite
- cross-repo contract rewrite
- DB migration/backfill
- identity/data corruption
- customer trust damage
- low-value feature investment

SAFE_DEFAULT_BEFORE_RESOLUTION: Preserve adverse and positive dimensions separately; never let a positive clause cancel an adverse signal; map unsupported or conflicting meaning to non-learning `unclear`/review state; allow no automatic durable promotion.

REVERSIBILITY: Medium if labels remain observation-only and versioned; low after they drive ranking, suppression, durable memory, or customer-visible claims.

CONFIDENCE: HIGH that current calibration evidence is insufficient; LOW on achievable production accuracy before a representative pilot.

## U-03

UNKNOWN_ID: U-03 RETENTION / ERASURE / DATA LINEAGE

QUESTION: When feedback is deleted, what must be deleted, blocked, tombstoned, recomputed, or retained across raw text, semantic result, `RecOutcomeFeedback`, `MemoryFactCandidate`, Foundation signal, aggregate statistics, logs, traces, queues, and backups; and which decisions require legal or jurisdiction-specific review?

WHY_IT_MATTERS: Deleting one row while derived memory, signals, logs, or aggregates remain can violate user expectations, policy, or law and can cause deleted information to reappear in future recommendations.

KNOWN_FACTS:
- The approved Commerce Memory design marks retention/erasure as unresolved R-2 and blocks operational use and flag ON until resolved.
- Current `RecOutcomeEvent` and `RecOutcomeFeedback` schema do not encode a complete end-to-end deletion lineage.
- Historical V3 documents propose tombstone, must-not-reappear, and un-learning behavior, but the current approved design does not mark R-2 solved.
- Current Foundation-facing outbox has pending/sent/failed/blocked/skipped states and a source-event pointer, but no inspected end-to-end feedback deletion propagation implementation.

CURRENT_ASSUMPTIONS:
- Non-PII tombstones or reuse blocks may be needed to prevent reappearance.
- Aggregate handling and backup retention may differ from direct user-linked records.
- Exact legal retention periods and erasure obligations cannot be invented from repository evidence.

MISSING_EVIDENCE:
- Data-flow inventory for every derivative and processor.
- Jurisdiction, legal basis, consent purpose, and retention authority.
- Backup/log/queue deletion capabilities and service-level guarantees.
- Aggregate re-computation and model un-learning policy.
- Auditable proof that reuse is blocked after deletion or withdrawal.

HOW_TO_RESOLVE:
- Technical actors produce a lineage inventory and deletion capability matrix.
- Leo/GPT decides product promises and acceptable tombstone/reuse behavior.
- Qualified legal/policy review supplies jurisdiction-specific obligations and periods.
- Future tests prove propagation and no-reappearance behavior end to end.

RESOLUTION_TYPE:
- EVIDENCE_RESOLVABLE
- LEGAL_OR_POLICY_REVIEW_REQUIRED
- LEO_PRODUCT_DECISION_REQUIRED
- IRREDUCIBLE_BEFORE_LIVE_USE

COST_IF_WRONG:
- cross-repo contract rewrite
- DB migration/backfill
- identity/data corruption
- PII/security incident
- customer trust damage

SAFE_DEFAULT_BEFORE_RESOLUTION: No operational feedback persistence, no memory promotion, no Foundation signal expansion, no flag ON, and no customer-facing deletion or retention claim.

REVERSIBILITY: Low after derived records, signals, aggregates, or models proliferate without lineage; high while writes remain disabled.

CONFIDENCE: HIGH that policy and lineage are incomplete; UNKNOWN on legal requirements until jurisdiction and legal basis are identified.

## U-04

UNKNOWN_ID: U-04 GUEST-TO-LOGIN IDENTITY SAFETY

QUESTION: Can anonymous activity be safely associated with a later login; what shared-device and wrong-account risks exist; whether consent is required; whether data should never be re-keyed; and whether additive linking is acceptable or the default must be no linking?

WHY_IT_MATTERS: Incorrect stitching can expose or apply one person's sensitive feedback and safety memory to another person, especially on shared devices.

KNOWN_FACTS:
- Cosmile currently mints separate `subjectRef` and `anonymousRef` values.
- The C2 outcome writer requires exactly one identity source and returns `xor_violation` when both or neither are present.
- Current Prisma includes `SubjectRefMap.allowLink=false`, but no inspected Package 1 runtime policy safely stitches feedback or outcomes after login.
- The approved Commerce Memory design marks guest-to-login stitching/re-keying as unresolved R-3.
- An older data dictionary describes stitching states, but current canonical approval does not treat that policy as resolved or implemented.

CURRENT_ASSUMPTIONS:
- Additive linking may preserve provenance better than destructive re-keying.
- Shared-device risk may make no-linking the safest initial product behavior.
- A login event alone may be insufficient consent for sensitive feedback linkage.

MISSING_EVIDENCE:
- Threat model for shared devices, account switching, device reset, cookie reuse, and household use.
- Product consent language and revocation behavior.
- Proven identity signals and false-link rate.
- Correction/unlink procedure and audit trail.
- Legal/policy basis for linking potentially health-adjacent feedback.

HOW_TO_RESOLVE:
- Cosmile Worker documents actual identity/session mechanics and threat surfaces.
- A dedicated threat/policy review compares no-link, additive-link, and re-key options.
- Leo/GPT chooses the user-facing default after risks are explicit.
- Any later pilot uses reversible linking and tests wrong-account recovery.

RESOLUTION_TYPE:
- EVIDENCE_RESOLVABLE
- LEGAL_OR_POLICY_REVIEW_REQUIRED
- LEO_PRODUCT_DECISION_REQUIRED
- IRREDUCIBLE_BEFORE_LIVE_USE

COST_IF_WRONG:
- runtime rewrite
- DB migration/backfill
- identity/data corruption
- PII/security incident
- customer trust damage

SAFE_DEFAULT_BEFORE_RESOLUTION: Do not stitch, re-key, or infer identity. Keep anonymous and logged-in records separate; ambiguous dual-identity input produces no learning write.

REVERSIBILITY: High with no linking; low after destructive re-keying or memory promotion under the wrong subject.

CONFIDENCE: HIGH that current policy is unresolved; LOW that safe automatic linkage can be proven without a threat model and pilot.

## U-05

UNKNOWN_ID: U-05 RAW-TEXT NON-PERSISTENCE REALITY

QUESTION: Can Foundation process raw feedback without persistence; could content remain in access logs, error logs, traces, queues, retries, debugging dumps, observability systems, crash reports, model-provider systems, or process memory; and how can non-persistence be verified rather than merely claimed?

WHY_IT_MATTERS: A schema field set to `raw_text_stored=false` does not prove that raw text is absent from every transport, infrastructure, provider, log, or failure path.

KNOWN_FACTS:
- Cosmile masks common email and phone formats before sending consultation raw text, but masking is not proof that all PII or sensitive content is removed.
- foundation-control's dev HTTP server disables default request logging and stores only path/status/trace/decision in an in-memory ring.
- The server reads the raw JSON request into memory.
- `/v1/consult_contract` passes raw text into the consultation pipeline; semantic and composer transports can send content to an external model when enabled.
- Repo code does not prove reverse-proxy, platform, provider, observability, queue, retry, crash, or backup retention behavior.
- No live environment or provider settings were accessed in this mission.

CURRENT_ASSUMPTIONS:
- Request-scoped processing with no application DB write is possible.
- End-to-end non-persistence requires infrastructure and provider controls beyond application comments and booleans.

MISSING_EVIDENCE:
- Deployment data-flow and processor inventory.
- Access/error/trace/log configuration and retention evidence.
- Queue/retry/dead-letter behavior.
- Provider data-use and retention settings.
- Crash/core-dump/debug capture policy.
- An auditable verification procedure demonstrating no prohibited raw persistence.

HOW_TO_RESOLVE:
- Foundation Worker maps every repo-local and external persistence surface.
- Security/operations evidence verifies deployment and provider configuration without exposing secrets.
- Tests use synthetic canary content to confirm allowed metadata only, never real customer text.
- Legal/policy review validates processor and retention obligations before live use.

RESOLUTION_TYPE:
- EVIDENCE_RESOLVABLE
- LEGAL_OR_POLICY_REVIEW_REQUIRED
- IRREDUCIBLE_BEFORE_LIVE_USE

COST_IF_WRONG:
- cross-repo contract rewrite
- PII/security incident
- customer trust damage

SAFE_DEFAULT_BEFORE_RESOLUTION: Do not send live customer feedback to Foundation or a model provider. Do not claim raw-text non-persistence. Use synthetic data only in any later approved verification.

REVERSIBILITY: Medium before live data; low after raw text enters uncontrolled logs, providers, queues, or backups.

CONFIDENCE: HIGH that repo-local dev logging is minimized; LOW for end-to-end non-persistence outside inspected code.

## U-06

UNKNOWN_ID: U-06 PRODUCT VALUE / LEARNING VALUE

QUESTION: Will the signal improve recommendations or safety; what selection bias will feedback contain; what KPI would demonstrate value; what pilot size or evidence is required; and what is the stop condition if it does not help?

WHY_IT_MATTERS: A technically correct feedback system can still create biased or low-value learning, increase operational cost, and optimize for vocal users rather than customer outcomes.

KNOWN_FACTS:
- Existing V3 reports propose satisfaction/adverse counts and candidate-learning flows.
- No current feedback input path produces real signal.
- No representative pilot corpus, baseline recommendation metric, uplift result, calibration result, or stop-threshold evidence was found in the inspected sources.
- Current C2 organic purchase outcome cannot be interpreted as recommendation performance.

CURRENT_ASSUMPTIONS:
- Adverse feedback may have safety value even when recommendation uplift is unproven.
- Voluntary post-purchase feedback will be selection-biased.
- A small reversible pilot can measure collection and label quality but may not prove long-term recommendation uplift.

MISSING_EVIDENCE:
- Baseline KPI and causal attribution plan.
- Expected feedback rate and sample composition.
- Selection-bias analysis and missing-not-at-random handling.
- Minimum useful effect and stopping rule.
- Evidence that the learning loop improves outcomes without suppressing safety signals.

HOW_TO_RESOLVE:
- Leo/GPT selects the primary product value hypothesis: safety detection, personalization, recommendation quality, or another outcome.
- Technical actors define instrumentation possibilities without choosing business success thresholds.
- Run an observation-only pilot with predefined KPI, bias reporting, and stop conditions.
- Do not enable automated learning until evidence supports it.

RESOLUTION_TYPE:
- EXPERIMENT_REQUIRED
- LEO_PRODUCT_DECISION_REQUIRED
- IRREDUCIBLE_BEFORE_LIVE_USE

COST_IF_WRONG:
- documentation rework
- runtime rewrite
- low-value feature investment
- customer trust damage

SAFE_DEFAULT_BEFORE_RESOLUTION: No ranking or durable-memory change. Treat collected labels, if later approved, as observation-only; preserve a kill switch and stop if quality, safety, or measurable value is not demonstrated.

REVERSIBILITY: High for an isolated observation-only pilot; low after automated ranking, promotion, or customer-facing claims depend on the signal.

CONFIDENCE: HIGH that value is currently unproven; LOW on effect size or required pilot size.

## U-07

UNKNOWN_ID: U-07 FOUNDATION SIGNAL WHITELIST OWNERSHIP AND VERSIONING

QUESTION: Who canonically owns and approves the Foundation-facing commerce feedback signal whitelist, versioning, compatibility, consent requirements, and expansion authority?

WHY_IT_MATTERS: Without one owner and versioned contract, Cosmile and Foundation can independently change fields or meaning, leak data, or silently interpret the same signal differently.

KNOWN_FACTS:
- The approved Commerce Memory design carries `FOUNDATION_SIGNAL_WHITELIST_CONTRACT_OWNER_GATE` as unresolved R-1.
- Cosmile contains a signal-contract document and a draft mapper that references it.
- The mapper implements a subset of documented signals, assumes logged-in users are consented, writes pending outbox rows, and has no inspected flush worker.
- The approved boundary says raw order/payment/customer data remains in Cosmile and Foundation receives only refined/whitelisted signals.

CURRENT_ASSUMPTIONS:
- Cosmile should own raw-event mapping while Foundation should own acceptance and semantic interpretation constraints.
- The final contract may require joint approval rather than unilateral ownership.

MISSING_EVIDENCE:
- Canonical contract path and decision owner.
- Producer/consumer version compatibility policy.
- Consent and privacy enforcement authority.
- Allowed feedback fields and traceability identifiers.
- Deletion/withdrawal propagation across outbox and consumer.

HOW_TO_RESOLVE:
- Foundation and Cosmile Workers separately document current producer and consumer realities.
- Leo/GPT chooses the canonical ownership/approval model before Control designs the cross-repo contract.
- Future contract tests verify producer/consumer parity and reject unapproved fields.

RESOLUTION_TYPE:
- EVIDENCE_RESOLVABLE
- LEO_PRODUCT_DECISION_REQUIRED

COST_IF_WRONG:
- cross-repo contract rewrite
- runtime rewrite
- PII/security incident
- customer trust damage

SAFE_DEFAULT_BEFORE_RESOLUTION: No Foundation-facing feedback signal expansion and no outbox flush for new Package 1 signals.

REVERSIBILITY: High while expansion is disabled; low after multiple producers/consumers persist incompatible versions.

CONFIDENCE: HIGH that ownership is unresolved and mapper coverage is partial.

## U-08

UNKNOWN_ID: U-08 FEEDBACK PROVENANCE, ORDER-ITEM LINKAGE, AND CONTRACT SHAPE

QUESTION: What evidence proves a feedback item refers to a specific product/order/OrderItem and source event; what should happen when linkage is absent or ambiguous; and which minimum provenance fields are required before `RecOutcomeFeedback` can be trusted?

WHY_IT_MATTERS: A correct semantic label attached to the wrong product or purchase is still corrupt data. Missing provenance prevents correction, deletion, deduplication, and audit.

KNOWN_FACTS:
- Current `RecOutcomeFeedback` schema has `feedbackId`, required `orderItemId`, optional `recommendationId`, semantic/adverse fields, and timestamp.
- Historical V3-04 proposes additional subject, product/SKU, feedback type, signal source, source reference, content hash, score, adverse flag, and raw-text-storage fields.
- No current feedback writer exists to prove how `orderItemId` would be selected or authorized.
- Current consultation path has no inspected deterministic `OrderItem` linkage.
- `RecOutcomeEvent` and `CommerceEvent` provide possible commerce trace anchors, but no approved Package 1 provenance contract connects them to feedback.

CURRENT_ASSUMPTIONS:
- Feedback should be attributable to an explicit line item when the user selects it.
- Ambiguous or unlinked text should not be silently attached through recency or session heuristics.
- Provenance may be additive and versioned without replacing current C2 summary rows.

MISSING_EVIDENCE:
- User-visible selection and authorization flow.
- Source-event and dedup identity.
- Correction and retraction linkage.
- Required product/SKU/order-item cardinality.
- Contract decision on consultation follow-up, CS, survey, and return-reason sources.

HOW_TO_RESOLVE:
- Cosmile Worker maps actual product/order identity surfaces and feasible explicit linkage options.
- Foundation Worker states the minimum non-raw provenance needed for semantic processing and correction.
- Leo/GPT chooses which source types are product features.
- Control may design the contract only after these decisions.

RESOLUTION_TYPE:
- EVIDENCE_RESOLVABLE
- LEO_PRODUCT_DECISION_REQUIRED
- EXPERIMENT_REQUIRED

COST_IF_WRONG:
- runtime rewrite
- cross-repo contract rewrite
- DB migration/backfill
- identity/data corruption
- customer trust damage

SAFE_DEFAULT_BEFORE_RESOLUTION: Do not write `RecOutcomeFeedback`. Reject ambiguous product/order linkage; do not infer an `OrderItem` from recent activity or consultation context.

REVERSIBILITY: High before writes; low after mislabeled feedback propagates to memory or Foundation signals.

CONFIDENCE: HIGH that current provenance implementation is absent and schema is narrower than the historical proposal.

## U-09

UNKNOWN_ID: U-09 SAFETY RESPONSE, LEARNING, AND CORRECTION BOUNDARY

QUESTION: When feedback contains an adverse signal, what immediate safety response is allowed, what learning action is allowed, what must wait for human or repeated evidence, and how is a later correction or contradiction propagated without weakening safety prematurely?

WHY_IT_MATTERS: Immediate user safety and long-term learning have different evidence thresholds. Conflating them can either delay a safety response or permanently encode an uncertain self-report as fact.

KNOWN_FACTS:
- Current consultation architecture uses AI semantic recognition plus deterministic, raise-only safety gates.
- V3 adverse helpers and historical contracts distinguish severity and certainty and treat safety as higher priority than commerce value.
- Current Package 1 feedback input and feedback semantic contract do not exist.
- No current end-to-end correction path from a feedback retraction to `RecOutcomeFeedback`, candidate memory, signals, and reuse was found.

CURRENT_ASSUMPTIONS:
- A reported adverse component may justify conservative immediate guidance without proving causality.
- Durable memory promotion should require stronger evidence than immediate safety caution.
- A later contradiction should not automatically erase a safety block without an explicit resolution rule.

MISSING_EVIDENCE:
- Product-approved immediate user behavior and escalation path.
- Contract separating observed report, semantic proposal, policy decision, and durable learning.
- Human-review ownership and service-level expectations.
- Correction, contradiction, and no-reappearance propagation.
- Calibration evidence for automatic versus manual action.

HOW_TO_RESOLVE:
- Foundation Worker documents current safety authority and feasible structured outputs.
- Cosmile Worker documents user-facing and commerce-side action boundaries.
- Fable5 challenges unsafe optimism and irreversible promotion.
- Leo/GPT decides the product's immediate safety behavior and human-review promise; detailed thresholds remain evidence-driven.

RESOLUTION_TYPE:
- EVIDENCE_RESOLVABLE
- EXPERIMENT_REQUIRED
- LEGAL_OR_POLICY_REVIEW_REQUIRED
- LEO_PRODUCT_DECISION_REQUIRED
- IRREDUCIBLE_BEFORE_LIVE_USE

COST_IF_WRONG:
- runtime rewrite
- cross-repo contract rewrite
- DB migration/backfill
- identity/data corruption
- PII/security incident
- customer trust damage

SAFE_DEFAULT_BEFORE_RESOLUTION: Safety-relevant content may only trigger conservative non-diagnostic guidance and review; it must not automatically produce positive learning, causal claims, permanent memory promotion, or safety downgrade.

REVERSIBILITY: Medium for request-scoped caution; low for durable memory, suppression, or customer-facing causal claims.

CONFIDENCE: HIGH that safety and learning must remain separate; LOW on final product workflow until owner and evidence thresholds are decided.

## Addenda After Freeze

No addenda at initial freeze.
