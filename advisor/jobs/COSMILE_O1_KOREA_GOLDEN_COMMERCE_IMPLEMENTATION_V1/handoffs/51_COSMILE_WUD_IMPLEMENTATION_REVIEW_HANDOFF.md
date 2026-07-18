# Independent Reviewer Handoff — Cosmile WU-D Implementation

```text
MISSION_ID: COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1
REVIEW_SUBJECT: WU-D catalog/single-KRW-price/Foundation-snapshot-consumption candidate
REVIEW_PASS: IMPLEMENTATION_REVIEW
ACTOR: foundation-reviewer-fable5
ROLE: Independent Foundation Reviewer
REQUIRED_MODEL: Fable 5
REQUIRED_EFFORT: max
REQUIRED_SKILL: /fable-sentinel
RETURN_TO: foundation-advisor
```

## Exact pins and independence

```text
PRODUCT_REPOSITORY: /home/leo/Project/.worktrees/Cosmile/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1
PRODUCT_BRANCH: implementation/cosmile-o1-korea-golden-commerce-v1-20260717
OLD_REVIEWED_BASE_HEAD: 3ea1b211b6111678add9f0e2814c289ed96adca4
CANDIDATE_HEAD: 21012d0e06a04f82377659b897fd07fa39683133
CANDIDATE_EXPECTED_PARENT: 3ea1b211b6111678add9f0e2814c289ed96adca4
CANDIDATE_PUSH_STATUS: NOT_PUSHED
EXPECTED_UPSTREAM_HEAD: 3ea1b211b6111678add9f0e2814c289ed96adca4
EXPECTED_AHEAD_BEHIND: 1_0
EXPECTED_WORKTREE_STATE: CLEAN

FOUNDATION_SNAPSHOT_REPOSITORY: /home/leo/Project/.worktrees/FOUNDATION/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1
FOUNDATION_SNAPSHOT_REVIEWED_HEAD: 73ff00361d9fa88ab57c17858210c1e080dfde1a
FOUNDATION_SNAPSHOT_EXPECTED_STATE: CLEAN_UNCHANGED_READ_ONLY

FOUNDATION_DOCS_REPOSITORY: /home/leo/Project/.worktrees/foundation-docs/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1
FOUNDATION_DOCS_HANDOFF_COMMIT: <this handoff commit>
WORKER_EVIDENCE_COMMIT: 66f0f68ec76d69a60720ee51ddc7067e92ee532b
WORKER_RESULT: runs/shared/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1/50_COSMILE_WUD_CATALOG_SNAPSHOT_RESULT.md
WORKER_POINTER: runs/shared/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1/50_COSMILE_WUD_CATALOG_SNAPSHOT_POINTER.md
IMPLEMENTATION_HANDOFF_COMMIT: d589a53c6b150ffc60ee03b92823e2ff52392f35
REVIEWED_DESIGN_COMMIT: a1ac8016eba01d1ffef20836fe7f16ace3b591c5
INDEPENDENT_DESIGN_REVIEW_COMMIT: daacd8a69318315437cc33e124455baf6db93e91
```

Before review, live-verify session/model/effort/skill/CWD/independence, pane synchronization OFF,
no overlapping review, all Git pins, clean product state, and exact unpushed ancestry. Read the
current Agent Office Reviewer role and repository rules. Treat the Worker report as claims, not
proof. Do not patch, stage, commit, push, dispatch, select policy, or accept risk.

## Exact candidate path boundary

The base-to-candidate diff must contain exactly:

- `app/src/lib/foundation/snapshotContract.ts` (new)
- `app/src/lib/foundation/snapshotBundle.ts` (new)
- `app/src/lib/foundation/snapshotRepository.ts` (new)
- `app/src/lib/foundation/snapshotCatalog.ts` (new)
- `app/src/lib/sku.ts` (narrow modification)
- `app/scripts/o1_foundation_snapshot_contract.vitest.ts` (new)
- `app/scripts/o1_foundation_snapshot_bundle.vitest.ts` (new)
- `app/scripts/o1_catalog_price_authority.vitest.ts` (new)
- `app/scripts/o1_foundation_snapshot_import.dbtest.py` (new)

No other source, test, schema, migration, generated client, dependency, route, page, component,
cart, checkout, order, payment, inventory, Foundation, SIASIU, or control path may change.

## Required direct determinations

### A. Foundation contract and cross-language byte compatibility

Verify directly against Foundation head `73ff0036...`, not only against copied constants:

- exact layout/meta/manifest/snapshot/notice/entry key sets and constants;
- canonical JSON byte parity across key ordering by Unicode code point, UTF-8, minimal separators,
  non-ASCII literal, safe integer/type limits, empty/unknown/non-string-key rejection, and hash;
- exact seven-field pin and immutable identity semantics;
- recursive exclusion of all Foundation-forbidden commercial fields;
- exact approval/gate/locale/actor/timestamp/product/variant validation;
- manifest sequence, unexpected file/directory/symlink, filename/hash/path, entry/document,
  notice category, and supersedes-resolvability validation;
- Python-produced fixture is genuinely produced by the reviewed Foundation implementation and
  test cleanup is complete; no test can accidentally pass against only the TS implementation.

