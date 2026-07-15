# AS1 Phase A Worker Patch Handoff V6

MISSION_ID: `AGENT_OFFICE_AS1_MULTI_TEAM_SLACK_PILOT_001`

PATCH_PASS: `AS1_PATCH_V6_B05_FINAL_SOCKET_GENERATION_CLOSURE`

ACTOR: Agent Office Worker

SESSION: `agent-office-opus`

REQUIRED_SKILL: `/fable-builder`

MODEL_EFFORT: `Opus 4.8 / Ultracode`

## 1. Advisor decision and immutable review input

The same independent SOL Sentinel Reviewer returned V5 `NEEDS_PATCH`. B08 is
closed. B05 remains open only for receive-ready binary/non-Buffer and oversize
frames plus stale Socket-generation callbacks; B09 remains open because the
evidence overclaims B05. This is a routine bounded patch inside the already
reviewed transport design and requires no new product, authority, schema,
dependency, secret, or live-system decision.

Read the exact immutable result before editing:

- result:
  `advisor/jobs/20260714_agent_office_as1_multi_team_slack_pilot_001/38_IMPLEMENTATION_SECURITY_DELTA_REREVIEW_V5_RESULT.md`
- result commit:
  `f99474932b991cbdd30b9d23d5eff00f409eabe6`
- result SHA256:
  `8057004f4ebbe06920f9d6d4d6efee9b0dff4d74484c85e46773750bd12d21e0`
- pointer:
  `advisor/jobs/20260714_agent_office_as1_multi_team_slack_pilot_001/38_IMPLEMENTATION_SECURITY_DELTA_REREVIEW_V5_RESULT_POINTER.md`
- pointer commit:
  `97c9dadfb6ad6169e54ba3b80a309cb1623ad644`
- pointer SHA256:
  `46a2a7bc8bd483d79c48c793231e7a733c2a4f97de723801209cb5e8eb08349e`
- verdict: `NEEDS_PATCH`

B01, B02, B03, B04, B06, B07, and B08 are closed/frozen. Preserve them. Do not
reopen or rewrite their implementation or tests absent a direct V6 regression.

## 2. Frozen candidate coordinates and preflight

- worktree:
  `/home/leo/Project/.worktrees/agent-office/AGENT_OFFICE_AS1_MULTI_TEAM_SLACK_PILOT_001`
- branch: `feature/as1-multi-team-slack-pilot-001`
- exact clean/upstream-equal starting tip:
  `abfdbebfcde0e23fd068d10263f8a52acb700752`
- frozen V5 source:
  `938775a6850d516edfa6122c88b72ca0d1bf4caf`
- base parent:
  `81a8c3474380a7e427516d6f5e57c97ad88c6c9b`

Before editing, directly verify the Worker tmux pane, live Claude process,
Opus 4.8 / Ultracode profile, `/fable-builder` hash, repository instructions,
worktree/branch/HEAD/upstream, clean state, and no conflicting writer. Do not
infer runtime identity from names. Do not reset, clean, stash, checkout,
restore, rebase, merge, create another worktree, or materialize old source over
the working file. The immutable Reviewer probe is the red evidence.

## 3. Exact serial WorkUnits

### AS1-PATCH-V6-05A - phase-aware frame validation

Patch the existing `As1RawSocketTransport` message listener so binary,
non-Buffer, and over-limit frames are not routed into the already-settled
startup-only `rejectOnce` path after hello acceptance.

Required behavior:

1. Before receive-ready, preserve the existing startup rejection codes and
   fail-start behavior.
2. On the current Socket generation after receive-ready, binary/non-Buffer and
   oversize frames must stop admission, discard never-started queued work,
   close or terminate that exact current Socket, persist the owning profile
   latch once, and retain `LATCHED` through later shutdown.
3. The same malformed-frame class during a post-ready drain must not silently
   escape the durable fail-closed path.
4. Do not add reconnect, retry, reset, fallback, permissive parsing, or a
   constructor default.

Add direct regressions for current-generation binary, non-Buffer, and exact
`WS_MAX_PAYLOAD_BYTES + 1` frames after ready. Assert the durable latch and
current-socket close/termination, not only a phase or log entry.

