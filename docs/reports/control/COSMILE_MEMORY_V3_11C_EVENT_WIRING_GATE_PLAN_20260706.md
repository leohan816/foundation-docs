# COSMILE MEMORY V3-11C — Event Wiring Gate / Plan

> 작성: foundation-control / **fable-builder** 스킬(implementation-execution·contract-to-code-mapping 적용) · 2026-07-07 · ★계획/gate only·**코드/DB write/migration/emit 0**·prod/live/main 0.
> anchor: V3-11B `V3_11B_DB_PATCH_CLOSED`(shadow `6fd7815`·CHECK 5/7값·INV-DB-2/3[DB-subset]=0) · V3-11A `af26f94`(ids/attribution) · 사전 `DATA_DICTIONARY_CANONICAL` · V3-08.
> ★핵심 규율: **실제 Cosmile 코드를 읽고 파일:심볼로 명시**·없으면 "없음"·추측 배선 금지. 아래 인벤토리는 독립 스카우트 + 직접 grep/read 대조.

---

## 1. Executive summary
V3-11A 로직 + V3-11B 스키마를 실제 Cosmile event flow에 붙일 **설계·gate**. ★실 코드 대조(직접 read + 독립 스카우트) 결과: emit 단일 경로 `trackCommerceEvent`(존재)·recommendation surface `RecommendationCards`(존재·canonical view/click emit)·OrderItem 생성 `createPendingOrder`(존재)이나 **핵심 gap 5개**: (G-C1) V3-11A `ids.ts` 생성기가 **커머스 flow에 미배선**(mint 필요). (G-C2) `recommendation_id`가 추천→cart→order로 **미전파**(attribution 대부분 organic). (G-C3) recommendation_view/click은 **canonical event 계층(emitViewClickEvent)에 존재하나 V3-03 RecommendationEvent 테이블에 미영속**(bridge 필요). (G-C4) reason_codes 양성 taxonomy(concern/ingredient_match) 원천 부분. (G-C5) **`sessionId`가 선언만 되고 어떤 request 경로도 populate하지 않음**(session attribution 차단·"Phase 4" 주석). 이번은 **계획만**·실 배선은 Leo 승인 후.

## 2. Existing event flow inventory (실파일·직접 확인)
| 요소 | 실체 | 위치 |
|---|---|---|
| **emit 단일 경로** | `trackCommerceEvent(input)` → `prisma.commerceEvent.create` | `src/lib/commerceEventService.ts:29,31` |
| event type/identity 계약 | `COMMERCE_EVENT_TYPES`(cart_add·guest_cart_created·purchase_complete 등)·`{eventType,userId?,sessionId?,anonymousId?}` | `src/types/commerceEvent.ts:3,38-42` |
| add-to-cart emit | POST → `trackCommerceEvent({eventType:"cart_add",userId,anonymousId:guestId})` | `src/app/api/cart/items/route.ts:9,26-39` |
| recommendation surface | `RecommendationCards`(products=`view:SliceDecisionView`·`onAddDirect`/`onRequestOverride`·`view.reasons`) | `src/components/slice/RecommendationCards.tsx:62-119` |
| 추천 결정/사유 원천 | `SliceDecisionView.reasons`(=`doNotBuyReasons`)·redactReasons | `src/lib/slice/decisionMapping.ts:20,58,70` |
| order/OrderItem 생성 | `createPendingOrder` → `prisma.order.create` + nested `items.create`(productId·skuId·offerId·quantity·unitPrice·totalPrice) | `src/lib/checkout.ts:58,81,94` |
| checkout 완료 emit | `trackCommerceEvent({eventType:"purchase_complete"})` | `src/app/api/checkout/mock-complete/route.ts:20` |
| wishlist/찜 | `toggleWish` → `wishlist_add/remove` emit | `src/app/api/wishlist/toggle/route.ts`·`src/lib/wishlist.ts`(WISH_SOURCES에 `ai_recommendation`) |
| identity | `getShopper()` → `{userId,guestId,isGuest}`(쿠키 read·**mock-only** MOCK_USER `demo_user_001`·실 auth 없음·"Phase 4") | `src/lib/shopper.ts`·`src/lib/mockUser.ts` |
| **canonical event 계층(2차)** | `emitViewClickEvent`/`buildViewClickEvent`·`recommendation_view`/`recommendation_click`·`foundation_decision_received` | `src/lib/events/emitClientEvent.ts`·`src/types/canonicalEvent.ts` |
| Foundation signal | `maybeEnqueueFoundationSignal` → `foundationSignalOutbox.create`(draft) ★**flush/dispatch worker 없음**(live 미전송) | `src/lib/foundationSignalMapper.ts` |
| **RecommendationEvent/RecOutcome 테이블 write** | ★**없음**(V3-11B 테이블은 생성됨·write 경로 미배선) | prisma model 존재(6fd7815)·caller 0 |
| **V3-11A ids.ts 생성기 호출** | ★**없음**(subjectRef/anonymousRef/recommendationId 커머스 flow 미배선) | `src/lib/ids.ts`(정의)만·caller 0 |
| **sessionId** | ★선언만(컬럼·input·canonical field)·**어떤 request도 populate 안 함**(consult-foundation은 `sessionId:null`·"Phase 4") | `commerceEvent.ts`·`foundationDecisionEvent.ts` |

