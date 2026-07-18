# COSMILE WU-D Correction Cycle 1 — Result (WUD-F1…F7)

```text
MISSION_ID: COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1
WORKUNIT: WU-D-CORRECTION-1
ACTOR: cosmile (Cosmile repository-owner Worker)
MODEL/EFFORT: Opus 4.8 (1M) / max
SKILL: /fable-builder
HANDOFF: advisor/jobs/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1/handoffs/52_COSMILE_WUD_CORRECTION_1_HANDOFF.md @ foundation-docs 513f7e2
REVIEW: runs/shared/.../51_COSMILE_WUD_IMPLEMENTATION_REVIEW.md @ c2a38a0a (ROLE_VERDICT NEEDS_PATCH)
STATUS: COMPLETE — all seven findings closed; additive local candidate committed; NOT pushed
RETURN_TO: foundation-advisor
```

## 1. Heads / lineage (additive; no amend/rebase/squash/force)

```text
OLD_REVIEWED_CANDIDATE (parent):  21012d0e06a04f82377659b897fd07fa39683133   (WU-D, reviewed by 51_)
NEW_CORRECTION_CANDIDATE (HEAD):  2733bfd61e407389c3336eba2e655ad081d4cdb5
COMMIT_PARENT of NEW:             21012d0e06a04f82377659b897fd07fa39683133   (verified == OLD)
UPSTREAM_BASE:                    3ea1b211b6111678add9f0e2814c289ed96adca4
BRANCH:                           implementation/cosmile-o1-korea-golden-commerce-v1-20260717
UPSTREAM ahead/behind:            2 / 0   (21012d0 WU-D + 2733bfd correction; BOTH unpushed)
PUSH_STATUS:                      NOT_PUSHED (withheld pending same-Reviewer delta PASS)
FOUNDATION_SNAPSHOT_REPO HEAD:    73ff00361d9fa88ab57c17858210c1e080dfde1a  (clean, read-only, UNCHANGED)
```

Preamble live-verification (all matched the handoff before editing): same Cosmile worktree/branch, HEAD==21012d0
clean 1-ahead/0-behind, foundation-docs pin 513f7e2 with the committed 52_ handoff byte-identical to the working
tree, review 51_ @ c2a38a0a, Foundation producer @ 73ff0036 clean.

## 2. Exact diff scope (nine reviewed WU-D paths ONLY; numstat 21012d0→2733bfd)

```text
 37   4  app/scripts/o1_catalog_price_authority.vitest.ts
 77   1  app/scripts/o1_foundation_snapshot_bundle.vitest.ts
 47   1  app/scripts/o1_foundation_snapshot_contract.vitest.ts
161  36  app/scripts/o1_foundation_snapshot_import.dbtest.py
101   4  app/src/lib/foundation/snapshotBundle.ts
  3   3  app/src/lib/foundation/snapshotCatalog.ts
 19   0  app/src/lib/foundation/snapshotContract.ts
213  79  app/src/lib/foundation/snapshotRepository.ts
  7   2  app/src/lib/sku.ts
 9 files changed, 665 insertions(+), 130 deletions(-)
```

No schema / migration / Prisma model / generated client / package / lockfile / route / page / component / cart /
checkout / order / payment / inventory / Google / Foundation / SIASIU / control / documentation path changed.
No new dependency, endpoint, transport, provider, process, configuration, feature, or policy. Foundation worktree
byte-unchanged. No secrets/PII; verification evidence is boolean/count/status/category only.

## 3. Finding → code/tests map

### WUD-F1 — verified-bundle → durable-import chain (MEDIUM) — CLOSED
- `snapshotRepository.ts`: `importFromBundle(root)` now takes a filesystem ROOT and builds the verified plan
  **internally** via `buildImportPlan` (all fs reads live in `snapshotBundle.ts`) — a caller cannot inject a forged
  plan or out-of-band docs/notices. Raw per-doc/withdraw/gate operations are module-internal (`importDocTx`,
  `withdrawProductTx`, `gateContainProductTx`) and no longer publicly callable. Each manifest transition is bound to
  its verified shape: initial (≥1 entries, 0 notices) · correction (1 entry + 1 CORRECTION/SUPERSESSION notice, same
  product) · withdrawal / gate_change (0 entries + 1 notice); any other shape → `manifest_structure`, zero write.
  Every op is idempotent, so restart/replay is zero-effect and durable progress IS the imported immutable sha rows.
- `snapshotBundle.ts`: `buildImportPlan` returns a **deep-frozen** plan (plan + manifests + entries/notices arrays +
  each entry/notice + each verified doc tree) — the claimed immutability now holds for every reachable value.
- Tests: `o1_foundation_snapshot_bundle.vitest.ts` (buildImportPlan mirrors the four producer manifests +
  deep-immutability assertions; gap-broken → ok:false/no manifests); `o1_foundation_snapshot_import.dbtest.py`
  (strict-order apply, idempotent replay, gate/withdrawal transitions from notices, zero partial state).

