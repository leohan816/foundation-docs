# Foundation Candidate Override Guard v0.3.1 — 2026-06-30

> Foundation-side **central decision-integrity gate**. Cosmile이 모든 query에 `catalog_candidates`를 주입해도, candidate presence가 intent/safety/response_mode/permission을 recommend로 뒤집지 못하게 한다.
> 불변식: **intent → safety → response_mode → permission → candidates.** candidates는 추천이 이미 허용된 뒤에만 쓰는 자료다.
> ★structured signal 기반 단일 gate(케이스별 if 0) · Cosmile/SIASIU/FOUNDATION repo/contract/canonical/product 무수정.

## changed_files
- `foundation_http_service/core.py` — `_product_request_signal` · `_refine_intent` skin_concern split · `_GUARD_BLOCK_REFINED`(8종) · judge() **Candidate Override Guard**(decision chain 직후·enrich 직전 단일 지점).
- `scripts/foundation_candidate_override_guard_v031_test.py` — 신규(19 checks).
- `scripts/foundation_candidate_override_adversarial_test.py` — 신규 **180 사람-질문 회귀**(candidates absent/present).
- `scripts/foundation_http_service_test.py` — **1건 갱신**(`v02_concern_recommend` → `v02_concern_clarify_not_recommend`, ★decision integrity. 총 40 유지·삭제 0).
- 본 report md/json.

## guard 구현 (단일 central gate — 케이스별 if 아님)
judge()에서 v0.2 decision(dt) 산출 → structured signal로 `refined_intent` 계산 → **단일 guard**:
```
if dt ∈ {recommend, do_not_recommend} and refined_intent ∈ _GUARD_BLOCK_REFINED:
    dt = hold/ask_more · 제품 0 · planner intent(explain/clarify/ask_more) 유지
```
- `_GUARD_BLOCK_REFINED = {skin_concern_explanation, education_request, comparison_question, greeting, safety_question, adverse_or_sensitivity_signal, vague_product_request, clarify_concern_axis, cannot_determine}`.
- **오직 `product_recommendation_request`(명시 제품/추천 신호)만 candidate 기반 recommend.** `product_recommendation_request` = `category_product_request` 또는 `skin_concern_consultation + _product_request_signal`(_BROAD/_PURCHASE/_TOPPICK/category — 기존 intent lexicon).
- safety(risk high)는 guard 이전에 이미 block(do_not_buy) — guard는 안전을 **완화하지 않고 보수화만** 한다.

## structured_signal_policy / no_heuristic_assertion
- raw keyword → recommend allow/block **없음** · raw keyword → candidate gating **없음**.
- guard 판단 = `refined_intent_type ∈ 구조화 집합` + decision_type + risk (단일 gate).
- `_product_request_signal`은 기존 intent lexicon만 사용 — 새 raw keyword rule 아님(intent 분류의 일부).
- concern lexicon(`_FAMILY_*`)은 extraction 전용, recommend 결정과 분리. Cosmile heuristic 0(Cosmile 무수정).

## before_after (candidates 주입 시)
| input | before(v0.3.0) | after(v0.3.1) |
|---|---|---|
| 피부 장벽이 뭔지 알려줘 + cand | recommend·제품>0 | **explain_first · 제품0** |
| 여드름 피부에 대해서 알고 싶어 + cand | recommend 가능 | **explain_first · 제품0** |
| 잡티가 신경 쓰여 / 피부가 건조해 + cand | recommend(v0.2) | **clarify_concern_axis · 제품0**(decision integrity) |
| 세럼이 좋아 크림이 좋아? + cand | ask_more | compare_then_followup · 제품0 |
| 안녕 / 따끔 / 임신 레티놀 + cand | (각) greeting/safety · 제품0 | 불변 |
| 미백/잡티 케어/장벽 크림 추천해줘 + cand | recommend | **recommend 유지 · REC⊆candidates** |

★`v02_concern_recommend`("피부가 건조해"→recommend)는 새 원칙(candidate가 concern을 recommend로 못 바꿈)에 따라 **clarify로 의도적 변경**. 약화 아님 — concern 감지(dryness)는 유지, decision integrity 강화.

## regression_results
- 기존 v0.2: **40/40 PASS**(1건 의도적 갱신 포함, 총 40 유지·삭제 0).
- v0.3 planner: **16/16 PASS** · guard: **19/19 PASS** · **adversarial 180: guard_critical_pass=True**.

