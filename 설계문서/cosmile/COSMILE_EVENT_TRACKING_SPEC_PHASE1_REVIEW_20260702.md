# COSMILE-EVENT-TRACKING-SPEC Phase 1 — Control Review (read-only)

> 작성: foundation-control (control tower) · 2026-07-02 · read-only(코드 수정 0 · 문서 외 수정 0 · push 0)
> 대상: commit **560641b** · 기준 설계서 `docs/COSMILE_EVENT_TRACKING_SPEC_20260702.md`

## 최종 판정: **PHASE1_CONTROL_PASS**
Phase 1이 설계서 범위(schema/constants/types/mapping/PII policy/validator/tests)**안에서만** 구현됨. 금지 항목(emit/write/route/Foundation 배선/cart·checkout·order/pixel/dashboard/migration) **전부 0**. 순수 레이어·발행 0.

---

## 1. 변경 범위 확인
- commit 560641b: `feat(events): Phase 1 — canonical event schema(cev-1.0) 레이어`. **5 파일 전부 신규(A) · 273 insertions · 0 deletions**(순수 additive):
  - `app/src/types/canonicalEvent.ts`(117) · `app/src/lib/events/canonicalEventSchema.ts`(18) · `eventNameMap.ts`(26) · `piiPolicy.ts`(59) · `app/scripts/event-schema-eval.mjs`(53).
- **기존 파일 미수정**: commit에 commerceEvent.ts / commerceEventService.ts / api/events/route / **consultViaFoundation** / cart / checkout / order / prisma schema / migration = **0**. ✅
- push 0(ahead 18·미push).

## 2. Phase 1 범위 적합성
| 허용 | 구현 | 근거 |
|---|---|---|
| canonical event constants·event_version | ✅ | `EVENT_VERSION="cev-1.0"`·`CANONICAL_EVENT_NAMES`(17) |
| TypeScript types/interfaces | ✅ | `CanonicalEvent`·`CanonicalFoundationFields`·enum 타입 |
| event name mapping | ✅ | `LEGACY_TO_CANONICAL`·`toCanonicalEventName`(type-only import) |
| PII policy constants | ✅ | `PII_FORBIDDEN_KEYS`·`RAW_TEXT_FORBIDDEN_KEYS`·`PII_VALUE_PATTERNS` |
| validator | ✅ | `validateCanonicalEventShape`·`findPiiViolations`·`validateCanonicalEvent`(순수·write 0) |
| schema/mapping/PII tests | ✅ | `event-schema-eval.mjs` 37 tests |

| 금지 | 발견 | 근거(diff grep) |
|---|---|---|
| 실제 이벤트 emit | **0** | emitSignal 추가 0 |
| /api/events write path 변경·DB write | **0** | trackCommerceEvent/prisma.create/fetch POST 추가 0 |
| Foundation decision event 실제 배선 | **0** | consultViaFoundation 미변경·foundation_decision_received는 상수/타입만 |
| cart/checkout/order 변경 | **0** | 해당 route 미포함(문자열 3건 = event 이름 add_to_cart/cart_remove/checkout_start) |
| external pixel | **0** | gtag/fbq/mixpanel/GA4 0 |
| dashboard·production exposure·migration | **0** | 없음 |

## 3. canonical event schema 검수
- `event_version = "cev-1.0"` ✅ (canonicalEvent.ts:6)
- **17 canonical event names** ✅: page_view·product_view·search·filter_apply·consultation_start·consultation_message·consultation_end·foundation_decision_received·recommendation_view·recommendation_click·product_card_view·product_card_click·add_to_cart·cart_remove·checkout_start·purchase·wishlist_add.
- **구조 = SPEC §2 정합**: identity(anonymous_id/session_id/customer_id)·context(page_path/referrer/country/language/device/channel)·attribution(utm_*/campaign_id)·entity(product_id/**sku_id/category_id first-class**/brand_id)·foundation·payload. 충돌 0.
- **foundation fields = enum/ref/boolean·raw_text 0** ✅: trace_id·decision_type(enum)·final_strategy(enum)·safety_gate_result(enum)·products_allowed(bool)·recommendation_allowed(bool). answer/raw_text 필드 없음.

