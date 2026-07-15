# Worker Implementation Patch Dispatch V5

MISSION_ID: `AGENT_OFFICE_AS1_MULTI_TEAM_SLACK_PILOT_001`

DISPATCH: `AS1_PATCH_V5_B05_B08_B09`

FROM: `agent-office-advisor`

TO: `agent-office-opus`

WORKTREE:
`/home/leo/Project/.worktrees/agent-office/AGENT_OFFICE_AS1_MULTI_TEAM_SLACK_PILOT_001`

START_TIP: `cc823562a52f495ea1b3d54314865b2305ea0932`

IMMUTABLE_REVIEW_RESULT:
`advisor/jobs/20260714_agent_office_as1_multi_team_slack_pilot_001/35_IMPLEMENTATION_SECURITY_DELTA_REREVIEW_V4_RESULT.md`

REVIEW_RESULT_COMMIT: `caf808f6af750794417186f2418f538c0dc1bad4`

REVIEW_RESULT_SHA256:
`93c4eda55a5b701fffdfbd4388fa6a070541b71252dfb2adc66610f618d5295c`

HANDOFF:
`advisor/jobs/20260714_agent_office_as1_multi_team_slack_pilot_001/36_ADVISOR_IMPLEMENTATION_PATCH_HANDOFF_V5.md`

RUN_PROMPT:
`advisor/jobs/20260714_agent_office_as1_multi_team_slack_pilot_001/36_WORKER_IMPLEMENTATION_PATCH_RUN_PROMPT_V5.md`

SCOPE: Complete B05 durable receive-ready Socket latching, B08 exact durable
invariants/corruption latching, and B09 truthful evidence only. Preserve all
closed findings and default-disconnected Phase A boundaries.

NEXT_ROUTE: same independent `agent-office-reviewer` narrow delta re-review.

STOP_AFTER: Worker result and pointer are committed, pushed, and returned to
`agent-office-advisor`.
