# 창업자 결정 패키지 — Cosmile O1 Golden Commerce Loop

```text
목적: LEO와 GPT의 결정
COUNCIL_VERDICT: PROCEED_WITH_CORRECTIONS
실행 권한: 없음
ADVISOR 전달: 안 함
구현 시작: 안 함
```

## 지금 권고하는 결정

수정된 O1을 상용화 계획의 기준으로 승인하는 것을 권고한다.

- Paid Beta의 우선순위는 실제 commerce이며 Foundation AI와 Memory V3는 필수 경로에서
  제외한다.
- 전면 재작성하지 않고 검증된 부분만 선별 재사용한다.
- 첫 통합 목표는 제한된 Golden Order와 **captured-payment sandbox refund**를 포함한
  Golden Reversal이다.
- 증거는 sandbox rehearsal → non-production backbone → controlled live → Paid Beta로
  구분하며 자동 승격하지 않는다.
- 실제 provider와 live exposure는 최신 공식 자료, vendor 확인, 전문 자문, 구현 증거를
  확보한 뒤 별도로 결정한다.

## 조사·계획 전에 Leo가 결정하거나 범위를 좁힐 항목

### D-01 — 첫 시장과 통화

선택지: 단일 국내 시장/통화, 단일 cross-border 시장/통화, 복수 시장/통화.

권고: 처음에는 한 국가와 한 통화만 선택한다. Council에는 현재 시장·법인·provider
사실이 들어오지 않았으므로 정확한 국가는 Leo가 정해야 한다.

```text
LEO_DECISION:
COUNTRY:
CURRENCY:
```

### D-02 — 초기 SKU

선택지: 1개, 동일 운영 모델의 2–3개, broad catalog.

권고: 기본은 1개다. 서로 다른 중요한 상업 규칙을 검증해야 할 때만 2–3개로 늘린다.
통제된 노출 전에는 공급·재고·권리·가격·claim·Foundation 데이터의 정본 증거가 필요하다.

```text
LEO_DECISION:
SKU_SHORTLIST:
COMMERCIAL_OFFER:
```

### D-03 — 고객 인증

선택지: managed account-first, guest-first 후 account 연결, 자체 구축.

권고: 주문 소유권과 복구가 명확한 최소 managed provider 모델을 사용한다. Paid Beta를
위해 인증을 자체 구축하지 않는다. provider 이름은 국가별 공식 자료와 vendor 확인 후
고른다.

```text
LEO_DIRECTION: MANAGED_ACCOUNT_FIRST | GUEST_FIRST | OTHER
NAMED_PROVIDER_DECISION: DEFER_UNTIL_AUTHORITATIVE_RESEARCH
```

### D-04 — PG·결제·환불

선택지: direct PSP, 적합한 merchant-of-record/platform, 자체 결제 처리.

권고: 선택 법인·상품·국가가 onboarding 가능하면 managed direct PSP를 우선 비교하고,
운영 부담을 크게 줄일 수 있을 때 merchant-of-record도 비교한다. 결제 처리를 자체
구축하지 않는다. 첫 Golden Reversal은 결제 capture 후 sandbox refund를 통과해야 하며
void만으로 완료하지 않는다.

```text
LEO_DIRECTION: DIRECT_PSP_FIRST | MERCHANT_OF_RECORD_COMPARISON | OTHER
NAMED_PROVIDER_DECISION: DEFER_UNTIL_VENDOR_AND_AUTHORITATIVE_RESEARCH
```

### D-05 — 재고 system of record

선택지: Cosmile DB, 기존 supplier/warehouse/ERP, 제한된 operator ledger.

권고: 실제 재고 정본이 이미 있으면 그것을 사용한다. 없고 초기 재고를 직접 통제하며
범위가 매우 작으면 Cosmile을 정본으로 삼고 담당자와 reconciliation을 명시한다. 두 개의
숨은 재고 정본을 만들지 않는다.

```text
LEO_DECISION:
SYSTEM_OF_RECORD:
NAMED_OWNER:
```

### D-06 — fulfillment·배송·tracking

