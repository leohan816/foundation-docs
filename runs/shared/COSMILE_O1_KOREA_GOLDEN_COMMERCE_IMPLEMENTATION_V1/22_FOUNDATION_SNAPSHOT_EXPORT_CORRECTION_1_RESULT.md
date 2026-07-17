# 22 — Foundation Snapshot Export Correction Cycle 1 Result

```text
MISSION_ID: COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1
WORKUNIT: FOUNDATION-O1-SNAPSHOT-EXPORT-1
CORRECTION_CYCLE: 1
ACTOR: foundation Worker (same Foundation repository-owner Worker as candidate 99885de)
DATE_UTC: 2026-07-17
HANDOFF_COMMIT: fc01ba513c30be8bdae94221dbf60e18956a3d1e (verified = foundation-docs worktree HEAD; handoff read in full)
SKILL: /fable-builder (loaded in this session before product work; test-first discipline applied)
STATUS: COMPLETE — one additive correction commit, NOT pushed, awaiting same-Reviewer delta review
OLD_REVIEWED_CANDIDATE: 99885ded9927de092d660fe09ef3418891bb1291
NEW_CANDIDATE: 73ff00361d9fa88ab57c17858210c1e080dfde1a
RETURN_TO: foundation-advisor
```

## 0. Live gate verification (before any edit)

| Item | Verified |
|---|---|
| Model / effort | Fable 5 (`claude-fable-5`, harness declaration) / declared `max` by dispatch (nothing reduced; in-session limit as before) |
| Worktree / branch | exact `/home/leo/Project/.worktrees/FOUNDATION/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1` · `implementation/cosmile-o1-foundation-snapshot-v1-20260717` |
| HEAD at dispatch | `99885de…` = OLD_REVIEWED_CANDIDATE = EXPECTED_HEAD_AT_DISPATCH; `git status --porcelain` empty (EXPECTED_WORKTREE: CLEAN) |
| Upstream | unset (`no upstream configured`) = EXPECTED_UPSTREAM: UNSET; nothing pushed |
| Review evidence pins | `REVIEW_EVIDENCE_COMMIT dcaad81` verified ancestor of foundation-docs HEAD; `20_FOUNDATION_SNAPSHOT_EXPORT_IMPLEMENTATION_REVIEW.md` blob `c8d84ae3…` sha256 `279b4efe…6515ef` **MATCH**; pointer blob `50d050b7…` sha256 `5a0426c7…ef6a0a` **MATCH** |
| Review reread | complete 327-line review read from the pinned git blob (not working tree) before editing; verdict PASS_WITH_CORRECTIONS, findings SNAP-R1/R2/R3, observations O1–O5 noted as no-correction |

## 1. Corrections implemented (exactly SNAP-R1/R2/R3 — nothing else)

### SNAP-R1 — `exporter.py` `publish` intra-batch guards
Added batch-local identity/product tracking inside the validation loop (`batch_identity` map, `batch_products` set), applying the same invariants within one batch as across calls, ordered so byte-identical duplicates are recognized before the product check:
- byte-identical repeat in one batch → at most one delivery + one `DUPLICATE_IGNORED` ledger record per repeat occurrence (bounded by batch size);
- same identity 6-tuple with different content sha → refuse `immutability_violation`;
- second different snapshot of the same product → refuse `supersession_required` (correction path required);
- refusal keeps all-or-nothing purity: raised before any mutation; no manifest, no registration, ledger gains exactly one `REFUSED` entry;
- legitimate multi-distinct-product batch still publishes in one manifest (unchanged path).

### SNAP-R2 — `file_bundle.py` `_verify_snapshot_files` directory containment
Replaced the `os.walk` file-only scan with explicit two-level `os.listdir` traversal that never follows symlinks: under `snapshots/`, anything that is a symlink (directory **or** file), a non-directory at product level, a directory not equal to an expected product id, or a nested directory inside a product dir fails closed as the existing category token `unexpected_file`. Legitimate expected product dirs and multi-product bundles still verify; all tamper/missing/stray-file behavior preserved (suite-proven). Note: refusing symlinked *files* is a declared bounded hardening on the same finding axis (a symlinked file could otherwise satisfy byte checks via an external target); it changes no legitimate path because `write_bundle` never creates symlinks.

