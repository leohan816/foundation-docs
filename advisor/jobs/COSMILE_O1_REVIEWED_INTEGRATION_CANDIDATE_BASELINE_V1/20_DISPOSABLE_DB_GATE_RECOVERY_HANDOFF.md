# Worker Follow-up — Disposable DB Full-Gate Recovery

MISSION_ID: `COSMILE_O1_REVIEWED_INTEGRATION_CANDIDATE_BASELINE_V1`
PRODUCT_WRITE: `PROHIBITED`
PRESERVE_FIRST_FAILURE: `REQUIRED`

## Advisor decision

The first full gate is valid preserved evidence:
`1 failed / 42 passed` files; `37 failed / 865 passed / 7 skipped` tests.
All failures are one class in `scripts/o1_order_service_request.dbtest.vitest.ts`:
its repository test deliberately starts an existing local `postgres:16-alpine`,
applies the exact committed migrations, seeds synthetic fixtures, and connects
through a host-loopback published port. `bwrap --unshare-net` made that test's
own host-loopback database unreachable; it was an execution-boundary mismatch,
not a product assertion failure. The test's `afterAll` cleanup and Advisor host
check prove the container is absent.

## Exact recovery

Same Worker, skill, head, branch, worktree, and no-product-write boundary.
Every command explicitly binds to the mission product worktree.

1. Verify exact `e1a5f3f`, clean/upstream-equal, no dependency/build/test
   residue, no `o1m1c_ephemeral_*` container, and canonical fixed-locale baseline.
2. Perform one fresh normal `npm ci --no-audit --no-fund` with the mission-local
   owner-only HOME/XDG/npm cache and unchanged lockfile. Canonical dependencies
   remain unused.
3. Run exactly one host-loopback integration re-gate:
   `npm run test:focused -- --cache=false`.
   Do not use `--unshare-net`; the existing DB test must reach the disposable
   PostgreSQL it creates itself. Do not load any owner env or credential store.
   Explicitly unset Google/Toss/provider credentials and live/production flags.
   No provider URL, request, app runtime, or external effect is permitted.
4. Require visible Prisma `6.19.3` generation first and the complete current
   Vitest inventory. The existing DB test alone may start its existing local
   image, apply committed migrations, and seed synthetic data.
5. On the first failure, preserve it and STOP. No retry, code/config/test edit,
   diagnosis expansion, typecheck, build, lint, provider, or runtime action.
6. Unconditionally prove the disposable container and port absent; remove only
   mission dependencies/cache/temp/build/test residue; require canonical fixed-
   locale equality and exact clean/upstream-equal product state.
7. Update only the existing uncommitted `11_WORKER_RESULT.md` and
   `12_WORKER_POINTER.md` with both the preserved first failure and this recovery
   result. Return to Advisor and STOP. Do not commit or push.
