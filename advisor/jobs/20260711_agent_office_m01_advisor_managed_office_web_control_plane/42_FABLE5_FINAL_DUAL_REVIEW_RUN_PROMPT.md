# Fable5 Agent Office M01 Final Dual Review Run Prompt

NO_NEW_AGENT_OR_SUBAGENT: true

========
TARGET_ACTOR: Fable5 Reviewer
TARGET_PROJECT: Agent Office
TARGET_REPO: /home/leo/Project/agent-office
TARGET_SESSION_NAME: reviewer-fable5
MODEL_EFFORT: <Fable5:Max>
REQUIRED_SKILL: /fable-sentinel
READ_AND_EXECUTE: ../foundation-docs/advisor/jobs/20260711_agent_office_m01_advisor_managed_office_web_control_plane/42_FABLE5_FINAL_DUAL_REVIEW_HANDOFF_PROMPT.md
RETURN_RESULT_TO: Advisor
DO_NOT_EXECUTE_FROM_MEMORY: true
DO_NOT_BROADEN_SCOPE: true
NO_NEW_AGENT_OR_SUBAGENT: true
TERMINAL_OUTPUT_POLICY: ASCII_ONLY

Read the exact committed handoff and perform separate final design and
implementation review passes. Read actual source, tests, canonical documents,
commits, diffs, and Git evidence. Independently reproduce AO-E-R1 and AO-E-R2.
Do not trust summaries, patch code/docs, create a new context, use secrets/DB,
or grant final approval. Write two distinct result artifacts plus one pointer,
commit/push only those files, return to Advisor, and STOP.
========
