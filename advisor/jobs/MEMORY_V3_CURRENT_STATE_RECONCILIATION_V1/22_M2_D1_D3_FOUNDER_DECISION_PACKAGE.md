# Memory V3 M2 — D1–D3 Founder Decision Package

```text
DECISION_PACKAGE_ID: MEMORY_V3_M2_D1_D3_FOUNDER_DECISION_PACKAGE_V1
PARENT_MISSION: MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1
RESPONSIBLE_ADVISOR: foundation-advisor
INSTRUCTION_CLASSIFICATION: NEEDS_DECISION
CURRENT_NEXT_ACTION: D1_D3_FOUNDER_DECISION_PACKAGE_PREPARATION_ONLY

M2_SCOPE: AUTHORIZED_WITH_GATES
D1_D3_DECISIONS: REQUIRED_BEFORE_IMPLEMENTATION
A_IMPLEMENTATION: AUTHORIZED_AFTER_D1_D3_AND_REVIEWED_DESIGN
B_LIMITED_IMPLEMENTATION: AUTHORIZED_AFTER_D1_D3_AND_REVIEWED_DESIGN
C_DESIGN_AND_INDEPENDENT_REVIEW: AUTHORIZED
C_IMPLEMENTATION_AND_DELIVERY: NOT_AUTHORIZED
FULL_PACKAGE_1B: NOT_AUTHORIZED

CONTROL_DISPATCHED: NO
DESIGNER_DISPATCHED: NO
WORKER_DISPATCHED: NO
REVIEWER_DISPATCHED: NO
IMPLEMENTATION_STARTED: NO
DB_ACCESSED: NO
```

This package asks Leo/GPT to choose product-policy boundaries. It is not a design,
implementation handoff, Package 1B approval, or permission to activate any flag.
Control, Designer, and Workers must not infer the answers.

## Founder selection requested

```text
D1_SELECTED: D1-A | D1-B | D1-C | CUSTOM
D2_SELECTED: D2-A | D2-B | D2-C | CUSTOM
D3_SELECTED: D3-A | D3-B | D3-C | CUSTOM

CUSTOM_CONSTRAINTS:
RISK_ACCEPTED:
RISK_NOT_ACCEPTED:
```

Advisor recommendation:

```text
D1: D1-A
D2: D2-A
D3: D3-A
```

## D1 — Recommendation attribution, sessionId, privacy, and event mapping

### Verified current facts

1. Cosmile `CommerceEvent.sessionId` and canonical `cev-1.0 session_id` are
   nullable. Recommendation and product-card view/click UI events currently flow
   through `/api/events` into the general `CommerceEvent` ledger.
2. `RecommendationEvent.sessionId` is non-null in Prisma and migration SQL, while
   its only runtime callsite (`cart/items/route.ts`) passes `null`. The feature is
   flag-OFF, so the failing write path is currently inert.
3. `RecommendationEvent.recommendationId` is minted when the shadow event writer is
   called at add-to-cart, not when the recommendation is shown. It therefore cannot
   currently link the earlier view/click to the later cart/purchase journey.
4. The pure `lastTouchAttribution` function exists and is tested, but has no runtime
   caller. The current paid outcome writer records organic outcomes with
   `recommendationId=null` and is also flag-OFF.
5. Service-local `subject_ref` / `anonymous_ref` XOR is the current identity
   boundary. Foundation validates an opaque subject-ref format; it does not mint or
   link identities.

### Options

#### D1-A — Nullable opaque session reference; RecommendationEvent is the recommendation lifecycle authority (recommended)

- Mint `recommendationId` at the first actual recommendation presentation, not at
  add-to-cart.
- Carry that ID through recommendation view/click/save/dismiss/cart and, when
  available, the purchased line-item evidence.
- Keep `sessionId` nullable. When present, it must be a Cosmile-local opaque session
  reference; it must not be used as a cross-service user identifier.
- Keep `CommerceEvent` as the general operational/analytics ledger. At the same
  producer boundary, map only recommendation lifecycle events into
  `RecommendationEvent`; product-card-only events remain CommerceEvents.
- Never reconstruct recommendation events later from broad CommerceEvent history.
  Use producer-time dual recording with one deterministic idempotency key.
- Attribution rule: a propagated `recommendationId` gives `direct`; a same-session
  match without that ID gives `session` with `recommendationId=null`; otherwise
  `organic`/`unattributed` with `recommendationId=null`.

Implementation consequence:

- Additive/nullable schema correction for sessionId plus an implementation-ready
  mapping/propagation design. No historical backfill is implied.
