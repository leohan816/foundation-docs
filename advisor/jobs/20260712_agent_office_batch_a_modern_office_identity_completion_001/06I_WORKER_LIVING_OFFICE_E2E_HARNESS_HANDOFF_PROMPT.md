TARGET_ACTOR: Worker-Rework
TARGET_SESSION: separate role session, never Advisor session
SOURCE_ADVISOR_JOB: ../foundation-docs/advisor/jobs/20260712_agent_office_batch_a_modern_office_identity_completion_001
DO_NOT_PASTE_INTO: Advisor session
RETURN_RESULT_TO: Advisor
GPT_DIRECT_USE: inspect only, do not execute unless acting as the target session

This instruction goes to: same existing Agent Office Opus Worker session
Do not paste into: Advisor, Control, Reviewer, or GPT strategy session
Return result to: Advisor

# Agent Office Batch A Living Office E2E Harness

Required skill: `/fable-builder`

Read `51_ADVISOR_LIVING_OFFICE_E2E_HARNESS_SCOPE_AMENDMENT.md` directly. Add
only the exact authorized `playwright.batch-a-living-office.config.ts`, reusing
the real composed runtime while discovering only
`tests/e2e/living-pixel-office.spec.ts` and preserving its exact baseline path.

Do not change either existing Playwright config. Do not add a server, credential,
or authority surface. Run the dedicated Living Office E2E plus composed E2E and
all existing gates, then continue WU-08/WU-09 under the current contract.

