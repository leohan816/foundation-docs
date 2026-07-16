# AS1 Phase B Patch 2 + 2A Independent Delta Review Result

## Verdict

`NEEDS_PATCH`

Patch 2 and Patch 2A materially close three of the six original findings. The
production provenance gates now use construction-bound snapshots independent of
the candidate grant, the exact pre-transition control/latch snapshots are
checked before the first authority transition, and that transition is inside the
rollback envelope. Delivery-grant and readiness-lease pairs remain provisional
until `DELIVERED`; Patch 2A makes the real immediate evidence path require and
re-observe both accepted pairs. Unexpected pre-existing buffers are no longer
deleted, and the retained pointer descriptor has a complete `try/finally`
lifetime. Those are valid F02-F04 closures.

The candidate is not ready for acceptance. F01 still permits a SIGUSR2 incident
to be lost during startup or masked by another terminal selected after an
awaited poll/delivery, allowing a clean `DISABLED_CLEAN` release instead of the
required durable incident kill. Its cleanup paths also swallow latch, global-
kill, disconnect, and lock-release failures and can hard-code
`STATE: DISABLED_CLEAN` without proving that state. F05's killed-record reader
claims canonical-byte proof but only parses JSON; it accepts JSON-equivalent
noncanonical bytes, and its monotonic checks reject late completed reads without
actually bounding a read that never resolves. The Patch 2 tests and result do
not exercise these paths, and setup/result prose overstates them, leaving F06
open as well.

These are source defects inside the existing private Leo-only 14-path map. They
require no design expansion, live rehearsal, secret access, Slack connection,
tmux input, real signal, descriptor activation, or risk acceptance.

## F01-F06 disposition

| Finding | Delta disposition | Reason |
|---|---|---|
| F01 — production owner | **NOT CLOSED — CRITICAL** | Handler placement improved, but an incident can be lost/masked across startup and loop awaits; cleanup can falsely claim `DISABLED_CLEAN`. |
| F02 — authority order/fixed inputs | **CLOSED** | Snapshot commits are independently construction-bound, exact local snapshots are checked pre-transition, and the first transition is inside rollback. Fixed root/env/descriptor/cwd/alias/provenance/Web/Socket ordering remains fail closed. |
| F03 — immutable Git/expiry | **CLOSED for the exact reviewed immediate path** | Both candidates stay provisional; both accepted pairs are retained only after `DELIVERED`; Patch 2A requires/re-observes and rebinds both before immediate evidence/outbound, with no first-observation fallback or evidence-time lease-expiry reapplication. |
| F04 — exact pointer/recovery | **CLOSED** | Current `PREPARED` never authorizes buffer deletion; unexpected buffers go manual without deletion; retained FD closes through `finally`. |
| F05 — process/lock lifecycle | **PARTIAL — HIGH, NOT CLOSED** | Outcome vocabulary and root/schema checks improved, but canonical-byte/identity proof and an actually enforced post-signal timeout remain incomplete. |
| F06 — proof/documentation truth | **NOT CLOSED — MEDIUM** | Green totals are credible, but tests, Worker claims, and setup prose overstate F01/F05. |

## Findings

### F01 — CRITICAL — SIGUSR2 can be lost or masked, and cleanup can report an unproved clean state

`[lifecycle/fail-closed] 67ec9842b6d7af1b2e1eb3142bfee60f4f6da250:src/runtime/as1-slack-pilot/cli.ts:387-489 ↔ 67ec9842b6d7af1b2e1eb3142bfee60f4f6da250:src/runtime/as1-slack-pilot/composition.ts:255-290,301-450,462-624 ↔ 67ec9842b6d7af1b2e1eb3142bfee60f4f6da250:src/operations/readiness/as1-slack-control.ts:151-190,206-298`

The post-lock-acquire hook is a real repair: `As1SlackControl.open()` invokes
`onLockAcquired` after holding the WriterLock and before lock-owned control
validation/initialization, and all three handlers are installed there. SIGUSR2
also overrides an earlier clean request and synchronously closes the in-memory
incident gate once the composition exists.

