# Cosmile Worker Handoff

MISSION_ID: `COSMILE_PRISMA_BUILD_REPRODUCIBILITY_V1`
PHASE: `IMPLEMENT_AND_VERIFY`
ACTOR: existing Cosmile Worker
SESSION: `cosmile:claude.0`
MODEL/EFFORT: `Claude Opus 4.8/xhigh`
SKILL: `/fable-builder`
REFERENCES: `implementation-execution`, `contract-to-code-mapping`, `test-design-before-code`; `implementation-report-template` only at return
RETURN_TO: `foundation-advisor`

## Exact binding

- Repository/worktree: `/home/leo/Project/.worktrees/Cosmile/COSMILE_PRISMA_BUILD_REPRODUCIBILITY_V1`
- Branch: `implementation/cosmile-prisma-build-reproducibility-v1-20260724`
- Base: `33e0d857d887fbe993fc27a25477528a8b5425ba`
- Existing process CWD is historical. Every tool command must start with `cd -- /home/leo/Project/.worktrees/Cosmile/COSMILE_PRISMA_BUILD_REPRODUCIBILITY_V1`; do not access or write the predecessor worktree.
- Read current Agent Office common authority, Worker role/run/result protocols, Cosmile `AGENTS.md`/`CLAUDE.md`, this handoff, and `app/docs/testing/TEST_MEANING_POLICY.md`.
- No `/clear`, exit, restart, kill, pane/session change, sub-agent, substitute runtime, or concurrent writer.

## Exact path ceiling

1. `app/package.json`
2. `app/scripts/prisma_build_reproducibility.vitest.ts`

No other tracked path. In particular: no package-lock, schema, migration, Prisma config, workflow, README/docs, source/runtime/UI, `.gitignore`, or dependency-version change.

## Required contract

Preserve all existing script behavior except explicit generation ordering. Add exactly:

- `prisma:generate` → local locked Prisma CLI generating from `prisma/schema.prisma`;
- `typecheck` → `prisma:generate` then nonincremental no-emit TypeScript;
- `build` → `prisma:generate` then the existing `next build`;
- `test:focused` → `prisma:generate` then `vitest run`.

Do not add a generic `test`/full-suite command. Do not alter existing dependency declarations or `test:memory`.

## Tests-first sequence

1. Verify exact base/branch/clean state and the two-path ceiling.
2. Record current targeted canonical integrity using the exact Advisor method for `/home/leo/Project/Cosmile/app/node_modules/{.prisma/client,@prisma/client,prisma}` plus canonical package/lock bytes. Do not write, link, copy, chmod, or execute from canonical.
3. Confirm worktree `app/node_modules` absent/ignored and create only an owner-only mission cache under `/home/leo/Project/.mission-tmp/COSMILE_PRISMA_BUILD_REPRODUCIBILITY_V1`.
4. Run once from worktree `app`: `npm ci --ignore-scripts --no-audit --no-fund` with only that mission cache. The unchanged lockfile permits registry access only to its pinned `registry.npmjs.org` entries; no auth, upgrade, install retry, global/shared cache, lifecycle scripts, or manifest/lock change.
5. First tracked write: add the focused contract test. It must protect exact generator-before-typecheck/build/focused-test ordering, exact schema argument, retained `next build`, absence of a broad `test` script, locked `prisma`/`@prisma/client` `6.19.3`, and unchanged lockfile contract.
6. Run only the exact named test directly with local Vitest and require meaningful RED because package scripts do not yet satisfy the contract. Preserve exit status without a masking pipeline.
7. Patch only `app/package.json` to the exact contract above. Run the identical named test directly and require GREEN.

## Clean isolated execution gate

Use the real worktree-local `node_modules`; never the canonical tree. Run each package command once inside a network-isolated `bwrap --unshare-net` boundary rooted at the exact worktree app, with only the worktree app and owner-only mission cache/home writable. Use process-local names/values only:

```text
DATABASE_URL=postgresql://localhost:1/cosmile_prisma_build
CHECKPOINT_DISABLE=1
PRISMA_HIDE_UPDATE_MESSAGE=1
PRISMA_GENERATE_SKIP_AUTOINSTALL=1
NEXT_TELEMETRY_DISABLED=1
```

Commands, in order:

1. `npm run test:focused -- scripts/prisma_build_reproducibility.vitest.ts --config vitest.config.ts --reporter=verbose --cache=false`
2. `npm run typecheck`
3. `npm run build -- --webpack`

Each command must visibly execute `prisma:generate` first. Prove the generated private `OrderInclude` exposes `serviceRequest` categorically. No DB connection, provider/network, runtime server, browser, economic action, full suite, lint, or additional command. Preserve the first actionable failure and STOP; no workaround or correction outside the two files.

## Commit, cleanup, and return

- Inspect exact two-path diff and `git diff --check`; package-lock/schema/workflows must be byte-identical.
- Commit once with truthful runtime attribution and non-force push only this mission branch.
- Unconditionally remove worktree `app/node_modules`, mission cache/home, `.next`, `next-env.d.ts`, and tsbuildinfo. Verify no process/residue.
- Recompute the exact canonical targeted hashes and package/lock bytes; require identical to preflight.
- Verify product HEAD clean/upstream-equal and base ancestry.
- Write only these uncommitted docs result files:
  - `advisor/jobs/COSMILE_PRISMA_BUILD_REPRODUCIBILITY_V1/11_WORKER_RESULT.md`
  - `advisor/jobs/COSMILE_PRISMA_BUILD_REPRODUCIBILITY_V1/12_WORKER_POINTER.md`
- Result ≤80 lines, compact evidence index. Report all failures/skips and no independent-review verdict.

STOP for Advisor audit and independent review.
