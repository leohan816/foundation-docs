# AS1 Phase B R2 Recovery Advisor Design Acceptance and Worker Handoff

MISSION_ID: `AGENT_OFFICE_AS1_MULTI_TEAM_SLACK_PILOT_001`

PHASE: `PHASE_B_R2_RECOVERY_IMPLEMENTATION`

TARGET_ACTOR: Agent Office Worker

TARGET_SESSION: `agent-office-opus`

REQUIRED_SKILL: `/home/leo/Project/skill/fable-builder/SKILL.md`

## 1. Advisor design acceptance

The responsible Advisor accepts the bounded R2 recovery design at product
commit:

`a837bbf9d4072638a6dac676fb5ccc8da9bfa1ff`

The same independent SOL Sentinel Reviewer returned `PASS`, closed F01-F04,
and explicitly determined that the exact 12-path implementation handoff is safe
to issue. Accepted review evidence is committed in governance at:

`10ea614`

Exact result:

`advisor/jobs/20260714_agent_office_as1_multi_team_slack_pilot_001/93_PHASE_B_R2_RECOVERY_DESIGN_PATCH_INDEPENDENT_DELTA_REVIEW_RESULT.md`

This acceptance authorizes disabled implementation and synthetic validation
only. It does not authorize preservation, R2 initialization, secret access,
Slack connection/post, descriptor activation, real tmux delivery, or live use.

## 2. Exact coordinates and entry reads

- product worktree:
  `/home/leo/Project/.worktrees/agent-office/AGENT_OFFICE_AS1_PHASE_B_LIVE_PILOT_001`
- branch: `feature/as1-phase-b-live-pilot-001`
- exact implementation parent:
  `a837bbf9d4072638a6dac676fb5ccc8da9bfa1ff`
- frozen previously reviewed implementation source:
  `cca0cb5e2485c029b6d1715e37abf9bc55c548bd`
- reviewed R2 design:
  `docs/integration/AGENT_OFFICE_AS1_PHASE_B_R2_RECOVERY_DESIGN_DELTA.md`
- Designer result/pointer:
  `artifacts/as1-multi-team-slack-pilot/PHASE_B_R2_RECOVERY_DESIGNER_RESULT.md`
  and
  `artifacts/as1-multi-team-slack-pilot/PHASE_B_R2_RECOVERY_DESIGNER_RESULT_POINTER.txt`

Before editing, directly read product `AGENTS.md`, `CLAUDE.md`,
`docs/agent/TEAM_OPERATING_MODEL.md`, `docs/agent/roles/worker.md`,
`docs/agent/RUN_PROTOCOL.md`, `docs/agent/RESULT_REPORTING_PROTOCOL.md`, this
exact handoff, design commit `a837bbf`, and review result 93. Historical reports
are evidence, not permission.

Verify exact branch/HEAD, clean/upstream-equal state, no conflicting writer,
and the current Worker runtime/profile. If the actual model, mode, effort, skill,
worktree, or branch differs, stop before editing and return the exact mismatch.

## 3. Dispatch profile

- `TASK_COMPLEXITY`: high, bounded live-transport recovery implementation
- `RISK_LEVEL`: Level 3 security/authority and forensic-evidence boundary
- `FAILURE_COST`: execution after a truthful failure notice, contradictory
  Slack output, cross-root reuse, or false evidence-preservation claim
- `REVERSIBILITY`: isolated branch; descriptor remains disabled; no real root or
  live system may be touched
- `CONTEXT_REQUIREMENT`: accepted Phase B implementation plus exact R2 design,
  six focused test surfaces, and inherited exact-delivery controls
- `SELECTED_MODEL`: Opus 4.8 (1M context)
- `SELECTED_MODE`: Claude Code / Ultracode
- `SELECTED_EFFORT`: Ultracode
- `REQUIRED_SKILL`: `/fable-builder`
- `WHY_NOT_LOWER`: this Work Unit combines a bounded parser change, durable
  cross-restart terminal barriers, exact outbox ordering, sealed bridge
  identity, and descriptor-relative filesystem-race handling; prior Phase B
  evidence shows that small inaccuracies at these joins are costly
- `WHY_NOT_HIGHER`: Ultracode is the approved highest-sufficient Worker profile
  for this bounded implementation; no broader architecture or product design is
  involved
