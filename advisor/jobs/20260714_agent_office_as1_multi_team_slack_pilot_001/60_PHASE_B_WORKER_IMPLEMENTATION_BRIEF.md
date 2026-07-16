# AS1 Phase B Worker Implementation Brief

MISSION_ID: `AGENT_OFFICE_AS1_MULTI_TEAM_SLACK_PILOT_001`

PHASE: `B_PRIVATE_LEO_ONLY_LIVE_COMPOSITION_IMPLEMENTATION`

TARGET_ACTOR: Agent Office Worker

TARGET_SESSION: `agent-office-opus`

REQUIRED_SKILL: `/home/leo/Project/skill/fable-builder/SKILL.md`

## 1. Exact authority and baseline

Implement the independently reviewed Phase B design and nothing broader.

- Worktree: `/home/leo/Project/.worktrees/agent-office/AGENT_OFFICE_AS1_PHASE_B_LIVE_PILOT_001`
- Branch: `feature/as1-phase-b-live-pilot-001`
- Exact parent: `c4b1f5772d4a5094c86cebd949390bdd3115889b`
- Frozen Phase A implementation: `0dfb4398be2ecd9295b35a94e3b461e25dad6f7c`
- Design: `docs/integration/AGENT_OFFICE_AS1_PHASE_B_LIVE_COMPOSITION_DESIGN_DELTA.md`
- Designer result: `artifacts/as1-multi-team-slack-pilot/PHASE_B_DESIGNER_RESULT.md`
- Independent design PASS: governance commit
  `9ae1414add97d38f9765b9112198f642bd1b30bb`

Read the repository entry instructions and required role/run/result protocols
before editing. Historical evidence is not current authority.

## 2. Execution profile

- `TASK_COMPLEXITY`: high
- `RISK_LEVEL`: Level 3 transport/authority boundary
- `FAILURE_COST`: high; wrong delivery or recursive intake is unacceptable
- `REVERSIBILITY`: bounded branch and foreground runtime
- `CONTEXT_REQUIREMENT`: reviewed Phase A modules plus exact Phase B delta
- `SELECTED_MODEL`: Opus 4.8
- `SELECTED_MODE`: Ultracode
- `SELECTED_EFFORT`: xhigh
- `REQUIRED_SKILL`: `/fable-builder`
- `WHY_NOT_LOWER`: exact identity, one-use authority, pinned-byte tmux delivery,
  pidfd lifecycle, and secret boundaries require xhigh reasoning with the
  approved Ultracode implementation mode
- `WHY_NOT_HIGHER`: xhigh is sufficient inside the Ultracode implementation
  mode; max is not justified before a demonstrated capability limitation
- `ESCALATION_TRIGGER`: return `CAPABILITY_INSUFFICIENT` only for a demonstrated
  model capability limit; routine code/test/tool failures stay with this Worker

Do not silently change model, mode, effort, or skill.

## 3. Exact implementation allowlist: 14 paths

Only these implementation paths may change:

1. `src/runtime/as1-slack-pilot/composition.ts`
2. `src/runtime/as1-slack-pilot/cli.ts`
3. `src/adapters/gateways/slack-pilot/git-artifact-source.ts`
4. `src/adapters/gateways/slack-pilot/socket-client.ts`
5. `src/adapters/gateways/slack-pilot/exact-transport.ts`
6. `src/application/slack-pilot/inbound-store.ts`
7. `src/operations/readiness/as1-slack-control.ts`
8. `src/persistence/file-store/writer-lock.ts`
9. `docs/operations/AGENT_OFFICE_AS1_SLACK_SETUP.md`
10. `tests/adapters/as1-slack-socket-client.test.ts`
11. `tests/integration/as1-slack-exact-transport.test.ts`
12. `tests/integration/as1-slack-live-composition.test.ts`
13. `tests/integration/as1-slack-git-artifact-source.test.ts`
14. `tests/operations/as1-slack-lifecycle.test.ts`

Two additional new paths are authorized only as mandatory durable Worker
evidence; they are not implementation scope and must not alter Phase A result
evidence:

- `artifacts/as1-multi-team-slack-pilot/PHASE_B_WORKER_RESULT.md`
- `artifacts/as1-multi-team-slack-pilot/PHASE_B_WORKER_RESULT_POINTER.txt`

No other path may change. In particular, do not modify package files,
lockfiles, descriptors, Registry/schema/database files, Exact Delivery v2,
Advisor inbox, UI, service definitions, or any external project.

## 4. Required implementation

Compose existing Phase A modules into the smallest foreground, fail-closed
single-profile runtime described by the reviewed design:

