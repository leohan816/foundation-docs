# M4 Responsive and Accessibility Floor — Worker Handoff

MISSION_ID: `COSMILE_O1_STOREFRONT_AND_CUSTOMER_ACCOUNT_COMPLETION_V1`
MODULE: `M4_RESPONSIVE_A11Y_FLOOR`
BASE: `4991ef6dd2532add3d4e28ad5733bbffdd3caf2a`
DELTA_ONLY_VERIFICATION: `REQUIRED`

## Binding and skill

Use the existing primary Cosmile Claude Worker at Opus 4.8/xhigh in the exact mission worktree; keep Codex idle. Load `/fable-builder` with `implementation-execution`, `contract-to-code-mapping`, and `test-design-before-code`; use `implementation-report-template` only for the compact return.

## Exact path ceiling

1. `app/src/app/globals.css`
2. `app/scripts/o1_browser_runtime_contract.vitest.ts`

No third path. Do not change components, routes, state, copy, visual system, carousel markup/logic, auth, checkout, payment, order, schema, manifest/lock/config, or O1/legacy behavior.

## Frozen behavior

- Add a global `:focus-visible` rule with an exact `2px solid #F2622A` outline and `2px` offset. Do not remove focus outlines anywhere.
- Give each `.mall-tabs a` a minimum `44px` by `44px` target and an explicit `8px` horizontal separation while retaining the existing five-item grid and active state.
- Add bottom safe-area support to `.mall-tabs` using `env(safe-area-inset-bottom)` without changing its fixed-bottom role.
- Add one `@media (prefers-reduced-motion: reduce)` block that makes existing animations and transitions effectively immediate and single-iteration, and disables smooth scrolling. It must not change visibility, order, focus, or final UI state.
- These rules are additive for O1-ON and O1-OFF. Do not claim that this CSS-only module repairs existing carousel-dot semantics or proves Korean-font rendering; those remain final-validation items.

## Tests first

In the existing test file add one focused `O1 a11y floor` source-contract case proving:

- exact focus outline color, width/style, and offset;
- `.mall-tabs a` 44px minimum target plus 8px separation;
- safe-area inset exists in `.mall-tabs`;
- reduced-motion media block covers animation duration/iteration, transition duration, and scroll behavior;
- no `outline: none` or `outline: 0` is introduced.

Expected RED: current `globals.css` has no global `:focus-visible`, reduced-motion media block, or safe-area inset.

Run only from `app/`:

`./node_modules/.bin/vitest run scripts/o1_browser_runtime_contract.vitest.ts -t "O1 a11y floor" --cache=false`

Run once for RED, patch only `globals.css`, then run the identical command once for GREEN. No install, generate, build, typecheck, broad test, DB/runtime/browser/provider/network.

## Closure

Inspect the exact two-path diff, `git diff --check`, package/lock unchanged, and no new ignored residue. Preserve worktree-local `node_modules`. One truthful additive commit without a co-author trailer; non-force push; clean/upstream-equal. Return <=60 lines and STOP for Advisor final-gate freeze.

If the frozen floor requires component logic, a new visual system, or a third path, return `HOLD`; do not expand.

RETURN_TO: `foundation-advisor`
STOP.