### SNAP-R3 — `file_bundle.py` entry↔document approval consistency
For every expected snapshot, `_verify_snapshot_files` now additionally requires manifest-entry `approval_status == doc["approval"]["approval_status"]` and `approval_scope == doc["approval"]["scope"]` against the hash-anchored snapshot document; mismatch fails closed as the existing token `manifest_entry_invalid`. A re-canonicalized forged manifest entry (which passes the manifest byte check) is now caught; untampered initial, correction, and withdrawal bundles remain valid (suite-proven).

Not implemented (per handoff exclusions): observations O1–O5, contract redesign, transport/endpoint/service/DB/network/concurrency/durability/runtime/AI/Memory/real-ELT behavior. `contract.py`, `__init__.py`, `설계문서/README.md`, vault: untouched.

## 2. Exact delta (old reviewed candidate → new candidate)

`git diff 99885de..73ff003 --stat`: **4 files, +242/−12** — exactly the handoff's four-path correction allowlist; out-of-allowlist changes 0.

| File | Delta | Content |
|---|---|---|
| `foundation/cosmile/commerce_snapshot/exporter.py` | +12/−0 | SNAP-R1 batch-local guards in `publish` (validation loop only; no other method touched) |
| `foundation/cosmile/commerce_snapshot/file_bundle.py` | +25/−12 | SNAP-R2+R3 rewrite of `_verify_snapshot_files` (explicit no-follow listing + approval equality; error tokens unchanged) |
| `foundation/tests/test_cosmile_commerce_snapshot.py` | +204/−0 | 15 new tests in 3 new classes; zero existing lines changed (no oracle weakening, no count reduction) |
| `설계문서/FOUNDATION_COSMILE_COMMERCE_SNAPSHOT_EXPORT_설계서.md` | +13/−5 | v0.2 changelog + §3 mapping rows (3 new) + §5/§6 semantics + §7 counts 53→68 |

No-unrelated-change proof: changed-path set == allowlist (above); test-file diff is purely additive; `contract.py`/`__init__.py`/`README.md` absent from diff; post-commit `git status --porcelain` empty; `find foundation -name __pycache__ -o -name "*.pyc"` → 0 (all runs `python3 -B`).

Commit discipline: exactly one new commit `73ff003` with parent `99885de` (verified via `git log --format='%H %P'`); no amend/rebase/squash/reset/force-push/history rewrite; branch reflog gains a single `commit:` entry; upstream unset; **not pushed**.

## 3. Test-first evidence and results (commands exact; Python 3.14.4, repo root, `python3 -B`)

1. **Failing-first:** the 15 new tests were written and run against the uncorrected code:
   `python3 -B -m unittest foundation.tests.test_cosmile_commerce_snapshot` → `Ran 68 — FAILED (failures=9)`.
   The 9 failures reproduce the reviewer's confirmed defects exactly: 4× SNAP-R1 (`TestIntraBatchGuards`: byte-identical repeat delivered twice; same-identity-different-payload accepted; second-same-product accepted; refused-batch purity), 3× SNAP-R2 (`TestSnapshotDirectoryContainment`: stray dir / nested dir / symlink dir verified ok), 2× SNAP-R3 (`TestManifestEntryApprovalConsistency`: forged status/scope verified ok). The remaining 6 new tests are accept-face/adjacent-negative oracles that legitimately pass both sides (multi-distinct-product batch; unknown-product dir with file; symlink-named-as-expected; symlink file; multi-product verify; untampered 3-manifest stream).
2. **After correction (focused):** same command → **Ran 68 — OK** (53 pre-existing + 15 new; pre-existing test lines untouched).
3. **Regression (same safe local set as the full review, rerun this cycle; delta 0):**
   `test_repo_import_smoke` exit 0 (12/0) · `test_repo_api_smoke` exit 0 (5/0) · `test_repo_trust_core` exit 0 (6/0) · `test_repo_siasiu_contract_smoke` exit 0 (13/0) · `python3 -B -m unittest discover -s foundation/shared_memory/tests -t . -p "test_commerce_evidence_*.py"` → **Ran 308 — OK** · `test_shared_memory_v0` exit 0 · `test_subject_ref_v2_hard_gate` exit 0.
