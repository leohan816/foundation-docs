# Independent Sentinel Phase A Implementation/Security Delta Re-review V4 Result

## Verdict

`NEEDS_PATCH`

The frozen candidate must not advance to owner setup, live Slack, real tmux
delivery, risk acceptance, pilot execution, or final closure. B01, B02, and B04
are closed by the inspected correction, and B03, B06, and B07 remain closed and
unregressed. The exact mandatory tests, protected regressions, typecheck,
changed-file lint, build, audit, diff check, dependency checks, and protected
byte-equality gates are green. Direct inspection and read-only disposable probes
nevertheless reproduce mandatory B05 and B08 defects, so B09's closure claims
are not truthful yet.

This is `NEEDS_PATCH`, not `PASS_WITH_RISK`, because the remaining defects are
patchable violations of explicit frozen gates: malformed/unexpected live Socket
transport state is not durably latched, and durable recovery still accepts an
impossible dedupe phase/field combination while malformed JSON bypasses the
required durable corruption latch. It is not `FAIL` because the defects remain
narrowly repairable inside the already reviewed AS1 source/test/evidence surface
without changing product scope or authority.

## Blocking findings

### B05 — malformed/unexpected receive-ready Socket state is logged and ignored, not durably latched

Severity: critical. Closure gate: B05.

The V4 handoff requires queue overflow, provider disconnect,
malformed/unexpected transport state, handler failure, forced termination, drain
timeout, and close failure to persist the owning profile latch. The patch adds a
mandatory durable-latch collaborator and correctly uses it for queue overflow,
the explicit provider `disconnect` frame, handler failure, forced termination,
drain timeout, and unconfirmed close. It does not use it for malformed or
unexpected receive-ready traffic:

- `4cf967d:src/adapters/gateways/slack-pilot/socket-client.ts:408-415` catches a
  malformed ready-state frame, records only `REJECTED_MALFORMED_FRAME`, and
  returns while the transport remains receive-ready;
- `:422-429` does the same for an invalid/unexpected Events API envelope; and
- `:256-261` routes post-ready raw `error`/`close` through the already-settled
  startup closure, so those events do not latch or move the live phase either.

A read-only Node probe against the freshly built frozen source connected a fake
Socket through the exact hello and then emitted the malformed text `{`. The
observed result was exact:

```json
{"phase":"EVENT_RECEIVE_READY","durableLatches":[],"closeCalls":[],"logs":[["AGENT_OFFICE_ADVISOR","EVENT_RECEIVE_READY","REJECTED_MALFORMED_FRAME"]]}
```

Thus a protocol-corrupt live stream can remain admitted and the failure is
forgotten on restart. The green Socket tests cover durable latching for queue
overflow, the explicit provider disconnect frame, and handler failure, but have
no malformed/unexpected ready-state or post-ready raw close/error durable-latch
case.

Required patch evidence: every malformed/unexpected post-hello transport state
and every post-ready raw error/close must stop admission, close/terminate the
same generation, persist the exact owning profile latch, preserve `LATCHED`
through shutdown, and be covered by direct durable-latch regressions. A control
predicate failure/rejection at dequeue must likewise remain durably and
observably fail closed.

### B08 — recovery invariants remain partial and malformed durable JSON bypasses the latchable error class

Severity: high. Closure gate: B08.

The new fixed 1 MiB pre-read bound is present on the pinned file descriptor for
profile indexes and global control, receive/question/transport parsers gained
useful relational checks, and duplicate root correlation now requires complete
immutable equality. Two mandatory parts remain open.

First, dedupe recovery is not phase-to-field exact. `parseDedupeRecord()` merely
narrows `preAckClass` to the transport-state enum and independently accepts the
three nullable decision fields
(`4cf967d:src/application/slack-pilot/inbound-store.ts:536-560`). The only writer
creates `PREACK_PENDING` with all three fields null (`:898-936`), yet a
syntactically valid durable row claiming `preAckClass: "MATERIALIZED"` with
`receiveGrantStateHash`, `intakeId`, and `terminalReason` all null was accepted by
the frozen parser; inserting the next record returned:

