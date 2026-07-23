# Advisor Handoff — P1 Cosmile Technical Census

MISSION_ID: `COSMILE_O1_OPERATOR_DASHBOARD_RECLASSIFICATION_AND_CORE_INTEGRATION_V1`
PHASE: `P1_READ_ONLY_CENSUS`
ACTOR: existing Cosmile Worker
MODEL/EFFORT: `Claude Opus 4.8/xhigh`
SKILL: `/fable-builder`
REFERENCES: `contract-to-code-mapping`, `implementation-report-template`
PRODUCT_WRITE: `PROHIBITED`

## Exact workspace and output

- Product worktree:
  `/home/leo/Project/.worktrees/Cosmile/COSMILE_O1_OPERATOR_DASHBOARD_RECLASSIFICATION_AND_CORE_INTEGRATION_V1`
- Branch/base:
  `implementation/cosmile-o1-operator-dashboard-core-v1-20260723` /
  `1e2475a02b9210e382efde7740777684d0cb4dba`
- Docs worktree:
  `/home/leo/Project/.worktrees/foundation-docs/COSMILE_O1_OPERATOR_DASHBOARD_RECLASSIFICATION_AND_CORE_INTEGRATION_V1`
- Result path only:
  `advisor/jobs/COSMILE_O1_OPERATOR_DASHBOARD_RECLASSIFICATION_AND_CORE_INTEGRATION_V1/21_P1_WORKER_CENSUS_RESULT.md`

## Read ceiling and task

Read only:

- `app/src/app/console/**`, `app/src/components/console/**`,
  `app/src/lib/console/**`
- `app/src/app/admin/intelligence/page.tsx`, `app/src/app/api/admin/**`
- `app/src/app/o1/operator/**`, `app/src/app/api/o1/operator/**`,
  `app/src/components/commerce/O1OperatorPanel.tsx`
- `app/src/lib/runtime/o1CommerceRuntime.ts`
- `app/src/lib/{order,payment,inventory,auth}/**`
- `app/prisma/schema.prisma`
- directly corresponding `app/scripts/*console*`, `*operator*`, `*order*`,
  `*payment*`, `*inventory*`, `*reconciliation*`, and `*audit*` test sources
- `app/package.json` and `app/vitest.config.ts`

Inventory every dashboard menu, screen, card, component, API, route action,
data source/repository, mock/static fixture, authorization guard, and audit or
economic effect. Classify every row as exactly one of:

`CONNECTED | PARTIAL | MOCK | DUPLICATE | DEFERRED | RETIRE_CANDIDATE | UNVERIFIED`.

Return one compact matrix:

`surface_id | UI/API/path | current_data_source | source_owner | auth/action_authority | economic_effect | classification | evidence_path:line | reusable_contract | target_category | risk`.

Required evidence:

- exact counts by classification and kind;
- all console/admin/O1 operator collisions and duplicate actions;
- whether each high-risk refund, stock, recovery, shipment, and order mutation
  preserves or bypasses current O1 allowlist/step-up/nonce/audit/idempotency;
- which current screens are static/mock but look live;
- exact APIs/read models/components safe to reuse;
- schema disposition (`NONE_EXPECTED` unless direct evidence proves otherwise);
- minimum technical seams for the frozen O1-connected categories, without
  proposing product writes yet.

No code/config/schema/docs beyond the exact result file; no DB, test, build,
runtime, provider, secret/env, network, Git commit/push, or broad repository
inventory. Do not design the IA or choose final files/WorkUnits. Report <=80
lines plus the matrix. Read current Agent Office/Worker/run/result rules and
the `/fable-builder` references first. Return pointer to Advisor and STOP.
