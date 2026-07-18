# WU-E — Cosmile Order Lifecycle, Recovery, Record-Only Fulfillment, and Operator Control

```text
MISSION_ID: COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1
WORKUNIT: WU-E
FROM: foundation-advisor
TO: cosmile
ROLE: Cosmile repository-owner Worker
MODE: BOUNDED_NON_PRODUCTION_IMPLEMENTATION
REQUIRED_SKILL: /fable-builder
REQUIRED_MODEL: Opus 4.8 (1M)
REQUIRED_EFFORT: max
RETURN_TO: foundation-advisor
```

## 1. Admission and reviewed base

Proceed only if all values match exactly before editing:

```text
REPOSITORY: /home/leo/Project/.worktrees/Cosmile/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1
BRANCH: implementation/cosmile-o1-korea-golden-commerce-v1-20260717
REQUIRED_HEAD: b344889428971f6baa7208ea3e76858de0c9fc8b
REQUIRED_UPSTREAM_HEAD: b344889428971f6baa7208ea3e76858de0c9fc8b
REQUIRED_AHEAD_BEHIND: 0/0
REQUIRED_TRACKED_STATE: CLEAN
```

This base is the final WU-B candidate after same-Reviewer delta-review 2 PASS, published at foundation-docs `36a30f2055adb4a2ed0d5928ec228be0e46f43b8`.

Re-read and obey:

- current Agent Office operating model and Worker role;
- Cosmile `AGENTS.md` and `CLAUDE.md`;
- committed implementation job package and scope ledger;
- reviewed design `runs/shared/COSMILE_O1_KOREA_GOLDEN_COMMERCE_DESIGN_READINESS_V1/80_ADVISOR_INTEGRATED_DESIGN_CANDIDATE.md`;
- repository-local technical design `runs/shared/COSMILE_O1_KOREA_GOLDEN_COMMERCE_DESIGN_READINESS_V1/60_COSMILE_REPOSITORY_LOCAL_TECHNICAL_DESIGN.md`;
- WU-A, WU-B, WU-C, and WU-D final reviewed evidence.

Any branch/HEAD/upstream/tracked-drift mismatch, unapproved path need, or reviewed-design contradiction requires STOP and return to the Advisor. Preserve all pre-existing untracked files untouched.

## 2. Exact write allowlist

Only these paths may be created or modified:

```text
app/prisma/schema.prisma
app/prisma/migrations/20260718060000_o1_order_lifecycle_record_only/migration.sql
app/prisma/migrations/20260718060000_o1_order_lifecycle_record_only/down.sql
app/src/lib/order/contracts.ts
app/src/lib/order/repository.ts
app/src/lib/order/service.ts
app/src/lib/order/stepUp.ts
app/scripts/o1_order_lifecycle.vitest.ts
app/scripts/o1_order_lifecycle.dbtest.py
```

No route, page, component, existing payment/inventory/auth/snapshot file, package, generated client, lockfile, configuration, or unrelated path may change. If a route/UI change or another path is necessary, STOP with exact evidence; do not expand silently.

## 3. Frozen implementation boundary

Implement the narrowest non-production WU-E library/persistence lane that composes the already-reviewed WU-A through WU-D contracts. It must not call Google, Toss, Foundation, a courier, or any other network/provider.

### 3.1 Additive record-only shipment substrate

Add only one additive `ShipmentRecord`-equivalent entity and its `Order` relation, sufficient for one record-only O1 fulfillment projection per order:

- opaque internal ID;
- unique order relation;
- closed status: `pending | preparing | shipped | delivered`;
- optional bounded carrier category;
- optional bounded opaque tracking reference;
- created/updated timestamps;
- no address, name, phone, raw PII, provider payload, credential, courier endpoint, webhook, or delivery worker.

Raw SQL migration invariants must include closed status, bounded text, unique order, and the rule that `shipped`/`delivered` cannot be represented without a non-empty tracking reference. The migration is additive and non-production only, has a fail-closed `down.sql`, and must rehearse forward/down/forward on a disposable local PostgreSQL instance. No shared/real/target DB.

