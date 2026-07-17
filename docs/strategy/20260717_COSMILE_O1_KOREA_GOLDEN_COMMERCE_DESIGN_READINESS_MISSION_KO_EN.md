# Cosmile O1 Korea Golden Commerce Design Readiness Mission — KO / EN

```text
MISSION_ID: COSMILE_O1_KOREA_GOLDEN_COMMERCE_DESIGN_READINESS_V1
FROM: foundation-strategy-sol
TO: foundation-advisor
MISSION_TYPE: PLANNING_AND_DESIGN_ONLY
STATUS: AUTHORIZED_FOR_ADVISOR_ADMISSION
COUNCIL_DECISION: NOT_REQUIRED_FOR_CURRENT_PINNED_DIRECTION
IMPLEMENTATION_AUTHORIZED: NO
ADVISOR_IMPLEMENTATION_DISPATCH_AUTHORIZED: NO
NEXT_MISSION_AUTO_START: NO
```

## 전략 기준점 / Strategy pins

```text
FOUNDATION_DOCS_REPOSITORY: leohan816/foundation-docs
STRATEGY_BRANCH: strategy/foundation-cosmile-commercial-baseline-preflight-20260717
STRATEGY_DECISION_COMMIT: d727b4ba733fe4d183b078711db18ebaec1fe359
CORRECTED_DIRECTION_EN: docs/strategy/20260717_COSMILE_O1_GOLDEN_COMMERCE_LOOP_DEVELOPMENT_DIRECTION_EN.md
CORRECTED_DIRECTION_KO: docs/strategy/20260717_COSMILE_O1_GOLDEN_COMMERCE_LOOP_DEVELOPMENT_DIRECTION_KO.md
COUNCIL_FINAL_POINTER: docs/strategy/council-runs/COSMILE_O1_GOLDEN_COMMERCE_LOOP_STRATEGY_COUNCIL_V1/46_FINAL_POINTER.md
COUNCIL_RESULT: 8_PROCEED_WITH_CORRECTIONS
STRATEGIST_FINAL_VERDICT: PROCEED_WITH_CORRECTIONS
```

This file records the exact Strategy mission delivered to `foundation-advisor`. The
Korean and English sections have the same authority. If translation wording appears to
conflict, the machine-readable fields and the stricter no-build/no-live boundary control,
and the Advisor must return the ambiguity to Strategy rather than infer authority.

---

# 한국어 지시문

## 1. 목적과 종료선

Foundation의 실제 상품 정본과 Cosmile의 현재 구현을 read-only로 확인하고,
한국/KRW Golden Commerce Rehearsal을 위한 독립 검수된 implementation-ready 설계와
구현 범위 제안서를 완성한다.

이 미션은 설계와 독립 설계 검수에서 종료한다. 제품 코드 구현, DB 변경, PSP 또는
authentication integration, 실제 또는 sandbox transaction 실행, 다음 미션으로 자동
진행하지 않는다.

```text
MISSION_SCOPE_FREEZE: ACTIVE
IMPLEMENTATION_SCOPE_STATUS: REVIEWED_PROPOSAL_PENDING_LEO_APPROVAL
HARD_STOP_AFTER_REVIEWED_DESIGN: ACTIVE
```

## 2. Founder가 확정한 방향

### 시장

- 장기 목표 시장: 한국 + 미국
- 첫 구현·검증 시장: 한국
- 첫 통화: KRW
- 미국/USD: 후속 확장 제약으로만 고려하며 이번 구현 설계에 포함하지 않음
- 한국만 가능한 구조로 하드코딩하지 않고 국가·통화 확장 경계를 보존

### 상품

- Foundation repository와 knowledge base가 product, brand, ingredient, claim,
  warning, safety 및 provenance의 canonical source다.
- 예상 상품 수는 약 20개이나 실제 경로·수량·정체성·상태를 직접 확인한다.
- 현재 판매 후보는 ELT다.
- 理肤天使 상품은 현재 판매·노출 후보에서 제외한다. 문자열 이름이 아니라 확인된
  canonical brand/product identity를 기준으로 제외한다.
- ELT 판매 후보 전체를 분석한다.
- 첫 Golden Order와 Golden Reversal은 대표 SKU 1개를 사용한다.
- 판매·재고·배송·환불 규칙이 실질적으로 다른 경우에만 boundary SKU 1~2개를 추가
  후보로 제안한다.
- 모든 상품에 동일한 전체 주문·환불 시나리오를 반복하지 않는다.
- 대표·boundary SKU 검증 후 나머지 적합 상품으로 확대하는 명시적 규칙을 작성한다.

### 기존 Cosmile

