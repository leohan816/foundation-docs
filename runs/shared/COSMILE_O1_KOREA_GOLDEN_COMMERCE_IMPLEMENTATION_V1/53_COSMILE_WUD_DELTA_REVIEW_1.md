# 53 — Cosmile WU-D Delta Review 1 (WUD-F1..F7 closure, `21012d0e..2733bfd6`)

```text
MISSION_ID:   COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1
WORKUNIT:     WU-D-DELTA-REVIEW-1
REVIEW_PASS:  IMPLEMENTATION_REVIEW (DELTA_ONLY: 21012d0e..2733bfd6 + findings' adjacent invariants; unrelated reviewed WU-D behavior not reopened)
ACTOR:        foundation-reviewer-fable5 — same Reviewer that authored 51_ (and 31_/33_/35_/41_/43_)
MODEL:        claude-fable-5 (Fable 5, 1M) — live-verified from harness environment statement
EFFORT:       max — live-verified (CLAUDE_EFFORT=max); session id matches the handoff's live binding (1b356b8d-58b1-4f43-a75b-b5cd746f336a)
SKILL:        /fable-sentinel (active this session; delta-review reference active)
SESSION:      tmux foundation-reviewer-fable5 · pane %51 · synchronize-panes OFF · CWD = pinned Cosmile worktree
OVERLAP:      none — 0 pre-existing 53_* artifacts
HANDOFF:      advisor/jobs/.../handoffs/53_COSMILE_WUD_DELTA_REVIEW_1_HANDOFF.md
              @ foundation-docs commit b99ea83233520264fd33b447ff770642f06606cd (read via git show at pin)
BINDING:      NEW_CORRECTION_HEAD 2733bfd61e407389c3336eba2e655ad081d4cdb5 — this verdict binds to exactly this commit
ROLE_VERDICT: PASS
MISSION_REVIEW_VERDICT: PASS   (established deterministic mapping)
FINDINGS:     WUD-F1..F7 ALL CLOSED · regression NONE · new blocking findings NONE
RETURN_TO:    foundation-advisor
```

## 0. Pin verification (all first-hand)

| Pin | Required | Observed | Result |
|---|---|---|---|
| Handoff commit | `b99ea832` | commit exists; handoff read at pin; foundation-docs worktree HEAD = `b99ea832`, clean | ✅ |
| OLD_REVIEWED_HEAD / parent | `21012d0e` | `HEAD~1` = exact; **exactly one additive commit** in range ("fix(wu-d-corr1): close WUD-F1..F7 …") | ✅ |
| NEW_CORRECTION_HEAD | `2733bfd6` | `git rev-parse HEAD` = exact; worktree CLEAN (porcelain 0, pre and post) | ✅ |
| Upstream / push | head `3ea1b211` · 2_0 · both WU-D commits unpushed | `ls-remote` = `3ea1b211`; 0 behind / 2 ahead | ✅ |
| Diff scope | the nine authorized WU-D paths only | `git diff --name-status` = 9 × M, +665/−130; no schema/migration/client/package/lockfile/route/page/component/payment/inventory/identity/transport/provider/config path | ✅ |
| Foundation producer | `73ff0036` CLEAN_UNCHANGED_READ_ONLY | HEAD exact; porcelain 0 **before and after** this review | ✅ |
| 51_ original review | committed @ `ec4ce3db` | my 51_ text committed **byte-identical** (blob sha256 = disk sha256 = `0cf110a3…`) | ✅ |
| 52_ correction evidence | @ `ec4ce3db` | commit adds exactly 52_RESULT + 52_POINTER; result read at pin (claims) | ✅ |

## 1. Per-finding verdicts (each verified from source + evidence, not the report)

