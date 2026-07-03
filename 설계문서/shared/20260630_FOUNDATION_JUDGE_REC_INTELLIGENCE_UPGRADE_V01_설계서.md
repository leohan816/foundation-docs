# Foundation Judge/REC Intelligence Upgrade v0.1 — Evidence-Rich Consultation Answers — 설계서 — 2026-06-30

> ★design-first(`CLAUDE.md §2.6`). 본 설계 APPROVED 후 `foundation_http_service/core.py`만 개선한다.
> Foundation dev/shadow HTTP service의 **JUDGE/REC 응답 품질**을 올려 Cosmile 상담 답변이 evidence-rich하게 보이도록 한다.
> ★production live 아님 · LLM/API 연결 아님 · web lookup/learning 아님 · api_live=false · real write 0 · raw/PII durable 0 · memory write 0.

## 1. 목적
- JUDGE/REC가 **얕은 템플릿** 대신 **condition·reason·structured answer**를 반환하도록 개선해, Cosmile이 그대로 렌더링해도 설득력 있게 보이게 한다.
- 전부 **결정론**(LLM 0) · 기존 20/20 + safety 불변식 보존 · **backward compatible**(필드 추가만, 제거/이름변경 0).

## 2. 현재 문제
- `judge()` → decision은 나오지만 `answer_summary`가 고정 템플릿("조건에 맞는 catalog 제품을 추천드릴 수 있어요").
- `recommend()` candidate가 나오지만 "왜 추천?"이 약함(match_reason 1줄).
- consult 경로에 enriched recommend가 완전 연결 안 됨(judge는 product_refs[id]만).

## 3. 범위
- `foundation_http_service/core.py` 내부 JUDGE/REC/answer-composer 개선 + 테스트 확장 + (additive 시) contract JSON 갱신.
- endpoint·포트·불변식·mode 불변(`http://127.0.0.1:8731`, dev_shadow, api_live=false).

## 4. 하지 않을 것
- ❌ 실 LLM/API 연결 · web lookup · learning store · learned reuse · production live · api_live=true.
- ❌ raw durable 저장 · PII 저장 · memory write · customer memory write · catalog write · 실 결제/주문/customer DB write.
- ❌ Cosmile/SIASIU repo 수정 · FOUNDATION repo 수정(control-approved 아님) · push.
- ❌ 없는 성분/효능/가격 생성 · catalog 밖 제품 생성 · 기존 필드 제거/rename.

## 5. JUDGE 개선 방향
`judge()`가 추가 반환(기존 필드 유지):
- `user_intent_summary` · `detected_conditions`(dryness/barrier/sensitivity/…) · `concern_tags` · `safety_risk_tags`(pregnancy/adverse/…) · `plain_language_explanation`(condition-aware) · `limitations` · `answer`(composer, §7) · `recommended_products`(enriched, §6).
- ★condition/concern 감지 = **결정론 descriptive 키워드 사전**(검색·설명 보조), **safety 판단 아님**. safety는 기존 `_kw_risk` fail-closed escalation 유지. (no-heuristics: descriptive mapping은 §11에 명시·본 설계로 승인.)

## 6. REC 개선 방향
제품별 enriched(입력 candidate 한정):
- `product_id` · `slug` · `name` · `brand` · `recommendation_rank` · `match_reason` · `matched_fields` · `match_tags`(condition ∩ candidate concerns) · `why_this_product`(category 기반 추론) · `why_not_others` · `confidence`(low/medium, match_level/grounding 기반) · `limitations`(전성분 미연결) · `source_label`("catalog · dev/shadow").
- ★출력 product_id/slug **⊆ 입력 candidates**. 없는 제품/성분/가격 생성 0. match_reason 등 candidate echo 시 **PII mask**.