- one configured workspace and the existing Leo singleton only;
- two fixed App/channel/Advisor profiles, selected only by committed authority;
- exactly one profile active at a time;
- authenticated Slack quarantine until durable receive arming;
- one root message to immutable intake and one same-thread result;
- existing dedupe, replay, bot-loop, evidence, journal, latch, grant, lease,
  capability, and profile isolation;
- fixed-path Git observation without fetch or mutable ref trust;
- exact selected-profile tmux destination validation and one-use delivery;
- exact canonical-plus-one-LF pointer bytes, private regular file, 32-KiB bound,
  content-addressed filename, pinned read, closed stdin, and no reopen;
- two complete precommit observations and one complete post-load/pre-paste
  observation with manual reconciliation after the commit boundary;
- exact `/usr/bin/python3.14` object/FD-3 bridge preflight before state mutation,
  retained writer-lock descriptor, and same-pidfd clean-stop/incident-kill
  identity binding;
- foreground manual `start`, zero-operand `stop`, zero-operand
  `incident-kill`, read-only redacted `status`, and live-disabled `restart`;
- exact `AS1_SLACK_STATE_ROOT` owner setup and operation instructions.

Use the design's exact schemas, limits, ordering, failure latches, and rollback
rules. Do not simplify an accepted security control to reduce code volume.

## 5. Explicit exclusions

Do not add multi-user/multi-workspace behavior, a generic framework, database,
schema, migration, Registry change, authority redesign, HTTP ingress, UI/admin
surface, systemd/permanent service, auto-start/reconnect, HA, VibeNews, external
project changes, dynamic destination selection, arbitrary command/signal/path
inputs, simultaneous profiles, or enterprise test matrices.

During implementation and synthetic tests, do not:

- read `/home/leo/.config/agent-office/as1-slack-pilot.env`;
- print or inspect real secret values;
- connect to Slack or use a real network;
- send tmux input, paste, Enter, or a process signal to a live Actor;
- create live grants, leases, capabilities, apps, or owner state;
- alter the default-disabled descriptor;
- start either real pilot.

## 6. Focused checks

Run only the proportionate checks required by the design:

```bash
npx vitest run --maxWorkers=1 \
  tests/adapters/as1-slack-socket-client.test.ts \
  tests/integration/as1-slack-exact-transport.test.ts \
  tests/integration/as1-slack-live-composition.test.ts \
  tests/integration/as1-slack-git-artifact-source.test.ts \
  tests/operations/as1-slack-lifecycle.test.ts
```

Run directly affected existing Phase A regressions only when needed to prove a
changed boundary. Record every exact command, failure, retry, and result.

Also run:

```bash
npm run typecheck
npm run build:core
npx eslint \
  src/runtime/as1-slack-pilot/composition.ts \
  src/runtime/as1-slack-pilot/cli.ts \
  src/adapters/gateways/slack-pilot/git-artifact-source.ts \
  src/adapters/gateways/slack-pilot/socket-client.ts \
  src/adapters/gateways/slack-pilot/exact-transport.ts \
  src/application/slack-pilot/inbound-store.ts \
  src/operations/readiness/as1-slack-control.ts \
  src/persistence/file-store/writer-lock.ts \
  tests/adapters/as1-slack-socket-client.test.ts \
  tests/integration/as1-slack-exact-transport.test.ts \
  tests/integration/as1-slack-live-composition.test.ts \
  tests/integration/as1-slack-git-artifact-source.test.ts \
  tests/operations/as1-slack-lifecycle.test.ts
git diff --check c4b1f5772d4a5094c86cebd949390bdd3115889b...HEAD
```

Run narrow secret/dynamic-target/static scans over changed files. Do not run
the full test suite, Living Office/visual/E2E suites, or unrelated audits.

## 7. Commit and result contract

Keep commits reversible. Stage exact paths only and non-force push only the
authorized branch. The durable Worker result must include:

- exact session/model/mode/effort/skill;
- base, branch, source candidate, result commit, pointer commit;
- exact changed paths and diff summary;
- implemented boundaries and explicit exclusions;
- complete command ledger including every failure and retry;
- test/typecheck/lint/build/diff/scan results;
- confirmation of zero secret access, Slack connection, live tmux mutation,
  owner-state mutation, framework/schema/Registry/service/UI/external-project
  change;
- Git status, push, upstream equality, rollback, limitations, and STOP state.

Use this sequence:

1. one or more bounded implementation commits;
2. a frozen source-candidate commit after checks;
3. one result-only commit adding `PHASE_B_WORKER_RESULT.md`;
4. one pointer-only commit adding `PHASE_B_WORKER_RESULT_POINTER.txt`.

Return the pointer to `agent-office-advisor`. Do not review, activate, connect,
run a live pilot, dispatch another actor, or begin another mission. STOP.