### AS1-PATCH-V6-05B - current Socket/generation ownership

Every asynchronous callback capable of mutating transport-wide phase,
admission, queue, latch state, or current Socket ownership must prove both:

- `this.socket === callbackSocket`; and
- `this.generation === callbackGeneration`.

A stale generation's `open`, `message`, `error`, or `close` callback must not
mutate/latch the current generation, close the current Socket, run a handler,
or persist a current-profile failure. A current-generation raw error/close must
continue to durably fail closed exactly as V5 intended.

Do not solve this by weakening the durable latch, ignoring current-generation
errors, or allowing a second live connection to silently replace the first.
Reject an overlapping `connect()` before opening/replacing a Socket if the
transport is not in its clean reconnectable state. A clean disconnect followed
by an explicitly authorized reuse may retain the existing generation counter.

Add direct regressions that retain old callback references, establish a clean
new generation, then invoke stale `message`, `error`, and `close` callbacks.
Assert the current generation remains unchanged and actionable, with no durable
latch and no current-socket close. Also prove overlapping connect is rejected
before a second opener/factory side effect.

### AS1-PATCH-V6-09 - regenerate exact evidence

Only after V6 source and regressions pass, update the as-built, FEATURE_INDEX,
Worker result, and pointer from actual evidence.

Correct all B05 and stale-generation claims. Compute changed-file counts and
synthetic-token occurrence counts from the exact final ranges; do not carry
forward the V5 count errors. Preserve the truthful disclosures that Phase A is
default-disconnected/synthetic-only, live composition and production tmux
mutation remain absent, owner setup is incomplete, independent review is
pending, and no live Slack/network/secret/tmux action occurred.

## 4. Exact allowed paths

Production and test:

- `src/adapters/gateways/slack-pilot/socket-client.ts`
- `tests/adapters/as1-slack-socket-client.test.ts`

Evidence only after source closure:

- `docs/operations/AGENT_OFFICE_AS1_SLACK_PHASE_A_AS_BUILT.md`
- `docs/FEATURE_INDEX.md`
- `artifacts/as1-multi-team-slack-pilot/WORKER_RESULT.md`
- `artifacts/as1-multi-team-slack-pilot/WORKER_RESULT_POINTER.txt`

No other path is authorized. Do not touch B08 source/tests, package files,
Slack manifests, env templates, Setup Pack, runtime composition, Exact Delivery
v2, Advisor Inbox, registry, authority artifacts, or governance files.

## 5. Tests and evidence gates

Use the V5 Reviewer probe as immutable red evidence. Run green proof against
the current patch only; do not swap old source into the worktree.

Required:

1. `tests/adapters/as1-slack-socket-client.test.ts`;
2. `tests/integration/as1-slack-inbound.test.ts`;
3. `tests/integration/as1-slack-exact-transport.test.ts`;
4. `npm run typecheck`;
5. ESLint over the two changed TypeScript files;
6. `npm run build:core`;
7. `npm audit --audit-level=high`;
8. `git diff --check abfdbeb..HEAD`;
9. targeted scans for suppression, unsafe cast, deep import, token/secret,
   dynamic execution/target, reconnect/retry/reset/fallback, and stale callback
   action;
10. exact allowed-path check, clean status, and upstream equality.

Expand only if a concrete V6 regression requires it. Do not run Living Office,
visual/browser, broad E2E, broad repository suites, live Slack/network/DNS/
WebSocket, credentials, owner setup, or real tmux mutation.

## 6. Commit, result, and stop protocol

Use explicit-path staging and reversible commits:

1. source + direct tests;
2. as-built + FEATURE_INDEX + Worker result;
3. Worker result pointer last.

Write an exact V6 Worker result covering actual runtime/model/effort/skill,
coordinates, source commit, tests and totals, every failure/correction, changed
files/counts, no-live-action attestation, limitations, rollback, and Git state.
Non-force push the authorized branch, prove clean/upstream equality, return the
result and pointer to `agent-office-advisor`, and STOP.

Do not self-review, accept risk, authorize owner setup, activate Slack, deliver
to tmux, dispatch another actor, or start another mission.
