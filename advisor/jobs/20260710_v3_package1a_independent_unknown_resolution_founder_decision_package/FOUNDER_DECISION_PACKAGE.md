# V3 Package 1A Founder Decision Package

Date: 2026-07-10

Status: `REVIEW_COMPLETE__AWAITING_LEO_GPT_DECISIONS`

Mission: `V3_PACKAGE1A_INDEPENDENT_UNKNOWN_RESOLUTION_AND_FOUNDER_DECISION_PACKAGE`

This package does not approve Package 1B design or implementation. It reduces the discovery evidence to five founder-level decisions. Technical details remain delegated to a later design mission.

## A. Facts We Now Know

1. Cosmile has no post-order feedback UI, route, service writer, or product workflow.
2. `RecOutcomeFeedback` exists as an under-constrained schema/test sink, not an approved product capability.
3. Consultation text has no deterministic purchase or OrderItem provenance and is not valid outcome evidence today.
4. Foundation's current SSC/FRC contract is consultation-oriented and does not emit the V3-11D feedback tuple.
5. No representative feedback corpus, calibration, inter-rater evidence, classifier provenance, or correction history exists.
6. Current Foundation consultation safety behavior is raise-only and request-scoped; it does not govern a nonexistent feedback-learning path.
7. No end-to-end feedback retention, erasure, no-reappearance, correction, or provider-deletion policy exists.
8. Foundation application code is largely stateless, but external-model, deployment, proxy, log, crash, backup, and provider surfaces remain unverified.
9. Cosmile memory-layer guest-to-login stitching is not implemented, while commerce cart/wishlist merge already records a guest/user relationship. That relationship is not approved for feedback attribution.
10. Current authentication is a single mock user and cannot produce representative identity or pilot evidence.
11. The Foundation signal whitelist owner is unresolved and multiple vocabularies conflict.
12. Cosmile's mapper assumes consent from user-ID presence and writes a local user identifier into the outbox row's `canonicalUserId` column; the `payloadJson` whitelist itself excludes user identifiers. The enqueue path is reached without a dedicated feature-flag guard. No consumer/flush worker was found; deployed rows remain unverified.
13. C2 organic purchase outcomes cannot be used as recommendation-performance evidence.
14. No measured product or learning value exists.
15. The original Foundation and Fable5 first passes violated the no-sub-agent rule, disclosed the violation, and were replaced by direct same-session blind re-verification.

## B. Unknowns Resolved

Resolved means the current-state question is evidence-backed, not that the future policy is decided.

| Unknown | Resolved current-state fact |
|---|---|
| U-01 | No product feedback path exists; test fixtures are not a product writer |
| U-02 | No feedback classifier/contract/corpus/calibration exists; DB checks validate vocabulary only |
| U-03 | End-to-end lineage and erasure are incomplete; outbox governance is part of the lineage |
| U-04 | Foundation cannot stitch identity; memory stitching is absent; commerce merge is a separate existing link |
| U-05 | Application-layer minimization is code-backed; end-to-end non-persistence is not |
| U-06 | Product value is unmeasured; organic C2 cannot prove recommendation uplift |
| U-07 | Ownership is unresolved; vocabularies, consent assumptions, and mapper shape diverge |
| U-08 | Current feedback provenance is insufficient and Foundation must remain order/customer blind |
| U-09 | Consultation safety and feedback learning are separate; no feedback correction/review pipeline exists |

## C. Unknowns Not Resolvable Before Pilot Or Live-Like Evidence

- What response rate, signal quality, and selection bias a real feedback experience produces.
- Whether users understand and complete explicit line-item feedback correctly.
- Mixed, sarcastic, multilingual, and ambiguous classification performance.
- False-positive/false-negative safety rates and calibrated thresholds.
- Real-auth guest/login wrong-link rates and recovery behavior.
- Human-review queue volume, staffing burden, and service-level performance.
- Whether feedback improves a chosen product KPI.
- Provider/deployment non-persistence behavior beyond repo code.
- Actual outbox/CommerceEvent row state in any environment; DB access was forbidden.

These are not founder questions disguised as technical details. They become experiment or operations gates only after product and policy decisions.

## D. Legal And Policy Questions Not Yet Answered