**[WUD-F1] Verified-bundle → durable-import chain — CLOSED.** `importFromBundle(root)` is now the **only exported** durable-import entry (`snapshotRepository.ts:132`); it takes a filesystem root and builds the plan **internally** via `buildImportPlan` — no plan/doc/notice value can be injected by a caller. The old public raw API is gone: `grep snapshotImporter|importInitial|importCorrection` over `app/src` + vitest = **0 matches**; `importDocTx`/`withdrawProductTx`/`gateContainProductTx` are non-exported. `buildImportPlan` (`snapshotBundle.ts:229-268`) performs the complete verification pipeline (top-level allow-list → meta → manifests with strict seq 1..N → entries/notices with supersedes resolvability → per-file contract + embedded-sha + raw canonical-byte equality) and returns a **deep-frozen** plan — plan, manifests, entries, notices, and every verified doc tree (`deepFreeze`, recursive) — so every reachable plan value is genuinely immutable. Manifest transitions are bound to producer shapes (initial ≥1/0 · correction exactly 1+1 same-product with the supersedes pin taken from the **verified notice** · withdrawal/gate-change 0+1; anything else `manifest_structure`, zero write); each manifest is one transaction; a failure stops the walk (`import_failed`) with no partial continue; replay/restart re-runs are zero-effect through idempotent/`current_head_exists` categories with durable progress being the imported immutable sha rows themselves. Plan-level tests assert deep immutability and gap behavior; the dbtest proves strict-order apply and zero-partial.

