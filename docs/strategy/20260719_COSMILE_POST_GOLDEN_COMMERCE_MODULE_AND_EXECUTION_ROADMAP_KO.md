# Cosmile 골든 커머스 이후 모듈·실행 마스터플랜

```text
문서 상태: WORKING_MASTER_PLAN
작성일: 2026-07-19
제품: COSMILE
방향 승인: YES
개별 구현 미션 자동 승인: NO
PR 병합 승인: NO
CONTROLLED LIVE 승인: NO
PAID BETA 승인: NO
MEMORY V3 상태: PAUSED
```

> **문서 범위:** 이 문서는 Cosmile Commerce의 현재 상태와 후속 로드맵이다.
> Foundation 자체의 지식·검색·판단·모델·API 구현계획은 포함하지 않는다.
> Foundation은 상품 snapshot 경계와 기존 AI 상담 bridge의 현재 상태를
> 잊지 않기 위해서만 기록한다. Foundation AI 상담·추천·Memory V3의 구현과
> 활성화는 현재 범위에서 명시적으로 보류한다.

## 1. 최종 방향

Cosmile에는 백엔드가 전혀 없는 것이 아니다. 현재 고객·운영자 신원,
카탈로그, 장바구니, Toss TEST 결제, 주문, 재고, 배송 기록, 전액 환불,
고객 주문 화면과 정합성 확인까지 연결된 **비운영 상거래 백엔드 뼈대**가
존재한다. 이 흐름은 브라우저에서 실행됐고 독립 검수도 통과했다.

지금 부족한 것은 이 뼈대를 둘러싼 실제 운영 시스템이다.

- 고객이 보기에 완성된 쇼핑몰 화면
- 취소·반품·고객 환불 요청
- 운영자가 매일 사용할 수 있는 대시보드
- 실제 상품·가격·재고 운영
- webhook·재처리·복구·정산
- 운영 DB·배포·백업·모니터링
- 고객지원·리뷰·알림
- 운영 이벤트·정책·메모리
- AI 분석·제안·승인·자동 실행

따라서 앞으로의 원칙은 다음과 같다.

> 검수된 Golden Commerce 뼈대를 보존하고, 고객과 운영자가 실제로 사용할
> 수 있는 수직 모듈을 하나씩 완성한다. 확정적인 Commerce 시스템이 안정된
> 뒤 이벤트·정책·운영 메모리와 AI 제어층을 단계적으로 올린다.

프런트엔드와 백엔드를 따로 완성한 뒤 마지막에 합치는 방식으로 돌아가지
않는다. 각 모듈은 화면, API, 서비스, DB, 운영, 실패·복구를 한 번에 연결해
닫는다.

## 2. 현재 고정된 제품 결정

### 2.1 로그인

```text
현재 로그인: Google OIDC만
현재 구현: 고객용 테스트 신원 + 운영자용 테스트 신원
구조: provider-neutral adapter 유지
지금 제외: Kakao, Apple, Naver, guest checkout, 다중 provider 구현
추가 시점: 시장·UX·운영 결정이 별도로 승인된 이후
```

현재 한국 경로에서는 Google만 구현한다. 내부 `customer_id`와 외부 Google
신원을 분리해, 나중에 다른 로그인 provider를 추가해도 Google 계정이
Commerce 정본이 되지 않게 한다.

### 2.2 결제

```text
현재 PSP: Toss Payments V2만
현재 통화: KRW만
현재 증거: Toss TEST/sandbox 결제 1건 + 전액 환불 1건
지금 제외: PayPal, Stripe, PortOne, 해외 PG, 다중 PSP, 다중 통화
추가 시점: 해외 시장·법인·정산·세무·환불·통화 결정 이후
```

지금은 두 번째 결제시스템을 붙이지 않는다. 결제 서비스 내부에는 provider
adapter 경계를 보존하지만 실제 구현과 운영은 Toss 하나만 사용한다.

### 2.3 Foundation과 Cosmile 경계

Foundation 정본:

- 제품 identity와 콘텐츠
- 브랜드
- 성분
- claim
- warning과 safety
- 근거와 provenance

Cosmile 상거래 정본:

- 판매 SKU
- KRW 가격
- 재고와 판매상태
- 고객과 장바구니
- 주문과 결제
- 배송·취소·반품·환불

Foundation은 비동기 versioned snapshot을 제공한다. Foundation 장애가
카탈로그·장바구니·결제·주문·배송·환불을 멈추게 해서는 안 된다.

### 2.4 현재 명시적으로 제외하는 것

- Foundation AI 상담
- SIASIU AI 연동
- Memory V3 재개
- 고객 개인화 메모리
- 추천 UI
- 미국/USD 구현
- 해외 결제 provider
- B2B2C·인플루언서 기능
- AI 자동 가격·발주·재고·CRM·마케팅
- 완성형 digital twin

이 기능들은 향후 설계할 수 있지만 현재 Commerce 모듈에 조용히 포함하면
안 된다.

## 3. 완료 증거와 한계

### 3.1 비운영 Golden Commerce — ✅ 검수 완료

현재 선언 가능한 최대 상태는 다음과 같다.

```text
REVIEWED_BROWSER_BASED_NON_PRODUCTION
GOLDEN_ORDER_AND_GOLDEN_REVERSAL_EVIDENCE
```

고정 증거:

- Cosmile 브랜치:
  `implementation/cosmile-o1-browser-nonprod-runtime-v1-20260718`
- Cosmile HEAD:
  `94693d26cec3c2e9ac830e9d2c2f6235dcf4c011`
- Cosmile Draft PR:
  `https://github.com/leohan816/Cosmile/pull/2`
- 최종 포인터 커밋:
  `d61aae109bf3089a9f3d017483d9cb79af55d721`
- Advisor 최종 감사 커밋:
  `b741882cd5ad9ec9f23b76b843965eb2d71dd58a`
- 독립 검수 커밋:
  `5e524694f23e67a73eb0c89cbfa74020319e3534`

확인된 비운영 사실:

- Google 고객 신원과 운영자 신원이 분리됐다.
- 운영자 권한은 email이 아니라 allowlist된 Google immutable subject에
  연결됐다.
- 적격 synthetic ELT 상품을 로그인 고객 장바구니에 넣었다.
- Toss TEST로 KRW 결제 1건을 capture했다.
- 주문이 확정되고 고객 화면에 표시됐다.
- 재고 reservation이 commit됐다.
- 운송사·송장·shipped 상태를 기록했다.
- Toss TEST 전액 환불 1건을 완료했다.
- 주문이 `paid → refunded`로 정확히 한 번 전환됐다.
- 환불 후 재고는 committed/HOLD로 남고 자동 판매복구되지 않았다.
- 반복 확인이 두 번째 경제적 효과를 만들지 않았다.
- reconciliation task는 0으로 끝났다.
- 고객 주문목록과 안정적인 환불 완료 주문상세가 표시됐다.
- 최종 focused Reviewer contract 79/79가 통과했다.
- 격리 앱·터널·DB·미션 secret이 정리됐다.

이 증거는 production readiness, Paid Beta readiness, 부하 대응, 실제 정산,
실제 고객 개인정보 운영 또는 공개 서비스 준비를 증명하지 않는다.

## 4. 현재 기능 상태표 — 완료·부분·미완료

