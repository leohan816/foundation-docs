# AO12-D Worker Rework Handoff

TARGET_ACTOR: Agent Office Worker-Rework
TARGET_SESSION: same existing `agent-office/%13`, never Advisor or Reviewer
SOURCE_ADVISOR_JOB: `../foundation-docs/advisor/jobs/20260711_agent_office_m1_2_spatial_animated_advisor_team_office`
DO_NOT_PASTE_INTO: Advisor session or reviewer-fable5
RETURN_RESULT_TO: Advisor
GPT_DIRECT_USE: inspect only

Read directly:

- `48_ADVISOR_AO12_D_VALIDATION.md`
- `49_AO12_D_WORKER_REWORK_BRIEF.md`
- the exact current source, production build, tests, docs, Git state, and Worker
  result/pointer

Correct only `AO12-D-A1`: the production dashboard bundle contains synthetic
spatial fixture code because the production-rendered `SpatialOffice` module has
an implicit fixture default. Remove that production dependency while preserving
explicit demo/test fixtures and every authenticated behavior and boundary.

Do not trust the prior Worker result as proof. Reproduce the marker scan before
the patch and prove zero markers after a fresh production build. Do not change
auth, session expiry, SSE, authority, exact Advisor delivery, transport, config,
package/lock, DB, network, secrets, product policy, or visual meaning. Do not
regenerate snapshots merely to pass tests.

Use no new session, agent, sub-agent, delegated context, or temporary session.
Commit and push the scoped Agent Office patch non-force. Then write, commit, and
push only the exact rework result and pointer in Foundation Docs while preserving
all unrelated dirty files. Return an ASCII-only pointer to Advisor and stop.
