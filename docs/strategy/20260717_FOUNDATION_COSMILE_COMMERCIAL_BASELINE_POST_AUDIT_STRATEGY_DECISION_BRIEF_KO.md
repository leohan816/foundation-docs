# Foundation + Cosmile 상용 기준선 — 감사 후 전략 결정 브리프

```text
DOCUMENT_TYPE: POST_AUDIT_STRATEGY_DECISION_BRIEF
ROLE: STRATEGY_DECISION_ARCHITECT
DATE_UTC: 2026-07-17
STATUS: STRATEGY_RECOMMENDATION_FOR_LEO_GPT_REVIEW
CANONICAL_PRODUCT_DECISION: NO
EXECUTABLE: NO
IMPLEMENTATION_AUTHORIZED: NO
RELEASE_APPROVED: NO
RISK_ACCEPTED: NO
NEXT_MISSION_STARTED: NO
SOURCE_MISSION: FOUNDATION_COSMILE_COMMERCIAL_CRITICAL_PATH_BASELINE_V1
SOURCE_FINAL_POINTER_COMMIT: 9ee9abaee83bd06ebc1d27373d8150ff328308b1
SOURCE_ADVISOR_AUDIT: PASS
SOURCE_INDEPENDENT_REVIEW: PASS
BLOCKING_REVIEW_FINDINGS: 0
```

## 1. 핵심 권고

현재 상용화 방향으로 **O1: Foundation AI를 숨기거나 닫은 commerce-first Paid
Beta**를 선택할 것을 권고한다.

O1은 현재 증거가 뒷받침하는 가장 짧은 실제 고객·매출 학습 경로다. 해결되지 않은
Foundation runtime 소유권, evidence retrieval, service 제공, product-ID binding을
결제 critical path에서 제외한다. Memory V3도 검토가 끝난 pre-runtime 경계에 그대로
멈춰 둔다.

감사 결과 Cosmile은 아직 실제 결제를 받는 Paid Beta 준비 상태가 아니다. 고객 인증,
정본 판매 catalog, 실제 PG, 재고 일관성, 배송, 환불, 보안 강화, monitoring,
backup/recovery, 외부 운영·법무 준비를 포함한 Paid Beta blocker 10개가 남아 있다.

따라서 권고 순서는 다음과 같다.

1. Leo와 GPT가 이 전략 방향을 검토하고 승인 또는 반려한다.
2. 7절의 최소 Founder 결정을 고정한다.
3. 그다음에만 정확히 범위가 제한된 미션을 만들어 `foundation-advisor`에게 전달한다.
4. Advisor가 선택된 Foundation Team Actor를 통해 실행을 리드하고, 감사된 최종
   결과를 Strategy에 돌려준다.

이 문서 자체로 구현은 시작되지 않는다.

## 2. 감사 결과

완료된 상용 기준선은 static evidence 수준에서 의사결정에 사용할 수 있다.

- Advisor 최종 감사: `PASS`.
- 독립 Reviewer 판정: `PASS`.
- blocking review finding: `0`.
- 통합 authoritative evidence row: `31` (`C-01..C-11`, `F-01..F-12`,
  `X-01..X-08`).
- O1 Paid Beta blocker: `10`.
- Public Launch 전체 open blocker record: `21`(조건부 AI 항목 포함).
- 감사 중 제품 및 Control repository tracked change: `0`.
- Memory V3 hard stop: 유지.
- 구현, 출시, 위험 수용, migration, 다음 미션 권한: 없음.

Reviewer는 비차단 주의사항 네 개를 남겼다. 일정은 Actor 실측이 아니라 Advisor 통합
추정이고, 겹치는 작업 범위를 기계적으로 합산하면 안 되며, 일부 Foundation 세부
debt는 raw evidence에 남아 있고, Day 3 상태 표현에는 조건이 붙었다. 기준선을
무효화하는 내용은 없었다.

## 3. 감사로 확인된 현재 상태

### Cosmile

Cosmile에는 의미 있는 UI, cart, order, admin source가 있지만 상용 critical path는
완성되지 않았다.

