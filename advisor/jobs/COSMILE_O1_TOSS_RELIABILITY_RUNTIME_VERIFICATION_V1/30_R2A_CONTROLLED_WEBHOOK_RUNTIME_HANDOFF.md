# R2A Controlled Webhook Runtime — Cosmile Worker

MISSION_ID: `COSMILE_O1_TOSS_RELIABILITY_RUNTIME_VERIFICATION_V1`
MODULE: `R2A_CONTROLLED_WEBHOOK_INTAKE_CORRELATION_ACK`
PRODUCT_BASE: `6e43735e496a93597a1f3423f88f9966aeba758b`
PRODUCT_WORKTREE: `/home/leo/Project/.worktrees/Cosmile/COSMILE_O1_TOSS_RELIABILITY_RUNTIME_VERIFICATION_V1`
WORKER: existing `cosmile:0.0` / Cosmile Worker / Opus 4.8 / xhigh
SKILL: `/fable-builder`; read `implementation-execution` and `test-design-before-code`; read `implementation-report-template` only for the result.
INSTRUCTION_GATE: `PROCEED_WITH_LIMITS`
PRODUCT_WRITE: `PROHIBITED`
PROVIDER_OR_GOOGLE_CONTACT: `PROHIBITED`
REVIEW_TIER: `SMALL`; no Independent Reviewer.

## Exact objective

Prove only the controlled provider-shaped synthetic HTTP composition for:

1. notification intake and durable `200`;
2. exact duplicate deduplication and durable `200`;
3. delayed and out-of-order distinct-event intake without economic effect;
4. paymentKey-missing merchant-order query through the already-implemented local substitute and durable correlation;
5. binding mismatch quarantine/fail-closed behavior;
6. ACK classes: disabled/internal-not-enabled `404`, body-too-large `413`, repository/transport/non-allowlisted future outcome `503`, current durably recorded/decided outcomes `200`.

Do not run verification leases, restart recovery, exhaustion, capture/refund recovery, operator routes, or any R2B/R2C/R2D/R3/R4 action.

## Exact product read ceiling

- `app/src/app/api/o1/webhooks/toss/route.ts`
- `app/src/lib/payment/contracts.ts`
- `app/src/lib/payment/repository.ts`
- `app/src/lib/payment/webhook.ts`
- `app/src/lib/payment/tossV2.ts`
- `app/src/lib/payment/reliability.ts`
- `app/src/lib/runtime/o1CommerceRuntime.ts`
- `app/src/lib/runtime/o1ReliabilityRuntime.ts`
- `app/scripts/o1_nonprod_fixture_setup.vitest.ts`
- `app/scripts/o1_browser_runtime_contract.vitest.ts`
- `app/prisma/schema.prisma` and the nine committed `migration.sql` files only for migration/fixture compatibility.

No product path may be edited, staged, committed, or generated.

## Exact temporary/output paths

- Private execution root: `/home/leo/Project/.mission-tmp/COSMILE_O1_TOSS_RELIABILITY_RUNTIME_VERIFICATION_V1/r2a` (`leo:leo`, `0700`).
- One execution driver only: `r2a_http_driver.ts` (`leo:leo`, `0600`), created with `apply_patch`.
- Empty local Foundation bundle: `foundation-bundle/` (`leo:leo`, `0700`).
- Durable result: `/home/leo/Project/.mission-tmp/COSMILE_O1_TOSS_RELIABILITY_RUNTIME_VERIFICATION_V1/worker/30_R2A_RESULT.md` (`0600`).
- Durable pointer: `/home/leo/Project/.mission-tmp/COSMILE_O1_TOSS_RELIABILITY_RUNTIME_VERIFICATION_V1/worker/31_R2A_POINTER.md` (`0600`).

No log, PID, config, cache, screenshot, raw response, provider body, identifier, or other artifact is authorized. Hold process IDs in the executing shell; send app output to `/dev/null`.

## Frozen environment and command ceiling

1. Verify exact base/branch/upstream/clean state; real ignored worktree-local `app/node_modules`; package/lock unchanged; ports `55439` and `31079` and container `cosmile-o1-r2a-pg-20260720` absent.
2. Create only the exact private root, bundle, and driver. The driver may use worktree-local TypeScript/module resolution, internal synthetic identifiers in memory, localhost HTTP, and Prisma reads/writes strictly needed to prepare/assert these named synthetic cases. It must emit only booleans, counts, status classes, and scenario categories.
3. Start exactly one local `postgres:16-alpine` container with `--pull=never`, tmpfs database storage, synthetic credentials, and host bind `127.0.0.1:55439:5432` only. Wait with `pg_isready`.
4. Run the worktree-local locked Prisma CLI `migrate deploy` once against that DB and the committed schema. Apply exactly nine committed migrations; no manual SQL/schema/migration change.
5. Run only committed `app/scripts/o1_nonprod_fixture_setup.vitest.ts` in its one-shot preserve-for-runtime mode to seed the existing synthetic O1 fixture. No other Vitest file/test may run.
6. Start only the existing app with worktree-local `next dev --hostname 127.0.0.1 --port 31079`, `NODE_ENV=development`, O1 runtime enabled, Google disabled, local Toss substitute enabled, Toss mode `test`, test-shaped synthetic non-secrets, loopback public base URL, and no sandbox one-shot/provider credential. Wait for authoritative TCP readiness.
7. Run only `r2a_http_driver.ts` once. It may issue only localhost requests to `/api/o1/webhooks/toss` and may perform bounded internal setup/assertion for the six named cases. No outbound socket or provider URL is permitted.
8. Where a separate disabled or unavailable process state is required for the frozen ACK matrix, stop the app cleanly and relaunch the same app on the same loopback port with only the corresponding synthetic local flag/invalid loopback DB target; do not create another process or contact a network service. Total scenario-driver execution remains one.
9. Record only categorical/count evidence. Economic/provider effects must remain zero: no `PaymentTransaction`, no `Refund`, and no capture/refund transport invocation.
10. Unconditionally stop the complete app process tree and container; remove the exact R2A root, bundle, driver, `.next`, `next-env.d.ts`, and `tsconfig.tsbuildinfo` only if mission-created. Verify ports/container/processes absent and product Git clean/upstream-equal at unchanged HEAD.

No install, copy/symlink, generate, build, typecheck, broad/full test, provider/Google request, shared/production DB, real credential/PII, product commit, docs expansion, R2B-R4, or Reviewer.

## Module gates and STOP

- Before scenario execution, return `READY_TO_RUN` in the pane with exact path/command containment; Advisor will inspect and immediately allow execution if conforming.
- STOP for any extra path, product delta, missing committed fixture boundary, outbound network need, raw identifier/secret output need, economic effect, schema drift, uncertain cleanup, or behavior requiring source correction.
- Do not diagnose alternatives or patch source. Return the named blocker.

## Compact return (maximum 40 lines)

Return only: `SKILL_AND_REFS`, `BASELINE`, `TEMP_PATHS`, `DB_MIGRATIONS_FIXTURE`, `HTTP_SCENARIO_MATRIX`, `ORDER_QUERY_CORRELATION`, `ACK_MATRIX`, `ECONOMIC_EFFECT_COUNT`, `PROVIDER_CONTACT`, `PRODUCT_WRITES`, `CLEANUP`, `GIT_STATE`, `R2A_VERDICT`, `BLOCKER`, `RETURN_TO: foundation-advisor`, `STOP`.
