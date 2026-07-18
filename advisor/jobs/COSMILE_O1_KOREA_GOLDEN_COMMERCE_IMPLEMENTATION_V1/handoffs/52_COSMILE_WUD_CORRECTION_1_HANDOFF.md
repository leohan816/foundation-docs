# Cosmile Worker Handoff — WU-D Correction Cycle 1 (WUD-F1…F7)

```text
MISSION_ID: COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1
WORKUNIT: WU-D-CORRECTION-1
ACTOR: cosmile
ROLE: Cosmile repository-owner Worker
REQUIRED_MODEL: Opus 4.8 (1M)
REQUIRED_EFFORT: max
REQUIRED_SKILL: /fable-builder
RETURN_TO: foundation-advisor
```

## Exact starting state and review authority

```text
REPOSITORY: /home/leo/Project/.worktrees/Cosmile/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1
BRANCH: implementation/cosmile-o1-korea-golden-commerce-v1-20260717
OLD_REVIEWED_BASE_HEAD: 3ea1b211b6111678add9f0e2814c289ed96adca4
EXPECTED_HEAD: 21012d0e06a04f82377659b897fd07fa39683133
EXPECTED_PARENT: 3ea1b211b6111678add9f0e2814c289ed96adca4
EXPECTED_UPSTREAM_HEAD: 3ea1b211b6111678add9f0e2814c289ed96adca4
EXPECTED_AHEAD_BEHIND: 1_0
EXPECTED_WORKTREE_STATE: CLEAN
EXPECTED_CANDIDATE_PUSH_STATUS: NOT_PUSHED

FOUNDATION_SNAPSHOT_REPOSITORY: /home/leo/Project/.worktrees/FOUNDATION/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1
FOUNDATION_SNAPSHOT_REVIEWED_HEAD: 73ff00361d9fa88ab57c17858210c1e080dfde1a
FOUNDATION_SNAPSHOT_EXPECTED_STATE: CLEAN_UNCHANGED_READ_ONLY

REVIEW_ARTIFACT_COMMIT: c2a38a0a8f9c20beb620c89b2f3fb0ccc4b3778d
REVIEW_RESULT: runs/shared/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1/51_COSMILE_WUD_IMPLEMENTATION_REVIEW.md
REVIEW_POINTER: runs/shared/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1/51_COSMILE_WUD_IMPLEMENTATION_REVIEW_POINTER.md
ROLE_VERDICT: NEEDS_PATCH
MISSION_REVIEW_VERDICT: PASS_WITH_CORRECTIONS
REQUIRED_FINDINGS: WUD-F1 WUD-F2 WUD-F3 WUD-F4 WUD-F5 WUD-F6 WUD-F7
CORRECTION_CYCLE: 1
```

Before editing, live-verify the same Worker/session/model/effort/skill/workspace and every Git pin. Read the
committed 51_ review at `c2a38a0a8f9c20beb620c89b2f3fb0ccc4b3778d`, the original 50_ handoff and result,
the reviewed Foundation producer at `73ff0036...`, current Agent Office rules, and Cosmile repository rules.
Stop on mismatch, drift, any unlisted-path requirement, policy selection, or scope expansion. Preserve reviewed
history: no amend, rebase, squash, force-push, or rewrite.

## Authorized correction only

Close exactly the seven Reviewer findings below. Preserve the reviewed contract and default-fail-closed
behavior. Do not add schema, migration, route, endpoint, transport, provider, process, dependency, configuration,
feature, or policy.

### WUD-F1 — verified bundle to durable import chain (MEDIUM)

- Add one composed import entry point that succeeds only from a complete successfully verified bundle.
- Keep all filesystem reads inside `snapshotBundle.ts`. Return an immutable in-memory verified import plan or an
  equivalent verified representation so the importer does not re-read mutable paths after verification.
- Bind each durable initial/correction/withdrawal/gate transition to the exact verified manifest sequence,
  snapshot entry, and applicable notice. Raw standalone document or out-of-band lifecycle operations must not be
  publicly callable as accepted import operations.
- Derive restart/replay progress durably from imported immutable snapshot/lineage state already available in WU-0;
  no new column or table is allowed. Strict sequence, duplicate zero-effect, gap/out-of-order fail-closed, and
  restart replay must be proven.
- Do not make `bindSku` a Foundation-manifest operation. Instead, make it accept only a snapshot already admitted
  by this verified import lane and close the binding integrity requirements in WUD-F3/F4.
- Add positive and adjacent-negative tests for composed verified import, standalone/out-of-band refusal,
  sequence/gap/order, replay, correction, withdrawal, and zero partial state.

### WUD-F2 — single current head and concurrency (MEDIUM)

- Serialize snapshot lifecycle changes per Foundation product inside the import transaction without schema change.
- A correction must supersede the exact current same-product head. Superseding a missing, non-current, or
  different-product head must return a closed existing category and write nothing.
- An initial import must fail closed when a current head for that product already exists; it must not silently
  create a second current head.
- Prove two concurrent initials/corrections cannot produce multiple current heads. Preserve immutable history and
  exact content-SHA idempotency.
- Mirror the corrected semantics in the disposable PostgreSQL rehearsal, explicitly including second-initial,
  non-current supersedes, and bounded concurrency cases.

### WUD-F3 — binding integrity and load-bearing snapshot ID (MEDIUM)

