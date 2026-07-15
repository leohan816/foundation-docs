# Advisor Implementation Patch Handoff V3

MISSION_ID: `AGENT_OFFICE_AS1_MULTI_TEAM_SLACK_PILOT_001`

TARGET_ACTOR: Agent Office Worker

TARGET_SESSION: `agent-office-opus`

REQUIRED_SKILL: `/home/leo/Project/skill/fable-builder/SKILL.md`

REQUIRED_SKILL_SHA256:
`9a5afeefd34775a918b83900aa19859278f4e151a067cf6ab82cb6a25757091b`

MODEL_EFFORT: `Opus 4.8 / Ultracode` (verify directly before editing)

## 1. Advisor decision and immutable review input

The same independent SOL Sentinel Reviewer returned `NEEDS_PATCH`. The exact
remaining B01, B02, B04, B05, B08, and B09 findings are routine, bounded
implementation defects inside the already authorized and reviewed AS1 Phase A
surface. They require no new product decision, authority expansion, dependency,
live activation, or risk acceptance. Continue the same candidate train.

Read the complete immutable review result directly before inspecting source:

`advisor/jobs/20260714_agent_office_as1_multi_team_slack_pilot_001/32_IMPLEMENTATION_SECURITY_DELTA_REREVIEW_RESULT.md`

- review result commit:
  `3ffbb57689a8b5828eaef235cb9a1ff40dce43e5`
- review result SHA256:
  `8af621decdfbdb55bb38352ab15a7bc6dd9d23572ccce97b17f604669ad38cf3`
- review pointer commit:
  `bb1d6931997d9b89bfe54f09320b1d68b57a97d6`
- verdict: `NEEDS_PATCH`

The review closes B03, B06, and B07 for their prior findings. Preserve those
closures and all protected behavior. Do not reopen or rewrite them without a
direct regression caused by an exact required patch.

Do not reinterpret, omit, downgrade, or convert any open finding into accepted
risk. Do not repeat the prior claim that all B01-B09 are closed until every
required source and regression gate below is actually satisfied.

## 2. Exact candidate coordinates

- implementation worktree:
  `/home/leo/Project/.worktrees/agent-office/AGENT_OFFICE_AS1_MULTI_TEAM_SLACK_PILOT_001`
- branch: `feature/as1-multi-team-slack-pilot-001`
- current clean/upstream-equal branch tip:
  `6a2ca191cf3b03a53a4c612ddf7d425e87fbc543`
- current patched source candidate:
  `0e4274f427904302d67a0de1e78cde60512b94b3`
- frozen reviewed design/base:
  `81a8c3474380a7e427516d6f5e57c97ad88c6c9b`
- initial rejected source:
  `aac3e515ca05b89545688f84a4c17e4be12fa29d`
- superseded corrected result/pointer commits retained in history:
  `6bc5325d42d54e384aea64021a9806439e06c5d0` /
  `6a2ca191cf3b03a53a4c612ddf7d425e87fbc543`

Before editing, verify the exact session/process/model/effort, skill hash,
worktree/branch/HEAD, clean and upstream-equal state, no conflicting writer,
and required repository role/run/result instructions. A mismatch is an exact
preflight stop. Do not reset, clean, stash, rebase, merge, or recreate work.

## 3. Serial patch WorkUnits

### AS1-PATCH-V3-01 - production Socket options seam

- Make the actual production constructor options literal use the reviewed
  `as const satisfies As1WsClientOptions` intersection and pass that exact
  literal directly to the public package-root `ws` constructor.
- Preserve public-root imports, `ws@8.21.1`, `@types/ws@8.18.1`, TypeScript
  `6.0.3`, NodeNext, `skipLibCheck:false`, and public `terminate()` proof.
- Remove the detached duplicate-literal illusion: compile/static tests must
  exercise or inspect the actual production seam.
- No dependency, deep import, private API, package patch, suppression, or cast
  workaround is authorized.

### AS1-PATCH-V3-02 - durable ACKed rejection decisions

- Route every ACKable rejection that has a usable envelope and event identity
  through immutable receipt, exact dedupe, transport open, terminal pre-ACK
  decision, Socket ACK record, and exactly-once `TERMINAL_NO_INTAKE`.
- Preserve the separate unACKed fail-closed policy for identity contradictions
  that must latch.
- Identical retry/restart must reproduce the exact durable terminal decision;
  divergent duplicate identity must latch and remain unACKed.
