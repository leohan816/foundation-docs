# 51 — Cosmile WU-D Independent Implementation Review (Catalog / single KRW price / Foundation snapshot consumption)

```text
MISSION_ID:   COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1
REVIEW_SUBJECT: WU-D catalog/single-KRW-price/Foundation-snapshot-consumption candidate
REVIEW_PASS:  IMPLEMENTATION_REVIEW (full; read-only)
ACTOR:        foundation-reviewer-fable5 (Independent Foundation Reviewer; same session as 31_/33_/35_/41_/43_)
MODEL:        claude-fable-5 (Fable 5) — live-verified from harness environment statement
EFFORT:       max — live-verified (CLAUDE_EFFORT=max in session environment)
SKILL:        /fable-sentinel (active this session)
SESSION:      tmux foundation-reviewer-fable5 · pane %51 · synchronize-panes OFF · CWD = pinned Cosmile worktree
OVERLAP:      none — 0 pre-existing 51_* artifacts
HANDOFF:      advisor/jobs/.../handoffs/51_COSMILE_WUD_IMPLEMENTATION_REVIEW_HANDOFF.md
              @ foundation-docs commit d6464f410f8f70d0c59fa4b3c295d582eddbf25b (read via git show at pin)
BINDING:      CANDIDATE_HEAD 21012d0e06a04f82377659b897fd07fa39683133 — this verdict binds to exactly this commit
ROLE_VERDICT: NEEDS_PATCH
MISSION_REVIEW_VERDICT: PASS_WITH_CORRECTIONS   (deterministic mapping per the committed handoff)
CANDIDATE_PUSH: MUST NOT BE PUSHED until corrections + delta re-review
RETURN_TO:    foundation-advisor
```

## 0. Pin verification (all first-hand)

| Pin | Required | Observed | Result |
|---|---|---|---|
| Handoff commit | `d6464f41` | commit exists; handoff read at pin; foundation-docs worktree HEAD = `d6464f41`, clean | ✅ |
| Base / parent | `3ea1b211` (WU-C PASS head) | `HEAD~1` = exact; **single child commit** ("feat(o1-wud): … library-only; no runtime activation") | ✅ |
| CANDIDATE_HEAD | `21012d0e` | `git rev-parse HEAD` = exact; worktree CLEAN (porcelain 0, pre and post) | ✅ |
| Upstream / push | head `3ea1b211` · 1_0 · NOT_PUSHED | `ls-remote` = `3ea1b211`; 0 behind / 1 ahead; candidate not pushed | ✅ |
| Foundation snapshot repo | `73ff0036`, CLEAN_UNCHANGED_READ_ONLY | HEAD exact; porcelain 0 **before and after** review (read-only preserved; only gitignored `__pycache__` exists) | ✅ |
| Worker evidence | commit `66f0f68e` → 50_RESULT+POINTER | commit adds exactly those two; result read at pin (claims) | ✅ |
| Implementation handoff | commit `d589a53c` | adds exactly the 50_ implementation handoff; read at pin | ✅ |
| Design pins | `a1ac8016` / `daacd8a6` PASS | consistent with 31_ (sha256-verified then) | ✅ |
| Diff boundary | exactly the 9 named paths | `git diff --name-status` = 8×A + `app/src/lib/sku.ts` M; **+1366/−4**; no schema/migration/dependency/route/page/component/cart/checkout/order/payment/inventory/Foundation/SIASIU path | ✅ |

## 1. Determinations

### A. Foundation contract and cross-language byte compatibility — SATISFIED (one evidence gap → WUD-F7)

