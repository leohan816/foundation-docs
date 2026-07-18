# 40 — Cosmile WU-C Pointer

```text
MISSION_ID: COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1 · WU-C
ACTOR: cosmile (Cosmile repository-owner Worker) · RETURN_TO: foundation-advisor
HANDOFF: 40_COSMILE_WUC_INVENTORY_IMPLEMENTATION_HANDOFF.md @ e72b5c379a5ea8c6d3f759f23141837abb60eeda (committed; working-tree == committed, verified)
BASE: e1dc39e6e0179c095e47695594b6ea3fec57d006 (WU-A final review PASS @ dcc6a0fb; upstream EQUAL_0_0) · WU-0 schema head c559e7cd
STATUS: COMPLETE — one candidate commit · READY_FOR_INDEPENDENT_REVIEW
```

## RESULT SUMMARY

Smallest non-production **WU-C inventory reservation lane** on the fixed WU-0 `InventoryReservation` /
`CommerceSku.stock` schema. Library/repository contracts only — **no schema/migration, checkout, cart, payment,
order, refund, route, UI, console, job, timer, provider, or Foundation change; no runtime activation**. Pure core
(`contracts.ts` + `service.ts`; injected repo/clock/id ports): closed discriminated outcomes; shared
`decideReserve` (existing-active/idempotent/conflict/insufficient) and `decideTransition` (commit=verified_capture;
release/expire=conclusively_non_captured; TTL gate; idempotent-noop; incompatible/backward fail-closed;
**unknown/confirming never release/expire**); bounds before persistence; **restoration = default HOLD** (never
auto-restores stock; records the later operator-lane + schema dependency). Runtime `repository.ts` (Prisma): a
**per-SKU `SELECT … FOR UPDATE`** acquired before the aggregate availability check and insert, parameterized
tagged-template SQL only, so **`reserved+committed ≤ stock` always holds**. Concurrency dbtest (disposable
`postgres:16-alpine`, tmpfs, no host port, `docker exec`; applies the committed WU-0 migration; plpgsql
`reserve_atomic` mirrors `repository.ts`): **28/28** — 4 concurrent reserves on stock=1 → 1 winner + 3
insufficient, no oversell; idempotency/conflict; commit/release/expire effects + TTL + unknown-holds;
no-partial-write; WU-0 anti-double-reserve backstop; global invariant. Contract vitest **32/32**; WU-0 migration
regression **54/54**; full suite **271/271**. Diff = **exactly the 5 new paths** (+737/−0), 0 existing files
changed; no secrets/PII. **Checkout/payment/runtime remain unconnected.**

## NEXT ACTION ROUTING

- **Advisor**: dispatch the independent Reviewer against the candidate (`84370e8`, 5 files); attack surface =
  `40_…RESULT.md §9`. This session did **not** dispatch the Reviewer.
- **Advisor** publishes the foundation-docs evidence (left uncommitted).
- No push, no WU-B/D/E/F/G until independent review PASS.

## POINTER BLOCK

```text
PRODUCT_REPO: /home/leo/Project/.worktrees/Cosmile/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1
BRANCH: implementation/cosmile-o1-korea-golden-commerce-v1-20260717
BASE_HEAD: e1dc39e6e0179c095e47695594b6ea3fec57d006
CANDIDATE_HEAD: 84370e8624c6e908da183a84b38551a6a9441527  (parent e1dc39e6; +737/-0; 5 new files; 1 ahead / 0 behind; NOT pushed)
NEW_PATHS (all 5 allowed):
  app/src/lib/inventory/contracts.ts
  app/src/lib/inventory/service.ts
  app/src/lib/inventory/repository.ts
  app/scripts/o1_inventory_contract.vitest.ts
  app/scripts/o1_inventory_concurrency.dbtest.py
EVIDENCE (foundation-docs, uncommitted — Advisor publishes):
  runs/shared/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1/40_COSMILE_WUC_INVENTORY_RESULT.md
  runs/shared/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1/40_COSMILE_WUC_INVENTORY_POINTER.md
TESTS: contract `vitest run scripts/o1_inventory_contract.vitest.ts` 32/32 · concurrency `python3 scripts/o1_inventory_concurrency.dbtest.py` 28/28 · WU-0 migration regression 54/54 · full suite 271/271
BUILD_LINT_TSC: NOT_RUN (no worktree node_modules; forbidden prisma-generate for WU-0 models)
CHECKOUT/PAYMENT/RUNTIME_CONNECTED: NO · SCHEMA/MIGRATION/DEPENDENCY/PRISMA_CHANGED: NO
IMPLEMENTATION_PUSHED: NO · REVIEWER_DISPATCHED: NO · NEXT_WORKUNIT_STARTED: NO
GOOGLE/TOSS/PROVIDER/NETWORK/REAL_DB/SECRET/PII/RUNTIME_ACTIVATION: NONE
RETURN_TO: foundation-advisor
STOP
```
