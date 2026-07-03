# Foundation Brain Runtime — v1.0 Final Fix List (2026-06-29)

> v0.9 RC PASS 후, v1.0 확정 전 처리 항목. v1.0 자동 확정 금지.

## must_fix_before_v1
- FF1 실 LLM draft 연동 후 shadow trace/안전성 재검증(현재 LLM 미호출).
- FF2 실 retrieval hits 분포로 evidence_mode/conflict 캘리브레이션(현재 synthetic).

## should_fix
- FF3 conflict 의미론 키워드 polarity → 임베딩/규칙 하이브리드.
- FF8 고위험 분류 키워드 → 분류기 보강(미묘한 표현 누락 방지).

## needs_human_decision
- FF4 controlled_apply 실 트래픽 적용 범위/allowlist.
- FF5 실 canary 노출(소수 트래픽) 승인.
- FF6 Customer Decision Memory 실 고객 데이터 연동.

## blocked_by_external_dependency
- FF7 production/API live 인프라 + 거버넌스.

## 결론
must_fix 2(FF1·FF2) + needs_human 3 해소 + human approval 후 v1.0 별도 확정. 지금은 **STOP**.