- Jurisdiction and legal basis for health-adjacent post-purchase feedback.
- Consent purpose for collection, semantic processing, identity linking, Foundation signaling, and learning.
- High-level deletion promise, including derived data, queues, logs, aggregates, provider copies, backups, and no-reappearance state.
- Whether a non-PII tombstone/reuse block may remain after erasure.
- External provider data use, retention, cross-border processing, and incident duties.
- Guest-to-login linkage consent and account/shared-device correction rights.
- Duty to respond, escalate, or staff human review for severe adverse reports and sensitive populations.

Exact retention periods and legal conclusions must not be guessed in Package 1B design.

## E. Disagreements Between Actors

### E-1: Is the current outbox state safe?

- Cosmile: no consumer/flush means no Foundation transmission and high reversibility.
- Fable5: unconditional enqueue, raw local IDs, and assumed consent make accumulation itself a governance risk.
- Consolidation: transmission is blocked, but enqueue-time governance is unresolved. Actual rows remain unverified.

### E-2: Does existing safety machinery make feedback design easier?

- Foundation: raise-only consultation safety and approval-gated learning provide a useful structural precedent.
- Fable5: those mechanisms do not currently protect a feedback path; some historical feedback rules conflict and helpers are unwired.
- Consolidation: precedent may inform later design, but no feedback safety gate may be claimed today.

### E-3: Can the current feedback row represent mixed meaning?

- Advisor/Foundation: separate adverse fields and the consultation safety pattern suggest a possible future multi-axis direction.
- Cosmile: this is only conditionally feasible if an approved label-choice/coherence rule exists; none exists, so forced optimistic single-label writes must be rejected.
- Fable5: a required exclusive label plus no coherence/provenance/version rules is currently lossy and unsafe.
- Consolidation: current schema is not approved as a mixed-feedback contract; Cosmile's current-state conclusion aligns with the Fable5 challenge even though it recognizes a possible future structure.

### E-4: Does "no linking" describe current reality?

- Advisor/Foundation: no memory/feedback stitching is the safe default.
- Cosmile: commerce cart/wishlist merge already records both guest and user IDs.
- Consolidation: existing commerce convenience linking is real but must not silently become feedback/memory attribution.

### E-5: Is an observation-only pilot the current safe next step?

- Advisor/Foundation/Cosmile: observation-only is the safest possible future pilot posture.
- Fable5: it is not executable now because input, deletion, identity, kill switch, metric ownership, and review operations are missing.
- Consolidation: observation-only describes a future constraint, not current readiness.

### E-6: Is external model use explicitly enabled?

- Frozen wording implied an enabled/disabled state.
- Foundation/Fable5 found `compose: true` on the contract path and no policy flag; credential availability is the remaining unverified condition.
- Consolidation: no feedback text may use this path until an explicit policy and technical gate exist.

## F. Safe Defaults Until Decision

1. No feedback collection or `RecOutcomeFeedback` writes.
2. Consultation text is not purchase outcome evidence.
3. No guest-to-login feedback/memory stitch, re-key, recency inference, or use of `cart_merged` as feedback consent.
4. No feedback raw text sent to Foundation or an external provider.
5. No claim of end-to-end non-persistence.
6. No Foundation feedback signal expansion or outbox flush; current enqueue governance remains a gate.
7. No feedback-derived ranking, recommendation uplift claim, durable memory, evidence upgrade, safety downgrade, or automatic promotion.
8. Existing consultation safety behavior remains consultation-scoped. This package does not approve or resolve the existing consultation external-egress path; its owner, provider policy, and default-off/kill-switch requirements must be handled by a separate explicit gate.
9. No human-review promise until an owner, queue, staffing model, and escalation policy are approved.
10. Do not migrate or populate the unmigrated M4 governance-overlay columns as a side effect of feedback work; their semantics remain unresolved.
11. Package 1B, Control design, schema/API changes, DB work, and implementation remain blocked.

## F.1 Pre-Package-1B Gates That Must Not Be Lost

These are technical, review, legal, or documentation prerequisites. They are not additional founder product questions and do not start automatically.

