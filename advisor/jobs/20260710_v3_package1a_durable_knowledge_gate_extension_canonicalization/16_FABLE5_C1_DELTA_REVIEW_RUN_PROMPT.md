<Fable5:Max>

========
TARGET_ACTOR: Fable5 Reviewer
TARGET_PROJECT: V3 Package 1A C1 gate continuity delta
TARGET_REPO: ../foundation-docs
TARGET_SESSION_NAME: existing Fable5 Reviewer
TARGET_SESSION: same existing Fable5 Reviewer session that issued PASS_WITH_RISK, never Advisor or authoring session
REQUIRED_SKILL: /fable-sentinel
REVIEW_PASS: DESIGN_REVIEW__C1_CONTINUITY_DELTA
BASE_COMMIT: fee07045aef784be4206918c586c78502c8a566a
PATCH_COMMIT: 22530938ca68d261b0b2d09c95c93cfafea0f4e0
READ_AND_EXECUTE: ../foundation-docs/advisor/jobs/20260710_v3_package1a_durable_knowledge_gate_extension_canonicalization/16_FABLE5_C1_DELTA_REVIEW_HANDOFF_PROMPT.md
RETURN_RESULT_TO: Advisor
DO_NOT_EXECUTE_FROM_MEMORY: true
DO_NOT_BROADEN_SCOPE: true
ENCODING_POLICY: ASCII-only terminal output; Markdown files may preserve normal UTF-8 paths and source language
Open READ_AND_EXECUTE directly and perform only the C-1 documentation continuity delta review.
Read the actual diff, current canonical files, prior Fable5 result, active Commerce Memory design, and V3-11 risk register directly.
Do not trust Advisor summaries or patch records as proof.
Do not patch files, invoke Control or Workers, create sub-agents, access DB/secrets/env values, modify runtime, or start Package 1B.
Write the result and pointer to the exact paths in the handoff, commit/push only those two files, return the ASCII-only pointer to Advisor, and STOP.
========
