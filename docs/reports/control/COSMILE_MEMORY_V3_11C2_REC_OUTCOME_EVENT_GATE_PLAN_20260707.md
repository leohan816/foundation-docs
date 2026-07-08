# COSMILE MEMORY V3-11C2 — RecOutcomeEvent Behavioral Outcome Wiring Gate / Plan

> 작성: foundation-control / **fable-builder** 스킬 · 2026-07-08 · ★계획/gate only·**코드/schema/migration/DB write/live emit/prod 0**·main/secret 0.
> anchor: V3-11B `6fd7815`(RecOutcomeEvent 모델·검증) · V3-11C `591e206`(trackRecommendationEvent 패턴·shadow/flag OFF) · V3-11D **HOLD**(G-D1/G-D2 semantic blocker) · 사전 `DATA_DICTIONARY_CANONICAL`(§2.9 attribution).
> ★책임 경계: **행동 기반 commerce outcome만**. 텍스트 semantic·Foundation semantic output·RecOutcomeFeedback·MemoryFactCandidate·LTM promotion·성분/안전 판단 = **전부 무관·금지**. 실 코드 직접 read·없으면 "없음".

---

## 1. Executive summary
V3-11D(semantic) HOLD와 무관하게, **텍스트 없이 Order/OrderItem 행동 데이터**에서 RecOutcomeEvent를 파생하는 **설계·gate**. ★실 코드 대조 결과: emit hook `completeMockOrder`(order.items 포함 반환·justPaid dedupe) 존재·**recommendationId가 CartItem/OrderItem에 미전파**(threading 부재) → MVI = **organic outcome**(recommendationId null). refund/cancel=**admin status 전이**(line refundQty 원천 없음)·reorder=**없음**. ★rec_id threading은 **hard blocker 아님·quality limit**(organic 즉시 가능). 이번은 계획만.

## 2. Existing order/checkout/outcome flow inventory (실파일)
| 요소 | 실체 | 위치 |
|---|---|---|
| Order model | id(cuid)·userId?·guestId?·**status(pending\|paid\|fulfilled\|cancelled\|refunded)**·subtotal/total·createdAt·paidAt? | `prisma/schema.prisma` model Order |
| ★Order memory overlay | `memorySubjectRef`/`memoryGuestRef`/`memoryConsentScope`/`memoryRetentionPolicy`(M4·additive·**NOT migrated**·WATCH-2) | 동 model |
| OrderItem model | id(cuid)·orderId·productId·skuId?·offerId?·quantity·unitPrice·totalPrice·snapshots·**recommendationId 없음** | model OrderItem |
| pending order 생성 | `createPendingOrder(o,v)` → `order.create` + nested `items.create` | `src/lib/checkout.ts` |
| ★결제 완료(hook) | `completeMockOrder(o,orderId)` → `order.update(status=paid,paidAt)` **include items** → `{order,justPaid}`(justPaid=첫 전이만·dedupe) | `src/lib/checkout.ts` |
| purchase_complete emit | `mock-complete` route → completeMockOrder → `purchase_complete` CommerceEvent(justPaid 시) | `src/app/api/checkout/mock-complete/route.ts:14,20` |
| RecOutcomeEvent 모델(target) | recommendationId?(R-K2 CHECK)·attributionMode(CHECK)·subjectRef XOR anonymousRef(CHECK)·orderId·orderItemId(FK)·productId·skuId?·refundQty?·refundAmountBand?·secretVersion·**orderItemId unique 없음** | `prisma/schema.prisma` model RecOutcomeEvent(V3-11B) |

## 3. Existing refund/repurchase flow inventory
| 항목 | 실체 | 결론 |
|---|---|---|
| refund/cancel model | ★**없음**(별도 Refund/Cancellation/Return model 0) | status 전이로만 표현 |
| refund/cancel route | `admin/orders/[orderId]/status` PATCH → `canTransitionOrder` gate → `order.update(status)` + `admin_order_status_changed`·**금액/snapshot 불변·line refundQty 없음** | ★admin-only·order-level·**line 단위 환불 데이터 원천 없음** |
| reorder/repurchase route | ★**없음** | 재구매 outcome 원천 없음 |
| 고객 refund/취소 flow | ★**없음**(고객이 환불 요청하는 route 없음) | — |

## 4. RecOutcomeEvent wiring candidates
| outcome | hook(실파일) | 이번 가부 |
|---|---|---|
| order paid / purchase_complete | `mock-complete` route·completeMockOrder **justPaid=true**·`order.items` per line | ★**MVI 1순위**(dedupe 존재·items 접근) |
| order created | `createPendingOrder`(결제 전) | 후속(outcome=구매 확정이 통상)·미포함 |
| refund / cancel | admin status route(cancelled/refunded 전이) | LIMIT·order-level만(line refundQty 원천 없음)·후속 |
| repurchase | 없음 | 후속(reorder route 신설 후) |

