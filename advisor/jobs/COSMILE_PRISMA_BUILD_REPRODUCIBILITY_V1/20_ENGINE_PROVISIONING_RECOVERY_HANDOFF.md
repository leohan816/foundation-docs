# Engine Provisioning Recovery Handoff

MISSION_ID: `COSMILE_PRISMA_BUILD_REPRODUCIBILITY_V1`
PHASE: `BOUNDED_ENVIRONMENT_RECOVERY_AND_GATE`
ACTOR: same existing Cosmile Worker, Claude Opus 4.8/xhigh
PRODUCT_CANDIDATE: `e1a5f3f` on `implementation/cosmile-prisma-build-reproducibility-v1-20260724`
SKILL: `/fable-builder`
RETURN_TO: `foundation-advisor`

## Preserved first failure

- Direct tests-first evidence: RED `4 failed / 2 passed`, then exact two-path GREEN `6/6`.
- Product commit `e1a5f3f` contains only `app/package.json` and `app/scripts/prisma_build_reproducibility.vitest.ts` and is already non-force pushed.
- First clean gate failed before Vitest because `npm ci --ignore-scripts` did not provision Prisma's schema engine; the network-isolated `prisma generate` attempted `binaries.prisma.sh` and failed `EAI_AGAIN`.
- Commands 2/3 were correctly not run. Do not suppress, replace, or reinterpret this failure.

## Advisor decision

The failed premise was lifecycle-disabled installation, not the product delta. A normal lockfile `npm ci` is the smallest fresh-environment contract and may execute the pinned Prisma `6.19.3` install lifecycle. This is an environment-only recovery; no product amendment, retry of RED/GREEN, or new path is authorized.

## Exact recovery

1. Every command begins with `cd -- /home/leo/Project/.worktrees/Cosmile/COSMILE_PRISMA_BUILD_REPRODUCIBILITY_V1`.
2. Remove only current ignored worktree `app/node_modules`, the mission cache/home, `.next`, `next-env.d.ts`, and tsbuildinfo. Verify product HEAD `e1a5f3f`, exact two-path committed delta, clean/upstream-equal, and no residue.
3. Re-record the same canonical targeted hashes. Canonical `/home/leo/Project/Cosmile/app/node_modules` remains read-only and is not copied, linked, executed, or used as a cache.
4. Create a fresh owner-only mission cache/home and run exactly once:
   `npm ci --no-audit --no-fund`
   from the worktree app. No `--ignore-scripts`. Network is limited to lockfile-pinned `registry.npmjs.org` packages and the official Prisma `binaries.prisma.sh` engine provisioning required by locked Prisma `6.19.3`; no auth, upgrade, manifest/lock change, shared/global cache, install retry, or other host.
5. Prove worktree-local Prisma/client versions `6.19.3`, required local engine presence, package/lock unchanged, and all resolution inside the real worktree `app/node_modules`.
6. Run exactly once each under the handoff-10 network-isolated `bwrap --unshare-net` boundary and the same process-local non-secret variables:
   - `npm run test:focused -- scripts/prisma_build_reproducibility.vitest.ts --config vitest.config.ts --reporter=verbose --cache=false`
   - `npm run typecheck`
   - `npm run build -- --webpack`
   Each must visibly execute `prisma:generate` first. Prove private generated `OrderInclude.serviceRequest` categorically.
7. On any failure, preserve the first failure and STOP; no product edit, install/generate retry, alternate cache/engine, extra command, or workaround.
8. On PASS, run exact diff/Git/lock/schema/workflow/canonical-integrity audit. No additional product commit is needed.
9. Unconditionally remove only mission dependencies/cache/build artifacts and verify zero residue plus canonical targeted hash equality.
10. Write uncommitted result `11_WORKER_RESULT.md` and pointer `12_WORKER_POINTER.md`, ≤80 lines, including both the preserved failed attempt and recovered gate evidence. Return to Advisor and STOP.

No `/clear`, exit, restart, kill, pane/session/model change, substitute Actor, Reviewer dispatch, DB connection, provider/runtime action, schema/migration, dependency/version/lockfile change, or scope expansion.
