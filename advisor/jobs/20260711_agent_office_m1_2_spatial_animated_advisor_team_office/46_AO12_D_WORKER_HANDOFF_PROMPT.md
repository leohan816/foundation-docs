TARGET_ACTOR: Worker
TARGET_SESSION: separate existing Agent Office Worker session, never Advisor or Reviewer session
SOURCE_ADVISOR_JOB: ../foundation-docs/advisor/jobs/20260711_agent_office_m1_2_spatial_animated_advisor_team_office
DO_NOT_PASTE_INTO: Advisor session, Reviewer session, or GPT strategy session
RETURN_RESULT_TO: Advisor
GPT_DIRECT_USE: inspect only, do not execute unless acting as the target Worker session

# Agent Office AO12-D Implementation

Read and execute:

`../foundation-docs/advisor/jobs/20260711_agent_office_m1_2_spatial_animated_advisor_team_office/46_AO12_D_WORKER_BRIEF.md`

Requirements:

- Use the same existing `agent-office` Codex session and GPT-5.6 SOL Ultra.
- Start from exact Agent Office commit
  `f9d0533437c0cf9efa7be76650ad79f0cb0d9353`.
- Implement only AO12-D (`AO12-IWU-12..14`).
- Directly read actual canonical design and source before editing.
- Preserve M1 authority, auth, Advisor delivery, transport, DB/network, and
  exact existing baseline boundaries.
- Carry the AO12-C expiry-format gate into authenticated slice validation.
- Use no new agent, sub-agent, delegated context, or temporary session.
- Use no DB, secret, remote/public/prod/live, real tmux delivery, or external
  asset.
- Commit and push the exact Agent Office implementation branch, then commit and
  push only the exact Worker result and pointer in Foundation Docs.
- Terminal result and pointer block must be ASCII-only.
- Return to Advisor and STOP. Do not self-review or start another mission.