- Validate and bound every caller/DB identifier used by `bindSku` and catalog reads before repository or
  filesystem use, using one deterministic code-point boundary consistent with the existing bounded O1 input
  convention. Do not normalize, rewrite, truncate, or hash identifiers.
- Before binding, verify the referenced snapshot exists, is current-approved, belongs to the same
  `foundationProductId`, and satisfies the variant rule in WUD-F4. Verify the referenced Commerce SKU exists
  and agrees with the binding's product/variant rather than relying only on the foreign-key failure path.
- Make `SkuBinding.snapshotId` load-bearing: catalog resolution must use the bound snapshot row, not an unrelated
  latest-by-product query. Exact replay of the same product/variant/snapshot may be idempotent; conflicting
  rebinding must fail closed.
- Add positive and adjacent-negative tests for missing/superseded/withdrawn/wrong-product/wrong-currency snapshot,
  conflicting snapshot rebind, oversized/malformed identifiers, and exact bound-snapshot resolution.

### WUD-F4 — usable non-null variant binding (MEDIUM)

- Resolve a non-null Foundation variant only when that exact key exists in the consumed snapshot's
  `content.variant_descriptors`; preserve product-level `null` binding behavior.
- A present matching non-null variant must be usable. An absent or mismatched variant must fail closed as
  `binding_conflict`.
- Add a positive non-null boundary-variant test for the pad-80 lane and adjacent mismatch/absence negatives.

### WUD-F5 — read-time path validation (LOW)

- Revalidate DB-sourced Foundation product ID and content SHA immediately before any filesystem path construction.
- Reject malformed, absolute, traversal, oversized, or otherwise invalid values to no-effective-snapshot without
  exposing raw values.
- Keep canonical-byte/hash verification load-bearing for the exact bound snapshot read.

### WUD-F6 — active default price and SKU binding (LOW)

- The default branch of `resolveUnitPrice` must return only an active, non-hidden matching default/fallback SKU.
- Add behavioral positive and adjacent-negative proof for inactive/hidden defaults using an isolated fake/injected
  Prisma boundary or another offline approach that does not weaken production behavior.
- Preserve the reviewed KRW authority and existing price precedence. Do not broaden this correction into offer or
  pricing-policy redesign; record the Reviewer's product-scoped-offer observation as non-blocking and deferred.

### WUD-F7 — Unicode code-point ordering oracle (LOW)

- Add the claimed cross-language parity fixture containing keys whose order differs between Unicode code-point
  order and JavaScript UTF-16 order (at minimum U+F000 and U+10000).
- Assert exact canonical bytes and SHA parity against the pinned Python producer so a regression to JavaScript
  default key sorting is caught.

## Exact allowed product paths

Only these nine already-reviewed WU-D paths may change:

- `app/src/lib/foundation/snapshotContract.ts`
- `app/src/lib/foundation/snapshotBundle.ts`
- `app/src/lib/foundation/snapshotRepository.ts`
- `app/src/lib/foundation/snapshotCatalog.ts`
- `app/src/lib/sku.ts`
- `app/scripts/o1_foundation_snapshot_contract.vitest.ts`
- `app/scripts/o1_foundation_snapshot_bundle.vitest.ts`
- `app/scripts/o1_catalog_price_authority.vitest.ts`
- `app/scripts/o1_foundation_snapshot_import.dbtest.py`

No schema, migration, Prisma model, generated client, package, lockfile, route, page, component, cart, checkout,
order, payment, inventory, Google identity, Foundation, SIASIU, control, or documentation path may change.

## Required verification

Run and record, using already-present dependencies and the same proven-safe temporary symlink pattern:

- all three focused WU-D Vitest files, including new WUD-F1…F7 cases;
- the full safe Vitest suite;
- disposable PostgreSQL WU-D import rehearsal with corrected parity/concurrency scenarios;
- WU-0 migration regression;
- direct cross-language fixture generation against Foundation head `73ff0036...`;
- pre/post Git status, exact nine-path boundary, and old-head-to-new-head diff;
- PostgreSQL process/socket identity, synthetic-only confirmation, shutdown, data removal, and cleanup;
- proof the Foundation worktree remained clean and unchanged;
- proof of no route/runtime/transport/network/provider/credential/PII/payment/live activation.

Inspect every command and relevant environment before execution. No install, image pull, external network, real or
shared DB, secret, customer data, vendor call, payment, runtime activation, or Prisma generation. Typecheck/build
may remain honestly unrun only if the unchanged generated-client boundary still makes them unsafe; state the exact
residual compile limitation without claiming runtime verification.

## Commit, evidence, and stop

Create one additive correction commit on top of `21012d0e06a04f82377659b897fd07fa39683133`.
Do not push before same-Reviewer delta PASS. Do not begin WU-B/E/F/G.

Write only:

- `runs/shared/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1/52_COSMILE_WUD_CORRECTION_1_RESULT.md`
- `runs/shared/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1/52_COSMILE_WUD_CORRECTION_1_POINTER.md`

The result must map WUD-F1…F7 to exact code/tests, record old and new heads, exact diff, all commands/counts,
cleanup, preserved evidence, remaining observations, and zero unrelated change. Return to `foundation-advisor`
and STOP. Do not dispatch the Reviewer or start another WorkUnit.