The owner does not consistently honor that incident request:

1. If SIGUSR2 arrives while control initialization is in progress,
   `closeIncidentAdmission` is still null. After `open()` returns, CLI lines
   421-423 close the gate, but lines 431-432 call `composition.start()` without
   first executing the requested incident kill. `start()` has no incident check
   at entry and can perform Git observation, provenance work, and durable
   transitions before a later live predicate fails. Its revert closes the
   composition; the outer catch then sees `isOpen() === false` and hard-codes a
   clean result instead of persisting `DISABLED_LATCHED`.
2. In the live loop, `requested` is sampled only at lines 443-448. If SIGUSR2 is
   delivered while `observeReceiveGrantOnce()` is awaited, the handler closes
   the gate, but the resumed loop does not resample it before starting
   `deliverPending()`. The exact transport then observes the closed actionability
   predicate and can return `STOPPED_BEFORE_PASTE`; CLI lines 463-467 select
   `DELIVERY_HALTED`, and lines 477-479 call clean `stop()`. That transition can
   durably write `DISABLED_CLEAN`, completely masking the pending incident. A
   signal during delivery/evidence has equivalent unchecked continuations and
   can also start later Git/evidence work before the next top-of-loop sample.
3. `latchActiveProfileAndStop()` at composition lines 273-289 catches and ignores
   profile-latch persistence, Socket disconnect, fallback global-kill, and lock-
   release failures, then returns a status. CLI lines 484-489 additionally catch
   that whole cleanup and `composition.close()` and return
   `STATE: DISABLED_CLEAN` even when neither clean persistence nor lock removal
   was established. Startup rollback similarly suppresses fallback-kill/close
   failures before this hard-coded result.

The new owner tests signal only from the injected idle `delay()` callback, after
the current operations have returned. The priority test fires SIGTERM and
SIGUSR2 in that same callback; the direct gate test closes the gate and then
calls `incidentKill()` explicitly. Neither covers a signal during control init,
startup, receive observation, delivery, or evidence, and the error test supplies
successful latch/cleanup collaborators. Passing totals therefore do not close
the source races.

Required closure: make a pending incident dominate before startup and after
every awaited boundary, before starting any next operation or selecting any
non-incident terminal; route it exactly once through durable incident kill.
Cleanup must preserve and return a truthful stable failure when latch, fallback
kill, disconnect, or lock release is ambiguous—never synthesize
`DISABLED_CLEAN`. Add ordered deferred-promise tests for incidents during init,
startup, poll, delivery, and evidence, plus injected cleanup-persistence and
lock-release failures.

### F05 — HIGH — durable-kill bytes are not canonical/identity-bound, and post-signal awaits are not actually timed out

`[security/process-incarnation] 67ec9842b6d7af1b2e1eb3142bfee60f4f6da250:src/operations/readiness/as1-slack-control.ts:540-567,599-638,698-729 ↔ 67ec9842b6d7af1b2e1eb3142bfee60f4f6da250:src/runtime/as1-slack-pilot/cli.ts:185-252`

Positive closure is accepted: the observer now validates the fixed state root
and established marker, uses a no-follow control-file open, applies a byte-size
and fatal-UTF-8 bound, runs the exact-key/schema/correlation parser, shares one
monotonic deadline value, and exposes the complete reviewed incident outcome
vocabulary when its collaborators resolve.

Two exact requirements remain unmet:

- `readDurableKillProof()` describes a canonical bounded decode, but
  `readJsonRecord()` only fatal-decodes and `JSON.parse()`s the bytes. It never
  compares them with the canonical representation plus the required terminal
  LF. A reordered, pretty-printed, or whitespace-extended JSON value with the
  same exact keys and killed correlations is accepted as `KILLED`. The added
  test rejects an extra key, not JSON-equivalent noncanonical bytes. In addition,
  owner/mode/type are checked by a separate path `lstat` before the later
  no-follow open; the retained descriptor itself is not fstat-correlated with
  those identity facts, so the claimed identity binding is not one-object proof.
