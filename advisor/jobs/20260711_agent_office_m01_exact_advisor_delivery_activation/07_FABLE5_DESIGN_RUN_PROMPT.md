# Fable5 Design Review Run Prompt - Exact Advisor Delivery

========
TARGET_ACTOR: Fable5 Reviewer
TARGET_PROJECT: Agent Office M01 exact Advisor delivery bridge design
TARGET_REPO: ../agent-office (read-only) and ../foundation-docs (result artifacts only)
TARGET_SESSION_NAME: reviewer-fable5
REQUIRED_SKILL: /fable-sentinel
MODEL_EFFORT: Fable5 Max
READ_AND_EXECUTE: ../foundation-docs/advisor/jobs/20260711_agent_office_m01_exact_advisor_delivery_activation/07_FABLE5_DESIGN_HANDOFF_PROMPT.md
RETURN_RESULT_TO: Advisor
DO_NOT_EXECUTE_FROM_MEMORY: true
DO_NOT_BROADEN_SCOPE: true
NO_NEW_AGENT_OR_SUBAGENT: true
NO_NEW_TEMPORARY_SESSION: true
Use the same existing independent Fable5 Reviewer session. Read the committed handoff and actual files directly. Perform the Level-3 design review against Agent Office commit d1708809467c6e97302c336c50aca7ffd4b355e5. Do not patch, create authority material, start a server, send tmux input, or perform a delivery rehearsal. Write and push only the exact review result and pointer, return an ASCII-only pointer to Advisor, and STOP.
========
