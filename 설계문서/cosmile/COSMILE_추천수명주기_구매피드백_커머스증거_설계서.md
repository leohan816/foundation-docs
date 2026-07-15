# COSMILE 추천수명주기·구매피드백·커머스증거 설계서

> **버전 v1.0 · 2026-07-15** · 🔒 내부(설계자료, 비공개).
> Memory V3 M2 A/B — Cosmile 추천 수명주기(RecommendationEvent canonical plane), 구매 라인 폐쇄선택 피드백, 커머스 증거 봉투(CommerceEvidenceRecord), contained producer-only outbox의 **정본 제품 설계서**.
>
> **변경이력**
> - v1.0 (2026-07-15) — 최초. 독립 검수 PASS된 Designer 설계(아래 anchors)를 실질 정책 변경 없이 정본 제품 문서로 전사. contract-to-code mapping 포함.
>
> **Review anchors (정본·고정)**
> - MISSION: `MEMORY_V3_CURRENT_STATE_RECONCILIATION_V1` · WORK_UNIT: `M2-AB-COSMILE-IMPLEMENTATION-001`
> - Founder decision: D1-A/D2-A/D3-A (`24_M2_FOUNDER_D1_D3_DECISION.md`)
> - Control contract: foundation-docs commit `73889c86f5170cfe20718a237dff989d52960c9f`
> - Reviewed design: foundation-docs commit `9530b221d4430d29bfb545702390ebc9e6606d6a` (`M2_AB_DESIGN_RESULT.md`)
> - Design delta review: foundation-docs commit `5ebcb39b1ecfaaef8d9e5d35ef0268558944bd27` — **VERDICT: PASS**
> - Cosmile baseline: branch `shadow/m4-cosmile-memory` @ `6e44aa40ffb2960573839a01424761dc5e98d610`
>
> 이 문서는 reviewed design의 규범 내용을 보존한다. 여기 명시되지 않은 세부는 reviewed design(9530b22)이 우선한다. C(전달/Foundation intake/candidate), full Package 1B, production/live 활성화는 **본 설계 범위 밖·미승인**.

---

## 1. 고정 결정 (Founder-fixed, 재론 금지)

F1. `RecommendationEvent.sessionId`는 nullable Cosmile-local opaque reference.
F2. `recommendationId`는 **최초 실제 추천 표시 시점**에 서버가 mint; view/click/save/dismiss/cart/구매라인 증거로 전파.
F3. `CommerceEvent`=일반 운영/분석 ledger, `RecommendationEvent`=추천 수명주기 canonical. 매핑은 **producer-time**.
F4. 폐쇄선택 정규화는 Cosmile 소유·결정론·버전드.
F5. Cosmile은 `MemoryFactCandidate`/adverse candidate **0건 생성·0건 호출**.
F6. same-service 피드백 저장 동의와 cross-service 커머스증거 활용 동의는 **별도 목적**. 로그인/userId≠동의.
F7. Identity linking 기본 OFF. cart/account merge≠link 동의.
F8. 정정은 append-only. 철회는 철회 레코드+최소 tombstone. silent overwrite/파괴적 re-key 금지.
F9. 만족도와 adverse는 독립 축. 만족도가 adverse 심각도/처리를 낮출 수 없다.
F10. Adverse 응답은 사전승인 정적 문구만. 진단/생성 의료조언/외부 신고 금지.
F11. 보존기간은 non-production 입력. `adverse_regulatory_hold` 기간은 미구현·미활성(법적 결정 대기).
F12. 전부 local/non-prod/shadow, flags OFF, producer-only. consumer/delivery/retry transport/network/Foundation intake/C runtime 없음.

### 1.2 현재 모순 → 요구 해결 (R1–R10)

| ID | 현재 | 해결 |
|---|---|---|
| R1 | RecommendationEvent.sessionId NOT NULL인데 유일 caller가 null 전달 | nullable로 완화(backfill 없음) |
| R2 | add-to-cart에서 새 recommendationId mint | 최초 카드 노출 직전 서버 1회 mint; 이후 이벤트는 기존 ID 제공+검증 |
| R3 | recommendationId가 PK라 수명주기 다중 행 불가 | eventId를 행 PK로; recommendationId 비유니크; unique(recommendationId+eventType). **빈 테이블 전제**(행 존재 시 HOLD) |
| R4 | 카드 존재만으로 recommendation_view emit | showRecommendation=true일 때만 추천 수명주기 증거; generic 카드는 CommerceEvent-only |
| R5 | generic cart도 RecommendationEvent 생성(가짜 추천) | 동일 shopper+product의 **유효 전파 recommendationId**가 있을 때만 수명주기 행 |
| R6 | 구매 outcome이 항상 organic | CartItem→OrderItem으로 검증된 추천 컨텍스트 복사, paid 전이 시 direct/session/organic resolve |
| R7 | outbox가 userId로 user_consented 추론 | 추론 제거. 명시·버전드 동의 스냅샷 없으면 어떤 legacy generic signal도 enqueue 불가 |
| R8 | RecOutcomeFeedback 단일 semanticLabel | legacy shadow model로 불변 유지; A/B 계약은 별도 `CommerceEvidenceRecord` |
| R9 | 주문 상세에 피드백 진입 없음 | paid 라인별 피드백 액션 + 공용 modal/bottom-sheet |
| R10 | outbox에 opaque 구매라인 ref/lineage/expiry 없음 | evidence-only 컬럼+조건 제약 추가; legacy 행 re-key 없음 |

## 2. SPACE — 표면과 레이아웃

### 2.1 표면 분류

| 표면 | A/B 분류 |
|---|---|
| /consult foundation_contract 결과 | **유일한 canonical 추천 표시 표면** — surface.showRecommendation=true일 때만 |
| /consult generic 카드(showProductCards=true·showRecommendation=false) | ledger-only. recommendationId mint 금지. 헤더 “참고 상품” |
| /slice/debug legacy RecommendationCards | test/debug 전용. A/B lifecycle writer 미부착 |
| /products/[id] “추천하는 이유” | 추천 수명주기 표면 아님. mint 금지 |
| generic home/shop/search 카드 | CommerceEvent only |
| /orders/[orderId] | canonical 구매라인 피드백 진입 |
| /account/orders | 발견 경로만 |

### 2.2 추천 카드 (390×844 기준, AI 메시지 버블 내부, 탭 타겟 ≥44×44px)

    ┌──────────────────────────────────────┐
    │ 상담 추천                     1 / 2  │
    │ Foundation 판단으로 표시된 상품이에요│
    ├──────────────────────────────────────┤
    │ Product name / Brand·category·spec   │
    │ Match reason                         │
    │ [상품 보기] [♡ 찜] [장바구니 담기]  │
    │ [이 추천 숨기기]                     │
    └──────────────────────────────────────┘

- ID 준비 전엔 상품명/액션 미노출 — 고정 높이 skeleton “추천을 준비하고 있어요”.
- A flag ON에서 준비 실패: 카드 0 + “추천 기록을 준비하지 못해 상품 제안을 표시하지 않았어요. 잠시 후 다시 시도해 주세요.”
- generic 카드: 동일 비주얼·헤딩 “참고 상품”·수명주기 매핑/ID 없음.
- **A flag OFF 또는 showRecommendation=false: 현행 read-only 카드 유지 — 신규 cart/wishlist/dismiss CTA 렌더 금지.**

