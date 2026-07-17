# Cosmile O1 Golden Commerce Loop — 개발 방향

```text
DOCUMENT_TYPE: STRATEGY_DEVELOPMENT_DIRECTION
ROLE: STRATEGY_DECISION_ARCHITECT
DATE_UTC: 2026-07-17
STATUS: COUNCIL_CORRECTED_FOR_LEO_GPT_REVIEW
O1_WORKING_DIRECTION: ADOPTED_BY_LEO
EXECUTABLE_AUTHORITY: NO
ADVISOR_IMPLEMENTATION_PLAN: NOT_STARTED
ADVISOR_DISPATCHED: NO
IMPLEMENTATION_AUTHORIZED: NO
PRODUCT_REPOSITORY_CHANGE_AUTHORIZED: NO
PRODUCTION_OR_REAL_MONEY_AUTHORIZED: NO
NEXT_MISSION_AUTO_START: NO
```

## 1. 전략 목표

Cosmile을 전면 재작성하지 않는다. 현재 UI, cart, DB order, admin 기반이 적합한
범위에서는 재사용한다. Paid Beta critical path의 mock을 production-shaped 구성요소로
교체하고 하나의 일관된 **Golden Commerce Loop**로 연결하는 것이 즉시 목표다.

첫 통합 이정표는 “frontend 완료” 또는 “backend 완료”가 아니다. 제한된 상품 집합의
정상 주문과 reversal 시나리오가 UI, API, DB, 외부 provider, 재고, 운영자 기록에서
일관된 증거를 남기며 통과하는 상태다.

Foundation AI, Memory V3, retrieval, 추천 UI 및 무관한 제품 확장은 이 Cosmile 방향에
포함하지 않는다.

## 2. 감사로 확인된 시작점

검토된 E2/static commercial baseline은 의미 있는 Cosmile source를 확인했지만 실제
결제 경로는 검증하지 못했다.

- catalog와 price가 mock 또는 in-memory product data에 의존한다.
- 고객 인증은 mock이다.
- checkout은 pending order를 DB에 만들지만 mock catalog에서 가격을 다시 계산한다.
- payment는 PSP, 검증 webhook, idempotency, reconciliation이 없는 simulated status
  transition이다.
- 재고 예약·차감·해제·복원 및 oversell 방지가 없다.
- shipment와 tracking의 확립된 system of record가 없다.
- cancellation/refund에 경제적 reversal과 정책 기반 상태 복원이 없다.
- admin 기반은 있으나 access hardening과 범위가 정해진 security review가 남아 있다.

이 방향은 runtime readiness를 주장하지 않는다. 이후 승인된 구현 미션에서 build,
test, DB, endpoint, provider, staging, 운영 증거를 생성해야 한다.

## 3. Golden Commerce Loop

### Golden Order

```text
production-candidate SKU
-> 실제 provider 기반 sandbox identity
-> authoritative price와 sellable state
-> cart와 checkout
-> PG sandbox payment
-> 검증되고 idempotent한 webhook
-> confirmed order
-> 재고 예약·차감
-> shipment와 tracking
-> payment/order/inventory/operator reconciliation
```

### Golden Reversal

```text
취소 또는 반품 요청
-> 승인된 정책 판단
-> PG sandbox refund 또는 void
-> order-state transition
-> 정책 기반 inventory release, restoration, quarantine 또는 disposal
-> payment/order/inventory/operator reconciliation
```

두 시나리오는 하나의 통합 이정표를 구성하지만 별도 test case로 유지한다. 정상 배송과
취소·환불은 같은 business path가 아니다.

화살표는 보편적인 transaction 순서가 아니라 scenario coverage를 뜻한다. provider와
inventory에 맞는 안전한 순서·compensation은 이후 contract에서 정한다. Golden
Reversal은 capture된 결제의 sandbox refund를 포함해야 한다. pre-capture void는 낮은
수준의 증거로 남길 수 있으나 Golden Reversal을 완료시키지는 못한다.

