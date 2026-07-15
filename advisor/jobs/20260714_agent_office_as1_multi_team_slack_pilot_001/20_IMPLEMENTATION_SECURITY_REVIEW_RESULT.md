# Independent Sentinel Phase A Implementation/Security Review Result

## Verdict

`NEEDS_PATCH`

The frozen Phase A candidate must not advance to owner setup, live Slack,
real tmux delivery, risk acceptance, or pilot execution. The declared focused
tests and build gates reproduce, and the default-disabled composition prevents
the submitted tree from opening Slack or mutating tmux. However, actual source
inspection against the pinned SDK and reviewed contracts found multiple
mandatory-gate failures in intake, recovery, authority, delivery, evidence,
outbox, control, and operations evidence.

This is `NEEDS_PATCH`, rather than `PASS_WITH_RISK`, because the failures are in
mandatory safety contracts and cannot be accepted as residual risk. It is
`NEEDS_PATCH`, rather than `FAIL`, because the confirmed defects are repairable
inside the previously approved AS1 source/test/document surface without
changing the reviewed product boundary. Any dependency or design change still
requires an Advisor decision before implementation.

## Blocking findings

### B01 — the real Socket Mode adapter cannot authenticate or deliver its event payload

Severity: critical. Gates: 4, 6, 8, 14, 16.

`NodeAs1SocketClient` constructs `SocketModeClient` without `clientOptions`,
listens for an event named `hello`, then reads `payload` and `retry_attempt` from
the emitted `slack_event`
(`aac3e515:src/adapters/gateways/slack-pilot/socket-client.ts:44-63,66-75,94-109`).
The installed and lock-pinned `@slack/socket-mode@3.0.0` instead:

- defaults the internal Web client used for `apps.connections.open` to
  `retryConfig: { retries: 100, factor: 1.3 }` when no client option is supplied
  (`node_modules/@slack/socket-mode/dist/src/SocketModeClient.js:118-153`);
- consumes raw `hello`, emits `State.Connected` with `connectionResponse`, and
  never emits `hello` or exposes `hello.connection_info.app_id`
  (`...SocketModeClient.js:304-325`);
- emits `slack_event` with fields `body` and `retry_num`, not `payload` and
  `retry_attempt` (`...SocketModeClient.js:340-370`); and
- parses and may debug-log the complete raw WebSocket payload before the AS1
  adapter sees it (`...SocketModeClient.js:304-320`).

Consequently a valid connection resolves `client.start()` but the candidate's
second `hello` wait times out, and a real valid callback would be converted to
`payload: undefined`. The fakes construct the candidate's desired post-adapter
shape directly (`tests/helpers/as1-slack-fakes.ts:410-443`), so 126 passing tests
do not exercise this mismatch. `autoReconnectEnabled: false` does not disable
the SDK's `apps.connections.open` retry policy. This contradicts the Worker
brief's explicit package-feasibility stop condition and the reviewed hello,
manual-ACK, external-input, and no-provider-retry contracts.

Required patch evidence: exercise the exact pinned public-root SDK seam, prove
bounded raw hello/App-ID validation and the actual event shape, require a real
ACK function, disable every SDK/provider retry, and prove redacted logging. If
the pinned public API cannot satisfy those contracts, stop for an Advisor-owned
dependency/design decision instead of substituting behavior.

### B02 — duplicate and crash recovery can ACK an incomplete decision and drop work

Severity: critical. Gates: 6, 7, 9, 13, 16.

Both root and continuation flows persist receipt, insert a dedupe row with
`PREACK_PENDING`, and then immediately ACK any duplicate without verifying or
finishing the required binding/question/rejection and transport record
(`service.ts:193-233,237-285`). A crash after dedupe insertion but before the
root/question transition therefore causes an identical retry to ACK incomplete
state. A crash after the Socket ACK but before `recordTransportAck` also has no
recovery path. No startup `PREACK_PENDING` recovery or exact transport-decision
reproduction exists.

The materializer checks only one mutable boolean,
`transportAckRecorded`, before generating new IDs and artifacts
(`service.ts:288-357`; `inbound-store.ts:514-580`). It does not bind and verify
the immutable receipt, dedupe, accepted root/question transition, hashes,
literal profile, kill/latch state, or ambiguity required by the reviewed
post-ACK predicate. It is not restart-idempotent and no bounded offline drain of
ACK-recorded work is composed. This directly contradicts reviewed design
§8.3/§9/§12.3/§15.1 and security §8.3, including the six exact recovery cases.

