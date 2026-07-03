# COSMILE-EVENT-TRACKING-AUDIT — Plan (read-only audit 설계서)

> 작성: foundation-control (control tower) · 2026-07-02 · ★audit-only 설계서(코드 수정 0 · 이벤트 구현 0 · DB write 추가 0 · cart/checkout/order 수정 0 · push 0)
> 배경: COSMILE-CONNECT-UI-SWITCH = CONTROL_PASS(commit `35febe2`) · Foundation route dev/internal opt-in 연결 · Fable5 보류 · production default 전환은 별도 승인.
> 성격: Cosmile 현재 고객 행동 이벤트 추적 **상태를 read-only로 감사**하기 위한 계획 + 예비 정찰 결과(grep-level·심층 감사에서 검증).

---

## 0. 목적 / 범위
- Cosmile가 지금 **무슨 이벤트를, 어디로, 어떤 id/속성과 함께, write/read-only로** 추적하는지 **read-only 감사**.
- 결과 = 다음 구현 slice(canonical event schema)의 근거 + write/PII/경계 리스크 식별.
- ★이번 작업은 **감사 계획 + 예비 현황**만. 실제 심층 감사 실행·이벤트 구현·schema 구현은 후속(승인 후).

## 0.1 예비 정찰 요약 (read-only grep-level · 심층 감사에서 검증)
Cosmile 이벤트 추적 = **2계층**:
| 계층 | 진입 | sink | write? | id/PII |
|---|---|---|---|---|
| **A. slice signal** | `emitSignal`(ConsultationChatShell) → `/api/slice/signal` | ack만(`interpretsCustomer:false·memoryCandidate:false·storedAsMemory:false`) | **DB write 0**(aggregate만) | raw/PII 0(주석 명시) |
| **B. commerce event** | `EventTracker`→`/api/events` · 각종 lib → `commerceEventService.trackCommerceEvent` | **`prisma.commerceEvent.create`** | **DB write O** | userId(서버세션)·anonymousId·campaignId·`SENSITIVE_KEYS`(scrub 개념)·`maybeEnqueueFoundationSignal` |
- **외부 pixel(GA4/gtag/Meta fbq/mixpanel/segment/posthog) = 0**(app/src 미발견).
- ★현 tracking은 **혼합**: slice signal = no-write · commerce event = **실제 prisma DB write**(pre-existing 앱 시스템).

## 1. 이벤트 추적 구현 위치 조사 범위 (심층 감사 대상)
- slice: `components/slice/ConsultationChatShell.tsx`(emitSignal)·`app/api/slice/signal/route.ts`.
- app-level: `components/EventTracker.tsx`·`app/api/events/route.ts`·`lib/commerceEventService.ts`·`lib/commerceMetrics.ts`·`types/commerceEvent.ts`(SENSITIVE_KEYS).
- Foundation 연결: `lib/foundationSignalMapper.ts`·`foundationSignalDryRun.ts`·`lib/foundation/*Consultation*`.
- 부속: `lib/mergeGuest.ts`(guest↔user 병합 이벤트)·`lib/shopper.ts`(userId/guestId)·`lib/groupBuy.ts`·`coupon.ts`·`wishlist.ts`·`alert.ts`·`AiVoicePitch.tsx`·`EventTracker.tsx`.

## 2. emitSignal 사용처 (확인됨 · 전수)
- 정의: `ConsultationChatShell.tsx:28` → `fetch("/api/slice/signal", POST, {eventKind, aggregate})` best-effort.
- 사용: `consultation_shown`(L85)·`cart_add`(L121) — **2곳**. ★slice signal은 aggregate·no-write.
- ▶심층: 다른 컴포넌트의 emitSignal/track 호출 전수(EventTracker·commerce lib 포함) 목록화.

## 3. page_view / product_view / search / filter_apply
- **page_view**: `EventTracker.tsx`가 `useEffect`에서 `pagePath: window.location.pathname`를 `/api/events`로 → prisma.commerceEvent write(추정). ▶심층: 이벤트 kind 명칭·트리거·SPA route change 포함 여부.
- **search**: 이벤트명 `"search"` 존재. ▶심층: product_view/filter_apply 존재/명칭 확인(현재 문자열 미발견 → 미구현 가능성).

