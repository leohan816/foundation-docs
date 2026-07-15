# M2 A/B — Cosmile Recommendation Lifecycle and Purchase-Feedback Evidence Design

Status: DESIGN_READY_FOR_INDEPENDENT_REVIEW

MISSION_ID: MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1
WORK_UNIT_ID: M2-AB-DESIGN
ROLE: Foundation Designer
MODE: COSMILE_AB_IMPLEMENTATION_READY_DESIGN
RESPONSIBLE_ADVISOR: foundation-advisor
RETURN_TO: foundation-advisor

ACTUAL_ACTOR: foundation-designer
ACTUAL_SESSION: foundation-designer
ACTUAL_TMUX: session $29 · window 0 · pane %29
ACTUAL_WORKSPACE: /home/leo/Project/Cosmile
ACTUAL_MODEL_EFFORT: gpt-5.6-sol / max
REQUIRED_SKILL_APPLIED: /fable-builder
SKILL_APPLICATION: anchor-first; contract-to-code mapping; test design before code; no implementation or review activity

TARGET_BRANCH: shadow/m4-cosmile-memory
TARGET_HEAD_VERIFIED: 6e44aa40ffb2960573839a01424761dc5e98d610
CONTROL_CONTRACT_COMMIT_VERIFIED: 73889c86f5170cfe20718a237dff989d52960c9f
FOUNDATION_DOCS_BRANCH: advisor/foundation-team-role-alignment-20260714

PRODUCT_WRITE: ZERO
TEST_EXECUTION: ZERO
DB_ACCESS: ZERO
NETWORK_OR_PROVIDER_ACCESS: ZERO
COMMIT_OR_PUSH: ZERO
NEW_AGENT_OR_SUBAGENT: ZERO

## 0. Authority, evidence, and honest limitations

Fixed authority:

- Founder decision: D1-A, D2-A, D3-A in 24_M2_FOUNDER_D1_D3_DECISION.md.
- Advisor scope: PROCEED_WITH_LIMITS in 25_M2_ADVISOR_INTAKE_AND_ROUTING.md.
- Control input: M2_AB_CONTROL_CONTRACT_RESULT.md at commit 73889c86.
- Current role authority: Agent Office TEAM_OPERATING_MODEL.md and roles/designer.md.
- Product authority: Cosmile AGENTS.md, root CLAUDE.md, app/AGENTS.md, app/CLAUDE.md, security, environment/migration, and test-meaning policies.

Direct evidence read at Cosmile HEAD 6e44aa40:

- current recommendation and consultation UI;
- order history and order-detail UI;
- CommerceEvent, RecommendationEvent, RecOutcomeEvent, RecOutcomeFeedback, ConsentRecord, SubjectRefMap, Order, OrderItem, and FoundationSignalOutbox schema;
- current migrations and rollback scripts;
- recommendation, attribution, outcome, outbox, identity, cart, checkout, wishlist, API, and event-builder source;
- current provider-independent, event-contract, and ephemeral-DB tests.

The six pre-existing untracked Cosmile documentation files were not edited,
staged, copied, or used as authority. They remain unrelated user-owned dirt.

Visual evidence:

- The only tracked raster asset, image/logo.jpg, was opened read-only at its
  original 633 × 217 pixels. It confirms the orange bag mark and near-black
  cosmile wordmark.
- The actual storefront frame and visual tokens were inspected from
  app/src/app/globals.css: 390 × 844 desktop device frame, full-screen below
  480 px, orange #f2622a primary, #d94f1c secondary, warm #f3eee7 surface, and
  the existing neutral/red/amber safety palette.
- No live browser, server, test, DB, or screenshot run was authorized. No claim
  of rendered-runtime visual verification is made. The implementation review
  must inspect the implemented UI at 390 × 844 and at text zoom before closure.

## 1. Fixed decisions and design resolutions

### 1.1 Founder-fixed requirements, not reopened

F1. RecommendationEvent.sessionId is nullable and, when present, is a
Cosmile-local opaque reference.

F2. recommendationId is minted at the first actual recommendation presentation
and propagated through view, click, save, dismiss, cart, and purchased-line
evidence.

F3. CommerceEvent remains the general ledger. RecommendationEvent is canonical
for the recommendation lifecycle. Mapping happens at producer time.

F4. Cosmile owns deterministic, versioned normalization of closed choices.

F5. Cosmile creates zero MemoryFactCandidate rows, zero adverse candidates, and
makes zero candidate creation or promotion calls in A/B.

F6. Same-service feedback storage and cross-service commerce-evidence use have
separate consent purposes. Login or userId is never consent.

F7. Identity linking is OFF by default. Cart/account merge is not evidence-link
consent.

F8. Corrections are append-only. Retractions append a record and a minimal
tombstone; silent overwrite and destructive re-key are forbidden.

F9. Satisfaction and adverse input are independent. Satisfaction can never
lower adverse severity or handling.

F10. Adverse response is pre-approved static guidance only. No diagnosis,
generated medical advice, or external regulatory reporting.

F11. Retention periods are non-production inputs only. The duration of
adverse_regulatory_hold is neither implemented nor activated.

F12. Everything remains local/non-prod/shadow, flags OFF, producer-only, with no
consumer, delivery, retry transport, network, Foundation intake, or C runtime.

### 1.2 Current contradictions the Worker must fix

| ID | Current truth | Required resolution |
|---|---|---|
| R1 | RecommendationEvent.sessionId is non-null in schema and migration SQL while the only caller passes null. | Relax sessionId to nullable with no backfill. |
| R2 | trackRecommendationEvent mints a new recommendationId at add-to-cart. | Mint once, server-side, immediately before the first explicit recommendation card is revealed; every later event must provide and validate the existing ID. |
| R3 | recommendationId is the RecommendationEvent primary key, so one ID cannot have shown, clicked, saved, dismissed, and added-to-cart rows. | Add eventId as the row primary key; make recommendationId non-unique and enforce one canonical row per recommendationId + eventType. This is an empty-shadow, reversible constraint correction with a hard zero-row precondition. |
| R4 | ConsultFoundationResult emits recommendation_view whenever product cards exist, even though the Foundation surface has a separate showRecommendation flag. | Only showRecommendation=true creates recommendation lifecycle evidence. Generic/product-only cards remain CommerceEvent-only. |
| R5 | Generic cart additions always call RecommendationEvent and therefore mint false recommendations. | A cart addition creates a recommendation lifecycle row only when a valid propagated recommendationId belongs to the same shopper and product. |
| R6 | Purchase outcomes are always organic and recommendationId is null. | Copy validated recommendation context from CartItem to OrderItem and resolve direct/session/organic at paid transition. |
| R7 | FoundationSignalOutbox infers user_consented from userId. | Remove that inference. No legacy generic signal enqueue is eligible without an explicit, versioned consent snapshot. |
| R8 | RecOutcomeFeedback has one semanticLabel and cannot represent independent satisfaction and adverse axes, consent snapshots, lineage, or retention. | Leave it untouched as a legacy shadow model; introduce a separate CommerceEvidenceRecord for the A/B contract. |
| R9 | The order-detail page has purchased lines but no feedback entry. | Add a per-paid-line feedback action and one shared modal/bottom-sheet flow. |
| R10 | Outbox has no opaque purchased-line reference, lineage, or expiry representation. | Add evidence-only columns and conditional constraints; retain legacy rows without re-keying. |

These are implementation design decisions, not new product policy. If the
RecommendationEvent table contains any row during migration preflight, R3 cannot
be applied under this no-backfill authority and the Worker must return HOLD.

## 2. SPACE — product surfaces and layout

### 2.1 Current surface inventory