### B. Verified-bundle-to-durable-import chain — load-bearing

Determine whether every durable import/state change is causally bound to one successfully verified,
complete bundle and its strict manifest sequence. Attack at least:

- can `snapshotImporter.importInitial` accept a standalone individually valid document without
  `verifyBundle`, manifest entry, sequence, approval scope, expected-file, or notice verification;
- can `importCorrection`, `withdraw`, or `bindSku` be called without the exact verified correction,
  supersession, withdrawal, gate-change, or binding evidence;
- can sequence gaps, replay, out-of-order notices, or silent replacements reach DB state despite
  the pure `verifyBundle` function existing separately;
- is duplicate replay zero-effect, and is import progress durable/restart-safe or merely simulated;
- are full-bundle verification and subsequent file reads protected from path substitution/TOCTOU,
  non-canonical raw bytes, and a file tree that changed after verification;
- is the claim "snapshotBundle is the only filesystem-touching module" factually true.

If the verifier and importer are parallel unconnected utilities, do not credit an end-to-end
consumption contract merely because each has isolated tests.

### C. Persistence, lineage, and binding integrity

Verify runtime code and DB rehearsal semantics match exactly rather than only approximately:

- content-SHA idempotency and immutable identity use the same field set/types in TS, SQL mirror,
  WU-0 schema, and Foundation contract (including integer `formula_version` versus DB string);
- correction requires the exact current same-product head; no branching, old/non-current
  supersedes, silent replacement, or two current heads;
- atomic concurrency cannot produce multiple current snapshots or divergent bindings;
- withdrawal/gate state is notice-authorized, atomic, affected-product-only, forward-only, and
  never inferred from producer outage;
- `bindSku` validates bounded identifiers, referenced snapshot existence, current approval/status,
  product equality, optional variant equality, and conflicting snapshot rebinding;
- `snapshotId` on `SkuBinding` is actually enforced/used rather than ignored in favor of an
  unrelated latest row;
- historical rows remain resolvable and immutable; rollback/errors create zero partial state;
- repository error outputs contain no SQL, values, hashes, IDs, PII, or secrets;
- DB test exercises the production repository semantics or clearly identifies twin-encoding risk;
  a PL/pgSQL mirror alone must not be overstated as runtime verification.

### D. Filesystem/path safety and catalog projection

Attack all filesystem values originating from DB/caller input:

- product ID, SHA, bundle root, SKU/binding IDs, variant, and notice inputs are validated and
  bounded before filesystem or repository use;
- no traversal, symlink escape, absolute path, malformed Unicode, oversized identifier, or
  unverified DB row can cause a read outside the verified bundle root;
- catalog reads the exact effective verified/bound snapshot and checks raw canonical bytes/hash;
- variant descriptors/binding do not make every non-null variant permanently conflicting, nor allow
  a mismatched variant to pass;
- stale, withdrawn, superseded, corrected, missing, unknown, unapproved, failed gate, repository
  error, and producer outage behaviors match the reviewed contract and fail closed where required.

### E. Single authoritative KRW price

Verify with behavior, not source substring assertions alone:

- active matching offer > requested active matching SKU > active default matching SKU;
- returned price `skuId` and any offer are bound to the requested/catalog-bound SKU as designed;
- inactive/hidden/sold-out or wrong-product/wrong-SKU price records cannot become sellable;
- integer bounds, currency KRW, caller-price mismatch/reconfirmation, repository failures, and
  missing price fail closed;
- no mock/Foundation/snapshot/client price can enter the target decision;
- removing the fallback does not silently create an unsupported READY claim for unchanged legacy
  public/mock surfaces.

### F. Tests, safety, and containment

Reproduce, if safe and preflight-proven:

- the three focused Vitest files;
- full safe Vitest suite;
- disposable PostgreSQL import rehearsal;
- WU-0 migration regression.

Inspect commands before execution. No install, image pull, external network, real/shared DB,
provider, credential, customer data, PII, payment, endpoint, or activation. Record pre/post Git state,
container/process identity, socket/port containment, cleanup, and exact counts. Verify that the test
oracle corrected before commit was not weakened. Typecheck/build may remain honestly unrun if the
generated-client boundary makes it unsafe; assess whether that leaves a blocking runtime compile
unknown.

## Verdict contract

Current Agent Office role verdicts:

```text
PASS
PASS_WITH_RISK
NEEDS_PATCH
FAIL
```

Mission-facing deterministic mapping:

```text
PASS -> PASS
NEEDS_PATCH -> PASS_WITH_CORRECTIONS
PASS_WITH_RISK -> HOLD
FAIL -> FAIL
```

Do not return PASS if a load-bearing verify/import/binding/price invariant is unconnected,
unexercised, or contradicted by code. For every finding provide stable ID, severity, exact file/line,
reproduction or proof, impact, and the smallest in-scope correction boundary. Separate observations
from blocking findings and state whether the current candidate may be pushed.

Write only:

- `runs/shared/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1/51_COSMILE_WUD_IMPLEMENTATION_REVIEW.md`
- `runs/shared/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1/51_COSMILE_WUD_IMPLEMENTATION_REVIEW_POINTER.md`

Return to `foundation-advisor` and STOP. Do not dispatch the Worker or any next WorkUnit.
