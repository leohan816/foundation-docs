# M1A Worker Result — Minimal Additive Request Schema

MISSION_ID: COSMILE_O1_CUSTOMER_CANCELLATION_AND_MINIMUM_OPERATOR_QUEUE_V1
MODULE: M1A_REQUEST_SCHEMA_AND_MIGRATION · ACTOR: Cosmile Worker · MODEL: Opus 4.8/max
ANCHORS: handoff blob 2ac47fe0 SHA256 4abd3fd8 (docs commit e0dfcec) · design blob eb8ed882 SHA256 43f7e7f5 (PRODUCT_BASE 788c84a). Both verified byte-exact before work.

## Exact delta (4 product paths only; no 5th path)
1. app/prisma/schema.prisma (M, +18/-1): add model OrderServiceRequest {id cuid; orderId @unique; kind; status @default requested; idempotencyKey @unique; requestedAt/updatedAt @db.Timestamptz(6); resolvedAt? ; order @relation onDelete:Restrict; @@index([status,requestedAt])} + Order.serviceRequest back-relation (virtual) + PaymentIntent.status comment synced +cancelled.
2. app/prisma/migrations/20260721120000_o1_order_service_request/migration.sql (new): CREATE TABLE + PK + FK RESTRICT + 2 unique indexes + (status,requestedAt) index + closed kind_chk(3) + closed status_chk(6) + resolved_chk; then DROP/ADD PaymentIntent_status_chk widened +cancelled.
3. .../down.sql (new): fail-closed DO$$ (abort if any OrderServiceRequest row OR any PaymentIntent status='cancelled') → restore original six-status CHECK → DROP TABLE only.
4. app/scripts/o1_order_service_request_migration.dbtest.py (new): disposable-PostgreSQL migration test.

## Contract mapping (handoff EXACT SCHEMA FREEZE = authority; design §4 was proposal-only)
Followed handoff verbatim: reasonCategory DROPPED (handoff L65 forbids any reason/free-text/PII/provider/payment/refund/inventory/shipment column). OrderServiceRequest has exactly the frozen 8 columns. No backfill/rename/destructive/default change. failed/expired NOT reinterpreted.

## RED → GREEN (tests-first, single disposable postgres:16-alpine; counts/categories only)
- RED (unchanged base, candidate absent): 33 pass / 23 FAIL, exit 1. Meaningful — live six-status CHECK actively REJECTS 'cancelled'; OrderServiceRequest absent; all kind/status/resolvedAt inserts, FK RESTRICT, (status,requestedAt) index, and both down fail-closed conditions unproven. Crash-free (no traceback after a robustness fix converting post-forward state-mutations from bare assert to tolerant+self-validating).
- GREEN (identical file, candidate present): 56 pass / 0 FAIL, exit 0. Every contract line flips: forward over non-empty base zero-row-loss, exactly-one-new-table, no new Order/PaymentIntent column, empty new table (no backfill), closed kind/status accept-all + reject-bogus, resolvedAt both directions, one-request-per-order, idempotency uniqueness, FK RESTRICT bidirectional, widened 'cancelled' admitted while 6 originals admitted and bogus rejected, non-pristine down aborts (OSR-row case AND cancelled-PI case independently), pristine down restores original CHECK + drops only the table, forward→down→forward replay.

## Prisma validation
Precondition MET (canonical pinned CLI 6.19.3 present; package.json + package-lock.json byte-identical to /home/leo/Project/Cosmile/app). Ran offline focused `prisma validate` via canonical absolute CLI target (node …/prisma/build/index.js, no .bin symlink, no install/generate), synthetic closed-loopback DATABASE_URL. Result: "schema is valid", exit 0. No DB/network/install attempted.

## Schema effects / economic-provider effects
Durable representation only. Additive: +1 table, +1 widened CHECK value. NO runtime caller/UI/API/repository/service wiring. Economic/provider/refund/inventory/shipment/credential/secret/PII effects = 0 (none authored, none executed). No production/shared DB touched; all DB work on the disposable container.

## Cleanup
Every run: container force-removed in finally; post-cleanup absent=True; tmpfs data (no named/persistent volume); no host port (docker exec only); no password set/stored/referenced. No leaked container/volume/port after RED, GREEN, or the fixed re-run.

## Git / upstream
PRODUCT_BRANCH implementation/cosmile-o1-cancellation-operator-queue-v1-20260721 @ b1ba6d6fc5e20e190736fb33cdcfeec0dba25158 (base 788c84a). One explicit-path commit; pushed non-force; upstream == local. main untouched.

## Skill / references
/fable-builder — implementation-execution, contract-to-code-mapping, test-design-before-code, implementation-report-template. Mapping table completed with no empty rows (no contract gap).

## Residuals / not proven here
- No runtime behavior, view-model, ownership/projection, atomic pre-capture txn, operator queue, or step-up — those are later modules (M1B+), Advisor-gated; remain BLOCKED pending Advisor inspection.
- dbtest proves the SCHEMA contract only, not runtime cancellation/refund behavior.
- serviceRequest ≤1-per-order + idempotency are structural (unique) invariants; runtime derivation of idempotencyKey value (design's o1sr_<orderId>) is out of M1A scope.
- No self-review verdict (Worker boundary). RETURN_TO: foundation-advisor.
