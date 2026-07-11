# Agent Office M01 Batch C Visual Baseline Rework Handoff

TARGET_ACTOR: Agent Office Worker-Rework
TARGET_SESSION: same existing `agent-office` Codex session
SOURCE_ADVISOR_JOB: ../foundation-docs/advisor/jobs/20260711_agent_office_m01_advisor_managed_office_web_control_plane
DO_NOT_PASTE_INTO: Advisor or reviewer-fable5
RETURN_RESULT_TO: Advisor
GPT_DIRECT_USE: inspect only

## Work Mode

`IMPLEMENTATION_BATCH_C_REWORK__VISUAL_BASELINE_CONFORMANCE_ONLY`

Model/effort: `<GPT-5.6-Sol:Ultra>`

Use the same existing Worker session/context. Do not create or use agents,
sub-agents, delegated model contexts, temporary sessions, or another Worker.

## Required Reads

Read this handoff, `28_ADVISOR_BATCH_C_VALIDATION.md`, the final Batch C code at
target commit `6d53b493...`, Playwright configuration and tests, all three
committed baselines, actual final scene CSS/state machine/fixtures/component,
and the prior Worker result and pointer. Do not rely on the prior 10/10 claim.

## Exact Rework

1. Confirm branch `shadow/agent-office-m01`, HEAD equals upstream, and no
   unrelated target-repo change exists.
2. Reproduce the three visual comparison failures before changing baselines.
3. Regenerate only the desktop 1440x900, mobile 390x844, and reduced-motion
   1440x900 deterministic baseline images with the authorized test command.
4. Directly inspect each regenerated image for overlap, clipping, horizontal
   loss, unreadable labels, wrong fixture/state/destination, mobile pagination,
   reduced-motion route suppression, and system/user/secret data leakage.
5. If a product visual defect exists, STOP. Product code is not authorized here.
6. If correct, run sequentially: lint, strict typecheck, full Vitest, build,
   Playwright, dependency audit, `git diff --check`, and forbidden-scope checks.
7. Require 10/10 Playwright and all 123 prior tests. Do not reuse an existing
   server, loosen thresholds, delete tests, or suppress failures.
8. Commit only the three baseline images as one narrow target commit and push
   the current shadow branch non-force. No source/config/dependency change.
9. Update the prior result to preserve the stale-baseline history, Advisor
   reproduction, correction commit/hashes, visual inspection, and final checks.
10. Update the exact pointer. Commit/push only those two foundation-docs files.

## Result Paths

- result: `../foundation-docs/runs/agent-office/20260711_agent_office_m01_advisor_managed_office_web_control_plane/WORKER_BATCH_C_RESULT.md`
- pointer: `../foundation-docs/advisor/jobs/20260711_agent_office_m01_advisor_managed_office_web_control_plane/27_WORKER_BATCH_C_RESULT_POINTER.md`

Terminal summary must be ASCII-only. Repository content may remain UTF-8.

## Forbidden

- product source/state machine/fixture/CSS/config/dependency/test-logic changes;
- threshold relaxation or blind baseline acceptance;
- Batch D or later work;
- DB, secret, auth, privilege, deployment, production/live;
- main push/merge, force push, unrelated staging;
- new session, agent, sub-agent, or delegated context.

Return the corrected durable pointer to Advisor and STOP.
