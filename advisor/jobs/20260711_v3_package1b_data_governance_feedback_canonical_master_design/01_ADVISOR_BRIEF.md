# Advisor Brief - V3 Package 1B Canonical Master Design

Date: 2026-07-11

Mission: `V3_PACKAGE1B_DATA_GOVERNANCE_FEEDBACK_CANONICAL_MASTER_DESIGN`

Instruction validation verdict: `PROCEED_WITH_LIMITS`

Entry verdict: `DESIGN_ENTRY_GATE_PASSED`

Risk level: `LEVEL_A`

Recommended Advisor reasoning effort: `<GPT-5.6-Sol:Max>`

## V3 Mission Entry

```text
V3_MISSION_ENTRY
MISSION_ID: 20260711_v3_package1b_data_governance_feedback_canonical_master_design
MISSION_OBJECTIVE: Produce an independently validated and reviewed canonical master-design candidate for an initial Cosmile-local, structured, explicitly purchased-line-item feedback architecture, while preserving unresolved legal/experiment/open gates and all additive future extension points.
RISK_LEVEL: LEVEL_A
RISK_LEVEL_RATIONALE: The design crosses order/OrderItem provenance, identity, privacy/retention/erasure, adverse/safety behavior, cross-repo Foundation authority, outbox containment, memory/learning, future schema/migration, and eventual customer-facing pilot boundaries.
IMPACTED_UNKNOWN_IDS: U-01,U-02,U-03,U-04,U-05,U-06,U-07,U-08,U-09,A-C1,A-C2,A-C3,ADD-01,ADD-02,ADD-03(SUPERSEDED->A-C3),ADD-04,ADD-05,ADD-06,ADD-07,ADD-08,ADD-09,FOUNDATION-EVIDENCE-FRESHNESS
IMPACTED_DECISION_IDS: D1,D2,D3,D4,D5-i,D5-ii
IMPACTED_ACCEPTANCE_SCENARIOS: 1,2,3,4,5,6,7,8
OPEN_BLOCKERS: U-09; A-C2; A-C3; ADD-01; ADD-05; ADD-07; ADD-09; OUTBOX_CONSENT_IDENTIFIER_CONTAINMENT_GATE; unresolved timing/eligibility/refund/cancel and provenance constraints
LEGAL_POLICY_HOLDS: U-03; ADD-02; retention/erasure/processor/provider/log/queue/backup/aggregate policy; sensitive-population eligibility; safety duty and review obligations
EXPERIMENT_REQUIRED_ITEMS: U-02; U-06; ADD-04; representative real-auth evidence; classifier calibration; pilot value/completeness/selection-bias evidence
EXTENSION_POINTS_AFFECTED: free-text feedback; semantic/classifier processing; multilingual and mixed feedback; external-provider processing; guest-to-login additive linking; correction and supersession; durable-memory promotion; recommendation/ranking use; Foundation signal transmission; human review; adverse/product-level safety aggregation; pilot-to-operational expansion
SAFE_DEFAULTS_TO_PRESERVE: no collection/write now; structured-only/no text; no consultation outcome; explicit line-item only; no identity stitch/re-key/recency/cart-merge inference; no Foundation semantic/provider dependency; no non-persistence claim; no signal expansion/flush; no ranking/memory/evidence-upgrade/safety-downgrade; no unstaffed review promise; no M4 overlay population; Package 1B implementation/runtime/DB/live remains unauthorized
REQUIRED_GATES: STRUCTURED_FEEDBACK_TIMING_ELIGIBILITY_REFUND_CANCEL_GATE; SENSITIVE_POPULATION_LEGAL_SAFETY_GATE; FEEDBACK_PROVENANCE_CONTRACT_GATE; RETENTION_ERASURE_AND_PROCESSOR_POLICY_GATE; REAL_AUTH_AND_IDENTITY_EVIDENCE_GATE; IDENTITY_STITCHING_AND_ATTRIBUTION_CHANGE_POLICY_GATE; SEMANTIC_CALIBRATION_VERSIONING_GATE; FEEDBACK_ABUSE_AND_POISONING_GATE; HUMAN_REVIEW_OPERATIONS_GATE; PILOT_METRIC_GOVERNANCE_GATE; OUTBOX_CONSENT_IDENTIFIER_CONTAINMENT_GATE; EXISTING_CONSULTATION_EXTERNAL_EGRESS_GATE; HISTORICAL_V3_DOC_STATUS_AND_SUPERSESSION_GATE; M4_GOVERNANCE_OVERLAY_HOLD; independent Foundation/Cosmile validation; Fable5 DESIGN_REVIEW; Leo/GPT final design approval
REVERSIBILITY_CLASS: HIGH (documentation-only candidate; no runtime or data mutation)
COST_IF_WRONG: future runtime rewrite; cross-repo contract rewrite; DB migration/backfill; wrong-item or wrong-account association; failed erasure; PII/security incident; safety harm; customer trust damage; low-value feature investment
CANONICAL_SOURCES_READ: V3 canonical index/register/ledger/roadmap/checklist/big-block protocol; role protocol V2; Package 1A comparison/decision/acceptance/audit/closure; durable-knowledge audit/closure; active Commerce Memory design; V3-11 risk register; repo-local active instructions; actual Cosmile/Foundation/foundation-control code and git states
CURRENT_FACTS: No feedback product path or writer exists; order detail exposes owner-checked OrderItem rows; current auth is mock/single-user; RecOutcomeFeedback is an under-constrained semantic sink; RecOutcomeEvent is a separate one-row-per-OrderItem purchase summary; current CommerceEvent write path can enqueue FoundationSignalOutbox; current outbox consent/identifier shape is unapproved; Foundation has no feedback API and current shared-memory path is shadow/default-OFF; current foundation-control HTTP contracts are consultation SSC/FRC, not feedback contracts; no runtime repo has tracked unstaged or staged changes
CURRENT_ASSUMPTIONS: A future implementation can be additive; explicit order-detail line items are a feasible design anchor but not yet approved UI; technical state names/interfaces may be proposed by Control without selecting new product/legal policy; unresolved policy choices can remain fail-closed hooks and blocked capabilities in a complete design
MISSING_EVIDENCE: exact timing/eligibility/refund/cancel policy; sensitive-population policy; legal retention periods and processor duties; real-auth behavior; representative pilot evidence; abuse model; human-review owner/SLA; classifier calibration; deployed DB/outbox/provider state; actual future schema feasibility until repo validators inspect the candidate
AUTHORITY_DECISIONS_ALREADY_APPROVED: D1-B; D2-A; D3-A; D4 POST_PURCHASE_SATISFACTION_SERVICE_UX; D5-i-A; D5-ii-A; Scenarios 1-8 with recorded modifications; Package 1B design-only scope; Control design invocation after this gate
AUTHORITY_DECISIONS_STILL_REQUIRED: None to begin the bounded design candidate. Exact legal periods, sensitive-population policy, pilot metrics/thresholds, human-review promise, future text/provider use, future identity linking, signal transmission, implementation, DB/schema execution, and operational release remain separately required and must not be chosen by Control.
FORBIDDEN_SCOPE: runtime/schema/API/migration edits; DB access/query/write/inspection/cleanup; outbox flush/consumer; feedback collection; free text; external feedback provider; identity stitching; ranking/memory promotion; safety downgrade; flags; secrets; main; production/live; Package 2/3/4; SIASIU scope expansion; new actors/sessions/sub-agents
STOP_CONDITIONS: new material founder/product/risk choice; legal conclusion required; SIASIU-owned surface required; candidate depends on current outbox send/Foundation semantics; unresolved blocker presented as solved; runtime or DB action requested; actor/session independence fails; unrelated staging; more than two routine Control reconciliation loops
```

