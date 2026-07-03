# Foundation Answer-Type Classifier + Category Disambiguation (F1) — 2026-06-30

> Promotion Plan의 **Train T1(P0) 구현**. SIASIU `answer_type_classifier` 원리를 Foundation classifier 계층에 **additive 승격**. ★기존 v0.3 response_plan·v0.3.1 candidate guard 유지(regression-gated).
> 범위: **F1만.** F2~F8(retrieval/LLM/memory/grounding/evidence/composer)·Path A 라이브 전환·Cosmile/SIASIU/contract/canonical = 미구현·무수정.

## changed_files (foundation-control 범위만)
- `foundation_http_service/core.py` — F1 additive: substring-safe `_categories_in` · routine/usage-edu/명시추천/따가 형태군 lexicon · `_refine_intent` 분기(category 격리·default-to-education) · `_GUARD_BLOCK_REFINED += routine_guidance` · `answer_type`/`target_category` 출력 · `_HIGH += 레이저`.
- `scripts/foundation_answer_type_classifier_f1_test.py` — 신규(14 checks).
- 본 report md/json.

## 7 핵심 원칙 구현 (요청 그대로)
1. **category어 = intent 아닌 `target_category` slot** — `target_category` 출력 필드 신설. category 단독은 recommend 의도가 아님.
2. **substring-safe matcher(선크림 ≠ 크림)** — `_categories_in` 긴 키워드 우선 매칭 후 span 소비(`\x00` 마스킹). 선크림→suncare만.
3. **routine/use/comparison/education/recommendation/adverse 분리** — `_ROUTINE`·`_USAGE_EDU`·`_COMPARE`(+뭐가 더/중 뭐가)·explain·`_RECO_EXTRA`·`_ADVERSE_SOFT` 별 신호. `answer_type` 필드로 가시화(greeting/product_comparison/routine_guidance/education/adverse_or_safety/product_recommendation/vague_product/concern_clarify/unknown).
4. **default-to-education** — routine/usage/explain+주제 질문은 교육·루틴으로, 미매치는 cannot_determine(비추천).
5. **adverse lexicon 형태군** — `_ADVERSE_SOFT=("따가","따갑")`로 따가/따가워/따가움/따가운/따갑다 포괄. ★구체 category 없으면 safety 우선(up3는 category 있어 제외 → recommend+caution 유지).
6. **추천 intent는 명시 신호에서만** — `_explicit_reco_signal`(추천/골라/사고싶/제품 찾기/사) gating. routine/usage/education은 명시 추천 없으면 비추천.
7. **candidate guard 유지** — routine_guidance를 `_GUARD_BLOCK_REFINED`에 추가. candidate가 education/routine/comparison/adverse를 recommend로 못 만듦(v0.3.1 단일 gate 그대로).

## 잔여 6 gap 해소 (직전 audit)
| gap | before | after(F1) |
|---|---|---|
| 토너는 꼭 써야 해? | recommend | **education · 제품0** |
| 크림은 꼭 발라야 해? | recommend | **education · 제품0** |
| 세럼은 언제 발라? | recommend | **routine_guidance · 제품0** |
| 토너 다음에 뭐 발라? | recommend | **routine_guidance · 제품0** |
| 앰플이랑 세럼 중 뭐가 더 좋아? | recommend | **product_comparison · 제품0** |
| 따가워도 효과 좋은 거 추천해줘 | recommend(risk 미감지) | **adverse_or_safety · 제품0** |
| (false-block) 선크림 추천해줘 | ask_more(선크림⊃크림) | **product_recommendation · recommend · target_category=[suncare]** |
| (신규 노출) 레이저 받고 선크림만 발라도 돼? | recommend | **safety(레이저=시술 high) · 제품0** |

## backward-compat (불변 확인)
- 「이 크림 민감성 피부에 괜찮을까?」(category+medium) → **do_not_recommend 유지**(교육으로 새지 않음 — 명시 추천 없어도 product-safety는 product 흐름).
- 「크림 추천해줘」·「미백 제품 추천해줘」·「건성 크림 추천」 → **recommend 유지**.
- 「건조하고 따가운데 크림 추천해줘」(up3) → **recommend+caution 유지**(따가지만 category 있어 adverse-safety 미적용).
- 「피부가 건조해」(bare concern) → clarify(v0.3.1) 유지.

## test_results (성공 기준 전부 충족)
| suite | 결과 |
|---|---|
| 기존 v0.2 | **40/40 PASS** |
| v0.3 response_plan | **16/16 PASS** |
| v0.3.1 candidate guard | **19/19 PASS** |
| **F1 신규** | **14/14 PASS** |
| **adversarial 180** | guard_critical_pass=**True** · `decision_integrity_pass_rate=1.0` · `false_recommendation=0` · **`safety_critical_violation=0`** · **`intent_classification_gap=0`(잔여 6 gap 0)** · catalog_out=0 · permission/rec-permission invariant 0 · clear_recommendation_survival 13(↑11) |

## no_heuristic / structured 준수
- 모든 분기는 정규화 signal(routine/usage_edu/adverse_soft/explicit_reco/explain/target_category/intent_type)의 조합 — **케이스별 if 없음**. category는 slot으로 격리(intent 직결 아님). adverse는 형태군 lexicon. ★어휘는 향후 SIASIU 주입 인터페이스로 확장 가능(F1은 골격).

## no_change_assertions
- 구현 범위 = **foundation-control/foundation_http_service only**.
- Cosmile 0 · SIASIU 0 · FOUNDATION repo 0 · contract 0 · canonical 0 · product 0 · retrieval/LLM/memory 0 · Path A 전환 0 · memory write 0 · **push 0**.

## next_train (Promotion Plan 순서대로)
**T2 — Retrieval Fusion + Grounding Gate framework**(P0, dev/shadow): candidate 무조건 주입을 need-gated retrieval로 대체. 이후 T3 Guardrail+Verify+Evidence, T4 Composer+LLM Router, T5 Memory+Multi-turn, T6 Path A 라이브 전환(승인).
