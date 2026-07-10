# V3 Package 1B Design Question Register

Date: 2026-07-11

Status: `FROZEN_FOR_CONTROL_FIRST_PASS`

Freeze rule: this file is frozen by its first published foundation-docs commit. Control and validators must answer it without silently changing questions. A later material question must be recorded as an addendum with source, reason, safe default, blocked section, and authority owner.

Mission: `V3_PACKAGE1B_DATA_GOVERNANCE_FEEDBACK_CANONICAL_MASTER_DESIGN`

Scope: design questions only. This register does not approve implementation, runtime/schema/API changes, DB access, feedback collection, signal use, a pilot, or operational release.

## Q-01 - Initial Feedback Scope Invariants

- **QUESTION_ID:** `P1B-Q01`
- **Related U-ID/addendum:** U-01, U-02, U-05, ADD-02.
- **Current fact:** D1-B and D3-A require explicit purchased-line-item structured input, separate positive/adverse axes, no free text, no consultation outcome, and no Foundation/provider semantic path.
- **Design question:** How will every candidate design layer mechanically preserve these boundaries without introducing a hidden text or inferred-provenance path?
- **Answer already founder-decided:** Yes; D1-B and D3-A.
- **Technical evidence can decide:** Control can define exact invariants and test obligations.
- **Leo/GPT decision required:** No for this candidate; any expansion is a separate decision.
- **Legal/policy review required:** Only for later collection/eligibility, not to encode the no-collection/no-text boundary.
- **Experiment evidence required:** No for the invariant; yes before later pilot UX claims.
- **Safe default:** No route, writer, or collection until reviewed implementation authorization.
- **Blocked capability:** Any design containing free text, consultation derivation, implicit OrderItem, or semantic dependency.
- **Cost if wrong:** Product-policy drift, privacy scope expansion, cross-repo rewrite.
- **Source paths:** V3 founder ledger D1/D3; acceptance scenario 1; Cosmile schema and order page.
- **Resolution owner:** Control technical design, then repo validation and Fable5 review.
- **Current state:** `TECHNICAL_DESIGN_REQUIRED`.

## Q-02 - Structured Axis Contract Without Inventing Product Policy

- **QUESTION_ID:** `P1B-Q02`
- **Related U-ID/addendum:** U-01, U-02, U-09.
- **Current fact:** Founder approved separate satisfaction/positive and adverse/discomfort axes but did not approve exact wording, scale, threshold, or classifier vocabulary.
- **Design question:** What minimal versioned technical representation preserves independent axes and explicit uncertainty without choosing user-facing wording or semantic thresholds?
- **Answer already founder-decided:** The two-axis boundary is decided; exact options are not.
- **Technical evidence can decide:** Technical field separation, nullability, versioning, and invariants; not product wording.
- **Leo/GPT decision required:** Only if Control believes exact user-facing scale is required now; otherwise defer.
- **Legal/policy review required:** Sensitive/adverse eligibility and response language remain gated.
- **Experiment evidence required:** User comprehension and scale usefulness require later experiment.
- **Safe default:** Candidate technical axes only; no optimistic collapse and no positive cancellation of adverse.
- **Blocked capability:** Final UX copy, scoring thresholds, semantic labels, or automation.
- **Cost if wrong:** Historical reinterpretation, unsafe optimistic aggregation, schema rewrite.
- **Source paths:** Founder ledger D1; acceptance scenario 1; canonical extension roadmap.
- **Resolution owner:** Control for technical representation; Leo/GPT and later pilot for product expression.
- **Current state:** `TECHNICAL_DESIGN_REQUIRED`.

## Q-03 - Timing, Eligibility, Refund, Cancel, And Sensitive-Population Boundary

- **QUESTION_ID:** `P1B-Q03`
- **Related U-ID/addendum:** U-01, U-03, ADD-02.
- **Current fact:** Exact timing, eligible order states, refund/cancel handling, and sensitive-population rules are explicitly unresolved.
- **Design question:** How can the design expose a fail-closed eligibility policy hook and state model without choosing exact policy values?
- **Answer already founder-decided:** No exact policy; only explicit purchased-item scope.
- **Technical evidence can decide:** Required state inputs, fail-closed evaluation point, audit reason, and extension interface.
- **Leo/GPT decision required:** Before implementation if a concrete eligibility rule is required.
- **Legal/policy review required:** Yes for sensitive populations and possibly refund/cancel/retention implications.
- **Experiment evidence required:** Timing/completion behavior later.
- **Safe default:** Ineligible/unknown/refunded/cancelled/sensitive-policy-unknown cases produce no feedback write.
- **Blocked capability:** Executable feedback collection and final eligibility UI.
- **Cost if wrong:** Invalid data, unsafe collection, legal exposure, migration/retraction burden.
- **Source paths:** U-01; ADD-02; founder decision D1; `Order.status` in Cosmile schema.
- **Resolution owner:** Control designs hook; legal/product authority supplies values later.
- **Current state:** `DEFERRED_BUT_DESIGNED_FOR`.

## Q-04 - Explicit Purchased-Item Authorization And Provenance