## Entry Evidence

### Repository State

| Repository | Branch | HEAD | Upstream delta | Tracked unstaged | Staged | Existing untracked docs |
|---|---|---|---:|---:|---:|---:|
| Cosmile | `shadow/m4-cosmile-memory` | `e4ed6680fee2a2e55117fb406cae8714e3680465` | 0/0 | 0 | 0 | 6 |
| FOUNDATION | `shadow/foundation-shared-memory-v0` | `f240867dd83312e644b1ba520648da791c7733da` | 0/0 | 0 | 0 | 2 |
| foundation-control | `shadow/m5-ingress-gate` | `c89b792bed177aad9322e09debecc76caab0c8a0` | 0/0 | 0 | 0 | 35 |
| foundation-docs | `main` | `f5360e2016b11fa5c6db52b271533d579a7afae8` at inventory start | 0/0 | 3 unrelated Advisor files | 0 | 6 unrelated paths |

The foundation-advisor workspace is not a git repository. Its permitted artifacts are published through foundation-docs.

### Current Code Facts

- Cosmile `Order` and `OrderItem` provide owner-scoped order and line-item records, and the order page renders each line item: `app/prisma/schema.prisma:407-451`, `app/src/app/orders/[orderId]/page.tsx:13-45`.
- `RecOutcomeFeedback` has only `feedbackId`, `orderItemId`, optional recommendation, semantic label, adverse fields, and timestamp. It has no identity, authorization provenance, source/version, idempotency, correction, erasure, quarantine, or supersession contract: `app/prisma/schema.prisma:862-870`.
- No product feedback route/service writer was found. Existing `RecOutcomeFeedback` writes are test/migration fixtures, not a product path.
- `RecOutcomeEvent` is a separate purchase summary with DB uniqueness by `orderItemId`, and its writer is default-OFF, organic-only, strict-XOR, fail-open: `app/prisma/schema.prisma:844-859`, `app/src/lib/recOutcomeEventService.ts:1-134`.
- Current shopper identity is a guest cookie or a single mock user: `app/src/lib/shopper.ts:1-26`, `app/src/lib/mockUser.ts:1-18`.
- Every `trackCommerceEvent` call invokes `maybeEnqueueFoundationSignal`; mapped events create pending outbox rows. User presence is currently treated as `user_consented`, and local user/anonymous identifiers are stored in outbox columns: `app/src/lib/commerceEventService.ts:29-63`, `app/src/lib/foundationSignalMapper.ts:4-61`, `app/prisma/schema.prisma:195-216`.
- Foundation Core exposes consultation/judgment/memory-reuse methods, not a feedback contract: `FOUNDATION/foundation/api/foundation_core_contract.py:5-29`.
- Foundation shared-memory v0 is shadow/default-OFF with no live write; its historical `outcome_feedback` vocabulary is not an approved Package 1B contract: `FOUNDATION/foundation/shared_memory/contract.py:10-43`, `FOUNDATION/foundation/shared_memory/api.py:1-86`.
- foundation-control HTTP service exposes consultation SSC/FRC routes. Its SSC accepts optional raw text and the contract entry uses `compose: True`; it must not be reused as the initial structured-feedback path: `foundation-control/foundation_http_service/contracts.py:10-73`, `foundation-control/foundation_http_service/core.py:1584-1644`, `foundation-control/foundation_http_service/server.py:50-80`.

