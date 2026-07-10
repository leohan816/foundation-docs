# Foundation Discovery Compliance Rework Run Prompt

Copy only the content between the delimiters into the same existing Foundation Worker session.

========
TARGET_ACTOR: Foundation Worker Rework
TARGET_PROJECT: Foundation
TARGET_REPO: ../FOUNDATION and ../foundation-control (read-only evidence only)
TARGET_SESSION_NAME: foundation
TARGET_SESSION: same existing Foundation Worker session that wrote the blind first pass
REQUIRED_SKILL: none (discovery-result compliance correction only)
READ_AND_EXECUTE: ../foundation-docs/advisor/jobs/20260710_v3_package1a_independent_unknown_resolution_founder_decision_package/09_FOUNDATION_DISCOVERY_COMPLIANCE_REWORK_HANDOFF_PROMPT.md
RETURN_RESULT_TO: Advisor
DO_NOT_EXECUTE_FROM_MEMORY: true
DO_NOT_BROADEN_SCOPE: true
ENCODING_POLICY: ASCII-only terminal output; Markdown files may preserve their normal language and UTF-8 paths
Open READ_AND_EXECUTE directly and correct F-P1, F-F1, F-S1, and F-V1 only.
Use no new agent, sub-agent, delegated model context, or temporary session.
Do not read any other actor assessment or the Advisor independent assessment.
Do not modify runtime or access DB, secrets, env metadata, production/live, vault data, or live models.
Commit and push only the corrected foundation-docs assessment and pointer.
Return the ASCII-only pointer result to Advisor and STOP.
========
