# M6 Worker Handoff

```text
MISSION_ID: COSMILE_O1_TOSS_NOTIFICATION_RETRY_RECONCILIATION_RELIABILITY_V1
MODULE: M6_BOUNDED_OPERATOR_RECONCILIATION_RUNTIME
ACTOR: cosmile
ROLE: Cosmile Worker
SKILL: /fable-builder
MODEL: Opus 4.8
EFFORT: max
WORKTREE: /home/leo/Project/.worktrees/Cosmile/COSMILE_O1_TOSS_NOTIFICATION_RETRY_RECONCILIATION_RELIABILITY_V1
BRANCH: implementation/cosmile-o1-toss-reliability-v1-20260719
BASE: 89affb86eeaf0a52a28297ac9e973c19f9cfa248

ENTRY_READS:
- /home/leo/Project/agent-office/AGENTS.md
- /home/leo/Project/agent-office/CLAUDE.md
- /home/leo/Project/agent-office/docs/agent/TEAM_OPERATING_MODEL.md
- /home/leo/Project/agent-office/docs/agent/roles/worker.md
- /home/leo/Project/agent-office/docs/agent/RESULT_REPORTING_PROTOCOL.md
- /home/leo/Project/agent-office/docs/agent/RUN_PROTOCOL.md
- applicable repository AGENTS.md and CLAUDE.md

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
3. app/src/lib/runtime/o1ReliabilityRuntime.ts
4. app/src/app/api/o1/operator/reconciliation/route.ts
5. app/src/app/o1/operator/page.tsx
6. app/scripts/o1_toss_reconciliation_runtime.vitest.ts
7. app/scripts/o1_toss_reconciliation_runtime.dbtest.py

OBJECTIVE:
- Add the minimum non-production operator reconciliation projection and manual bounded recovery trigger over the existing M4/M5 substrate.
- Never wire legacy runO1VerificationSweep. No scheduler, new service, schema, migration, or new economic semantics.

FINAL PRE-WIRING R1E GATE — RUN ONCE BEFORE ANY M6 FEATURE WRITE:
- Confirm BASE, clean/upstream-equal Git state, absence of app/node_modules, app/.next, and app/tsconfig.tsbuildinfo, and that app/node_modules is ignored/untracked.
- Verify source/shared app/package.json and app/package-lock.json are byte-identical. Capture the shared node_modules byte baseline.
- Copy read-only /home/leo/Project/Cosmile/app/node_modules directly to the worktree app/node_modules using `cp -a --reflink=auto --no-preserve=links`; it must be a real ignored directory, not a symlink or hardlink. Verify representative source/destination inodes differ.
- Run offline Prisma generate exactly once from app/ against the pinned schema with process-local `DATABASE_URL=postgresql://localhost:1/o1_schema_validation`, `CHECKPOINT_DISABLE=1`, `PRISMA_HIDE_UPDATE_MESSAGE=1`, `PRISMA_GENERATE_SKIP_AUTOINSTALL=1`, and `npm_config_offline=true`. No install, download, network, or DB connection.
- Before typecheck, prove both `@prisma/client` and forwarded `.prisma/client/default` resolve inside the worktree app/node_modules.
- Reapply only the approved one-line fail-closed narrowing in app/src/lib/runtime/o1ReliabilityRuntime.ts: after the exhaust branch returns, return unless `d.kind === "reschedule"` before reading delayMinutes.
- Run exactly once from app/: `./node_modules/.bin/tsc --noEmit -p tsconfig.json --incremental false`.
- Only if typecheck passes, run exactly once from app/ with `NEXT_TELEMETRY_DISABLED=1` and the same unreachable sentinel DATABASE_URL: `./node_modules/.bin/next build`.
- Do not start or serve the build. No DB/provider/network endpoint may be contacted.
- If either gate fails: revert the one line, remove only attributable app/node_modules, app/.next, app/tsconfig.tsbuildinfo and panic artifacts, verify shared bytes unchanged and Git clean/upstream-equal, return HOLD, and do not diagnose/retry/M6/Reviewer. No fourth environment correction is authorized.
- If both pass: remove app/.next and app/tsconfig.tsbuildinfo, preserve the ignored real app/node_modules and approved one-line narrowing, STOP for Advisor validation, then resume only the frozen seven-path M6 scope after Advisor confirmation.

CONTRACT_TO_CODE_GATE:
- Before code, map every requirement below to one of the seven paths and a focused test; no blank row. A blank requires STOP to foundation-advisor.

