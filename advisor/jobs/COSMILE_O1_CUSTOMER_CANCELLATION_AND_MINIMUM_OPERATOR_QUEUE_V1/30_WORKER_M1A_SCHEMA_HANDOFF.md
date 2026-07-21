# Advisor Handoff — M1A Minimal Additive Request Schema

```text
MISSION_ID: COSMILE_O1_CUSTOMER_CANCELLATION_AND_MINIMUM_OPERATOR_QUEUE_V1
MODULE: M1A_REQUEST_SCHEMA_AND_MIGRATION
ADVISOR_VERDICT: PROCEED_WITH_LIMITS
ACTOR: existing Cosmile Worker
SESSION: cosmile:0.0
MODEL: Claude Opus 4.8
EFFORT: max
RETURN_TO: foundation-advisor

PRODUCT_REPOSITORY: /home/leo/Project/.worktrees/Cosmile/COSMILE_O1_CUSTOMER_CANCELLATION_AND_MINIMUM_OPERATOR_QUEUE_V1
PRODUCT_BRANCH: implementation/cosmile-o1-cancellation-operator-queue-v1-20260721
PRODUCT_BASE: 788c84a111a1cccba0b1f9fd17b98a34a0b0e322
PRODUCT_UPSTREAM: origin/implementation/cosmile-o1-cancellation-operator-queue-v1-20260721
DOCS_REPOSITORY: /home/leo/Project/.worktrees/foundation-docs/COSMILE_O1_CUSTOMER_CANCELLATION_AND_MINIMUM_OPERATOR_QUEUE_V1
DOCS_BRANCH: advisor/cosmile-o1-cancellation-operator-queue-v1-20260721
DESIGN_BLOB: eb8ed8823f2acd660f0e1d615bd929e09a779a97
DESIGN_SHA256: 43f7e7f5450fc5b6a0f51bab26f5eca66d73a15f8754cb88121381a55f2d05fc

AUTHORITY_DISPOSITION:
The Founder mission already authorizes the minimum additive isolated non-production schema/migration when current schema cannot represent the frozen scope. The Designer established REQUEST_SCOPE_NOT_REPRESENTABLE. This handoff freezes only that authorized minimum; no new Founder decision is required.

MANDATORY_READS:
- current Agent Office AGENTS.md, CLAUDE.md, TEAM_OPERATING_MODEL.md, roles/worker.md, RUN_PROTOCOL.md, RESULT_REPORTING_PROTOCOL.md;
- PRODUCT_REPOSITORY/AGENTS.md, CLAUDE.md, app/docs/testing/TEST_MEANING_POLICY.md;
- exact committed Designer document at PRODUCT_BASE;
- this exact committed handoff;
- only the directly relevant current schema and existing migration/dbtest patterns.

SKILL: /fable-builder
REFERENCES:
- implementation-execution
- contract-to-code-mapping
- test-design-before-code
- implementation-report-template only for the compact result

OBJECTIVE:
Add only the durable representation required for one closed service request per O1 order and a truthful pre-capture cancelled PaymentIntent status. No runtime caller, UI, provider, or economic behavior begins in M1A.

EXACT PRODUCT PATH CEILING:
1. app/prisma/schema.prisma
2. app/prisma/migrations/20260721120000_o1_order_service_request/migration.sql
3. app/prisma/migrations/20260721120000_o1_order_service_request/down.sql
4. app/scripts/o1_order_service_request_migration.dbtest.py

EXACT SCHEMA FREEZE:
- Add Order.serviceRequest as the virtual back-relation only.
- Add model OrderServiceRequest with exactly:
  id String @id @default(cuid());
  orderId String @unique;
  kind String;
  status String @default("requested");
  idempotencyKey String @unique;
  requestedAt DateTime @default(now()) @db.Timestamptz(6);
  updatedAt DateTime @updatedAt @db.Timestamptz(6);
  resolvedAt DateTime? @db.Timestamptz(6);
  order Order @relation(fields:[orderId], references:[id], onDelete:Restrict);
  @@index([status, requestedAt]).
- Closed kind CHECK: pre_capture_cancel | paid_unshipped_cancel | shipped_support.
- Closed status CHECK: requested | processing | accepted | refused | completed | recovery_hold.
- resolvedAt CHECK: required only for accepted/refused/completed; NULL for requested/processing/recovery_hold.
- Widen only PaymentIntent_status_chk to add cancelled to the existing six statuses. Do not reinterpret failed/expired.
- No reason/free-text/PII/provider/payment/refund/inventory/shipment column.
- No backfill, rename, destructive alteration, default change to existing data, or other object.

MIGRATION/DOWN:
- Forward creates only the new table, its two unique constraints, ordinary status/requestedAt index, FK RESTRICT, closed CHECKs, and the widened PaymentIntent status CHECK.
- Down fails closed if OrderServiceRequest has any row OR any PaymentIntent has status=cancelled. Only when pristine: restore the original PaymentIntent status CHECK, then drop only the new relation objects/table.

TESTS_FIRST_AND_DELTA_ONLY:
1. First create only the focused disposable PostgreSQL migration test.
2. Run its exact named case against the unchanged base and preserve meaningful RED.
3. Implement schema/forward/down.
4. Run the identical focused migration test and require GREEN.
5. Test forward on baseline data, closed kind/status/resolvedAt checks, one-request-per-order, idempotency uniqueness, FK RESTRICT, widened cancelled status, no backfill, fail-closed non-pristine down, and pristine down/forward replay.
6. Run exactly one focused Prisma validate only if the repository-pinned existing CLI is present and package.json/package-lock.json are byte-identical to /home/leo/Project/Cosmile/app. Use the absolute existing CLI, no symlink/install/generate; synthetic closed-loopback DATABASE_URL only. Any attempted DB/network/install or mismatch => STOP.

ALLOWED_RUNTIME:
- one disposable PostgreSQL container/DB with synthetic baseline only for the focused migration test;
- exact committed migrations plus candidate migration/down;
- unconditional teardown and port/process cleanup.

PROHIBITED:
- runtime/service/repository/API/UI behavior;
- provider/network/credential/secret/PII/economic/payment/refund/inventory/shipment action;
- production/shared DB, migration apply outside disposable DB, install, generate, build, typecheck, full suite;
- any fifth product path, broad cleanup/refactor, docs narrative, Actor dispatch, self-review, next module.

EXACT DOCS RESULT PATHS:
1. DOCS_REPOSITORY/runs/shared/COSMILE_O1_CUSTOMER_CANCELLATION_AND_MINIMUM_OPERATOR_QUEUE_V1/30_M1A_WORKER_RESULT.md
2. DOCS_REPOSITORY/runs/shared/COSMILE_O1_CUSTOMER_CANCELLATION_AND_MINIMUM_OPERATOR_QUEUE_V1/31_M1A_WORKER_POINTER.md

COMPLETION:
- one explicit-path product commit and non-force push;
- one explicit-path docs result/pointer commit and non-force push;
- result <=80 lines: exact delta, RED/GREEN, Prisma validation or exact skip/block, schema effects, cleanup, economic/provider effects 0, Git/upstream state, skill/references, residuals;
- return to foundation-advisor and STOP. M1B and all later modules remain blocked pending Advisor inspection.
```
