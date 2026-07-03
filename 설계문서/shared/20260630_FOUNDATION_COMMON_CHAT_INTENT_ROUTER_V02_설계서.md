# Foundation Common Chat Intent Router v0.2 — SIASIU-style Intent-First Baseline — 설계서 — 2026-06-30

> ★design-first(`CLAUDE.md §2.6`). 본 설계 APPROVED 후 `foundation_http_service/core.py`만 개선한다.
> SIASIU의 intent-first 상담 흐름을 Foundation common chat 판단 규칙으로 승격. ★결정론(LLM 0)·web/learning 0·api_live=false·real write 0. endpoint 불변(`http://127.0.0.1:8731`).

## 1. 목적
- 사용자 query의 **intent/risk를 먼저** 판단하고, **catalog_candidates는 product intent가 확정된 뒤의 보조 context**로만 쓰도록 Foundation 공통 채팅 판단을 고친다.
- greeting/vague/comparison/adverse면 candidate가 있어도 **제품 추천 금지**. 위험 신호는 항상 추천보다 우선.

## 2. 현재 문제
- `_derive_intent`가 **`has_candidates`만으로 product intent 확정** → candidate 붙으면 거의 모든 입력이 recommend로 ★CHANGED(probe로 확인: 11개 중 9개).
- 이상반응 표현("붉게 올라오고 화끈거려")이 `_HIGH`에 없어 **safety 미검출 → recommend/pass**(안전 문제).
- 실 Cosmile은 `searchProducts` score>0 필터로 greeting/vague는 candidate 0이라 현재 ask_more지만, **누수=#7(adverse 우발 매칭)** + 잠재 오염 위험.

## 3. SIASIU와 Cosmile의 차이
- **SIASIU:** 자체 LLM(DeepSeek) brain + 자체 KB가 primary, **intent/risk 먼저**(`answer_type_classifier`), Foundation은 **shadow(query만, candidate 0)**. 자연스러움 = 자체 LLM.
- **Cosmile:** 자체 brain 없음 → Foundation judge가 primary. searchProducts candidate를 query에 부착 → has_candidates 규칙 자극.
- → 공통 채팅 판단을 Foundation common chat layer에서 **동일**하게(intent-first) 만들고, 서비스 차이는 **마지막 adapter**에서만.

## 4. 공통 채팅 판단 원칙
1. intent/risk **먼저**. 2. candidate는 product intent 확정 **후 보조**. 3. greeting/vague/comparison/adverse → 추천 금지. 4. 위험 우선. 5. SIASIU·Cosmile **공통**. 6. 서비스 차이는 adapter 단계.

## 5. intent-first rule
- `intent_type`를 **query text 기반**으로 판정(candidate 무관). product intent는 query에 **product/category/concern/purchase 신호**가 있을 때만.
- product 신호 없으면 candidates가 있어도 `recommended_products=0`.
- intent 후보: `greeting · small_talk · broad_product_recommendation · unclear_shopping_guidance · category_product_request · skin_concern_consultation · product_type_comparison · top_pick_request · safety_risk_consultation · contraindication_check · cannot_determine`.

## 6. risk-first rule
- `risk = max(structured risk_signal, keyword risk)` — escalation-only. high → block 경로 우선(intent 무관). adverse/contraindication는 intent보다 먼저.

## 7. catalog_candidates 처리 원칙
- candidate는 **intent 결정 근거 아님**. product intent(category/skin_concern/top_pick-with-signal) + safety≠block + candidates 존재일 때만 추천에 사용.
- REC output ⊆ input candidates · product_id/slug 없으면 추천 0 · catalog 밖 제품 0.

## 8. greeting / vague / comparison / top-pick intent 정의
- **greeting:** 안녕/하이/반가 등 + 짧고 concern·product 신호 없음 → 짧은 인사, 추천 0.
- **broad_product_recommendation:** "제품추천/추천해줘"인데 category·concern 없음 → 조건 질문, 추천 0.
- **unclear_shopping_guidance:** "뭘 사야/모르겠" → 조건 질문, 추천 0.
- **product_type_comparison:** 2개 이상 카테고리 또는 비교어(vs/비교/차이/뭐가 좋아) → 비교 설명, 추천 0.
- **top_pick_request:** "하나만/제일/best" — 정보 부족이면 질문(추천 0), concern/category 충분하면 low-confidence 추천 가능.

## 9. adverse reaction keyword/stem 확장
`_HIGH`에 stem 추가(substring): 붉게·붉어·빨갛·화끈·따끔·쓰라·가렵·가려움·진물·발진·두드러기·부어·부음·부었·달아올·알러지. ★mild "따가"는 **block 아님**(sensitivity condition → recommend+caution 유지). 강한 adverse만 block.

## 10. safety escalation rule
- 강한 이상반응 → `decision_type=do_not_buy`(또는 hold)·`safety_gate_result=block`(또는 caution)·`recommended_products=0`·구매 유도 0·사용 중단/전문가 상담 우선.
- contraindication(임신/레티놀/금기) → do_not_buy/block·products 0. **candidate 있어도 safety 우선.**

## 11. product recommendation trigger rule
- **허용:** query에 product/category/concern/purchase 신호 ∧ safety≠block ∧ candidates 존재 ∧ REC⊆input.
- **금지:** greeting·small_talk·unclear·comparison-only·strong adverse·contraindication·product 신호 없는데 candidate만 있는 경우.

## 12. answer behavior per intent
- greeting → "안녕하세요. 피부 고민이나 찾는 제품을 편하게 말씀해 주세요."
- broad → "좋아요. 피부 타입·고민·원하는 제형을 알려주시면 더 정확히 추천드릴게요."
- comparison → "세럼은 가볍게 흡수되는 관리에, 크림은 보습막·장벽 관리에 더 적합합니다. 건조하고 따가운 상태라면 크림 쪽을 먼저 보는 편이 안전합니다."
- top-pick(정보부족) → 추가 질문 + 추천 0.
- category/skin_concern + candidates → enriched recommend(+sensitivity면 caution note).
- adverse/contraindication → 사용 중단·전문가 상담, 추천 0.

## 13. Backward compatibility
- 기존 필드 전부 유지(decision_type/safety_gate_result/evidence_mode/reason_codes/answer_summary/clarification_questions/product_refs/recommended_products/answer + 불변식). 신규 `intent_type`는 **additive**. 기존 **28/28 유지**. contract additive.

## 14. Test plan
기존 28/28 + v0.2 신규(25): contamination(안녕/제품추천/뭘사야/비교/하나만 — pure·empty·candidate 동반 모두 추천 0) · 정상추천(크림/건조/건조+따가/민감+미백) · safety(임신레티놀/붉게화끈/화끈/두드러기/부었) · invariants(REC⊆input·catalog-out 0·raw/PII 0·memory 0·real write 0·health·contract·service·uppercase·type guard).

## 15. Regression plan
- 기존 28/28 보존(필드 추가만). 배포 시 8731 재기동(짧은 중단, Cosmile fail-closed가 보호). foundation_http_service만 영향, 제품 repo 0.

## 16. Rollback plan
- core.py 변경 → 커밋 revert + 8731 재기동. 제품 repo 영향 0.

## 17. Approval gate
- 설계서 17섹션·JSON valid·제품 repo 0·secret/PII 0.
- 구현: 28/28 유지 + v0.2 신규 PASS · backward compatible · safety(adverse block)·intent-first(candidate 오염 차단) 검증.
- ★승인 근거: **Leo go-ahead 2026-06-30(본 train)** = APPROVED.
