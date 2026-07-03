# Foundation Brain Runtime — v0.9 Rollback Checklist (2026-06-29)

> Brain Runtime은 answer.py와 **분리된 shadow 계층**. 적용/쓰기 0이라 rollback이 단순.

1. Brain Runtime은 answer.py를 import/patch 안 함 → 비활성화해도 answer.py 무영향(소스 지문 무변경 검증).
2. controlled_apply feature flag 기본 OFF → 끄면 즉시 shadow-only 복귀.
3. canary는 offline·실 노출 0 → 되돌릴 사용자 노출 없음.
4. write/canonical/learned/memory.db 0 → DB/Vault rollback 불필요.
5. 실패 시: Brain 모듈 비활성(import 제거) → SIASIU answer runtime 그대로 유지.
6. regression suite(LMR 514 + Brain) 언제든 재실행 가능.
