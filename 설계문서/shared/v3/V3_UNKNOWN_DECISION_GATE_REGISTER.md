# V3 Unknown, Decision, and Gate Register

Status: `ACTIVE_CANONICAL`

Date: 2026-07-10

Authority: Leo/GPT

Scope: V3 Package 1A durable knowledge plus mandatory carry-forward gates for later V3 missions.

Package 1A status: `FINAL_APPROVED_AND_CLOSED`

Package 1B status: `NOT_STARTED_NOT_APPROVED`

This register promotes the reviewed Package 1A discovery record into a durable control surface. It does not authorize Control design, implementation, schema/API work, DB access, feature activation, or Package 1B.

## State Semantics

- `RESOLVED_BY_EVIDENCE`: the current-state fact is established. It does not imply future product readiness.
- `FOUNDER_DECIDED`: Leo/GPT fixed the product or authority boundary. Unlisted details remain unresolved.
- `OPEN_BLOCKER`: dependent design or implementation must not proceed until the stated evidence or decision exists.
- `LEGAL_POLICY_HOLD`: technical actors must not replace legal or policy review with an assumption.
- `EXPERIMENT_REQUIRED`: design review cannot resolve the question; an approved, reversible experiment is required.
- `SAFE_DEFAULT_LOCKED`: the stated default remains mandatory until an explicit reopening decision.
- `SUPERSEDED`: a later corrected entry replaces this entry; the old entry remains visible for provenance.

`EXPERIMENT_REQUIRED` is not resolved. `LEGAL_POLICY_HOLD` is not a technical design input. `OPEN_BLOCKER` blocks every capability that depends on it.

## Source Set

- Frozen register: `advisor/jobs/20260710_v3_package1a_independent_unknown_resolution_founder_decision_package/V3_PACKAGE1A_UNKNOWN_REGISTER.md`
- Advisor assessment: `advisor/jobs/20260710_v3_package1a_independent_unknown_resolution_founder_decision_package/ADVISOR_INDEPENDENT_ASSESSMENT.md`
- Foundation assessment: `runs/foundation/20260710_v3_package1a_independent_unknown_resolution_founder_decision_package/FOUNDATION_INDEPENDENT_ASSESSMENT.md`
- Cosmile assessment: `runs/cosmile/20260710_v3_package1a_independent_unknown_resolution_founder_decision_package/COSMILE_INDEPENDENT_ASSESSMENT.md`
- Fable5 assessment: `runs/shared/20260710_v3_package1a_independent_unknown_resolution_founder_decision_package/FABLE5_BLIND_ASSESSMENT.md`
- Comparison: `advisor/jobs/20260710_v3_package1a_independent_unknown_resolution_founder_decision_package/ACTOR_COMPARISON_MATRIX.md`
- Founder package: `advisor/jobs/20260710_v3_package1a_independent_unknown_resolution_founder_decision_package/FOUNDER_DECISION_PACKAGE.md`
- Acceptance sheet: `advisor/jobs/20260710_v3_package1a_independent_unknown_resolution_founder_decision_package/FOUNDER_ACCEPTANCE_SHEET.md`
- Final decision record: `advisor/jobs/20260710_v3_package1a_independent_unknown_resolution_founder_decision_package/28_FOUNDER_DECISION_RECORD.md`
- Final audit and closure: `advisor/jobs/20260710_v3_package1a_independent_unknown_resolution_founder_decision_package/25_ADVISOR_FINAL_MISSION_AUDIT.md`, `29_PACKAGE1A_DECISION_CLOSURE_RECORD.md`, and `30_FINAL_DECISION_CLOSURE_POINTER.md`

## U-01 Feedback Input Reality

- **ID:** `U-01`
- **Current state:** `FOUNDER_DECIDED`
- **Confirmed facts:** No user-facing post-order feedback UI, route, service writer, or product workflow exists. `RecOutcomeFeedback` is an under-constrained schema/test sink. Consultation has no deterministic purchase or `OrderItem` provenance and is not outcome evidence.
- **Unresolved questions:** Timing after purchase/use, eligibility, refund/cancel handling, sensitive-population rules, completion behavior, and selection bias.
- **Safe default:** Initial scope is explicit purchased-line-item structured answers only. Until a separately approved design and implementation exist, collect nothing, write no `RecOutcomeFeedback`, accept no free text, and do not reinterpret consultation.
- **Cost if wrong:** Runtime and contract rewrite, invalid attribution, retention burden, customer trust damage, and low-value investment.
- **Blocked capabilities:** Feedback UI/API/writer, consultation-derived outcomes, never-purchased feedback, and any pilot collection.
- **Resolution method:** D1 resolved the initial product mode. Remaining items require design/legal gates and a reversible pilot.
- **Reopen condition:** Leo/GPT opens Package 1B or a separate timing/eligibility/refund/sensitive-population mission.
- **Related founder decisions:** `D1`, `D2`, `D3`.
- **Related acceptance scenarios:** 1, 2, 4, 7, 8.
- **Related future design/test/result:** Explicit line-item UX and eligibility design; source-integrity/completion tests; later pilot evidence.
- **Source artifacts:** Frozen register U-01; comparison U-01; founder package A/B/G1; decision record D1.
- **Last updated:** 2026-07-10.