Verified directly against `contract.py`/`file_bundle.py` at `73ff0036` (not only copied constants): every constant, key set, regex, and validator in `snapshotContract.ts` is semantically identical (schema/evidence/exporter constants; 7-field pin order; 5 approval statuses; 6 gates; 4 notice types; 5+5 notice categories; 10 content groups/2 required; 9 excluded keys; hex40/hex64/semver/timestamp(+real-date)/actor/upper-token/locale/id-segment rules; 13 snapshot keys; identical hash-over-body-without-hash). `snapshotBundle.ts` mirrors `file_bundle.py` verification exactly (meta/manifest/entry/notice key sets, seq 1..N gap check, filename↔seq, entry-pin validation, notice seq/category/supersedes-resolvability, snapshot file allow-list with **no-follow symlink rejection**, per-file `validateSnapshot` + embedded-sha + canonical-raw-byte equality, manifest-entry↔doc pin+approval equality, missing-snapshot check, top-level unexpected-file check); TS is strictly *stricter* in one spot (manifest-file symlink rejection — safe direction, O-3). Cross-language proof is genuine: the bundle fixture is **produced by executing the reviewed Python implementation** (`execFileSync python3` with `PYTHONPATH=<pinned FOUNDATION worktree>`; sanity-asserts "4 manifests 3 snapshots"), with Korean non-ASCII content, CORRECTION/WITHDRAWAL/GATE_CHANGE notices; TS must byte-accept it and fails closed on byte-tamper (meta/manifest/snapshot), gap, unexpected top-level/product-dir files, and missing root — so acceptance cannot pass against a TS-only encoding. Canonical parity runs 8 value sets through the real Python `canonical_bytes`/`content_sha256` and requires byte/hash identity; float/non-integer rejection is proven cross-language. **Gap (WUD-F7):** the fixture claimed to pin the code-point-vs-UTF-16 ordering divergence is absent — no key in any parity fixture lies in `[U+E000..U+FFFF]`, so every fixture sorts identically under both orders; the comment (`snapshotContract` test line 70) and the Worker's 50_ §3 matrix claim "U+F000 vs U+10000" coverage that the values do not provide. The implementation (`compareCodePoints`) is correct by inspection, but the parity oracle would not catch a regression to default UTF-16 sort. Unsafe (>2^53) integers are untested; the failure direction is safe (JSON.parse precision loss ⇒ canonical-byte/hash mismatch ⇒ rejection) — O-2.

### B. Verified-bundle-to-durable-import chain — NOT SATISFIED → WUD-F1

The handoff's own trigger applies: the verifier and the durable importer are **parallel unconnected utilities**. Direct answers to the required attacks:
- `snapshotImporter.importInitial(doc)` (`snapshotRepository.ts:74-75` → `importDoc:39-72`) accepts **any standalone document** that passes `validateSnapshot` + `approval_status` — with **no** `verifyBundle`, manifest-entry, sequence, expected-file, or notice verification. ✔ attack succeeds.
- `importCorrection(doc, supersedesSha)` takes a **caller-supplied** sha with no verified CORRECTION/SUPERSESSION notice; `withdraw(foundationProductId)` (`:77-84`) requires **no verified WITHDRAWAL notice**; `bindSku` requires no verified binding evidence. ✔ attack succeeds.
- Sequence gaps/replay/out-of-order: `simulateImport` is pure and takes `alreadyApplied` **from the caller**; no manifest seq is ever persisted — durable import progress **does not exist** ("merely simulated"); nothing in the repository enforces manifest order. Out-of-order corrections degrade fail-closed via `unresolvable_supersedes`, and duplicate replay is durably zero-effect via the sha-unique idempotency — genuine mitigations, but they do not constitute the required causal binding.
- TOCTOU/path substitution after verification: the catalog read path (`makeCatalogStore.effectiveBindingFor`, `:116-124`) independently re-validates the consumed document (`validateSnapshot` + embedded-sha equality) on **every read**, failing closed to no-effective-snapshot — good re-verification at consumption; but raw-byte canonical equality (`raw == canonicalBytes(doc)`) is *not* re-checked at this layer (bundle-verify checks it; the read layer checks parse+validate+sha — the embedded-sha recompute covers content integrity, so this is acceptable).
- "snapshotBundle is the only filesystem-touching module" is **false as stated**: `snapshotRepository.makeCatalogStore` also does `readFileSync` (`:118`). The Worker's own §2 table declares the store's fs read, so this is an intra-report inconsistency (recorded), not a hidden path.
**Consequence:** per the handoff ("do not credit an end-to-end consumption contract merely because each has isolated tests"), the WU-D consumption contract is not yet end-to-end. **Smallest in-scope correction:** one composed, tested entry point (e.g. `importFromBundle(root)` across `snapshotBundle.ts`/`snapshotRepository.ts`) that (1) requires `verifyBundle` ok; (2) walks manifests in strict sequence with progress derived durably (e.g. recomputed from imported sha rows — no schema change needed); (3) performs initial/correction/withdraw/gate transitions **only from verified manifest entries and notices**; (4) rejects any out-of-band call path for bundle-lifecycle operations or explicitly demotes the raw importer to an internal function; plus positive/adjacent-negative tests (standalone-doc import refused; out-of-order refused; replay zero-effect end-to-end).

