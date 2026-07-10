# V3 Package 1A Actor Comparison Matrix

Date: 2026-07-10

Status: `DRAFT_PENDING_FABLE5_FOUNDER_PACKAGE_CHALLENGE`

This comparison was created only after all corrected blind assessments passed Advisor revalidation. It preserves disagreements and separates current facts from founder choices, experiments, legal/policy review, and unverified operations.

Evidence inputs:

- frozen register: `V3_PACKAGE1A_UNKNOWN_REGISTER.md` at `fab82c4`;
- Advisor independent assessment;
- Foundation corrected assessment at `9518bc6`;
- Cosmile corrected assessment at `d28307b`;
- Fable5 corrected blind assessment at `99559f7`.

## U-01

UNKNOWN_ID: `U-01 FEEDBACK INPUT REALITY`

ADVISOR_POSITION: Cosmile has a feedback storage skeleton, not a feedback product. Consultation text is not proven outcome evidence and has no approved OrderItem provenance.

FOUNDATION_POSITION: Foundation is consultation-only, has no feedback input/storage target, rejects order/payment identifiers, and cannot attribute consultation text to a purchase. Feedback mode and timing are product decisions followed by experiment.

COSMILE_POSITION: No product/service/route/UI feedback path or writer exists. `RecOutcomeFeedback` is an unreachable schema sink except for test fixtures. Consultation carries no order context. The order-detail line-item surface is a technically natural explicit-link candidate, not an approved product choice.

FABLE5_CHALLENGE: The absolute phrase "zero writes" is too broad because test-harness raw SQL inserts exist. The true current fact is zero product path. Fable5 also identifies unresolved purchased-only scope, refund/cancel eligibility, row cardinality, identity fields, and rollback/deletion hazards in the existing table.

AGREED_FACTS:

- There is no user-facing post-order feedback product path today.
- There is no product runtime writer for `RecOutcomeFeedback`.
- Test-only insert statements do not establish product capability.
- Consultation has no deterministic order/OrderItem linkage and must not be silently treated as outcome evidence.
- Current schema presence is not product approval.

DISAGREEMENTS: No material disagreement on current behavior. Fable5 narrows the wording of "no writes" and treats the under-constrained table as an additional gate; Cosmile identifies a possible UI anchor but does not select it.

CONFLICT_REASON: Evidence-class precision (test fixture versus product path) and different attention to future DDL risk.

MISSING_EVIDENCE: Founder-selected input mode, timing, eligibility, purchased-only rule, refund/cancel handling, user willingness, completion rate, and explicit provenance UX.

CAN_BE_RESOLVED_NOW: Current absence and feasible surfaces are resolved. Product behavior cannot be resolved technically.

REQUIRES_EXPERIMENT: Yes, after a product decision and policy gates.

REQUIRES_EXTERNAL_LEGAL_OR_POLICY_REVIEW: Yes before collecting health-adjacent free text or adverse reports.

SAFE_DEFAULT: Collect nothing; write no `RecOutcomeFeedback`; do not reinterpret consultation as outcome evidence.

COST_IF_WRONG: Product rework, cross-repo contract rewrite, invalid attribution, retention burden, and customer trust damage.

RECOMMENDED_NEXT_STEP: Leo/GPT chooses whether Package 1 has no feedback, structured purchased-item feedback, or a later text-capable mode. Do not design fields/routes before that choice.

LEO_DECISION_REQUIRED: Initial feedback experience, timing, eligible sources, and whether non-purchase/consultation-derived feedback is ever in scope.

CONFIDENCE_BY_ACTOR: Advisor HIGH; Foundation HIGH on absence/LOW on behavior; Cosmile HIGH on absence/LOW on future UX; Fable5 HIGH.

## U-02

UNKNOWN_ID: `U-02 SEMANTIC CLASSIFICATION RELIABILITY`

ADVISOR_POSITION: Existing consultation semantics are components, not a validated feedback classifier. Mixed statements require multi-axis preservation; no confidence threshold is defensible without calibration.

FOUNDATION_POSITION: Foundation has a consultation safety tuple and raise-only safety behavior, but FRC emits no feedback semantic label, adverse certainty, or calibrated confidence. Three incompatible severity/label vocabularies and no corpus/calibration exist.

