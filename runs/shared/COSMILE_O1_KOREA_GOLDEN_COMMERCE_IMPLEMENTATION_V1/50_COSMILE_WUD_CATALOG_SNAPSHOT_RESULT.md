# 50 — Cosmile WU-D Result (Catalog, single KRW price, Foundation snapshot consumption)

```text
MISSION_ID:   COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1
WORKUNIT:     WU-D
ACTOR:        cosmile (Cosmile repository-owner Worker)
MODEL:        claude-opus-4-8[1m] (Opus 4.8, 1M) — live-verified from harness environment
EFFORT:       max (same session; persisted default settings.json = xhigh, live effort not self-introspectable — recorded honestly)
SKILL:        /fable-builder (reconfirmed loaded before edits; anchor-first / consume-don't-reinterpret / test-before-code / declared-not-proven)
HANDOFF:      advisor/jobs/.../handoffs/50_COSMILE_WUD_CATALOG_SNAPSHOT_IMPLEMENTATION_HANDOFF.md @ d589a53c6b150ffc60ee03b92823e2ff52392f35 (committed; working-tree == committed blob, verified)
STATUS:       COMPLETE — one candidate commit · contract 19/19 · bundle 9/9 · catalog 14/14 · import 21/21 · suite 321/321 · READY_FOR_INDEPENDENT_REVIEW
RETURN_TO:    foundation-advisor
IMPLEMENTATION_PUSHED: NO · REVIEWER_DISPATCHED: NO · NEXT_WORKUNIT_STARTED: NO
```

## 0. Pins verified before any edit (first-hand, local-only — no network; no Foundation write)

| Gate | Required | Observed | Result |
|---|---|---|---|
| Handoff | `50_…@d589a53c` | FDOCS HEAD == `d589a53c`; committed ("authorize bounded WU-D implementation"); working-tree == committed | ✅ |
| Repository / branch | exact worktree + mission branch | exact | ✅ |
| EXPECTED_BASE_HEAD | `3ea1b21…` | HEAD == `3ea1b21…` (pre-edit) | ✅ |
| Upstream state | EQUAL_0_0 | upstream == `3ea1b21`; 0/0 | ✅ |
| Worktree clean | CLEAN | clean pre-edit | ✅ |
| WU-C final review | PASS, head `3ea1b21` | WU-C chain reviewed + pushed (upstream at `3ea1b21`) | ✅ |
| WU-0 schema head | `c559e7cd` | ancestor of HEAD (fixed substrate) | ✅ |
| Foundation snapshot impl | `73ff0036` PASS | FOUNDATION worktree HEAD == `73ff0036`, clean; package imported read-only for fixtures | ✅ |
| Reviewed design / review | `a1ac8016` / `daacd8a6` PASS | pins present (RC-4 / §11) | ✅ |
| Model / Effort / Skill | Opus 4.8 (1M) / max / /fable-builder | verified / carried-forward / reconfirmed | ✅ / ⚠️ recorded / ✅ |

## 1. Scope delivered

The smallest non-production repository lane that (1) reads/verifies the exact `fsnap-bundle-1.0` local-file bundle
byte-compatibly; (2) imports approved immutable snapshot pins + sequenced lifecycle into WU-0
`FoundationProductSnapshot`/`SkuBinding`; (3) exposes a fail-closed catalog decision for a bound SKU from the
effective approved local snapshot + Cosmile state; (4) makes `CommerceSku`/active `CommerceOffer` the **only** KRW
price authority. **Library/repository contracts only — no runtime activation; existing public/mock routes are
unchanged and remain outside the completion claim.**

## 2. Path dispositions (candidate `21012d0e06a04f82377659b897fd07fa39683133`, base→candidate +1366/−4)

