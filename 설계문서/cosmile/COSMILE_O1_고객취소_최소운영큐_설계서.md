# COSMILE O1 고객취소 · 최소 운영큐 설계서

- 상태: `REVIEW_READY_DESIGN_INPUT` (독립 검토·Leo/GPT 승인 전)
- 버전/날짜: `v0.1` / `2026-07-21`
- 미션: `COSMILE_O1_CUSTOMER_CANCELLATION_AND_MINIMUM_OPERATOR_QUEUE_V1`
- 변경이력: `v0.1` — as-built 기반 최소 경험·상태·모듈·수용 기준 최초 고정

## 1. As-built 재사용 고정

| 재사용 대상 | 현재 증거 | 설계 고정 |
|---|---|---|
| 고객 주문내역/상세 | `app/src/app/account/orders/page.tsx:12`, `app/src/app/orders/[orderId]/page.tsx:23` | 기존 모바일 셸·카드·상세 순서를 유지하고 목록에는 요청 상태 배지만, 상세에는 단 하나의 상황별 행동만 추가한다. |
| 고객 O1 사실 투영 | `app/src/components/commerce/O1OrderStatus.tsx:10`, `app/src/lib/order/service.ts:219` | 소유권 확인된 서버 폐쇄형 투영만 렌더한다. 클라이언트가 결제·배송·환불 적격성을 추론하지 않는다. |
| O1 운영 목록/상세 | `app/src/app/o1/operator/page.tsx:13`, `app/src/app/o1/operator/orders/[orderId]/page.tsx:12`, `app/src/components/commerce/O1OperatorPanel.tsx:22` | 동일 `/o1/operator` 경로와 Google-sub allowlist를 유지하고 전체 주문 목록을 활성 요청 큐로 축소한다. |
| 운영자 보호 확인 | `app/src/lib/auth/o1Operator.ts:50`, `app/src/lib/order/stepUp.ts:41`, `app/src/app/api/o1/operator/orders/[orderId]/refund/route.ts:17` | TEST 전액 환불에만 fresh·action/order/operator/reason-bound·single-use step-up을 바로 인접 배치한다. |
| 전액 환불/HOLD | `app/src/lib/payment/service.ts:173`, `app/src/lib/order/repository.ts:189`, `app/src/lib/runtime/o1CommerceRuntime.ts:513` | full-only, 완전 취소 확인 후에만 `refunded`; 불명확하면 reconciliation/HOLD; committed 재고는 자동 복구하지 않는다. |
| 예약 전이 | `app/src/lib/inventory/contracts.ts:5`, `app/src/lib/inventory/service.ts:63` | 검증된 미캡처만 `reserved→released`; unknown/confirming은 HOLD; `committed`는 유지한다. |
| 배송/정합성 | `app/src/lib/order/contracts.ts:34`, `app/src/app/api/o1/operator/reconciliation/route.ts:21` | shipped/delivered는 지원 요청만 허용하고 기존 count-only 정합성 경계를 재사용한다. |
| 감사/이력 | `app/src/lib/order/repository.ts:17` | 민감 전이와 `OrderStatusHistory`·`ConsoleAuditLog`를 동일 order-lock 트랜잭션에서 fail-closed 기록한다. |
| 레거시 격리 | `app/src/app/api/admin/orders/[orderId]/status/route.ts:18` | mock/admin 직접 상태변경은 계속 O1 주문을 거부하며 새 요청을 처리하지 못한다. |
| 시각 토큰/셸 | `app/src/app/globals.css:3`, `app/src/app/globals.css:24`, `app/src/app/layout.tsx:19` | 기존 색·폰트·16px 여백·rounded card를 유지한다. 운영 경로만 device frame 밖 web-first 셸로 분기한다. |

## 2. 상태·적격성 행렬

우선순위는 `terminal → reconciliation/HOLD → existing request → shipped → paid-unshipped → safe pre-capture → unavailable`이다.

