# AS1 Phase B Patch 4 Independent Delta Review Result

## Verdict

`NEEDS_PATCH`

Patch 4 closes F05 and materially improves F01, but it does not close the exact
review-78 contract. Two CRITICAL F01 authority paths remain:

1. the live Socket callback constructs `As1InboundService` with the raw store
   and control port. Existing `ownedClean()` checks occur before selected
   operations, not before and after every internal await. An incident during an
   inbound store or ACK await can therefore be followed by a later durable
   store mutation after admission has closed;
2. `As1SlackControl.close()` treats every `WriterLock.release()` rejection as
   retained ownership, but `WriterLock.release()` unlinks the namespace lock
   before awaits that can still reject. A post-unlink fsync/descriptor-close
   failure leaves `control.isOpen()` true and triggers a fallback kill even
   though a second owner can already acquire the missing lock path.

The Patch 4 inbound tests do not exercise the first path. The release test
removes the lock path before cleanup and then proves only the eventual latch;
it never attempts a concurrent acquire. All three independent Vitest gates
also emitted Node's `DEP0137` / FileHandle-on-garbage-collection warning for
file descriptor 22, consistent with the retained handle left open by that
release-failure case.

F05's retained-object/current-leaf proof is now source-complete for the exact
handoff criteria. F02-F04 have no concrete Patch 4 regression. F06 remains open
because the Worker result, pointer, and setup text claim complete per-await
incident coverage and truthful retained ownership that the actual source does
not provide.

The defects are patchable, but the release outcome may require an exact scope
decision for `src/persistence/file-store/writer-lock.ts`, which was outside the
Patch 4 six-path lock. The Reviewer does not expand scope or accept that risk.

REVIEW_PASS: `IMPLEMENTATION_REVIEW`

## Authority correction

The initial transport message named
`5d1bd9f6cba4f01193e6b40e0bcae163eed6d61e`. Leo corrected that transcription
before review to the verified `git rev-parse` value
`5d1bd9f9550077ccc35b8c3b11fa177c1cc6263f`. Only the corrected commit was used.
Governance `HEAD`, branch, and upstream were clean and exactly equal to that
corrected commit; it changes only handoff 78 and run prompt 78A.

## F01-F06 delta disposition

| Finding | Delta disposition | Direct basis |
|---|---|---|
| F01 — incident domination and truthful cleanup | **NOT CLOSED — CRITICAL** | Raw inbound-service store/ACK continuations escape the new incident proxies, and a `WriterLock.release()` error can occur after namespace unlink while the control still claims ownership and mutates. |
| F02 — authority order/fixed inputs | **CLOSED; NO CONCRETE REGRESSION** | Construction-bound snapshot inputs, exact pre-transition comparisons, fixed root/descriptor/env rules, provenance order, and default-disabled selection remain intact. |
| F03 — immutable Git/expiry | **CLOSED FOR THE EXACT REVIEWED IMMEDIATE PATH; NO CONCRETE REGRESSION** | Accepted grant/lease retention, post-acceptance re-observation, and evidence binding are unchanged except for fail-closed guards. |
| F04 — exact pointer/recovery | **CLOSED; NO CONCRETE REGRESSION** | `exact-transport.ts` and its retained-pointer/no-retry contract are byte-unchanged by Patch 4 and pass the bounded regressions. |
| F05 — exact durable-kill proof/deadline | **CLOSED** | Pre/post retained `fstat`, mutation metadata, current-leaf `O_NOFOLLOW` reopen, dev/inode correlation, two retained handles, close-ambiguity rejection, canonical bytes, and bounded deadline behavior are present and tested. |
| F06 — proof/operator truth | **NOT CLOSED — MEDIUM** | Correct totals and Patch 3 supersession are present, but Patch 4 evidence/setup overstate F01 inbound and release safety. |

## Findings

### F01-A — CRITICAL — live inbound work can begin another durable side effect after incident admission closes

