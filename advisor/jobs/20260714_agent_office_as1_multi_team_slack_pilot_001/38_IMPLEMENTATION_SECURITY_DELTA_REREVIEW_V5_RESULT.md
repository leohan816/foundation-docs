# Independent Sentinel Phase A Implementation/Security Delta Re-review V5 Result

## Verdict

`NEEDS_PATCH`

The frozen V5 candidate must not advance to owner setup, live Slack, real tmux
delivery, risk acceptance, pilot execution, or final closure. B08 is closed by
the inspected V5 correction and direct reproduction. B05 is only partially
closed: the named malformed-JSON, invalid-envelope, raw error/close, and
dequeue-control cases are repaired, but receive-ready binary and oversize frames
still use an already-settled startup rejection closure and therefore remain
admitted with no durable latch. The V5 raw error/close change also introduced a
stale-generation action because it checks only the transport-wide phase, not
that the callback's Socket and generation are current. B09's central closure
claims consequently remain false.

This is `NEEDS_PATCH`, not `PASS_WITH_RISK`, because both B05 defects are narrow,
reproducible violations of the exact fail-closed and no-stale-socket criteria and
are patchable inside the already authorized Socket source/test/evidence surface.
It is not `FAIL` because no authority, scope, secret, live-system, or structural
boundary failure was found.

## Blocking finding

### B05 — receive-ready raw-frame validation remains fail-open and V5 callbacks can act from a stale generation

Severity: critical. Delta disposition: `NOT_CLOSED` with a V5 `REGRESSION`.

The V5 source correctly latches malformed JSON and a well-formed invalid Events
API envelope after ready, post-ready raw `error` and `close`, and a false or
rejecting dequeue-control predicate. Two load-bearing edges remain.

First, the message listener still routes binary/non-Buffer and oversize input
through the startup-only `rejectOnce` closure:

- `938775a:src/adapters/gateways/slack-pilot/socket-client.ts:245-250` makes
  `rejectOnce` return immediately after `done.settled`;
- `:304-307` sets `done.settled = true` when receive-ready is admitted; and
- `:275-284` calls that now-inert closure for a binary/non-Buffer frame or a
  frame larger than `WS_MAX_PAYLOAD_BYTES` before the receive-ready branch.

A read-only Node probe against the freshly built frozen source drove fake
Sockets through the exact hello and then emitted a binary frame and a
32,769-byte text frame. Both remained admitted:

```json
{"binary":{"phase":"EVENT_RECEIVE_READY","durableLatches":[],"closeCalls":[]},"oversize":{"phase":"EVENT_RECEIVE_READY","durableLatches":[],"closeCalls":[]}}
```

This contradicts the exact V5 requirement that every malformed or unexpected
post-hello transport state stop admission, close/terminate, durably latch the
owning profile, and remain latched. The new Socket regressions cover five named
cases at
`938775a:tests/adapters/as1-slack-socket-client.test.ts:504-568`, but they do not
exercise receive-ready binary/non-Buffer or oversize frames.

Second, the newly added raw `error`/`close` callbacks use the callback-local
`socket` under only `this.phase === 'EVENT_RECEIVE_READY'`
(`938775a:src/adapters/gateways/slack-pilot/socket-client.ts:256-270`). They do
not require `this.socket === socket` and `this.generation === generation`. A
second fake Socket was connected on the same transport; after it reached ready,
an `error` emitted by the first generation latched the transport while closing
only the old Socket:

```json
{"phase":"LATCHED","durableLatches":["raw socket error after ready"],"oldCloseCalls":[[1011,"AS1_LATCH"]],"currentCloseCalls":[]}
```

That is a V5-introduced stale-socket action: an old generation can durably latch
the current generation even though the current Socket itself did not fail. It
also contradicts the Worker evidence's assertion that the callbacks are
same-generation and have no stale closure.

Required patch evidence: phase-aware receive-ready binary/non-Buffer and
oversize handling must follow the same durable fail-closed path, and every
post-ready raw callback must prove it belongs to the current Socket generation
before it can mutate/latch transport-wide state. Direct regressions must cover
both the current-generation fail-closed cases and stale-generation events. No
reconnect, retry, reset, fallback, or permissive default is authorized.

## B08 closure

Delta disposition: `CLOSED`.

Direct source and tests establish the requested durable matrix and corruption
normalization:

- `938775a:src/application/slack-pilot/inbound-store.ts:561-600` accepts a
  dedupe record only as `PREACK_PENDING` with
  `receiveGrantStateHash`/`intakeId`/`terminalReason` all null. The input
  contract is narrowed to that same sole canonical writer state. The two
  incidental authority-lifecycle fixture changes are exactly two replacements
  to `PREACK_PENDING`; their original identical-byte duplicate and
  divergent-byte quarantine assertions remain intact.
- `:490-558` requires `eventId === observed.sourceEventId`, correlates ROOT and
  CONTINUATION candidate kinds with the committed decision, requires a binding
  hash for bound/consumed decisions, forbids one while pending, and preserves
  ACK, continuation, terminal, and materialization correlations.