Required patch evidence: implement a durable, exact, hash-bound
`PREACK_PENDING -> terminal pre-ACK decision -> TRANSPORT_ACK_RECORDED ->
MATERIALIZED|TERMINAL_NO_INTAKE` state machine; recover every crash boundary;
reproduce only the exact durable ACK decision on retry; and prove one-time
post-ACK materialization after expiry/restart without Socket reopen.

### B03 — a thread continuation is persisted as a `NEW_MISSION`

Severity: high. Gate: 8.

`handleContinuation` passes the pending question's fixed response kind to
`materialize`, but `materialize` always invokes `buildNewMissionIntake`
(`service.ts:278-307`). That builder's interface and output hard-code
`kind: 'NEW_MISSION'` (`contracts.ts:493-537`). Only the later pointer carries
the requested `CLARIFICATION` or `DECISION_RESPONSE` label. This violates the
closed intake contract: a thread reply may create only its already-fixed
continuation kind and must bind the original intake/root/question. Existing
tests do not assert the immutable persisted intake's kind/schema.

Required patch evidence: separate exact continuation contracts/builders and
artifact assertions for both fixed response kinds, including restart and
single-consumption cases. Slack text must remain unable to choose the kind.

### B04 — authority and exact delivery accept caller-selected production values

Severity: critical. Gates: 1, 5, 10, 13, 14.

`assertReceiveGrantConnectable` checks profile/wire equality and expiry only
(`exact-authority.ts:50-70`). The candidate has no receive-grant Git provenance
verifier for first-addition, committed/pushed/upstream-equal byte stability,
authority repository/root/source commit, governance/registry/owner/review
snapshots, global control, profile latch, and state-root identity before
connection.

The exact-delivery API then accepts a caller-provided in-memory `capability`,
`bufferName`, `pointerFilePath`, and `now`
(`exact-transport.ts:70-79,96-142`), despite comments and the reviewed security
contract requiring capability and private buffer/path derivation to be internal.
The public request therefore selects a production file path and buffer name.
Capability freshness is checked only once with a caller-supplied timestamp after
buffer load, not from a fresh trusted clock before each authorized side effect.
The capability omits required authority/destination snapshot bindings, and
`assertDeliveryChainConsistent` omits several lease/grant correlations.

Interrupted `PREPARED` and `BUFFER_LOADED` records are silently overwritten and
retried because only paste-or-later phases are treated as no-retry
(`exact-transport.ts:28,102-140`). The reviewed design requires every
interrupted nonterminal journal to become
`MANUAL_RECONCILIATION_REQUIRED` (`AGENT_OFFICE_AS1_MULTI_TEAM_SLACK_DESIGN.md:828-842`).
Grant and lease consumption are also persisted in two independent array writes
(`inbound-store.ts:713-736`), so a crash can consume only one side.

Required patch evidence: validate immutable authority provenance and all
snapshots before connection/delivery; make capability, buffer name, pointer path,
target, and trusted time unrepresentable as caller inputs; bind every immutable
fact; atomically consume grant+lease; and test every journal crash boundary.

### B05 — control, latch, capacity, and shutdown behavior are not durable fail-closed controls

Severity: high. Gates: 1, 9, 13, 14.

`As1SlackControl.transition` permits any enum-to-enum transition and an arbitrary
`activeProfileSlug`; `latchProfile`/`isProfileLatched` accept arbitrary slugs
(`as1-slack-control.ts:98-136`). Malformed latch fields can map to unlatched, and
malformed global booleans/timestamps are coerced rather than rejected
(`as1-slack-control.ts:176-195`). Deleting `global-control.json` is treated as a
first run and recreates `DISABLED_DEFAULT`, which is a reset path for a prior
kill/latch. Profile contradictions in `As1InboundService` set only a private
in-memory boolean (`service.ts:72,164-190`) and are forgotten on restart.

The production composition opens control but never acquires/releases its
`WriterLock`, composes no receive/recovery queue, and implements `stop` as state
changes only (`composition.ts:61-137`). There is no SIGTERM/SIGINT refusal of new
work, bounded in-flight drain, Socket close, dequeue cancellation, final fsync,
or ambiguity latch. Many capacity failures throw `STORE_QUARANTINED` without
persisting the required profile/global latch.

Required patch evidence: exact closed transition tables and profile union,
strict schemas, irreversible persisted latches with no delete/reset recovery,
lock ownership in composition, kill/latch checks before every dequeue/side
effect, and bounded shutdown/restart tests.

### B06 — evidence ingress does not establish the reviewed Git or content provenance