- **QUESTION_ID:** `P1B-Q04`
- **Related U-ID/addendum:** U-01, U-04, U-08, A-C2.
- **Current fact:** Owner-checked order detail exposes OrderItem rows, but no feedback writer proves explicit selection, authorization, source, or creation-time identity.
- **Design question:** What creation-time provenance and authorization snapshot is required to prove the user selected an eligible purchased line item under the original identity context?
- **Answer already founder-decided:** Explicit selection and no inferred provenance are decided.
- **Technical evidence can decide:** Contract fields, authorization gate, source snapshot, trace/version, and failure states.
- **Leo/GPT decision required:** No unless a non-purchased source is proposed.
- **Legal/policy review required:** Identity and retention implications remain gated.
- **Experiment evidence required:** User comprehension/completion later.
- **Safe default:** Missing or ambiguous owner/item evidence causes no write.
- **Blocked capability:** Feedback writer, correction, deletion, or pilot without provenance.
- **Cost if wrong:** Wrong-item/wrong-account association and unreconstructable lineage.
- **Source paths:** Cosmile `Order`/`OrderItem`, order API/page, shopper owner checks; U-08.
- **Resolution owner:** Control, validated by Cosmile Worker.
- **Current state:** `TECHNICAL_DESIGN_REQUIRED`.

## Q-05 - Current RecOutcomeFeedback Table Disposition

- **QUESTION_ID:** `P1B-Q05`
- **Related U-ID/addendum:** U-02, U-03, U-08, U-09.
- **Current fact:** `RecOutcomeFeedback` is an unwired semantic sink with no identity, authorization provenance, source/version, dedup, correction, erasure, quarantine, or supersession fields.
- **Design question:** Should the future design replace, add alongside, or strictly constrain this table, and how will existing historical meaning remain explicit without authorizing migration?
- **Answer already founder-decided:** No; schema mechanics are technical, while structured/no-semantic scope is fixed.
- **Technical evidence can decide:** Candidate table responsibilities and migration strategy options.
- **Leo/GPT decision required:** Only if a destructive strategy or business-meaning change is proposed.
- **Legal/policy review required:** Retention/erasure behavior.
- **Experiment evidence required:** No for schema design.
- **Safe default:** Current table remains unwritten and is not treated as an approved initial contract.
- **Blocked capability:** Any Writer using current fields as sufficient proof.
- **Cost if wrong:** Destructive migration, historical reinterpretation, failed deletion, safety ambiguity.
- **Source paths:** Cosmile `schema.prisma:862-870`, V3-11B migration, Package 1A U-08/U-09.
- **Resolution owner:** Control candidate; Cosmile validation; Leo/GPT if destructive.
- **Current state:** `TECHNICAL_DESIGN_REQUIRED`.

## Q-06 - Identity Preservation And No-Link Enforcement

- **QUESTION_ID:** `P1B-Q06`
- **Related U-ID/addendum:** U-04, A-C1, A-C2.
- **Current fact:** D2-A forbids feedback/memory stitching and re-keying; current commerce cart/wishlist merge exists but is not consent; auth is mock.
- **Design question:** How will records preserve original identity context, reject ambiguous identity, and prevent cart-merge or later login from rewriting feedback identity?
- **Answer already founder-decided:** Yes; D2-A.
- **Technical evidence can decide:** XOR/no-link constraints, immutable origin snapshot, blocked ambiguity, and future additive-link seam.
- **Leo/GPT decision required:** No for no-link; yes before any future D2-B.
- **Legal/policy review required:** Future linking only.
- **Experiment evidence required:** Real-auth/shared-device evidence before D2-B or representative pilot.
- **Safe default:** No link, no re-key, no recency inference, no learning write on ambiguity.
- **Blocked capability:** Cross-session/account continuity and identity-based pilot claims.
- **Cost if wrong:** Cross-account sensitive-data association and identity corruption.
- **Source paths:** Founder ledger D2; shopper/mock user/mergeGuest code; scenario 3.
- **Resolution owner:** Control design; Cosmile validation.
- **Current state:** `TECHNICAL_DESIGN_REQUIRED`.

## Q-07 - Idempotency, Cardinality, Replay, And Quarantine

- **QUESTION_ID:** `P1B-Q07`
- **Related U-ID/addendum:** U-08, ADD-01.
- **Current fact:** No feedback idempotency/cardinality/replay/quarantine contract exists. RecOutcomeEvent order-item uniqueness is a different purchase-summary invariant.
- **Design question:** What creation key, submission cardinality, duplicate/replay behavior, quarantine state, and concurrency invariant apply to structured feedback without copying RecOutcomeEvent semantics blindly?
- **Answer already founder-decided:** Abuse must not create certainty or action; exact feedback cardinality is not decided.
- **Technical evidence can decide:** Candidate idempotency and replay model if it preserves correction/supersession.
- **Leo/GPT decision required:** If cardinality changes product behavior beyond technical duplicate control.
- **Legal/policy review required:** Retained abuse evidence and deletion interaction.
- **Experiment evidence required:** Abuse rates later.
- **Safe default:** Duplicate/ambiguous submissions do not create additional learning influence and remain non-operational.
- **Blocked capability:** Writer, aggregation, pilot, or safety action without replay control.
- **Cost if wrong:** Poisoning, double counting, user confusion, DB migration.
- **Source paths:** ADD-01; scenario 8; RecOutcomeEvent D-O1 as a non-transferable precedent.
- **Resolution owner:** Control; Cosmile validation.
- **Current state:** `TECHNICAL_DESIGN_REQUIRED`.

