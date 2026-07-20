# R3 Next-dev tsconfig Containment Correction — Cosmile Worker

MISSION_ID: `COSMILE_O1_TOSS_RELIABILITY_RUNTIME_VERIFICATION_V1`
MODULE: `R3_PRE_RETRY_ENVIRONMENT_CORRECTION`
ACTOR: existing `cosmile:0.0` / Cosmile Worker / Opus 4.8 / xhigh
WORKTREE: `/home/leo/Project/.worktrees/Cosmile/COSMILE_O1_TOSS_RELIABILITY_RUNTIME_VERIFICATION_V1`
BASE_HEAD: `c8c18b5cd0c4c01d8fdcbb1601265db3d6855cf3`
SKILL: `/fable-builder`; read only `implementation-execution`, `test-design-before-code`, and `implementation-report-template` at return.
DELTA_ONLY_VERIFICATION: `REQUIRED`
REVIEW_TIER: `SMALL`; Worker focused proof + Advisor validation; no independent Reviewer.

## Preserved RED evidence

- The first R3/R4 one-shot exited `1`; do not rerun or reinterpret it.
- Its exact tracked side effect is preserved in `app/tsconfig.json`: Next.js 16.2.9 reformatted JSON arrays and added `.next/dev/dev/types/**/*.ts`.
- Advisor confirmed from the pinned local Next implementation that `writeConfigurationDefaults` appends missing type globs and serializes the full JSON with two-space formatting. This is deterministic next-dev configuration, not a commerce semantic change.
- Worker result `56_R3_R4_TOSS_TEST_RESULT.md` remains immutable evidence. Do not overwrite it.

## Exact correction

ALLOWED_TRACKED_PATH: `app/tsconfig.json` only.

Using `apply_patch` only, reduce the preserved generated delta to the smallest intentional configuration change relative to `BASE_HEAD`:

- restore the original compact formatting of `lib`, `paths["@/*"]`, and `exclude`;
- retain exactly one semantic addition in `include`: `.next/dev/dev/types/**/*.ts`, immediately after `.next/dev/types/**/*.ts`;
- change no other key, value, ordering, file, or behavior.

The preserved first failure remains documented in `56_`; this correction must not erase or relabel it.

## Focused no-provider proof

1. Confirm the pre-start diff is exactly the single semantic include addition.
2. Start the existing worktree-local `node_modules/.bin/next dev` exactly once on `127.0.0.1:31082` with stdout/stderr to `/dev/null`, PID held only in the executing shell, and only these relevant gates:
   - `NODE_ENV=development`;
   - `DATABASE_URL=postgresql://127.0.0.1:1/o1_no_connect` (non-secret closed-loopback sentinel);
   - `COSMILE_O1_RUNTIME_ENABLED=false`;
   - `COSMILE_O1_GOOGLE_AUTH_ENABLED=false`;
   - all Toss key/mode/one-shot/local-substitute variables absent.
3. Wait only for authoritative TCP readiness. Send no HTTP request. Make no DB, Google, provider, or economic request.
4. Stop the complete mission-owned process tree.
5. Remove only attributable `.next`, `next-env.d.ts`, and `tsconfig.tsbuildinfo` if created.
6. Require port `31082` closed and the tracked diff still exactly the one allowed include addition. Any additional mutation is `HOLD`; do not normalize it.

## Commit and return

On PASS, commit only `app/tsconfig.json`, non-force push once, and require clean/upstream-equal state. Write only:

- `/home/leo/Project/.mission-tmp/COSMILE_O1_TOSS_RELIABILITY_RUNTIME_VERIFICATION_V1/worker/58_R3_TSCONFIG_CONTAINMENT_CORRECTION_RESULT.md`
- `/home/leo/Project/.mission-tmp/COSMILE_O1_TOSS_RELIABILITY_RUNTIME_VERIFICATION_V1/worker/59_R3_TSCONFIG_CONTAINMENT_CORRECTION_POINTER.md`

Both files: `leo:leo 0600`; compact evidence index only.

## Prohibited

No Toss/provider/network payment request, credential read, DB/container, HTTP request, R3/R4 driver recreation, test-suite/build/typecheck/install/generate, schema, product path beyond `app/tsconfig.json`, assertion weakening, cleanup outside attributable outputs, Reviewer, or next module.

The Founder testing principle is binding: preserve the original failure; do not optimize for green or weaken a boundary. STOP after the compact result.
