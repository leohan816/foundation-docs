# 73 Pixi Public-Export Compatibility Bridge Design Brief

## Assignment

- Actor: Agent Office Worker
- Session: existing `agent-office/%13` only
- Model and effort: `<Codex 5.6 SOL: High>`
- Mission: `AGENT_OFFICE_M1_2_SPATIAL_ANIMATED_ADVISOR_TEAM_OFFICE`
- Work mode: canonical technical design delta only
- Repository: `/home/leo/Project/agent-office`
- Branch: `shadow/agent-office-m1-2-spatial-office`
- Design base: `9611d0da1479ca5e7a9677641fe767a6b39b4a38`

## Objective

Convert Leo/GPT Option A into a precise, reviewable canonical design that can
later remove the prepared prototype's unsupported deep package imports and
suppression directives without weakening repository-wide TypeScript checks.

The design must be precise enough that a later implementation handoff does not
require the Worker to invent a compatibility, package, type, or test policy.

## Required Direct Reads

Read directly, not from terminal history or memory:

- `AGENTS.md`
- `CLAUDE.md`
- `docs/agent/RUN_PROTOCOL.md`
- `docs/agent/RESULT_REPORTING_PROTOCOL.md`
- `docs/architecture/AGENT_OFFICE_M1_2_LIVING_PIXEL_OFFICE_RENDERER_DESIGN.md`
- `docs/operations/AGENT_OFFICE_M1_2_LIVING_PIXEL_OFFICE_IMPLEMENTATION_PLAN.md`
- `docs/ui/AGENT_OFFICE_M1_2_PIXEL_WORLD_SPRITE_ANIMATION_SYSTEM.md`
- the prepared uncommitted prototype source that currently imports Pixi;
- `package.json`, `package-lock.json`, `tsconfig.json`, and
  `tests/acceptance/batch-gates.test.ts`;
- `../foundation-docs/advisor/jobs/20260711_agent_office_m1_2_spatial_animated_advisor_team_office/71_ADVISOR_PROTOTYPE_BLOCKER_VALIDATION.md`;
- `../foundation-docs/advisor/jobs/20260711_agent_office_m1_2_spatial_animated_advisor_team_office/71_PIXI_TYPESCRIPT_COMPATIBILITY_DECISION_PACKAGE.md`; and
- `../foundation-docs/advisor/jobs/20260711_agent_office_m1_2_spatial_animated_advisor_team_office/72_LEO_GPT_PIXI_BRIDGE_DECISION.md`.

## Exact Allowed Agent Office Changes

Only these clean canonical documentation paths may be changed in this pass:

1. `docs/architecture/AGENT_OFFICE_M1_2_PIXI_PUBLIC_EXPORT_COMPATIBILITY_BRIDGE.md` (new)
2. `docs/architecture/AGENT_OFFICE_M1_2_LIVING_PIXEL_OFFICE_RENDERER_DESIGN.md`
3. `docs/operations/AGENT_OFFICE_M1_2_LIVING_PIXEL_OFFICE_IMPLEMENTATION_PLAN.md`

Do not change or stage `docs/FEATURE_INDEX.md` in this pass because it already
contains preserved uncommitted prototype work. Do not modify, clean, reset,
stage, or commit any prepared prototype source, test, package, lockfile, media,
configuration, baseline, or ignore-file change.

## Required Design Content

The new compatibility document and its two canonical references must define:

1. **Scope and status**
   - prototype-only;
   - pending Fable5 Level-3 design PASS;
   - `DEFERRED_WITH_GATE` for full authenticated integration;
   - no production or authenticated-integration claim.

2. **Preserved toolchain**
   - TypeScript `6.0.3`;
   - `skipLibCheck: false` globally;
   - `pixi.js@8.19.0`;
   - `@pixi/react@8.0.5`;
   - no silent package, compiler, or strictness change.

3. **Exact bridge topology**
   - one small JavaScript runtime module importing only public package roots;
   - one adjacent local declaration contract for only the exact prototype-used
     runtime values and call shapes;
   - ordinary prototype TypeScript/TSX imports only the local bridge contract;
   - no deep path, package-internal file, relative `node_modules` path,
     `@ts-expect-error`, `@ts-ignore`, ambient wildcard module, broad `any`, or
     global declaration override;
   - exact proposed future file paths and import direction.