- CLI lines 234-249 check time before and after `await deps.lockRemoved()` and
  `await deps.durableKilled()`, which correctly rejects a result that completes
  late. They do not race either await—or the injected delay—against the remaining
  deadline. A blocked or never-resolving proof promise therefore keeps
  `runObserverSignal()` pending forever and emits no `*_TIMEOUT`; measuring an
  eventual return is not enforcement of the fixed 10,000 ms bound. The test only
  advances a fake clock around promptly resolved promises.

Required closure: read and fstat the exact retained no-follow descriptor, prove
its owner/type/mode/link/size identity, and compare its bytes with the strictly
parsed canonical record plus the exact terminal LF before accepting `KILLED`.
Bound every post-signal await by the one remaining monotonic deadline and return
the stable timeout result even when a collaborator never settles. Add a
JSON-equivalent noncanonical-record test, retained-object replacement test, and
never-resolving lock/durable-proof tests; no live signal is needed.

### F06 — MEDIUM — proof and operator prose overstate the unresolved behavior

`[evidence/operations] 5a23c25c08018c5a7cdb94ffa073a9700cb874f3:artifacts/as1-multi-team-slack-pilot/PHASE_B_PATCH_2_WORKER_RESULT.md ↔ 67ec9842b6d7af1b2e1eb3142bfee60f4f6da250:docs/operations/AGENT_OFFICE_AS1_SLACK_SETUP.md:353-400 ↔ 67ec9842b6d7af1b2e1eb3142bfee60f4f6da250:tests/integration/as1-slack-live-composition.test.ts:584-744 ↔ 67ec9842b6d7af1b2e1eb3142bfee60f4f6da250:tests/operations/as1-slack-lifecycle.test.ts:555-627`

Patch 2 truthfully separates the local `npm run` convenience form from the fixed
direct owner argv and narrows `status` to its generic projection. Patch 2A also
truthfully supersedes its earlier inaccurate F03 sentence. Those corrections are
accepted.

The remaining claims are stronger than source:

- The Patch 2 result says synchronous incident closure and priority are complete
  and says cleanup terminates under a stable latch. F01 shows that an incident
  can still be lost/masked and cleanup can falsely claim clean.
- Its F05 section says the killed decoder has canonical binding and the deadline
  bounds every post-signal await. Neither is implemented as claimed.
- Setup section 10.3 says handlers install “before any side effect,” although
  `runForegroundOwner()` calls `boundary.initialize()` before lock acquisition
  and handler installation. The accurate narrower claim is after lock acquire
  and before lock-owned control initialization/live side effects.
- Setup section 10.4 says incident kill durably engages and bounded-shuts down;
  the F01 masking path can clean-stop instead, and the F05 proof can hang.

Required closure: after repairing F01/F05, add the missing adversarial tests and
make the replacement Worker result/pointer and setup wording state only the
implemented and synthetically proven boundaries. Preserve the corrected generic
`status`, local-vs-owner argv distinction, `OWNER_SETUP_COMPLETE`, one selected
client, fixed root, default-disabled descriptor, zero-operand observer verbs,
and live-disabled restart.

## Closed findings and preserved security axes

### F02 — CLOSED

- Production receives a copied, owner-established
  `AS1_AUTHORITY_SNAPSHOT_COMMITS` set; neither provenance factory reads
  `grant.authoritySourceCommit`. Empty/invalid-only input leaves an empty set and
  the real verifier denies.
- `selectedSnapshotHashes()` hashes the exact parsed pre-transition global
  control and selected profile latch; `start()` compares both before mutation.
- The first `DISABLED_* -> RECEIVE_GRANTED_ONE_PROFILE` transition is within the
  same rollback/global-kill envelope as later secret/Web/Socket failures.
- Fixed owner root, fixed installed-module descriptor, exact descriptor secret
  path, cwd independence, contained/non-aliasing profile roots, fixed Git repo/
  upstream, provenance-before-Web, and Web-before-Socket/receive ordering remain
  fail closed. The descriptor stays disabled, so none is activated here.

### F03 — CLOSED for the exact Patch 2/2A review subject