### WUD-F2 — single lineage head + concurrency (MEDIUM) — CLOSED (+ Advisor lineage refinements)
- `snapshotRepository.ts` `importDocTx`: per-product `pg_advisory_xact_lock(hashtext(fpid)::bigint)`. The **current
  lineage head is STRUCTURAL** — the same-product row that no later row supersedes — independent of sellability
  status, so a gate-contained (stale) head stays correctable in place with **no rebind** (Advisor rule). A correction
  proceeds only when the product has **exactly one** structural head **and it is the declared supersedes SHA**; zero
  heads, a **split head** (>1 tip), a non-current/branched target, or a wrong-product target → `supersedes_not_current`,
  zero write. An initial fails closed (`current_head_exists`) when any lineage row already exists.
- `dbtest` mirror `import_snapshot`: identical advisory lock + exactly-one-structural-head + declared-SHA + second-
  initial rules. New scenarios: second-initial rejected · non-current supersedes rejected · **split-head** (two tips)
  rejected · **two concurrent initials → exactly one imported / one current head** · gate-contained head corrected
  in place.

### WUD-F3 — binding integrity + load-bearing snapshotId (MEDIUM) — CLOSED
- `snapshotRepository.ts` `bindSku`: bounded/validated identifiers on all inputs; verifies the referenced snapshot
  exists, is `current_approved`, matches `foundationProductId`, matches the passed admitted doc's SHA, and resolves
  the variant (WUD-F4). The Commerce SKU must exist **and** its `productId`/`variantId` must agree with the requested
  binding (not merely the FK path) → `sku_mismatch`. Injective on `cosmileSkuId`; exact same product/variant/snapshot
  replay is idempotent; conflicting rebind → `binding_conflict`.
- `SkuBinding.snapshotId` is **load-bearing**: `makeCatalogStore.effectiveBindingFor` resolves the bound snapshot row
  by `snapshotId` (not latest-by-product) and re-validates the DB binding's product/variant/snapshot fields.
- Tests: `o1_catalog_price_authority.vitest.ts` (decideCatalog load-bearing/variant/lifecycle matrix);
  `dbtest` (bind product/variant agreement, snapshot admission negatives, conflicting rebind, and `effective_snapshot`
  proving the bound superseded snapshot is returned — NOT the newer current one).

### WUD-F4 — usable non-null variant (MEDIUM) — CLOSED
- `snapshotContract.ts` `variantResolvableInSnapshot(doc, key)`: null ⇒ resolvable; non-null ⇒ present in
  `content.variant_descriptors[].variant_id`. `snapshotCatalog.ts` `EffectiveBinding.effective.variantResolvable`
  replaces the dead `snapshotVariantKey`; `decideCatalog` returns `binding_conflict` when a non-null variant is not
  resolvable. Store + `bindSku` compute it from the verified doc.
- Fixtures use the **exact frozen pad-80 boundary**: product `elt-pad-vitayouth-01`, variant `elt-pad-vitayouth-01-80`
  (contract `variantResolvableInSnapshot` test; catalog WUD-F4 positive/negative; dbtest `csku_v`/`PPAD` bind).

### WUD-F5 — read-time path validation (LOW) — CLOSED
- The bound-snapshot filesystem read now lives ONLY in `snapshotBundle.loadVerifiedSnapshot(root, pid, sha)`; the
  repository imports no `node:fs`/`node:path`. The loader re-validates `validateProductId(pid)` + `isHex64(sha)`
  **before** path construction (traversal/absolute/oversized/malformed → null), requires
  `doc.foundation_product_id === pid`, and keeps embedded-SHA + **raw canonical-byte equality** load-bearing.
- Tests: bundle vitest (valid load; wrong-product-for-sha; traversal-shaped pid/sha; absent sha; byte-tamper fails
  raw canonical equality; **valid doc copied under the wrong product dir** → null).

### WUD-F6 — active default price + SKU (LOW) — CLOSED
- `sku.ts` `isSellableDefaultSku(sku)` = `status==="active" && salesStatus!=="hidden"` (mirrors `getSkusForProduct`'s
  filter); the `resolveUnitPrice` default branch returns a price only when it passes. `getDefaultSku`'s other callers
  unchanged; KRW authority + offer>SKU>default order preserved.
- Tests: catalog vitest behavioral cases via an **injected/mocked Prisma boundary** (`vi.mock` hoisted above the
  `@/lib/sku` import — production behavior unchanged): active→true, hidden→false, inactive→false, null/undefined→false.

### WUD-F7 — Unicode code-point ordering oracle (LOW) — CLOSED
- `o1_foundation_snapshot_contract.vitest.ts`: the parity fixture now contains BOTH `U+F000` (BMP) and `U+10000`
  (astral) as keys, and a dedicated test asserts the canonical bytes place `U+F000` before `U+10000` AND are
  byte+SHA identical to the pinned Python producer — a regression to JS UTF-16 `.sort()` (which orders `U+10000`
  first) now diverges and fails.

