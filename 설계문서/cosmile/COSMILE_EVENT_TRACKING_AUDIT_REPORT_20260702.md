# COSMILE-EVENT-TRACKING-AUDIT — Report (deep read-only · code-cited)

> 작성: foundation-control (control tower) · 2026-07-02 · ★read-only 감사(코드 수정 0 · 이벤트 구현 0 · DB write 추가 0 · cart/checkout/order 수정 0 · WIP 정리 0 · push 0)
> 대상: Cosmile 현재 이벤트 추적 시스템 · 근거 = 실제 코드 인용(file:line)

## 1. 최종 판정: **AUDIT_READY_FOR_SCHEMA** (P0 gap 없음 · P1/P2 gap는 schema slice 입력)
Cosmile는 **성숙한 pre-existing commerce event 시스템**(canonical enum·server-derived userId·SENSITIVE_KEYS scrub·isTest·Foundation outbox)을 보유. 안전/PII 즉시 위반(active leak)은 미발견 → PATCH 불요. 단 **Foundation FRC 이벤트화·UTM·값-스캔 PII·ai_*/search/filter 미emit** 등 schema slice에서 닫을 gap 존재.

---

## 2. 전체 이벤트 맵 (2계층)
| 계층 | 진입 | sink | write | 근거 |
|---|---|---|---|---|
| **A. slice signal** | `emitSignal`(ConsultationChatShell.tsx:28) → `/api/slice/signal` | ack(`interpretsCustomer:false·storedAsMemory:false`) | **write 0** | signal/route.ts:20,28 |
| **B. commerce event** | `EventTracker`→`/api/events` · ~30 route → `trackCommerceEvent` | **`prisma.commerceEvent.create`** | **write O** | commerceEventService.ts:25 |
| **B'. Foundation outbox** | `trackCommerceEvent` → `maybeEnqueueFoundationSignal` | **`prisma.foundationSignalOutbox.create`**(status=pending·★실발신 0) | write O(큐만) | foundationSignalMapper.ts:45,56 |
- **외부 pixel(GA4/gtag/Meta fbq/mixpanel/segment/posthog) = 0**(app/src 미발견).
- ★slice signal의 `cart_add`(aggregate)와 commerce event의 `cart_add`(DB)는 **별개**.

## 3. 이벤트별 구현 현황표
| 이벤트 | 상태 | 발생/근거 | sink | DB write | payload 요지 | PII |
|---|---|---|---|---|---|---|
| product_viewed | **구현** | emit 4파일(EventTracker 등) | commerceEvent | O | canonicalProductId·pagePath | 없음 |
| brand_viewed / category_viewed | 정의·**부분/미확인** | enum 존재·emit 확인 필요 | commerceEvent | O | — | — |
| search_performed | 정의·**미emit** | emit 0 | — | — | — | (검색어 저장 시 PII 주의) |
| filter_used | 정의·**미emit** | emit 0 | — | — | — | — |
| consultation_started/ended/product_mentioned/handoff_requested | **구현** | consultation/meta/{start,mention,end} | commerceEvent | O | ★`{sessionId, source}`만·**원문 ❌** | 없음(id/source만) |
| consultation_message | **미구현** | 없음 | — | — | — | — |
| foundation_decision_received | **미구현·미정의** | 없음 · consultViaFoundation emit 0 | — | — | — | — |
| recommendation_view/click · product_card_view/click | **미구현·미정의** | 없음 | — | — | — | — |
| ai_analysis_requested | **구현(부분)** | emit 1파일 | commerceEvent | O | — | — |
| ai_result_viewed / ai_recommendation_accepted·ignored / ai_caution_accepted·ignored / ai_hold_overridden | 정의·**미emit** | emit 0(★Foundation verdict↔행동 이벤트) | — | — | — | — |
| cart_add | **구현** | /api/cart/items:26,35 | commerceEvent(+cart DB) | O | canonicalProductId | 없음 |
| cart_remove / cart_quantity_update | **구현** | /api/cart/items/[itemId] | commerceEvent | O | — | 없음 |
| checkout_start | **구현** | /api/checkout/start:13,29 | commerceEvent | O | — | 없음 |
| purchase (=purchase_complete) | **구현** | /api/checkout/mock-complete | commerceEvent | O | orderId | 없음 |
| wishlist_add | **구현** | emit 4파일 | commerceEvent | O | canonicalProductId | 없음 |
| payment_success / payment_fail | **미정의(대체)** | group_buy_payment_requested/success/fail · admin_order_status_changed | commerceEvent | O | — | 없음 |
| coupon_* · group_buy_* · alert_* · admin_* · voice_* | **구현** | 다수 route | commerceEvent | O | id/필드명만 | 없음 |
- ★"누락 필드/미emit" = §12 gap.

