# ROLE AND CONTEXT COMPREHENSION CHECK — foundation-strategy-sol

```text
STATUS:
REVIEW_REQUIRED

CANONICAL:
NO

EXECUTABLE:
NO

AUTHOR:
foundation-strategy-sol

REVIEW_TARGET:
GPT

SOURCE_SCOPE:
PREVIOUSLY_READ_CANONICAL_ROLE_FILES_AND_BUILDER4_HISTORICAL_CONTEXT_ONLY

DATE:
2026-07-17
```

## 1. PORTFOLIO_MAP

- **Foundation:** 상품·브랜드·성분·claim·근거·안전·판단을 담당하는 공통 canonical core다. 검색·grounding·reasoning·decision·verification을 제공하지만 판매 UI, 주문, 결제, 배송을 소유하지 않는다.
- **SIASIU:** Foundation을 활용해 상담·설명·개인화 응답을 제공하는 독립 서비스다. 서비스 행동과 서비스 로컬 memory를 소유하며, Cosmile의 필수 runtime 경로로 자동 간주하지 않는다.
- **Cosmile:** 상품 진열, 가격, 재고, cart, checkout, payment, order, 배송, 고객·관리자 경험을 담당하는 독립 commerce application이다. Foundation 판단을 선택적으로 표시할 수 있지만 suitability·안전 판단을 자체 생성하지 않는다.
- **Agent Office:** Advisor·Control·Designer·Worker·Reviewer의 역할, handoff, routing, evidence, runtime binding을 관리하는 control plane이다. 제품 코드나 제품 결정을 소유하지 않는다.
- **Leo + GPT Portfolio Strategy:** Leo가 제품 방향, 우선순위, 범위, 위험 수용, 최종 승인과 다음 미션을 결정한다. GPT Portfolio Strategy는 Leo와 함께 선택지·우선순위·위험을 구조화하지만 구현·dispatch·독립 검수를 수행하지 않는다.

## 2. CURRENT_STRATEGIC_STATE

### Memory V3가 pause된 이유

Memory V3는 폐기된 것이 아니라 reviewed pre-runtime boundary에서 의도적으로 멈췄다. 다음 단계에는 sender, intake, durable backend, candidate runtime, 개인정보·보안·ownership 결정과 실제 구현 capacity가 필요하지만, Paid Beta에 그 runtime이 반드시 필요한지는 아직 확인되지 않았다. 상용화 critical path보다 먼저 확장하면 범위와 위험만 커질 수 있기 때문이다.

### 완료·미완료 상태

역사적 보고상:

- Cosmile C1/C2 구현과 독립 검수가 완료됐다고 보고됐다.
- Foundation Shadow WU1–WU7이 PASS됐다고 보고됐다.
- reviewed pre-runtime 설계·evidence boundary까지는 진행됐다.

그러나 다음은 완료되지 않았다.

- U1·U2·U3는 OPEN으로 보고됐다.
- F1/F2/F3/C3/X1/M3는 미시작으로 보고됐다.
- Memory V3 전체는 non-production complete가 아니다.
- M3는 시작되지 않았다.
- sender, intake, Foundation durable Memory backend, candidate runtime, production activation은 존재하지 않는다고 보고됐다.

모든 구현·PASS·commit 상태는 actual Git과 current artifact로 재검증해야 한다.

### Cosmile commercial baseline이 Priority 0인 이유

새 기능보다 먼저 실제 상용화 상태를 알아야 하기 때문이다.

- Cosmile critical path의 실제 구현 상태
- Foundation commercial core의 실제 data·API·runtime
- 두 시스템의 dependency와 contract
- Paid Beta와 Public Launch blocker
- 실제 commercial branch 기준점
- 병렬화 가능한 작업
- PG·배송·법무·운영 준비 상태

이 baseline이 없으면 일정, READY 상태, 다음 구현 범위를 정직하게 결정할 수 없다.

### Commercial implementation이 시작되지 않은 이유

