# Foundation Human-like Baseline Probe — Read-only Diagnostic — 2026-06-30

> ★read-only 측정 train. **코드/canonical/contract/product repo 수정 0.** gap을 고치지 않고 **측정만** 한다.
> 기준: canonical `209d106`의 16 baseline expectation + 추가 관찰 케이스 #17 "피부가 따끔거려". 대상: Foundation v0.2(`6caa3b5`, service `8731`) raw + Cosmile surface(`/api/slice/consult`).

## service / 범위
- service `http://127.0.0.1:8731` (dev_shadow, api_live=false) · HEAD `209d106`.
- probe endpoint: Foundation `POST /v1/consult/judge`(raw, candidate 無) · Cosmile `POST /api/slice/consult`(실 surface). 총 **17 케이스**(16 + 따끔).

## A. Core judgment match (요약)
| # | input | expected intent | actual intent | intent | expected risk | actual risk/decision | risk | P(추천허용) | rec n | 결과 |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | 안녕 | greeting | greeting | ✅ | none | ask_more/pass | ✅ | false | 0 | **PASS** |
| 2 | 하이 | greeting | greeting | ✅ | none | ask_more/pass | ✅ | false | 0 | **PASS** |
| 3 | 제품추천 | vague_product | broad_product_recommendation | ✅ | none | ask_more/pass | ✅ | false | 0 | **PASS** |
| 4 | 뭐 사야 돼? | vague_product | unclear_shopping_guidance | ≈ | none | ask_more/pass | ✅ | false | 0 | **PASS** |
| 5 | 뭘 사야 할지 모르겠어 | unclear | unclear_shopping_guidance | ✅ | none | ask_more/pass | ✅ | false | 0 | **PASS** |
| 6 | 세럼이 좋아 크림이 좋아? | comparison | product_type_comparison | ✅ | none | ask_more/pass | ✅ | false | 0 | **PASS** |
| 7 | 피부가 건조하고 따가워 | skin_concern | skin_concern_consultation | ✅ | low/caution | recommend/pass(+caution note) | ✅ | conditional_true | **4** | **PASS** |
| 8 | 바르고…붉게…화끈거려 | adverse | safety_risk_consultation | ✅ | block | do_not_buy/block | ✅ | false | 0 | **PASS(judgment)** |
| 9 | 두드러기가 올라왔어 | adverse | safety_risk_consultation | ✅ | block | do_not_buy/block | ✅ | false | 0 | **PASS(judgment)** |
| 10 | 임신…레티놀 써도 돼? | contraindication | contraindication_check | ✅ | block | do_not_buy/block | ✅ | false | 0 | **PASS(judgment)** |
| 11 | 미백 제품 추천해줘 | product_concern | skin_concern_consultation | ≈ | none_or_low | recommend/pass | ✅ | conditional_true | **4** | **PASS** |
| 12 | 민감성 피부인데 뭐 써야 돼? | skin_concern(민감=med) | skin_concern_consultation | ✅ | caution | do_not_recommend/caution | ✅ | conditional(신중) | 0 | **PARTIAL**(추천 대신 차단) |
| 13 | ㅍ부가 ㄱ조하고 따가워 | skin_concern(typo) | skin_concern_consultation | ✅ | low/caution | ask_more/pass(raw) · recommend(surface) | ≈ | conditional | 0~4 | **PARTIAL**(typo 부분복원) |
| 14 | 하나만 추천해줘 | top_pick | top_pick_request | ✅ | none | ask_more/pass | ✅ | false | 0 | **PASS** |
| 15 | 잘 모르겠어 | unclear | unclear_shopping_guidance | ✅ | none | ask_more/pass | ✅ | false | 0 | **PASS** |
| 16 | 남자도 써도 돼? | usage_suitability | cannot_determine | ❌ | none_or_low | ask_more/pass | ≈ | false | 0 | **PARTIAL**(적합성 미세분) |
| 17 | 피부가 따끔거려 | mild_adverse/sensitivity | safety_risk_consultation | ≈ | caution_or_strong_caution | **do_not_buy/block** | ⚠️ | false | 0 | **PARTIAL**(과한 block) |

