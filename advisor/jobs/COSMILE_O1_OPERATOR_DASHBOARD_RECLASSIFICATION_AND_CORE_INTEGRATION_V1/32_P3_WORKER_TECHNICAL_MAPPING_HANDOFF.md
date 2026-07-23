# P3 Worker Technical Mapping Handoff

MISSION_ID: `COSMILE_O1_OPERATOR_DASHBOARD_RECLASSIFICATION_AND_CORE_INTEGRATION_V1`
PHASE: `P3_REPOSITORY_LOCAL_TECHNICAL_MAPPING`
ACTOR: existing Cosmile Worker
SESSION: `cosmile:claude.0`
MODEL/EFFORT: Claude Opus 4.8/xhigh
SKILL: `/fable-builder`
APPLICABLE_REFERENCE: `contract-to-code-mapping` only
RETURN_TO: `foundation-advisor`

## Pinned state

- Product worktree: `/home/leo/Project/.worktrees/Cosmile/COSMILE_O1_OPERATOR_DASHBOARD_RECLASSIFICATION_AND_CORE_INTEGRATION_V1`
- Branch/HEAD: `implementation/cosmile-o1-operator-dashboard-core-v1-20260723` / `33bf8162f0725fb514dfb9ac32c29fddb12b9df4`
- Docs worktree: `/home/leo/Project/.worktrees/foundation-docs/COSMILE_O1_OPERATOR_DASHBOARD_RECLASSIFICATION_AND_CORE_INTEGRATION_V1`
- Docs branch: `advisor/cosmile-o1-operator-dashboard-core-v1-20260723`
- Result path: `advisor/jobs/COSMILE_O1_OPERATOR_DASHBOARD_RECLASSIFICATION_AND_CORE_INTEGRATION_V1/33_P3_WORKER_TECHNICAL_MAPPING_RESULT.md`

## Authority

Read-only technical mapping only. `PRODUCT_WRITE: PROHIBITED`.
Do not run tests, build, typecheck, DB, provider, runtime, migration, install, generate, commit, or push.
Write only the exact docs result path above and leave it uncommitted.

The permanent destination is one independent Korean-first Console. `/o1/operator/**` and legacy Console order/write/chat surfaces are transition or retirement evidence, not competing permanent consoles. Do not propose deletion or redirects in this mission.

The implementation ceiling is only the reviewed O1 operational views/actions:

- order/request queue and detail;
- payment and full Toss TEST refund truth;
- shipment-record and tracking-record truth;
- inventory reservation/commit/HOLD truth with no automatic sellable restoration;
- customer cancellation/support request processing;
- reconciliation status and protected recovery action;
- immutable-subject operator authorization, step-up, nonce, idempotency, and audit evidence.

Price, listing, event, AI collaboration, automation, advanced analytics, marketing/reviews, Agent Control Center, and every discovered feature are `DEFERRED` and nonfunctional. No route, form, save, mutation, sample output, or fake live data may be proposed for them.

## Exact evidence ceiling

Read only:

1. `설계자료/COSMILE_O1_독립운영콘솔_통합설계서.md`
2. P1 result `21_P1_WORKER_CENSUS_RESULT.md`
3. P2 result `31_P2_DESIGNER_CANDIDATE_RESULT.md`
4. the exact P1-cited Console/O1 source files needed to ground the mapping:
   - `app/src/app/console/layout.tsx`
   - `app/src/components/console/ConsoleNav.tsx`
   - `app/src/app/console/admin/page.tsx`
   - `app/src/components/console/AdminControls.tsx`
   - `app/src/components/console/AdminOpsV2.tsx`
   - `app/src/app/o1/operator/page.tsx`
   - `app/src/app/o1/operator/orders/[orderId]/page.tsx`
   - `app/src/components/commerce/O1OperatorPanel.tsx`
   - `app/src/app/api/o1/operator/orders/route.ts`
   - `app/src/app/api/o1/operator/orders/[orderId]/route.ts`
   - `app/src/app/api/o1/operator/orders/[orderId]/refund/route.ts`
   - `app/src/app/api/o1/operator/orders/[orderId]/shipment/route.ts`
   - `app/src/app/api/o1/operator/orders/[orderId]/support/route.ts`
   - `app/src/app/api/o1/operator/reconciliation/route.ts`
   - `app/src/app/api/admin/orders/[orderId]/status/route.ts`
   - `app/src/lib/runtime/o1CommerceRuntime.ts`
   - `app/src/lib/runtime/o1ReliabilityRuntime.ts`
   - `app/src/lib/runtime/o1LegacyLaneIsolation.ts`
   - the nearest existing focused contract test files referenced by those exact modules, but only by filename and relevant test blocks.

If a required fact lies outside this list, return `HOLD: PATH_NEEDED` with the exact path and question. Do not expand.

## Required result

Return a compact mapping, not implementation:

1. exact proposed Console routes/components and reused O1 server contracts;
2. module-by-module WorkUnits, each with exact product path ceiling and exact behavior;
3. tests-first focused RED/GREEN acceptance cases and exact focused command per WorkUnit;
4. one bounded final integration gate only if materially necessary, with justification;
5. permissions/action matrix proving no Console-session bypass of O1 allowlist/step-up/nonce/idempotency/audit;
6. legacy/mock collision disposition and transition treatment without deletion;
7. schema/migration effect (`NONE` required; otherwise STOP);
8. economic-authority effect (`NONE`; reuse existing authority only);
9. rollback by commit/WorkUnit;
10. explicit exclusions and STOP conditions.

Keep the result within 80 lines unless one named safety issue requires a declared length exception. Do not approve the design or self-review.

RETURN_TO: `foundation-advisor`
STOP.
