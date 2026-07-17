# AS1 PERSONAL_LEO_ONLY Minimal Runtime Worker Handoff

MISSION_ID: `AGENT_OFFICE_AS1_MULTI_TEAM_SLACK_PILOT_001`

WORK_UNIT: `PERSONAL_LEO_ONLY_MINIMAL_RUNTIME`

FROM: `agent-office-advisor`

TO: `agent-office-opus`

REPOSITORY: `/home/leo/Project/.worktrees/agent-office/AGENT_OFFICE_AS1_PHASE_B_LIVE_PILOT_001`

BRANCH: `feature/as1-phase-b-live-pilot-001`

EXACT_BASELINE: `0921c1d379c3975ef7c8b49c715a98b23d4d5d9a`

SKILL: `/fable-builder`

PROFILE: Opus 4.8 Worker / `xhigh`; this is the lowest sufficient profile for the narrowed delta. Return `CAPABILITY_INSUFFICIENT` rather than self-escalating. Escalation trigger: inability to preserve fixed-destination or durable-state safety within the allowlist.

## Scope correction

The superseded design-document work is stopped. Implement directly from the Founder-approved private trust model. Do not create another design document, framework, Registry, schema, database, service manager, UI, or generic runtime.

## Required behavior

1. Add an explicit `PERSONAL_LEO_ONLY` runtime mode using only `/home/leo/.local/state/agent-office/as1-slack-pilot-leo-v1`.
2. At startup, once, validate trusted Node, secret/credential shape, workspace/App/channel binding, Leo user allowlist, fixed profile and Advisor tmux destination, and durable-state integrity.
3. After startup, accept only the fixed Leo/workspace/App/channel mapping for the active fixed profile. No message may select Actor, Team, profile, session, pane, workspace, path, model, effort, or command.
4. Sequentially queue valid top-level messages and correlated thread replies. Preserve dedupe and same-thread correlation.
5. Automatically create and one-use consume an internal per-message lease bound to the accepted intake and startup-validated fixed destination. It requires no Git grant, Leo approval, or short expiry race and grants no arbitrary shell authority.
6. Reuse the existing intake, exact tmux pointer delivery, outbox/status, and evidence-result paths. Post only same-thread received, delivered, completed, or failed status.
7. Parse, timeout, delivery, or Advisor work failure is local to that message; record failure and continue the queue. Global latch/owner stop is reserved for credential, identity, fixed destination, or durable-state corruption.
8. Preserve the two existing fixed profiles but run only one at a time. This work unit and live proof target `AGENT_OFFICE_ADVISOR`; do not alter Foundation Strategy routing.
9. Never read, reset, modify, copy, migrate, or reuse the original or R2 roots.
10. Leave the checked-in descriptor disabled by default after implementation.

## Exact path allowlist

Runtime/config:

- `config/agent-office.as1-slack-pilot.disabled.json`
- `src/runtime/as1-slack-pilot/cli.ts`
- `src/runtime/as1-slack-pilot/composition.ts`
- `src/application/slack-pilot/service.ts`
- `src/application/slack-pilot/inbound-store.ts`
- `src/adapters/gateways/slack-pilot/exact-transport.ts`
- `src/adapters/gateways/slack-pilot/evidence-ingress.ts`

Focused tests:

- `tests/integration/as1-slack-live-composition.test.ts`
- `tests/integration/as1-slack-exact-transport.test.ts`
- `tests/integration/as1-slack-evidence-ingress.test.ts`
- `tests/operations/as1-slack-lifecycle.test.ts`

Change fewer paths when possible. No path outside this list may change. Preserve the two pre-existing untracked R2 Worker evidence files unchanged and do not stage them.

## Focused acceptance

- startup rejects wrong credential identity, workspace/App/channel/profile, destination, or corrupt state before receive;
- two valid Leo messages are accepted once, queued and delivered in order without manual grant files;
- duplicate event creates no second intake or delivery;
- wrong user/channel/App/workspace and DM fail closed;
- one malformed/delivery/work failure posts the matching thread failure and the next valid message proceeds;
- no caller-selected tmux target or shell input exists;
- global latch occurs only for the four approved corruption classes;
- only the new root is operational.

Run only changed-file ESLint, TypeScript, the four named test files, `build:core`, and exact-range `git diff --check`. Do not run broad, visual, Living Office, full E2E, or unrelated suites.

Commit and non-force push the implementation. Return exact changed paths, tests, failures, commit, and limitations to `agent-office-advisor`; then STOP.
