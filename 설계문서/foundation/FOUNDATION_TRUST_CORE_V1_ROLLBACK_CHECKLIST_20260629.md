# Foundation Trust Core v1.0 — Rollback Checklist (2026-06-29)

1. Trust Core는 독립 가드 모듈 집합 — 비활성해도 LMR/Brain 무영향(additive).
2. write/canonical/learned/memory.db 0 → DB/Vault rollback 불필요.
3. trace redaction은 read-only 변환 — 되돌릴 부작용 없음.
4. 실패 시 trust_core_runtime 호출 제거 → 기존 trust_runtime(Brain v1)으로 fallback.
5. regression suite(one-command 67/67) 언제든 재실행.