## U-02 Semantic Classification Reliability

- **ID:** `U-02`
- **Current state:** `EXPERIMENT_REQUIRED`
- **Confirmed facts:** No feedback classifier, feedback semantic contract, representative corpus, calibration, inter-rater evidence, classifier provenance, or correction history exists. Current Foundation consultation vocabularies are not the V3-11D feedback tuple. DB checks validate stored vocabulary only.
- **Unresolved questions:** Mixed/multilingual/sarcastic/ambiguous handling, positive/adverse coherence, version provenance, calibrated thresholds, false-positive/negative costs, and correction authority.
- **Safe default:** Initial scope is structured-only with no Foundation semantic API. Preserve positive and adverse axes separately; never allow positive meaning to cancel adverse meaning; no semantic learning write or calibrated-confidence claim.
- **Cost if wrong:** Unsafe optimistic classification, durable data poisoning, schema/contract rewrite, safety harm, and trust damage.
- **Blocked capabilities:** Free-text feedback, classifier processing, semantic labels used for learning, automated safety or ranking action, and V3-11D.
- **Resolution method:** A frozen annotation/evaluation protocol and representative experiment after D1/D3 are reopened for text.
- **Reopen condition:** Leo/GPT approves future `D3-B` text processing or a semantic/classifier mission.
- **Related founder decisions:** `D1`, `D3`, `D4`.
- **Related acceptance scenarios:** 1, 4, 5, 6.
- **Related future design/test/result:** Versioned multi-axis contract; mixed/multilingual corpus and calibration; independent design and implementation review.
- **Source artifacts:** Frozen register U-02; comparison U-02; founder package B/C/E-2/E-3; decision record D1/D3/D4.
- **Last updated:** 2026-07-10.

## U-03 Retention, Erasure, and Data Lineage

- **ID:** `U-03`
- **Current state:** `LEGAL_POLICY_HOLD`
- **Confirmed facts:** No end-to-end retention, erasure, correction, no-reappearance, provider-deletion, aggregate, log, queue, backup, or outbox lineage exists. Foundation application code being mostly stateless does not prove end-to-end non-persistence. Exact legal periods are not repository facts.
- **Unresolved questions:** Jurisdiction, legal basis, consent purpose, periods, processor/provider duties, logs/backups/queues, aggregates, tombstone/reuse-block policy, and deletion propagation.
- **Safe default:** No feedback collection or learning, no Foundation signal expansion or flush, no retention/non-persistence claim, and no M4 governance-overlay migration/population.
- **Cost if wrong:** Failed erasure, PII/security incident, identity/data corruption, regulatory exposure, and customer trust damage.
- **Blocked capabilities:** Operational collection, flag ON, customer-facing retention claim, Foundation signal use, durable memory, and production/live use.
- **Resolution method:** Technical lineage inventory, Leo/GPT product promise, qualified legal/policy review, and synthetic deletion/no-reappearance rehearsal.
- **Reopen condition:** A separately approved retention/erasure/processor policy mission with jurisdiction and product purpose identified.
- **Related founder decisions:** `D3`, `D5-ii`.
- **Related acceptance scenarios:** 2, 5, 6, 8.
- **Related future design/test/result:** Lineage and processor map; deletion propagation/no-reappearance tests; legal and operations evidence.
- **Source artifacts:** Frozen register U-03; comparison U-03; founder package D/F/F.1; decision record unresolved gates.
- **Last updated:** 2026-07-10.

## U-04 Guest-to-Login Identity Safety

