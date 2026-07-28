# ADVISOR HANDOFF — CUSTOMER DEVICE SHELL IMPLEMENTATION

MISSION_ID: COSMILE_MOBILE_STOREFRONT_DEVICE_PREVIEW_V1
ACTOR: existing Cosmile Worker only
SESSION: `cosmile:claude.0`
MODEL/EFFORT: actual Claude Opus 5 / xhigh, live-verified
SKILL: `/fable-builder`
RETURN_TO: foundation-advisor

## Pins and workspace

- Product worktree: `/home/leo/Project/.worktrees/Cosmile/COSMILE_MOBILE_STOREFRONT_DEVICE_PREVIEW_V1`
- Branch: `implementation/cosmile-mobile-storefront-device-preview-v1-20260728`
- Base: `a10604121aeba0207c12bb1cce8e961e73ad7abc`
- Contract: docs `06_FOUNDER_STRATEGY_CONTRACT_FREEZE.md` at the committed dispatch pin
- Result paths:
  - docs `advisor/jobs/COSMILE_MOBILE_STOREFRONT_DEVICE_PREVIEW_V1/08_WORKER_RESULT.md`
  - docs `advisor/jobs/COSMILE_MOBILE_STOREFRONT_DEVICE_PREVIEW_V1/09_WORKER_POINTER.md`

Every Read/Edit/Bash command must use the exact product worktree. Fail closed on another CWD, HEAD, branch, or dirty state.

## Required reads

Read the repo/app rules, common Worker role, run/result protocols, test-meaning policy, exact contract and handoff, `/home/leo/Project/skill/fable-builder/SKILL.md`, and its required implementation/test/report references. After worktree-local `npm ci`, read the installed Next 16 CSS and layouts/pages guides under `app/node_modules/next/dist/docs/`.

No broad source exploration. Read only the six authorized product paths.

## Exact sequence

1. Verify base/branch/clean state and produce the compact contract-to-code mapping.
2. If `app/node_modules` is absent, run only `npm ci --ignore-scripts --no-audit --no-fund` from `app/`. No lockfile/package change.
3. Patch only the two test files first. Treat the old five-tab/no-device expectations as `CONTRACT_DRIFT_FOUND`; preserve every unrelated oracle.
4. Run exactly:
   `npx vitest run scripts/o1_storefront_navigation.vitest.ts scripts/o1_storefront_visual_shell.vitest.ts --config vitest.config.ts`
   Require meaningful RED caused by the absent device-shell/SVG contract.
5. Implement only the four source paths in the six-path ceiling:
   - additive O1 customer wrappers in `layout.tsx`; operator early return unchanged;
   - one same-file inline-SVG tab primitive and exact six O1 routes in `MallTabs.tsx`; legacy arrays/branch unchanged;
   - bounded device/container/navigation CSS in `globals.css`; convert only existing O1-specific width breakpoints to the named container;
   - correct only the superseded comment in `account/page.tsx`.
6. Run the identical focused command once for GREEN.
7. Inspect exact diff and forbidden tokens: no `iframe`, `/preview/mobile`, new route, emoji in the O1 tab region, external icon/image, fake count, backend/schema/DB/auth/provider/economic/dashboard change.
8. Commit with truthful attribution/no co-author trailer, non-force push with upstream, verify clean/upstream-equal and base ancestry.
9. Write only `08_WORKER_RESULT.md` and `09_WORKER_POINTER.md` in the docs worktree; do not commit docs. Return and STOP.

## Exact implementation constraints

- Desktop frame begins at outer viewport `768px`; narrow/mobile is edge-to-edge.
- `.o1-device-screen` (or one equivalently named exact wrapper) is the one named inline-size container.
- Customer width behavior uses container queries; do not add a second responsive component.
- In the desktop frame, the shell is height-contained, main content scrolls, and tabs are a shell flex item inside the screen rather than viewport-fixed.
- On real mobile, preserve fixed safe-area tabs and max-height reflow.
- Six O1 tab controls fit without clipped Korean labels or horizontal scrolling and remain at least 44px.
- Cart may have a dedicated class for the accepted persimmon/ink icon treatment; active semantics still come only from pathname.
- No product/card/content redesign and no behavior/data mutation.

## Forbidden

No seventh product path, new component file, route, iframe, dependency, manifest/lock change, backend, schema/migration, DB/data, auth/session, cart/order/payment/refund/provider, operator/dashboard, Foundation/AI, public runtime, browser, build, full suite, merge, or cleanup outside ignored worktree-local dependencies.

Return factual evidence, not an independent verdict.