| 상태 | 서버 사실 조건 | 고객 행동/표시 | 운영 큐/행동 | 경제·재고 불변식 |
|---|---|---|---|---|
| 안전한 pre-capture | O1+owner, `Order.pending`, 정확히 하나의 `created|action_required` intent, succeeded capture/refund/reconciliation 없음, 정확한 `reserved` coverage | `주문 취소`; 인라인 확인 후 즉시 완료 | 정상 성공은 큐 미진입 | provider 호출/Refund/새 PaymentTransaction 0; 해당 order의 정확한 reserved set만 released |
| pre-capture 불명확 | intent `authorizing|captured`, 다중/불일치 intent, capture 가능성, coverage 불일치 | 행동 없음; `결제 상태를 확인 중이에요` | 정합성/HOLD만 표시 | release/expire/cancel/refund 0 |
| paid-unshipped | fully-bound paid+단일 full capture+exact committed coverage; shipment 없음/`pending|preparing`; active refund/reconciliation 없음 | `취소 요청`; 접수 후 중복 행동 제거 | `TEST 전액 환불` 1개 + 인접 step-up | 요청 생성 시 경제효과 0; 완료 후에도 inventory committed/HOLD |
| shipped | shipment `shipped|delivered` 또는 동등한 fulfilled 사실 | `반품·도움 요청`; 자동 처리 없음 명시 | `지원 요청 확인` 1개; step-up 없음 | 취소/환불/stock/courier/Shipment 변경 0 |
| 이미 요청됨 | 동일 order의 요청 존재 | 기존 requested/processing/accepted/refused/completed/recovery 상태만 표시 | 동일 요청 1건만; replay는 기존 결과 | provider 두 번째 효과·중복 요청 0 |
| terminal | Order `cancelled|refunded` | 완료 사실, 행동 없음 | 활성 큐 제외 | 기존 진실 불변 |
| reconciliation/HOLD | open/in-progress reconciliation 또는 환불/캡처 불명확 | `처리 결과를 확인 중이에요`; GET 재확인만 | 활성 처리 버튼 비활성; count-only 정합성 표면으로 연결 | 성공/실패를 단정하지 않고 모든 경제·재고 전이 0 |

폐쇄형 요청 kind는 `pre_capture_cancel | paid_unshipped_cancel | shipped_support`, durable status는
`requested | processing | accepted | refused | completed | recovery_hold`만 허용한다.

- `none→completed`: pre-capture 취소 한 트랜잭션.
- `none→requested`: paid-unshipped 또는 shipped 고객 요청 접수.
- `requested→processing→completed|recovery_hold|refused`: 보호된 full TEST refund.
- `requested→accepted`: shipped 지원 요청의 비경제적 운영 확인(이 범위의 최종 상태).
- replay는 동일 투영을 반환하며 상태를 되감지 않는다.
- active `paid_unshipped_cancel`이 있으면 배송 전이는 order lock 안에서 거부한다. 배송이 먼저 `shipped`가 되면 새 요청은 `shipped_support`로만 생성한다.

### 고객 상태·문구

| 화면 상태 | 정확한 문구/행동 |
|---|---|
| pending | 버튼 비활성 `요청하는 중…`; `aria-busy=true` |
| accepted(requested) | `취소 요청을 접수했어요. 아직 환불되지 않았고 재고는 유지됩니다.` |
| accepted(shipped) | `반품·도움 요청을 확인했어요. 자동 취소·환불·재고 변경·택배 접수는 진행되지 않았습니다.` |
| refused | `주문 상태가 바뀌어 이 요청을 처리할 수 없어요. 현재 상태를 다시 확인해 주세요.` |
| completed(pre-capture) | `주문이 취소됐어요. 결제·환불은 발생하지 않았고 이 주문의 재고 예약이 해제됐습니다.` |
| completed(refund) | `TEST 전액 환불이 완료됐어요. 재고는 판매 가능 상태로 자동 복구되지 않습니다.` |
| unavailable | 행동 없이 `현재 주문 상태에서는 취소할 수 없어요.` |
| recovery | `처리 결과를 확인 중이에요. 완료로 확인될 때까지 주문·재고 상태를 바꾸지 않습니다.` + `상태 다시 확인` |

