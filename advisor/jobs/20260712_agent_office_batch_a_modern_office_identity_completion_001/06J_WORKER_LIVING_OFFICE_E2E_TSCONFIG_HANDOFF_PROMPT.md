TARGET_ACTOR: Worker-Rework
TARGET_SESSION: separate role session, never Advisor session
SOURCE_ADVISOR_JOB: ../foundation-docs/advisor/jobs/20260712_agent_office_batch_a_modern_office_identity_completion_001
DO_NOT_PASTE_INTO: Advisor session
RETURN_RESULT_TO: Advisor
GPT_DIRECT_USE: inspect only, do not execute unless acting as the target session

# Exact Worker Continuation

Read directly:

- `/home/leo/Project/foundation-docs/advisor/jobs/20260712_agent_office_batch_a_modern_office_identity_completion_001/52_ADVISOR_LIVING_OFFICE_E2E_TSCONFIG_REGISTRATION_AMENDMENT.md`
- the existing Batch A Worker handoff and Advisor documents 50 and 51

Use `/fable-builder` and continue in the same existing `agent-office-opus`
session and `/home/leo/Project/agent-office-batch-a-001` worktree.

Apply only the exact `tsconfig.json` include-array registration authorized by
document 52. Do not add an ESLint ignore, suppression, rule change, alternate
config, package change, or source change for this issue. Then rerun the required
lint, typecheck, full check, composed E2E, Living Office E2E, and loopback
rehearsal as applicable. Continue WU-08/WU-09 through result, commit, and
non-force push. Stop only for a mandatory blocker or completed Batch A return.