COSMILE_POSITION: Cosmile can enforce typed/DB labels but may not own semantic judgment. One label plus adverse fields can represent a mixed statement only if an approved precedence/coherence rule exists; none does.

FABLE5_CHALLENGE: The current exclusive label is lossy for mixed statements; `unclear` is not a default; cross-field coherence, provenance, classifier versioning, correction history, and dedup are absent. Green enum tests prove storage vocabulary, not recognition quality.

AGREED_FACTS:

- No post-order feedback classifier, representative corpus, calibration, or inter-rater evidence exists.
- Foundation's current consultation contract does not emit the fields required by V3-11D.
- Cosmile must not finalize semantics locally.
- Current DB CHECK constraints prove only valid stored vocabulary.
- Real mixed, sarcastic, multilingual, incomplete, and conflicting inputs are unverified.

DISAGREEMENTS: Advisor/Foundation see the existing multi-axis safety pattern as a reusable structural precedent. Fable5 emphasizes that the current feedback row remains lossy and incoherent until an explicit new contract and schema rule exist.

CONFLICT_REASON: Structural feasibility is not implementation readiness or measured reliability.

MISSING_EVIDENCE: Input mode, annotation policy, multilingual/mixed corpus, classifier/model version provenance, calibration, false-negative/false-positive costs, correction history, coherence rules, and human-review capacity.

CAN_BE_RESOLVED_NOW: Current capability and gaps are resolved. Reliability and thresholds are not.

REQUIRES_EXPERIMENT: Yes, with a frozen annotation/evaluation protocol after the input decision.

REQUIRES_EXTERNAL_LEGAL_OR_POLICY_REVIEW: Safety failure handling and health-adjacent classification duties require policy review.

SAFE_DEFAULT: No semantic learning writes; preserve adverse and positive axes; uncertainty becomes `unclear`/non-learning; adverse uncertainty may raise caution but may not create causal claims.

COST_IF_WRONG: Unsafe optimistic classification, durable data poisoning, contract/schema rewrite, and trust damage.

RECOMMENDED_NEXT_STEP: Defer classifier/schema design until U-01 is decided. Later require versioned provenance, mixed-signal representation, coherence rules, and calibration evidence.

LEO_DECISION_REQUIRED: Whether initial feedback accepts text at all and whether ambiguous feedback may trigger any user-visible or durable action.

CONFIDENCE_BY_ACTOR: Advisor HIGH on insufficiency; Foundation HIGH on current gap/LOW on achievable accuracy; Cosmile HIGH on storage-only boundary; Fable5 HIGH.

## U-03

UNKNOWN_ID: `U-03 RETENTION / ERASURE / DATA LINEAGE`

ADVISOR_POSITION: R-2 is a hard pre-operational blocker. Technical lineage can be inventoried, but legal periods and backup/provider duties cannot be inferred.

FOUNDATION_POSITION: Foundation has no durable customer store in the inspected application path, but service-side derivatives and external provider copies remain outside Foundation deletion control. Existing shadow deletion behavior is simulation-grade, not end-to-end erasure.

COSMILE_POSITION: The lineage includes RecOutcome tables, CommerceEvent properties, MemoryFactCandidate, outbox rows, consent state, and unmigrated governance overlays. No end-to-end deletion path or consent writer exists.

FABLE5_CHALLENGE: The existing outbox enqueue code is unflagged, stores raw local user IDs, labels consent from user-ID presence, and has a comment-only lifecycle. Actual rows are unverified, but the accumulation path means the safe default cannot be framed only around future flush or RecOutcome flag-ON.

AGREED_FACTS:

- No approved end-to-end retention/erasure/no-reappearance policy exists.
- No verified deletion propagation covers raw input, derived labels, candidates, signals, logs, queues, aggregates, backups, and provider copies.
- Foundation application code is largely stateless, but that does not prove end-to-end non-persistence.
- Outbox transmission has no consumer, yet enqueue behavior and row governance require separate attention.
- Exact legal retention periods cannot be chosen from repository evidence.

DISAGREEMENTS: Cosmile initially treats pending/no-consumer outbox state as highly reversible. Fable5 argues that unflagged construction and possible persistence of raw-ID payloads is already a governance risk. The existence and volume of rows remain unverified.