```json
{"observed":"inserted"}
```

The transport invariant is also incomplete: it does not correlate
`eventId` with `observed.sourceEventId`, candidate kind with the committed
decision, or the required binding-state hash with a bound/materialized decision
(`:485-534,658-685`). The new B08 tests assert only that a dedupe phase is in the
enum and exercise two selected impossible transport cases; they do not prove the
exact phase-to-field matrix required by the handoff.

Second, JSON decode/parse failures are outside `STORE_QUARANTINED`.
`readJsonArray()` bounds the file, but calls fatal UTF-8 decode and `JSON.parse`
without normalizing either exception (`:1817-1850`). `As1InboundService` persists
the profile latch only for `DomainError` with code `STORE_QUARANTINED`
(`src/application/slack-pilot/service.ts:262-268`). A disposable state-root probe
with an `inbound-dedupe.json` containing `{` returned a raw, code-less
`SyntaxError`, so the service latch path cannot run:

```json
{"resolved":false,"name":"SyntaxError","code":null,"message":"Expected property name or '}' in JSON at position 1 (line 1 column 2)"}
```

The global-control reader has the same unnormalized decode/parse seam
(`src/operations/readiness/as1-slack-control.ts:556-579`). After establishing and
closing a disposable control, corrupting `global-control.json` to `{` and
reopening produced the same raw `SyntaxError`, not a latchable/quarantine error.
Current B08 impossible/oversize tests assert rejection only; they do not assert
the required durable owning-profile/global latch.

Required patch evidence: encode the complete dedupe and transport
phase-to-field/identity matrix, normalize fatal UTF-8/JSON and relevant read
corruption to the reviewed quarantine path, and add malicious valid-type,
malformed-byte, and oversize tests that prove the correct durable profile/global
latch—not only a thrown exception.

### B09 — evidence accurately discloses safe-state limits but materially overclaims B05/B08 closure

Severity: high. Closure gate: B09.

The as-built and Worker result now name the real exported classes and accurately
state that live composition and a production tmux mutation port are absent,
Phase A is synthetic/default-disconnected, owner setup is incomplete,
independent review is pending, and no real Slack/tmux/secret action occurred.
The prohibited `git stash push/pop` attempt is explicitly disclosed in the
Worker result; `git stash list` is empty, the candidate is clean and
upstream-equal, the visible post-incident HEAD reflog contains commit-only
forward history, and the expected source/evidence bytes and tests remain intact.
The corrected handoff `ef26aad4879811aecac797c28ce535cb6498d15f` is distinct
from and descends from initial lineage
`47430b9f01bd1b5d0a841a72f1f56cc9a41c5e81`; its committed SHA256 is
`6562955a8d1f1cb2da7eb527ed52bb76c3787f39a05c4d7258dc462df31933cf`.

The central closure statements are still false:

- `WORKER_RESULT.md` marks B05 and B08 `REPAIRED`, says every Socket
  fail-closed transition durably latches, and says impossible state durably
  latches;
- `WORKER_RESULT_POINTER.txt` says B01/B02/B04/B05/B08 are repaired and B09 is
  truthful; and
- the as-built says every fail-closed Socket transition and every impossible or
  corrupted durable record durably latches
  (`docs/operations/AGENT_OFFICE_AS1_SLACK_PHASE_A_AS_BUILT.md:29,60-71`).

Those statements contradict the reproduced B05/B08 behavior above. Regenerate
the as-built, FEATURE_INDEX, Worker result, and pointer only after the source and
regressions actually close the gates.

## B01-B09 closure disposition