## 4. 단계별 Founder 결정 gate

Leo에게 다음 항목의 국가 기반 간결한 선택지와 권고를 제공해야 한다.

1. 첫 판매 국가와 통화;
2. 초기 실제 판매 SKU 범위;
3. 고객 인증 모델과 provider;
4. PG와 결제·환불 방식;
5. 재고 system of record와 운영 책임;
6. fulfillment, 배송, tracking 방식;
7. 취소, 환불, reconciliation 운영 책임.

결정 패키지는 다음 두 cross-cutting gate도 기록해야 한다.

- merchant/legal entity, tax/VAT, 영수증, privacy, terms, 배송, 취소, 환불 정책
  경로;
- Paid Beta cohort, 주문·거래 한도, exit criteria, stop condition,
  incident/customer-support 책임.

국가를 먼저 정해야 통화, PG, 세금, 법무, fulfillment, identity, provider 선택 범위가
정해진다. 결정 패키지를 작성할 때 현재 provider 및 규제 claim은 authoritative
source로 검증해야 한다.

모든 결정을 한 번에 닫지는 않는다.

- **국가/provider 조사 전:** 첫 국가·통화, seller/entity 경로, SKU shortlist, 단계별
  정성적 학습 질문의 범위를 좁힌다.
- **계획만 수행하는 Advisor 작업 전:** O1, 제외 범위, evidence claim ladder, 선별 재사용
  가정, country/entity/SKU planning envelope를 승인한다.
- **provider-specific contract 고정 전:** 최신 공식 자료와 vendor 증거를 바탕으로
  identity, PG/refund, inventory, fulfillment/tracking, recovery/reconciliation 모델을
  선택하고 필요한 법무·회계 질문을 전달한다.
- **controlled live 전:** 정확한 참여자·거래 형태, provider eligibility, support promise,
  한도·중단 조건 및 법무·보안·privacy·runtime·human-use·운영 gate를 승인한다.
- **Paid Beta 전:** cohort, exposure, 학습·exit 기준, 지원 coverage, 다음 결정 규칙을
  별도로 승인한다.

어떤 gate도 다음 gate를 자동 승인하지 않는다.

## 5. Build, buy, open-source 원칙

### Cosmile이 직접 소유할 구현

- commerce domain contract와 state machine;
- product/SKU/price/inventory binding;
- order, payment, shipment, cancellation, refund 일관성;
- webhook 검증, idempotency, replay 처리, recovery;
- frontend/API/DB integration;
- 운영자 reconciliation과 audit trail.

### Leo 승인 아래 사용할 managed 또는 commercial service

- 고객 identity provider;
- PG와 payment method;
- email/SMS;
- carrier, 3PL 또는 tracking provider;
- 적합한 hosting, monitoring 또는 운영 service.

### Open-source 구성요소

DB tooling, migration, queue/job, observability 또는 운영 지원에는 compatibility,
security, license, maintenance 책임, 운영 비용이 적합할 때만 open source를 선택한다.
stack을 한 번 사용했다는 형식을 위해 새 구성요소를 도입하지 않는다.

목표는 모든 material commerce boundary를 통과하는 것이지, 가능한 모든 기술을 쓰는
것이 아니다.

선별 재사용은 되돌릴 수 있는 가정이지 결론이 아니다. 계획은 read-only 증거와 정확한
재사용 가설에서 시작한다. disposable implementation spike는 중대한 불확실성이 남을 때
별도 승인을 받아야 한다. component가 선언된 재사용 기준을 통과하지 못하면 Advisor가
제한된 replacement 선택지를 Leo에게 반환할 수 있지만, 이 문서나 단일 component 실패가
전면 재작성 권한을 주지는 않는다.

## 6. Contract-first 기반

frontend와 backend 병렬 구현 전에 승인된 계획은 다음 최소 shared contract를
고정해야 한다.

