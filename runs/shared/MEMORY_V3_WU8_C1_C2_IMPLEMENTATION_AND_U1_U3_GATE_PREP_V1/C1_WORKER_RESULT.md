# WU8-C1 — Cosmile Commerce-Evidence Delivery Schema — Worker Result

```text
MISSION_ID: MEMORY_V3_WU8_C1_C2_IMPLEMENTATION_AND_U1_U3_GATE_PREP_V1
WORK_UNIT_ID: WU8-C1
ROLE: Cosmile repository-owner Worker  ·  RESPONSIBLE_ADVISOR: foundation-advisor  ·  RETURN_TO: foundation-advisor
ACTUAL_MODEL: Opus 4.8 (1M context)  ·  EFFORT: high  ·  SKILL: /fable-builder (anchor-first, tests-before-code, smallest safe diff)
DESIGN_COMMIT: 08dc39dcc76b595c4b4fe8fc8f0e24b9bffedf9b  ·  DESIGN_SHA256 VERIFIED: 2213262a68f8a2034a118190937d16502dc00b987efd0ad89bd268e0468a17de
BASELINE_COMMIT: f26fa5ced7083bb8d0af00bda2a54951923ea22f
CANDIDATE_COMMIT (LOCAL, NOT PUSHED): ad172db403065fc8e498a1e80cdd347034ea7c48  (parent f26fa5c)
```

## 1. Summary

Implemented only reviewed-design §7.1 / §4.1 / §3.4: additive, evidence-only commerce-evidence delivery
durability schema on `FoundationSignalOutbox`, its fail-closed forward migration and backfill, the replaced
`FSO_evidence_row_chk`, two indexes, a fail-closed non-destructive down gate, and one focused disposable-Postgres
migration test. Delivery remains inert — no sender/consumer/delivery/endpoint/broker/timer/network exists and the
future kill switch `COSMILE_COMMERCE_EVIDENCE_DELIVERY_ENABLED` stays OFF. One local candidate commit was created
and NOT pushed. Design SHA-256 verified before any code. No independent PASS / final approval is claimed.

## 2. Exact path delta (4 — all ∈ ALLOWED_PRODUCT_PATHS)

```text
app/prisma/schema.prisma                                                                 (M) +14 lines only (9 cols + 2 indexes + comments; reverted an accidental full-file prisma-format churn to keep smallest diff)
app/prisma/migrations/20260716090000_wu8_commerce_evidence_delivery/migration.sql        (new)
app/prisma/migrations/20260716090000_wu8_commerce_evidence_delivery/down.sql             (new)
app/scripts/wu8_commerce_evidence_delivery_migration.dbtest.py                           (new)
```
Working tree otherwise carries only the six pre-existing preserve docs (untracked, byte-untouched, unstaged).
Zero unauthorized path changed.

## 3. What was implemented (anchored to the design)

- **Nine additive nullable columns** (§7.1 step 2), all NULL for non-evidence rows: `evidenceDeliveryState`,
  `evidenceAttemptCount`, `evidenceNextAttemptAt`, `evidenceLeaseExpiresAt`, `evidenceLeaseVersion`,
  `evidenceLastFailureCategory`, `evidenceAcknowledgedAt`, `evidenceCompletedAt`, `evidencePayloadBytes`.
- **Two indexes** (§7.1 step 4): `(signalType,evidenceDeliveryState,evidenceNextAttemptAt,createdAt)` and
  `(signalType,rootEvidenceId,createdAt,id)`.
- **Preflight (fail-closed)** (§7.1 step 1): asserts M2 A/B evidence schema present, no evidence payload
  > 32,768 bytes, no unknown evidence status; raises otherwise.
- **Deterministic evidence-only backfill** (§7.1 step 3): adverse-hold OR currently blocked → `blocked`;
  other pending → `contained`; sent → `acknowledged`; failed → `dead_lettered`; attempt/version 0;
  `evidencePayloadBytes = octet_length(payloadJson)`. Generic status is aligned to the §4.1 mapping (a
  blocked delivery state must carry generic `status='blocked'`); generic (non-evidence) rows are untouched.