## 3. `/frontend-design` 2-pass UI 행동

### Pass 1 — 기존 시스템 안의 최소안

- 대상/한 가지 일: O1 테스트 주문 고객은 자기 주문의 가능한 행동을 정확히 실행하고, allowlisted 운영자는 활성 요청 한 건을 안전하게 종결한다.
- 색(기존 토큰만): Canvas `#F6F5F3`, Surface `#FFFFFF`, Ink `#1B1714`, Muted `#6B645E`, Action `#F2622A`, Critical `#D94F1C`.
- 타입: 제목은 기존 SF Pro Display/system stack 700–900, 본문은 Apple SD Gothic Neo/Noto Sans KR system stack, 주문번호·카운트는 기존 `font-mono` utility.
- 레이아웃: 고객은 390px/mobile-first 단일 열과 16px gutter; 운영자는 web-first 2열(queue 360px + detail), `<768px`에서 목록→기존 detail route 단일 열.
- 시그니처: 장식/stepper 대신 `요청 / 결제 / 재고` 3행 truth rail. 각 행은 현재 확인된 사실만 말하고 색 없이도 완전한 텍스트를 갖는다.

```text
CUSTOMER                         OPERATOR WEB
[기존 주문 사실]                [O1 비프로덕션] [정합성 건수]
┌ O1 상태 카드 ┐                [전체 처리대기|전액환불|지원확인]
│ 기존 사실 rows│               ┌ 요청 큐 ┐ ┌ 선택 요청 상세 ┐
│ 요청/결제/재고│               │번호 kind│ │사실·HOLD 경고   │
│ 설명          │               │상태 age │ │step-up(필요시에만)│
│ [상황별 1 CTA]│               └─────────┘ │[정확한 1 action]│
└──────────────┘                            └────────────────┘
```

- 고객 확인은 popup/modal이 아닌 같은 카드의 인라인 2단계다. 첫 버튼 뒤 설명과 `주문 취소|취소 요청|반품·도움 요청`/`계속 유지`를 보여준다.
- 목록에는 CTA를 두지 않고 상태 배지만 둬서 상세의 단일 행동과 충돌하지 않는다.
- 운영 필터는 `전체 처리대기 | 전액환불 | 지원확인` 세 개뿐이며 requested이 아닌 terminal 행은 큐에 나오지 않는다.
- 큐 필드: opaque orderNo, request kind, requestedAt/age, eligibility bucket, request status, HOLD 표시. 고객 identity/금액/payment/provider ref는 금지한다.
- paid detail: request facts, order/fulfillment/capture/refund/reconciliation category, committed/HOLD 문구, password step-up, `TEST 전액 환불`.
- shipped detail: 동일 사실 + `지원 요청 확인`; 환불/step-up/재고/배송 입력은 렌더하지 않는다.

### Pass 2 — bounded critique 후 교정

| 초안 위험 | 교정된 고정안 |
|---|---|
| 새 console dashboard는 일반적이고 legacy ConsoleUser 권한과 O1 Google-sub 권한을 섞는다. | `/o1/operator`와 기존 allowlist를 유지하고 route-specific full-width shell만 적용한다. ConsoleNav/admin write는 재사용하지 않는다. |
| progress stepper는 환불이 계속 전진할 것처럼 약속한다. | 진행선·퍼센트·animation을 제거하고 truth rail의 현재 사실만 표시한다. |
| modal/빨간 고객 CTA는 범용 파괴 UX이며 상태 문맥을 가린다. | 기존 orange primary와 인라인 확인을 사용한다. Critical 색은 운영자의 실제 TEST refund 버튼에만 쓴다. |
| 새 서체·색·카드 체계는 redesign이다. | 글로벌 token/system font/rounded card/spacing을 그대로 유지한다. |
| 성공 toast만으로는 screen reader와 재진입에 약하다. | 결과를 durable inline status+live region으로 남기고 GET 재진입 시 같은 상태를 복원한다. |

## 4. Schema disposition — 제안만

판정: `CURRENT_SCHEMA_PARTIALLY_SUFFICIENT / REQUEST_SCOPE_NOT_REPRESENTABLE`.