## 4. event name mapping 검수 (SPEC §4 완전 일치)
- product_viewed→product_view · cart_add→add_to_cart · purchase_complete→purchase · consultation_started→consultation_start · **consultation_ended→consultation_end** · brand/category_viewed→page_view · search_performed→search · filter_used→filter_apply · wishlist_add→wishlist_add · cart_remove→cart_remove · checkout_start→checkout_start. ✅
- **신규(foundation_decision_received·recommendation_*·product_card_*·consultation_message)는 legacy 대응 없음**(map 미포함) ✅ — Phase 2+ 신규 배선.
- type-only import(런타임 값 0) → 기존 enum/write 파괴 0.

## 5. PII policy 검수
- **forbidden keys 충분**: PII(password/token/apiKey/card/cvv/paymentId/**phone/email/address/shippingAddress/name/fullName/birth/ssn/ip**) + raw_text(**raw_text/rawText/raw_message/rawMessage/message/rawHealthNote/rawSkinConditionNote/note/query/searchQuery/answer_substance**). ✅ (message/query/searchQuery/answer_substance 차단 확인)
- **value scan 동작**: email/phone/card 정규식(`scanValueForPii`). ✅
- **key normalization 동작**: `normalizeKey`(lowercase+`[\s_-]` 제거) → raw_text=rawText=raw-text 동일. ✅
- **false pos/neg 관찰(P2·Phase 4 정제)**: card 정규식 `\b(?:\d[ -]?){13,19}\b`는 13~19자리 비카드 숫자(주문/상품 ID)에 **false positive** 여지 · phone 정규식 KR(0-prefix) 특화라 국제전화 **false negative** 여지. ★검출 레이어(scrub 아님)라 payload가 refs/enum이면 무해 — Phase 4 정제 대상.
- ★`findPiiViolations`는 **검사만**(scrub/write 0) — Phase 1 적합.

## 6. 테스트 검수
- **event-schema-eval = PASS 37 / FAIL 0**(Control 재현). schema validation·name mapping·PII forbidden key·value scan·결합 검증 커버.
- **tsc 0**: Phase 1 파일은 정적 type-clean(정확한 타입·`any` 0). (전체 tsc 미실행 — WIP 트리 무관 오류 회피; 파일 단위 clean 확인)
- **기존 event system 영향 0**: commit이 기존 파일 미변경(§1).
- **smoke-commerce**: Phase 1은 순수 신규 파일 5개만(route/write 무변경) → smoke-commerce(커머스 endpoint 테스트)에 **영향 불가** → 실패 시 **pre-existing·이번 commit 무관**.

## 7. 금지 항목 grep 검수 (commit diff 추가 라인)
emitSignal **0** · trackCommerceEvent/prisma.create **0** · fetch POST **0** · /api/(events\|cart\|checkout) **0** · cart/checkout/order write **0**(문자열 3=event 이름) · external pixel **0** · migration **0**. ✅

## 남은 리스크 / 다음 단계
- **[P2·비blocker]** PII value 정규식 false pos/neg(card 광범위·phone KR) → Phase 4 정제(allowlist/국제 패턴).
- Phase 2(foundation_decision_received 배선·consultViaFoundation) = 다음 설계서→승인. ★write 1이벤트부터는 write boundary·raw_text 0·refs만 재검수 필요.
- CART-WRITE·production exposure·external pixel = 별도 승인 유지.

## 무결성
- Control foundation-control 코드 **0** · SIASIU/Cosmile 코드 미접촉(read+git show+eval 실행만) · 문서 = 본 검수 보고서 1건 · **push 0**.
- 서버: `:8731`=0 · `:8732`=0 · foundation 프로세스=0 · `:3000`(Cosmile 팀·미접촉).

## 요약
Phase 1(commit `560641b`) = **5 신규 파일·순수 schema/constants/types/mapping/PII/validator/tests**·발행/write/route/Foundation 배선/cart·checkout·order/pixel/migration **0**. cev-1.0·17 names·foundation enum(raw_text 0)·mapping SPEC 일치·PII(키+값+정규화)·eval 37/37. → **PHASE1_CONTROL_PASS**. Control 코드 0·push 0·서버 잔여 0.
