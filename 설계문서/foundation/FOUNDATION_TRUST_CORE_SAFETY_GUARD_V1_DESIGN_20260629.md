# Foundation Trust Core / Safety Guard Layer v1.0 — Design (2026-06-29)

> Trust Core를 Brain 내부 기능이 아니라 **독립 Foundation layer**로 formalize. 16 게이트 통합. ★shadow·write 0·raw/draft 저장 0·trace redaction.

## 16 게이트
1 Safety Gate · 2 External Disclosure Guard · 3 Memory Trust Gate M6 · 4 Medical Boundary · 5 Pregnancy/Lactation · 6 Skin Procedure · 7 Product Recommendation · 8 Purchase Decision · 9 Do Not Buy · 10 CDM Consent/Scope · 11 Cross-Customer Isolation · 12 Deleted/Blocked/Expired · 13 Raw/Teacher/LLM Draft Guard · 14 Internal Algorithm Guard · 15 Trace Redaction/Secret · 16 Rollback/Human Approval.

## 모듈
- 개별 가드: `foundation_medical_boundary_guard`·`foundation_purchase_decision_guard`·`foundation_do_not_buy_guard`·`foundation_customer_memory_consent_guard`·`foundation_cross_customer_isolation_guard`·`foundation_deleted_expired_memory_guard`·`foundation_trace_redaction_guard`·`foundation_safety_guard_layer`.
- 계약/런타임: `foundation_trust_core_contract`(16게이트·TrustCoreDecision)·`foundation_trust_core_runtime`(오케스트레이션).

## 핵심 정책
- 의료/임신/수유/시술 assertive/grounded 금지(cautious cap)·근거없이 추천 금지.
- 구매/추천 근거충분+gate 통과 필요·"사지마세요"는 reason+evidence boundary+safer alternative 필수.
- CDM: 삭제/차단/만료/cross-customer 재사용 0·sensitive consent·고위험 reconfirmation·outcome/preference evidence upgrade 0·safety override 0.
- raw/teacher/LLM draft 저장 0·internal 노출 0·trace엔 id/hash/ref/status/reason code만(자동 redaction·secret/PII 차단).

## 검증 → eval 447/447·false_allow 0·trust_core 16 게이트·16/16 테스트(62 assertions). perf p95 0.047ms.