## 5. Attribution mode mapping (§2.9)
| mode | 조건 | 이번 가부 |
|---|---|---|
| direct | recommendationId가 orderItem까지 전파 | ★**불가**(CartItem/OrderItem에 recommendationId 없음·threading 금지) → 후속 |
| session | session linkage | ★**불가**(sessionId 미populated·G-C5) → 후속 |
| **organic** | 추천 없는 자연 구매 | ★**MVI 기본**(recommendationId null·R-K2) |
| unattributed | 출처 불명 | fallback(추천 존재했으나 링크 못 함) |
| unknown | 판정 불가 | fallback |

## 6. Identity mapping
- 원천 = Order.`userId`/`guestId` → **subjectRef XOR anonymousRef mint**(V3-11A `ids.ts`·V3-11C 패턴 재사용). userId → `subjectRef`, guestId → `anonymousRef`. 정확히 하나(XOR).
- ★Order.`memorySubjectRef`/`memoryGuestRef` = schema에 있으나 **NOT migrated**(WATCH-2) → **의존 금지**·userId/guestId mint 사용.
- secretVersion=1(default·D-3 readiness).

## 7. recommendationId / rec_id threading analysis
- ★**현황**: recommendationId가 추천→CartItem→OrderItem로 **전파 안 됨**(CartItem 0·OrderItem 0 필드). V3-11C RecommendationEvent(add_to_cart)는 별도 테이블에 기록될 뿐 OrderItem과 **링크 없음**.
- ★**판정**: threading 부재는 **hard blocker 아님 = quality limit**. organic/unattributed outcome은 recommendationId null로 **즉시 write 가능**(R-K1/R-K2 nullable). direct attribution만 threading 필요(후속 품질 향상).
- threading 방법(후속·이번 금지): CartItem에 recommendationId 컬럼 추가 → add_to_cart 시 기록 → createPendingOrder에서 OrderItem로 복사. = schema 변경·별도 gate.

## 8. Minimum viable implementation proposal (shadow/flag OFF)
1. 신규 `trackRecOutcomeEvent`(V3-11C `trackRecommendationEvent` 패턴 재사용·별도 함수·재발명 0)·`prisma.recOutcomeEvent.create`(lazy)·DI 주입.
2. hook: `mock-complete` route에서 `justPaid=true`일 때 `order.items` 순회 → **line당 organic outcome**(recommendationId null·attributionMode='organic'·subjectRef XOR anonymousRef mint·orderId·orderItemId·productId·skuId).
3. flag OFF 기본(`COSMILE_REC_OUTCOME_ENABLED`)·shadow inert·**fail-open이나 observable**(purchase 흐름 미파손).
4. **idempotency**: orderItemId당 1회 — write 전 **existing check**(해당 orderItemId RecOutcomeEvent 존재 시 skip). justPaid dedupe + existing-check 이중. (unique index는 schema 변경이라 이번 제외·code-level guard.)
5. refund/reorder = 미포함(이월).

## 9. Explicitly excluded scope
schema/migration 수정·DB write(실)·prod/live·main·secret·PR·V3-11D semantic·Foundation FRC 수정·RecOutcomeFeedback·MemoryFactCandidate·LTM promotion·post-order feedback UI/API·sessionId populate·**rec_id direct threading**·analytics/alert·refund line 데이터·reorder route = **전부 미구현/후속**.

## 10. Open decisions / LIMITS
- **D-O1**: idempotency = code-level existing-check(권장·이번) vs RecOutcomeEvent `@@unique([orderItemId])` 추가(schema 변경·후속).
- **D-O2**: organic vs unattributed 기본값 — 추천 이력 조회 없이 organic(권장·추천 링크 미확인)·unattributed는 "추천 있었으나 링크 실패"에 예약.
- **LIMITS(이월)**: rec_id threading(direct·quality)·sessionId(session mode)·refund line-level(admin order-level만)·reorder outcome·Order.memory*Ref 마이그레이션(WATCH-2)·RecOutcomeEvent unique index·live flag.
- ★**STOP 없음**: organic outcome은 현 스키마/데이터로 완결 가능(hard blocker 부재). threading/session/refund는 quality/후속.

## 11. Whether actual implementation can begin
- ★**아니오(NO·gate/plan)**. 단 **semantic HOLD와 무관하게 organic MVI는 구현 가능 상태**(STOP 0). 실 착수 전 D-O1(idempotency 방식)·§8 scope 승인 필요. 승인 후 별도 V3-11C2 impl batch(shadow·flag OFF·DB-touch test 먼저·live 0).

## 12. Required Leo approval before code changes
1. §8 MVI scope(organic·purchase_complete hook·flag OFF) 승인.
2. **D-O1** idempotency(code-level existing-check vs unique index) 결정.
3. §9 이월 확인(threading·session·refund·reorder = 후속).
4. live/prod/main/schema 변경 불가 재확인.
5. 승인 후 별도 impl batch(이번 계획엔 코드 0).

## 무결성
gate/plan only · 코드/schema/DB write/emit 0 · 실파일 직접 대조(completeMockOrder·admin status·OrderItem·threading 부재) · ★행동 기반 commerce outcome만(semantic/Foundation/feedback 무관) · organic MVI(recommendationId null)=STOP 없음 · rec_id threading=quality limit(hard blocker 아님) · refund line/reorder/sessionId/threading 이월 · Order.memory*Ref NOT migrated(WATCH-2) 의존 금지 · idempotency 설계 필요(D-O1).
