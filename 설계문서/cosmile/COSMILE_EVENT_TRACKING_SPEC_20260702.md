# COSMILE-EVENT-TRACKING-SPEC — canonical event schema 설계서 (구현 전)

> 작성: foundation-control (control tower) · 2026-07-02 · ★설계서 작성만(코드 수정 0 · 이벤트 구현 0 · DB write 추가 0 · cart/checkout/order 수정 0 · push 0)
> 근거: `docs/COSMILE_EVENT_TRACKING_AUDIT_REPORT_20260702.md`(AUDIT_READY_FOR_SCHEMA) · 기존 정본 `Cosmile/설계자료/COSMILE_커머스_인텔리전스_설계서.md`·`COSMILE_Foundation_Signal_Contract.md`
> 원칙: **기존 commerceEvent 시스템을 존중·확장**(갈아엎지 않음). Foundation FRC ↔ 고객 행동 이벤트 연결 계약을 고정.

---

## 0. 상태 / 승인
- 상태: **DRAFT(미승인)**. Leo 승인 전 구현 프롬프트·코드 수정 0.
- 이번 단계: schema/taxonomy/매핑/연결/정책 **설계만**. 구현은 §10 Phase별·승인 후.

## 1. 현재 감사 결과 요약
- **pre-existing commerceEvent 시스템 존재**: `commerceEventService.trackCommerceEvent → prisma.commerceEvent.create`(~30 emit site·canonical enum ~70·server-derived userId·SENSITIVE_KEYS scrub·isTest·`foundationSignalOutbox` 미발신). 이번 SPEC은 **이를 존중·확장**.
- **2계층 구분**: slice signal(`/api/slice/signal`·**write 0**·ack) ↔ commerce event(`prisma.commerceEvent`·**write**). SPEC canonical schema = **commerce event 계층**의 계약(slice signal은 aggregate 신호로 유지).
- **P0 = 0**(active PII leak/무결성 위반 없음).
- **P1**: Foundation FRC/trace 이벤트 연결 부재 · PII 값-스캔 미적용(키 blocklist만) · UTM 미캡처 · 일반 session_id 부재.
- **P2**: sku_id/category_id 미정규화 · search/filter/recommendation·card view·click 미emit · sessionStorage raw 대화 TTL · outbox consent 가정 · context populate 불일치.

## 2. canonical event schema v1 (`cev-1.0`)
> 기존 `TrackCommerceEventInput`(commerceEvent.ts) **상위 호환** — 기존 필드 유지 + 아래를 표준화/추가. ★설계 스키마(구현 아님).
```jsonc
{
  "event_version": "cev-1.0",
  "event_name": "product_view | add_to_cart | foundation_decision_received | ...",  // §3 taxonomy
  "occurred_at": "ISO8601(서버 스탬프)",

  // ── identity (★server-derive·client 조작 불가) ──
  "anonymous_id": "guest cosmile_gid",
  "session_id": "web session(일반화·§6)",
  "customer_id": null,               // = userId(서버 세션). client 신뢰 ❌

  // ── context ──
  "page_path": null, "referrer": null,
  "country": null, "language": null, "device": null,
  "channel": "web | ai_agent | commerce_chat | ...",

  // ── attribution ──
  "utm_source": null, "utm_medium": null, "utm_campaign": null,
  "campaign_id": null,

  // ── entity (canonical refs만·서비스 제품 자작 0) ──
  "product_id": null,     // canonicalProductId
  "sku_id": null,         // ★first-class 승격
  "brand_id": null,       // canonicalBrandId
  "category_id": null,    // ★first-class 승격

  // ── Foundation 연결(FRC refs/enum만·raw_text 0) ──
  "foundation_trace_id": null,
  "foundation_decision_type": null,          // recommend|do_not_recommend|do_not_buy|hold|ask_more|cannot_determine
  "foundation_final_strategy": null,         // safety_first|recommend_with_caution|answer_then_clarify|clarify_first|refuse|answer_only
  "foundation_safety_gate_result": null,     // pass|caution|block
  "foundation_products_allowed": null,       // bool
  "foundation_recommendation_allowed": null, // bool

  // ── payload (★PII 금지·자유텍스트 제한·enum/aggregate/refs만) ──
  "payload": { /* SENSITIVE_KEYS + value-scan scrub · raw 발화/검색어/주소 금지 */ }
}
```
- 매핑: 위 필드 대다수는 기존 commerceEvent 컬럼(userId→customer_id·canonicalProductId→product_id·canonicalBrandId→brand_id·campaignId·channel/locale→language/country/device/referrer/pagePath)과 대응. **신규 = sku_id·category_id·utm_*·foundation_*·event_version**.

