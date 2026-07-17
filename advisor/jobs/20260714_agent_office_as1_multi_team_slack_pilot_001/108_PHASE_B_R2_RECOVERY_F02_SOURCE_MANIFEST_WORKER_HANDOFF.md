# AS1 Phase B R2 Recovery F02 Source/Manifest Worker Handoff

MISSION_ID: `AGENT_OFFICE_AS1_MULTI_TEAM_SLACK_PILOT_001`

WORK_UNIT: `PHASE_B_R2_RECOVERY_F02_SOURCE_AND_MANIFEST_S_M`

TARGET_ACTOR: Agent Office Worker

TARGET_SESSION: `agent-office-opus`

REQUIRED_SKILL: `/home/leo/Project/skill/fable-builder/SKILL.md`

## 1. Advisor acceptance and exact authority

The responsible Advisor accepts the bounded F02 design candidate
`e8c8f529e08ea547e1504d425c80fc8a2216b51b` after the same independent SOL
Sentinel Reviewer returned `PASS` for F02-D1 through F02-D6 and minimum scope.

Committed review evidence:

- governance commit: `3df77ffba0d95dac96abfdbabe1b0e897d273313`
- result:
  `advisor/jobs/20260714_agent_office_as1_multi_team_slack_pilot_001/107_PHASE_B_R2_RECOVERY_F02_DESIGN_PATCH_INDEPENDENT_DELTA_REVIEW_RESULT.md`
- result SHA-256:
  `d4a23e3dcb806af065c455752fd886198fff02f624d6e602859cced4017aaf9f`

This handoff authorizes only source commit S, its focused synthetic checks,
build, and deterministic manifest M generation/reproduction. It grants no host
installation, privilege, state-root, helper execution, R2 initialization,
Slack, descriptor, or tmux-delivery action.

## 2. Exact coordinates and required reads

- product worktree:
  `/home/leo/Project/.worktrees/agent-office/AGENT_OFFICE_AS1_PHASE_B_LIVE_PILOT_001`
- branch: `feature/as1-phase-b-live-pilot-001`
- exact implementation parent:
  `e8c8f529e08ea547e1504d425c80fc8a2216b51b`
- reviewed design:
  `docs/integration/AGENT_OFFICE_AS1_PHASE_B_R2_RECOVERY_DESIGN_DELTA.md`
- exact design SHA-256:
  `b35c8e52f0f00822bfb8e0c4722707128a29ae7dbaefb2ae9bfbfb621851e9ec`

Before editing, read product `AGENTS.md`, `CLAUDE.md`,
`docs/agent/TEAM_OPERATING_MODEL.md`, `docs/agent/roles/worker.md`,
`docs/agent/RUN_PROTOCOL.md`, `docs/agent/RESULT_REPORTING_PROTOCOL.md`, this
exact handoff, accepted design, and review result 107. Verify exact runtime,
profile, worktree, branch, clean/upstream-equal HEAD, and no conflicting writer.
Stop on any mismatch or unsafe overlap.

## 3. Dispatch profile

- TASK_COMPLEXITY: high, bounded privileged-helper source and proof contract
- RISK_LEVEL: Level 3 forensic/security boundary, execution disabled
- FAILURE_COST: false preservation claim, retriable irreversible mutation,
  privilege leakage, or execution of unverified bytes
- REVERSIBILITY: isolated product branch; source S only; no host/root action
- CONTEXT_REQUIREMENT: accepted 1,883-line exact design, six closed review
  findings, four implementation paths, and reproducible S/M evidence sequence
- SELECTED_MODEL: Opus 4.8 with 1M context
- SELECTED_MODE: Claude Code Worker / Ultracode
- SELECTED_EFFORT: Ultracode (`xhigh + dynamic workflows`)
- REQUIRED_SKILL: `/fable-builder`
- WHY_NOT_LOWER: exact byte grammars, retained-fd execution, Linux privilege
  reduction, immutable traversal, and anti-retry journal must agree across code,
  docs, and tests; a small mismatch can make later irreversible execution unsafe
- WHY_NOT_HIGHER: Ultracode is the highest available Worker workflow profile
  and is sufficient; no new architecture is authorized
- ESCALATION_TRIGGER: `CAPABILITY_INSUFFICIENT` or `HOLD` if the design requires
  another source/config/dependency path, real host/root access, a weaker
  invariant, or an unreviewed authority mechanism

Do not silently change model, mode, effort, or skill. Do not create or delegate
to sub-agents despite Ultracode workflow capability.

## 4. Exact implementation allowlist

Change exactly these four product paths and no others for source commit S:

1. `scripts/as1-preserve-original-root.mjs`
2. `docs/operations/AGENT_OFFICE_AS1_SLACK_SETUP.md`
3. `tests/operations/as1-slack-preservation-helper.test.ts`
4. `tests/operations/as1-slack-lifecycle.test.ts`

After S is clean and pushed, generate only these uncommitted evidence artifacts:

5. `artifacts/as1-multi-team-slack-pilot/PHASE_B_R2_PRESERVATION_BUILD_INSTALL_MANIFEST.json` (M)
6. `artifacts/as1-multi-team-slack-pilot/PHASE_B_R2_RECOVERY_F02_SOURCE_MANIFEST_WORKER_RESULT.md`
7. `artifacts/as1-multi-team-slack-pilot/PHASE_B_R2_RECOVERY_F02_SOURCE_MANIFEST_WORKER_RESULT_POINTER.txt`