**Core judgment 집계:** intent match ~15/17(16 ❌·11/4 ≈) · risk match ~14/17(17 over-block·12 차단) · **product_recommendation_violation = 0** · **catalog-out = 0** · REC ⊆ input ✅. → **판단(JUDGE)은 대체로 건강**(intent-first 작동, 추천 위반 0, 안전 block 작동).

## B/D. Human-like surface quality (실 gap)
> ★Foundation answer **텍스트** 자체는 내부코드 누출 0(자연어). 그러나 **Cosmile 응답이 `decisionType·safetyGateResult·reasonCodes`(RISK_ADVERSE_BLOCK·RISK_CONTRADICTION_BLOCK·failclosed_safety_block 등) 전부 노출** → DecisionBadge/카드가 렌더 = **화면 내부코드 누출**(관찰된 문제와 일치).

| 기준 | 평가 | 근거 |
|---|---|---|
| empathy_first | **FAIL** | adverse/block(#8,9,10,17)이 "안전을 위해 지금은 구매로 연결하지 않을게요"로 시작 — 불편/불안 수용 없음 |
| no_internal_code_leakage | **FAIL(surface)** | Cosmile 응답에 reasonCodes(`RISK_ADVERSE_BLOCK`…)·decisionType·safetyGateResult 노출 → UI 렌더. **#10 answer 텍스트에 영문 risk_tag("pregnancy, active_ingredient_caution") 직접 노출** |
| no_redundant_warning | **PARTIAL** | #17: summary+caution_notes+next_questions가 "구매 안 함/전문가 상담"을 ~3회 반복 |
| concrete_next_question | **FAIL** | "증상이나 상태를 알려주세요"(broad). canonical 권장(언제부터·방금 바른 제품·붉어짐 동반?) 미충족 |
| purchase_block_explained_naturally | **PARTIAL** | block 사유는 설명하나 일반적·차가움 |
| comparison_answer_quality | **PASS** | 세럼vs크림 → 비교 설명, 카드 없음 ✅ |
| vague_request_handling | **PASS** | 제품추천/뭘사야 → 조건 질문, 추천 0 ✅ |
| typo_tolerance | **PARTIAL** | #13 "ㅍ부가 ㄱ조" 미복원, "따가"만 매칭 |
| CTA_user_friendly | **NOT_FULLY_MEASURED** | 브라우저 미측정. 응답에 친화 CTA 텍스트 없음·DecisionBadge가 decision 렌더(관찰상 부자연) |
| answer_not_judgment_sheet | **PARTIAL** | 텍스트는 자연어에 가깝지만 템플릿·badge/reasonCode 렌더로 "시스템 리포트" 느낌 |

## C. Adapter expectation gap
- **SIASIU adapter:** Foundation raw는 상담체이나 **empathy-first·concrete question·자연어 대화체 미흡** → SIASIU 기대(따뜻한 상담)와 격차.
- **Cosmile adapter(실 surface 측정됨):** product card는 product intent에서만 노출(✅, greeting/vague/adverse 0). 단 **debug/internal code(reasonCodes·decisionType) 노출** + **block 표현이 사용자에게 그대로** → 기대(친화적 surface)와 격차. 구매 CTA: block 케이스에서 미노출(✅), 일반 케이스 CTA 친화성 NOT_FULLY_MEASURED.

## E. 특별 평가: "피부가 따끔거려" (#17 — 대표 실패 사례)
- actual: intent=safety_risk_consultation · **decision=do_not_buy · safety=block** · rec 0 · reason_codes=[`RISK_ADVERSE_BLOCK`,`failclosed_safety_block`].
- answer: "안전을 위해 지금은 구매로 연결하지 않을게요. 증상이나 상태를 알려주시면 더 도와드릴게요." + caution "지금은 구매보다 사용 중단/상담이 우선이에요." + next "전문가 상담을 권해드려요…"
- **expected:** risk=caution_or_strong_caution · product_recommendation_allowed=false · answer_style=safety_first_with_empathy · debug 노출 false.
- **판정:** 추천 차단은 맞음(✅) 그러나 **(a) caution이 아닌 block로 과함, (b) empathy 부재, (c) Cosmile surface가 RISK_ADVERSE_BLOCK 노출, (d) 질문이 broad, (e) 경고 반복** → **human_like_score = 2 · overall_case_result = PARTIAL(판단)/FAIL(UX).**
- 좋은 방향(canonical): "따끔거리면 불편하시겠어요. 지금은 새 제품보다 자극 여부를 먼저… 언제부터 따끔거렸는지, 방금 바른 제품이 있는지, 붉어짐·열감도 같이 있는지 알려주세요." — empathy + concrete + 자연어.

## Aggregate scores
- total_cases: **17**
- intent_match_pass: **~15/17** (16 ❌, 4·11 ≈)
- risk_behavior_pass: **~14/17** (17 over-block, 12 차단)
- permission_match(product_recommendation): **~15/17** (retrieval/candidate permission = 미구현·NOT_MEASURED)
- **product_recommendation_violation_count: 0** ✅
- **internal_code_leakage_count: 17 surface(decisionType/safety/reasonCodes 노출) + 1 text(#10 영문 tag)** ❌
- empathy_fail_count: **≥4 critical(adverse/block) + 대부분 비-empathy-first**
- concrete_next_question_fail_count: **~12** (broad 질문)
- cta_fail/NOT_MEASURED: 브라우저 미측정(관찰상 부자연)
- **average_human_like_score: ~2.7 / 5** (block 케이스 ~2, recommend/ask ~3, greeting/comparison ~4)
- **overall_readiness:** `NEEDS_JUDGE_FIX`(경미: #10 영문 tag·#17 over-block) · `NEEDS_COMPOSER_BEFORE_CONTRACT`(empathy/concrete/중복) · `NEEDS_SURFACE_ADAPTER_FIX`(Cosmile 내부코드 노출) · `GO_TO_CONTRACT_V03`(병렬 가능 — JUDGE 건강)

## 가장 심각한 UX gap 5
1. **Cosmile surface 내부코드 노출** — reasonCodes(RISK_ADVERSE_BLOCK)·decisionType·safety_gate_result가 응답에 그대로 → UI 렌더(관찰됨).
2. **empathy 부재** — adverse/block이 차갑게 "구매 안 함"으로 시작.
3. **broad 질문** — "증상/상태 알려주세요"(바로 답 못 함).
4. **영문 internal risk_tag 노출** — #10 answer 텍스트에 "pregnancy, active_ingredient_caution".
5. **경고 중복** — summary+caution+question이 같은 메시지 반복.

## 가장 잘 작동한 5
1. **intent_type 정확**(greeting/broad/unclear/comparison/safety) — candidate 무관.
2. **product_recommendation_violation = 0** — greeting/vague/adverse 추천 0.
3. **comparison → 비교 설명**(카드 아님).
4. **vague → 조건 질문**(추천 0).
5. **adverse/contraindication → block + 추천 0**(안전 우선 작동).

## 다음 train 추천 (측정 결과 기반)
1. **C. Natural Answer Composer v0.3** (우선) — empathy-first · concrete next question · 중복 제거 · 영문 tag→한국어 자연어. judge-locked·write-protected 준수(canonical §17).
2. **D. Cosmile Surface Adapter** (우선) — reasonCodes/decisionType/safety 같은 **내부 필드를 사용자 surface에서 숨김**, 친화 CTA·자연어 badge.
3. **경미 JUDGE 보정** — #10 영문 risk_tag를 user 텍스트에서 한국어화, #17 "따끔" 단독은 block→caution(과한 block 완화). (별도 train·승인)
4. **B. Contract v0.3** — JUDGE가 건강하므로 **병렬 진행 가능**(permission 3필드 additive).

## no-change assertions
코드 0 · contract 0 · canonical 문서 0 · product repo 0 · memory write 0 · push 0. 진단 리포트(md/json)만 생성. Cosmile dirty=5(기존 Leo wiring)는 **미접촉**(read-only 호출만).