| Finding | V4 disposition | Direct basis |
|---|---|---|
| B01 | `CLOSED` | Production `as1WsClientOptions()` uses `as const satisfies As1WsClientOptions`; the module-scope compile contract calls that production helper; package-root `ws` construction remains direct, with no suppression/cast/toolchain weakening. |
| B02 | `CLOSED` | Structurally usable ACKable policy rejections persist receipt/dedupe, open directly at immutable `PREACK_REJECTED`, ACK, and terminalize; crash, retry, restart, divergence, and identity-contradiction tests pass. |
| B03 | `CLOSED_UNREGRESSED` | Fixed `NEW_MISSION` root and fixed-kind continuation semantics remain intact; focused threading regression passes. |
| B04 | `CLOSED` | Real read-only receive/delivery authority provenance gates exist; trusted repo/upstream/snapshots/location and startup clock/control seams are construction-bound; `As1StartupIdentityVerifier.verify()` accepts only connection data; exact delivery binds its provenance gate. |
| B05 | `NOT_CLOSED` | Malformed/unexpected/post-ready error/close Socket state can remain receive-ready with no durable latch. |
| B06 | `CLOSED_UNREGRESSED` | Evidence ingress and real Git/content provenance regressions pass; protected Advisor-inbox remains byte-equal. |
| B07 | `CLOSED_UNREGRESSED` | Branded outbound and SDK fail-closed/no-blind-resend regressions pass. |
| B08 | `NOT_CLOSED` | Impossible dedupe phase/fields are accepted; decode/parse corruption escapes the quarantine class and therefore the required durable profile/global latch. |
| B09 | `NOT_CLOSED` | Safe-state/deferred disclosures are accurate, but repaired/closed and durable-latch claims contradict B05/B08 source behavior. |

## Independent reproduction

Actual code was inspected before the prior Reviewer result, Worker result, and
Advisor validation summaries. The exact `0e4274f..4cf967d` delta is 17 files,
1,635 insertions, and 359 deletions. The source-behavior tip is `57af414`; the
only `57af414..4cf967d` change is the as-built document.

- Mandatory V4 test command: `npx vitest run` over the exact seven focused and
  four protected files named by the handoff — PASS, **11 files / 244 tests**.
- Preserved B03/B06/B07 expansion, justified by the shared-store delta:
  `as1-slack-git-provenance`, `as1-slack-sdk-adapter`,
  `as1-slack-evidence-ingress`, `as1-slack-outbound`, and
  `as1-slack-thread-correlation` — PASS, **5 files / 71 tests**.
- Total independently executed Vitest scope: **16 distinct files / 315 tests**, all PASS.
- `npm run typecheck` — PASS.
- ESLint over exactly the 13 TypeScript paths changed in
  `0e4274f..4cf967d` — PASS, zero output/problems.
- `npm run build:core` — PASS.
- `npm audit --audit-level=high` — PASS, zero vulnerabilities on 2026-07-15.
- `git diff --check 0e4274f..4cf967d` — PASS.
- Installed package-root set: `@slack/web-api@8.0.0`, `ws@8.21.1`,
  `@types/ws@8.18.1`, TypeScript `6.0.3`; no direct/installed
  `@slack/socket-mode`.
- Targeted suppression/deep-import/unsafe-cast scan — no production match (the
  sole `any` match is a prohibition comment). No toolchain weakening.
- Shell/dynamic/secret scan — no exec/spawn/eval/dynamic target or token literal
  in the changed production source; only the reviewed `wss://` grammar and a
  `shell:false` comment matched. No secret, credential, or live Slack
  environment value was inspected.
- Reset/retry/fallback scan — no latch reset, auto reconnect, fallback profile,
  or retrying transport path; matches were reviewed comments, provider retry
  metadata, and the intended `retries: 0`/exact-retry handling.
- Protected Exact Delivery v2, Advisor Inbox, organization application, and
  registry fixture are byte-equal between `81a8c34` and `4cf967d`.
- No package, lockfile, config, env, or runtime-composition delta exists in
  `0e4274f..4cf967d`.
- Worker result SHA256 matches
  `5adb460b658339cdca6b0d19d7b73b81fa110c146486812fcd6c9a1a9304f0a1`;
  pointer SHA256 matches
  `c1e698c4d2943ae1051a5ba116fc0deb1757c1b8ab749ae9fce884c9a26275a5`.
- Base/rejected/corrected-source/result/pointer ancestry, branch, and upstream
  equality all pass. Candidate finished clean at
  `HEAD == upstream == cc823562a52f495ea1b3d54314865b2305ea0932`.

