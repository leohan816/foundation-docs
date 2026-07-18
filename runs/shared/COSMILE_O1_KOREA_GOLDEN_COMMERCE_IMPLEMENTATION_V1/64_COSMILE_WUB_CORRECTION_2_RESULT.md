# COSMILE WU-B Correction Cycle 2 — Result (WUB-AF4)

```text
MISSION_ID: COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1
WORKUNIT: WU-B-CORRECTION-2
ACTOR: cosmile (Cosmile repository-owner Worker)   MODEL/EFFORT: Opus 4.8 (1M) / max   SKILL: /fable-builder
HANDOFF: advisor/jobs/.../handoffs/64_COSMILE_WUB_CORRECTION_2_HANDOFF.md @ foundation-docs d8f1c361
PRIOR_DELTA_REVIEW: runs/shared/.../63_COSMILE_WUB_DELTA_REVIEW_1.md @ 86ce2fb (PASS)   FINDING: WUB-AF4 (Advisor final audit)
STATUS: COMPLETE — WUB-AF4 closed; one additive local commit; NOT pushed
RETURN_TO: foundation-advisor
```

## 1. Heads / lineage (additive; no amend/rebase/squash/force)

```text
PARENT (correction-1 candidate == upstream): e1cfc4ad8a99c0365c0d8f72b0ed2a3f8a6c5515
NEW_CORRECTION_HEAD:                          b344889428971f6baa7208ea3e76858de0c9fc8b   (parent verified == PARENT)
BRANCH: implementation/cosmile-o1-korea-golden-commerce-v1-20260717
UPSTREAM_HEAD: e1cfc4ad   ahead/behind: 1 / 0   PUSH: NOT_PUSHED (withheld pending same-Reviewer delta PASS)
```

Preamble live-verified before edit: same Worker/session/model/effort/`/fable-builder`; Cosmile HEAD==`e1cfc4ad` clean
0-ahead/0-behind of upstream `e1cfc4ad`; foundation-docs HEAD==pin `d8f1c361` with handoff 64_ byte-identical; prior
delta review 63_ @ `86ce2fb` PASS.

## 2. Exact diff scope (four allowed WU-AF4 paths ONLY; numstat e1cfc4ad→b344889; 231 insertions / 55 deletions)

```text
 6   2  app/src/lib/payment/contracts.ts            ReservationSnapshot → { complete } + activeReservationFor doc
41  24  app/src/lib/payment/repository.ts            orderFullyReserved() coverage helper + create/claim gates + diagnostic
108 18  app/scripts/o1_payment_contract.vitest.ts    FakeRepo multi-line model + WUB-AF4 matrix
76  11  app/scripts/o1_payment_repository.dbtest.py  order_fully_reserved() plpgsql mirror + OrderItem fixtures + matrix
```

NOT changed (verified): `service.ts`, `tossV2.ts`, `webhook.ts`, and every non-WU-B path. No schema, migration,
generated client, inventory implementation, payment service/adapter/webhook, route, checkout, order-lifecycle, package,
runtime, credential, provider, Foundation, SIASIU, or control change. `git status` after run: only these 4 files
(node_modules symlink removed).

## 3. Finding WUB-AF4 — complete reservation set before any payment effect — CLOSED

Defect: the reservation gate (`activeReservationFor`, `createActionableIntent`, `claimIntentForConfirm`) checked only
whether ONE live reservation existed (`LIMIT 1`), so for a multi-line order one reserved line could admit a provider
confirm while another line was missing/expired/under-quantity/null-SKU/uncovered.

Correction (`repository.ts` `orderFullyReserved(runner, orderId)` — a single parameterized-SQL query, run on the SAME
locked per-order transaction as the create/claim state transition):
1. the order exists and has ≥1 `OrderItem`;
2. NO line has a null `skuId`;
3. NO line has `quantity <= 0` (Advisor adjacency: zero/negative required quantity and an empty order fail closed);
4. required quantity is aggregated by `(orderId, skuId)`;
5. for EVERY required SKU the aggregate order quantity is EXACTLY covered by live `reserved` inventory
   (`status='reserved' AND expiresAt > now()`) — under, over, missing, expired, released all fail;
