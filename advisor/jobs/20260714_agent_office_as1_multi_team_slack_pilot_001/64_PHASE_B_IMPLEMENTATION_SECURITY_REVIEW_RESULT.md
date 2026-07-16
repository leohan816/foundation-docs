# AS1 Phase B Independent Implementation and Security Review Result

## Verdict

`NEEDS_PATCH`

The exact candidate is provenance-clean, default-disabled, and confined to the
approved 14 paths. The reproduced gates are green, including the reported
`123/123` focused and `339/339` AS1 totals. It is nevertheless not a complete or
safe implementation of the reviewed live composition. The production CLI
supplies no live dependencies, immediately closes the composition, and installs
none of the required owner signal handlers. Material authority-ordering,
immutable-Git, pointer-pin, lifecycle-bound, and exact-lock-byte defects also
remain in actual source.

All findings are patchable by the same `agent-office-opus` Worker inside the
existing 14-path lock. No path expansion, design change, live rehearsal, or risk
acceptance is required. The same independent Reviewer must delta-review the
patch. This verdict does not authorize Slack, secrets, owner-state setup, tmux
input, process signaling, activation, final approval, or mission closure.

## Findings

### F01 — CRITICAL — the production entry cannot start or retain a live owner

`[implementation/contract] 317d82ec3b76ae22e20ddea25f6d33e6e16c1934:src/runtime/as1-slack-pilot/cli.ts:203-211 ↔ 317d82ec3b76ae22e20ddea25f6d33e6e16c1934:src/runtime/as1-slack-pilot/composition.ts:204-214,226-233 ↔ c4b1f5772d4a5094c86cebd949390bdd3115889b:docs/integration/AGENT_OFFICE_AS1_PHASE_B_LIVE_COMPOSITION_DESIGN_DELTA.md:367-422,724-730,1477-1494 — the only production caller opens without dependencies, the composition treats missing dependencies as disconnected Phase A mode, and the CLI then releases the owner in `finally`.`

- `cli.ts:205` omits `deps`. `composition.ts:212-214` therefore opens a
  non-foreground control, and `composition.ts:231-233` returns
  `DISABLED_DEFAULT_NO_AUTHORITY` even after a later authorized descriptor
  activation. `cli.ts:207-211` immediately closes and releases the lock.
- A candidate-wide source search found no production construction of
  `NodeAs1GitArtifactSource`, `NodeAs1TmuxPort`, the real Web/Socket clients,
  `As1RawSocketTransport`, receive/delivery provenance gates, or the evidence
  verifier. Those objects appear only in tests or remain uninstantiated.
- Neither `cli.ts` nor `composition.ts` installs a `SIGINT`, `SIGTERM`, or
  `SIGUSR2` handler, waits for foreground ownership, drives a grant-expiry timer,
  or runs a Git/delivery/evidence loop. The synthetic composition test supplies
  every collaborator as a fake at
  `tests/integration/as1-slack-live-composition.test.ts:184-213`; it does not
  exercise the production entry.

Impact: an enabled descriptor still cannot connect, accept one Leo root, deliver
the pointer, ingest evidence, or project a result. If wiring were added alone,
SIGTERM/SIGUSR2 still would not execute the reviewed clean-stop/durable-kill
paths. This contradicts the Worker result's “single-profile foreground” and
“§11 clean drain / durable incident-kill” claims at
`0668e5e9a9d28e7b004d8f045a80d4f919d2f69d:artifacts/as1-multi-team-slack-pilot/PHASE_B_WORKER_RESULT.md:43-50`.

Required closure: construct the complete production dependency graph at the
fixed entry, retain the writer lock for the process lifetime, install all three
handlers immediately after ownership, keep the process foreground, implement
bounded expiry/poll/drain behavior, and add a test that enters through the real
production boundary and fails if dependencies are null or the owner returns.

### F02 — HIGH — startup mutates durable authority before provenance and does not enforce fixed owner inputs

`[security/authority-order] 317d82ec3b76ae22e20ddea25f6d33e6e16c1934:src/runtime/as1-slack-pilot/composition.ts:237-297,523-529 ↔ 317d82ec3b76ae22e20ddea25f6d33e6e16c1934:src/adapters/gateways/slack-pilot/exact-authority.ts:117-126 ↔ c4b1f5772d4a5094c86cebd949390bdd3115889b:docs/integration/AGENT_OFFICE_AS1_PHASE_B_LIVE_COMPOSITION_DESIGN_DELTA.md:307-320,367-407 — control reaches `RECEIVE_GRANTED_ONE_PROFILE` before the bound provenance/expiry/identity gates, and the required profile-state-root hash is never checked.`

