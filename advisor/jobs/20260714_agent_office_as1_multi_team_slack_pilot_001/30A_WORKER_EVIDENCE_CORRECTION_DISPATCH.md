TARGET_ACTOR: Worker-Rework

TARGET_SESSION: `agent-office-opus`

SOURCE_ADVISOR_JOB:
`advisor/jobs/20260714_agent_office_as1_multi_team_slack_pilot_001`

DO_NOT_PASTE_INTO: Advisor session or Reviewer session

RETURN_RESULT_TO: `agent-office-advisor`

========
TARGET_ACTOR: Agent Office Worker
TARGET_PROJECT: Agent Office
TARGET_REPO: /home/leo/Project/.worktrees/agent-office/AGENT_OFFICE_AS1_MULTI_TEAM_SLACK_PILOT_001
TARGET_SESSION_NAME: agent-office-opus
REQUIRED_SKILL: /home/leo/Project/skill/fable-builder/SKILL.md
READ_AND_EXECUTE: /home/leo/Project/.worktrees/foundation-docs/AGENT_OFFICE_AS1_MULTI_TEAM_SLACK_PILOT_001/advisor/jobs/20260714_agent_office_as1_multi_team_slack_pilot_001/30_ADVISOR_WORKER_EVIDENCE_CORRECTION_HANDOFF.md
RETURN_RESULT_TO: agent-office-advisor
DO_NOT_EXECUTE_FROM_MEMORY: true
DO_NOT_BROADEN_SCOPE: true

Correct only the committed Worker result and pointer evidence. Do not change
source or rerun tests. Commit, non-force push, return the corrected pointer,
and STOP.
========
