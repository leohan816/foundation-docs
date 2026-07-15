# Independent Sentinel Phase A Implementation/Security Delta Re-review Result

## Verdict

`NEEDS_PATCH`

The frozen patched candidate must not advance to owner setup, live Slack, real
tmux delivery, risk acceptance, or pilot execution. The prescribed synthetic
tests, typecheck, changed-file lint, build, audit, dependency checks, and
protected regressions all pass, and the committed Phase A composition remains
default-disconnected. Direct inspection of the actual
`aac3e515ca05b89545688f84a4c17e4be12fa29d..0e4274f427904302d67a0de1e78cde60512b94b3`
patch nevertheless found mandatory B01, B02, B04, B05, B08, and B09 closure
gates still open.

This is `NEEDS_PATCH`, not `PASS_WITH_RISK`, because the failures are exact
frozen safety contracts: immutable transport construction, durable
persist-before-ACK rejection state, authority provenance, control-before-side-
effect, strict durable recovery parsing, and truthful completion evidence. The
reviewed B01 transport delta explicitly says its hard construction gates cannot
be waived as residual risk. This is `NEEDS_PATCH`, not `FAIL`, because the
confirmed defects remain repairable inside the already authorized AS1
source/test/document surface without changing the closed product boundary.

## Blocking findings

### B01 — the production options literal does not implement the reviewed exact type contract

Severity: high. Closure gate: B01.

The independently passed B01 design delta requires the complete `ws` options
literal to use `as const satisfies As1WsClientOptions` and be passed directly to
the public constructor. It also makes that exact literal part of the mandatory
TypeScript 6.0.3 package-root compile probe
(`4826cd1:docs/integration/AGENT_OFFICE_AS1_SOCKET_IDENTITY_DESIGN_DELTA.md:327-379`).

The production helper instead returns a contextually widened object using only
`satisfies As1WsClientOptions`
(`0e4274f:src/adapters/gateways/slack-pilot/socket-client.ts:22-44`). The
separate test probe does use `as const satisfies`, but it is a second test-only
literal (`tests/adapters/as1-slack-socket-client.test.ts:14-29`), not the literal
the production factory receives. Thus the green compile probe proves a desired
shape that the implementation does not use. The frozen design calls this a hard
gate and forbids omission or weakening; B01 is not closed.

Required patch evidence: make the production constructor literal itself use the
reviewed `as const satisfies` intersection, retain its direct package-root
constructor and public `terminate()` proof, and make the compile/static test
assert that exact production seam rather than an independent duplicate literal.

### B02 — ordinary ACKed rejections bypass the durable transport state machine

Severity: critical. Closure gate: B02.

The frozen inbound contract requires every usable-envelope decision, including
a syntactically valid but ineligible event, to persist the immutable receipt,
dedupe identity, and terminal pre-ACK rejection before Socket ACK, then advance
through `TRANSPORT_ACK_RECORDED` to `TERMINAL_NO_INTAKE`
(`81a8c34:docs/integration/AGENT_OFFICE_AS1_MULTI_TEAM_SLACK_DESIGN.md:335-421`).

`handleRejection()` instead writes only a denial-audit row and then ACKs
(`0e4274f:src/application/slack-pilot/service.ts:276-286`). It never calls
`persistReceipt`, `insertDedupe`, `openTransport`, `commitPreAckDecision`,
`commitTransportAck`, or `commitTerminalNoIntake`. These are common paths for
deferred queries, bot echoes, mutations, unsupported surfaces, malformed Slack
times, and uncorrelated threads. The focused rejection table asserts only the
classification/ACK/latch result (`tests/integration/as1-slack-inbound.test.ts:95-135`),
so all those tests pass while omitting the required crash/retry/restart state.

A crash after the Socket ACK therefore leaves no exact hash-bound transport
decision to reproduce, and a later retry is treated as a fresh denial rather
than replay of an immutable terminal decision. This is the same mandatory
persist-before-ACK/recovery boundary B02 was required to close.