Do not add a second order, payment, refund, inventory, reconciliation, incident, identity, or audit truth table. Reuse the WU-0 entities. Use `ConsoleAuditLog` only through WU-E's own fail-closed transactional repository path; do not call the existing fail-open `writeAdminAudit` helper.

### 3.2 Atomic captured-order bind

Implement one idempotent order-scoped transaction that converts already-durable WU-B capture truth into the internal order/inventory projection:

1. acquire the per-order advisory transaction lock;
2. load the exact order, non-empty lines, captured `PaymentIntent`, and exactly one succeeded capture bound to that order/amount/KRW;
3. lock the order's reservation rows;
4. require complete exact aggregate reservation coverage for every non-null, positive-quantity order line;
5. after verified capture, accept only `reserved` rows for the first commit; do not release or expire them because wall-clock TTL elapsed after the provider request;
6. atomically transition all exact reservations `reserved -> committed`, set `committedAt`, project the order to existing spine status `paid`, set `paidAt`, and append one monotonic `OrderStatusHistory` row;
7. expose customer status `ORDER_CONFIRMED` while retaining the existing database `paid` projection for compatibility;
8. an exact replay over an already coherent paid/committed/history state is a zero-write idempotent result;
9. a partial, conflicting, missing, over-covered, released, expired, already-incompatible, wrong-order, wrong-amount, non-KRW, or non-succeeded-capture state must fail closed with zero false success;
10. a captured-but-not-internally-coherent state must open/reuse category-only `captured_internal_pending` reconciliation evidence; never re-charge and never report a conclusive payment failure.

Do not create another provider effect, mutate the immutable capture row, infer truth from a client/webhook/timer, or bypass the reviewed WU-B/WU-C invariants.

### 3.3 Refund-to-order projection and inventory HOLD

Implement an idempotent internal finalization boundary after WU-B has already verified and durably recorded a complete full refund:

- re-read exact succeeded capture + succeeded full refund + `Refund.status='refunded'` under the order lock;
- require a verified step-up authorization decision for the refund action;
- project `Order.status -> refunded` and append history/audit atomically;
- exact replay is zero-write idempotent;
- any incomplete/partial/ambiguous/mismatched refund remains HOLD/reconciliation, never `refunded`;
- all inventory reservations remain `committed`; sellable stock restoration is `HOLD` by default;
- never restore stock automatically and never invent a return/restock policy.

### 3.4 Fail-closed step-up boundary

Implement a provider-neutral injected verifier interface for exactly these sensitive action categories:

```text
refund
stock_adjustment
order_recovery
```

Requirements:

- default verifier state is `UNCONFIGURED` and denies every action;
- only an explicit verified, current, action-bound verdict may authorize;
- bind the verdict to action category, operator role/reference, order or SKU scope, reason category, and bounded freshness/nonce reference;
- do not implement or invent MFA, OIDC step-up, password, token, certificate, credential custody, provider, endpoint, session upgrade, or secret storage;
- expose an adapter satisfying WU-B's existing `AuthorizationVerdictPort` for the refund action without modifying WU-B files;
- expose the same fail-closed decision lane for future stock adjustment and WU-E order recovery, but do not implement a stock-adjustment mutation;
- record only category-safe transactional audit evidence; default-denied/unconfigured actions cause zero product mutation/provider call.

### 3.5 Recovery and reconciliation

Implement bounded, explicit functions only; no scheduler, timer, poller, route, queue, or background process:

- retry the atomic captured-order bind only after `order_recovery` step-up authorization;
- open/reuse order-scoped category-only reconciliation when capture/refund truth exists but internal projection is incomplete;
- resolve a reconciliation item only in the same transaction that proves the repaired internal state;
- unknown state stays open/HOLD;
- no IDs, hashes, raw provider references, PII, secrets, or payloads in returned evidence.

### 3.6 Record-only fulfillment and safe projections

Implement deterministic state transitions:

```text
pending -> preparing -> shipped -> delivered
```

Rules:

- only a coherent paid order may enter fulfillment;
- no skips, regressions, fabricated delivery, or unknown state;
- shipped/delivered require a bounded opaque tracking reference already recorded by an authorized operator path;
- no courier/tracking provider integration and no claim that delivery was externally verified;
- exact replay is idempotent;
- append category-safe history/audit transactionally;
- customer projection is owner-scoped by an injected verified owner reference and returns only opaque `orderNo`, safe lifecycle categories, timestamps, line-safe display snapshots, and tracking only when shipment is `shipped`/`delivered`;
- operator projection requires an injected owner/admin authorization and returns bounded operational categories without provider/payment identifiers, identity claims, secrets, or raw PII;
- no live route/UI is activated in WU-E. WU-F/G may exercise these DTOs in synthetic harnesses later.

## 4. Tests and evidence

Add focused deterministic tests with positive and adjacent-negative coverage for:

- exact atomic capture/order/reservation/history commit;
- one-line and multi-line/duplicate-SKU aggregate coverage;
- replay, collision, partial state, wrong amount/currency/order/capture, released/expired/missing/over/under reservation;
- race/concurrency: one coherent commit, no duplicate history/effect;
- provider-captured/internal-failure reconciliation and step-up-gated recovery;
- refund finalization, replay, mismatch/partial/unknown HOLD, inventory remains committed;
- default-unconfigured and denied step-up for refund/stock-adjustment/order-recovery; explicit verified test-only verdict works only for its exact binding;
- audit failure rolls back the sensitive mutation;
- shipment transition matrix, tracking requirement, replay, regression/skip rejection;
- customer ownership denial and operator role denial;
- category-safe/no-secret/no-PII serialization;
- restart-safe behavior from durable rows only.

Required verification, using already-present dependencies only:

```text
cd app
npx vitest run scripts/o1_order_lifecycle.vitest.ts
npx vitest run
python3 scripts/o1_order_lifecycle.dbtest.py
python3 scripts/o1_payment_repository.dbtest.py
python3 scripts/o1_inventory_concurrency.dbtest.py
python3 scripts/o1_golden_commerce_migration.dbtest.py
```

The WU-E DB test must use an already-local PostgreSQL image/process, tmpfs or equivalent disposable data, no host/public port, synthetic rows/credentials only, no image pull/network, and blocking cleanup verification. Inspect effective DB/endpoint/provider/credential variables without printing values. Capture Git status before/after. Do not run Prisma generation, dependency installation, build, real provider calls, or any test whose target cannot be proven disposable and local.

## 5. Commit and durable result discipline

Create one additive local candidate commit on the exact reviewed base. Do not amend, rebase, squash, force-push, or push before independent review. The candidate must contain only the exact allowlisted paths.

Write Worker-authored durable evidence only to:

```text
runs/shared/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1/70_COSMILE_WUE_RESULT.md
runs/shared/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1/70_COSMILE_WUE_POINTER.md
```

Evidence must include exact parent/candidate SHA, path/numstat ledger, migration identity and forward/down/forward result, commands/counts/status, cleanup proof, invariant matrix, default-fail-closed proof, residual unknowns, credential-dependent limits, product-repository status, and explicit confirmation that WU-F/G and Controlled Live did not start.

Return to `foundation-advisor` and STOP. Do not dispatch the Reviewer or begin WU-F/G.

## 6. Immediate stop conditions

STOP and return evidence if any of the following is required:

- path outside the allowlist;
- route/UI/runtime activation;
- Prisma generation or dependency/package change;
- real/shared/target DB or external network/provider;
- secret, credential, real identity, real payment, or customer PII;
- live authentication/step-up mechanism selection;
- stock-restoration policy or automatic restoration;
- courier/tracking integration;
- payment/refund semantic change outside the reviewed WU-B contract;
- broad rewrite of the existing order/checkout/admin spine;
- production, Controlled Live, Paid Beta, public sale, Foundation AI, SIASIU AI, Memory V3, or another WorkUnit;
- inability to reach honest non-production WU-E evidence within the frozen claim ceiling.