6. `committed` reservations do NOT count (a committed hold cannot authorize a fresh OR authorizing payment effect);
7. extras: the coverage is anchored on the REQUIRED set (LEFT JOIN required→reserved), so an extra reserved SKU not
   tied to any order line cannot compensate for a missing/under-covered required line (narrowest deterministic
   treatment — no cleanup/restoration);
8. any gap → `reservation_required` with ZERO provider call and ZERO intent-state advance.

Wiring: `createActionableIntent` gates on it before success; `claimIntentForConfirm` re-checks it inside the final
atomic claim immediately before any Toss request on BOTH the fresh `action_required→authorizing` and the `authorizing`
retry paths; the `captured` replay path is UNCHANGED (WUB-AF1 zero-provider-call — no reservation recheck).
`activeReservationFor` is now a preflight/diagnostic that reports the same complete-set meaning (`{ complete }`); the
transactional create/claim checks remain the authoritative gates. No client/browser assertion establishes completeness.
All prior reviewed behavior (server-authoritative orderNo/amount/KRW binding, paymentKey claim, one-active-intent,
deterministic provider idempotency, webhook verification, refund, reconciliation, stuck-recovery) is preserved.

## 4. Verification (commands / counts; already-present deps + proven-safe symlink)

```text
LINK:  ln -s /home/leo/Project/Cosmile/app/node_modules app/node_modules  (gitignored; REMOVED after → ABSENT)
cd app
RUN1:  npx vitest run scripts/o1_payment_contract.vitest.ts → 51 passed / 0 failed  (was 44; +7 WUB-AF4)
RUN2:  npx vitest run → 17 files, 397 passed / 0 failed  (was 390; +7; no regression; no prior oracle weakened)
RUN3:  python3 scripts/o1_payment_repository.dbtest.py → 71 passed / 0 failed · exit 0 · cleanup BLOCKING+verified
         (disposable postgres:16-alpine, tmpfs, no host port, docker exec only, synthetic creds; removed=True absent=True)
RUN4:  python3 scripts/o1_inventory_concurrency.dbtest.py (WU-C payment-proof boundary) → 28 passed / 0 failed · cleanup verified
RUN5:  python3 scripts/o1_golden_commerce_migration.dbtest.py (WU-0 regression) → 54 passed / 0 failed · cleanup verified
```

The disposable-PG rehearsal is a parity-true plpgsql mirror (`order_fully_reserved`) of the coverage query over the
same positive/negative matrix (one/two-line exact, partial, expired, under, over, null-SKU, committed, released,
extra-only, zero/negative order-line quantity, empty order, aggregate duplicate lines, and the claim-time recheck that
loses coverage after intent creation → reservation_required with zero advance). No schema is modified (the unchanged
WU-0 migration is re-applied and RUN5 confirms it). Evidence is counts/categories/booleans only. Typecheck/build
remains honestly NOT_RUN (pre-WU-0 generated Prisma client; `prisma generate` forbidden) — `repository.ts`
compile/runtime is a declared deploy-time unknown, mirror-proven by RUN3.

Zero excluded authority: no Reviewer dispatched, no push, no WU-E/F/G started; no policy/risk acceptance; provider
network, credential, secret, real DB, and runtime remain untouched.

## 5. Residual (non-blocking; carried)

- `repository.ts` compile/runtime unverified (pre-WU-0 generated client; generation-authorized gate deferred).
- Prior O-B2/O-B3/O-B4 observations unchanged (refund cancel-ref shape; operator/refund policy Leo/WU-E-owned; claim→
  external-confirm reservation-expiry window contained at WU-E's commit boundary).

```text
ROLE_RESULT: WUB-AF4 closed in-scope
RE_REVIEW: same Reviewer, delta-only e1cfc4ad..b344889
CANDIDATE_PUSH: WITHHELD   RETURN_TO: foundation-advisor   STOP (no Reviewer dispatch; no WU-E/F/G)
```