Required patch evidence: route every ACKable rejection with a usable envelope
and event identity through the same exact receipt/dedupe/transport state machine,
and add pre/post-ACK crash, identical-retry, divergent-retry, and restart tests
that reach `TERMINAL_NO_INTAKE` exactly once. Identity contradictions that must
latch and remain unACKed retain their separate fail-closed policy.

### B04 — receive/delivery authority provenance remains an injected assertion, not a production proof

Severity: critical. Closure gate: B04.

The patched startup authority gate still checks only parsed profile/wire
equality and caller-supplied `now` against `expiresAt`
(`0e4274f:src/adapters/gateways/slack-pilot/exact-authority.ts:32-51,64-85`).
There is no production loader/verifier proving that a receive grant is the exact
committed, pushed, clean, upstream-ancestral, first-add Git blob with the required
authority/root/source-commit and governance/registry/control/latch/state-root
snapshots before connection. Repository-wide inspection finds no receive-grant
Git provenance implementation; the real `NodeAs1GitProvenanceVerifier` is wired
only to Advisor evidence ingress.

Likewise, exact tmux delivery accepts an `As1DeliveryProvenanceGate` interface
whose sole method is `assertAccepted()`
(`src/adapters/gateways/slack-pilot/exact-transport.ts:93-100,151-186`), but the
candidate contains no production implementation. The focused transport test
uses an unconditional `ACCEPTING_GATE`
(`tests/integration/as1-slack-exact-transport.test.ts:39`). This cannot establish
the mandatory pointer-delivery-grant Git/content provenance or prevent a
permissive caller from satisfying the seam. `StartupIdentityInput.now`,
`controlSnapshot`, and `connectReady` also remain public caller inputs while no
live composition binds them to a canonical authority loader.

The Worker result's claim that B04 supplies “Receive-grant provenance”
(`WORKER_RESULT.md:73`) is therefore false. Parsing a grant and checking hashes
echoed inside it is not proof of the artifact's Git provenance.

Required patch evidence: implement and bind real read-only provenance loaders
for both receive and pointer-delivery authority artifacts; prove exact blob,
path, repository, source commit, first-addition, clean/upstream state, and all
frozen snapshots before connection/delivery; bind trusted clock/control at
construction; and eliminate the unconditional acceptance seam from any
production-representable path.

### B05 — tmux dequeue/mutations and Socket failure latches are outside the owning control

Severity: critical. Closure gate: B05.

`As1ExactTransport` is constructed with clock, tmux port, journal, provenance,
and a latch callback, but no operational-control predicate
(`0e4274f:src/adapters/gateways/slack-pilot/exact-transport.ts:146-159`). Its
delivery path then performs `preflight`, authority consumption, buffer lookup and
deletion, buffer load, paste, and Enter without checking the owning profile's
current control/kill/latch state (`:176-283`). The latch callback is used only
when a durable store throws `STORE_QUARANTINED`; it is not a side-effect gate.
This directly misses the mandatory “every dequeue and side effect rechecks the
owning profile control” closure gate.

The raw Socket queue similarly removes a task in `pump()` without a control port
(`src/adapters/gateways/slack-pilot/socket-client.ts:378-390`). Queue overflow,
provider disconnect, unexpected data, handler failure, and forced termination
change only the transport's in-memory `LATCHED` phase and close the socket
(`:336-365,394-456`); the transport has no durable profile-latch dependency.
Thus capacity and transport failures can be forgotten on restart. The service
and outbox have useful control gates, but they do not govern these omitted
dequeue/tmux/transport seams.

Required patch evidence: bind the exact profile's lock-owning canonical control
to transport construction; recheck it before every queue dequeue, journal
mutation, and tmux/Slack side effect; durably persist transport/capacity/handler
failure latches; and prove kill/latch transitions between every adjacent
preflight, buffer, paste, and Enter boundary.

### B08 — durable reads are count-bounded but not byte-bounded or phase-invariant

Severity: high. Closure gate: B08.