- product/catalog은 정본 판매 catalog가 아니라 mock 또는 in-memory data에 의존한다.
- 고객 인증은 mock이다.
- checkout은 DB에 pending order를 만들지만 가격을 mock catalog에서 계산한다.
- payment는 mock status 변경이며 PG, 검증된 webhook, idempotency, reconciliation이
  없다.
- 재고 예약·차감·복원 및 oversell 방지가 없다.
- 배송·tracking system of record가 없다.
- cancellation/refund가 실제 결제 취소 및 상태 복원을 하지 않는다.
- admin 기반은 존재하지만 login hardening과 범위가 정해진 security review가 남아
  있다.

일반 commerce는 현재 Foundation runtime에 의존하지 않는다. 그래서 AI를 숨긴 O1
경로는 구조적으로 가능하지만, 아직 Paid Beta ready는 아니다.

### Foundation

Foundation에는 상당한 deterministic judgment, safety, Memory shadow source가
있지만 이것이 검증된 commercial runtime을 의미하지는 않는다.

- canonical data는 external vault contract를 참조하며, 현재 실제 가용성과 품질은
  검증되지 않았다.
- Trust Core는 static/shadow evidence이며 배포된 service로 검증되지 않았다.
- repository에는 in-process API가 있지만 검증된 commercial HTTP service,
  deployment, monitoring package가 없다.
- evidence mode는 불완전하거나 연결되지 않았다.
- retrieval/search 및 Cosmile product-ID binding이 검증된 경로에 없다.
- Memory V3 sender, intake, durable backend, candidate runtime, production activation은
  존재하거나 승인된 상태가 아니다.

Foundation AI가 숨겨지거나 닫혀 있는 동안에는 이 항목들이 O1을 막지 않는다. AI를
Paid Beta나 Public Launch에서 고객에게 보여주기로 하면 핵심 blocker가 된다.

### 프로젝트 간 소유권과 Control

감사는 중요한 과거 구현 위치 모순을 확인했다.

- commerce가 호출하는 Foundation HTTP endpoint는 현재 `foundation-control`에 있고
  자체 구현으로 동작한다.
- 실제 FOUNDATION repository를 import하는 Control harness는 평가·참조 경로이며
  Cosmile의 live path가 아니다.
- 즉, live path는 FOUNDATION을 사용하지 않고, FOUNDATION을 사용하는 path는 live가
  아니다.

그러나 현행 운영 규칙은 명확하다. Control은 Advisor 산하의 architecture·contract
분석만 한다. 과거 구현 위치가 Control에 Worker 권한을 주지 않는다. 앞으로의
Foundation 구현은 FOUNDATION repository의 Foundation Worker가 담당한다.

AI가 숨겨진 O1에서는 이 소유권/runtime 모순을 blocker로 만들지 않는다. Foundation
AI를 고객에게 약속하기 전에는 반드시 해결해야 한다. 이 문서는 migration이나
deprecation을 승인하지 않는다.

## 4. 전략적 해석

문제는 기술 작업이 무가치했던 것이 아니라 상용화를 위한 멈춤 기준이 없었다는 점이다.
Memory V3가 bounded shadow capability에서 인증, consent runtime, durable storage,
sender, intake, privacy, 운영 소유권을 요구하는 신규 platform program으로 넘어갔다.
그 지점에서 중단한 것은 옳았다.

이제 상용 진척은 다음의 제한된 실제 고객 loop로 측정해야 한다.

```text
제한된 판매 SKU
-> 실제 고객 인증
-> 실제 결제
-> 일관된 주문 및 재고
-> 배송 및 tracking
-> 취소·환불 복구
-> monitoring 및 운영자 지원
```

Foundation은 여전히 전략적으로 중요하다. 다만 특정 downstream product 요구가 먼저
정의되어야 한다. source가 이미 있다는 이유만으로 Foundation platform 완성을 O1
거래 critical path에 넣으면 안 된다.

## 5. 권고하는 Paid Beta 경계

Leo와 GPT가 검토할 O1 경계는 다음과 같다.

