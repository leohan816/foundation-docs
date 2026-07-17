# Cosmile Worker Handoff — WU-C Inventory Reservation and Oversell Guard

```text
MISSION_ID: COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1
WORKUNIT: WU-C
ACTOR: cosmile
ROLE: Cosmile repository-owner Worker
REQUIRED_MODEL: Opus 4.8 (1M)
REQUIRED_EFFORT: max
REQUIRED_SKILL: /fable-builder
RETURN_TO: foundation-advisor
```

## Exact starting state and reviewed basis

```text
REPOSITORY: /home/leo/Project/.worktrees/Cosmile/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1
BRANCH: implementation/cosmile-o1-korea-golden-commerce-v1-20260717
EXPECTED_BASE_HEAD: e1dc39e6e0179c095e47695594b6ea3fec57d006
EXPECTED_UPSTREAM: origin/implementation/cosmile-o1-korea-golden-commerce-v1-20260717
EXPECTED_UPSTREAM_STATE: EQUAL_0_0
EXPECTED_WORKTREE_STATE: CLEAN
WU0_SCHEMA_HEAD: c559e7cd132e7b837dc38d01395f790499abb70d
WUA_FINAL_REVIEW_VERDICT: PASS
WUA_FINAL_REVIEW_COMMIT: dcc6a0fbd9e0714cda64c4eb0163c6ff23e25c09

REVIEWED_DESIGN_COMMIT: a1ac8016eba01d1ffef20836fe7f16ace3b591c5
INDEPENDENT_DESIGN_REVIEW_COMMIT: daacd8a69318315437cc33e124455baf6db93e91
INDEPENDENT_DESIGN_REVIEW_VERDICT: PASS
FOUNDER_SCOPE: WU-C inventory reservation/commit/release, policy-based restoration, default-deny oversell
```

Verify every pin and the same live actor/session/model/effort/workspace/skill before any edit. Read
the current repository rules, the canonical implementation design, and
`app/docs/testing/TEST_MEANING_POLICY.md`. Stop on mismatch, tracked drift, scope conflict, or an
unsafe runtime requirement. Preserve all reviewed history; no amend/rebase/squash/force-push.

## Exact implementation boundary

Implement the smallest non-production WU-C domain/repository lane on the already-reviewed WU-0
`CommerceSku.stock` and `InventoryReservation` schema.

### Required reservation contract

- reserve a positive quantity for one `{orderId, skuId}` with a bounded future TTL;
- reservation identity and repeat behavior are deterministic and idempotent;
- the same active `{orderId, skuId}` request with the same quantity returns the existing truth;
- a conflicting quantity or incompatible existing state fails closed;
- missing SKU, non-positive quantity, invalid/expired TTL, unknown state, or insufficient available
  stock returns a closed category and performs zero write;
- available inventory is computed from the locked SKU stock minus the sum of `reserved` and
  `committed` quantities;
- reservation creation is atomic under a per-SKU PostgreSQL row lock or equivalent reviewed
  serializing guard, so `reserved + committed <= stock` always holds for all writes through this lane;
- last-item concurrency produces exactly one winner and one `INSUFFICIENT_STOCK` loser, with no
  duplicate reservation and no oversell.

### Required transitions

- `reserved -> committed` only with an explicit verified-capture proof input;
- `reserved -> released` only with explicit conclusively-non-captured proof;
- `reserved -> expired` only after TTL and explicit conclusively-non-captured proof;
- unknown/confirming payment truth never releases or expires a reservation;
- repeated same transition is idempotent; incompatible, backward, or unknown transition fails closed;
- committing/releasing/expiring a missing reservation fails closed;
- no client, redirect, timer, webhook, or caller-provided label alone establishes payment truth.

### Restoration boundary

- refund/return/cancellation must never automatically restore sellable stock;
- default result is `HOLD` with zero stock mutation;
- any restoration-capable operation must require both explicit operator confirmation and a non-empty
  approved policy reference supplied by a later authorized operator lane;
- no policy, eligibility, return condition, quantity, or operator authority may be inferred here;
- if the existing schema cannot represent a safe bounded restoration contract without a new schema
  or policy decision, keep restoration as `HOLD` and record the exact later dependency rather than
  expanding WU-C.

