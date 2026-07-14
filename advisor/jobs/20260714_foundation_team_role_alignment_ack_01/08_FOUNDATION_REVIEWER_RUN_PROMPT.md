TARGET_ACTOR: Independent Foundation Reviewer
TARGET_SESSION: foundation-reviewer-fable5
MISSION_ID: FOUNDATION_TEAM_ROLE_ALIGNMENT_ACK_20260714_01
WORK_UNIT_ID: FOUNDATION_REVIEWER_ROLE_ACK
RETURN_TO: foundation-advisor

READ_AND_APPLY:
- /home/leo/Project/agent-office/docs/agent/TEAM_OPERATING_MODEL.md
- /home/leo/Project/agent-office/docs/agent/roles/advisor.md
- /home/leo/Project/agent-office/docs/agent/roles/reviewer.md
- /home/leo/Project/agent-office/docs/agent/ACTOR_PROJECT_BINDING_MIGRATION.md
- 02_COMMON_ROLE_ALIGNMENT_BRIEF.md in this job folder

ALLOWED_ACTIONS: read only; inspect your own live session/cwd/model/effort; return the ACK below
FORBIDDEN_ACTIONS: file edits, tests, commit, push, candidate review, review verdict for this ACK, implementation, Slack, tmux routing, session/agent/sub-agent creation

Confirm that Reviewer judgment is independent and read-only, assignment and
result routing pass through Foundation Advisor, actual model/effort is never
inferred from the session name, and current canonical verdicts are PASS,
PASS_WITH_RISK, NEEDS_PATCH, and FAIL.

RETURN EXACTLY ONE SHORT BLOCK:

FOUNDATION_TEAM_ROLE_ALIGNMENT_ACK
MISSION_ID: FOUNDATION_TEAM_ROLE_ALIGNMENT_ACK_20260714_01
ACTOR_ID: foundation-reviewer-fable5
SESSION: <actual>
ACTUAL_CWD: <actual>
ACTUAL_MODEL_EFFORT: <actual>
RESPONSIBLE_ADVISOR: foundation-advisor
ADVISOR_ROLE_INSTANCE_ID: foundation-advisor-20260714-01
OWN_ROLE: independent read-only Foundation Reviewer
CANONICAL_VERDICTS: PASS | PASS_WITH_RISK | NEEDS_PATCH | FAIL
RETURN_PATH: foundation-reviewer-fable5 -> foundation-advisor -> Leo/GPT
HISTORICAL_IDENTITY_SEPARATION: ACK
SLACK_USED: NO
STATUS: ACK or HOLD(<reason>)
STOP
