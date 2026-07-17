# Cosmile Worker Handoff — WU-0 Additive Schema Baseline

```text
MISSION_ID: COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1
WORKUNIT: WU-0
ACTOR: cosmile Worker
SESSION: cosmile
REQUIRED_MODEL: Opus 4.8 (1M)
REQUIRED_EFFORT: max
REQUIRED_SKILL: /fable-builder
ROLE: Cosmile repository-owner Worker
RETURN_TO: foundation-advisor
```

## Required reads

Read current Agent Office operating model, Worker role, run/result protocols, Cosmile root and
app `AGENTS.md`/`CLAUDE.md`, security/env/testing policies, this exact committed handoff, and:

- `runs/shared/COSMILE_O1_KOREA_GOLDEN_COMMERCE_DESIGN_READINESS_V1/60_COSMILE_REPOSITORY_LOCAL_TECHNICAL_DESIGN.md`
- `runs/shared/COSMILE_O1_KOREA_GOLDEN_COMMERCE_DESIGN_READINESS_V1/80_ADVISOR_INTEGRATED_DESIGN_CANDIDATE.md`
- `runs/shared/COSMILE_O1_KOREA_GOLDEN_COMMERCE_DESIGN_READINESS_V1/90_INDEPENDENT_DESIGN_REVIEW.md`
- `advisor/jobs/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1/00_ADMISSION_AND_AUTHORITY_RECORD.md`

## Exact repository gate

```text
REPOSITORY: /home/leo/Project/.worktrees/Cosmile/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1
BRANCH: implementation/cosmile-o1-korea-golden-commerce-v1-20260717
START_HEAD: b8b61d746e2bdbb8d7ab26405bf44fb665ad87a6
UPSTREAM: MAY_BE_UNSET_BEFORE_REVIEW
```

Stop on any mismatch or unexpected state.

## Authorized implementation

Implement only the reviewed WU-0 additive schema realization and disposable migration rehearsal:

- `CustomerAccount`, `AuthIdentity`, `CustomerSession`;
- `PaymentIntent`, `PaymentTransaction`, `Refund`;
- `InventoryReservation`, `WebhookEventInbox`;
- `OrderStatusHistory`, `ReconciliationTask`, `Incident`;
- `FoundationProductSnapshot`, `SkuBinding`;
- additive nullable `Order.order_no` and necessary relations;
- additive nullable `OrderItem.foundationSnapshotRef`;
- reviewed unique, partial-unique, CHECK, append-only, and default-deny invariants in migration SQL;
- idempotent deterministic backfill behavior for existing non-production order rows;
- fail-closed `down.sql`/rollback gate;
- disposable fresh PostgreSQL forward/down/forward rehearsal;
- product-repository implementation design document before schema/code, without changing the
  independently reviewed contract.

No Google, Toss, runtime route, business service, UI, or feature activation belongs to WU-0.
Feature flags remain OFF/default-deny.

## Exact allowed product paths

```text
app/prisma/schema.prisma
app/prisma/migrations/20260717180000_o1_golden_commerce_baseline/migration.sql
app/prisma/migrations/20260717180000_o1_golden_commerce_baseline/down.sql
app/scripts/o1_golden_commerce_migration.dbtest.py
app/docs/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_DESIGN.md
app/docs/FEATURE_INDEX.md
```

If another product path is necessary, stop and return the exact necessity. Do not broaden scope.

## Runtime safety

- Use only an isolated disposable local PostgreSQL process or already-local container/image.
- No external network or image pull; no shared/staging/protected/production/live DB.
- Synthetic rows only. Do not print connection strings or credentials.
- Do not install dependencies.
- Record pre/post Git state, instance identity category, forward/down/forward bounded counts,
  shutdown and cleanup status.
- If safe rehearsal cannot be proved, report `NOT_RUN_SAFETY_UNPROVEN` rather than weakening it.

## Completion

- Run the focused WU-0 migration test and the exact applicable existing migration regressions.
- Explain protected contracts; do not chase green tests by weakening assertions.
- Stage only the six paths. Create one local candidate commit without amend/rebase.
- Do not push before independent review.
- Write only:
  - `runs/shared/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1/11_COSMILE_WU0_RESULT.md`
  - `runs/shared/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1/11_COSMILE_WU0_POINTER.md`
- Do not commit foundation-docs; Advisor publishes evidence.
- Return pointer to Advisor and STOP. Do not dispatch Reviewer or another actor.

## Strict exclusions

No real DB/data, Google/Toss/provider call, secret/env value, endpoint, payment, auth, inventory
runtime, catalog import, shipping, refund effect, Foundation/SIASIU change, production/live,
public exposure, main/protected merge, push before review, or next WorkUnit.