Severity: high. Gates: 9, 11, 13.

The evidence parser validates a small common envelope and selected profile, but
does not retain and bind the full reviewed ACK/intake/question/result facts
(`evidence-ingress.ts:43-125`). The injected verifier returns four booleans; the
ingress does not bind `repositoryId`/`sourceCommit` to the delivery grant's
authority chains, prove descent from both frozen snapshots, read the blob and
compare its bytes to `blobSha256`, or compare evidence correlations to the
accepted pointer/journal/consumption state (`evidence-ingress.ts:127-213`). A
fake can approve an unrelated ref. Quarantine returns a result string only and
does not persist a profile latch. Duplicate `evidenceId` acceptance compares
only the blob hash, not kind/intake/commit (`inbound-store.ts:676-710`).

Required patch evidence: exact reviewed schemas and stage correlations, real
read-only bounded Git/content verification behind the port, immutable authority
chain bindings, exact duplicate equality, and durable profile latch on every
provenance/order contradiction.

### B07 — outbox restart can blindly resend and its target is caller-selected

Severity: high. Gates: 1, 12, 13, 14.

`As1Outbox.send` accepts caller-provided channel, thread timestamp, and bot token,
does not consult `readOutboxPhase`, and unconditionally overwrites the journal
with `PREPARED` then `REQUEST_STARTED` before sending
(`outbox.ts:80-127`). Reinvoking after `REQUEST_STARTED` or even
`RESPONSE_RECORDED` can therefore resend. The target is not derived and checked
against the accepted immutable root correlation. Ambiguity records a journal
phase but does not durably latch the profile or cancel retries on drain/kill.

`NodeAs1WebClient` disables SDK retries, but it does not translate provider
rate-limit and proven-before-send failures into the candidate's safe retry
classes (`web-client.ts:55-113`); those branches are fake-only. Success accepts
any nonempty bounded timestamp rather than the exact Slack timestamp grammar.

Required patch evidence: derive target/token from the selected profile and
accepted root, resume terminal/ambiguous phases without network I/O, prove
definitely-unsent and rate-limit classifications in the real adapter, persist
request/response hashes, and latch ambiguity.

### B08 — external-input and durable-index bounds are declared but not enforced

Severity: high. Gates: 3, 4, 6, 9, 11, 14.

The raw Socket adapter does not enforce the reviewed exact outer envelope,
32-KiB byte limit, depth 8, array 16, retry bounds, or required callback
authorization identity. The service does not validate `event_time`/`event_ts`
or future skew. Constants including `RAW_SOCKET_ENVELOPE_MAX_BYTES`,
`PROVIDER_RESPONSE_MAX_BYTES`, `SUBPROCESS_OUTPUT_MAX_BYTES`,
`JSON_NESTING_DEPTH_MAX`, `PARSED_ARRAY_MAX`, retention, queue/in-flight, and
shutdown/drain limits are declared but have no owning enforcement call sites.

For mutable durable indexes, `readJsonArray<T>` checks only `Array.isArray` and
casts every item to `T` (`inbound-store.ts:817-837`). Dedupe, questions, root
correlation, transport, tmux, outbox, evidence, and consumption records therefore
lack exact-key/type/bound/hash/phase parsing on recovery. Journal methods accept
arbitrary phase strings and overwrite history rather than validating a legal
hash-bound transition. This invalidates the as-built claim that every fixed
limit is owned, persisted, and latched.

Required patch evidence: exact bounded parsers at every external and durable
boundary, use every approved numeric limit in its owning component, and prove
corruption/capacity produces the required durable latch without silent reset or
eviction.

### B09 — setup/as-built/Worker evidence materially overstates the implementation

Severity: high. Gates: 17, 18.

The reviewed Setup Pack remains unchanged and still states
`SETUP_PACK_ONLY__RUNTIME_COMMANDS_NOT_YET_AVAILABLE` and that the lifecycle
commands do not exist (`AGENT_OFFICE_AS1_SLACK_SETUP.md:1-14,171-184`), while the
candidate adds the script and CLI. Conversely, its redacted-check contract says
successful verification includes `auth.test`, `bots.info`, and Socket hello
pairing (`...SETUP.md:142-168`), but the implemented command only parses the
local file and prints both profiles `VERIFIED_REDACTED` and `RESULT: PASS`
(`cli.ts:61-70`; `secret-config.ts:50-61,97-127`). That output overclaims a
network identity proof it did not perform.