- **ID:** `U-04`
- **Current state:** `FOUNDER_DECIDED`
- **Confirmed facts:** No feedback/memory stitching policy or implementation exists. Foundation cannot resolve identity. Strict XOR drops ambiguous outcome writes. Commerce cart/wishlist merge already records a guest/user relation, but that relation is not feedback consent or memory evidence. Current auth is a single mock user.
- **Unresolved questions:** Future explicit-consent additive linking, shared-device/account-switch recovery, unlink/revocation, real-auth false-link rate, secret rotation, and legal basis.
- **Safe default:** `D2-A NO_LINK_EXPLICIT_ITEM`; no feedback/memory stitch, no destructive re-keying, no recency inference, and no use of `cart_merged` as consent or attribution.
- **Cost if wrong:** Cross-account sensitive-data association, irreversible re-keying, identity corruption, and customer trust damage.
- **Blocked capabilities:** Guest-to-login feedback continuity, retroactive attribution, identity-based pilot claims, and `D2-B`.
- **Resolution method:** Future threat-reviewed, separately approved, reversible additive-link mission after real auth exists.
- **Reopen condition:** Leo/GPT explicitly opens `D2-B CONSENTED_ADDITIVE_LINK_LATER`.
- **Related founder decisions:** `D2`.
- **Related acceptance scenarios:** 3, 6.
- **Related future design/test/result:** Identity threat model; consent/revocation and wrong-account recovery tests; independent security review.
- **Source artifacts:** Frozen register U-04; comparison U-04; founder package E-4/G2; decision record D2.
- **Last updated:** 2026-07-10.

## U-05 Raw-Text Non-Persistence Reality

- **ID:** `U-05`
- **Current state:** `FOUNDER_DECIDED`
- **Confirmed facts:** Repo-local application minimization is narrower than end-to-end non-persistence. Raw consultation text can reach external-model transport in code; deployed credential/provider state is unverified. Cosmile event ingestion has multiple sanitizers but a static unlisted-key prose residual.
- **Unresolved questions:** Provider terms and retention, deployment/proxy/log/trace/crash behavior, processor inventory, explicit transport kill switch, incident policy, and synthetic canary procedure.
- **Safe default:** `D3-A STRUCTURED_ONLY_NO_PROVIDER`; no feedback free text, no Foundation/provider processing, no non-persistence claim, and no weakening of current PII/event sanitizers.
- **Cost if wrong:** External disclosure, provider retention, PII/security incident, contract rewrite, and trust damage.
- **Blocked capabilities:** Free-text feedback, external semantic processing, raw-text incident claims, and `D3-B`.
- **Resolution method:** Future legal/provider/security gate plus explicit default-off transport and synthetic canary, only after Leo/GPT reopens text.
- **Reopen condition:** Leo/GPT separately approves `D3-B TEXT_AFTER_POLICY_GATE`.
- **Related founder decisions:** `D3`.
- **Related acceptance scenarios:** 4, 5, 6.
- **Related future design/test/result:** Raw-text/egress/observability boundary; canary and incident tests; provider/legal review result.
- **Source artifacts:** Frozen register U-05; comparison U-05; founder package E-6/G3; acceptance scenarios 4-6.
- **Last updated:** 2026-07-10.

## U-06 Product and Learning Value

- **ID:** `U-06`
- **Current state:** `EXPERIMENT_REQUIRED`
- **Confirmed facts:** No feedback value, baseline, uplift, representative corpus, calibration, or pilot result exists. Organic C2 outcomes cannot prove recommendation performance. Current mock auth cannot support representative identity or selection-bias claims.
- **Unresolved questions:** Metric owner, denominator, horizon, stop rule, response rate, bias and abuse rate, completeness, operating cost, minimum useful effect, and kill switch.
- **Safe default:** No collection today. Any later pilot is observation-only and cannot change ranking, durable memory, canonical evidence, or safety. The primary hypothesis is post-purchase satisfaction/service UX, not recommendation uplift.
- **Cost if wrong:** Low-value investment, Goodhart/reward hacking, privacy burden, biased product decisions, and trust damage.
- **Blocked capabilities:** Pilot collection, recommendation-uplift claims, ranking/memory automation, and operational expansion.
- **Resolution method:** Pre-registered, time-boxed, representative, reversible pilot after all earlier privacy/provenance/identity gates.
- **Reopen condition:** Leo/GPT approves a pilot mission with all D4 prerequisites.
- **Related founder decisions:** `D4`.
- **Related acceptance scenarios:** 7, 8.
- **Related future design/test/result:** Metric-governance plan; kill-switch/completeness tests; independent final pilot audit.
- **Source artifacts:** Frozen register U-06; comparison U-06; founder package C/G4; acceptance scenarios 7-8.
- **Last updated:** 2026-07-10.

## U-07 Foundation Signal Whitelist Ownership and Versioning