4. **Bounded API inventory**
   - enumerate every `@pixi/react` and `pixi.js` runtime value/type needed by the
     prepared prototype after reading the actual source;
   - classify each as runtime value, local structural type, callback, option,
     or renderer-owned handle;
   - exclude unused package surface;
   - define how additions fail closed and require a reviewed contract update.

5. **Runtime identity and failure**
   - verify actual root-imported package versions/identity at the build or test
     boundary without reading secrets or network state;
   - specify fail-closed fallback when an expected export, call shape, lifecycle,
     or version is absent;
   - preserve DOM static and unchanged M1 fallback behavior.

6. **Contract and regression tests**
   - public package-root imports are the only Pixi package imports in executable
     prototype source;
   - no deep `node_modules` imports or package-internal paths;
   - no `@ts-expect-error` or `@ts-ignore` suppression;
   - the declaration contract exposes exactly the approved bounded surface;
   - runtime exports and exact package versions match the contract;
   - repository TypeScript still runs with `skipLibCheck: false`;
   - lifecycle, teardown, semantic parity, static fallback, browser, build,
     media, and full regression gates remain required;
   - the legacy `batch-gates.test.ts` expectation changes only from the exact
     original three runtime dependencies to the exact approved five.

7. **Promotion gate**
   - the bridge cannot silently become the authenticated or production renderer;
   - promotion requires fresh compatibility evidence, security/accessibility/
     lifecycle review, an explicit canonical design update, and separate
     Leo/GPT authority;
   - upstream compatibility may later replace the bridge additively, but not by
     silent contract drift.

8. **Implementation allowlist proposal**
   - list the exact existing prepared files that will need import cleanup;
   - list the exact new bridge/declaration/test files;
   - include only `tests/acceptance/batch-gates.test.ts` as the one newly
     authorized legacy path;
   - distinguish this proposal from current implementation authority.

## Design Validation Required in This Pass

- Inspect the actual prepared imports and report the complete current deep-import
  and suppression inventory.
- Verify all three allowed design files are clean relative to HEAD before edit.
- Verify the final commit contains only the three allowed Markdown paths.
- Verify the prepared prototype worktree remains otherwise byte-preserved and
  unstaged.
- Run Markdown/link/reference checks that require no runtime mutation.
- Do not run package install, source generation, media generation, browser
  server, or implementation tests in this pass.

## Commit and Result Rules

- Stage only the three exact design paths.
- Commit and non-force push to
  `origin/shadow/agent-office-m1-2-spatial-office`.
- Preserve all prepared prototype dirt after the docs-only commit.
- Write the full Worker result to:
  `../foundation-docs/runs/agent-office/20260711_agent_office_m1_2_spatial_animated_advisor_team_office/WORKER_PIXI_PUBLIC_EXPORT_BRIDGE_DESIGN_RESULT.md`
- Write the pointer to:
  `../foundation-docs/advisor/jobs/20260711_agent_office_m1_2_spatial_animated_advisor_team_office/74_WORKER_PIXI_PUBLIC_EXPORT_BRIDGE_DESIGN_RESULT_POINTER.md`
- Commit and push only those two exact Foundation Docs result paths.
- Return the pointer to Advisor and stop.

## STOP Conditions

Stop without implementation if:

- any clean design target is unexpectedly dirty;
- a design answer requires source/test/package changes now;
- the bounded contract cannot be specified without broad `any`, wildcard module
  declarations, global overrides, deep imports, or suppressions;
- the exact package roots cannot provide the required runtime values;
- the proposal requires a dependency, TypeScript, compiler, auth, transport,
  production, DB, secret, or authority change;
- unrelated prepared work cannot remain preserved and unstaged; or
- commit/push/result evidence cannot be made exact.

## Completion State

```text
DESIGN_DELTA_STATUS: CANDIDATE_PENDING_FABLE5_LEVEL3_REVIEW
IMPLEMENTATION_STATUS: PAUSED_NOT_AUTHORIZED_BY_THIS_HANDOFF
NEXT_ACTOR: Advisor
RETURN_TO: Advisor
```