4. Test-diff oracle changes: **0** — no existing assertion/expected value/fixture modified; additions only.

Per-behavior coverage map (positive + adjacent-negative, handoff requirement):

| Required behavior | Positive test | Adjacent-negative / boundary |
|---|---|---|
| R1 batch duplicate → ≤1 delivery + bounded record | `test_batch_byte_identical_repeat_single_delivery` (1 entry·1 `DUPLICATE_IGNORED`·chain 1) | `test_batch_multi_distinct_products_one_manifest` (legit batch unharmed) |
| R1 same identity ≠ sha → refuse | `test_batch_same_identity_different_payload_refused` (`immutability_violation`) | ledger == `["REFUSED"]`·manifests 0·delivered 0 |
| R1 second same-product → refuse | `test_batch_second_snapshot_same_product_refused` (`supersession_required`) | `test_refused_batch_leaves_state_clean_for_next_publish` (seq 1 still available) |
| R2 unexpected dirs fail closed | `test_stray_directory_fails`·`test_nested_directory_fails`·`test_unknown_product_directory_with_file_fails` | `test_multi_product_bundle_still_verifies` (ok·count 2) |
| R2 symlinks fail closed | `test_symlink_directory_fails`·`test_symlink_named_as_expected_product_fails`·`test_symlink_file_inside_product_dir_fails` | category token preserved (`unexpected_file`) |
| R3 forged entry fails closed | `test_forged_entry_approval_status_fails`·`test_forged_entry_approval_scope_fails` (re-canonicalized; reason `manifest_entry_invalid` proves the new check, not the byte check) | `test_untampered_streams_still_verify` (initial+correction+withdrawal, 3 manifests·3 snapshots ok) |

## 4. What is proven / not proven by this correction

- **Proven:** the three reviewer-confirmed defects no longer reproduce, at the same pure/one-process layer, with the reviewer's own scenarios encoded as failing-first tests; all prior 53 oracles and the full regression baseline unchanged (delta 0).
- **Not proven / unchanged scope:** everything the candidate already declared not-proven (no real-ELT/vault path, no transport, no Cosmile import, no multi-process, Leo/Cosmile-lane TBDs); observations O1–O5 remain open by handoff instruction; manifest-self-hash limitation (설계서 §8-7) unchanged — SNAP-R3 closes only the hash-anchored approval axis.

## 5. Pre/post Git state

| | Pre (dispatch) | Post |
|---|---|---|
| Branch/HEAD | `implementation/cosmile-o1-foundation-snapshot-v1-20260717` @ `99885de`, clean, upstream none | same branch @ `73ff003` (parent `99885de`), clean, upstream none, push 0 |
| Vault / other repos | untouched | untouched (module still has zero vault-path knowledge — static tests re-green) |
| foundation-docs | HEAD `fc01ba5`, clean | HEAD `fc01ba5` + this result/pointer 2 files (uncommitted — Advisor publishes) |

Rollback of this correction only: `git reset --hard 99885ded9927de092d660fe09ef3418891bb1291` (returns to the old reviewed candidate; single additive commit, local-only, unpushed).

## 6. Boundary attestation

No push, no Reviewer dispatch, no next unit, no vault write, no endpoint/network/DB/AI/Memory/production action, no secret/PII, no subagent, no foundation-docs commit, no scope expansion, no O1–O5 implementation. PASS is not inferred — delta review belongs to the same Reviewer via Advisor routing.

```text
CORRECTION_STATUS: COMPLETE
OLD_CANDIDATE: 99885ded9927de092d660fe09ef3418891bb1291
NEW_CANDIDATE: 73ff00361d9fa88ab57c17858210c1e080dfde1a (one additive commit; parent = old candidate; NOT pushed)
DELTA: 4 files +242/−12 (= exact correction allowlist; test file purely additive)
FINDINGS_ADDRESSED: SNAP-R1 · SNAP-R2 · SNAP-R3 (failing-first 9 repro → 68/68 OK)
REGRESSION: delta 0 (36 script + 308 unittest + 2 script-style exit 0)
RETURN_TO: foundation-advisor
STOP
```
