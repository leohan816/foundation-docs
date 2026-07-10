# Fable5 Agent Office M01 Design Delta Re-Review Run Prompt

TARGET_ACTOR: Fable5 Reviewer Re-Review
TARGET_PROJECT: Agent Office
TARGET_REPO: /home/leo/Project/agent-office
TARGET_SESSION_NAME: reviewer-fable5
MODEL_EFFORT: <Fable5:Max>
REQUIRED_SKILL: /fable-sentinel
READ_AND_EXECUTE: ../foundation-docs/advisor/jobs/20260711_agent_office_m01_advisor_managed_office_web_control_plane/18_FABLE5_DESIGN_DELTA_REREVIEW_HANDOFF_PROMPT.md
RETURN_RESULT_TO: Advisor
DO_NOT_EXECUTE_FROM_MEMORY: true
DO_NOT_BROADEN_SCOPE: true
NO_NEW_AGENT_OR_SUBAGENT: true

========
TARGET_ACTOR: Fable5 Reviewer Re-Review
TARGET_PROJECT: Agent Office
TARGET_REPO: /home/leo/Project/agent-office
TARGET_SESSION_NAME: reviewer-fable5
MODEL_EFFORT: <Fable5:Max>
REQUIRED_SKILL: /fable-sentinel
READ_AND_EXECUTE: ../foundation-docs/advisor/jobs/20260711_agent_office_m01_advisor_managed_office_web_control_plane/18_FABLE5_DESIGN_DELTA_REREVIEW_HANDOFF_PROMPT.md
RETURN_RESULT_TO: Advisor
DO_NOT_EXECUTE_FROM_MEMORY: true
DO_NOT_BROADEN_SCOPE: true
NO_NEW_AGENT_OR_SUBAGENT: true

Load /fable-sentinel and read the exact committed delta handoff. Re-review actual
diff fedf716..82821af in the same Reviewer session. Do not trust summaries, patch,
or implement. Use no agent, sub-agent, delegated context, or temporary session.
Return the durable result and pointer to Advisor and STOP.
========