- **ID:** `U-07`
- **Current state:** `FOUNDER_DECIDED`
- **Confirmed facts:** Multiple producer/consumer vocabularies diverge. Current mapper assumes consent from user-ID presence, writes the local identifier into the outbox row's `canonicalUserId`, is reached without a dedicated flag, and has no found consumer. Actual deployed rows remain unverified.
- **Unresolved questions:** Canonical path and version shape, registry-backed consent, identifier format, compatibility, deletion/retraction, queue lifecycle, and containment implementation.
- **Safe default:** `D5-i-A JOINT_GOVERNANCE` plus `D5-ii-A CONTAINMENT_GATE_REQUIRED`; no flush, no reliance on absent consumer, no current-shape transmission, and no Foundation signal expansion.
- **Cost if wrong:** Cross-repo drift, raw-identifier disclosure, false consent claims, failed erasure, and irreversible batch transmission.
- **Blocked capabilities:** Package 1B reliance on Foundation signals, outbox consumer/flush, signal expansion, and vocabulary changes.
- **Resolution method:** Separate design-only containment/contract mission with Cosmile producer and Foundation acceptance review, followed by Leo/GPT approval.
- **Reopen condition:** Leo/GPT opens `OUTBOX_CONSENT_IDENTIFIER_CONTAINMENT_GATE`.
- **Related founder decisions:** `D5-i`, `D5-ii`.
- **Related acceptance scenarios:** 2, 5, 8.
- **Related future design/test/result:** Versioned whitelist/consent/identifier contract; producer-consumer conformance and no-send tests; separate reviews.
- **Source artifacts:** Frozen register U-07; comparison U-07; founder package E-1/F.1/G5; decision record D5-i/D5-ii.
- **Last updated:** 2026-07-10.

## U-08 Feedback Provenance, Order-Item Linkage, and Contract Shape

- **ID:** `U-08`
- **Current state:** `FOUNDER_DECIDED`
- **Confirmed facts:** No feedback writer or explicit selection flow exists. Current row cannot prove authorization, source, deduplication, identity, correction, or trace lineage. Consultation cannot infer an `OrderItem`. Foundation must remain order/payment/customer-identity blind.
- **Unresolved questions:** Feedback ID, cardinality, eligible order state, source/event time, product/SKU/formula anchor, dedup, correction/retraction link, deletion behavior, and minimum DB constraints.
- **Safe default:** Explicit purchased-line-item selection only; no inferred provenance, no ambiguous writes, no writer until provenance/identity/dedup constraints are approved.
- **Cost if wrong:** Wrong-item attribution, unreconstructable lineage, deletion deadlock, schema migration/backfill, and identity corruption.
- **Blocked capabilities:** `RecOutcomeFeedback` writer, semantic extraction, consultation-derived outcomes, and provenance-dependent learning.
- **Resolution method:** Package 1B design may define the technical contract only after entry checklist and legal/identity gates are satisfied.
- **Reopen condition:** Separate Leo/GPT Package 1B design mission.
- **Related founder decisions:** `D1`, `D2`, `D3`.
- **Related acceptance scenarios:** 1, 2, 3, 6, 8.
- **Related future design/test/result:** Provenance/dedup/correction contract; explicit-link and DB-constraint tests; implementation review.
- **Source artifacts:** Frozen register U-08; comparison U-08; founder package G1/G2/I; decision record D1/D2.
- **Last updated:** 2026-07-10.

## U-09 Safety Response, Learning, and Correction Boundary

- **ID:** `U-09`
- **Current state:** `OPEN_BLOCKER`
- **Confirmed facts:** Existing raise-only safety behavior is consultation-scoped. No feedback safety/learning/correction pipeline, human-review owner, correction authority, or cross-request state exists. Current historical fail-up/fail-down rules conflict.
- **Unresolved questions:** Immediate response for severe reports, duty to act, sensitive populations, human-review owner/SLA, privileged `verified`/`contradicted` transitions, correction/supersession, severity translation, and calibration.
- **Safe default:** Observation only; no automatic ranking, durable promotion, evidence upgrade, causal claim, positive learning, or safety downgrade. No unstaffed review promise. Any future correction is versioned supersession and cannot automatically lower safety.
- **Cost if wrong:** Missed safety escalation, false causal claim, durable memory corruption, safety downgrade, customer harm, and trust damage.
- **Blocked capabilities:** Adverse-feedback automation, product-level safety aggregation, human-review claims, durable memory promotion, and semantic V3-11D behavior.
- **Resolution method:** Legal/safety policy plus design review, explicit authority, and later calibration evidence.
- **Reopen condition:** Leo/GPT opens a safety/human-review/correction mission after structured input design exists.
- **Related founder decisions:** `D1`, `D4`.
- **Related acceptance scenarios:** 1, 4, 6, 8.
- **Related future design/test/result:** Safety-response/correction authority contract; blocked-demotion and privileged-transition tests; safety review.
- **Source artifacts:** Frozen register U-09; comparison U-09; founder package E-2/F/G4; acceptance scenarios 1/4/6/8.
- **Last updated:** 2026-07-10.

