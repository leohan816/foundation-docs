# Short Run Prompt - Cosmile Assessment Evidence Correction

Copy only the text between the delimiters into the same existing Cosmile Worker session.

========
TARGET_ACTOR: Cosmile Worker Rework
TARGET_PROJECT: Cosmile
TARGET_REPO: ../Cosmile
TARGET_APP_ROOT: ../Cosmile/app
TARGET_SESSION_NAME: cosmile
TARGET_SESSION: same existing Cosmile Worker session that wrote the blind first pass
REQUIRED_SKILL: none (discovery-result correction only)
READ_AND_EXECUTE: ../foundation-docs/advisor/jobs/20260710_v3_package1a_independent_unknown_resolution_founder_decision_package/09_COSMILE_DISCOVERY_REWORK_HANDOFF_PROMPT.md
RETURN_RESULT_TO: Advisor
DO_NOT_EXECUTE_FROM_MEMORY: true
DO_NOT_BROADEN_SCOPE: true
ENCODING_POLICY: ASCII-only terminal output; Markdown files may preserve their normal language and UTF-8 paths
Open READ_AND_EXECUTE directly and correct C-F1 only.
Do not read any other actor assessment or the Advisor independent assessment.
Do not modify Cosmile runtime or access DB, secrets, env values, production/live, or live models.
Commit and push only the corrected foundation-docs assessment and pointer.
Return the ASCII-only pointer result to Advisor and STOP.
========
