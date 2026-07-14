# Advisor Brief

## Required Structure

```text
Project = canonical repository folder
Actor = canonical registry identity and authority binding
tmux session = runtime binding
Role document = one common Agent Office role contract
Project overlay = project-specific authority delta
Worktree = temporary mission isolation only
```

## Canonical Reuse

- Reuse reviewed Batch A organization `types.ts` and `registry.ts` semantics
  from `58a484b`; do not import visual/product implementation.
- Preserve stable identity, fail-closed normalization, unique actor IDs, one
  responsible Advisor Team, and model/runtime evidence separation.
- Extend the same registry contract only with the Founder-required project,
  authority, protocol, dispatchability, and Team topology fields.
- Consolidate common roles under `agent-office/docs/roles/`; the temporary
  foundation-docs role bundle is historical preservation, not a second active
  role system.

## Current Team Authority

- `AGENT_OFFICE_ADVISOR_TEAM`: responsible Advisor `agent-office-advisor`;
  project `agent-office`; assigned Designer, Worker, and independent Reviewer.
- `FOUNDATION_ADVISOR_TEAM`: responsible Advisor `foundation-advisor`;
  projects `FOUNDATION`, `SIASIU`, `Cosmile`; includes `foundation-designer`,
  `foundation-control`, repo-local Workers, and independent Reviewer.
- `VIBENEWS_ADVISOR_TEAM`: preserve current verified separate Advisor Team and
  its current role sessions; no scope change.
- `foundation-control` reports to `foundation-advisor`; it is not a Team leader.

## Authority Invariant

```text
Leo / Strategy GPT
-> responsible Advisor
-> Control, Designer, Worker, or Reviewer
-> responsible Advisor
-> Leo
```

Every actor belongs to exactly one responsible Advisor Team or fails closed.
Subordinate actors cannot self-assign, broaden scope, dispatch another actor, or
become a Team leader from having a tmux session. Reviewer judgment stays
independent, but assignment and result routing remain inside the responsible
Advisor-led Mission. Slack and every future projection must fail closed if it
could bypass the responsible Advisor.

## Slack Topology Record Only

Record the existing private channel names `team-agent-office`,
`team-foundation`, and `team-vibenews` as future Team mappings. Channel IDs are
unknown and must remain unresolved. Store no credential and start no Slack code.

## Validation Boundary

Run only exact registry contract tests, source/type checks needed by the added
organization module, root-reference consistency, overlay reference checks, Git
diff/status, tmux current-path/process checks, and remote reachability. Do not
run product, visual, M1/M1.2, broad dependency, or unrelated security suites.
