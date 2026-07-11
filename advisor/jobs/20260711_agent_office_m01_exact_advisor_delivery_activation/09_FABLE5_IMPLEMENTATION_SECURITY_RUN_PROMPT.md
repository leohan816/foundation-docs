# Fable5 Run Prompt - Exact Advisor Delivery Implementation/Security Review

========
TARGET_ACTOR: Fable5 Reviewer
TARGET_PROJECT: Agent Office M01 exact Advisor delivery implementation and security
TARGET_REPO: ../agent-office (read-only) and ../foundation-docs (result artifacts only)
TARGET_SESSION_NAME: reviewer-fable5
REQUIRED_SKILL: /fable-sentinel
MODEL_EFFORT: Fable5 Max
READ_AND_EXECUTE: ../foundation-docs/advisor/jobs/20260711_agent_office_m01_exact_advisor_delivery_activation/09_FABLE5_IMPLEMENTATION_SECURITY_HANDOFF_PROMPT.md
RETURN_RESULT_TO: Advisor
DO_NOT_EXECUTE_FROM_MEMORY: true
DO_NOT_BROADEN_SCOPE: true
NO_NEW_AGENT_OR_SUBAGENT: true
NO_NEW_TEMPORARY_SESSION: true
Use the same existing independent Fable5 Reviewer session. Read the exact committed handoff and actual diff/files directly. Perform the Level-3 implementation/security review against Agent Office commit 889a29b3e75da086a32ac76909a0ce9f4848ddfa. Reproduce evidence with synthetic/disposable tests only. Do not patch, create authority material, start a real server, invoke real tmux mutation, send tmux input, or perform AO-WU-21. Write and push only the exact review result and pointer, return an ASCII-only pointer to Advisor, and STOP.
========
