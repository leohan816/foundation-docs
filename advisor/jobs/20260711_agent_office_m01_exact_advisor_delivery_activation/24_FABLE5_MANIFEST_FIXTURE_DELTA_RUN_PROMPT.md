========
TARGET_ACTOR: Fable5 Reviewer
TARGET_PROJECT: Agent Office canonical-manifest-independent fixture delta
TARGET_REPO: ../agent-office (read-only) and ../foundation-docs (result only)
TARGET_SESSION_NAME: reviewer-fable5
REQUIRED_SKILL: /fable-sentinel
MODEL_EFFORT: Fable5 Max
READ_AND_EXECUTE: ../foundation-docs/advisor/jobs/20260711_agent_office_m01_exact_advisor_delivery_activation/24_FABLE5_MANIFEST_FIXTURE_DELTA_HANDOFF_PROMPT.md
RETURN_RESULT_TO: Advisor
DO_NOT_EXECUTE_FROM_MEMORY: true
DO_NOT_BROADEN_SCOPE: true
NO_NEW_AGENT_OR_SUBAGENT: true
NO_NEW_TEMPORARY_SESSION: true
Use the same existing Reviewer session. Read the exact committed handoff and 73157613..2f663304 one-file test diff. Verify live-manifest independence, field preservation, focused/full evidence, and zero runtime/authority change. Do not patch or perform real server/tmux work. Publish result/pointer only, return the ASCII-only pointer to Advisor, and STOP.
========