- **Replaced `FSO_evidence_row_chk`** (§7.1 step 4): preserves the M2 minimization/identity/retention checks and
  adds — eight named states; nonnegative `attemptCount`/`leaseVersion`; `evidencePayloadBytes` in `1..32768`;
  lease-expiry only in `leased`; retry-time only in `retry_wait`; ack-time only in `acknowledged`; completed-time
  only in terminal states; failure category in the closed delivery list (`payload_malformed`, `payload_too_large`,
  `lease_expired`, `authority_unavailable`, `receiver_unavailable`, `retry_exhausted`, `ancestor_not_committed`,
  `backpressure`, `ack_malformed`) or null; the §4.1 generic-status↔delivery-state mapping; `sentAt` non-null only
  for `acknowledged`; and all nine columns NULL for non-evidence rows.
- **Fail-closed down** (§7.1): aborts unless every evidence row is pristine (`contained|blocked`, zero attempts,
  no ack/reject/dead-letter/lease/retry transition); otherwise drops only the additive columns/indexes/check and
  restores the exact M2 `FSO_evidence_row_chk`. Never deletes or rewrites an outbox row.

## 4. Tests-first evidence and results

- Test-first: the migration test was authored before finalizing the migration; the migration was iterated until
  every oracle passed. TEST_MEANING honored — the test protects additive compatibility, deterministic backfill,
  constraint closure, generic-row preservation, zero loss, and fail-closed rollback; no existing contract was
  weakened.
- **`wu8_commerce_evidence_delivery_migration.dbtest.py` → PASS, 28/28.** Disposable `postgres:16-alpine` via
  `docker exec` (Unix socket inside the container; tmpfs data dir — no named/persistent volume; NO published host
  port; NO image pull; synthetic data only). Covered: forward apply; zero row loss (5→5); deterministic backfill
  (`ev_adv`→blocked/blocked, `ev_non`→contained/pending, `ev_blk`→blocked/blocked); attempt/version default 0;
  `evidencePayloadBytes = octet_length` within 1..32768; generic rows keep all nine columns NULL and unchanged
  status; constraint rejections (non-evidence-with-delivery-col, unknown state, bytes 0, bytes 32769, negative
  count, lease-in-non-leased, retry-in-non-retry, unknown category, status/state mismatch); valid closed category
  accepted on a terminal row; down ABORTS fail-closed on non-pristine (attempt>0) leaving schema/rows intact; down
  SUCCEEDS on pristine, dropping the nine columns, preserving all rows, restoring the M2 constraint (verified it
  again rejects evidence `status='sent'`); forward/down/forward preserved all rows. Evidence is counts/categories/
  booleans only.
- **`m2_ab_migration_rehearsal.dbtest.py` → SKIP_INFRA (exit 2).** Unchanged and not in this allowlist; it is
  psycopg2-gated and host psycopg2/psql are absent (install would be a forbidden dependency/network). Honest SKIP,
  not PASS. The M2 A/B evidence-row constraint regression is nonetheless exercised by the WU8 test above, which
  builds the exact M2 baseline `FSO_evidence_row_chk` and verifies down restores it byte-for-contract.
- `npx prisma validate` → valid. (`prisma format` was intentionally reverted after it reformatted the whole file,
  to keep the schema diff to the 14 WU8 lines.)

## 5. Ephemeral DB containment + cleanup (mandatory)

```text
process/container identity category: disposable docker container, name wu8c1_ephemeral_<pid>, image postgres:16-alpine (already-local; no pull)
creation method: docker run -d --tmpfs /var/lib/postgresql/data (RAM data dir; NO named/persistent volume), POSTGRES_HOST_AUTH_METHOD=trust + synthetic password, NO -p (no host port)
containment: reached only via `docker exec` → Unix socket inside the container; loopback/host port = none; external network = none; image pull = none; data = synthetic only
shutdown / data-dir / credential removal: `docker rm -f` (tmpfs data vanishes with the container); transient synthetic credential lives only in the removed container env
post-cleanup absence verified: docker ps -aq -f name=^wu8c1_ephemeral_<pid>$ → empty (container absent)
no unrelated process/container/volume/file was altered or deleted
```