Do not commit paths 5-7 in this Work Unit. They must remain the only untracked
product files after S so the same Reviewer can inspect M without changing the
required `E^ == S` lineage. A later exact handoff may bind them into E only
after a separately reviewed journal-anchor receipt J exists.

No other path may change. In particular, do not modify active `src`, package or
lock files, dependencies, config, descriptor, generated `dist`, accepted F01
evidence, Registry, database/schema, service, UI, secret, or another project.

## 5. Required implementation

Implement sections 4.4, 6, 7.2, 7.5, and 8.1 steps 3-4 of the accepted design
exactly:

- one import-safe `.mjs` helper with exactly the seven named pure exports and
  one private direct-entry path;
- one fixed no-argument noninteractive preservation command template in S,
  containing exactly one non-runnable `@F02_REVIEW_BINDING@` marker;
- no production root/path/environment/CLI selector, alternate mode, wrapper,
  package alias, repair, reset, retry, or unseal path;
- exact manifest/tree/child/journal grammars and pure reducers;
- pre-execution manifest/helper retained-fd authentication contract;
- exact interpreter, fd, cwd, environment, stdio, deadline, output, exit, and
  pre-root UID/GID/groups/securebits/capability/no-new-privileges transition;
- fixed root-controlled journal validation and closed monotonic state machine;
- descriptor-relative no-follow traversal, race rejection, namespace-first
  zero-write/immutable sealing, equal final digest, and read-only reverification;
- setup documentation for S/M/J/E, fixed journal installation, privilege
  validation, one-way rollout, and disabled rollback;
- synthetic-only tests. Normal tests must not access either real root, proposed
  host journal, or fixed privilege scratch path.

Do not execute the helper, bootstrap, journal installer, or preservation
command. Do not create J or E in this Work Unit.

## 6. Focused checks and S/M sequence

Run only these proportionate checks from the product worktree:

```bash
npx eslint scripts/as1-preserve-original-root.mjs tests/operations/as1-slack-preservation-helper.test.ts tests/operations/as1-slack-lifecycle.test.ts
npx tsc --noEmit -p tsconfig.json
npx vitest run --maxWorkers=1 tests/operations/as1-slack-preservation-helper.test.ts tests/operations/as1-slack-lifecycle.test.ts
npm run build:core
git diff --check
test -z "$(rg -l -F '/home/leo/.local/state/agent-office/as1-slack-pilot/' src || true)"
test -z "$(rg -l -F 'value[\"stateRootId\"] == \"as1-slack-pilot\"' src || true)"
test "$(rg -l -F '/home/leo/.local/state/agent-office/as1-slack-pilot' scripts docs/operations/AGENT_OFFICE_AS1_SLACK_SETUP.md | sort)" = "docs/operations/AGENT_OFFICE_AS1_SLACK_SETUP.md
scripts/as1-preserve-original-root.mjs"
```

Also verify exact four-path source scope, seven exports, import zero-I/O, one S
marker, no final runnable command in S, and no real-root/host-journal/scratch
operation. Do not run broad product, Living Office, visual, browser, Slack,
privileged, full-suite, or unrelated gates.

Commit and non-force push the final passing four-path source as source commit S.
Re-run the focused checks from clean S. Then run exactly once the setup
document's fixed `F02_MANIFEST_GENERATOR_V1` command and run the independently
authored `F02_MANIFEST_REPRODUCER_V1` command. Require byte-identical M and equal
SHA-256. Do not execute any other setup literal.

## 7. Prohibitions

- Do not read or print the Slack secret file or any secret/environment value.
- Do not stat, open, traverse, hash, chmod, ioctl, seal, or mutate either real
  state root, the fixed scratch path, or the proposed `/var/lib` journal path.
- Do not run sudo, privileged code, helper/bootstrap/installer direct entry,
  Slack/network, descriptor, owner, live destination, signal, or tmux input.
- Do not initialize R2, preserve/reverify the original root, create a grant,
  lease, capability, journal anchor, or receipt J.
- Do not self-review, dispatch an actor, accept risk, merge, force push, start a
  pilot, or begin another mission.

## 8. Result contract

The uncommitted Worker result must report:

- exact session/model/mode/effort and `/fable-builder` hash;
- base, branch, source commit S, push and upstream state;
- exact four changed source paths and three untracked evidence paths;
- requirement implementation map for F02-D1 through D6;
- every focused command, failure, retry, accurate test totals, and result;
- manifest M path, bytes, SHA-256, source commit binding, generator result, and
  independent reproducer result;
- static proof that no implementation/config/dependency/scope expansion and no
  real-root/journal/scratch/secret/Slack/tmux/privileged action occurred;
- known limits: J, E, privilege validation, installation, preservation,
  reverification, R2 initialization, activation, and live pilot remain pending;
- rollback to source parent without restoring original-root authority.

Return the uncommitted result and pointer paths to `agent-office-advisor`, then
STOP. The Advisor will route the exact S/M candidate to the same independent
Reviewer.
