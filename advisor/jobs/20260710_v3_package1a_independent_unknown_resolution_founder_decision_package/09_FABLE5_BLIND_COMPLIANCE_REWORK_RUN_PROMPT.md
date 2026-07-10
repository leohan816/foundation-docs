# Fable5 Blind Compliance Rework Run Prompt

Copy only the content between the delimiters into the same existing Fable5 Reviewer session.

========
TARGET_ACTOR: Fable5 Reviewer Rework
TARGET_PROJECT: V3 Package 1A blind discovery
TARGET_REPO: ../foundation-docs plus cited repos for read-only evidence
TARGET_SESSION_NAME: existing Fable5 Reviewer
TARGET_SESSION: same existing Fable5 Reviewer session that wrote the blind adversarial pass
REQUIRED_SKILL: /fable-sentinel
READ_AND_EXECUTE: ../foundation-docs/advisor/jobs/20260710_v3_package1a_independent_unknown_resolution_founder_decision_package/09_FABLE5_BLIND_COMPLIANCE_REWORK_HANDOFF_PROMPT.md
RETURN_RESULT_TO: Advisor
DO_NOT_EXECUTE_FROM_MEMORY: true
DO_NOT_BROADEN_SCOPE: true
ENCODING_POLICY: ASCII-only terminal output; Markdown files may preserve their normal language and UTF-8 paths
Open READ_AND_EXECUTE directly and correct FB-P1, FB-E1, and FB-F1 only.
Use no new agent, sub-agent, delegated model context, or temporary session.
Do not read any other actor assessment or the Advisor independent assessment.
Do not modify runtime or access DB metadata, secrets, env metadata, production/live, or live models.
Commit and push only the corrected foundation-docs assessment and pointer.
Return the ASCII-only pointer result to Advisor and STOP.
========