The as-built document says limits are referenced by owning modules and crossing
them persists a stable failure/latch, and says the SDK adapter is manual-ACK and
the outbox has no blind resend
(`AGENT_OFFICE_AS1_SLACK_PHASE_A_AS_BUILT.md:16-37,53-58`). The Worker result
similarly claims no package blocker, disabled retries, every WorkUnit complete,
no generic/dynamic tmux target or caller path, and complete recovery/lifecycle
proof. Those claims conflict with B01-B08. Its mechanical commit coordinates,
diff size, declared test totals, no-live-side-effect statement, default-disabled
statement, and protected-v2 statement do reproduce.

Required patch evidence: update Setup and as-built docs to the actual reviewed
behavior; make redacted status distinguish local syntax validation from live
identity proof; and return a corrected Worker result that discloses every
remaining fake-only boundary and reproduces the repaired cases.

## Mandatory gate disposition

1. **Closed profiles / no caller selectors — FAIL.** The two profile constants
   and registry lineage are closed, but control, delivery, and outbox production
   APIs accept caller profile/path/target values (B04, B05, B07).
2. **Historical/fresh role-instance separation — PASS.** Agent Office retains
   `foundation-advisor` only as its historical join key; Foundation uses
   `foundation-advisor-20260714-01`; no evidence fallback was found.
3. **Secret parser and redaction — PASS for the strict file parser.** Exact ten
   keys, owner/mode/no-follow/regular-file/UTF-8 checks and redacted parser errors
   reproduce. The separate status and SDK logging defects remain in B01/B09.
4. **Independent Slack pair authentication — FAIL.** The real pinned Socket
   hello path cannot produce the claimed App-ID proof (B01).
5. **Pre-event grant boundary/provenance — FAIL.** Forbidden future fields are
   rejected and no mint function was found, but required committed/pushed Git
   and snapshot/latch provenance is not established before connection (B04).
6. **Receipt + exact transition before ACK — FAIL.** Duplicate/crash paths ACK
   incomplete state and outer identity/authorization validation is incomplete
   (B01, B02, B08).
7. **Exact once-only post-ACK materialization — FAIL.** Only a boolean is checked;
   required hashes/control state/idempotent recovery are absent (B02).
8. **Root/continuation classification — FAIL.** A continuation artifact is
   persisted as `NEW_MISSION` (B03).
9. **Profile-separated durable state/capacity — FAIL.** Directories are separated,
   but schemas, atomic consumption, capacity latches, and replay integrity are
   incomplete (B02, B05, B08).
10. **Pointer grant/lease/capability/tmux exactness — FAIL.** Caller-selected
    capability/path/buffer/time and incomplete correlation/replay violate the
    exact transport boundary (B04).
11. **Committed Git evidence chain — FAIL.** Authority ancestry/content binding
    and durable quarantine are not implemented (B06).
12. **Durable same-thread no-blind-resend outbox — FAIL.** Caller target and
    phase overwrite permit blind resend (B07).
13. **Recovery, kill/latch, lock, shutdown — FAIL.** Required durable recovery,
    legal transitions, process lock ownership, bounded drain, and irreversible
    latches are absent or unwired (B02, B04-B07).
14. **Bounds/timers/retries — FAIL.** The Socket SDK retries internally and many
    approved limits have no enforcement call site (B01, B08).
15. **Default disabled / no live reachability — PASS.** The committed descriptor
    is disabled with no receive-grant ref; Phase A composition opens neither
    Slack nor tmux. No live or secret action was performed in this review.
16. **Focused synthetic proof — FAIL.** The declared totals pass, but fakes bypass
    the real SDK shape and required crash/restart assertions do not prove the
    reviewed state machines (B01-B08).
17. **Operations/as-built accuracy — FAIL.** Setup is stale and redacted-check
    overclaims verification (B09).
18. **Worker result accuracy/completeness — FAIL.** Mechanical evidence is
    accurate; the security/completion claims omit or contradict B01-B09.

## Independent reproduction

- Actual frozen source diff inspected first:
  `81a8c3474380a7e427516d6f5e57c97ad88c6c9b..aac3e515ca05b89545688f84a4c17e4be12fa29d`
  is 31 files, 6,416 insertions, 3 deletions.
- 11 named AS1 focused test files: PASS, 11 files / 126 tests.
- `organization-registry`, `advisor-inbox`, `exact-advisor-delivery`, and
  `readiness` regressions: PASS, 4 files / 103 tests.
