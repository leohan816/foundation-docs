# 00 Intake - V3-11C2 Worker Brief

## Job

`20260709_v3_11c2_worker_brief`

## Leo/GPT Instruction Summary

Leo/GPT approved the V3-11C2 decision package and instructed Advisor to write Worker and review briefs for implementing the V3-11C2 Organic RecOutcomeEvent MVI.

This task is brief-writing only. It is not implementation work and does not modify runtime repos.

## Approved Decision Package

1. Scope: organic checkout MVI only.
2. Hook: `mock-complete` after `completeMockOrder` returns `justPaid=true`.
3. `recommendationId`: `null`.
4. `attributionMode`: `organic`.
5. RecOutcomeEvent ID: dedicated generator, `rec_out_v3_` + ULID(26).
6. Idempotency: code-level existing-check by `orderItemId`; no unique index in initial MVI.
7. Feature flag: `COSMILE_REC_OUTCOME_ENABLED`, default OFF.
8. Out of scope: direct/session/refund/reorder/semantic feedback/V3-11D/SIASIU/Foundation/schema migration/prod/live/main/secret.

## Goal

Create role-specific briefs:

- `02_WORKER_BRIEF.md` for the implementation Worker.
- `03_SENTINEL_REVIEW_BRIEF.md` for independent technical review.
- `04_SERVICE_REVIEW_BRIEF.md` for service/commerce semantics review.

## Non-Goals

- Do not implement V3-11C2.
- Do not modify Cosmile.
- Do not modify SIASIU.
- Do not modify foundation-control.
- Do not modify schema/migrations.
- Do not write DB data.
- Do not access prod/live/main/secret.

## Allowed Read

- `../foundation-docs/advisor/_system/AGENTS.md`
- `../foundation-docs/advisor/jobs/20260708_v3_11c2_decision_package/**`
- `../foundation-docs/advisor/jobs/20260708_cosmile_siasiu_code_structure_map/**`
- `../foundation-docs/docs/reports/control/COSMILE_MEMORY_V3_11C2_REC_OUTCOME_EVENT_GATE_PLAN_20260707.md`
- `../Cosmile` only as needed to identify exact implementation files

## Allowed Write

- `../foundation-docs/advisor/jobs/20260709_v3_11c2_worker_brief/00_INTAKE.md`
- `../foundation-docs/advisor/jobs/20260709_v3_11c2_worker_brief/01_ADVISOR_BRIEF.md`
- `../foundation-docs/advisor/jobs/20260709_v3_11c2_worker_brief/02_WORKER_BRIEF.md`
- `../foundation-docs/advisor/jobs/20260709_v3_11c2_worker_brief/03_SENTINEL_REVIEW_BRIEF.md`
- `../foundation-docs/advisor/jobs/20260709_v3_11c2_worker_brief/04_SERVICE_REVIEW_BRIEF.md`
- `../foundation-docs/advisor/jobs/20260709_v3_11c2_worker_brief/index.md`

## Initial Runtime Observations

- Current Cosmile branch observed during Advisor read: `shadow/m4-cosmile-memory`.
- The Worker must verify branch before implementation and STOP if on `main` or any live/prod branch.
- `mock-complete` currently emits `purchase_complete` only when `justPaid=true`.
- `completeMockOrder` returns `{ order, justPaid }` and includes `order.items`.
- `CartItem` and `OrderItem` have no `recommendationId`.
- `RecOutcomeEvent` schema exists and has no unique index on `orderItemId`.
