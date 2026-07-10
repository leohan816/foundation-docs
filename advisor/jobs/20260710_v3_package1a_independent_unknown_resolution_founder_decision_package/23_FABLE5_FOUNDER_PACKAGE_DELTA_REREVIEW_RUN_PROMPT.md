# Fable5 Founder Package Delta Re-Review Run Prompt

Copy only the content between the delimiters into the same existing Fable5 Reviewer session.

========
TARGET_ACTOR: Fable5 Reviewer Delta Re-Review
TARGET_PROJECT: V3 Package 1A founder decision package
TARGET_REPO: ../foundation-docs
TARGET_SESSION_NAME: existing Fable5 Reviewer
TARGET_SESSION: same existing Fable5 Reviewer session that issued founder-package NEEDS_PATCH
REQUIRED_SKILL: /fable-sentinel
REVIEW_PASS: DESIGN_REVIEW__FOUNDER_PACKAGE_CHALLENGE_DELTA_REREVIEW
READ_AND_EXECUTE: ../foundation-docs/advisor/jobs/20260710_v3_package1a_independent_unknown_resolution_founder_decision_package/23_FABLE5_FOUNDER_PACKAGE_DELTA_REREVIEW_HANDOFF_PROMPT.md
RETURN_RESULT_TO: Advisor
DO_NOT_EXECUTE_FROM_MEMORY: true
DO_NOT_BROADEN_SCOPE: true
NO_NEW_AGENT_OR_SUBAGENT: true
ENCODING_POLICY: ASCII-only terminal output; Markdown files may preserve their normal language and UTF-8 paths
Open READ_AND_EXECUTE directly and perform the fixed P-1 through P-9 delta re-review.
Inspect the actual patched founder package and acceptance sheet plus their diff from base commit 2b43cf1.
Do not patch files, choose product policy, access DB/secrets/env metadata, invoke Control, or start Package 1B.
Commit and push only the delta re-review result and pointer in foundation-docs.
Return the ASCII-only pointer result to Advisor and STOP.
========
