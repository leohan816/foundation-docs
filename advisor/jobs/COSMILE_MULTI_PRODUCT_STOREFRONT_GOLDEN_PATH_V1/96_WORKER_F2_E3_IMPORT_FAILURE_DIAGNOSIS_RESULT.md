# F2 E3 IMPORT FAILURE DIAGNOSIS — WORKER RESULT

Status: **PASS_DIAGNOSIS** — exact category obtained with zero committed write. No product correction executed.

- Handoff `95` verified: docs `601ee21c35ff469f664ab0f589880f2b2c2d148b`, sha256 `2a9fc1887f7b872ec9620f985dad6fa330a17d198eeac7758b1d7b3aee3f2344`.
- Pins unchanged: Cosmile `91ded449`, Foundation `966db208`, vault `70c39e0e`, all clean; one listener on `127.0.0.1:3000`.

## Closed classification

| Field | Value |
|---|---|
| First failing stage | **`predecessor`** |
| Stages reached and passed | `advisory_lock`, `by_sha`, `heads` |
| Error class | `ReferenceError` |
| Prisma code | none |
| SQLSTATE category | none |
| Sentinel observed | `true` |
| Transaction rolled back | `true` |

Supporting booleans: `esmRequireAvailable = false`; the first entry's by-SHA read found no existing row and its structural head count was `0`.

The failure is therefore **not** a database, constraint, lock, permission or driver fault — the three SQL stages all succeeded. It is a JavaScript module-resolution fault raised before the predecessor decision could be taken, and it precedes every INSERT, so no entry can ever reach a write.

## Exact smallest correction candidate (NOT executed)

`SYNTHETIC_REPRESENTATIVE.snapshotContentSha256()` in `app/src/lib/foundation/snapshotRepository.ts` resolves the representative fixture through a **bare CommonJS `require()` inside an ES module graph**, where the `require` identifier does not exist. It is evaluated unconditionally inside the per-entry transaction, immediately before `decideCandidatePredecessor`, so the first entry always throws `ReferenceError` and the whole import returns the catch-all `repository_error`.

Smallest correction: replace that bare `require` with the module's existing dynamic-import idiom — `await import("@/lib/runtime/o1FixtureSetup")` — hoisted alongside the other `await import` at the top of `importTestCandidateBundle`, and pass the resolved sha into the loop. This changes no lineage rule, no SQL, no lifecycle value, no overlay value and no approved-lane behaviour; it only makes the representative resolvable at runtime. One path, one call site.

The same defect shape is worth checking anywhere else a bare `require` was used in this module family, but the diagnostic proves only this one call site.

## Count comparison against result 93

One read-only `REPEATABLE READ` comparison over every public table:

- `count_equality_with_93 = true` · `diffs = none` · `unexpected_nonzero_tables = none`.
- Order categories `pending:2`; reservation categories `reserved:2` — the two preserved ambiguous pending orders and two reserved holds untouched.
- Candidate counts still zero: snapshots `0`, bindings `0`, SKUs `0` (`candidate_counts_still_zero = true`).

## Containment

- Created only the authorized `<f2>/evidence/import-diagnosis.mjs` (`0600`, `leo:leo`, real file) in a `0700` `leo:leo` directory; removed afterwards together with the empty `evidence/` directory — both verified absent. The count comparison was executed inline and wrote no file, so no other path was created anywhere.
- Bundle preserved untouched: `<f2>/foundation-candidate-bundle`, 9 files, 0 symlinks.
- The driver ran exactly once and always threw its private sentinel; no committed write was possible by construction. No one-shot retry, no second diagnostic, no variant, no source/config/schema/package/lock edit, no provider, browser, build, typecheck, test, checkout, order or refund action.
- `DATABASE_URL` was loaded into process memory only and never printed, persisted, hashed or placed in argv. No message, query, parameter, identifier, hash, row, timestamp, URL, env value, secret or PII was retained or reported.

## Not proven

- Only the FIRST bundle entry was replayed, per the handoff. The remaining six entries are untested, though the failing call site is entry-independent.
- Stages `insert` and `supersede_update` were never reached, so their behaviour against a real database remains unproven.
- The correction candidate above is stated, not executed and not tested.
