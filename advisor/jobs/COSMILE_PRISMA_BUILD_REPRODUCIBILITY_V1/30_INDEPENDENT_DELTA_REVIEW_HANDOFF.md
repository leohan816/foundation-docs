# Independent Delta Review — COSMILE_PRISMA_BUILD_REPRODUCIBILITY_V1

MISSION_ID: `COSMILE_PRISMA_BUILD_REPRODUCIBILITY_V1`
REVIEW_NEEDED: `YES`
REVIEW_TIER: `NORMAL_COMPLEX_BOUNDED`
MODEL: `Claude Opus 4.8`
EFFORT: `max`
WHY_SELECTED: package/build/test ordering is integration-wide but changes no schema, runtime behavior, provider, authorization, or economic contract.

## Exact subject

- Repository/worktree: `/home/leo/Project/.worktrees/Cosmile/COSMILE_PRISMA_BUILD_REPRODUCIBILITY_V1`
- Base: `33e0d857d887fbe993fc27a25477528a8b5425ba`
- Candidate: `e1a5f3fd8f4764633e838a0a5e0cd21f0331ed80`
- Branch: `implementation/cosmile-prisma-build-reproducibility-v1-20260724`
- Exact changed paths:
  - `app/package.json`
  - `app/scripts/prisma_build_reproducibility.vitest.ts`
- Worker evidence:
  - `advisor/jobs/COSMILE_PRISMA_BUILD_REPRODUCIBILITY_V1/11_WORKER_RESULT.md`
  - `advisor/jobs/COSMILE_PRISMA_BUILD_REPRODUCIBILITY_V1/12_WORKER_POINTER.md`

## Required authority and skill

Read current Agent Office root `AGENTS.md`, `CLAUDE.md`, `docs/agent/TEAM_OPERATING_MODEL.md`,
`docs/agent/RESULT_REPORTING_PROTOCOL.md`, Reviewer role, and the repository `AGENTS.md`/`CLAUDE.md`.
Load `/home/leo/Project/skill/fable-sentinel/SKILL.md` and only:
`review-classification.md`, `delta-review.md`, `provenance-review.md`, `contract-review.md`.
Current Agent Office authority controls over historical foundation-docs role text.

## Review questions

1. Does every new package-level typecheck, build, and focused-test entry run the pinned local Prisma generator first?
2. Does the test meaningfully fail if ordering/schema/version/no-broad-test constraints regress?
3. Does the delta preserve existing scripts, dependencies, lockfile, schema, migrations, workflows, and product/runtime behavior?
4. Is a fresh lockfile install plus lifecycle provisioning sufficient for later network-isolated generation and gates, without canonical shared-client reliance?
5. Are the preserved `--ignore-scripts` engine-provisioning failure and the successful recovery represented honestly?
6. Is the two-path provenance, commit, cleanup, and no-canonical-mutation evidence coherent?

## Boundaries

Read-only exact delta plus minimum named evidence. Do not patch, install, generate, test, build,
typecheck, access DB/provider/runtime, inspect unrelated paths, or perform a broad repository audit.
Do not repeat Worker commands. Findings must name exact affected hunk/evidence and severity.

Return at most 60 lines:
`PASS | PASS_WITH_CORRECTIONS | HOLD`, actual model/effort/skill/references, blocking findings,
nonblocking risks, exact reviewed delta, Git state, and next action. Write only:

- `advisor/jobs/COSMILE_PRISMA_BUILD_REPRODUCIBILITY_V1/31_INDEPENDENT_REVIEW_RESULT.md`
- `advisor/jobs/COSMILE_PRISMA_BUILD_REPRODUCIBILITY_V1/32_INDEPENDENT_REVIEW_POINTER.md`

Then `RETURN_TO foundation-advisor` and STOP.
