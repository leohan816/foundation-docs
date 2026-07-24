# Advisor Final Audit — COSMILE_PRISMA_BUILD_REPRODUCIBILITY_V1

MISSION_VERDICT: `PASS_WITH_LIMITS`
BLOCKING_FINDINGS: `0`

## Subject and delta

- Product base: `33e0d857d887fbe993fc27a25477528a8b5425ba`
- Candidate: `e1a5f3fd8f4764633e838a0a5e0cd21f0331ed80`
- Branch: `implementation/cosmile-prisma-build-reproducibility-v1-20260724`
- Changed paths only: `app/package.json`; `app/scripts/prisma_build_reproducibility.vitest.ts`
- Added local `prisma:generate`; package `typecheck`, `build`, and `test:focused` invoke it first through fail-fast `&&`.
- No lockfile, dependency, schema, migration, workflow, runtime, UI, feature, provider, or economic change.

## Evidence

- Tests-first contract evidence: RED `4 failed / 2 passed`; GREEN `6 passed / 6`.
- Preserved first clean-gate failure: lifecycle-disabled `npm ci --ignore-scripts` did not provision the Prisma engine; offline generation failed closed with `EAI_AGAIN`; later commands were not run.
- Bounded recovery: normal lockfile `npm ci --no-audit --no-fund` provisioned Prisma `6.19.3` engines worktree-locally.
- Network-isolated generate-first gates each ran once and passed:
  - focused contract: `6/6`;
  - typecheck: clean nonincremental no-emit;
  - non-production webpack build: compiled, static pages `67/67`.
- Worktree dependencies, cache, `.next`, `next-env.d.ts`, and tsbuildinfo were removed. Candidate is clean/upstream-equal.
- Canonical shared dependency trees were not used. Advisor reproduced admission hashes under the original `en_US.UTF-8` ordering; differing Worker aggregate labels were locale/sort-method variance, not file mutation.

## Independent review

- REVIEW_TIER: `NORMAL_COMPLEX_BOUNDED`
- ACTUAL MODEL/EFFORT: `Claude Opus 4.8 (1M context) / max`, live-verified in the existing independent Reviewer UI.
- SKILL: `/fable-sentinel`; `review-classification`, `delta-review`, `provenance-review`, `contract-review`.
- VERDICT: `PASS_WITH_RISK` (handoff mapping `PASS`); blocking findings `0`; no correction required.

## Limits and disposition

- Reproducibility is proven for a fresh normal lockfile install whose lifecycle can provision the pinned Prisma engine, followed by network-isolated generation/gates.
- It is **not** a hermetic/offline-install claim: `--ignore-scripts` or blocked access to `binaries.prisma.sh` still fails closed. Engine mirroring/vendoring is a separate CI/dependency architecture decision and was not authorized.
- No repository CI workflow existed at the base; this mission intentionally added package-level CI-consumable ordering rather than inventing the first CI system.
- The already-pushed product commit body records the earlier blocked gate; final recovered truth is this audit. History was not rewritten.
- Process note: one full docs commit SHA was transcribed incorrectly at review dispatch; blob/SHA256 matched, the exact commit was corrected in-session, and no product/review authority was affected.

FINAL_CLAIM: `REVIEWED_CLEAN_LOCKFILE_INSTALL_PRISMA_GENERATE_FIRST_BUILD_BASELINE`
HARD_STOP: no merge, deployment, production/live action, or next mission.