## Post-Freeze Addenda

### A-C1 Existing Commerce Guest/Login Merge

- **ID/title:** `A-C1` - Existing cart/wishlist guest-login merge.
- **Current state:** `FOUNDER_DECIDED`.
- **Confirmed facts:** `cart_merged` records a guest/user relation for commerce convenience.
- **Unresolved questions:** Retention of existing relation rows under future identity policy.
- **Safe default:** Never use this relation as feedback consent, memory identity evidence, or a re-key source.
- **Cost if wrong:** Cross-account attribution and identity corruption.
- **Blocked capabilities:** Feedback/memory stitching from existing merge data.
- **Resolution method/reopen condition:** Reopen only under a separate `D2-B` threat-reviewed mission.
- **Related decisions/scenarios:** D2; scenario 3.
- **Future design/test/result:** Identity threat model and wrong-account recovery evidence.
- **Sources/updated:** Cosmile assessment A-C1; comparison addenda; 2026-07-10.

### A-C2 Mock Single-User Authentication

- **ID/title:** `A-C2` - Mock auth cannot support representative evidence.
- **Current state:** `OPEN_BLOCKER`.
- **Confirmed facts:** Current logged-in identity is a single hardcoded mock user.
- **Unresolved questions:** Real-auth milestone and representative identity evidence.
- **Safe default:** Make no pilot, identity, selection-bias, or attribution claim from mock-auth data.
- **Cost if wrong:** Invalid pilot conclusions and wrong-account risk.
- **Blocked capabilities:** Representative pilot and guest/login safety validation.
- **Resolution method/reopen condition:** Real-auth mission plus approved shared-device tests.
- **Related decisions/scenarios:** D2/D4; scenarios 3/7.
- **Future design/test/result:** Real-auth and recovery test suite.
- **Sources/updated:** Cosmile assessment A-C2; comparison addenda; 2026-07-10.

### A-C3 Generic Event Unlisted-Key Prose Residual

- **ID/title:** `A-C3` - Denylist-based generic event key-governance residual.
- **Current state:** `OPEN_BLOCKER`.
- **Confirmed facts:** Multiple sanitizer layers exist, but unlisted property keys can statically carry non-pattern prose into `propertiesJson`; no observed row or deployed behavior was claimed.
- **Unresolved questions:** Allowlist versus stronger semantic/health-text handling and lineage coverage.
- **Safe default:** No feedback free text; do not weaken sanitizers; no claim of observed persistence.
- **Cost if wrong:** Untracked sensitive prose and failed erasure.
- **Blocked capabilities:** Free-text volume through generic events.
- **Resolution method/reopen condition:** Security/lineage design before any text-capable feature.
- **Related decisions/scenarios:** D3; scenarios 2/5.
- **Future design/test/result:** Sanitizer canary, allowlist review, and lineage test.
- **Sources/updated:** Corrected Cosmile A-C3 and corrected Fable5 ADD-03; 2026-07-10.

### ADD-01 Feedback Authenticity, Abuse, and Poisoning

- **ID/title:** `ADD-01` - Fake, incentivized, replayed, or competitor feedback.
- **Current state:** `OPEN_BLOCKER`.
- **Confirmed facts:** No abuse model, dedup policy, rate limit, quarantine authority, or anti-poisoning evidence exists.
- **Unresolved questions:** Authentication, incentives, replay identity, review authority, and aggregate inclusion.
- **Safe default:** Volume never upgrades certainty, product safety, ranking, or durable learning; suspect reports remain quarantined.
- **Cost if wrong:** Data poisoning, false product action, reward hacking, and trust damage.
- **Blocked capabilities:** Pilot launch and product-level aggregation.
- **Resolution method/reopen condition:** Approved abuse threat model before pilot.
- **Related decisions/scenarios:** D4; scenario 8.
- **Future design/test/result:** Dedup/replay/quarantine tests and independent abuse review.
- **Sources/updated:** Fable5 ADD-01; founder acceptance scenario 8; 2026-07-10.

### ADD-02 Sensitive Populations

