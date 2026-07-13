TARGET_ACTOR: Worker-Rework
TARGET_SESSION: separate role session, never Advisor session
SOURCE_ADVISOR_JOB: ../foundation-docs/advisor/jobs/20260712_agent_office_batch_a_modern_office_identity_completion_001
DO_NOT_PASTE_INTO: Advisor session
RETURN_RESULT_TO: Advisor
GPT_DIRECT_USE: inspect only, do not execute unless acting as the target session

This instruction goes to: same existing Agent Office Opus Worker session
Do not paste into: Advisor, Control, Reviewer, or GPT strategy session
Return result to: Advisor

# Agent Office Batch A Final-Design Implementation Resume

Required skill: `/fable-builder`

Mission: `AGENT_OFFICE_BATCH_A_MODERN_OFFICE_IDENTITY_COMPLETION_001`

Target: `/home/leo/Project/agent-office-batch-a-001`

Branch: `batch-a/modern-office-identity-001`

Current accepted checkpoint: `535f39aaf090043e4d7e1ddaf7d369a0c321b159`

This handoff amends and supersedes only the base/design details of
`06B_WORKER_IMPLEMENTATION_HANDOFF_PROMPT.md`. Every safety, evidence, result,
test, Git, no-Grok, excluded-session, and forbidden-scope rule in 06B remains in
force.

No agents, sub-agents, delegated contexts, or temporary sessions.

## Required Reads

Read directly, in order:

1. this handoff;
2. `06B_WORKER_IMPLEMENTATION_HANDOFF_PROMPT.md` for the full Worker contract;
3. `47_ADVISOR_FINAL_DESIGN_ACCEPTANCE_SUPERSEDING.md`;
4. current repo `AGENTS.md`, `CLAUDE.md`, `docs/agent/RUN_PROTOCOL.md`, and
   `docs/agent/RESULT_REPORTING_PROTOCOL.md`;
5. the four current canonical documents at commit `535f39a`;
6. actual current source/tests named by current design section 9 and the WorkUnit
   plan.

Do not implement from memory or from an older Control summary.

## Entry Gate

Verify and record before editing:

- exact session `agent-office-opus`;
- actual model Opus 4.8 (1M), effort Ultracode, `/fable-builder` loaded;
- exact worktree/branch/HEAD `535f39a`;
- clean worktree and upstream equality;
- `3174c67`, `6f99259`, and `242e49c` are in ancestry;
- failed Grok branch/worktree remains isolated and unmerged;
- excluded historical `agent-office` session received no input;
- no concurrent Agent Office writer;
- no auth/privilege/secret/DB/production/approval prompt.

Do not reset, revert, recreate, or rewrite the accepted implementation commits.

## Remaining Implementation

Resume BA-WU-01 part 2, then BA-WU-05 through BA-WU-09 in dependency order.
Patch BA-WU-01/02/03/04 code only where the current reviewed design explicitly
requires integration or source-exactness conformance.

The current design now explicitly requires:

1. fixture-free shared frame primitives and a separate production frame/render
   chain with no prototype fixture/type/projector edge;
2. lazy production Office integration while the eager/fallback graph stays
   Pixi-free;
3. exact raw `parseRawLivingOfficePresentation` validation before client state
   and exact seven-field composed-input validation before lazy mount;
4. total committed layout using sole `projectKey`, non-sentinel Pod
   `AdvisorTeam`, valid responsible Advisor, deterministic actor priority,
   selection/M1 fallback, viewport/time defaults, and
   `fullOfficeCamera(...) -> FULL_OFFICE`;
5. explicit empty cues and fail-closed progress zero;
6. literal fixture-free structural projection to overlay/mirror/HUD;
7. exact Vite 8.1.4/Rolldown 1.1.5 in-memory output-graph tests with eager
   `index.html` facade, `src/ui/main.tsx` in `.modules`, and the production
   Office dynamic facade;
8. complete Office-first shell, secondary views, role surfaces, accessibility,
   Channy, responsive/static/reduced-motion, fresh visual evidence, and local
   start/open/stop/zero-listener rehearsal required by WU-05 through WU-09.

The literal source/test/docs list in current design section 9 and the current
WorkUnit plan is the closed write scope. No wildcard or unlisted path is
authorized. If a real technical need requires another path, stop only that edit
and return the exact scope exception to Advisor; do not improvise.

## Continuation Policy

`NO_INTERMEDIATE_CHAT_STOP: true`

Do not stop for WorkUnit completion, routine test/lint/type/build failure,
ordinary patching, evidence generation, or pacing. Correct routine failures and
continue in this same session across as many turns as needed.

Stop only for a mission mandatory condition: new product/security/authority
decision, auth/credential/privilege action, destructive or irreversible action,
unresolved blocker, unavailable required runtime, or completed Batch A return.

## Completion And Result

Run every focused and complete gate in 06B/current WorkUnit plan, record every
failure honestly, generate fresh visual/runtime evidence, commit and non-force
push the exact branch, and verify clean/upstream equality.

Write:

- `/home/leo/Project/foundation-docs/runs/agent-office/20260712_agent_office_batch_a_modern_office_identity_completion_001/WORKER_RESULT.md`;
- `/home/leo/Project/foundation-docs/advisor/jobs/20260712_agent_office_batch_a_modern_office_identity_completion_001/12_WORKER_RESULT_POINTER.md`.

Commit/push only those exact Foundation Docs result/pointer files separately.
Return the short pointer to Advisor and STOP. Do not start independent review or
Batch B.

