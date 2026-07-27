# F2 E4 ESM PREDECESSOR CORRECTION — WORKER RESULT

Status: **PASS**

- Handoff `98` verified: docs `00dbb1460a7a0f5750039e8a9ebd892ab3730b52`, sha256 `511caf2c73842d2a9b3f98d3938466b5687c74763d30a8d737bdd100a3938d4b`.
- Base `91ded4491785ff4d18f081d05fce9ca63cc6f1e9` clean/upstream-equal → commit `8a1a5b70c8b6df1f9aaf75cf40821d761a089ae7`, non-force pushed, clean/upstream-equal.

## Correction

`SYNTHETIC_REPRESENTATIVE.snapshotContentSha256()` resolved the representative fixture through a bare CommonJS `require()` inside this ESM graph, where the identifier does not exist. It was evaluated unconditionally inside the per-entry transaction, immediately before the predecessor decision, so the first entry always threw `ReferenceError` and the whole import collapsed to `repository_error` (diagnosis 96/97).

It is now resolved with **one awaited dynamic import** of the existing `buildO1SnapshotDoc` generator — the same idiom this function already uses for the candidate decisions — **once, inside the existing closed `try`, before the entry loop and its transaction**, and the single resolved value is threaded into every `decideCandidatePredecessor` call. The obsolete synchronous helper was removed; only `SYNTHETIC_REPRESENTATIVE_PRODUCT_ID` remains, so the SHA still has exactly one generator and no second definition. Nothing rebuilds the document or its hash locally.

Source delta: 9 added lines, one moved line, and removal of the 10-line helper.

## Tests-first evidence

Command, identical both runs:

`cd app && ./node_modules/.bin/vitest run scripts/o1_test_candidate_catalog.vitest.ts --config vitest.config.ts -t "resolves the synthetic predecessor through the ESM runtime"`

- **RED**: `1 failed | 29 skipped (30)`, exit `1`, failing on `the bare require must be gone`.
- **GREEN**, first identical run: `1 passed | 29 skipped (30)`, exit `0`.

The test proves all five required properties: no bare `require` anywhere on the candidate import path, an awaited `import()` of the existing generator, its position after the `try` and before both the entry loop and the transaction, exactly one resolution and one document build reused across every predecessor decision, and no local re-derivation of the document or hash.

## Preserved unchanged

Exact seven set, incomplete-eighth exclusion, predecessor identity and single-generator rule, approved lane, every SQL statement, lifecycle value, overlay values, binding, activation, checkout, error categories, schema and all commerce/economic semantics. The diff contains no SQL, no overlay value and no error-category line.

## Containment

- Exactly the two ceiling paths; 54 insertions, 11 deletions. `git diff --check` exit `0`. `package.json`, `package-lock.json`, `prisma/` unchanged (0 entries).
- No DB, runtime, bundle, provider, browser, build, typecheck or other test action. The preserved bundle, the two pending orders and the two reserved holds were not touched or queried.

## Declared observation — module cycle, not blocking

`o1FixtureSetup.ts` statically imports `snapshotRepository.ts`, and `snapshotRepository.ts` now dynamically imports `o1FixtureSetup.ts`. This direction is **not new** — the removed `require` had the identical dependency — and the import is a call-time `await import()` of an already-evaluated module, so it returns the cached namespace with no temporal-dead-zone hazard. I found **no circular-import evidence** of a defect, and the correction is the one the handoff prescribes. Recording it explicitly so the next runtime gate confirms it rather than assuming it.

## Not proven

- STOP was observed before any runtime retry, so the corrected import has **not** been executed against the database. Whether the one-shot now reaches `insert` and `supersede_update` is unproven.
- Only the first bundle entry was ever replayed (in the earlier diagnostic); the remaining six entries remain untested end to end.
- No typecheck or build was run; the change rests on the focused source-contract test.