### C. Persistence, lineage, binding integrity — PARTIALLY SATISFIED → WUD-F2, WUD-F3

Verified sound: idempotency by content sha with identity re-check (`importDoc:50-55`); same-identity/different-sha ⇒ `immutability_violation` zero-write (`:56-57`); `formula_version` int→string column conversion is consistent in TS (`pinCols:31`) and the dbtest mirror (`'1'`), with identity anchored on the sha (declared); historical rows are never rewritten (status-only projection; dbtest S4/S6); unresolvable supersedes ⇒ zero write (S5); rollback leaves no partial state; repository errors are closed kinds with no SQL/value leakage; `SkuBinding` injectivity + conflict + WU-0 `@unique` backstop proven (S7). Mirror parity `import_snapshot`/`bind_sku` ↔ TS: **faithful** (same order, same conditions) — importantly, **the defects below are shared by both encodings**, so the DB rehearsal proves the same (defective) algorithm rather than masking a divergence; twin-encoding risk itself is correctly declared.

- **[WUD-F2] Two current heads are constructible — MEDIUM.** (a) `importDoc` requires the supersedes target to *exist* for the product (`:60-62`) but **not to be `current_approved`**; the flip is conditional (`:66` `AND "status" = 'current_approved'`). Supersede an already-superseded row ⇒ new `current_approved` inserted, flip is a no-op ⇒ **two `current_approved` rows** for one product. The plpgsql mirror (dbtest `import_snapshot:65-72`) shares this exactly; no dbtest scenario exercises supersedes-of-non-current. (b) There is **no per-product serialization**: two concurrent `importInitial` calls with two different valid snapshots of one product interleave plain SELECTs ⇒ both insert `current_approved`. WU-0 has **no** one-current-per-product constraint (verified in migration SQL: only status CHECK, sha-format CHECK, unique sha) — no backstop exists. The catalog store then resolves the head by `ORDER BY "capturedAt" DESC LIMIT 1` (`snapshotRepository:113`) — a nondeterministic tiebreak the handoff explicitly disallows crediting. Violates "correction requires the exact current same-product head; no branching … or two current heads" and "atomic concurrency cannot produce multiple current snapshots." **Correction (in-scope, no schema change):** per-product serialization inside the import transaction (e.g. `pg_advisory_xact_lock` on a product-key hash, or `FOR UPDATE` on the current head row), supersedes target must be the **current** head (else a closed category), `importInitial` must fail closed when a current head already exists for the product (initial-vs-correction distinction made real), mirrored in the dbtest with new scenarios (supersedes-non-current rejected; second-initial rejected; a concurrency check).
- **[WUD-F3] `bindSku` under-validation and ignored `snapshotId` — MEDIUM.** `bindSku` (`snapshotRepository:85-100`) validates **only** injectivity on `cosmileSkuId`. Against the handoff bullet it does **not** validate: bounded identifiers (no length/format bound on any input — the WU-C 256-code-point pattern exists one directory away), referenced snapshot existence, snapshot current-approval/status, product equality between the binding and the referenced snapshot (or the `CommerceSku` row), or variant validity; and `SkuBinding.snapshotId` is **stored but never used** — `effectiveBindingFor` selects it (`:108`) and then resolves by product-latest (`:113`), exactly the "ignored in favor of an … latest row" pattern the handoff names. **Correction:** bounded-identifier validation on all `bindSku`/store inputs; on bind, verify the referenced snapshot exists, is `current_approved`, and matches `foundationProductId` (and variant per WUD-F4's model); either make `snapshotId` load-bearing (resolve the effective snapshot through the binding, with currency re-check) or stop persisting it — one consistent choice, tested both ways (positive + adjacent negatives), plus dbtest mirror parity.

### D. Filesystem/path safety and catalog projection — PARTIALLY SATISFIED → WUD-F4, WUD-F5

Verified sound: bundle verification rejects traversal-shaped names structurally (strict filename/dir allow-lists + regex + no-follow lstat on both dir and file levels; symlinked product dirs and files ⇒ `unexpected_file` — Python-parity plus the stricter TS manifest-symlink check); catalog reads re-validate the consumed doc and its embedded sha on every read and fail closed to no-effective-snapshot on any parse/validation error; `decideCatalog` (pure, 14 tests) is fail-closed across missing/withdrawn/superseded/corrected/stale-without-policy/missing_initial/unknown/unapproved/per-gate-failure/inactive-SKU/price categories with **`STALE_LAST_APPROVED` fail-closed** and producer-outage independence (pure over the local effective binding) — matching the reviewed contract.

- **[WUD-F4] Non-null variant bindings are permanently conflicting — MEDIUM.** The runtime store hardcodes `snapshotVariantKey: null` (`snapshotRepository:134` — "WU-0 snapshots are product-level"), while `decideCatalog:73` requires `binding.foundationVariantKey === eff.snapshotVariantKey`. Any SKU bound with a non-null variant therefore yields `binding_conflict` **forever** — precisely the defect the handoff names ("do not make every non-null variant permanently conflicting"), and it blocks the design's pad-80 variant-boundary lane. No test exercises a non-null variant (all catalog fixtures use null). **Correction:** resolve variants against the consumed snapshot's `content.variant_descriptors` (variant present ⇒ pass; absent/mismatched ⇒ conflict) in the store or the decision — one consistent model — with a positive non-null-variant test and a mismatch negative.
- **[WUD-F5] DB-sourced fs path inputs not re-validated at read time — LOW (defense-in-depth).** `effectiveBindingFor` joins `s.foundationProductId` and `s.snapshotContentSha256` from DB rows into a filesystem path (`:118`) without re-validating their format. All rows written *through this lane* are pre-validated (product-id grammar has no `/`/`.`; sha is hex64), so exploitation requires an out-of-lane DB write — but the handoff explicitly requires "product ID, SHA … validated and bounded before filesystem … use" including "unverified DB row" attacks. **Correction:** re-apply `validateProductId` + hex64 checks in the store before `join` (fail closed to no-effective-snapshot).

### E. Single authoritative KRW price — PARTIALLY SATISFIED → WUD-F6

Verified sound: the Foundation/mock fallback is removed exactly and narrowly (`sku.ts` −4: the `foundationProductClient`/`toCosmileView` tail; null ⇒ fail-closed); order active-offer > requested-SKU > default-SKU is preserved (structural assertion + unchanged branch code + 321/321 regression); offers are product-bound (`offer.productId === productId`) and time/status-windowed (`offerUsable`); the requested-SKU branch requires `status === "active"` and product match; `decideCatalog` enforces KRW-only, positive-safe-integer ≤ 100,000,000, `sku_inactive` before any price acceptance, `price_reconfirmation_required` on caller-price mismatch (never silent stale acceptance), and no snapshot/Foundation/caller value can supply the price (the authority port is `resolveUnitPrice` only). The removal does not manufacture a READY claim for legacy surfaces — the Worker's report and the FEATURE-scope statements keep legacy/mock outside the completion claim, and seeded demo products resolve via the default-SKU branch unchanged.

- **[WUD-F6] Default-SKU price branch lacks an active-status check — LOW-severity contract gap.** `getDefaultSku` (`sku.ts:12-17`) filters on nothing but `productId`/`isDefault`, and the default branch returns `def.basePrice` with no status check — an **inactive/hidden default SKU's price can be resolved**, contrary to the WU-D contract's "active matching/**default matching** SKU" and this handoff's "inactive/hidden/sold-out … cannot become sellable." In the catalog lane the requested-SKU `active` check masks the main path (reachability requires a binding/product inconsistency, which WUD-F3's validation also closes), but the price authority itself violates the stated rule. Note also the E-bullet caveat is real: `resolveUnitPrice` is proven **structurally, not behaviorally** (source-substring assertions; the handoff cautions against crediting these alone) — its DB behavior remains in the declared runtime-unproven set. **Correction:** require `status === "active"` (and the same hidden-exclusion used by `getSkusForProduct`, if intended) in the default branch of `resolveUnitPrice` (narrow, inside the authorized `sku.ts` boundary — do not change `getDefaultSku`'s other callers), with adjacent tests at whatever layer is testable offline (a fake-prisma or decision-level oracle), and an explicit note of what remains runtime-only.

### F. Tests, safety, containment — reproduced

```text
PRE:  product HEAD 21012d0e porcelain 0 · FOUNDATION HEAD 73ff0036 porcelain 0 · docker containers 1 · 0 console.* added in diff
LINK: ln -s /home/leo/Project/Cosmile/app/node_modules app/node_modules   (gitignored)
RUN1: vitest run <contract> <bundle> <catalog> → 3 files, 42 passed / 0 failed  (19 + 9 + 14)
RUN2: vitest run → 321 passed / 0 failed  (279 prior + 42; no regression; no existing oracle changed — all five prior-suite files byte-untouched)
RUN3: python3 scripts/o1_foundation_snapshot_import.dbtest.py → 21 passed / 0 failed · exit 0 · cleanup removed=True absent=True (tmpfs, no host port, local image, no env reads)
RUN4: python3 scripts/o1_golden_commerce_migration.dbtest.py → 54 passed / 0 failed · exit 0 · cleanup verified
POST: symlink removed (ABSENT) · no .next · product HEAD/porcelain unchanged · FOUNDATION HEAD/porcelain unchanged (read-only honored)
      · docker containers 1 (unchanged), 0 *ephemeral* leftovers · 0 o1wud_bundle_* tempdirs remaining (afterAll cleanup worked)
```

All Worker-claimed counts (42, 321, 21, 54) reproduce exactly. The corrected-before-commit test oracle (the `endsWith` → after-default structural assertion) was inspected: the replacement is stronger, no product behavior involved, no weakening. Typecheck/build remain honestly NOT_RUN (pre-WU-0 generated Prisma client + forbidden `prisma generate` — same verified blocker as prior gates); this leaves `snapshotRepository.ts`/store compile-and-runtime behavior a **known deploy-time unknown**, acceptable at this claim ceiling but part of why the mirror-parity discipline matters.

## 2. Findings index

| ID | Sev | Area | File:line anchor | Status |
|---|---|---|---|---|
| WUD-F1 | MEDIUM | B verify→import chain unconnected; no durable progress; notices not required for withdraw/correction | `snapshotRepository.ts:74-84` · `snapshotBundle.ts:212` | REQUIRED |
| WUD-F2 | MEDIUM | C two current heads (non-current supersedes; no per-product serialization; no schema backstop; latest-row tiebreak) | `snapshotRepository.ts:56-66,113` · dbtest `import_snapshot` | REQUIRED |
| WUD-F3 | MEDIUM | C bindSku under-validation; `SkuBinding.snapshotId` stored-but-ignored; unbounded identifiers | `snapshotRepository.ts:85-100,108-113` | REQUIRED |
| WUD-F4 | MEDIUM | D non-null variant bindings permanently conflict | `snapshotRepository.ts:134` ↔ `snapshotCatalog.ts:73` | REQUIRED |
| WUD-F5 | LOW | D DB-sourced fs path not re-validated at read | `snapshotRepository.ts:118` | REQUIRED (small) |
| WUD-F6 | LOW | E default-SKU price branch lacks active check | `sku.ts:12-17,68-69` | REQUIRED (small) |
| WUD-F7 | LOW | A claimed code-point-divergence parity fixture absent (oracle gap; reported-vs-actual in 50_ §3) | contract vitest `:70` | REQUIRED (small) |

Observations (non-blocking): **O-1** product-scoped offers may price a different SKU than requested (pre-existing design; the outcome exposes the actual `skuId`). **O-2** >2^53 integers untested — failure direction is safe (hash mismatch ⇒ reject). **O-3** TS stricter than Python on manifest-file symlinks (safe). **O-4** dbtest fixture SQL uses %-formatted script-internal constants (test-only). **O-5** Worker §2 "only fs-touching module" phrasing vs the store's declared fs read (intra-report inconsistency; no hidden path). **O-6** structural-only price proof is declared and ties to WUD-F6. All corrections fit **inside the nine already-authorized WU-D paths**; none requires a schema change, new path, or policy selection (Leo-owned gate/stale/locale policies remain deferred and untouched).

## 3. Excluded scope

No patching/staging/committing/pushing/dispatching; no policy selection or risk acceptance; no build/tsc; no provider/network/credential/real DB; no WU-B/E/F/G inspection beyond confirming the candidate does not start them; legacy/public mock surfaces remain outside the completion claim as declared; Foundation repository strictly read-only (proven unchanged).

## 4. Verdict rationale

The consumption *building blocks* are genuinely strong — byte-compatible cross-language contract verification proven against the real pinned Python producer, a faithful fail-closed bundle verifier, a clean fail-closed catalog decision matrix, honest disposable-DB rehearsals with parity-true mirrors, and exact reproduction of every claimed count. But the handoff's explicit no-PASS trigger is met: load-bearing invariants are **unconnected or contradicted by code** — the verified-bundle→durable-import causal chain does not exist as an enforced contract (WUD-F1), the single-current-head lineage invariant is violatable in two ways with no backstop (WUD-F2), the binding layer accepts what it is required to validate and ignores its own `snapshotId` (WUD-F3), and variant bindings are structurally dead (WUD-F4) — plus three small bounded gaps (F5/F6/F7). Every correction is inside the already-authorized nine paths with no schema or policy expansion, so this is `NEEDS_PATCH` (patchable in approved scope), not `PASS_WITH_RISK` (nothing here needs risk acceptance) and not `FAIL` (no authority/safety/structural boundary is broken; the lane is unwired, default-deny, non-production, and nothing was pushed).

```text
ROLE_VERDICT: NEEDS_PATCH
MISSION_REVIEW_VERDICT: PASS_WITH_CORRECTIONS
BINDING: candidate 21012d0e06a04f82377659b897fd07fa39683133 only
REQUIRED_FINDINGS: WUD-F1, WUD-F2, WUD-F3, WUD-F4 (MEDIUM) · WUD-F5, WUD-F6, WUD-F7 (LOW/small)
CORRECTION_OWNER: same Cosmile Worker (additive commit(s) on the mission branch; no amend/rebase/push)
RE_REVIEW: this same Reviewer, delta-only 21012d0e..<new-candidate> plus the findings' adjacent invariants
CANDIDATE_PUSH: WITHHELD (manifest: only reviewed PASS heads are pushed)
EVIDENCE_LEDGER: pure 42/42 + suite 321/321 (reproduced) · db-touch 21/21 + WU-0 54/54 (reproduced, cleanup proven) · cross-language fixtures genuinely Python-produced (pinned worktree, read-only, unchanged)
REVIEWER_PRODUCT_WRITES: ZERO (product and FOUNDATION worktrees byte-unchanged; no patch/stage/commit/push/dispatch/policy/risk action)
RETURN_TO: foundation-advisor
STOP
```