| Path | Disposition |
|---|---|
| `app/src/lib/foundation/snapshotContract.ts` | NEW — fsnap-1.0 constants + canonical serialization (code-point sort/UTF-8/minimal-sep/type allow-list) + sha256 + 7-field pin + snapshot/pin/ack + content/gate/approval validators. Pure (node:crypto). |
| `app/src/lib/foundation/snapshotBundle.ts` | NEW — `verifyBundle` + `simulateImport` (meta/manifest/entry/notice/snapshot-file/gap/tamper/unexpected/symlink/supersedes). Only fs-touching module (node:fs read-only). |
| `app/src/lib/foundation/snapshotRepository.ts` | NEW — Prisma import (idempotent-by-sha, immutability-by-identity, supersedes chain, injective `SkuBinding`) + catalog store. Runtime-only. |
| `app/src/lib/foundation/snapshotCatalog.ts` | NEW — pure `decideCatalog` + orchestrator over injected ports; Cosmile gate policy (default-deny) + KRW bounds. |
| `app/src/lib/sku.ts` | MODIFIED — narrow removal of the Foundation/mock price fallback from `resolveUnitPrice` (only). Order offer>SKU>default preserved. |
| `app/scripts/o1_foundation_snapshot_contract.vitest.ts` | NEW — cross-language canonical/hash parity + validator negatives. |
| `app/scripts/o1_foundation_snapshot_bundle.vitest.ts` | NEW — Python-generated bundle fixtures; verify + tamper/gap/unexpected fail-closed. |
| `app/scripts/o1_catalog_price_authority.vitest.ts` | NEW — decideCatalog matrix + orchestrator + resolveUnitPrice structural proof. |
| `app/scripts/o1_foundation_snapshot_import.dbtest.py` | NEW — disposable-PostgreSQL import rehearsal. |

**Exactly these 9 paths changed** (1 modified + 8 new); `foundationProductClient.ts`, all pages/routes/components,
cart/checkout/order/payment/inventory, Prisma schema/migrations, package/lockfiles, generated clients, Foundation,
and SIASIU are **untouched**. No new `src/app` (route/endpoint) path.

## 3. Bundle compatibility matrix (byte-compatible verification, consume-don't-reinterpret)

| fsnap contract element (Python @ 73ff0036) | TS landing | Cross-language proof |
|---|---|---|
| canonical bytes (code-point key sort · UTF-8 · minimal sep · type allow-list) | `snapshotContract.canonicalBytes` | **byte-identical** to `contract.canonical_bytes` for tricky values incl. the **U+F000 vs U+10000** code-point-vs-UTF-16 divergence (contract test) |
| `content_sha256` | `snapshotContract.contentSha256` | identical sha256 for the same values; TS re-hash of a Python-built snapshot == its embedded sha |
| constants `fsnap-1.0`/`fsnap-bundle-1.0`/`NOT_LIVE_SALE_EVIDENCE`/`non_production` | `snapshotContract.*` / `snapshotBundle.*` | verify accepts a Python bundle; wrong constant rejects |
| 7-field pin / snapshot / gates(6) / approval / content allow-list / excluded-keys-any-depth | `validatePin`/`validateSnapshot`/`validateGates`/`validateApproval`/`validateContent`/`walkExcludedKeys` | Python-built snapshot accepted; format/excluded/gate/approval negatives fail-closed |
| bundle layout (meta/manifests/snapshots) · seq 1..N · notice(4) · supersedes resolvability | `snapshotBundle.verifyBundle` | Python bundle (4 manifests, 3 snapshots, CORRECTION+WITHDRAWAL+GATE_CHANGE) verified |
| tamper (byte) · gap · unexpected file/dir/symlink · duplicate replay | `verifyBundle` + `simulateImport` | tamper_detected/gap_detected/unexpected_file proven on mutated copies; strict-order import + duplicates |

## 4. Lifecycle / gate / price decisions

- **Import (`snapshotRepository`)**: idempotent by `snapshot_content_sha256` (equal replay = no-op); a different
  document for the same immutable identity 6-tuple → `immutability_violation` (zero write); correction inserts a
  new `current_approved` snapshot and flips the superseded one (supersedes chain, FK-resolvable); withdrawal →
  `withdrawn`; historical rows are never rewritten/deleted (only status projected). `SkuBinding` injective on
  `cosmileSkuId`; conflicting rebind → `binding_conflict`; WU-0 partial-unique/`@unique` backstops.