`[lifecycle/fail-closed] 0ab4782a79133111513fb11bc9ef62c197ed08da:src/runtime/as1-slack-pilot/composition.ts:580-617 ↔ 0ab4782a79133111513fb11bc9ef62c197ed08da:src/application/slack-pilot/service.ts:382-397,463-504,520-546,574-638 ↔ 0ab4782a79133111513fb11bc9ef62c197ed08da:src/operations/readiness/as1-slack-control.ts:211-219 — "new As1InboundService(boundContext, grant, store, gate)" / "await this.store.persistReceipt(...); ... await this.recordDedupe(...)" — SIGUSR2 during the receipt/ACK/recovery await can be followed by `insertDedupe`, `openTransport`, `commitTransportAck`, bind/consume, or materialization after the gate is closed.`

Patch 4 correctly wraps the ports supplied to startup identity verification,
exact transport, evidence ingress, and outbox. It does not apply the same
construction-bound proxy to the inbound service at composition line 613. The
Socket callback at lines 614-617 awaits `service.processEnvelope()` over the
raw `store` and `gate`.

`controlProfileControlPort()` is genuinely construction-bound to the same
lock-owning control, and `ownedClean()` correctly includes
`incidentGateOpen`. That closes a path only when the service calls the gate.
The unchanged service has internal await sequences without an intervening gate:

- `handleRoot()` checks once, awaits `persistReceipt()`, then starts
  `recordDedupe()` and `driveInbound()`; `driveInbound()` starts
  `openTransport()` before its next gate;
- after `envelope.acknowledge()` resolves, `commitTransportAck()` begins without
  a post-ACK gate;
- recovery can obtain a true recovery gate, enter `recoverPreAckDecision()`,
  and perform multiple later store mutations after an incident during one of
  its internal awaits.

This is the exact “supplied collaborator hides an internal await followed by a
later side effect” failure that result 76 and handoff 78 require to be absent.
The Patch 4 adversarial block at
`tests/integration/as1-slack-live-composition.test.ts:1201-1425` covers startup,
receive-grant observation, delivery, evidence, and cleanup, but not an incident
inside the real live inbound callback. Its “receive” case tests
`observeReceiveGrantOnce()`, not `socket.deliver()` / `processEnvelope()`.

Required closure: construction-bind incident guards to the actual inbound
store/control/ACK path (or split every internal boundary), then use ordered
deferred promises through the registered Socket callback to prove that an
incident during receipt, ACK, dedupe/open, recovery, and materialization begins
no next durable/Slack side effect and routes exactly once to the durable kill.

### F01-B — CRITICAL — release failure can lose the namespace lock before the old control's fallback mutation

`[concurrency/authority] 0ab4782a79133111513fb11bc9ef62c197ed08da:src/operations/readiness/as1-slack-control.ts:325-338 ↔ 0ab4782a79133111513fb11bc9ef62c197ed08da:src/persistence/file-store/writer-lock.ts:1105-1140 ↔ 0ab4782a79133111513fb11bc9ef62c197ed08da:src/runtime/as1-slack-pilot/composition.ts:445-463 ↔ 0ab4782a79133111513fb11bc9ef62c197ed08da:tests/integration/as1-slack-live-composition.test.ts:1359-1371 — "If release() throws, ownership is RETAINED" conflicts with `unlink(lockPath)` followed by awaited directory fsync and handle close — a rejection after unlink permits a second `O_EXCL` acquire while the first control still reports open and writes the fallback kill.`

Moving `this.lock = null` and `this.released = true` after
`await lock.release()` fixes only failures that occur before namespace release.
The underlying foreground release sequence is:

1. validate retained/current identity;
2. unlink `locks/writer.lock`;
3. await directory fsync;
4. await retained-handle close;
5. only then mark the `WriterLock` released.

Either await after unlink may reject. In that state the namespace lock is gone,
but `As1SlackControl.isOpen()` still returns true. `finishCleanup()` therefore
calls `engageGlobalKill()` under a stale ownership claim while another process
can acquire the now-missing path and become the canonical writer. That violates
the one-writer authority invariant and the handoff's explicit requirement that
release failure not silently create concurrent-owner authority.

