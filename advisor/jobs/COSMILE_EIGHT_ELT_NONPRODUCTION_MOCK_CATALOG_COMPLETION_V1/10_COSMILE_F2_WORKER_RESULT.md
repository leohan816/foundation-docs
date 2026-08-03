# Cosmile F2 Slice B — Worker result

Status: `COMPLETE` · RETURN_TO: Advisor · Final approval: Leo/GPT only

## Binding

- Handoff: `09C_ADVISOR_F2_SLICE_B_HANDOFF.md` @ docs `319a076` (verified present, unchanged at read time).
- Worktree: `/home/leo/Project/.worktrees/Cosmile/COSMILE_EIGHT_ELT_NONPRODUCTION_MOCK_CATALOG_COMPLETION_V1`.
- Base HEAD `3ae4513` verified, with exactly the two preserved dirty test deltas.
- Result commit `dce7c71`, pushed non-force; branch clean and upstream-equal.

## What changed

The candidate lane held its own product list, SKU table, prices and stock. That copy
was the authority over what could be sold, so a completed Foundation delivery could not
enter the storefront without editing Cosmile, and drift between the two was invisible.
Foundation now delivers price and stock in its ordinary `content.commerce` group, so the
copy has no reason to exist.

- `candidateSkuId(productId)` exported; pure `buildCandidatePlan(verifiedDocs)` re-admits
  every document, takes its validated `content.commerce` verbatim, derives the SKU, and
  refuses an empty delivery, a duplicate product/SKU row, or a document with no commerce
  group. It generates no product value.
- `decideCandidateAdmission` judges a document on its own evidence (contract, exact
  candidate approval, six `NOT_RECORDED` gates) and no longer on local membership.
- Every set, pair and activation decision is measured against an explicitly supplied
  verified plan. No module-level table remains.
- `snapshotRepository.ts` owns rederivation: each durable entry point checks the
  runtime/root proof FIRST, then rebuilds the plan from the pinned root itself. Seed and
  activate accept no caller payload; bind rederives before judging the requested pair;
  import returns the verified rows and `applyTestCandidateCatalog` iterates only those.
- The synthetic representative's product id now comes from its own generator, leaving one
  definition of the representative and no product literal in source.

## Evidence

Command (identical RED and GREEN):

`npx vitest run --config vitest.config.ts scripts/o1_test_candidate_catalog.vitest.ts scripts/o1_test_candidate_catalog_setup.vitest.ts scripts/o1_multi_product_storefront.vitest.ts`

- RED: 17 failed / 34 passed / 2 skipped. Both mandated base defects proven —
  (1) static membership authority: a well-formed candidate document for an unlisted
  product was refused `product_not_in_candidate_set`;
  (2) caller-supplied payload: seed/activate could not be called payload-free, and no
  entry point rederived its rows from the pinned root.
- GREEN: 51 passed / 2 skipped / 0 failed, exit 0. The 2 skipped are the owner-invoked
  DB procedure (`O1_TEST_CANDIDATE_SETUP` unset), correctly inert.
- Test layer: pure (no DB, no network, no filesystem write). `@/lib/prisma` mocked to `{}`
  so any Prisma access inside the durable entry points would throw — which is what makes
  "the guard and the rederivation run before any write" behavioural rather than asserted.
- `git diff --check` clean. Diff scope exactly the five authorized paths.
- Source literal audit clean: no `elt-` product literal, no price/stock literal, no
  hard-coded set size, and no surviving frozen-table symbol in either source file.
  `snapshotContract.ts` untouched (frozen at Slice A).

## Two test-side corrections (declared, not silent)

1. `o1_multi_product_storefront.vitest.ts` asserted `the candidate module owns <pid>`.
   That encodes the frozen-table premise this slice removes and directly contradicts the
   handoff clause "source product logic remains count/ID/table free". Replaced with the
   truthful and strictly stronger assertion: no screen AND no candidate source file may
   name a Foundation product. Screen protection is unchanged.
2. A fixture in the rewritten catalog suite passed `undefined` to request "no commerce
   group", which re-applies the default parameter — so the document was built WITH the
   group. Fixture bug, not a source defect; the omission is now requested with `null` and
   the test asserts the group really is absent before relying on it.

## Preserved unchanged

Predecessor handling · `missing_initial` lifecycle · replay idempotency · inactive/hidden
seed with the forced-reset conflict branch · single-transaction all-set activation with
rollback by throw · no `CommerceOffer` row · production / non-TEST / root denial · the
approved commercial lane · shared screens · all external O1/UI/payment APIs.

## What this does NOT prove

- No database, provider, browser or runtime execution was performed. Durable behaviour
  (actual import/seed/bind/activate against Postgres) remains proven only structurally
  and by the pre-existing dbtest mirror — not by this run.
- The exact-eight/no-ninth property is NOT asserted in source by design. It now lives in
  the pinned Foundation bundle, the focused fixtures, and the owner-invoked runtime gate
  (`10_`-scope: `EXPECTED_CANDIDATE_PRODUCTS = 8` in the setup procedure).
- Trust model change worth Advisor attention: with the local table gone, the authority
  over WHICH products are sellable is the verified bundle at the configured root plus the
  runtime/root proof. Cosmile no longer holds an independent second opinion on the set.
  This is the intended Foundation-owns-product-truth boundary, and it is stated here
  explicitly rather than left implicit.

## Pre-existing failures (untouched, out of scope)

The full suite reports 30 failed / 1303 passed / 10 skipped across 9 files:
`o1_console_finance_ui`, `o1_console_fulfillment_ui`, `o1_console_orders_ui`,
`o1_console_shell_ui`, `o1_console_space_contract`, `o1_operator_service_request_queue`,
`o1_operator_support_ack`, `o1_order_service_request`, `o1_paid_cancellation_refund_runtime`.
None of these files reference the candidate lane, the repository, or any symbol changed
here (verified by grep). They belong to another in-flight WorkUnit and were deliberately
NOT modified.

## Cleanup

Temporary `app/node_modules` symlink in the mission worktree removed. Canonical target
(`COSMILE_MOBILE_STOREFRONT_DEVICE_PREVIEW_V1/app/node_modules`) verified intact: real
directory, 333 entries before and after. No cache or process residue from this mission.

## Bounds honoured

Five-path ceiling held (no sixth path). No external behaviour change, no schema/DB/
migration, no provider or economic action, no weakened denial, no secret/PII in evidence.
STOP taken before any runtime/DB/provider/browser step.
