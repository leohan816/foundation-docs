# 63 — M2D-E1 Worker Handoff: Idempotent/Read-only Audit Evidence Correction

```text
MISSION: COSMILE_CONSOLE_DASHBOARD_OPERATOR_AUTHORITY_CORRECTION_IMPLEMENTATION_V1
MODULE: M2D-E1
BASE: 758847663c204117ceae545cff95a5c9adb4660a
WORKTREE: /home/leo/Project/.worktrees/Cosmile/COSMILE_CONSOLE_DASHBOARD_OPERATOR_AUTHORITY_CORRECTION_IMPLEMENTATION_V1
ACTOR: existing Cosmile Worker; Claude Opus 4.8 / xhigh
SKILL: /fable-builder
REFERENCE: test-design-before-code; implementation-report-template only at return
RESULT: advisor/jobs/COSMILE_CONSOLE_DASHBOARD_OPERATOR_AUTHORITY_CORRECTION_IMPLEMENTATION_V1/64_M2D_E1_WORKER_RESULT.md
POINTER: advisor/jobs/COSMILE_CONSOLE_DASHBOARD_OPERATOR_AUTHORITY_CORRECTION_IMPLEMENTATION_V1/65_M2D_E1_WORKER_POINTER.md
EFFECT: test evidence only; product/schema/DB/provider/economic/runtime behavior 0
STOP_AFTER: M2D-E1 result
```

## Exact one-path ceiling

`app/scripts/operator_audit_attribution.dbtest.py`

Do not edit the four M2D source files or any other product/docs path except the exact result and pointer above.

## Exact correction

The current test comments and Worker result say idempotent/read-only outcomes add zero audit rows, but no executable assertion proves that source order. Add narrowly bounded source-contract assertions that fail if:

- `bindCapturedOrder` paid/coherent idempotent return can reach its later `writeAuditTx`;
- `finalizeRefund` already-refunded coherent idempotent return can reach its later `writeAuditTx`;
- `recordFulfillmentTransition` equal-target idempotent return can reach its later `writeAuditTx`;
- `admitPaidCancellation` contains any `writeAudit`;
- `settlePaidCancellation` already-completed idempotent return can reach its later `writeAudit`;
- `acknowledgeShippedSupport` already-accepted idempotent return can reach its later `writeAudit`.

Use explicit bounded function slices/marker ordering. Do not weaken or change the existing 42 assertions, fixtures, migrations or expected behavior. Correct the completion report to label these as source-contract evidence, separate from the disposable-DB FK/rollback evidence.

Run only `python3 scripts/operator_audit_attribution.dbtest.py` once. Require GREEN; infra SKIP is not PASS. No other command except exact diff/cleanup/Git checks. One additive commit and non-force push, compact 64/65 return, then STOP. Do not start M3.
