# AS1 PERSONAL_LEO_ONLY Trusted Session Design Handoff

MISSION_ID: `AGENT_OFFICE_AS1_MULTI_TEAM_SLACK_PILOT_001`

WORK_UNIT: `PERSONAL_LEO_ONLY_TRUSTED_SESSION_DESIGN`

FROM: `agent-office-advisor`

TO: `agent-office-designer`

PRODUCT_REPOSITORY: `/home/leo/Project/.worktrees/agent-office/AGENT_OFFICE_AS1_PHASE_B_LIVE_PILOT_001`

PRODUCT_BRANCH: `feature/as1-phase-b-live-pilot-001`

EXACT_BASELINE: `0921c1d`

## Dispatch profile

- Model: `gpt-5.6-sol`
- Mode: product/security transport design
- Effort: `max`
- Required role instructions: repository `AGENTS.md`, `CLAUDE.md`, and canonical Designer role documents
- Why not lower: this delta replaces the external one-use authority chain and global-failure classification in security-sensitive live transport.
- Why not higher: max is sufficient for a bounded two-profile, private single-user design; no broader architecture is authorized.
- Escalation trigger: an unavoidable change to Registry, identity, arbitrary command authority, or Foundation Strategy routing.

## Exact objective

Design the smallest additive `PERSONAL_LEO_ONLY` mode that reuses the reviewed AS1 Slack implementation while removing Leo's manual receive/delivery grant race.

Required behavior:

1. At service startup, validate credentials, workspace, both fixed App/channel mappings, Leo user allowlist, fixed Advisor destinations, trusted Node, and the new durable state root.
2. After successful startup, remain a trusted Leo-only foreground session.
3. Per message, validate only Leo user, fixed workspace/App/channel binding, dedupe, and the profile's fixed Advisor destination.
4. Automatically mint and consume an internal one-message lease. It is not caller-controlled, not a Git artifact, not standing shell authority, and requires no Leo action.
5. Queue accepted messages sequentially and preserve same-thread `RECEIVED`, `DELIVERED`, `COMPLETED`, or `FAILED` status.
6. Parse, timeout, delivery, or Advisor work failure is message-local. Reserve global latch only for credential, identity, fixed-destination, or durable-state corruption.
7. Preserve two fixed profiles but activate only one profile at a time. The required live proof is Agent Office only.
8. Use only `/home/leo/.local/state/agent-office/as1-slack-pilot-leo-v1`. Never read, reset, mutate, copy, or reuse the original or R2 roots.

## Fixed boundaries

- Leo only: `U0BD3523C1F`.
- One existing workspace and the two existing fixed App/channel profiles.
- Fixed Advisor destinations only: `agent-office-advisor` and `foundation-advisor`; no caller-selected pane, session, path, model, effort, Actor, Team, command, or profile.
- No Foundation Strategy Slack routing change.
- No database, Registry/schema change, generic framework, systemd, UI, multi-user/workspace, high availability, arbitrary shell, dynamic tmux target, VibeNews, or project-product changes.
- Preserve historical authority and state-root artifacts unchanged and non-authoritative for this mode.
- Restore the checked-in descriptor to fail-closed disabled before implementation completion.

## Designer output

Produce one focused committed design delta and result pointer. It must:

- identify the fewest exact source/test/doc paths required;
- specify startup validation, fixed destination capture, internal lease lifecycle, sequential queue, per-message failure isolation, and true global-corruption latch criteria;
- state how existing exact transport, dedupe, durable intake, outbox, and evidence ingress are reused;
- include focused acceptance tests only;
- reject any generalization beyond this private mode;
- record unresolved material blockers, or return `READY_FOR_INDEPENDENT_DESIGN_REVIEW`.

Do not implement runtime code. Do not activate Slack. Do not touch either historical state root or secrets.

RETURN_TO: `agent-office-advisor`