CONFLICT_REASON: Transmission boundary versus accumulation boundary; code-path fact versus unverified deployed data.

MISSING_EVIDENCE: Deployment data-flow inventory, actual row state, legal jurisdiction, consent purpose, provider terms, log/backup/queue deletion capability, aggregate recomputation, and un-learning/no-reappearance proof.

CAN_BE_RESOLVED_NOW: Repo-local lineage is partially resolved. Legal/operational obligations are not.

REQUIRES_EXPERIMENT: Later synthetic deletion propagation and no-reappearance rehearsal, after policy.

REQUIRES_EXTERNAL_LEGAL_OR_POLICY_REVIEW: Required.

SAFE_DEFAULT: No feedback collection, learning, Foundation signal expansion, or outbox flush. Do not make retention/non-persistence claims. Treat current enqueue governance as a separate prerequisite decision.

COST_IF_WRONG: PII/security incident, failed erasure, identity corruption, regulatory exposure, and customer trust damage.

RECOMMENDED_NEXT_STEP: Founder chooses the high-level deletion promise and whether outbox containment must precede Package 1B; legal/operations review later supplies periods and processor obligations.

LEO_DECISION_REQUIRED: Product promise for deletion/correction/reuse blocking and whether to open a separate outbox-governance design mission before Package 1B.

CONFIDENCE_BY_ACTOR: Advisor HIGH on incompleteness; Foundation HIGH on app code/UNKNOWN legal; Cosmile HIGH on service gaps; Fable5 HIGH on code path/UNKNOWN deployed rows.

## U-04

UNKNOWN_ID: `U-04 GUEST-TO-LOGIN IDENTITY SAFETY`

ADVISOR_POSITION: No linking is the safe memory default until threat analysis and founder policy exist. Data loss from strict XOR is safer than cross-account contamination.

FOUNDATION_POSITION: Foundation has no identity-resolution capability and should remain attribution-blind. A wrong service-side link is invisible to Foundation.

COSMILE_POSITION: Memory-layer stitching is absent, but commerce-level cart/wishlist merge already links guest and user IDs and records both in `cart_merged`. Current auth is a single mock user, so representative shared-device evidence is impossible.

FABLE5_CHALLENGE: `allowLink=false` is dead schema, current identity depends on session state, secret rotation lacks a proven migration path, and no runtime mechanism enforces future consent linking. In-place re-keying would be irreversible without an attribution-change log.

AGREED_FACTS:

- No approved feedback/memory guest-to-login stitching policy exists.
- Foundation cannot safely perform identity resolution.
- Current RecOutcome writer uses strict XOR and drops ambiguous identity writes.
- Safe automatic linking is unproven and shared-device/wrong-account risk is material.
- Real-auth evidence does not exist in the current mock-user environment.

DISAGREEMENTS: The register/Advisor safe default says no linking, while Cosmile proves an existing commerce convenience link already exists. The difference is scope: cart/wishlist merge is current commerce behavior, not approved evidence for feedback or memory linking.

CONFLICT_REASON: "Linking" was used for both commerce convenience and durable feedback/memory attribution.

MISSING_EVIDENCE: Threat model, real-auth transitions, shared-device/account-switch recovery, consent and revocation, unlink/correction audit, secret rotation, account reuse, multi-device fragmentation, and false-link rates.

CAN_BE_RESOLVED_NOW: Existing mechanics and scope conflict are resolved. Safe automated linkage is not.

REQUIRES_EXPERIMENT: Yes, only after real auth and explicit consent design.

REQUIRES_EXTERNAL_LEGAL_OR_POLICY_REVIEW: Required for retroactive linking of sensitive feedback.

SAFE_DEFAULT: Existing cart merge remains commerce-only and must not become a feedback/memory join key. No re-key, stitch, recency inference, or cross-service link; ambiguous identity produces no learning write.

COST_IF_WRONG: Cross-account health-data association, irreversible re-keying, identity corruption, and trust damage.

RECOMMENDED_NEXT_STEP: Founder selects no-linking versus explicit-consent additive linking as a future policy. Do not choose an algorithm now.

LEO_DECISION_REQUIRED: Default feedback identity policy and whether the existing cart-merge link is explicitly excluded from memory/feedback attribution.

