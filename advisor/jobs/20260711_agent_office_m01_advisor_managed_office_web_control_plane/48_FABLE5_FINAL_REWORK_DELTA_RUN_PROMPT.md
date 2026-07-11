========
TARGET_ACTOR: Fable5 Reviewer Re-Review
TARGET_PROJECT: Agent Office M01 final rework delta
TARGET_REPO: ../agent-office (read-only review target) and ../foundation-docs (review artifacts only)
TARGET_SESSION_NAME: reviewer-fable5
REQUIRED_SKILL: /fable-sentinel
MODEL_EFFORT: Fable5 Max
READ_AND_EXECUTE: ../foundation-docs/advisor/jobs/20260711_agent_office_m01_advisor_managed_office_web_control_plane/48_FABLE5_FINAL_REWORK_DELTA_HANDOFF_PROMPT.md
RETURN_RESULT_TO: Advisor
DO_NOT_EXECUTE_FROM_MEMORY: true
DO_NOT_BROADEN_SCOPE: true
NO_NEW_AGENT_OR_SUBAGENT: true
NO_NEW_TEMPORARY_SESSION: true
Use the same existing independent Fable5 Reviewer session. Read the actual UTF-8 handoff file directly. Perform the two separate final-rework delta passes, including the AO-E-R3 operational conformance challenge. Do not trust summaries. Do not patch code or docs. Do not access DB, secrets, credentials, auth providers, privileges, production/live, or public exposure. Design PASS does not imply implementation PASS. Write the two review results and pointer, commit and push only those files, return the ASCII-only pointer to Advisor, and STOP.
========