The added test unlinks the lock at line 1364 before calling `stop()`. It thereby
creates an already-free namespace, then asserts only the old control's eventual
fallback latch. It does not attempt a second acquire before that mutation and
does not prove retained exclusive ownership. The repeated FileHandle-on-GC
warning in all three independent test gates is additional evidence that this
failure path leaves its retained descriptor open; an open descriptor to an
unlinked inode is not an `O_EXCL` namespace lock.

Required closure: make release report a phase-aware/transactional ownership
outcome. Once namespace unlink succeeds, the old control must irrevocably cease
authority mutations even if later durability/close reporting is ambiguous. If
release fails before unlink, retained ownership and a fallback kill may remain
valid. Add an injected post-unlink failure test that attempts a second acquire
before any old-owner fallback mutation and proves two authorities cannot act.
Because the load-bearing sequence is in `writer-lock.ts`, Advisor must issue an
exact path handoff if that file is required.

### F06 — MEDIUM — Patch 4 proof and operator prose overstate F01 closure

`[reported/evidence] 0ab4782a79133111513fb11bc9ef62c197ed08da:artifacts/as1-multi-team-slack-pilot/PHASE_B_PATCH_4_WORKER_RESULT.md:7-12,69-104,215-220 ↔ 3165e7470e7e69658aaa1b627d7cd47767478043:artifacts/as1-multi-team-slack-pilot/PHASE_B_PATCH_4_WORKER_RESULT_POINTER.txt:24-35 ↔ 0ab4782a79133111513fb11bc9ef62c197ed08da:docs/operations/AGENT_OFFICE_AS1_SLACK_SETUP.md:403-431 — "EVERY load-bearing await" / "release failure retains ownership" — an operator or later reviewer can treat unguarded inbound continuation and a lost namespace lock as proven safe.`

Positive evidence is accepted:

- the Patch 4 result explicitly supersedes the immutable Patch 3 F01/F05 claims
  and corrects Patch 3's `165/165` report to the independently established
  `166/166` prior total;
- the Patch 4 totals are exact: `98`, `180`, and `404` independently reproduce;
- the default-disabled descriptor, generic status, fixed root, one selected
  profile/client, local-vs-owner argv distinction, zero-operand observer verbs,
  live-disabled restart, and `OWNER_SETUP_COMPLETE` wording remain intact.

The closure statements are not yet truthful. Worker result lines 97-101 and
its Remaining Limitations say every release failure retains ownership and the
lock remains held until process exit. That is false after namespace unlink and
also false in its own test, which manually unlinks the path. Setup section 10.4
repeats the retained-ownership/fallback-kill claim and says every load-bearing
boundary is guarded while omitting the raw inbound-service path. F06 therefore
remains dependent on F01 closure and corrected successor evidence/setup.

## F05 closure

F05 is independently closed for the exact reviewed contract:

- `as1-slack-control.ts:621-635` validates the retained no-follow descriptor
  before and after the same-descriptor read and compares device, inode, link,
  size, mode, UID/GID, mtime, and ctime;
- lines 639-647 independently reopen the current fixed leaf with
  `O_NOFOLLOW`, safely `fstat` it, and correlate device/inode to the retained
  object while both handles remain retained;
- lines 648-665 require fatal UTF-8, strict record correlations, and exact
  canonical bytes plus one LF;
- lines 674-709 deterministically close both descriptors and return no proof on
  any close ambiguity;
- lifecycle tests 690-740 deterministically reject retained unlink/replacement,
  same-size in-place tamper, and mode/metadata change. Existing malformed,
  noncanonical, symlink, deadline, and never-resolving cases remain green.

No F05 defect was found within the bounded subject.

## Accepted findings and non-regression

### F02 — CLOSED; no concrete Patch 4 regression

Patch 4 changes no construction-bound authority snapshot source, exact
pre-transition equality, grant-only profile selection, fixed installed
descriptor/root/env input, or provenance/Web/Socket order. The descriptor stays
byte-identical and disabled.