- Recommendation creation/presentation must become the ID origin. Purchased-item
  linkage remains in authorized A/B design scope only.

Safety/privacy consequence:

- Honest attribution without inventing a session where none exists. Nullable
  absence is explicit, and cross-service identity linkage remains prohibited.

What remains deferred:

- Multi-touch/weighted attribution, cross-device attribution, identity stitching,
  production activation, and historical backfill.

#### D1-B — Require a server-issued session reference for every recommendation

- Keep `RecommendationEvent.sessionId` non-null.
- A server-issued, service-local session reference must exist before any
  recommendation is shown; every recommendation event carries it.
- `recommendationId` is still minted at presentation and propagated through the
  journey. CommerceEvent remains the general ledger and maps at producer time.

Implementation consequence:

- Requires a reliable session-creation/lifecycle layer on every recommendation
  surface before A/B can work. Current null-producing routes must fail closed.

Safety/privacy consequence:

- Stronger session analytics but broader correlation and retention surface. Session
  creation failures can suppress evidence or product behavior unless carefully
  isolated.

What remains deferred:

- Cross-device/session merge and any cross-service identity use.

#### D1-C — Remove session attribution from RecommendationEvent

- Remove sessionId from the recommendation evidence contract.
- Attribute only through propagated `recommendationId` and purchased-line reference;
  otherwise record `organic`/`unattributed`.
- CommerceEvent may retain its own nullable session for local analytics, but that
  session is outside the recommendation evidence plane.

Implementation consequence:

- Simplest evidence contract, but current `session` attribution mode is removed or
  made permanently inapplicable.

Safety/privacy consequence:

- Lowest correlation risk; loses honest same-session attribution when an explicit
  recommendation ID was not propagated.

What remains deferred:

- All session-assisted attribution.

### Advisor recommendation for D1

Choose **D1-A**. It resolves the current schema/callsite contradiction without
inventing sessions, makes `recommendationId` originate at the correct product event,
keeps operational CommerceEvents separate from canonical recommendation evidence,
and preserves honest fallbacks.

## D2 — Cosmile evidence envelope, deterministic normalization, and Foundation boundary

### Verified current facts

1. `RecOutcomeFeedback` schema and closed enums exist, but there is no product UI,
   API, or runtime writer. Satisfaction/adverse normalization is not implemented.
2. The current code has no free-text feedback extractor and no external semantic
   provider. This containment matches the new Founder direction.
3. `FoundationSignalOutbox` exists and is write-only at runtime: `src/` has an
   enqueue producer and no consumer/delivery. Non-runtime smoke scripts only
   delete/count rows for test setup/verification; they are not delivery consumers.
4. The outbox lacks a purchased-line reference, retention enforcement, correction
   lineage, and a real consent source. The mapper currently assumes `userId` means
   `user_consented`, which is not an acceptable future consent check.
5. Current Foundation shadow signal acceptance rejects raw/PII, rejects a service
   declaring `memory_candidate=true`, and rejects a service interpreting the
   customer. It stores no durable memory. This is evidence for a fail-closed
   boundary, not an authorized C implementation contract.
6. Foundation's current learning workflow prohibits automatic approval/reuse.
   Customer outcome/preferences contribute no truth-evidence upgrade and cannot
   override safety.

### Options

#### D2-A — Cosmile owns closed-input normalization; Foundation owns eligibility validation only (recommended)

Cosmile produces a versioned, minimal evidence envelope from closed-choice UI inputs.
Recommended v1 shape for design review:

```text
schema_version: cosmile.commerce_evidence.v1
evidence_id: opaque immutable ID
evidence_type: purchase_feedback | correction | retraction

source:
  service: cosmile
  environment: local | shadow
  source_event_id
  idempotency_key
  occurred_at

actor:
  subject_ref XOR anonymous_ref
  identity_state: identified | anonymous
  identity_link_allowed: false by default

purchase:
  purchase_item_ref: service-local opaque reference
  product_ref
  sku_ref: optional
  purchase_state: paid

feedback:
  satisfaction: satisfied | neutral | dissatisfied | null
  adverse_type: skin_reaction | other | usage_safety | null
  adverse_severity: low | moderate | severe | null
  adverse_certainty: reported initially; repeated/verified require separate evidence

consent:
  purpose
  state: granted | revoked | expired | missing
  notice_version
  captured_at

privacy:
  raw_text_stored: false
  contains_pii: false
  retention_class

lineage:
  root_evidence_id
  supersedes_evidence_id: optional
  retracts_evidence_id: optional
  normalizer_version
  source_hash
```

