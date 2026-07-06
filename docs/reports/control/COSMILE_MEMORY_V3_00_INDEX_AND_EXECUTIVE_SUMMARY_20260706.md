# COSMILE MEMORY V3 — Learning Commerce Memory Loop · Design Package Index & Executive Summary

> 작성: foundation-control(Control) · 2026-07-06 · **V3 설계 패키지(11 문서) 인덱스·요약. design-only·구현 0. 구현은 V3-10 최종 통합 review 통과 후 별도 batch(= V3-11 예정·§13).**
> ★Hard Stop 무접촉: prod DB 0 · 실 secret 0 · main merge 0 · live 0 · M6-G activation 0 · 외부 배포 0.

> depends_on: [COSMILE_MEMORY_V3_DATA_DICTIONARY_CANONICAL_20260706 · COSMILE_MEMORY_V3_00_PROBLEM_DEFINITION_20260706 · COSMILE_MEMORY_V3_01_EXISTING_5_MISSION_RECONCILIATION_PLAN_20260706 · COSMILE_MEMORY_V3_02_LEARNING_COMMERCE_MEMORY_CONTRACT_20260706 · COSMILE_MEMORY_V3_03_RECOMMENDATION_EVENT_CONTRACT_20260706 · COSMILE_MEMORY_V3_04_ORDER_REVENUE_FEEDBACK_OUTCOME_CONTRACT_20260706 · COSMILE_MEMORY_V3_05_PRODUCT_INGREDIENT_INTELLIGENCE_MAPPING_20260706 · COSMILE_MEMORY_V3_06_MEMORY_FACT_CANDIDATE_PROMOTION_RULES_20260706 · COSMILE_MEMORY_V3_07_SAFETY_ADVERSE_REACTION_GUARDRAIL_20260706 · COSMILE_MEMORY_V3_08_DB_INTEGRATION_INVARIANT_DESIGN_20260706 · COSMILE_MEMORY_V3_09_ANALYTICS_REPORT_MINIMUM_20260706 · COSMILE_MEMORY_V3_10_PRE_IMPLEMENTATION_REVIEW_PLAN_20260706] · owns: [V3 패키지 index·mission map·구현/review 순서(§13)·open questions 취합] · referenced_by: [COSMILE_MEMORY_V3_00_PROBLEM_DEFINITION_20260706 및 전 V3 형제 문서(패키지 진입점)]

---

## 1. Executive summary
- Memory V1 CLOSED_WITH_LIMITS 위에서 **COSMILE MEMORY V3 — Learning Commerce Memory Loop** 설계 패키지(11 문서·design-only) 작성.
- ★목표: 상담→추천 이유→상품/SKU/성분→view/cart/checkout/order→revenue/margin→만족/부작용/재구매→MemoryFactCandidate→evidence/confidence 승격→다음 추천 개선을 **하나의 learning commerce memory loop**로 연결하는 **계약·설계·검수 가능한 구현 계획**.
- ★일관성 검수 11/11: V1 Option B 상속·Option A 미상속·Foundation validate/gate only·service-local ownership·safety-first·design-only. 실 secret 0·"real DB integration complete" 오표기 0·live/prod 활성 0.

## 2. V3 definition
- 정본 이름: **COSMILE MEMORY V3 — Learning Commerce Memory Loop**.
- 한 문장: "Cosmile 고객의 상담·피부·추천·상품·구매·만족도·부작용·재구매를 하나의 learning commerce memory loop로 연결해, 고객별/계절별/피부변화별/성분반응별 추천을 evidence/confidence 기반으로 점진 정교화한다."
- ★단계 성격: **자동 실행이 아니라 "자동화 가능한 기억/학습 구조"**를 만드는 설계 단계.