1. `OUTBOX_CONSENT_IDENTIFIER_CONTAINMENT_GATE`: after Decision 5, define no-flush containment, consent authority, identifier format, contract conformance, lifecycle, and deletion behavior before Package 1B relies on Foundation signals.
2. `EXISTING_CONSULTATION_EXTERNAL_EGRESS_GATE`: separately review the currently coded consultation external-model path, ownership, provider terms, explicit default-off control, and kill switch. Package 1A feedback decisions do not resolve it.
3. `HISTORICAL_V3_DOC_STATUS_AND_SUPERSESSION_GATE`: add status/supersession treatment so historical V3-0x documents cannot be mistaken for Package 1 implementation approval.
4. `RETENTION_ERASURE_AND_PROCESSOR_POLICY_GATE`: establish lineage, legal/policy basis, provider/backup/log handling, correction, erasure, and no-reappearance expectations before collection.
5. `REAL_AUTH_AND_IDENTITY_EVIDENCE_GATE`: representative identity or pilot claims require real auth and shared-device/wrong-account evidence; mock-single-user behavior is insufficient.
6. `PILOT_METRIC_GOVERNANCE_GATE`: name an independent metric owner and freeze the denominator, horizon, stop rule, abuse controls, completeness reporting, and kill switch before collection.
7. `M4_GOVERNANCE_OVERLAY_HOLD`: do not migrate or populate unresolved M4 governance-overlay fields as incidental feedback work.

## G. Only Five Leo/GPT Decisions

### Decision 1 - Initial Feedback Product Scope

Plain-language question: What, if anything, should users be able to report first, and when?

Options:

- `D1-A HOLD`: collect no post-purchase feedback yet.
- `D1-B STRUCTURED_PURCHASED_ITEM`: after a purchase/use interval, let the user explicitly select a purchased line item and choose structured answers only.
- `D1-C STRUCTURED_PLUS_OPTIONAL_TEXT`: structured answers plus free text.
- `D1-D CONSULTATION_DERIVED`: treat consultation or follow-up text as outcome evidence.

Advisor recommendation: Do not approve D1-C or D1-D with current evidence. If strategic intent is to continue Package 1, D1-B is the lowest-risk design hypothesis; D1-A remains the safest operational choice. This is not implementation approval.

Eligibility under any non-HOLD choice must explicitly address sensitive populations and health-adjacent cases, including pregnancy and minors, through the legal/safety review listed in section D. This package does not decide those rules.

Do not ask Leo/GPT to decide route names, fields, enums, or timing constants.

### Decision 2 - Identity And Provenance Default

Plain-language question: Must feedback always be explicitly attached to a purchased item without later guest-to-login stitching?

Options:

- `D2-A NO_LINK_EXPLICIT_ITEM`: explicit purchased-item selection; no re-key/stitch; existing cart merge cannot serve as feedback identity evidence.
- `D2-B CONSENTED_ADDITIVE_LINK_LATER`: permit a separately designed, reversible, explicitly consented link later; never destructive re-keying.

Advisor recommendation: Approve D2-A as the Package 1 default. Preserve D2-B only as a future threat-reviewed mission.

Do not ask Leo/GPT to choose an identity algorithm, HMAC field, or mapper implementation.

### Decision 3 - Raw Text, External Provider, And Deletion Promise

Plain-language question: May the first Package 1 experience collect or externally process free text before a reviewed retention/erasure policy exists?

Options:

- `D3-A STRUCTURED_ONLY_NO_PROVIDER`: no feedback free text and no external model processing in the initial scope.
- `D3-B TEXT_AFTER_POLICY_GATE`: text is a later option only after legal/provider review, explicit default-off transport, lineage, deletion, incident, and user-disclosure gates.
- `D3-C TEXT_NOW`: allow text/provider processing under current controls.

Advisor recommendation: Approve D3-A and retain D3-B as a later gated option. Reject D3-C.

Proposed product promise for later legal review: user-linkable raw and derived feedback is correctable/erasable; a minimal non-PII tombstone or reuse block may remain only if explicitly approved. Exact periods are not decided here.

### Decision 4 - Value Hypothesis And Automatic Action Boundary

Plain-language question: What single value should a future pilot test, and what must it never change automatically?

Candidate hypotheses:

- adverse-signal observation and safer follow-up;
- recommendation-quality improvement;
- post-purchase satisfaction/service UX.

Advisor recommendation: Select exactly one or hold the pilot. Repository evidence cannot rank these business choices. Regardless of the selected hypothesis, approve this boundary: pilot data is observation-only and cannot automatically change ranking, durable memory, canonical evidence, or safety. A severe report may receive conservative non-diagnostic guidance only after a reviewed response path exists; no unstaffed human-review promise.