- Customer;
- Product와 SKU;
- Price와 sellable state;
- Inventory와 reservation;
- Cart와 Checkout;
- Order;
- PaymentAttempt와 PaymentEvent;
- Shipment와 Tracking;
- Cancellation과 Refund;
- ReconciliationRecord와 AuditEvent.
- Experience and Recovery Contract;
- Data Authority and Lineage Contract;
- Environment, Evidence Claim, Authorization record.

또한 다음을 결정하는 invariant를 고정해야 한다.

- price의 최종 authority;
- 재고 예약·차감·해제·복원 시점;
- payment capture와 order confirmation 조건;
- 중복 또는 순서가 바뀐 provider event 처리;
- payment 성공 후 order 실패 recovery;
- 취소·반품 정책별 refund와 inventory 처리;
- customer와 operator permission;
- 각 transition을 증명하는 evidence.

초기 contract는 server-authoritative item, price, amount, currency, SKU, stock 값;
customer/order 및 privileged action authorization; provider event의 authenticity,
uniqueness, ordering, replay resistance, transaction binding; 환경 분리;
customer/operator에게 보이는 상태와 허용 action; rollback, data recovery, 경제적
compensation, correction의 구분도 보존해야 한다. 이는 invariant 집합이며 완료된 security
audit나 Execution Manifest가 아니다.

Strategy 문서는 “결제 후 주문을 확정하고 그다음 재고를 확인”하는 위험한 단일 순서를
미리 고정하면 안 된다. Advisor가 관리하는 기술 계획은 provider와 inventory 결정 후
안전한 transaction·compensation 설계를 선택해야 한다.

## 7. 병렬 작업 Track

| Track | 범위 |
|---|---|
| Cosmile frontend | provider 기반 login, catalog/PDP, cart, checkout, payment result, order, tracking, 취소·환불 요청, admin/operator view |
| Cosmile backend | identity boundary, SKU/price/stock persistence, order state machine, PG adapter/webhook, inventory invariant, shipment, refund, reconciliation |
| Operations | provider sandbox, fulfillment 절차, policy/runbook, CS, monitoring, backup·recovery |
| Integration/evidence | shared contract, end-to-end trace, failure/recovery scenario, test·runtime evidence |

이는 logical track이며 자동 actor 배정이 아니다. 하나의 repository를 병렬 수정하기 전에
Advisor가 write ownership, worktree, integration order, collision control을 정의해야
한다.

## 8. 단계별 delivery

### Stage 0 — 결정 고정

4절의 결정을 기록한다. 이 문서로 제품 코드나 외부 계약을 시작하지 않는다.

### Stage 1 — 실제 read path

실제 provider 기반 sandbox identity를 승인된 system of record의
production-candidate SKU, authoritative price, sellable state, inventory와 연결한다.
catalog, PDP, cart, checkout을 해당 data에 연결한다.

### Stage 2 — Sandbox Golden Order

PG sandbox, 검증 webhook, idempotent order confirmation, inventory transition,
customer/admin order visibility, shipment/tracking record, reconciliation evidence를
연결한다.

### Stage 3 — Golden Reversal과 recovery

취소·반품, void/refund, order-state transition, 정책 기반 inventory 처리,
reconciliation을 검증한다. 최소 material failure case도 검증한다.

- payment failure와 timeout;
- 중복 또는 out-of-order webhook;
- payment 성공 후 order confirmation 실패;
- 마지막 stock에 대한 동시 구매;
- provider refund 성공 후 내부 transition 실패;
- operator recovery와 audit evidence.

