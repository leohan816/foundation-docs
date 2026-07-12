# 72 Leo/GPT Pixi Compatibility Decision

```text
MISSION_ID: AGENT_OFFICE_M1_2_SPATIAL_ANIMATED_ADVISOR_TEAM_OFFICE
DECISION: APPROVE_OPTION_A_PROTOTYPE_ONLY_PUBLIC_EXPORT_COMPATIBILITY_BRIDGE
DECISION_STATUS: RECORDED
DECISION_DATE_UTC: 2026-07-12
```

## Preserved Constraints

- TypeScript remains exactly `6.0.3`.
- Repository-wide `skipLibCheck` remains `false`.
- `pixi.js` remains exactly `8.19.0`.
- `@pixi/react` remains exactly `8.0.5`.
- Runtime imports may use public package roots only.
- Relative or absolute deep imports into `node_modules` are forbidden.
- `@ts-expect-error` and `@ts-ignore` import suppression are forbidden.
- The bridge is prototype-only and is `DEFERRED_WITH_GATE` for full
  authenticated integration.
- The same existing Fable5 Reviewer session must complete a Level-3 design
  delta review before implementation resumes.

## Authorized Design Delta

The existing Agent Office Worker may write a narrow canonical technical design
for:

- a public-root JavaScript runtime compatibility bridge;
- an adjacent bounded local declaration contract covering only prototype-used
  APIs;
- exact contract tests for package-root imports, bounded surface, runtime
  version identity, and absence of deep imports or suppressions; and
- the one-file legacy dependency-gate correction that becomes executable only
  after a clean design PASS.

This record authorizes documentation design only. It does not authorize source,
test, package, lockfile, media, runtime, authenticated integration, or production
changes in this pass.

## Not Authorized

- global toolchain or compiler changes;
- dependency version changes;
- weakened strict checks;
- implementation before the design review;
- full authenticated or production integration;
- skipping the review or test gates.

## Next Gate

```text
NEXT_ACTOR: Agent Office Worker (design-only)
AFTER_WORKER: same existing Fable5 Reviewer
REVIEW_PASS: DESIGN_REVIEW__PIXI_PUBLIC_EXPORT_COMPATIBILITY_BRIDGE_DELTA
REVIEW_LEVEL: LEVEL_3
IMPLEMENTATION_STATUS: PAUSED_PENDING_CLEAN_DESIGN_PASS
RETURN_TO: Advisor
```
