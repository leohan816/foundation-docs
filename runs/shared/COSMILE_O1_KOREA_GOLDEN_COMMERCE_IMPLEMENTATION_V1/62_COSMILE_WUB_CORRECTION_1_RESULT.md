# COSMILE WU-B Correction Cycle 1 — Result (WUB-F1 + WUB-AF1/AF2/AF3)

```text
MISSION_ID: COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1
WORKUNIT: WU-B-CORRECTION-1
ACTOR: cosmile (Cosmile repository-owner Worker)   MODEL/EFFORT: Opus 4.8 (1M) / max   SKILL: /fable-builder
HANDOFF: advisor/jobs/.../handoffs/62_COSMILE_WUB_CORRECTION_1_HANDOFF.md @ foundation-docs 7ec0ebc
FULL_REVIEW: runs/shared/.../61_COSMILE_WUB_IMPLEMENTATION_REVIEW.md @ cce4bb50 (NEEDS_PATCH)
STATUS: COMPLETE — all four findings closed; one additive local correction commit; NOT pushed
RETURN_TO: foundation-advisor
```

## 1. Heads / lineage (additive; no amend/rebase/squash/force)

```text
OLD_REVIEWED_CANDIDATE (parent):  d17a0926e8d4bc2ba02cf275ce7a25baedb2dd01   (WU-B full-reviewed head)
NEW_CORRECTION_CANDIDATE (HEAD):  e1cfc4ad8a99c0365c0d8f72b0ed2a3f8a6c5515   (parent verified == OLD)
BRANCH: implementation/cosmile-o1-korea-golden-commerce-v1-20260717
UPSTREAM_BASE: 2733bfd (WU-D)   ahead/behind: 2 / 0 (WU-B + this correction, BOTH unpushed)   PUSH: NOT_PUSHED (withheld pending same-Reviewer delta PASS)
```

Preamble live-verified before edit: same Worker/session/model/effort/`/fable-builder`; Cosmile HEAD==`d17a0926` clean
1-ahead/0-behind of upstream `2733bfd`; foundation-docs HEAD==pin `7ec0ebc` with handoff 62_ byte-identical; full
review 61_ @ `cce4bb50`.

## 2. Exact diff scope (eight reviewed WU-B paths ONLY; numstat d17a092→e1cfc4a; 588 insertions / 101 deletions)

```text
41   6  app/src/lib/payment/contracts.ts        AF1 input reshape + IntentRow.providerIntentRef + claim already_captured + stuck-query port/types
12   0  app/src/lib/payment/tossV2.ts           deriveProviderIdempotencyKey (deterministic versioned SHA-256 derivative)
61  10  app/src/lib/payment/repository.ts        AF2 claimed-key capture · AF1 already_captured claim · F1 stuck queries (exclusion+null+order) · active-task openOrReuse
56  21  app/src/lib/payment/service.ts           AF1 durable-seed derivation + already_captured no-call · F1 ensure-recovery on every ambiguous outcome + prepareStuckRecovery
35  28  app/src/lib/payment/webhook.ts           AF3 internal-state-bound serverVerifyWebhook (durable intent read + allowed state + persisted-only verified)
270 28  app/scripts/o1_payment_contract.vitest.ts  service/webhook/stuck-recovery over the faithful FakeRepo
14   2  app/scripts/o1_toss_v2_adapter.vitest.ts    deriveProviderIdempotencyKey properties
99   6  app/scripts/o1_payment_repository.dbtest.py disposable-PG mirror of AF2/AF1-claim/F1-stuck + restart-safety
```

No existing/schema/migration/client/package/route/checkout/order/inventory/catalog/auth/Foundation/SIASIU/control/
runtime/provider/credential path changed. No dependency added. `git status` after run: only these 8 files (symlink removed).

## 3. Finding → code/tests

### WUB-F1 — durable stuck-state recovery (Reviewer, LOW) — CLOSED
- `service.ts`: every ambiguous/non-conclusive confirm outcome now ensures a category-only `capture_confirming` task
  and leaves the intent `authorizing` — timeout / provider_error / unsupported (→ confirming), malformed (→ unknown),
  post-2xx binding/amount mismatch, still-pending IN_PROGRESS/READY/WAITING, and CANCELED/PARTIAL_CANCELED. ONLY clean
  DONE (→ captured) and conclusive ABORTED/EXPIRED (→ not_captured) are zero-task.
- Bounded restart-safe recovery surface (no timer/route/scheduler): `contracts.ts` `findStuckIntents`/`findStuckRefunds`
  (validated limit 1..500 + caller cutoff; exact stuck states; deterministic `ORDER BY updatedAt, id`; **exclude a
  candidate whose order already has an ACTIVE open|in_progress matching task**; intents also require **orderId IS NOT
  NULL**; failures→closed `error`, bad bounds→`invalid_bounds`) + `repository.ts` impl + `prepareStuckRecovery` pure
  decision returning **counts only** (`tasksEnsured` = opened OR reused; no id/sql/payload/hash/provider detail leaves).
- Restart-safety proven: limit=1 passes drain distinct rows oldest-first without starvation or duplicate tasks; a
  null-order/legacy row never occupies the bounded page; in_progress excludes+reuses; resolved permits a new open; a
  reconciliation-open failure leaves the durable stuck row discoverable so a later bounded pass ensures the task.