- `:1840-1875` normalizes fatal UTF-8 and JSON parse failures for every
  profile-index read to `STORE_QUARANTINED`, while retaining the pinned-fd byte
  bound and count bound. `As1InboundService`'s existing quarantine catch then
  persists the owning profile latch through the real control port.
- `938775a:src/operations/readiness/as1-slack-control.ts:557-585` applies the
  equivalent normalization and pre-read byte bound to global control. The
  corrupt file is not healed; each restart fails closed as
  `STORE_QUARANTINED`.

The mandatory recovery/lifecycle/security tests independently passed malformed
JSON, invalid UTF-8, oversize profile-index and global-control cases, exact
dedupe states, transport identity/candidate/hash edges, durable profile latching,
and restart persistence. No second schema or dedupe update path was introduced.

## B09 evidence disposition

Delta disposition: `NOT_CLOSED`.

The safe-state disclosures are accurate: the candidate remains
default-disconnected and synthetic-only; no live receive/delivery composition,
production tmux mutation port, owner setup, usable authority, secret read, live
Slack, independent acceptance, risk acceptance, or final closure is claimed.
The disclosed temporary pre-B08A parser materialization is also internally
consistent: the blob at `94f3cbc` has the reported SHA256
`d162b72871a9bfa3a47bb1a64e281654fdd317e5597ea78c82b70a46b282ff1f`;
the final source differs only because B08B subsequently changed the same file.
The stash list is empty, the visible post-incident HEAD reflog is forward
commit-only, the final source bytes are present, and the candidate is clean and
upstream-equal.

The closure claims are nevertheless false:

- `4013ca8:artifacts/as1-multi-team-slack-pilot/WORKER_RESULT.md:79` says every
  malformed/unexpected post-hello state durably latches and the same generation
  is terminated; `:143-145` says there is no stale closure.
- `4013ca8:docs/operations/AGENT_OFFICE_AS1_SLACK_PHASE_A_AS_BUILT.md:29`
  claims every fail-closed Socket transition and same-generation termination.
- `4013ca8:docs/FEATURE_INDEX.md:665-674` claims durable latching on every
  malformed/unexpected receive-ready frame.
- `abfdbeb:artifacts/as1-multi-team-slack-pilot/WORKER_RESULT_POINTER.txt:4,30-32`
  says B05 is repaired, B09 is truthful, and the stale-closure scan is clean.

Those statements contradict the reproduced B05 behavior. Two smaller evidence
count discrepancies reinforce the need to regenerate B09 after source closure:
the changed set from `4cf967d..abfdbeb` is twelve files, including the as-built
and FEATURE_INDEX, not the reported set of only three production, five test,
result, and pointer files; and `xapp-x` occurs ten times in the frozen Socket
test, not nine. These do not independently drive the verdict, but they are not
exact evidence.

## Delta closure table

| Finding | V5 disposition | Direct basis |
|---|---|---|
| B01 | `CLOSED_FROZEN` | Closed by V4; not reopened by this exact V5 delta. |
| B02 | `CLOSED_FROZEN` | Closed by V4; the high-risk inbound/exact-transport regressions pass and no concrete V5 regression was found. |
| B03 | `CLOSED_FROZEN` | Closed before V5; no changed load-bearing surface or concrete regression. |
| B04 | `CLOSED_FROZEN` | Closed by V4; V5 did not change authority provenance/startup identity. |
| B05 | `NOT_CLOSED / REGRESSION` | Receive-ready binary/oversize frames are ignored after startup settles; stale-generation raw error/close can mutate current transport state. |
| B06 | `CLOSED_FROZEN` | Closed before V5; no changed load-bearing surface or concrete regression. |
| B07 | `CLOSED_FROZEN` | Closed before V5; no changed load-bearing surface or concrete regression. |
| B08 | `CLOSED` | Exact dedupe/transport matrix and profile/global corruption normalization pass direct source and mandatory tests. |
| B09 | `NOT_CLOSED` | Central B05 repair/no-stale-closure claims contradict frozen source and reproduced behavior. |

## Independent reproduction

Actual source and tests were inspected before the prior Reviewer result, Worker
result, Advisor validation, as-built, FEATURE_INDEX, or pointer. The exact
`cc823562..938775a` source delta is eight authorized files, 327 insertions and
8 deletions: three production and five test files. Its commits are `1cfb446`
(B05), `94f3cbc` (B08A), and `938775a` (B08B).

- Exact mandatory V5 test command over the seven handoff-named files: PASS,
  **7 files / 179 tests**.
- `npm run typecheck`: PASS.
- ESLint over exactly the eight changed TypeScript paths: PASS, zero output.
- `npm run build:core`: PASS.
- `npm audit --audit-level=high`: PASS, zero vulnerabilities on 2026-07-15.
- `git diff --check cc823562..938775a`: PASS.
- Suppression scan: no `@ts-ignore`, `@ts-expect-error`, `@ts-nocheck`, or
  `eslint-disable` in the eight changed files.
- Unsafe-cast/deep-import scan: no `as any`, chained `as unknown as`,
  `node_modules` import, or package deep import in the eight changed files.