- `composition.ts:250-254` durably transitions immediately after blob
  observation and parse. The real provenance assertion and connection-time
  expiry/identity checks occur only later through
  `As1StartupIdentityVerifier.verify` at `composition.ts:289-297` and
  `exact-authority.ts:117-126`. A rejected provenance, expired grant, secret
  mismatch, or Web/Socket failure leaves active durable state; `start()` has no
  catch/revert path.
- `assertProfileStateRootBinding` checks only the literal ref at
  `composition.ts:523-529`. It never proves `profileStateRootHash` or the
  contained realpath/no-follow non-aliasing rule.
- `cli.ts:171-205` accepts any nonempty `AS1_SLACK_STATE_ROOT`, initializes it,
  and never compares it with `AS1_OWNER_STATE_ROOT` at `cli.ts:24-26`. A second
  private root can obtain a separate writer lock while zero-operand observer
  commands still target only the fixed root.
- `parseAs1Cli` accepts any `--env-file` at `cli.ts:59-77`.
  `redacted-check` reads it at `cli.ts:178-180`, while `start` ignores it and
  uses the descriptor's secret path. No equality with the reviewed secret path
  is proved. The descriptor is opened through the cwd-relative string at
  `cli.ts:203`, not a fixed installed-module path.

Impact: once F01 is wired, startup can mutate state for an unproven or expired
grant, test one secret but use another, select a second owner root, and leave a
half-started durable control. The arbitrary-root behavior breaks the common-lock
guarantee preventing simultaneous profiles.

Required closure: require the exact fixed root and descriptor secret path,
resolve the descriptor independently of cwd, prove full grant provenance,
expiry, Registry/state-root ref+hash, containment, and non-aliasing before the
first durable transition, and revert/close every later startup failure to the
legal clean state. Add ordered-spy tests for every failure boundary.

### F03 — HIGH — accepted Git authority is never re-observed and grant expiry never closes receive

`[security/immutability] 317d82ec3b76ae22e20ddea25f6d33e6e16c1934:src/runtime/as1-slack-pilot/composition.ts:237-238,326-370,378-443 ↔ 317d82ec3b76ae22e20ddea25f6d33e6e16c1934:src/adapters/gateways/slack-pilot/git-artifact-source.ts:44-57,79-126 ↔ c4b1f5772d4a5094c86cebd949390bdd3115889b:docs/integration/AGENT_OFFICE_AS1_PHASE_B_LIVE_COMPOSITION_DESIGN_DELTA.md:421-422,520-536 — the source can classify post-acceptance change as `DIVERGED`, but the composition never supplies an accepted pair and never schedules the required expiry/divergence gate.`

- `composition.ts:330` stores the accepted receive-grant first-add commit and
  blob hash, but no later `gitSource.observe(...)` call passes that pair. Calls
  at lines 238, 359, 365, 383, and 430 all use pre-acceptance form.
- `git-artifact-source.ts:79-126` returns `DIVERGED` for deletion, dirty state,
  ancestry change, or content change only when `accepted` is supplied. The
  composition therefore treats later change as a fresh `NOT_READY`/`READY`
  observation instead of the required durable latch.
- There is no receive-grant expiry timer or Git poll. Durable store checks stop
  some new work after expiry, but the raw owner/admission state is not closed at
  exclusive expiry as required.

Required closure: bind accepted `(firstAddCommit, blobSha256)` pairs internally,
supply them on every re-observation, latch divergence, and add bounded
grant-expiry/Git polling without renewal, profile switching, or reconnect. Cover
deletion, dirty/unpushed change, committed rewrite, ancestry/path reuse, and
exclusive-expiry races at composition level.

### F04 — HIGH — pointer identity and postcommit recovery do not meet the exact transport contract

`[security/exact-delivery] 317d82ec3b76ae22e20ddea25f6d33e6e16c1934:src/adapters/gateways/slack-pilot/exact-transport.ts:208-314,400-495 ↔ c4b1f5772d4a5094c86cebd949390bdd3115889b:docs/integration/AGENT_OFFICE_AS1_PHASE_B_LIVE_COMPOSITION_DESIGN_DELTA.md:538-582,625-667 — the implementation closes the pointer handle before final identity proof, checks only lease expiry after observations, and deletes an existing buffer without required recovery proof.`

