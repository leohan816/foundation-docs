TARGET_ACTOR: Reviewer
TARGET_SESSION: agent-office-reviewer
SOURCE_ADVISOR_JOB: advisor/jobs/20260714_agent_office_as1_multi_team_slack_pilot_001
DO_NOT_PASTE_INTO: Advisor, Designer, Worker, Foundation Advisor, or GPT strategy session
RETURN_RESULT_TO: agent-office-advisor
GPT_DIRECT_USE: inspect only; execute only in the named Reviewer session

========
TARGET_ACTOR: Agent Office Independent SOL Sentinel Reviewer
TARGET_PROJECT: Agent Office
TARGET_APP_ROOT: /home/leo/Project/.worktrees/agent-office/AGENT_OFFICE_AS1_MULTI_TEAM_SLACK_PILOT_001
TARGET_SESSION_NAME: agent-office-reviewer
MODEL_EFFORT: gpt-5.6-sol / xhigh (verified before dispatch; reverify live)
REQUIRED_SKILL: /home/leo/Project/skill/fable-sentinel/SKILL.md
SKILL_SHA256: 429aa2397e917e89e7b8770c3a22bf26a60d1337401760db3010fbcaa3b489d7
PRIOR_REVIEWED_HEAD: ce250c05218cc6d9cc4f2f3b0c43b678b95ec776
F01_PACKAGE_COMMIT: 0d217149c609c827e99fcc1324e247a809c13ff4
FROZEN_DELTA_REVIEW_HEAD: 86c7edb3f5cee26171fcb80c0704c46962d15be6
READ_AND_EXECUTE: /home/leo/Project/.worktrees/foundation-docs/AGENT_OFFICE_AS1_MULTI_TEAM_SLACK_PILOT_001/advisor/jobs/20260714_agent_office_as1_multi_team_slack_pilot_001/09_DESIGN_DELTA_REVIEW_HANDOFF.md
DO_NOT_EXECUTE_FROM_MEMORY: true
DELTA_ONLY_REVIEW: true
DO_NOT_BROADEN_SCOPE: true
NO_PATCH_OR_IMPLEMENTATION: true
NO_AGENTS_OR_SUBAGENTS: true
NO_SECRET_OR_LIVE_SLACK: true
NO_TMUX_MUTATION: true
NO_NEXT_ACTOR_DISPATCH: true

Perform the same-Reviewer narrow F01 design delta review against the exact
frozen commits. Reuse unaffected prior findings, write only the two authorized
governance review artifacts, return the explicit verdict to
agent-office-advisor, and STOP.
========