| Surface | Current source truth | A/B classification |
|---|---|---|
| /consult, Foundation-contract result | ConsultFoundationResult renders product cards and emits recommendation/product-card view/click events. Cards currently have no real CTA. | The only customer-facing canonical recommendation presentation surface in A/B, and only when surface.showRecommendation is true. |
| /consult generic Foundation product cards | surface.showProductCards can be true independently of showRecommendation, but the current view mapper drops that distinction. | Product-card ledger only. Never mint recommendationId. Header copy: “참고 상품”. |
| /slice/debug legacy RecommendationCards | Debug scenario path with legacy decision cards and cart actions. | Test/debug evidence only. Never becomes the canonical A/B recommendation origin. No A/B lifecycle writer is attached. |
| /products/[id] “추천하는 이유” | Static product-pitch copy explicitly says exact suitability is decided in consultation. | Not a recommendation lifecycle surface. No recommendationId mint. |
| Generic home/shop/search/product cards | Ordinary merchandising and catalog surfaces. | CommerceEvent only. No recommendationId mint. |
| /orders/[orderId] | Paid order and line-item cards exist; no feedback control. | Canonical purchased-line feedback entry. |
| /account/orders | Order list links to order detail. | Discovery path only; no feedback form in the list. |

### 2.2 Recommendation card target at 390 × 844

The card remains inside the current AI message bubble and uses the existing
Cosmile visual language. Minimum tap target is 44 × 44 px.

    ┌──────────────────────────────────────┐
    │ 상담 추천                     1 / 2  │
    │ Foundation 판단으로 표시된 상품이에요│
    ├──────────────────────────────────────┤
    │ Product name                         │
    │ Brand · category · spec              │
    │ Match reason                         │
    │                                      │
    │ [상품 보기] [♡ 찜] [장바구니 담기]  │
    │ [이 추천 숨기기]                     │
    └──────────────────────────────────────┘

Before recommendation IDs are durably prepared, product names and actions are
not revealed. Show a fixed-height skeleton with “추천을 준비하고 있어요”.
If preparation fails while the A flag is enabled, show no cards and the honest
blocked state: “추천 기록을 준비하지 못해 상품 제안을 표시하지 않았어요.
잠시 후 다시 시도해 주세요.”

Generic cards use the same visual card but the heading is “참고 상품”; they have
no dismiss/save/cart recommendation lifecycle mapping and no recommendation ID.

### 2.3 Purchased-line feedback target

Each eligible line in /orders/[orderId] gains a full-width, 44 px minimum action
below price/quantity:

    ┌──────────────────────────────────────┐
    │ 🧴 Product name              ₩…      │
    │ option · quantity                    │
    │ [이 상품 피드백 남기기]              │
    └──────────────────────────────────────┘

The action opens one modal surface:

- below 480 px: bottom sheet, width 100%, max-height 78dvh, 20 px top corners;
- 480 px and above: centered dialog, max-width 420 px, max-height 78dvh;
- body scrolls independently; title and final action remain sticky;
- safe-area bottom padding is included;
- at 200% text zoom, no fixed-height content region may clip controls.

    ┌──────────────────────────────────────┐
    │ 구매한 상품 피드백              [닫기]│
    │ Product name · option                │
    ├──────────────────────────────────────┤
    │ 1. 만족도 (선택 안 함 가능)          │
    │ ( ) 좋았어요  ( ) 보통  ( ) 아쉬움  │
    │                                      │
    │ 2. 사용 중 불편/안전                  │
    │ ( ) 없음  ( ) 피부 반응              │
    │ ( ) 그 외 불편  ( ) 사용 안전 질문  │
    │ [severity choices when applicable]   │
    │                                      │
    │ 3. 동의                              │
    │ [ ] 코스마일 피드백 저장             │
    │ [ ] 서비스 간 활용 검토용 보관       │
    │                                      │
    │ [피드백 저장]                        │
    └──────────────────────────────────────┘

Adverse guidance replaces neither the selected satisfaction nor the form. It
appears above the sticky action as a persistent role=alert block.

## 3. BEHAVIOR — journeys and state machines

### 3.1 Recommendation presentation and interaction

Eligibility:

1. Foundation response source must be foundation_http.
2. surface.mode must be commerce.
3. surface.showProductCards and surface.showRecommendation must both be true.
4. Product IDs must be a subset of Foundation-provided productRefs and the
   current Cosmile catalog result.
5. A feature flag must be enabled in a future, separately approved local/shadow
   rehearsal. It remains OFF in this implementation batch.

State flow:

    NOT_ELIGIBLE
      └─> ledger-only generic cards or no cards

    ELIGIBLE
      └─> PREPARING_PRESENTATION
            ├─ success -> PRESENTED
            │              ├─ product link -> CLICKED
            │              ├─ wishlist add -> SAVED
            │              ├─ dismiss -> DISMISSED
            │              └─ cart -> ADDED_TO_CART -> PURCHASED
            ├─ duplicate -> return existing IDs -> PRESENTED
            └─ failure -> BLOCKED_UNKNOWN, no recommendation cards

Recommendation lifecycle is a monotonic event set, not a mutable single status.
Each event type may appear once per recommendationId. Repeated UI retries return
the existing row; repeated general-ledger behavior remains available outside
the canonical lifecycle plane.

Presentation behavior:

- The client requests presentation preparation once per Foundation trace and
  product.
- The server derives identity; the client never supplies userId or guestId.
- The server creates one recommendationId per product, writes the shown
  lifecycle row and its mapped product_card_view CommerceEvent, then returns the
  opaque IDs.
- The card becomes visible only after that success when A is enabled.
- The response-level recommendation_view remains a ledger event and is not
  counted as a second product recommendation.

Interaction behavior:

- Product link: append recommendation_clicked and mapped product_card_click,
  store the opaque recommendation context in sessionStorage for that product,
  then navigate. The ID never appears in the URL.
- Save: the wishlist route derives identity and validates recommendation/product
  ownership before appending recommendation_saved. Wishlist removal is ledger
  only.
- Dismiss: append recommendation_dismissed and mapped
  ai_recommendation_ignored, remove the card, move focus to the next card or the
  result heading, and announce the change.
- Add to cart: include only recommendationId, productId, skuId, offerId, and
  quantity. The server validates the recommendation and writes
  recommendation_added_to_cart at the same producer boundary as cart_add.
- Generic add-to-cart with no valid recommendation ID is ledger-only and clears
  direct recommendation context for that latest cart-line touch.

### 3.2 Propagation to purchase

CartItem stores a nullable validated recommendationId, nullable sessionId, and
linkedAt. The latest cart-add touch wins. Multi-touch and quantity-weighted
attribution remain deferred.

Checkout copies the three fields into OrderItem. Guest-cart merge does not copy
recommendation context into an identified cart because cart merge is not
identity-link consent.

At paid transition, per order item:

1. Valid propagated recommendationId for the same product and identity:
   direct, recommendationId retained.
2. No propagated ID, but a non-null local session reference and a canonical
   recommendation match for the same product/session:
   session, recommendationId null.
3. Otherwise:
   organic, recommendationId null.

The resolver reads RecommendationEvent only. It never reconstructs the
lifecycle from broad CommerceEvent history. Current A/B has no authoritative
session mint, so sessionId remains null unless an already-authorized local
session source exists; the Worker must not invent one.

### 3.3 Purchased-line feedback

Entry eligibility:

- server-derived owner matches the order;
- Order.paidAt is non-null;
- the line belongs to that order;
- the B feature flag is enabled in a future local/shadow rehearsal;
- pending or cancelled orders are blocked;
- no raw order or line ID is returned in the evidence envelope.

