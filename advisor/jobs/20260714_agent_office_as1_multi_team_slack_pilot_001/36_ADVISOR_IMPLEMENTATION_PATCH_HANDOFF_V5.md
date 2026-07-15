# Advisor Implementation Patch Handoff V5

MISSION_ID: `AGENT_OFFICE_AS1_MULTI_TEAM_SLACK_PILOT_001`

TARGET_ACTOR: Agent Office Worker

TARGET_SESSION: `agent-office-opus`

REQUIRED_SKILL: `/home/leo/Project/skill/fable-builder/SKILL.md`

REQUIRED_SKILL_SHA256:
`9a5afeefd34775a918b83900aa19859278f4e151a067cf6ab82cb6a25757091b`

MODEL_EFFORT: `Opus 4.8 / Ultracode` (verify directly before editing)

## 1. Advisor decision and immutable review input

The same independent SOL Sentinel Reviewer returned `NEEDS_PATCH` after direct
source inspection and disposable read-only probes. B05 and B08 remain open;
B09 is open only because the evidence currently overclaims those two gates.
This is a routine bounded patch within the frozen AS1 design and authority. It
requires no new product decision, design change, dependency, live activation,
or risk acceptance.

Read the complete immutable review result before editing:

`advisor/jobs/20260714_agent_office_as1_multi_team_slack_pilot_001/35_IMPLEMENTATION_SECURITY_DELTA_REREVIEW_V4_RESULT.md`

- result commit:
  `caf808f6af750794417186f2418f538c0dc1bad4`
- result SHA256:
  `93c4eda55a5b701fffdfbd4388fa6a070541b71252dfb2adc66610f618d5295c`
- pointer commit:
  `8680b511a9a021dd10238982399eee48547ba84f`
- pointer SHA256:
  `d50274f1c39f7aedae820c2f2497312476d83c348b4c29df427879f04cf37cbc`
- verdict: `NEEDS_PATCH`

B01, B02, and B04 are closed. B03, B06, and B07 remain closed and unregressed.
Preserve them and all protected M1/Exact Delivery/Advisor Inbox/organization
behavior. Do not reopen their design or source except for a direct regression
caused by the exact B05/B08 patch.

## 2. Exact candidate coordinates and preflight

- implementation worktree:
  `/home/leo/Project/.worktrees/agent-office/AGENT_OFFICE_AS1_MULTI_TEAM_SLACK_PILOT_001`
- branch: `feature/as1-multi-team-slack-pilot-001`
- current clean/upstream-equal tip:
  `cc823562a52f495ea1b3d54314865b2305ea0932`
- frozen V4 source candidate:
  `4cf967d54f14e9b63dc3e94efa1081c13ca38044`
- source behavior tip below the as-built-only commit:
  `57af414a7c9d93099385b7c6d00b2fd7e0cbf002`
- frozen reviewed design/base:
  `81a8c3474380a7e427516d6f5e57c97ad88c6c9b`
- rejected prior source used by regression evidence:
  `0e4274f427904302d67a0de1e78cde60512b94b3`
- superseded V4 Worker result/pointer retained in history:
  `0c2ed3a1537538993a67dbfe648c4e515fb3cc50` /
  `cc823562a52f495ea1b3d54314865b2305ea0932`

Before editing, directly verify the existing session, process, actual model and
effort, skill hash, worktree path, branch, HEAD, clean/upstream-equal state,
repository instructions, and absence of a conflicting writer. Do not infer any
of these from names. Do not reset, clean, stash, rebase, merge, recreate the
worktree, or rewrite history.

## 3. Exact serial patch WorkUnits

### AS1-PATCH-V5-05 - complete receive-ready Socket fail-closed latching

Patch `As1RawSocketTransport` so every malformed or unexpected post-hello
transport state is a durable owning-profile failure, not a logged-and-ignored
frame.

Required behavior:

1. malformed JSON after `EVENT_RECEIVE_READY`;
2. a well-formed but invalid/unexpected Events API envelope after ready;
3. raw Socket `error` after ready;
4. raw Socket `close` after ready;
5. an owning-control predicate that resolves false or rejects immediately
   before dequeue;

must each stop admission, discard never-started queued work, move to and retain
`LATCHED`, close or terminate the same socket generation, persist the exact
owning profile latch once, remain observable if latch persistence itself fails,
and never be converted to clean `CLOSED` by shutdown. There is no reconnect,
reset, blind retry, or fallback.

Add direct regressions for every case above. Tests must prove the durable latch,
not only an in-memory phase, a log line, socket close, or thrown exception. They
must also prove no queued handler runs after a control false/rejection.

### AS1-PATCH-V5-08A - exact durable phase/field and identity invariants

Make every accepted durable record represent an exact state that a canonical
writer can create. At minimum:

- the dedupe parser must enforce the exact `preAckClass`/field matrix instead
  of independently accepting enum-plus-nullable fields;
- impossible `MATERIALIZED` or terminal dedupe combinations must quarantine;
- transport `eventId` must equal `observed.sourceEventId`;
- ROOT versus CONTINUATION candidate kind must agree with the committed
  pre-ACK decision and continuation binding;
- decisions that require a receive/root binding must carry the exact required
  binding-state hash, while states that cannot carry it must reject it;
- transport/materialization/terminal fields must remain correlated with the
  exact state, decision, ACK state, and candidate kind.

Derive the closed matrix from the frozen design and the actual canonical
writers. Do not invent a second schema, make old impossible states legal, or
weaken exact-key/type/hash checks. Add malicious individually well-typed
fixtures for each matrix edge, including the Reviewer-reproduced
`MATERIALIZED` dedupe row with all terminal fields null.