## 4. identity 연결 현황
- **anonymousId** = guest 쿠키 `GUEST_ID="cosmile_gid"`(shopper.ts:5·랜덤·httpOnly·logout 발급) → `o.guestId` → event.anonymousId.
- **userId** = **서버 세션 derive**(`getMockCurrentUser`·events/route.ts:21 "★클라 신뢰 ❌") → **client 조작 불가**. ✅
- **customer_id ≡ userId**(별도 개념 없음).
- **guest→user merge**: mergeGuest.ts — 로그인 시 `anonymousId(gid)↔userId` 링크 + `cart_merged`/`wishlist_merged` 이벤트 · gid 소진(delete·재사용 방지).
- **session_id**: commerceEvent에 `sessionId` 필드 존재하나 **대부분 미populate**. consultation만 `properties.sessionId=metaId`(상담 세션 id)로 사용 → **일반 web session_id 개념 부재**(gap).

## 5. product / sku / brand / category 연결 현황
- commerceEvent 필드: `canonicalProductId`·`commerceProductId`·`canonicalBrandId`(first-class). 
- **sku_id**: first-class 없음 — admin_sku만 `properties.skuId`. **category_id**: first-class 없음 — category_viewed 있으나 category는 properties. `campaignId`·`dealId`·`orderId` first-class 존재.
- → sku/category **정규화 미흡**(schema 요구).

## 6. campaign / UTM 연결 현황
- **campaignId** = first-class(group_buy/deal/coupon에서 populate). `dealId` 존재.
- **UTM(utm_source/medium/campaign)** = **미캡처**(grep 0). landing attribution·referrer 필드는 존재(commerceEvent.referrer)하나 populate 불명확. → **UTM/attribution gap**.

