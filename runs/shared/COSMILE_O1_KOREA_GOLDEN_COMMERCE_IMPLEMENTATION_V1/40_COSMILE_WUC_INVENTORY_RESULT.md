# 40 — Cosmile WU-C Result (Inventory reservation + oversell guard)

```text
MISSION_ID:   COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1
WORKUNIT:     WU-C
ACTOR:        cosmile (Cosmile repository-owner Worker)
MODEL:        claude-opus-4-8[1m] (Opus 4.8, 1M) — live-verified from harness environment
EFFORT:       max (same session; dispatcher-confirmed; persisted default settings.json = xhigh, live effort not self-introspectable — recorded honestly)
SKILL:        /fable-builder (reconfirmed loaded before edits)
HANDOFF:      advisor/jobs/.../handoffs/40_COSMILE_WUC_INVENTORY_IMPLEMENTATION_HANDOFF.md @ e72b5c379a5ea8c6d3f759f23141837abb60eeda (committed; working-tree == committed blob, verified)
STATUS:       COMPLETE — one candidate commit · contract 32/32 · concurrency 28/28 · suite 271/271 · READY_FOR_INDEPENDENT_REVIEW
RETURN_TO:    foundation-advisor
IMPLEMENTATION_PUSHED: NO · REVIEWER_DISPATCHED: NO · NEXT_WORKUNIT_STARTED: NO
```

## 0. Pins verified before any edit (first-hand, local-only — no network)

| Gate | Required | Observed | Result |
|---|---|---|---|
| Handoff | `40_…@e72b5c37` | FDOCS HEAD == `e72b5c37`; committed ("dispatch WU-C inventory implementation"); working-tree == committed | ✅ |
| Repository / branch | exact worktree + mission branch | exact | ✅ |
| EXPECTED_BASE_HEAD | `e1dc39e6…` | HEAD == `e1dc39e6…` (pre-edit) | ✅ |
| Upstream state | `origin/…` EQUAL_0_0 | upstream == `e1dc39e6`; 0 behind / 0 ahead | ✅ |
| Worktree clean | CLEAN | clean pre-edit | ✅ |
| WU-A final review | verdict PASS, commit `dcc6a0fb` | `dcc6a0fb` = "record WU-A delta review 2 PASS" | ✅ |
| WU-0 schema head | `c559e7cd…` | ancestor of HEAD (fixed schema substrate) | ✅ |
| Reviewed design / design review | `a1ac8016` / `daacd8a6` PASS | pins present (RC-3 / §7.1 / §10 basis) | ✅ |
| Model / Effort / Skill | Opus 4.8 (1M) / max / /fable-builder | verified / carried-forward / reconfirmed | ✅ / ⚠️ recorded / ✅ |

## 1. 구현 범위 (scope delivered)

The smallest non-production WU-C **inventory reservation domain/repository lane** on the fixed WU-0
`CommerceSku.stock` / `InventoryReservation` schema: deterministic idempotent reservation with a bounded TTL;
an **atomic per-SKU `FOR UPDATE` oversell guard** so `reserved+committed ≤ stock` always holds; proof-gated
`reserved→committed|released|expired` transitions; and a **default-HOLD restoration** contract. **Library/
repository contracts only — no runtime activation, no checkout/cart/payment/order/refund/route/UI/console/job/
timer/provider/Foundation change, no schema/migration/dependency/Prisma-artifact change.**

## 2. Path dispositions (all five allowed, all NEW; candidate `84370e8624c6e908da183a84b38551a6a9441527`, +737/−0)

