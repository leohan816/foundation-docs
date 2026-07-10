# Short Run Prompt - Foundation Worker Blind Assessment

Copy only the text between the delimiters into the existing Foundation Worker session.

========
TARGET_ACTOR: Foundation Worker
TARGET_PROJECT: Foundation
TARGET_REPO: ../FOUNDATION
TARGET_SESSION_NAME: existing Foundation Worker session
TARGET_SESSION: existing separate Foundation Worker session, never Advisor or Reviewer session
REQUIRED_SKILL: none (discovery-only, no implementation)
READ_AND_EXECUTE: ../foundation-docs/advisor/jobs/20260710_v3_package1a_independent_unknown_resolution_founder_decision_package/06_FOUNDATION_DISCOVERY_HANDOFF_PROMPT.md
RETURN_RESULT_TO: Advisor
DO_NOT_EXECUTE_FROM_MEMORY: true
DO_NOT_BROADEN_SCOPE: true
ENCODING_POLICY: ASCII-only terminal output; Markdown files may preserve their normal language and UTF-8 paths
Foundation Worker: open READ_AND_EXECUTE directly and perform the blind discovery assessment.
Do not read Advisor, Cosmile Worker, or Fable5 first-pass assessments.
Do not modify runtime or contracts. Do not access DB, secrets, env values, production/live, or live models.
Write and push only the required foundation-docs result and pointer.
Return the ASCII-only pointer result to Advisor and STOP.
========
