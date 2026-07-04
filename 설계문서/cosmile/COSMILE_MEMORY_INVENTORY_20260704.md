# COSMILE Memory Inventory (Cosmile slice of Foundation Memory Audit)

> **STATUS: PASS_WITH_WATCH** (2026-07-04 · read-only · 코드 변경 0)
> ★이 문서는 3-repo Foundation Memory Inventory Audit의 **Cosmile 부분(Section C)** 만 담는다. Foundation/SIASIU 부분과 master 조립은 **foundation-control 관할**(Cosmile CC는 repo 경계상 Cosmile만 조사). Cosmile HEAD `3ba91e0`.

## 1. Executive Summary
Cosmile의 memory-like layer는 **① 커머스 이벤트/분석 기억(AX)** 과 **② 커머스 상태(cart/order/wishlist)**, **③ 콘솔(admin) 대화·감사**, **④ mock 제품/브랜드 KB(Foundation all-mock MVP)**, **⑤ 클라이언트 세션 저장소**, **⑥ 캐시**, **⑦ 폐기 잔존 코드** 로 구성. **raw 고객 PII(email/phone/name/address)를 memory key로 쓰는 곳 없음** — 고객 기억은 **내부 userId(MOCK_USER) / random guestId** 로만 keyed. **Foundation로 memory 주입 없음**(SSC = masked raw_text + product refs + opaque `foundation_user_ref` v2). BLOCKER·PATCH_REQUIRED 없음. WATCH = 이벤트의 내부 userId↔trace 결합·SignalOutbox 발신 게이트·LearningInsight 휴면 write·폐기 dead code·클라 상담 transcript.

## 2. 전체 memory map (Cosmile)
```
[Persistent · Prisma dev.db(SQLite)]
  Event/Analytics : CommerceEvent(+foundation_decision_received) · ProductSalesDaily · AlertEvent
  Learning        : LearningInsight (휴면·runtime write 0)
  Outbox/Signal   : FoundationSignalOutbox (status=pending·실발신 0)
  Session/Consult : ConsultationSessionMeta (refs/enum only·원문은 SIASIU DB)
  Customer state  : Cart · CartItem · Order · OrderItem · Wishlist · AlertSubscription · CouponRedemption
  Commerce KB     : CommerceSku · CommerceOffer · Deal · Campaign · GroupBuy* · Coupon · ProductListingConfig · CommercePromotionPage · CommerceContentBlock
  Admin console   : ConsoleUser · ConsoleSession · ConsoleConversation · ConsoleMessage · ConsoleAttachment · ConsoleArtifact · ConsoleJob · ConsoleAuditLog
[Client storage] cosmile_consult_chat_v1(sessionStorage) · cosmile_ship_popup_until(localStorage) · cosmile_slice_cart_v1(RETIRED) · cosmile_gid/cosmile_guest(cookie)
[Server cache]   voiceCache (data/voice_cache/*.mp3)
[Mock/Dev KB]    src/data/mockFoundationProducts · mockCommerce · mockBrands (Foundation all-mock)
[Retired/present] src/lib/slice/cartStore.tsx · src/components/slice/SliceCartView.tsx (dead) · scripts/fixtures/mockFoundationConsultation.ts (eval-only)
```

