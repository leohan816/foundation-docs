========
TARGET_ACTOR: Fable5 Reviewer
TARGET_PROJECT: Agent Office M01 LocalBootstrap private-run gate
TARGET_REPO: ../agent-office (read-only review) and ../foundation-docs (result artifacts only)
TARGET_SESSION_NAME: reviewer-fable5
REQUIRED_SKILL: /fable-sentinel
MODEL_EFFORT: Fable5 Max
READ_AND_EXECUTE: ../foundation-docs/advisor/jobs/20260711_agent_office_m01_localbootstrap_private_run_gate/13_FABLE5_DUAL_REVIEW_HANDOFF_PROMPT.md
RETURN_RESULT_TO: Advisor
DO_NOT_EXECUTE_FROM_MEMORY: true
DO_NOT_BROADEN_SCOPE: true
NO_NEW_AGENT_OR_SUBAGENT: true
NO_NEW_TEMPORARY_SESSION: true
Use the same existing independent Reviewer session. Read the committed handoff directly. Perform separate Level-3 design and implementation/security reviews against actual Agent Office commits abff45c..9c403da. Reproduce evidence, tests, screenshots, docs, Git and no-real-credential/no-delivery boundaries. Do not patch, create a credential, start the real private run, or access forbidden surfaces. Write and push only the two review results and one pointer, return an ASCII-only pointer to Advisor, and STOP.
========
