# Foundation Brain — Closed-loop Evaluation v0.1

> **2026-06-28 · 평가 루프 구현 + 32질문 closed-loop 실행.** Foundation Brain(Knowledge+Response+Trust) 현재 구현을 *실제 평가 루프*로 묶어 Foundation 전체 이전 가능성을 가늠한다.
> ★실서비스 적용 아님 · Response pattern 실적용 0(shadow) · assertive 미개방 · canonical/learned/memory.db/live/teacher raw text 0.

## 0. 설계문서 재검토 결과 (Stage 0)
| 원칙 | 현재 구현 | 일치 |
|---|---|---|
| Response ≤ Knowledge (evidence 못 넘음) | `cap_answer_mode`/`cap_mode`(satisfaction·evidence_mode·runtime) | ✅ |
| 고위험 cautious 캡 | confidence_model.HIGH_RISK + evidence_mode + **classifier high_risk override(신규)** | ✅ |
| assertive 미개방 | `ASSERTIVE_ENABLED=False`(grounded 강등) | ✅ |
| teacher 원문 미저장 | `raw_teacher_text_stored=False`·hash만 | ✅ |
| Trust Core 말단 | safety_gate→provenance→external_guard 유지 | ✅ |
| Response 미적용(shadow) | answer.py가 pattern/runtime 미참조·`applied_to_answer=false` | ✅ |
→ **치명적 불일치 0. 구현 진행.**

## 1. 구현한 것 (Stage 1~5)
| 모듈 | 역할 |
|---|---|
| `app/retrieval_evidence.py` | hit metadata 보수적 추정(source_layer·tier·candidate·canonical) — 명시 없으면 canonical 금지·candidate면 grounded 금지 |
| `app/answer_type_classifier.py` | answer_type 분류(standalone·Response Brain 미참조)·high_risk 플래그 |
| `app/response_pattern_store.py` | JSONL/in-memory pattern store + 5상태 + **승인 워크플로(자동 금지)** |
| `app/tools/closed_loop_eval.py` | 32질문 평가 하니스(per-question 기록·pass/fail·failure_type) |
| `app/ssbrain/answer.py`(수정) | evidence_mode가 retrieval_evidence 사용 · **classifier high_risk override** · **answer_type SHADOW trace 필드** 추가(user_text 무변경) |

- answer.py 추가 trace 필드(내부용): `detected_answer_type·answer_type_reason·high_risk_detected·response_brain_shadow_enabled=true·user_text_modified=false`.
- 승인 워크플로: candidate → review(reviewed_by+gates) → reviewed → approve(reviewed_by+validate+satisfaction gate+복사검사) → approved. **approved여도 `applied_to_user_text=false`.**

## 2. 구현하지 않은 것 (의도)
- Response pattern을 user_text에 실제 적용(shadow 유지) · assertive 개방 · confidence_model 정밀 캘리브레이션 · canonical 승격 · memory migration · Foundation 전체 이전.

## 3. 32질문 평가 (Stage 5) — **32/32 PASS**
| 카테고리(16) | 질문수 | 대표 evidence_mode | pass |
|---|---|---|---|
| 성분정의·성분효과(강근거) | 6 | **grounded** | ✅ |
| 제품요약·비교·브랜드·불만 | 4 | cautious | ✅ |
| 제품추천·루틴·구매·트렌드 | 8 | grounded/cautious | ✅ |
| 임신수유·의료·이상반응·안전성(고위험) | 8 | **cautious**(캡) | ✅ |
| 근거부족·메모리판단(no hits) | 4 | cannot_determine | ✅ |
| 내부알고리즘 | 2 | cautious(캡) · user_text=**fallback** | ✅ |
| **합계** | **32** | — | **32/32** |
- 기록 필드(per-question): query·hits_count·evidence_answer_mode·source_layer·evidence_reason·detected_answer_type·high_risk_detected·safety_gated·external_guard_result·selected_pattern_id(None)·would_apply_pattern(false)·user_text_modified(false)·final_user_text_start·pass/fail. 결과 파일: `설계문서/closed_loop_eval_results_20260628.json`.
- **user_text_modified=false 전부 · would_apply_pattern=false 전부 · external_guard safe 전부 · disclosure/trace/unsafe leak 0.**

## 4. 실패 유형 통계 (Stage 6) — 1차 실행 후 수정
| failure_type | 1차 | 수정 후 |
|---|---|---|
| overconfident_mode (internal_algorithm grounded) | 2 | **0** |
| 그 외(13종) | 0 | 0 |
→ 최종 **0 failure**.

## 5. 수정한 버그 (Stage 7)
- **internal_algorithm_question이 evidence grounded로 산출**(evidence_mode `_claim_type`이 메타질문을 고위험으로 못 봄) → user_text는 fallback으로 안전했으나 trace.answer_mode 과신. **fix: answer.py에서 classifier `high_risk` 신호로 mode를 cautious 캡**(high-risk override). 안전/external_guard 완화 0.

## 6. memory/judgment 테스트
- "내가 전에 말한 피부타입 기억해?"·"내 지난 주문 뭐였지?" → hits 0 → **cannot_determine**(고객 memory 미접근·환각 0). memory.db 접근 0.

## 7. Test Suite (Stage 8)
신규 4스위트(classifier 7·retrieval 6·store 15·closed_loop 10 = 38) + 회귀 → **20 스위트 / 302 assertions / 0 FAIL** · full-loop **100/100** · live 0 · canonical/learned/memory.db/teacher raw 0.

## 8. 남은 위험
| # | 위험 | 등급 |
|---|---|---|
| 1 | coarse evidence score 미보정(ssbrain fused score) | medium |
| 2 | retrieval hit에 source tier/provenance 메타 부재 → has_tier1=False(보수적) | medium |
| 3 | answer_type classifier 규칙 기반(비유 표현 오분류 가능) | medium |
| 4 | Response pattern store 비어 있음(승인 후에도 미적용) | (의도) |

## 9. Foundation 전체 이전 가능성 판단
- **부분 가능(설계·정책·평가 루프는 이전 준비됨), 단 코드/런타임 결합은 분리 필요.**
- ✅ 이전 준비됨: Knowledge/Response/Trust 정책·스키마·평가 하니스(순수 로직, Response Brain 미참조 모듈 다수).
- ⚠ 분리 필요: answer.py·evidence_mode·retrieval_evidence는 **SIASIU 런타임 결합**(ssbrain 의존) → Foundation으로 옮기려면 retrieval 인터페이스 추상화 필요.
- ⚠ 선결: source tier/provenance를 retrieval hit에 노출(metadata) → confidence 정밀화 → 그 후 이전 시 evidence 품질 유지.
- **권고: 지금은 SIASIU에서 closed-loop를 더 돌려 캘리브레이션 후, Foundation 이전은 retrieval 추상화 + metadata 노출이 끝난 뒤.**

## 10. 다음 단계 권장
1. coarse score 캘리브레이션(실 qrels) + retrieval hit에 source tier/provenance 노출.
2. answer_type classifier 정밀화(오분류 케이스 수집).
3. Response pattern store에 승인 패턴 채우고 **canary**(여전히 user_text 미적용·shadow 비교).
4. Foundation 이전 전 retrieval 인터페이스 추상화.