The three additional Node probes were read-only with respect to the candidate:
they used fake Socket collaborators or disposable owner-only `/tmp` state roots
against the freshly built `dist/core` output. They made no network, DNS,
WebSocket, Slack, secret, real tmux, or candidate-repository mutation.

No mandatory gate was skipped. No Living Office, visual/browser, broad E2E,
broad repository suite, owner setup, secret-bearing environment read, live
DNS/HTTP/WebSocket/Slack, real tmux mutation, database, public ingress,
production system, merge, main-branch action, next-actor dispatch, or candidate
patch was performed.

## Review coordinates, authority, skill, and independence

- Mission: `AGENT_OFFICE_AS1_MULTI_TEAM_SLACK_PILOT_001`
- Review pass: `IMPLEMENTATION_SECURITY_DELTA_REREVIEW_V4`
- Actor/session: Agent Office Independent SOL Sentinel Reviewer /
  `agent-office-reviewer`
- Live runtime: tmux session `$28`, window `@28`, pane `%28`, pane PID
  `2381134`, workspace `/home/leo/Project/agent-office`, pane command `codex`;
  direct child process command
  `codex -m gpt-5.6-sol -c model_reasoning_effort=max`.
- Independence: Reviewer session `$28` is distinct from responsible Advisor
  session `$26` and Worker session `$16`. No agent, sub-agent, delegated
  context, temporary session, substitute Reviewer, or parallel context was used.
- Review handoff commit:
  `80d9b610bd64e06a6da032fe4d31261a44f1a527`; handoff SHA256
  `1c3c327dea44ffddcd233e8524ef457ca93e02a13739b14ded4c1d0967eefddb`.
- Companion run prompt SHA256:
  `9296aa3fc0d3db61984f978bce46d053a9c787003890a34631906d87bdfc0d14`.
- Prior independent result:
  `3ffbb57689a8b5828eaef235cb9a1ff40dce43e5`; SHA256
  `8af621decdfbdb55bb38352ab15a7bc6dd9d23572ccce97b17f604669ad38cf3`;
  verdict `NEEDS_PATCH`.
- Frozen base: `81a8c3474380a7e427516d6f5e57c97ad88c6c9b`.
- Rejected candidate: `0e4274f427904302d67a0de1e78cde60512b94b3`.
- Frozen corrected source: `4cf967d54f14e9b63dc3e94efa1081c13ca38044`.
- Corrected Worker result: `0c2ed3a1537538993a67dbfe648c4e515fb3cc50`.
- Worker pointer/tip: `cc823562a52f495ea1b3d54314865b2305ea0932`.
- Required `fable-sentinel` skill SHA256:
  `429aa2397e917e89e7b8770c3a22bf26a60d1337401760db3010fbcaa3b489d7`.
- Skill references read directly: contract review
  `344ac717c4279ce0f98914babac5e26c32700827bb545e8dd24182bb3e0d16f1`,
  provenance review
  `d655a42de1fe2e1a2284766abefb33182a5d9234d21da6f75c2110a1c98023fe`,
  review classification
  `23f8a56c59f2a32f076998bad81ab59c85279b38f1f7b9275c5bcd9e9ab0759e`,
  and delta review
  `31965b7bd4619486a58f566d533aef500ff00cf3d8e404f27941b5af5e6bb26f`.
- The skill-linked V2 protocol was read directly and identifies itself as
  superseded historical evidence. Current Agent Office repository/Reviewer
  documents and the exact committed handoff controlled.
- Governance branch/head before this result:
  `advisor/as1-multi-team-slack-pilot-001` /
  `80d9b610bd64e06a6da032fe4d31261a44f1a527`, clean and upstream-equal.

## Routing and stop

RETURN_TO: `agent-office-advisor`

VERDICT: `NEEDS_PATCH`

This Reviewer does not patch the candidate, dispatch a Worker, accept risk,
grant final approval, authorize owner/live setup, select a next mission, or
perform live Slack/tmux action. The responsible Advisor may route a bounded
patch under separate exact authority.

STOP