## 4. consultation_start / consultation_message / foundation_decision_received
- 존재 이벤트명: `consultation_started`·`consultation_ended`·`consultation_shown`·`consultation_session`·`consultation_interest`·`consultation_mention`·`consultation_product_mentioned`·`consultation_handoff_requested`·`consultation_history_exists`.
- ▶심층: `consultation_message`·`foundation_decision_received`(FRC 수신 이벤트) 존재/미구현 확인. foundation path(consultViaFoundation)는 **신규 emitSignal 0**(UI-switch 검수 확인) → Foundation 결정 수신 이벤트는 **현재 없음**(gap 후보).

## 5. recommendation_view/click · product_card_view/click
- 문자열 미발견 → **현재 미구현 추정**. ▶심층: commerce event kind에 상응 이벤트 존재 여부·cart_add 외 카드 상호작용 추적 여부.

## 6. add_to_cart / checkout_start / purchase
- `cart_add`(slice signal·aggregate)·`checkout_start`(존재)·`purchase`(문자열 미발견 → 확인 필요).
- ▶심층: 실제 구매(order) 이벤트가 `prisma.order`/`commerceEvent`에 write되는 경로(commerceMetrics가 `prisma.order.findMany`로 read) — ★이 write는 **CART-WRITE/checkout train 영역**(이번 audit는 read-only 관찰만).

## 7. anonymous_id / session_id / customer_id 연결
- 확인: `commerceEventService`가 `userId`(★서버 세션 derive·클라 미신뢰)·`anonymousId` write. `mergeGuest.ts`가 guest→member 병합 시 `anonymousId(gid)↔userId` 링크 + merged 이벤트. `shopper.ts` Owner{userId,guestId}.
- **session_id**: 명시 session_id 미발견 → guestId/cookie 기반 추정. ▶심층: session_id 개념·수명·저장.

## 8. product_id / sku_id / brand_id / category_id 연결
- ▶심층: commerceEvent payload에 productId/sku/brand/category 부착 범위(현재 cart_add는 `product: canonicalProductId`). sku_id/brand_id/category_id 연결 여부·정규화(canonical) 확인.

## 9. campaign / UTM attribution
- 확인: `commerceEventService`가 `campaignId` write. groupBuy/coupon에 campaign 연결. ▶심층: UTM(utm_source/medium/campaign) 캡처 지점·landing attribution·campaignId 매핑.

## 10. country / language / device / channel
- ▶심층: locale(FRC·SSC의 locale)·country·deviceType·channel(commerce_chat 등)이 이벤트에 부착되는지. 현재 SSC엔 locale/channel 있으나 이벤트 payload 연결은 확인 필요.

## 11. Foundation trace_id / FRC decision ↔ 이벤트 연결 가능성
- 확인: `foundationSignalMapper.maybeEnqueueFoundationSignal(eventId, input)` — commerceEvent와 Foundation signal 연결 지점 존재. `foundationSignalDryRun`(dry-run 존재).
- ★현재 foundation path(consultViaFoundation)는 emitSignal 0 → **FRC(final_strategy/safety_gate/decision_type/trace_id) 수신을 이벤트로 기록하는 경로 없음**(연결 *가능성*은 mapper로 열려 있으나 미배선). ▶심층: trace_id 전파·FRC decision 이벤트화 설계(다음 slice 후보).

## 12. payload PII / 민감정보 위험
- 확인: `types/commerceEvent.ts`에 `SENSITIVE_KEYS`(민감 키 개념·scrub 추정)·slice signal은 "raw/PII 미포함(aggregate)" 주석. EventTracker/commerceMetrics에 email/phone/name 직접 미발견.
- ▶심층(필수): SENSITIVE_KEYS **커버리지 실검증**(scrub이 실제 write 전 적용되는지)·raw 발화/검색어/주소가 payload에 새는지·userId 외 PII(email/phone) 미포함 확인·Foundation raw_text 미저장(FRC 계약 불변식)과 정합.

## 13. event write가 현재 어디로 가는가
- **slice signal** → `/api/slice/signal` → **write 없음**(ack·aggregate만).
- **commerce event** → `/api/events`·lib → **`prisma.commerceEvent.create`(내부 DB write)** + `maybeEnqueueFoundationSignal`.
- **order/commerce** → `prisma.order`·`groupBuyTeam`·`groupBuyParticipant`(commerceMetrics read) — 실제 커머스 DB(write는 checkout/order 경로).

## 14. 내부 DB / GA4 / Meta Pixel / console / localStorage/sessionStorage 구분
- **내부 DB(prisma)**: commerceEvent(write)·order(commerce) = **주 sink**.
- **GA4 / Meta Pixel / mixpanel/segment/posthog**: **없음**(외부 전송 0).
- **console**: ▶심층(로그 누출 확인).
- **localStorage/sessionStorage**: 3개 파일 사용 → ▶심층(이벤트/식별자/PII 저장 여부).