- **ID/title:** `ADD-02` - Pregnancy, minors, and medical/health-adjacent boundaries.
- **Current state:** `LEGAL_POLICY_HOLD`.
- **Confirmed facts:** Package 1A does not define eligibility or handling for sensitive populations.
- **Unresolved questions:** Eligibility, consent, duty to respond, escalation, and product claims.
- **Safe default:** No collection or automation for unresolved sensitive-population cases.
- **Cost if wrong:** Safety harm, legal exposure, and customer trust damage.
- **Blocked capabilities:** Pilot eligibility and adverse-response automation.
- **Resolution method/reopen condition:** Qualified legal/safety review plus Leo/GPT decision.
- **Related decisions/scenarios:** D1/D4; scenarios 1/8.
- **Future design/test/result:** Eligibility policy and safety review evidence.
- **Sources/updated:** Fable5 ADD-02; founder package D/G1; 2026-07-10.

### ADD-03 Original Event Key-Governance Finding

- **ID/title:** `ADD-03` - Original generic event free-text finding.
- **Current state:** `SUPERSEDED`.
- **Confirmed facts:** The original wording overstated the exposure and omitted active sanitizers.
- **Unresolved questions:** None under this identifier; the corrected residual is `A-C3`.
- **Safe default:** Use only the corrected `A-C3` statement.
- **Cost if wrong:** False security conclusions and unnecessary redesign.
- **Blocked capabilities:** None beyond A-C3.
- **Resolution method/reopen condition:** Do not reopen; trace through A-C3.
- **Related decisions/scenarios:** D3; scenario 5.
- **Future design/test/result:** See A-C3.
- **Sources/updated:** Fable5 correction FB-F1 and comparison addenda; 2026-07-10.

### ADD-04 Classifier and Provider Version Drift

- **ID/title:** `ADD-04` - Label reproducibility across model/provider versions.
- **Current state:** `EXPERIMENT_REQUIRED`.
- **Confirmed facts:** No feedback classifier version/provenance or reproducibility contract exists.
- **Unresolved questions:** Version pinning, replay, historical comparability, and correction behavior.
- **Safe default:** No classifier-derived durable action; no in-place relabeling.
- **Cost if wrong:** Untraceable historical drift and invalid calibration.
- **Blocked capabilities:** Semantic processing and longitudinal comparison.
- **Resolution method/reopen condition:** Reopen with future D3-B semantic mission and representative corpus.
- **Related decisions/scenarios:** D3/D4; scenarios 4/6.
- **Future design/test/result:** Versioned provenance, frozen corpus, replay and supersession tests.
- **Sources/updated:** Fable5 ADD-04; comparison addenda; 2026-07-10.

### ADD-05 Human-Review Operations

- **ID/title:** `ADD-05` - Review staffing, SLA, cost, and unstaffed-queue behavior.
- **Current state:** `OPEN_BLOCKER`.
- **Confirmed facts:** No approved queue, owner, staffing model, SLA, escalation policy, or review authority exists.
- **Unresolved questions:** Duty to review, service hours, incident escalation, and privileged transitions.
- **Safe default:** No human-review promise and no automatic action that assumes review will occur.
- **Cost if wrong:** Unhandled safety reports and false customer promises.
- **Blocked capabilities:** Human review, adverse escalation, and verified/contradicted transitions.
- **Resolution method/reopen condition:** Operations and safety mission with named owner.
- **Related decisions/scenarios:** D4; scenarios 1/4/6/8.
- **Future design/test/result:** Queue/SLA design and failure-mode review.
- **Sources/updated:** Fable5 ADD-05; founder package F.1; 2026-07-10.

### ADD-06 Unknown Dependency Ordering

- **ID/title:** `ADD-06` - Package dependency order.
- **Current state:** `RESOLVED_BY_EVIDENCE`.
- **Confirmed facts:** Input mode constrains provenance/identity, which constrains retention/provider, signal, safety, and pilot design.
- **Unresolved questions:** None for ordering; each dependency remains separately gated.
- **Safe default:** Preserve the order U-01 -> U-08/U-04 -> U-03/U-05 -> U-07 -> U-09 -> U-06.
- **Cost if wrong:** Parallel designs silently assume incompatible product modes.
- **Blocked capabilities:** Any later-stage mission whose predecessor is unresolved.
- **Resolution method/reopen condition:** Reopen only by Leo/GPT canonical decision.
- **Related decisions/scenarios:** D1-D5-ii; scenarios 1-8.
- **Future design/test/result:** Enforced by the mission entry/exit checklist.
- **Sources/updated:** Fable5 ADD-06; comparison dependency order; 2026-07-10.

### ADD-07 Historical and Active Canonical Document Status and Gate Reconciliation