- `npm run typecheck`: PASS.
- changed-file eslint over all 26 changed TypeScript files: PASS, zero problem.
- `npm run build:core`: PASS. The first sandboxed attempt failed only because
  the frozen worktree was mounted read-only for emitted `dist` files; the exact
  command passed when authorized to write its normal build output.
- `npm audit --audit-level=high`: PASS, zero vulnerabilities on 2026-07-14. The
  first sandboxed attempt could not resolve the registry; the authorized exact
  rerun reached the advisory endpoint and passed.
- `git diff --check 81a8c347..aac3e515`: PASS.
- Added-line suppression, Slack deep-import, and process-escape scans: zero
  matches. Token/private-key scan found only grammar regexes, explicitly labeled
  placeholders, and the intentional `xoxb-leaked-token` rejection canary; no
  real secret was found or accessed.
- Dynamic-target scan: FAIL as a security gate; it found caller-supplied
  `bufferName`, `pointerFilePath`, and arbitrary profile-slug APIs (B04/B05).
- Pinned installed roots: `@slack/socket-mode@3.0.0` and
  `@slack/web-api@8.0.0`. Public package-root imports only: PASS. Direct pinned
  SDK source compatibility: FAIL (B01).
- Base -> source candidate -> Worker result -> Worker pointer ancestry: PASS.
  Target worktree is clean and
  `HEAD == upstream == 16e3720318239e1466f16a526e23819ba1bd0702`.
  Only Worker result and pointer files follow the source candidate.
- Exact Delivery v2/advisor-inbox/protected regression paths: byte-unchanged in
  the source candidate; focused regressions pass.

No Living Office, visual, browser, broad E2E, unrelated suite, owner setup,
secret/environment read, real DNS/Slack/WebSocket call, real tmux mutation,
database, public ingress, production system, merge, or main-branch action was
performed.

## Review coordinates, authority, and provenance

- Mission: `AGENT_OFFICE_AS1_MULTI_TEAM_SLACK_PILOT_001`
- Pass: `LEVEL_3_PHASE_A_IMPLEMENTATION_SECURITY_REVIEW`
- Actor/session: Agent Office Independent SOL Sentinel Reviewer /
  `agent-office-reviewer`
- Live read-only runtime proof: tmux session `agent-office-reviewer`, pane `%28`,
  pane PID `2381134`, workspace `/home/leo/Project/agent-office`, current pane
  command `codex`; direct child process command:
  `codex -m gpt-5.6-sol -c model_reasoning_effort=max`.
- Reviewed base: `81a8c3474380a7e427516d6f5e57c97ad88c6c9b`
- Source candidate: `aac3e515ca05b89545688f84a4c17e4be12fa29d`
- Worker result commit: `5e52078b5ecfee867b6ae0809058a5f5012b3544`
- Worker pointer commit: `16e3720318239e1466f16a526e23819ba1bd0702`
- Governance branch/head before this result:
  `advisor/as1-multi-team-slack-pilot-001` /
  `ca8c8a953ac6fe83dfb0a78a7ed7b7bb4881aa84`, clean and upstream-equal.
- Review brief SHA-256:
  `2a97d2d60398379a5cc881169f6cfa704d0c2d166a92dabcbbb9e21e5cc321cd`
- Review handoff SHA-256:
  `e283ec9ad796a028358e7befce3773c0e66c93cd4ee0b854451b31b789a520cf`
- Required `fable-sentinel` skill SHA-256:
  `429aa2397e917e89e7b8770c3a22bf26a60d1337401760db3010fbcaa3b489d7`
- Skill references read directly:
  - `contract-review.md`:
    `344ac717c4279ce0f98914babac5e26c32700827bb545e8dd24182bb3e0d16f1`
  - `provenance-review.md`:
    `d655a42de1fe2e1a2284766abefb33182a5d9234d21da6f75c2110a1c98023fe`
  - `review-classification.md`:
    `23f8a56c59f2a32f076998bad81ab59c85279b38f1f7b9275c5bcd9e9ab0759e`
- The skill-linked V2 role protocol was read directly and identifies itself as
  superseded historical evidence; the current Agent Office operating model,
  Reviewer role, exact handoff, reviewed design/security model, and review brief
  controlled.

## Routing and stop

RETURN_TO: `agent-office-advisor`

VERDICT: `NEEDS_PATCH`

Per the review contract, the responsible Advisor may decide whether to issue an
exact same-mission patch handoff to the same Worker and later return an exact
frozen delta to this same Reviewer. This Reviewer does not dispatch that work,
change scope, patch the candidate, accept risk, grant final approval, or select
the next mission.

STOP
