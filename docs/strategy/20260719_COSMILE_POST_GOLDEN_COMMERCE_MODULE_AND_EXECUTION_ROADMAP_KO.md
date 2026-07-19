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

## 3. 현재 검증 증거의 한계

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

## 4. 현재 기능 상태표

| 영역 | 현재 상태 | 확인된 것 | 남은 것 |
|---|---|---|---|
| 기존 프런트엔드 재사용 | PARTIAL_REUSED | 기존 화면과 commerce spine을 확장했고 전체 재작성하지 않음 | 일관된 쇼핑 경험, 모바일, 접근성, 팝업·오류·빈 상태 |
| Google OIDC | NONPROD_VERIFIED | 고객·운영자 로그인과 권한 분리 | 실제 도메인·세션 운영, 계정 복구, 개인정보·지원 절차 |
| 카탈로그 | NONPROD_VERIFIED_SYNTHETIC | ELT snapshot 기반 적격 상품 경로 | 실제 판매 승인, 이미지·권리, merchandising, ELT 전체 준비 |
| 장바구니 | NONPROD_VERIFIED | 로그인 고객 영속 장바구니와 구매 후 소비 | 만료·지원·운영 복구, production 동시성; guest는 제외 |
| Checkout | NONPROD_VERIFIED | 서버 재검증과 Toss TEST 시작 | production UX, 이탈·timeout·복구, live 설정 |
| 결제 capture | NONPROD_VERIFIED | Toss TEST capture 1건과 내부 상태 binding | live 가맹점, 실패·재시도 운영, 실제 정산 |
| Toss webhook | SOURCE_AND_CONTRACT_PRESENT_RUNTIME_NOT_EXERCISED | query 재검증 설계와 코드 존재 | 실제 webhook inbox, 중복·순서역전·재처리·격리 증거 |
| 주문 | NONPROD_VERIFIED | 주문생성, paid/refunded, 고객 주문상세 | 완전한 취소·반품 정책과 운영 복구 |
| 재고 | NONPROD_VERIFIED | reserve·commit·oversell deny·환불 HOLD | 입고·조정·반품검수·재판매복구·운영 reconciliation |
| 배송 | RECORD_ONLY_VERIFIED | 수동 운송사·송장·shipped 기록 | 실제 fulfillment 운영, 배송완료·예외; 택배 API는 연기 가능 |
| 전액 환불 | NONPROD_VERIFIED_OPERATOR_ONLY | step-up을 거친 Toss TEST 전액 환불 | 고객 요청, 승인 정책, production 운영·회계 |
| 주문취소 | NOT_VERIFIED | 최종 증거에 cancel transaction 없음 | 결제 전 취소와 결제 후 취소·환불 UX·정책 |
| 반품 | NOT_IMPLEMENTED_AS_COMPLETE_FLOW | 완료 주장 없음 | 요청·승인·수거·입고·검수·처분·환불·재고정책 |
| 부분 환불 | DEFERRED | 명시적으로 제외 | 실제 운영 필요와 회계 정책 승인 후 판단 |
| 리뷰·평점 | NOT_IN_GOLDEN_COMMERCE_SCOPE | 완료 주장 없음 | 실구매자 리뷰·moderation·신고·이미지 |
| 고객지원 | NOT_IN_GOLDEN_COMMERCE_SCOPE | 완료 주장 없음 | 문의·주문 연결·환불/반품 escalation·감사이력 |
| 운영자 화면 | MINIMAL_PROOF_SURFACE | 주문조회·배송기록·전액환불 | 정식 대시보드·검색·필터·queue·복구·재고·고객지원 |
| 배포·운영 | NOT_READY | 격리 runtime 시작과 정리 | 환경·release·rollback·monitoring·backup/restore·incident |
| AI 자동운영 | NOT_IMPLEMENTED | 완료 주장 없음 | 이벤트·정책·승인·action adapter·운영 메모리·감사 |

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

개별 다음 미션 자동 승인: NO
ADVISOR DISPATCH: NO
구현 시작: NO
STOP: ACTIVE
```
