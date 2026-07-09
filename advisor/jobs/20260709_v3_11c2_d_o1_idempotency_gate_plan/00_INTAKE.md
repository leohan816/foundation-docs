# V3-11C2-D-O1 Idempotency Gate Plan - Intake

Date: 2026-07-09

## Leo/GPT Instruction Summary

Prepare a decision package and gate plan for the `V3-11C2-D-O1 Unique Index / Idempotency Hardening Gate` before implementation.

The gate exists because V3-11C2 Organic RecOutcomeEvent MVI was approved only as a default-OFF shadow implementation. The accepted residual risk is that the current code-level existing-check by `orderItemId` is not race-safe under concurrent writes.

## Goal

Define how `RecOutcomeEvent.orderItemId` hard idempotency should be guaranteed before:

- `COSMILE_REC_OUTCOME_ENABLED` flag ON
- live/prod exposure
- production rollout
- operational use of RecOutcomeEvent writes

## Non-Goals

- No runtime source code edits.
- No schema or migration edits.
- No DB writes.
- No prod/live/main/secret access.
- No Worker, Sentinel, or Service Reviewer execution.
- No V3-11C2 runtime commit.
- No feature flag enablement.
- No Worker brief in this job.

## Required Inputs

- `../foundation-docs/advisor/jobs/20260709_v3_11_risk_gate_register_audit/01_ADVISOR_BRIEF.md`
- Current `../Cosmile/app/prisma/schema.prisma`
- Current V3-11B migration SQL under `../Cosmile/app/prisma/migrations/20260706120000_v3_11b_learning_commerce_memory/`
- V3-11B gate/evidence reports under `../foundation-docs/docs/reports/control/`
- V3-11C2 gate plan, final audit, closure record, and current Worker implementation evidence

## Source Notes

Advisor inspected:

- `RecOutcomeEvent` in `../Cosmile/app/prisma/schema.prisma`
- V3-11B migration SQL for `RecOutcomeEvent`
- Current V3-11C2 `recOutcomeEventService.ts` Worker implementation
- V3-11B evidence and V3-11C2 gate/final audit/closure documents

## Initial Assumptions

- `foundation-docs` reports are evidence/archive, not runtime source of truth.
- Current runtime behavior must be confirmed against actual code before any implementation Worker brief.
- Current `../Cosmile` V3-11C2 runtime diff remains uncommitted and must not be staged/committed by this Advisor job.
- Since `RecOutcomeEvent.orderItemId` is currently non-null and has an FK to `OrderItem`, a DB-level unique constraint is technically possible, but product semantics must decide whether one outcome row per order item remains the intended model.
