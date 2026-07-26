# Worker handoff — visual-first Dashboard implementation

MISSION: `COSMILE_CORE_OPERATIONS_DASHBOARD_V1`
MODULE: `M5C_M5E_VISUAL_FIRST_IMPLEMENTATION`
PRODUCT_BASE: `fa90003d0ca84b01bbfe0bfa7206b447b6c8d546`
VISUAL_SOURCE: docs `d838a83d70d8ba1f44c00849e43c9fdc9ed38d73` / `109_DESIGNER_DASHBOARD_VISUAL_CANDIDATE.png`
VISUAL_GATE: `STRATEGY_VISUAL_PASS`
DESIGN_REVIEW: docs `2e2524b73ef8b5e540cb097f3f894f6c901d395d` / `112_INDEPENDENT_VISUAL_REVIEW.md`
REVIEW_VERDICT: `PASS_WITH_CORRECTIONS`, blocking `0`
MODEL_EFFORT: existing Cosmile Worker `Opus 5/xhigh`
SKILL: `/fable-builder`
REFERENCES: `implementation-execution`, `contract-to-code-mapping`, `test-design-before-code`, completion-only `implementation-report-template`

## Exact path ceiling

1. `app/src/components/operator/OperatorShell.tsx`
2. `app/src/app/dashboard/page.tsx`
3. `app/scripts/o1_core_dashboard_shell.vitest.ts`
4. `app/scripts/o1_core_dashboard_reads.vitest.ts`

No fifth path.

## Exact implementation

Match the accepted 1440×900 candidate using the existing four surfaces:

- permanent grouped 250px left desktop sidebar with `개요 / 커머스 / 운영 / 거버넌스`;
- Console / Dashboard / Lab remain the only top space switcher;
- explicit small-screen compact navigation below the desktop breakpoint only;
- root title `운영 대시보드`;
- existing orders, requests, and reconciliation reads reused exactly once as currently bounded;
- concise overview first; action queue one subordinate section; recent orders and fulfillment/support/reconciliation summaries;
- no primary raw enum token or developer evidence legend;
- `0건`, `확인 완료`, `현재 조회할 수 없음` (or `집계 조회 계약 없음`), `아직 구현되지 않음`, and distinct permission-denial copy;
- inactive/unsupported navigation remains inert and secondary;
- no new route, read, command, data, KPI, feature, backend, schema, DB, provider, authorization, or economic behavior.

Reviewer C1 is mandatory: `UNAVAILABLE` must use the non-promissory `현재 조회할 수 없음` or `집계 조회 계약 없음`; `NOT_IMPLEMENTED` must use `아직 구현되지 않음`. Keep both quiet/inert and visibly separate from `DENIED` and confirmed zero. Strategy's visual pass approved layout/hierarchy, not the misleading `준비 중` copy.

Reviewer C2 is mandatory: replace token-string oracles with stricter assertions that pin Korean truth copy and placement; do not merely delete assertions.

## Tests-first and command ceiling

1. Patch only the two focused tests first.
2. Run exactly:
   `cd app && ./node_modules/.bin/vitest run scripts/o1_core_dashboard_shell.vitest.ts scripts/o1_core_dashboard_reads.vitest.ts`
   and preserve meaningful RED.
3. Patch only the two source paths.
4. Run the identical focused command once and require GREEN.
5. No other test, build, typecheck, browser, runtime, DB, provider, install, generate, or command gate.

Inspect exact four-path diff, `git diff --check`, commit once, non-force push, write only:

1. `115_WORKER_VISUAL_FIRST_DASHBOARD_IMPLEMENTATION_RESULT.md`
2. `116_WORKER_VISUAL_FIRST_DASHBOARD_IMPLEMENTATION_POINTER.md`

Return compactly and STOP before redeploy or another module.
