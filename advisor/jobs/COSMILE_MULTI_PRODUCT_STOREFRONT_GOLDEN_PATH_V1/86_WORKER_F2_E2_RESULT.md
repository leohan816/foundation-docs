# F2 E2 EXACT-SET AND CATEGORY CONTAINMENT — WORKER RESULT

Status: **PASS**

- Handoff `85` verified: docs `5ece04e9f81c8d9f725bb01521fd7879e6f1d4cf`, sha256 `3b528640991ecb742af8a2c8d4646b35d99ad7165e805e461ce6ea3ff521068a`.
- Base `7088e4e21a791c5d6c741a78ab9c891b59d85d70` clean/upstream-equal → commit `91ded4491785ff4d18f081d05fce9ca63cc6f1e9`, non-force pushed, clean/upstream-equal.
- All four findings were real and each was reproduced by RED before any source change.

## Corrections

The E1 guards prove *who* is calling; they said nothing about *what* is written. Three pure decisions now make the single frozen `TEST_CANDIDATE_OVERLAY` the authority, compared by canonical JSON tuples so no separator inside a value can make two rows compare equal.

| # | Finding | Correction | Proof |
|---|---|---|---|
| 1 | seed accepted any caller overlay | `decideExactCandidateOverlay`: exact seven tuples, every value unchanged; order not authority | pure: reordered-exact admitted; missing / extra / duplicate / tampered price / tampered stock / tampered SKU id / reordered-with-changed-value all refused. **behavioural**: foreign and tampered overlays refused at the entry point with `overlay_not_frozen_set` |
| 2 | bind accepted an arbitrary SKU id when DB product agreement matched | `decideCandidateSkuForProduct`: product → its own frozen SKU only | pure: all seven pairs admitted; arbitrary SKU and another candidate's SKU refused; excluded product → `product_not_in_candidate_set`. **behavioural**: refused at the entry point |
| 3 | activate accepted a caller subset, so the in-transaction precheck only proved that subset | `decideExactCandidateSkuSet` before Prisma | pure: reordered-exact admitted; subset / extra / duplicate / empty refused. **behavioural**: subset and extra refused with `sku_set_not_frozen` |
| 4 | activation catch returned raw `Error.message` | only `candidate_precheck_failed` and `partial_activation_refused` map through; everything else → `activation_failed` | **behavioural**: with runtime *and* payload admitted the call reaches the mocked-`{}` Prisma boundary and still returns a closed category; the outcome JSON is asserted free of `prisma`, `$transaction`, `$executeRaw`, `not a function`, `undefined` |

The in-transaction seven-binding / snapshot-lifecycle / product precheck and both rollback throws are preserved unchanged.

## Tests-first evidence

Frozen command (identical both runs):

`cd app && ./node_modules/.bin/vitest run scripts/o1_test_candidate_catalog.vitest.ts --config vitest.config.ts`

- **RED**: `6 failed | 23 passed (29)`, exit `1` — one failure per finding.
- **GREEN**, first identical re-run: `29 passed (29)`, exit `0`. No intermediate oracle correction was needed this time.

## Containment

- Exactly the three ceiling paths; 168 insertions, 3 deletions from `7088e4e`. `git diff --check` exit `0`. Schema, `package.json`, `package-lock.json` unchanged.
- **Overlay values untouched**: the diff contains zero `priceKrw:` / `stock:` lines. Approved lane, checkout, pages, exact seven and excluded eighth unchanged.
- No DB, runtime, browser, provider, build, typecheck or other test command. Preserved orders, reservations, intents and transactions never queried.

## Not proven here

- The Prisma-backed SQL beyond the new guards is still unexecuted; the in-transaction precheck and rollback-on-throw remain structural, pending the isolated runtime gate.
- The behavioural driver-fault cases exercise the failure path only (the mocked client throws on first access). A successful activation against a real database is unproven here.
- `applyTestCandidateCatalog` passes the frozen overlay and the planner's frozen SKU list, so it satisfies the new guards by construction; that composition is not separately executed.