## 15. 현재 tracking = read-only인가 write인가 — **혼합(MIXED)**
- **slice signal 계층 = no-write**(aggregate ack).
- **commerce event 계층 = WRITE**(prisma.commerceEvent.create·pre-existing 앱 시스템)·userId/anonymousId/campaignId 연결.
- ★즉 Cosmile은 이미 **write 기반 commerce 이벤트 시스템**을 보유. 이번 audit는 이를 **관찰만**(write 추가·수정 0).

## 16. 다음 구현 slice canonical event schema 초안 (제안·미구현)
> ★초안일 뿐 — 구현은 별도 승인 slice. 목적 = 이벤트 명칭/속성/id/PII 정책의 단일 계약.
```jsonc
{
  "event_version": "cev-1.0",
  "event_name": "page_view|product_view|search|filter_apply|consultation_started|consultation_message|foundation_decision_received|recommendation_view|recommendation_click|product_card_view|product_card_click|add_to_cart|checkout_start|purchase",
  "occurred_at": "ISO8601",
  "identity": { "anonymous_id": "", "session_id": "", "customer_id": null },   // customer_id는 서버 세션 derive(클라 미신뢰)
  "context": { "country": "", "language": "", "device": "", "channel": "commerce_chat|web|..." },
  "attribution": { "utm_source": null, "utm_medium": null, "utm_campaign": null, "campaign_id": null },
  "entity": { "product_id": null, "sku_id": null, "brand_id": null, "category_id": null },   // canonical refs
  "foundation": { "trace_id": null, "final_strategy": null, "safety_gate_result": null, "decision_type": null },  // FRC 연결(선택)
  "payload": { /* ★PII 금지 — SENSITIVE_KEYS scrub · raw 발화/검색어/주소 미포함 · aggregate/enum만 */ }
}
```
- 원칙: **PII 0**(SENSITIVE_KEYS 강제 scrub) · product/sku/brand/category = canonical refs · Foundation FRC 연결은 refs/enum만(raw_text 미저장) · customer_id 서버 derive.

## 17. ★CART-WRITE WIP와 경계 (섞지 말 것)
- COSMILE-CONNECT-UI-SWITCH working tree에 남은 **cart-unification WIP(`/api/cart/items` prisma cart write)**는 **CART-WRITE 승인 train** 소관.
- ★event-tracking audit·schema는 **cart/checkout/order write와 분리**. 이벤트는 *관찰/기록*(add_to_cart 이벤트)이지 *cart DB write*(담기)가 아님 — 두 개념 혼동 금지.
- add_to_cart **이벤트 기록**은 이 audit 범위(read-only 관찰) · add_to_cart **cart DB write**는 CART-WRITE train.

## 18. audit-only / production exposure 없이 진행
- 이번 및 후속 감사 = **read-only 관찰**. 이벤트 구현 0·DB write 추가 0·cart/checkout/order 수정 0·외부 pixel 연결 0·production exposure 0.
- schema 초안(§16)·gap 목록은 **다음 구현 slice(승인 후)**의 입력. 구현·write 확장은 **별도 설계서 → 승인**.

---

## 남은 감사 질문 (심층 audit 실행 시 · read-only)
- SENSITIVE_KEYS scrub 실제 커버리지·raw/PII 누출 유무(§12 필수).
- foundation_decision_received / consultation_message 미구현 gap 확정.
- product/sku/brand/category·session_id·UTM 캡처 완결성.
- localStorage/sessionStorage·console 저장 내용.
- commerceEvent write량/트리거·order write 경계(CART-WRITE/checkout).

## 한계 / 승인
- 이 문서 = **audit 계획 + 예비 정찰**(grep-level). 심층 감사 실행·schema 구현은 후속(Leo 승인).
- 예비 정찰은 read-only grep 기반 — 각 항목은 심층 감사에서 코드 인용으로 검증(현 시점 단정 금지·gap은 "추정/확인 필요" 표기).
- ★코드 수정 0 · 이벤트 구현 0 · DB write 추가 0 · cart/checkout/order 수정 0 · production exposure 0 · push 0.

## 다음 단계
1. (승인 시) 심층 read-only audit 실행 → 항목별 코드 인용 보고서.
2. canonical event schema(§16) 정식 설계서 → 승인 → 구현 slice.
3. Foundation FRC↔event 연결(trace_id) 설계(선택).
4. CART-WRITE·production exposure는 각각 별도 승인 train.
