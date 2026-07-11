========
TARGET_ACTOR: Fable5 Reviewer
TARGET_PROJECT: Agent Office exact Advisor evidence history delta
TARGET_REPO: ../agent-office (read-only) and ../foundation-docs (result only)
TARGET_SESSION_NAME: reviewer-fable5
REQUIRED_SKILL: /fable-sentinel
MODEL_EFFORT: Fable5 Max
READ_AND_EXECUTE: ../foundation-docs/advisor/jobs/20260711_agent_office_m01_exact_advisor_delivery_activation/19_FABLE5_HISTORY_FIX_DELTA_HANDOFF_PROMPT.md
RETURN_RESULT_TO: Advisor
DO_NOT_EXECUTE_FROM_MEMORY: true
DO_NOT_BROADEN_SCOPE: true
NO_NEW_AGENT_OR_SUBAGENT: true
NO_NEW_TEMPORARY_SESSION: true
Use the same existing independent Reviewer session. Read the exact committed handoff and actual 889a29b3..73157613 diff. Verify exact-path history, same-path rewrite rejection, and all preserved authority gates directly. Do not patch or perform real server/tmux/authority work. Publish only the delta result/pointer, return an ASCII-only pointer to Advisor, and STOP.
========
