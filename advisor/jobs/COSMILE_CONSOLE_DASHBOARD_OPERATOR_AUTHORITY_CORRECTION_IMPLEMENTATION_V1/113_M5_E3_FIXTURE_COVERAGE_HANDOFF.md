# M5-E3 Fixture Coverage — Worker Handoff

MISSION_ID: COSMILE_CONSOLE_DASHBOARD_OPERATOR_AUTHORITY_CORRECTION_IMPLEMENTATION_V1
VERDICT: PROCEED_WITH_LIMITS
ACTOR: existing Cosmile Codex fallback Worker
SESSION: cosmile:codex-m1d-recovery.0
MODEL_EFFORT: gpt-5.6-sol / xhigh
WORKTREE: /home/leo/Project/.worktrees/Cosmile/COSMILE_CONSOLE_DASHBOARD_OPERATOR_AUTHORITY_CORRECTION_IMPLEMENTATION_V1
BASE: d7ede8536b0fae7fb9976e836be0c1618839ee10
SKILL: /fable-builder; implementation-execution, contract-to-code-mapping, test-design-before-code, implementation-report-template

ALLOWED_PRODUCT_PATHS:
1. app/src/app/dashboard/page.tsx
2. app/scripts/o1_order_service_request.dbtest.vitest.ts

PRESERVED_RED:
- Corrected typecheck PASS.
- Exact DB file FAIL 43/46: one M1D fulfillment case and two M3C acknowledgement cases lacked active synthetic OperatorPrincipal rows.
- Do not rerun RED.

EXACT_CORRECTION:
- In dashboard/page.tsx import `OperatorCapability` as a type from `@/lib/operator/capability` and narrow only `authorizeCapability`.
- In the DB test add `actorRef` to the two existing pure-service expected acknowledgement calls.
- Add exactly four active synthetic OperatorPrincipal fixture refs needed by existing audited paths: direct-repository fixture ref, `operator_m1d`, `operator-identity-admin`, and `operator-identity-owner`.
- Pass the direct-repository fixture ref only to the existing direct M3C acknowledge and M4A settle calls.
- No authority grant, product behavior, schema, migration, provider, runtime, or economic change.

COMMAND_CEILING:
1. Apply the exact two-path patch.
2. Run corrected typecheck once.
3. If PASS, run only `./node_modules/.bin/vitest run scripts/o1_order_service_request.dbtest.vitest.ts` once against its disposable PostgreSQL.
4. Verify disposable DB absent, exact two-path diff, Git state.
5. On PASS commit once with truthful Codex attribution or no co-author trailer and non-force push.
6. On first failure clean, revert only this turn, return HOLD; no rerun/build/browser/M5 continuation.

RETURN:
- Compact result with changed paths, typecheck/DB outcomes, cleanup, Git HEAD/upstream, economic/provider effects 0.
- RETURN_TO foundation-advisor and STOP.
