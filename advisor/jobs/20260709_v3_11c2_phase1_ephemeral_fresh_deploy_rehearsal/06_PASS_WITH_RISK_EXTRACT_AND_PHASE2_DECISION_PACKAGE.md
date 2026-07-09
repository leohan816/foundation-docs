# 06 PASS_WITH_RISK Extract and Phase 2 Decision Package

Date: 2026-07-09

## Status

`NEEDS_LEO_DECISION`

This artifact extracts the Phase 1 `PASS_WITH_RISK` basis and drafts a Phase 2 decision package only.

No runtime repo was modified. No DB was accessed. No preflight query was executed. No migration was executed. No flag was enabled.

## Required Source Reviewed

- `../foundation-docs/advisor/jobs/20260709_v3_11c2_phase1_ephemeral_fresh_deploy_rehearsal/05_FINAL_AUDIT.md`

Supporting evidence also reviewed:

- `../foundation-docs/runs/cosmile/20260709_v3_11c2_phase1_ephemeral_fresh_deploy_rehearsal/WORKER_RESULT.md`
- `../foundation-docs/runs/cosmile/20260709_v3_11c2_phase1_ephemeral_fresh_deploy_rehearsal/SENTINEL_REVIEW_RESULT.md`

## Phase 1 PASS_WITH_RISK Cause Summary

Phase 1 passed within the approved disposable PostgreSQL rehearsal scope.

The `PASS_WITH_RISK` label came from evidence and boundary limits, not from a blocking failure inside the approved Phase 1 scope:

1. The disposable DB was torn down after Worker execution, so Sentinel could not directly re-run or reproduce the original `prisma migrate deploy` output without violating the no-rerun handoff.
2. Advisor did not personally run teardown commands; Advisor accepted Worker teardown evidence plus Sentinel after-the-fact checks that no container or port residue remained.
3. Phase 2 real target DB preflight/deploy was explicitly outside Phase 1 and remains unapproved and unproven.

## Evidence Extraction

| Evidence item | Extracted result | Source | Advisor assessment |
|---|---|---|---|
| `prisma validate` | `valid` | Worker result §5; final audit completion table | PASS |
| `prisma generate` | Not reported in Phase 1 evidence | Worker result; final audit | NOT_REPORTED, non-blocking for Phase 1 because Phase 1 was a migration deploy rehearsal, not client generation validation |
| `prisma migrate deploy` | 3 migrations applied fresh in order: `00000000000000_init_postgres` -> `20260706120000_v3_11b_learning_commerce_memory` -> `20260709120000_v3_11c2_d_o1_rec_outcome_orderitem_unique` | Worker result §5; final audit | PASS_WITH_EVIDENCE_LIMIT because Sentinel could not re-run after teardown |
| `prisma migrate status` | Database schema reported up to date | Worker result §5 | PASS_WITH_EVIDENCE_LIMIT |
| `RecOutcomeEvent.orderItemId` unique constraint | `RecOutcomeEvent_orderItemId_key` UNIQUE btree present; duplicate same `orderItemId` rejected; distinct `orderItemId` accepted | Worker result §6; Sentinel result §4; final audit | PASS |
| Disposable DB disposal | Worker reported `docker rm -f`; Sentinel observed no matching container and no `:55433` listener | Worker result §7; Sentinel result §3; final audit | PASS_WITH_LIMIT because disposal was verified after the fact |
| No runtime file changes | Worker reported runtime unchanged; Sentinel reported read-only status unchanged; Advisor re-checked staged files none | Worker result §8; Sentinel result §3; final audit runtime state | PASS |
| No flag ON | Worker reported `COSMILE_REC_OUTCOME_ENABLED` OFF; Sentinel verified flag code remained default OFF | Worker result §8; Sentinel result §3; final audit | PASS |
| No real/staging/prod DB access | Worker reported disposable DB only; Sentinel reported no real/staging/prod/live DB access and did not re-run deploy | Worker result §4/§8; Sentinel result header; final audit | PASS |
| Secret / `DATABASE_URL` raw exposure | Worker reported synthetic password and no `.env` secret values; no raw real URL was reported | Worker result §4/§8; final audit | PASS |