| Path | Disposition |
|---|---|
| `app/src/lib/inventory/contracts.ts` | NEW — closed discriminated outcomes (`ReserveOutcome`/`TransitionOutcome`/`RestorationOutcome`), `PaymentProof` union, injected `ClockPort`/`IdPort`, `InventoryRepository` port. Pure. |
| `app/src/lib/inventory/service.ts` | NEW — bounds-before-persistence; shared `decideReserve`/`decideTransition`; `reserve`/`commit`/`release`/`expire`; `evaluateRestoration` (default HOLD). Pure (no next/prisma). |
| `app/src/lib/inventory/repository.ts` | NEW — Prisma `$transaction` + per-SKU `SELECT … FOR UPDATE` before aggregate check + insert; parameterized tagged-template SQL only. Runtime-only (imports `@/lib/prisma`). |
| `app/scripts/o1_inventory_contract.vitest.ts` | NEW — pure contract suite (fake repo reuses the shared decisions). |
| `app/scripts/o1_inventory_concurrency.dbtest.py` | NEW — disposable-PostgreSQL concurrency proof (plpgsql `reserve_atomic` mirrors `repository.ts`). |

**No existing product path changed** (`git diff --name-only e1dc39e..84370e8` modified-existing = 0; new = these 5).

## 3. 계약 매핑 (contract-to-code, WU-C — the 5 allowed paths exclude docs, so the map lives here)

| Handoff requirement (40_) | Code landing | Test |
|---|---|---|
| reserve positive qty for one {orderId,skuId}, bounded future TTL | `service.reserve` + bounds (`MAX_RESERVATION_QUANTITY`, `[1,24h]` TTL) | contract: invalid_quantity/invalid_ttl/invalid_input |
| deterministic + idempotent; same active {order,sku,qty} returns existing | `decideReserve` (existing reserved same qty → idempotent) | contract `idempotent_existing`; dbtest replay (no dup row) |
| conflicting qty / incompatible existing → fail closed | `decideReserve` → `conflict` | contract + dbtest conflict |
| missing SKU / non-positive qty / invalid TTL / insufficient → closed category, ZERO write | `service`+`decideReserve`; repo returns before insert | contract (row count 0); dbtest no-partial |
| available = locked stock − SUM(reserved+committed) | `repository.reserveAtomic` (`FOR UPDATE` + `SUM`) | dbtest aggregate + multi-qty |
| atomic per-SKU row lock; `reserved+committed ≤ stock` for all writes | `repository` `SELECT … FOR UPDATE` before check+insert | **dbtest 4-way concurrency (1 winner)** + global invariant |
| last-item: one winner / one INSUFFICIENT, no dup, no oversell | serialized by the SKU lock | dbtest S1 |
| commit only with verified-capture proof | `decideTransition` (`verified_capture` required) | contract commit matrix |
| release only with conclusive non-capture; expire only after TTL + non-capture | `decideTransition` | contract release/expire matrix; dbtest effects+TTL |
| unknown/confirming never releases/expires | `decideTransition` → `proof_required` | contract (unknown/confirming) |
| idempotent transition; incompatible/backward/unknown → fail closed; missing → fail closed | `decideTransition` (`idempotent_noop`/`incompatible_state`/`not_found`) | contract + dbtest idempotent commit |
| no client/redirect/timer/webhook/label alone establishes truth | proof is a structured `PaymentProof`, never inferred | contract (only structured proof accepted) |
| restoration never auto-restores; default HOLD; requires operator+policy; record later dep | `evaluateRestoration` (always HOLD) | contract restoration |
| repository errors → bounded category, no leak | `try/catch → repository_error` | contract repository_error |

## 4. 계약 이탈 / declared placements (no silent deviation)

1. **Restoration is HOLD-only in WU-C.** The WU-0 schema cannot represent a safe bounded restoration — a
   committed reservation is terminal and `committed→released` is forbidden by
   `InventoryReservation_committed_time_chk`, and there is no "restored" disposition. Per the handoff, restoration
   stays HOLD (zero stock mutation) and records the exact later dependency:
   **`later_authorized_operator_restoration_lane + a WU-0-schema extension for a restored disposition`**. Not expanded here.
