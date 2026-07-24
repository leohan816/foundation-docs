# Worker Follow-up Supersession — Focused Disposable DB File

MISSION_ID: `COSMILE_O1_REVIEWED_INTEGRATION_CANDIDATE_BASELINE_V1`
SUPERSEDES: handoff 20 full-suite re-gate only
PRODUCT_WRITE: `PROHIBITED`

Preserve the first gate exactly: network-isolated generate-first execution
produced `42 passed / 1 failed` files and `865 passed / 37 failed / 7 skipped`
tests; the 37 failures were all the one disposable-DB file being unable to
reach its own host-loopback PostgreSQL.

## Exact bounded continuation

Same Worker/session/model/skill, exact head/worktree/branch, no product change.

1. Verify clean/upstream-equal `e1a5f3f`, no dependency/test/container/port
   residue, canonical fixed-locale baseline, and existing local
   `postgres:16-alpine` image. If the image is absent, STOP; do not pull.
2. Run one normal lockfile `npm ci --no-audit --no-fund` into real worktree-local
   `app/node_modules` using the owner-only mission HOME/XDG/npm cache.
3. Run exactly once:
   `npm run test:focused -- scripts/o1_order_service_request.dbtest.vitest.ts --cache=false`
   on the host so the existing test can reach only the disposable PostgreSQL it
   creates on `127.0.0.1`. The package script must generate the candidate Prisma
   client `6.19.3` first.
4. The existing test alone may start its existing local image, apply the exact
   committed migrations, and seed synthetic fixtures. Load no owner env,
   provider credential, Google/Toss value, or production/live flag. Perform no
   app runtime, provider, shared/production DB, or external action.
5. Do not run any other Vitest file, full suite, typecheck, build, lint, retry,
   or diagnostic expansion. On failure preserve the first actionable failure
   and STOP.
6. Unconditionally remove the disposable container, close its loopback port,
   and remove only mission dependencies/cache/temp/test/build residue. Require
   canonical fixed-locale equality and exact clean/upstream-equal product state.
7. Update only existing `11_WORKER_RESULT.md` and `12_WORKER_POINTER.md` to
   combine:
   - preserved isolated evidence: 42 files / 865 tests passed, 7 skipped;
   - this focused DB-file result and counts.
   Do not commit or push. Return to Advisor and STOP.