- 먼저 read-only로 분석한다.
- 재사용 가능한 부분은 우선 유지한다.
- 전면 재작성은 금지한다.
- 승인된 contract나 invariant를 충족하지 못하는 정확한 component에 대해서만 제한적
  교체안을 반환할 수 있다.
- 교체안은 자동 구현 권한이 아니며 Leo의 별도 결정이 필요하다.

### 결제

- 실제 한국 PSP의 공식 sandbox/test environment를 후속 구현 대상으로 설계한다.
- 실제 PSP API, verified webhook, capture 및 captured-payment sandbox refund를 전제로
  한다.
- live API key, 실제 결제, provider 계약, KYC, merchant activation은 금지한다.

### 명시적 제외

- Foundation AI
- SIASIU AI integration
- Memory V3
- retrieval redesign
- recommendation UI
- B2B2C
- influencer 기능
- advanced dashboard
- AI pricing
- AI CRM
- 미국/USD 실제 구현
- Public Launch 기능
- 전체 Cosmile 재작성

## 3. 권한

### 허용

- repository와 승인된 local knowledge source의 read-only 확인
- 현재 공식 provider 자료 조사
- 인증 및 한국 PSP 후보 비교
- Designer 경험 설계
- Cosmile Worker의 repository-boundary 기술 설계
- Foundation Worker의 제한된 snapshot delivery/mapping 설계
- 제한된 contract·invariant·dependency 분석
- 독립 설계 검수
- 제한적 수정과 재검수
- implementation WorkUnit 계획
- 일정·외부 의존성·rollback·stop 설계
- foundation-docs에 문서 commit/push 및 Draft PR 생성

### 금지

- 제품 repository 파일 수정 또는 설계 산출물 저장
- 제품 코드 수정
- schema 적용
- DB write, migration 실행 또는 protected/shared DB 접근
- build, lint, test, smoke, endpoint, runtime 또는 transaction 실행
- authentication 또는 PSP integration 구현
- secret 생성·조회·노출
- 실제 고객 PII 사용
- 실제 결제
- provider 연락·계약·KYC·merchant activation
- production/live activation
- 위험 수용
- 구현 Worker dispatch
- 자동 다음 미션
- PR merge

```text
DESIGN_OUTPUT_STORAGE: foundation-docs shared mission run
COSMILE_REPOSITORY_WRITES: NONE
FOUNDATION_REPOSITORY_WRITES: NONE
PRODUCT_REPOSITORY_CHANGES: NONE
```

## 4. 지휘 경로

```text
foundation-strategy-sol
→ foundation-advisor
→ selected Foundation Team Actors
→ foundation-advisor
→ foundation-strategy-sol
→ Leo
```

Strategy는 subordinate Actor에게 직접 지시하지 않는다. Advisor는 orchestration,
sequencing, evidence validation, collision control, 결과 통합과 targeted final audit을
담당한다. Advisor는 직접 설계·구현하거나 Independent Reviewer를 대체하지 않는다.

Advisor는 dispatch 전에 current Team Operating Model, current role files, repository
binding, session, runtime, model, effort, CWD와 role loading을 live-verify한다. session
이름만으로 binding을 추정하지 않는다. 모델이나 dependency를 임의로 변경하지 않는다.

## 5. 역할

### Foundation Worker — read-only 사실 확인과 제한된 전달 설계

- 실제 ELT product·knowledge source 경로와 evidence pin 확인
- 실제 ELT 상품 수량·identity·version·status 확인
- 理肤天使 제외 확인
- provenance, approval, ingredient, claim, warning, safety coverage 확인
- commercial-use-rights 증거와 미확인 질문 분리
- Foundation product ↔ Cosmile SKU mapping 후보 작성
- 각 상품을 `USABLE | BLOCKED | INCOMPLETE | UNVERIFIED`로 분류
- 초기 product snapshot에 필요한 제한된 Foundation-side delivery, version, correction,
  withdrawal 및 mapping 설계

Foundation Worker는 binding Legal 결론을 내리거나 application-specific commerce
ownership을 Foundation으로 이동하지 않는다.

### Cosmile Worker — read-only 조사와 repository-local 기술 설계

read-only as-built 확인 후 Cosmile repository 경계 안의 non-executable 기술 설계를
소유한다.

조사 범위:

- storefront, routes, services, DB model, migrations, tests, fixtures, mock data,
  admin/operator surface
- component 분류:
  `REUSABLE_UNCHANGED | REUSABLE_WITH_CORRECTION |
  BOUNDED_REPLACEMENT_CANDIDATE | MOCK | PARTIAL | DEAD | UNVERIFIED`
- existing data model, persistent data, migration·compatibility 제약
- 이후 구현의 정확한 repository/file write-ownership 제안

기술 설계 범위:

- repository-local frontend/backend architecture
- API와 service boundary
- order, payment, inventory, shipment, cancellation, refund state model
- DB schema와 migration proposal
- PSP와 authentication adapter boundary
- webhook verification, signature, idempotency, replay, recovery
- implementation WorkUnit
- test strategy와 integration sequence
- rollback, compatibility, migration constraint

교체 후보에는 exact component, evidence, 실패한 contract/invariant, 영향, bounded
alternative, migration consequence, repair가 부족한 이유를 포함한다. 전면 재작성은
제안하지 않는다.

Designer의 experience requirement와 current authoritative boundary 및 Advisor가 통합한
candidate cross-project contract가 입력이다. Cosmile Worker는 제품 경험이나 Foundation
canonical ownership을 재정의하지 않는다. 기술 설계는 Cosmile repository에 저장하지
않고 shared mission run에 저장한다.

### Designer — 경험 설계 owner

- customer journey와 operator journey
- screen, state, action flow
- success, pending, failure, delay, recovery experience
- cancellation, return, refund, support experience
- Golden Order·Golden Reversal demonstration experience
- product-experience 관점의 frontend/backend interaction requirement
- 검수 후 제한된 경험·통합 설계 수정

Designer는 repository-local backend architecture, schema, migration 또는 제품 코드를
소유하거나 구현하지 않는다.

### Control — targeted support only

Control은 primary Designer나 Worker가 아니다. Advisor가 exact material 질문을 지정한
경우에만 다음을 분석한다.

- foundation_product_id ↔ cosmile_sku_id contract
- canonical ownership
- API·data contract
- price, inventory, order, payment, shipment, refund authority
- state invariant
- transaction·compensation boundary
- cross-repository dependency
- Foundation unavailable failure behavior

Control은 전체 경험이나 repository-local implementation design을 대체하거나 구현하지
않는다.

### Independent Reviewer

- 통합 candidate design을 독립 검수
- summary뿐 아니라 관련 actual source evidence 직접 확인
- scope, evidence, ownership, safety, implementability, completion·stop criteria 검수
- blocking/non-blocking finding 분리
- 직접 patch·설계·구현하지 않음
- blocking correction을 필요한 범위에서 재검수

현재 canonical Reviewer protocol의 verdict를 사용하고 다음을 별도 반환한다.

```text
REVIEW_COMPLETE:
BLOCKING_FINDINGS:
NON_BLOCKING_FINDINGS:
IMPLEMENTATION_AUTHORIZED: NO
```

## 6. 실행 단계

### Phase 1 — Read-only Fact Verification

Foundation Worker와 Cosmile Worker는 병렬 조사할 수 있다. exact branch, HEAD, path,
blob 또는 동등 evidence pin을 기록하고 facts, assumptions, unknowns를 분리한다.

### Phase 2 — Reuse and Boundary Assessment

- Foundation product eligibility matrix
- Foundation-to-Cosmile mapping proposal
- Cosmile reuse/repair/replacement/unverified matrix
- system-of-record proposals
- repository write-ownership proposal
- migration/persistent-data constraints
- provider/operating-model research questions

### Phase 3 — Official-source Provider Research

한국에서 사용할 수 있는 authentication provider와 PSP 후보를 현재 공식 자료로 비교한다.
capability, sandbox, capture/refund, webhook/signature/idempotency, currency/payment
method, data location, relevant terms, official pricing, onboarding/eligibility dependency를
기록한다. 각 claim에 official URL, 확인 날짜, 적용 범위와 unknown을 붙인다.

공식 자료는 merchant onboarding 승인을 증명하지 않는다. provider에게 연락하거나
신청하지 않는다.

```text
PSP_STRATEGY_RECOMMENDATION:
OFFICIAL_SOURCE_VERIFIED:
MERCHANT_ELIGIBILITY: VENDOR_CONFIRMATION_REQUIRED
CONTRACT_OR_KYC_COMMITTED: NO
```

### Phase 4 — Designer Experience Design

Designer는 customer/operator journey, screen/state/action, failure/recovery,
cancellation/return/refund/support, demonstration experience와 product-experience 관점의
frontend/backend interaction requirement를 작성한다.

### Phase 5 — Repository-local Technical Design

Cosmile Worker는 Designer requirement와 승인된 경계 입력을 바탕으로 Cosmile repository
경계 안의 기술 설계, DB/migration proposal, API/adapter, commerce state machine,
PSP/webhook/inventory/refund/reconciliation, WorkUnit, test/integration plan을 작성한다.

Foundation Worker는 초기 snapshot에 필요한 제한된 Foundation-side delivery/mapping
설계를 작성한다. 제품 코드를 수정하지 않는다.

### Phase 6 — Targeted Control Support

Control은 Advisor가 지정한 exact cross-project contract, ownership, dependency,
invariant 질문만 답한다.