## 3. V1 inheritance
- ★상속(정본): Option B service-local subject_ref mint · Foundation validate/gate/reasoning only · minimized request-scoped memory_context(raw 0·durable 0) · PostgreSQL substrate(schema siasiu/cosmile·canonical 8 core·permission isolation) · furef canonical_v2 · prod fail-closed crypto · MemoryFactCandidate→LTM 승격.
- ★**미상속(폐기)**: Option A / FOUNDATION_SUBJECT_REF_SECRET mint · Foundation-side mint/identity-touch.
- ★**V1 정본 provenance (P11)**: Option B 정본 = `FOUNDATION_MEMORY_ARCHITECTURE_V1_M6_F_OPTION_B_SUBJECT_REF_CONTRACT_20260705`(foundation-docs `1e24c33` 도입) · V1 판정 = `FOUNDATION_MEMORY_ARCHITECTURE_V1_M6_FABLE_FINAL_REVIEW_20260706`(**CLOSED_WITH_LIMITS** · L1/L2/COSMILE-4 이월) · M2(`COMMON_SERVICE_MEMORY_CONTRACT_V1_20260704`) identity 절은 Option B로 superseded.
- ★**V1 limit 이월 3종(이름 열거)**: **L1** = M2 정본 계약의 Option A mint 공식 잔존(supersede pointer 패치 대상) · **L2** = M6-G 정의 미확정(ingress-gate vs memory-reuse gate — activation은 Hard Stop) · **COSMILE-4** = Cosmile postgres baseline에 DB-level invariant 3종 미복원(첫 `migrate deploy` 전 필수). → V3 추적 위치: **V3-08**(`COSMILE_MEMORY_V3_08_DB_INTEGRATION_INVARIANT_DESIGN_20260706` — COSMILE-4 복원 계획)·**V3-10**(`COSMILE_MEMORY_V3_10_PRE_IMPLEMENTATION_REVIEW_PLAN_20260706` — L1/L2/COSMILE-4 gate 항목).

## 4. V3 non-goals
- live/prod activation · 자동 추천 실행(auto-execution) · dashboard-first · Foundation durable memory화 · cross-service DB direct reference · 실 DB integration 완료 주장(현재 schema/validate 수준) · 매출 최적화가 safety보다 우선.

## 5. V3 mission map (11 문서 + 어휘 정본 + 예정 2)
| # | 문서 (실제 파일명) | 핵심 |
|---|---|---|
| 어휘 정본 | COSMILE_MEMORY_V3_DATA_DICTIONARY_CANONICAL_20260706 | **유일 어휘/키/enum/threshold 정본** — V3-00~V3-10은 직접 선언하지 않고 사전을 참조(충돌 시 사전이 이김) |
| V3-00 | COSMILE_MEMORY_V3_00_PROBLEM_DEFINITION_20260706 | 문제 정의·V1 close vs V3 open·Cosmile-first·goals/non-goals |
| V3-01 | COSMILE_MEMORY_V3_01_EXISTING_5_MISSION_RECONCILIATION_PLAN_20260706 | 기존 5 미션 read-only 정합 계획·DONE/DONE_WITH_LIMITS/OBSOLETE/NEEDS_V3_PATCH 기준 |
| V3-02 | COSMILE_MEMORY_V3_02_LEARNING_COMMERCE_MEMORY_CONTRACT_20260706 | per-customer 19필드 learning memory 계약 · **memory_context 최소화 계약 소유** |
| V3-03 | COSMILE_MEMORY_V3_03_RECOMMENDATION_EVENT_CONTRACT_20260706 | 추천 이벤트(왜 보였나+이후 결과)·recommendation_id·얕은 상호작용 저장 소유(R-K7) |
| V3-04 | COSMILE_MEMORY_V3_04_ORDER_REVENUE_FEEDBACK_OUTCOME_CONTRACT_20260706 | 주문/매출/피드백 outcome·rec_id→order→feedback join·semantic 추출 계약 |
| V3-05 | COSMILE_MEMORY_V3_05_PRODUCT_INGREDIENT_INTELLIGENCE_MAPPING_20260706 | 제품/성분/민감도/margin_band mapping |
| V3-06 | COSMILE_MEMORY_V3_06_MEMORY_FACT_CANDIDATE_PROMOTION_RULES_20260706 | 후보 생성/evidence/confidence/승격/강등/safety override |
| V3-07 | COSMILE_MEMORY_V3_07_SAFETY_ADVERSE_REACTION_GUARDRAIL_20260706 | 부작용/안전 guardrail·safety-first·의료 단정 금지·AdverseSignalActionMatrix 소유 |
| V3-08 | COSMILE_MEMORY_V3_08_DB_INTEGRATION_INVARIANT_DESIGN_20260706 | Cosmile/SIASIU postgres invariant·SubjectRefMap·zero-orphan·rotation·COSMILE-4 복원 |
| V3-09 | COSMILE_MEMORY_V3_09_ANALYTICS_REPORT_MINIMUM_20260706 | 최소 지표·CLI/Markdown first·dashboard 후속 |
| V3-10 | COSMILE_MEMORY_V3_10_PRE_IMPLEMENTATION_REVIEW_PLAN_20260706 | **각 단계의 gate**(§13) + 최종 통합 pre-implementation review 체크리스트(Ops/Fable) |
| V3-11 | (예정) 구현 batch | V3-10 최종 통합 review 통과 후 별도 batch — 본 패키지는 design-only |
| V3-12 | (예정) post-implementation review | V3-11 구현 후 검수 — V3-10(pre)과 명시 분리 |

