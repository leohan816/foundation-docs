# Foundation Brain — Runtime Wiring Plan v1

> **2026-06-28 · 배선 계획 + shadow 어댑터(실적용 0).** Foundation Brain(Knowledge + Response + Trust Core)을 SIASIU answer runtime에 *어떻게* 연결할지 설계. **Response Brain을 실제 고객 답변에 자동 적용하지 않는다.**
> 구현(shadow only): `app/foundation_brain_runtime.py` · 테스트 `app/tests/test_foundation_brain_runtime_wiring.py`(15). ★answer.py 미연결·confidence_model 미연결·live 0·teacher raw text 0.

## 1. Executive Summary
- 현재 answer.py 흐름을 3부(Knowledge/Response/Trust)로 매핑하고, **권장 runtime 순서**(Knowledge → Response → Trust 말단)와 **shadow mode**를 설계.
- shadow 어댑터는 `plan_runtime_brain_flow`로 *계획/그림자*만 산출 — **user_text 무변경·`applied_to_answer=False`**.
- 핵심 보증(코드): Response는 evidence 넘지 못함(`cap_answer_mode`) · 고위험 cautious 유지 · internal_algorithm fallback 우선 · Trust Core 말단.
- 테스트 **246 assertions / 0 FAIL**(기존 231 + runtime 15) · answer.py 변경 0.

## 2. 현재 answer.py 흐름 (Stage 1 — `app/ssbrain/answer.py`)
| 단계 | 위치 | 비고 |
|---|---|---|
| query 입력 | `answer(engine, query, k, rerank_on, audience='customer', source_layer='learned')` | |
| retrieval | `engine.search(query,k,rerank_on)` → hits | hits={doc_id,title,doc_type,text,score} |
| 빈 hits | `if not hits:` → `_guard_external(UNKNOWN)` + trace `cannot_determine` → return(grounded False) | 환각 차단 |
| LLM draft | `brain._llm("chat", …)` | 컨텍스트 제약(우리 자료만) |
| **safety_gate(본문)** | `body, issues = safety_gate(reply, query)` | Trust Core |
| opener(조건부) | `_situation(body,issues)` → `ap.pick_opener` | UX v1.1 |
| **external_guard(말단)** | `_guard_external((opener+body), audience)` | Trust Core |
| trace | `ap.build_trace(source_layer, …, answer_mode='cautious')` | 내부용 |
| return | `{reply(user_text), trace, grounded, safety_gated, hits}` | |
- 현재 answer_mode=`cautious` 고정 · source_layer=`learned` 기본 · answer_type 분류/패턴/confidence 없음.

## 3. Foundation Brain 3부 runtime 매핑 (Stage 2)
| 부분 | runtime 요소 | 현재 answer.py | 상태 |
|---|---|---|---|
| **Knowledge Brain** | retrieval · source routing · confidence_model · evidence answer_mode · source_layer · claim/source policy | `engine.search` 만 | confidence/source 미연결(cautious 고정) |
| **Response Brain** | answer_type 분류 · pattern 선택 · opener/hedge/structure · satisfaction · response memory | `_situation`/`pick_opener`(opener만) | 패턴/분류 미연결(shadow) |
| **Trust Core** | safety_gate · answer_provenance · external_guard · trace 분리 · disclosure fallback | safety_gate·compose-trace·external_guard ✅ | **배선 완료(v1.1)** |

## 4. 권장 runtime 순서 (Stage 3 · `RUNTIME_ORDER`)
```
query
→ intent / answer_type classification
→ retrieval
→ Knowledge Brain: confidence/source → evidence_answer_mode · source_layer
→ Response Brain: answer_type pattern 선택 (★evidence 경계 내)
→ cap_answer_mode(response_desired, evidence)
→ LLM draft (or structured draft)
→ Trust Core: safety_gate(본문)
→ Trust Core: answer_provenance.compose (trace 분리)
→ Trust Core: external_guard (내부 비공개·말단)
→ final user_text
```
- **Response Brain은 Knowledge Brain 뒤** · **Trust Core는 최종 말단** · Response pattern은 **evidence boundary를 넘지 못함** · 고위험 answer_type은 **assertive로 못 올림** · internal_algorithm_question은 **fallback 우선**.

