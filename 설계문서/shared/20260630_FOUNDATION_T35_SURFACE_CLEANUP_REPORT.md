# Foundation T3.5 — JUDGE/Composer Surface Cleanup — 2026-06-30

> T3 `output_verify`가 검출한 **#10 internal_code_leak**(answer_summary에 남는 영문 risk_tag) 해소. **minor·additive cleanup** — decision_type/products/response_plan/candidate guard/T1/T2/T3 판단 **불변**.
> 범위: Foundation/foundation-control rule composer cleanup만. 실 LLM/KB/retrieval/memory/Path A/enforcement = **범위 아님**. Cosmile·SIASIU·contract·canonical 무수정.

## 설계 (근본 원인 → 해결)
- 근본: `_plain_explanation`(do_not_buy)·`_compose_answer`(caution_notes)가 **영문 risk_tag**(`pregnancy`·`active_ingredient_caution`·`sensitivity` 등)를 `", ".join(risk_tags)`로 user-facing 텍스트에 직접 보간 → answer_summary에 영문 internal code 노출(#10).
- 해결: **영문 risk_tag → 사용자용 한국어 라벨** 변환(`_RISK_TAG_KO` + `_risk_tags_ko`). user-facing 텍스트(answer_summary·caution_notes·plain_language_explanation·display_sections)만 한국어화. **내부 필드 `safety_risk_tags`는 영문 유지**(trace/내부용 — reason_codes/judge 판단 불변).

## changed_files (foundation-control 범위만)
- `foundation_http_service/core.py` — `_RISK_TAG_KO`(영문→한국어 13종) · `_risk_tags_ko` 헬퍼 · `_plain_explanation`(do_not_buy)·`_compose_answer`(caution_notes)에서 `_risk_tags_ko(risk_tags)` 사용. ★decision/products/risk/safety_risk_tags 무변경.
- `scripts/foundation_t35_surface_cleanup_test.py` — 신규(7 checks).
- `scripts/foundation_t3_guardrail_verify_evidence_test.py` — test 16 갱신(leak 검출 → cleanup 후 leak 0). 총 18 유지.
- 본 report md/json.

## before / after (라이브 확인)
| input | before(answer_summary) | after |
|---|---|---|
| 임신 중인데 레티놀 써도 돼? | "안전 신호(**pregnancy, active_ingredient_caution**)가 보여요…" | "안전 신호(**임신 관련 주의, 활성 성분 주의**)가 보여요…" |
| 레티놀은 뭐야? | "안전 신호(**active_ingredient_caution**)…" | "안전 신호(**활성 성분 주의**)…" |
| 민감성 피부인데 레티놀 써도 돼? | "안전 신호(**active_ingredient_caution, sensitivity**)…" | "안전 신호(**활성 성분 주의, 민감성 주의**)…" |
- **safety_risk_tags 필드**: `['pregnancy','active_ingredient_caution']` (영문 내부 유지·불변) · **output_verify.ok=True**(leak 해소).

## 성공 기준 — 전부 충족
| 항목 | 결과 |
|---|---|
| 기존 v0.2 / v0.3 / guard | **40/40 · 16/16 · 19/19 PASS** |
| F1 / T2 / T3 | **14/14 · 16/16 · 18/18 PASS** |
| **T3.5 신규** | **7/7 PASS** |
| adversarial 180 | decision_integrity=**1.0** · false_recommendation=**0** · safety_critical_violation=**0** · intent_gap=**0** |
| **#10 internal_code_leak user-facing answer_summary** | **0** (high-risk/adverse sweep 16 case leak=0) |
| decision/products/response_plan/guard/T1/T2/T3 출력 판단 | **불변** |
| live/write/memory/push | **0** |

## 불변식 검증
- 한국어화는 **user-facing 텍스트만** — `decision_type`(do_not_buy)·`safety_gate_result`(block)·`recommended_products`(0)·`safety_risk_tags`(영문)·`reason_codes`·T1~T3 판단 **불변**(test 7·2).
- high-risk/adverse 8 query × (candidates 유무) sweep → user-facing 영문 risk_tag leak **0** · output_verify ok **전부**(test 5·6).
- safety_risk_tags 영문 보존(test 2) — 내부 trace/디버그용.

## no_change_assertions
- 구현 = **foundation-control/foundation_http_service only**.
- Cosmile 0 · SIASIU 0 · FOUNDATION repo 0 · contract 0 · canonical 0 · products 추천 로직 0 · F7/F8 0 · LLM 0 · KB/retrieval 0 · memory write 0 · Path A 0 · enforcement 적용 0 · **push 0**.

## next_train (Promotion Plan)
- **T4 — Composer 계약 + LLM Router**(F8) 또는 **F2 실 KB 연결**(retrieval + SIASIU 어휘 주입).
- enforcement train(F4 deny·F5 fallback·F6 answer_mode 적용) — 별도 승인.
- ※남은 user-facing 자연스러움(empathy/대화체)은 향후 Composer(LLM, canonical §17 guarded) 영역.