### 2.3 구매라인 피드백

/orders/[orderId] 각 eligible 라인 아래 full-width 44px 액션: `[이 상품 피드백 남기기]`.
모달: <480px bottom sheet(w100%·max-h 78dvh·상단 20px 라운드) / ≥480px 중앙 dialog(max-w 420px) · 본문 독립 스크롤 · 제목/최종 액션 sticky · safe-area 하단 패딩 · 200% 줌에서 클리핑 금지.

폼(§4.1 어휘): 1) 만족도(선택 안 함 가능: 좋았어요/보통/아쉬움) 2) 사용 중 불편/안전(없음/피부 반응/그 외 불편/사용 안전 질문 + 조건부 severity) 3) 동의 2종(§3.5) — **둘 다 매번 unchecked 시작**; cross-service는 per-evidence election(과거 durable grant가 pre-check 금지). Adverse 안내는 sticky 액션 위 지속 role=alert 블록.

## 3. BEHAVIOR — 여정과 상태기계

### 3.1 추천 표시·상호작용

Eligibility: ① source=foundation_http ② surface.mode=commerce ③ showProductCards ∧ showRecommendation=true ④ productIds ⊆ Foundation productRefs ∩ 현 catalog ⑤ **A flag(향후 별도 승인 rehearsal에서만 ON; 본 배치는 OFF)**.

    NOT_ELIGIBLE → 현행 read-only generic/무카드 (신규 CTA 없음)
    ELIGIBLE → PREPARING_PRESENTATION
       ├ success → PRESENTED → CLICKED | SAVED | DISMISSED | ADDED_TO_CART → PURCHASED
       ├ duplicate → 기존 ID 반환 → PRESENTED
       └ failure → BLOCKED_UNKNOWN (카드 0)

- 수명주기는 **monotonic event set**(가변 단일 status 아님). eventType당 recommendationId별 1회. 재시도는 기존 행 반환.
- presentation 준비는 Foundation trace+product당 1회 요청. mapper는 showRecommendation을 보존해 클라가 canonical/generic을 구분.
- **identity는 서버 derive** — 클라는 userId/guestId 미전송.
- 서버는 product당 recommendationId 1개 mint + shown 수명주기 행 + 매핑 product_card_view CommerceEvent를 **한 DB 트랜잭션**으로 쓰고 opaque ID 반환. A ON에서 카드는 그 성공 후에만 노출.
- 응답 레벨 recommendation_view는 ledger 이벤트(제품별 2중 카운트 아님) — showRecommendation=true에서만 emit; false 컨테이너는 emit 0.
- **canonical 카드는 product_card_view/click을 /api/events로 직접 POST하지 않는다** — 그 두 canonical ledger 이벤트는 서버가 짝 RecommendationEvent 옆에서만 기록. generic 카드는 기존 client-direct 동작 유지(위 recommendation_view 억제 제외).

상호작용: 상품 링크→ clicked+product_card_click append, opaque 컨텍스트를 sessionStorage에 저장 후 이동(URL에 ID 금지) · 찜→ wishlist route가 identity derive+추천/상품 소유 검증 후 saved append(제거는 ledger-only) · 숨기기→ dismissed+ai_recommendation_ignored append, 카드 제거·포커스 이동·변경 announce · 담기→ recommendationId/productId/skuId/offerId/quantity만 전송, 서버가 검증 후 cart_add와 같은 producer 경계에서 added_to_cart 기록 · 유효 ID 없는 generic 담기는 ledger-only + 그 최신 cart-line touch의 direct 컨텍스트 clear.

**Atomicity**: canonical 단계쌍은 한 증거 트랜잭션에서 all-or-nothing. cart/wishlist는 **상품 변이가 먼저·트랜잭션 밖** — 증거쌍 실패가 성공한 변이를 롤백하지 않으며, sanitize된 `canonicalEvidenceStatus=failed_closed`(+`canonical_evidence_pair_write_failed`)만 반환.

### 3.2 구매 전파

CartItem: nullable `recommendationId`·`recommendationSessionId`·`recommendationLinkedAt` — **최신 cart-add touch 승자**. multi-touch/가중 귀속은 이월. checkout이 3필드를 OrderItem으로 복사. **guest-cart merge는 추천 컨텍스트를 identified cart로 복사하지 않는다**(merge≠link 동의).

Paid 전이 시 라인별 resolve: ① 동일 product+identity의 유효 전파 recommendationId → **direct**(ID 유지) ② 없고, recommendationSessionId 非null ∧ 동일 product/session의 canonical 추천 매치 → **session**(ID null) ③ 그 외 → **organic**(ID null). Resolver는 **RecommendationEvent만** 읽는다(광의 CommerceEvent 재구성 금지). A/B에 authoritative session mint 없음 → recommendationSessionId는 이미 승인된 local source가 없는 한 null(발명 금지).

### 3.3 구매라인 피드백

진입 eligibility: 서버 derive owner=주문 소유 ∧ `Order.paidAt` 非null ∧ 라인 소속 ∧ **B flag**(향후 rehearsal) ∧ pending/cancelled 차단 ∧ 응답에 raw 주문/라인 ID 금지. **refunded 라인도 paidAt 非null이면 eligible**(purchase_state=paid 유지 — 환불 후 adverse 신고 보존 의도).

    ENTRY_READY → EDITING → LOCAL_CONSENT_GATE
      ├ missing/revoked/expired → BLOCKED_LOCAL (write 0)
      └ granted → NORMALIZE
          ├ invalid → FIELD_ERROR (증거/outbox 0)
          ├ adverse severity unknown → LOCAL_HUMAN_REVIEW (outbox 0)
          └ valid → LOCAL_SAVED
              ├ election unchecked → LOCAL_ONLY
              ├ checked·effective grant 실패 → LOCAL_ONLY
              ├ checked·guest → LOCAL_ONLY_GUEST
              └ checked·identified·grant·eligible → OUTBOX_PENDING
                  └ severe는 추가로 local human_safety_review_required

- cross-service 체크박스=per-evidence election. unchecked→ (이전 durable grant 유효해도) 이번 증거 local-only·revocation append 없음. checked→ 현재 granted 아니면 서버가 현행 버전 grant를 먼저 append; 그 제출에 성립/확인된 effective grant만 envelope consent.state=granted 가능. grant 실패 시 local-only(UNKNOWN을 queued로 렌더 금지).
- 유효 skin_reaction/other **low/moderate/severe** 전부 동일 게이트 후 enqueue 가능; severe는 추가로 human review(“enqueue 차단 아님” — consumer/delivery 부재). unknown severity는 human-review-only·outbox 0.
- **최소 1개 의미 축 필수**: 만족도 선택 or (skin/other/usage_safety 선택). “불편 없음”만 + 만족도 미선택 = 증거 없음(feedback_empty).

### 3.4 정정·철회 (append-only)

정정: 같은 라인의 최신 유효 레코드 열기 → 폐쇄값만 pre-populate → 제출=새 correction 레코드(같은 rootEvidenceId·supersedes=현재 leaf). 구 행 update/delete 금지. stale 동시 정정=`correction_target_not_current`. cross-service 자격은 현재 동의로 재계산(구 레코드 상속 금지).