## 5. confidence_model 연결 위치 (Stage 4 — 설계만)
| 항목 | 설계 |
|---|---|
| evidence_answer_mode 계산 | retrieval 직후 Knowledge Brain 단계. `confidence_model.score_claim(...)` → `answer_mode(score, claim_type, has_tier1)` |
| hits metadata 사용 | `score`(top/평균)·source tier·doc_type → source_quality/domain_fit/diversity |
| source_layer 추정 | curated 인덱스 출처면 `canonical`, web/learned면 그에 맞게(모르면 `learned`·canonical 단정 금지) |
| high-risk cap | claim_type 고위험이면 `answer_mode`가 cautious 초과 못 함(이미 confidence_model에 내장) |
| 불확실/무근거 | hits 0 → `cannot_determine` · 저신뢰 → `uncertain`/`cautious` |
| 현재 호환 | 현재 cautious 고정과 호환 — 연결 전까지 evidence_answer_mode=STUB(`cautious`) |
- ★이번 단계 미연결. 연결 시 answer.py line 118 `answer_mode='cautious'`를 `evidence_answer_mode`로 교체(별도 작업·승인 후).

## 6. answer_type classification 계획 (Stage 5 · `classify_answer_type` MVP)
규칙 기반 1차(고도 분류기 아님). **우선순위(override):** no-hits → `unknown_or_insufficient_data` · internal 키워드 → `internal_algorithm_question` · 임신/수유 → `pregnancy_lactation_question` · 의료/치료 → `medical_boundary_question` · 이상반응 → `adverse_reaction_question` · 그 외 키워드(추천/비교/순서/트렌드/브랜드/불만/구매/효과/정의) → 해당 type · default → `ingredient_definition`. 16종 전부 매핑.

## 7. Response Brain Shadow Mode (Stage 6 · `build_runtime_trace`)
shadow output(내부 trace·**user_text 무변경**):
| 필드 | 의미 |
|---|---|
| detected_answer_type | 분류 결과 |
| selected_pattern_id / None | mock store 조회(보통 None) |
| response_desired_mode | 패턴이 원하는 표현 모드 |
| evidence_answer_mode | Knowledge Brain(현재 STUB) |
| capped_answer_mode | `cap_answer_mode(desired, evidence)` |
| satisfaction_estimate / None | 실측 없음 |
| blocked_reason / None | internal→`disclosure_fallback_required` |
| would_apply_pattern | true/false(계획) |
| **user_text_modified** | **항상 false** |
- ★trace/internal only · external_guard 우회 0 · teacher raw text 0 · live 0.

## 8. Adapter / stub interface (Stage 7 · `foundation_brain_runtime.py`)
`classify_answer_type(query, hits)` · `evidence_answer_mode(hits, at)`(STUB) · `response_desired_mode(at)` · `cap_response_mode(desired, evidence)` · `shadow_select_response_pattern(at, hits)` · `build_runtime_trace(query, hits, audience)` · `plan_runtime_brain_flow(query, hits, audience, source_layer)`. **answer.py에서 import/배선하지 않음.**

### Shadow demo (실측·계획만)
| query | type | evidence | desired | capped | fallback | applied |
|---|---|---|---|---|---|---|
| 레티놀이 뭐야 | ingredient_definition | cautious | grounded | **cautious** | F | **false** |
| 임산부 바쿠치올 | pregnancy_lactation_question | cautious | cautious | cautious | F | false |
| 어떻게 답을 정해? | internal_algorithm_question | cautious | grounded | cautious | **true** | false |
| 없는성분 ABCXYZ | unknown_or_insufficient_data | cannot_determine | uncertain | cannot_determine | F | false |
| 보습 제품 추천 | product_recommendation | cautious | grounded | **cautious** | F | false |
→ desired=grounded가 evidence로 **cautious 캡**(Response가 Knowledge 못 넘음)·internal=fallback·전부 applied=false.

## 9. Test Results (Stage 8/10)
runtime wiring **15/15** + 전체 회귀 **246 assertions / 0 FAIL** · answer.py 변경 0 · user_text_modified=false · canonical write 0 · learned 승격 0 · memory.db 0 · live 0 · teacher raw text 0.

## 10. Remaining Risks
| # | 위험 | 등급 | 대응 |
|---|---|---|---|
| 1 | evidence_answer_mode STUB(cautious 고정) | (의도) | confidence_model 연결 시 해소 |
| 2 | rule-based classifier 오분류(비유적 표현) | medium | 고위험 override + 추후 정교화 |
| 3 | response pattern store 비어 있음(mock) | (의도) | 실 store + 승인 루프(별도) |
| 4 | 연결 시 answer.py line 118/116 교체 필요 | medium | 단계적 배선 + shadow 비교 검증 |

## 11. Next Implementation Plan
1. confidence_model을 retrieval 직후 연결 → `evidence_answer_mode`(answer.py answer_mode 교체).
2. answer_type classifier를 answer.py에 연결(분류만·표현 미적용) → shadow 비교.
3. Response pattern store 채우고 `would_apply_pattern` 실험(여전히 evidence cap·Trust 말단).
4. 단계별 shadow→canary→실적용(각 단계 Leo 승인).
