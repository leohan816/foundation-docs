# Intake: Advisor/Designer/Reviewer Session Split

## User Decisions

- Rename live `foundation-advisor` to `agent-office-advisor` while preserving its
  existing context.
- Create a new isolated `foundation-advisor` using GPT-5.6 SOL Max.
- Create a new isolated `foundation-designer` using GPT-5.6 SOL. Its efficient
  default is Max; Ultra is reserved for a documented high-complexity mission.
- Rename `foundation-reviewer-sol` to the model-neutral
  `agent-office-reviewer` after the Founder workspace correction.
- Preserve `foundation-reviewer-fable5` for Foundation, SIASIU, and Cosmile
  review; actual runtime identity must still be reported honestly.
- Bind `foundation-control` to the Foundation Team under
  `foundation-advisor`.
- Inspect every existing tmux pane for process, workspace, readiness, model
  evidence, prompts/errors, dead state, and synchronized input risk.

## Safety Decision

The former Agent Office exact-delivery contract is hard-coded to the historical
`foundation-advisor/$9/@9/%9` name and workspace. The renamed live pane keeps
`$9/@9/%9` but is now `agent-office-advisor` in the canonical Agent Office
workspace. Exact delivery is therefore suspended and fail-closed pending a
separate reviewed locator rebind. The new Foundation Advisor receives no Agent
Office inbox authority.

## Runtime Changes Authorized

Only tmux session naming/onboarding and local role-workspace configuration.
No product implementation, DB, secret, production, browser delivery, or exact
Agent Office transport activation is authorized.

## Founder Workspace Correction

Role names are not repositories. The four accidental top-level role folders are
removed after their unique instructions are preserved under
`advisor/_system/roles/`. Final role tmux contexts run from `agent-office` or
`FOUNDATION`; Foundation Designer rebinds to the exact active Foundation,
SIASIU, or Cosmile repository/worktree for an authorized mission. No product
files are added and no product tests are rerun.