The later pilot must have an independent metric owner, frozen denominator, horizon, stop rule, abuse controls, and kill switch before collection.

### Decision 5 - Foundation Signal Governance And Current Outbox Boundary

This decision contains two independent founder choices. Selecting an ownership model must not silently remove the containment gate.

#### D5-i - Contract Ownership Model

Plain-language question: Who owns the cross-repo signal contract?

Options:

- `D5-i-A JOINT_GOVERNANCE`: Cosmile owns raw commerce evidence and producer mapping; Foundation owns canonical acceptance constraints; contract changes require joint review and Leo/GPT approval.
- `D5-i-B SINGLE_OWNER`: name either Foundation or Cosmile as sole owner, while still applying the independent D5-ii containment decision below.
- `D5-i-C DEFER_OWNERSHIP`: leave ownership unresolved; Package 1B may not rely on Foundation signals.

#### D5-ii - Outbox Containment Before Package 1B

Plain-language question: Must the current enqueue/consent/identifier boundary be resolved before Package 1B may rely on Foundation signals?

Options:

- `D5-ii-A CONTAINMENT_GATE_REQUIRED`: no flush; require the separate design-only `OUTBOX_CONSENT_IDENTIFIER_CONTAINMENT_GATE` before Package 1B signal use, regardless of whether D5-i selects joint or single ownership.
- `D5-ii-B RELY_ON_NO_CONSUMER`: continue relying on the absence of a flush worker without a containment gate.

Advisor recommendation: Approve `D5-i-A JOINT_GOVERNANCE` and `D5-ii-A CONTAINMENT_GATE_REQUIRED`. Do not approve `D5-ii-B`. Choosing single ownership under D5-i-B does not waive containment. This decision does not authorize DB inspection, cleanup, runtime patching, or a flush worker.

## H. Founder Acceptance Sheet

The scenario-based acceptance sheet is in:

`FOUNDER_ACCEPTANCE_SHEET.md`

Fable5 challenge and delta re-review are complete with final review verdict `PASS`. The sheet remains a decision draft until Leo/GPT records final choices.

## I. Traceability

| UNKNOWN | Evidence | Actor position | Leo decision | Future design section | Future test | Future result |
|---|---|---|---|---|---|---|
| U-01 | No route/UI/writer; consultation lacks OrderItem | Four-actor agreement | D1 | Input/eligibility/timing | UX completion and source-integrity tests | Future Package 1B/pilot evidence |
| U-02 | No feedback tuple/corpus/calibration; vocabularies diverge | Agreement with Fable schema challenge | D1, D4 | Semantic contract and uncertainty | Mixed/multilingual corpus + calibration | Future classifier review result |
| U-03 | No end-to-end erasure; outbox governance gap | Agreement; accumulation risk emphasized by Fable | D3, D5 | Lineage/erasure/processor map | Synthetic deletion/no-reappearance | Future legal and rehearsal evidence |
| U-04 | XOR/no memory stitch; existing cart merge; mock auth | Scope disagreement preserved | D2 | Identity threat model and consent | Real-auth wrong-account recovery | Future identity review result |
| U-05 | App minimization; external transport; unverified ops/provider | Agreement after evidence corrections | D3 | Raw-text/egress/observability boundary | Synthetic canary + provider review | Future security evidence |
| U-06 | No value evidence; organic outcome not recommendation attribution | Full agreement | D4 | Pilot metric governance | Pre-registered observation-only pilot | Future pilot result |
| U-07 | Conflicting vocabularies; assumed consent; no consumer; unconditional enqueue code | Accumulation disagreement preserved | D5 | Contract authority/version/outbox gate | Contract conformance and no-send tests | Future design/implementation review |
| U-08 | No provenance writer; weak feedback DDL; Foundation attribution-blind | Agreement with Fable stricter gate | D1, D2 | Provenance/dedup/correction | Explicit-link and constraint tests | Future implementation evidence |
| U-09 | Consultation safety exists; no feedback correction/review path | Scope disagreement preserved | D4 | Safety response/learning/correction authority | Blocked-demotion and review-authorization tests | Future safety review result |

## Package Status

`FOUNDER_PACKAGE_REVIEW_COMPLETE__AWAITING_LEO_GPT_DECISIONS`

No decision in this draft is final. No Package 1B work starts automatically.