- Delivery grant and lease observations are provisional. Both accepted pairs
  are assigned together only after transport outcome `DELIVERED`; no rejected or
  merely observed candidate is retained.
- Later delivery polls use both pairs. Immediate evidence refuses absent
  accepted authority, re-observes the grant and lease with their pairs, latches
  `DIVERGED`, rejects unavailable/malformed bytes, re-runs the canonical
  grant-snapshot assertion, and checks the complete shared immutable field set.
- It deliberately does not reapply the short delivery-time lease expiry at
  evidence time. No first-observation evidence fallback remains.

### F04 — CLOSED

- A current attempt's new `PREPARED` record is never used as recovery evidence.
  Any pre-existing same-name buffer goes to manual reconciliation without
  deletion or paste.
- The pinned pointer descriptor is enclosed immediately in a `try/finally`; all
  normal rejects and thrown control/observation paths invoke its idempotent close.
  The existing no-follow, retained-inode, raw-byte, 32-KiB, content-addressed
  filename, three-observation, fixed-target, and no-retry properties remain.

## Scope, lineage, and product state

- **Lineage — PASS.** `bd3f8fc6` is the direct Patch 2 child of independently
  reviewed base `cf657632`; Patch 2 evidence commits lead to Patch 2A source
  `67ec9842`, followed only by Patch 2A result and pointer commits. Product
  `HEAD == upstream == 5a23c25c08018c5a7cdb94ffa073a9700cb874f3`, clean,
  `0/0`.
- **Private 14-path scope — PASS.** Final source delta `cf657632..67ec9842` is
  exactly eight authorized paths, 656 insertions / 173 deletions. Six authorized
  paths are unchanged. The four later paths are the two Patch 2 and two Patch 2A
  evidence files only. No package, lockfile, descriptor, Registry, schema,
  database, UI, service, listener, external project, or prior evidence changed.
- **Default disabled — PASS.** Descriptor blob is identical at `cf657632`,
  `bd3f8fc6`, `67ec9842`, and `5a23c25`:
  `2716f34dedb93959e95bded699b3714e962561ec`; SHA-256
  `8e3b9985f09b366e046d03392bd60b2157264ec1f2eb4498bfa92e615802f5d7`.
- **Private targeting — PASS subject to F01/F05.** One configured workspace and
  Leo singleton, two closed profiles, selected App/channel, selected-profile
  tmux session/workspace/command, one common writer lock, and sequential profile
  rule remain. No Slack/CLI input selects arbitrary Team, actor, command, PID,
  signal, pane, repository, or external path.
- **Review boundaries — PASS.** No owner secret, Slack endpoint, owner state,
  descriptor activation, authority creation, live tmux input, or real process
  signal was accessed. Product remained read-only; no patch, stage, commit,
  push, delegation, or sub-agent occurred.

## Reproduced gates and attempt disclosure

| Gate | Independent result |
|---|---|
| Affected live-composition suite | `1/1`, `27/27` PASS |
| Exact focused five-file Phase B suite, `--maxWorkers=1` | final host-identity run `5/5`, `160/160` PASS |
| Full AS1 19-file suite, `--maxWorkers=1` | `19/19`, `381/381` PASS |
| Read-only typecheck | PASS; 329 configured files, dependency reads redirected to the existing sibling dependency tree |
| Read-only core build | PASS; 157 source files, 628 outputs / 3,419,006 bytes generated in memory and discarded |
| ESLint over exact seven changed TypeScript paths | final read-only typed-program run PASS, 0 errors / 0 warnings |
| `git diff --check` for source candidate and evidence HEAD | PASS |
| Exact scope, lineage, descriptor/prior-evidence identity | PASS |
| Narrow secret/dynamic-target/unsafe-Git scans | PASS; no credential literal or unsafe shell/Git mutation added; only the fixed owner env/repo bindings and throwaway-test read-only Git harness matched review patterns |

Every failed/retried command is disclosed:

1. The first affected-suite invocation used the candidate config/root directly;
   because that read-only worktree has no `node_modules`, config loading failed
   on `vitest/config`. Reusing the established sibling Vitest/config while
   targeting only candidate tests passed `27/27` without a filesystem workaround.
