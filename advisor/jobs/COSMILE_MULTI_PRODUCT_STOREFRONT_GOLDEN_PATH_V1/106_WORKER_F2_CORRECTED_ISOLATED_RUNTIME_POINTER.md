# F2 CORRECTED ISOLATED CATALOG RUNTIME GATE — POINTER

- Status: **PASS**
- Result: `advisor/jobs/COSMILE_MULTI_PRODUCT_STOREFRONT_GOLDEN_PATH_V1/105_WORKER_F2_CORRECTED_ISOLATED_RUNTIME_RESULT.md`
- Handoff: `.../104_ADVISOR_F2_CORRECTED_ISOLATED_RUNTIME_GATE_HANDOFF.md` (docs `2c9a9ea`, sha256 `b76b7cf7` — verified)
- Pins unchanged: Cosmile `8a1a5b70c8b6df1f9aaf75cf40821d761a089ae7` clean/upstream-equal · Foundation `966db20822b7accb36c33dedb01ffba51a9bef68` · vault `70c39e0eb8c6559c4af55d6020a4613d75e8cfbf`, both clean.
- One-shot #1 (corrected apply): `2 passed`, exit `0`. One-shot #2 (idempotent replay): `2 passed`, exit `0`. Both assert `imported/bound/activated = 7`, `offersCreated = 0`.
- Candidate state: 7 `missing_initial` snapshots · 7 bindings, all agreeing with SKU product and candidate snapshot · 7 SKUs, all active and non-hidden · 0 candidate `CommerceOffer` rows · incomplete eighth absent (0 snapshots, 0 SKUs) · representative superseded exactly once · 1 structural head · 0 products with split heads anywhere.
- Mutable counts `1 → 8` for snapshots, bindings and SKUs — exactly seven new rows each; the replay added nothing.
- Protected state byte-for-byte unchanged: `protected_counts_identical = true`, `protected_diffs = none` across every public table; orders `pending:2` and reservations `reserved:2` identical. Two pending orders and two reserved holds untouched.
- Bundle re-verified read-only (`ok`, 1 manifest, 7 snapshots) and preserved unmodified (9 files, 0 symlinks). Listener never restarted (same PID, uptime 86141 s); sandbox one-shot and local substitute both off.
- Containment: only the three handoff-92 transients were created and all were removed with the empty `evidence/` directory (verified absent); no scratchpad/`/tmp`/log/PID path, no tracked write, no schema/package/lock change, no runtime restart, build, typecheck, other test, provider, browser, Google, Toss, checkout, order, refund or economic action.
- Not proven: no HTTP request was made, so storefront rendering of the seven is unproven here; the legacy representative SKU remains active while its snapshot is now `superseded` (expected to fail closed, not exercised).

RETURN_TO: foundation-advisor