Commercial baseline audit은 방향만 원칙적으로 합의됐고 executable authority는 활성화되지 않았다. Audit도 시작되지 않았으며, branch·HEAD·actor binding·runtime·blocker가 검증되지 않았다. 따라서 제품 구현은 STOP 상태이고 audit 결과 전에는 자동 시작할 수 없다.

## 3. DECISIONS_NOT_TO_REOPEN

현재 canonical decision과 충돌하지 않는 한 다음 결정은 조용히 변경하면 안 된다.

1. Foundation은 공통 판단 core이며 주문·결제·배송 owner가 아니다.
2. SIASIU는 독립 상담·설명 앱이며 Cosmile의 필수 runtime으로 자동 간주하지 않는다.
3. Cosmile은 독립 commerce 제품이며 상품 판매·주문·결제·재고·배송·관리자 운영을 소유한다.
4. Foundation 장애 시 일반 commerce transaction은 가능한 한 계속 작동해야 한다.
5. Foundation 장애 시 AI suitability·consultation은 fail-closed 또는 hidden 처리한다.
6. Memory V3는 자동 학습·자동 ranking·자동 promotion 시스템이 아니다.
7. Memory V3는 review-only evidence/candidate loop다.
8. Memory V3는 reviewed pre-runtime boundary에서 pause한다.
9. Memory V3는 완료되지 않았고 M3도 시작되지 않았다.
10. Memory V3는 business trigger와 Leo 승인 없이 자동 재개하지 않는다.
11. U1·U2·U3를 commercial baseline audit에서 닫지 않는다.
12. Sender·intake·durable backend·candidate runtime·production activation을 시작하지 않는다.
13. Commercial baseline audit 중 제품 코드·schema·migration·dependency·branch를 변경하지 않는다.
14. Cosmile Worker와 Foundation Worker는 각자 자신의 repository만 조사한다.
15. Control은 cross-project dependency와 contract만 read-only로 조사한다.
16. SIASIU 조사는 boundary-only dependency check로 제한한다.
17. Audit 결과 전 commercial implementation을 자동 시작하지 않는다.
18. Paid Beta와 Public Launch의 종료선을 분리한다.
19. 임의의 전체 완료율보다 blocker·critical path·parallel work를 우선한다.
20. 실제 파일·Git·test·runtime을 확인하지 않은 claim은 READY로 선언하지 않는다.

## 4. OPEN_DECISIONS

### Founder decisions

- Commercial baseline audit을 실제로 활성화할지
- Audit의 정확한 authority, 범위, timebox와 종료 조건
- Audit 이후 어떤 commercial branch를 기준점으로 채택할지
- Paid Beta Exit의 실제 주문·운영 threshold
- Paid Beta와 Public Launch의 최종 우선순위와 일정
- Audit 결과 이후 어떤 구현을 먼저 시작할지
- Memory V3를 재개할 business trigger가 충족됐는지
- Production, payment, DB, PII, public exposure 등에서 어떤 위험을 수용할지
- 최종 closure와 다음 미션 선택

### Repo facts requiring verification

- 각 repository의 실제 branch·HEAD·upstream
- 보고된 C1/C2와 WU1–WU7의 실제 ancestry·diff·test
- U1/U2/U3와 기타 WorkUnit의 현재 상태
- Foundation commercial core의 실제 physical ownership
- Foundation data·judgment API·safety·search·routing 상태
- Cosmile catalog·cart·checkout·order·inventory·shipping의 실제 구현 상태
- Mock과 real provider/runtime의 구분
- SIASIU가 Cosmile의 runtime dependency인지 여부
- Foundation adapter와 cross-repo contract
- Current actor registry, reviewer, model, session, runtime binding
- Foundation-docs의 current canonical pointers와 superseded records
- 실제 test command, PASS count, runtime endpoint와 cleanup evidence

### Security/privacy/Legal/architecture decisions

- 향후 Memory runtime의 data ownership, retention, consent, deletion과 access boundary
- Durable backend·sender·intake를 재개할 경우의 security architecture
- Customer identity와 request-scoped `memory_context`의 정확한 경계
- Payment·auth·authorization·PII 처리와 audit 기준
- DB/schema/migration이 필요한 경우의 승인·rollback·검증 방식
- Foundation 장애 시 commerce와 AI 판단을 분리하는 실제 contract
- Privacy·terms·shipping·refund 정책의 확정
- Production·public exposure·hard-reject activation의 위험 수용

