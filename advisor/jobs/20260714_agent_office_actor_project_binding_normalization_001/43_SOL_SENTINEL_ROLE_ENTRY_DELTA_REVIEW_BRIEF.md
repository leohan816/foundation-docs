# SOL Sentinel Root Role-Entry Delta Review Brief

## Route

- Same independent Reviewer: `agent-office-reviewer`.
- Runtime: GPT-5.6 SOL xhigh; verify directly before dispatch.
- Required Sentinel source:
  `/home/leo/Project/skill/fable-sentinel/SKILL.md`.
- Review type: exact two-file documentation/authority-entry delta.
- No second Reviewer and no broad replay.

## Exact Candidate

- Repository: `/home/leo/Project/agent-office`.
- Branch: `shadow/agent-office-m1-2-spatial-office`.
- Base: `2c91b7462b5dad8f10b3d8954ca4c20d9d518592`.
- First patch: `911a45b650b7b0e3424940fcc715f5e7b7d0e0e3`.
- Final candidate: `b64ae8c0492beba485ea862d3e1631eb8f11f721`.
- Allowed changed files: `AGENTS.md`, `CLAUDE.md` only.
- Worker result:
  `/home/leo/Project/foundation-docs/runs/agent-office/20260714_agent_office_actor_project_binding_normalization_001/ROLE_ENTRY_PATCH_WORKER_RESULT.md`.
- Worker result SHA-256:
  `6b362dcc201240228aa2dcf0a78a18aeb65ca707da496af1a3eb2eb1e11690d3`.

## Required Review Order

Inspect actual immutable snapshots and diffs before trusting the Worker result.

1. Confirm the final root files are role-neutral and no longer assign every
   actor to the Worker role.
2. Confirm Advisor entry is sourced from a Leo/GPT mission/decision plus
   verified binding and `roles/advisor.md`, never from a self-issued Advisor
   handoff.
3. Confirm subordinate entry is sourced from an exact committed Advisor handoff
   plus verified binding and the matching role document.
4. Confirm a session name alone proves no actor, role, model, effort, readiness,
   or authority fact; disagreements fail closed to the correct authority.
5. Confirm Worker RUN/RESULT/Git/STOP rules remain intact but are conditional on
   Worker assignments rather than universal prerequisites for every role.
6. Confirm Advisor, Designer, Worker, Reviewer, and Leo/GPT separation and
   return routing are coherent; the Advisor does not return to itself,
   implement, or self-review.
7. Confirm all prior safety/security/branch/scope/browser-dispatch/arbitrary
   command/next-mission prohibitions remain intact.
8. Confirm only `AGENTS.md` and `CLAUDE.md` changed, `git diff --check` is clean,
   final HEAD equals upstream, and unrelated Grok paths were not incorporated.
9. Confirm the Worker result accurately reports both patches, validation,
   skipped broad tests, Git evidence, and the still-unmodified machine registry.
10. Confirm the separate minimal config-only machine-registry reconciliation is
    visibly mandatory before AS1 and that this candidate neither performs nor
    authorizes Slack/AS1.

Do not rerun product, visual, browser, Living Office, security, or broad test
suites. This is a documentation/authority-entry review only.

## Write Boundary and Verdict

Candidate files and branches are read-only. Do not patch, commit, push, merge,
touch tmux, start AS1, or dispatch another actor. The only allowed write is:

`/home/leo/Project/foundation-docs/runs/agent-office/20260714_agent_office_actor_project_binding_normalization_001/ROLE_ENTRY_SENTINEL_RESULT.md`

Return exactly one verdict: `PASS`, `PASS_WITH_RISK`, `NEEDS_PATCH`, or `FAIL`,
with direct evidence and the result pointer to `agent-office-advisor`.