- `ESCALATION_TRIGGER`: return `CAPABILITY_INSUFFICIENT` or `HOLD` if the exact
  design cannot be implemented without a new path/framework/schema, weakening a
  security invariant, touching a real state root, or requiring unapproved live
  authority

Do not silently change model, mode, effort, or skill. Routine code/test/tool
failures stay with this Worker and must be fixed or reported honestly.

## 4. Exact implementation allowlist: 12 paths

Only these implementation paths may change:

1. `src/adapters/gateways/slack-pilot/socket-frame.ts`
2. `src/application/slack-pilot/outbox.ts`
3. `src/runtime/as1-slack-pilot/composition.ts`
4. `src/runtime/as1-slack-pilot/cli.ts`
5. `src/persistence/file-store/writer-lock.ts`
6. `docs/operations/AGENT_OFFICE_AS1_SLACK_SETUP.md`
7. `tests/adapters/as1-slack-socket-frame.test.ts`
8. `tests/adapters/as1-slack-socket-client.test.ts`
9. `tests/integration/as1-slack-outbound.test.ts`
10. `tests/integration/as1-slack-live-composition.test.ts`
11. `tests/operations/as1-slack-lifecycle.test.ts`
12. `tests/recovery/as1-slack-recovery.test.ts`

Two additional new paths are authorized only as durable Worker evidence; they
are not implementation scope:

- `artifacts/as1-multi-team-slack-pilot/PHASE_B_R2_RECOVERY_WORKER_RESULT.md`
- `artifacts/as1-multi-team-slack-pilot/PHASE_B_R2_RECOVERY_WORKER_RESULT_POINTER.txt`

No other path may change. In particular, do not modify contracts.ts,
inbound-store.ts, evidence-ingress.ts, socket-client.ts, web-client.ts,
exact-transport.ts, as1-slack-control.ts, package/lock files, configuration,
descriptors, secret files, generated output, accepted historical evidence, or
another project.

## 5. Required implementation

Implement the reviewed design exactly, preserving all accepted Phase B
behavior not named below.

### Socket compatibility

- Keep the shared JSON nesting limit at 8.
- Apply depth 10 only to the post-hello Slack Socket event structural walk.
- Accept the exact ordinary rich-text depth-10 fixture and reject depth 11
  before inbound validation or ACK.
- Preserve 32 KiB frame, array, envelope, identity, text, replay, latch, and
  no-raw-logging controls.

### R2 fixed identity

- Make `/home/leo/.local/state/agent-office/as1-slack-pilot-r2` and
  `as1-slack-pilot-r2` the sole active root and root ID.
- Remove every active source fallback/reference to the original root.
- Preserve the sealed bridge at exactly 17,989 UTF-8 bytes and SHA-256
  `d5b831e29dfb19b23f194e928258d74f2a43a2bfb51fa76350ec6595537a8de2`,
  with only the reviewed fixed root/ID substitutions.
- Keep committed runtime configuration disabled.

### Same-thread status contract

Render only these exact constants, with no caller-supplied text:

- `요청 접수 완료 · Advisor에게 전달 중`
- `메시지 전달 완료 · 답변 대기 중`
- `전달 실패 · 요청은 실행되지 않았습니다`
- `처리 실패 · 안전하게 중지되었습니다`

No status may occur before durable workspace/App/channel/Leo/profile/intake
root/safe-thread validation. Preserve deterministic IDs, replay, same-thread
binding, redaction, and the existing RESULT projection.

### Durable failure barriers

- Any durable phase of `DELIVERY_FAILED` must block all later delivery
  authority observation/reuse, tmux observation/mutation, status, evidence, and
  business output across restart.
- Any durable phase of `PROCESSING_FAILED` must block later confirmation,
  evidence/ACK progression, INTAKE/RESULT projection, business output, retry,
  and alternate status across restart.
- `DELIVERY_CONFIRMED` requires both failure siblings wholly absent at every
  durable and side-effect boundary.
- `PREPARED` may recover only the identical same-failure request; all other
  phases never resend. A conflict latches without repair or precedence.
- The outbox record is the durable barrier; a process-local latch is defense in
  depth, not the only authority stop.

### Original-root preservation contract