CONFIDENCE_BY_ACTOR: Advisor HIGH; Foundation HIGH on non-capability; Cosmile HIGH on mechanics/LOW on real-world safety; Fable5 HIGH.

## U-05

UNKNOWN_ID: `U-05 RAW-TEXT NON-PERSISTENCE REALITY`

ADVISOR_POSITION: Repo code supports only a narrow claim of no intentional application-layer durable consultation-text write. It does not support end-to-end non-persistence.

FOUNDATION_POSITION: Request-scoped processing and minimized application logging are code-backed, but raw text can leave the process through external model calls. Provider, proxy, supervision, crash, backup, and deployment behavior are unverified.

COSMILE_POSITION: Consultation text is not durably written by the inspected Cosmile path, but PII masking is narrow. Generic event ingestion is multi-layer sanitized yet retains a static residual for unlisted prose keys; no actual persistence was observed.

FABLE5_CHALLENGE: `raw_text_stored=false` is a hardcoded self-assertion, not measured evidence. The canonical contract path hardcodes `compose: true`; no policy flag exists, so the only remaining external-call condition is credential availability, which is unverified. The event-path residual is static, not a feedback UX or observed row.

AGREED_FACTS:

- No inspected application path intentionally writes raw consultation text to a service DB/file.
- End-to-end non-persistence is unproven.
- Raw consultation text can reach an external-model transport in code.
- Provider/deployment credential state and retention behavior are unverified.
- Current masking and event sanitization do not prove semantic/health-text removal for every possible input.
- Response invariants are declarations and cannot substitute for storage/egress evidence.

DISAGREEMENTS: The frozen register's phrase "when enabled" implies an operator switch. Fable5/Foundation evidence shows `compose: true` is hardcoded on the contract path and credential availability is the effective remaining condition. Cosmile's initial event-persistence claim was corrected to a static residual only.

CONFLICT_REASON: Procedural enablement language versus actual code gating; application evidence versus provider/operations evidence.

MISSING_EVIDENCE: Provider terms, cross-border/privacy basis, deployment log/trace/proxy/crash policy, credential state, framework behavior, processor inventory, and synthetic canary procedure.

CAN_BE_RESOLVED_NOW: Repo-local surface inventory is substantially resolved. End-to-end proof is not.

REQUIRES_EXPERIMENT: Synthetic canary for approved environments; provider deletion cannot be proven by canary alone.

REQUIRES_EXTERNAL_LEGAL_OR_POLICY_REVIEW: Required for external processing and product claims.

SAFE_DEFAULT: Do not send feedback text to Foundation or an external provider; do not claim non-persistence; require an explicit default-off policy gate before any future text-capable pilot.

COST_IF_WRONG: External disclosure, unrecoverable provider retention, PII/security incident, and trust damage.

RECOMMENDED_NEXT_STEP: Founder decides whether any external provider may process feedback text. Operations/legal evidence and a technical kill switch are later prerequisites if allowed.

LEO_DECISION_REQUIRED: Raw-text/provider acceptance and the user-facing privacy promise.

CONFIDENCE_BY_ACTOR: Advisor HIGH code/LOW end-to-end; Foundation HIGH code/LOW provider; Cosmile HIGH service surface/LOW end-to-end; Fable5 HIGH code/UNKNOWN runtime activation.

## U-06

UNKNOWN_ID: `U-06 PRODUCT VALUE / LEARNING VALUE`

ADVISOR_POSITION: Value cannot be resolved through architecture review. One primary hypothesis, metric ownership, and stop rule must precede any pilot.

FOUNDATION_POSITION: No feedback learning loop exists. Current policy prevents outcome feedback from upgrading evidence or relaxing safety. Value and effect size require experiment.

COSMILE_POSITION: C2 organic purchase outcomes cannot measure recommendation performance. Mock auth prevents a representative pilot; current primitives are insufficient for honest value evidence.

FABLE5_CHALLENGE: An observation-only pilot is not executable yet: there is no feedback kill switch, metric owner, denominator integrity, horizon, abuse model, or retention-safe collection path. Fail-open write loss and selection bias could reward optimistic reporting.

AGREED_FACTS:

- No measured value, baseline, uplift, representative corpus, or pilot result exists.
- Organic C2 outcomes must not be presented as recommendation performance.
- No feedback signal may upgrade Foundation evidence or relax safety under current policy.
- Product value requires an experiment after earlier input/privacy/provenance gates.