- `pinPointer` returns cached device/inode facts at
  `exact-transport.ts:287` and closes the handle at lines 288-290.
  `assertPinnedIdentityUnchanged` later performs only `lstat` at lines 298-314.
  This is not the retained-descriptor proof and admits unlink/inode-reuse
  ambiguity.
- `clockLive` claims to check both grant and lease but accepts only the lease and
  compares only `lease.expiresAt` at lines 490-495. The later min-expiry
  capability check prevents paste after grant expiry, but observations can
  proceed after expiry instead of failing at each fresh-clock gate.
- After `PREPARED` and authority consumption, `bufferExists` causes an
  unconditional delete at lines 441-447. No journal/recovery fact proves that
  the buffer is permitted unpasted residue.

The focused tests omit the required retained-handle replacement races,
symlink/hardlink/owner/type cases, 32,768/32,769-byte boundaries, missing versus
double LF, recovery-authorized deletion, and expiry-between-observation cases
listed by the design at lines 1662-1678.

Required closure: retain and close the opened pointer handle only after final
precommit identity proof, check both authorities at every observation/boundary,
require explicit durable recovery proof before deletion, and add the complete
adversarial boundary/race matrix.

### F05 — HIGH — process control and lock release are not exactly bounded or proven

`[security/process-incarnation] 317d82ec3b76ae22e20ddea25f6d33e6e16c1934:src/persistence/file-store/writer-lock.ts:637-676,697-720,761-839,881-938,1032-1076 ↔ 317d82ec3b76ae22e20ddea25f6d33e6e16c1934:src/runtime/as1-slack-pilot/cli.ts:129-142 ↔ c4b1f5772d4a5094c86cebd949390bdd3115889b:docs/integration/AGENT_OFFICE_AS1_PHASE_B_LIVE_COMPOSITION_DESIGN_DELTA.md:724-763,1323-1370,1392-1469 — literal identity/inherited-FD execution are correct, but parent deadlines, result decoding, reusable boundary, post-signal proof, and lock-byte release are not.`

- The pre-spawn verifier uses wall-clock `Date.now()` and checks its 1,000 ms
  deadline only inside the hash loop (`writer-lock.ts:637-676`). Realpath,
  lstat/open/fstat, and final lstat can overrun without a last check. The child
  timer is armed only after `spawn` returns at lines 697-720. The 3,000 ms bound
  at lines 829-835 rejects overrun only for a nonzero exit, accepting late
  success.
- `parseBridgeResult` validates only the count of failure-result keys at lines
  806-808. It does not require the third key to be `operation` or its value to
  equal the requested operation or `UNPARSED`.
- Exported `signalOwner(lockPath, operation)` at lines 881-938 accepts a
  caller-selected path, although the reviewed reusable boundary permits none.
  The fixed helper normally rejects another lock, but the TypeScript surface is
  still broader than reviewed.
- `runObserverSignal` returns immediately on bridge `SIGNAL_SENT` at
  `cli.ts:134-142`. It never performs the 10,000 ms exact-lock-removal proof, and
  incident-kill never proves durable kill before reporting. With F01's absent
  owner handlers, required stable stop/incident outcomes are unimplemented.
- Release compares parsed canonical values rather than exact
  canonical-plus-one-LF bytes at `writer-lock.ts:1054-1056` and 1068-1072.
  JSON-equivalent noncanonical tampering can be unlinked as the owned record.

Required closure: use monotonic whole-operation bounds with checks immediately
before spawn and on all completion paths, strictly decode every result key/value,
internalize fixed lock path/operations, implement post-signal lock/durable-state
proofs, compare raw exact lock bytes, and add deterministic inclusive/next-byte,
deadline, schema, replacement, and result tests. Successful signaling to a live
owner remains a later rehearsal gate; absence of rehearsal is not this defect.

### F06 — MEDIUM — Worker proof and owner documentation overstate the implementation

`[evidence/operations] 0668e5e9a9d28e7b004d8f045a80d4f919d2f69d:artifacts/as1-multi-team-slack-pilot/PHASE_B_WORKER_RESULT.md:43-105,181-220 ↔ 317d82ec3b76ae22e20ddea25f6d33e6e16c1934:tests/integration/as1-slack-live-composition.test.ts:184-260 ↔ 317d82ec3b76ae22e20ddea25f6d33e6e16c1934:docs/operations/AGENT_OFFICE_AS1_SLACK_SETUP.md:3-18,183-229,312-357 — totals are accurate, but claimed proofs and operator instructions are not.`

- The “exact startup order” test uses accepting provenance and fake Web/Socket/
  tmux ports. It does not assert provenance-before-transition, exercise the
  production entry, run Foundation against the same common root, populate
  ACK/INTAKE/RESULT evidence, or prove real same-thread outbound.