### Isolation and non-activation

- implement library/repository contracts only; do not add or modify checkout, cart, payment, order,
  refund, route, UI, console, job, timer, scheduler, provider, or Foundation code;
- no endpoint or runtime activation;
- no schema or migration change; WU-0 is the fixed schema substrate;
- no dependency/lockfile change and no generated Prisma client commit;
- no Foundation judgment, suitability, Memory V3, SIASIU, US/USD, or non-ELT behavior.

## Exact allowed product paths

Only these new paths may be created:

- `app/src/lib/inventory/contracts.ts`
- `app/src/lib/inventory/repository.ts`
- `app/src/lib/inventory/service.ts`
- `app/scripts/o1_inventory_contract.vitest.ts`
- `app/scripts/o1_inventory_concurrency.dbtest.py`

No existing product path may change. If a necessary safe implementation requires another path,
schema change, migration, checkout connection, or broad refactor, stop and return exact evidence.

## Required implementation quality

- closed discriminated result categories; no permissive unknown/default success;
- integer/time/identifier bounds enforced before persistence;
- parameterized SQL only; no string interpolation for values and no unsafe raw query construction;
- transaction boundaries explicit; row lock acquired before aggregate availability check and insert;
- repository errors map to bounded categories without SQL text, payload, identifiers, PII, or secrets;
- deterministic clock/id generation injected for pure tests;
- category/status/count evidence only; no raw rows in mission artifacts;
- no destructive cleanup and no modification of existing processes, containers, volumes, or databases.

## Tests and disposable PostgreSQL safety

Unit/contract tests must cover positive and adjacent-negative behavior for every closed category and
transition, including idempotency, mismatched repeat, unknown states, proof requirements, TTL
boundaries, default-HOLD restoration, and repository error containment.

The concurrency test must use only an isolated disposable local PostgreSQL process already
available on the host, Unix-socket or loopback only, with synthetic rows and transient synthetic
credentials. External network and image pulls are forbidden. Reuse the proven WU-0 migration
rehearsal containment pattern, apply only the already-committed WU-0 migration to the disposable
database, exercise at least:

- last item: two concurrent reserve attempts, one winner/one loser;
- multi-quantity boundary and insufficient stock;
- idempotent same-request replay;
- aggregate `reserved + committed <= stock` after each scenario;
- commit only with verified-capture proof;
- release/expiry only with conclusive non-capture proof;
- unknown payment holds inventory;
- transaction rollback/error leaves no partial reservation;
- repeated transitions have zero duplicate effect.

Before running, inspect relevant effective DB/endpoint/credential environment without printing
values. Record process identity, creation method, socket/loopback containment, synthetic-only state,
exact commands, bounded counts/categories, shutdown, data-dir removal, transient credential removal,
post-cleanup process check, and pre/post Git status. Cleanup failure is blocking. Do not use a real,
shared, staging, protected, production, or live DB.

Run and record:

- focused WU-C Vitest contract suite;
- focused disposable PostgreSQL concurrency suite;
- existing WU-0 migration regression if the disposable fixture reuses it;
- the full safe Vitest suite;
- exact test counts/status, no-transport/no-route proof, and one-path-set containment proof.

Use already-present dependencies only. No install, provider, credential, customer data, real PII,
payment, external network, build, production, or live access.

## Commit, evidence, and stop

Create one candidate commit on the exact mission branch. Do not push before independent review PASS.
Do not begin WU-B/D/E/F/G.

Write only these foundation-docs artifacts for Advisor publication:

- `runs/shared/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1/40_COSMILE_WUC_INVENTORY_RESULT.md`
- `runs/shared/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1/40_COSMILE_WUC_INVENTORY_POINTER.md`

The result must include the exact candidate HEAD, base-to-candidate diff, all five path dispositions,
contract/result tables, test commands/counts, concurrency evidence, cleanup evidence, residual
unknowns, and confirmation that checkout/payment/runtime remain unconnected. Return to
`foundation-advisor` and STOP.