2. **`repository.ts` is runtime-only, not unit-tested** (imports `@prisma/client`, absent in the worktree). It is
   thin and delegates to the pure, tested `decideReserve`/`decideTransition`; its atomic lock/guard is proven by
   the concurrency dbtest against real PostgreSQL. The plpgsql `reserve_atomic` in the dbtest is a declared
   **mirror** of `repository.reserveAtomic` (same algorithm; the Reviewer can diff them).
3. **Expire uses `releasedAt` as the terminal disposition timestamp** (WU-0 has no `expiredAt`); permitted by
   `InventoryReservation_released_time_chk` (`releasedAt IS NULL OR status IN ('released','expired')`).

## 5. 테스트 결과 (labeled per TEST_MEANING_POLICY)

- **pure (provider-independent):** `scripts/o1_inventory_contract.vitest.ts` = **32/32**. Bidirectional oracles
  for every closed category/transition: `decideReserve` (insert/idempotent/conflict/insufficient), `decideTransition`
  full matrix (commit/release/expire × proof × state × TTL, unknown/confirming never release/expire), service
  `reserve` (valid/invalid_input/invalid_quantity/invalid_ttl/sku_missing/insufficient/idempotent/conflict/
  repository_error, zero-write on reject), transitions (committed/idempotent_noop/proof_required/not_found/
  invalid_input/ttl_not_reached), restoration (hold_default_deny/hold_unrepresentable). Reproduce:
  `cd app && <orig>/node_modules/.bin/vitest run scripts/o1_inventory_contract.vitest.ts`.
- **db-touch (disposable `postgres:16-alpine`):** `scripts/o1_inventory_concurrency.dbtest.py` = **28/0**.
  Reproduce: `cd app && python3 scripts/o1_inventory_concurrency.dbtest.py` (needs docker + the already-local image).
- **regression:** WU-0 migration rehearsal (`o1_golden_commerce_migration.dbtest.py`) = **54/0** (the WU-C fixture
  reuses this migration). Full Vitest suite `vitest run` = **271/0** (239 prior + 32 new; no regression).
- **build/lint/tsc:** **NOT_RUN** — worktree has no `node_modules`; a typecheck would require regenerating the
  WU-0-inclusive Prisma client (`prisma generate` forbidden). `repository.ts` is runtime-only and never imported
  by the tests. (`.next` is gitignored.)
- **test-diff oracle changes:** none (all five files new; no existing test/oracle touched).

## 6. Concurrency evidence (disposable PostgreSQL; counts/categories only)

```text
INSTANCE: disposable postgres:16-alpine container o1wuc_ephemeral_<pid>; creation = `docker run -d --tmpfs /var/lib/postgresql/data:rw -e POSTGRES_PASSWORD=<transient synthetic> -e POSTGRES_HOST_AUTH_METHOD=trust` (NO -p)
CONTAINMENT: reached only via `docker exec` (Unix socket inside container); no host port / no loopback publish; no external network; no image pull; synthetic rows + transient synthetic credential only; effective real DATABASE_URL/env NOT opened or printed
FIXTURE: minimal base (Order/OrderItem/CommerceSku) + the already-committed WU-0 migration applied; plpgsql reserve_atomic mirrors repository.ts
SCENARIOS (28 checks, all PASS): 4 concurrent reserves on stock=1 -> 1 reserved + 3 insufficient_stock, exactly one active reservation, reserved+committed<=stock; multi-qty boundary (5/5 then insufficient); idempotent replay (no dup) + conflict; global reserved+committed<=stock across all SKUs; commit reserved->committed + repeated-commit zero-dup; release reserved->released frees stock; expire past-TTL->expired and before-TTL holds (unknown/early holds); insufficient reserve writes nothing (no partial); WU-0 anti-double-reserve partial-unique rejects a duplicate active insert; FINAL global invariant 0 violations
CLEANUP (BLOCKING): container force-removed=True; post-cleanup absent=True; data-dir=tmpfs (vanished with container); transient credential removed (container gone); host-port=none
GIT: pre e1dc39e (clean, 0/0) -> post 84370e8 (clean, 1 ahead / 0 behind, NOT pushed); worktree node_modules symlink used for vitest only, removed after (absent); no .next
```

