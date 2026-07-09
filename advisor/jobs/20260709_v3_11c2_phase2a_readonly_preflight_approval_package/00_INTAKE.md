# 00 Intake - V3-11C2 Phase 2A Read-Only Preflight Approval Package

Date: 2026-07-09

## Leo/GPT Decision Update

Leo/GPT reviewed the schema design review artifact and approved:

`KEEP_REC_OUTCOME_AS_SUMMARY_AND_PLAN_EVENT_LOG`

Official architecture direction:

1. Current `RecOutcomeEvent` is not an append-only event log.
2. Current `RecOutcomeEvent` is an order-item purchase outcome summary/current row.
3. `@@unique([orderItemId])` remains the hard invariant for the current table.
4. Future refund/cancel/reorder/attribution-change history belongs in a separate additive event log table, not multiple `RecOutcomeEvent` rows.
5. Raw commerce events remain in Cosmile.
6. Foundation does not own raw order/payment/customer data.
7. Foundation receives refined/whitelisted signals only.
8. Traceability should use `CommerceEvent.id`, `FoundationSignalOutbox.sourceEventId`, future `sourceCommerceEventId`, or a separate trace id.
9. Hybrid direction is now approved architecture direction, not merely a hypothesis.

## Task Goal

Update the Phase 2A read-only preflight approval package according to the approved summary-row invariant.

Phase 2A purpose must be limited to:

- If an approved target DB exists, verify the current `RecOutcomeEvent.orderItemId` uniqueness invariant read-only.
- Check duplicate blocker count.
- Inspect migration status/read-only.
- No writes, no migration deploy, no flag ON.

## Non-Goals

- Do not execute Phase 2A.
- Do not access any DB.
- Do not run any preflight query.
- Do not run migration deploy.
- Do not modify runtime source.
- Do not create event log table.
- Do not implement refund/cancel/reorder/direct/session attribution.
- Do not turn `COSMILE_REC_OUTCOME_ENABLED` ON.
- Do not create Worker handoff yet.

## Allowed Advisor Actions

- Read foundation-docs Advisor artifacts.
- Read previous schema review and Phase 2 decision package.
- Write foundation-docs Advisor artifact.
- Commit/push foundation-docs Advisor artifact.

## Forbidden Actions

- `../Cosmile` runtime edits.
- `../Cosmile` commit/push.
- DB access.
- Query execution.
- Migration execution.
- Secret access or output.
- Raw `DATABASE_URL` output.
- Vercel env access.
- Production/staging/live DB access.
- Phase 2A or Phase 2B execution.

## Required Source Artifacts

- `../foundation-docs/advisor/jobs/20260709_v3_11c2_commerce_memory_schema_design_review/01_SCHEMA_DESIGN_REVIEW.md`
- `../foundation-docs/advisor/jobs/20260709_v3_11c2_phase1_ephemeral_fresh_deploy_rehearsal/06_PASS_WITH_RISK_EXTRACT_AND_PHASE2_DECISION_PACKAGE.md`
- `../foundation-docs/advisor/jobs/20260709_v3_11c2_phase1_ephemeral_fresh_deploy_rehearsal/05_FINAL_AUDIT.md`

## Initial Classification

`DECISION_PACKAGE_ONLY`

No implementation or execution is authorized by this job.
