# Worker Handoff — two actual-DB assertion corrections

MISSION_ID: `COSMILE_O1_REVIEWED_INTEGRATION_CANDIDATE_BASELINE_V1`

BASE: product `e1a5f3fd8f4764633e838a0a5e0cd21f0331ed80`, branch `integration/cosmile-o1-reviewed-candidate-baseline-v1-20260724`, clean/upstream-equal.

SKILL: `/fable-builder`; applicable references: `test-design-before-code`, `implementation-execution`, `implementation-report-template`.

## Preserved RED and diagnosis

- Preserved gate evidence: docs `730d7eff027bdb48be7ec20720cfe4d1bbec493c`.
- Exact focused RED: `scripts/o1_order_service_request.dbtest.vitest.ts` — 44 PASS / 2 FAIL.
- M2B is a stale test-state expectation, not a product-contract defect. Commit `31825fdd` appended the read-projection assertion after earlier tests had already cancelled `O.pre` and created active requests for `O.paid`/`O.ship`; the repository correctly re-derived the resulting `terminal`/`existing_request` states.
- M3A is stale fixture isolation, not a product-contract defect. Commit `bcf0faba` correctly queries every active O1 request ordered by `requestedAt,id`, but its exact five-row expectation omitted active `O.paid` and `O.race` rows created by earlier tests. The received seven-row result matches the queue contract.

## Exact path ceiling

1. `app/scripts/o1_order_service_request.dbtest.vitest.ts`

No other product, test, config, manifest, lockfile, schema, migration, or documentation path may change.

## Exact correction

1. Relocate the three existing M2B actual-runtime inspection tests, without changing their assertions, to immediately after the disposable-DB suite `afterAll` and before the first state-mutating repository test. This exercises the initial synthetic state before those same orders are mutated.
2. At the start of the existing M3A `beforeAll` SQL transaction, delete only the two known earlier-test `OrderServiceRequest` artifacts for `O.paid` and `O.race`, then retain the existing M3A seeded rows and exact five-row expectation unchanged.
3. Do not change repository, service, runtime, queue SQL, contracts, product behavior, or economic semantics.

## Focused proof

- The existing 44/46 focused result is the meaningful RED; do not manufacture or rerun another RED.
- Use one fresh normal lockfile install in the mission worktree only, with mission-local HOME/cache; package/lock must remain byte-identical.
- Run exactly once:
  `npm run test:focused -- scripts/o1_order_service_request.dbtest.vitest.ts --cache=false`
- This command must generate the candidate Prisma Client first and may use only the test's own loopback disposable `postgres:16-alpine` with synthetic data.
- Required GREEN: the exact file is 46/46 PASS; both moved M2B assertions and isolated M3A exact queue assertion pass; no other test is run.

## Prohibited / STOP

No full suite, typecheck, build, lint, alternate test, retry, broad read, refactor, schema/migration, product-source correction, provider, owner environment, production/shared DB, feature work, or unrelated cleanup. STOP if the single-file correction cannot pass without another path or behavior change.

## Completion

Unconditionally remove the disposable container/port, worktree dependencies, mission caches, `.next`, `next-env.d.ts`, tsbuildinfo, and test cache created by this run. Verify canonical dependency hashes unchanged and product Git contains only the one allowed test path. Commit once, non-force push, verify clean/upstream-equal, return a compact result, and STOP.