## 7. 무엇을 증명했는가 / 증명하지 않았는가

**Proven:** the reservation decision matrix and transition matrix are fail-closed with closed categories and
zero-write-on-reject (pure, 32/32); the atomic per-SKU `FOR UPDATE` guard prevents oversell under real 4-way
concurrency and keeps `reserved+committed ≤ stock` globally (28/28); idempotency, TTL gating, unknown-holds,
no-partial-write, and the WU-0 anti-double-reserve backstop all hold on real PostgreSQL; the WU-0 migration
still rehearses cleanly (54/54); no seam regression (271/271).

**NOT proven (out of WU-C / declared):** runtime wiring to checkout/payment/order (checkout/payment/runtime
remain **unconnected** — no route/endpoint/activation exists); `repository.ts` under the real generated Prisma
client (needs a deploy-time `prisma generate`); safe stock **restoration** (intentionally HOLD-only — requires a
later operator lane + a WU-0 schema extension); tsc/build.

## 8. 남은 risk / residual unknowns

- Restoration is inert HOLD until a later authorized operator lane + a schema extension exist; WU-C must not be
  read as providing any restock path.
- `repository.ts` and the dbtest `reserve_atomic` are twin encodings of one algorithm; they must be kept in
  parity (Reviewer diff point).
- The lane is not wired to any caller; WU-E/WU-B integration (checkout reserve-at-start, commit-on-capture) is a
  later WorkUnit and depends on this reviewed contract.

## 9. 다음 검수 질문 (for the independent Reviewer)

1. Does `repository.reserveAtomic` acquire the per-SKU `FOR UPDATE` **before** the aggregate availability check
   and insert, and does the dbtest's `reserve_atomic` faithfully mirror it (diff the two)?
2. Under the 4-way concurrency, is there exactly one winner and zero oversell, and does `reserved+committed ≤
   stock` hold globally after every scenario?
3. Are all reject/invalid/insufficient/proof paths zero-write, and are all outcomes closed categories with no SQL
   text/identifier/PII/secret leak?
4. Does `decideTransition` refuse commit without `verified_capture` and release/expire without
   `conclusively_non_captured` (unknown/confirming → HOLD), and is expire gated on TTL?
5. Is restoration strictly HOLD (zero stock mutation) even with operator confirmation + policy, with the later
   dependency recorded rather than WU-C expanded?
6. Is the diff exactly the 5 new paths with 0 existing-file change, no schema/migration/dependency/Prisma
   change, and no route/checkout/payment/UI/Foundation wiring?

## 10. rollback

Revert the single candidate commit `84370e8624c6e908da183a84b38551a6a9441527` (the 5 new files disappear; base
returns to `e1dc39e`). No schema/DB/runtime state was created outside the destroyed disposable container; nothing pushed.

```text
CHECKOUT/PAYMENT/RUNTIME_CONNECTED: NO (library/repository contracts only; no route/endpoint/activation)
PRODUCT_CODE_CHANGED: YES (5 new inventory library files; 0 existing files changed)
SCHEMA/MIGRATION/PRISMA_ARTIFACT/DEPENDENCY/LOCKFILE_CHANGED: NO
CANDIDATE_HEAD: 84370e8624c6e908da183a84b38551a6a9441527  (parent e1dc39e6…)
IMPLEMENTATION_PUSHED: NO · FOUNDATION_DOCS_COMMITTED_BY_WORKER: NO (Advisor publishes)
REVIEWER_DISPATCHED: NO · NEXT_WORKUNIT_STARTED: NO
GOOGLE/TOSS/PROVIDER/NETWORK/REAL_DB/SECRET/PII/RUNTIME_ACTIVATION: NONE
RETURN_TO: foundation-advisor
STOP
```