2. The focused suite inside the UID-remapping sandbox produced `158/160`; only
   the two real pinned-interpreter identity probes returned
   `CAPABILITY_UNAVAILABLE`. The exact same five files under the host identity
   passed `160/160`. No process was signaled.
3. Direct `tsc --noEmit` found no candidate dependency tree and stopped with
   missing `node` and `vitest/globals` types. The read-only TypeScript API run
   redirected only dependency lookups to the existing sibling tree and passed
   all 329 configured files. The build used the same read mapping and intercepted
   all output in memory.
4. A sibling-cwd ESLint invocation ignored all seven candidate files as outside
   its base path. A candidate-cwd invocation then emitted 1,373 type-resolution
   errors because the candidate has no dependencies. The final read-only ESLint
   API run used the already-successful candidate TypeScript Program and passed
   all seven exact paths with zero findings.

No dependency install, mount/symlink workaround, network request, secret read,
Slack connection, live-pilot tmux target observation/mutation, owner-state
initialization, real signal, descriptor activation, or repository mutation
occurred. The only tmux read was the required Reviewer pane/runtime-binding
check recorded below; no tmux input was sent.

## Provenance and reviewer binding

- Governance handoff/run-prompt commit:
  `3f845e071e901a41682adf352e42ee8a5f2b71c1`
- Handoff / run-prompt SHA-256:
  `5849753cafcf1dd45147a16c873f09247e3695f58b456f3cd9ae6fb88cc8ab5a` /
  `3c85a3d08264dce774e10663c17f0c5f745b33ecc290e1f16b3ed9bded53db76`
- Prior result / Patch 2 brief / Patch 2A correction SHA-256:
  `e595c8e057a09f4f520c1ab5b1f95781f906a1f12742e7891050808a301c117f` /
  `efd977502f6656cb022db6cf8a5e41c025908deab9f6020dc318f168a1ed95e2` /
  `dab06a1c0d448c7ae213c3ec46f9b71c590a2795a7e88ea5dd8fa2be6c697f57`
- Patch 2 / Patch 2A Worker result SHA-256:
  `5bcf60d6b0d2479e2cfbcc651c9739bd421259a7c003ac1373759ad8f2a52f85` /
  `69197874200dfeb7ad594fcb1a1773d6f37d213cbff75e5d8890ee8b4a293c10`
- Design / security / final setup SHA-256:
  `ef8647588c905362d53131ef17bff4271991e259d09a4f0bc41f7d412f3553bc` /
  `27c0220ef87709c0c26081988d2a40957ff8ccdba93cf0e0c17313e6e8dca375` /
  `03e3802fd9bd4d935946ee73ba7497f5193dddc41f40edc10d116b3efd357ac3`
- Required Sentinel skill SHA-256:
  `429aa2397e917e89e7b8770c3a22bf26a60d1337401760db3010fbcaa3b489d7`
- Reviewer runtime: independent Agent Office SOL Sentinel Reviewer,
  `agent-office-reviewer`, tmux `@28/%28`, pane PID `2381134`, direct child
  `3829034`, `codex -m gpt-5.6-sol -c model_reasoning_effort=max
  --no-alt-screen`; delegation none.
- Review concluded at `2026-07-16T18:46:42Z` UTC.

Immediately before this result write, governance was clean with
`HEAD == upstream == 3f845e071e901a41682adf352e42ee8a5f2b71c1`, `0/0`, and
product was clean/upstream-equal at `5a23c25c08018c5a7cdb94ffa073a9700cb874f3`.
The result and pointer are the only authorized uncommitted governance changes.

## Return and stop

RETURN_TO: `agent-office-advisor`

EXACT_VERDICT: `NEEDS_PATCH`

NEXT_REQUIRED_ACTION: return F01, F05, and the dependent F06 truth corrections
to `agent-office-opus` for one bounded same-scope patch, then route the frozen
candidate to the same independent Reviewer. F02-F04 are closed and must not be
regressed. No finding is accepted as risk.

STOP