## 3. event taxonomy (canonical 이름 확정)
| canonical | 정의 | 상태(감사) |
|---|---|---|
| `page_view` | 페이지 진입 | 기존 product/brand/category_viewed 계열 → page_view(context)로 표준화 |
| `product_view` | 상품 상세 조회 | 기존 product_viewed |
| `search` | 검색 실행 | ★미emit → 신규 배선(P2) |
| `filter_apply` | 필터 적용 | ★미emit → 신규 배선(P2) |
| `consultation_start` | 상담 시작 | 기존 consultation_started |
| `consultation_message` | 상담 메시지 turn | ★미구현 → 신규(원문 저장 0) |
| `foundation_decision_received` | Foundation FRC 수신 | ★미구현 → 신규(§5·핵심) |
| `recommendation_view` | 추천 노출 | ★미구현 → 신규(P2) |
| `recommendation_click` | 추천 클릭 | ★미구현 → 신규(P2) |
| `product_card_view` | 상품카드 노출 | ★미구현 → 신규(P2) |
| `product_card_click` | 상품카드 클릭 | ★미구현 → 신규(P2) |
| `add_to_cart` | 담기(이벤트 기록) | 기존 cart_add |
| `cart_remove` | 담기 제거 | 기존 cart_remove |
| `checkout_start` | 체크아웃 시작 | 기존 checkout_start |
| `purchase` | 구매 완료 | 기존 purchase_complete |
| `wishlist_add` | 찜 추가 | 기존 wishlist_add |
- ★기존 enum(COMMERCE_EVENT_TYPES)은 **유지** — canonical 이름은 **표준 alias/뷰**로 도입(기존 eventType 파괴 금지·§4 매핑).

## 4. 기존 ↔ canonical 매핑
| 기존 eventType | canonical event_name |
|---|---|
| product_viewed | product_view |
| brand_viewed / category_viewed | page_view(+entity) |
| cart_add | add_to_cart |
| cart_remove | cart_remove |
| checkout_start | checkout_start |
| purchase_complete | purchase |
| wishlist_add | wishlist_add |
| consultation_started | consultation_start |
| consultation_ended | consultation_end |
| ai_recommendation_accepted/ignored·ai_caution_* | recommendation_click / recommendation_view(반응) |
| (신규) | search · filter_apply · consultation_message · foundation_decision_received · recommendation_view/click · product_card_view/click |
- 매핑은 **추가 뷰**(기존 write 파괴 0). 신규는 §10 Phase에서 배선.

## 5. Foundation trace / FRC 연결 설계
- **`foundation_decision_received`**(신규): `consultViaFoundation`가 FRC 수신 시 1건 기록.
  - 저장: `foundation_trace_id`(FRC.trace_id) · `foundation_decision_type` · `foundation_final_strategy` · `foundation_safety_gate_result` · `foundation_products_allowed` · `foundation_recommendation_allowed`.
  - **raw_text 저장 금지**(FRC 계약 raw_text_stored=false 정합). answer_substance 원문 금지.
  - **FRC product_candidates = canonical product refs만**(product_id 목록·이름/가격/자유텍스트 0).
- **후속 반응 연결**: recommendation_click/product_card_click 이벤트에 `foundation_trace_id`를 링크 → FRC verdict ↔ 실제 고객 반응 조인(ai_recommendation_accepted/ignored 배선).
- **방향**: Foundation→Cosmile(FRC 기록) 신규 + 기존 Cosmile→Foundation outbox(유지·미발신). 두 방향 혼동 금지.
- ★UI-switch foundation path(consultViaFoundation)는 현재 emit 0 → 이 이벤트가 **첫 배선**(Phase 2).

## 6. identity / session 설계
- **anonymous_id** = guest 쿠키(`cosmile_gid`·랜덤·httpOnly·기존 유지).
- **customer_id(=userId)** = **서버 세션 derive**(getMockCurrentUser)·★client 조작 불가 유지.
- **guestId ↔ anonymous_id**: guestId를 anonymous_id로 표준화(현행 매핑 유지).
- **session_id 일반화**: 현재 consultation-meta id만 → **web session_id**(요청 스코프·쿠키/서버 발급) 도입해 모든 이벤트에 populate. 상담 세션은 별도 `consultation_session_id`(properties)로 유지.
- **guest→user merge**: 기존 mergeGuest(gid 소진·anonymous_id↔customer_id 링크·merged 이벤트) 유지. merge 이벤트에 두 id 보존.
- ★client는 customer_id/session_id를 **위조 불가**(서버 derive·서명/쿠키).

## 7. PII 정책 (보강)
- **raw message / raw health note / raw skin note 저장 금지**(현행 유지·명문화).
- **email/phone/address/name = 저장 금지** + **value-level PII scan 추가**(현 SENSITIVE_KEYS 키-blocklist에 **값 스캔** 보강: 이메일/전화/카드 정규식·자유텍스트 차단).
- **SENSITIVE_KEYS 보강**: name·birth·ssn·ip 등 추가 검토 + 비민감 키에 자유텍스트 유입 차단(allowlist 지향).
- **event payload 자유 텍스트 제한**: enum/aggregate/refs만 허용 · 원문/검색어 원본 금지(검색은 정규화된 term hash/카테고리만).
- **sessionStorage raw 대화 TTL**: ConsultationChatShell CHAT_KEY 대화 보존에 만료/clear 정책(예 세션 종료·N분 TTL).
- **console/log redaction**: 로그에 payload/PII 미출력(현행 e.message만 유지·확대 금지).

