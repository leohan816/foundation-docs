# R1 Environment Admission — Cosmile Worker

MISSION_ID: `COSMILE_O1_TOSS_RELIABILITY_RUNTIME_VERIFICATION_V1`
MODULE: `R1_ENVIRONMENT_ADMISSION_ONLY`
PRODUCT_BASE: `6e43735e496a93597a1f3423f88f9966aeba758b`
PRODUCT_WORKTREE: `/home/leo/Project/.worktrees/Cosmile/COSMILE_O1_TOSS_RELIABILITY_RUNTIME_VERIFICATION_V1`
WORKER: `cosmile` / Opus 4.8 / xhigh
SKILL: `/fable-builder`; read `implementation-execution`, `contract-to-code-mapping`, and `implementation-report-template` only.
PRODUCT_WRITE: `PROHIBITED`
REVIEW_TIER: `SMALL`; no Independent Reviewer.

## Exact boundary

- Reuse the existing real ignored `app/node_modules`; no install, copy, symlink, generate, build, typecheck, or test suite.
- One disposable PostgreSQL 16 container only: `cosmile-o1-r1-pg-20260720`, bound `127.0.0.1:55439`, tmpfs data, synthetic database/user/password.
- Apply only the nine committed `app/prisma/migrations/*/migration.sql` files through `app/node_modules/.bin/prisma migrate deploy --schema app/prisma/schema.prisma`.
- Seed only two synthetic Google-category identities and the existing O1 synthetic catalog fixture through `bindPrincipal`/`prismaIdentityStore` and `setupO1Fixture`; no identifiers or tokens in output.
- Start only the existing app on `127.0.0.1:31079`, development mode, deterministic local Toss substitute, synthetic non-secret configuration. `O1_TOSS_SANDBOX_ONESHOT` must be absent.
- Liveness is one GET `/` status-class check only. No R2/R3 scenario route, payment, webhook, recovery, reconciliation, Google, or provider traffic.
- Stop app and database; remove exact R1 temp files, bundle, logs, PID, `.next`, `next-env.d.ts`, and `tsconfig.tsbuildinfo`; prove both ports closed and container absent.

## Exact mission-temporary paths

Root: `/home/leo/Project/.mission-tmp/COSMILE_O1_TOSS_RELIABILITY_RUNTIME_VERIFICATION_V1/r1`

- `r1_seed.vitest.ts`
- `r1_vitest.config.ts`
- `foundation-bundle/`
- `app.log`
- `app.pid`

The temporary Vitest file is an execution driver only. It imports the existing boundaries above, performs one exact seed action, asserts `ready`, and emits no identifier or secret. The config root is this R1 temp root and aliases `@` to the pinned worktree `app/src`. Run only this file with the worktree-local Vitest binary; no repository test file may run.

## Frozen command/evidence sequence

1. Verify product HEAD/branch/upstream clean; `app/node_modules` real, ignored, owner `leo`, mode `0700`; package/lock/schema/migration hashes match the Advisor pins; ports/container absent; local image `postgres:16-alpine` exists. STOP on mismatch.
2. Capture pre-state Git status and hashes for package, lock, schema, `tsconfig.json`; confirm `.next` absent.
3. Create the exact protected R1 temp root (`leo:leo`, `0700`) and two temp driver files (`0600`) using `apply_patch`.
4. Start the exact disposable container with `--pull=never`, tmpfs database storage, and host bind `127.0.0.1:55439:5432`; wait only with `pg_isready`.
5. Run `prisma migrate deploy` once with the synthetic loopback `DATABASE_URL`; record exit category and applied migration count only.
6. Run the one exact temporary seed driver once; then query only counts: snapshots, SKU bindings, commerce SKUs, customer accounts, auth identities. Expected: `1,1,1,2,2`. Do not emit row values.
7. Start `next dev --hostname 127.0.0.1 --port 31079` with the same DB and bundle, `NODE_ENV=development`, O1/Google flags true, local-substitute flag `1`, synthetic test-shaped Toss names, local public base URL, synthetic operator allowlist and step-up values. Do not set one-shot/provider execution.
8. Wait boundedly for loopback readiness; perform exactly one GET `/`; record only reachable boolean and HTTP status class.
9. Teardown and cleanup exactly as above, even after failure. Capture final counts/categories before DB destruction only; never identifiers.
10. Verify product Git clean/upstream-equal at unchanged HEAD, package/lock/schema/tsconfig hashes unchanged, no tracked/untracked product artifact, container absent, ports closed, exact R1 temp root absent.

## Stop conditions

STOP immediately for any tracked product change, unexpected untracked product artifact, migration/schema drift, dependency/codegen request, non-loopback bind, provider/network attempt, real credential/PII need, scenario route traffic, seed boundary failure, unexpected write path, or cleanup failure. Do not self-correct product source or broaden commands.

## Compact return (maximum 40 lines)

Return only: `SKILL_AND_REFS`, `BASELINE`, `DEPENDENCY_REUSE`, `POSTGRES_CONTAINMENT`, `MIGRATIONS`, `SYNTHETIC_SEED_COUNTS`, `APP_LIVENESS`, `PROVIDER_CONTACT`, `PRODUCT_WRITES`, `CLEANUP`, `GIT_STATE`, `R1_VERDICT`, `BLOCKER`, `STOP`.