## 7. Foundation trace / FRC 연결 현황
- **방향 = Cosmile event → Foundation**(outbox): `maybeEnqueueFoundationSignal`가 whitelist 이벤트(product_viewed·wishlist·cart_add·purchase·refund·ai_*·category_viewed)를 `foundationSignalOutbox`(status=pending·★실발신 0)에 적재. payload=canonical product/brand/channel/locale/country(★매출/결제/연락처 0). consent="가정"(userId 있으면 user_consented·미검증).
- **방향 = Foundation → Cosmile(FRC)**: **부재**. FRC(final_strategy/safety_gate_result/products_allowed/recommendation_allowed/**trace_id**)를 이벤트로 기록하는 경로 **없음**. `foundation_decision_received` 미존재. ai_* 이벤트는 정의됐으나 **미emit** → consultViaFoundation(UI-switch) 경로는 **이벤트 0**.
- **trace_id**: commerceEvent/outbox 필드 아님 → Foundation trace 연결 **없음**. → ★핵심 gap(Foundation verdict↔행동 연결 미배선).

## 8. PII / 민감정보 위험
- **SENSITIVE_KEYS scrub 적용 확인**: `sanitizeProperties`(commerceEventService.ts:7~16)가 **write 전** SENSITIVE_KEYS(password/token/apiKey/card/cvv/**phone/email/address/shippingAddress**/paymentId/**rawHealthNote/rawSkinConditionNote**) 제거 + >1000자 차단. ✅
- **★GAP(P1)**: blocklist는 **키-이름 기반**(값 스캔 아님). 비민감 키(예 `note`)에 자유 텍스트/PII를 넣으면 통과(길이만 제한). raw 발화/검색어가 properties에 들어가면 새어들 수 있음.
- consultation 이벤트: `{sessionId, source}`만 — **원문 ❌**(meta/*.route.ts 주석 명시). ✅
- **★sessionStorage raw 대화 저장(P2)**: ConsultationChatShell.tsx:50-53 `sessionStorage.setItem(CHAT_KEY, JSON.stringify(messages))` — 사용자 원문 대화가 **client sessionStorage**에 저장(DB 아님·client at-rest). TTL/clear 정책 고려.
- **console**: trackCommerceEvent 실패 시 `console.error(e.message)`만(payload 미로깅). ✅
- **Foundation raw_text**: FRC 계약 raw_text_stored=false·commerce event에 원문 미포함. ✅
- localStorage(ShippingPopup) = 날짜만(benign).

## 9. sink / write boundary
| sink | 대상 | write |
|---|---|---|
| no-write ack | /api/slice/signal | **0** |
| prisma.commerceEvent | /api/events + ~30 route(cart/checkout/coupon/consultation/admin/group_buy) | **O(pre-existing)** |
| prisma.foundationSignalOutbox | maybeEnqueueFoundationSignal(pending·미발신) | O(큐) |
| order/cart/checkout DB | /api/cart/items·/api/checkout/* | O(pre-existing commerce) |
| console | error message만 | 로그 |
| sessionStorage | 대화(ConsultationChatShell)·cart lines(cartStore·DB 0) | client |
| localStorage | ShippingPopup 날짜 | client |
| external pixel/GA4/Meta/mixpanel/posthog/segment | **없음** | **0** |

## 10. pre-existing commerceEvent 시스템 평가
- **pre-existing 확인**: `commerceEventService`/`types/commerceEvent`/`/api/events`/consultation·cart·checkout·admin route 전부 기존 시스템(이번 audit·UI-switch와 무관). 정본 설계서 참조 주석(`설계자료/COSMILE_커머스_인텔리전스_설계서.md`).
- **강점**: canonical event enum(~70)·server-derived userId(client 미신뢰)·SENSITIVE_KEYS scrub·isTest 오염 방지·Foundation outbox(whitelist·미발신)·best-effort(흐름 미차단).
- **약점(gap)**: 값-스캔 PII 미적용·UTM 미캡처·sku/category 미정규화·session_id 일반화 부재·**Foundation FRC/trace 이벤트화 부재**·ai_*/search/filter 미emit·consent 가정.
- ★이번 audit의 write 추가 = **0**(read/grep만).

## 11. canonical event schema에 반영할 요구사항
- **Foundation 연결**: `foundation.{trace_id, final_strategy, safety_gate_result, decision_type, products_allowed, recommendation_allowed}` 이벤트화(예 `foundation_decision_received`)·consultViaFoundation 경로 배선(refs/enum만·raw_text 0).
- **PII**: 키-blocklist + **값-스캔/allowlist**(자유텍스트 금지)·raw 발화/검색어 금지 명문화·sessionStorage 대화 TTL.
- **identity**: 일반 `session_id`(web session)·anonymous_id·customer_id(서버 derive) 표준화.
- **entity**: `sku_id`·`category_id` first-class 승격(canonical refs).
- **attribution**: UTM(source/medium/campaign)·landing·referrer 캡처.
- **context**: country/language/device/channel/pagePath 일관 populate.
- **consent**: user_consented 실검증(가정 제거).
- **이벤트 커버리지**: search_performed/filter_used/ai_*(verdict 반응)/recommendation·card view·click emit 배선.

## 12. P0 / P1 / P2 gap
**P0 (안전/무결성 즉시 — 현재 없음)**: active PII leak·미검증 write 없음. (없음)
**P1 (schema slice에서 반드시)**:
- Foundation FRC/trace_id 이벤트 연결 부재(verdict↔행동 미배선·ai_* 미emit·foundation_decision_received 없음).
- PII 값-스캔 미적용(키-blocklist만) → 자유텍스트 유입 위험.
- UTM/attribution 미캡처.
- 일반 session_id 개념 부재(populate 부실).
**P2 (품질/정규화)**:
- sku_id/category_id first-class 미승격.
- search_performed/filter_used/recommendation·card view·click 미emit.
- sessionStorage raw 대화 TTL/clear 정책.
- Foundation outbox consent "가정" → 실검증.
- country/device/referrer populate 불일치.

## 13. 코드 수정 0 / 이벤트 구현 0 / DB write 추가 0 / cart·checkout·order 수정 0 / push 0
- Control foundation-control 코드 **0** · SIASIU/Cosmile 코드 **미접촉**(read + grep만) · 이벤트 구현·DB write 추가·cart/checkout/order 수정·WIP 정리 **0** · push **0**.

## 14. 서버 / 프로세스 상태
- `:8731`=0 · `:8732`=0 · foundation_http_service 프로세스=0 · `:3000`(Cosmile 팀·미접촉).

---

## 잔여 심층 검토(후속·read-only)
- prisma schema.prisma의 CommerceEvent/FoundationSignalOutbox 필드 전수(traceId 부재 재확인).
- brand_viewed/category_viewed/refund_requested/voice_* emit 지점 완전 열거.
- country/device/referrer 실제 populate 케이스.
- SENSITIVE_KEYS 값-레벨 누출 시나리오 실검증.

## 요약
Cosmile 이벤트 = **2계층**(slice signal no-write / commerce event **prisma write**·pre-existing·성숙). userId 서버derive·SENSITIVE_KEYS scrub·consultation 원문 미저장·외부 pixel 0 = 양호. **gap = Foundation FRC/trace 이벤트화 부재·값-스캔 PII·UTM·session_id·sku/category·ai_*/search/filter 미emit**(P1/P2). active leak 없음 → **AUDIT_READY_FOR_SCHEMA**. write 추가 0·코드 0·push 0.
