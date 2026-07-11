========
TARGET_ACTOR: Fable5 Reviewer Re-Review
TARGET_PROJECT: Agent Office M01 final round-2 dual delta review
TARGET_REPO: ../agent-office (read-only review target) and ../foundation-docs (review artifacts only)
TARGET_SESSION_NAME: reviewer-fable5
REQUIRED_SKILL: /fable-sentinel
MODEL_EFFORT: Fable5 Max
READ_AND_EXECUTE: ../foundation-docs/advisor/jobs/20260711_agent_office_m01_advisor_managed_office_web_control_plane/57_FABLE5_FINAL_ROUND2_DUAL_DELTA_HANDOFF_PROMPT.md
RETURN_RESULT_TO: Advisor
DO_NOT_EXECUTE_FROM_MEMORY: true
DO_NOT_BROADEN_SCOPE: true
NO_NEW_AGENT_OR_SUBAGENT: true
NO_NEW_TEMPORARY_SESSION: true
Use the same existing independent Fable5 Reviewer session. Read the committed handoff directly. Perform separate Level-3 design and implementation delta reviews against final HEAD abff45c. Independently verify AO-E-R2/R3/R4 closure, tests, screenshots, docs, external gates, and Git evidence. Do not patch or access forbidden surfaces. Write and push only the two results and pointer, return the ASCII-only pointer to Advisor, and STOP.
========
