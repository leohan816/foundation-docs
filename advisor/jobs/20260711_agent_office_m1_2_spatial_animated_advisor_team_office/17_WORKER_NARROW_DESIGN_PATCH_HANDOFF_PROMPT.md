TARGET_ACTOR: Agent Office Worker-Rework
TARGET_SESSION: existing Agent Office Worker session, never Advisor or Reviewer
SOURCE_ADVISOR_JOB: ../foundation-docs/advisor/jobs/20260711_agent_office_m1_2_spatial_animated_advisor_team_office
DO_NOT_PASTE_INTO: Advisor session or reviewer-fable5
RETURN_RESULT_TO: Advisor
GPT_DIRECT_USE: inspect only

# Agent Office M1.2 Narrow Product-Intent Design Patch

Read directly:

1. `16_LEO_GPT_CHAINED_DECISION_RECORD.md`
2. the exact Agent Office candidate commit
   `3ba65e0092a7c0cebf546c6baecf5bb007314897`
3. all five candidate design files at that commit
4. the prior Fable5 result referenced by
   `14_FABLE5_M1_2_DESIGN_REVIEW_RESULT_POINTER.md`
5. Agent Office `AGENTS.md`, `CLAUDE.md`, and active repo-local run/result rules
6. current target and Foundation Docs Git state

## Exact Task

Apply P-01 through P-08 from the chained decision record to the existing design.
This is a narrow documentation delta, not a redesign and not implementation.

Patch only these Agent Office paths:

1. `docs/architecture/AGENT_OFFICE_M1_2_SPATIAL_OFFICE_MASTER_DESIGN.md`
2. `docs/contracts/AGENT_OFFICE_M1_2_SPATIAL_EVENT_ANIMATION_CONTRACT.md`
3. `docs/ui/AGENT_OFFICE_M1_2_CHARACTER_PROJECT_IDENTITY_SYSTEM.md`
4. `docs/operations/AGENT_OFFICE_M1_2_IMPLEMENTATION_WORKUNIT_PLAN.md`
5. `docs/FEATURE_INDEX.md`

The patch must:

- replace, not retain in parallel, the superseded Channy-disabled and unresolved
  art decisions;
- make one shared wide-desktop office floor and recognizable non-selected Team
  Pod areas explicit;
- preserve the exact Single Advisor Team fail-closed authority invariant and
  clarify current single-Advisor versus future per-instance Advisor characters;
- record the exact initial Foundation and conditional VibeNews Team assignments;
- use the approved project palette with non-color identity and severity/a11y
  precedence;
- use only `SIASIU` for current product naming and add a testable forbidden-name
  rule for current surfaces;
- specify every Team mission-board field and the no-inference/redacted-session
  display boundary;
- resolve `AO12-FD-01` and `AO12-FD-02` exactly as authorized;
- define Channy, actor ambient states, and structured-event animation boundaries;
- update the WorkUnit plan so `AO12-IWU-01..14` can be frozen after a clean
  Fable5 delta `PASS`, while stating that implementation is not yet started;
- preserve M1 authority, exact Advisor delivery, security, auth, private-only
  scope, fail-closed evidence, rollback, accessibility, performance measurement,
  and additive extension principles;
- preserve historical citations only when explicitly marked historical.

## Forbidden

Do not modify runtime source, tests, fixtures, baselines, config, dependencies,
lockfiles, assets, auth, transport, authority, DB, network, deployment, or M1
evidence. Do not run a server. Do not purchase/import/generate external assets.
Do not start implementation. Do not create sessions, agents, sub-agents, or
delegated contexts. Do not invoke Fable5. Do not accept risk or approve your own
work.

## Evidence and Publication

- Work on `shadow/agent-office-m1-2-spatial-office` from exact base `3ba65e0`.
- Stage only the five listed documentation paths.
- Validate links, exact decision tokens, `SIASIU` naming, removal of active
  superseded decision text, allowed changed paths, `git diff --check`, commit
  ancestry, push, clean state, and upstream equality.
- Commit and non-force push the documentation delta.
- Write the durable result to:
  `../foundation-docs/runs/agent-office/20260711_agent_office_m1_2_spatial_animated_advisor_team_office/WORKER_NARROW_DESIGN_PATCH_RESULT.md`
- Write the pointer to:
  `../foundation-docs/advisor/jobs/20260711_agent_office_m1_2_spatial_animated_advisor_team_office/18_WORKER_NARROW_DESIGN_PATCH_RESULT_POINTER.md`
- Commit/push only those two Foundation Docs artifacts, preserving unrelated
  dirty files.
- Terminal output must be ASCII-only. Return the pointer to Advisor and STOP.
