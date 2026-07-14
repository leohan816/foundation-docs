# SOL Sentinel Authority-Chain Delta Re-Review Brief

## Route

- Same independent Reviewer: `agent-office-reviewer`
- Runtime: GPT-5.6 SOL xhigh; verify live before dispatch
- Required skill source: `/home/leo/Project/skill/fable-sentinel/SKILL.md`
- Review type: focused delta re-review of prior P1 only
- No second Reviewer

## Prior Finding

Read the preserved prior result:
`/home/leo/Project/foundation-docs/runs/agent-office/20260714_agent_office_actor_project_binding_normalization_001/SENTINEL_REVIEW_RESULT.md`

Prior verdict: `NEEDS_PATCH`. Finding P1 was a split current-authority chain
between Agent Office, an active-canonical foundation-docs V2 file, and the
FOUNDATION/SIASIU/Cosmile root instruction pairs.

## Exact Patched Subjects

- foundation-docs V2 supersession and Worker result commit:
  `1f50d560cc1c494e1d62cb8e791e38b482b63db9`
- FOUNDATION: previous candidate `e2274bc` -> patched `f6417004d9157766b2b23d4d0870ade7f0c7fe96`
- SIASIU: previous candidate `afa4d90` -> patched `e1830b45c6d2b22b2471bb5957b6aaf7fa6dd602`
- Cosmile: previous candidate `00abe9a` -> patched `6e44aa40ffb2960573839a01424761dc5e98d610`
- Agent Office remains unchanged at `2c91b74`
- VibeNews remains unchanged at `cc7f8cd` on its docs-only review branch
- Worker result SHA-256:
  `f277ac57de598895cce8ecb7239c1a3e7a1130c92fc20cd45c283103002c860b`

## Required Checks

Apply the Sentinel skill. Inspect actual snapshots and diffs, not summaries.

1. The V2 file is unmistakably historical/superseded and cannot claim current
   Team/Actor/role/routing authority or precedence over active repo instructions.
2. Agent Office `docs/agent/` is the sole current common role/routing authority.
3. FOUNDATION, SIASIU, and Cosmile `AGENTS.md`/`CLAUDE.md` pairs agree.
4. No root mandatory pre-read list still requires the superseded V2 file.
5. Historical V2 pointers are labeled historical evidence only.
6. Product/domain/safety constraints remain intact.
7. Changed files are documentation-only, diff-check clean, pushed, and
   upstream-equal; pre-existing unrelated dirt is excluded.
8. The Worker result accurately reports the final commits, checks, deferrals,
   and the still-unmodified machine registry/pre-AS1 gate.

Do not repeat closed review questions except where needed to prove P1 closure.
Do not run product, visual, browser, security, or broad test suites.

## Write Boundary

Candidate/project files are read-only. Do not patch, commit, push, merge, touch
tmux, remove folders, or start AS1. The only allowed write is:

`/home/leo/Project/foundation-docs/runs/agent-office/20260714_agent_office_actor_project_binding_normalization_001/SENTINEL_REREVIEW_RESULT.md`

Return exactly one verdict: `PASS`, `PASS_WITH_RISK`, `NEEDS_PATCH`, or `FAIL`,
plus the result pointer to `agent-office-advisor`.