- Cover failures before pre-ACK commit, between pre-ACK and transport ACK,
  after provider ACK but before durable ACK record, and before terminalization.
- Deferred query text, bot echoes, mutations, unsupported surfaces, malformed
  Slack times, and uncorrelated threads must not bypass the machine.

### AS1-PATCH-V3-04 - real authority-artifact provenance

- Implement and bind real read-only provenance loading/gating for both the
  receive-grant artifact and pointer-delivery-grant artifact.
- Prove exact trusted repository, path, committed blob bytes/hash, source
  commit, first addition, clean path, upstream ancestry, frozen authority
  ancestry, and all required governance/registry/control/latch/state-root
  snapshots before connection or delivery.
- Bind trusted clock and canonical control at construction. Do not accept a
  caller-selected current time, permissive provenance assertion, repository,
  path, profile, target, capability, session/pane, buffer, or command in any
  production-representable path.
- Reuse the bounded closed-argv read-only Git runner where correct. Do not add
  shell execution, network, mutation, a second authority model, or a generic
  provenance bypass.

### AS1-PATCH-V3-05 - owning control before every side effect

- Bind each raw Socket and exact tmux transport instance to the exact owning,
  lock-holding canonical profile control and durable profile latch.
- Recheck control/kill/latch immediately before every queue dequeue, journal
  mutation, authority consumption, buffer lookup/deletion/load, paste, Enter,
  outbound Slack side effect, and adjacent transition.
- Persist queue-capacity, provider-disconnect, unexpected-frame, handler,
  termination, and transport failures to the owning durable profile latch.
- Prove a kill/latch transition between every adjacent tmux boundary prevents
  the next mutation, with no blind retry or cross-profile fallback.
- Preserve clean shutdown and lock release; no reset/delete recovery path.

### AS1-PATCH-V3-08 - bounded and relational durable recovery

- Add a fixed durable-file byte limit to the closed `LIMITS` contract and
  enforce it before allocation/read/JSON parse for every affected durable index
  and global-control file. Count bounds remain required after parse.
- Validate exact state/phase-to-field invariants for dedupe records,
  receive-grant state, pending questions, transport records, and any other
  affected durable union.
- Require exact immutable equality for an idempotent duplicate root
  correlation; matching `rootTs` alone is insufficient.
- Impossible but individually well-typed records, divergent duplicates, and
  oversized files must fail closed and durably latch the owning profile or
  global control according to the reviewed contract.

### AS1-PATCH-V3-09 - truthful final evidence

- After source and tests are complete, update the as-built, FEATURE_INDEX,
  Worker result, and pointer from the actual final source and command evidence.
- Name real exported classes (`As1RawSocketTransport` and
  `NodeAs1WebSocketFactory`) and distinguish implemented adapters from the
  intentionally unimplemented live composition and real tmux port.
- State precisely that Phase A remains synthetic/default-disconnected, owner
  setup is incomplete, no real Slack/tmux action occurred, and a later live
  activation gate remains mandatory.
- Preserve all prior result/pointer commits as superseded evidence. Never
  rewrite history or hide failed commands.

## 4. Allowed paths

Modify only these existing source paths when required by the exact findings:

- `src/application/slack-pilot/contracts.ts`
- `src/application/slack-pilot/inbound-store.ts`
- `src/application/slack-pilot/service.ts`
- `src/application/slack-pilot/outbox.ts`
- `src/adapters/gateways/slack-pilot/socket-client.ts`
- `src/adapters/gateways/slack-pilot/exact-authority.ts`
- `src/adapters/gateways/slack-pilot/exact-transport.ts`
- `src/adapters/gateways/slack-pilot/git-provenance.ts`
- `src/operations/readiness/as1-slack-control.ts`
- `src/runtime/as1-slack-pilot/composition.ts`
- `tests/helpers/as1-slack-fakes.ts`

Modify only these existing focused test paths as needed:

- `tests/adapters/as1-slack-git-provenance.test.ts`
- `tests/adapters/as1-slack-socket-client.test.ts`
- `tests/contract/as1-slack-profiles.test.ts`
- `tests/integration/as1-slack-exact-transport.test.ts`
- `tests/integration/as1-slack-inbound.test.ts`
- `tests/integration/as1-slack-startup-auth.test.ts`
- `tests/operations/as1-slack-lifecycle.test.ts`
- `tests/recovery/as1-slack-recovery.test.ts`
- `tests/security/as1-slack-authority-lifecycle.test.ts`
- `tests/security/as1-slack-durable-boundaries.test.ts`

