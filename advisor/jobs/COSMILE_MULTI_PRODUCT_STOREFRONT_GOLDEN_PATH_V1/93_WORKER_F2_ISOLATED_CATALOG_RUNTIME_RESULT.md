# F2 ISOLATED CATALOG RUNTIME GATE — WORKER RESULT

Status: **HOLD** — first one-shot failed; stopped immediately with no retry and no alternative, per handoff 91.

- Handoff `91` preserved; correction `92` verified: docs `d0138d949d4680cf898c9f079182cf6bce7255ec`, sha256 `796d711435161b1d90be344f9814e2a802583124c0626d7a38f7d566c191313e`.
- Pins reverified and unchanged throughout: Cosmile `91ded4491785ff4d18f081d05fce9ca63cc6f1e9` clean/upstream-equal · Foundation `966db20822b7accb36c33dedb01ffba51a9bef68` clean · vault `70c39e0eb8c6559c4af55d6020a4613d75e8cfbf` clean.

## Failure (stop point)

One-shot #1, exit `1`: `1 failed | 1 passed (2)`. The failing assertion carried the categorical stage token **`stage:import/repository_error`** — `applyTestCandidateCatalog` returned `{kind:"failed", stage:"import"}` with the closed category `repository_error` from `importTestCandidateBundle`. Handoff 91 step 6 ("first failure stops") and the HOLD list ("first command failure, no retry or alternative") apply, so one-shot #2 was **not** run and no diagnosis, retry or variant was attempted.

## Effects: exactly zero

Read-only before/after evidence, captured with the authorized transient driver:

- `protected_counts_identical = true` across **every** public table (all 60+, not only the named ones); `protected_diffs = none`.
- `mutable_diffs = none` — `FoundationProductSnapshot` 1, `SkuBinding` 1, `CommerceSku` 1, unchanged.
- Order categories identical (`pending` 2); reservation categories identical (`reserved` 2). The two preserved ambiguous pending orders and two reserved holds are untouched.
- Candidate read-back all zero: candidate snapshots `0`, candidate bindings `0`, candidate SKUs `0`, active/non-hidden candidate SKUs `0`, candidate `CommerceOffer` rows `0`, incomplete-eighth snapshot rows `0`, incomplete-eighth SKUs `0`.
- No partial activation was possible: nothing was imported, seeded, bound or activated. The fail-closed ordering behaved as designed — the import stage refused before any downstream write.

## Bundle: generated and verified PASS

Generated once from the reviewed F1 APIs only (`vault_candidate.build_candidate_snapshots` → `SnapshotExporter.publish_test_candidates` → `file_bundle.write_bundle`), `authorized_by=foundation-advisor`, deterministic `2026-07-27T00:00:00Z` authorization/export/create timestamps (rehearsal authority only — no commercial, rights or safety approval implied).

`file_bundle.verify_bundle` run once: `ok=true`, `reason=null`, `manifest_count=1`, `snapshot_count=7`, `manifests_written=1`, `snapshots_written=7`, `unchanged=0`. All seven documents: `non_production=true`, `NOT_LIVE_SALE_EVIDENCE`, approval exactly `TEST_ONLY_CANDIDATE`, all six gates exactly `NOT_RECORDED`. Incomplete eighth present: `false`. Product set exactly the seven canonical ids.

Bundle preserved as durable mission evidence at the handoff's path: `<f2>/foundation-candidate-bundle`, 9 files, 0 symlinks, every component `leo:leo` mode `0700`/`0600`.

## Runtime gate (verified before the one-shot)

Non-production `true` · runtime flag exactly `true` · Google enabled exactly `true` · Toss mode `test` · Toss secret carries the `test_` prefix · sandbox one-shot **not set** · local substitute **not set** · bundle-root override equals the exact generated root. Only `COSMILE_O1_FOUNDATION_BUNDLE_ROOT` and `O1_TEST_CANDIDATE_SETUP` were overridden; the rest of the environment was loaded from the owned listener into process memory only and never printed, persisted, hashed or placed in argv.

## Containment

- Only the three authorized transient files were created (`counts.mjs`, `before.json`, `after.json`, mode `0600`, `leo:leo`, real files); all three plus the empty `evidence/` directory were removed after the comparison. Verified absent. No Claude scratchpad, `/tmp`, log, PID file or other output path was used.
- No tracked product, Foundation, vault, package, lock, schema, migration, test or configuration path changed.
- No runtime restart, build, typecheck, browser, Google, Toss, provider, checkout, order, refund or economic action. Exactly one listener on `127.0.0.1:3000` throughout.

## Not proven / open

The `repository_error` category is a deliberate catch-all, so the specific cause inside `importTestCandidateBundle` is **unknown and undiagnosed** — investigating it would have required commands this handoff forbids after a first failure. What is proven is that the failure was total and clean: zero rows written anywhere.

Candidate causes were NOT investigated and must be scoped by the Advisor before any resume.