## Q-08 - Correction, Retraction, And Versioned Supersession

- **QUESTION_ID:** `P1B-Q08`
- **Related U-ID/addendum:** U-03, U-08, U-09, ADD-04.
- **Current fact:** No feedback correction/retraction path exists; founder acceptance requires versioned supersession and forbids silent overwrite or automatic safety downgrade.
- **Design question:** What append/supersede lifecycle, actor authority, reason, version, affected-state linkage, and replay behavior preserve audit history?
- **Answer already founder-decided:** Append/supersede and no safety downgrade are decided.
- **Technical evidence can decide:** Candidate state machine and linkage.
- **Leo/GPT decision required:** Privileged safety-lowering authority remains future gated.
- **Legal/policy review required:** Erasure versus audit-history treatment.
- **Experiment evidence required:** Classifier correction later only.
- **Safe default:** Stop reuse; append correction; never lower safety automatically.
- **Blocked capability:** In-place update, privileged verified/contradicted transitions, bulk relabeling.
- **Cost if wrong:** Erased provenance, unsafe downgrade, irrecoverable derived state.
- **Source paths:** Scenario 6; extension roadmap correction/supersession; U-09.
- **Resolution owner:** Control designs lifecycle; Foundation/Cosmile validators check authority and feasibility.
- **Current state:** `TECHNICAL_DESIGN_REQUIRED`.

## Q-09 - Full Data Lineage And Ownership Inventory

- **QUESTION_ID:** `P1B-Q09`
- **Related U-ID/addendum:** U-03, U-05, U-07, U-08, A-C3, ADD-08.
- **Current fact:** No complete lineage spans structured input, derived state, candidate, signal, outbox, aggregate, queues/logs/providers/backups. Raw commerce remains Cosmile-owned.
- **Design question:** What lineage graph, ownership boundary, source pointer, contract version, and derived-state dependency must exist before any write?
- **Answer already founder-decided:** Cosmile owns raw commerce; Foundation receives only approved refined/whitelisted signals.
- **Technical evidence can decide:** Candidate lineage nodes and trace relations.
- **Leo/GPT decision required:** No for inventory; later for signal/retention policy.
- **Legal/policy review required:** Processor, log, backup, aggregate, tombstone obligations.
- **Experiment evidence required:** Synthetic deletion/no-reappearance rehearsal later.
- **Safe default:** Tranche A remains Cosmile-local and creates no Foundation signal dependency.
- **Blocked capability:** Operational collection, deletion claim, signal use, durable learning.
- **Cost if wrong:** Failed erasure, orphaned derivatives, raw-data ownership transfer.
- **Source paths:** U-03/U-07; Cosmile schema/outbox mapper; Foundation shared-memory shadow code.
- **Resolution owner:** Control design; both repo validators.
- **Current state:** `TECHNICAL_DESIGN_REQUIRED`.

## Q-10 - Retention, Erasure, Consent Withdrawal, And No-Reappearance Hooks

- **QUESTION_ID:** `P1B-Q10`
- **Related U-ID/addendum:** U-03, ADD-02, ADD-05.
- **Current fact:** U-03 is `LEGAL_POLICY_HOLD`; exact periods and processor/legal duties are unknown.
- **Design question:** Which policy hooks, lifecycle states, deletion propagation interfaces, tombstone/reuse-block boundaries, and proof obligations can be designed without inventing periods or legal conclusions?
- **Answer already founder-decided:** User-linkable raw/derived feedback must be correctable/erasable/reuse-controlled under approved policy.
- **Technical evidence can decide:** Hook locations, dependency graph, fail-closed unknown-policy state, test interfaces.
- **Leo/GPT decision required:** Future product promise and exceptions.
- **Legal/policy review required:** Yes; exact periods and obligations.
- **Experiment evidence required:** Synthetic propagation/no-reappearance rehearsal after policy.
- **Safe default:** Unknown policy means no collection/write/use; no full-erasure claim.
- **Blocked capability:** Implementation, customer retention claim, pilot, operational use.
- **Cost if wrong:** Regulatory exposure, failed erasure, customer trust damage.
- **Source paths:** U-03; scenario 2; retention gate.
- **Resolution owner:** Control designs hooks; legal/policy and Leo/GPT later provide policy.
- **Current state:** `LEGAL_POLICY_HOLD`.

## Q-11 - Structured Adverse Safety Behavior

- **QUESTION_ID:** `P1B-Q11`
- **Related U-ID/addendum:** U-02, U-09, ADD-02, ADD-05.
- **Current fact:** Structured adverse input is approved as a separate axis, but no feedback safety pipeline, duty, calibration, human owner, or correction authority exists. Consultation safety is precedent only.
- **Design question:** What deterministic request-scoped fail-safe behavior can acknowledge discomfort conservatively, avoid diagnosis/causality, keep positive input from cancelling adverse input, and avoid durable privileged transitions?
- **Answer already founder-decided:** Observation-only, no safety downgrade, no causality, no unstaffed review promise.
- **Technical evidence can decide:** Candidate fail-safe states, blocked actions, and no-write/no-promotion invariants.
- **Leo/GPT decision required:** Any stronger automatic or customer-service promise.
- **Legal/policy review required:** Severe response, sensitive population, duty to act, exact language.
- **Experiment evidence required:** Calibration and false-positive/negative behavior later.
- **Safe default:** Conservative non-diagnostic acknowledgement; no product-level action or durable safety state.
- **Blocked capability:** Automated safety classification/action, verified/contradicted transitions, product blocking.
- **Cost if wrong:** Customer harm, false causal claims, hidden safety downgrade.
- **Source paths:** U-09; scenarios 1/4/6/8; Foundation consultation contracts as non-binding precedent.
- **Resolution owner:** Control boundary design; Foundation validation; legal/safety and Leo/GPT later.
- **Current state:** `LEGAL_POLICY_HOLD`.

