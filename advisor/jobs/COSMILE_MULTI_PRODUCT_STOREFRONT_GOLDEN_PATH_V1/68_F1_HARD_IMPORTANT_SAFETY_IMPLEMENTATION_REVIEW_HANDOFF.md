# 68 — F1 HARD_IMPORTANT_SAFETY implementation review handoff

MISSION: `COSMILE_MULTI_PRODUCT_STOREFRONT_GOLDEN_PATH_V1`  
PASS: `IMPLEMENTATION_REVIEW`  
TIER: `HARD_IMPORTANT_SAFETY`  
ACTOR: existing independent Foundation Reviewer only  
REQUIRED BINDING: Fable 5 / max / fresh cleared context / exact Foundation F1 worktree / `/fable-sentinel`

## Pins

- Product repo/worktree: `/home/leo/Project/.worktrees/FOUNDATION/COSMILE_MULTI_PRODUCT_STOREFRONT_GOLDEN_PATH_V1`
- Branch: `implementation/cosmile-multi-product-test-candidate-v1-20260726`
- Base: `73ff00361d9fa88ab57c17858210c1e080dfde1a`
- Candidate: `4362c2720cd942255ca7247c06d0eaa960c77549`
- Vault evidence pin: `70c39e0eb8c6559c4af55d6020a4613d75e8cfbf` (read-only; do not inspect beyond committed evidence)
- Contract handoff: `65_FOUNDATION_TEST_ONLY_CANDIDATE_HANDOFF.md`, SHA-256 `c42a0bf173b2120074ba1c3f36608dca7dbd0468cb3a5153faee62e90347fb18`
- Worker result/pointer: corrected `66`/`67` at foundation-docs `51bcad4a46e4db1d73bd43da1e340d92cc6c56ba`

## Founder product-scope correction

- All canonical ELT products are intended Cosmile sale products.
- The seven active/canonically usable ELT products are the current planned non-production catalog.
- The eighth incomplete product is temporarily fail-closed only for canonical completeness; it remains intended sale scope after those blockers close.
- `TEST_ONLY_CANDIDATE` is a temporary non-production technical/evidence disposition, **not** a business classification of not-for-sale.
- Foundation approval/gate facts remain unchanged and must not be invented. Synthetic TEST-only KRW price/stock belongs to later Cosmile F2. No live sale is authorized.
- Treat any “non-commercial candidate” wording as meaning “not live/commercially approved evidence yet,” never “not intended for sale.” Flag materially misleading code/design wording.

## Exact delta ceiling

Review only `73ff0036…4362c272` for:

1. `foundation/cosmile/commerce_snapshot/contract.py`
2. `foundation/cosmile/commerce_snapshot/exporter.py`
3. `foundation/cosmile/commerce_snapshot/vault_candidate.py`
4. `foundation/cosmile/commerce_snapshot/__init__.py`
5. `foundation/tests/test_cosmile_commerce_snapshot_candidate.py`
6. `설계문서/FOUNDATION_COSMILE_COMMERCE_SNAPSHOT_EXPORT_설계서.md`

Use `git show`/`git diff` pinned to the commits. Minimum parent-version comparison of these same paths is allowed. No repository census or unrelated file read.

## Required criteria

1. Candidate status is structurally distinct from commercial approval; normal publish/display/current-approved/correction promotion remain fail-closed.
2. Seven active real canonical identities/content are preserved; the incomplete eighth is excluded only by completeness status.
3. Gates are exactly `NOT_RECORDED`; no rights, safety, human-review, checksum, or live-sale PASS is fabricated.
4. Candidate builder is read-only, caller-rooted, clean-tree pinned, path/symlink safe, and limited to the three authorized canonical files.
5. Price, stock, sale status, mock/legacy content, provider/DB/runtime actions, and Foundation-canonical mutations are absent.
6. Shared exporter refactor preserves the pre-existing approved lane and does not let the candidate lane contaminate or silently block future intended-sale promotion beyond the explicitly frozen boundary.
7. Tests adversarially prove the contract without weakening or fabricating facts.
8. Evidence integrity: actual initial RED was **2 PASS + 17 FAIL + 10 ERROR = 29**, not `0 PASS`; focused unittest processes ran **7** times total. Product commit-message `29/0 PASS` has zero evidence weight and must not be repeated as fact.
9. Exact six-path containment, product/docs clean/upstream pins, vault write count 0, and F2 not started.

## Review execution boundary

Read-only review. Load `/home/leo/Project/skill/fable-sentinel/SKILL.md` plus contract, safety, provenance, classification, and delta references required by it. Do not load builder. Do not patch, implement, run tests/full suite, access DB/provider/browser/runtime, read secret/PII, mutate vault/product/docs, or start F2.

Write only:

- `69_F1_INDEPENDENT_IMPLEMENTATION_REVIEW.md` (≤100 lines)
- `70_F1_INDEPENDENT_IMPLEMENTATION_REVIEW_POINTER.md`

Commit/non-force push only those two foundation-docs paths. Return exact reviewed pins, actual model/effort/skill, findings, residuals, one verdict `PASS | PASS_WITH_RISK | NEEDS_PATCH | FAIL`, and `RETURN_TO: foundation-advisor`. STOP.