- **Catalog (`decideCatalog`)**: **sellable only** with a matching binding, a `current_approved` snapshot whose
  `approval_status == APPROVED_FOR_COMMERCE_DISPLAY`, **all six gates == `PASS`** (Cosmile default-deny policy;
  synthetic-only, `NOT_LIVE_SALE_EVIDENCE`; no real rights/MFDS/imagery approval claimed), an **active** Cosmile
  SKU, and a **KRW positive-integer** server price. `missing_binding`/`missing_snapshot`/`binding_conflict`/
  `unapproved`/`superseded`/`withdrawn`/`stale_without_policy`/`gate_failed`/`sku_inactive`/`price_unavailable`/
  `invalid_price` all fail closed. **`STALE_LAST_APPROVED` is fail-closed** (no stale duration authorized). A
  Foundation producer outage after a previously imported approved local snapshot still yields a sellable decision
  (pure over the local effective binding — no live call).
- **Price (`sku.resolveUnitPrice`)**: the **only** KRW authority = active matching `CommerceOffer` > requested
  `CommerceSku` > default `CommerceSku`; the Foundation/mock-price fallback is **removed** (else `null`,
  fail-closed). No client/snapshot/Foundation/URL/caller amount supplies or overrides it. A repeated decision
  with a differing caller `expectedPrice` → `price_reconfirmation_required` (never silent stale acceptance). The
  catalog projection uses the **same** resolved server price later checkout uses.

## 5. Tests (labeled per TEST_MEANING_POLICY)

- **pure (provider-independent):** `o1_foundation_snapshot_contract.vitest.ts` **19/19** (cross-language parity +
  fail-closed validators); `o1_catalog_price_authority.vitest.ts` **14/14** (decideCatalog matrix + orchestrator +
  resolveUnitPrice structural no-fallback/order proof). Cross-language fixtures spawn the reviewed Python impl
  (`PYTHONPATH=<FOUNDATION worktree> python3`), read-only.
- **fs + cross-language (offline):** `o1_foundation_snapshot_bundle.vitest.ts` **9/9** — Python generates a real
  bundle into an attributable temp dir (`mkdtemp o1wud_bundle_*`), TS `verifyBundle` accepts it byte-compatibly and
  fails closed on tamper/gap/unexpected; temp dirs removed in `afterAll`.
- **db-touch (disposable `postgres:16-alpine`):** `o1_foundation_snapshot_import.dbtest.py` **21/0**.
- **regression:** full Vitest suite `vitest run` **321/0** (279 prior + 42 new; no seam regression); WU-0 migration
  rehearsal **54/0**. Reproduce with the original repo's `node_modules` via a gitignored symlink (removed after).
- **build/lint/tsc:** **NOT_RUN** — worktree has no `node_modules`; a typecheck needs the WU-0-inclusive generated
  Prisma client (`prisma generate` forbidden). `snapshotRepository.ts` is runtime-only and never imported by tests.
- **test-diff:** all new files; one added-this-batch oracle was corrected before commit (a `resolveUnitPrice`
  structural `endsWith` boundary — the code was correct; the fragile assertion was replaced by a robust
  after-default no-fallback check; no product behavior involved).

## 6. Disposable-runtime + cleanup evidence

