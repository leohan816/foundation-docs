# Fable5 Dual Review Run Prompt

TARGET_ACTOR: Fable5 Reviewer
TARGET_PROJECT: Shared Advisor tmux transport protocol
TARGET_REPO: ../foundation-docs plus read-only referenced workspaces
TARGET_SESSION_NAME: dev
REQUIRED_SKILL: /fable-sentinel
MODEL_EFFORT: <Fable5:Max>
READ_AND_EXECUTE: ../foundation-docs/advisor/jobs/20260711_advisor_managed_existing_tmux_transport_protocol_patch/07_FABLE5_DUAL_REVIEW_HANDOFF_PROMPT.md
RETURN_RESULT_TO: Advisor
DO_NOT_EXECUTE_FROM_MEMORY: true
DO_NOT_BROADEN_SCOPE: true

========
TARGET_ACTOR: Fable5 Reviewer
TARGET_SESSION_NAME: dev
MODEL_EFFORT: <Fable5:Max>
REQUIRED_SKILL: /fable-sentinel
READ_AND_EXECUTE: ../foundation-docs/advisor/jobs/20260711_advisor_managed_existing_tmux_transport_protocol_patch/07_FABLE5_DUAL_REVIEW_HANDOFF_PROMPT.md
RETURN_RESULT_TO: Advisor
DO_NOT_EXECUTE_FROM_MEMORY: true
DO_NOT_BROADEN_SCOPE: true

Open the committed UTF-8 handoff file directly. Perform the two required review
passes in this same existing independent Fable5 Reviewer session. Produce separate
artifacts and separate verdicts for DESIGN_REVIEW and
IMPLEMENTATION_OR_CONFIG_REVIEW.

Do not send tmux input, modify reviewed files, create sessions or agents, access DB
or secrets, reload roles, or activate transport. Return ASCII-only pointers to
Advisor and STOP.
========