## adversarial 180 human-query (candidates absent/present)
| metric | 값 |
|---|---|
| total_human_query_tests | **180** |
| candidates_absent_pass_count | 180 |
| candidates_present_pass_count | 174 |
| candidate_override_blocked_count | 151 |
| **candidate_override_flip_violations** | **0** |
| **false_recommendation_count**(blocked-intent recommend) | **0** |
| **safety_critical_violation_count** | **0** |
| education_with_candidates_recommend | 1*(상위 계층) |
| comparison_with_candidates_recommend | 1*(상위 계층) |
| safety_with_candidates_recommend | **0** |
| vague_with_candidates_recommend | **0** |
| clear_recommendation_survival_count | 11/15 |
| catalog_out_count | **0** |
| permission_invariant_violations | **0** |
| recommendation_permission_invariant_violations | **0** |
| **decision_integrity_pass_rate** | **1.0** |
| intent_classification_gap_count | 6 (별도 계층) |
| M_judge_risk_detection_gap_count | 1 (따가) |

## Critical Assertions (1–15)
1~7. Candidates가 product intent 생성/education/safety/comparison/clarify_concern_axis/greeting/vague를 override **불가** → ✅(false_recommendation 0).
8~10. Recommendation은 명시·충분 product intent + safety clear + permission 필요 → ✅(product_recommendation_request만 recommend).
11~12. REC ⊆ candidates · catalog-out 0 → ✅. 13. raw keyword allow/block 없음 → ✅. 14. Cosmile heuristic 없음 → ✅. 15. case-rich test(180)·principle-based 구현(단일 gate) → ✅.

## 남은 6건 — candidate override 아님(상위 intent/category/risk 계층)
| 케이스 | 원인 계층 |
|---|---|
| 토너는 꼭 써야 해? · 세럼은 언제 발라? · 토너 다음에 뭐 발라? · 크림은 꼭 발라야 해? | 카테고리어(토너/세럼/크림) 포함 사용/루틴 질문 → `category_product_request`로 분류 |
| 앰플이랑 세럼 중 뭐가 더 좋아? | 앰플·세럼 동일 serum 매핑 + "뭐가 더 좋아" _COMPARE 미스 → 비교 미감지 |
| 따가워도 효과 좋은 거 추천해줘 | "따가" risk 미감지(low) → product request로 통과 |
→ 전부 **intent/category/risk 분류 계층** 문제. guard(candidate-override)는 정상(이들은 candidate 때문이 아니라 분류 때문에 recommend). 또한 `선크림⊃크림` substring으로 선크림 추천이 비교 오분류되어 false_block(2건) — 같은 계층.

## 결론 (5-part)
1. **케이스별 테스트 결과**: 40/40 · 16/16 · 19/19 · 180(guard_critical_pass=True). education/comparison 각 1 + routine 3 + 따가 1 = 6 recommend는 상위 계층.
2. **근본 원칙 준수**: ✅ intent→safety→response_mode→permission→candidates. candidates가 비-제품 intent를 recommend로 뒤집은 사례 **0**.
3. **새 if문으로 해결?**: ❌ 아니오. 단일 `_GUARD_BLOCK_REFINED` gate + structured `_refine_intent`. 케이스별 분기 0.
4. **final decision gate가 모든 케이스에 적용?**: ✅ judge()의 단일 지점에서 180케이스 전부 일관 적용(decision_integrity_pass_rate=1.0).
5. **남은 문제는 candidate override가 아니라 다른 계층?**: ✅ **그렇다.** 잔여 6건은 전부 **intent/category/risk 분류 계층**(토너/세럼/크림 카테고리어·앰플=세럼 비교 미스·따가 risk 미감지·선크림⊃크림 substring) — candidate-override guard와 무관. 다음 train(JUDGE intent/category/risk 정밀화)에서 다룬다.

## no_change_assertions
Cosmile 0 · SIASIU 0 · FOUNDATION repo 0 · contract 0 · canonical 0 · product catalog/search/ranking 0 · LLM 0 · memory write 0 · push 0.

## next_train_recommendation
1. **JUDGE intent/category/risk 정밀화**(별도): 사용/루틴/necessity 질문(category어 포함)을 product request에서 분리 · 동일 category 비교 감지(앰플 vs 세럼) · `_categories_in` substring(선크림⊃크림) 보정 · "따가/빨개" caution 감지. ★structured, 케이스별 if 아님.
2. **Cosmile response_plan renderer + mapper passthrough**.
3. **Multi-turn Context Payload**.