### F03 — CLOSED for the exact immediate path; no concrete Patch 4 regression

The accepted delivery-grant/readiness-lease pairs remain provisional until
`DELIVERED`, are retained together, and are re-observed/rebound before evidence.
The added incident guards do not create a new acceptance source.

### F04 — CLOSED; no concrete Patch 4 regression

`src/adapters/gateways/slack-pilot/exact-transport.ts` is unchanged by Patch 4.
The accepted retained pointer buffer, complete destination observations,
manual-reconciliation boundary, and no-retry behavior remain covered by the
focused and full suites.

## Scope, lineage, and repository state

- **Patch 4 lineage — PASS.** Source candidate `0ab4782` has direct parent
  `cb6085b`; result `ecaa00f` has direct parent `0ab4782`; pointer/evidence HEAD
  `3165e74` has direct parent `ecaa00f`. Product `HEAD == upstream ==
  3165e7470e7e69658aaa1b627d7cd47767478043`, clean.
- **Exact Patch 4 scope — PASS.** `cb6085b..0ab4782` is exactly the six handoff
  paths, 837 insertions / 156 deletions. The next commits contain only the Patch
  4 Worker result and pointer respectively.
- **Private Leo-only 14-path map — PASS.** Relative to independently reviewed
  Phase B base `cf657632165d85ed4b4f43eb67404c98b70a5b58`, the source/test/doc
  delta remains exactly eight authorized map paths; the other six map paths are
  unchanged. Six intervening Patch 2/2A/3 paths are evidence only. Patch 4 adds
  no implementation path outside the map.
- **Prior evidence — PASS.** Patch 1/2/2A/3 evidence blobs are identical between
  Patch 4 baseline and product evidence HEAD. Patch 4 adds only its own result
  and pointer.
- **Default disabled — PASS.** Descriptor blob is
  `2716f34dedb93959e95bded699b3714e962561ec` at the reviewed base, Patch 4
  baseline, source candidate, and evidence HEAD. Working SHA-256 is
  `8e3b9985f09b366e046d03392bd60b2157264ec1f2eb4498bfa92e615802f5d7`,
  with `enabled:false` and `receiveGrantRef:null`.
- **Narrow static scans — PASS after one disclosed quoting correction.** No
  credential literal, new child-process/dynamic-execution primitive, numeric
  process kill, tmux command, unsafe Git mutation, force operation, or dynamic
  ref was added. The tmux/SIGUSR2/O_NOFOLLOW matches are comments, stable
  constants, and synthetic tests.
- **Review boundary — PASS.** The product stayed read-only. No secret,
  credential, Slack/network connection, owner-state initialization, live-pilot
  tmux observation/input, real signal, descriptor activation, product patch,
  stage, commit, push, delegation, or sub-agent was used.

## Bounded reproduction

All Vitest runs targeted only candidate test paths through the established
byte-identical sibling dependency/config tree, disabled cache, used
`--maxWorkers=1`, and ran under host UID 1000 so the pinned ownership and
interpreter checks were meaningful. No live I/O was reachable.

| Gate | Independent result |
|---|---|
| Two changed focused files | `2/2`, `98/98` PASS; emitted FileHandle-on-GC warning described in F01-B |
| Exact five-file Phase B suite | `5/5`, `180/180` PASS; same warning |
| Established AS1 19-file suite, once | `19/19`, `404/404` PASS; same warning |
| Read-only typecheck | PASS; 329 configured files / 1,090 program source files; dependency reads redirected only to the identical-lock sibling tree |
| Read-only core build | PASS; 157 configured roots; 628 outputs / 3,475,170 bytes captured in memory and discarded |
| ESLint exact five changed TypeScript paths | PASS; 5 files, 0 errors, 0 warnings using the candidate TypeScript Program read-only |
| `git diff --check` source and evidence deltas | PASS |
| Scope, parent/ancestry, descriptor, prior-evidence identity | PASS |
| Credential/dynamic-target/unsafe-Git scans | PASS after the disclosed regex quoting correction |