Normalization scope:

- Deterministic versioned table from closed controls to the fields above.
- Satisfaction and adverse are separate axes and may not overwrite each other.
- No inference of `repeated` or `verified` from one report.
- Missing, contradictory, or unmapped combinations fail closed with a reason code.
- No raw text, embeddings, LLM, external provider, automatic candidate, ranking, or
  safety mutation.

Foundation contract boundary for later C design:

- `ACCEPT_FOR_ELIGIBILITY_REVIEW` means only that the envelope is structurally and
  policy-valid. It does not mean intake activation, candidate creation, promotion,
  reuse, ranking, or safety mutation.
- Reject unsupported version/environment, invalid identity XOR, invalid/missing
  consent, expired or retracted evidence, duplicate idempotency key, missing
  purchase-item/product reference, invalid normalization, raw text/PII, broken
  lineage/provenance, identity-link request, or inconsistent adverse fields.
- Proposed stable rejection reasons:

```text
unsupported_schema_version
environment_not_allowed
invalid_identity_xor
identity_link_forbidden
consent_missing
consent_revoked
consent_expired
privacy_scope_exceeded
raw_text_or_pii_present
missing_purchase_item_ref
missing_product_ref
duplicate_evidence
invalid_normalization
adverse_fields_inconsistent
lineage_broken
provenance_untrusted
evidence_retracted
retention_expired
```

Implementation consequence:

- Cosmile Worker later implements reviewed additive schema/migration, deterministic
  mapper, local UI/API, correction/retraction, and contained enqueue. Foundation
  implementation remains prohibited.

Safety/privacy consequence:

- Service-local input meaning remains with Cosmile; Foundation gets only minimal,
  versioned evidence and retains independent eligibility authority.

What remains deferred:

- Foundation intake, candidate connection, promotion/reuse, delivery, aggregation,
  and any semantic model.

#### D2-B — Foundation owns normalization of Cosmile closed-choice codes

- Cosmile sends purchase refs and raw **structured codes only** (still no free text).
- Foundation later maps those codes to satisfaction/adverse semantics and returns
  accept/reject.

Implementation consequence:

- Expands the C contract and couples Foundation to Cosmile UI/code versions. C must
  be designed and reviewed before A/B can freeze their payload.

Safety/privacy consequence:

- Centralizes semantics, but increases cross-project data exposure and makes
  Foundation responsible for service-input interpretation.

What remains deferred:

- Same runtime exclusions as D2-A; additionally blocks B until C normalization
  design is approved.

#### D2-C — Cosmile emits a MemoryFactCandidate-shaped object

- Cosmile performs normalization and proposes candidate fields directly; Foundation
  only performs a final gate.

Implementation consequence:

- Fewer transformation layers, but crosses the current ownership boundary by
  letting the service prescribe memory semantics.

Safety/privacy consequence:

- Highest risk of accidental auto-learning, candidate-shape coupling, and safety or
  ranking influence. Requires more negative gates and creates authority ambiguity.

What remains deferred:

- Still no runtime connection, but this option would make that boundary harder to
  preserve.

### Advisor recommendation for D2

Choose **D2-A**. Cosmile should own deterministic interpretation of its own closed
commerce input, while Foundation should independently accept or reject the evidence
contract without treating it as memory. Use a random service-local
`purchase_item_ref`; do not expose the raw database `orderItemId` or require a new
cross-service secret.

## D3 — Consent, correction/retraction, identity, retention, and adverse response

### Verified current facts

1. Cosmile has `ConsentRecord` and `SubjectRefMap.allowLink=false` schema fields but
   no runtime writers for either model.
2. The existing outbox mapper infers consent from the presence of `userId`; no real
   consent check exists. Anonymous/user IDs are stored in outbox columns.
3. No feedback correction/retraction writer or lineage contract exists.
4. Outbox rows have no expiry/retention fields or cleanup worker. Status/error
   columns exist but no runtime handler, retry, dead-letter, or delivery path exists.
5. No adverse-feedback UI or runtime response path exists. Current pure adverse
   rules are not connected to feedback or candidates.
6. Public policy constraints support a conservative split:
   data minimization, purpose limitation, accuracy/correction, consent withdrawal,
   erasure, and storage limitation must be represented; adverse-event records may
   also have separate legal retention obligations. FDA advises stopping use and
   contacting a healthcare provider for cosmetic reactions, and U.S. responsible
   persons have serious-adverse reporting/recordkeeping duties. Exact jurisdiction
   and legal role remain unverified.

### Options