### Phase 7 — Advisor Integration

Advisor는 Designer 경험 설계, Cosmile Worker 기술 설계, Foundation Worker data finding과
bounded delivery design, targeted Control analysis, official-source research,
implementation scope/evidence requirement를 원 의미를 바꾸지 않고 통합한다.

### Phase 8 — Independent Design Review

Reviewer는 integrated candidate 전체와 관련 source evidence를 독립 검수한다. 설계
검수는 구현 검수가 아니며 어떤 구현 권한도 부여하지 않는다.

### Phase 9 — Bounded Correction and Re-review

- Designer: experience/integrated-design finding
- Foundation Worker: Foundation 사실·delivery/mapping finding
- Cosmile Worker: Cosmile 사실·repository-local technical design finding
- Control: 자신에게 지정된 contract/invariant finding
- Advisor: 원 결과를 대체하지 않고 수정 결과 통합
- Reviewer: blocking correction 재검수

```text
DEFAULT_CORRECTION_ROUNDS: 3
IMPORTANT_MATTER_MAXIMUM_ROUNDS: 5
ROUND_BEYOND_5: REQUIRES_LEO_APPROVAL
```

새 material scope, implementation, risk acceptance 또는 provider commitment가 필요하면
수정에 숨기지 않고 HOLD로 반환한다. artificial consensus나 불필요한 라운드를 만들지
않는다.

### Phase 10 — Final Advisor Closure

Advisor는 blocking finding disposition, evidence pins, reviewed implementation-scope
proposal, Founder/external decision 분리, no-build boundary, zero product/DB change,
implementation 미시작을 확인한다. Strategy에 반환하고 STOP한다.

## 7. 필수 설계 범위

```text
Foundation-backed product
→ Cosmile sellable SKU
→ customer identity
→ authoritative KRW price and sellable state
→ inventory availability/reservation
→ cart
→ checkout
→ Korean PSP sandbox payment
→ verified and idempotent webhook
→ order confirmation
→ inventory transition
→ customer/operator visibility
→ fulfillment/tracking record
→ captured-payment sandbox refund
→ policy-based inventory treatment
→ payment/order/inventory/operator reconciliation
```

화살표는 coverage이며 unsafe transaction order를 미리 고정하지 않는다. last-item
concurrency, payment failure/timeout, duplicate/replayed/out-of-order webhook, payment
success followed by order failure, order success followed by missing/delayed event,
refund success followed by internal failure, operator retry/recovery, restart recovery,
missing-event detection, auditability 및 rollback/compensation/correction/HOLD를 다룬다.

## 8. Foundation–Cosmile 경계

Foundation canonical ownership:

- product identity/content, brand, ingredient, claim, warning, safety, provenance와
  supporting source

Cosmile commercial ownership:

- sellable SKU, price, stock, sales state, customer, cart, order, payment, fulfillment,
  shipment, tracking, cancellation, refund

```text
REQUIRED_BINDING:
foundation_product_id <-> cosmile_sku_id
```

initial delivery, snapshot/version, approval owner, update/correction/supersession/
withdrawal, stale/missing behavior, commercial-use-rights gate, order-line의 exact
product/SKU/price/policy version binding을 설계한다.

Foundation은 catalog availability, cart, checkout, payment, order, fulfillment,
refund의 synchronous runtime dependency가 아니다. Foundation unavailable 상태에서도
ordinary commerce는 계속되어야 한다.

## 9. 필수 산출물

1. Executive Summary and Authority Boundary
2. Facts, Assumptions, and Unknowns Register
3. Foundation Product Eligibility Matrix
4. Cosmile As-Built and Reuse Matrix
5. Representative and Boundary SKU Recommendation
6. Foundation-to-Cosmile Mapping Proposal
7. Designer Experience Design
8. Cosmile Repository-local Technical Design
9. Foundation Bounded Snapshot Delivery Design
10. Frontend/Backend/Operations Separation
11. Exact Repository Write-Ownership Proposal
12. Database and Migration Plan — design only
13. Authentication Design and Provider Options
14. Korean PSP Design and Provider Options
15. Inventory Authority and Reconciliation Design
16. Fulfillment, Tracking, Cancellation, Refund, Support, Incident Operating Model
17. Security and Privacy Invariants
18. Sandbox Acceptance Criteria
    - separate Golden Order
    - separate captured-payment Golden Reversal
    - declared environment
    - `SANDBOX_WALKING_SKELETON_EVIDENCE` ceiling
    - no automatic progression
19. Implementation WorkUnits and safe parallelization
20. Implementation Estimate, confidence, critical path, external calendar dependencies
21. Unresolved Founder Decisions with concise options and recommendation
22. Vendor, Legal, tax/accounting, rights, provider-eligibility confirmations
23. Rollback, HOLD, and Scope-expansion Conditions
24. Independent Design Review Result
25. Reviewed Implementation Scope Proposal — pending Leo approval; non-executable
26. Explicit No-Build Record
27. Final Pointer

