# Advisor Admission and Scope Freeze

MISSION_ID: `COSMILE_PRISMA_BUILD_REPRODUCIBILITY_V1`
INSTRUCTION_GATE: `PROCEED_WITH_LIMITS`
DATE: `2026-07-24`

## Verified subject

- Product base: `leohan816/Cosmile` commit `33e0d857d887fbe993fc27a25477528a8b5425ba`, clean and upstream-equal on `implementation/cosmile-o1-operator-dashboard-core-v1-20260723`.
- Mission product branch/worktree: `implementation/cosmile-prisma-build-reproducibility-v1-20260724` at `/home/leo/Project/.worktrees/Cosmile/COSMILE_PRISMA_BUILD_REPRODUCIBILITY_V1`, clean at the exact base.
- Predecessor pointer: foundation-docs commit `c4150d89cca4f910e69fb4b26bdee9d62673a5e2`, `115_FINAL_POINTER.md`; named risk R1 reproduced from evidence `105`, `110`, `112`, and `114`.
- Mission docs branch/worktree: `advisor/cosmile-prisma-build-reproducibility-v1-20260724` at `/home/leo/Project/.worktrees/foundation-docs/COSMILE_PRISMA_BUILD_REPRODUCIBILITY_V1`, clean at the exact docs pin.

## Read-only findings

- `app/package.json` has `build: next build` and one direct Vitest script, but no `prisma:generate`, `typecheck`, focused-test entry, or ordering that refreshes the client before compile/test.
- `app/package-lock.json` is lockfile v3; locked `prisma` and `@prisma/client` are both exactly `6.19.3`, with integrity fields. All 516 resolved package entries use `registry.npmjs.org`.
- `app/prisma/schema.prisma` uses `prisma-client-js`; no custom generator output and no generator/config defect was found.
- No `.github/workflows/**` file or existing CI runner exists at the base. Creating the repository's first CI system is not necessary to close R1 and would exceed the smallest bounded correction.
- `node_modules` is ignored at root and app scope. Generated Prisma output is ignored; `.next`, tsbuildinfo, and `next-env.d.ts` are ignored.
- Canonical `/home/leo/Project/Cosmile/app/node_modules` is a real `leo:leo` directory. Admission baselines: `.prisma/client` `a44746f3…`; `@prisma/client` `25428f66…`; `prisma` `054c427c…`; package `a4867160…`; lock `36dfa1a4…`. It remains read-only and is never used by the mission install or commands.
- Existing Cosmile Worker is live and idle at Claude Opus 4.8/xhigh. Its process root is historical, so every command must bind explicitly to the mission worktree. No runtime/session mutation is authorized.

## Exact frozen product delta

1. `app/package.json`
2. `app/scripts/prisma_build_reproducibility.vitest.ts`

No workflow, README, lockfile, schema, migration, Prisma config, runtime, UI, feature, or unrelated path is authorized.

## Frozen contract

- Add one pinned local generator entry: `prisma:generate`.
- Make the package-level `typecheck`, `build`, and focused Vitest entry invoke that generator first in the same deterministic shell chain.
- Preserve every existing dependency/version and runtime command. Do not add a generic broad-suite test command.
- A clean lockfile install with lifecycle scripts disabled must still succeed because generation is explicit, then the generated client must expose the committed schema before typecheck/build/focused test.
- CI consumers can call the same package scripts; no repository-specific CI architecture is introduced.

## Verification and cleanup ceiling

- Tests-first focused RED/GREEN on the new contract test only.
- One fresh worktree-local `npm ci --ignore-scripts --no-audit --no-fund` using an owner-only mission cache and the unchanged lockfile; no canonical/shared dependency read or write.
- One network-isolated invocation each of the package-level focused test, nonincremental typecheck, and non-production `next build --webpack`, with a closed-loopback non-secret `DATABASE_URL`; preserve first failure.
- No DB connection/application, provider, runtime server, broad test, lint, schema/migration, install retry, dependency change, or product behavior action.
- Remove mission `node_modules`, npm cache, `.next`, `next-env.d.ts`, and tsbuildinfo; prove canonical targeted hashes and package/lock bytes unchanged, product containment exact, and Git clean/upstream-equal after commit/push.

## Review admission

Expected classification: `NORMAL_COMPLEX_BOUNDED`, Reviewer required, default `Opus 4.8/max`, `/fable-sentinel`, exact two-path delta only. Fable 5 is prohibited unless new hard/safety evidence is first documented.

NEXT_ACTION: commit exact Worker handoff, live-verify the existing Cosmile Worker, dispatch, monitor, and audit.