#### D3-A — Strict purpose-separated pilot with adverse regulatory hold lane (recommended)

Consent:

- Separate versioned purposes:
  `same_service_purchase_feedback` for Cosmile-local capture and
  `cross_service_commerce_evidence` for eligibility to enter the contained outbox.
- Both start `missing/pending`; login or `userId` alone never grants consent.
- Revocation immediately blocks new enqueue and makes existing non-required evidence
  ineligible for future processing.

Identity:

- Service-local `subject_ref`; guest evidence remains anonymous and cannot enter the
  cross-service outbox in this pilot. A later exception requires a new explicit
  Founder decision; it cannot be inferred from anonymous analytics consent.
- `allowLink=false` by default. Link only after an explicit user action and a
  versioned identity-link consent. Cart/account merge is not evidence-link consent.

Correction/retraction:

- Append-only correction: create a new envelope with `supersedes_evidence_id`; never
  silently overwrite the old claim.
- Retraction immediately invalidates the root and descendants for processing and
  creates a minimal replay-prevention tombstone. It never triggers automatic memory,
  ranking, or safety changes.

Proposed non-prod retention defaults for design review:

- Contained outbox pending/blocked payload: 30 days maximum, then purge.
- Non-adverse structured feedback: 90 days maximum.
- Minimal consent, idempotency, correction/retraction, and audit tombstone metadata:
  180 days, without feedback content or raw identity.
- Adverse reports: separate `adverse_regulatory_hold` class. Do not apply the short
  feedback TTL until jurisdiction and the legal role are confirmed. If the service
  is a U.S. MoCRA responsible person, current FDA material describes six-year
  adverse-event record retention (three years for a qualifying small business);
  legal confirmation is required before implementation.
- Erasure/revocation removes evidence from personalization/candidate eligibility
  immediately. Any legally required retained record stays isolated from memory and
  ranking use and stores only what the legal purpose requires.

Adverse response:

- Separate adverse from satisfaction; never let satisfaction downgrade it.
- Show pre-approved static safety copy: stop using the product and contact an
  appropriate healthcare provider. Do not diagnose or generate medical advice.
- Unknown/inconsistent severity fails closed to human safety review.
- Flag potentially serious events for a human regulatory-obligation assessment;
  no external report/delivery is authorized by this M2 decision.

Implementation consequence:

- Requires reviewed consent ledger writes, purpose/version snapshot, outbox expiry
  fields and cleanup, append-only lineage, explicit link gate, and safety-review
  state. Only Cosmile Worker may later implement them.

Safety/privacy consequence:

- Strongest separation between commerce feedback, safety records, and memory. Higher
  UX friction and more policy/schema work.

What remains deferred:

- Jurisdiction determination, legal reporting integration, external delivery,
  Foundation intake, live users/production, and memory/ranking effects.

#### D3-B — One combined feedback consent with longer uniform retention

- One versioned consent covers local feedback and future cross-service evidence.
- Explicit link still required; correction/retraction remains append-only.
- Proposed default: 365-day feedback/outbox retention and 365-day minimal audit
  metadata; adverse records split only when classified serious.

Implementation consequence:

- Simpler UI/schema, but weak purpose separation and more stored data.

Safety/privacy consequence:

- Easier operation but greater consent ambiguity, correlation, and storage risk.
  Uniform retention can conflict with both minimization and longer regulatory holds.

What remains deferred:

- Same external/runtime exclusions; legal retention classification is still needed.

#### D3-C — Satisfaction-only pilot; defer adverse capture entirely

- Capture only structured satisfaction under explicit same-service consent.
- No adverse UI, no cross-service enqueue, no identity linking.
- Correction/retraction is append-only; proposed feedback TTL 30 days and minimal
  tombstone 90 days.

Implementation consequence:

- Smallest safe pilot; does not exercise the authorized adverse-evidence subset.

Safety/privacy consequence:

- Lowest immediate medical/regulatory risk, but loses an important safety reporting
  surface and cannot complete the intended B adverse plane.

What remains deferred:

- All adverse handling and cross-service evidence.

### Advisor recommendation for D3

Choose **D3-A**, with the proposed non-prod time limits treated as design inputs and
the adverse retention class held behind jurisdiction/legal confirmation. It is the
only option that does not force ordinary feedback TTLs onto potentially regulated
adverse records while still preventing those records from becoming memory or ranking
signals.

## Cross-decision consequences if D1-A / D2-A / D3-A are selected

