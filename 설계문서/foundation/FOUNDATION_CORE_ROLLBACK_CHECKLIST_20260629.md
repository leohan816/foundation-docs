# Foundation Core — Rollback Checklist (2026-06-29)
1. `foundation_namespace_enabled=False` → SIASIU fallback(기본).
2. controlled_apply/canary/cosmile flags OFF.
3. foundation/ wrappers는 additive·삭제해도 SIASIU app/ 무영향.
4. write/canonical/learned/memory.db 0 → DB/Vault rollback 불필요.
5. one-command runner로 71/71 regression 재실행 확인.