## Q-12 - Human Review Unavailable Behavior

- **QUESTION_ID:** `P1B-Q12`
- **Related U-ID/addendum:** U-09, ADD-05.
- **Current fact:** No queue, owner, SLA, staffing, or privileged review authority exists.
- **Design question:** How does the system remain safe when review is absent, and which transitions remain impossible until an operations gate exists?
- **Answer already founder-decided:** No unstaffed review promise and no automatic action that assumes review.
- **Technical evidence can decide:** Unavailable state, queue-disabled behavior, and prohibited transitions.
- **Leo/GPT decision required:** Before promising human review or staffing.
- **Legal/policy review required:** Duty and escalation.
- **Experiment evidence required:** Operational rehearsal later.
- **Safe default:** No queue promise; request-scoped conservative response only; no privileged state.
- **Blocked capability:** Human review, SLA, verified/contradicted transition, safety-lowering correction.
- **Cost if wrong:** Unhandled reports and false service promise.
- **Source paths:** ADD-05; founder acceptance scenarios 1/4/6/8.
- **Resolution owner:** Control designs disabled mode; operations/Leo/GPT later.
- **Current state:** `DEFERRED_BUT_DESIGNED_FOR`.

## Q-13 - Abuse, Replay, And Poisoning Containment

- **QUESTION_ID:** `P1B-Q13`
- **Related U-ID/addendum:** U-06, U-09, ADD-01, ADD-09.
- **Current fact:** No approved abuse model, rate limit, dedup policy, quarantine authority, aggregate inclusion rule, or anti-Goodhart owner exists.
- **Design question:** What quarantine and influence-separation interfaces must exist so volume cannot alter certainty, safety, ranking, memory, or product action?
- **Answer already founder-decided:** Scenario 8 boundaries are decided.
- **Technical evidence can decide:** Candidate quarantine/replay states and proof tests.
- **Leo/GPT decision required:** Any release-from-quarantine or product-action authority.
- **Legal/policy review required:** Retention of abuse evidence.
- **Experiment evidence required:** Real abuse rates and effectiveness later.
- **Safe default:** Suspect/duplicate/ineligible reports have zero automatic influence.
- **Blocked capability:** Pilot, aggregation, ranking, durable learning, product safety action.
- **Cost if wrong:** Poisoning, competitor abuse, false product action.
- **Source paths:** ADD-01; scenario 8.
- **Resolution owner:** Control design; Cosmile and Foundation validation.
- **Current state:** `TECHNICAL_DESIGN_REQUIRED`.

## Q-14 - Foundation-Free Initial Tranche

- **QUESTION_ID:** `P1B-Q14`
- **Related U-ID/addendum:** U-02, U-05, U-07, ADD-04, ADD-08.
- **Current fact:** D3-A forbids initial Foundation/provider semantic processing, and D5-ii blocks signal reliance. Foundation has no feedback API; existing SSC/FRC is consultation-specific.
- **Design question:** How will Tranche A remain fully functional as a Cosmile-local structured core with no Foundation call, signal dependency, outbox flush, or semantic contract reinterpretation?
- **Answer already founder-decided:** Yes; D3-A and D5-ii.
- **Technical evidence can decide:** Module boundary and testable dependency prohibition.
- **Leo/GPT decision required:** No unless initial Foundation use is proposed.
- **Legal/policy review required:** Not for preserving no-dependency.
- **Experiment evidence required:** No.
- **Safe default:** Foundation unavailable is irrelevant to Tranche A recording; no signal created for feedback.
- **Blocked capability:** Any initial semantic call, provider call, Foundation memory write, or signal transmission.
- **Cost if wrong:** Cross-repo coupling, raw-data transfer, unreviewed semantics.
- **Source paths:** Founder ledger D3/D5-ii; Foundation Core and shared-memory code; foundation-control SSC/FRC.
- **Resolution owner:** Control; both validators.
- **Current state:** `TECHNICAL_DESIGN_REQUIRED`.

## Q-15 - Raw Commerce Ownership And Minimized Future References

- **QUESTION_ID:** `P1B-Q15`
- **Related U-ID/addendum:** U-03, U-07, U-08, ADD-08.
- **Current fact:** D5-i keeps raw commerce/provenance/producer mapping in Cosmile and semantic acceptance authority in Foundation; Foundation must not own order/payment/customer identity.
- **Design question:** Which non-sensitive versioned pointers may cross later, and which raw fields are permanently prohibited?
- **Answer already founder-decided:** Ownership split is decided; exact future contract is not.
- **Technical evidence can decide:** Candidate allowlist categories and traceability shape, marked future-only.
- **Leo/GPT decision required:** Before approving the actual shared contract.
- **Legal/policy review required:** Consent/identifier transmission.
- **Experiment evidence required:** No.
- **Safe default:** No cross-repo feedback signal in initial scope.
- **Blocked capability:** Foundation signal or raw-data transfer.
- **Cost if wrong:** Raw identity/order disclosure and authority drift.
- **Source paths:** D5-i; active Commerce Memory design; ingress gate order/identifier rejects.
- **Resolution owner:** Control candidate, joint Foundation/Cosmile validation, Leo/GPT later.
- **Current state:** `DEFERRED_BUT_DESIGNED_FOR`.

