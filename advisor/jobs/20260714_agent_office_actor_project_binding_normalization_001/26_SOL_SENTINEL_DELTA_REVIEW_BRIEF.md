# SOL Sentinel Ownership/Reference Delta Review Brief

## Reviewer Routing Decision

- Target actor: independent Sentinel
- Session: `agent-office-reviewer` (`$20/@20/%20`)
- Verified runtime before dispatch: GPT-5.6 SOL, xhigh, Agent Office workspace
- Required skill: `/fable-sentinel`
- Required skill source: `/home/leo/Project/skill/fable-sentinel/SKILL.md`
- Review level: Level 1 focused cross-repository documentation/authority delta
- One Reviewer only
- Return to: `agent-office-advisor`

## Immutable Subjects

- Agent Office canonical checkout:
  - base `ac8ba75d3a128385beaeeac58ae5bf54c03d23f2`
  - candidate `2c91b74`
  - allowed paths: `AGENTS.md`, `CLAUDE.md`, `docs/agent/**`
- FOUNDATION: base `f240867`, candidate `e2274bc`
- SIASIU: base `0b59434`, candidate `afa4d90`
- Cosmile: base `e4ed668`, candidate `00abe9a`
- VibeNews docs-only branch: base `7864e530`, candidate `cc7f8cd`
- Worker result:
  `/home/leo/Project/foundation-docs/runs/agent-office/20260714_agent_office_actor_project_binding_normalization_001/WORKER_RESULT.md`
- Founder/Advisor authority:
  `20_FINAL_CANONICAL_OWNERSHIP_CORRECTION.md`,
  `22_OWNERSHIP_REFERENCE_DELTA_BRIEF.md`, and
  `24_CANONICAL_PATH_AVAILABILITY_DELTA.md`

## Review Order And Exact Questions

Read and apply the required skill source before reviewing. Inspect actual files
and diffs; do not trust the Worker summary.

1. Is Agent Office `docs/agent/` unambiguously the current common authority for
   Team, Actor, role, Advisor-led routine, onboarding, dispatch, and
   tmux/runtime-binding rules?
2. Is foundation-docs limited to evidence/history/audit/migration/pointers, with
   no current authority claim introduced by this mission?
3. Do all common roles preserve the same default Advisor-led routine, clear
   authority, prohibitions, evidence, dispatch prerequisites, and result routing?
4. Does the Advisor role require evidence-backed instruction validation before
   execution using `PROCEED | PROCEED_WITH_LIMITS | NEEDS_DECISION | HOLD |
   FAIL`?
5. Are Agent Office and Foundation Team relationships accurate, with Control,
   Designer, Worker, and Reviewer subordinate to the responsible Advisor while
   Reviewer judgment remains independent?
6. Do Agent Office, FOUNDATION, SIASIU, Cosmile, and VibeNews root instructions
   point to the Agent Office common authority while preserving narrower local
   protocols and historical evidence links?
7. Are current role names correct (`SIASIU Worker`), with no new current Shashu
   naming?
8. Do workspace rules prohibit role-named top-level folders and name canonical
   repositories/authorized worktrees instead?
9. Is the existing machine registry explicitly unchanged, with a separate
   minimal config-only reconciliation mandatory before AS1 Slack Pilot?
10. Are all changes documentation-only, pushed, upstream-equal, and free of
    source/test/schema/product/Slack/tmux changes?

## Review Limits

- Delta-only: no product tests, visual tests, broad audit, or historical replay.
- Read-only candidate inspection. Do not patch candidate/project files, commit,
  push, merge, remove folders, manipulate tmux, or start AS1.
- The only allowed write is the required `SENTINEL_REVIEW_RESULT.md` result file
  below. This exception does not authorize any candidate or project change.
- The four accidental folders and final live tmux rebinding remain Advisor final
  cleanup items; verify the documented intended state, not completion yet.

## Required Result

Write:
`/home/leo/Project/foundation-docs/runs/agent-office/20260714_agent_office_actor_project_binding_normalization_001/SENTINEL_REVIEW_RESULT.md`

Include actual model/effort, exact subjects, direct checks, findings, residual
risks, and exactly one verdict: `PASS`, `PASS_WITH_RISK`, `NEEDS_PATCH`, or
`FAIL`. Return only the pointer to Advisor.