### Commercial and external-operation decisions

- PG 계약과 심사 일정
- 배송·fulfillment 사업자와 운영 절차
- Email·SMS provider
- Production domain·SSL
- 실제 SKU·가격·재고 source
- 환불·취소·배송 운영 책임자
- CS owner와 escalation 절차
- Backup·restore와 incident response
- Paid Beta 대상·주문량·기간
- Public Launch 조건과 운영 capacity

## 5. ROLE_BOUNDARY

- **GPT Portfolio Strategy:** Leo와 포트폴리오 방향, 투자 순서, 우선순위, 위험을 논의하는 전략 기능이다. 제품 구현·actor dispatch·독립 검수를 하지 않는다.
- **Strategy Decision Architect:** 현재 그 전략 기능을 수행하는 Leo-facing 역할이다. Leo의 의도를 mission objective, success criteria, constraints, priorities, decision questions로 구조화해 Foundation Advisor에게만 전달한다. Advisor 결과를 전략적으로 해석해 Leo에게 한국어로 설명한다.
- **Foundation Advisor:** 실제 repository와 authority를 확인하고 instruction gate를 수행한다. 정확한 handoff를 만들고 Actor를 선택·dispatch하며, 결과와 evidence를 감사해 Strategy로 반환한다. 제품 구현이나 자기 독립 검수는 하지 않는다.
- **Control:** 승인된 handoff 안에서 cross-project architecture, contract, dependency와 WorkUnit decomposition을 조사·설계한다. 구현·dispatch·최종 결정을 하지 않는다.
- **Worker:** 자신의 repository와 승인된 범위만 구현하거나 조사한다. Evidence를 Advisor에게 반환하며 cross-repo 결정, scope expansion, self-review를 하지 않는다.
- **Independent Reviewer:** Advisor·Worker와 분리된 read-only 검수자다. 직접 evidence를 확인해 verdict를 Advisor에게 반환한다. Patch·commit·dispatch·위험 수용·최종 승인을 하지 않는다.

GPT Portfolio Strategy와 Strategy Decision Architect는 경쟁 권한이 아니다. 전자는 기능이고 후자는 현재 그 기능을 수행하는 구체적 인터페이스다.

## 6. SCENARIO_RESPONSES

### A. Leo gives you a broad product goal.

- **ACTION:** 목표의 이유, 우선순위, 성공 기준, 범위, 제약, 위험과 결정 질문을 Leo와 구조화한다.
- **STOP_OR_CONTINUE:** 전략 논의는 계속하되 범위와 승인 전 dispatch는 STOP.
- **ROUTE_TO:** Leo와 합의 후 foundation-advisor.
- **REASON:** Broad goal은 실행 가능한 Advisor mission이 아니며 Strategy가 먼저 명확하게 만들어야 한다.

### B. Leo asks you to send instructions directly to a Worker.

- **ACTION:** 직접 전달하지 않고 Advisor 경유로 수정한다.
- **STOP_OR_CONTINUE:** 직접 Worker 전달은 STOP.
- **ROUTE_TO:** foundation-advisor.
- **REASON:** 모든 assignment와 result routing은 responsible Advisor를 통과해야 한다.

### C. A commit or file mentioned in the handoff cannot be verified.

- **ACTION:** `UNVERIFIED`로 표시하고 그 claim을 현재 사실로 사용하지 않는다.
- **STOP_OR_CONTINUE:** 해당 claim에 의존한 판단·실행은 STOP. Read-only 검증은 계속 가능.
- **ROUTE_TO:** foundation-advisor; 해결되지 않으면 Leo.
- **REASON:** Builder4 handoff는 역사 자료이며 actual Git보다 우선하지 않는다.

### D. Advisor returns PASS_WITH_RISK.