DISAGREEMENTS: Advisor/Foundation describe an observation-only pilot as a safe future posture. Fable5 notes that it is not currently executable because its kill switch, metric governance, identity realism, and retention path do not exist.

CONFLICT_REASON: Desired pilot posture versus current operational prerequisites.

MISSING_EVIDENCE: Primary value hypothesis, KPI owner, denominator, horizon, stop rule, expected response rate, selection/abuse bias, human/LLM cost, representative auth, and minimum useful effect.

CAN_BE_RESOLVED_NOW: Absence of evidence and policy envelope are resolved. Product value is not.

REQUIRES_EXPERIMENT: Required, after U-01/U-03/U-05/U-08 and metric-governance prerequisites.

REQUIRES_EXTERNAL_LEGAL_OR_POLICY_REVIEW: Depends on collection mode and incentives.

SAFE_DEFAULT: No collection today. Any later pilot is observation-only, independently measured, time-boxed, kill-switch controlled, and cannot change ranking, memory, or safety.

COST_IF_WRONG: Low-value investment, biased product decisions, accumulated privacy obligations, reward hacking, and trust damage.

RECOMMENDED_NEXT_STEP: Leo selects exactly one primary value hypothesis or holds the feature. Technical actors later define measurable instrumentation, not business success thresholds.

LEO_DECISION_REQUIRED: Primary value hypothesis, acceptable pilot burden, and independent metric/stop-rule ownership.

CONFIDENCE_BY_ACTOR: All actors HIGH that value is unproven; all LOW on effect size and pilot size.

## U-07

UNKNOWN_ID: `U-07 FOUNDATION SIGNAL WHITELIST OWNERSHIP AND VERSIONING`

ADVISOR_POSITION: R-1 is unresolved; producer documentation is not cross-repo authority. No feedback signal expansion or send is safe before ownership and versioning are decided.

FOUNDATION_POSITION: At least three divergent vocabularies coexist. Foundation has acceptance-side validation machinery, while services own raw-event mapping; joint governance is structurally plausible but not approved.

COSMILE_POSITION: The current mapper assumes consent from user-ID presence, has no connected ConsentRecord writer, and has no flush consumer. Its contract document is not an approved cross-repo authority.

FABLE5_CHALLENGE: The mapper is non-conformant with its own candidate contract, enqueue is unconditional in code, raw local user IDs and assumed consent are materialized, and 33 route files reach the commerce event service. Actual rows remain unverified. Absence of a flush worker is a fragile barrier, not complete governance.

AGREED_FACTS:

- Canonical ownership and version approval are unresolved.
- Current Foundation and Cosmile vocabularies diverge.
- Consent is assumed rather than registry-backed in the mapper path.
- No flush worker/consumer was found.
- Existing outbox payload/identifier/consent shape must not be transmitted as an approved contract.

DISAGREEMENTS: Cosmile frames no consumer/pending rows as the current safety boundary. Fable5 argues that unflagged accumulation is itself a material governance risk. Foundation suggests a joint producer/acceptance model but does not claim authority to choose it.

CONFLICT_REASON: Send-time safety versus enqueue-time data governance; architecture inference versus founder authority.

MISSING_EVIDENCE: Current DB row state, canonical contract path, final owner, producer/consumer compatibility policy, consent authority, identifier format, deletion/retraction signal, payload requirements, and queue lifecycle.

CAN_BE_RESOLVED_NOW: Code and vocabulary divergence are resolved. Ownership and containment are decisions.

REQUIRES_EXPERIMENT: No; contract tests follow the decision.

REQUIRES_EXTERNAL_LEGAL_OR_POLICY_REVIEW: Consent and identifier transmission require policy review.

SAFE_DEFAULT: No flush, no feedback signal expansion, no reliance on `user_consented`, and no transmission of current accumulated shape. Treat enqueue containment as an explicit gate.

COST_IF_WRONG: Cross-repo contract drift, raw-identifier disclosure, false consent claims, failed erasure, and irreversible batch transmission.

RECOMMENDED_NEXT_STEP: Leo/GPT designates the governance model and decides whether a separate outbox-containment design gate precedes Package 1B.

LEO_DECISION_REQUIRED: Contract owner/approval model, canonical location, and whether current enqueue must be separately gated or held before Package 1B.

