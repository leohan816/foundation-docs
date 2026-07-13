TARGET_ACTOR: Worker-Rework
TARGET_SESSION: separate role session, never Advisor session
SOURCE_ADVISOR_JOB: ../foundation-docs/advisor/jobs/20260712_agent_office_batch_a_modern_office_identity_completion_001
DO_NOT_PASTE_INTO: Advisor session
RETURN_RESULT_TO: Advisor
GPT_DIRECT_USE: inspect only, do not execute unless acting as the target session

This instruction goes to: same existing Agent Office Opus Worker session
Do not paste into: Advisor, Control, Reviewer, or GPT strategy session
Return result to: Advisor

# Agent Office Batch A Render-Host Test Scope Resume

Required skill: `/fable-builder`

Mission: `AGENT_OFFICE_BATCH_A_MODERN_OFFICE_IDENTITY_COMPLETION_001`

Target: `/home/leo/Project/agent-office-batch-a-001`

Branch: `batch-a/modern-office-identity-001`

Clean Worker checkpoint: `da2ad0ead6e5775e69eebefe5a20fd81f50ca732`

This handoff amends `06E_WORKER_FINAL_DESIGN_RESUME_HANDOFF_PROMPT.md` only by
adding the exact two source-coupled tests authorized in
`48_ADVISOR_RENDER_HOST_TEST_SCOPE_AMENDMENT.md`. Every other scope, safety,
test, evidence, Git, no-Grok, excluded-session, and result rule remains in force.

No agents, sub-agents, delegated contexts, or temporary sessions.

## Required Reads

Read directly:

1. this handoff;
2. `48_ADVISOR_RENDER_HOST_TEST_SCOPE_AMENDMENT.md`;
3. `06E_WORKER_FINAL_DESIGN_RESUME_HANDOFF_PROMPT.md`;
4. current target worktree instructions and accepted canonical design.

## Entry Gate

Verify exact same `agent-office-opus` session, Opus 4.8 (1M), Ultracode,
`/fable-builder`, exact target worktree/branch, clean HEAD `da2ad0e`, no
concurrent writer, and no auth/privilege/security prompt. Preserve all five
accepted Worker commits. Do not reset, recreate, or rewrite them. The branch may
be ahead of upstream by the two new clean Worker commits; that is expected until
the final authorized push.

## Exact Scope Correction

The two additionally authorized paths are:

- `tests/ui/pixi-public-export-bridge.test.ts`
- `tests/ui/pixel-renderer-lifecycle.test.tsx`

Correct them so the accepted lifecycle assertions inspect the shared
`pixel-render-host.tsx`, while `renderer-boundary.tsx` is verified as a consumer
of `PixelRenderHost`. Preserve all bridge pins, strict checks, lifecycle safety,
and assertion strength. No skip, suppression, deletion, or duplicate lifecycle
implementation is allowed.

Recreate the reverted design-required `pixel-render-host.tsx`,
`pixel-frame-stage.tsx`, and bounded consumer edits; complete the remaining
production render chain. Run the focused two tests plus renderer/prototype tests,
lint, typecheck, and full regression before preserving the increment.

Then continue WU-01 and WU-05 through WU-09 under the existing
`NO_INTERMEDIATE_CHAT_STOP` policy. Stop only for a mission mandatory condition
or completed Batch A return.

Complete fresh visual evidence, local rehearsal, final tests/build, commit and
non-force push, Worker result, and exact pointer under the existing result
contract. Return to Advisor and STOP. Do not start review or Batch B.