### WUB-AF1 — deterministic provider idempotency + true replay zero-effect (Advisor) — CLOSED
- `tossV2.ts` `deriveProviderIdempotencyKey(scope, seed)` = `tk1_<scope>_<sha256(scope+seed)>` — deterministic,
  versioned, bounded, distinct from the seed (a plain SHA-256 digest, NOT an HMAC — needs no secret), never logged/emitted.
- The confirm key is seeded by the **durable PaymentIntent.id** (persisted+claimed before the provider call), so it is
  byte-identical across ambiguous authorizing retries even when the caller VARIES `captureIdempotencyKey` (now only the
  internal PaymentTransaction dedup). The refund key is seeded by the durably-created Refund internal key. A durably
  captured intent replay returns the existing verified-capture proof with ZERO further provider request (new closed
  claim result `already_captured`; `authorizing` same-key retry re-contacts Toss with the identical derived key).

### WUB-AF2 — repository capture enforces the claimed paymentKey (Advisor) — CLOSED
- `repository.ts` `recordVerifiedCapture` loads `providerIntentRef` with the intent and requires
  `providerIntentRef === input.providerTxnRef` before any insert OR idempotent result; a null/different reference fails
  closed with zero write — proven by a direct-repository bypass attempt (unclaimed/different ref → conflict).

### WUB-AF3 — webhook pull-verify binds durable current intent state (Advisor) — CLOSED
- `webhook.ts` `serverVerifyWebhook({providerEventId, intentId})` reads the durable PaymentIntent/Order binding (incl.
  `providerIntentRef`) via the repository — never caller-supplied — queries Toss for the bound paymentKey, and marks the
  inbox verified only when the provider truth matches the exact internal `{orderNo, amount, KRW, paymentKey}` AND the
  intent is in an explicitly allowed state (authorizing|captured) AND the inbox terminal state actually persists.
  Stale/missing/unclaimed/wrong-state/mismatch/repo-failure → unresolved or quarantined with zero money/order/refund
  effect; untrusted status + digest-only/raw-free persistence retained.

## 4. Verification (commands / counts / meaning; already-present deps + proven-safe symlink)

```text
LINK:  ln -s /home/leo/Project/Cosmile/app/node_modules app/node_modules  (gitignored; REMOVED after → ABSENT)
RUN1:  npx vitest run scripts/o1_toss_v2_adapter.vitest.ts scripts/o1_payment_contract.vitest.ts → 2 files, 57 passed / 0 failed  (was 40)
RUN2:  npx vitest run → 17 files, 390 passed / 0 failed  (was 373; +17; no regression; no prior oracle weakened)
RUN3:  python3 scripts/o1_payment_repository.dbtest.py → 53 passed / 0 failed · exit 0 · cleanup BLOCKING+verified
         (disposable postgres:16-alpine, tmpfs, no host port, docker exec only, synthetic creds; removed=True absent=True)
RUN4:  python3 scripts/o1_inventory_concurrency.dbtest.py (WU-C payment-proof boundary) → 28 passed / 0 failed · cleanup verified
RUN5:  python3 scripts/o1_golden_commerce_migration.dbtest.py (WU-0 regression) → 54 passed / 0 failed · cleanup verified
```

Test meaning: the pure adapter/service/webhook + stuck-recovery vitests prove every fail-closed direction + the new
invariants over fakes; the disposable-PG dbtest is a parity-true plpgsql mirror of the DB-level operations (AF2
claimed-key capture, AF1 already_captured claim, F1 stuck queries + bounded-pass restart-safety). Evidence is
counts/categories/booleans only — no raw payload, real reference, secret, PII, or customer data; the derived provider
key is never emitted (no-leak test unchanged and passing). Preserved all prior passing oracles; tests were only
strengthened/expanded to prove these four findings.

Residual compile/runtime unknown (honest): typecheck/build **NOT_RUN** — the generated Prisma client predates WU-0 and
`prisma generate` is forbidden, so `repository.ts` compile+runtime is a declared deploy-time unknown, NOT PASS evidence;
its invariants are mirror-proven by RUN3.

## 5. Containment

Exactly the eight WU-B paths (numstat §2); no route/network/secret/provider/credential/runtime activation; checkout,
routes, UI, order lifecycle, inventory commit/release, operator console, and provider process remain UNCONNECTED. No
`console.*`/`process.env`/`fetch`/`http`/secret patterns in the payment src. `.next` absent. Symlink removed after tests.
No Reviewer dispatched; no WU-E/F/G started.

## 6. Remaining observations (non-blocking; carried)

- **O-B1** `repository.ts` compile/runtime unverified (pre-WU-0 generated client; deferred to a generation-authorized gate).
- **O-B2** refund provider reference binds the parsed `cancels[].transactionKey`; an absent shape opens refund reconciliation (durable recovery) rather than binding the paymentKey — deferred exact-shape confirmation.
- **O-B3** operator authorization identity/policy + refund/return/restock policy are Leo/WU-E-owned (default-deny here).
- **O-B4** a reservation may expire between the atomic claim and the external provider confirm landing — inherent to external I/O, contained at WU-E's reservation-commit boundary, not by a second WU-B charge.

```text
ROLE_RESULT: NEEDS_PATCH → PATCH_APPLIED (all four findings closed in-scope)
RE_REVIEW: same Reviewer, delta-only d17a0926..e1cfc4ad
CANDIDATE_PUSH: WITHHELD   RETURN_TO: foundation-advisor   STOP (no Reviewer dispatch; no WU-E/F/G)
```
