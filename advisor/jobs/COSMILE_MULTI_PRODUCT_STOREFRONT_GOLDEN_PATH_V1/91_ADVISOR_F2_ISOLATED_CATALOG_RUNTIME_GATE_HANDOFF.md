# Advisor handoff — F2 isolated catalog runtime gate

VERDICT: `PROCEED_WITH_LIMITS` · `RETURN_TO: foundation-advisor`

## Pins and actor

- Mission: `COSMILE_MULTI_PRODUCT_STOREFRONT_GOLDEN_PATH_V1`.
- Foundation source: `966db20822b7accb36c33dedb01ffba51a9bef68`, clean/upstream-equal.
- Foundation vault: `/home/leo/data/vaults/SIASIU_COSMILE_VAULT` at exact clean
  `70c39e0eb8c6559c4af55d6020a4613d75e8cfbf`, read-only.
- Cosmile product: `91ded4491785ff4d18f081d05fce9ca63cc6f1e9`,
  clean/upstream-equal, exact F2 reviewed candidate.
- Worker: existing `cosmile:claude.0`, actual `claude-opus-5`, effort `xhigh`,
  exact Cosmile mission CWD, `/fable-builder`; no other actor writes.
- Independent F2 review: docs `5452f85c`, `PASS`, blocking findings `0`.

## Exact mutable paths and effects

No tracked product, Foundation, vault, package, lock, schema, migration, test, or
configuration path may change.

The only filesystem output is:

`/home/leo/Project/.mission-tmp/COSMILE_MULTI_PRODUCT_STOREFRONT_GOLDEN_PATH_V1/f2/foundation-candidate-bundle`

Create its parent and bundle with `umask 077`; every component must be
`leo:leo`, real/non-symlink, owner-only. The bundle is durable mission evidence
for the later runtime gate and is not deleted on PASS. No secret belongs in it.

The only DB mutations are those performed by the reviewed
`app/scripts/o1_test_candidate_catalog_setup.vitest.ts` against the exact
dedicated non-production DB already bound to the owned `127.0.0.1:3000`
candidate runtime:

1. import the exact seven candidate snapshots;
2. seed their exact frozen candidate SKUs inactive/hidden;
3. bind the exact seven product/SKU pairs;
4. atomically activate that exact seven-SKU set.

No order, cart, wishlist, customer, identity, session, intent, transaction,
refund, reservation, shipment, reconciliation, audit, provider, or economic row
may be created, changed, deleted, or cleaned. The two preserved ambiguous
pending orders and two reserved holds remain untouched.

## Procedure

1. Reverify all pins, clean/upstream state, Worker binding, real worktree-local
   `app/node_modules`, and the single owned listener at `127.0.0.1:3000` whose
   CWD is this exact Cosmile worktree. Capture environment **names only**.
2. Before any write, record count/status-category-only DB baselines for:
   Foundation snapshots, SKU bindings, Commerce SKUs, and the protected
   order/cart/wishlist/customer/identity/session/payment/refund/reservation/
   shipment/reconciliation/audit tables. No IDs, values, timestamps, hashes,
   raw JSON, credentials, or PII.
3. Generate exactly one Foundation `fsnap-bundle-1.0` from the reviewed F1
   APIs only: `vault_candidate.build_candidate_snapshots` ->
   `SnapshotExporter.publish_test_candidates` -> `file_bundle.write_bundle`.
   Use `authorized_by=foundation-advisor` and deterministic
   `2026-07-27T00:00:00Z` authorization/export/create timestamps. This records
   rehearsal authority only, never commercial/right/safety approval.
4. Run `file_bundle.verify_bundle` once. Require exactly one manifest, exactly
   seven snapshots, `non_production=true`,
   `NOT_LIVE_SALE_EVIDENCE`, exact `TEST_ONLY_CANDIDATE`, all six gates exact
   `NOT_RECORDED`, and no incomplete eighth product. Report categories/counts
   only. Reverify Foundation source and vault clean pins unchanged.
5. Load the owned runtime process environment in-memory without printing,
   persisting, hashing, or placing values in argv. Override only
   `COSMILE_O1_FOUNDATION_BUNDLE_ROOT` to the exact bundle root and
   `O1_TEST_CANDIDATE_SETUP=1`. Require the ready non-production, Google-enabled,
   Toss-TEST runtime gate. Never enable sandbox one-shot or local substitute.
6. From `app/`, run exactly:
   `./node_modules/.bin/vitest run scripts/o1_test_candidate_catalog_setup.vitest.ts --config vitest.config.ts`
   once for initial apply. First failure stops.
7. Re-run the identical owner one-shot exactly once to prove idempotent replay.
   No other test. First replay failure stops.
8. Read back count/status-category-only evidence: exact seven candidate
   snapshots admitted, exact seven bindings, exact seven active/non-hidden
   candidate SKUs, zero candidate CommerceOffer rows, exact incomplete-product
   absence. Require the protected table counts/categories from step 2 to be
   byte-for-byte equal.
9. Verify product/Foundation/vault Git state unchanged; package/lock/schema
   unchanged; no extra process, port, browser, provider request, secret output,
   or temp artifact outside the one bundle root.

## Result

Write only:

- `92_WORKER_F2_ISOLATED_CATALOG_RUNTIME_RESULT.md`
- `93_WORKER_F2_ISOLATED_CATALOG_RUNTIME_POINTER.md`

Report categories/counts/booleans only, both one-shot exits, exact unchanged
protected-count proof, bundle status, Git state, and residuals. Commit/non-force
push only those two docs paths and return to Advisor. STOP before runtime
restart, build/typecheck, browser, Google, Toss, checkout, order, or refund.

HOLD immediately on pin/binding mismatch, bundle mismatch, DB-boundary ambiguity,
any protected-row change, partial activation, secret/identifier output, shared
dependency/vault mutation, or first command failure. No retry or alternative.
