# 01 Advisor Brief - V3-11C2 Phase 2A Read-Only Preflight Approval Package

Date: 2026-07-09

## Verdict

`PHASE2A_APPROVAL_PACKAGE_READY_NEEDS_LEO_DECISION`

This artifact updates the Phase 2A package using the approved hybrid architecture direction:

`KEEP_REC_OUTCOME_AS_SUMMARY_AND_PLAN_EVENT_LOG`

This is not a Worker handoff. It does not authorize DB access, query execution, migration deploy, flag ON, runtime edits, or operational use.

## Executive Summary

Leo/GPT has approved that current `RecOutcomeEvent` means:

`one current purchase outcome summary row per paid OrderItem`

The current table is not the future lifecycle event log. The hard invariant is:

`RecOutcomeEvent.orderItemId` is unique.

Therefore Phase 2A, if later approved, should be a read-only target DB preflight that checks whether the approved target DB is compatible with that invariant before any migration/deploy or flag discussion.

Phase 2A must not create the future event log table and must not broaden into refund/cancel/reorder/direct/session attribution.

## Official Architecture Decision Applied

Applied decisions:

1. `RecOutcomeEvent` is summary/current row, not append-only event log.
2. `@@unique([orderItemId])` stays as the current table's hard invariant.
3. Future history belongs in a separate additive event log table.
4. Raw commerce evidence remains in Cosmile.
5. Foundation receives refined/whitelisted signal only.
6. Traceability is maintained through source pointers such as `CommerceEvent.id`, `FoundationSignalOutbox.sourceEventId`, future `sourceCommerceEventId`, or a dedicated trace id.

## Phase 2A Status

`NOT_APPROVED_FOR_EXECUTION`

Phase 2A is not approved until Leo/GPT explicitly fills the approval fields in this package and returns an approval decision to Advisor.

## Phase 2A Narrow Purpose

If Leo/GPT later approves a target DB, Phase 2A exists only to verify:

1. The target DB is the exact approved non-prod/read-only target.
2. The current `RecOutcomeEvent.orderItemId` summary-row invariant is compatible with existing target DB data.
3. Duplicate blocker count is `0`.
4. Migration status/read-only inspection does not show an unexpected state.

Phase 2A does not prove operational readiness. It is a pre-deploy blocker check.

## Required Target DB Identity Fields

Leo/GPT must fill all of these before Advisor writes a Worker run prompt:

| Field | Required value |
|---|---|
| Target project | `Cosmile` |
| Target environment label | Exact non-prod label. Must not be prod/live. |
| Target DB alias/name | Non-secret human-readable alias only. |
| Target branch/deployment context | Exact branch or deployment context. |
| DB owner/approver | Name or role approving this target. |
| Access method | How Worker obtains the connection without printing raw secrets. |
| Role/permissions | Read-only preferred. If not technically read-only, Leo/GPT must explicitly approve the limitation and Worker must enforce transaction read-only where possible. |
| Execution session | Separate Cosmile Worker session. |
| Secret handling | Raw `DATABASE_URL`, tokens, passwords, hostnames if secret, and credential-bearing URLs must not be printed. |
| Data handling | No raw customer/order/payment IDs, no row dumps, counts only. |
| Reviewer requirement | Whether Sentinel must review the Phase 2A result before Phase 2B decision. Advisor recommendation: yes. |

## Phase 2A Allowed Actions After Approval

Only after Leo/GPT explicitly approves Phase 2A, Worker may:

- verify repo branch/HEAD only;
- connect to the exact approved target DB;
- use a read-only role or read-only transaction mode where possible;
- run target identity checks that do not expose secrets;
- run duplicate blocker count query;
- run read-only migration status/introspection commands if they do not write;
- write result artifact to `../foundation-docs/runs/cosmile/<phase2a-job-id>/WORKER_RESULT.md`;
- write Advisor pointer to `../foundation-docs/advisor/jobs/<phase2a-job-id>/11_WORKER_RESULT_POINTER.md`;
- commit/push foundation-docs result artifacts only.

## Phase 2A Forbidden Actions

Phase 2A must not:

- write to DB;
- run migration deploy;
- run DDL;
- create/drop/alter indexes;
- create event log table;
- insert synthetic rows;
- update/delete/merge existing data;
- turn `COSMILE_REC_OUTCOME_ENABLED` ON;
- access prod/live DB;
- access main branch for merge/deploy;
- access secrets in a way that prints them;
- print raw `DATABASE_URL`;
- print raw customer/order/payment IDs;
- dump rows;
- broaden into refund/cancel/reorder/direct/session/semantic/V3-11D;
- modify, stage, commit, or push runtime source.

## Duplicate Blocker Query Draft

The query should report aggregate count only:

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

Pass condition:

```text
duplicate_order_item_id_groups = 0
```

If the value is greater than `0`, STOP. Do not proceed to Phase 2B. Return the aggregate count to Advisor without raw row ids.

## Read-Only Migration Inspection

Phase 2A may inspect migration state only if the selected method is read-only.

Acceptable evidence examples:

- current applied migration names from a read-only metadata query;
- schema/index existence checks that do not mutate state;
- read-only ORM/SQL introspection if it does not write local or DB state.

Do not run `prisma migrate deploy`.

Do not run any command that creates, updates, deletes, locks for write, or records migration state.

If a tool's read-only behavior is uncertain, STOP and return to Advisor.

## Summary-Row Invariant Checks

Phase 2A should check only the approved current invariant:

`one paid OrderItem can produce at most one RecOutcomeEvent purchase outcome summary row`

Required read-only evidence:

1. Duplicate blocker count for non-null `orderItemId`.
2. Whether `RecOutcomeEvent_orderItemId_key` already exists.
3. Whether the D-O1 migration is already applied, pending, or unknown.
4. Whether any unexpected schema state conflicts with `@@unique([orderItemId])`.

Do not inspect future event-log requirements in Phase 2A.

## Stop Conditions

Worker must STOP and return result to Advisor if:

- target DB identity does not exactly match approval;
- environment appears prod/live/customer-facing;
- staging is encountered without explicit Leo/GPT approval;
- connection requires printing a raw secret;
- permissions are not read-only and no explicit exception exists;
- duplicate blocker count is greater than `0`;
- migration state is unexpected;
- any command would write to DB;
- any command would run migration deploy;
- any command would expose raw customer/order/payment IDs;
- any scope expansion is required.

## Phase 2A Result Requirements

Worker result must include:

- target DB identity label without secrets;
- branch/HEAD checked;
- confirmation no runtime source changes;
- confirmation no DB writes;
- confirmation no migration deploy;
- duplicate blocker count;
- migration state/read-only inspection result;
- whether unique index already exists;
- stop/pass verdict;
- next recommended actor: Advisor.

Worker chat output must not include the long result. It should include only:

- `RESULT SUMMARY`
- `NEXT ACTION ROUTING`
- `POINTER BLOCK`

## Sentinel Review Requirement

Advisor recommendation:

`SENTINEL_REVIEW_REQUIRED_AFTER_PHASE2A`

Reason:

Phase 2A touches target DB access boundaries even though it is read-only. Sentinel should verify:

- no write/deploy occurred;
- no secret/raw URL leaked;
- target DB identity matched approval;
- duplicate count evidence is aggregate-only;
- migration inspection was read-only;
- no runtime repo changes happened.

## Phase 2B Boundary

Phase 2B remains not approved.

Phase 2B requires a separate Leo/GPT decision after:

1. Phase 2A result returns to Advisor;
2. Sentinel reviews Phase 2A if required;
3. Leo/GPT accepts the target DB preflight result;
4. backup/rollback/deploy procedure is explicitly approved.

## Event Log Boundary

Future event log table is approved as architecture direction only.

This package does not approve:

- event log table creation;
- schema migration for event log;
- refund/cancel/reorder implementation;
- direct/session attribution implementation;
- summary projection worker;
- Foundation refined commerce signal contract changes.

## Advisor Recommendation

Recommended next decision:

`APPROVE_OR_HOLD_PHASE2A_READ_ONLY_PREFLIGHT`

If approved, Leo/GPT must fill the target DB identity and command boundaries above. Advisor should then write a separate Phase 2A Worker brief/run prompt.

If target DB identity or read-only access is not available, hold Phase 2A and do not route to Worker.

## Current Next Actor

Leo/GPT.

Do not send this package to Cosmile Worker, Sentinel, or Service Reviewer until Leo/GPT explicitly approves Phase 2A.