철회: 동의 revoked/expired여도 가능. 확인 문구 필수: “이 피드백을 철회합니다. 서비스 간 활용 대상에서 즉시 제외되며, 최소한의 재처리 방지 기록은 남습니다.” 철회 레코드+최소 tombstone append; root lineage의 pending/blocked outbox 전부 block; revocation 후 신규 cross-service outbox 생성 금지; root+후손 즉시 처리 불가. **철회≠동의 revocation**(상호 독립). 자동 memory/ranking/safety 액션 0. 철회된 법적보존 adverse 원본은 격리·처리 불가 상태로 잔존(별도 법적 결정 대기); A/B는 삭제/기간 설정 안 함.

### 3.5 동의 상태기계

목적: `same_service_purchase_feedback` · `cross_service_commerce_evidence` · `identity_linking`.
Notice 버전: `cosmile.<purpose>.v1` 3종.

    MISSING → GRANTED(명시 체크 액션) → REVOKED(append) → GRANTED(새 액션·새 행)
    GRANTED → EXPIRED(정책/시스템 기록 — 자동 만료기간 발명 금지) → GRANTED(새 액션)

규칙: 레코드 부재=missing · append-only·latest capturedAt 승자 · pending은 저장/enqueue 미승인 · granted는 purpose+noticeVersion+capturedAt+서버 derive actor+명시 액션 필수 · **로그인/userId/checkout/cart·account merge=동의 아님** · revocation 즉시 미래 enqueue 차단 · expiry 관측 시 존중(자동 TTL 미도입).

Per-evidence election: 새/정정 폼마다 `crossServiceElected=false` 초기화(durable 상태 무관). checked=true→ 현행 granted 없으면 현재 버전 grant append. unchecked→ 이번 증거 local-only·revocation 없음·이번 증거에 cross-service 동의 주장 기록 없음·local-only 확인 문구 표시. grant append/해결 실패→ local-only·outbox 0.

**A/B durable revocation은 API+계약테스트 전용**: `POST /api/commerce-evidence/consents` — 정확히 `{action:"revoke", purpose:"cross_service_commerce_evidence"}`·인증 identified shopper·identity 서버 derive. 현재 grant를 supersede하는 revoked ConsentRecord append. 응답=`status=revoked|already_not_granted`만(동의/subject/order/evidence 식별자 노출 0). **계정 UI 없음**(이월) — 그 표면의 별도 승인·설계 전 production/live 활성 금지.

동의 문구(정확히):
- same-service: “구매한 상품에 대한 선택형 피드백을 코스마일에 저장하는 데 동의합니다. 자유문장은 저장하지 않습니다.”
- cross-service: “이 선택형 피드백을 최소화된 커머스 증거로 검토 대기 큐에 보관하는 데 동의합니다. 현재 외부 전송이나 자동 학습은 하지 않습니다.”

### 3.6 Identity-linking — OFF only

`SubjectRefMap.allowLink=false` 유지; A/B 어떤 route/UI/service도 true 설정 금지. identified 증거는 outbox에서 service-local subject_ref 사용 가능(identity_link_allowed=false). 익명 local 피드백은 same-service 동의로 저장 가능하나 cross-service outbox 금지. guest 피드백은 로그인 후 re-key/merge/enqueue 금지. LINK_ALLOWED 도달 가능 코드는 **HARD STOP**.

## 4. INFORMATION — 폐쇄 어휘·카피·정직 상태

### 4.1 폐쇄 입력 어휘

만족도: `satisfied`(좋았어요)/`neutral`(보통이에요)/`dissatisfied`(아쉬웠어요)/`not_selected`(UI-only→null)
Adverse: `none`(불편이나 안전 질문 없음)/`skin_reaction`(피부 반응이 있었어요)/`other`(그 외 불편이 있었어요)/`usage_safety`(계속 사용해도 되는지 궁금해요)/`not_selected`
Severity(skin_reaction·other에서만): `low`(가벼웠어요)/`moderate`(사용을 멈출 정도였어요)/`severe`(심한 반응이었어요)/`unknown`(정도를 잘 모르겠어요)
**자유텍스트 필드 없음.** 미지 키·폐쇄집합 밖 문자열·raw_text/message/note/answer 계열 필드는 거부.

### 4.2 정적 adverse 안내 (상수 — provider 호출 0)

skin_reaction/other/usage_safety/unknown: “제품 사용을 중단하고 적절한 의료 전문가에게 문의하세요.”
severe/unknown 추가: “안전 검토가 필요한 상태로 표시됩니다. 외부 신고는 자동으로 이루어지지 않습니다.”

### 4.3 정직 결과 라벨 (UNKNOWN=성공 렌더 금지)

| 상태 | 라벨 |
|---|---|
| local 저장·election unchecked | “코스마일에만 저장됐어요. 서비스 간 활용 대상은 아닙니다.” |
| checked·grant 미성립 | “코스마일에 저장됐지만 서비스 간 보관 동의를 확인하지 못했어요. 검토 대기 큐에는 보관되지 않았습니다.” |
| checked·identified·outbox pending | “검토 대기 큐에 보관됐어요. 아직 외부로 전송되지 않았습니다.” |
| guest | “게스트 피드백은 코스마일에만 저장돼요.” |
| 유효 skin/other adverse outbox pending | “안전 관련 피드백이 검토 대기 큐에 보관됐어요. 아직 외부로 전송되지 않았습니다.” |
| duplicate | “이미 처리된 피드백입니다.” |
| 철회됨 | “피드백이 철회되어 활용 대상에서 제외됐습니다.” |
| feature off | “이 기능은 현재 비활성 상태입니다.” |
| 서버 결과 미상 | “저장 상태를 확인하지 못했어요. 다시 확인해 주세요.” |
| offline | “연결되지 않아 아직 저장하지 못했어요. 선택 내용은 이 화면에 남아 있습니다.” |

## 5. TECHNOLOGY — 구현 계약

### 5.1 이벤트 분류·producer-time 매핑

| 제품 액션 | CommerceEvent | Canonical plane | 규칙 |
|---|---|---|---|
| 추천 결과 컨테이너 표시 | recommendation_view | 없음 | showRecommendation=true에서만·응답 레벨 1회·제품별 카운트 아님 |
| 추천 상품 최초 노출 | product_card_view | recommendation_shown | product당 1 ID; 두 행이 같은 producerEventKey |
| 추천 상품 열기 | product_card_click | recommendation_clicked | 기존 검증 ID |
| 추천 상품 찜 | wishlist_add | recommendation_saved | wishlist-add만(제거 ledger-only) |
| 추천 상품 숨기기 | ai_recommendation_ignored | recommendation_dismissed | 서버 ack 후 카드 제거(또는 정직 오류 상태) |
| 추천 상품 담기 | cart_add | recommendation_added_to_cart | 검증된 전파 ID만 |
| 결제 | purchase_complete | 라인별 RecOutcomeEvent | direct/session/organic resolver; 새 RecommendationEvent 타입 없음 |
| generic/정적 액션 | 기존 ledger | 없음 | 기존 client 동작 유지; showRecommendation=false는 recommendation_view만 억제 |

Client/server emission 계약:

| 클래스 | client-direct /api/events | server canonical pair | 결과 |
|---|---|---|---|
| canonical 최초 노출(A ON) | recommendation_view 1회 가능; **product_card_view direct 금지** | product_card_view+recommendation_shown | 두 plane 각 1행·동일 producerEventKey |
| canonical 열기(A ON) | **product_card_click direct 금지** | product_card_click+recommendation_clicked | 단계별 각 1행 |
| canonical 찜/숨김/담기 | 신규 client-direct 매핑 write 없음 | 명명된 서버쌍(위) | 서버 소유·atomic |
| generic/flags OFF | 기존 client-direct 전부 유지 | 없음 | showRecommendation=false의 recommendation_view 억제가 유일한 변화; ID/수명주기 행 0 |

**/api/events route는 불변·allowlist 밖.** 집계 불변식: 운영분석=CommerceEvent·추천분석=RecommendationEvent(+RecOutcomeEvent)·두 plane 매핑 행 합산 금지·producerEventKey=join/dedup 키·canonical 쌍은 단계당 1 DB 트랜잭션(실패=양쪽 미commit+failed_closed·부분쌍/repair queue 없음)·cart/wishlist 상품 변이는 트랜잭션 밖·선행.

### 5.2 ID mint·결정론 idempotency

| 식별자 | 형식·mint | 전파 |
|---|---|---|
| recommendationId | 기존 `rec_v3_`+ULID26 — **present 준비 성공 시 서버** | 카드 컨텍스트→상호작용→CartItem→OrderItem→RecOutcomeEvent·CommerceEvidenceRecord |
| recommendation eventId | `rec_evt_v1_`+ULID26 — 서버·수명주기 행당 | 내부 전용 |
| recommendationSessionId | null 또는 `csess_v1_`+ULID26(이미 승인된 local source만; **A/B mint 0**) | RecommendationEvent.sessionId(물리 컬럼)→CartItem→OrderItem. cross-service identity 금지 |
| purchaseItemRef | `pir_v1_`+ULID26 — paid OrderItem에 서버 lazy 1회 | CommerceEvidenceRecord·outbox envelope. **raw orderItemId는 local 밖 금지** |
| evidenceId | `cevi_v1_`+ULID26 — root/correction/retraction당 | local lineage·envelope |
| sourceEventId | `pf_evt_v1_`+ULID26 — 피드백 액션당 | envelope source·idempotency 입력 |
| clientRequestId | `pf_req_v1_`+crypto.randomUUID — 제출 시도당 1회·재시도 재사용 | API→레코드; **(orderItemId,clientRequestId) 복합 unique** |

결정론 키(sha256·소문자 hex 64·저장 prefix):
- presentationDedupeKey = sha256("cosmile.rec.presentation.v1"+foundationTraceId+productId) → `rec_present_v1_<hex>`
- producerEventKey = sha256("cosmile.rec.lifecycle.v1"+recommendationId+eventType) → `rec_producer_v1_<hex>`
- evidence idempotencyKey = sha256("cosmile.commerce_evidence.v1"+sourceEventId+evidenceType+normalizerVersion) → `cevi_idem_v1_<hex>`
- sourceHash = 정규 key-sorted normalized envelope(자기 자신 제외) sha256 → `cevi_source_v1_<hex>`
Secret 불요(입력이 이미 opaque; identity 아님). 해시값 로그/증거 복사 금지.

유니크: producerEventKey unique · (recommendationId,eventType) unique · presentationDedupeKey는 shown에만 unique · duplicate는 기존 canonical 행 반환.
피드백 replay 스코프=(orderItemId,clientRequestId). **ownership 검사 → idempotency lookup 순서**; cross-owner는 일반 not-found(충돌/이전 상태 비노출); 같은 요청ID+다른 소유 라인=별개 요청.

### 5.3 버전드 커머스증거 envelope — `cosmile.commerce_evidence.v1`

(legacy v1 reaction-signal 계약과 별개·비superseding.)

| 필드 | 필수/null | 폐쇄 규칙 |
|---|---|---|
| schema_version | 필수 | `cosmile.commerce_evidence.v1`만 |
| evidence_id | 필수 | cevi_v1_+ULID26 |
| evidence_type | 필수 | purchase_feedback·correction·retraction |
| source.service | 필수 | cosmile |
| source.environment | 필수 | local·shadow |
| source.source_event_id | 필수 | pf_evt_v1_+ULID26 |
| source.idempotency_key | 필수 | cevi_idem_v1 해시 |
| source.occurred_at | 필수 | 서버 UTC ISO-8601 |
| actor.subject_ref | outbox 필수 | subj_v2_+32hex |
| actor.anonymous_ref | local XOR; outbox null | anon_v3_+32hex |
| actor.identity_state | 필수 | identified·anonymous |
| actor.identity_link_allowed | 필수 | A/B에서 false |
| purchase.purchase_item_ref | 필수 | pir_v1_+ULID26 |
| purchase.product_ref | 필수 | 기존 canonical product ref |
| purchase.sku_ref | nullable | 기존 SKU ref만 |
| purchase.purchase_state | 필수 | paid |
| feedback.satisfaction | nullable | satisfied·neutral·dissatisfied |
| feedback.adverse_type | nullable | skin_reaction·other·usage_safety |
| feedback.adverse_severity | 조건부 | low·moderate·severe |
| feedback.adverse_certainty | 조건부 | A/B는 reported만 |
| consent.purpose | outbox 필수 | cross_service_commerce_evidence |
| consent.state | outbox 필수 | granted |
| consent.notice_version | outbox 필수 | cosmile.cross_service_commerce_evidence.v1 |
| consent.captured_at | outbox 필수 | 서버 UTC |
| privacy.raw_text_stored | 필수 | false |
| privacy.contains_pii | 필수 | false |
| privacy.retention_class | 필수 | feedback_non_adverse_90d·adverse_regulatory_hold |
| lineage.root_evidence_id | 필수 | root=self |
| lineage.supersedes_evidence_id | correction만 | 현재 active leaf |
| lineage.retracts_evidence_id | retraction만 | 현재 active leaf |
| lineage.normalizer_version | 필수 | cosmile.closed_feedback_normalizer.v1 |
| lineage.source_hash | 필수 | cevi_source_v1 해시 |

Outbox envelope identity(로컬 저장보다 엄격): subject_ref 필수·anonymous_ref null·identity_state=identified·identity_link_allowed=false·guest는 생성 전 거부. envelope은 **crossServiceElected=true+그 제출의 effective grant 참조**가 있는 레코드에서만 구성 가능(unchecked 레코드는 구 durable grant가 있어도 granted 직렬화 금지). Retraction envelope(미revoke 동의 하 eligible 시)은 feedback 필드 전부 null; A/B에서 revocation은 신규 enqueue 차단이므로 post-revocation 철회는 local pending block+local tombstone만.

### 5.4 결정론 정규화 표

| 만족도 | Adverse | Severity | 정규화 출력 | Local 상태 | Outbox |
|---|---|---|---|---|---|
| sat/neu/dis | none·not_sel | n/a | 만족도 set·adverse null | valid | election/동의/identity 게이트 |
| any·not_sel | skin_reaction | low/mod/sev | type+severity·certainty reported | valid; severe+휴먼리뷰 | 게이트 통과 시 enqueue(severe 포함) |
| any·not_sel | other | low/mod/sev | 동일 | 동일 | 동일 |
| any·not_sel | skin/other | unknown | type set·severity null·reported | human_safety_review_required | **blocked: adverse_severity_unknown** |
| any·not_sel | usage_safety | n/a | type=usage_safety·severity null·reported | valid+정적 안내 | 게이트 통과 시 enqueue |
| not_selected | none·not_sel | n/a | 전부 null | invalid | blocked: feedback_empty |
| any | none/not_sel | 아무 severity | 모순 | invalid | blocked: adverse_fields_inconsistent |
| any | usage_safety | 아무 severity | 모순 | invalid | blocked: adverse_fields_inconsistent |
| any | skin/other | 누락 | 미완 | invalid(선택 전 write 0) | blocked: adverse_fields_inconsistent |
| 미지 토큰 | any | any | 정규화 불가 | invalid | blocked: invalid_normalization |

