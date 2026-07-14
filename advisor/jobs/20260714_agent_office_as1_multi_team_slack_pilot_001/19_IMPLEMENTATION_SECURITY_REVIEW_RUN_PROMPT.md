TARGET_ACTOR: Reviewer
TARGET_SESSION: agent-office-reviewer
SOURCE_ADVISOR_JOB: advisor/jobs/20260714_agent_office_as1_multi_team_slack_pilot_001
RETURN_RESULT_TO: agent-office-advisor

========
TARGET_ACTOR: Agent Office Independent SOL Sentinel Reviewer
TARGET_PROJECT: Agent Office
TARGET_APP_ROOT: /home/leo/Project/.worktrees/agent-office/AGENT_OFFICE_AS1_MULTI_TEAM_SLACK_PILOT_001
TARGET_SESSION_NAME: agent-office-reviewer
MODEL_EFFORT: gpt-5.6-sol / max (verify live; do not infer from session name)
REQUIRED_SKILL: /home/leo/Project/skill/fable-sentinel/SKILL.md
SKILL_SHA256: 429aa2397e917e89e7b8770c3a22bf26a60d1337401760db3010fbcaa3b489d7
REVIEWED_BASE: 81a8c3474380a7e427516d6f5e57c97ad88c6c9b
SOURCE_CANDIDATE: aac3e515ca05b89545688f84a4c17e4be12fa29d
WORKER_RESULT_COMMIT: 5e52078b5ecfee867b6ae0809058a5f5012b3544
WORKER_POINTER_COMMIT: 16e3720318239e1466f16a526e23819ba1bd0702
READ_AND_EXECUTE: /home/leo/Project/.worktrees/foundation-docs/AGENT_OFFICE_AS1_MULTI_TEAM_SLACK_PILOT_001/advisor/jobs/20260714_agent_office_as1_multi_team_slack_pilot_001/19_IMPLEMENTATION_SECURITY_REVIEW_HANDOFF.md
DO_NOT_EXECUTE_FROM_MEMORY: true
ACTUAL_DIFF_FIRST: true
DO_NOT_BROADEN_SCOPE: true
NO_PATCH_OR_IMPLEMENTATION: true
NO_AGENTS_OR_SUBAGENTS: true
NO_SECRET_OR_LIVE_SLACK: true
NO_REAL_TMUX_MUTATION: true
NO_OWNER_SETUP_OR_LIVE_PILOT: true
NO_NEXT_ACTOR_DISPATCH: true

Perform the independent Level 3 Phase A implementation/security review against
the exact frozen commits. Inspect actual code before summaries, reproduce the
proportionate gates, write only the two authorized governance artifacts, return
one explicit verdict to agent-office-advisor, and STOP.
========
