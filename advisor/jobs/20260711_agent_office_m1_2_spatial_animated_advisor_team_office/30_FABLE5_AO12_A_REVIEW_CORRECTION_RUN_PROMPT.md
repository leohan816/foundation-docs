========
TARGET_ACTOR: Fable5 Sentinel-ReReview
TARGET_PROJECT: Agent Office M1.2 AO12-A review result factual correction
TARGET_REPO: ../agent-office (read-only) and ../foundation-docs (corrected result only)
TARGET_APP_ROOT: ../agent-office
TARGET_SESSION_NAME: reviewer-fable5
REQUIRED_SKILL: /fable-sentinel
MODEL_EFFORT: Fable5 Max / Level 3 narrow recheck
READ_AND_EXECUTE: ../foundation-docs/advisor/jobs/20260711_agent_office_m1_2_spatial_animated_advisor_team_office/30_FABLE5_AO12_A_REVIEW_CORRECTION_HANDOFF_PROMPT.md
RETURN_RESULT_TO: Advisor
DO_NOT_EXECUTE_FROM_MEMORY: true
DO_NOT_BROADEN_SCOPE: true
NO_NEW_AGENT_OR_SUBAGENT: true
NO_NEW_TEMPORARY_SESSION: true
Read the exact correction handoff and actual naming diff. Correct the unsupported claim that legacy alias runtime replay was preserved, determine whether rejection is design-conformant or a real defect, update only your result and pointer, return the ASCII-only pointer to Advisor, and STOP. AO12-A is not accepted and AO12-B remains unauthorized until this recheck passes.
========