## Risk Classification

Overall classification:

`NON_BLOCKING_EVIDENCE_GAP`

Rationale:

- No `BLOCKING_RISK` was found inside the approved Phase 1 scope.
- The missing `prisma generate` evidence is a non-blocking documentation/evidence gap for this specific Phase 1 migration rehearsal because the approved pass criteria did not require Prisma client generation.
- The non-reproducible original deploy output is a non-blocking evidence gap because the disposable DB was intentionally destroyed, Worker evidence was internally consistent, and Sentinel corroborated repo state, migration graph state, teardown residue, and equivalent D-O1 behavior.
- Real target DB preflight/deploy remains unapproved and therefore is not a Phase 1 failure. It is the next decision gate.

Because no `BLOCKING_RISK` was identified, this artifact proceeds with a Phase 2 decision package.

## Phase 2 Decision Package Draft

Phase 2 must be split into two separately approved steps.

### Phase 2A - Read-Only Target DB Preflight

Purpose:

- Verify whether the chosen non-prod target DB already contains duplicate non-null `RecOutcomeEvent.orderItemId` values.
- Confirm migration state without applying migrations.
- Confirm the target DB identity and environment are exactly the approved target.

Allowed only after Leo/GPT fills the required approval fields below.

#### Phase 2A Proposed Allowed Actions

- Connect to the explicitly approved target DB using a read-only or transaction-read-only role where possible.
- Run identity checks that do not expose secrets or raw customer/order/payment identifiers.
- Run duplicate preflight count query.
- Run migration status/read-only inspection if the tool and role do not write to the DB.
- Save result artifact under `../foundation-docs/runs/cosmile/<phase2a-job-id>/`.
- Return only `RESULT SUMMARY`, `NEXT ACTION ROUTING`, and `POINTER BLOCK` in chat.

#### Phase 2A Forbidden Actions

- No migration deploy.
- No DDL.
- No writes.
- No flag ON.
- No prod/live DB.
- No main merge.
- No operational use.
- No secrets printed in chat or result files.
- No raw `DATABASE_URL` printed.
- No raw customer IDs, order IDs, payment IDs, or full row dumps.

#### Phase 2A Draft Duplicate Preflight Query

```sql
SELECT COUNT(*) AS duplicate_order_item_id_groups
FROM (
  SELECT "orderItemId"
  FROM "RecOutcomeEvent"
  WHERE "orderItemId" IS NOT NULL
  GROUP BY "orderItemId"
  HAVING COUNT(*) > 1
) d;
```

Expected pass result:

```text
duplicate_order_item_id_groups = 0
```

If the result is greater than `0`, STOP. Do not run migration deploy. Return result to Advisor for Leo/GPT decision.

#### Phase 2A Target DB Identity Fields Leo/GPT Must Fill

- Target project: Cosmile
- Target environment label: `<non-prod only; exact label required>`
- Target DB alias/name: `<non-secret human-readable alias>`
- Target branch or deployment context: `<exact branch/context>`
- Target DB owner / approver: `<name or role>`
- Access method: `<how Worker obtains connection without exposing raw secret>`
- Allowed role: `<read-only preferred>`
- Execution machine/session: `<Cosmile Worker session or other approved execution location>`
- Explicit confirmation: not prod, not live, not staging if staging remains forbidden, not customer-facing
- Explicit confirmation: no raw secret or raw `DATABASE_URL` may be printed
- Backup requirement for Phase 2A: `<usually not required for read-only, but state policy>`

#### Phase 2A Stop Conditions

STOP and return to Advisor if:

- target DB identity cannot be verified;
- the approved environment label does not match observed environment;
- connection requires printing or exposing secrets;
- the role is not read-only and Leo/GPT did not explicitly approve that risk;
- duplicate preflight count is greater than `0`;
- migration status suggests unexpected migration history;
- any command would write to the DB;
- any prod/live/main/secret boundary is encountered.

