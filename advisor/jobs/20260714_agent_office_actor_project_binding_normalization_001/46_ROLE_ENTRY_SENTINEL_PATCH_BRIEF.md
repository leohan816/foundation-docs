# Root Role-Entry Sentinel Patch Brief

## Exact Route

- Same Worker/session: `agent-office-opus`.
- Required skill: `/fable-builder`; directly read
  `/home/leo/Project/skill/fable-builder/SKILL.md`.
- Read the independent finding directly:
  `/home/leo/Project/foundation-docs/runs/agent-office/20260714_agent_office_actor_project_binding_normalization_001/ROLE_ENTRY_SENTINEL_RESULT.md`.
- Repository/branch: `/home/leo/Project/agent-office`,
  `shadow/agent-office-m1-2-spatial-office`.
- Exact base: `b64ae8c0492beba485ea862d3e1631eb8f11f721`.
- Allowed repository files only: `AGENTS.md`, `CLAUDE.md`.
- Update the existing Worker result only:
  `/home/leo/Project/foundation-docs/runs/agent-office/20260714_agent_office_actor_project_binding_normalization_001/ROLE_ENTRY_PATCH_WORKER_RESULT.md`.

## Required Patch

Close only the three independent-review findings:

1. Replace universal “every/all role results return to Advisor” wording with
   unambiguous routing:
   - every **subordinate** result returns to the responsible Advisor;
   - the Advisor receives subordinate results, writes the mission audit, and
     returns the mission result to Leo/GPT.
   The Advisor must not simultaneously return its result to itself.
2. Replace universal independent-review prohibitions with role-correct wording:
   - no actor may self-review or falsely claim independent review;
   - only the separately assigned independent Reviewer may issue a verdict on
     another actor's work;
   - the Reviewer never patches, accepts risk, or grants final approval;
   - Leo/GPT retains risk acceptance and final approval.
3. Correct the Worker result's inaccurate claim that the prior candidate had no
   universal Advisor self-routing. Record the Reviewer `NEEDS_PATCH`, this exact
   patch, all commits, checks, and final evidence honestly.

Preserve all already-closed criteria from the Sentinel result. Do not rewrite
unrelated text or reopen prior architecture.

## Forbidden and Checks

All forbidden scope from briefs `38` and `40` remains. No product/source/test,
`docs/agent/**`, registry, Slack/AS1, runtime, tmux, other repository, broad
test, main merge, or force-push action.

Targeted checks only:

- exact diff contains only `AGENTS.md` and `CLAUDE.md`;
- no universal result-routing statement includes the Advisor as its own target;
- no universal prohibition blocks the authorized independent Reviewer verdict;
- self-review, false review claims, Reviewer patch/risk/final approval, and
  non-Reviewer verdict issuance remain prohibited;
- Advisor/subordinate authority and Worker-only protocol conditioning remain;
- `git diff --check` clean;
- non-force push; final HEAD equals upstream; Grok paths untouched;
- machine registry remains visibly deferred and mandatory before AS1.

Update the existing Worker result with a new SHA-256 and return it to
`agent-office-advisor`. Stop; do not dispatch the Reviewer.