## 10. 결과 저장

```text
REPOSITORY: leohan816/foundation-docs
BRANCH: advisor/cosmile-o1-korea-golden-commerce-design-readiness-v1-20260717
OUTPUT_ROOT: runs/shared/COSMILE_O1_KOREA_GOLDEN_COMMERCE_DESIGN_READINESS_V1/
PR: DRAFT_ONLY
MERGE: NO
```

`foundation-docs`는 current role authority가 아니라 evidence/result storage로만 사용한다.

## 11. 조기 반환

routine unknown은 개별 질문하지 않고 최종 패키지로 통합한다. 다음 경우에만 조기
반환한다.

- canonical Foundation source를 확인할 수 없음
- read-only 분석에 금지된 access 필요
- DB write, secret, PII, transaction 또는 provider commitment 필요
- Korea/KRW 또는 O1의 material reversal 필요
- 유일한 credible path가 broad rewrite
- Foundation AI, SIASIU AI, Memory V3 또는 다른 program으로 scope 확대 필요
- meaningful planning 전에 binding Legal/risk decision 필요
- current role authority 또는 repository ownership conflict

## 12. 최종 반환 형식

```text
MISSION_STATUS:
FOUNDATION_PRODUCT_SET_VERIFIED:
ACTUAL_ELT_PRODUCT_COUNT:
FOUNDATION_TO_COSMILE_MAPPING_STATUS:
COSMILE_READ_ONLY_INSPECTION_COMPLETE:
REUSE_MATRIX_COMPLETE:
DESIGNER_EXPERIENCE_DESIGN_COMPLETE:
COSMILE_TECHNICAL_DESIGN_COMPLETE:
FOUNDATION_DELIVERY_DESIGN_COMPLETE:
TARGETED_CONTROL_ANALYSIS_USED:
INDEPENDENT_DESIGN_REVIEW_VERDICT:
REVIEW_COMPLETE:
BLOCKING_FINDINGS:
REVIEWED_IMPLEMENTATION_SCOPE_PROPOSAL:
LEO_SCOPE_FREEZE_REQUIRED: YES
REPRESENTATIVE_SKU:
BOUNDARY_SKUS:
AUTHENTICATION_RECOMMENDATION:
PSP_RECOMMENDATION:
PSP_VENDOR_CONFIRMATION_REQUIRED:
INVENTORY_AUTHORITY_RECOMMENDATION:
FULFILLMENT_RECOMMENDATION:
IMPLEMENTATION_WORKUNITS_READY:
IMPLEMENTATION_ESTIMATE:
UNRESOLVED_FOUNDER_DECISIONS:
EXTERNAL_CONFIRMATIONS_REQUIRED:
SCOPE_EXPANSION_REQUESTED:
PRODUCT_CODE_CHANGED: NO
DATABASE_CHANGED: NO
IMPLEMENTATION_STARTED: NO
ADVISOR_IMPLEMENTATION_DISPATCHED: NO
NEXT_RECOMMENDED_STEP:
HARD_STOP: ACTIVE
STOP
```

---

# English operative instruction

## 1. Objective and terminal boundary

Verify the actual Foundation product sources and current Cosmile implementation
read-only, then produce an independently reviewed, implementation-ready design and
implementation-scope proposal for the Korea/KRW Golden Commerce Rehearsal.

This mission ends after design and independent design review. It must not continue into
product implementation, database change, PSP or authentication integration, any real or
sandbox transaction execution, or a follow-up mission.

```text
MISSION_SCOPE_FREEZE: ACTIVE
IMPLEMENTATION_SCOPE_STATUS: REVIEWED_PROPOSAL_PENDING_LEO_APPROVAL
HARD_STOP_AFTER_REVIEWED_DESIGN: ACTIVE
```

## 2. Founder-confirmed direction

### Markets

- Long-term markets: Korea and the United States.
- First implementation and validation market: Korea.
- First currency: KRW.
- United States/USD is a later expansion constraint, not current design scope.
- Preserve country and currency extension boundaries; do not hard-code an exclusively
  Korean architecture.

### Products

- The Foundation repository and knowledge base are canonical for product, brand,
  ingredient, claim, warning, safety, and provenance information.
- Approximately 20 products are expected; verify exact paths, count, identities, and
  status.
- The current sale-candidate brand is ELT.
- Exclude 理肤天使 products using verified canonical brand/product identity.
- Analyze the complete ELT sale-candidate set.
- Use one representative SKU for the first Golden Order and Golden Reversal.
- Add one or two boundary SKU candidates only for materially different sale, inventory,
  shipment, or refund rules.