- 현재 schema는 Order terminal, Payment/Refund, Reservation, Shipment, Reconciliation, History/Audit 진실을 표현한다.
- 고객 요청 자체, shipped support, 요청 lifecycle/queue/replay와 pending intent의 truthful customer cancellation은 표현하지 못한다.
- 최소 additive 제안: `OrderServiceRequest{id, orderId UNIQUE, kind, status, reasonCategory?, idempotencyKey UNIQUE, requestedAt, updatedAt, resolvedAt?}` + Order relation/index `(status,requestedAt)`.
- DB CHECK: 위 closed kind/status, bounded reason, terminal↔resolvedAt 일관성. server-derived key `o1sr_<orderId>`와 order unique로 중복을 구조적으로 차단한다.
- `PaymentIntent.status` CHECK에 `cancelled`만 additive 추가한다. `expired/failed`를 고객 취소 의미로 재사용하지 않는다.
- pre-capture atomic txn: lock → exact eligibility/coverage 재검증 → request completed → intent cancelled → matching reserved set released → Order cancelled → history → audit. 어느 단계든 실패하면 전부 rollback.
- Refund/PaymentTransaction/Inventory semantics 및 committed restoration은 변경하지 않는다.
- 이 미션에서는 schema/migration/DB를 쓰지 않는다. 이후 명시적 Leo/GPT schema 승인이 없으면 `STOP`이다.

## 5. 정확한 후보 경로·모듈 순서

1. Tests-first: `app/scripts/o1_order_service_request.vitest.ts`, `app/scripts/o1_order_service_request.dbtest.mjs`, `app/scripts/o1_order_service_request_browser.vitest.ts`.
2. 승인 후 schema: `app/prisma/schema.prisma`, `app/prisma/migrations/20260721_o1_order_service_request/migration.sql`.
3. 폐쇄형 계약/결정: `app/src/lib/order/serviceRequestContracts.ts`, `app/src/lib/order/serviceRequestService.ts`.
4. per-order locked persistence: `app/src/lib/order/serviceRequestRepository.ts`; 배송 충돌 gate만 `app/src/lib/order/contracts.ts`, `app/src/lib/order/service.ts`, `app/src/lib/order/repository.ts`에 최소 추가.
5. 기존 조합 재사용: `app/src/lib/runtime/o1CommerceRuntime.ts`.
6. 고객 API/UI: `app/src/app/api/o1/orders/[orderId]/route.ts`, `app/src/app/api/o1/orders/[orderId]/service-request/route.ts`, `app/src/components/commerce/O1OrderStatus.tsx`, `app/src/components/commerce/O1OrderServiceRequest.tsx`, `app/src/app/account/orders/page.tsx`.
7. 운영 API/UI: `app/src/app/api/o1/operator/orders/route.ts`, `app/src/app/api/o1/operator/orders/[orderId]/route.ts`, `app/src/app/api/o1/operator/orders/[orderId]/refund/route.ts`, `app/src/app/api/o1/operator/orders/[orderId]/support/route.ts`, `app/src/app/o1/operator/page.tsx`, `app/src/app/o1/operator/orders/[orderId]/page.tsx`, `app/src/components/commerce/O1OperatorPanel.tsx`.
8. web-first route carve-out만: `app/src/app/layout.tsx`; `/console/**`와 나머지 storefront chrome은 byte-behavior 불변.
9. 격리 회귀: `app/scripts/o1_golden_reversal.vitest.ts`, `app/scripts/o1_legacy_lane_isolation.vitest.ts`; legacy admin route는 변경하지 않는다.

## 6. Focused acceptance tests

