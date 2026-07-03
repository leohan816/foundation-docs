# Foundation — Knowledge Brain Confidence Metadata Wiring v1

> **2026-06-28 · Knowledge Brain confidence 연결(실배선).** answer.py의 `answer_mode='cautious'` 고정을 **retrieval 기반 `evidence_answer_mode`**로 교체. ★Response Brain pattern은 실적용 0(계속 shadow) · Trust Core(safety_gate/external_guard) 순서·완화 0.
> 변경: `app/evidence_mode.py`(신규·Knowledge Brain helper) · `app/ssbrain/answer.py`(answer_mode 산출만 최소 수정). 테스트 `app/tests/test_confidence_metadata_wiring.py`(18).

## 1. Executive Summary
- answer.py가 이제 **retrieval hits + query**로 `evidence_answer_mode`(grounded/cautious/uncertain/cannot_determine)를 산출해 **trace.answer_mode**에 기록. assertive는 **미개방**.
- ★보수적: 고위험→cautious 캡 · 근거 약함→cautious/uncertain · 근거 없음→cannot_determine · source 메타 없음→`learned`(canonical 단정 금지) · 오류→cautious fallback.
- **user_text는 evidence로 공격적으로 바뀌지 않음** — opener는 기존 `_situation` 그대로(강한 근거여도 "정리하면,"·생략 수준).
- 테스트 264 assertions / 0 FAIL · full-loop 100/100 · live 0.

## 2. confidence_model 조사 (Stage A)
| 함수 | 입력 | 출력 |
|---|---|---|
| `score_claim(source_types, claim_type, …)` | source 유형명·claim_type·n_supporting·age·conflicts | 7-score dict(final_confidence_score 0-100) |
| **`answer_mode(final_score, claim_type, has_tier1)`** | 점수·claim_type·Tier1 유무 | mode(고위험은 Tier1+≥85만 grounded·그 외 cautious) |
| `recheck_cycle(...)` | claim_type·risk | recheck |
- 고위험 claim_type(`HIGH_RISK`): pregnancy_lactation_safety·teen_safety·medical_claim·functional_medicine_claim·supplement_dosage·cosmetic_safety.

## 3. answer.py hits metadata 조사 (Stage B)
`engine.search` → hit = `{doc_id, title, doc_type, text, score}`. **source tier/provenance 메타 없음** → confidence_model의 source_types를 직접 못 줌 → **보수적 coarse 어댑터** 필요(`has_tier1=False`·source_layer=learned).

## 4. evidence_answer_mode 계산 정책 (Stage C/D · `evidence_mode.py`)
| 조건 | 결과 |
|---|---|
| hits 0 | `cannot_determine` (source_layer=none) |
| 고위험(임신/수유/의료/이상반응/안전) | **cautious 초과 금지**(claim_type→cm.HIGH_RISK → cm.answer_mode가 cautious 캡) |
| 근거 강함(top score 높음·다건) | `grounded` 가능 |
| 근거 약함(present, score≥40) | `cautious`(present-hit floor) |
| 근거 매우 약함(<40) | `uncertain` |
| assertive 산출 시 | **미개방 → grounded로 강등**(`ASSERTIVE_ENABLED=False`) |
| 입력 부족/오류 | **cautious fallback**(answer.py 미crash) |
- coarse score = `min(1.0, top_score)*70 + min(n,3)*10`(0-100·내부용·보정 전제). claim_type = query 키워드 매핑.

## 5. source_layer 정책 (Stage F)
- 명시적 canonical 메타가 있을 때만 `canonical` · 모르면 `learned` · **source_layer 없으면 canonical 단정 금지**. ssbrain hit엔 canonical 메타 없음 → 이번 단계 항상 `learned`.

## 6. high-risk override (Stage G)
- 임신/수유/의료/치료/부작용/아토피/안전성 → `cautious/uncertain/cannot_determine`만. recommendation이라도 safety-sensitive면 cautious cap. ★`safety_gate`(Trust Core)가 발동하면 mode를 다시 cautious로 캡(`cap_mode`).

## 7. answer.py 변경 지점 (Stage E)
- import `evidence_mode` 추가.
- safety_gate 직후: `ev = evidence_mode.evidence_answer_mode(hits, query)` → `answer_mode = ev["mode"]`; `if issues: answer_mode = cap_mode(answer_mode, "cautious")`.
- `trace = ap.build_trace(ev["source_layer"], ev["evidence_score"], …, answer_mode=answer_mode)` + `trace["evidence_reason"]`.
- **opener(`_situation`)·safety_gate·external_guard 순서/위치 무변경.** 빈 hits 경로(cannot_determine) 그대로.

## 8. trace 정책 (Stage I)
- user_text에 **점수/점수식/내부 알고리즘 노출 금지**. trace(내부용)에만 `answer_mode·source_layer·evidence_score·evidence_reason`. external_guard는 **최종 user_text만** 검사. trace는 user_text에 섞이지 않음.

## 9. 대표 10질문 재평가 (Stage H)
| query | trace.mode | layer | user_text 시작 |
|---|---|---|---|
| 레티놀이 뭐야(강) | **grounded** | learned | 정리하면, … |
| 나이아신아마이드 효과(강) | grounded | learned | 정리하면, … |
| 스킨1004 토너(중) | cautious | learned | 이 경우는 단정하기보다, … |
| 장벽 약할 때(약) | cautious | learned | (생략) … |
| 임산부 바쿠치올(고위험) | **cautious** | learned | (safety caution) |
| 아토피 치료(의료) | cautious | learned | (safety caution) |
| 없는 성분 ABCXYZ | cannot_determine | none | 음… 모르겠어요 |
| 레티놀 순서(강) | grounded | learned | (생략) … |
| 어떻게 검색해? | grounded | learned | **fallback**(내부 비공개) |
| 보습 제품 추천(강) | grounded | learned | … |
→ 단순 정의 근거 충분=grounded · 고위험=cautious · 없음=cannot_determine · 내부=fallback · **user_text 과도 단정 0**(opener 그대로) · trace↔user_text 분리.

## 10. Test Results
confidence wiring **18/18** + 전체 회귀 **264 assertions / 0 FAIL** · full-loop 100/100 · Response Brain `applied_to_answer=false` 유지 · canonical write 0 · learned 승격 0 · memory.db 0 · live 0 · teacher raw text 0.

## 11. Remaining Risks / Next
- coarse score는 ssbrain fused score 미보정 → 실 qrels로 캘리브레이션(다음).
- source tier 메타가 hit에 없어 `has_tier1=False`(보수적) → retrieval에 tier/provenance 노출 시 정밀화.
- assertive 미개방 — 충분 근거+Tier1 확립 후 별도 승인.
- 다음: answer_type classifier를 answer.py에 연결(분류만), Response pattern canary(여전히 evidence cap·Trust 말단).
