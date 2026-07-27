# F2 TEST CANDIDATE CATALOG INTEGRATION — WORKER RESULT

Status: **PASS**

- Handoff `79_ADVISOR_F2_TEST_CANDIDATE_CATALOG_HANDOFF.md` verified: docs `24c124f0d679919dbe292fac714c470e506ae37b`, sha256 `f42440628a629cbbd24e9eed92977e3ec3d1c2c322958280701b4ca17432f849`.
- Base `4dd56c12c72a4e6921295ab26910fbc8abff2526` clean/upstream-equal → commit `bd265a78885121451bbf47576f04f5dad7d4e347`, non-force pushed, clean/upstream-equal.
- `/fable-builder` loaded from the named path; the three required references are byte-identical to those already in session.
- **All seven are intended sale products.** `TEST_ONLY_CANDIDATE` is recorded throughout as a temporary non-production technical disposition, never a not-for-sale classification.

## Contract → code mapping

| Frozen item | Landing | Proof |
|---|---|---|
| 1 commercial lane unchanged | `decideCatalog` candidate branch is additive | 10 approved-lane cases replayed with/without proof, identical outcomes |
| 2 parity | `snapshotContract`: `TEST_ONLY_CANDIDATE`, `GATE_NOT_RECORDED_TOKEN` | parity test; candidate docs pass `validateSnapshot` |
| 3 separate entry + ready runtime + exact root | `candidateRuntimeProof` | production / flag off / near-miss flag / Google off / live-looking key / live mode / other, parent, child root → refused |
| 4 exact document admission | `decideCandidateAdmission` | approval, each of six gates (PASS and BLOCKED), product-set, invalid doc |
| 5 `missing_initial`, no schema | `CANDIDATE_SNAPSHOT_LIFECYCLE_STATUS` | schema/package/lock unchanged (0 entries) |
| 6 predecessor rule | `decideCandidatePredecessor` | representative-only supersede; foreign sha, split head, borrowed lineage refused |
| 7 separate guarded bind | `bindTestCandidateSku` | approved `bindSku` region contains no candidate token and still demands `current_approved` |
| 8 candidate sellability | `decideCatalog` | sellable only with proof + missing_initial + candidate approval + six NOT_RECORDED; any PASS, wrong approval, withdrawal, supersession refused |
| 9 seed→bind→atomic activate | `seedCandidateSkusInactive` / `activateCandidateSkus` / `planCandidateActivation` | partial set refused; single UPDATE, count mismatch rolls back; no CommerceOffer |
| 10 Foundation-only identity | `candidateDisplayName` | `display_short_name_ko`, legacy fallback, null when unrecorded |
| 11 shared catalog path | `o1EligibleCatalog` untouched | no screen names a product id, candidate token, or hard-coded count |
| 12 no live action | — | no DB/runtime/browser/provider/schema/migration/lock command run |

## Tests-first evidence

Frozen command (identical for RED and GREEN):

`cd app && ./node_modules/.bin/vitest run scripts/o1_test_candidate_catalog.vitest.ts scripts/o1_catalog_price_authority.vitest.ts scripts/o1_multi_product_storefront.vitest.ts --config vitest.config.ts`

- **RED**, tests before source: `3 failed (3)` files, `2 failed | 32 passed`, exit `1` (captured unmasked via `PIPESTATUS[0]`) — candidate module absent, candidate lane not sellable, shared-path assertions unmet.
- **GREEN**: `3 passed (3)`, `50 passed (50)`, exit `0`.

## Declared: one oracle-region correction between the two GREEN attempts

The first GREEN attempt returned `49 passed | 1 failed`. The failure was **my own test-region defect, not a source defect**: the "approved binder" slice ran from `bindSku` to `bindTestCandidateSku`, and the whole F2 section sits between them, so the slice swallowed the candidate lane and naturally contained `missing_initial`. The approved `bindSku` body itself is clean. I re-anchored the region to end at the F2 section marker and **strengthened** the case (it now also asserts the approved binder still demands `current_approved`, and that the candidate binder never calls `bindSku`). No assertion was weakened or removed. The frozen command was then re-run once and passed 50/50. Full disclosure rather than a silent re-run.

## Containment

- Exactly the nine ceiling paths; 911 insertions, 21 deletions. `git diff --check` exit `0`. `package.json`, `package-lock.json`, `prisma/` unchanged.
- No durable bundle was created, searched further, or consumed; the test fixture is test-local and fully contract-verified. The setup script is skipped unless `O1_TEST_CANDIDATE_SETUP=1` and so executed nothing here.
- Two preserved pending orders, reservations/HOLD, intents, transactions and order items untouched — no query or write.

## Not proven here

- `snapshotRepository` candidate functions are Prisma-backed and cannot execute in a pure suite (the module's own long-standing note). Their separation and guards are proven structurally; their durable behaviour is for the separate isolated runtime gate.
- No typecheck, build, DB, runtime, browser or provider action was authorized or run. The `Prisma.join` activation, the seed statement and the import transaction are unexecuted code at this point.
- The seven-product bundle does not exist yet by design; end-to-end admission of real candidate documents is unproven until that gate.