- **ID/title:** `ADD-07` - Historical V3 documents can be mistaken for current approval, and still-active canonical designs can retain older gate names without a continuity map.
- **Current state:** `OPEN_BLOCKER`.
- **Confirmed facts:** Historical V3 documents contain `CANONICAL`, `DESIGN_APPROVED_WITH_LIMITS`, ownership claims, or missing HOLD banners that conflict with later decisions. The still-active `COSMILE_V3_11C2_COMMERCE_MEMORY_DESIGN.md` also carries R-1/R-2 gate names whose current canonical disposition requires explicit mapping.
- **Unresolved questions:** Per-document status/supersession treatment and any future gate-name reconciliation across still-active canonical designs.
- **Safe default:** This register, the founder ledger, and the V3 canonical index control current Package 1 authority; historical documents are evidence only when they conflict, and active-design gate names must resolve through the continuity map below rather than inference.
- **Cost if wrong:** Unauthorized Package 1B design or implementation.
- **Blocked capabilities:** Package 1B reliance on historical V3-0x text or unmapped active-design gate names until status and continuity are explicit.
- **Resolution method/reopen condition:** Documentation-hygiene mission adding visible banners/pointers and reconciling renamed or expanded gates across still-active canonical documents.
- **Related decisions/scenarios:** D1-D5-ii; scenarios 1-8.
- **Future design/test/result:** Historical-doc pointer audit plus active-canonical gate-name continuity audit.
- **Sources/updated:** Fable5 ADD-07; founder package F.1; Fable5 C-1 continuity review; 2026-07-10.

### ADD-08 Outbox Enqueue Governance

- **ID/title:** `ADD-08` - Enqueue-time consent/identifier/contract governance.
- **Current state:** `FOUNDER_DECIDED`.
- **Confirmed facts:** Enqueue code is reachable without a dedicated guard; no consumer was found; current shape is not approved; rows are unverified.
- **Unresolved questions:** Containment implementation, consent authority, identifier, lifecycle, deletion, and actual row state under a separately approved DB mission.
- **Safe default:** D5-ii containment gate, no flush, and no reliance on absence of a consumer.
- **Cost if wrong:** Raw-identifier disclosure and false consent transmission.
- **Blocked capabilities:** Foundation signal reliance or flush.
- **Resolution method/reopen condition:** `OUTBOX_CONSENT_IDENTIFIER_CONTAINMENT_GATE` mission.
- **Related decisions/scenarios:** D5-i/D5-ii; scenarios 2/5/8.
- **Future design/test/result:** Contract/no-send/conformance tests and separate review.
- **Sources/updated:** Fable5 ADD-08; decision record D5-ii; 2026-07-10.

### ADD-09 Metric Governance and Anti-Goodhart Ownership

- **ID/title:** `ADD-09` - Independent pilot metric governance.
- **Current state:** `OPEN_BLOCKER`.
- **Confirmed facts:** No metric owner, frozen denominator, horizon, stop rule, completeness audit, or anti-gaming authority exists.
- **Unresolved questions:** Named owner, KPI formula, minimum effect, stop/extension authority, and null-result publication.
- **Safe default:** No pilot collection; never substitute volume, organic purchases, or recommendation uplift for the approved service-UX KPI.
- **Cost if wrong:** Reward hacking, indefinite pilot, and false value claims.
- **Blocked capabilities:** Pilot launch and operational expansion.
- **Resolution method/reopen condition:** `PILOT_METRIC_GOVERNANCE_GATE` before collection.
- **Related decisions/scenarios:** D4; scenarios 7/8.
- **Future design/test/result:** Frozen metric package and independent pilot audit.
- **Sources/updated:** Fable5 ADD-09; founder acceptance scenario 7; 2026-07-10.

### FOUNDATION-EVIDENCE-FRESHNESS

- **ID/title:** `FOUNDATION-EVIDENCE-FRESHNESS` - Shared-memory report predates current code/policy.
- **Current state:** `SAFE_DEFAULT_LOCKED`.
- **Confirmed facts:** The stored 16/16 shadow eval predates later reason-code and Option B changes.
- **Unresolved questions:** Current result if later design depends on this evidence.
- **Safe default:** Do not cite the old eval as current runtime proof; rerun only in a separately approved mission that depends on it.
- **Cost if wrong:** Design based on stale evidence.
- **Blocked capabilities:** Any claim that current shared-memory behavior is proven by the old report.
- **Resolution method/reopen condition:** Direct current-code rerun and review when required.
- **Related decisions/scenarios:** D4; scenarios 4/6.
- **Future design/test/result:** Fresh evidence artifact.
- **Sources/updated:** Corrected Foundation assessment Appendix C; comparison addenda; 2026-07-10.

## Preserved Actor Disagreements

These disagreements are facts about evidence interpretation and must not be erased by later summaries:

1. `E-1 OUTBOX`: no consumer limits transmission, but unguarded enqueue and assumed consent create an accumulation-governance risk. Deployed rows remain unverified.
2. `E-2 SAFETY PRECEDENT`: Foundation consultation safety is a useful structural precedent, but it does not enforce a feedback path.
3. `E-3 MIXED MEANING`: a future multi-axis shape may be feasible, but the current feedback row is not an approved or coherent mixed-feedback contract.
4. `E-4 LINKING`: memory/feedback no-link is the approved default while existing commerce convenience linking remains real and excluded from consent evidence.
5. `E-5 PILOT`: observation-only is the required future posture, but no pilot is executable until all prerequisite gates exist.
6. `E-6 EXTERNAL MODEL`: historical wording suggested explicit enablement; code uses `compose: true` and an unverified credential condition, so no feedback text may use the path.

## Global Safe Defaults

1. No Package 1 feedback collection or `RecOutcomeFeedback` write exists or is authorized.
2. Consultation text is not purchase outcome evidence.
3. No feedback/memory guest-to-login stitching, destructive re-keying, recency inference, or cart-merge consent inference.
4. No feedback raw text is sent to Foundation or an external provider.
5. No end-to-end non-persistence claim.
6. No Foundation feedback signal expansion or outbox flush; enqueue containment remains a required gate.
7. No feedback-derived ranking, recommendation-uplift claim, durable memory, evidence upgrade, safety downgrade, or automatic promotion.
8. Existing consultation safety and external-egress behavior remain outside Package 1 authorization and require their own gate.
9. No human-review promise without a staffed and approved operating model.
10. No incidental migration or population of unresolved M4 governance-overlay columns.
11. Package 1B, Control design, schema/API work, DB action, implementation, flag activation, main merge, and production/live use remain unauthorized.

## Canonical Carry-Forward Gates

### Active Canonical Gate Continuity Map

The following mappings preserve searchability and meaning from the still-active `설계문서/cosmile/COSMILE_V3_11C2_COMMERCE_MEMORY_DESIGN.md`. A mapping does not close or implement the target gate.

| Existing active-design gate | Current canonical disposition | Continuity rule |
|---|---|---|
| `FOUNDATION_SIGNAL_WHITELIST_CONTRACT_OWNER_GATE` | Ownership direction is founder-decided by `D5-i-A JOINT_GOVERNANCE`; operational reliance remains blocked by `OUTBOX_CONSENT_IDENTIFIER_CONTAINMENT_GATE` | Search and routing by the original R-1 name must land on D5-i plus the containment gate; no signal expansion or flush is authorized |
| `REC_OUTCOME_RETENTION_ERASURE_POLICY_GATE` | Expanded into `RETENTION_ERASURE_AND_PROCESSOR_POLICY_GATE`; U-03 remains `LEGAL_POLICY_HOLD` | The broader gate preserves retention, erasure, processor/provider, log, queue, backup, aggregate, correction, and no-reappearance obligations; no flag-ON or operational use is authorized |
| `IDENTITY_STITCHING_AND_ATTRIBUTION_CHANGE_POLICY_GATE` | Carried unchanged | `D2-A NO_LINK_EXPLICIT_ITEM` remains the current safe default; any D2-B additive-link option requires a separate Leo/GPT mission |

`HISTORICAL_V3_DOC_STATUS_AND_SUPERSESSION_GATE` includes gate-name reconciliation across historical documents and still-active canonical design documents.

- `STRUCTURED_FEEDBACK_TIMING_ELIGIBILITY_REFUND_CANCEL_GATE`
- `SENSITIVE_POPULATION_LEGAL_SAFETY_GATE`
- `FEEDBACK_PROVENANCE_CONTRACT_GATE`
- `RETENTION_ERASURE_AND_PROCESSOR_POLICY_GATE`
- `REAL_AUTH_AND_IDENTITY_EVIDENCE_GATE`
- `IDENTITY_STITCHING_AND_ATTRIBUTION_CHANGE_POLICY_GATE`
- `SEMANTIC_CALIBRATION_VERSIONING_GATE`
- `FEEDBACK_ABUSE_AND_POISONING_GATE`
- `HUMAN_REVIEW_OPERATIONS_GATE`
- `PILOT_METRIC_GOVERNANCE_GATE`
- `OUTBOX_CONSENT_IDENTIFIER_CONTAINMENT_GATE`
- `EXISTING_CONSULTATION_EXTERNAL_EGRESS_GATE`
- `HISTORICAL_V3_DOC_STATUS_AND_SUPERSESSION_GATE`
- `M4_GOVERNANCE_OVERLAY_HOLD`

No listed gate starts automatically. Each requires a separate Leo/GPT mission unless a future mission explicitly includes and satisfies it.
