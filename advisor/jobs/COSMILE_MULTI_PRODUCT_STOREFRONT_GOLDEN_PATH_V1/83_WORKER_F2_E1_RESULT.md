# F2 E1 RUNTIME GUARD AND ATOMICITY — WORKER RESULT

Status: **PASS**

- Handoff `82` verified: docs `cae344a4ef7ced970aea2ca5d53fd69b2e65c88c`, sha256 `5158a753dabe4b43a92b9a6ff83d8dd47bb9ad2ed0157664f5b7c89f1d204314`.
- Base `bd265a78885121451bbf47576f04f5dad7d4e347` clean/upstream-equal → commit `7088e4e21a791c5d6c741a78ab9c891b59d85d70`, non-force pushed, clean/upstream-equal.
- All six findings were real and were reproduced by RED before any source change.

## Corrections

| # | Finding | Correction | Proof |
|---|---|---|---|
| 1 | only the orchestrator checked the proof | every exported entry point takes `env` + exact root and guards before any Prisma/fs access | **behavioural**: real functions called with `@/lib/prisma` mocked to `{}`; 6 refusing runtimes × 4 entry points, plus 4 wrong roots × 4 entry points, all return a closed category — any Prisma touch would have thrown |
| 2 | conflict upsert left an active SKU on sale | conflict branch forces `inactive`/`hidden` | source-contract on the `DO UPDATE` clause |
| 3 | `{ok:false}` returned inside `$transaction` after mutation (commits the partial write) | throw inside the transaction; refusal reported from the outer catch after rollback; transaction re-verifies all seven bindings + candidate lifecycle + product agreement first | region-scoped: no `{ok:false}` inside the callback, both cardinality guards end in `throw`, and the post-rollback report still exists |
| 4 | revalidation lacked the candidate proof | both `catalogDecision` call sites carry `testCandidateProof` | count of proofs equals count of calls; revalidation region asserted directly |
| 5 | inserted count conflated with admitted set | `admitted` + `inserted` returned separately; `imported` retained as an explicit alias of `admitted` | source-contract; replay admits 7 / inserts 0 and remains PASS |
| 6 | multiple no-notice manifests accepted | `decideCandidateBundleShape`: exactly one manifest, seven entries, zero notices | **behavioural**: split manifests, empty bundle, trailing empty manifest and any notice all refused |

## Tests-first evidence

Frozen command (identical every run):

`cd app && ./node_modules/.bin/vitest run scripts/o1_test_candidate_catalog.vitest.ts scripts/o1_catalog_price_authority.vitest.ts --config vitest.config.ts`

- **RED**: `7 failed | 36 passed (43)`, exit `1` — exactly one failure per finding.
- **GREEN**: `43 passed (43)`, exit `0`.

## Declared: three oracle corrections, all mine, none a source defect

The frozen gate ran three times before GREEN. Every intermediate failure was a defect in **my own source-contract oracle**, and the source satisfied the contract in each case:

1. region sliced to `"} catch {"`, but the code now reads `catch (e) {`, so the slice ran past the function and swallowed the *outer* catch — where `{ok:false}` correctly belongs, after rollback. Re-anchored to the transaction callback, and **added** an assertion that the post-rollback report still exists.
2. the lifecycle assertion would have accepted an inline `'missing_initial'` literal. Strengthened pre-implementation to require the canonical constant *and* forbid re-declaring its value inline.
3. the cardinality assertion hard-coded the identifier `cosmileSkuIds`, while the implementation compares a stable local copy. Rewritten to assert the contract shape — both guards end in `throw` — instead of a variable name.

No assertion was weakened or deleted; each correction left the case stricter. Identifier- and position-coupled source-contract oracles are my recurring defect class in this suite and I am recording it as such.

## Containment

- Exactly the four ceiling paths; 227 insertions, 28 deletions from `bd265a7`. `git diff --check` exit `0`. Schema, `package.json`, `package-lock.json` unchanged.
- No DB, runtime, browser, provider, build, typecheck or full-suite run. Approved lane, overlay values, exact seven, excluded eighth, no-CommerceOffer rule and the preserved orders/reservations/intents/transactions untouched.

## Not proven here

- The Prisma-backed SQL (guard-passing paths, precheck join, atomic update, seed upsert) is still unexecuted; rollback-on-throw and the precheck are proven structurally, not against a database. That remains for the separate isolated runtime gate.
- The out-of-ceiling one-shot `o1_test_candidate_catalog_setup.vitest.ts` was not edited; it keeps working because `imported` is retained as an alias of `admitted`. Its assertions are unverified here since it stays skipped.
