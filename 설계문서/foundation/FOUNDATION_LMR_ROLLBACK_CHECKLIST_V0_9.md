# Foundation — LMR v0.9 Rollback / Migration Checklist

> **2026-06-28 · v0.9 RC.** 실 이전 실행 아님 — 절차 정의. 실 이전은 human approval 후 별도 작업.

## Migration Checklist (순서)

1. [pending] freeze SIASIU LMR regression suite (delete_forbidden) — `자동`
2. [pending] copy pure-logic modules to foundation.lmr namespace (no behavior change) — `자동`
3. [pending] remap fixture/vault paths (read-only) — `자동`
4. [pending] re-run full regression under simulated Foundation layout — `자동`
5. [pending] verify boundary scan clean (no ssbrain/answer/memory.db/live import) — `자동`
6. [pending] verify write=0, live=0, promotion=0 in rehearsal — `자동`
7. [pending] human approval checkpoint (REQUIRED — not automated) — `★human`

## Rollback Checklist (실패 시)

1. keep SIASIU as source of truth until Foundation parity proven (reversible=True)
2. Foundation copy is additive — SIASIU modules untouched (reversible=True)
3. on failure: drop foundation.lmr namespace, SIASIU LMR unchanged (reversible=True)
4. no canonical/learned promotion occurred → nothing to revert in Vault (reversible=True)
5. regression suite re-runnable in SIASIU at any time (reversible=True)
6. ssbrain.sqlite unchanged → no DB rollback needed (reversible=True)

## 핵심 안전 보장

- Foundation 복사는 **additive** — SIASIU 모듈 무변경.
- canonical/learned 실승격 0 → Vault에 되돌릴 것 없음.
- ssbrain.sqlite 무변경 → DB rollback 불필요.
- regression suite는 SIASIU에서 언제든 재실행 가능(delete_forbidden).
- **실 이전 전 human approval 필수**(자동화 금지 체크포인트).