`readJsonArray()` opens a durable index and calls `handle.readFile()` before any
byte bound, then parses the complete JSON and only afterward checks the array's
record count
(`0e4274f:src/application/slack-pilot/inbound-store.ts:1623-1659`). A tampered
file containing arbitrarily large whitespace or one overlarge encoded record is
therefore loaded in full. The global-control reader has the same unbounded
`readFile()` pattern (`src/operations/readiness/as1-slack-control.ts:552-570`).
No durable-index byte limit exists in `LIMITS`, despite the exact B08 size/read
gate.

Several strict parsers also validate keys and individual types without enforcing
state-to-field correlations. For example:

- `parseDedupeRecord()` accepts any opaque `preAckClass` rather than a closed
  durable phase (`inbound-store.ts:437-460`);
- `parseReceiveGrantState()` does not correlate `phase` with
  `rootSlotConsumed` and its nullable binding fields (`:464-490`);
- `parsePendingQuestion()` does not require `OPEN` to have null consumption
  fields or `CONSUMED` to have both fields populated (`:492-511`); and
- `parseTransportRecord()` does not correlate the transport state with
  pre-ACK decision, terminal reason, ACK flag/timestamp, continuation,
  intake/pointer, and materialization fields (`:554-580`).

A syntactically valid but semantically impossible durable record can therefore
be trusted after restart. `recordRootCorrelation()` adds another silent-integrity
path: any existing matching `rootTs` returns without exact equality of the
remaining immutable correlation (`:1112-1126`). The B08 tests cover unknown
enums, extra keys, malformed hashes, and over-count arrays, but not these
relational or byte-size attacks
(`tests/security/as1-slack-durable-boundaries.test.ts:258-393`).

Required patch evidence: enforce a fixed byte bound before every durable-file
read, validate every state/phase-to-field invariant and exact idempotent duplicate
on recovery, and add malicious valid-type/impossible-state plus oversized-byte
tests that durably latch the owning profile.

### B09 — corrected evidence remains mechanically accurate but materially overclaims closure

Severity: high. Closure gate: B09.

The corrected Worker result and pointer accurately record their commits, hashes,
dependency delta, source diff, test totals, default-disconnected state, and
superseded evidence history. Their central claims remain inaccurate:

- the title, closure matrix, and pointer say B01-B09 are closed
  (`WORKER_RESULT.md:1,60-78`; `WORKER_RESULT_POINTER.txt:4,21`), contrary to the
  source findings above;
- B04 claims implemented receive-grant provenance even though no production
  verifier/loader exists (`WORKER_RESULT.md:73`);
- B05 claims a mandatory phase-aware operational gate while tmux and Socket
  dequeue paths have none (`:74`);
- B08 claims strict phase parsing and a mandatory latch at every consumer while
  the relational, byte-size, and transport-latch gaps remain (`:77`); and
- both the Worker result and as-built name a `NodeAs1SocketClient` production
  class that does not exist; the candidate exports `As1RawSocketTransport` and
  `NodeAs1WebSocketFactory` instead (`WORKER_RESULT.md:131-133`;
  `AGENT_OFFICE_AS1_SLACK_PHASE_A_AS_BUILT.md:66-69`).

The as-built's statement that every fixed count/size/time/retention bound is
owned and persists a stable latch is also contradicted by B05/B08
(`AGENT_OFFICE_AS1_SLACK_PHASE_A_AS_BUILT.md:51-56`). FEATURE_INDEX says the
two-stage authority and exact tmux transport are implemented and covered, which
overstates the missing provenance/control seams (`docs/FEATURE_INDEX.md:633-647`).

Required patch evidence: after the source/tests are repaired, regenerate the
as-built, FEATURE_INDEX, Worker result, and pointer from the actual final source;
name real exported classes and distinguish implemented real adapters from
unimplemented live composition/authority/tmux ports.

## B01-B09 closure disposition