Flow:

    ENTRY_READY
      -> EDITING
      -> LOCAL_CONSENT_GATE
          ├─ missing/revoked/expired -> BLOCKED_LOCAL, no write
          └─ granted
              -> NORMALIZE
                  ├─ invalid -> FIELD_ERROR, no evidence/outbox
                  ├─ adverse severity unknown -> LOCAL_HUMAN_REVIEW, no outbox
                  └─ valid -> LOCAL_SAVED
                      ├─ cross-service consent absent -> LOCAL_ONLY
                      ├─ guest -> LOCAL_ONLY_GUEST
                      ├─ adverse hold duration unset -> LOCAL_HOLD_ONLY
                      └─ identified + granted + eligible -> OUTBOX_PENDING

At least one meaningful axis is required:

- satisfaction selected; or
- skin reaction, other adverse, or usage-safety selected.

Selecting “no adverse issue” without a satisfaction choice is not enough to
create evidence, because the normalized envelope would contain no feedback.

### 3.4 Correction and retraction

Correction:

- User opens the latest effective record for the same purchased line.
- The form is pre-populated only with closed structured values.
- Submit creates a new correction record with the same rootEvidenceId and
  supersedesEvidenceId pointing to the current leaf.
- Old rows are not updated or deleted.
- A stale concurrent correction fails with correction_target_not_current.
- Cross-service eligibility is recalculated from current consent; it is never
  inherited from the old record.

Retraction:

- Available even when current consent is revoked or expired.
- Requires an explicit confirmation: “이 피드백을 철회합니다. 서비스 간 활용
  대상에서 즉시 제외되며, 최소한의 재처리 방지 기록은 남습니다.”
- Appends a retraction record and a minimal tombstone.
- Blocks every pending/blocked outbox row in the root lineage.
- No new cross-service outbox row is created after consent revocation.
- Root and descendants become ineligible for processing immediately.
- No automatic memory, ranking, or safety action occurs.
- A legally held adverse source record remains isolated and ineligible until a
  separate legal retention decision; A/B does not delete or time-limit it.

### 3.5 Consent state machine

Purpose codes:

- same_service_purchase_feedback
- cross_service_commerce_evidence
- identity_linking

Notice versions:

- cosmile.same_service_purchase_feedback.v1
- cosmile.cross_service_commerce_evidence.v1
- cosmile.identity_linking.v1

Effective state:

    MISSING
      -> GRANTED (explicit unchecked-to-checked user action)
      -> REVOKED (append new record)
      -> GRANTED (new explicit action and new row)

    GRANTED
      -> EXPIRED (policy/system record; no automatic expiry period is invented)
      -> GRANTED (new explicit action and new row)

Rules:

- Absence of a record means missing.
- Consent rows are append-only; latest capturedAt wins.
- pending may represent a displayed notice but never authorizes storage or
  enqueue.
- granted requires purpose, notice version, capturedAt, server-derived actor,
  and explicit action.
- login, userId, checkout, cart merge, or account merge creates no consent.
- revocation immediately blocks future enqueue.
- expiry is honored when observed, but A/B introduces no automatic consent TTL.

Exact user-facing notice copy:

- Same service: “구매한 상품에 대한 선택형 피드백을 코스마일에 저장하는 데
  동의합니다. 자유문장은 저장하지 않습니다.”
- Cross service: “이 선택형 피드백을 최소화된 커머스 증거로 검토 대기 큐에
  보관하는 데 동의합니다. 현재 외부 전송이나 자동 학습은 하지 않습니다.”

Both controls start unchecked. The second control never implies the first.

### 3.6 Identity-linking model

Implemented A/B state is OFF only:

- SubjectRefMap.allowLink remains false.
- No A/B route, UI, or service may set it true.
- Identified evidence may use the service-local subject_ref in the contained
  outbox while identity_link_allowed remains false.
- Anonymous local feedback may be stored under same-service consent, but cannot
  enter the cross-service outbox.
- Login after guest feedback does not re-key, merge, or enqueue that feedback.

Future transition, not implemented:

    OFF
      -> explicit identity-link action
      -> current identity_linking consent GRANTED
      -> LINK_ALLOWED
      -> revoke/expire -> OFF

Any attempt to make LINK_ALLOWED reachable in A/B is a HARD STOP.

## 4. INFORMATION — closed choices, copy, and truthful states

### 4.1 Closed input vocabulary

Satisfaction choice:

- satisfied — “좋았어요”
- neutral — “보통이에요”
- dissatisfied — “아쉬웠어요”
- not_selected — UI-only, normalizes to null

Adverse choice:

- none — “불편이나 안전 질문 없음”
- skin_reaction — “피부 반응이 있었어요”
- other — “그 외 불편이 있었어요”
- usage_safety — “계속 사용해도 되는지 궁금해요”
- not_selected — UI-only

Severity choice, shown only for skin_reaction or other:

- low — “가벼웠어요”
- moderate — “사용을 멈출 정도였어요”
- severe — “심한 반응이었어요”
- unknown — “정도를 잘 모르겠어요”

No free-text field exists. Unknown object keys, strings outside the closed sets,
and any raw_text/message/note/answer field are rejected.

### 4.2 Static adverse guidance

For skin_reaction, other, usage_safety, or unknown severity, show:

“제품 사용을 중단하고 적절한 의료 전문가에게 문의하세요.”

For severe or unknown severity, add:

“안전 검토가 필요한 상태로 표시됩니다. 외부 신고는 자동으로 이루어지지
않습니다.”

These are static strings. No model/provider call, diagnosis, treatment claim, or
generated medical advice is permitted.

### 4.3 Truthful result labels

| State | User label |
|---|---|
| local saved, no cross-service consent | “코스마일에만 저장됐어요. 서비스 간 활용 대상은 아닙니다.” |
| identified and contained outbox pending | “검토 대기 큐에 보관됐어요. 아직 외부로 전송되지 않았습니다.” |
| guest | “게스트 피드백은 코스마일에만 저장돼요.” |
| adverse hold unset | “안전 관련 피드백은 별도 보관 상태예요. 서비스 간 활용은 보류됐습니다.” |
| duplicate request | “이미 처리된 피드백입니다.” |
| retracted | “피드백이 철회되어 활용 대상에서 제외됐습니다.” |
| feature off | “이 기능은 현재 비활성 상태입니다.” |
| server outcome unknown | “저장 상태를 확인하지 못했어요. 다시 확인해 주세요.” |
| offline | “연결되지 않아 아직 저장하지 못했어요. 선택 내용은 이 화면에 남아 있습니다.” |

UNKNOWN is never rendered as success.

## 5. TECHNOLOGY — exact implementation contract

### 5.1 Event taxonomy and producer-time mapping

| Product action | General CommerceEvent | Canonical recommendation/outcome plane | Mapping rule |
|---|---|---|---|
| Recommendation result container shown | recommendation_view | none | Response-level ledger only; never counted per product. |
| Explicit recommended product first revealed | product_card_view | RecommendationEvent.recommendation_shown | One recommendationId per product; same producerEventKey in both rows. |
| Recommended product opened | product_card_click | RecommendationEvent.recommendation_clicked | Existing validated recommendationId. |
| Recommended product saved | wishlist_add | RecommendationEvent.recommendation_saved | Only wishlist-add, not removal. |
| Recommended product dismissed | ai_recommendation_ignored | RecommendationEvent.recommendation_dismissed | Card is removed after server acknowledgement or an honest local error state. |
| Recommended product added to cart | cart_add | RecommendationEvent.recommendation_added_to_cart | Only a validated propagated ID. |
| Paid order | purchase_complete | RecOutcomeEvent per purchased line | Direct/session/organic resolver; no new RecommendationEvent type. |
| Generic/static product action | existing ledger event | none | Product-card-only behavior remains ledger-only. |