## 3. RecommendationEvent wiring candidates
| event_type | 후보 지점(실파일) | 상태 |
|---|---|---|
| recommendation_shown | `RecommendationCards` 렌더 → `recommendation_view`(canonical) emit | ★canonical 계층엔 **존재**(emitViewClickEvent)·**V3-03 RecommendationEvent 미영속** → bridge 필요(G-C3) |
| recommendation_clicked | `recommendation_click`(canonical) emit | ★동일: canonical 존재·V3-03 미영속 → bridge |
| recommendation_saved | `api/wishlist/toggle/route.ts`(WISH_SOURCES `ai_recommendation`) | 배선 후보(wishlist emit에 병기)·후속 |
| recommendation_added_to_cart | `api/cart/items/route.ts` POST(`cart_add`) | ★**최소 배선 1순위**(기존 server emit 지점에 RecommendationEvent 병기·shadow) |

## 4. RecOutcomeEvent wiring candidates
- 지점: `createPendingOrder`(checkout.ts:81) 직후 / `purchase_complete`(mock-complete:20) — **생성된 OrderItem 단위**로 RecOutcomeEvent 1행. `order_item_id` = OrderItem.id(nested create 반환·`include:{items:true}` 필요).
- `recommendation_id` **nullable**: 현재 rec_id가 cart→order로 전파 안 됨(G-C2) → attribution 대부분 `organic`(rec_id null). direct는 rec_id 전파 배선 후.
- attribution: V3-11A `attribution.ts`(last-touch) 재사용.

## 5. subject_ref / anonymous_ref / session mapping
- identity = `getShopper()`(`shopper.ts`) → `{userId,guestId,isGuest}`·**mock-only**(MOCK_USER·실 auth 없음·Phase 4). 현재 raw `userId`/`guestId` 사용·**subj_v2_/anon_v3_ 미생성**(G-C1). 배선 = emit 시점에 `ids.subjectRef(userId)`(로그인) 또는 `ids.anonymousRef(guestId)`(비회원) mint → **XOR**(정확히 하나). ★V3-11A `isMemorySubjectKeyAllowed` = memory 계층 backstop(commerce emit엔 anon 허용).
- ★session_id = **현재 미populated**(G-C5·컬럼/필드만 존재·request 경로 0). → session attribution mode는 sessionId 배선 전까지 **불가**(subject/anon XOR만 이번 가능).
- ★로그인 전후 stitching: 이번 **promotion 금지**(anon→login memory 승격 없음·사전 R-K3·D2). commerce attribution 소급만 후속.

## 6. Attribution mode mapping (§2.9)
| mode | 조건 | 이번 가부 |
|---|---|---|
| direct | rec_id가 order_item에 전파됨 | ★G-C2 미전파 → **후속**(rec_id threading 필요) |
| session | 동일 세션 SKU 일치 | 부분(session_id 존재)·후속 |
| organic | 추천 링크 없는 구매 | ★이번 기본값(rec_id null) |
| unattributed/unknown | 귀속 실패/불명 | fallback |