**만족도는 adverse severity/review 코드가 읽지 않는다. adverse 먼저 계산 → raise-only/MAX 병합.**

### 5.5 안정 reason 코드

Future Foundation C 세트(보존만·미구현): unsupported_schema_version·environment_not_allowed·invalid_identity_xor·identity_link_forbidden·consent_missing·consent_revoked·consent_expired·privacy_scope_exceeded·raw_text_or_pii_present·missing_purchase_item_ref·missing_product_ref·duplicate_evidence·invalid_normalization·adverse_fields_inconsistent·lineage_broken·provenance_untrusted·evidence_retracted·retention_expired.

Cosmile A/B 게이트 코드(별도 네임스페이스): feature_disabled·purchase_not_paid·purchase_item_not_owned·feedback_empty·same_service_consent_missing·cross_service_consent_missing·guest_cross_service_forbidden·identity_link_forbidden·invalid_normalization·adverse_fields_inconsistent·adverse_severity_unknown·canonical_evidence_pair_write_failed·correction_target_not_current·evidence_retracted·duplicate_request·outbox_write_failed.

API는 안정 코드+status만 반환 — raw 주문 ID/고객 ID/payload JSON/해시/secret/PII 반환 금지.

### 5.6 동의·identity 영속

ConsentRecord(ledger) 추가: `purpose`(legacy null 허용·A/B 필수)·`noticeVersion`·`capturedAt`·`expiresAt?`·`supersedesConsentId?`·`sourceAction`(grant/revocation=explicit_user_action 고정). 기존 non-null `consentScope`는 legacy 호환 범주(A/B 권위 아님): same_service_purchase_feedback→same_service; cross_service_commerce_evidence·identity_linking→cross_service; **권위=새 purpose 필드**.

CommerceEvidenceRecord: `crossServiceElected`(필수·UI 기본 false)·`crossServiceConsentRecordId?`(elected=false⇒null; elected=true+grant 성립⇒그 effective 현재버전 granted 레코드 참조; grant 실패⇒null+outbox 불가). 이후 durable revocation은 증거 행 rewrite 금지 — effective-state resolver로 pending lineage/미래 enqueue만 차단.

A/B 조건 DB CHECK: purpose∈3값 · state∈{pending,granted,revoked,expired} · A/B 행에서 granted boolean=state=granted · granted⇒noticeVersion+capturedAt · revoked⇒revokedAt · actor XOR(subjectRef/guestRef) · elected=false⇒consentRecordId null · evidence outbox 행⇒elected=true+매칭 granted consentRecordId · identity_linking grant는 어떤 A/B writer도 소비 금지. SubjectRefMap 불변(allowLink=false·write 0).

### 5.7 Append-only lineage·tombstone

CommerceEvidenceRecord: root(root=self·supersedes/retracts null) · correction(root=root·supersedes=현재 leaf) · retraction(root=root·retracts=현재 leaf·feedback 전부 null) · superseded당 후속 1 · 대상당 철회 1 · tombstone 있는 root에 correction 금지 · 이전 피드백 필드 update 금지.

CommerceEvidenceTombstone: rootEvidenceId·replayKeyHash(purchaseItemRef+purpose 파생)·reasonCode=evidence_retracted·retentionClass·retentionState·createdAt·expiresAt(비-adverse 메타=+180d). 피드백 내용/raw identity/orderItemId/orderId/동의 사본 저장 금지. adverse_regulatory_hold는 expiresAt null·retentionState=duration_unconfigured(법적 결정 대기).

### 5.8 보존 표현 (non-production 상수 — env 설정 불가)

| 레코드 | class | 표현 | A/B 동작 |
|---|---|---|---|
| 비-adverse outbox pending/blocked | outbox_pending_30d | queueExpiresAt=+30d | 만료=blocked 취급. consumer/purge 미구현 |
| 비-adverse 구조화 피드백 | feedback_non_adverse_90d | retentionExpiresAt=+90d | 만료 시 eligibility 중지 |
| 최소 동의/idempotency/lineage/tombstone 메타 | audit_metadata_180d | expiresAt=+180d | 피드백/raw identity 없음 |
| skin/other adverse 신고+그 outbox 행 | adverse_regulatory_hold | 둘 다 expiry null·retentionState=duration_unconfigured | 유효 low/mod/sev는 게이트 후 enqueue 가능. 단기 TTL/기간/release/전달/자동 purge 없음 |
| usage_safety(adverse 신고 없음) | feedback_non_adverse_90d | +90d | 정적 안내 유지 |

30일 큐 만료는 **비-adverse 전용**(큐 eligibility 표현·증거 보존기간 아님) — adverse_regulatory_hold에 복사 금지.

### 5.9 Outbox 봉쇄 불변식

FoundationSignalOutbox 재사용(새 commerce-evidence 행은 legacy와 구분). evidence-only 컬럼: schemaVersion·evidenceId·subjectRef·purchaseItemRef·productRef·rootEvidenceId·supersedesEvidenceId·retractsEvidenceId·normalizerVersion·sourceHash·consentRecordId·evidenceRetentionClass·retentionState·queueExpiresAt·environment.

`signalType=cosmile.commerce_evidence` 행: signalVersion=cosmile.commerce_evidence.v1 · canonicalUserId/anonymousId null · subjectRef 非null · purchaseItemRef/productRef/evidenceId/consentRecordId 非null · status∈{pending,blocked}만 · sentAt/errorMessage null · privacyLevel=purpose_consented_minimized · environment∈{local,shadow} · payloadJson=정확한 최소화 envelope · **raw orderItemId/orderId·userId·guestId·traceId·결제ID·자유텍스트·PII·가격·마진·배송 부재** · adverse⇒queueExpiresAt null+retentionState=duration_unconfigured · 비-adverse⇒queueExpiresAt=+30d+retentionState null · severe=pending 유지(local 휴먼리뷰 플래그는 raise-only·enqueue 차단 아님) · unknown severity⇒행 0.

legacy mapper 강화(R7): userId≠동의 · 명시 eligible 동의 스냅샷 없으면 `cross_service_consent_missing`+행 0 · user-level 입력의 anonymous 강등 금지 · sender/consumer/flush/retry/delivery/HTTP·Foundation client/timer/cron/queue worker 추가 금지.

### 5.10 스키마·마이그레이션 계획

신규 마이그레이션 1개만: `app/prisma/migrations/20260715120000_m2_ab_recommendation_feedback_evidence/{migration.sql,down.sql}`. 역사적 마이그레이션 수정 금지.

