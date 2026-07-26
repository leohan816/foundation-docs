# Advisor gate — M4 Inventory/HOLD

VERDICT: `PASS`
PRODUCT: `33ff6a7a841affb8d4c984beb4b251e416e38286` → `2ccde154618f1bf31f48727ad33d4964495dc763`
WORKER: existing `cosmile:claude.0` · Claude Opus 5/xHigh · `/fable-builder`

DELTA: exactly 8 paths — inventory read service/repository/page/test; dashboard home, shell, reads test, shell test.
AUTHORITY: existing `dashboard.operations.read` → `catalog.read` → `inventory_hold.read`, same principal; `capability.ts` unchanged; no `inventory.read`.
DATA: eligible catalog identity only; bounded one-query `CommerceSku.stock` plus persisted `reserved|committed` quantities; missing/unknown/duplicate/malformed/incoherent data fails closed.
TRUTH: no available-to-sell or physical-stock inference; committed/HOLD remains distinct; no mock, command, write, schema, provider, or economic path.

CHECKS: RED `3f/38p/1s`; first GREEN `5f/50p/1s`; E1 `1f/54p/1s`; E2 named trailing-comment token; E3 `25p/0f/0s`, run once.
CLASSIFICATION: five E1 failures plus E2 remainder were oracle defects; assertions remain load-bearing and executable `available` identifiers remain detectable.
GIT: product `2ccde15`, pushed non-force, clean/upstream-equal; no co-author trailer; `git diff --check` clean.
EFFECTS: DB/grant/runtime/browser/provider/economic `0`.
LIMIT: aggregate SQL and page rendering remain runtime-unverified.
RESIDUAL: out-of-ceiling `o1_dashboard_reads.vitest.ts` retains stale D04 wording; rebase only under a later exact gate.

EVIDENCE: `178_M4_E3_ORACLE_FIX_RESULT.md`; `179_M4_E3_ORACLE_FIX_POINTER.md`.
NEXT: freeze M5 Payments & Refunds real-read module only; grants remain deferred until M4/M5 code gates close.