Green totals do not override the two source findings. No Patch 4 test injects
an incident inside the registered inbound callback, and the release test does
not prove exclusivity after namespace unlink.

## Attempt disclosure

1. The first read-only TypeScript API invocation passed JSON-escaped literal
   `\\n` text to `node -e` and failed immediately with a JavaScript
   `SyntaxError`. The corrected single-quoted one-line invocation passed with
   329 configured files. It wrote nothing.
2. The first credential-scan regular expression placed an unescaped single
   quote inside a single-quoted shell regex and failed at shell parse time. The
   corrected equivalent scan returned no matches. The dynamic-execution and
   unsafe-Git scans returned no matches on their first runs.
3. Every bounded Vitest gate exited 0 with the exact claimed totals, but each
   printed the same Node warning that descriptor 22 was closed on garbage
   collection. The warning is retained as evidence and tied to F01-B rather
   than omitted from the green totals.

No other gate failed, hung, or was retried. No dependency was installed and no
symlink, mount, cache, emitted product file, or sandbox workaround was created.

## Reviewed artifacts and provenance

- Corrected governance handoff/run-prompt commit:
  `5d1bd9f9550077ccc35b8c3b11fa177c1cc6263f`
- Run-prompt / handoff SHA-256:
  `fbf3745b088c63091ab77e48e1d97cf74c38fafbab9b79a08f142e51a5bbcde7` /
  `482d988842e1872211a1910c1ae561eec228e3347f464f26baa0bbd44c68312e`
- Review 76 / Worker brief 77 SHA-256:
  `1c01a9f3d6c8f35f9a3821255722bffafebdcbf107e8cd0bfc7a0e2b54b35ace` /
  `f765daeb54adc81fa788ea37a109b3ac2382c1e0d8daab6daa588f2e23d58400`
- Patch 4 Worker result / pointer SHA-256:
  `cc9428424d1c584197388235c392dfa973e85bfb99dcbd2457e737bf533edf9c` /
  `8b29fec1af3e6ad399752d74cf44d9b50597dffb60100f4781b4014efb13e10d`
- Phase B design / security / Patch 4 setup SHA-256:
  `ef8647588c905362d53131ef17bff4271991e259d09a4f0bc41f7d412f3553bc` /
  `27c0220ef87709c0c26081988d2a40957ff8ccdba93cf0e0c17313e6e8dca375` /
  `da5492e2b9a2de4de7159f273900e444dc82949813d58bf823cf23843ca45c01`
- Sentinel skill SHA-256:
  `429aa2397e917e89e7b8770c3a22bf26a60d1337401760db3010fbcaa3b489d7`
- Current role authority read directly: Agent Office `AGENTS.md`, `CLAUDE.md`,
  `docs/agent/TEAM_OPERATING_MODEL.md`, and `docs/agent/roles/reviewer.md`.
  The skill-required V2 protocol was read as superseded historical evidence,
  consistent with its status. Sentinel contract, provenance, delta,
  classification, and safety references were applied.
- Reviewer runtime: independent `agent-office-reviewer`, tmux pane `%28`, pane
  PID `2381134`, direct child `3829034`, `codex -m gpt-5.6-sol -c
  model_reasoning_effort=max --no-alt-screen`; Node `v24.18.0`, Git `2.53.0`,
  Linux `7.0.0-27-generic` x86_64, UID 1000; delegation none.
- Review concluded: `2026-07-16T22:36:55Z` UTC.

## Required next action

Do not activate the descriptor or run a live pilot. Advisor should route an
exact bounded patch that:

1. guards the registered inbound service's store/control/ACK continuations and
   adds ordered callback-level zero-later-effect tests;
2. makes `WriterLock.release()` outcome phase-aware so post-unlink ambiguity
   cannot leave the old control authorized, with a deterministic concurrent-
   acquire test; and
3. writes successor evidence/setup wording that states only the resulting
   source/test proof.

No risk is accepted and no scope is expanded by this result.

RETURN_TO: `agent-office-advisor`

STOP