1. CommerceEvent: +recommendationId?·+producerEventKey? unique·+index(recommendationId)
2. RecommendationEvent: +eventId PK·recommendationId 비유니크 index·기존 물리 sessionId nullable화·+producerEventKey unique·+presentationDedupeKey? unique·unique(recommendationId,eventType)·기존 XOR/형식/enum/product/sku/reason/timestamptz CHECK 유지
3. CartItem·OrderItem: +recommendationId?·+recommendationSessionId?·+recommendationLinkedAt?·OrderItem +purchaseItemRef? unique
4. ConsentRecord: §5.6 append-only 필드
5. +CommerceEvidenceRecord(정규화 필드·내부 orderItemId FK·opaque purchaseItemRef·actor XOR·동의 스냅샷·crossServiceElected·crossServiceConsentRecordId·lineage·retention·reason/status·복합 unique(orderItemId,clientRequestId)·sourceEventId unique·createdAt timestamptz)
6. +CommerceEvidenceTombstone(§5.7)
7. FoundationSignalOutbox: §5.9 evidence-only 컬럼+새 행 조건 CHECK+legacy nullable 호환 유지

불변·writer 0: MemoryFactCandidate·LongTermMemoryFact·RecOutcomeFeedback·SubjectRefMap.allowLink·전체 FOUNDATION/SIASIU 스키마.

전제: 정확한 branch/head · tracked dirt 0 · **disposable rehearsal DB에서 RecommendationEvent 행 0** · 실 target 연결 0 · 명백한 disposable local/shadow · flags OFF. **RecommendationEvent에 행 존재 시 STOP**(backfill/rewrite/merge/drop 금지).

Ephemeral 리허설: disposable PG 생성→기존 baseline 적용→RecommendationEvent 0행 assert→신규 적용→§8 DB 케이스만→테스트 행 제거→down.sql→baseline shape 복원 assert→재적용+schema-only 재확인→파기.

롤백: 런타임=flags OFF(활성화 없음). down.sql=리허설 전용·모든 신규 A/B 테이블+RecommendationEvent zero-row 전제로 시작·데이터 삭제/재작성 금지·데이터 존재 시 fail-closed. 유일 승인 복구=새 handoff 하 forward 수정. production/persistent 롤백 미설계·미승인.

### 5.11 Contract-to-code mapping (전 필드)

| 계약 필드 | DB 착지 | API/event 착지 | 테스트 anchor |
|---|---|---|---|
| schema_version | Outbox.schemaVersion | envelope.schema_version | 비-v1 거부 |
| evidence_id | Record.evidenceId·Outbox.evidenceId | 서버 출력만 | 형식+불변+unique |
| evidence_type | Record.evidenceType | 액션 mapper | 3값 수락+구체 오답 거부 |
| source.service | payload 상수 | cosmile | 정확 상수 |
| source.environment | record/outbox environment | 서버 derive local/shadow | production 거부 |
| source.source_event_id | sourceEventId unique | 서버 mint | 재시도 보존 |
| source.idempotency_key | Outbox.idempotencyKey unique | 결정론 빌더 | 동일입력 동일키·source 변경 시 키 변경 |
| source.occurred_at | createdAt | 서버 UTC | 클라 시간 무시 |
| clientRequestId | Record.clientRequestId·unique(orderItemId,clientRequestId) | 요청 전용(envelope 금지) | 동일소유 replay·타소유 generic not-found |
| canonicalEvidenceStatus | 비영속(트랜잭션 결과 파생) | written/duplicate/failed_closed | 쌍 롤백+상품 변이 보존 |
| actor.subject_ref | record/outbox subjectRef | 서버 derive | XOR+형식 |
| actor.anonymous_ref | record anonymousRef·outbox null | 서버 derive | local 허용·outbox guest 거부 |
| actor.identity_state | 파생 | identified/anonymous | XOR 일치 |
| actor.identity_link_allowed | false 상수 | false | true 거부 |
| purchase.purchase_item_ref | OrderItem.purchaseItemRef·record/outbox | 서버 매핑 | raw 라인 ID 부재 |
| purchase.product_ref | record/outbox productRef | 서버 소유 라인 snapshot | 누락/불일치 거부 |
| purchase.sku_ref | record.skuRef? | 서버 소유 | null+유효 SKU |
| purchase.purchase_state | paidAt 게이트 후 paid 상수 | paid | pending/cancelled 차단·refunded+paidAt 수락 |
| feedback.satisfaction | record.satisfaction? | 폐쇄 mapper | 각 값+null |
| feedback.adverse_type | record.adverseType? | 폐쇄 mapper | 각 값+오답 |
| feedback.adverse_severity | record.adverseSeverity? | 조건 mapper | low/mod/sev/unknown 축 |
| feedback.adverse_certainty | record.adverseCertainty? | reported만 | repeated/verified/contradicted 입력 거부 |
| consent.purpose | ConsentRecord.purpose | 현행 effective grant | 정확 cross-service purpose |
| consent.state | ConsentRecord.state+record election | checked election+effective grant일 때만 granted | unchecked/missing/revoked/expired는 envelope 불가 |
| consent.notice_version | ConsentRecord.noticeVersion | 고정 카피 버전 | 부재/오류 차단 |
| consent.captured_at | ConsentRecord.capturedAt | 서버 시간 | grant 필수 |
| privacy.raw_text_stored | false 상수+컬럼 없음 | false | 예상외 raw 키 거부 |
| privacy.contains_pii | false 상수 | false | PII 키/값 fixture 거부 |
| privacy.retention_class | record/outbox evidenceRetentionClass | 결정론 mapper | adverse 이중 null expiry+duration_unconfigured |
| outbox.queueExpiresAt | Outbox.queueExpiresAt? | 서버 derive | adverse null·비-adverse +30d |
| outbox.retentionState | Outbox.retentionState? | 서버 derive | adverse duration_unconfigured·비-adverse null |
| crossServiceElected | record.crossServiceElected | 현재 폼 election만(envelope 제외) | 구 grant에도 unchecked=local |
| lineage.root_evidence_id | record.rootEvidenceId | 서버 derive | root/correction/retraction |
| lineage.supersedes_evidence_id | record.supersedesEvidenceId unique | correction 액션 | branching 거부 |
| lineage.retracts_evidence_id | record.retractsEvidenceId unique | retraction 액션 | 2차 철회 거부 |
| lineage.normalizer_version | record/outbox normalizerVersion | 상수 v1 | 미지원 버전 거부 |
| lineage.source_hash | record/outbox sourceHash | 정규 빌더 | 재시도 하 안정 |

### 5.12 End-to-end key tracing (5+2종)

| 키 | mint/source | 전파 | 저장/join | 경계 |
|---|---|---|---|---|
| recommendation_id | present route·ids.ts | 카드→상호작용/cart/wishlist→CartItem→OrderItem | RecommendationEvent·CommerceEvent·RecOutcomeEvent·CommerceEvidenceRecord | opaque·cart에서 mint 금지 |
| recommendation_session_id | 승인된 local source만(A/B mint 0) | shown→CartItem→OrderItem | RecommendationEvent.sessionId 물리컬럼+전파 2컬럼 | nullable·cross-service identity/envelope 금지 |
| subject_ref | ids.ts·서버 derive | rec/evidence services | RecommendationEvent·RecOutcomeEvent·Record·outbox | envelope에 raw user ID 금지 |
| anonymous_ref | ids.ts·서버 derive | rec/local feedback만 | RecommendationEvent·RecOutcomeEvent·local record | cross-service outbox 금지 |
| order_item_id | OrderItem PK(내부) | 서버 ownership/FK만 | RecOutcomeEvent·record FK | envelope/outbox/API 결과 금지 |
| purchase_item_ref | paid 게이트 후 서버 lazy mint | local evidence→envelope | OrderItem unique·record·outbox | local 밖 유일 구매라인 ref |
| candidate_id | **mint 없음** | 전파 없음 | A/B 컬럼/write 없음 | candidate 호출·write 전부 0 |