- Do not repeat the complete order/refund scenario for every product.
- Define the rule for expanding representative evidence to remaining eligible products.

### Existing Cosmile

- Inspect read-only first and preserve reusable components.
- A full rewrite is prohibited.
- Return a bounded replacement option only for an exact component that fails an approved
  contract or invariant.
- A replacement proposal grants no implementation authority and requires Leo's separate
  decision.

### Payment

- Design for a real Korean PSP official sandbox/test environment.
- Assume real PSP APIs, verified webhook, capture, and captured-payment sandbox refund.
- Live keys, real payment, provider contract, KYC, and merchant activation are prohibited.

### Explicit exclusions

Foundation AI, SIASIU AI integration, Memory V3, retrieval redesign, recommendation UI,
B2B2C, influencer features, advanced dashboard, AI pricing, AI CRM, actual US/USD
implementation, Public Launch features, and a full Cosmile rewrite.

## 3. Authority

Authorized:

- read-only repository and approved local knowledge-source inspection;
- current official-source provider research;
- authentication and Korean PSP option comparison;
- Designer experience design;
- Cosmile Worker repository-boundary technical design;
- Foundation Worker bounded snapshot delivery and mapping design;
- targeted contract, invariant, and dependency analysis;
- independent design review and bounded correction/re-review;
- implementation WorkUnit, estimate, dependency, rollback, and stop planning;
- documentation commit/push to foundation-docs and a Draft PR.

Not authorized:

- writes or design-artifact storage in product repositories;
- product-code modification, schema application, database writes, migration execution,
  or protected/shared database access;
- build, lint, test, smoke, endpoint, runtime, or transaction execution;
- authentication or PSP integration implementation;
- secret creation/access/exposure, real customer PII, or real payment;
- provider contact, contract, KYC, or merchant activation;
- production/live activation, risk acceptance, implementation Worker dispatch,
  automatic next mission, or PR merge.

```text
DESIGN_OUTPUT_STORAGE: foundation-docs shared mission run
COSMILE_REPOSITORY_WRITES: NONE
FOUNDATION_REPOSITORY_WRITES: NONE
PRODUCT_REPOSITORY_CHANGES: NONE
```

## 4. Command path and admission

```text
foundation-strategy-sol
→ foundation-advisor
→ selected Foundation Team Actors
→ foundation-advisor
→ foundation-strategy-sol
→ Leo
```

Strategy does not dispatch subordinate Actors. The Advisor owns orchestration,
sequencing, evidence validation, collision control, integration, and targeted final
audit. The Advisor must not design, implement, or replace the Independent Reviewer.

Before dispatch, the Advisor live-verifies the current operating model, role files,
repository binding, session, runtime, model, effort, CWD, and role loading. Session names
are not binding evidence. Do not change approved models or install dependencies.

## 5. Role assignments

### Foundation Worker — read-only facts and bounded delivery design

- Verify exact ELT source paths, evidence pins, count, identity, version, and status.
- Verify the 理肤天使 exclusion.
- Inspect provenance, approval, ingredient, claim, warning, and safety coverage.
- Separate commercial-use-rights evidence from unresolved questions.
- Propose Foundation-product-to-Cosmile-SKU mapping.
- Classify each product `USABLE | BLOCKED | INCOMPLETE | UNVERIFIED`.
- Design only the bounded initial snapshot delivery, version, correction, withdrawal,
  and mapping needed on the Foundation side.

The Foundation Worker must not make binding Legal conclusions or move application-level
commerce ownership into Foundation.

### Cosmile Worker — read-only inspection and repository-local technical design

After read-only inspection, the Cosmile Worker owns the non-executable technical design
within the Cosmile repository boundary.

Inspection includes storefront, routes, services, database model, migrations, tests,
fixtures, mocks, admin/operator surfaces, persistent-data constraints, and later exact
write-ownership. Classify components as `REUSABLE_UNCHANGED |
REUSABLE_WITH_CORRECTION | BOUNDED_REPLACEMENT_CANDIDATE | MOCK | PARTIAL | DEAD |
UNVERIFIED`.

The Worker proposes:

- repository-local frontend/backend architecture;
- API and service boundaries;
- order, payment, inventory, shipment, cancellation, and refund state models;
- database schema and migration proposal;
- PSP and authentication adapter boundaries;
- webhook verification, signature, idempotency, replay, and recovery design;
- repository/file-level write ownership;
- implementation WorkUnits, test strategy, integration sequence;
- rollback, compatibility, and migration constraints.

Every replacement candidate names the exact component, evidence, failed contract or
invariant, impact, bounded alternative, migration consequence, and why repair is
insufficient. No general rewrite proposal is permitted.

