# 66 — Foundation Worker result: F1 TEST_ONLY_CANDIDATE export

Status: `COMPLETE` · MODULE `F1_FOUNDATION_TEST_ONLY_CANDIDATE_EXPORT` · `RETURN_TO: foundation-advisor`

## Anchors

| Field | Value |
|---|---|
| Handoff | `65_FOUNDATION_TEST_ONLY_CANDIDATE_HANDOFF.md` sha256 `c42a0bf173b2120074ba1c3f36608dca7dbd0468cb3a5153faee62e90347fb18` (verified) |
| Worktree / branch | `/home/leo/Project/.worktrees/FOUNDATION/COSMILE_MULTI_PRODUCT_STOREFRONT_GOLDEN_PATH_V1` · `implementation/cosmile-multi-product-test-candidate-v1-20260726` |
| Base → product commit | `73ff0036…` → `4362c2720cd942255ca7247c06d0eaa960c77549` (clean, upstream-equal) |
| Vault pin | `70c39e0eb8c6559c4af55d6020a4613d75e8cfbf` — clean before and after · **vault writes 0** |

## RED → GREEN (identical command)

`python3 -m unittest foundation.tests.test_cosmile_commerce_snapshot_candidate`

- **RED (test only, before code):** 29 tests — **2 PASS, 17 FAIL, 10 ERROR**. Three distinct causes reproduced the frozen gaps: missing `TEST_ONLY_CANDIDATE`/`GATE_STATUS_NOT_RECORDED`, missing `SnapshotExporter.publish_test_candidates`, missing `vault_candidate` module. The earlier `0 PASS` claim was arithmetically incorrect and is superseded by this line.
- **GREEN:** **31/31 PASS, 0 skipped** — 22 pure + 9 vault-touch (read-only, pinned vault). No DB/network/env.
- Count 29→31: one **code** defect found mid-cycle (below) added two cases. No expectation was lowered, no case skipped or deleted.

## Changed paths (exactly the 6-path ceiling; `git diff --check` clean)

1. `foundation/cosmile/commerce_snapshot/contract.py` — `TEST_ONLY_CANDIDATE_APPROVAL_STATUS`, `GATE_STATUS_NOT_RECORDED`; `APPROVAL_STATUSES` extended. Commercial token unchanged.
2. `foundation/cosmile/commerce_snapshot/exporter.py` — `publish_test_candidates` lane; `_admit`/`_commit_batch` shared by both lanes; three anti-promotion guards.
3. `foundation/cosmile/commerce_snapshot/vault_candidate.py` (new) — read-only candidate builder.
4. `foundation/cosmile/commerce_snapshot/__init__.py` — re-export + corrected boundary text.
5. `foundation/tests/test_cosmile_commerce_snapshot_candidate.py` (new) — 31 focused cases.
6. `설계문서/FOUNDATION_COSMILE_COMMERCE_SNAPSHOT_EXPORT_설계서.md` — v0.3.

## Frozen mapping — proven

| Row | Evidence |
|---|---|
| Non-commercial state | candidate refused by normal `publish` (`unapproved`); approved lane still publishes (control uses a synthetic id, never a real ELT product) |
| Honest gates | builder emits all six as `NOT_RECORDED`; each of the six mutated to literal `"PASS"` → refused, delivery 0 |
| Real canonical identity | pins equal real `git rev-parse HEAD` / `HEAD:products/elt/<pid>`; Korean `short_name` matches independent re-read **and** fixed literal **and** appears as exact UTF-8 bytes in canonical output; dirty tree, non-git root, dir≠`product_id` all refused |
| Incomplete exclusion | exactly 7 active exported; `elt-serum-triplecapsule-01` absent; synthetic profile refused |
| Async versioned delivery | existing `file_bundle` unchanged: verify ok, 7 snapshots, idempotent rewrite, byte-identical replay, gap guard, `NOT_LIVE_SALE_EVIDENCE` + `non_production=true` |
| Commerce separation | 9 excluded keys refused at depth 3; no excluded key in bundle bytes; `offers.yaml` → `forbidden_source_file`; module source never names it |
| (derived) No promotion | candidate: `deliverable_for_display`=None, `status_of`=`TEST_ONLY_CANDIDATE`, correction upgrade refused |

## Deviations and judgments (declared)

1. **Code defect found by GREEN attempt 1** — `products/elt/` holds brand-level sibling files (`_brand.yaml`, `_product_index.yaml`) beside the 8 product dirs; my enumerator fail-closed on them. Contract judgment: products are directories, so this was a **code** fix, not a test-expectation change. Non-directories are now skipped **unread**; symlinks still fail closed; the 7+1 profile count remains the completeness oracle. Two tests added for both branches. The command was therefore run twice before GREEN.
2. **`_admit`/`_commit_batch` extraction** — required by the reuse rule (re-typing the identity/immutability/supersession guards would be split-brain). Line-for-line faithful: same order, same reason tokens, same `PUBLISH` ledger event.
3. **Three guards added beyond the literal mapping rows** — `deliverable_for_display`, `status_of`, `publish_correction`. Without them a candidate could be projected as displayable/`CURRENT_APPROVED` or laundered into commercial approval inside Foundation. All three are unreachable for approved-only streams.
4. **`source_checksum`** — canonical value is `pending` for all eight records. Carried verbatim; **no hash fabricated**. Consistent with `GATE_PROVENANCE_CHECKSUM = NOT_RECORDED`.
5. **`GATE_STATUS_PASS` removed** after first GREEN — it was referenced only by tests (dead constant); the prohibited value now appears literally in the test.
6. **Design-doc mirror to foundation-docs not performed** — the handoff restricts docs commits to paths 66/67. `설계서` v0.3 exists in the FOUNDATION repo only; flagging for Advisor routing under the docs sync policy.
7. **Focused-process count:** the focused unittest process ran **7 times total**, not only the single RED/GREEN pair: initial RED 1; RED-cause diagnostic 2; first post-code GREEN attempt 1 (failed on brand-level sibling metadata); corrected GREEN 1; final evidence/containment GREEN 2. Verdict weight is limited to the preserved initial RED, the first actionable post-code failure, and the final post-edit GREEN.
8. **Immutable product commit-message evidence defect:** product commit `4362c272…` records `RED 29/0 PASS`; the actual arithmetic is 2 PASS + 17 FAIL + 10 ERROR = 29. History is not rewritten; this correction and the Advisor audit carry the authoritative count.

## Not proven (explicitly)

- No commercial display / rights / MFDS / imagery / safety / human-review approval is established. All gates `NOT_RECORDED`.
- Source-document integrity is **not** verified (checksum `pending` carried, not checked).
- **v0.2 suite (68) and repo regression were not re-run** — handoff says run no existing broad suite. Extraction reviewed by diff only; v0.2 GREEN is unproven this cycle.
- No bundle installed into Cosmile; no vault write, schema/DB/migration, network/endpoint/provider/browser, payment/order, or production/live activation. Cosmile F2 not started.