## 3~5. repo별 · category별 · live/shadow/legacy 인벤토리 (E 형식)
| # | file/table/store | category | 상태 | R/W | keyed by | ref 종류 | raw PII | →Foundation | trace 결합 | 위험 | 조치 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | `CommerceEvent`(schema) · `commerceEventService.ts` | 8 Analytics/Event | live | R/W | userId·guestId·canonicalProductId·eventTime | userId(내부)·guestId·sessionId·anonymousId | ❌(sanitizeProperties+piiPolicy) | ❌ | ✅(foundation_decision_received) | MEDIUM | WATCH |
| 2 | `foundation_decision_received` · `events/foundationDecisionEvent.ts` | 8 Event | live | W | userId(col)+trace(payload) | customer_id=내부 userId · foundation_trace_id | ❌(enum/ref only·PII reject) | ❌ | ✅ | MEDIUM | WATCH(F2) |
| 3 | `ProductSalesDaily` | 8 Analytics(집계) | live | R/W | productId+date | — | ❌ | ❌ | ❌ | LOW | NONE |
| 4 | `LearningInsight` | 9 Learning | present·**휴면** | (write 0) | product/deal/campaign refs | — | ❌(내부 요약) | ❌ | ❌ | LOW | WATCH(F7) |
| 5 | `FoundationSignalOutbox` · `foundationSignalMapper.ts` | 8/Outbox | live table·**실발신 0** | W(큐만) | canonicalUserId·anonymousId·idempotencyKey | canonicalUserId(내부) | payload=sanitized event | ❌(status=pending, dispatch 없음) | 간접 | MEDIUM | WATCH(F8) |
| 6 | `ConsultationSessionMeta` · `consultationMeta.ts` | 2/3 Session·Consult | live | R/W | userId·guestId·consultationSessionId | refs/enum(mentionedProductIds·ingredientAtoms·intentTypes·riskLevel) | ❌(**원문은 SIASIU DB**·Cosmile 미저장) | ❌ | ❌ | LOW | WATCH |
| 7 | `Cart`·`CartItem`·`Order`·`OrderItem`·`Wishlist`·`AlertSubscription`·`CouponRedemption` | 1 Personal/Customer | live | R/W | userId·guestId·productId | 내부 userId·guestId | ❌(주소/전화/이메일 컬럼 없음·MVP 실배송 미저장) | ❌ | ❌ | LOW-MED | WATCH |
| 8 | `Console*`(User/Session/Conversation/Message/Artifact/Job/AuditLog) | 3 Conversation(admin) | live | R/W | ConsoleUser id(admin) | admin username/displayName·passwordHash(scrypt) | ⚠ `ConsoleMessage.content`=admin raw text(고객 아님) | ❌ | ❌ | MEDIUM | WATCH |
| 9 | `CommerceSku/Offer·Deal·Campaign·GroupBuy*·Coupon·ProductListingConfig·PromotionPage·ContentBlock` | 5 Product/Commerce | live | R/W | productId·id | — | ❌ | ❌ | ❌ | LOW | NONE |
| 10 | `cosmile_consult_chat_v1` (sessionStorage·`ConsultationChatShell.tsx:16`) | 3 Conversation | live(client) | R/W | 브라우저 세션 | — | ⚠ 사용자 상담 원문(브라우저 sessionStorage·서버 미전송·새상담 시 삭제) | ❌ | ❌ | LOW-MED | WATCH |
| 11 | `cosmile_gid`/`cosmile_guest` cookie · `shopper.ts` | 2 Session/identity | live | R/W | cookie | random guestId(httpOnly)·MOCK_USER | ❌(내부 id) | ❌(ref 생성 원천) | ❌ | LOW | NONE |
| 12 | `voiceCache` (`data/voice_cache/*.mp3`) | 10 Cache | live | R/W | content-hash(text+voice+lang) | — | ❌ | ❌ | ❌ | LOW | NONE |
| 13 | `cosmile_ship_popup_until` (localStorage) | 10 Cache(UI) | live(client) | R/W | 브라우저 | — | ❌ | ❌ | ❌ | LOW | NONE |
| 14 | `src/data/mockFoundationProducts·mockCommerce·mockBrands` | 5/6/7 Product·Ingredient·Brand(**mock**) | 12 Mock/Dev(MVP catalog) | R | productId | ingredientAtomIds(refs) | ❌ | display만·판단 ❌ | ❌ | LOW | WATCH(F5/F6) |
| 15 | `src/lib/slice/cartStore.tsx`·`SliceCartView.tsx`·`cosmile_slice_cart_v1` | 11 Legacy/Retired | **dead code**(provider 제거·마운트 0) | — | — | — | ❌ | ❌ | ❌ | LOW | **RETIRE** |
| 16 | `scripts/fixtures/mockFoundationConsultation.ts` | 12 Mock/Dev | eval-only(runtime importer 0) | R | scenario | — | ❌ | ❌ | ❌ | LOW | NONE(격리됨) |
| 17 | `FOUNDATION_API_KEY` (`httpFoundationBridge.ts`) | (secret ref) | env 변수 이름만 | — | — | — | ⚠ secret(env·값 미출력) | — | — | — | WATCH(env 관리) |

## 6. Customer memory 현황
Cart/Order/Wishlist/Alert/CouponRedemption/ConsultationSessionMeta — **내부 userId(MOCK_USER)·random guestId 로만 keyed**. email/phone/name/address/전화·주소 저장 **없음**(Order에 주소 컬럼 없음·MVP 실배송 미저장). 상담 세션은 **refs/enum only**(원문은 SIASIU DB).