POST_AUTHORIZATION:
- POST requires the existing authenticated session, exact operator allowlist resolution, and existing test-only route-boundary step-up authorization.
- Use action=order_recovery, a fixed bounded non-economic sweep scope/reason, the allowlisted operator context, the submitted protected step-up value, and a fresh server-minted single-use nonce.
- Consume the nonce before verification/bridge execution. Missing, invalid, stale, mismatched, or replayed authorization calls runO1RecoveryBridge ZERO times and causes ZERO provider/economic/internal effect.
- POST accepts exactly stepUpSecret and stepUpNonce only. Reject any additional caller key, including order/payment/refund/provider reference, amount, currency, or limit.
- The recovery limit is a fixed server constant and bounded; the caller cannot select it. Valid authorization invokes runO1RecoveryBridge exactly once.
- The route-boundary requesting actor remains category-only operator authorization. M5 automated continuation/finalization remains category-only system/system, distinguishable and never impersonating the operator or creating new refund authority. Do not pass an operator identity into the bridge or persist/expose it.

GET_PROJECTION:
- GET requires the same authenticated allowlisted operator and is bounded/read-only/fail-closed.
- Return/display category/status/count-only reconciliation state. Do not expose account/order/payment/refund/provider identifiers, amount, currency, PII, cookies/tokens/hashes, payloads, keys, secrets, raw errors, or economic identifiers.
- Project verifyState=exhausted plus processedState=received only as exhausted_unverified. It remains reconciliation-visible, is not claimable/reprocessed, and is never complete.
- A GET may mint the existing ephemeral route-boundary nonce for the form; it must make no durable/economic/product mutation.
- Keep the operator page change minimal; no redesign or unrelated dashboard behavior.

R2_R3_INVARIANTS:
- Exhausted rows are excluded from claim paths by the existing pending-only fence and remain visible through a bounded projection/reconciliation category.
- system/system is permitted only inside M5 for continuation/finalization of the exact durable previously authorized full-refund operation. It cannot initiate a refund or borrow operator authority.
- The M6 operator authorization only requests one bounded sweep. Its outcome is category/count-only and cannot assert economic completion.

TESTS_FIRST_AND_DELTA_ONLY_VERIFICATION:
- First create focused RED tests in the two authorized new test paths; then implement the smallest seven-path delta.
- Vitest command only: NODE_PATH="$PWD/node_modules" ./node_modules/.bin/vitest run scripts/o1_toss_reconciliation_runtime.vitest.ts
- DB test command only: python3 scripts/o1_toss_reconciliation_runtime.dbtest.py using one disposable synthetic PostgreSQL instance with loopback/socket containment and cleanup evidence.
- Prove unauthorized/missing/invalid/stale/mismatch/replay => zero bridge call; valid step-up => one fixed bounded bridge call; extra input rejection; GET authorization/redaction/bounds; exhausted_unverified visibility and non-reprocessing; operator-request/system-continuation separation; replay/exactly-once safety.
- Fake transport only. External provider/network calls and real economic effects: ZERO.
- Do not rerun typecheck, build, or Prisma generate after R1E. No other test, full suite, validate, install, route/runtime start, shared/production DB, or provider command.

STRICT_EXCLUSIONS:
- No path outside the seven; no schema/migration; no scheduler/service; no legacy sweep; no new money/refund authority; no UI redesign; no provider/network; no shared/production DB; no PII/secret/identifier exposure; no M7 or next mission.
- No out-of-freeze repair after R1 failure, test weakening, optional documentation, or policy invention.

STOP_CONDITIONS:
- Any extra path/schema/service, new economic semantic/effect, operator impersonation, identifier exposure, compile/build failure, unsafe dependency/runtime need, contract gap, scope expansion, or need for a fourth environment correction.

GIT_AND_RETURN:
- Advisor monitors paths and commands. Exact-path staging only; one additive product commit; one non-force push only after every gate passes. Before the commit, remove the ignored app/node_modules copy and verify shared bytes unchanged.
- At reporting, read implementation-report-template and return a compact evidence index within 80 lines.
- STOP after M6. Do not dispatch a Reviewer or begin another module.

RESULT_FILE: /home/leo/Project/.mission-tmp/COSMILE_O1_TOSS_NOTIFICATION_RETRY_RECONCILIATION_RELIABILITY_V1/worker/70_M6_RESULT.md
POINTER_FILE: /home/leo/Project/.mission-tmp/COSMILE_O1_TOSS_NOTIFICATION_RETRY_RECONCILIATION_RELIABILITY_V1/worker/71_M6_POINTER.md
REPORT_CEILING: 80 lines
RETURN_TO: foundation-advisor
STOP
```
