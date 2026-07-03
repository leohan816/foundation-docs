# Foundation Brain Runtime v1.0 — FF1: Real LLM Draft Shadow Revalidation

> **2026-06-29 · FF1 PASS.** 실 LLM draft 텍스트가 들어와도 Trust/Response/External guard가 깨지지 않는지 검증. ★test-only synthetic draft·live LLM 호출 0·raw draft 저장 0·trace엔 hash만.

## 정책
- LLM draft는 answer source 아님(draft text). evidence_mode upgrade 불가·safety caveat 제거 불가·unsupported claim/internal/customer memory 생성 불가·고위험은 cautious 이하/block.
- ★절대 과claim(무조건/절대 안전·100%·부작용 없)·의료 단정(진단/완치/처방)은 **근거 유무 무관 항상 금지**(answer.py safety_words 결정론과 정합).
- raw draft는 ephemeral eval object·hash만 남김.

## 구현
- `foundation_brain_llm_draft_shadow.py` — evaluate_draft(ALWAYS_FORBIDDEN·internal·certainty·unsupported·caveat·medical·customer fabrication·injection)·make_draft_trace(hash only).
- `tools/foundation_brain_llm_draft_safety_eval.py` — 20 시나리오 × 10 draft 변형 = 200.
- 테스트: draft_shadow(7)·external_guard(6)·evidence_boundary(6)·high_risk_safety(6).

## 결과
- draft eval **200/200** · ★false_allow 0(unsafe draft 통과 0) · raw draft 저장 0 · evidence upgrade 0 · trace raw 0.
- 1차 발견: 근거충분 시나리오에서 절대 과claim/의료 단정 통과 → ALWAYS_FORBIDDEN 가드로 항상 차단(게이트 강화). 하니스 분류 일관성 정정.
- perf: draft eval p95 <0.1ms.

## Gate → PASS (eval≥200·false_allow 0·unsupported/overreach/internal 0·raw draft 0·evidence boundary 0·write/live 0)