One narrowly isolated production/test pair is authorized only if extending
`git-provenance.ts` would conflate evidence and authority contracts:

- `src/adapters/gateways/slack-pilot/authority-provenance.ts`
- `tests/adapters/as1-slack-authority-provenance.test.ts`

Truthful documentation/evidence paths:

- `docs/operations/AGENT_OFFICE_AS1_SLACK_PHASE_A_AS_BUILT.md`
- `docs/FEATURE_INDEX.md`
- `artifacts/as1-multi-team-slack-pilot/WORKER_RESULT.md`
- `artifacts/as1-multi-team-slack-pilot/WORKER_RESULT_POINTER.txt`

Do not change dependencies, package files, Slack manifests, environment
template, Setup Pack, reviewed design/security documents, organization
registry, Exact Delivery v2, Advisor inbox, unrelated source/tests/docs, or any
external system. If an exact required fix cannot fit this list, stop with the
specific path and reason before editing it; do not broaden scope silently.

## 5. Exact targeted evidence gates

While patching, run only directly affected tests. Before freezing the new source
candidate, run these 16 AS1-focused files as one set:

- `tests/adapters/as1-slack-git-provenance.test.ts`
- `tests/adapters/as1-slack-sdk-adapter.test.ts`
- `tests/adapters/as1-slack-socket-client.test.ts`
- `tests/adapters/as1-slack-socket-frame.test.ts`
- `tests/contract/as1-slack-profiles.test.ts`
- `tests/integration/as1-slack-evidence-ingress.test.ts`
- `tests/integration/as1-slack-exact-transport.test.ts`
- `tests/integration/as1-slack-inbound.test.ts`
- `tests/integration/as1-slack-outbound.test.ts`
- `tests/integration/as1-slack-startup-auth.test.ts`
- `tests/integration/as1-slack-thread-correlation.test.ts`
- `tests/operations/as1-slack-lifecycle.test.ts`
- `tests/recovery/as1-slack-recovery.test.ts`
- `tests/security/as1-slack-authority-lifecycle.test.ts`
- `tests/security/as1-slack-durable-boundaries.test.ts`
- `tests/security/as1-slack-secret-config.test.ts`

If the optional authority-provenance test is added, include it in this set.

Also run only these four protected regressions:

- `tests/contract/organization-registry.test.ts`
- `tests/integration/advisor-inbox.test.ts`
- `tests/integration/exact-advisor-delivery.test.ts`
- `tests/operations/readiness.test.ts`

Then run:

1. `npm run typecheck`;
2. ESLint over TypeScript files changed from `0e4274f` to the new source only;
3. `npm run build:core`;
4. `npm audit --audit-level=high`;
5. `git diff --check 0e4274f427904302d67a0de1e78cde60512b94b3..HEAD`;
6. exact package-root/production-literal checks represented by focused tests;
7. targeted scans for suppressions, deep imports, secrets, unsafe casts,
   permissive provenance gates, caller-selected target/profile/path/command/
   capability/time, reset paths, historical physical fallback, and stale
   completion/live-readiness claims;
8. protected-path diff proof, clean status, and upstream equality.

Every open review finding requires a regression that fails on `0e4274f` and
passes on the new source. Record every failed command and correction honestly.
Do not run Living Office, visual, browser, broad E2E, broad repository tests,
real Slack/network/DNS/WebSocket, tokens/secrets, owner setup, or real tmux
mutation.

## 6. Completion protocol

Keep Phase A default-disconnected and synthetic. Do not create Slack apps,
secret files, credentials, receive grants, leases, capabilities, owner setup,
live connection, or a real round trip.

After the exact patch passes:

1. stage explicit authorized source/test/doc paths only;
2. commit and non-force push one frozen source-candidate commit or a small
   reviewable series whose final source commit is unambiguous;
3. write `WORKER_RESULT.md` in a result-only commit with the exact review
   lineage, B01-B09 disposition, changed files, every command/failure, test
   totals, class names, dependency truth, default-disconnected limitations,
   rollback point, and no-live/no-secret attestations;
4. write `WORKER_RESULT_POINTER.txt` in a pointer-only commit with exact hashes;
5. prove clean/upstream-equal state;
6. return the exact pointer to `agent-office-advisor` and STOP.

The same `agent-office-reviewer` performs the independent narrow delta
re-review. The Worker must not self-review, approve, accept risk, dispatch an
actor, start owner setup, or begin another mission.