- 초대 기반의 의도적으로 작은 cohort;
- 실제 고객 계정과 실제 결제;
- 작고 선별된 판매 SKU 집합;
- 범위가 제한된 배송, tracking, 취소, 환불 운영;
- 이름이 정해진 운영자와 명시적인 reconciliation 절차;
- Foundation 상담·추천 UI는 숨기거나 fail-closed;
- Memory V3 runtime 없음;
- Public-scale 약속 없음.

수동 운영은 정확한 system of record, 담당자, reconciliation, 실패 처리, 증거가 있을
때만 beta 범위를 줄이는 수단이 될 수 있다. “수동”이 기록 없음이나 추정을 뜻하면 안
된다.

## 6. 일정의 의미

감사 일정은 계획 추정치이며 확정 약속이 아니다.

| Gate | Engineering 추정 | Elapsed 추정 | 신뢰도 |
|---|---:|---:|---|
| Commercial MVP Feature Complete | 25–45 workdays | 독립적으로 고정되지 않음 | Low |
| Paid Beta Ready | 누적 40–70 workdays | 6–12주 | Low |
| Public Launch Ready | 누적 65–110 workdays | 12–20주 | Low |

두 개 이상의 구현 lane, part-time Security·운영 지원, 제한된 SKU, beta에서 허용되는
수동 fulfillment, 큰 order-model 재설계 없음, 가정 범위 안의 vendor/KYC 기간을
전제로 한다. PG, KYC, fulfillment, 법무, 운영자 확보 기간이 실제 elapsed time을
지배할 수 있다.

Track별 기간은 서로 겹치므로 기계적으로 합산하면 안 된다.

## 7. Leo의 결정이 필요한 항목

### 구현 계획을 활성화하기 전에 필요한 결정

1. **상용 option과 beta 경계(D-01).** O1을 승인하거나 O0/O2를 선택하고, beta가
   invite-only인지, 실제 결제인지, 작은 cohort인지 정한다.
2. **고객 identity 방향(D-02).** Security/privacy 의견과 함께 실제 인증 provider
   경로와 guest/account 정책을 정한다.
3. **Commerce 소유권 및 초기 상품(D-03).** 다음을 확인한다.
   - Foundation: canonical product identity/content, brand, ingredient, claim,
     safety, judgment 소유;
   - Cosmile: sellable SKU, price, stock, 판매 상태, cart, order, payment,
     fulfillment, refund, customer, admin 동작 소유;
   - 초기 판매 SKU는 의도적으로 작게 제한.
4. **결제와 환불 책임(D-04).** PG 방향을 선택하고 필요한 vendor/KYC 절차를
   승인하며 finance/refund/reconciliation 담당자를 정한다.
5. **Fulfillment 모델(D-05).** carrier, 3PL 또는 bounded manual 모델을 선택하고
   운영 담당자를 정한다.

### Paid Beta 활성화 또는 종료 전에 필요한 결정

6. cohort, 실제 주문 threshold, exit criteria, stop condition을 정한다(D-06).
7. 관할에 맞는 privacy, terms, shipping, cancellation, refund policy 경로를 자격 있는
   Legal/privacy 의견과 함께 승인한다(D-07).
8. incident, CS, fulfillment, refund, reconciliation 운영자를 정한다(D-08).

### AI 범위를 다시 검토할 때까지 미루는 것이 나은 결정

9. Foundation AI를 보여줄 때만 Stack A/B, provider 소유권, contract of record를
   결정한다(D-09).
10. Beta evidence와 Foundation runtime readiness가 나온 뒤 Public Launch에
    Foundation AI를 포함할지 결정한다(D-10).

## 8. 지금 고정할 것을 권고하는 소유권 규칙

```text
Foundation 구현       -> foundation Worker / FOUNDATION repository
Cosmile 구현          -> Cosmile Worker / Cosmile repository
SIASIU 구현           -> SIASIU Worker / SIASIU repository
Cross-project 분석    -> Advisor 산하 Control
실행 orchestration    -> foundation-advisor
독립 검증             -> Advisor가 routing한 Independent Reviewer
전략·우선순위         -> Leo + Strategy Decision Architect
제품·위험·출시 최종 결정 -> Leo
```

