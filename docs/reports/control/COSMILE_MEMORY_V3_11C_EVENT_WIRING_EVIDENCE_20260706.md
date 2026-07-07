# COSMILE MEMORY V3-11C — Event Wiring Implementation Evidence

> 작성: foundation-control / **fable-builder** 스킬 · 2026-07-07 · ★최소 scope·**shadow/flag OFF**·live emit/prod/main/secret 0. Cosmile shadow **`591e206`**(main 3ba91e0 무변경).
> anchor: V3-11C gate `ee89357`(D-C1=신설) · V3-11A `af26f94`(ids.ts) · V3-11B `6fd7815`(RecommendationEvent 테이블).

## 1. Executive summary
D-C1 확정대로 `trackRecommendationEvent` **신설**(trackCommerceEvent 확장 아님)·cart add_to_cart에 **병기 emit**(shadow·flag OFF 기본·inert). ids.ts 생성기 사용(재발명 0)·subject_ref XOR anonymous_ref·safety/do_not reason_codes 필터·**fail-open이나 observable**. 기존 commerce flow 무변경.

## 2. Changed files (Cosmile shadow `591e206`)
| 파일 | 내용 |
|---|---|
| `src/lib/recommendationEventService.ts`(NEW) | `trackRecommendationEvent`+`toSafetyReasonCodes`·flag OFF 기본·XOR·ids mint·fail-open·DI(deps.create/flagEnabled/secret) |
| `src/app/api/cart/items/route.ts` | cart_add emit **뒤 병기**(additive·기존 trackCommerceEvent 무변경) |
| `scripts/v3_11c_rec_event.vitest.ts`(NEW) | provider-independent 10 케이스(DI fake) |
| `scripts/v3_11b_db_integration.dbtest.py` | DB1f(reasonCodes JSONB 영속) 추가 |
| `vitest.config.ts` | `@`→src alias(앱 코드 @/ 규약·Next.js 표준) |
| `.env.example` | `COSMILE_REC_EVENT_ENABLED` key-only(기본 OFF) |

## 3. Event wiring implemented
- emit 지점: `cart/items/route.ts` POST(add_to_cart)·기존 cart_add CommerceEvent **뒤 병기**. 
- 신설 함수: `trackRecommendationEvent`·`prisma.recommendationEvent.create`(default·lazy import)·DI 주입 가능.
- identity: `getShopper` isGuest 분기 → userId(subject) XOR guestId(anon)·ids.ts mint. sessionId=null(G-C5 이월).
- flag: `COSMILE_REC_EVENT_ENABLED`≠"1" → **write 없음**(shadow inert·observable skipped:flag_off).

## 4~5. Tests & results
- provider-independent **10/10**: flag OFF no-write·flag ON subject/anon shape·XOR both/neither reject·reason_codes safety 필터·ids.ts 형식·**observable write_failed(fail-open)**·invalid event_type.
- DB-touch **37/37**(ephemeral·+DB1f reasonCodes JSONB 영속).
- 전체 provider-independent 회귀 **63/63**·tsc(내 파일) 0·skip/xfail 0·expected 하향 0.

## 6. Existing flow regression
- ★cart route의 기존 `trackCommerceEvent`(cart_add·guest_cart_created) **무변경**(diff `-trackCommerceEvent` 0). 병기는 additive·fail-open(throw 안 함)→cart 미파손. 기존 vitest 3종 무손상.

## 7. Excluded scope confirmation
recommendation_view/click bridge·saved/wishlist·RecOutcomeEvent·rec_id direct threading·sessionId populate·real auth·semantic extraction·LTM promotion·ranking runtime·**live emit/prod**·main·Slack/analytics = **전부 미구현(확인)**.

## 8. Remaining limits
- ★flag ON은 **sessionId 필요**(RecommendationEvent.sessionId NOT NULL)·현재 cart 병기는 sessionId=null → flag ON 시 write_failed(observable·fail-open). **G-C5(sessionId populate)가 live 전제**·이월. flag OFF(현 배포)에선 무이슈.
- reason_codes는 client가 body.reasonCodes로 보내야 채워짐(현재 RecommendationCards→cart threading 미배선·이월)·양성 reason(concern/ingredient_match) 별도.
- 이월: view/click bridge·RecOutcome·rec_id threading·stitching·live flag 활성화.

## 9. Commit hashes
Cosmile shadow **`591e206`**(main 3ba91e0 무변경) · foundation-docs(본 evidence + snapshot v3-11c). ephemeral disposable·prod/live/secret 0.

## 무결성
V3-11C shadow event wiring · trackRecommendationEvent 신설(재발명 0·ids.ts 사용) · flag OFF 기본·fail-open이나 observable · 기존 commerce emit 무변경 · provider-independent 10/10·63/63·DB-touch 37/37 · live/prod/main/secret 0 · sessionId/reason threading/view-click/RecOutcome 이월.