Aggregation invariant:

- General operational analytics reads CommerceEvent.
- Recommendation lifecycle analytics reads RecommendationEvent and
  RecOutcomeEvent.
- A query must never sum mapped rows from both planes.
- producerEventKey is the explicit join/deduplication key.

### 5.2 ID minting and deterministic idempotency

| Identifier | Format and mint point | Propagation |
|---|---|---|
| recommendationId | Existing rec_v3_ + ULID26; server mints at successful first presentation preparation. | Client card context -> click/save/dismiss/cart -> CartItem -> OrderItem -> RecOutcomeEvent and CommerceEvidenceRecord. |
| recommendation eventId | rec_evt_v1_ + ULID26; server per lifecycle row. | Internal only. |
| sessionId | null, or csess_v1_ + ULID26 from an already-authorized Cosmile-local session source. A/B mints none. | RecommendationEvent -> CartItem -> OrderItem. Never cross-service identity. |
| purchaseItemRef | pir_v1_ + ULID26; server lazily mints once for a paid OrderItem. | CommerceEvidenceRecord and outbox envelope; raw orderItemId never leaves local persistence. |
| evidenceId | cevi_v1_ + ULID26; server per root/correction/retraction. | Local lineage and outbox envelope. |
| sourceEventId | pf_evt_v1_ + ULID26; server per feedback action. | Envelope source and idempotency input. |
| clientRequestId | pf_req_v1_ + browser crypto.randomUUID; minted once per submit attempt and reused on retry. | API -> unique local request key. |

Deterministic keys:

- presentationDedupeKey =
  sha256("cosmile.rec.presentation.v1" + foundationTraceId + productId).
- producerEventKey =
  sha256("cosmile.rec.lifecycle.v1" + recommendationId + eventType).
- evidence idempotencyKey =
  sha256("cosmile.commerce_evidence.v1" + sourceEventId + evidenceType +
  normalizerVersion).
- sourceHash =
  sha256 of canonical, key-sorted normalized envelope fields excluding
  sourceHash itself.

Stored values use explicit prefixes:

- rec_present_v1_<64 lowercase hex>
- rec_producer_v1_<64 lowercase hex>
- cevi_idem_v1_<64 lowercase hex>
- cevi_source_v1_<64 lowercase hex>

No secret is required for these hashes because inputs are already opaque and
the hashes are for idempotency/provenance, not identity. Hash values are never
logged or copied into result evidence.

Lifecycle uniqueness:

- unique producerEventKey;
- unique recommendationId + eventType;
- presentationDedupeKey unique only for recommendation_shown;
- duplicate requests return the existing canonical row and never create a
  second mapped row.

### 5.3 Versioned commerce-evidence envelope

Schema version is exactly cosmile.commerce_evidence.v1. This is separate from
the legacy v1 reaction-signal contract. It neither supersedes nor reinterprets
unrelated legacy signal rows.

| Field | Required/nullability | Closed rule |
|---|---|---|
| schema_version | required | cosmile.commerce_evidence.v1 only |
| evidence_id | required | cevi_v1_ + ULID26 |
| evidence_type | required | purchase_feedback, correction, retraction |
| source.service | required | cosmile |
| source.environment | required | local or shadow |
| source.source_event_id | required | pf_evt_v1_ + ULID26 |
| source.idempotency_key | required | deterministic cevi_idem_v1 hash |
| source.occurred_at | required | server UTC ISO-8601 |
| actor.subject_ref | outbox required | subj_v2_ + 32 lowercase hex |
| actor.anonymous_ref | local XOR; outbox null | anon_v3_ + 32 lowercase hex |
| actor.identity_state | required | identified or anonymous |
| actor.identity_link_allowed | required | false in A/B |
| purchase.purchase_item_ref | required | pir_v1_ + ULID26 |
| purchase.product_ref | required | existing canonical product ref |
| purchase.sku_ref | nullable | existing SKU ref only |
| purchase.purchase_state | required | paid |
| feedback.satisfaction | nullable | satisfied, neutral, dissatisfied |
| feedback.adverse_type | nullable | skin_reaction, other, usage_safety |
| feedback.adverse_severity | nullable/conditional | low, moderate, severe |
| feedback.adverse_certainty | nullable/conditional | reported only in A/B |
| consent.purpose | outbox required | cross_service_commerce_evidence |
| consent.state | outbox required | granted |
| consent.notice_version | outbox required | cosmile.cross_service_commerce_evidence.v1 |
| consent.captured_at | outbox required | server UTC ISO-8601 |
| privacy.raw_text_stored | required | false |
| privacy.contains_pii | required | false |
| privacy.retention_class | required | feedback_non_adverse_90d or adverse_regulatory_hold |
| lineage.root_evidence_id | required | root evidence ID; root points to itself |
| lineage.supersedes_evidence_id | correction only | current active leaf |
| lineage.retracts_evidence_id | retraction only | current active leaf |
| lineage.normalizer_version | required | cosmile.closed_feedback_normalizer.v1 |
| lineage.source_hash | required | deterministic cevi_source_v1 hash |

Outbox envelope identity is stricter than local storage:

- subject_ref required;
- anonymous_ref null;
- identity_state identified;
- identity_link_allowed false;
- guest evidence is rejected before outbox creation.

Retraction envelope, if eligible under an unrevoked consent, has all feedback
fields null. In A/B, revocation blocks new enqueue, so a post-revocation
retraction only blocks local pending rows and appends the local tombstone.

### 5.4 Deterministic normalization table

| Satisfaction input | Adverse input | Severity input | Normalized output | Local state | Outbox eligibility |
|---|---|---|---|---|---|
| satisfied/neutral/dissatisfied | none or not_selected | not applicable | satisfaction set; adverse fields null | valid | consent/identity gates apply |
| any or not_selected | skin_reaction | low/moderate/severe | adverse_type skin_reaction; severity selected; certainty reported | valid; severe also human_safety_review_required | local hold only; blocked with retention_hold_unconfigured until legal duration is fixed |
| any or not_selected | other | low/moderate/severe | adverse_type other; severity selected; certainty reported | valid; severe also human_safety_review_required | local hold only; blocked with retention_hold_unconfigured until legal duration is fixed |
| any or not_selected | skin_reaction or other | unknown | adverse type set; severity null; certainty reported | human_safety_review_required | blocked: adverse_fields_inconsistent |
| any or not_selected | usage_safety | not applicable | adverse_type usage_safety; severity null; certainty reported | valid + static guidance | consent/identity gates apply |
| not_selected | none or not_selected | not applicable | all feedback fields null | invalid | blocked: feedback_empty |
| any | none/not_selected | any severity value | inconsistent | invalid | blocked: adverse_fields_inconsistent |
| any | usage_safety | low/moderate/severe/unknown | inconsistent | invalid | blocked: adverse_fields_inconsistent |
| any | skin_reaction/other | missing | incomplete | invalid until selection; no write | blocked: adverse_fields_inconsistent |
| any unknown token | any | any | no normalization | invalid | blocked: invalid_normalization |

Satisfaction is never read by adverse severity or review-state code. Adverse
handling is computed first and merged by raise-only/MAX semantics.

### 5.5 Stable reason codes

Future Foundation C eligibility reason set is preserved exactly and is not
implemented here:

- unsupported_schema_version
- environment_not_allowed
- invalid_identity_xor
- identity_link_forbidden
- consent_missing
- consent_revoked
- consent_expired
- privacy_scope_exceeded
- raw_text_or_pii_present
- missing_purchase_item_ref
- missing_product_ref
- duplicate_evidence
- invalid_normalization
- adverse_fields_inconsistent
- lineage_broken
- provenance_untrusted
- evidence_retracted
- retention_expired