## 8. attribution / context 설계
- **UTM 캡처**: landing 시 utm_source/medium/campaign 캡처(쿠키/세션 attribution) → 이벤트 populate. `campaign_id` 연결(기존 campaignId·group_buy/coupon).
- **context**: country/language(locale 분해)/device(UA 파싱)/channel(web/ai_agent/commerce_chat)/page_path/referrer 일관 populate.
- ★모두 refs/enum/aggregate — PII 아님.

## 9. sink / write boundary
- **기존 commerceEvent DB write = pre-existing 유지**(파괴/이동 0).
- ★**이번 schema 구현 전까지 write 확장 금지**(SPEC은 설계·write 0).
- **add_to_cart 이벤트 기록 ≠ cart DB write**: 이벤트는 행동 기록 · 실제 담기(`/api/cart/items` prisma cart)는 **CART-WRITE train**. 혼동 금지.
- **CART-WRITE WIP와 분리**: event schema는 cart/checkout/order write를 추가하지 않음.
- **외부 pixel(GA4/Meta/mixpanel…) = 별도 승인 전까지 0**.
- **Foundation outbox = 미발신(pending) 유지**(실 발신은 별도 승인).

## 10. 구현 단계 제안 (각 Phase = 설계→승인→구현)
| Phase | 범위 | write |
|---|---|---|
| **P1. schema/constants/types only** | `cev-1.0` 상수·타입·매핑·validator(순수) · 기존 enum alias | write 추가 0 |
| **P2. foundation_decision_received 연결** | consultViaFoundation → FRC 이벤트(trace/decision/strategy/gate/flags·raw 0) | commerceEvent write(1이벤트) |
| **P3. recommendation/product_card view·click** | 카드/추천 노출·클릭 이벤트 + foundation_trace_id 링크 | commerceEvent write |
| **P4. UTM/session/context 보강** | web session_id·UTM 캡처·country/device populate·PII 값-스캔 | commerceEvent write |
| **P5. dashboard/analytics pipeline** | 집계/대시보드(read) · (선택) 외부 pixel = 별도 승인 | read/별도 승인 |
- ★각 Phase 착수 = 설계서 PASS + Leo 승인. write 확장은 Phase별 명시 승인.

## 11. 테스트 / 검증 기준
- **PII leak test**: email/phone/address/raw message/health note가 commerceEvent·outbox·log·sessionStorage에 저장되지 않음(값-스캔 포함).
- **event payload schema validation**: `cev-1.0` 필드/enum/타입 검증 · 자유텍스트 차단.
- **Foundation trace 연결 test**: foundation_decision_received가 trace_id/decision/strategy/gate/flags 저장 · raw_text 0.
- **productRefs canonical validation**: product refs ⊆ FRC.product_candidates ⊆ canonical(서비스 자작 0).
- **no raw_text 저장 test**: 상담/FRC 원문 미저장.
- **write boundary test**: schema Phase에서 cart/checkout/order write 추가 0 · add_to_cart 이벤트 ≠ cart write · 외부 전송 0.
- **identity 위조 test**: client가 customer_id/session_id 조작 불가(server derive).

## 12. 남은 위험 / 보류 항목 (별도 승인 train)
- **CART-WRITE**: `/api/cart/items` cart DB write(UI-switch WIP) → 별도 승인.
- **production exposure**: 이벤트/UI live 실사용자 노출 → 별도 승인.
- **external pixel(GA4/Meta/…)**: 외부 전송 → 별도 승인(개인정보/동의).
- **dashboard/analytics**: 집계 read pipeline → Phase 5.
- **AI analyst**: Foundation verdict↔행동 조인 분석 → 후속.
- **Foundation outbox 실발신·consent 실검증**: Foundation Signal Contract train.

---

## 한계 / 승인
- 이 문서 = **schema 설계(DRAFT)**. 구현은 §10 Phase별 설계서 → **Leo 승인** 후 Cosmile repo-local.
- ★코드 수정 0 · 이벤트 구현 0 · DB write 추가 0 · cart/checkout/order 수정 0 · 외부 pixel 0 · production exposure 0 · push 0.
- 기존 commerceEvent 시스템 **존중·확장**(canonical 이름은 alias/추가 필드·기존 파괴 0).

## 요약
`cev-1.0` canonical event schema = 기존 commerceEvent **상위 호환 확장** + **Foundation FRC 연결**(`foundation_decision_received`·trace_id/decision/strategy/gate/flags·raw 0·refs만) + sku/category first-class + UTM/session/context + **PII 값-스캔 보강**. add_to_cart 이벤트 ≠ cart write · 외부 pixel/CART-WRITE/production = 별도 승인. Phase 1(schema-only)부터 승인 단계 진행. 코드 0 · push 0.
