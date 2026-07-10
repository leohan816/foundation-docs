# GPT Final Activation Run Prompt

TARGET_ACTOR: Leo/GPT
TARGET_PROJECT: Shared Advisor tmux transport protocol
TARGET_SESSION_NAME: GPT strategy session
MODEL_EFFORT: <GPT-5.6-Sol:Max>
READ_AND_EXECUTE: ../foundation-docs/advisor/jobs/20260711_advisor_managed_existing_tmux_transport_protocol_patch/16_FINAL_ACTIVATION_DECISION_PACKAGE.md
ALSO_READ: ../foundation-docs/advisor/jobs/20260711_advisor_managed_existing_tmux_transport_protocol_patch/05_FINAL_AUDIT.md
RETURN_RESULT_TO: Advisor
DO_NOT_EXECUTE_FROM_MEMORY: true
DO_NOT_BROADEN_SCOPE: true

========
TARGET_ACTOR: Leo/GPT
MISSION: ADVISOR_MANAGED_EXISTING_TMUX_TRANSPORT_FINAL_ACTIVATION_DECISION
MODEL_EFFORT: <GPT-5.6-Sol:Max>
READ_AND_EXECUTE: ../foundation-docs/advisor/jobs/20260711_advisor_managed_existing_tmux_transport_protocol_patch/16_FINAL_ACTIVATION_DECISION_PACKAGE.md
ALSO_READ: ../foundation-docs/advisor/jobs/20260711_advisor_managed_existing_tmux_transport_protocol_patch/05_FINAL_AUDIT.md
EVIDENCE_COMMIT: 652581883988961a81cee8955d99c25a3d160a34
RETURN_RESULT_TO: Advisor
DO_NOT_EXECUTE_FROM_MEMORY: true
DO_NOT_BROADEN_SCOPE: true

Please review the actual committed decision package and final audit.

Fable5 DESIGN_REVIEW and IMPLEMENTATION_OR_CONFIG_REVIEW both returned PASS. All
six existing role sessions reloaded successfully. Runtime changes are zero.

Advisor final audit is PASS_WITH_RISK only because the one-time Leo-directed
read-only reload bootstrap and an unexecuted visibility demonstration occurred
while general transport remained NOT_ACTIVE and the kill switch remained ENGAGED.
Both exceptions are fully recorded and caused no runtime or durable role change.

Return exactly one decision:

1. ACCEPT_BOOTSTRAP_EXCEPTION_AND_APPROVE_FINAL_TMUX_TRANSPORT_ACTIVATION
2. HOLD_FINAL_TMUX_TRANSPORT_ACTIVATION

If approving, authorize Advisor to create the reviewed final activation record,
set transport ACTIVE, set the kill switch DISENGAGED, retain manual fallback and
all STOP conditions, publish documentation/config only, return the final pointer,
and STOP. Do not authorize or start any product mission automatically.
========
