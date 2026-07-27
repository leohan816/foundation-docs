# F2 E3 IMPORT FAILURE DIAGNOSIS — POINTER

- Status: **PASS_DIAGNOSIS** (zero committed write; no product correction executed)
- Result: `advisor/jobs/COSMILE_MULTI_PRODUCT_STOREFRONT_GOLDEN_PATH_V1/96_WORKER_F2_E3_IMPORT_FAILURE_DIAGNOSIS_RESULT.md`
- Handoff: `.../95_ADVISOR_F2_E3_IMPORT_FAILURE_DIAGNOSIS_HANDOFF.md` (docs `601ee21`, sha256 `2a9fc188` — verified)
- Pins unchanged: Cosmile `91ded4491785ff4d18f081d05fce9ca63cc6f1e9` · Foundation `966db20822b7accb36c33dedb01ffba51a9bef68` · vault `70c39e0eb8c6559c4af55d6020a4613d75e8cfbf`, all clean; one listener on `127.0.0.1:3000`.
- **Closed category: `predecessor`** · error class `ReferenceError` · no Prisma code · no SQLSTATE. Stages `advisory_lock`, `by_sha`, `heads` all passed, so this is not a DB, lock, constraint, permission or driver fault.
- Rollback: sentinel observed `true`, rolled back `true`; the driver ran exactly once and always throws before completion.
- Count comparison vs 93: `count_equality_with_93 = true`, `diffs = none`, `unexpected_nonzero_tables = none`, order `pending:2`, reservation `reserved:2`, candidate snapshots/bindings/SKUs still `0`.
- **Smallest correction candidate (not executed)**: in `app/src/lib/foundation/snapshotRepository.ts`, `SYNTHETIC_REPRESENTATIVE.snapshotContentSha256()` uses a bare CommonJS `require()` inside an ES module graph (`esmRequireAvailable = false`), evaluated inside the per-entry transaction before the predecessor decision. Replace it with the module's existing `await import("@/lib/runtime/o1FixtureSetup")` idiom hoisted to the top of `importTestCandidateBundle`. One path, one call site; no lineage rule, SQL, lifecycle value, overlay value or approved-lane change.
- Containment: only the authorized `import-diagnosis.mjs` was created and it was removed with the empty `evidence/` directory (both verified absent); the count comparison was inline and wrote no file; bundle preserved (9 files, 0 symlinks). No one-shot retry, second diagnostic, variant, source edit, provider, browser, build, typecheck, test, checkout, order or refund action. `DATABASE_URL` in process memory only.
- Not proven: only the first bundle entry was replayed; `insert` and `supersede_update` were never reached; the correction candidate is unexecuted and untested.

RETURN_TO: foundation-advisor