- Secret/dynamic-command scan: no real token/secret literal, environment read,
  `child_process`, exec/spawn/eval, dynamic Function, or shell target. The only
  token-pattern match is the synthetic `xapp-x` test placeholder.
- Reconnect/retry/fallback scan: only comments asserting absence; no new
  reconnect, blind retry, reset, cross-profile fallback, or dynamic target.
  The stale-generation defect above was found by direct callback inspection and
  reproduced rather than cleared by the textual scan.
- Candidate ancestry passes:
  `81a8c347 -> cc823562 -> 938775a -> 4013ca8 -> abfdbeb`.
  No source/test/package change exists after `938775a`; the result/tip changes
  are the four B09 evidence files only.
- Candidate final state: branch
  `feature/as1-multi-team-slack-pilot-001`,
  `HEAD == upstream == abfdbebfcde0e23fd068d10263f8a52acb700752`, clean.
- Worker result SHA256 matches
  `d815a90fde815bcd1de90ad519863279f3cc46206f4d001150c2458cac63e29e`;
  Worker pointer SHA256 matches
  `ed4867814351a78d6f44b98b496a296abcaa43074e853fa0fe1f7692a9ee7487`.

The direct Socket probe used only fake in-memory collaborators against the
freshly built frozen source. It made no DNS, HTTP, WebSocket, Slack, secret,
real tmux, or candidate-repository mutation.

No mandatory gate was skipped. No Living Office, visual/browser, broad E2E,
broad repository suite, owner setup, secret-bearing environment read, live
network/Slack, real tmux mutation, database, public ingress, production system,
merge, main-branch action, next-actor dispatch, or candidate patch was
performed.

## Review coordinates, authority, skill, and independence

- Mission: `AGENT_OFFICE_AS1_MULTI_TEAM_SLACK_PILOT_001`
- Review pass: `IMPLEMENTATION_SECURITY_DELTA_REREVIEW_V5`
- Actor/session: Agent Office Independent SOL Sentinel Reviewer /
  `agent-office-reviewer`
- Live runtime: tmux session `$28`, window `@28`, pane `%28`, pane PID
  `2381134`, workspace `/home/leo/Project/agent-office`, pane command `codex`;
  direct child command
  `codex -m gpt-5.6-sol -c model_reasoning_effort=max`.
- Independence: Reviewer `$28` is distinct from responsible Advisor `$26` and
  Worker `$16`. No agent, sub-agent, delegated context, temporary session,
  substitute Reviewer, or parallel context was created or used.
- V5 review handoff commit:
  `f56cb415ad8f080c6b06c61726601c79ce7a26d2`; committed handoff SHA256
  `ebf2d82a3665c8db87d65c9f3b9705f4ed2a86fb5e29c640a2a86cc07e1a585a`.
- Companion run prompt SHA256:
  `23d30bf52b59d12005965303b8f2b768f57829bd27d71989cf0f82ce0467acbb`.
- Frozen base/start/source/result/pointer:
  `81a8c3474380a7e427516d6f5e57c97ad88c6c9b` /
  `cc823562a52f495ea1b3d54314865b2305ea0932` /
  `938775a6850d516edfa6122c88b72ca0d1bf4caf` /
  `4013ca8bf01065f604b329445c4836344a5b035e` /
  `abfdbebfcde0e23fd068d10263f8a52acb700752`.
- Prior V4 result commit:
  `caf808f6af750794417186f2418f538c0dc1bad4`; SHA256
  `93c4eda55a5b701fffdfbd4388fa6a070541b71252dfb2adc66610f618d5295c`;
  verdict `NEEDS_PATCH`.
- Required `fable-sentinel` skill SHA256:
  `429aa2397e917e89e7b8770c3a22bf26a60d1337401760db3010fbcaa3b489d7`.
- Skill references read directly: contract review
  `344ac717c4279ce0f98914babac5e26c32700827bb545e8dd24182bb3e0d16f1`,
  provenance review
  `d655a42de1fe2e1a2284766abefb33182a5d9234d21da6f75c2110a1c98023fe`,
  review classification
  `23f8a56c59f2a32f076998bad81ab59c85279b38f1f7b9275c5bcd9e9ab0759e`,
  and delta review
  `31965d290395f16ca64939d1d755d587ed460ff828586538eafa58fa8de70749`.
- The skill-linked V2 protocol was read directly and identifies itself as
  superseded historical evidence. Current Agent Office repository/Reviewer
  documents and the exact committed handoff controlled.
- Governance branch/head before this result:
  `advisor/as1-multi-team-slack-pilot-001` /
  `f56cb415ad8f080c6b06c61726601c79ce7a26d2`, clean and upstream-equal.

## Routing and stop

RETURN_TO: `agent-office-advisor`

VERDICT: `NEEDS_PATCH`

This Reviewer did not patch the candidate, dispatch a Worker, accept risk,
grant final approval, authorize owner/live setup, select a next mission, or
perform live Slack/tmux action. The responsible Advisor may route a bounded
patch under separate exact authority.

STOP
