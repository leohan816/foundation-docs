# COSMILE MEMORY V3 — Learning Commerce Memory Loop · Design Package Index & Executive Summary

> 작성: foundation-control(Control) · 2026-07-06 · **V3 설계 패키지(11 문서) 인덱스·요약. design-only·구현 0. 구현은 pre-implementation review(V3-10) 이후 별도 batch.**
> ★Hard Stop 무접촉: prod DB 0 · 실 secret 0 · main merge 0 · live 0 · M6-G activation 0 · 외부 배포 0.

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

## 4. V3 non-goals
- live/prod activation · 자동 추천 실행(auto-execution) · dashboard-first · Foundation durable memory화 · cross-service DB direct reference · 실 DB integration 완료 주장(현재 schema/validate 수준) · 매출 최적화가 safety보다 우선.

## 5. V3 mission map (11 문서)
| # | 문서 | 핵심 |
|---|---|---|
| V3-00 | PROBLEM_DEFINITION | 문제 정의·V1 close vs V3 open·Cosmile-first·goals/non-goals |
| V3-01 | EXISTING_5_MISSION_RECONCILIATION_PLAN | 기존 5 미션 read-only 정합 계획·DONE/DONE_WITH_LIMITS/OBSOLETE/NEEDS_V3_PATCH 기준 |
| V3-02 | LEARNING_COMMERCE_MEMORY_CONTRACT | per-customer 19필드 learning memory 계약 |
| V3-03 | RECOMMENDATION_EVENT_CONTRACT | 추천 이벤트(왜 보였나+이후 결과)·recommendation_id |
| V3-04 | ORDER_REVENUE_FEEDBACK_OUTCOME_CONTRACT | 주문/매출/피드백 outcome·rec_id→order→feedback join |
| V3-05 | PRODUCT_INGREDIENT_INTELLIGENCE_MAPPING | 제품/성분/민감도/마진 mapping |
| V3-06 | MEMORY_FACT_CANDIDATE_PROMOTION_RULES | 후보 생성/evidence/confidence/승격/강등/safety override |
| V3-07 | SAFETY_ADVERSE_REACTION_GUARDRAIL | 부작용/안전 guardrail·safety-first·의료 단정 금지 |
| V3-08 | DB_INTEGRATION_INVARIANT_DESIGN | Cosmile/SIASIU postgres invariant·SubjectRefMap·zero-orphan·rotation |
| V3-09 | ANALYTICS_REPORT_MINIMUM | 최소 지표·CLI/Markdown first·dashboard 후속 |
| V3-10 | PRE_IMPLEMENTATION_REVIEW_PLAN | 구현 전 Ops/Fable 검수 체크리스트 |

## 6. Existing Cosmile 5 mission reconciliation plan
- 대상: COSMILE-CONNECT-UI-SWITCH · COSMILE-EVENT-TRACKING-AUDIT · COSMILE-EVENT-TRACKING-SPEC · COSMILE-ANALYTICS-PIPELINE · COSMILE-FOUNDATION-COMMERCE-LOOP.
- ★목적 = 재구현 아님·**Memory V1 Option B/PostgreSQL substrate와 충돌 여부 read-only 확인**. 분류: DONE / DONE_WITH_LIMITS / OBSOLETE / NEEDS_V3_PATCH. 상세 = V3-01(실제 판정은 후속 read-only batch).

## 7. Proposed contracts
- learning memory(V3-02) · recommendation event(V3-03) · order/revenue/feedback outcome(V3-04) · product/ingredient(V3-05). 공통 축 = **subject_ref(service-local)·recommendation_id 스레딩·raw_text_stored=False·safety_flags**.

## 8. DB invariant plan (V3-08)
- Cosmile baseline invariant 3종(identity/lifecycle/isolation 제안) · SubjectRefMap partial unique(local_user_ref_hash, secret_version) · zero-orphan · secret_version/rotation dual-read · sqlite migration 잔존 정리 · **provider-independent test vs DB-touch integration test 분리** · migrate deploy 전 gate.

## 9. Safety plan (V3-07)
- ★adverse reaction signal > 추천 · safety block memory > commerce optimization · 의료 단정 금지 · "계속 써도 돼?" safety-first 분리 · Foundation/SIASIU safety 경험을 Cosmile로 · semantic 인식=AI·정책 집행=deterministic gate·safety MAX·fail-closed(adapter가 낮출 수 없음).

## 10. Analytics minimum (V3-09)
- 지표: shown/clicked/CTR/add_to_cart/order_paid/revenue/gross_margin/satisfaction/adverse/repurchase/top reason_codes/ingredient response. ★출력 = **CLI/Markdown first**·Slack/dashboard/AI-Analyst 후속·dashboard부터 만들지 않음.

## 11. Review plan (V3-10)
- Ops/Fable 구현 전 체크리스트: V1 Option B 상속 · Foundation boundary 비침범 · service-local owner 유지 · raw/PII/safety 처리 · recommendation_id→order/feedback 연결성 · DB invariant 충분성 · test meaning · provider-independent vs DB-touch 구분 · live/prod vs dev/shadow/readiness 구분.

## 12. Open questions for Leo (★결정 필요)
1. **V3-01 정합 판정 순서**: 5 미션 read-only 정합을 다음 batch로 진행할지(권장: 계약 확정 전 정합).
2. **M6-G(A ingress vs B reuse) 정의**: V3 안전/승격 gate와 연결·V1에서 이월된 정의 확정.
3. **anonymous_ref 정책**: 비로그인 추천 이벤트의 subject_ref 부재 시 anonymous_ref 처리(consent 경계).
4. **satisfaction/adverse feedback 수집 UX 소유**: Cosmile service-local(권장) vs 별도.
5. **margin/revenue 데이터 민감도**: analytics에 margin 포함 범위(내부 전용).

## 13. Recommended implementation sequence
1. **V3-01 실 정합**(read-only·5 미션 분류) →
2. **V3-08 DB invariant + provider-independent/DB-touch test 분리**(substrate 실 integration) →
3. **V3-02/03/04/05 계약 스키마화**(canonical core + commerce extension·dev/shadow) →
4. **V3-06 promotion + V3-07 safety gate**(deterministic·simulation) →
5. **V3-09 analytics CLI/Markdown** →
6. **V3-10 Ops/Fable pre-implementation review** → (통과 시) 구현 batch.
- ★각 단계 dev/shadow·prod/live/main/M6-G activation = Hard Stop(Leo 승인).

## 무결성
V3 설계 패키지(11 문서) index·design-only·구현 0 · V1 Option B 상속(Option A 미상속) · Foundation validate/gate only · service-local ownership · safety-first · Cosmile=schema/validate 수준 · 실 secret 0 · prod 0 · live 0 · **main merge 0** · M6-G activation 0 · 구현은 V3-10 review 후 별도 batch.