| Finding | Delta disposition | Basis |
|---|---|---|
| B01 | `NOT_CLOSED` | Production `ws` options omit the mandatory `as const satisfies` literal; test probe is detached. |
| B02 | `NOT_CLOSED` | Common ACKed rejections bypass receipt/dedupe/transport/recovery. |
| B03 | `CLOSED` | Top-level persists `NEW_MISSION`; correlated replies persist only fixed `CLARIFICATION`/`DECISION_RESPONSE`, with durable artifact tests. |
| B04 | `NOT_CLOSED` | No real receive-grant or pointer-delivery-grant provenance loader/gate; caller-supplied trust seams remain. |
| B05 | `NOT_CLOSED` | Tmux and Socket dequeue/failure paths are not bound to owning operational control/durable latch. |
| B06 | `CLOSED` for the prior finding | Evidence schemas, correlations, duplicate equality, real bounded read-only Git/content verifier, and quarantine latch paths are present and focused tests pass. This does not substitute for B04 authority-artifact provenance. |
| B07 | `CLOSED` for the prior finding | Accepted-evidence branding, derived fixed root/target/token, durable no-resend phases, real SDK fail-closed classification, and control/latch seams are present and focused tests pass. |
| B08 | `NOT_CLOSED` | Durable byte bounds and phase/state relational invariants are absent; transport capacity/failure latches are incomplete. |
| B09 | `NOT_CLOSED` | Corrected evidence is mechanically consistent but its B01-B09 closure and as-built claims are false. |

## Independent reproduction

- Actual correction diff inspected before Worker summaries:
  `aac3e515..0e4274f` is 38 files, 8,292 insertions, 894 deletions. Integrated
  `81a8c34..0e4274f` is 42 files, 13,844 insertions, 33 deletions.
- Exact dependency delta: PASS. Runtime `ws@8.21.1`, dev `@types/ws@8.18.1`,
  retained `@slack/web-api@8.0.0`, TypeScript `6.0.3`, and no installed/direct
  `@slack/socket-mode`.
- Sixteen named AS1 focused files: PASS, 16 files / 269 tests.
- Four named protected regressions: PASS, 4 files / 103 tests.
- One combined confirmation run: PASS, 20 files / 372 tests.
- `npm run typecheck`: PASS.
- ESLint over exactly the 33 TypeScript paths changed in `81a8c34..0e4274f`:
  PASS, zero output/problems.
- `npm run build:core`: PASS.
- `npm audit --audit-level=high`: PASS, zero vulnerabilities on 2026-07-15.
- `git diff --check 81a8c34..0e4274f`: PASS.
- Exact package-root compile/provenance coverage represented by the named B01
  adapter tests: mechanically PASS, but does not prove the production literal
  described in B01.
- Suppression/unsafe-cast/deep-import scans over production AS1 source: no
  matches. Production `@slack/socket-mode` scan found comments only. Added
  token-shaped scans found only labeled placeholder/canary test values; no real
  secret was accessed or found.
- Dynamic authority/control scan: FAIL as a security gate, with the injected
  provenance, caller-time, ungated tmux, in-memory Socket latch, and durable
  parser seams identified above.
- Two initial reviewer-side `rg` scan invocations exited 2 because of shell
  quote syntax in the regex. Corrected equivalent scans were run immediately;
  this was a command-construction error only and made no candidate change.
- Protected Exact Delivery v2, Advisor Inbox, organization-registry, and named
  regression paths are byte-unchanged in `81a8c34..0e4274f`.
- Corrected Worker result SHA256 matches
  `5974e18c83b4d17044ee003714d2236e74694fb12f223347d14699fa8c83ca8c`;
  pointer SHA256 is
  `afe48940943cb9c7f2aa86fb5b4dce0762757277a35862a6c20aa55358813811`.
- Base, rejected source, patched source, corrected result, and corrected pointer
  ancestry: PASS. Candidate finished clean and
  `HEAD == upstream == 6a2ca191cf3b03a53a4c612ddf7d425e87fbc543`.

