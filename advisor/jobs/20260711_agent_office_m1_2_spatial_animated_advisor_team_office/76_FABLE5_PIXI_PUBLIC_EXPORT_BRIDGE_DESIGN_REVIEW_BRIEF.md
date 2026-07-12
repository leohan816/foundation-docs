# 76 Fable5 Pixi Public-Export Bridge Design Review Brief

## Assignment

- Actor: independent Fable5 Sentinel
- Session: same existing `reviewer-fable5/%5` session only
- Model and effort: `<Fable5: Max>`
- Required skill: `/fable-sentinel`
- Pass: `DESIGN_REVIEW__PIXI_PUBLIC_EXPORT_COMPATIBILITY_BRIDGE_DELTA`
- Level: 3
- Target commit:
  `56385b894ff18fd65a4e59f2c4e75f73ea2a56d9`
- Base:
  `9611d0da1479ca5e7a9677641fe767a6b39b4a38`
- Review mode: read-only; distrust Worker and Advisor conclusions

## Required Direct Reads

Read directly:

- the exact Leo/GPT decision in
  `../foundation-docs/advisor/jobs/20260711_agent_office_m1_2_spatial_animated_advisor_team_office/72_LEO_GPT_PIXI_BRIDGE_DECISION.md`;
- the exact Worker brief and handoff (`73_*`);
- the Worker result and pointer;
- the Advisor validation (`75_*`);
- all three changed canonical design files;
- the actual diff `9611d0d..56385b8`;
- Agent Office `AGENTS.md`, `CLAUDE.md`, active run/result protocols;
- actual `package.json`, `package-lock.json`, `tsconfig.json`,
  `tests/acceptance/batch-gates.test.ts`;
- the four prepared Pixi consumers and their local contracts;
- the actual installed public package roots/exports; and
- current Git status, upstream ancestry, and committed path scope.

Do not treat the Worker result or Advisor validation as proof.

## Mandatory Review Questions

Answer every item with direct evidence:

1. Does the design preserve Leo/GPT Option A exactly without adding or removing
   authority?
2. Are TypeScript `6.0.3`, global `skipLibCheck: false`, React `19.2.7`,
   `@pixi/react@8.0.5`, and `pixi.js@8.19.0` all preserved?
3. Is one JavaScript runtime bridge the only executable Pixi package importer,
   using only literal public roots?
4. Does the adjacent declaration avoid every vendor type, broad `any`, wildcard
   module, module/global augmentation, index signature, deep path, and
   suppression escape hatch?
5. Does the bounded API inventory exactly match actual prepared prototype use,
   with neither a missing required call nor speculative unused surface?
6. Is the normative declaration skeleton internally coherent under React 19
   types and sufficient for the four prepared consumers?
7. Can the proposed wrappers preserve `Application`, ref, `extend`, Container,
   Graphics, Sprite, Texture, and `useTick` behavior through public roots?
8. Are public-root export existence and exact package identities independently
   supported by the actual package/lock/module evidence?
9. Does the design correctly avoid treating bare-Node execution of the
   browser-oriented public root as the runtime gate?
10. Are runtime checks exact enough to reject missing/malformed exports,
    lifecycle ports, texture/ticker calls, and wrong PixiJS versions?
11. Can every bridge initialization or later call failure select the existing
    DOM-static/M1 fallback before stale canvas authority, without adding a broad
    global error handler?
12. Are StrictMode setup/cleanup, ownership, teardown, and zero-retained-resource
    requirements preserved?
13. Do contract tests prove root-only imports, exact declaration surface,
    runtime identity, no deep imports/suppressions, and strict compiler settings
    without self-authenticating constants?
14. Is the one-file `batch-gates.test.ts` correction exact and non-weakening?
15. Is the proposed implementation allowlist complete and minimal for the
    prepared prototype correction?
16. Does the design leave existing prototype behavior, media, baselines,
    dependencies, and package lock unchanged until implementation authority?
17. Is the bridge unambiguously prototype-only and
    `DEFERRED_WITH_GATE` for authenticated/production use?
18. Are auth, authority, delivery, transport, DB, secret, public, remote,
    production, Hermes, and next-mission boundaries unchanged?
19. Is the candidate commit exactly three documentation paths and upstream
    verified, with the prepared prototype worktree preserved?
20. Is the design precise enough for a later exact implementation brief without
    requiring the Worker to invent a type, runtime, failure, or promotion policy?

The Reviewer may run read-only source inspection and bounded compiler/runtime
feasibility probes that do not modify the repository, start a server, regenerate
media, or access secrets/DB/network state. Do not patch any file.

## Finding Classes

Classify any issue as:

- `DESIGN_DEFECT`
- `TYPE_CONTRACT_DEFECT`
- `RUNTIME_COMPATIBILITY_DEFECT`
- `FAIL_CLOSED_OR_LIFECYCLE_DEFECT`
- `TEST_GATE_DEFECT`
- `SCOPE_OR_AUTHORITY_DEFECT`
- `DOCUMENTATION_STALE`
- `DEFERRED_WITH_GATE`
- `INFORMATIONAL`

## Verdict

Return exactly one:

- `PASS`
- `PASS_WITH_RISK`
- `NEEDS_PATCH`
- `FAIL`

`PASS` opens only a new exact prototype-implementation correction handoff from
Advisor. It does not approve the implementation, prototype visual direction,
full authenticated integration, production, or M1.2 final closure.

`PASS_WITH_RISK` returns to Leo/GPT. `NEEDS_PATCH` returns to Advisor for a
same-Worker design patch and same-session Fable5 delta re-review. `FAIL` stops.

## Result Storage

Write:

- full result:
  `../foundation-docs/runs/agent-office/20260711_agent_office_m1_2_spatial_animated_advisor_team_office/FABLE5_PIXI_PUBLIC_EXPORT_BRIDGE_DESIGN_DELTA_REVIEW_RESULT.md`
- pointer:
  `../foundation-docs/advisor/jobs/20260711_agent_office_m1_2_spatial_animated_advisor_team_office/77_FABLE5_PIXI_PUBLIC_EXPORT_BRIDGE_DESIGN_DELTA_REVIEW_RESULT_POINTER.md`

Commit and push only those exact two Foundation Docs files. Agent Office is
read-only. Return the ASCII pointer to Advisor and stop.
