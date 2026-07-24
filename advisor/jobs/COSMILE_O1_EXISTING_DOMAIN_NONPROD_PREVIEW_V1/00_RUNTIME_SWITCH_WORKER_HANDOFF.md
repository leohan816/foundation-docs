# FOUNDATION ADVISOR HANDOFF — BOUNDED EXISTING-DOMAIN PREVIEW

MISSION_ID: COSMILE_O1_EXISTING_DOMAIN_NONPROD_PREVIEW_V1
PHASE: PREPARE_VERIFY_SWITCH_STOP
RETURN_TO: foundation-advisor
CLAIM_CEILING: VERIFIED_NONPRODUCTION_EXISTING_DOMAIN_PREVIEW

## Binding

- PRODUCT_WORKTREE: `/home/leo/Project/.worktrees/Cosmile/COSMILE_O1_STOREFRONT_AND_CUSTOMER_ACCOUNT_COMPLETION_V1`
- PRODUCT_BRANCH: `implementation/cosmile-o1-storefront-customer-account-v1-20260724`
- PRODUCT_HEAD: `71e05266086639b4b1ff1f5a277a7f836dc3e5ab`
- EXISTING_DOMAIN: `https://cosmile.leohan.net`
- EXISTING_INGRESS: `/etc/cloudflared/config.yml` -> `127.0.0.1:3000`
- OLD_RUNTIME: `/home/leo/Project/Cosmile/app` at `b8b61d746e2bdbb8d7ab26405bf44fb665ad87a6`
- MISSION_ROOT: `/home/leo/Project/.mission-tmp/COSMILE_O1_EXISTING_DOMAIN_NONPROD_PREVIEW_V1`
- DISPOSABLE_DB: `cosmile-o1-existing-domain-preview-pg-20260724`, loopback `55450`
- STAGING_PORT: `127.0.0.1:31080`
- LIVE_PORT: `127.0.0.1:3000`

Read current Agent Office role/reporting rules and the product root/app `AGENTS.md` and
`CLAUDE.md`. Load `/fable-builder` with only `implementation-execution` and
`implementation-report-template`. Current authority overrides historical docs.

## Exact authority and prohibitions

Prepare and verify the exact candidate, then replace only the old Cosmile port-3000
process after staging readiness. Do not exit, clear, restart, kill, or replace any
tmux session/process. Do not touch another service or hostname.

No tracked product/config/manifest/lock/schema change; no merge; no production/shared
DB; no real PII; no live credentials/payment/provider activation; no Google or Toss
request; no broad test/review. Never print, hash, copy, log, or document secret values.

## Frozen execution

1. Reverify exact candidate branch/HEAD/upstream equality/clean state, package and
   lock hashes, free ports, ingress mapping, old process group/CWD/HEAD, Docker image,
   protected TEST store regular-file ownership/mode and required variable names as
   SET/MISSING only. Stop on mismatch.
2. In candidate `app` only, run once:
   `npm ci --ignore-scripts --no-audit --no-fund --prefer-offline`.
   Require package/lock hashes unchanged and no tracked delta.
3. Run Prisma generate once using the installed locked CLI and a process-local,
   closed-loopback non-secret sentinel `DATABASE_URL`. No migration/DB contact here.
4. Create the mission root/runtime/foundation-bundle directories as `leo:leo 0700`.
   Mission scripts must be created with `apply_patch`, be regular non-symlink files,
   and be `0700`; logs/PID evidence must be `0600`.
5. Start exactly one `postgres:16-alpine` disposable container with `--pull=never`,
   trust auth, tmpfs data, and `127.0.0.1:55450:5432`. Apply only the ten committed
   Prisma migrations. Return only migration count/status categories.
6. Seed only synthetic O1 fixture data through the committed
   `scripts/o1_nonprod_fixture_setup.vitest.ts` one-shot boundary with
   `O1_FIXTURE_ONESHOT=1`, `O1_FIXTURE_PRESERVE_FOR_RUNTIME=1`, external approved
   foundation-bundle root, `NODE_ENV=development`, and the disposable DB. Return
   counts/booleans/categories only.
7. Create an owner-only start wrapper that reads
   `/home/leo/Project/Cosmile/.secrets/nonproduction/toss-test.env` only after
   verifying `leo:leo 0600`, regular and non-symlink. Export only:
   `NODE_ENV=development`, disposable `DATABASE_URL`,
   `COSMILE_O1_RUNTIME_ENABLED=true`, `COSMILE_O1_GOOGLE_AUTH_ENABLED=true`,
   `COSMILE_O1_FOUNDATION_BUNDLE_ROOT`, public base URL,
   `O1_TOSS_MODE=test`, and telemetry disabled. Require both Toss keys SET by name.
   Do not set the local substitute. Start `next dev` on the supplied port and
   `127.0.0.1` only.
8. Start candidate first on 31080. After authoritative TCP readiness, make exactly
   one local GET each to `/`, `/shop`, `/cart`, `/account`, `/account/orders` using
   the public Host and forwarded HTTPS proto. Require HTTP 200 and categorical
   non-production/page markers. No auth/provider action. Stop staging completely.
9. Reverify old process group/CWD/HEAD and port. Stop only the old port-3000 process
   group with TERM and a bounded wait; use KILL only if that exact group remains.
   Start the candidate wrapper on 3000. If readiness fails, execute the exact
   rollback script immediately and return HOLD.
10. Over public HTTPS, make exactly one GET each to the five routes and require 200,
    correct route markers, and explicit non-production presentation. Do not follow
    any auth/payment link. Verify candidate process CWD/HEAD, listener, ingress PID
    and mapping, disposable DB binding, protected-store names-only status, and zero
    provider/economic effect.
11. Preserve a protected rollback script that stops only the candidate process group
    and starts the old app at `127.0.0.1:3000`; do not execute after PASS. Record that
    the old process-only dev flag cannot be reconstructed because its value was not
    read or copied.
12. Keep candidate, disposable DB, bundle, protected runtime log/PID/scripts alive
    after PASS. Remove staging-only residue. Keep durable TEST store untouched.
    Require product Git clean/upstream-equal and no tracked change.

## Return

Write only:
- `10_RUNTIME_SWITCH_WORKER_RESULT.md`
- `11_RUNTIME_SWITCH_WORKER_POINTER.md`

under this mission job directory. Evidence index only: decision, exact process/port/
commit binding, route status/markers, migration/fixture categories, zero-provider
effect, cleanup/preserved paths/modes, rollback, limitations, Git state. Do not include
identifiers or values. Commit and non-force push only those result files on the
existing docs branch, then return commit/blob/SHA-256/path and STOP.
