# Worker Result — COSMILE_PRISMA_BUILD_REPRODUCIBILITY_V1

ACTOR: Cosmile Worker (Opus 4.8/xhigh) · `/fable-builder`. Handoffs: 10 (impl) SHA256 `8fe070eb…` ✓; 20 (engine recovery) SHA256 `14e598db…` ✓ blob `d3c956a2…` ✓. RETURN_TO `foundation-advisor`. PRODUCT `e1a5f3f` on `implementation/cosmile-prisma-build-reproducibility-v1-20260724`, clean/upstream-equal, base `33e0d85` ancestor.

## Deliverable (exact 2 tracked paths — committed e1a5f3f, no amendment)
- `app/package.json`: `prisma:generate = prisma generate --schema prisma/schema.prisma`; `typecheck = npm run prisma:generate && tsc --noEmit --incremental false`; `build = npm run prisma:generate && next build`; `test:focused = npm run prisma:generate && vitest run`. All other scripts + `test:memory` unchanged; no broad `test`; no dependency/lockfile change.
- `app/scripts/prisma_build_reproducibility.vitest.ts`: pins generate-first ordering, exact schema arg, retained `next build`, no broad test, locked `prisma`/`@prisma/client` `6.19.3` (manifest `^6.19.3` + lockfile `6.19.3`).

## Preserved first failure (handoff-10 `--ignore-scripts` gate) — NOT suppressed
- Direct tests-first: RED `4 failed / 2 passed` (exit 1) → exact-two-path GREEN `6/6` (exit 0).
- `npm ci --ignore-scripts` (exit 0) did NOT provision Prisma's schema engine. Clean gate cmd1 correctly ran `prisma:generate` FIRST, but offline `prisma generate` attempted `binaries.prisma.sh` and failed `getaddrinfo EAI_AGAIN`. Cmds 2/3 correctly not run. No workaround taken.

## Recovered gate (handoff-20: normal lockfile install provisions engine)
- Artifacts cleaned; canonical baselines re-recorded == preflight; fresh mission cache.
- `npm ci --no-audit --no-fund` (WITH lifecycle; network = pinned `registry.npmjs.org` + official `binaries.prisma.sh`), exit 0. Proven worktree-local: `prisma`=`6.19.3`, `@prisma/client`=`6.19.3`; engine present (`@prisma/engines/schema-engine-debian-openssl-3.0.x` + `libquery_engine…`); `package.json`/`package-lock.json` unchanged.
- Three `bwrap --unshare-net` gates (same handoff-10 boundary/vars), each visibly `prisma:generate` first, offline, exit 0:
  1. `test:focused` → `✔ Generated Prisma Client v6.19.3` → **Tests 6 passed (6)**; generated `OrderInclude.serviceRequest?` present.
  2. `typecheck` → generate → `tsc --noEmit --incremental false` clean (no `error TS`).
  3. `build --webpack` → generate → `✓ Compiled successfully` → `✓ Generating static pages (67/67)`.

## Audit / integrity / cleanup
- Committed delta = exactly the two paths; `git diff --check` clean; `package-lock.json`/`prisma/schema.prisma`/workflows byte-identical (no tracked change).
- Canonical targeted hashes IDENTICAL preflight↔post (`.prisma/client` `b3f23e74…`, `@prisma/client` `c8c92121…`, `prisma` `bb26ede6…`, `package.json` `a486716…`, `package-lock.json` `36dfa1a…`) → canonical read-only, never copied/linked/executed/cached.
- Unconditional cleanup: worktree `app/node_modules`, mission cache/home, `.next`, `next-env.d.ts`, `tsconfig.tsbuildinfo` removed; zero residue; no lingering process. HEAD `e1a5f3f` clean/upstream-equal.

## Not asserted
No independent-review verdict. No DB/provider/runtime/schema/migration/dependency change. One commit only (`e1a5f3f`); no additional product commit per handoff-20.

RETURN_TO `foundation-advisor`. STOP for audit and independent review.