## 7. answer composer 구조
`answer = { answer_title, answer_summary, user_condition_summary, recommendation_logic, recommended_products, caution_notes, next_questions, limitations, display_sections }`.
- `display_sections`: Cosmile 렌더 순서 배열 `[{type:summary|conditions|products|caution|questions, ...}]`.
- decision_type별 구성 차등(§13/D): recommend→products+logic / caution→products+caution / block→products 0+caution / hold·ask_more→questions.

## 8. Evidence / reason format
- reason은 **코드 + 자연어**: `reason_codes`(기존) 유지 + `plain_language_explanation`/`match_reason`/`why_this_product`. 내부 score/알고리즘 미노출(disclosure 0).
- evidence_mode는 grounding 없으면 cautious 이하(기존 규칙 유지). `source_label`로 "dev/shadow · catalog" 명시.

## 9. Product candidate grounding rule
- REC output ⊆ input catalog candidates · catalog 밖 제품 0 · 없는 성분/효능/가격 0 · product_id/slug 없는 추천 0.
- candidate match_reason/text echo 시 PII mask · raw user text durable 저장 0.

## 10. Safety escalation rule (강화 유지)
- 위험 신호 → 절대 recommend downgrade 금지. risk_signal/safety intent → **escalation-only**(상향만).
- 임신/수유/이상반응/부어오름/화끈거림/두드러기/금기 → caution/block. **block이면 recommended_products 0 · purchase 비연결.**
- 기존 `risk = max(structured, keyword)` + case-insensitive + 타입가드 유지.

## 11. PII / raw boundary
- raw user text: 처리만, durable 저장 0. 응답·로그 요약/hash만. PII 마스킹(judge query + REC candidate echo 양쪽).
- ★condition/concern 감지 키워드 사전은 **descriptive**(safety 판단 아님). 본 설계서로 Leo 승인(§17 gate).

## 12. Memory / write boundary
- memory write 0 · memory candidate 0 · catalog write 0 · real write 0. 응답 불변식(`write_performed/raw_text_stored/pii_stored/memory_write=false`) 전 응답 유지.

## 13. API contract compatibility
- **backward compatible**: 기존 필드(decision_type/safety_gate_result/evidence_mode/reason_codes/answer_summary/clarification_questions/product_refs + 불변식) **전부 유지**. 새 필드는 **추가만**.
- contract JSON에 enriched 응답 필드 **additive 문서화**(스키마 호환).
- D. consult/judge ↔ recommend 연결: judge가 catalog_candidates 받으면 내부 REC 적용 →
  recommend/pass→enriched products · caution→products+caution · block→products 0 · hold/ask_more→questions.

## 14. Test plan
기존 20/20 유지 + 신규 20(§검증 1–20): enriched recommend/condition summary/caution note/do_not_recommend reason/block products 0/pregnancy·adverse block/hold questions/catalog 0/catalog-out 0/REC⊆input/PII mask/uppercase risk/risk_signal guard/health invariants/raw 0/memory 0/real write 0/contract valid/service starts.

## 15. Regression plan
- 기존 20/20 보존(필드 추가만). Cosmile 연결 e2e(bridgeMode=http·fdsh trace) 유지. 배포 시 8731 재기동(짧은 중단) — Cosmile fail-closed가 보호.
- 영향: foundation_http_service만. 제품 repo·다른 regression 무관(서비스는 foundation-control 내부).

## 16. Rollback plan
- core.py 변경 → 해당 커밋 normal revert로 즉시 롤백(서비스 재기동). 제품 repo 영향 0.
- 배포(8731 재기동) 실패 시 이전 core.py로 재기동.

## 17. Approval gate
- 설계서 17섹션 · JSON valid · 제품 repo 변경 0 · secret/PII 0.
- 구현: 기존 20/20 유지 + 신규 테스트 PASS · backward compatible · safety 불변식 유지 · catalog-out 0 · raw/PII/memory/real write 0.
- ★승인 근거: **Leo go-ahead 2026-06-30(본 train 지시)** = APPROVED. §11 descriptive condition mapping 포함 승인.
