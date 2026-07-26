# Independent implementation review — M5C Dashboard acceptance correction

MISSION: `COSMILE_CORE_OPERATIONS_DASHBOARD_V1`
PASS: `IMPLEMENTATION_REVIEW`
REVIEW_NEEDED: `YES`
REVIEW_TIER: `HARD_IMPORTANT_SAFETY`
MODEL: `Fable 5`
EFFORT: `max`
WHY_SELECTED: authenticated operator order projection and default-deny operational facts are load-bearing even though authority/economic logic is unchanged.
RETURN_TO: `foundation-advisor`

## Exact candidate

- Product worktree: `/home/leo/Project/.worktrees/Cosmile/COSMILE_CORE_OPERATIONS_DASHBOARD_V1`
- Base: `c5b7edd79dfe995c5be5e1fdc84cccf696f6b8a9`
- Candidate: `fa90003d0ca84b01bbfe0bfa7206b447b6c8d546`
- Branch clean/upstream-equal.
- Design: foundation-docs `8e4f8cd77abdf72753a209d0752c970180a739cb`, file `87_DESIGNER_DASHBOARD_ACCEPTANCE_CORRECTION_CONTRACT.md`.
- Worker result: foundation-docs `0b72e6e73f85de98814227c0257a135c2fcaa40b`, file `92_M5C_DASHBOARD_ACCEPTANCE_CORRECTION_WORKER_RESULT.md`.

## Skill and exact review surface

Load `/fable-sentinel` and only:

- `delta-review`
- `safety-review`
- `provenance-review`
- `review-classification`

Current Agent Office role authority controls; historical V2 text named by the skill is evidence only.

Review exact base-to-candidate delta and minimum load-bearing context only:

1. `app/src/components/operator/OperatorShell.tsx`
2. `app/src/app/dashboard/page.tsx`
3. `app/scripts/o1_core_dashboard_shell.vitest.ts`
4. `app/scripts/o1_core_dashboard_reads.vitest.ts`
5. existing source-owned `orderStatusLabel` definition only.

## Required questions

1. At desktop breakpoint, do the exact 11 rows become a 250px left/full-height rail while only `main` scrolls, so the operations row cannot disappear with Dashboard body scroll?
2. Is the horizontal operations strip limited to below desktop, with Console/Dashboard/Lab alone remaining the top space switcher?
3. Are supported destinations unchanged and unsupported Customers/Products/Inventory/Payments rows inert with truthful states?
4. Does home keep the same root/per-read capability order, same-principal checks, exactly one request/order/reconciliation read, and default-deny behavior?
5. Do recent orders reuse only that one result, max three, exposing only opaque order number and returned status—never customer/economic/provider data?
6. Are `UNAVAILABLE`/`NOT_IMPLEMENTED`/confirmed-zero semantics preserved without fabricated KPI or silent zero?
7. Do the modified tests encode the reviewed contract without deleting/weakening security, authority, Storefront-separation, or no-mutation oracles?
8. Is the Worker report truthful about the extra focused run and the source-only/browser/typecheck limitations?

## Boundaries

Read-only. No patch, test, typecheck, build, DB, browser, runtime, provider, network, commit, push, or broad audit. Do not repeat the prior cumulative mission review.

Write only:

- `95_M5C_INDEPENDENT_DELTA_REVIEW.md`
- `96_M5C_INDEPENDENT_DELTA_REVIEW_POINTER.md`

Result ≤80 lines; verdict `PASS | PASS_WITH_RISK | NEEDS_PATCH | FAIL`, blocking findings only plus exact residuals. Report actual model/effort/CWD/skill refs. No commit/push. STOP.
