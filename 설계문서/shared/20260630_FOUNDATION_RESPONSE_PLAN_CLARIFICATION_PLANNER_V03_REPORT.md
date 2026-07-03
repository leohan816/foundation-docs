# Foundation Response Plan + Clarification Planner v0.3 — 2026-06-30

> Foundation-side narrow implementation (dev/shadow HTTP service). 직전 trace diagnostic(`FOUNDATION_RESPONSE_PLAN_MISSING_PRIMARY`) 해소.
> ★**anti-heuristic 준수**: raw query→answer/clarification 하드코딩 0. planner는 normalized structured signal(refined_intent / concern_family / response_mode / risk / permission)로만 분기.
> ★**additive only**: decision_type·safety_gate_result·evidence_mode·intent_type·reason_codes·recommended_products·product_refs **불변**. 신규 필드만 추가 + 신규 mode(explain_first/clarify_concern_axis) 답변 보강.

## scope
- 대상: `foundation_http_service/core.py`(dev/shadow JUDGE). single-turn. multi-turn history payload·Contract v0.3 정식화·LLM composer·memory write·product repo 수정 = **제외**.
- Cosmile/SIASIU/FOUNDATION product repo·contract JSON·canonical md/json = **무수정**.

## changed_files
- `foundation_http_service/core.py` — v0.3 planner additive(중앙 concern taxonomy + intent refinement + response_mode + response_plan + clarification_plan + permission 3필드).
- `scripts/foundation_response_plan_v03_test.py` — **신규** 검증(16 checks).
- `설계자료/20260630_FOUNDATION_RESPONSE_PLAN_CLARIFICATION_PLANNER_V03_REPORT.{md,json}` — 본 report.

## intent_refinement_summary
기존 `intent_type`(불변) 위에 **additive** `refined_intent_type` 도출(structured signal 조합):
`safety_question · adverse_or_sensitivity_signal · greeting · comparison_question · skin_concern_explanation · product_recommendation_request · vague_product_request · clarify_concern_axis · cannot_determine`.
- 핵심: `explain_signal(정규화) + concern_family` → **skin_concern_explanation**(기존엔 hold/skin_concern로 뭉뚱그림). risk=high → safety 우선(설명보다 안전).

## concern_model_summary
중앙 concern taxonomy(★extraction lexicon ↔ response content **분리**):
- `_FAMILY_FROM_CONDITION`: 기존 condition → family 매핑(정규화). `_FAMILY_EXTRA_LEXICON`: condition에 없는 family 신호(**자외선=`sun_exposure_or_uv_concern`** 등) 추출 전용 — 기존 `conditions` 불변.
- family 7종: acne_or_trouble · sun_exposure_or_uv_concern · dryness_or_barrier · hyperpigmentation_or_brightening · redness_or_irritation · sebum_or_pore · anti_aging_or_elasticity.
- `_FAMILY_MODEL[family]`: `{label, explain_intro, explain_points, clarify_intro, clarify_axes, clarify_goal}` — **family key로만 조회**(raw query 분기 아님).

## response_mode_summary
`_response_mode(refined, decision, risk, families)` → `safety_first · explain_first · compare_then_followup · ask_more_first · clarify_concern_axis · recommend_if_allowed · smalltalk_or_greeting`.
★response_mode는 **product recommendation permission을 완화하지 않음**(permission은 기존 decision에서 파생).

## response_plan_schema
`response_plan = { response_mode, opening, explanation_points[], clarification_goal, next_questions[], quick_replies[], safety_notes[], recommendation_policy, answer_style, should_show_products, should_show_purchase_cta, limitations[] }`
- explain_first → opening/explanation_points = family taxonomy + next_questions = 교육 경로 선택(_EDU_PATHS).
- clarify_concern_axis → opening/next_questions/quick_replies = family clarify_axes.
- should_show_products = product_candidate_allowed · should_show_purchase_cta = product_recommendation_allowed.

## clarification_plan_schema
`clarification_plan = { required, reason, ambiguity_type, question_type, next_questions[], quick_replies[], max_questions(=2), product_search_deferred, recommendation_deferred }`
- ambiguity_type: education_path · concern_axis · vague_product · comparison_purpose · safety_followup · none.

## permission (additive — 완화 0)
`retrieval_allowed = (len(query)>=2)` ⊇ `product_candidate_allowed = (decision ∈ {recommend, do_not_recommend})` ⊇ `product_recommendation_allowed = (decision == recommend)`.
불변: candidate_allowed=false ⟹ recommended_products=0 · recommendation_allowed=true ⟹ decision=recommend.