## 6. Existing Cosmile 5 mission reconciliation plan
- 대상: COSMILE-CONNECT-UI-SWITCH · COSMILE-EVENT-TRACKING-AUDIT · COSMILE-EVENT-TRACKING-SPEC · COSMILE-ANALYTICS-PIPELINE · COSMILE-FOUNDATION-COMMERCE-LOOP.
- ★목적 = 재구현 아님·**Memory V1 Option B/PostgreSQL substrate와 충돌 여부 read-only 확인**. 분류: DONE / DONE_WITH_LIMITS / OBSOLETE / NEEDS_V3_PATCH. 상세 = V3-01(실제 판정은 후속 read-only batch).

## 7. Proposed contracts
- learning memory(V3-02) · recommendation event(V3-03) · order/revenue/feedback outcome(V3-04) · product/ingredient(V3-05). 공통 축 = **subject_ref(service-local)·recommendation_id 스레딩·raw_text_stored=False·safety_flags**.
- ★키 형식·enum·threshold의 정본은 각 계약 문서가 아니라 **`COSMILE_MEMORY_V3_DATA_DICTIONARY_CANONICAL_20260706`**(§1 키·§2 enum·§3 confidence·§4 window)이다 — 계약 문서는 사전 참조만(중복 선언 금지·충돌 시 사전이 이김).

## 8. DB invariant plan (V3-08)
- Cosmile baseline invariant 3종(identity/lifecycle/isolation 제안) · SubjectRefMap partial unique(local_user_ref_hash, secret_version) · zero-orphan · secret_version/rotation dual-read · sqlite migration 잔존 정리 · **provider-independent test vs DB-touch integration test 분리** · migrate deploy 전 gate · **COSMILE-4 원 3종 복원 계획 포함(§3 V1 limit 이월)**.
- invariant 쿼리의 필드/enum/threshold는 **사전(`COSMILE_MEMORY_V3_DATA_DICTIONARY_CANONICAL_20260706`) §2·§3 참조**로 통일(문서별 자체 선언 금지 — safety fact는 evidence 문턱 강등 예외, 사전 §5.2).

## 9. Safety plan (V3-07)
- ★adverse reaction signal > 추천 · safety block memory > commerce optimization · 의료 단정 금지 · "계속 써도 돼?" safety-first 분리 · Foundation/SIASIU safety 경험을 Cosmile로 · semantic 인식=AI·정책 집행=deterministic gate·safety MAX·fail-closed(adapter가 낮출 수 없음).

## 10. Analytics minimum (V3-09)
- 지표: shown/clicked/CTR/add_to_cart/order_paid/revenue band/margin_band 분포·margin_coverage(구 gross_margin 금액 지표는 superseded — 사전 §6 Option A)/satisfaction/adverse/repurchase/top reason_codes/ingredient response. ★출력 = **CLI/Markdown first**·Slack/dashboard/AI-Analyst 후속·dashboard부터 만들지 않음.

