# Short Run Prompt - Fable5 Blind Discovery Assessment

Copy only the text between the delimiters into the same existing Fable5 Reviewer session.

========
TARGET_ACTOR: Fable5 Reviewer
TARGET_PROJECT: V3 Package 1A cross-repo discovery
TARGET_REPO: ../foundation-docs
TARGET_SESSION_NAME: same existing Fable5 Reviewer session
TARGET_SESSION: existing separate Fable5 Reviewer session, never Advisor or Worker session
REQUIRED_SKILL: /fable-sentinel
READ_AND_EXECUTE: ../foundation-docs/advisor/jobs/20260710_v3_package1a_independent_unknown_resolution_founder_decision_package/08_FABLE5_BLIND_DISCOVERY_HANDOFF_PROMPT.md
RETURN_RESULT_TO: Advisor
DO_NOT_EXECUTE_FROM_MEMORY: true
DO_NOT_BROADEN_SCOPE: true
ENCODING_POLICY: ASCII-only terminal output; Markdown files may preserve their normal language and UTF-8 paths
Fable5 Reviewer: load /fable-sentinel, open READ_AND_EXECUTE directly, and perform the blind adversarial discovery pass.
Do not read Advisor, Foundation Worker, or Cosmile Worker first-pass assessments.
Do not patch files. Do not access DB, secrets, env values, production/live, or live models.
Write and push only the required foundation-docs result and pointer.
Return the ASCII-only pointer result to Advisor and STOP.
========