- Lifecycle tests execute `CAPABILITY_PROBE` and absent-owner failure, but not
  bridge schemas/bounds/deadlines, live owner handlers, post-signal proof, or
  noncanonical lock release. Worker “PROVEN” language at result lines 181-201 is
  broader than source and tests support.
- The setup doc still labels itself Phase A pending at lines 3-18. Section 7
  passes `--env-file` to `stop`, `restart`, and `status` at lines 191-196, which
  the Phase B parser rejects, and describes old live restart at lines 220-227
  while section 10 correctly says restart is disabled.

Required closure: make tests prove repaired load-bearing order and both closed
profiles, narrow proof claims to evidence, and replace/supersede contradictory
Phase A instructions inside the authorized setup document.

## Worker deviations and not-proven limits

1. `POINTER_ARTIFACT_INVALID` mapped to existing
   `AUTHORITY_ARTIFACT_INVALID`: **ACCEPTED**. The required precommit
   `STOPPED_BEFORE_PASTE`, absent journal, unconsumed authority, and zero tmux
   mutation remain representable without changing the frozen enum.
2. Legacy unused tmux interfaces retained for out-of-scope fake compatibility:
   **ACCEPTED**. Phase B uses `As1TmuxObservationPort`; no second production path
   was found.
3. One source commit rather than two: **ACCEPTED**. Candidate is the direct
   child of the reviewed design; later commits contain evidence only.
4. Temporary sibling `node_modules` symlink, removed and never committed:
   **ACCEPTED AS EXECUTION DISCLOSURE**.
5. Signal success deferred to live rehearsal: **REJECTED AS SOURCE-COMPLETENESS
   CLAIM**. No live signal is required now, but missing handlers, post-signal
   proof, deadlines, and strict decoding must close synthetically first.
6. Root-only interpreter replacement not automated: **ACCEPTED ONLY AS A LIVE
   LIMIT**. Deterministic injected tests must still cover parent bounds and
   replacement decisions; current source gaps remain F05.
7. Composition evidence path only reaches `NOT_READY`: **REJECTED AS FULL
   ROUND-TRIP PROOF**. Existing Phase A regressions do not prove new production
   composition wiring or its sequential two-profile path.
8. No real Slack, secret, tmux mutation, owner state, or live rehearsal:
   **ACCEPTED AND PRESERVED**.

## Scope and positive security axes

- **Lineage/file scope — PASS.** Candidate `317d82e` has exact parent
  `c4b1f57`; the source delta is exactly 14 authorized paths (3,354 insertions,
  501 deletions). `0668e5e` and `8610063` add only Worker evidence.
- **Default-disabled descriptor — PASS.** Base and source blob are identical
  (`2716f34dedb93959e95bded699b3714e962561ec`), SHA-256
  `8e3b9985f09b366e046d03392bd60b2157264ec1f2eb4498bfa92e615802f5d7`.
- **Private targeting — PRESERVED EXCEPT F02 ROOT ENFORCEMENT.** Closed Agent
  Office/Foundation profiles, one workspace, Leo singleton, immutable App/
  channel mapping, fixed destination comparisons, and no Worker/Reviewer direct
  dispatch remain present. No Slack field selects Team, Actor, profile, model,
  effort, command, file, pane, PID, or signal. F02 must close before the common
  one-writer/sequential-profile claim is true.
- **Socket quarantine — PASS for the adapter.** One-use arm, no pre-arm parse/
  ACK, one held raw frame, and second-frame latch reproduced.
- **Git/tmux argv — PASS locally.** Git source is fixed-root, shell-free,
  no-fetch, using only `rev-parse`, `status`, `log`, and `cat-file`. Tmux uses
  fixed binary and closed allowlist. F03 is composition misuse, not unsafe Git
  argv.
- **Bridge identity — PASS.** Independent extraction produced exactly 17,983
  bytes, SHA-256
  `557e32a2ab54beea3b3ec8ce1a68bb69a7f3b756db4e3b007d18a452f7a22d75`,
  one terminal LF, zero internal backticks/interpolation openers. The target
  capability probe returned `CAPABILITY_READY` without signaling.
- **Absence audit — PASS.** No package/lockfile/config/Registry/schema/database,
  service/UI/listener, external project, VibeNews, generic shell endpoint,
  rollout, or secret material entered the source delta.

## Reproduced gates and attempt disclosure