`✅ 완료`는 이 문서에서 **검수된 비운영 범위가 완료됐다는 뜻**이다.
Production·Paid Beta·실고객 운영 완료를 뜻하지 않는다.

| 영역 | 현재 상태 | 확인된 것 | 남은 것 |
|---|---|---|---|
| 기존 프런트엔드 재사용 | PARTIAL_REUSED | 기존 화면과 commerce spine을 확장했고 전체 재작성하지 않음 | 일관된 쇼핑 경험, 모바일, 접근성, 팝업·오류·빈 상태 |
| Google OIDC | ✅ 완료(비운영) | 고객·운영자 로그인과 권한 분리 | 실제 도메인·세션 운영, 계정 복구, 개인정보·지원 절차 |
| 카탈로그 | ✅ 완료(합성 SKU·비운영) | ELT snapshot 기반 적격 상품 경로 | 실제 판매 승인, 이미지·권리, merchandising, ELT 전체 준비 |
| 장바구니 | ✅ 완료(로그인 고객·비운영) | 로그인 고객 영속 장바구니와 구매 후 소비 | 만료·지원·운영 복구, production 동시성; guest는 제외 |
| Checkout | ✅ 완료(비운영) | 서버 재검증과 Toss TEST 시작 | production UX, 이탈·timeout·복구, live 설정 |
| 결제 capture | ✅ 완료(Toss TEST) | Toss TEST capture 1건과 내부 상태 binding | live 가맹점, 실패·재시도 운영, 실제 정산 |
| Toss webhook | 🟡 부분 완료 | query 재검증 설계와 코드 존재 | 실제 webhook inbox, 중복·순서역전·재처리·격리 runtime 증거 |
| 주문 | ✅ 완료(Golden 상태·비운영) | 주문생성, paid/refunded, 고객 주문상세 | 완전한 취소·반품 정책과 운영 복구 |
| 재고 | ✅ 완료(Golden 상태·비운영) | reserve·commit·oversell deny·환불 HOLD | 입고·조정·반품검수·재판매복구·운영 reconciliation |
| 배송 | ✅ 완료(기록 전용·비운영) | 수동 운송사·송장·shipped 기록 | 실제 fulfillment 운영, 배송완료·예외; 택배 API는 연기 가능 |
| 전액 환불 | ✅ 완료(운영자·Toss TEST) | step-up을 거친 Toss TEST 전액 환불 | 고객 요청, 승인 정책, production 운영·회계 |
| 주문취소 | ❌ 미검증 | 최종 증거에 cancel transaction 없음 | 결제 전 취소와 결제 후 취소·환불 UX·정책 |
| 반품 | ❌ 미완성 | 완료 주장 없음 | 요청·승인·수거·입고·검수·처분·환불·재고정책 |
| 부분 환불 | ⏸ 연기 | 명시적으로 제외 | 실제 운영 필요와 회계 정책 승인 후 판단 |
| 리뷰·평점 | ⏸ 현재 범위 밖 | 완료 주장 없음 | 실구매자 리뷰·moderation·신고·이미지 |
| 고객지원 | ⏸ 현재 범위 밖 | 완료 주장 없음 | 문의·주문 연결·환불/반품 escalation·감사이력 |
| 운영자 화면 | 🟡 최소 proof 완료 | 주문조회·배송기록·전액환불 | 정식 대시보드·검색·필터·queue·복구·재고·고객지원 |
| 배포·운영 | ❌ 미완성 | 격리 runtime 시작과 정리 | 환경·release·rollback·monitoring·backup/restore·incident |
| AI 상담·추천 | ⏸ Source/Shadow만 존재 | default-off·debug·Foundation bridge 코드 일부 존재 | Foundation 자체 runtime 검증·정식 계약·제품 UX·운영 승인 |
| AI 자동운영 | ⏸ 미구현·연기 | 완료 주장 없음 | 이벤트·정책·승인·action adapter·운영 메모리·감사 |

## 4-A. 전체 As-Built 모듈 등록부

이 절은 현재 Cosmile에 **이미 존재하는 코드와 데이터 모델까지 포함한 전체
현황 지도**다. 단, 파일이 존재한다는 사실을 기능 완료로 간주하지 않는다.
각 모듈은 다음 여섯 상태를 따로 기록한다.

| 축 | 의미 |
|---|---|
| Source | 현재 고정 HEAD에 관련 코드·route·schema가 존재하는가 |
| Build | 그 모듈이 현재 HEAD의 재현 가능한 build에서 확인됐는가 |
| Test | 의미 있는 계약·회귀·속성 테스트가 확인됐는가 |
| Runtime | 실제 격리 runtime에서 실행됐는가 |
| Integration | 화면→API→service→DB·외부 경계까지 연결됐는가 |
| Authority | 현재 사용할 수 있는 경로인가, default-off·shadow·historical인가 |

상태 표기:

```text
VERIFIED      직접 증거로 확인됨
PARTIAL       일부 경로·상태만 확인됨
SOURCE_ONLY   코드 또는 schema 존재만 확인됨
MOCK          목업 신원·데이터·결제 등에 의존
SHADOW        default-off 또는 평가용 경로
DEFERRED      현재 범위에서 명시적으로 연기
BLOCKED       외부 결정·권한·선행조건이 필요
UNVERIFIED    이번 증거로 확인하지 못함
N/A           해당 축이 적용되지 않음
```

### 4-A.1 증거 기준점과 전역 한계

- As-Built 기준: Cosmile
  `94693d26cec3c2e9ac830e9d2c2f6235dcf4c011`
- 검수된 O1 delta:
  `00feea3193a946963b15ded90d062db0ce1fdda1..94693d26cec3c2e9ac830e9d2c2f6235dcf4c011`
- 검수된 브라우저 증거는 대표 synthetic ELT SKU 한 건의 Golden Order와
  Golden Reversal에 한정된다.
- 최종 검수에서 focused contract 79/79는 통과했지만, 현재 HEAD 전체의
  build·typecheck·전체 test suite는 실행되지 않았다. 따라서 아래의
  과거 모듈은 별도 증거가 없으면 Build/Test를 `UNVERIFIED`로 둔다.
- 2026-07-17의 상용 baseline은 더 이전 HEAD를 조사한 역사적 기준이다.
  이후 O1이 인증·결제·재고·배송·환불 일부를 실제로 진전시켰지만, 그
  결과가 다른 모든 과거 모듈의 준비 상태까지 자동으로 올리지는 않는다.

고정 source 링크:

- [Cosmile 검수 HEAD](https://github.com/leohan816/Cosmile/tree/94693d26cec3c2e9ac830e9d2c2f6235dcf4c011)
- [Cosmile Draft PR #2](https://github.com/leohan816/Cosmile/pull/2)
- [현재 Feature Index](https://github.com/leohan816/Cosmile/blob/94693d26cec3c2e9ac830e9d2c2f6235dcf4c011/app/docs/FEATURE_INDEX.md)
- [현재 Prisma schema](https://github.com/leohan816/Cosmile/blob/94693d26cec3c2e9ac830e9d2c2f6235dcf4c011/app/prisma/schema.prisma)

### 4-A.2 고객 경험과 Storefront

| 모듈 | 대표 source 경로 | Source | Build / Test | Runtime / Integration | 현재 권한·결론 |
|---|---|---|---|---|---|
| 쇼핑 홈·카테고리·상품목록·상세 | `app/src/app/shop`, `products/[slug]`, `brands`, `src/components/product` | VERIFIED | 전체 Build `UNVERIFIED`; O1 관련 delta만 `PARTIAL` | 대표 SKU 조회·상세 `VERIFIED_NONPROD`; 전체 ELT·기존 상품은 `UNVERIFIED` | `RETAIN_AND_REPAIR` — 기존 화면을 재사용하고 정보구조·모바일·상태표현만 수술 |
| Google 고객 로그인·로그아웃 | `api/auth/google/**`, `lib/auth/**` | VERIFIED | 계약 테스트 `VERIFIED` | 고객·운영자 분리 로그인 `VERIFIED_NONPROD` | `RETAIN_AND_HARDEN`; Google-only, provider-neutral 경계 유지 |
| Mock 로그인 | `api/auth/mock-login`, `lib/mockUser.ts` | VERIFIED | `UNVERIFIED` | 데모·레거시 경로 | `ISOLATE_AND_RETIRE_FROM_RELEASE`; O1 또는 production 경로 사용 금지 |
| 로그인 고객 장바구니 | `app/cart`, `api/cart/**`, `lib/cart.ts` | VERIFIED | focused test `VERIFIED` | 담기·영속·구매 후 exactly-once 소비 `VERIFIED_NONPROD` | `RETAIN_AND_HARDEN` |
| Guest 장바구니·회원 병합 | `lib/mergeGuest.ts`, guest cookie 경로 | SOURCE_ONLY | `UNVERIFIED` | O1 브라우저 증거 밖; orphan 한계 기록 | `DEFER_AND_INVESTIGATE`; guest checkout 승인 전 release 경로에 넣지 않음 |
| Checkout 화면·Toss 진입 | `components/commerce/O1TossCheckout.tsx`, `api/o1/checkout/**` | VERIFIED | focused test `VERIFIED` | KRW 30,000 Toss TEST 진입·복귀 `VERIFIED_NONPROD` | `RETAIN_AND_HARDEN`; Toss 하나만 유지 |
| 고객 주문목록·주문상세 | `account/orders`, `orders/[orderId]`, `lib/order/service.ts` | VERIFIED | focused test `VERIFIED` | 소유권 제한 목록·환불 상세 `VERIFIED_NONPROD` | `RETAIN_AND_HARDEN` |
| 검색 | `app/search`, `components/search`, `api/slice/search` | SOURCE_ONLY | `UNVERIFIED` | 실제 상품·Foundation 검색과 현행 통합 미확인 | `INVESTIGATE_THEN_REPAIR`; Paid Beta 최소 검색 필요성부터 결정 |
| Wishlist | `app/wishlist`, `api/wishlist/**`, `lib/wishlist.ts`, `Wishlist` model | SOURCE_ONLY | `UNVERIFIED` | 현행 O1과 통합 증거 없음 | `DEFER`; Commerce spine 안정 후 재검증 |
| 알림 | `api/alerts/**`, `AlertSubscription`, `AlertEvent` | SOURCE_ONLY | `UNVERIFIED` | 외부 발송·운영 증거 없음 | `DEFER`; 주문 알림은 별도 최소 slice로 설계 |
| 이벤트·프로모션·Gift UI | `app/event`, `app/promotions`, `app/gift` | SOURCE_ONLY | `UNVERIFIED` | 실제 운영 데이터·전환 증거 없음 | `DEFER`; 쇼핑 기본 UX와 혼동시키는 팝업은 먼저 제한적으로 수리 |
| 쿠폰 UI·적용 | `api/coupons/**`, `api/cart/apply-coupon`, `Coupon*` models | SOURCE_ONLY | `UNVERIFIED` | 일부 경로가 `MOCK_USER`에 의존 | `DEFER_AND_ISOLATE`; 현재 Golden Commerce 가격 진실에 혼합 금지 |
| 공동구매 | `app/group-deal`, `api/group-deal/**`, `GroupBuy*` models | SOURCE_ONLY | `UNVERIFIED` | mock completion과 `MOCK_USER` 의존 경로 존재 | `DEFER_AND_ISOLATE`; 별도 제품 미션 없이는 release 범위 아님 |
| 상품 피드백·추천 결과 feedback | `api/orders/[orderId]/feedback`, `PurchaseFeedbackPanel`, `RecOutcome*` | PARTIAL_SOURCE | `UNVERIFIED` | 공개 리뷰·평점 전체 흐름이 아니라 구매 결과 feedback 조각 | `INVESTIGATE`; “리뷰 시스템 완료”로 주장 금지 |
| 상담·Vertical Slice·Voice | `app/consult`, `app/slice`, `api/slice/**`, `api/voice/**` | SOURCE_ONLY/SHADOW | `UNVERIFIED` | debug·default-off·Foundation 의존 경로 혼재 | `DEFER`; Foundation AI와 Memory V3 현재 범위 밖 |

### 4-A.3 확정적 Commerce Core

| 모듈 | 대표 source·model | Source | Build / Test | Runtime / Integration | 현재 권한·결론 |
|---|---|---|---|---|---|
| Foundation product snapshot | `FoundationProductSnapshot`, `lib/foundation/snapshot*.ts`, O1 bundle import | VERIFIED | 계약·DB 증거 `VERIFIED` | synthetic versioned bundle import `VERIFIED_NONPROD`; 실제 ELT 8개·권리는 `UNVERIFIED` | `RETAIN_AND_REPAIR` — 실제 승인 snapshot으로 교체 |
| Foundation product ↔ Cosmile SKU binding | `SkuBinding`, `CommerceSku`, `CommerceOffer` | VERIFIED | O1 계약 `VERIFIED` | 대표 SKU binding·단일 KRW 가격 `VERIFIED_NONPROD` | `RETAIN_AND_EXPAND_BOUNDEDLY` — 적격 ELT로만 확장 |
| 카탈로그 sellable·가격 진실 | `lib/storefront.ts`, `lib/sku.ts`, O1 runtime | VERIFIED | focused test `VERIFIED` | synthetic KRW price·eligibility fail-closed `VERIFIED_NONPROD` | `RETAIN_AND_HARDEN`; 실제 가격 history·운영 승인 추가 |
| 주문과 line snapshot | `Order`, `OrderItem`, `lib/order/**` | VERIFIED | focused contract `VERIFIED` | pending→paid→refunded와 고객 projection `VERIFIED_NONPROD` | `RETAIN_AND_HARDEN`; 더 넓은 상태 머신은 아직 `PARTIAL` |
| Toss capture | `PaymentIntent`, `PaymentTransaction`, `lib/payment/**`, `tossSandboxTransport.ts` | VERIFIED | contract `VERIFIED` | Toss TEST capture 1건 `VERIFIED_NONPROD` | `RETAIN_AND_HARDEN`; live·정산·merchant activation은 `BLOCKED` |
| Toss 전액 환불 | `Refund`, operator refund route, payment service/repository | VERIFIED | idempotency contract `VERIFIED` | TEST 전액 환불 1건·두 번째 경제효과 0 `VERIFIED_NONPROD` | `RETAIN_AND_HARDEN`; 부분환불은 `DEFERRED` |
| Toss webhook inbox·재처리 | `WebhookEventInbox`, `api/o1/webhooks/toss`, query-verify path | VERIFIED_SOURCE | 계약 테스트 `PARTIAL` | Golden Order straight-through 경로에서 inbox runtime은 미실행 | `NEXT_REPAIR_PRIORITY`; duplicate·delay·out-of-order·replay 증거 필요 |
| 재고 reserve·commit·release substrate | `InventoryReservation`, `lib/inventory/**` | VERIFIED | contract/property `VERIFIED` | 대표 SKU reserve→commit, oversell deny `VERIFIED_NONPROD` | `RETAIN_AND_HARDEN` |
| 환불 후 inventory HOLD | `InventoryReservation` + refund finalization | VERIFIED | focused invariant `VERIFIED` | 자동 sellable 복구 0 `VERIFIED_NONPROD` | `RETAIN`; 입고검수·restore command는 별도 추가 |
| 배송·tracking record | `ShipmentRecord`, operator shipment route | VERIFIED | focused contract `VERIFIED` | synthetic carrier·tracking·shipped `VERIFIED_NONPROD` | `RETAIN`; 첫 Beta는 record-only 가능, live courier는 `DEFERRED` |
| 주문취소 | legacy admin status route + O1 order state | PARTIAL_SOURCE | `UNVERIFIED` | 실제 cancel economic flow 0 | `REPAIR`; capture 전·후 취소를 payment/inventory truth와 연결해야 함 |
| 반품 | 독립된 complete return aggregate 없음 | INCOMPLETE | `UNVERIFIED` | 요청→수거→검수→처분→환불 흐름 없음 | `BUILD_AS_BOUNDED_SLICE` |
| Reconciliation | `ReconciliationTask`, payment/order repositories | VERIFIED_SOURCE | focused invariant `VERIFIED` | 단일 Golden Order/Reversal open task 0 | `RETAIN_AND_EXPAND`; queue·retry·operator runbook은 `UNVERIFIED` |
| Incident·복구 | `Incident`, recovery categories | SOURCE_ONLY | `UNVERIFIED` | 실제 incident·restart·missing event 운영 증거 없음 | `DESIGN_AND_VERIFY_BEFORE_PAID_BETA` |
| Prisma schema·migration | `app/prisma/schema.prisma`, O1 additive migrations | VERIFIED_SOURCE | O1 disposable Postgres migration evidence `VERIFIED`; 전체 schema gate `UNVERIFIED` | 격리 DB만 사용 | `RETAIN`; integration/staging migration·rollback·backup 별도 검증 |
| 레거시 checkout/mock payment | `api/checkout/start`, `api/checkout/mock-complete`, legacy checkout lib | MOCK/PARTIAL | 과거 static evidence | O1의 결제 진실이 아님 | `ISOLATE_AND_RETIRE_FROM_RELEASE`; Toss O1 경로와 혼합 금지 |

### 4-A.4 운영자·Console·대시보드

| 모듈 | 대표 source·model | Source | Build / Test | Runtime / Integration | 현재 권한·결론 |
|---|---|---|---|---|---|
| O1 최소 운영자 화면 | `app/o1/operator/**`, `api/o1/operator/**` | VERIFIED | focused contract `VERIFIED` | 주문조회·배송·step-up 전액환불 `VERIFIED_NONPROD` | `RETAIN_AS_PROOF`, 이후 정식 dashboard command UI에 흡수 |
| 운영자 immutable-sub allowlist·step-up | `lib/auth/o1Operator.ts` | VERIFIED | security contract `VERIFIED` | 별도 운영자 신원·single-use step-up `VERIFIED_NONPROD` | `RETAIN_AND_REDESIGN_FOR_OPERATIONS`; test secret 자체가 production 방식은 아님 |
| 레거시 Console 인증·권한·감사 | `app/console/**`, `api/console/**`, `ConsoleUser/Session/AuditLog` | SOURCE_ONLY | 2026-07-17 static audit는 존재; 현행 runtime `UNVERIFIED` | O1 운영자 신원과 통합되지 않음 | `INVESTIGATE_FOR_REUSE`; 인증 두 체계를 조용히 합치지 않음 |
| 레거시 주문 admin | `api/admin/orders/**` | PARTIAL_SOURCE | `UNVERIFIED` | status label을 직접 변경하는 route 존재; 돈·재고 진실과 불일치 위험 | `BLOCK_ECONOMIC_USE_AND_REPAIR`; O1 command service 우회 금지 |
| Catalog·SKU·offer admin | `api/admin/skus`, `listings`, `offers`, `content-blocks` | SOURCE_ONLY | `UNVERIFIED` | 실제 ELT snapshot·권리 gate와 통합 증거 없음 | `INVESTIGATE_THEN_REUSE` |
| Promotion·coupon·group-buy admin | 관련 `api/admin/**`와 console pages | SOURCE_ONLY | `UNVERIFIED` | 현재 O1 scope 밖 | `DEFER` |
| Intelligence·traffic·inventory 화면 | `app/admin/intelligence`, `app/console/{overview,orders,inventory,traffic}` | SOURCE_ONLY | `UNVERIFIED` | 현재 NOVA형 운영 read model과 runtime 연결 증거 없음 | `REUSE_VISUAL_AND_QUERY_SEEDS_ONLY`; 완성형 dashboard 주장 금지 |
| 운영 감사 | `ConsoleAuditLog`, O1 refund-finalization evidence | PARTIAL | O1 고위험 action evidence `VERIFIED`; 전체 console audit `UNVERIFIED` | Golden Reversal에서 제한적으로 확인 | `RETAIN_AND_UNIFY`; actor·approval·command·result chain으로 확장 |

### 4-A.5 이벤트·분석·Foundation·메모리

| 모듈 | 대표 source·model | Source | Build / Test | Runtime / Integration | 현재 권한·결론 |
|---|---|---|---|---|---|
| Canonical CommerceEvent cev-1.0 | `types/commerceEvent.ts`, `types/canonicalEvent.ts`, `commerceEventService.ts`, `CommerceEvent` | VERIFIED_SOURCE | 과거 schema/PII eval 존재; 현행 전체 gate `UNVERIFIED` | O1 경제 상태전이와 end-to-end event 연결은 `UNVERIFIED` | `RETAIN_AND_REPAIR`; 새 이벤트 체계를 만들지 말고 정본 연결 |
| PII sanitize 정책 | `lib/events/piiPolicy.ts`, event choke point | VERIFIED_SOURCE | 과거 eval `PARTIAL` | 모든 write path 적용 여부 `UNVERIFIED` | `RETAIN_AND_SECURITY_REVIEW` |
| Analytics report·Slack alert | `scripts/analytics-report.mjs`, `commerceMetrics.ts`, `COSMILE_ANALYTICS_PIPELINE_MVP.md` | SOURCE_ONLY | 문서·과거 MVP 증거는 존재; 현행 data/runtime `UNVERIFIED` | production DB·schedule·dashboard 연결 없음 | `INVESTIGATE_FOR_REUSE`; 운영 read model의 씨앗 |
| 매출·캠페인·학습 insight | `ProductSalesDaily`, `Campaign`, `LearningInsight` | SOURCE_ONLY | `UNVERIFIED` | 실제 최신 commerce truth와 projection 증거 없음 | `DEFER_UNTIL_EVENT_TRUTH` |
| Foundation signal outbox | `FoundationSignalOutbox`, dry-run route/script | SHADOW/SOURCE_ONLY | dry-run 구조 존재 | 실제 Foundation delivery·ack 없음 | `DEFER`; Foundation 현재 우선순위와 별도 승인 필요 |
| Foundation consultation bridge | `lib/foundation/**`, `api/consultation/foundation-dev`, slice adapter | SHADOW/SOURCE_ONLY | 과거 contract/eval 증거 | default-off·dev/shadow; 현재 O1과 분리 | `DEFER_AND_PRESERVE_BOUNDARY`; 일반 commerce 동기 의존 금지 |
| Recommendation events·outcome | `RecommendationEvent`, `RecOutcomeEvent`, `RecOutcomeFeedback` | SOURCE_ONLY/SHADOW | `UNVERIFIED` | 현재 실제 AI 추천과 폐루프 통합 없음 | `DEFER`; Foundation 능력·평가가 확인된 후 재개 |
| Commerce evidence·consent | `CommerceEvidenceRecord/Tombstone`, `ConsentRecord`, `commerceEvidenceService.ts` | SHADOW/SOURCE_ONLY | flag·계약 일부 존재 | default-off, production false; 현재 O1 runtime 미확인 | `DEFER_AND_REVERIFY` |
| 고객·상담 Memory 구조 | `Conversation*`, `EpisodeSummary`, `MemoryFactCandidate`, `LongTermMemoryFact`, `CustomerProfile`, `SubjectRefMap` | SHADOW/SOURCE_ONLY | 과거 Memory V3 reviewed artifacts 존재 | durable production memory 활성화 없음 | `MEMORY_V3_PAUSED`; Commerce 운영 메모리와 혼합 금지 |
| Voice | `api/voice/**`, `lib/voice/**` | SOURCE_ONLY | `UNVERIFIED` | provider/runtime 증거 없음 | `DEFER` |

### 4-A.6 운영 기반·보안·외부 경계

| 모듈 | 현재 증거 | 결론 |
|---|---|---|
| 전체 build·typecheck·test | 최종 O1 HEAD에서 전체 gate 미실행; focused 79/79만 확인 | `UNVERIFIED_GLOBAL_GATE` — 다음 정착 slice에서 한 번 실행 |
| Non-production runtime | 격리 앱·DB·HTTPS tunnel로 Golden Order/Reversal 후 정리 확인 | `VERIFIED_NONPROD_ONLY` |
| Production 배포 | domain·hosting·DB·release·rollback 증거 없음 | `NOT_READY` |
| Backup·restore·재해복구 | 증거 없음 | `NOT_READY`, Paid Beta 전 필수 |
| Monitoring·logging·alert | analytics/Slack source는 있으나 runtime 운영 증거 없음 | `PARTIAL_SOURCE`, Paid Beta 전 최소 관제 필요 |
| Auth·operator·payment 국소 보안 | Google issuer/subject, session hash, operator allowlist, step-up, Toss query verification 계약 확인 | `VERIFIED_BOUNDED_NONPROD` |
| 전체 앱 보안·PII | 공개 surface 전체 threat/privacy 검수 없음 | `UNVERIFIED`, Paid Beta 전 필수 |
| Toss live·KYC·정산·세무 | TEST key만 사용; live·계약·KYC·실정산 없음 | `EXTERNAL_BLOCKED` |
| 배송·CS·반품 운영 | record-only shipment 외 실제 조직·runbook·SLA 없음 | `EXTERNAL_AND_OPERATIONAL_BLOCKED` |

### 4-A.7 현재 재사용 판단

```text
그대로 보존할 핵심:
Google OIDC seam, 내부 customer identity, 로그인 cart,
Foundation snapshot/SKU binding, Toss adapter와 payment records,
order/payment/inventory/refund invariants, shipment record,
customer order projection, O1 operator command substrate

제한적으로 수리·통합할 것:
기존 storefront, 상품·가격 운영, order state machine,
webhook inbox/replay, cancellation/return, console/dashboard,
CommerceEvent, analytics, audit와 recovery

release 경로에서 격리·퇴역할 것:
mock login, mock payment completion, 경제적 진실을 우회하는
레거시 admin order-status mutation

현재 연기할 것:
wishlist, coupon, group buy, gift, voice, 다중 auth/PSP,
Foundation AI, recommendation, 고객 Memory V3, AI 자동운영
```

전면 재작성은 승인하지 않는다. 재사용 여부는 위 표의 `Source`가 아니라
Build/Test/Runtime/Integration/Authority 증거를 합쳐 결정한다.

### 4-A.8 남은 As-Built Unknown 등록부

| ID | 질문 | 중요도 | 해결 방법·시점 | 현재 blocking effect |
|---|---|---|---|---|
| U-ASBUILT-01 | O1 HEAD 전체 build·typecheck·test가 재현 가능한가 | HIGH | 다음 branch 정착 slice에서 clean gate 1회 | integration 기준선 차단 |
| U-ASBUILT-02 | 레거시 Console·admin의 어느 화면·query를 안전하게 재사용할 수 있는가 | HIGH | read-only runtime·auth·command boundary 조사 | 정식 운영자 dashboard 설계 차단 |
| U-ASBUILT-03 | Toss webhook inbox가 duplicate·delay·out-of-order·missing event를 실제로 복구하는가 | CRITICAL | isolated webhook/replay verification | Paid Beta 차단 |
| U-ASBUILT-04 | CommerceEvent가 O1 상태전이를 정확히·PII 없이 기록하는가 | HIGH | 대표 상태전이 delta probe | 운영 read model·Agent 계층 차단 |
| U-ASBUILT-05 | analytics report가 현재 schema와 실제 event에서 재현되는가 | MEDIUM | read-only synthetic data probe | dashboard 지표 신뢰 차단 |
| U-ASBUILT-06 | 실제 ELT 8개의 snapshot·권리·이미지·가격·재고가 승인 가능한가 | CRITICAL | Foundation source·운영 owner·외부 권리 확인 | 실제 catalog 차단 |
| U-ASBUILT-07 | 피드백 코드가 공개 리뷰로 확장 가능한가, 별도 aggregate가 필요한가 | MEDIUM | source/UX/정책 설계 | 리뷰 slice만 차단 |
| U-ASBUILT-08 | guest·coupon·group-buy·alert가 현 identity·price·order truth와 호환되는가 | LOW_NOW | 각 기능 선택 시 별도 bounded audit | 현재 Paid Beta 최소경로는 비차단 |
| U-ASBUILT-09 | staging DB migration·backup·restore·rollback이 가능한가 | CRITICAL | isolated staging rehearsal | Paid Beta 차단 |
| U-ASBUILT-10 | 전체 공개 surface의 auth·PII·rate-limit·CSRF·abuse 경계가 안전한가 | CRITICAL | 배포 전 보안·개인정보 검수 | Paid Beta 차단 |

이 Unknown은 추측으로 닫지 않는다. 각 후속 slice는 관련 Unknown만 선택하고,
증거가 나오면 이 등록부의 상태를 갱신한다.

## 5. 목표 시스템 구조

Cosmile은 세 개의 명확한 층으로 구성한다.

```text
┌───────────────────────────────────────────────────────┐
│ 경험 계층                                             │
│ 고객 쇼핑몰 · 고객 마이페이지 · 운영자 대시보드      │
└──────────────────────────┬────────────────────────────┘
                           │ 승인된 API와 command
┌──────────────────────────▼────────────────────────────┐
│ 확정적 Commerce 계층                                  │
│ 신원 · 카탈로그 · 장바구니 · 주문 · 결제 · 재고      │
│ 배송 · 취소 · 반품 · 환불 · 감사                     │
└──────────────────────────┬────────────────────────────┘
                           │ canonical domain event
┌──────────────────────────▼────────────────────────────┐
│ 운영·Agent 제어 계층                                  │
│ 이벤트 · read model · 운영 메모리 · 정책             │
│ workflow · AI 제안 · 사람 승인 · 제한적 실행          │
└──────────────────────────┬────────────────────────────┘
                           │ 비동기 product snapshot
                       ┌───▼────────┐
                       │ Foundation │
                       └────────────┘
```

주문·결제·재고의 정본은 항상 확정적 Commerce 계층이다. Agent는 행동을
제안하거나 승인된 command를 요청할 수 있지만 DB의 경제적 진실을 직접
마음대로 수정할 수 없다.

## 6. 프런트엔드 모듈 로드맵

### F1. 쇼핑몰 기본 화면

필수:

- 쇼핑몰로 인식되는 홈과 카테고리 내비게이션
- 적격 ELT 상품목록과 loading·empty·stale·blocked 상태
- 가격·재고·배송·반품·safety를 보여주는 상품상세
- 데스크톱·모바일 일관성
- 한 번 닫으면 계속 나타나지 않는 이벤트 팝업
- 키보드·focus·form·error·상태변경 접근성

현재 프런트엔드와 디자인을 우선 재사용한다. 전체 재작성은 하지 않는다.

### F2. 장바구니와 Checkout

필수:

- 모든 화면에서 일관된 장바구니 진입
- 수량 변경과 삭제
- 서버에서 가격·판매상태 재확인
- 결제 대기·실패·timeout·취소·복구 상태
- 중복 주문·중복 reservation 없는 checkout 복구
- 현재 결제수단에는 Toss만 표시

### F3. 고객 마이페이지

필수:

- Google 로그인·로그아웃
- 주문목록과 안정적인 주문상세
- 결제·배송·취소·반품·환불 timeline
- 정책상 가능한 고객 취소 요청
- 반품·환불 요청과 고객지원 escalation
- 요청 상태와 실제 환불 완료를 명확히 분리
- 계정·개인정보·고객지원 진입점

### F4. 리뷰와 고객지원

Paid Beta Commerce가 안정된 후 추가:

- 실구매자 리뷰와 평점
- 수정·삭제·moderation 상태
- 신고·숨김·abuse 처리
- 주문·상품과 연결된 고객문의
- 처리상태·운영자 답변·감사 가능한 해결 기록

고객 리뷰가 자동으로 Foundation 제품 정본이 되면 안 된다. 지식 추출은
별도 provenance와 moderation 계약을 거쳐야 한다.

### F5. 운영자 대시보드

현재 `/o1/operator`는 proof surface다. 정식 운영자 화면은 기존 backend
command를 우회하지 않고 그 위에 구축한다.

최소 화면:

- 오늘의 주문·매출·환불·배송대기·재고위험·실패·reconciliation
- 주문 검색·필터·상세·상태 timeline
- 배송·송장 기록
- 취소·반품·전액환불
- 재고 조회와 통제된 조정
- 개인정보 최소화 고객·지원 context
- 누가 또는 어떤 Agent가 제안·승인·실행했는지 보여주는 감사이력
- 모바일 승인·경고 화면
- 데스크톱 상세 운영 화면

NOVA형 화면은 장기 정보설계 참고로 적합하다. 첫 대시보드는 장식적인
digital twin보다 실제 운영 진실과 action을 우선한다.

## 7. 백엔드 모듈 로드맵

### B1. 신원과 권한

현재 기반:

- 내부 `CustomerAccount`
- immutable issuer/subject provider identity
- hash된 server session
- 고객·운영자 신원 분리
- subject allowlist와 test-only step-up

다음:

- 실제 도메인·callback·session 운영
- 최소권한 operator role
- 계정 disable·recovery
- step-up 갱신과 감사 정책
- 개인정보 보관·삭제 절차
- Google-only 구현과 provider-neutral 계약 유지

### B2. 상품·SKU·카탈로그·가격

현재 기반:

- Foundation snapshot과 Cosmile SKU binding
- 단일 KRW 가격 정본
- fail-closed 적격성

다음:

- 실제 ELT 제품 승인·snapshot import
- 이미지·상업권리 gate
- publish/unpublish·sellable 상태
- Foundation snapshot의 stale·missing·corrected 처리
- 가격 history와 주문시점 가격 snapshot
- 감사되는 운영자 가격·판매상태 변경

### B3. 장바구니와 Checkout

현재 기반:

- 로그인 장바구니
- 가격·상품 적격성 서버 재확인
- 검증된 구매 후 exactly-once 장바구니 소비

다음:

- 장바구니 lifecycle·만료 정책
- checkout timeout·이탈 복구
- stale reservation·intent 정리
- 고객지원이 확인할 수 있는 실패 category
- integration 환경 동시성·idempotency 증거

Guest checkout은 계속 연기한다.

### B4. 주문 상태 머신

필요한 상태 범주:

```text
created
payment_pending
paid
fulfillment_preparing
shipped
delivered
cancel_requested
cancelled
return_requested
return_authorized
return_received
refund_pending
refunded
hold_reconciliation
```

정확한 상태 집합은 현재 코드를 다시 확인한 뒤 확정한다. 모든 전이는
append-only·authorized·idempotent·recoverable이어야 한다. UI가 주문 label을
직접 바꿔 돈의 진실을 만들면 안 된다.

### B5. Toss 결제와 환불

현재 기반:

- TEST capture와 전액 환불
- durable intent·transaction·refund
- Payment Query 검증
- idempotency·replay 방어
- full-refund-only 정책

다음:

- runtime webhook inbox 실행
- duplicate·delayed·missing·out-of-order 처리
- quarantine와 replay 운영
- 결제 성공 후 내부 실패 복구
- 환불 성공 후 내부 실패 복구
- settlement·reconciliation report
- live 가맹점·credential은 별도 승인 후

PayPal이나 두 번째 PSP는 포함하지 않는다.

### B6. 재고

현재 기반:

- reserve·commit·release substrate
- default-deny oversell
- 환불 후 inventory HOLD

다음:

- 입고·재고조정
- 유통기한·손상·반품 처분
- 운영자 확인 후 sellable 복구
- low-stock·이상경고
- reservation 만료·복구 job
- 주문·reservation·가용재고 reconciliation
- immutable 재고조정 감사

### B7. Fulfillment와 Tracking

현재 기반:

- 수동 운송사·송장·shipped 기록

다음:

- preparing·shipped·delivered·failed·returned
- 누락 송장과 지연 queue
- 고객 배송상태
- 감사되는 기록 수정
- 수동 운영 runbook

첫 Paid Beta에서는 수동 송장입력이 통제된다면 실시간 택배 API가 필수는
아니다.

### B8. 취소·반품·환불

이 세 가지는 서로 다른 업무다. “환불이 됐다”로 합치면 안 된다.

- **Capture 전 취소:** 환불 없이 intent 종료와 재고 release
- **결제 후 배송 전 취소:** Toss 전액 환불, 주문전이, 재고정책, 고객·운영자 증거
- **배송 후 반품:** 요청·승인·수거·입고·검수·처분·전액환불·재고정책
- **환불:** 경제적 결제 reversal이며 현재는 전액만 허용

Golden Reversal은 운영자 전액 환불 1건을 증명한다. 완전한 고객 취소·반품
시스템을 증명한 것이 아니다.

### B9. 리뷰와 고객지원

필요한 record:

- verified purchase binding
- rating·review·moderation history
- support case와 주문·상품 link
- category-only reason
- 운영자 action·resolution timeline
- notification 상태
- 보관·개인정보 classification

### B10. 운영·감사·복구

필수:

- reconciliation queue
- incident와 제한된 recovery action
- payment·order·inventory·operator immutable audit
- idempotent retry command
- break-glass·step-up
- 운영자 action reason·evidence
- dashboard에서 DB 직접 수정 금지
- 모든 고위험 action은 검수된 command service로 실행

### B11. 배포와 데이터 운영

Paid Beta 전 필수:

- 검수 브랜치 integration·release 경로
- 필요한 전체 build·typecheck·test gate 1회
- staging과 통제된 production 환경
- migration 적용·rollback
- backup·restore rehearsal
- secret 관리·rotation
- HTTPS·domain·session
- log·metric·alert·uptime·error monitoring
- incident·shutdown 절차
- 개인정보·권한·운영보안 검수

## 8. 운영·Agent 제어 계층

“미들앤드”는 여러 AI 코드를 중간에 모아놓는 영역이 아니라 별도의
운영·Agent 제어 계층으로 만든다.

### M1. Canonical Commerce Event

이벤트는 durable 상태전이 후에만 발생해야 한다. stable reference,
category, provenance, schema version, causation을 포함하고 secret·raw PII는
포함하지 않는다.

초기 이벤트:

- 신원·session category
- 카탈로그·판매상태
- 장바구니·checkout 진행
- 결제 성공·실패·unknown·환불
- 주문 상태전이
- 재고 reserve·commit·release·HOLD·restore
- 배송·tracking
- 취소·반품·고객지원
- 리뷰 lifecycle
- 운영자·Agent의 제안·승인·실행
- reconciliation·incident

Event log는 증거와 integration input이다. transaction 정본을 대신하지
않는다.

### M2. 운영 Read Model

대시보드용 projection:

- 주문·매출 funnel
- 결제·환불 reconciliation
- 배송 backlog
- 재고 가용성과 위험
- 반품·고객지원 업무량
- 고객 lifecycle category
- 제품·SKU 성과
- Agent 제안·승인·실행·결과

Read model은 조회를 빠르게 하지만 원본 정본을 수정하지 않는다.

### M3. 세 종류의 메모리

1. **Commerce 운영 메모리 — 가까운 시점에 구현**
   주문·결제·재고·고객지원·정책·제안·승인·실행·결과의 확정적 이력.
   Cosmile이 소유한다.

2. **고객 개인화 Memory V3 — 연기**
   동의 기반 고객 선호·상담·장기 context. Foundation Memory V3와 관련되며
   현재 계속 PAUSED다. 운영 메모리 작업에 조용히 포함하지 않는다.

3. **Agent 작업 메모리 — 향후 제한적으로 구현**
   가설·제안·reasoning context·evaluation 결과. action 설명에는 사용할 수
   있지만 주문·결제·재고 정본이 될 수 없다.

### M4. 정책·권한 Engine

Machine-readable policy가 다음을 결정한다.

- read-only·proposal-only·approval-required·bounded-auto
- 금액·재고·고객영향·시간 한도
- 필요한 증거와 freshness
- step-up·dual control
- fail-closed 행동
- rollback·compensation
- escalation owner

### M5. Workflow Orchestrator

예시:

```text
재고부족 감지
→ 발주안 제안
→ 정책 확인
→ Leo 승인 요청
→ 승인된 supplier adapter 실행
→ 결과 확인
→ 구매주문 record
→ 불일치 시 incident
```

LLM이 임의의 SQL이나 DB update를 실행하게 해서는 안 된다.

### M6. Agent 권한 성장 단계

```text
LEVEL 0: 상태를 정확히 기록하고 사람이 운영
LEVEL 1: AI가 관찰·분석·설명
LEVEL 2: AI가 행동안을 제안하고 사람이 직접 실행
LEVEL 3: AI가 제안하고 사람이 승인하면 시스템이 실행
LEVEL 4: 작은 위험 범위에서 정책 기반 자동 실행
LEVEL 5: 충분한 실제 증거 이후에만 제한 영역 자율 운영
```

후보 Agent:

- 수요예측
- 재고·발주
- 가격·할인 제안
- 결제·환불 이상감지
- 배송 예외처리
- 고객지원 분류
- 리뷰·평판 분석
- CRM 캠페인 제안
- 주간 경영분석
- 운영계획 작성
- Owner AI 종합

어떤 Agent도 처음부터 LEVEL 4·5로 시작하지 않는다.

### M7. 고위험 Action 계약

```text
durable evidence 관찰
→ 제한된 제안 작성
→ 정책·권한 검사
→ 필요한 사람 승인
→ 확정적 backend command
→ 결과 검증
→ 감사와 운영 메모리 기록
```

## 9. 대시보드 목표

NOVA형 참고 화면의 장점은 세 가지를 함께 보여주는 것이다.

1. 사업과 운영 현황
2. 재고·주문·배송 상태
3. Agent 관계·제안·승인·실행

Cosmile의 최종 대시보드는 네 영역을 연결한다.

### D1. 경영 현황

- 매출·주문·전환·환불·취소
- 회계 input이 준비된 후 contribution·campaign 지표
- 중요 운영 경고
- 주간 요약과 추천 행동

### D2. Commerce 운영

- 주문·결제·재고·배송·반품·고객지원
- queue·exception·retry·reconciliation
- 데스크톱 상세 운영과 모바일 승인

### D3. 고객 Intelligence

- 고객 lifecycle과 행동 category
- 구매·반품·문의·리뷰·동의된 interaction
- 향후 Foundation 상담·개인화 evidence
- 명확한 개인정보·동의·접근 경계

### D4. Agent Control Plane

- Agent 상태와 책임
- 제안과 supporting evidence
- 정책판정과 승인 필요 여부
- 실행 action과 결과
- 정지·실패·escalation·rollback
- Owner AI 종합

첫 대시보드는 실제 운영 command center로 만든다. digital twin은 실제
의사결정을 개선할 때만 추가한다.

## 10. 단계별 실행 로드맵

### 현재 완료 지점 — ✅ Golden Commerce 비운영 검증 완료

Google 고객·운영자 신원, 합성 대표 SKU, 로그인 장바구니, Toss TEST capture,
주문 확정, 재고 commit, 배송기록, 전액 환불, 환불 후 inventory HOLD,
고객 주문상세까지 하나의 브라우저 흐름으로 검증했고 독립 검수를 통과했다.
다음 Slice는 이 완료 증거를 보존한 상태에서 시작한다.

### Slice 1 — 검수된 Commerce spine 정착

목표: 1~2 engineering workdays.

- 브랜치 landing·integration 경로 확정
- integration blocking 문제만 수정
- 필요한 전체 build·typecheck·test gate 1회
- 수정 중에는 delta-only 검증
- 남아 있는 dead preview-host 설정 정리 여부 확인
- 통합 subject 독립 검수
- STOP

### Slice 2 — Toss webhook·retry·reconciliation

목표: 2~4 engineering workdays.

- runtime webhook inbox
- Payment Query 기반 재검증
- duplicate·delayed·out-of-order·replay
- missing event 복구
- capture/refund 내부 실패 복구
- 운영자 reconciliation queue
- focused + integration evidence
- 독립 검수
- STOP

### Slice 3 — 고객 취소·반품·최소 운영자 시스템

목표: 3~5 engineering workdays.

- capture 전 취소
- 결제 후 배송 전 전액환불 취소
- 제한된 반품 요청·입고·처분 상태
- 고객 요청·상태 UI
- 주문·배송·취소·반품·환불·복구 queue
- step-up·감사
- 부분 환불과 택배 API 제외
- 독립 검수
- STOP

### Slice 4 — 보이는 쇼핑몰·마이페이지 완성

목표: 3~5 engineering workdays.

- 홈·카탈로그·상품상세 일관성
- 장바구니·checkout·pending·failure·recovery UX
- 주문 timeline과 고객지원 진입
- 모바일·접근성
- 팝업 반복노출 수정
- 기존 프런트엔드 재사용, 전체 재작성 금지
- 비례적 독립 검수
- STOP

### Slice 5 — DB 운영·배포·monitoring·보안

목표: 4~7 engineering workdays.

- staging·production topology
- migration·rollback
- backup·restore rehearsal
- secret·access 운영
- monitoring·alert·incident·shutdown
- 개인정보·권한 검수
- Paid Beta 운영 checklist
- Controlled Live 전에 STOP

### Slice 6 — Event와 대시보드 기반

확정적 Paid Beta core가 안정된 후 목표: 5~10 engineering workdays.

- canonical commerce event
- operational read model
- 운영자 dashboard v1
- 제안·승인·감사 record
- read-only 분석 Agent
- 경제적 action 자동화 금지
- 독립 설계·구현 검수
- STOP

## 11. 일정 평가

```text
PAID BETA 필수 내부 작업:
약 10~18 cumulative engineering workdays

안전한 병렬화가 가능한 달력 기간:
약 2~4주

외부 달력 의존성:
Toss 가맹점·KYC·정산, 법무·개인정보·세무,
운영계정·도메인·인프라는 엔지니어링 완료와 별도로 기간을 늘릴 수 있음
```

이 추정은 각 Slice admission 때 현재 브랜치와 환경을 확인해 조정한다.
10~18일을 하나의 큰 장기 미션으로 승인하지 않는다.

NOVA형 대시보드와 Agent 운영은 그 다음 제품 Track이다. 확정적인 Event와
운영 기반 이후 읽기 전용 dashboard v1은 약 5~10 engineering workdays의
예비 범위다. 광범위한 AI 자동운영은 Agent별·권한 level별로 따로 추정한다.

## 12. 테스트와 검수 원칙

- 작은 수정은 focused delta test가 기본이다.
- 모든 작은 수정 후 전체 suite를 반복하지 않는다.
- Slice를 통합·종료할 때 필요한 전체 build·typecheck·test gate를 1회 수행한다.
- 작고 가역적인 수정은 기본적으로 독립 Reviewer가 필요하지 않다.
- 일반 focused delta는 비례적 검수를 사용한다.
- 결제·신원·PII·권한·재고·migration·production·대규모 통합은 높은 검수 tier를 사용한다.
- Reviewer는 실제 모델·effort·검수 delta·명령·증거 한계·미검증 영역을 보고한다.
- PASS가 sandbox 증거를 production readiness로 올려주지 않는다.

## 13. 다음 Commerce Slice의 No-Build 목록

- 두 번째 결제 provider 금지
- PayPal·Stripe·PortOne·해외 PSP 금지
- Kakao·Apple·Naver·guest checkout 금지
- 다중통화·미국 구현 금지
- 별도 정당화 없는 부분 환불 금지
- 첫 Paid Beta에서 live 택배 API 필수화 금지
- storefront 전체 재작성 금지
- 완성형 digital twin 금지
- Foundation AI·SIASIU AI 금지
- Memory V3 활성화 금지
- AI 자동 가격·재고·발주·환불·마케팅 금지
- 별도 gate 없는 production·live·실고객 사용 금지
- 다음 미션 자동 시작 금지

## 14. 매 모듈의 Unknown 제거 규칙

Leo가 각 모듈을 이해하고 넘어가기 위해 매 Slice마다 다음을 반환한다.

1. 이 모듈이 해결하는 실제 문제
2. 현재 코드·데이터의 검증된 사실
3. system of record와 owner
4. 남아 있는 Unknown
5. Leo 결정 사항
6. vendor·법무·회계 확인 사항
7. 구현 범위와 명시적 제외
8. 화면에서 확인할 결과
9. 테스트·독립 검수 기준
10. 실패·복구·rollback
11. Agent 자동화 권한 level
12. 완료 증거와 다음 단계 자동 시작 금지

Unknown 종료 분류:

```text
RESOLVED_BY_REPOSITORY_EVIDENCE
RESOLVED_BY_AUTHORITATIVE_SOURCE
LEO_DECISION_REQUIRED
VENDOR_CONFIRMATION_REQUIRED
LEGAL_OR_ACCOUNTING_COUNSEL_REQUIRED
IMPLEMENTATION_VALIDATION_REQUIRED
OUT_OF_SCOPE
```

사실 Unknown을 AI reasoning만으로 해결했다고 처리하지 않는다.

## 15. 최종 권고와 순서

첫 다음 미션은 **Slice 1 — 검수된 Commerce spine 정착**으로 한다. 그 다음
webhook·retry·reconciliation을 닫는다.

쓰기 ownership이 겹치지 않는 경우에만 고객 취소·반품 경험과 운영자
대시보드 정보설계를 병렬로 준비할 수 있다. 구현 완료는 항상 하나의
통합 Slice 단위로 판정한다.

```text
검수된 spine 정착
→ webhook·복구
→ 취소·반품·운영자 처리
→ 보이는 쇼핑몰·마이페이지
→ 배포·DB 운영·monitoring·보안
→ Event·read model
→ AI 읽기 전용 분석
→ AI 제안
→ 사람 승인 기반 실행
→ 제한적 자동화
→ 실제 필요가 확인된 시점에 Memory V3 재개 판단
```

이 순서라면 Cosmile이 화면상 실제 쇼핑몰로 발전하는 것을 계속 확인하면서,
동시에 최종 목표인 Agent 운영 Commerce로 확장할 수 있다.

## 16. 현재 결정 상태

```text
마스터플랜 방향: APPROVED_AS_WORKING_DIRECTION

핵심 사실 1:
비운영 백엔드 뼈대는 존재하지만 production 운영 시스템은 미완성이다.

핵심 사실 2:
Golden Reversal은 운영자 전액 환불 1건을 증명하며 완전한 취소·반품을 증명하지 않는다.

핵심 사실 3:
Commerce 운영 메모리와 PAUSED 상태의 고객 개인화 Memory V3는 별개다.

핵심 사실 4:
NOVA형 Agent 대시보드는 유효한 목표지만 확정적 Commerce·Event·정책·권한이 먼저다.

핵심 사실 5:
현재 repository에는 Golden Commerce 밖의 storefront·console·event·analytics·
promotion·Foundation/Memory 관련 source도 다수 존재한다. 이들은 4-A 등록부에
기록됐지만, SOURCE 존재와 현재 build·runtime·integration 준비 상태는 분리한다.

개별 다음 미션 자동 승인: NO
ADVISOR DISPATCH: NO
구현 시작: NO
STOP: ACTIVE
```
