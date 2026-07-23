# P6 Private Prisma Client Refresh and Closure Gate — Worker Handoff

MISSION_ID: `COSMILE_O1_OPERATOR_DASHBOARD_RECLASSIFICATION_AND_CORE_INTEGRATION_V1`
PHASE: `P6_PRIVATE_PRISMA_CLIENT_REFRESH_AND_CLOSURE_GATE`
ACTOR: existing Cosmile Worker, Claude Opus 4.8/xhigh; Codex idle
PRODUCT_BASE: `f212747fc20a707f090d1e3a605a4fdcc9a42303`
CLAIM_CEILING: `IMPLEMENTED_NOT_REVIEWED`
DELTA_ONLY_VERIFICATION: `REQUIRED`
SKILL: `/fable-builder`
REFERENCES: `implementation-execution`; `implementation-report-template` only at return.

Result 104's first failure is an environment mismatch, not a schema gap:
`app/prisma/schema.prisma` already defines `Order.serviceRequest`, while the
canonical generated client lacks it. No tracked product correction is
authorized.

## Exact artifact and command ceiling

- tracked product paths: **NONE**;
- temporary ignored artifact: only worktree `app/node_modules`;
- temporary build artifacts: only `app/.next`, `app/next-env.d.ts`,
  `app/tsconfig.tsbuildinfo`;
- one owner-only mission cache/home under
  `/home/leo/Project/.mission-tmp/COSMILE_O1_OPERATOR_DASHBOARD_RECLASSIFICATION_AND_CORE_INTEGRATION_V1/p6-prisma-refresh`.

Preflight must prove product base clean/upstream-equal; worktree
`app/node_modules` absent and Git-ignored; worktree/canonical
`package.json` and `package-lock.json` byte-identical; canonical
`node_modules` real/read-only for this run; Prisma and `@prisma/client` both
`6.19.3`. Hash the canonical `.prisma/client` plus `@prisma/client` trees with
the canonical sorted-file SHA-256 command before and after.

Create one real worktree-local dependency copy with:

```bash
cp -a --reflink=auto /home/leo/Project/Cosmile/app/node_modules \
  /home/leo/Project/.worktrees/Cosmile/COSMILE_O1_OPERATOR_DASHBOARD_RECLASSIFICATION_AND_CORE_INTEGRATION_V1/app/node_modules
```

Verify representative source/copy inodes differ. Remove only the copied
absolute self-symlink `app/node_modules/node_modules`; require every remaining
symlink to resolve inside the worktree-local `app/node_modules`. No install,
copy-back, canonical write, hardlink, package/lock/config change, or shared
cache use.

Run Prisma generate exactly once inside `bwrap --unshare-net`, with `/` read
only, only the private worktree `node_modules` and owner-only mission cache/home
writable, and the worktree app as CWD. Set process-local:

```text
DATABASE_URL=postgresql://localhost:1/o1_console_build
CHECKPOINT_DISABLE=1
PRISMA_HIDE_UPDATE_MESSAGE=1
PRISMA_GENERATE_SKIP_AUTOINSTALL=1
```

Use only the copied `./node_modules/.bin/prisma generate --schema
prisma/schema.prisma`. STOP if it requests another writable path, install,
network, DB, schema/config/tracked change, or fails. After generation, prove
both `@prisma/client` and forwarded `.prisma/client` resolve inside the private
copy and the generated `OrderInclude` exposes `serviceRequest`; do not inspect
or emit data values.

Then run exactly the frozen nine-file Vitest command and, only on PASS, the
single frozen non-production Next `--webpack` build from handoff 59, using the
private real `node_modules` rather than a symlink. Preserve the first failure;
no retry, repair, sweep, alternate compiler, standalone typecheck, lint, broad
suite, DB/provider/runtime/browser/economic action.

Unconditionally remove private `app/node_modules`, mission cache/home,
`.next`, `next-env.d.ts`, and `tsconfig.tsbuildinfo`. Prove canonical generated
tree hash unchanged, package/lock hashes unchanged, product/docs Git clean,
upstream equality, and zero residue. Write only uncommitted result
`106_P6_PRIVATE_PRISMA_CLIENT_REFRESH_AND_CLOSURE_GATE_RESULT.md`, return to
Advisor, and STOP before independent review.