## Q-16 - Outbox Containment And Tranche Separation

- **QUESTION_ID:** `P1B-Q16`
- **Related U-ID/addendum:** U-03, U-07, ADD-08.
- **Current fact:** Current commerce-event service invokes the outbox mapper; mapped events create pending rows using assumed consent and local identifiers. No consumer does not make this approved.
- **Design question:** How are Tranche A local feedback, Tranche B containment-only work, and Tranche C future signal contract kept technically and procedurally separate so D5-i cannot waive D5-ii?
- **Answer already founder-decided:** D5-i-A and D5-ii-A.
- **Technical evidence can decide:** Candidate no-signal boundary, tranche entry criteria, no-send tests, and future contract seam.
- **Leo/GPT decision required:** Separate approval before B implementation or C contract/transmission.
- **Legal/policy review required:** Consent/identifier/lifecycle/deletion.
- **Experiment evidence required:** No.
- **Safe default:** No flush, no feedback signal enqueue, no reliance on consumer absence.
- **Blocked capability:** Foundation signal reliance, outbox consumer, flush, current-shape transmission.
- **Cost if wrong:** Irreversible batch transmission, false consent, failed erasure.
- **Source paths:** FoundationSignalOutbox schema; mapper/service; U-07/ADD-08.
- **Resolution owner:** Control design; both validators; Leo/GPT later.
- **Current state:** `TECHNICAL_DESIGN_REQUIRED`.

## Q-17 - Generic CommerceEvent Path Reuse Boundary

- **QUESTION_ID:** `P1B-Q17`
- **Related U-ID/addendum:** U-03, U-05, U-07, A-C3, ADD-08.
- **Current fact:** Generic `trackCommerceEvent` sanitizes but then calls the outbox mapper; unlisted-key prose residual remains; no approved feedback event type exists.
- **Design question:** Must initial feedback use a dedicated storage/event boundary rather than generic CommerceEvent, and what explicit prohibition prevents accidental outbox enqueue or prose leakage?
- **Answer already founder-decided:** No feedback text or signal use; exact internal event mechanism is technical.
- **Technical evidence can decide:** Dedicated/no-enqueue boundary and allowlist tests.
- **Leo/GPT decision required:** No unless current event path is proposed despite containment risk.
- **Legal/policy review required:** Lineage/retention.
- **Experiment evidence required:** No.
- **Safe default:** Do not treat generic CommerceEvent as an approved feedback writer or signal contract.
- **Blocked capability:** Generic event-based feedback persistence or outbox coupling.
- **Cost if wrong:** Hidden signal enqueue, prose leakage, lineage ambiguity.
- **Source paths:** `commerceEventService.ts`, `foundationSignalMapper.ts`, `piiPolicy.ts`, A-C3.
- **Resolution owner:** Control; Cosmile validation.
- **Current state:** `TECHNICAL_DESIGN_REQUIRED`.

## Q-18 - Creation-Time Versioning, Provenance, And Historical Meaning

- **QUESTION_ID:** `P1B-Q18`
- **Related U-ID/addendum:** U-02, U-08, ADD-04, ADD-07, FOUNDATION-EVIDENCE-FRESHNESS.
- **Current fact:** Current feedback sink lacks contract/source/classifier versions and historical reports contain stale or superseded meanings.
- **Design question:** Which creation-time contract, question-set, policy, provenance, and optional future classifier versions must be immutable and auditable?
- **Answer already founder-decided:** Historical records must not be silently reinterpreted.
- **Technical evidence can decide:** Version fields and compatibility rules.
- **Leo/GPT decision required:** Only for future semantic/product-policy version changes.
- **Legal/policy review required:** Retention interaction.
- **Experiment evidence required:** Classifier versions later.
- **Safe default:** Unknown/missing version is non-learning and not reclassified in place.
- **Blocked capability:** Historical relabeling, classifier replay, cross-version aggregation without rule.
- **Cost if wrong:** Untraceable drift, false evidence, destructive migration.
- **Source paths:** Extension roadmap; ADD-04/ADD-07; existing schema/type mismatch.
- **Resolution owner:** Control; both validators.
- **Current state:** `TECHNICAL_DESIGN_REQUIRED`.

## Q-19 - Failure, Disable, Rollback, And Recovery

