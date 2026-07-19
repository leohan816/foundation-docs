# M3B Worker Handoff

```text
MISSION_ID: COSMILE_O1_TOSS_NOTIFICATION_RETRY_RECONCILIATION_RELIABILITY_V1
MODULE: M3B_DURABLE_WEBHOOK_INTENT_CORRELATION
ACTOR: cosmile
ROLE: Cosmile Worker
SKILL: /fable-builder
MODEL: Opus 4.8
EFFORT: max
WORKTREE: /home/leo/Project/.worktrees/Cosmile/COSMILE_O1_TOSS_NOTIFICATION_RETRY_RECONCILIATION_RELIABILITY_V1
BRANCH: implementation/cosmile-o1-toss-reliability-v1-20260719
BASE: a2178aa47a3580337cf7e2dff18a5bceab05cb25

ENTRY_READS:
- /home/leo/Project/agent-office/AGENTS.md
- /home/leo/Project/agent-office/CLAUDE.md
- /home/leo/Project/agent-office/docs/agent/TEAM_OPERATING_MODEL.md
- /home/leo/Project/agent-office/docs/agent/roles/worker.md
- /home/leo/Project/agent-office/docs/agent/RESULT_REPORTING_PROTOCOL.md
- /home/leo/Project/agent-office/docs/agent/RUN_PROTOCOL.md
- repository AGENTS.md and CLAUDE.md files applicable to the worktree

EXACT_ALLOWED_PATHS:
1. app/prisma/schema.prisma
2. app/prisma/migrations/20260719130000_o1_toss_notification_intent_correlation/migration.sql
3. app/prisma/migrations/20260719130000_o1_toss_notification_intent_correlation/down.sql
4. app/src/lib/payment/contracts.ts
5. app/src/lib/payment/repository.ts
6. app/src/lib/payment/webhook.ts
7. app/src/lib/runtime/o1CommerceRuntime.ts
8. app/scripts/o1_toss_notification_correlation_migration.dbtest.py
9. app/scripts/o1_payment_repository.dbtest.py
10. app/scripts/o1_payment_contract.vitest.ts
11. app/scripts/o1_browser_runtime_contract.vitest.ts
12. app/scripts/o1_golden_order_harness.ts
13. app/scripts/o1_golden_order.vitest.ts

REQUIRED_DELTA:
- Add exactly one nullable internal WebhookEventInbox.paymentIntentId relation/FK to PaymentIntent with onDelete Restrict.
- Persist no raw body, orderNo, paymentKey, secret, PII, or new provider field; perform no backfill.
- In the inbox record/exact-replay transaction, resolve exactly one eligible intent from bounded ephemeral orderNo/paymentKey hints. Both hints, when present, must agree.
- Missing, ambiguous, conflicting, or repository-failed correlation must not create a durable ACK; return a closed correlation_unresolved/error outcome that remains HTTP 503 under the M2 fail-closed default.
- No latest-row guess or global scan. Successful insert, exact replay, or lazy repair atomically binds one intent and initializes M3 pending/due state.
- Keep the binding inside payment/runtime boundaries; never expose it through HTTP, logs, or result evidence.
- Immediate verified settlement must leave M3 verify state consistent. Quarantine and cross-terminal behavior remain fail closed. Economic semantics remain unchanged.

MIGRATION_BOUNDARY:
- One nullable FK only; add a Prisma-matching index only if exact repository-query evidence proves it necessary.
- Down aborts if any paymentIntentId is non-null; otherwise drops only new relation objects.
- No destructive change, backfill, other object, shared/production DB, or existing semantic change.

VERIFICATION:
- Tests first; delta-only.
- Run the new disposable PostgreSQL correlation migration test and only named existing focused tests requiring interface/parity updates.
- Cover insert, exact replay, lazy repair, unique resolution, both-hint agreement, missing/ambiguous/conflict 503, non-exposure, zero economic effect, migration/down, and cleanup.
- No full suite, build, typecheck, Prisma generate, provider/network call, or unrelated test.
- The prior ignored app/node_modules symlink may be used only if required, without install/copy/generate, and must be removed with absence evidence.

GIT_AND_STOP:
- Tests-first implementation, exact-path staging, one product commit, one non-force push.
- Do not amend/rebase/merge/force-push or touch another path.
- Any needed path/scope/semantic expansion returns to foundation-advisor before action.
- STOP after the M3B result; do not start M4/M5/M6 or dispatch another actor.

RESULT_FILE: /home/leo/Project/.mission-tmp/COSMILE_O1_TOSS_NOTIFICATION_RETRY_RECONCILIATION_RELIABILITY_V1/worker/30_M3B_RESULT.md
POINTER_FILE: /home/leo/Project/.mission-tmp/COSMILE_O1_TOSS_NOTIFICATION_RETRY_RECONCILIATION_RELIABILITY_V1/worker/31_M3B_POINTER.md
REPORT_CEILING: 80 lines; compact evidence index only.
RETURN_TO: foundation-advisor
STOP
```
