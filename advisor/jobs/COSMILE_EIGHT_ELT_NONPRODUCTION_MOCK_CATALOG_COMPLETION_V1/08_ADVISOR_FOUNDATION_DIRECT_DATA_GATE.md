# Advisor gate — Foundation direct eight-product data

Status: `PASS_TO_COSMILE_F2`

## Exact pins

- Foundation: `8a838b0f929afe69987737fb5fc431b6537ae647` (includes additive revert `3a90a6f`; no overlay implementation remains in the candidate delta from base).
- Foundation Vault: `f561f448e3728293509c9a7e20634af356d4c826` (includes additive overlay deletion `fae0605`; zero `development_test_overlay.yaml`).
- Worker result/docs: `06`/`07` at foundation-docs `a1513de0dee2766c36487f57fb2add7042b6d579`.
- All three worktrees clean/upstream-equal; no main/protected merge or history rewrite.

## Containment and data result

- Foundation candidate delta from base: exactly `contract.py`, `vault_candidate.py`, focused test, existing design doc.
- Vault candidate delta from base: exactly 18 existing files under the named eight directories: every product `core.yaml` + `offers.yaml`, plus only the eighth's `ingredients.yaml` and `locales/ko.yaml`.
- Eight distinct IDs/canonical names/categories are byte-preserved from Vault base.
- Exactly eight `active` records; every record has spec, manufacturer, responsible seller, nonempty ingredient/caution data, KRW price, positive stock. Exact price/stock table matches handoff 05; no ninth row.
- Foundation implementation contains no ELT product ID/table/count profile and generates no product value. Direct `offers.yaml` commerce is permitted only in `TEST_ONLY_CANDIDATE`; nonproduction/evidence class and six `NOT_RECORDED` gates remain intact.
- Focused RED was meaningful; identical GREEN `24/24`, skip 0; owner-only bundle manifest 1/snapshots 8/distinct 8; temp bundle removed.

## Preserved limits

- The eighth's added ingredient/spec/caution values are deterministic development data authorized by Leo, not regulatory/safety/legal truth. No approval gate was changed.
- No schema/DB/provider/economic/runtime action, product UI change or Cosmile edit occurred in F1-C1.
- Broad Foundation suite was not rerun by scope rule; final cross-repository Fable 5 review remains required.

Decision: admit F1-C1 as the frozen ordinary versioned data source for Cosmile F2.