### AS1-PATCH-V5-08B - normalize durable corruption and prove durable latches

For every affected profile index and global-control file, normalize fatal UTF-8
decode, JSON parse, and relevant pinned-read corruption into the existing
reviewed quarantine/fail-closed error path. Keep the fixed pre-read byte bound
and pinned-file-descriptor behavior.

Profile corruption must cause the owning profile latch through the existing
service boundary. Global-control corruption must become and remain a durable
global latch/quarantine condition. Malformed bytes, malformed JSON, valid-type
impossible records, and oversized files require tests that assert the durable
profile/global latch and restart behavior, not merely a rejection.

Do not catch programmer errors or unrelated failures as if they were durable
corruption. Preserve the existing error taxonomy and use the narrow reviewed
quarantine path.

### AS1-PATCH-V5-09 - regenerate truthful evidence only after source closure

After the B05/B08 source and direct tests pass, update only the as-built,
FEATURE_INDEX, Worker result, and pointer from actual final evidence. Record all
commands and failures honestly. Do not claim B05/B08/B09 closure before the
new regressions prove the reproduced failures are closed. Preserve the facts
that Phase A is default-disconnected/synthetic, owner setup is incomplete, and
no live Slack, token, secret, network, or real tmux delivery action occurred.

## 4. Allowed paths

Production paths, only as required by the exact findings:

- `src/adapters/gateways/slack-pilot/socket-client.ts`
- `src/application/slack-pilot/inbound-store.ts`
- `src/application/slack-pilot/service.ts`
- `src/operations/readiness/as1-slack-control.ts`
- `src/application/slack-pilot/contracts.ts` only if type narrowing is required
  to encode the existing frozen matrix; no schema expansion is authorized

Focused tests/helpers, only as required:

- `tests/adapters/as1-slack-socket-client.test.ts`
- `tests/integration/as1-slack-inbound.test.ts`
- `tests/operations/as1-slack-lifecycle.test.ts`
- `tests/recovery/as1-slack-recovery.test.ts`
- `tests/security/as1-slack-durable-boundaries.test.ts`
- `tests/helpers/as1-slack-fakes.ts`

Truthful documentation/evidence:

- `docs/operations/AGENT_OFFICE_AS1_SLACK_PHASE_A_AS_BUILT.md`
- `docs/FEATURE_INDEX.md`
- `artifacts/as1-multi-team-slack-pilot/WORKER_RESULT.md`
- `artifacts/as1-multi-team-slack-pilot/WORKER_RESULT_POINTER.txt`

Do not modify package/dependency files, Slack manifests, environment templates,
Setup Pack, frozen design/security documents, authority provenance, profile
vocabulary, registry, Exact Delivery v2, Advisor Inbox, tmux adapter, runtime
composition, or unrelated source/tests/docs. If the exact fix cannot fit these
paths, stop with the path and concrete reason before editing; do not broaden
scope silently.

## 5. Delta-first evidence gates

During red/green work, run only the directly affected test files. Before
freezing the new source candidate, run this focused set:

- `tests/adapters/as1-slack-socket-client.test.ts`
- `tests/integration/as1-slack-inbound.test.ts`
- `tests/operations/as1-slack-lifecycle.test.ts`
- `tests/recovery/as1-slack-recovery.test.ts`
- `tests/security/as1-slack-durable-boundaries.test.ts`

Then run the exact V4 mandatory regression set to preserve closed gates:

- `tests/adapters/as1-slack-authority-provenance.test.ts`
- `tests/integration/as1-slack-exact-transport.test.ts`
- `tests/integration/as1-slack-startup-auth.test.ts`
- `tests/contract/organization-registry.test.ts`
- `tests/integration/advisor-inbox.test.ts`
- `tests/integration/exact-advisor-delivery.test.ts`
- `tests/operations/readiness.test.ts`

Deduplicate overlapping paths and report exact distinct file/test totals. Then
run:

1. `npm run typecheck`;
2. ESLint over TypeScript paths changed from `4cf967d` to the new source;
3. `npm run build:core`;
4. `npm audit --audit-level=high`;
5. `git diff --check 4cf967d54f14e9b63dc3e94efa1081c13ca38044..HEAD`;
6. targeted scans for suppressions, unsafe casts, secret/token literals,
   reconnect/reset/fallback, dynamic target/command input, and stale closure;
7. protected-path byte equality, clean status, and upstream equality.

For B05/B08, include red evidence or a direct reference to the Reviewer's
reproduced V4 probe and prove the corresponding green behavior. Do not run
Living Office, visual/browser, broad E2E, broad repository suites, live
Slack/network/DNS/WebSocket, secrets/tokens, owner setup, or real tmux mutation.

## 6. Completion protocol

Keep Phase A default-disconnected and synthetic. Do not create Slack apps,
credentials, secret files, receive grants, leases, capabilities, owner setup,
live connections, or a real round trip.

After the exact patch passes:

1. stage explicit authorized paths only;
2. commit and non-force push a small reviewable patch series with one
   unambiguous final source candidate;
3. write the Worker result in a result-only commit with exact review lineage,
   changed files, B01-B09 disposition, all commands/failures, test totals,
   safe-state limits, rollback, and no-live/no-secret attestations;
4. write the pointer in a pointer-only commit with exact hashes;
5. prove clean/upstream-equal state;
6. return the exact pointer to `agent-office-advisor` and STOP.

The same `agent-office-reviewer` performs the narrow V5 delta re-review. The
Worker must not self-review, accept risk, approve, dispatch another actor,
begin owner setup, or start another mission.