| ID / 후보 테스트 | 필수 증명 |
|---|---|
| A01 pure matrix / `o1_order_service_request.vitest.ts` | 모든 order/payment/shipment/request/recon 조합이 위 closed eligibility 하나로만 사상되고 unknown은 HOLD다. |
| A02 atomic pre-capture / `.dbtest.mjs` | 정확한 intent/order/reservation만 한 txn에서 cancelled/released; provider/refund/payment txn 0; replay zero-effect. |
| A03 fail-closed audit/concurrency / `.dbtest.mjs` | audit 실패 전체 rollback; 동시 2요청은 unique+lock으로 한 결과; shipment/request race는 한 방향만 승리. |
| A04 request-only paid / `.vitest.ts` | 고객 POST는 request만 만들고 provider/order/refund/inventory를 바꾸지 않는다. |
| A05 protected full refund / `o1_golden_reversal.vitest.ts` | exact allowlist+fresh step-up+active request만 provider 1회; full-only; completed는 durable refund+order truth 이후. |
| A06 replay/recovery / 위 두 파일 | nonce/request/provider replay 두 번째 효과 0; ambiguous/provider/internal failure는 recovery_hold+reconciliation, false success/refusal 0. |
| A07 shipped support / `.vitest.ts` | support create/accept가 payment/refund/inventory/shipment/courier를 전혀 호출하지 않는다. |
| A08 ownership/projection / `o1_order_service_request_browser.vitest.ts` | non-owner는 not_found와 구별 불가; customer/operator shape에 internal/payment/provider/PII 없음. |
| A09 UI states/a11y / browser test | pending/accepted/refused/completed/unavailable/recovery copy, 단일 CTA, focus/live-region/disabled semantics가 closed view-model에서 결정된다. |
| A10 legacy isolation / `o1_legacy_lane_isolation.vitest.ts` | mock/admin 직접 O1 상태·요청 변경 0; O1 OFF legacy behavior 불변. |
| A11 responsive/static | 320px·390px·768px·1280px, 200% text, keyboard-only, reduced-motion에서 정보/행동 손실·가로 필수 스크롤 0. |

## 7. 접근성·모바일/웹 고정

- 고객 touch target 최소 44×44px, 운영 최소 40px; `focus-visible` 2px outline+2px offset, 색만으로 상태를 구분하지 않는다.
- 요청 영역은 `<section aria-labelledby>`, truth rail은 `<dl>`, step-up은 `<fieldset><legend>`, queue는 실제 link/list 또는 table semantics를 쓴다.
- 제출 컨테이너 `aria-busy`; 결과 `aria-live=polite`; 권한/보호/정합성 차단만 `role=alert`. 완료 후 결과 heading으로 programmatic focus, 새로고침 후 trigger 위치 복원.
- step-up label·오류·freshness 만료 해결 행동을 연결하고 입력은 `type=password`, `autoComplete=off`, 제출 직후 메모리에서 지운다.
- 새 motion은 0. `prefers-reduced-motion`에서 route/상태 전환 animation 0; loading은 텍스트로 동등 제공한다.
- 고객은 mobile-first 한 열; 운영 desktop 2열, 모바일은 목록→detail route. hover-only 정보·drag·popup·가로 스크롤 의존을 금지한다.

## 8. 제외·한계·STOP

- 제외: automatic customer refund, partial refund, exchange, full return lifecycle, courier/label, stock restoration, production/live/PII, AI, provider 변경, legacy/admin UX redesign, navigation redesign, localization 확장.
- 기존 TEST-only step-up은 production MFA가 아니며 그대로 명시한다. production 사용 요구 시 `STOP`.
- 브라우저/원본크기 screenshot은 이번 handoff가 browser action을 금지해 수행하지 않았다. 구현 후 독립 검토에서 실제 viewport 확인이 필요하다.
- schema/migration/DB, live provider/credential/secret, protected/main, 새 권한 모델, request kind/status 확대는 명시적 Leo/GPT 승인 없으면 `STOP`.
- owner/O1 namespace, intent/capture, exact reservation coverage, shipment, active request, audit 또는 reconciliation을 단일 truth로 판정할 수 없으면 행동을 숨기고 `recovery_hold`; 추측 구현은 `STOP`.
- legacy/mock/admin 경로 재사용이 O1 진실을 우회하거나, committed stock 복구·부분 환불·두 번째 provider 효과가 필요하면 `STOP`.
- 본 문서는 구현 승인이나 독립 검토 판정이 아니다. 반환 대상은 `foundation-advisor`다.
