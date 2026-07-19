# M4 Worker Handoff

```text
MISSION_ID: COSMILE_O1_TOSS_NOTIFICATION_RETRY_RECONCILIATION_RELIABILITY_V1
MODULE: M4_RESTART_SAFE_VERIFICATION_REPAIR_SUBSTRATE
ACTOR: cosmile
ROLE: Cosmile Worker
SKILL: /fable-builder
MODEL: Opus 4.8
EFFORT: max
WORKTREE: /home/leo/Project/.worktrees/Cosmile/COSMILE_O1_TOSS_NOTIFICATION_RETRY_RECONCILIATION_RELIABILITY_V1
BRANCH: implementation/cosmile-o1-toss-reliability-v1-20260719
BASE: b36cacc70876edd8e23eeb649fe789af77071d9a

ENTRY_READS:
- /home/leo/Project/agent-office/AGENTS.md
- /home/leo/Project/agent-office/CLAUDE.md
- /home/leo/Project/agent-office/docs/agent/TEAM_OPERATING_MODEL.md
- /home/leo/Project/agent-office/docs/agent/roles/worker.md
- /home/leo/Project/agent-office/docs/agent/RESULT_REPORTING_PROTOCOL.md
- /home/leo/Project/agent-office/docs/agent/RUN_PROTOCOL.md
- repository AGENTS.md and CLAUDE.md files applicable to the worktree

EXACT_ALLOWED_PATHS:
1. app/src/lib/payment/contracts.ts
2. app/src/lib/payment/repository.ts
3. app/src/lib/payment/reliability.ts
4. app/src/lib/runtime/o1ReliabilityRuntime.ts
5. app/scripts/o1_toss_reliability_contract.vitest.ts
6. app/scripts/o1_toss_reliability.dbtest.py

OBJECTIVE:
- Implement only the restart-safe leased verification/repair decision and repository-claim substrate.
- M5/M6 remain blocked. Economic authority is ZERO: no capture, refund, order, inventory, DB economic, or provider effect.

ATTEMPT_POLICY:
- MAX_VERIFY_ATTEMPTS=7.
- Unresolved/retryable attempts 1..6 use deterministic backoff minutes [1,4,16,64,256,1024].
- An unresolved/retryable attempt 7 atomically sets verifyState=exhausted, clears due/lease, and opens-or-reuses exactly one bounded webhook_unverified reconciliation task.
- Exhaustion is evidence/operator escalation only, never an economic decision.

LEASE_AND_RESTART_RULES:
- Claim only due pending rows with absent/expired lease; claim atomically increments attempts and leaseVersion and returns that fencing token.
- Only the matching current leaseVersion may settle, reschedule, or exhaust. Live leases cannot be reclaimed; expired leases can.
- Repository/transport/non-conclusive outcomes reschedule unless at the attempt bound.
- Verified/quarantined terminal outcomes leave the due queue.
- No historical backfill, latest/global scan, raw payload persistence, or identifier exposure.

VERIFICATION:
- Tests first; focused delta only in the two authorized test paths.
- Prove attempts/backoff, live/expired lease behavior, fencing, restart recovery, retryable reschedule, attempt-7 exhaustion, exactly-one reconciliation open/reuse, terminal removal, and zero economic effect.
- No full suite, build, typecheck, Prisma generate/validate, provider/network call, shared/production DB, or unrelated test.
- Any disposable DB must be synthetic, isolated, cleaned, and evidenced categorically.

GIT_AND_STOP:
- Exact-path staging; one product commit; one non-force push.
- No schema/migration/new path, backfill, refactor, or scope expansion.
- Any need beyond the six paths returns to foundation-advisor before action.
- STOP after the M4 result; do not start M5/M6 or dispatch another actor.

RESULT_FILE: /home/leo/Project/.mission-tmp/COSMILE_O1_TOSS_NOTIFICATION_RETRY_RECONCILIATION_RELIABILITY_V1/worker/40_M4_RESULT.md
POINTER_FILE: /home/leo/Project/.mission-tmp/COSMILE_O1_TOSS_NOTIFICATION_RETRY_RECONCILIATION_RELIABILITY_V1/worker/41_M4_POINTER.md
REPORT_CEILING: 80 lines; compact evidence index only.
RETURN_TO: foundation-advisor
STOP
```
