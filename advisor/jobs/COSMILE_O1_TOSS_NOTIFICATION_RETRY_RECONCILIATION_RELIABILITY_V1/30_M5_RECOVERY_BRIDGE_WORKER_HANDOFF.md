# M5 Worker Handoff

```text
MISSION_ID: COSMILE_O1_TOSS_NOTIFICATION_RETRY_RECONCILIATION_RELIABILITY_V1
MODULE: M5_EXISTING_LANES_RECOVERY_BRIDGE
ACTOR: cosmile
ROLE: Cosmile Worker
SKILL: /fable-builder
MODEL: Opus 4.8
EFFORT: max
WORKTREE: /home/leo/Project/.worktrees/Cosmile/COSMILE_O1_TOSS_NOTIFICATION_RETRY_RECONCILIATION_RELIABILITY_V1
BRANCH: implementation/cosmile-o1-toss-reliability-v1-20260719
BASE: ff61ce4159334bc1c24f18a3ffbbaa55aacbe94e

ENTRY_READS:
- /home/leo/Project/agent-office/AGENTS.md
- /home/leo/Project/agent-office/CLAUDE.md
- /home/leo/Project/agent-office/docs/agent/TEAM_OPERATING_MODEL.md
- /home/leo/Project/agent-office/docs/agent/roles/worker.md
- /home/leo/Project/agent-office/docs/agent/RESULT_REPORTING_PROTOCOL.md
- /home/leo/Project/agent-office/docs/agent/RUN_PROTOCOL.md
- repository AGENTS.md and CLAUDE.md files applicable to the worktree

BUILDER_READS_BEFORE_CODE:
- /home/leo/Project/skill/fable-builder/SKILL.md
- /home/leo/Project/skill/fable-builder/references/implementation-execution.md
- /home/leo/Project/skill/fable-builder/references/contract-to-code-mapping.md
- /home/leo/Project/skill/fable-builder/references/test-design-before-code.md

BUILDER_READ_AT_REPORTING_ONLY:
- /home/leo/Project/skill/fable-builder/references/implementation-report-template.md

EXACT_ALLOWED_PATHS:
1. app/src/lib/payment/contracts.ts
2. app/src/lib/payment/repository.ts
3. app/src/lib/payment/webhook.ts
4. app/src/lib/runtime/o1ReliabilityRuntime.ts
5. app/scripts/o1_toss_recovery_bridge.vitest.ts
6. app/scripts/o1_toss_recovery_bridge.dbtest.py

OBJECTIVE:
- Add only the bounded bridge from verified provider truth into the EXISTING capture and full-refund reconciliation lanes.
- Reuse confirmCapture, refundFullCapture, confirmCapturedOrder, finalizeRefundToOrder, server verification/query binding, the existing repositories, and M4 lease fencing.
- Do not create another payment/refund/order/inventory truth path or any new economic semantics.

AUTHORIZED_SCENARIOS:
1. Capture succeeded at the provider but internal capture persistence failed.
2. Capture persisted but the order remains unbound.
3. Full refund succeeded at the provider but internal refund persistence failed.
4. Refund persisted but the order remains unfinalized.
5. Replay/restart converges exactly once.

REFUND_RECOVERY_POLICY_CLOSURE:
- Background recovery may continue an already-authorized refund without fresh operator step-up ONLY when one durable Refund row proves the SAME prior operation: exact order, exact succeeded capture, exact full amount, KRW, the existing stable internal/provider idempotency binding, and the existing authorization/audit boundary.
- It may retry only that identical idempotent provider operation and internal finalization.
- It may not create a refund, change order/capture/amount/currency, infer authorization, or manufacture a new operator/step-up decision.
- Missing, ambiguous, or mismatched evidence means ZERO provider/economic action and a fail-closed HOLD/reconciliation result.
- Initial refund initiation remains operator-step-up-only and is unchanged.

NON_NEGOTIABLE_INVARIANTS:
- Provider inspection under M5 must not terminally settle the inbox before the required internal convergence completes.
- Existing serverVerifyWebhook behavior for its current callers must remain unchanged; any query/settlement separation is bounded and preserves its contract.
- Only the matching current leaseVersion may persist settle/reschedule/exhaust. A stale lease cannot persist schedule or terminal state.
- Concurrent retry may invoke only the byte-identical idempotent operation; existing provider idempotency, CAS, and unique constraints must yield at most one capture and at most one full-refund effect.
- Capture convergence must use confirmCapture then confirmCapturedOrder; refund convergence must use refundFullCapture then finalizeRefundToOrder, with the approved durable-prior-authorization proof and no invented authority.
- Non-conclusive, partial, mismatched, unauthorized, or stale outcomes make no new economic truth and remain HOLD/reconciliation.
- Refund never restores sellable inventory; the existing committed/HOLD rule remains unchanged.
- Schema and migration effect: NONE.

TESTS_FIRST_AND_VERIFICATION:
- Produce a complete contract-to-code mapping with no blank row before writing product code; any blank is STOP.
- Write focused failing tests first in the two authorized new test paths, preserve RED, then implement the smallest safe diff.
- Pure test command only: process-local NODE_PATH plus the existing pinned Vitest binary, running app/scripts/o1_toss_recovery_bridge.vitest.ts only.
- DB test command only: python3 app/scripts/o1_toss_recovery_bridge.dbtest.py against one isolated disposable PostgreSQL with synthetic data, loopback/socket containment, and mandatory cleanup evidence.
- Prove every authorized scenario, crash point between provider inspection and internal convergence, stale-token rejection, concurrent identical retry, one capture maximum, one full refund maximum, idempotent order/refund finalization, non-conclusive/partial/mismatch HOLD, and zero unauthorized effect.
- No external network/provider call or real economic effect. Fake injected transport only. Synthetic disposable DB mutations are test evidence only.
- No full suite, build, typecheck, Prisma generate/validate, existing broad test, provider endpoint, shared/production DB, or unrelated verification.

STRICT_EXCLUSIONS:
- No schema/migration, new money semantics, partial refund, cancellation/return, UI/operator queue, M6, production/shared DB, live Toss, PII, broad refactor, new authorization model, or path outside the six.
- No test weakening, fixture rewriting to obtain green, silent deviation, or implementation of a contract gap.

STOP_CONDITIONS:
- Authorization would need to be invented or prior authorization cannot be proved durably.
- Provider inspection cannot be separated from terminal settlement without weakening an existing caller contract.
- Existing capture/refund/order lanes cannot express convergence inside the six paths.
- Any extra product path, schema/migration, new semantic, provider access, or scope expansion is required.
- Repeated failure or contract contradiction triggers return to foundation-advisor; do not choose policy.

GIT_AND_RETURN:
- Exact-path staging; one additive product commit; one non-force push.
- At reporting, read implementation-report-template and write only compact evidence within 80 lines.
- STOP after M5 result. Do not start M6 and do not dispatch any actor.

RESULT_FILE: /home/leo/Project/.mission-tmp/COSMILE_O1_TOSS_NOTIFICATION_RETRY_RECONCILIATION_RELIABILITY_V1/worker/50_M5_RESULT.md
POINTER_FILE: /home/leo/Project/.mission-tmp/COSMILE_O1_TOSS_NOTIFICATION_RETRY_RECONCILIATION_RELIABILITY_V1/worker/51_M5_POINTER.md
REPORT_CEILING: 80 lines
RETURN_TO: foundation-advisor
STOP
```
