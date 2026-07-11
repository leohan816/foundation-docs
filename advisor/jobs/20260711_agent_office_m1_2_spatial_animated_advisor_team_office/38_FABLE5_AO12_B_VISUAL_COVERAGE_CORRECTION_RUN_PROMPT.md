========
TARGET_ACTOR: Fable5 Sentinel-ReReview
TARGET_PROJECT: Agent Office M1.2 AO12-B review visual-coverage correction
TARGET_REPO: ../agent-office (read-only) and ../foundation-docs (corrected result only)
TARGET_APP_ROOT: ../agent-office
TARGET_SESSION_NAME: reviewer-fable5
REQUIRED_SKILL: /fable-sentinel
MODEL_EFFORT: Fable5 Max / Level 3 narrow visual recheck
READ_AND_EXECUTE: ../foundation-docs/advisor/jobs/20260711_agent_office_m1_2_spatial_animated_advisor_team_office/38_FABLE5_AO12_B_VISUAL_COVERAGE_CORRECTION_HANDOFF_PROMPT.md
RETURN_RESULT_TO: Advisor
DO_NOT_EXECUTE_FROM_MEMORY: true
DO_NOT_BROADEN_SCOPE: true
NO_NEW_AGENT_OR_SUBAGENT: true
NO_NEW_TEMPORARY_SESSION: true
Read the exact correction handoff. Directly open and inspect the five AO12-B PNGs that your result only verified mechanically, reconcile all six visual findings with question 13, and correct only your existing result and pointer. Do not patch Agent Office, substitute checksum/test equality for visual inspection, delegate another context, grant approval, or start AO12-C. Return the ASCII-only pointer to Advisor and STOP.
========