**[WUD-F2] Single structural lineage head + concurrency — CLOSED.** `importDocTx` takes `pg_advisory_xact_lock(hashtext(fpid))` before any lineage read/write (`:71`; also in withdraw/gate paths), serializing per-product. The head is **structural** — the same-product row no later row supersedes (`NOT EXISTS … supersedesSnapshotId = s.id`, `:91-94`) — independent of sellability status. A correction proceeds only when **exactly one** head exists **and** its sha equals the **declared** supersedes sha (`:95`); zero heads, split head (>1 tips), non-current target, or wrong-product target → `supersedes_not_current`, zero write. An initial fails closed (`current_head_exists`) when **any** lineage row exists (`:103-104` — mirrors the producer's `supersession_required`). The dbtest mirror carries the identical advisory-lock + structural-head + declared-sha rules and proves: second-initial rejected; non-current (already superseded) supersedes rejected; **split head rejected**; **two genuinely concurrent initials → exactly one `imported` + one `current_head_exists`, one row/one head**; gate-contained (stale) head remains the structural tip and is **corrected in place** (new current, old flips superseded, no rebind).

**[WUD-F3] Binding integrity + load-bearing `snapshotId` — CLOSED.** `bindSku` (`:184-225`) validates bounded identifiers on every input (`isBoundedIdentifier`, the WU-C 256-code-point convention, now in `snapshotContract.ts`), validates the admitted snapshot document, checks the referenced snapshot row exists **and** its sha equals the admitted doc's sha, is `current_approved`, and matches the product; the **CommerceSku must exist and its `productId`/`variantId` must agree** with the requested binding (`sku_mismatch`); injective on `cosmileSkuId` with the same-triple (product+variant+**snapshotId**) replay idempotent and any conflicting rebind fail-closed. The store resolves the effective snapshot **through `binding.snapshotId`** (`:247-249`) — the latest-by-product query is gone — and re-validates every DB-sourced field (product grammar, bounded variant/snapshotId, snapshot-product↔binding-product agreement) before use. Dbtest proves the full matrix: `sku_mismatch` (product and variant disagreements), `product_mismatch`, `snapshot_not_current`, `snapshot_not_admitted`, `binding_conflict` on a different-snapshot rebind, WU-0 `@unique` backstop, and **`effective(csku_conf)` returning the bound superseded snapshot, NOT the newer current one** (load-bearing proof).

**[WUD-F4] Non-null variant resolution — CLOSED.** `variantResolvableInSnapshot(doc, key)` (`snapshotContract.ts:287-294`): null ⇒ resolvable; non-null ⇒ exact `variant_id` membership in `content.variant_descriptors`. `EffectiveBinding.effective.variantResolvable` replaces the dead hardcoded `snapshotVariantKey`; `decideCatalog` fails closed (`binding_conflict`) when unresolvable (`snapshotCatalog.ts:73-74`); both the store and `bindSku` compute it from the **verified** document. The fixtures are the **exact frozen boundary**: product `elt-pad-vitayouth-01`, variant `elt-pad-vitayouth-01-80` — positive (present ⇒ sellable/bound at contract, catalog, and dbtest layers) plus adjacent negatives (absent `-01-99`, wrong product, and NULL-variant-vs-variant-SKU `sku_mismatch`).

**[WUD-F5] Read-time path validation — CLOSED.** All bound-snapshot filesystem reads now live only in `snapshotBundle.loadVerifiedSnapshot` (`:271-291`); the repository imports **no** `node:fs`/`node:path`. The loader validates `validateProductId(pid)` + `isHex64(sha)` **before any path construction**, requires `doc.foundation_product_id === pid` (path↔doc product equality) and embedded-sha equality, and keeps **raw canonical-byte equality** load-bearing; every failure returns null (fail closed, no reason leak). Tests: valid load; wrong-product-for-sha; traversal-shaped sha (`../../etc/passwd`) and pid (`../../etc`) rejected pre-path; well-formed absent sha; **byte-tamper fails the raw-byte check**; **a valid doc copied under the wrong product dir fails while the correct dir still loads** (positive control).

**[WUD-F6] Active default pricing — CLOSED.** `isSellableDefaultSku(sku) = status==="active" && salesStatus!=="hidden"` gates **only** the `resolveUnitPrice` default branch (`sku.ts:46-49,74`), mirroring `getSkusForProduct`'s filter; `getDefaultSku`'s other callers and the offer>SKU>default precedence are unchanged. Behavioral tests of the pure guard run with a `vi.mock`ed Prisma boundary (active→true; hidden/inactive/null/undefined→false) plus a structural assertion that the default branch consults the guard (no ungated `def.basePrice` return remains).

**[WUD-F7] Code-point ordering oracle — CLOSED.** The Python-parity fixture now contains **both** `U+F000` and `U+10000` keys (byte+sha parity asserted against the pinned Python producer), and a dedicated test asserts `U+F000` precedes `U+10000` in the canonical bytes — a regression to JS UTF-16 default `.sort()` (which orders the `U+10000` surrogate first) now fails both the ordering assertion and the cross-language byte parity.

## 2. Delta containment and regression scan

Exactly one additive commit; exactly the nine authorized paths; no lingering old API; 0 `console.*` added; 0 new `process.env` in src; no fetch/network/transport/route/runtime activation; the WU-D lane remains library-only and unwired; Foundation producer worktree byte-unchanged (verified pre/post). The pure `decideCatalog` lifecycle matrix, cross-language contract/bundle verification, and price precedence are preserved (suite green; no oracle weakened — all prior tests remain, with only finding-mapped additions and the two interface-following edits). Observation **O-7** is accurately bounded: GATE_CHANGE projects sellability to `stale_last_approved` (⇒ `stale_without_policy`, not sellable — fail-closed), lineage stays structural so a producer correction re-enables in place; the gate-re-pass question is an explicitly deferred Leo-owned policy, and no runtime activation is concealed (the lane has no caller).

**New non-blocking observation [O-8]:** a hand-crafted bundle containing WITHDRAWAL followed by CORRECTION for the same product would pass bundle verification (verification does not model cross-manifest lifecycle ordering), and a **replay** of `importFromBundle` over such a bundle would re-withdraw the corrected head (first run ends current; second run ends withdrawn — fail-closed direction, but not zero-effect). This sequence is **unproducible by the reviewed producer**: `exporter.py` maintains a `_withdrawn` set and refuses publish/correction for withdrawn products (`withdrawn_product`, lines 120-121/176-177) and double-withdrawal — verified at the pinned head. Within the fsnap trust model (integrity-verified local bundle, no authenticity primitive by reviewed design), replay is zero-effect for every producer-emittable bundle. Recommended later hardening (not required for closure): a cross-manifest lifecycle guard in `buildImportPlan` (reject correction/publish after a WITHDRAWAL notice for the same product), mirroring the producer's refusal consumer-side.

## 3. Independent reproduction

```text
PRE:  HEAD 2733bfd6 · porcelain 0 · FOUNDATION 73ff0036 porcelain 0 · docker containers 1
LINK: ln -s /home/leo/Project/Cosmile/app/node_modules app/node_modules   (gitignored)
RUN1: vitest run <contract> <bundle> <catalog> → 3 files, 54 passed / 0 failed   (42 prior + 12)
RUN2: vitest run → 333 passed / 0 failed   (321 prior + 12; no regression)
RUN3: python3 scripts/o1_foundation_snapshot_import.dbtest.py → 44 passed / 0 failed · exit 0 · cleanup removed=True absent=True (tmpfs, no host port, local image)
RUN4: python3 scripts/o1_golden_commerce_migration.dbtest.py → 54 passed / 0 failed · exit 0 · cleanup verified
XLANG: fixtures spawned from the pinned Python producer (PYTHONPATH → FOUNDATION @73ff0036, read-only; unchanged after)
POST: symlink removed (ABSENT) · no .next · HEAD 2733bfd6 porcelain 0 · FOUNDATION unchanged · containers 1 (unchanged) · 0 ephemeral leftovers · 0 o1wud_bundle_* tempdirs
BUILD/TSC: honestly NOT_RUN (pre-WU-0 generated Prisma client + forbidden prisma generate — unchanged declared blocker; snapshotRepository compile/runtime remains a deploy-time unknown, not converted into PASS evidence)
```

All four Worker-claimed counts (54, 333, 44, 54) reproduce exactly.

## 4. Verdict rationale

Every one of the seven findings is closed by exactly the mechanism the correction claims, verified in source with the adjacent invariants the 53_ handoff enumerates — the composed verified-import chain with an immutable plan and no out-of-band lifecycle API, per-product serialization with a structural single-head rule proven under real concurrency, a fully validating and `snapshotId`-load-bearing binding layer, load-bearing non-null variant resolution on the exact frozen pad-80 boundary, pre-path re-validation with doc↔path product equality and raw-byte checks, active-only default pricing behaviorally proven, and a genuine code-point-ordering oracle pinned against the real producer. The delta is exactly the nine authorized paths, additive, with no regression and all reproductions exact. No blocking finding remains. **ROLE_VERDICT: PASS** — per the committed handoff, the candidate may be pushed by the Advisor after publication of this review (push remains the Advisor's action, not the Reviewer's).

```text
ROLE_VERDICT: PASS
MISSION_REVIEW_VERDICT: PASS
BINDING: candidate 2733bfd61e407389c3336eba2e655ad081d4cdb5 only
ITEM_VERDICTS: WUD-F1 CLOSED · WUD-F2 CLOSED · WUD-F3 CLOSED · WUD-F4 CLOSED · WUD-F5 CLOSED · WUD-F6 CLOSED · WUD-F7 CLOSED · regression NONE
OPEN_FINDINGS_AGAINST_WU-D: NONE
OBSERVATIONS_NON_BLOCKING: O-1..O-6 preserved accurately · O-7 accurately bounded (fail-closed deferred gate policy; no concealed activation) · O-8 new (producer-unproducible replay edge; future consumer-side lifecycle-guard hardening recommended)
WU-D_CANDIDATE: 2733bfd6 (base 3ea1b211 + WU-D + correction; both commits NOT pushed) — push eligible by ADVISOR after publication per the committed handoff
EVIDENCE_LEDGER: pure 54/54 + suite 333/333 (reproduced) · db-touch 44/44 + WU-0 54/54 (reproduced, cleanup proven) · cross-language fixtures genuinely Python-produced (pinned, read-only, unchanged)
REVIEWER_PRODUCT_WRITES: ZERO (no patch/stage/commit/push/amend/rebase/dispatch/risk/policy action; candidate preserved exactly)
RETURN_TO: foundation-advisor
STOP
```