Cosmile-local A/B gate codes are a separate namespace:

- feature_disabled
- purchase_not_paid
- purchase_item_not_owned
- feedback_empty
- same_service_consent_missing
- cross_service_consent_missing
- guest_cross_service_forbidden
- identity_link_forbidden
- invalid_normalization
- adverse_fields_inconsistent
- adverse_severity_unknown
- correction_target_not_current
- evidence_retracted
- duplicate_request
- retention_hold_unconfigured
- outbox_write_failed

APIs return stable codes and status only. They never return raw order IDs,
customer IDs, payload JSON, hashes, secrets, or PII.

### 5.6 Consent and identity persistence

ConsentRecord remains the ledger and gains:

- purpose: nullable for legacy rows, required for A/B rows;
- noticeVersion;
- capturedAt;
- expiresAt nullable;
- supersedesConsentId nullable;
- sourceAction fixed to explicit_user_action for grants/revocations.

The existing non-null consentScope column remains a legacy compatibility
category and is never the A/B authority:

- same_service_purchase_feedback writes consentScope=same_service;
- cross_service_commerce_evidence and identity_linking write
  consentScope=cross_service;
- the new purpose field is the exact authoritative purpose.

A/B conditional database checks:

- purpose in the three closed values;
- state in pending, granted, revoked, expired;
- granted boolean equals state=granted for A/B rows;
- granted requires noticeVersion and capturedAt;
- revoked requires revokedAt;
- actor XOR subjectRef/guestRef;
- identity_linking grant is never consumed by any A/B writer.

SubjectRefMap is unchanged. allowLink must remain false and has zero A/B write
calls.

### 5.7 Append-only lineage and tombstone

CommerceEvidenceRecord rules:

- root purchase_feedback: rootEvidenceId=self; supersedes=null; retracts=null.
- correction: rootEvidenceId=root; supersedes=current leaf; retracts=null.
- retraction: rootEvidenceId=root; supersedes=null; retracts=current leaf;
  satisfaction/adverse fields all null.
- one successor per superseded evidence;
- one retraction per target;
- no correction after a root has a tombstone;
- no update to prior feedback fields.

CommerceEvidenceTombstone stores only:

- rootEvidenceId;
- replayKeyHash derived from purchaseItemRef and evidence purpose;
- reasonCode=evidence_retracted;
- retentionClass;
- retentionState;
- createdAt;
- expiresAt=createdAt+180 days for non-adverse metadata.

It stores no feedback content, raw identity, orderItemId, orderId, or consent
copy. For adverse_regulatory_hold, expiresAt remains null and
retentionState=duration_unconfigured until a separate legal decision.

### 5.8 Retention representation

| Record | Class | Representation | A/B behavior |
|---|---|---|---|
| New outbox pending/blocked row | outbox_pending_30d | queueExpiresAt=createdAt+30d | Eligible reads treat expired as blocked. No delivery consumer exists. Local purge implementation is not scheduled or activated. |
| Non-adverse structured feedback | feedback_non_adverse_90d | retentionExpiresAt=createdAt+90d | Eligibility stops at expiry. |
| Minimal consent/idempotency/lineage/tombstone metadata | audit_metadata_180d | expiresAt=createdAt+180d | Contains no feedback or raw identity. |
| Skin/other adverse report | adverse_regulatory_hold | retentionExpiresAt=null; retentionState=duration_unconfigured | Short TTL never applies. Cross-service enqueue is blocked with retention_hold_unconfigured. No duration or automatic purge is implemented. |
| usage_safety without an adverse report | feedback_non_adverse_90d | retentionExpiresAt=createdAt+90d | Static guidance remains; consent/identity gates apply. |

The 30/90/180 values are non-production constants in the design module and are
never environment-configurable in A/B. No production retention action is
authorized.

### 5.9 Outbox containment invariants

FoundationSignalOutbox is reused as the contained producer queue but new
commerce-evidence rows are distinguishable from legacy signal rows.

Required evidence-only columns:

- schemaVersion
- evidenceId
- subjectRef
- purchaseItemRef
- productRef
- rootEvidenceId
- supersedesEvidenceId
- retractsEvidenceId
- normalizerVersion
- sourceHash
- consentRecordId
- evidenceRetentionClass
- queueExpiresAt
- environment

For signalType=cosmile.commerce_evidence:

- signalVersion=cosmile.commerce_evidence.v1;
- canonicalUserId and anonymousId are null;
- subjectRef is non-null;
- purchaseItemRef, productRef, evidenceId, consentRecordId are non-null;
- status is pending or blocked only;
- sentAt and errorMessage are null;
- privacyLevel=purpose_consented_minimized;
- environment is local or shadow;
- payloadJson is the exact minimized envelope;
- raw orderItemId/orderId, userId, guestId, traceId, payment ID, free text, PII,
  price, margin, and shipping data are absent.

Legacy foundationSignalMapper hardening:

- userId no longer implies consent;
- without an explicit eligible consent snapshot it returns
  cross_service_consent_missing and creates no row;
- it does not downgrade user-level input to anonymous;
- it adds no sender, consumer, flush, retry, delivery, HTTP client, Foundation
  client, timer, cron, or queue worker.

### 5.10 Schema and migration plan

One new migration only:

- app/prisma/migrations/20260715120000_m2_ab_recommendation_feedback_evidence/migration.sql
- app/prisma/migrations/20260715120000_m2_ab_recommendation_feedback_evidence/down.sql

Do not edit historical migration files.

Schema changes:

1. CommerceEvent:
   - add recommendationId nullable;
   - add producerEventKey nullable unique;
   - add index on recommendationId.

2. RecommendationEvent:
   - add eventId as primary key;
   - recommendationId becomes non-unique indexed data;
   - sessionId becomes nullable;
   - add producerEventKey unique;
   - add presentationDedupeKey nullable unique;
   - unique recommendationId + eventType;
   - keep identity XOR, ID format, event enum, product, SKU, reason, and
     timestamptz checks.

3. CartItem and OrderItem:
   - add recommendationId nullable;
   - add recommendationSessionId nullable;
   - add recommendationLinkedAt nullable;
   - add OrderItem.purchaseItemRef nullable unique.

4. ConsentRecord:
   - add the append-only purpose/version/time/lineage fields in §5.6.

5. Add CommerceEvidenceRecord with the exact normalized fields, internal
   orderItemId FK, opaque purchaseItemRef, actor XOR, consent snapshots,
   lineage, retention, reason/status, clientRequestId unique, sourceEventId
   unique, and createdAt timestamptz.

6. Add CommerceEvidenceTombstone with §5.7 fields.

7. FoundationSignalOutbox:
   - add the evidence-only columns in §5.9;
   - add conditional checks for new commerce-evidence rows;
   - preserve legacy nullable compatibility.

Unchanged and zero-writer:

- MemoryFactCandidate
- LongTermMemoryFact
- RecOutcomeFeedback
- SubjectRefMap.allowLink
- all FOUNDATION and SIASIU schemas

Migration preconditions:

- exact branch/head still match the handoff;
- tracked Cosmile dirt remains zero;
- RecommendationEvent row count is zero in the disposable rehearsal DB;
- no real target DB connection exists;
- environment is demonstrably disposable local/shadow;
- feature flags remain OFF.

If RecommendationEvent has any row, STOP. Do not backfill, rewrite, merge, or
drop it.

Ephemeral forward rehearsal:

1. Create a disposable Postgres instance/schema.
2. Apply existing baseline migrations.
3. Assert RecommendationEvent count zero.
4. Apply the new migration.
5. Run only the DB contract cases in §8.
6. Remove disposable test rows.
7. Apply down.sql.
8. Assert the baseline schema shape is restored.
9. Reapply the migration and rerun the schema-only checks.
10. Destroy the disposable DB.

Rollback:

- Runtime rollback is flags OFF; no activation occurs.
- down.sql is rehearsal-only and begins with zero-row preconditions for every
  new A/B table and RecommendationEvent. It never deletes or rewrites data.
- If data exists, down.sql fails closed. The only authorized recovery is a
  forward schema correction under a new handoff.
- No production or persistent target rollback is designed or authorized.

### 5.11 Contract-to-code mapping

| Contract field | DB landing | API/event landing | Test anchor |
|---|---|---|---|
| schema_version | Outbox.schemaVersion | envelope.schema_version | rejects any non-v1 value |
| evidence_id | CommerceEvidenceRecord.evidenceId; Outbox.evidenceId | server output only | format + immutable + unique |
| evidence_type | CommerceEvidenceRecord.evidenceType | feedback action mapper | three accepted + concrete invalid rejection |
| source.service | payload constant | cosmile | exact constant |
| source.environment | record/outbox environment | server-derived local/shadow | production rejected |
| source.source_event_id | sourceEventId unique | server-minted | retry preserves |
| source.idempotency_key | Outbox.idempotencyKey unique | deterministic builder | same input same key; changed source changes key |
| source.occurred_at | createdAt | server UTC | invalid client time ignored |
| actor.subject_ref | record/outbox subjectRef | server-derived | XOR and format |
| actor.anonymous_ref | local record anonymousRef; outbox null | server-derived | local allowed; outbox guest rejected |
| actor.identity_state | derived, not independently trusted | identified/anonymous | matches XOR |
| actor.identity_link_allowed | false constant | false | true rejected |
| purchase.purchase_item_ref | OrderItem.purchaseItemRef; record/outbox | server mapping | raw line ID absent |
| purchase.product_ref | record/outbox productRef | server-owned line snapshot | missing/mismatch rejected |
| purchase.sku_ref | record skuRef nullable | server-owned line snapshot | null and valid SKU |
| purchase.purchase_state | paid constant after paidAt gate | paid | pending/cancelled blocked |
| feedback.satisfaction | record.satisfaction nullable | closed input mapper | each value + null |
| feedback.adverse_type | record.adverseType nullable | closed input mapper | each value + invalid |
| feedback.adverse_severity | record.adverseSeverity nullable | conditional mapper | low/moderate/severe/unknown axis |
| feedback.adverse_certainty | record.adverseCertainty nullable | reported only | repeated/verified/contradicted rejected in A/B input |
| consent.purpose | ConsentRecord.purpose | current effective grant | exact cross-service purpose |
| consent.state | ConsentRecord.state | effective state resolver | missing/revoked/expired blocked |
| consent.notice_version | ConsentRecord.noticeVersion | fixed copy version | absent/wrong blocked |
| consent.captured_at | ConsentRecord.capturedAt | server time | required for grant |
| privacy.raw_text_stored | false constant + no column | false | unexpected raw key rejected |
| privacy.contains_pii | false constant | false | PII-key/value fixtures rejected |
| privacy.retention_class | record.retentionClass | deterministic mapper | adverse cannot receive 90d |
| lineage.root_evidence_id | record.rootEvidenceId | server-derived | root/correction/retraction |
| lineage.supersedes_evidence_id | record.supersedesEvidenceId unique | correction action | branching rejected |
| lineage.retracts_evidence_id | record.retractsEvidenceId unique | retraction action | second retraction rejected |
| lineage.normalizer_version | record/outbox normalizerVersion | constant v1 | unsupported version rejected |
| lineage.source_hash | record/outbox sourceHash | canonical builder | stable under retry |

### 5.12 End-to-end key tracing

| Key | Mint/source | Propagation | Storage/join | Boundary |
|---|---|---|---|---|
| recommendation_id | present route via ids.ts | card context -> interaction/cart/wishlist -> CartItem -> OrderItem | RecommendationEvent, CommerceEvent, RecOutcomeEvent, CommerceEvidenceRecord | Opaque; never minted at cart. |
| subject_ref | ids.ts from server-derived local user | recommendation/evidence services | RecommendationEvent, RecOutcomeEvent, CommerceEvidenceRecord, evidence outbox | No raw user ID in envelope. |
| anonymous_ref | ids.ts from server-derived guest | recommendation/local feedback only | RecommendationEvent, RecOutcomeEvent, local evidence | Cross-service outbox forbidden. |
| order_item_id | internal OrderItem primary key | server ownership and FK only | RecOutcomeEvent and local evidence FK | Never in envelope/outbox/API result. |
| purchase_item_ref | lazy server mint after paid gate | local evidence -> envelope | OrderItem unique, record, outbox | Only purchased-line reference leaving local model. |
| candidate_id | not minted | no propagation | no A/B column/write | All candidate calls and writes remain zero. |

### 5.13 Safety precedence mapping

| Rule | Code structure | Required assertion |
|---|---|---|
| Satisfaction cannot reduce adverse | normalize adverse independently; merge state by MAX | satisfied + severe remains severe/human review |
| Unknown severity fails closed | explicit unknown branch before enqueue | no outbox; static guidance; human review state |
| Serious handling is not automatic reporting | local status only | no network/provider/import/consumer |
| Retracted evidence cannot re-enter | tombstone precheck before correction/new root/outbox | replay blocked |
| Candidate creation forbidden | no candidate imports/calls in allowlist | zero static references and zero fake calls |
| Identity link default OFF | no SubjectRefMap writer | allowLink remains false |
| Adverse short TTL forbidden | adverse branch before retention arithmetic | expiry null; duration_unconfigured |

## 6. Accessibility, responsive, and non-happy states

Keyboard and focus:

- Every control is a native button, link, checkbox, or radio.
- Radio groups use fieldset/legend; arrow keys and Space work natively.
- Opening feedback moves focus to the dialog heading; closing restores focus to
  the originating purchased-line button.
- Tab is trapped inside the modal while open; Escape closes unless a submit is
  in progress. Unsaved choices trigger a discard confirmation.
- Dismissing a recommendation moves focus to the next recommendation action or
  the section heading.

Screen reader:

- Dialog uses role=dialog, aria-modal=true, labelled heading, described product.
- Loading uses aria-busy; result messages use aria-live=polite.
- Static adverse guidance uses role=alert and is not color-only.
- Saved/dismissed states include text; wishlist uses aria-pressed.
- Internal IDs, reason codes, hashes, and source refs are never announced.

Motion:

- Default sheet transition may use at most 180 ms transform/opacity.
- prefers-reduced-motion removes translation, shimmer, spin except the existing
  semantically necessary busy indicator, and smooth scrolling.
- No state meaning depends on animation.

High text/static:

- No fixed card height.
- Sticky action remains reachable after internal scroll.
- At 200% zoom, radio labels wrap and remain paired with controls.
- Icons always have adjacent text or accessible names.
- Error, blocked, expired, revoked, duplicate, empty, loading, offline, and
  UNKNOWN states have explicit copy.

## 7. Exact Worker product-repository allowlist

The Cosmile Worker may touch only these paths under a later exact handoff.
The first file must be created from this independently reviewed design before
any code change:

Canonical product design document:

- 설계자료/COSMILE_추천수명주기_구매피드백_커머스증거_설계서.md

Schema and migration:

- app/prisma/schema.prisma
- app/prisma/migrations/20260715120000_m2_ab_recommendation_feedback_evidence/migration.sql
- app/prisma/migrations/20260715120000_m2_ab_recommendation_feedback_evidence/down.sql