```text
CONTROL_CONTRACT_ANALYSIS_REQUIRED: YES
  Reason: A/B/C share evidence version, identity, consent, lineage, retention,
  rejection reasons, and Foundation boundary across Cosmile and FOUNDATION.

DESIGNER_REQUIRED: YES
  Reason: additive schema/migration, UI/API state machine, outbox containment,
  correction/retraction, cleanup, rollback, and C implementation-ready contract.

DESIGN_REVIEW_REQUIRED: YES
IMPLEMENTATION_REVIEW_REQUIRED: YES

COSMILE_WORKER_LATER_SCOPE:
  A/B reviewed design only; local/non-prod/shadow; additive schema/migration;
  ephemeral DB rehearsal and rollback verification; flags OFF.

FOUNDATION_WORKER_SCOPE:
  NONE until a new explicit approval after C design review.
```

The execution sequence remains:

```text
Founder selects D1–D3
→ Advisor determines/dispatches required Control contract analysis
→ Designer implementation-ready design
→ independent design review
→ repo-local Cosmile Worker A/B implementation
→ independent implementation review and bounded delta loops
→ C contract + implementation-ready design
→ independent C design review
→ HARD STOP
→ Leo/GPT new approval
```

## Global exclusions preserved

```text
NO_REAL_TARGET_DB
NO_PRODUCTION_OR_LIVE_ACTIVATION
NO_MAIN_OR_PROTECTED_BRANCH_MERGE
NO_SECRET_ACTIVATION
NO_PERSISTENT_FEATURE_FLAG_ACTIVATION
NO_OUTBOX_CONSUMER_OR_DELIVERY
NO_FOUNDATION_INTAKE
NO_C_RUNTIME_CONNECTION
NO_AUTOMATIC_MEMORY_PROMOTION
NO_RANKING_OR_SAFETY_MUTATION
NO_FULL_PACKAGE_1B_AUTHORITY
```

## Evidence anchors

Local evidence was read directly at:

```text
COSMILE_HEAD: 6e44aa40ffb2960573839a01424761dc5e98d610
FOUNDATION_HEAD: f6417004d9157766b2b23d4d0870ade7f0c7fe96
M1_REVIEWED_BASELINE_HEAD: 137b655016a875710695acaae898b160d5029ca8
M1_REVIEW_RESULT_HEAD: 7331ccffa8c893a38e56dab197ca626b0dc7b782
M1_FINAL_HEAD: cc13b2ea2fab9151d5b0b50a5f843ca74c65dcfb
```

Primary local files:

- Cosmile `app/prisma/schema.prisma`
- Cosmile `app/src/lib/recommendationEventService.ts`
- Cosmile `app/src/lib/commerceEventService.ts`
- Cosmile `app/src/lib/foundationSignalMapper.ts`
- Cosmile `app/src/lib/attribution.ts`
- Cosmile `app/src/lib/memoryCandidate.ts`
- Cosmile `app/src/types/{canonicalEvent,recommendationEvent,recOutcome}.ts`
- Cosmile `설계자료/COSMILE_Foundation_Signal_Contract.md`
- FOUNDATION `foundation/shared_memory/{store,gate,subject_identity,api}.py`
- FOUNDATION `foundation/_core/{learning_approval_workflow,foundation_customer_decision_memory,reuse_gate}.py`

Public policy references used only to frame D3 conservatively:

- FDA, How to Report a Cosmetic Product Related Complaint:
  `https://www.fda.gov/cosmetics/cosmetics-compliance-enforcement/how-report-cosmetic-product-related-complaint`
- FDA, MoCRA overview and adverse-event duties:
  `https://www.fda.gov/cosmetics/cosmetics-laws-regulations/modernization-cosmetics-regulation-act-2022-mocra`
- FDA draft records-access guidance announcement (retention summary):
  `https://www.fda.gov/cosmetics/cosmetics-news-events/fda-issues-draft-guidance-industry-fda-records-access-authority-cosmetics-products`
- EU GDPR, Regulation (EU) 2016/679, Articles 5, 7, 16, 17:
  `https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng`

These references do not determine the product's jurisdiction or replace legal
review.

## Return state

```text
RETURN_TO: Leo/GPT
REQUIRED_RESPONSE: explicit D1, D2, and D3 selection
M2_IMPLEMENTATION: NOT_AUTHORIZED_UNTIL_D1_D3_DECIDED_AND_DESIGN_REVIEWED
C_IMPLEMENTATION: NOT_AUTHORIZED
FULL_PACKAGE_1B: NOT_AUTHORIZED
NEXT_ACTION_BEFORE_RESPONSE: NONE
STOP
```