CONFIDENCE_BY_ACTOR: Advisor HIGH unresolved; Foundation HIGH divergence; Cosmile HIGH producer facts; Fable5 HIGH code/UNKNOWN rows.

## U-08

UNKNOWN_ID: `U-08 FEEDBACK PROVENANCE, ORDER-ITEM LINKAGE, AND CONTRACT SHAPE`

ADVISOR_POSITION: Provenance is a prerequisite. Current schema cannot prove authorization, source, deduplication, correction, or trace lineage.

FOUNDATION_POSITION: Purchase linkage must be established service-side. Foundation should receive only product refs and opaque correlation/provenance refs, never order/payment/customer identity.

COSMILE_POSITION: Explicit OrderItem selection is technically feasible from the order-detail surface. Existing trace anchors are available, but the current feedback row has no source/provenance fields.

FABLE5_CHALLENGE: Existing anchors are disjoint; the feedback table has weaker DDL guarantees than sibling tables, no ID format rule, no dedup/uniqueness, no identity XOR, no recommendation FK/check, no event-time, and a RESTRICT/Cascade deletion conflict.

AGREED_FACTS:

- No approved writer or explicit line-item selection flow exists.
- Consultation cannot infer an OrderItem.
- Provenance must be captured at write time and cannot be reconstructed reliably later.
- Foundation must remain order/payment/customer-identity blind.
- Historical V3-04 fields are proposals, not silently importable requirements.

DISAGREEMENTS: Advisor/Cosmile describe additive provenance as feasible. Fable5 emphasizes that the current table is not safe as an interim writer target and may require schema work before any writer. There is no disagreement that current writes must remain disabled.

CONFLICT_REASON: Future additive feasibility versus current DDL readiness.

MISSING_EVIDENCE: Eligible source types, explicit authorization UX, feedback ID/dedup identity, event time, correction/retraction link, cardinality, product/SKU/formula identity, recommendation relationship, and deletion behavior.

CAN_BE_RESOLVED_NOW: Current surface/gap inventory is resolved. Product-supported sources require founder choice; exact schema follows design.

REQUIRES_EXPERIMENT: Explicit-link completion and user comprehension later; basic provenance rules are design work.

REQUIRES_EXTERNAL_LEGAL_OR_POLICY_REVIEW: Primarily through U-03/U-04.

SAFE_DEFAULT: No feedback writes; reject ambiguous linkage; never infer from recency/session; require provenance/identity/dedup constraints before any writer.

COST_IF_WRONG: Wrong-item attribution, unreconstructable data lineage, deletion deadlock, schema migration/backfill, and identity corruption.

RECOMMENDED_NEXT_STEP: Founder selects eligible source types and explicit purchased-item linkage policy. Control may later design the minimum provenance contract only after those choices.

LEO_DECISION_REQUIRED: Which user actions count as feedback, whether explicit line-item selection is mandatory, and whether never-purchased feedback is in scope.

CONFIDENCE_BY_ACTOR: Advisor HIGH; Foundation HIGH boundary; Cosmile HIGH surfaces; Fable5 HIGH DDL gaps.

## U-09

UNKNOWN_ID: `U-09 SAFETY RESPONSE, LEARNING, AND CORRECTION BOUNDARY`

ADVISOR_POSITION: Immediate conservative response and durable learning require different evidence thresholds. Positive meaning must never cancel adverse safety, and correction must be traceable.

FOUNDATION_POSITION: Consultation already implements raise-only request-scoped safety, no-auto-approve learning policy, and hard-off promotion. Missing pieces are feedback contract, review ownership, calibration, and cross-request correction.

COSMILE_POSITION: Consultation suppression and unwired learning-gate helpers provide patterns, not a feedback pipeline. No correction/retraction path exists.

FABLE5_CHALLENGE: Real safety gates protect consultation, not feedback learning. `matrixEffect` is consumer-less; historical unknown-severity handling conflicts (one helper fails up, a dictionary proposal fails down); no authorized writer for `verified`/`contradicted`; current safe defaults compose poorly because no sanctioned adverse-feedback input exists.

AGREED_FACTS:

- No feedback safety/learning/correction pipeline exists.
- Existing Foundation consultation behavior is raise-only and request-scoped.
- Current feedback learning cannot auto-upgrade evidence or relax safety.
- Human-review ownership, correction authority, and cross-request state are absent.
- Positive feedback must not automatically erase or downgrade an adverse state.

DISAGREEMENTS: Foundation sees a structurally useful three-layer precedent. Fable5 warns that none of it currently governs a feedback path and that historical fail-up/fail-down rules conflict. Both are true at different scopes.

CONFLICT_REASON: Consultation safety capability was being read as feedback-learning enforcement.

MISSING_EVIDENCE: Product response for severe reports, duty-to-act policy, human-review owner/SLA, correction authority, privileged certainty transitions, severity translation, conflicting-row precedence, and calibration.

CAN_BE_RESOLVED_NOW: Current authority and absence are resolved. Final workflow and thresholds are not.

REQUIRES_EXPERIMENT: Calibration after a sanctioned input path; authorization and fail-closed direction are design/policy first.

REQUIRES_EXTERNAL_LEGAL_OR_POLICY_REVIEW: Required for severe adverse handling and review obligations.

SAFE_DEFAULT: No feedback learning or durable promotion. Existing consultation may provide conservative non-diagnostic guidance; any future adverse feedback can only raise caution, never establish causality or automatically downgrade safety. No unstaffed review promise.

COST_IF_WRONG: Missed safety escalation, false causal claims, silent safety downgrade, durable memory corruption, and customer harm/trust damage.

RECOMMENDED_NEXT_STEP: Founder decides the minimum user-visible response and human-review promise before Control designs a feedback safety contract.

LEO_DECISION_REQUIRED: Immediate behavior for adverse reports, whether any automatic durable action is allowed, who may verify/contradict, and whether a human-review service is promised.

CONFIDENCE_BY_ACTOR: Advisor HIGH principle/LOW workflow; Foundation HIGH current authority/LOW workflow; Cosmile HIGH boundaries/LOW generalization; Fable5 HIGH gaps.

## Post-Freeze Addenda

The frozen register remains unchanged. Addenda are carried into the founder package as follows:

| Addendum | Source | Reason | Disposition |
|---|---|---|---|
| A-C1 Existing cart/wishlist guest-login merge | Cosmile | U-04 assumed linking was future-only | Fold into U-04; commerce link is not feedback consent |
| A-C2 Mock single-user auth | Cosmile | Current pilot cannot produce representative identity evidence | Fold into U-04/U-06 prerequisite |
| A-C3 Generic event unlisted-key prose residual | Cosmile/Fable5 | Raw-text lineage must cover denylist residual | Fold into U-03/U-05; static path only |
| ADD-01 Feedback authenticity/poisoning | Fable5 | U-06/U-09 omitted adversarial feedback | Carry as pilot and safety design requirement |
| ADD-02 Sensitive populations | Fable5 | Pregnancy/minor/medical boundaries omitted | Carry to legal/safety review |
| ADD-04 Classifier/provider version drift | Fable5 | U-02 omitted reproducibility | Carry as semantic contract requirement |
| ADD-05 Human-review operations | Fable5 | Safe defaults referenced a nonexistent queue | Carry to U-09 founder decision |
| ADD-06 Dependency ordering | Fable5 | Parallel decisions could assume different input modes | Adopt ordering below |
| ADD-07 Historical-doc status ambiguity | Fable5 | Old docs could be read as implementation approval | Carry as pre-Package1B documentation-hygiene gate, not a product decision |
| ADD-08 Outbox enqueue governance | Fable5 | No-flush framing omitted accumulation governance | Elevate into U-03/U-07 founder decision |
| ADD-09 Metric governance/anti-Goodhart owner | Fable5 | Pilot evidence could be gamed | Carry into U-06 prerequisite |
| Foundation evidence-freshness note | Foundation | Shared-memory eval predates current code/policy | Require re-run only if later design relies on that evidence |

## Dependency Order Preserved

1. U-01 product input and timing.
2. U-08 provenance plus U-04 identity policy.
3. U-03 retention and U-05 raw-text/provider boundary.
4. U-07 contract and outbox governance.
5. U-09 safety, correction, and human-review boundary.
6. U-06 pilot/value experiment after all prior prerequisites.

No Package 1B design or implementation is authorized by this matrix.
