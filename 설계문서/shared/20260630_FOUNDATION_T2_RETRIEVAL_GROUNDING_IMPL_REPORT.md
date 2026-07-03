# Foundation T2 — Retrieval Decision + Grounding Gate (impl) — 2026-06-30

> Promotion Plan **Train T2 구현**. T2 설계서(`b4fbe2f`) 기준. **additive 출력 전용 layer** — 기존 decision_type/products/guard/response_plan/T1 classifier **불변**.
> 범위: **Part A(retrieval decision contract) + Part B(F2 RRF / F3 Grounding Gate skeleton).** dev-shadow·stub(실 검색/LLM/memory/Path A 없음). F4~F8·Cosmile·SIASIU·contract·canonical 무수정.

## changed_files (foundation-control 범위만)
- `foundation_http_service/core.py` — `decide_retrieval`(7필드 정책) · `rrf`(F2 RRF 골격) · `grounding_gate`(F3 골격) + judge() additive 출력(`retrieval_decision`·`grounding`). ★decision_type/products/guard/T1/response_plan 코드 무변경.
- `scripts/foundation_t2_retrieval_grounding_test.py` — 신규(16 checks).
- 본 report md/json.

## 구현 (목표 그대로)
T1의 `refined_intent`/`answer_type`/`target_category`/`adverse`/`explicit_reco` + 최종 `dt`/`risk`/`has_candidates`를 읽어 **retrieval decision 7필드** 산출:
`retrieval_needed · candidate_needed · grounding_mode · no_evidence_action · evidence_required_reason · retrieval_scope · product_candidate_policy`.

### 정책 적용 (라이브 확인)
| 질문 | candidate_needed | grounding_mode | no_evidence_action | policy |
|---|---|---|---|---|
| 여드름 알고 싶어(education) | **false** | cautious | defer_or_clarify | deny |
| 세럼은 언제 발라?(routine) | **false** | cautious | defer_or_clarify | deny |
| 세럼 vs 크림(comparison) | **false** | cautious | proceed_general | deny |
| 따가워도 추천(adverse) | **false** | **required** | **safety_first** | deny |
| 임신 레티놀(safety) | **false** | required | safety_first(reason=pregnancy_safety) | deny |
| 레이저(시술) | **false** | required | safety_first | deny |
| 미백 제품 추천 + cand(product) | **true** | required | defer_or_clarify | **allow** |
| 미백 제품 추천 no cand | true | required | **ask_more**(products 0) | deny |
| 토너는 꼭 써야 해?(education) | false | cautious | defer_or_clarify | deny |
| 제품추천(vague) | false | none | ask_more | deny |

## F2/F3 skeleton (골격 — 실 KB/임베딩 없음·SIASIU 주입 seam)
- **`rrf(channels, k=60)`**: Reciprocal Rank Fusion 결정론(채널내 best-rank dedup·다채널 합산). 실 BM25/vector/KB stub.
- **`grounding_gate(hits, grounding_mode, has_candidates)`**: 근거 유무 → `{grounded, action}`. **fail-closed**(모호→defer) · product는 candidate를 근거로 인정 · 지어내기 0. dev-shadow는 hits=∅ → required+근거없음 → grounded=False → `action=no_evidence_action`(safety_first/defer/ask_more).

## 7 정책 원칙 충족
1. education/routine/comparison/concern/vague → **candidate_needed=false** ✅
2. explicit product_recommendation일 때만 **candidate_needed=true** ✅
3. adverse/safety/medical/ingredient/product-specific → grounding required/cautious ✅
4. 근거 없으면 defer_or_clarify/safety_first(지어내기 0) ✅
5. candidate 있어도 candidate_needed=false면 추천 전환 0(policy=deny + 기존 guard 이중 안전) ✅
6. **candidate guard 완화 0**(guard 코드 무변경·T2는 선언+정합) ✅
7. v0.3 response_plan·v0.3.1 guard·T1 answer_type **불변**(additive 출력 전용) ✅

## 불변식 검증 (test 13·14)
- `candidate_needed=true ⟹ refined_intent==product_recommendation_request AND safety!=block` — 전 케이스 PASS.
- `product_candidate_policy=deny ⟹ recommended_products=0` — 전 케이스 PASS.
- decision_type/products는 T2 전후 동일(additive 출력만).

## test_results (성공 기준 전부 충족)
| suite | 결과 |
|---|---|
| 기존 v0.2 | **40/40 PASS** |
| v0.3 response_plan | **16/16 PASS** |
| v0.3.1 candidate guard | **19/19 PASS** |
| F1 classifier | **14/14 PASS** |
| **T2 신규** | **16/16 PASS** |
| adversarial 180 | guard_critical_pass=**True** · decision_integrity=**1.0** · false_recommendation=**0** · safety_critical_violation=**0** · intent_gap=**0** · catalog_out=**0** · permission invariant 0 |

## 한계/메모 (정직)
- dev-shadow는 실 retrieval 없음 → `grounding`은 hits=∅ + has_candidates 기반(advisory). 지식 grounding(education/ingredient)의 실제 근거 판정은 **F2 실 KB 연결(SIASIU 주입) 후** 활성. 현재는 product candidate 유무로만 grounded 근사(무해·decision 무영향).
- `retrieval_decision`/`grounding`은 **출력 advisory** — Cosmile이 candidate 주입 timing에 활용하려면 별도 Cosmile train(2-step 호출 전환) 필요. 미적응이어도 guard로 안전.

## no_change_assertions
- 구현 = **foundation-control/foundation_http_service only**.
- Cosmile 0 · SIASIU 0 · FOUNDATION repo 0 · contract 0 · canonical 0 · products 추천 로직 0 · F4~F8 0 · LLM 0 · memory write 0 · Path A 전환 0 · **push 0**.

## next_train (Promotion Plan)
**T3 — Guardrail + Output Verify + Evidence Mode framework**(dev/shadow): default-deny guardrail 계약 · output verify(+fabrication) fail-closed · evidence answer_mode(candidate→cautious cap). 또는 **T2 실 KB 연결(F2 retrieval + SIASIU 어휘 주입)** 우선 — Leo 판단.