## 11. Review plan (V3-10)
- Ops/Fable 체크리스트: V1 Option B 상속 · Foundation boundary 비침범 · service-local owner 유지 · raw/PII/safety 처리 · recommendation_id→order/feedback 연결성 · DB invariant 충분성 · test meaning · provider-independent vs DB-touch 구분 · live/prod vs dev/shadow/readiness 구분 · **V1 limit 이월 gate(L1·L2 M6-G·COSMILE-4 — §3)**.
- ★역할: V3-10은 최종 1회 검수가 아니라 **각 단계의 gate**로 쓰인다(§13 순서 원칙).

## 12. Open questions for Leo (★결정 필요)
1. **V3-01 정합 판정 순서**: 5 미션 read-only 정합을 다음 batch로 진행할지(권장: 계약 확정 전 정합).
2. **M6-G(A ingress vs B reuse) 정의**: V3 안전/승격 gate와 연결·V1에서 이월된 정의 확정.
3. **anonymous_ref 정책**: 비로그인 추천 이벤트의 subject_ref 부재 시 anonymous_ref 처리(consent 경계) — 정본 초안 = 사전 §1.3 R-K3·§2.10 `identity_stitching_state`(확정 Leo).
4. **satisfaction/adverse feedback 수집 UX 소유**: Cosmile service-local(권장) vs 별도.
5. **margin/revenue 데이터 민감도**: analytics에 margin 포함 범위(내부 전용) — 정본 초안 = 사전 §6 Option A `margin_band`(정확 원가 저장 금지 유지·확정 Leo).
6. **★파라미터 표 확정(사전 §3·§4)**: promotion 문턱(C_min **0.60**·N_min **2**·distinct_signal_source_count ≥ 2) · window(purchase attribution **14d** · repurchase **90d** · candidate stale **180d** · adverse 재평가 **30d**) — 단일 정본 표 = 사전 §3/§4, 초안 수치 확정 = Leo(문서별 개별 수치 선언 금지).

## 13. Recommended implementation sequence (V3-10 = 각 단계의 gate)
- ★**순서 원칙(자기모순 해소·P12)**: V3-10은 다른 단계 뒤에 오는 "마지막 단계"가 아니라 **각 단계의 gate**다. 각 단계의 산출물은 **V3-10 checklist의 해당 절을 통과한 뒤에만** 다음 단계로 진행하고, 전 단계 완료 후 **최종 통합 pre-implementation review**(V3-10 전체)를 거쳐야 구현에 착수한다.
1. **V3-01 실 정합**(read-only·5 미션 분류) → V3-10 gate(해당 절) →
2. **V3-08 DB invariant + provider-independent/DB-touch test 분리**(substrate 실 integration) → V3-10 gate →
3. **V3-02/03/04/05 계약 스키마화**(canonical core + commerce extension·dev/shadow·어휘 = 사전 참조) → V3-10 gate →
4. **V3-06 promotion + V3-07 safety gate**(deterministic·simulation) → V3-10 gate →
5. **V3-09 analytics CLI/Markdown** → V3-10 gate →
6. **최종 통합 pre-implementation review(V3-10 전체·Ops/Fable)** → (통과 시) **구현 batch = V3-11(예정·별도 batch)** → **post-implementation review = V3-12(예정·V3-10 pre-review와 명시 분리)**.
- ★각 단계 dev/shadow·prod/live/main/M6-G activation = Hard Stop(Leo 승인).

## 무결성
V3 설계 패키지(11 문서) index·design-only·구현 0 · V1 Option B 상속(Option A 미상속) · Foundation validate/gate only · service-local ownership · safety-first · Cosmile=schema/validate 수준 · 실 secret 0 · prod 0 · live 0 · **main merge 0** · M6-G activation 0 · 구현은 V3-10 최종 통합 review 통과 후 별도 batch(= V3-11 예정·post-implementation review = V3-12 예정).