Designer experience requirements and current authoritative boundaries plus the
Advisor-integrated candidate cross-project contracts are inputs. The Cosmile Worker must
not redefine product experience or Foundation canonical ownership. Store the technical
design in the shared mission run, not the Cosmile repository.

### Designer — experience-design owner

The Designer produces customer and operator journeys; screen, state, and action flow;
success, pending, failure, delay, and recovery experience; cancellation, return, refund,
and support experience; Golden Order/Reversal demonstration experience; and
product-experience frontend/backend interaction requirements. The Designer does not own
repository-local backend architecture, schema/migration, or product implementation.

### Control — targeted support only

Control is neither primary Designer nor Worker. Only on exact Advisor request, Control
addresses Foundation-product/SKU contracts, canonical ownership, API/data contracts,
commerce state authority, invariants, transaction/compensation boundaries,
cross-repository dependencies, and Foundation-unavailability behavior. Control does not
replace experience or repository-local technical design and does not implement.

### Independent Reviewer

The Reviewer independently examines the complete integrated candidate and relevant
actual source evidence; verifies scope, evidence, ownership, safety, implementability,
completion and stop criteria; separates blocking and non-blocking findings; makes no
patch; and re-verifies blocking corrections where required.

Use the current canonical Reviewer verdict protocol and separately report:

```text
REVIEW_COMPLETE:
BLOCKING_FINDINGS:
NON_BLOCKING_FINDINGS:
IMPLEMENTATION_AUTHORIZED: NO
```

## 6. Execution phases

1. **Read-only Fact Verification:** Foundation and Cosmile investigations may run in
   parallel. Pin branch/HEAD/path/blob or equivalent evidence and separate facts,
   assumptions, and unknowns.
2. **Reuse and Boundary Assessment:** produce Foundation eligibility and mapping,
   Cosmile reuse matrix, system-of-record and write-ownership proposals, migration/data
   constraints, and provider/operating questions.
3. **Official-source Provider Research:** compare Korean authentication and PSP options
   using current official sources, dated URLs, applicability, and unknowns. Official
   sources do not prove merchant approval; no provider contact or application occurs.
4. **Designer Experience Design:** customer/operator journey, screen/state/action,
   failure/recovery, cancellation/return/refund/support, demonstration experience, and
   experience-level frontend/backend requirements.
5. **Repository-local Technical Design:** Cosmile Worker produces the repository-boundary
   technical design; Foundation Worker produces any bounded initial snapshot
   delivery/mapping design. No product code changes.
6. **Targeted Control Support:** only exact cross-project contract, ownership,
   dependency, and invariant questions requested by the Advisor.
7. **Advisor Integration:** integrate, without replacing, Designer, Worker, Control,
   research, implementation-scope, and evidence outputs.
8. **Independent Design Review:** review the integrated candidate and source evidence;
   no implementation authority follows.
9. **Bounded Correction and Re-review:** each original owner corrects only its findings;
   Advisor integrates; Reviewer re-verifies blockers.
10. **Final Advisor Closure:** verify findings, evidence pins, reviewed scope proposal,
    unresolved decisions, no-build boundary, zero product/DB changes, and no
    implementation; return to Strategy and STOP.

```text
DEFAULT_CORRECTION_ROUNDS: 3
IMPORTANT_MATTER_MAXIMUM_ROUNDS: 5
ROUND_BEYOND_5: REQUIRES_LEO_APPROVAL
```

Do not create artificial rounds. Return HOLD rather than conceal material new scope,
implementation, risk acceptance, or provider commitment as a correction.

## 7. Required design coverage

```text
Foundation-backed product
→ Cosmile sellable SKU
→ customer identity
→ authoritative KRW price and sellable state
→ inventory availability/reservation
→ cart and checkout
→ Korean PSP sandbox payment
→ verified and idempotent webhook
→ order confirmation and inventory transition
→ customer/operator visibility
→ fulfillment/tracking record
→ captured-payment sandbox refund
→ policy-based inventory treatment
→ payment/order/inventory/operator reconciliation
```

The arrows define coverage, not a fixed unsafe transaction order. Address last-item
concurrency; payment failure/timeout; duplicate, replayed, and out-of-order webhooks;
payment success/internal order failure; order success/missing or delayed event; refund
success/internal update failure; operator retry/recovery; restart recovery; missing-event
detection; auditability; and rollback/compensation/correction/HOLD behavior.

## 8. Foundation–Cosmile boundary

Foundation owns canonical product identity/content, brand, ingredient, claim, warning,
safety, provenance, and supporting sources. Cosmile owns sellable SKU, price, stock,
sales state, customer, cart, order, payment, fulfillment, shipment, tracking,
cancellation, and refund.

```text
REQUIRED_BINDING:
foundation_product_id <-> cosmile_sku_id
```