- **QUESTION_ID:** `P1B-Q19`
- **Related U-ID/addendum:** U-01, U-03, U-08, U-09, ADD-01.
- **Current fact:** No feedback feature or kill switch exists. Future failures include invalid provenance, duplicate/replay, identity ambiguity, deletion/correction, unavailable downstream, and future raw-text leakage.
- **Design question:** What disabled behavior, fail-open/fail-closed split, kill-switch scope, rollback evidence, and derived-state recovery are required per failure?
- **Answer already founder-decided:** Observation only; no automatic promotion/ranking/safety downgrade; no initial downstream dependency.
- **Technical evidence can decide:** Candidate failure matrix and proof requirements.
- **Leo/GPT decision required:** Before operational action or destructive rollback.
- **Legal/policy review required:** Incident/deletion behavior.
- **Experiment evidence required:** Synthetic rehearsal later.
- **Safe default:** Disable collection/write; preserve commerce/order flow; no derived influence.
- **Blocked capability:** Implementation and pilot without tested disable/recovery.
- **Cost if wrong:** Checkout impact, stranded data, failed deletion, unsafe restart.
- **Source paths:** Scenarios 2-6; D4; existing RecOutcome fail-open only as limited precedent.
- **Resolution owner:** Control; repo validators.
- **Current state:** `TECHNICAL_DESIGN_REQUIRED`.

## Q-20 - Pilot Metric And Operational Boundary

- **QUESTION_ID:** `P1B-Q20`
- **Related U-ID/addendum:** U-06, A-C2, ADD-01, ADD-09.
- **Current fact:** No representative auth, metric owner, denominator, horizon, stop rule, abuse control, completeness evidence, or pilot result exists.
- **Design question:** Which mandatory interfaces and release gates must the design reserve without selecting KPI thresholds or authorizing collection?
- **Answer already founder-decided:** Primary hypothesis is post-purchase satisfaction/service UX; observation only.
- **Technical evidence can decide:** Instrumentation boundaries, kill-switch requirement, evidence package contract.
- **Leo/GPT decision required:** Metric owner, final metric definition, thresholds, pilot authorization.
- **Legal/policy review required:** Collection/retention/incentive policy.
- **Experiment evidence required:** Yes; U-06 remains unresolved.
- **Safe default:** No pilot and no recommendation-uplift claim.
- **Blocked capability:** Pilot, operational expansion, ranking/memory use.
- **Cost if wrong:** Goodhart effects, biased conclusions, low-value investment.
- **Source paths:** D4; U-06; scenario 7; ADD-09.
- **Resolution owner:** Control reserves gates; Leo/GPT/metric owner and future experiment resolve.
- **Current state:** `EXPERIMENT_REQUIRED`.

## Q-21 - Deferred Text, Semantic, Multilingual, And Provider Extensions

- **QUESTION_ID:** `P1B-Q21`
- **Related U-ID/addendum:** U-02, U-03, U-05, ADD-03, ADD-04.
- **Current fact:** Text/provider/semantic processing is not approved; current consultation SSC/FRC and Foundation CDM are not feedback contracts.
- **Design question:** What additive seams preserve future D3-B, multilingual/mixed semantics, provider isolation, versioned correction, and raw-text incident handling without contaminating initial structured records?
- **Answer already founder-decided:** Initial no-text/no-provider; future D3-B separately gated.
- **Technical evidence can decide:** Disabled extension interfaces and backward-compatibility requirements.
- **Leo/GPT decision required:** Before D3-B or provider use.
- **Legal/policy review required:** Yes.
- **Experiment evidence required:** Corpus/calibration/reproducibility.
- **Safe default:** Extension disabled and absent from initial runtime contract.
- **Blocked capability:** Text, classifier, provider, semantic learning.
- **Cost if wrong:** Raw-text exposure and historical reinterpretation.
- **Source paths:** D3; extension roadmap entries 1-4; current consultation contract code.
- **Resolution owner:** Control preserves seam; Foundation validates non-reinterpretation.
- **Current state:** `DEFERRED_BUT_DESIGNED_FOR`.

## Q-22 - Deferred Identity Linking Extension

- **QUESTION_ID:** `P1B-Q22`
- **Related U-ID/addendum:** U-04, A-C1, A-C2.
- **Current fact:** D2-B is not approved; D2-A requires original identity preservation and no re-key.
- **Design question:** What optional additive, reversible link interface can be reserved without creating any current link, consent inference, or cross-service identity role?
- **Answer already founder-decided:** D2-A current; D2-B future only.
- **Technical evidence can decide:** Non-operative seam and backward-compatibility rules.
- **Leo/GPT decision required:** Before activating or fully designing D2-B.
- **Legal/policy review required:** Yes.
- **Experiment evidence required:** Real-auth/shared-device threat evidence.
- **Safe default:** No link record and no reinterpretation of anonymous history.
- **Blocked capability:** Guest/login continuity.
- **Cost if wrong:** Cross-account association and destructive re-key.
- **Source paths:** D2; scenario 3; extension roadmap.
- **Resolution owner:** Control reserves seam; future separate mission resolves.
- **Current state:** `DEFERRED_BUT_DESIGNED_FOR`.

## Q-23 - Deferred Memory, Ranking, Signal, Human, Safety-Aggregation Extensions