| Gate | Independent result |
|---|---|
| Candidate/parent/evidence ancestry; clean/upstream equality | `PASS` |
| Exact 14-path delta; later evidence-only delta | `PASS` |
| `git diff --check c4b1f57..317d82e` | `PASS` |
| Default-disabled descriptor byte identity | `PASS` |
| Read-only typecheck | `PASS` |
| Read-only core build | `PASS`; emitted output discarded/ephemeral |
| ESLint over exact changed paths | final isolated run exit `0`, zero errors; Markdown path warned as unconfigured |
| Focused Vitest with `--maxWorkers=1` | `5/5`, `123/123` `PASS` |
| All 18 AS1 files with `--maxWorkers=1` | `18/18`, `339/339` `PASS` |
| Literal identity and narrow scans | `PASS`; dynamic scan surfaced F02/F05 |

Attempt history is material evidence, not hidden:

- Candidate has no `node_modules`. A direct typecheck first failed only on
  missing `node`/`vitest` type roots. A custom read-only TypeScript compiler API
  dependency redirect then passed typecheck and an in-memory discarded build.
- An isolated dependency namespace was also attempted before the Advisor's
  stop-workaround instruction. Its first run named nonexistent `/usr/bin/npm`
  and exited 127; corrected NVM npm runs passed exact `npm run typecheck` and
  `npm run build:core` in ephemeral tmpfs.
- Two preliminary ESLint attempts were rejected as evidence: one from the
  sibling root ignored candidate paths; one from candidate cwd without local
  module resolution emitted 1,958 dependency/type-resolution errors. The final
  isolated byte-matched run exited 0 with only the Markdown-ignore warning.
- The first focused Vitest run in the restricted Reviewer namespace produced
  `121/123`: only two real capability tests failed because the namespace maps
  root-owned `/usr/bin/python3.14` to UID/GID `nobody`. The unchanged suite was
  rerun on the target outside that ownership remap and passed `123/123`; the
  18-file run then passed `339/339`.

No dependency install, network call, Slack connection, secret read, owner-state
access, tmux mutation/input, live process signal, listener, pilot start, or
product/governance worktree mutation occurred during a gate.

## Provenance and authority entry

- Governance handoff/run-prompt commit:
  `e2d9e9e494326e1cbbe1a152d6806b0532e5169f`
- Handoff / run-prompt SHA-256:
  `96c3da3ac081f557cc1a174dee4438691944ce48222cf16b9cd608db160164c0` /
  `3a3fd77e6fb9aa47fbc5860eeb56ae80351a4eee8ef114fc46f56dfa46ce2a02`
- Reviewed design/source parent:
  `c4b1f5772d4a5094c86cebd949390bdd3115889b`
- Frozen source candidate:
  `317d82ec3b76ae22e20ddea25f6d33e6e16c1934`
- Worker result / evidence HEAD:
  `0668e5e9a9d28e7b004d8f045a80d4f919d2f69d` /
  `86100634daacba444ae78f59d93de1ce7c213ff1`
- Design SHA-256:
  `ef8647588c905362d53131ef17bff4271991e259d09a4f0bc41f7d412f3553bc`
- Worker result / pointer SHA-256:
  `68b61667d729fd4125d15842bb10d3eac65494e5e5051a6ef8d319fe8d25843e` /
  `aab5190ef92257fe192133082026b87aa41bd645a6e63e31d8b1e880d44b84e9`
- Actor/session/runtime: Agent Office Independent SOL Sentinel Reviewer /
  `agent-office-reviewer` / `@28/%28`, GPT-5.6 SOL max; delegation none.
- Required `fable-sentinel` SHA-256:
  `429aa2397e917e89e7b8770c3a22bf26a60d1337401760db3010fbcaa3b489d7`

At entry and before output, product was clean with
`HEAD == upstream == 86100634daacba444ae78f59d93de1ce7c213ff1` and governance
was clean with
`HEAD == upstream == e2d9e9e494326e1cbbe1a152d6806b0532e5169f`, both `0/0`.
Current role authority, exact handoff, and required skill agree on read-only
candidate review, two uncommitted governance outputs, return to Advisor, and
STOP.

## Patch return and stop

RETURN_TO: `agent-office-advisor`

NEXT_REQUIRED_ACTION: Advisor returns F01-F06 to the same `agent-office-opus`
Worker for one coherent patch confined to the exact existing 14 paths. The
patch must add adversarial tests that fail on this candidate and pass on repair.
The same `agent-office-reviewer` then performs source-first delta review and
reruns bounded gates. No finding is converted to accepted risk.

STOP