선택지: carrier portal을 사용하는 operator-assisted, carrier API, 3PL.

권고: 물량이 제한적이면 문서화·추적·감사·reconciliation이 가능한 가장 작은
operator-assisted 모델로 시작한다. 실제 물량, SLA, 공급 조건이 요구할 때만 API/3PL을
앞당긴다.

```text
LEO_DIRECTION: OPERATOR_ASSISTED | CARRIER_API | THIRD_PARTY_LOGISTICS
NAMED_OPERATOR:
```

### D-07 — 취소·환불·지원·reconciliation 책임

선택지: 명시적 고객 채널이 있는 operator-assisted, self-service + 예외 운영자, 주문
상태별 hybrid.

권고: 초기 제한 release는 operator-assisted 또는 hybrid가 적합하다. 승인, refund 실행,
재고 처리, reconciliation, 고객 통지, incident escalation의 책임을 각각 지정한다. 한
사람이 여러 역할을 맡을 수 있으나 암묵적 역할은 허용하지 않는다.

```text
LEO_DIRECTION: OPERATOR_ASSISTED | HYBRID | SELF_SERVICE
CANCELLATION_OWNER:
REFUND_OWNER:
RECONCILIATION_OWNER:
SUPPORT_AND_INCIDENT_OWNER:
```

## 공통 결정

### D-08 — 단계별 학습 질문

권고: 구현 계획 승인 전에 각 단계가 어떤 결정을 도울지 하나씩 정한다.

```text
REHEARSAL_QUESTION: 선택한 commerce loop가 설명되지 않은 상태·금전 불일치 없이 연결되고 되돌려지는가?
CONTROLLED_LIVE_QUESTION: 제한된 실제 거래를 지정된 참여자와 운영자가 안전하게 완료하고 복구할 수 있는가?
PAID_BETA_QUESTION: 제한된 고객군이 다음 투자를 정당화할 만큼 고객가치·운영 반복성·지원 가능성을 보여주는가?
LEO_ACCEPTS_OR_EDITS:
```

### D-09 — 판매 법인과 참여자·거래 형태

정확한 provider·법무·세무 판단 전에 seller/merchant 법인과 참여자, 고객 지위·연령,
채널, 배송 출발·도착, cross-border 형태를 잠정적으로라도 정해야 한다. 일반 계획을 모두
막을 필요는 없지만 provider-specific live contract와 controlled live는 막는다.

### D-10 — 재사용 실패 시 처리

권고: 계획 단계에서 재사용 가설을 검증하도록 하되 전면 재작성은 승인하지 않는다.
재사용이 근거로 반증되면 Advisor가 제한된 component replacement 선택지를 Leo에게
다시 제출하도록 한다.

```text
LEO_ACCEPTS_REUSE_PRESUMPTION: YES | NO
BOUNDED_REPLACEMENT_MAY_BE_RETURNED_AS_OPTION: YES | NO
AUTOMATIC_REWRITE_AUTHORIZED: NO
```

## 의도적으로 나중으로 미룰 결정

- 국가별 최신 공식 자료와 vendor 가능성을 확인하기 전의 identity, PSP, carrier/3PL,
  messaging, hosting, monitoring provider 이름;
- 이후 승인된 Advisor 계획이 정할 schema, state machine, migration,
  transaction/compensation, worktree 세부사항;
- 시장·법인·SKU·provider·운영 모델이 정해지기 전의 controlled-live/Paid Beta 숫자;
- 법무·회계, vendor, security, runtime, human-use, 운영 증거 전의 live 승인;
- Foundation AI, SIASIU AI integration, retrieval, 추천 UI, Memory V3.

## 승인 경계

이 패키지를 작성하거나 선택지를 표시하는 것만으로 구현은 시작되지 않는다. Leo와 GPT가
수정 방향과 Gate A/B 결정을 승인한 뒤 Strategy가 `foundation-advisor`에게 보낼 정확한
bounded instruction을 작성한다. Advisor는 Leo의 별도 명시 승인 뒤에만 시작한다.
