# Advisor handoff — F2 E4 ESM predecessor correction

VERDICT: `PROCEED_WITH_LIMITS` · routine root-cause correction inside frozen F2.

## Pins and root cause

- Product base `91ded4491785ff4d18f081d05fce9ca63cc6f1e9`,
  clean/upstream-equal.
- Diagnosis `96`/`97` at docs `e5bbddf`: `predecessor / ReferenceError`,
  `esmRequireAvailable=false`; advisory lock, by-SHA and heads passed; all DB
  writes rolled back and all counts unchanged.
- Root cause: `SYNTHETIC_REPRESENTATIVE.snapshotContentSha256()` uses bare
  CommonJS `require()` inside the ESM runtime graph.

## Exact two-path ceiling

1. `app/scripts/o1_test_candidate_catalog.vitest.ts`
2. `app/src/lib/foundation/snapshotRepository.ts`

No other source/test/config/schema/migration/package/lock/docs product path.

## Tests first and correction

1. Add one exact focused test under the existing F2 E1 bundle/replay section.
   It must prove that `importTestCandidateBundle` resolves
   `buildO1SnapshotDoc` with an awaited ESM `import()` inside the function's
   existing closed `try` boundary, before the entry loop/transaction, and
   passes one resolved representative SHA through every predecessor decision.
   It must reject the prior bare `require("@/lib/runtime/o1FixtureSetup")`.
2. Run exactly:
   `cd app && ./node_modules/.bin/vitest run scripts/o1_test_candidate_catalog.vitest.ts --config vitest.config.ts -t "resolves the synthetic predecessor through the ESM runtime"`
   Preserve meaningful RED and exit code.
3. In `importTestCandidateBundle` only, replace the bare runtime `require` with
   one awaited dynamic import of the existing `buildO1SnapshotDoc` generator.
   Resolve its SHA once inside the existing `try`, before the entry loop, and
   reuse it for every `decideCandidatePredecessor` call.
4. Remove the obsolete synchronous helper/call only. Do not duplicate the
   synthetic document or hash algorithm; do not create a new module.
5. Run the identical named GREEN once.

Preserve unchanged: exact seven set, incomplete eighth exclusion, predecessor
identity and single-generator rule, approved lane, SQL, lifecycle, overlay,
binding, activation, checkout, errors, schema, and every commerce/economic
semantic. No DB/runtime/bundle/provider/browser/build/typecheck/other test.

Audit exact two-path delta, `git diff --check`, schema/package/lock unchanged.
Commit once, non-force push, clean/upstream-equal. Write only:

- `99_WORKER_F2_E4_ESM_PREDECESSOR_CORRECTION_RESULT.md`
- `100_WORKER_F2_E4_ESM_PREDECESSOR_CORRECTION_POINTER.md`

Commit/push those docs, return to Advisor, STOP before runtime retry. HOLD on
meaningful GREEN failure, circular-import evidence, extra path, or semantic
change.