- **QUESTION_ID:** `P1B-Q23`
- **Related U-ID/addendum:** U-06, U-07, U-09, ADD-01, ADD-05, ADD-08, ADD-09.
- **Current fact:** Durable promotion, ranking use, signal transmission, human review, product-level safety aggregation, and operational expansion are all unapproved.
- **Design question:** How will the initial record remain usable while every extension is disabled and later added only through versioned interfaces with no evidence upgrade or safety downgrade?
- **Answer already founder-decided:** All remain disabled; additive future only.
- **Technical evidence can decide:** Extension boundaries and prohibited dependency tests.
- **Leo/GPT decision required:** Before each extension mission.
- **Legal/policy review required:** Human/safety/privacy paths.
- **Experiment evidence required:** Ranking/value/calibration and abuse evidence.
- **Safe default:** Zero downstream influence.
- **Blocked capability:** Memory promotion, ranking, signal, human review, aggregate safety, operational rollout.
- **Cost if wrong:** Durable contamination and unsafe automated action.
- **Source paths:** Extension roadmap entries 6-12; scenarios 6-8.
- **Resolution owner:** Control preserves interfaces; future missions resolve.
- **Current state:** `DEFERRED_BUT_DESIGNED_FOR`.

## Q-24 - Summary Rows, Lifecycle Logs, And Organic Attribution

- **QUESTION_ID:** `P1B-Q24`
- **Related U-ID/addendum:** U-08, ADD-07.
- **Current fact:** `RecOutcomeEvent` is an approved one-row-per-OrderItem purchase summary, not an event log. Future lifecycle history is separate and organic outcomes cannot be retroactively attributed.
- **Design question:** How will feedback records and future lifecycle logs avoid overloading or reinterpreting `RecOutcomeEvent`, refunds, corrections, or recommendation attribution?
- **Answer already founder-decided:** Summary/event split and no historical reinterpretation.
- **Technical evidence can decide:** Responsibility boundaries and reference directions.
- **Leo/GPT decision required:** Before future refund/reorder/attribution event-log implementation.
- **Legal/policy review required:** Retention/correction.
- **Experiment evidence required:** No.
- **Safe default:** Feedback is separate from purchase summary and does not change attribution.
- **Blocked capability:** Reusing RecOutcomeEvent as feedback/lifecycle log or claiming recommendation success.
- **Cost if wrong:** Corrupted commerce truth and attribution history.
- **Source paths:** Active Commerce Memory design; RecOutcomeEvent schema/service.
- **Resolution owner:** Control; Cosmile validation.
- **Current state:** `TECHNICAL_DESIGN_REQUIRED`.

## Q-25 - Future Implementation Batches And Migration Safety

- **QUESTION_ID:** `P1B-Q25`
- **Related U-ID/addendum:** U-03, U-08, ADD-06, ADD-07.
- **Current fact:** Implementation is not authorized; schema/migration and current feedback-table disposition may be high risk.
- **Design question:** What future batches keep local core, correction/deletion/provenance hardening, outbox containment, and synthetic rehearsal independently reviewable and reversible?
- **Answer already founder-decided:** Tranche A/B/C separation and no automatic implementation.
- **Technical evidence can decide:** Candidate release ordering, prerequisites, rollback, and review evidence.
- **Leo/GPT decision required:** Before each implementation/admin/DB mission.
- **Legal/policy review required:** Before data-writing batches.
- **Experiment evidence required:** Non-prod synthetic rehearsal before operational readiness.
- **Safe default:** Design-only batch descriptions; no command or implementation prompt.
- **Blocked capability:** Worker handoff, schema migration, DB rehearsal, rollout.
- **Cost if wrong:** Coupled irreversible release and difficult rollback.
- **Source paths:** User mission Batch A-D; ADD-06; V2 release train.
- **Resolution owner:** Control design; validators and Fable5 review.
- **Current state:** `TECHNICAL_DESIGN_REQUIRED`.

## Q-26 - Acceptance Scenario Completeness

- **QUESTION_ID:** `P1B-Q26`
- **Related U-ID/addendum:** U-01 through U-09 and all addenda.
- **Current fact:** Scenarios 1-8 are founder-accepted with explicit modifications and future-gated cases.
- **Design question:** Does every scenario map to user-visible behavior, accepted/stored/blocked data, allowed/forbidden automatic action, authority, failure, recovery, proof, unresolved gate, and tranche?
- **Answer already founder-decided:** Scenario boundaries are decided.
- **Technical evidence can decide:** Complete design mapping and proof requirements.
- **Leo/GPT decision required:** Only if candidate contradicts or cannot implement a scenario.
- **Legal/policy review required:** Scenarios 2/5 and safety aspects.
- **Experiment evidence required:** Scenario 7 and calibration aspects.
- **Safe default:** Missing mapping blocks candidate review.
- **Blocked capability:** Canonical design approval.
- **Cost if wrong:** Hidden behavior gap and Worker policy invention.
- **Source paths:** Founder acceptance sheet Scenarios 1-8.
- **Resolution owner:** Control; both validators; Fable5.
- **Current state:** `TECHNICAL_DESIGN_REQUIRED`.

## Q-27 - Foundation And Consultation Contract Non-Reinterpretation