## 7. Session/Conversation memory 현황
- 서버: `ConsultationSessionMeta`(enum/ref only). `Console*` 대화(admin console — `ConsoleMessage.content` raw, 고객 아님).
- 클라: `cosmile_consult_chat_v1`(sessionStorage, 상담 원문 브라우저 보관·서버 미전송·새상담 삭제).

## 8. KB/product/ingredient/brand memory 현황
`src/data/mock*`(Foundation all-mock MVP). Cosmile는 **display/commerce projection**에만 사용, **적합성/성분 판단은 Foundation FRC**(Cosmile 판단 0). ingredient = atom **refs**만. → ontology 경계 준수.

## 9. Analytics/event/outbox memory 현황
`CommerceEvent`(AX event memory·sanitize) · `ProductSalesDaily`(집계) · `FoundationSignalOutbox`(**status=pending·실발신 코드 0·큐만**). 이벤트는 Cosmile-local(Foundation 미전송).

## 10. Learning/self-growth memory 현황
`LearningInsight` 테이블 존재하나 **runtime write 경로 0**(`prisma.learningInsight.create/update` = src 0). 휴면. 승인 없이 자동 학습 write **없음**.

## 11. PII / trace / de-anon risk
- **F1 raw PII as key: PASS** — 고객 email/phone/name/address 미저장·미key. 내부 userId·random guestId만.
- **F2 trace + customer_id: WATCH** — `foundation_decision_received` 이벤트 ROW에 `userId`(컬럼·내부 id) + `foundation_trace_id`(payload) 공존. **단 userId=내부 mock id(raw PII 아님)** · payload는 enum/ref only · Foundation엔 opaque ref만. Cosmile-local 상관(자기 유저↔trace)로 AX 설계상 필요. 외부 공유 시 linkage 가능 → WATCH.
- de-anon: Foundation은 opaque `foundation_user_ref`(v2)만 수신 → Foundation-side de-anon 불가.

## 12. Foundation payload injection risk
- **F3/F4 PASS** — Cosmile→Foundation SSC = masked raw_text + product refs + opaque foundation_user_ref만. **customer memory/history/memory.db 주입 0.** ConsultationSessionMeta·CommerceEvent 등 Cosmile 기억은 Foundation payload에 미포함.

## 13. Retired but present code
- `src/lib/slice/cartStore.tsx` + `src/components/slice/SliceCartView.tsx` + `cosmile_slice_cart_v1` — CART-WRITE에서 provider 제거된 **dead code**(런타임 마운트 0). → **RETIRE 후보**.
- `scripts/fixtures/mockFoundationConsultation.ts` — eval-only 격리(양호).

## 14. PATCH_REQUIRED 목록
**없음(0).** Cosmile slice에 즉시 patch 필요 항목 없음.

## 15. WATCH 목록
1. (F2) `foundation_decision_received`/CommerceEvent의 내부 userId↔foundation_trace_id 결합 — Cosmile-local·raw PII 아님. 외부 공유·future 시 opaque ref 대체 검토.
2. (F8) `FoundationSignalOutbox` — 실발신 0(pending)이나, **live 전환 전 dispatch/payload PII 재검**(foundation-control 관할).
3. (F7) `LearningInsight` write 휴면 — 활성화 시 **승인 게이트** 필요.
4. (F5) `src/data/mock*` = MVP catalog(Foundation all-mock). 실 Foundation 전환 시 교체.
5. 클라 `cosmile_consult_chat_v1` 상담 원문(브라우저) — 서버 미전송이나 공용 기기 잔존 가능(세션 종료 시 정리 검토).
6. `ConsoleMessage.content` admin raw text — admin 콘솔 접근 통제(adminGuard) 확인.
7. dead code(cartStore/SliceCartView) RETIRE.
8. `FOUNDATION_API_KEY` env — secret 관리(git 0 확인·값 미출력).

## 16. 다음 블록 추천 순서 (Cosmile 관점)
1. dead code(slice cartStore/SliceCartView) 삭제(RETIRE) — 작은 정리 커밋.
2. (foundation-control 조립) F2 정책 결정: 이벤트에 opaque ref 병기 여부.
3. SignalOutbox live 전환 설계 시 payload PII/dispatch 게이트(foundation-control).
4. LearningInsight write 활성 시 승인 게이트 설계.