### 5.13 Safety 우선순위 매핑

| 규칙 | 코드 구조 | 필수 assert |
|---|---|---|
| 만족도가 adverse 하향 불가 | adverse 독립 정규화→MAX 병합 | satisfied+severe=severe/휴먼리뷰 유지 |
| unknown severity fail-closed | enqueue 전 명시 unknown 분기 | outbox 0·정적 안내·리뷰 상태 |
| 심각 처리≠자동 신고 | local status만 | network/provider/import/consumer 0 |
| 철회 증거 재유입 불가 | correction/new root/outbox 전 tombstone precheck | replay 차단 |
| candidate 생성 금지 | allowlist에 candidate import/호출 0 | 정적 참조 0+가짜 호출 0 |
| identity link 기본 OFF | SubjectRefMap writer 0 | allowLink=false 유지 |
| adverse 단기 TTL 금지 | 보존 산술 전 adverse 분기 | 이중 null expiry·duration_unconfigured·유효 행 enqueue 유지 |

## 6. 접근성·반응형·비정상 상태

키보드/포커스: 전 컨트롤 native button/link/checkbox/radio · radio는 fieldset/legend(화살표/Space native) · 피드백 열기=dialog 헤딩 포커스·닫기=원 버튼 복귀 · modal 내 Tab trap·제출 중 아니면 Escape 닫기(미저장=discard 확인) · 추천 숨기기=다음 액션/섹션 헤딩 포커스.
스크린리더: role=dialog+aria-modal+라벨 헤딩+상품 설명 · aria-busy·aria-live=polite · 정적 adverse 안내 role=alert(색 단독 금지) · 저장/숨김 텍스트 포함·찜 aria-pressed · 내부 ID/reason 코드/해시 announce 금지.
모션: 기본 ≤180ms transform/opacity · prefers-reduced-motion=translation/shimmer/spin(필수 busy 제외)/smooth scroll 제거 · 의미가 애니메이션 의존 금지.
고배율/정적: 고정 카드 높이 금지 · 내부 스크롤 후 sticky 액션 도달 가능 · 200% 줌 라벨 wrap·컨트롤 쌍 유지 · 아이콘=인접 텍스트/접근명 · error/blocked/expired/revoked/duplicate/empty/loading/offline/UNKNOWN 전부 명시 카피.

## 7. Worker 제품 저장소 allowlist (정확·초과 금지)

정본 설계문서(코드 전 최초 생성): `설계자료/COSMILE_추천수명주기_구매피드백_커머스증거_설계서.md`
Schema/migration: `app/prisma/schema.prisma` · `app/prisma/migrations/20260715120000_m2_ab_recommendation_feedback_evidence/{migration.sql,down.sql}`
Types/pure: `app/src/types/{commerceEvent,recommendationEvent,recOutcome,commerceEvidence}.ts` · `app/src/lib/{ids,attribution,commerceEvidenceNormalizer,purchaseFeedbackState,recommendationClientContext}.ts`
Services: `app/src/lib/{commerceEventService,recommendationEventService,recOutcomeEventService,commerceEvidenceService,foundationSignalMapper,cart,checkout}.ts`
Routes: `app/src/app/api/recommendations/present/route.ts` · `app/src/app/api/recommendations/[recommendationId]/events/route.ts` · `app/src/app/api/cart/items/route.ts` · `app/src/app/api/wishlist/toggle/route.ts` · `app/src/app/api/orders/[orderId]/items/[orderItemId]/feedback/route.ts` · `app/src/app/api/commerce-evidence/consents/route.ts` · `app/src/app/api/checkout/mock-complete/route.ts`
UI: `app/src/lib/slice/consultFoundationView.ts` · `app/src/components/slice/{ConsultationChatShell,ConsultationMessageList,ConsultFoundationResult}.tsx` · `app/src/components/product/{AddToCartButton,WishlistButton}.tsx` · `app/src/components/feedback/PurchaseFeedbackPanel.tsx` · `app/src/app/orders/[orderId]/page.tsx`
Tests: `app/scripts/{v3_11,v3_11c_rec_event,v3_11c2_rec_outcome,m2_ab_recommendation_lifecycle,m2_ab_commerce_evidence,m2_ab_feedback_state}.vitest.ts` · `app/scripts/m2_ab_no_transport.mjs` · `app/scripts/m2_ab_migration_rehearsal.dbtest.py`

수정 금지: 역사적 마이그레이션 · memoryCandidate.ts · MemoryFactCandidate/LongTermMemoryFact 코드/스키마 · Foundation/SIASIU 파일 · .env/secret · 패키지 의존성 · legacy untracked 문서 · **/api/events route**.

## 8. Test-first 매트릭스 (요지 — 전 케이스는 reviewed design §8)

전 구현 테스트는 해당 코드 전 **실패 상태로 작성**; 실패는 TEST_MEANING_POLICY로 분류. assertion 약화/skip/snapshot 갱신/케이스 삭제로 green 금지.