### Phase 2B - Target DB Migration Rehearsal / Deploy Gate

Purpose:

- Apply the D-O1 migration to the explicitly approved non-prod target DB only after Phase 2A passes.
- Verify the unique index exists after deploy.
- Verify duplicate rejection using synthetic or approved non-customer test data only if safe.

Phase 2B requires separate Leo/GPT approval after Phase 2A result is reviewed.

#### Phase 2B Proposed Allowed Actions

- Use only the explicitly approved non-prod target DB.
- Confirm backup/snapshot or rollback path exists before deploy.
- Confirm Phase 2A duplicate preflight result is `0`.
- Run `prisma migrate deploy` only against the approved non-prod target DB.
- Run post-deploy migration status.
- Verify `RecOutcomeEvent_orderItemId_key` exists.
- Optionally run duplicate rejection smoke only with synthetic rows if Leo/GPT explicitly approves synthetic writes.
- Save result artifact under `../foundation-docs/runs/cosmile/<phase2b-job-id>/`.

#### Phase 2B Forbidden Actions

- No prod/live DB.
- No production migration.
- No flag ON.
- No main merge.
- No operational use.
- No broad data reads.
- No raw row dumps.
- No secrets or raw `DATABASE_URL` in chat or artifacts.
- No rollback execution unless Leo/GPT explicitly authorizes it for the exact failure case.
- No expansion into group-buy, refund, reorder, direct/session attribution, semantic feedback, V3-11D, SIASIU, or foundation-control.

#### Phase 2B Required Approval Fields

- Phase 2A result file and commit hash.
- Explicit approval that Phase 2A duplicate preflight was `0`.
- Target DB identity repeated and confirmed.
- Backup/snapshot identifier or rollback mechanism.
- Whether synthetic write smoke is allowed after deploy.
- Rollback decision owner.
- Exact allowed command list.
- Exact forbidden command list.
- Stop conditions and escalation target.

#### Phase 2B Stop Conditions

STOP and return to Advisor if:

- Phase 2A is missing or not `0`;
- target DB identity differs from approval;
- backup/rollback path is missing;
- migration status is unexpected;
- migration deploy fails;
- unique index is missing after deploy;
- duplicate rejection does not behave as expected;
- any secret/prod/live/main boundary is encountered;
- any command would broaden beyond approved scope.

## Secret Masking Policy

For both Phase 2A and Phase 2B:

- Never print raw `DATABASE_URL`.
- Never print passwords, tokens, hostnames if classified as secret, or credential-bearing URLs.
- Report only secret source labels, such as `DATABASE_URL source: approved secure local env`, without values.
- Mask any accidentally observed credential-like value before writing result artifacts.
- Do not include raw customer/order/payment IDs.
- Prefer aggregate counts and schema/index names only.

## Required Leo/GPT Decision Before Any Phase 2 Execution

Leo/GPT must decide whether to authorize Phase 2A.

If yes, Leo/GPT must provide:

1. exact non-prod target DB identity;
2. whether staging remains forbidden or is now explicitly allowed as the target;
3. approved access method that does not expose raw secrets;
4. approved read-only command list;
5. stop conditions;
6. result artifact location/job-id;
7. reviewer requirement after Phase 2A.

Phase 2B must not be authorized until Phase 2A result returns to Advisor and Leo/GPT explicitly approves Phase 2B.

## Advisor Recommendation

Do not proceed directly to migration deploy.

Recommended next decision:

`APPROVE_OR_REJECT_PHASE2A_READ_ONLY_PREFLIGHT`

If approved, Phase 2A should be read-only, non-prod only, secret-masked, and stopped immediately on any duplicate count greater than `0` or target identity mismatch.

## Proposed Future Job

If Leo/GPT approves Phase 2A, Advisor should create a separate job:

`../foundation-docs/advisor/jobs/<YYYYMMDD_v3_11c2_phase2a_target_db_readonly_preflight>/`

Do not create this job until Phase 2A is approved.