Stage 2와 3을 합쳐 `GOLDEN_COMMERCE_REHEARSAL`이라고 한다. 동일하게 pin된 contract,
build/configuration, provider-backed sandbox, bounded evidence set에서 Golden Order와
captured-refund Golden Reversal이 각각 통과할 때만
`SANDBOX_WALKING_SKELETON_EVIDENCE`를 주장할 수 있다. rehearsal에서 생성된 모든
시도는 reconcile되어야 하며 관련 immediate authorization, authoritative value binding,
duplicate/out-of-order/idempotency, last-stock, partial-failure case도 통과해야 한다. 이
결과는 live, reliability, usability 또는 commercial claim이 아니다.

### Stage 4 — 운영 안전 gate

이후 `NONPRODUCTION_BACKBONE_EVIDENCE`를 주장하려면 별도 bounded reliability·recovery
predicate가 필요하다. 적용 가능한 crash/restart durability, delayed/missing event
detection, 더 넓은 bounded-population reconciliation, monitoring/containment,
backup/restore, recovery rehearsal, repeatability evidence를 포함한다. 이 결과도
controlled live를 승인하지 않는다.

실제 돈 또는 고객 PII 전에 다음의 비례적인 증거가 필요하다.

- customer와 operator authorization;
- PII-safe logging과 secret 처리;
- scoped security review 및 critical finding closure;
- monitoring, alert, incident response, rollback;
- backup과 restore;
- payment/order/inventory reconciliation;
- Legal, privacy, tax, 배송, 취소, 환불 요건;
- 이름이 정해진 fulfillment, support, refund, incident, reconciliation 운영자.

### Stage 5 — 통제된 실거래

Leo가 명시적으로 승인하고 safety gate를 통과한 뒤에만 참여자, 거래 한도, stop
condition, 완전한 reconciliation이 고정된 실제 주문과 환불을 수행한다.

### Stage 6 — Invite-only Paid Beta

통제된 실거래가 통과하고 Leo가 cohort, 주문 threshold, exit criteria, support model,
stop condition을 승인한 뒤에만 진행한다. Public Launch로 자동 승격하지 않는다.

## 9. Cosmile O1 중 Foundation 경계

Cosmile은 catalog, cart, checkout, payment, order, fulfillment, refund에서
Foundation에 동기적으로 의존하면 안 된다.

Foundation은 product identity/content, brand, ingredient, claim, safety data의 의도된
canonical owner다. 초기 SKU 집합에 대해 Cosmile은 승인된 versioned snapshot 또는
명시적 synchronization을 소비하고 다음 binding을 보존한다.

```text
foundation_product_id <-> cosmile_sku_id
```

Cosmile은 sellable SKU, price, stock, sales state, customer, cart, order, payment,
fulfillment, refund의 authority다. Foundation이 unavailable이어도 ordinary commerce는
계속되어야 한다.

초기 Foundation canonical data의 위치, 품질, 승인 책임자, 전달 방식은 결정 패키지의
질문으로 남는다. 여기서 추정하지 않는다.

## 10. Acceptance criteria

첫 Cosmile 통합 이정표는 다음이 모두 충족될 때만 완료된다.

- 동일한 provider-backed non-production context에서 Golden Order와 captured-refund
  Golden Reversal이 각각 통과하고 claimed path에 mock behavior가 없음;
- 동일한 order와 transition history를 UI, API, DB, PG, inventory, shipment/refund,
  operator record에서 추적 가능;
- webhook 검증과 idempotency evidence;
- no-oversell 및 compensation/recovery evidence;
- 취소·환불과 정책 기반 inventory 처리가 정확히 reconcile;
- customer와 operator authorization boundary evidence;
- rehearsal의 모든 시도가 reconcile되고 관련 immediate authorization, value binding,
  duplicate/out-of-order, last-stock, partial-failure case가 통과;
- customer/operator에게 보이는 상태, 허용·금지 action, recovery route가 기술 trace와
  함께 기록되지만 이후 human-readiness 증거를 주장하지 않음;
- evidence가 rehearsal ceiling, 이후 non-production backbone, operational safety,
  controlled live, Paid Beta readiness를 구분.