- **8.1 pure/contract(safe)**: A OFF 무호출·무행·generic 유지 / showRecommendation=false 무mint·무recommendation_view·generic client 유지 / present 1ID·중복=기존ID / 동일 ID 5단계 행 수락 / producerEventKey+(id,type) collapse / 후속 이벤트가 shown에서 identity/product/sessionId 복사(클라 입력 아님) / null sessionId 수락·위조 거부 / generic cart·wishlist 수명주기 0 / guest 추천 로그인 후 재사용 불가 / 쌍 동일 키·view 이중카운트 없음 / canonical client-direct 0 / 단계당 두 plane 각 1행(재시도 포함) / 주입 실패=양행 롤백+failed_closed / 선행 변이 보존. Attribution: direct/session/organic·광의 조회 금지·무효 ID=organic·latest touch·merge drop. 정규화·safety: §5.4 전행·satisfied+severe 유지·만족도 무영향·unknown=리뷰+outbox0·유효 3 severity enqueue+severe 리뷰·A/B에서 repeated/verified/contradicted 선택 불가·정적 카피 상수·raw 키 거부. 동의·identity: missing/pending/revoked/expired 차단·userId≠grant·same≠cross·cross≠link·guest local만·guest outbox 거부·allowLink writer 0·revocation 즉시·구 grant 무precheck·unchecked=local+무revocation·checked 무grant=1 grant append·checked 유grant=중복 없음·granted는 checked+effective만·해결실패=정직 local·revoke API append+반복 idempotent·철회≠revocation. Lineage: root/correction/retraction·stale/branching/2차철회 거부·tombstone replay 차단·정정 불변·철회 무feedback. Retention: 30/90/180 서버시간 산술·adverse 이중 null+duration_unconfigured·adverse 단기 TTL 금지·만료 ineligible·cleanup/consumer 0.
- **8.2 API(주입 저장소·safe)**: owner+paid 게이트·비소유 generic not-found·pending/cancelled 차단·refunded+paidAt eligible·(orderItemId,clientRequestId) 동일소유 replay/타라인 별개·**ownership→idempotency 순서**·body whitelist·응답 raw 0·전 상태 응답·정정/철회 인가·consents revoke 고정 action/purpose+idempotent+식별자 0·변이 성공+failed_closed 보존·flags OFF 기본+production 차단.
- **8.3 UI 상태(safe)**: paidAt(+refunded) 라인 진입·포커스/라벨·local 동의+의미축 전 제출 disabled·cross 체크박스 무precheck(구 grant 포함)·확인문구=결과 일치·guest cross disabled+설명·severity 조건 노출·adverse 안내 지속·duplicate=기존상태 성공·offline/UNKNOWN≠saved·정정/철회 카피·ID 전 카드 숨김·canonical client-direct emitter 0·generic/flags-OFF 현행 유지+新CTA 0+view 억제·계정 revocation UI 없음.
- **8.4 ephemeral DB(disposable PG만)**: sessionId nullable 물리 착지·eventId PK+다중 행·unique 단계/producer 키·XOR/형식·전파 컬럼·purchaseItemRef unique·Record 폐쇄 enum/XOR/조건 adverse/lineage 제약·복합 unique(전역 아님)·동의+elected 조건 CHECK·outbox 새 행 제약(raw null·pending/blocked·sentAt 없음)·adverse/비-adverse queueExpiry 규칙·candidate write 0·forward/down/forward+zero-row 전제. **infra 불가=SKIP(≠PASS)**.
- **8.5 정적 봉쇄(safe)**: evidence 서버 서비스에 Foundation client/fetch/HTTP/socket/consumer/sender/flush/retry/timer/cron/poller/delivery import 0 · diff에 MemoryFactCandidate/canCreateCandidate/canPromote/LongTermMemoryFact/adverse-candidate 참조 추가 0(신규 A/B 파일 0) · .env 변경 0·flag true 0 · envelope 빌더에 raw_text/message/note/answer 0 · payloadJson에 orderId/orderItemId/userId/guestId/traceId/결제ID 0 · 테스트 약화/skip/snapshot/삭제 0.
- **8.6 회귀(safe)**: 기존 v3_11·rec_event·outcome 스위트 · 기존 event schema/generic view-click eval+canonical 무direct-emission assert · tsc+production build(전 A/B flags OFF·외부 provider/DB 0) · cart/wishlist/checkout/주문상세/상담(flags-OFF read-only 카드 포함) 영향 경로.
- **8.7 금지**: 실 target DB/migration deploy/live flag/secret/env dump/Foundation·SIASIU network/outbox delivery/실 사용자·주문·PII fixture/main·merge·(본 설계 handoff 하) commit·push·배포.

## 9. 구현 순서·코드 소유

전 제품 파일=Cosmile Worker 소유(Control/Designer 제품 write 0·Reviewer patch 0). 순서: ①검증 ②정본 설계문서 ③실패 pure 테스트 ④신규 마이그레이션+disposable 리허설 ⑤RecommendationEvent 제약 수정+producer 쌍 트랜잭션+failed_closed ⑥클라 컨텍스트+cart/wishlist/checkout 전파(변이=트랜잭션 밖 유지) ⑦동의/증거/lineage/tombstone/보존/봉쇄 outbox 서비스 ⑧추천·구매라인 피드백 UI/API ⑨승인 대상 검사만 max 검증 effort ⑩proved/not-proved 기록·Advisor 반환. 어떤 단계도 flag 활성/outbox 전달/Foundation 접촉/candidate 생성 없음.

## 10. 요구→설계→파일→테스트 추적 (Founder)

| Founder | 설계 착지 |
|---|---|
| F1 nullable opaque session·표시 시점 ID | §3.1·§3.2·§5.2·§5.10 |
| F2 두 plane·producer 매핑·dedupe | §3.1·§5.1·§5.2 |
| F3 Cosmile 정규화 소유 | §5.3·§5.4 |
| F4 Cosmile candidate 0 | §5.12·§5.13·§7·§8.5 |
| F5/F6 Foundation 자격/candidate=future C | §11 |
| F7 별도 동의·userId≠동의 | §3.3·§3.5·§5.3·§5.6·§5.9 |
| F8 identity link OFF | §3.6 |
| F9 append-only 정정/철회 | §3.4·§5.7 |
| F10 만족도/adverse 독립 | §5.4·§5.13 |
| F11 정적 adverse 안내 | §4.2 |
| F12 adverse hold 기간 미구현 | §5.8·§5.9 |

## 11. 명시 제외·kill switch

제외: Foundation 자격 validator/C 설계·intake·candidate/adverse-candidate 생성·promotion·재사용·memory/ranking/safety 변이 · outbox consumer/sender/flush/retry/dead-letter/delivery/network/집계 worker · 외부 semantic provider/LLM 정규화/embedding/raw text · 자동 identity link/guest cross-service 증거 · 계정 동의철회 UI(A/B=인증 revocation API+테스트만) · session 생성 · multi-touch/가중/cross-device/역사 귀속 · 역사 backfill · 법적 관할/책임자 결정 · 규제 신고 · production/live/persistent flags · (본 설계 handoff 하) 실 DB·secret·env 변경·main/protected·deploy·merge·commit·push.

Kill switch: `COSMILE_REC_EVENT_ENABLED` OFF 유지 · `COSMILE_REC_OUTCOME_ENABLED` OFF 유지 · 신규 `COSMILE_COMMERCE_EVIDENCE_ENABLED` 기본 OFF+production 무조건 false · A OFF 시 ConsultFoundationResult=현행 read-only generic 카드(新CTA 0) · 계정 revocation 표면 별도 승인 전 production/live 금지 · NEXT_PUBLIC flag 단독 서버 write 불가 · env 파일 추가/변경 0.

## 12. 잔여 위험·HARD STOP

잔여: ①PK 수정=disposable 0행 전제(행 존재=HOLD·backfill 금지) ②authoritative session mint 부재(session 귀속 설계만·런타임 미증명) ③본 설계는 live 렌더 미실행 — 구현 리뷰가 390×844/키보드/reduced-motion/200% 검사 ④adverse hold 기간·법적 삭제 미해결(전달 없음·국소 축적 가능) ⑤보존 만료=eligibility만(cleanup 미활성·활성화=별도 운영 handoff) ⑥한 물리 outbox 공유(조건 제약+signalType 분리=load-bearing) ⑦generic signal enqueue fail-closed화 — 일반 CommerceEvent 기록 무결성 회귀 증명 필요 ⑧브라우저 테스트 lib 없음 — UI=순수 상태 모듈+구현 리뷰 육안(의존성 추가=새 scope 결정) ⑨durable revocation=API+테스트만(계정 표면 이월).

HARD STOP: actor/session/workspace/branch/head 불일치 · tracked dirt 중첩 · migration preflight에 RecommendationEvent 행 · 설계 미고정 schema/필드 의미 · 새 동의 목적/보존 기간/identity link/session source/법적 결정 필요 · candidate writer/호출 · outbox consumer/network/intake · 증거 내 raw text/PII/secret/실 식별자 · 실 DB/production/live/protected/main/flag 활성 · 계정 revocation 표면 승인 전 production 제안 · §7 밖 파일.

---

**RETURN_TO: foundation-advisor** · 이 문서는 자기승인하지 않으며 구현 권한을 부여하지 않는다. 구현 권한=exact Worker handoff(38). C/Package 1B/production=미승인.