- **QUESTION_ID:** `P1B-Q27`
- **Related U-ID/addendum:** U-02, U-05, U-07, U-09, FOUNDATION-EVIDENCE-FRESHNESS.
- **Current fact:** Foundation Core/shared-memory and foundation-control SSC/FRC are consultation/shadow constructs with different fields and authority. Current evidence is not a feedback semantic contract.
- **Design question:** What explicit non-dependency and future separate-contract rule prevents current consultation/CDM vocabularies from being treated as Package 1B feedback authority?
- **Answer already founder-decided:** No consultation-derived outcome and no initial Foundation semantics.
- **Technical evidence can decide:** Contract separation and compatibility prohibition.
- **Leo/GPT decision required:** Before any future shared contract.
- **Legal/policy review required:** Future provider/feedback semantics.
- **Experiment evidence required:** Future calibration.
- **Safe default:** No Foundation call or CDM write from initial feedback.
- **Blocked capability:** Reusing SSC/FRC/CDM as feedback contract.
- **Cost if wrong:** Cross-contract drift, safety mismatch, raw-text/provider exposure.
- **Source paths:** Foundation Core contract; shared-memory v0; foundation-control contracts/core/server.
- **Resolution owner:** Control; Foundation validation.
- **Current state:** `TECHNICAL_DESIGN_REQUIRED`.

## Q-28 - SIASIU Scope Boundary

- **QUESTION_ID:** `P1B-Q28`
- **Related U-ID/addendum:** U-01, U-02, U-09.
- **Current fact:** Initial feedback is Cosmile-local structured purchased-item input; consultation-derived outcome is forbidden; no SIASIU-owned surface was found in current evidence.
- **Design question:** Can the full candidate remain independent of SIASIU, and what evidence would trigger a scope STOP rather than silent inclusion?
- **Answer already founder-decided:** Consultation is not outcome evidence.
- **Technical evidence can decide:** Dependency audit.
- **Leo/GPT decision required:** Yes before any SIASIU scope addition.
- **Legal/policy review required:** Not for exclusion.
- **Experiment evidence required:** No.
- **Safe default:** SIASIU excluded.
- **Blocked capability:** Any SIASIU contract/runtime change.
- **Cost if wrong:** Scope expansion and consultation reinterpretation.
- **Source paths:** D1; role protocol; current repo dependency evidence.
- **Resolution owner:** Advisor/Control dependency audit; Leo/GPT for any inclusion.
- **Current state:** `OUT_OF_SCOPE`.

## Q-29 - M4 Governance Overlay And Historical-State Hygiene

- **QUESTION_ID:** `P1B-Q29`
- **Related U-ID/addendum:** U-03, ADD-07, FOUNDATION-EVIDENCE-FRESHNESS.
- **Current fact:** M4 governance overlay columns are unresolved/not migrated, and historical V3 evidence may be stale or superseded.
- **Design question:** How will the candidate avoid depending on or populating unresolved M4 columns and cite current code/canonical precedence instead of stale reports?
- **Answer already founder-decided:** No incidental M4 population; current canonical/runtime evidence controls.
- **Technical evidence can decide:** Explicit exclusion and traceability.
- **Leo/GPT decision required:** Before a separate M4 or historical-doc maintenance mission.
- **Legal/policy review required:** M4 policy values later.
- **Experiment evidence required:** Fresh Foundation eval only if a design claim depends on it.
- **Safe default:** No overlay write/population and no stale evidence claim.
- **Blocked capability:** M4 migration/population and stale-proof-based approval.
- **Cost if wrong:** Hidden data governance changes and false readiness.
- **Source paths:** U-03, ADD-07, FOUNDATION-EVIDENCE-FRESHNESS, Cosmile schema comments.
- **Resolution owner:** Control excludes; validators verify.
- **Current state:** `DEFERRED_BUT_DESIGNED_FOR`.

## Coverage Map

### Unknowns And Addenda

All required IDs are represented across Q-01 through Q-29:

- U-01 through U-09.
- A-C1, A-C2, A-C3.
- ADD-01, ADD-02, ADD-03 as `SUPERSEDED -> A-C3`, ADD-04, ADD-05, ADD-06, ADD-07, ADD-08, ADD-09.
- FOUNDATION-EVIDENCE-FRESHNESS.

### Founder Decisions

- D1: Q-01/Q-02/Q-03/Q-04.
- D2: Q-06/Q-22.
- D3: Q-01/Q-10/Q-14/Q-21.
- D4: Q-19/Q-20/Q-23.
- D5-i: Q-15/Q-16/Q-27.
- D5-ii: Q-14/Q-16/Q-17.

### Acceptance Scenarios

- Scenario 1: Q-01/Q-02/Q-11.
- Scenario 2: Q-09/Q-10.
- Scenario 3: Q-06/Q-22.
- Scenario 4: Q-11/Q-14/Q-21/Q-27.
- Scenario 5: Q-09/Q-10/Q-17/Q-21.
- Scenario 6: Q-08/Q-11/Q-18.
- Scenario 7: Q-19/Q-20.
- Scenario 8: Q-07/Q-13/Q-23.

### Extension Points

- Free text, semantic/classifier, multilingual/mixed, provider: Q-21.
- Guest/login additive linking: Q-22.
- Correction/supersession: Q-08.
- Durable memory, ranking, signal, human review, adverse aggregation, operational expansion: Q-12/Q-13/Q-16/Q-20/Q-23.

## Gate Decision

No question is currently classified `FOUNDER_DECISION_REQUIRED` for creation of the bounded design candidate. Legal, experiment, deferred, and out-of-scope questions remain unresolved and block their dependent capabilities.

If Control or a validator discovers that a required design section cannot be completed without a new product/risk/authority choice, add an explicit register addendum and return `DESIGN_ENTRY_GATE_NEEDS_LEO_DECISION` to Leo/GPT. Do not let Control choose it.