이 이정표의 통과는 `SANDBOX_WALKING_SKELETON_EVIDENCE`만 증명한다. 신뢰 가능한
non-production backbone, operational safety, controlled-live eligibility, Paid Beta
readiness, commercial validation, 전체 기능 완료, production scale, Public Launch
readiness 또는 Foundation AI readiness를 증명하지 않는다.

모든 stage result는
`NOT_STARTED | IN_PROGRESS_WITHIN_AUTHORITY | EXTERNAL_PENDING |
EVIDENCE_INCOMPLETE | PASS | HOLD`를 사용한다. claim ceiling, environment/exposure,
적용 가능한 exact evidence pin, unresolved ID, accountable owner, review disposition,
authorization state를 기록한다. `PASS`는 다음 단계 진행을 승인하지 않는다.

## 11. 명시적 제외 범위

- Foundation AI runtime;
- Memory V3 재개 또는 U1/U2/U3 closure;
- retrieval 또는 추천 UI;
- SIASIU integration;
- 대규모 catalog 확대;
- B2B2C, influencer, advanced dashboard, voice commerce, AI pricing, AI CRM;
- 무관한 Public Launch 기능;
- Control에 남은 과거 AI service migration.

향후 Foundation AI 작업은 별도 소유권·evidence model을 가진, 상용 경로를 막지 않는
별도 승인 Track이어야 한다.

## 12. 역할과 routing

```text
Leo + Strategy Decision Architect
-> 승인된 objective와 Founder decision
-> foundation-advisor
-> selected Foundation Team Actors
-> 필요 시 Independent Reviewer
-> foundation-advisor audited result
-> Strategy Decision Architect
-> Leo
```

- Advisor는 execution orchestration과 통합 reporting을 소유한다.
- Cosmile Worker는 Cosmile repository 구현을 소유한다.
- Designer는 승인된 experience/design 작업을 소유할 수 있다.
- Control은 Advisor 산하 contract, dependency, state invariant, architecture 분석만
  수행하며 구현하지 않는다.
- Independent Reviewer는 구현자가 되지 않고 승인 결과를 검증한다.
- Strategy는 subordinate actor를 직접 dispatch하거나 independent review를 주장하지
  않는다.

## 13. Council 요건

```text
COUNCIL_DECISION: REQUIRED
TRIGGERS:
- material Paid Beta scope와 release-gate 결정
- payment, PII, DB, security, refund, external-provider risk
- multi-actor 및 cross-project 영향
- 3 working days를 실질적으로 초과하는 예상 작업
COUNCIL_REVIEW_COMPLETED_FOR_THIS_DIRECTION: YES
COUNCIL_MISSION_ID: COSMILE_O1_GOLDEN_COMMERCE_LOOP_STRATEGY_COUNCIL_V1
COUNCIL_COMPOSITION: SELECTED_8
COUNCIL_ROUNDS_COMPLETED: 3
COUNCIL_FINAL_ROLE_VERDICTS: 8_PROCEED_WITH_CORRECTIONS
STRATEGIST_FINAL_VERDICT: PROCEED_WITH_CORRECTIONS
```

Council은 이 방향을 수정했지만 independent review, 구현 권한, live 승인 또는 risk
acceptance를 제공하지 않았다. Advisor는 아직 dispatch되지 않았다.

## 14. 다음 결정

Leo와 GPT가 이 수정 방향과 한영 통합 Founder Decision Package를 검토한다. Leo가 해당
Gate A/B 결정을 기록하고 bounded next step을 명시적으로 승인한 뒤 Strategy가 Advisor
지시문을 준비할 수 있다. Advisor의 계획·orchestration 시작에는 Leo의 별도 승인이
필요하다.

```text
LEO_GPT_REVIEW_REQUIRED: YES
DECISION_PACKAGE_COMPLETED: YES
ADVISOR_DISPATCHED: NO
IMPLEMENTATION_STARTED: NO
STOP
```