## Unknown-Gate Determination

Unresolved states do not block this design-only mission because the candidate is required to preserve them as fail-closed hooks, blocked capabilities, and future gates. They do block dependent implementation, collection, pilot, transmission, semantic processing, safety automation, and operational use.

No new material `FOUNDER_DECISION_REQUIRED` item was found for authoring the bounded candidate. If Control or either repo validator identifies one, the mission immediately returns to Leo/GPT before reconciliation continues.

## Handoff Gate

```text
ENTRY_CHECKLIST_STATUS: COMPLETE
UNKNOWN_GATE_STATUS: PASSED_FOR_CURRENT_SCOPE
DESIGN_DOC_STATUS: NOT_STARTED__CONTROL_CANDIDATE_AUTHORIZED
DESIGN_REVIEW_STATUS: NOT_STARTED
LEO_GPT_SCOPE_APPROVAL: PACKAGE1B_DESIGN_ONLY
CONTROL_DESIGN_HANDOFF_AUTHORIZED: true
WORKER_HANDOFF_AUTHORIZED: false
IMPLEMENTATION_AUTHORIZATION: false
```

## SIASIU Scope Determination

No SIASIU-owned surface is required for the approved initial path. Consultation-derived outcomes are forbidden, the initial flow is Cosmile-local structured feedback, and Foundation processing is disabled. SIASIU remains out of scope. Any later evidence that requires a SIASIU contract or runtime surface is a STOP and Leo/GPT scope decision.

## Completion Criteria For Phase 0

- This entry block is complete and evidence-backed.
- The mission-specific design-question register is frozen and published.
- Control mode, outputs, forbidden scope, and result path are exact.
- Foundation/Cosmile validation briefs preserve first-pass independence.
- Fable5 Level 3 review brief is prepared but not executable until candidate reconciliation is complete.
- Only Advisor documentation is staged/published.
- No runtime, DB, secret, or implementation action occurs.