## 7. reason_codes mapping (§2.15)
- 원천: `SliceDecisionView.reasons`(=`doNotBuyReasons`·decisionMapping.ts:58) — **do_not_*/safety 계열**(RISK_ADVERSE_BLOCK 등)·`safety_filtered` 매핑 가능.
- ★**gap(G-C4)**: 양성 reason(`concern_match`·`ingredient_match`)은 현재 view.reasons에 명시 노출 안 됨 → Foundation decision output에서 별도 추출 필요(후속). 이번은 **safety/do_not 계열 reason_codes만** 기록 가능.
- ★raw 저장 금지: reason **코드**만(원문 사유 텍스트 저장 금지·redactReasons는 UI용).

## 8. V3-11C allowed implementation scope (최소 flow)
★shadow/flag OFF·write=DB(ephemeral/dev only)·**live emit 금지**:
1. `ids.ts` 생성기를 커머스 emit 경로에 **import**(subj_v2_/anon_v3_ mint·재발명 금지).
2. **add_to_cart 지점**(cart/items POST)에 `RecommendationEvent(recommendation_added_to_cart)` **병기 emit**(기존 trackCommerceEvent 옆·shadow·flag OFF inert).
3. subject_ref XOR anonymous_ref·session_id·product_id·reason_codes(safety/do_not 계열)·rec_v3_ mint 기록.
4. provider-independent + DB-touch test(dev)로 emit shape 검증(live 0).

## 9. Explicitly excluded scope
semantic extraction·LTM promotion pipeline·ranking runtime·**prod/live emit 활성화**·main merge·PR·rec_id threading(direct attribution)·RecOutcomeEvent 실 배선(checkout)·recommendation_shown client 계측·wishlist emit·anon→login stitching promotion·양성 reason_codes 추출·G13 COSMILE-4 — **전부 후속(V3-11D/E)**.

## 10. Open decisions / LIMITS
- **D-C1**: RecommendationEvent emit을 `trackCommerceEvent` 확장 vs 별도 `trackRecommendationEvent` 신설. (권장: 별도 신설·계약 소유 분리·D-1 정신 일관)
- **D-C2**: rec_id threading(추천→cart line→order_item) 방식 = cart line에 rec_id token 보관 vs session 기반 매칭. → attribution direct 가능 여부 결정(후속 D/E).
- **D-C3**: recommendation_shown 계측(client→API) 도입 시점.
- **LIMITS(이월)**: G-C1~G-C4·RecOutcomeEvent 배선·양성 reason_codes·stitching·live emit flag·MemoryFactCandidate secretVersion·완전 INV-DB-3(event wiring)·N_min/C_min 확정.

## 11. Whether actual V3-11C implementation can begin
- ★**아니오(NO)**. gate/plan. 실 배선 전 **D-C1 결정**(emit 함수 형태) + 최소 scope(§8) 승인 필요. 승인 후 별도 V3-11C implementation batch(shadow·flag OFF·DB-touch test 먼저·live 0).

## 12. Required Leo approval before code changes
1. **D-C1**(trackRecommendationEvent 신설 vs 확장) 결정.
2. §8 최소 scope(add_to_cart 병기 emit·ids mint·shadow/flag OFF) 승인.
3. §9 이월 범위 확인(rec_id threading·RecOutcome·shown 계측 = 후속).
4. live emit/prod DB/main merge 불가 재확인.
5. 승인 후 V3-11C implementation batch 별도 착수(이번 계획엔 코드 0).

## 무결성
gate/plan only · 코드/DB write/migration/emit 0 · 실파일 직접 대조(trackCommerceEvent·RecommendationCards·createPendingOrder·ids 미배선 확인) · gap 4개(G-C1 ids 미배선·G-C2 rec_id 미전파·G-C3 shown 이벤트 없음·G-C4 양성 reason 부분) 명시 · 최소 scope=add_to_cart 병기 emit(shadow/flag OFF) · semantic/LTM/ranking/live/stitching 제외 · D-C1 결정 전 실 배선 착수 금지.