Types and pure contracts:

- app/src/types/commerceEvent.ts
- app/src/types/recommendationEvent.ts
- app/src/types/recOutcome.ts
- app/src/types/commerceEvidence.ts
- app/src/lib/ids.ts
- app/src/lib/attribution.ts
- app/src/lib/commerceEvidenceNormalizer.ts
- app/src/lib/purchaseFeedbackState.ts
- app/src/lib/recommendationClientContext.ts

Server/domain services:

- app/src/lib/commerceEventService.ts
- app/src/lib/recommendationEventService.ts
- app/src/lib/recOutcomeEventService.ts
- app/src/lib/commerceEvidenceService.ts
- app/src/lib/foundationSignalMapper.ts
- app/src/lib/cart.ts
- app/src/lib/checkout.ts

API routes:

- app/src/app/api/recommendations/present/route.ts
- app/src/app/api/recommendations/[recommendationId]/events/route.ts
- app/src/app/api/cart/items/route.ts
- app/src/app/api/wishlist/toggle/route.ts
- app/src/app/api/orders/[orderId]/items/[orderItemId]/feedback/route.ts
- app/src/app/api/commerce-evidence/consents/route.ts
- app/src/app/api/checkout/mock-complete/route.ts

UI:

- app/src/lib/slice/consultFoundationView.ts
- app/src/components/slice/ConsultationChatShell.tsx
- app/src/components/slice/ConsultationMessageList.tsx
- app/src/components/slice/ConsultFoundationResult.tsx
- app/src/components/product/AddToCartButton.tsx
- app/src/components/product/WishlistButton.tsx
- app/src/components/feedback/PurchaseFeedbackPanel.tsx
- app/src/app/orders/[orderId]/page.tsx

Tests and rehearsal:

- app/scripts/v3_11.vitest.ts
- app/scripts/v3_11c_rec_event.vitest.ts
- app/scripts/v3_11c2_rec_outcome.vitest.ts
- app/scripts/m2_ab_recommendation_lifecycle.vitest.ts
- app/scripts/m2_ab_commerce_evidence.vitest.ts
- app/scripts/m2_ab_feedback_state.vitest.ts
- app/scripts/m2_ab_no_transport.mjs
- app/scripts/m2_ab_migration_rehearsal.dbtest.py

No other path is implied. In particular, do not modify:

- existing historical migrations;
- app/src/lib/memoryCandidate.ts;
- MemoryFactCandidate or LongTermMemoryFact code/schema;
- Foundation or SIASIU files;
- .env or secret files;
- package dependencies;
- legacy untracked documentation.

## 8. Test-first matrix

All implementation tests are written failing before corresponding code. A
failure is classified under TEST_MEANING_POLICY before changing code or test.

### 8.1 Provider-independent unit and contract tests — safe

Recommendation lifecycle:

- A flag OFF: no presentation/event/CommerceEvent write.
- showRecommendation=false: no ID mint or recommendation row.
- presentation mints one ID per product only after eligibility.
- repeated presentation request returns existing IDs.
- same recommendationId accepts shown + clicked + saved + dismissed +
  added-to-cart rows.
- duplicate stage collapses by producerEventKey and recommendationId+eventType.
- later event copies identity/product/session from shown row, not client input.
- null session accepted; fabricated/invalid session rejected.
- generic cart/wishlist actions create zero recommendation rows.
- guest recommendation cannot be reused after login.
- CommerceEvent and RecommendationEvent share producerEventKey.
- response-level recommendation_view is not dual-counted.

Attribution:

- direct propagated ID;
- session fallback with recommendationId null;
- organic fallback;
- no broad CommerceEvent lookup;
- invalid/mismatched ID becomes ledger-only/organic, not direct;
- latest cart touch replaces or clears direct context deterministically;
- guest-cart merge drops recommendation context.

Normalization and safety:

- every row in §5.4;
- satisfied + severe remains severe;
- satisfaction changes do not alter adverse output;
- unknown severity produces human review and zero outbox;
- repeated/verified/contradicted cannot be selected by A/B;
- static adverse copy is a constant and no provider is called;
- raw/free-text/unknown keys rejected.

Consent and identity:

- missing, pending, revoked, expired all block the appropriate gate;
- userId/login without a grant blocks;
- same-service grant does not imply cross-service grant;
- cross-service grant does not imply identity linking;
- guest local save allowed only with same-service grant;
- guest outbox always rejected;
- allowLink has zero writer calls;
- revocation blocks future enqueue immediately.

Lineage:

- root, correction, retraction shapes;
- stale correction and branching rejected;
- second retraction rejected;
- tombstone prevents replay;
- correction never mutates prior values;
- retraction contains no feedback.

Retention:

- 30/90/180 arithmetic from server time;
- adverse skin/other expiry remains null and state duration_unconfigured;
- adverse never receives short feedback TTL;
- expired evidence is ineligible;
- no scheduled cleanup/consumer is created.

### 8.2 API tests with injected repositories — safe

- owner and paid-line gate;
- non-owner returns a generic not-found response;
- pending/cancelled order blocked;
- duplicate clientRequestId returns prior status;
- request body whitelist;
- no raw IDs/hashes/payload in response;
- local-only, guest-only, outbox-pending, human-review, revoked, expired,
  duplicate, retracted, and UNKNOWN response states;
- correction/retraction authorization;
- feature flags default OFF and production always blocked.

### 8.3 UI state tests — safe

- feedback entry only for paidAt lines when flag eligibility says available;
- all focus targets and accessible labels exist;
- submit disabled until local consent and a meaningful axis;
- cross-service checkbox never prechecked;
- guest cross-service control disabled with explanation;
- severity fields conditionally visible;
- adverse guidance persists regardless of satisfaction;
- duplicate is success-with-existing-status, not a second success record;
- offline/UNKNOWN never shows saved;
- correction and retraction copy/states;
- recommendation preparation hides cards until IDs exist;
- generic cards never show recommendation actions.

### 8.4 Ephemeral DB contract and migration rehearsal — safe only in disposable Postgres

- nullable RecommendationEvent.sessionId;
- eventId primary key and multiple lifecycle rows per recommendationId;
- unique stage and producer key;
- identity XOR and ID formats;
- CartItem/OrderItem propagation columns;
- purchaseItemRef uniqueness;
- CommerceEvidenceRecord closed enums, XOR, conditional adverse, and lineage
  constraints;
- consent conditional checks;
- outbox new-row constraints: raw columns null, pending/blocked only, no sentAt;
- adverse retention cannot have a duration;
- non-adverse retention must have an expiry;
- zero candidate/adverse-candidate writes;
- forward/down/forward rehearsal with zero-row rollback preconditions.

Infra unavailable is SKIP, never PASS.

### 8.5 Static containment checks — safe

- no Foundation client, fetch, HTTP, socket, consumer, sender, flush, retry
  worker, timer, cron, queue poller, or delivery import in the evidence server
  services;
- no added MemoryFactCandidate, canCreateCandidate, canPromote,
  LongTermMemoryFact, or adverse-candidate reference/call in the diff; new A/B
  service files contain zero such references;
- no .env change and no feature flag set true;
- no raw_text/message/note/answer field in the envelope builder;
- no orderId/orderItemId/userId/guestId/traceId/payment ID in payloadJson;
- no test assertion weakening, skip, snapshot refresh, or case deletion.

### 8.6 Targeted regression — safe under the Worker handoff

- existing v3_11 provider-independent suite;
- existing recommendation-event suite;
- existing outcome-event suite;
- current event schema and view/click contract evals;
- TypeScript check and production build only with all A/B flags OFF and no
  external provider/DB access;