```text
INSTANCE: disposable postgres:16-alpine container o1wud_ephemeral_<pid>; `docker run -d --tmpfs /var/lib/postgresql/data:rw -e POSTGRES_PASSWORD=<transient synthetic> -e POSTGRES_HOST_AUTH_METHOD=trust` (NO -p)
CONTAINMENT: docker exec (Unix socket) only; no host port / no loopback publish; no external network / no image pull; synthetic rows + transient synthetic credential; effective DATABASE_URL/env NOT opened or printed
FIXTURE: minimal base (Order/OrderItem/CommerceSku) + the already-committed WU-0 migration; plpgsql import_snapshot/bind_sku MIRROR snapshotRepository.ts
SCENARIOS (21 checks, all PASS): WU-0 migration applies; initial import -> current_approved; idempotent replay (no new row); same-identity-different-sha -> immutability_violation zero-write; correction supersedes chain (new current_approved + old superseded); historical immutability (superseded row content/sha unchanged); unresolvable supersedes zero-write; withdrawal containment (+ history resolvable); binding injective + idempotent + conflict + WU-0 @unique backstop + per-SKU (not per-product) allowance
CLEANUP (BLOCKING): container removed=True; post-cleanup absent=True; data-dir=tmpfs (vanished); transient credential removed; host-port=none
FS FIXTURES: bundle temp dirs mkdtemp'd under the OS temp and removed in afterAll; no Foundation repo write
GIT: pre 3ea1b21 (clean 0/0) -> post 21012d0 (clean, 1 ahead / 0 behind, NOT pushed); worktree node_modules symlink for vitest only, removed after (absent); no .next
```

## 7. Legacy/public mock exclusion + no-activation confirmation

Existing public/mock routes, pages, components, cart/checkout/order/payment, `foundationProductClient`, and mock
catalog data are **unchanged** and remain **outside this completion claim**. Removing the price fallback changes
`resolveUnitPrice` behavior only for un-seeded products in the legacy mock path (seeded demo unaffected — the
default-SKU branch returns first); that legacy surface is explicitly out of scope. **No route, endpoint, transport,
network, provider, or runtime activation exists** in this candidate; the WU-F harness may later call this explicit
target lane. Checkout/payment/runtime remain **unconnected**.

## 8. Residual unknowns / declared not-proven

- `snapshotRepository.ts` under the real generated Prisma client is a deploy-time gate (runtime-unproven; its
  import invariants are dbtest-proven via the parity-verified mirror, and its decisions vitest-proven).
- The runtime catalog store reads gates from the consumed bundle document (fs) — runtime-only; `decideCatalog`
  (which consumes the gates) is fully vitest-covered.
- Twin-encoding: `snapshotRepository.ts` ↔ the dbtest plpgsql `import_snapshot` must be kept in parity (Reviewer diff).
- Cosmile gate-passing token (`"PASS"`), stale-snapshot policy, locale approval scope, and the GATE_STALE value set
  are Leo-owned policies deferred (50_ §14.5); O1 uses synthetic fixtures only.
- `resolveUnitPrice`'s offer>SKU>default **order** is proven structurally (diff + source assertion), not by a
  DB-bound runtime test (the lane is unwired; WU-F/later integration exercises it).

## 9. rollback

Revert the single candidate commit `21012d0e06a04f82377659b897fd07fa39683133` (the 8 new files disappear and
`sku.ts` returns to `3ea1b21`). No schema/DB/runtime state was created outside the destroyed disposable container;
nothing pushed.

```text
CHECKOUT/PAYMENT/RUNTIME_CONNECTED: NO · ROUTE/TRANSPORT/ENDPOINT/PROVIDER/NETWORK: NONE
PUBLIC_CATALOG_CUTOVER: NO · LEGACY_MOCK_SURFACES: UNCHANGED (outside completion claim)
SCHEMA/MIGRATION/PRISMA_ARTIFACT/DEPENDENCY/LOCKFILE/FOUNDATION_REPO_CHANGED: NO
CANDIDATE_HEAD: 21012d0e06a04f82377659b897fd07fa39683133 (parent 3ea1b211…)
IMPLEMENTATION_PUSHED: NO · FOUNDATION_DOCS_COMMITTED_BY_WORKER: NO (Advisor publishes)
REVIEWER_DISPATCHED: NO · NEXT_WORKUNIT_STARTED: NO
GOOGLE/TOSS/PROVIDER/NETWORK/REAL_DB/SECRET/PII/RUNTIME_ACTIVATION: NONE
RETURN_TO: foundation-advisor
STOP
```
