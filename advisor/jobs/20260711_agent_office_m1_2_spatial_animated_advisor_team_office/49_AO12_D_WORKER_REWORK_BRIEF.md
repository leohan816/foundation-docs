# AO12-D Worker Rework Brief

## Target

- Actor: Agent Office Worker
- Existing session: `agent-office/%13`
- Model: GPT-5.6 SOL
- Effort: Ultra
- Repository: `../agent-office`
- Branch: `shadow/agent-office-m1-2-spatial-office`
- Exact starting commit: `da5ecc9d1ecd0d331b20724a1f5bfca03d783a10`
- Finding: `AO12-D-A1`

## Task

Correct only the production-bundle synthetic spatial fixture defect documented
in `48_ADVISOR_AO12_D_VALIDATION.md`.

The production dashboard JavaScript must not contain or import AO12-B/C
synthetic spatial fixtures. Synthetic demo and test behavior must remain
available through an explicit demo/test-only boundary. The authenticated
application must continue to require and render an explicit validated spatial
projection.

## Allowed changes

- Narrow refactoring of `src/ui/spatial/spatial-office.tsx` so production use
  has no implicit fixture default.
- A demo/test-only wrapper or explicit fixture injection in demo/tests.
- Tests and build checks that prove production bundle exclusion.
- Minimal canonical AO12-D as-built documentation correction/evidence.
- A new scoped Agent Office commit and push.
- A new Foundation Docs rework result and pointer only.

## Forbidden changes

- Authentication, LocalBootstrap, session, CSRF, SSE, authority, exact Advisor
  delivery, transport, gateway, network, DB, secret, operational config, or
  package/lock changes.
- Product behavior, visual meaning, team/actor assignment, cue semantics,
  performance budgets, or design scope changes.
- Baseline laundering or regeneration without a directly observed rendering
  change that is both necessary and in scope. All 19 prior baseline bytes and
  seven AO12-D baseline meanings must remain stable.
- New session, agent, sub-agent, temporary context, self-review, force push, or
  next mission.

## Required verification

1. Source graph proves production `SpatialOffice` has no synthetic fixture
   import or implicit synthetic projection.
2. Fresh `npm run build` output contains zero occurrences of:
   - `SYNTHETIC_NON_OPERATIONAL_STATIC`
   - `SYNTHETIC_STRUCTURED_EVENT_MOTION`
   - `AO12-C synthetic accepted-event motion fixture`
   - `ao12-b-static-shared-floor`
3. Demo and test fixtures remain explicit and non-operational.
4. Focused spatial tests pass.
5. Full Vitest passes.
6. `npm run test:e2e:demo` and `npm run test:e2e:composed` pass.
7. Lint, typecheck, build, dependency audit, SIASIU naming, source capability,
   baseline hash, diff, commit-parent, push, upstream-equality, cleanup, and
   no-listener/no-process checks pass.
8. Existing expiry/revocation integration coverage remains passing; do not
   weaken it or modify auth behavior to satisfy tests.

## Result contract

Write:

`../foundation-docs/runs/agent-office/20260711_agent_office_m1_2_spatial_animated_advisor_team_office/WORKER_AO12_D_REWORK_RESULT.md`

and pointer:

`../foundation-docs/advisor/jobs/20260711_agent_office_m1_2_spatial_animated_advisor_team_office/50_WORKER_AO12_D_REWORK_RESULT_POINTER.md`

Terminal output must be ASCII-only. Return to Advisor and stop.