- affected cart, wishlist, checkout, order-detail, and consultation behavior.

### 8.7 Prohibited checks/actions

- real target DB query or migration;
- production/staging persistent DB;
- migration deploy;
- live flag activation;
- secret creation, reading, rotation, or env dump;
- Foundation/SIASIU network calls;
- outbox delivery/consumer/retry;
- real user/order/PII fixtures;
- main/protected branch, merge, commit, push, or deployment under this design
  handoff.

## 9. Implementation sequence and code ownership

Every product file belongs to the Cosmile Worker. Control and Designer write no
product file. Reviewer patches nothing.

1. Worker verifies exact branch/head, clean tracked state, model/effort, and
   handoff.
2. Worker creates the canonical product design document from the independently
   reviewed version of this result; records version, date, and change history.
3. Worker writes failing pure tests for closed normalization, consent, lineage,
   event mapping, idempotency, and zero-candidate/zero-transport invariants.
4. Worker writes the new migration and disposable rollback rehearsal; does not
   connect to a real target.
5. Worker lands the RecommendationEvent constraint correction and producer-time
   event service.
6. Worker lands client context and cart/wishlist/checkout propagation.
7. Worker lands consent, evidence, lineage, tombstone, retention, and contained
   outbox services.
8. Worker lands recommendation and purchased-line feedback UI/API.
9. Worker runs only the approved targeted checks at max verification effort.
10. Worker records proved/not-proved evidence and returns its result to
    foundation-advisor.
11. Independent Reviewer performs DESIGN/IMPLEMENTATION review as routed. Any
    correction returns to the same author and is delta-reviewed by the same
    Reviewer.

No step activates a flag, sends an outbox row, contacts Foundation, or creates a
candidate.

## 10. Requirement-to-design-to-file-to-test traceability

| Requirement | Design sections | Primary files | Test groups |
|---|---|---|---|
| Current UX/source inventory | §0, §2 | existing source evidence; canonical design doc | review inspection |
| Presentation and interaction states | §3.1, §5.1 | ConsultFoundationResult; recommendation routes/service | §8.1, §8.3 |
| Responsive/accessibility/UNKNOWN | §2, §4.3, §6 | recommendation and feedback components | §8.3 |
| Event taxonomy and ID propagation | §5.1, §5.2, §5.12 | event service; cart; checkout; types | §8.1, §8.4 |
| Versioned envelope and fields | §5.3, §5.11 | commerceEvidence types/normalizer/service | §8.1, §8.4 |
| Closed normalization and invalid combos | §4.1, §5.4, §5.5 | normalizer; feedback state | §8.1 |
| Consent and identity linking | §3.5, §3.6, §5.6 | consent/evidence service; consent route | §8.1, §8.2, §8.4 |
| Correction/retraction/tombstone | §3.4, §5.7 | evidence service; feedback route | §8.1, §8.2, §8.4 |
| Retention representation | §5.8 | schema; evidence service | §8.1, §8.4 |
| Outbox containment | §5.9 | foundationSignalMapper; evidence service; schema | §8.4, §8.5 |
| Additive migration/rollback | §5.10 | schema; new migration/down | §8.4 |
| Exact Worker allowlist | §7 | all listed paths | scope diff audit |
| Implementation order/ownership | §9 | canonical design doc and Worker result | Advisor audit |
| Test-first matrix | §8 | listed scripts | classification/reporting |
| Full traceability | §5.11, §5.12, §10 | canonical design doc | Reviewer audit |
| Exclusions, rollback, risk, STOP | §5.10, §11, §12 | flags/services/result | static containment |

Founder constraints:

| Founder constraint | Design landing |
|---|---|
| F1 nullable opaque session, ID at presentation | §3.1, §3.2, §5.2, §5.10 |
| F2 two planes, producer mapping, dedupe | §5.1, §5.2 |
| F3 Cosmile normalization ownership | §5.3, §5.4 |
| F4 zero Cosmile candidates | §5.12, §5.13, §7, §8.5 |
| F5/F6 Foundation eligibility/candidate only in future C | §11 |
| F7 separate consent; userId not consent | §3.5, §5.6, §5.9 |
| F8 identity linking OFF | §3.6 |
| F9 append-only correction/retraction | §3.4, §5.7 |
| F10 independent satisfaction/adverse | §5.4, §5.13 |
| F11 static adverse guidance | §4.2 |
| F12 adverse hold duration not implemented | §5.8 |

## 11. Explicit exclusions and kill switches

Excluded:

- Foundation eligibility validator or C design;
- Foundation intake, candidate creation, adverse-candidate creation, promotion,
  reuse, memory, ranking, or safety mutation;
- outbox consumer, sender, flush, retry, dead-letter, delivery, network, or
  aggregation worker;
- external semantic provider, LLM normalization, embeddings, or raw text;
- automatic identity linking or guest cross-service evidence;
- session creation;
- multi-touch, weighted, cross-device, or historical attribution;
- historical backfill;
- legal jurisdiction or responsible-person determination;
- regulatory reporting;
- production/live/persistent flags;
- real DB, secrets, env changes, main/protected branch, deploy, merge, commit,
  or push under this handoff.

Kill switches:

- COSMILE_REC_EVENT_ENABLED remains OFF.
- COSMILE_REC_OUTCOME_ENABLED remains OFF.
- New COSMILE_COMMERCE_EVIDENCE_ENABLED defaults OFF and must return false in
  production.
- No NEXT_PUBLIC flag may independently enable server writes.
- No env file is added or changed.

## 12. Residual risks and HARD STOP

1. RecommendationEvent PK correction is safe only when its row count is zero in
   the disposable baseline. Any row causes HOLD; no backfill is authorized.
2. There is no current authoritative Cosmile session mint. sessionId therefore
   remains null and session attribution is designed but not runtime-proven.
3. No live rendered UI was executed in this Designer handoff. Implementation
   review must inspect 390 × 844, keyboard-only, reduced-motion, and 200% text.
4. adverse_regulatory_hold duration and legal erasure obligations remain
   unresolved. Adverse source records remain locally isolated and cross-service
   blocked.
5. Retention expiry is represented and enforced for eligibility, but no
   scheduled cleanup is activated. Any cleanup activation requires a separate
   operational handoff.
6. The old generic signal contract and new commerce-evidence contract share one
   physical outbox. Conditional constraints and explicit signalType separation
   are load-bearing.
7. Generic signal enqueue will become fail-closed without explicit consent.
   Because no delivery exists, this is a containment correction, but regression
   tests must prove general CommerceEvent recording remains intact.
8. The current UI has no browser test library. UI behavior should be kept in a
   pure state module and visually inspected in implementation review; do not add
   a dependency without a new scope decision.

HARD STOP on:

- actor/session/workspace/branch/head mismatch;
- overlapping tracked dirt;
- any RecommendationEvent row at migration preflight;
- schema or field meaning not matching this design;
- need for a new consent purpose, retention duration, identity link, session
  source, or legal decision;
- any candidate writer/call;
- any outbox consumer/network/Foundation intake;
- any raw text/PII/secret/real identifier in evidence;
- any real DB, production/live, protected branch, main merge/push, or flag
  activation;
- any file outside §7.

## 13. Completion

DESIGN_STATUS: DESIGN_READY_FOR_INDEPENDENT_REVIEW

The package closes field meaning, UX policy, consent policy, normalization
policy, source-to-file mapping, test design, file scope, and stop conditions for
Cosmile A/B. It does not approve itself and grants no implementation authority.

NEXT_ROUTE:
foundation-designer -> foundation-advisor -> independent Foundation Reviewer

RETURN_TO: foundation-advisor
STOP
