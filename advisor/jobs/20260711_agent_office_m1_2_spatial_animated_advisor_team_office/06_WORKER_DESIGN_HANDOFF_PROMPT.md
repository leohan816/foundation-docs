TARGET_ACTOR: Agent Office Worker
TARGET_SESSION: separate existing Agent Office Worker session, never Advisor or Reviewer
SOURCE_ADVISOR_JOB: ../foundation-docs/advisor/jobs/20260711_agent_office_m1_2_spatial_animated_advisor_team_office
DO_NOT_PASTE_INTO: Advisor session or reviewer-fable5
RETURN_RESULT_TO: Advisor
GPT_DIRECT_USE: inspect only

# Agent Office M1.2 Design-Only Handoff

Read directly:

1. `00_INTAKE.md`
2. `01_ADVISOR_BRIEF.md`
3. `02_DESIGN_UNKNOWN_REGISTER.md`
4. `03_WORKER_DESIGN_BRIEF.md`
5. Agent Office `AGENTS.md`, `CLAUDE.md`, active run/result protocols
6. Actual current M1 canonical docs, source, tests, visual baselines, Git state

Execute only the design task defined in `03_WORKER_DESIGN_BRIEF.md`.

Do not use agents, sub-agents, delegated contexts, temporary sessions, external
research, asset generation, or asset purchase. Do not modify runtime source,
tests, config, dependencies, lockfiles, auth, transport, authority, DB, network,
or deployment. Do not run a server. Do not start implementation.

Create the exact dedicated design branch from the fixed M1 base, publish only the
five allowed documentation paths, then write the exact result and pointer in
foundation-docs. Preserve unrelated foundation-docs dirt. Return the ASCII-only
pointer to Advisor and STOP.
