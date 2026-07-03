# Foundation Core Layers v1.0 — Rollback Checklist (2026-06-29)
1. SIASIU `app/ssbrain/foundation_feature_flags` 전부 OFF → answer.py 기존 동작(지문 d7f579443f8a110a).
2. `foundation/` wrappers·api·cosmile는 additive — 삭제해도 SIASIU app/ 무영향.
3. write/canonical/learned/memory.db 0 → DB/Vault rollback 불필요·ssbrain 무변경.
4. Foundation 미가용 시 SIASIU fallback 자동.
5. one-command runner(`foundation_core_test_runner`)로 88/88 regression 언제든 재실행.
