# AS1 Phase A Worker Patch Handoff V7

MISSION_ID: `AGENT_OFFICE_AS1_MULTI_TEAM_SLACK_PILOT_001`

PATCH_PASS: `AS1_PATCH_V7_B05_CONNECT_RESERVATION`

ACTOR: Agent Office Worker

SESSION: `agent-office-opus`

REQUIRED_SKILL: `/fable-builder`

WORKER_MODEL_EFFORT: `Opus 4.8 / Ultracode`

## 1. Authority and exact start

This is a routine bounded patch after the independent V6 `NEEDS_PATCH`. Use the
same Worker. Do not redesign the transport, broaden the mission, perform owner
setup, activate Slack, deliver to tmux, or start another mission.

- Candidate worktree:
  `/home/leo/Project/.worktrees/agent-office/AGENT_OFFICE_AS1_MULTI_TEAM_SLACK_PILOT_001`
- Candidate branch: `feature/as1-multi-team-slack-pilot-001`
- Exact clean/upstream-equal V7 start:
  `2f1ba94495b27cbe8d6c2b5141fbd75699722cbe`
- Frozen V6 source reviewed:
  `ddab1b12b8f3d21b26e6ebc31de5016f45a7ce6a`
- V6 Reviewer result:
  `advisor/jobs/20260714_agent_office_as1_multi_team_slack_pilot_001/41_IMPLEMENTATION_SECURITY_DELTA_REREVIEW_V6_RESULT.md`
- V6 Reviewer result commit:
  `ccea51e3878fa464eb047964ca5a9b97f4eb9a8b`
- V6 Reviewer result SHA256:
  `2c911703752da252c2751aeffc24b9287a6060df6a123110c13f0d3a5d60df72`
- V6 Reviewer pointer commit:
  `c6fb20e670d11542db655489e9cff689e7fd9a9c`
- V6 Reviewer pointer SHA256:
  `b15ddc157e339c6fc03812b96e7555b322b9be33376db7e95decd01c79e2902f`

Before editing, verify the live Worker runtime/model/effort, skill hash, exact
worktree/branch/HEAD/upstream, clean status, no conflicting writer, and read the
V6 Reviewer result directly. Stop only for a material conflict, not a routine
test failure.

## 2. Exact defect

`As1RawSocketTransport.connect()` checks `CLOSED` and null Socket, then awaits
`opener.open()` before reserving phase or generation ownership. Two immediate
calls can therefore both pass the guard and invoke the opener while both
promises remain pending. The frozen V6 direct probe observed:

```json
{"openerCalls":2,"factoryCalls":0,"phase":"CLOSED","secondOutcome":"pending"}
```

The V6 regression starts its second call only after `connectReady()`, so it does
not cover the pre-Socket pending-opener edge. The V6 evidence also incorrectly
reports `socket-client.ts` as `+49/-8`; the actual numstat is `+41/-8`.

## 3. Required behavior

Patch the existing state machine only as narrowly as necessary so that:

1. The first `connect()` synchronously reserves exclusive transport ownership
   before calling or awaiting `opener.open()`.
2. A second immediate `connect()` while the first opener is pending rejects
   before a second opener/factory side effect.
3. The first connection can still complete hello and receive a current event.
4. If the opener rejects, or the factory throws before a Socket is bound, the
   same current reservation is released to the prior clean `CLOSED`/no-Socket
   state without clobbering a newer generation. A later explicit connect may
   then proceed; there is no automatic retry or reconnect.
5. If `disconnect()` occurs while an opener is pending, the pending generation
   may not later bind/create a Socket or mutate a newer connection. The stopped
   state remains fail closed and no queued event is replayed.
6. Existing V6 phase-aware binary/non-Buffer/oversize behavior and current
   Socket/generation callback ownership remain intact.
7. No reconnect loop, blind retry, reset, fallback, dynamic destination,
   cross-profile action, permissive default, or new authority is introduced.

Use the current phase vocabulary if it can represent the reservation safely.
Do not add a new schema or public contract merely to name the transient state.
If the existing state machine cannot represent this safely within the two
source/test files, return the concrete blocker before broadening scope.

## 4. Required regressions

Add direct tests that prove at minimum:

- two immediate `connect()` calls with the first `opener.open()` deliberately
  pending produce exactly one opener call, zero factory calls at the overlap
  point, and an immediate `INVALID_TRANSITION` rejection for the second call;
- after resolving the first opener, the first generation can become ready and
  handle a fresh event;
- opener rejection releases only its own current reservation and permits one
  later explicit clean connect;
- factory throw releases only its own current reservation and permits one later
  explicit clean connect;
- disconnect while opener is pending prevents that pending generation from
  creating/binding a Socket after the opener later resolves;
- the existing V6 binary, oversize, stale-callback, current-error, and
  already-ready overlap regressions remain green.

Do not materialize older source into the worktree for a red test. Use the
immutable V6 Reviewer probe as red evidence and run new tests green only against
the patch.

## 5. Allowed files

Only these six paths may change:

1. `src/adapters/gateways/slack-pilot/socket-client.ts`
2. `tests/adapters/as1-slack-socket-client.test.ts`
3. `docs/operations/AGENT_OFFICE_AS1_SLACK_PHASE_A_AS_BUILT.md`
4. `docs/FEATURE_INDEX.md`
5. `artifacts/as1-multi-team-slack-pilot/WORKER_RESULT.md`
6. `artifacts/as1-multi-team-slack-pilot/WORKER_RESULT_POINTER.txt`

Do not change package/dependency/config/manifest/env/Setup Pack, B08, registry,
Exact Delivery v2, Advisor Inbox, runtime composition, authority artifacts, or
governance files.

## 6. Proportionate gates

Run:

- `tests/adapters/as1-slack-socket-client.test.ts`;
- `tests/integration/as1-slack-inbound.test.ts`;
- `tests/integration/as1-slack-exact-transport.test.ts`;
- `npm run typecheck`;
- ESLint over the two changed TypeScript paths;
- `npm run build:core`;
- `npm audit --audit-level=high`;
- `git diff --check 2f1ba94..HEAD`;
- exact changed-path and numstat checks;
- targeted suppression, unsafe-cast, deep-import, secret/token, dynamic
  command/target, reconnect/retry/reset/fallback, and stale-generation scans.

Do not run Living Office, visual/browser, broad E2E, broad repository tests,
live Slack/network/DNS/WebSocket, secrets, owner setup, or real tmux mutation.

## 7. Commit and result contract

Create in order:

1. one source/test commit;
2. one as-built/FEATURE_INDEX/Worker result commit;
3. one pointer-only commit.

Compute every changed-file count, insertion/deletion count, test count, and
synthetic token occurrence from the final frozen ranges. Correct the V6
`+49/-8` evidence error. Record every failed command honestly.

Non-force push the authorized branch and prove clean/upstream equality. Return:

- frozen V7 source commit;
- result commit and SHA256;
- pointer commit and SHA256;
- exact changed paths and numstats;
- tests and all gate outcomes;
- known limitations and safe-state disclosure;
- no-live-action, no-owner-setup, no-self-review attestations.

Return the pointer to `agent-office-advisor` and STOP. Do not dispatch the
Reviewer yourself.