## no_heuristic_assertion
- raw keyword → answer 하드코딩 **없음**(planner는 normalized family key/refined_intent/response_mode로만 분기).
- raw keyword → clarification 하드코딩 **없음**(clarification은 family taxonomy의 clarify_axes에서 family key로 조회).
- response_plan은 structured signal 기반(refined_intent_type·concern_family_tags·risk·permission).
- concern alias/normalization(`_FAMILY_*_LEXICON`)은 **extraction 전용**이며 response content(`_FAMILY_MODEL`)와 분리.
- Cosmile surface heuristic 없음(이번 train Cosmile 무수정).

## before_after_summary (live 8731 재검증)
| input | before(v0.2) | after(v0.3) |
|---|---|---|
| 여드름 피부에 대해서 알고 싶어 | hold · "여드름/트러블 관련해서 조금 더 확인이 필요해요" | **explain_first** · "여드름 피부는 피지, 모공 막힘, 염증… 좁쌀/염증/반복 타입으로 나눠볼 수 있어요" + "원인/스킨케어/성분 주의/제품 추천 중 어떤 쪽?" · 추천 0 |
| 피부가 요즘 자외선 때문에 고민이야 | cannot_determine · "무엇을 도와드릴까요?" | **clarify_concern_axis** · "자외선 때문이면 보통 붉어짐·잡티·건조함 쪽으로 나뉘어요" + "붉어짐/잡티/건조함/선케어 중 어디?" · 추천 0 |
| 제품추천 | ask_more generic | **ask_more_first** · 피부 타입/고민/제형 질문 · 추천 0 |
| 세럼이 좋아 크림이 좋아? | ask_more(비교 설명) | **compare_then_followup** · 비교 설명 유지 + 목적 질문 · 추천 0 |
| 피부가 따끔거려 | do_not_buy/block | **safety_first**(block 불변·추천 0) — over-block은 별도 JUDGE train |
| 미백 제품 추천해줘(후보 동반) | recommend | **recommend_if_allowed** · recommend · REC ⊆ candidates · 위반 0 |
| 뭘 알려줘? | cannot_determine generic | ask_more_first generic — **context payload 없이는 맥락 해결 불가(multi-turn 별도 train)** |

## regression_results
- 기존 v0.2 regression: **40/40 PASS**(backward-compat — decision/safety/intent/products/contamination/safety-stem 전부 유지).
- 신규 v0.3 test: **16/16 PASS**(11 케이스 + permission 불변식 + adverse candidate 추천 0 + superset chain + schema + write/PII durable 0).

## product_recommendation_invariant
- 추천 위반 = **0** · catalog-out = **0**(REC ⊆ candidates) · adverse/safety(candidate 동반 포함) 추천 = **0** · candidate_allowed=false ⟹ products=0 (전 케이스).

## adversarial_verification (워크플로 3-lens 적대 검증, wf_03e7d8a2-c61)
- **safety/permission lens: PASS(0 위반)** — 모든 안전 불변식 intact, high-risk block 보존, v0.3는 plain/clar 텍스트만 override, permission 정확 파생.
- **heuristic lens: FAIL(과도 판정)** — intent_type 기반 dispatch를 위반이라 봤으나, intent_type은 **task가 명시 허용한 structured signal**이고 concern-specific 내용은 family-key dispatch. "모든 답변을 planner로"는 **금지된 Natural Answer Composer 전체 구현** → 실제 위반 아님(deferred composer 항목으로 기록).
- **backward-compat lens: FAIL(실제 핵심 1건 → 수정 완료)** — explain_signal+family이 **products 있는 결정**의 답변을 덮을 수 있다는 지적. **수정:** `_response_mode`가 recommend/do_not_recommend를 explain_first보다 우선 + override에 `not products` 가드. 검증: explain+family+candidates → recommend_if_allowed(product-grounded 답변 보존), pure explain → explain_first 유지, 40/40+16/16 유지.

## no_change_assertions
Cosmile 0 · SIASIU 0 · FOUNDATION product repo 0 · contract JSON 0 · canonical md/json 0 · product data/search/ranking 0 · LLM 연결 0 · memory write 0 · push 0.

## next_train_recommendation
1. **Multi-turn Context Payload v0.3** — Cosmile이 conversation history 전달 + Foundation /v1/consult/judge가 history 수용("뭘 알려줘?" 맥락 follow-up).
2. **Cosmile response_plan renderer** — Foundation이 내려준 response_plan/clarification_plan/quick_replies를 Cosmile이 **렌더만**(heuristic 0).
3. **Contract v0.3 정식화** — response_plan/clarification_plan/permission 3필드를 contract additive로.
4. **JUDGE minor** — 따끔 단독 block→caution(안전 검토 후 별도 승인).