## 6. Zero forbidden access / boundary

```text
SENDER/CONSUMER/DELIVERY/ENDPOINT/BROKER/TIMER/NETWORK/PROVIDER: NONE ADDED
FEATURE_ACTIVATION: NONE (delivery kill switch OFF; producer B-flag unchanged)
SHARED/STAGING/PROTECTED/PRODUCTION/LIVE DB OR DATA: NONE (disposable local only)
RAW PAYLOAD/ID/USER-HASH/SECRET/DSN/PASSWORD/PII/CUSTOMER/ORDER/PAYMENT/ENV-DUMP/RAW-EXCEPTION: NONE in evidence (counts/categories/booleans only)
FOUNDATION/SIASIU/FOUNDATION-CONTROL/UNRELATED FOUNDATION-DOCS WRITES: NONE
NEW AGENT/SUB-AGENT · REVIEWER DISPATCH · SELF-REVIEW · NEXT WORKUNIT · C2: NONE
GENERIC SIGNAL SEMANTICS: UNCHANGED (backfill WHERE signalType='cosmile.commerce_evidence' only; generic rows keep all nine columns NULL, status/payload intact)
COMMIT: LOCAL CANDIDATE ad172db (NOT pushed; origin/shadow still f26fa5c)  ·  HISTORY REWRITE / FORCE PUSH: NONE
```

## 7. Proved / not proved · residual risk

- Proved (disposable DB): additive compatibility, deterministic backfill, constraint closure, generic-row
  preservation, byte length, zero data loss, fail-closed down (abort + pristine success + M2 restoration),
  forward/down/forward, and cleanup.
- Not proved: `prisma migrate` runner integration on a full multi-table DB (the test builds a faithful
  FoundationSignalOutbox M2 baseline and drives raw SQL, which fully exercises the WU8 delta); production/live
  behavior (out of scope, flags OFF). `m2_ab_migration_rehearsal.dbtest.py` remains a psycopg2-gated SKIP.
- Residual: none within scope. Down after any real delivery is intentionally logical (flags OFF + code rollback),
  not destructive schema down, per §7.1; the backfill's status alignment for adverse-hold/blocked evidence rows is
  a one-way normalization consistent with the §4.1 mapping (zero row/payload loss).

## 8. Independent-review attack questions

1. Can a generic (non-evidence) row ever set any of the nine delivery columns, or does `FSO_evidence_row_chk`
   force all nine NULL for `signalType <> 'cosmile.commerce_evidence'`?
2. Does the backfill ever change a generic row (WHERE clause is evidence-only), and does the adverse-hold status
   normalization to `blocked` preserve every row/payload with zero loss?
3. Can down succeed after any acknowledged/rejected/dead-lettered/leased/retry transition or nonzero attempt, or
   does the gate abort fail-closed and leave schema+rows intact?
4. Is every constraint rule (8 states, 1..32768 bytes, conditional times, closed categories, status↔state mapping)
   independently rejected by a targeted negative case in the test?

## 9. Completion status

```text
FOUR-OR-FEWER ALLOWED PRODUCT PATHS CHANGED: YES (exactly 4)
FOCUSED MIGRATION TEST: PASS (28/28)   ·   M2 A/B MIGRATION REGRESSION: covered by WU8 test (M2 constraint baseline+restore); m2 rehearsal SKIP_INFRA (psycopg2 absent)
FORWARD/DOWN/FORWARD EVIDENCE: COMPLETE   ·   CLEANUP: VERIFIED (container absent)
GENERIC SIGNAL SEMANTICS UNCHANGED: YES   ·   ZERO UNAUTHORIZED PATH CHANGED: YES
CANDIDATE COMMIT RECORDED (NOT PUSHED): ad172db
RETURN_TO: foundation-advisor   ·   PROPOSED_NEXT_ACTOR: foundation-advisor (independent PASS + push routing; then C2)   ·   STOP_AFTER_RETURN: true
```

Not an independent PASS or final approval. Return only the compact pointer to foundation-advisor and STOP.
