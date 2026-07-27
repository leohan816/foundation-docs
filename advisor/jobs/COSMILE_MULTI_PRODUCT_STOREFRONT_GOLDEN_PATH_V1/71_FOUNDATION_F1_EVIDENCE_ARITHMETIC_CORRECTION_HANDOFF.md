# 71 — Foundation F1 evidence-arithmetic correction

MISSION: `COSMILE_MULTI_PRODUCT_STOREFRONT_GOLDEN_PATH_V1`  
ACTOR: same preserved Foundation Worker / Opus 5 / high  
BASE: `4362c2720cd942255ca7247c06d0eaa960c77549`  
REVIEW: `69_F1_INDEPENDENT_IMPLEMENTATION_REVIEW.md` / `NEEDS_PATCH` / finding F1 only

## Exact correction

Write ceiling: exactly one product path:

`설계문서/FOUNDATION_COSMILE_COMMERCE_SNAPSHOT_EXPORT_설계서.md`

At current line 118, replace the false RED statement:

`29 tests / 0 PASS(17 FAIL + 10 ERROR)`

with truthful evidence:

`29 tests = 2 PASS + 17 FAIL + 10 ERROR`

and append in the same bullet that the focused unittest process ran 7 times total:
initial RED 1; RED-cause diagnostic 2; first post-code GREEN failure 1; corrected
GREEN 1; final evidence/containment GREEN 2. Only the preserved initial RED, first
actionable post-code failure, and final post-edit GREEN carry verdict weight.

## Boundaries

- Documentation wording correction only; no code/test/contract behavior change.
- Do not run tests, inspect vault, read product inputs, or start F2.
- Preserve Founder correction: all ELT products are intended sale products;
  `TEST_ONLY_CANDIDATE` is only the current non-production technical disposition.
- Run only `git diff --check`, exact one-path diff/status, commit, and non-force push.
- Write only `72_FOUNDATION_F1_EVIDENCE_ARITHMETIC_CORRECTION_RESULT.md` and
  `73_FOUNDATION_F1_EVIDENCE_ARITHMETIC_CORRECTION_POINTER.md` in this job directory;
  commit/push only those two docs paths.
- Return product/docs commits and `RETURN_TO: foundation-advisor`; STOP before F2.
