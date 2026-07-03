# Foundation Brain Runtime v1.0 — Rollback Checklist (2026-06-29)

1. Brain Runtime은 answer.py를 import/patch 안 함 → 비활성화해도 answer.py 무영향(지문 무변경 검증).
2. controlled_apply flag 기본 OFF·canary offline → 실 노출 되돌릴 것 없음.
3. LLM draft는 ephemeral·raw 미저장 → 저장 rollback 불필요.
4. retrieval sampling read-only → Vault rollback 불필요(diff 0).
5. write/canonical/learned/memory.db 0 → DB/Vault rollback 불필요·ssbrain 무변경.
6. 실패 시 Brain 모듈 import 제거 → SIASIU answer runtime 그대로.
7. regression suite(LMR 514 + Brain + FF1 + FF2 = 1124) 언제든 재실행.