Control은 contract, dependency, migration option을 분석할 수 있다. 과거 code 소유를
근거로 cross-repository 구현을 다시 맡아서는 안 된다.

## 9. 명시적 no-build 경계

별도 승인이 있기 전에는 다음을 시작하지 않는다.

- Memory V3 runtime 재개 또는 U1/U2/U3 closure;
- sender, intake, durable candidate runtime, M3, Full Package 1B;
- Foundation AI가 보이는 beta 작업;
- Foundation/Control runtime migration 또는 legacy endpoint deprecation;
- 무관한 SIASIU integration;
- free-text feedback, semantic extraction, automatic memory promotion/ranking,
  adverse aggregation, B2B2C, influencer, advanced dashboard, voice commerce, AI
  pricing, AI CRM 확장;
- bounded Paid Beta 경로에 필요하지 않은 Public Launch 작업.

## 10. Leo/GPT 승인 후 권고하는 다음 단계

Leo와 GPT가 전략 방향 및 필수 Founder 선택을 승인한 뒤, Strategy가 목적, 성공 기준,
제약, risk gate, stop condition이 정확한 하나의 bounded mission을 만들고
`foundation-advisor`에게만 전달한다.

Advisor는 정식 repository owner를 통해 승인된 구현 순서를 준비하고 리드한다.
Control은 architecture·contract 분석에만 머문다. payment, DB/schema, PII, security,
production, public exposure, vendor, Legal 관련 고위험 행동에는 각각 필요한 Leo의
명시적 승인이 있어야 한다.

이 브리프는 그 미션이나 실행 권한 자체가 아니다.

## 11. Leo와 GPT가 확인할 질문

1. O1을 현재 상용 방향으로 승인하는가?
2. 5절의 Paid Beta 경계를 승인하는가?
3. 8절의 소유권 규칙을 승인하는가?
4. D-02~D-05 중 이미 결정된 항목은 무엇이며, 구현 전 짧은 decision package가
   필요한 항목은 무엇인가?
5. 위 답변이 기록된 뒤 Strategy가 Leo 최종 승인을 받을 정확한 Advisor 미션을
   준비해도 되는가?

## 12. 증거 한계와 source pointer

이 권고는 검토된 E2/static evidence에 기반한다. build, test, staging, endpoint,
DB, payment, vendor, production, security audit, Legal readiness를 주장하지 않는다.
확인되지 않은 외부 사실은 계속 unknown이다.

- Final pointer: `runs/shared/FOUNDATION_COSMILE_COMMERCIAL_CRITICAL_PATH_BASELINE_V1/99_FINAL_POINTER.md`
- Advisor closure: `runs/shared/FOUNDATION_COSMILE_COMMERCIAL_CRITICAL_PATH_BASELINE_V1/P5_INDEPENDENT_REVIEW_AND_ADVISOR_CLOSURE.md`
- Decision package: `runs/shared/FOUNDATION_COSMILE_COMMERCIAL_CRITICAL_PATH_BASELINE_V1/P4_DELIVERY_AND_DECISION_PACKAGE.md`
- Blocker matrix: `runs/shared/FOUNDATION_COSMILE_COMMERCIAL_CRITICAL_PATH_BASELINE_V1/P3_RELEASE_GATE_AND_BLOCKER_MATRIX.md`
- Source branch: `advisor/foundation-cosmile-commercial-baseline-v1-20260717`
- Final pointer commit: `9ee9abaee83bd06ebc1d27373d8150ff328308b1`

```text
STRATEGIST_RECOMMENDATION: O1_COMMERCE_FIRST_AI_HIDDEN_OR_CLOSED
CONFIDENCE: MEDIUM_FOR_DIRECTION_LOW_FOR_SCHEDULE
LEO_GPT_REVIEW_REQUIRED: YES
ADVISOR_DISPATCHED: NO
NEXT_MISSION_AUTO_START: NO
STOP
```