No gate was skipped. No Living Office, visual, browser, broad E2E, unrelated
suite, owner setup, secret/environment read, real DNS/Slack/WebSocket call, real
tmux mutation, database, public ingress, production system, merge, main-branch
action, next-actor dispatch, or candidate patch was performed.

## Review coordinates, authority, and provenance

- Mission: `AGENT_OFFICE_AS1_MULTI_TEAM_SLACK_PILOT_001`
- Review class: `LEVEL_3_AS1_B01_B09_IMPLEMENTATION_SECURITY_DELTA_REREVIEW`
- Actor/session: Agent Office Independent SOL Sentinel Reviewer /
  `agent-office-reviewer`
- Live read-only runtime proof: tmux session `agent-office-reviewer`, pane `%28`,
  pane PID `2381134`, workspace `/home/leo/Project/agent-office`, current pane
  command `codex`; direct child process command
  `codex -m gpt-5.6-sol -c model_reasoning_effort=max`.
- Review handoff commit:
  `726e78953db3ca437a17aa7289a85906423d8d9a`
- Review handoff SHA256:
  `4ff1780a69c386c3aad7443e9f27aea6a530f76257f208a1ee45ae0ec16e2090`
- Reviewed base: `81a8c3474380a7e427516d6f5e57c97ad88c6c9b`
- Initial rejected source: `aac3e515ca05b89545688f84a4c17e4be12fa29d`
- Patched source candidate: `0e4274f427904302d67a0de1e78cde60512b94b3`
- Corrected Worker result: `6bc5325d42d54e384aea64021a9806439e06c5d0`
- Corrected Worker pointer/tip:
  `6a2ca191cf3b03a53a4c612ddf7d425e87fbc543`
- Initial independent review commit:
  `3100a717418d8a4dc17d0114aaa3daa8b14ac083`, result SHA256
  `c06bbad3ce948829b6e192b30f07f2144e57efec9fa441e21b87580e4dcccf6b`
- Reviewed B01 design patch:
  `4826cd11a23dbbe1a6dbd2d4983b919a6a94e7a7`, design SHA256
  `20e47f4cc85d88a7d82dba254e19c804f19d4018b17e71ae979b253c80f3d108`
- Independent B01 design-delta PASS:
  `4e62e865061d76768ce918ffc891bdc6ad4681c5`, result SHA256
  `c6e0735dbcd1036aa64072e985b889b293c96f5760361855c7ccbc59e5aea703`
- Required `fable-sentinel` skill SHA256:
  `429aa2397e917e89e7b8770c3a22bf26a60d1337401760db3010fbcaa3b489d7`
- Skill references read directly:
  - `contract-review.md`:
    `344ac717c4279ce0f98914babac5e26c32700827bb545e8dd24182bb3e0d16f1`
  - `provenance-review.md`:
    `d655a42de1fe2e1a2284766abefb33182a5d9234d21da6f75c2110a1c98023fe`
  - `review-classification.md`:
    `23f8a56c59f2a32f076998bad81ab59c85279b38f1f7b9275c5bcd9e9ab0759e`
  - `delta-review.md`:
    `31965b7bd4619486a58f566d533aef500ff00cf3d8e404f27941b5af5e6bb26f`
- The skill-linked V2 role protocol was read directly and identifies itself as
  superseded historical evidence. Current Agent Office operating/Reviewer role
  documents, the exact handoff, frozen design/security model, and passed B01
  design delta controlled.
- Governance branch/head before this result:
  `advisor/as1-multi-team-slack-pilot-001` /
  `726e78953db3ca437a17aa7289a85906423d8d9a`, clean and upstream-equal.

## Routing and stop

RETURN_TO: `agent-office-advisor`

VERDICT: `NEEDS_PATCH`

Per the exact handoff, the responsible Advisor may decide whether to return this
same mission to the same Worker and later provide this same Reviewer another
exact frozen delta. This Reviewer does not dispatch that work, patch the
candidate, accept risk, grant final approval, authorize owner/live setup, or
select the next mission.

STOP
