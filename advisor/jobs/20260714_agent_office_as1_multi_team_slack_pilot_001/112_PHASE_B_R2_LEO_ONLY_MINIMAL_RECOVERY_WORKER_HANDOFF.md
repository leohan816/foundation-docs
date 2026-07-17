# AS1 Phase B R2 Leo-Only Minimal Recovery Worker Handoff

MISSION_ID: `AGENT_OFFICE_AS1_MULTI_TEAM_SLACK_PILOT_001`

WORK_UNIT: `PHASE_B_R2_LEO_ONLY_FIXED_NODE_AND_RUNBOOK_DELTA`

TARGET_ACTOR: Agent Office Worker

TARGET_SESSION: `agent-office-opus`

REQUIRED_SKILL: `/home/leo/Project/skill/fable-builder/SKILL.md`

## 1. Founder scope correction

The Founder explicitly supersedes the enterprise-grade F02 threat model for
this private pilot. The host and `leo` Unix account are trusted. The existing
absolute NVM Node binary used by Leo is trusted and may be owned by Leo.

Do not implement the proposed privileged original-root preservation helper,
manifest/journal framework, host attestation system, generic executable trust
framework, or any other part of the superseded enterprise F02 expansion.

The original latched root remains untouched forensic evidence by operational
rule. The only active root remains the already implemented fixed R2 root.

## 2. Exact coordinates

- product worktree:
  `/home/leo/Project/.worktrees/agent-office/AGENT_OFFICE_AS1_PHASE_B_LIVE_PILOT_001`
- branch: `feature/as1-phase-b-live-pilot-001`
- exact parent: `453d697905592ea0b6a4580be289957f05f0f283`
- fixed Node:
  `/home/leo/.nvm/versions/node/v24.18.0/bin/node`
- active R2 root:
  `/home/leo/.local/state/agent-office/as1-slack-pilot-r2`
- preserved original root:
  `/home/leo/.local/state/agent-office/as1-slack-pilot`

Before editing, read product `AGENTS.md`, `CLAUDE.md`, the Worker role and run
protocol files named there, this exact handoff, and the four allowed files.
Verify clean/upstream-equal exact parent and no conflicting writer.

## 3. Dispatch profile

- SELECTED_MODEL: Opus 4.8
- SELECTED_MODE: Claude Code Worker
- SELECTED_EFFORT: xhigh
- REQUIRED_SKILL: `/fable-builder`
- WHY_NOT_LOWER: the check gates a live Slack process before state mutation and
  must fail closed without leaking a path or broadening runtime authority
- WHY_NOT_HIGHER: four narrow paths, one fixed private-server trust rule, no
  architecture or privileged helper; Ultracode is unnecessary
- ESCALATION_TRIGGER: a required change outside the four paths, a need to touch
  either state root, secret, descriptor activation, Registry, transport
  authority, or a generic trust framework

Work solo. Do not create or delegate to agents or sub-agents.

## 4. Exact four-path allowlist

Change only:

1. `src/runtime/as1-slack-pilot/cli.ts`
2. `tests/operations/as1-slack-lifecycle.test.ts`
3. `docs/operations/AGENT_OFFICE_AS1_SLACK_SETUP.md`
4. `docs/integration/AGENT_OFFICE_AS1_PHASE_B_R2_RECOVERY_DESIGN_DELTA.md`

Do not create `scripts/as1-preserve-original-root.mjs` or any manifest,
journal, receipt, schema, Registry, database, service, migration, package,
dependency, UI, descriptor, secret, grant, lease, or live artifact.

## 5. Required minimal implementation

### 5.1 Fixed trusted Node preflight

In the existing CLI, add one small construction-bound preflight for only:

`/home/leo/.nvm/versions/node/v24.18.0/bin/node`

It must run for `start` and `redacted-check` before any state-root mutation,
secret read, network, tmux, or live side effect. It must require only:

- `process.execPath` equals that exact literal;
- the exact final path is a regular file, not a symlink;
- at least one execute bit is set; and
- group and world write bits are both absent.

The file may be owned by Leo. Do not require UID/GID 0, a content hash, inode
pinning, a root-owned copy, PATH search, `realpath` discovery, alternatives,
fallback, caller input, environment selection, or generic executable policy.

Expose only the minimum pure/injectable seam needed for deterministic tests.
On failure, return one stable redacted reason such as
`TRUSTED_NODE_REQUIRED`; never print the path or metadata.

### 5.2 Active documentation

- Mark the enterprise F02 helper/manifest/journal/immutable-seal design as
  superseded for this Leo-only pilot and deferred until a separate commercial
  hardening mission.
- Keep the accepted parser depth, R2 fixed root, same-thread statuses, exact
  delivery, single-user/channel/profile boundaries unchanged.
- Replace setup section 10.6 with a concise trusted-server rule: never reset,
  delete, modify, reuse, copy, or actively resolve the original root; use only
  R2; verify the exact trusted Node through the application preflight.
- Remove the old rollout dependency on implementing/running the privileged
  preservation helper. Do not claim immutable sealing occurred.

## 6. Focused tests only

Add deterministic tests for:

- exact fixed regular executable accepted;
- wrong `execPath` rejected;
- symlink/non-regular rejected;
- no execute bit rejected;
- group-writable and world-writable rejected;
- failure occurs before initialization/secret/network/tmux in the existing
  CLI ordering seam;
- exact R2 root remains the sole active state root;
- rich-text parser compatibility remains passing.

Run only:

```bash
npx eslint src/runtime/as1-slack-pilot/cli.ts tests/operations/as1-slack-lifecycle.test.ts
npx tsc --noEmit -p tsconfig.json
npx vitest run --maxWorkers=1 tests/operations/as1-slack-lifecycle.test.ts tests/adapters/as1-slack-socket-frame.test.ts tests/integration/as1-slack-live-composition.test.ts
npm run build:core
git diff --check
```

Do not run broad, visual, Living Office, browser, full-suite, privileged,
state-root, secret, Slack, or real tmux-delivery tests.

## 7. Prohibitions and result

Do not read or mutate either real state root, read the secret file, connect
Slack, activate the descriptor, create authority artifacts, send tmux input,
run sudo, install a service, modify another repository, merge, or force push.

Commit the exact four-path passing delta and non-force push. After that commit,
write only these two uncommitted evidence files (they are outputs, not source):

- `artifacts/as1-multi-team-slack-pilot/PHASE_B_R2_LEO_ONLY_MINIMAL_RECOVERY_WORKER_RESULT.md`
- `artifacts/as1-multi-team-slack-pilot/PHASE_B_R2_LEO_ONLY_MINIMAL_RECOVERY_WORKER_RESULT_POINTER.txt`

Report every command and failure honestly, then return the two paths to
`agent-office-advisor` and STOP.