Implement only the reviewed fixed, no-argument, descriptor-relative
preservation helper/operation contract in the approved paths and setup
documentation. It must install/verify R2-only code first while disabled, pin
ancestor/root/mount identity, traverse no-follow, reject symlink/hard-link/
mount/path/inode/type/entry-set races, establish namespace quiescence, remove
write bits and require immutable flags, and compute the final byte/path digest
only after final process/lock/identity/seal proofs.

Production behavior must have no caller-supplied root. Synthetic tests must use
temporary roots and explicit test seams and must never open, inspect, chmod,
seal, digest, or otherwise access either real root. Unsupported actual
filesystem or privilege remains a later `HOLD` gate with no weaker fallback;
do not probe it now and do not claim it passes.

## 6. Explicit prohibitions

Do not access or print
`/home/leo/.config/agent-office/as1-slack-pilot.env` or any secret/environment
value. Do not connect to Slack, use a real network, post a status, send tmux
input, paste, Enter, inspect a live destination, signal a real process, create
or consume a live grant/lease/capability, initialize or mutate either real state
root, preserve the original root, create R2, alter the descriptor, or start a
pilot.

Do not add a database, Registry/schema, framework, systemd/service manager, UI,
VibeNews, external product change, generic destination/root selector,
simultaneous profile operation, standing authority, automatic reconnect, or
new status text.

## 7. Required focused checks

Run exactly the design's proportionate gates from the product worktree:

```bash
npx eslint src/adapters/gateways/slack-pilot/socket-frame.ts src/application/slack-pilot/outbox.ts src/runtime/as1-slack-pilot/composition.ts src/runtime/as1-slack-pilot/cli.ts src/persistence/file-store/writer-lock.ts tests/adapters/as1-slack-socket-frame.test.ts tests/adapters/as1-slack-socket-client.test.ts tests/integration/as1-slack-outbound.test.ts tests/integration/as1-slack-live-composition.test.ts tests/operations/as1-slack-lifecycle.test.ts tests/recovery/as1-slack-recovery.test.ts

npx tsc --noEmit -p tsconfig.json

npx vitest run --maxWorkers=1 tests/adapters/as1-slack-socket-frame.test.ts tests/adapters/as1-slack-socket-client.test.ts tests/integration/as1-slack-outbound.test.ts tests/integration/as1-slack-live-composition.test.ts tests/operations/as1-slack-lifecycle.test.ts tests/recovery/as1-slack-recovery.test.ts

npm run build:core

git diff --check

test -z "$(rg -l -F '/home/leo/.local/state/agent-office/as1-slack-pilot/' src || true)"

test -z "$(rg -l -F 'value[\"stateRootId\"] == \"as1-slack-pilot\"' src || true)"
```

Also run exact changed-path and no-real-root/static redaction scans needed to
prove this handoff. Do not run the full suite, Living Office, visual, browser,
broad E2E, or unrelated audits. Record every failed command and retry exactly.
Do not weaken lint/type/test rules or add file-wide suppressions.

## 8. Commit and result contract

Keep commits reversible and stage explicit paths. Non-force push only the
authorized branch. Use this sequence:

1. one or more bounded implementation/test commits;
2. a frozen source-candidate commit after all focused checks;
3. one result-only commit adding `PHASE_B_R2_RECOVERY_WORKER_RESULT.md`;
4. one pointer-only commit adding
   `PHASE_B_R2_RECOVERY_WORKER_RESULT_POINTER.txt`.

The durable result must report:

- exact session, model, mode, effort, and skill hash;
- base, branch, all commits, frozen source candidate, and final pointer commit;
- exact changed paths and diff summary;
- requirement/F01-F04 implementation map;
- every command, failure, retry, and result with accurate test totals;
- lint, typecheck, focused tests, build, diff, scope, root-literal, redaction,
  and synthetic-race results;
- confirmation that both real roots, secret file, Slack, live tmux, real
  signals, descriptor, Registry/schema/database/framework/service/UI/external
  projects remained untouched;
- known limitations, especially the later real-filesystem/privilege HOLD gate;
- rollback to disabled R2 code without restoring original-root authority;
- Git status, non-force push, and upstream equality.

Return the exact pointer to `agent-office-advisor`. Do not self-review,
activate, preserve, initialize, connect, dispatch another actor, or start
another mission. STOP.