Design initial delivery; snapshot/version; approval owner; update, correction,
supersession, withdrawal; stale/missing behavior; commercial-use-rights gate; and exact
order-line product/SKU/price/policy version binding.

Foundation must not synchronously gate catalog availability, cart, checkout, payment,
order, fulfillment, or refund. Ordinary commerce continues when Foundation is
unavailable.

## 9. Required outputs

1. Executive Summary and Authority Boundary
2. Facts, Assumptions, and Unknowns Register
3. Foundation Product Eligibility Matrix
4. Cosmile As-Built and Reuse Matrix
5. Representative and Boundary SKU Recommendation
6. Foundation-to-Cosmile Mapping Proposal
7. Designer Experience Design
8. Cosmile Repository-local Technical Design
9. Foundation Bounded Snapshot Delivery Design
10. Frontend/Backend/Operations Separation
11. Exact Repository Write-Ownership Proposal
12. Database and Migration Plan — design only
13. Authentication Design and Provider Options
14. Korean PSP Design and Provider Options
15. Inventory Authority and Reconciliation Design
16. Fulfillment, Tracking, Cancellation, Refund, Support, Incident Operating Model
17. Security and Privacy Invariants
18. Sandbox Acceptance Criteria: separate Golden Order and captured-refund Golden
    Reversal, declared environment, `SANDBOX_WALKING_SKELETON_EVIDENCE` ceiling, and no
    automatic progression
19. Implementation WorkUnits and safe parallelization
20. Implementation Estimate, confidence, critical path, and external calendar dependencies
21. Unresolved Founder Decisions with concise options and recommendation
22. Vendor, Legal, tax/accounting, rights, and provider-eligibility confirmations
23. Rollback, HOLD, and Scope-expansion Conditions
24. Independent Design Review Result
25. Reviewed Implementation Scope Proposal — pending Leo approval; non-executable
26. Explicit No-Build Record
27. Final Pointer

## 10. GitHub output

```text
REPOSITORY: leohan816/foundation-docs
BRANCH: advisor/cosmile-o1-korea-golden-commerce-design-readiness-v1-20260717
OUTPUT_ROOT: runs/shared/COSMILE_O1_KOREA_GOLDEN_COMMERCE_DESIGN_READINESS_V1/
PR: DRAFT_ONLY
MERGE: NO
```

`foundation-docs` is evidence/result storage, not current role authority.

## 11. Early return

Consolidate routine unknowns in the final package. Return early only when canonical
Foundation sources cannot be verified; read-only analysis needs prohibited access; DB
writes, secrets, PII, transaction, or provider commitment are required; Korea/KRW or O1
requires material reversal; the only credible path is broad rewrite; scope must expand
into Foundation AI, SIASIU AI, Memory V3, or another program; a binding Legal/risk
decision is required before meaningful planning; or current role/repository ownership
conflicts.

## 12. Final return

```text
MISSION_STATUS:
FOUNDATION_PRODUCT_SET_VERIFIED:
ACTUAL_ELT_PRODUCT_COUNT:
FOUNDATION_TO_COSMILE_MAPPING_STATUS:
COSMILE_READ_ONLY_INSPECTION_COMPLETE:
REUSE_MATRIX_COMPLETE:
DESIGNER_EXPERIENCE_DESIGN_COMPLETE:
COSMILE_TECHNICAL_DESIGN_COMPLETE:
FOUNDATION_DELIVERY_DESIGN_COMPLETE:
TARGETED_CONTROL_ANALYSIS_USED:
INDEPENDENT_DESIGN_REVIEW_VERDICT:
REVIEW_COMPLETE:
BLOCKING_FINDINGS:
REVIEWED_IMPLEMENTATION_SCOPE_PROPOSAL:
LEO_SCOPE_FREEZE_REQUIRED: YES
REPRESENTATIVE_SKU:
BOUNDARY_SKUS:
AUTHENTICATION_RECOMMENDATION:
PSP_RECOMMENDATION:
PSP_VENDOR_CONFIRMATION_REQUIRED:
INVENTORY_AUTHORITY_RECOMMENDATION:
FULFILLMENT_RECOMMENDATION:
IMPLEMENTATION_WORKUNITS_READY:
IMPLEMENTATION_ESTIMATE:
UNRESOLVED_FOUNDER_DECISIONS:
EXTERNAL_CONFIRMATIONS_REQUIRED:
SCOPE_EXPANSION_REQUESTED:
PRODUCT_CODE_CHANGED: NO
DATABASE_CHANGED: NO
IMPLEMENTATION_STARTED: NO
ADVISOR_IMPLEMENTATION_DISPATCHED: NO
NEXT_RECOMMENDED_STEP:
HARD_STOP: ACTIVE
STOP
```