- **ACTION:** 위험의 성격, 영향, 회피안, 수용 여부를 Leo에게 설명하고 제 권고를 제시한다.
- **STOP_OR_CONTINUE:** 명시적으로 승인된 저위험 범위가 아니면 STOP.
- **ROUTE_TO:** Leo.
- **REASON:** Advisor나 Strategy는 material risk를 대신 수용할 수 없다.

### E. A product decision is missing but implementation appears technically possible.

- **ACTION:** 구현하지 않고 필요한 제품 결정을 명시적인 질문으로 만든다.
- **STOP_OR_CONTINUE:** STOP.
- **ROUTE_TO:** Leo.
- **REASON:** 기술적 가능성은 제품 방향이나 위험 수용 권한을 대신하지 않는다.

### F. A repository HEAD differs from the reported handoff.

- **ACTION:** Handoff 값을 `STALE`로 처리하고 current HEAD의 ancestry·diff·영향을 검증하게 한다.
- **STOP_OR_CONTINUE:** Read-only 검증은 계속하고, 기존 baseline에 의존한 실행은 STOP.
- **ROUTE_TO:** foundation-advisor; 범위·결정이 달라지면 Leo.
- **REASON:** 실제 Git이 as-built 사실의 기준이며 역사적 reported HEAD를 자동 채택할 수 없다.

### G. Reviewer finds a narrow document defect.

- **ACTION:** 전체 결정을 다시 쓰지 않고 Advisor가 정확한 delta patch와 재검수를 관리하게 한다.
- **STOP_OR_CONTINUE:** 좁은 rework는 계속하되 필요한 rereview 전 closure는 STOP.
- **ROUTE_TO:** foundation-advisor.
- **REASON:** Reviewer는 patch하지 않으며 Strategy도 독립 검수나 구현을 대신하지 않는다.

### H. A useful new AI feature could delay Paid Beta.

- **ACTION:** Paid Beta blocker인지 단순 개선인지 구분하고, blocker가 아니면 후속 backlog로 미루는 것을 권고한다.
- **STOP_OR_CONTINUE:** 현재 commercial scope 추가는 STOP.
- **ROUTE_TO:** 우선순위 변경이 필요하면 Leo; 승인 후 foundation-advisor.
- **REASON:** 유용성만으로 commercial critical path를 지연시키면 안 된다.

### I. Foundation is unavailable but ordinary checkout can continue.

- **ACTION:** 일반 catalog·cart·checkout·payment·order는 계속하고 Foundation 판단이 필요한 기능은 fail-closed 또는 hidden 처리한다.
- **STOP_OR_CONTINUE:** Commerce transaction은 CONTINUE, AI suitability·consultation은 STOP.
- **ROUTE_TO:** 구현 검증이 필요하면 foundation-advisor. 예외나 위험 수용은 Leo.
- **REASON:** Foundation은 commerce transaction의 single point of failure가 되어서는 안 된다.

### J. A completed mission suggests automatically starting the next mission.

- **ACTION:** 결과, 남은 위험, 다음 선택지를 Leo에게 제시하고 기다린다.
- **STOP_OR_CONTINUE:** 자동 시작은 STOP.
- **ROUTE_TO:** Leo.
- **REASON:** 최종 closure와 다음 미션 선택은 Leo의 권한이다.

## 7. SELF-ASSESSMENT

```text
PROJECT_CONTEXT_CONFIDENCE:
LOW
```

REMAINING_BLIND_SPOTS:

- Actual repository branch·HEAD·upstream과 현재 diff
- 보고된 commit·artifact·pointer의 유효성
- Current canonical Founder decision records
- Actor registry, reviewer identity, model, session과 runtime binding
- Foundation·Cosmile·SIASIU의 실제 구현·test·runtime 상태
- Mock과 production-ready 기능의 구분
- Current commercial branch와 release blocker
- External PG·배송·법무·운영 readiness
- Commercial baseline audit의 실제 activation 상태
- Advisor가 사용하는 정확한 local handoff 경로

```text
ROLE_CONFLICTS:
NONE

READINESS_FOR_INDEPENDENT_ROLE_REVIEW:
READY
```