## 4. Verification (commands / counts; already-present deps + proven-safe symlink)

```text
LINK:  ln -s /home/leo/Project/Cosmile/app/node_modules app/node_modules   (gitignored; removed after → ABSENT)
RUN1:  npx vitest run <contract> <bundle> <catalog>   → 3 files, 54 passed / 0 failed   (was 42; +12)
RUN2:  npx vitest run                                 → 15 files, 333 passed / 0 failed  (was 321; +12; no regression)
RUN3:  python3 scripts/o1_foundation_snapshot_import.dbtest.py → 44 passed / 0 failed · exit 0
         · disposable postgres:16-alpine, tmpfs, no host port, docker exec only, synthetic creds
         · cleanup: container removed=True, post-cleanup absent=True, data-dir=tmpfs(vanished), host-port=none
RUN4:  python3 scripts/o1_golden_commerce_migration.dbtest.py → 54 passed / 0 failed · exit 0 · cleanup verified
XLANG: contract + bundle vitests spawn the reviewed Python producer (PYTHONPATH=<FOUNDATION @73ff0036>) to generate
         canonical/bundle fixtures; TS byte-accepts and re-hashes identically. Foundation HEAD 73ff0036 porcelain [].
BUILD/TSC: honestly NOT_RUN — the generated Prisma client predates WU-0 and `prisma generate` is forbidden this cycle;
         snapshotRepository.ts runtime/compile remains a declared deploy-time unknown (unchanged blocker from 50_/51_).
```

Key dbtest lines proven: `split head (two structural tips) → supersedes_not_current`; `gate-contained head is still
the structural tip → correction supersedes it IN PLACE (imported)`; `two concurrent initials → exactly one imported,
one current_head_exists` / `exactly one current head for P3`; `bind csku_v (PPAD, -01-80) → bound` and NULL-variant
request → `sku_mismatch`; `effective(csku_conf) = bound p2s1 status 'superseded' (NOT latest p2s2)`.

## 5. Containment / safety

Boundary: exactly the nine WU-D paths (numstat §2). No route/page/component/runtime/network/provider/credential/
payment/live activation touched or added; the WU-D lane remains library-only and unwired (default-deny). No
`console.*`/`process.env`/`fetch`/secret/key patterns introduced in `src`. `.next` absent. `app/node_modules` was a
gitignored symlink, removed after tests (ABSENT). Foundation worktree read-only, clean, unchanged at 73ff0036. No
push, no Reviewer dispatch, no next WorkUnit started.

## 6. Remaining observations (non-blocking; preserved from 51_ + one new)

- **O-1** product-scoped offers may price a different SKU than requested (pre-existing design; outcome exposes the
  actual skuId) — deferred, untouched.
- **O-2** integers > 2^53 untested; failure direction is safe (canonical hash mismatch ⇒ reject).
- **O-3** TS is stricter than Python on manifest-file symlinks (safe).
- **O-4** dbtest fixture SQL uses %-formatted script-internal constants (test-only; no runtime path).
- **O-5** the store performs no filesystem read anymore — the "only fs-touching module is snapshotBundle.ts"
  statement is now literally true (the 51_ intra-report inconsistency is resolved by WUD-F5's relocation).
- **O-6** `resolveUnitPrice` DB behavior remains structurally-proven + isSellableDefaultSku-behavioral; full runtime
  proof stays in the declared build/tsc-unrun set.
- **O-7 (new)** GATE_CHANGE is projected to `stale_last_approved` (fail-closed SELLABILITY, distinct from withdrawal),
  while the head stays the structural lineage tip so a producer correction re-enables it in place. Whether a plain
  gate re-pass (no new snapshot) should auto-re-enable is a deferred Leo-owned gate-status policy (WU-0 has no
  gate-re-pass column); current behavior is fail-closed-safe and producer-faithful (the producer signals gate change
  via notice, not status, delegating interpretation to the consumer).

## 7. Zero unrelated change

Every hunk maps to a listed finding or the Advisor's bounded pre-commit refinements (structural single-head +
declared-SHA with split-head test; true deep-immutability of the plan; loader's `doc.foundation_product_id == path
product` with the wrong-dir negative; `bindSku` CommerceSku product/variant agreement; catalog read-time
re-validation; exact pad-80 boundary fixture). No opportunistic edits, refactors, or reformatting outside these.
```text
ROLE_RESULT: NEEDS_PATCH → PATCH_APPLIED (all 7 findings closed in-scope)
RE_REVIEW: same Reviewer, delta-only 21012d0..2733bfd plus the findings' adjacent invariants
CANDIDATE_PUSH: WITHHELD
RETURN_TO: foundation-advisor
STOP
```
