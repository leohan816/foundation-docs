# AS1 Phase B Independent Sentinel Design Delta Review Result

## Verdict

`NEEDS_PATCH`

The exact three-file candidate delta is provenance-clean, preserves the private
Leo-only boundary, and keeps the implementation map at exactly 14 paths. F01
and F04 are closed. F02 is partial, F03 contains a new HIGH regression, and F05
is partial. The remaining defects are still document-level and can potentially
be corrected inside the same three design artifacts and existing 14-path map;
they cannot be accepted as residual risk or left for the Worker to interpret.

No implementation, owner setup, Slack connection, tmux input, or live pilot is
authorized by this result.

## Original-finding disposition

### F01 — CLOSED — frozen authority is now separate from live actionability

`[closed/contract] b84393ecfa2989b5e832f7dfc32a823ccda7126f:49_PHASE_B_DESIGN_REVIEW_RESULT.md:16-41 ↔ 7ed79bbfd7deea0f8458a3965734ebd1de98eb35:docs/integration/AGENT_OFFICE_AS1_PHASE_B_LIVE_COMPOSITION_DESIGN_DELTA.md:310-343,497-507,625-628,904-909 — frozen S0 is copied receive grant -> delivery grant -> capability/facts while current live S1 remains non-serializable and construction-bound — the prior S0 != S1 evidence-quarantine failure no longer occurs, and false live control stops the next delivery boundary without weakening evidence equality.`

The patch explicitly forbids recomputing either frozen control/latch hash from
the later live record, adds no durable field or schema, and makes the fresh live
predicate a separate acceptance/per-side-effect gate. The focused composition
test now requires distinct frozen/live records and unchanged
`buildEvidenceAuthority` equality, plus DRAINING/kill/latch rejection.

Disposition: `CLOSED`. No F01 residual risk is accepted.

### F02 — PARTIAL / F02-D1 HIGH — the pinned-byte mechanism is present, but the exact artifact encoding and mode contract still drift

`[contract] 7ed79bbfd7deea0f8458a3965734ebd1de98eb35:docs/integration/AGENT_OFFICE_AS1_PHASE_B_LIVE_COMPOSITION_DESIGN_DELTA.md:528-555,878-882 ↔ 0dfb4398be2ecd9295b35a94e3b461e25dad6f7c:src/persistence/file-store/artifact-store.ts:34-60,114-159 and src/persistence/file-store/path-safety.ts:8-9 — the detailed patch accepts “exact canonical JSON bytes” and forbids only group/other write, while Phase A stores and hashes canonicalBytes(value) + one LF at mode 0600 and its reader requires (mode & 077) == 0 — an implementation can reject every valid stored pointer by comparing against newline-free canonicalBytes, or accept a 0644/0640 leaf that contradicts the patch's own “owner-only” validation gate.`

The core F02 repair is real: the path is construction-bound, parents and leaf
are checked, the leaf is opened once with no-follow, the bytes are pinned and
raw-hashed before commitment, a final inode/path identity check handles
replacement, and tmux loads only pinned stdin bytes without reopening the path.
Pre-commit failures leave no journal, consumption, or tmux mutation.

The remaining representation contract is not exact enough for implementation:

- `ImmutableArtifactStore.putScopedCanonicalJson` persists
  `Buffer.concat([canonicalBytes(value), LF])` and computes the receipt/filename
  hash over those raw bytes. `canonicalBytes(value)` alone is a different byte
  string and hash.
- the normative F02 procedure requires only “no group/other write permission,”
  whereas the later validation gate says “owner-only” and the existing reader
  rejects every group/other permission bit. Those are different accepted mode
  sets.
- the patch names the one-megabyte durable-file ceiling, while the actual scoped
  pointer writer uses a 32-KiB default. A larger valid-looking leaf cannot have
  been emitted by the unchanged pointer writer.

Required closure:

1. State the exact accepted raw artifact formula:
   `Buffer.concat([canonicalBytes(strictlyParsedPointer), Buffer.from("\n")])`.
   Require the on-disk bytes to equal that formula byte-for-byte and require
   `grant.pointerHash` and the content-addressed filename digest to equal the
   SHA-256 of those same raw bytes.
2. Use the unchanged scoped-pointer writer's 32-KiB ceiling and the existing
   private-file mode rule `(mode & 0o077) === 0` (or an explicitly stronger
   exact mode). Do not leave “owner-only” and “non-owner non-writable” as two
   competing contracts.
3. Add exact focused cases for the one required terminal LF, missing/double LF,
   noncanonical-but-JSON-equivalent bytes, content-address filename mismatch,
   group/other read permission, and the actual scoped-writer size boundary.
4. Preserve the already-correct no-reopen/pinned-stdin and zero-precommit-side-
   effect rules.

Disposition: `PARTIAL`; F02 is not closed.

### F03 — REGRESSION / F03-R1 HIGH — both complete preflights now occur before commitment, leaving no fresh destination proof before paste

`[regression/security] 3d359639c4d819f1c601481245daa81d5de9d5fc:docs/integration/AGENT_OFFICE_AS1_PHASE_B_LIVE_COMPOSITION_DESIGN_DELTA.md:476-482 and 0dfb4398be2ecd9295b35a94e3b461e25dad6f7c:src/adapters/gateways/slack-pilot/exact-transport.ts:272-302 ↔ 7ed79bbfd7deea0f8458a3965734ebd1de98eb35:docs/integration/AGENT_OFFICE_AS1_PHASE_B_LIVE_COMPOSITION_DESIGN_DELTA.md:573-596,600-623 — the reviewed sequence had its second live destination preflight after BUFFER_LOADED and immediately before paste; the patch performs both preflights adjacently before PREPARED/consumption/buffer work and performs only static capability-expiry plus live-control checks afterward — the leased pane can keep the same pane ID but change PID/currentCommand/mode/activity after both preflights and receive the pointer without any post-change destination observation.`

The patch successfully closes the original F03 field/profile gaps: the selected
profile now binds session/workspace/command, all 15 destination fields are
required by exact-key decoding, both precommit observations compare the full
field set, and wrong-profile/omitted/additional/between-observation divergence
rejects before `PREPARED` with authority unconsumed.

However, moving both observations ahead of commitment removes a load-bearing
Phase A safety boundary. After the second observation, the patch still records
`PREPARED`, consumes authority, inspects/deletes/loads the tmux buffer, and
records `BUFFER_LOADED` before paste. `As1DeliveryCapability` stores only the
lease destination, and `assertCapabilityUsable` checks only expiry
(`exact-authority.ts:417-438,458-496`); the live control predicate does not
reobserve tmux. A pane process can therefore exit or change command during that
interval and the fixed pane ID can receive a wrong live side effect.

Required closure:

1. Retain the two complete precommit observations required by the delta handoff,
   then add one final complete exact-key/all-15-field destination revalidation
   after buffer load and immediately before `PASTE_STARTED`/paste. It must use
   the same construction-derived pane query and selected-profile equalities.
2. If that final revalidation diverges after `PREPARED`/consumption, record the
   existing manual-reconciliation terminal state and perform no paste/Enter.
   Do not falsely describe a postcommit divergence as a precommit clean reject.
3. Extend the focused test with a target change after the second precommit
   observation and during/after buffer load; prove no paste or Enter. Keep the
   existing no-retry boundary and private-buffer cleanup rule.
4. Update every “two preflights” claim and live rehearsal gate so the
   implementation has one unambiguous sequence. This correction needs no new
   path, schema, generic tmux operation, or Exact Delivery v2 change.

Disposition: `REGRESSION`; F03 is not closed.

### F04 — CLOSED AS A CONTRACT — the incident-kill action is now executable and distinct from clean stop

`[closed/contract] b84393ecfa2989b5e832f7dfc32a823ccda7126f:49_PHASE_B_DESIGN_REVIEW_RESULT.md:97-118 ↔ 7ed79bbfd7deea0f8458a3965734ebd1de98eb35:docs/integration/AGENT_OFFICE_AS1_PHASE_B_LIVE_COMPOSITION_DESIGN_DELTA.md:664-774,973-990 — zero-operand incident-kill sends only fixed SIGUSR2 after owner proof, closes admission before persisting the irreversible fixed-reason global kill, preserves DISABLED_LATCHED, returns bounded redacted codes, and shuts down only after persistence; clean stop remains fixed SIGTERM/DRAINING/DISABLED_CLEAN and neither route resets state — the prior runbook action with no operator path is removed.`

The parser accepts no PID, signal, profile, state root, destination, path, or
free-form reason for incident kill. The handler is installed before later side
effects; durable kill wins over a concurrent clean drain; persistence failure
never reports success; rollback now invokes the exact action and handles stable
failed-closed results.

Disposition: `CLOSED AS A CONTRACT`. Actual safe signaling remains blocked by
F05-D1; that dependency does not reopen the F04 action/lifecycle definition.

### F05 — PARTIAL / F05-D1 HIGH — the two observations are detailed, but neither the time proof nor numeric-PID signal handoff proves the exact incarnation

`[contract/security] 7ed79bbfd7deea0f8458a3965734ebd1de98eb35:docs/integration/AGENT_OFFICE_AS1_PHASE_B_LIVE_COMPOSITION_DESIGN_DELTA.md:674-711,721-726 ↔ 0dfb4398be2ecd9295b35a94e3b461e25dad6f7c:src/operations/readiness/as1-slack-control.ts:145-152 and src/persistence/file-store/writer-lock.ts:45-71 — the patch derives process birth from integer-second /proc/stat btime plus 100-Hz start ticks, rejects timestamp-resolution uncertainty, then signals a numeric PID after the second observation; the unchanged writer stamps acquiredAt immediately before lock creation — a normal fast owner can remain permanently “ambiguous” because birth and acquisition fall inside the boot-time uncertainty window, while an owner that exits after the second observation can still have its numeric PID reused before kill(2), retargeting the fixed signal.`

The patch closes substantial parts of F05: it preserves writer-lock v1 bytes,
requires no-follow/private/one-link lock inspection, checks boot/build/root,
process start ticks, all UIDs, executable device/inode, exact argv/entry, and
reopens both lock and process facts for an identical second observation. Missing,
changed, stale, or reused facts observed at either read send no signal.

Two implementation-readiness gaps remain:

1. `/proc/stat` exposes `btime` as an integer second (confirmed on the target
   host), while `_SC_CLK_TCK` is 100. The design requires uncertainty rejection
   but does not define a bounded conversion interval or guarantee that a valid
   process predates lock acquisition by more than that interval. Phase A calls
   `clock.now()` immediately before O_EXCL lock creation. A valid fast startup
   can therefore never satisfy the proposed strict proof, making both manual
   stop and incident kill unavailable.
2. Two `/proc` observations followed by `process.kill(pid, fixedSignal)` are not
   one process-incarnation operation. The process may exit and be reaped after
   the second read but before the signal syscall; the kernel can then assign the
   number to another process. “Same synchronous operation” does not bind the
   signal to the observed incarnation.

Required closure:

1. Define an exact time/uncertainty formula and a startup invariant that makes a
   legitimate owner provable for every allowed run, including fast acquisition.
   Do not silently treat integer `btime` as subsecond-exact while also claiming
   resolution uncertainty is rejected.
2. Name an incarnation-stable observation-and-signal primitive, or another
   exact mechanism that cannot retarget after verification, and show that it is
   available inside the existing writer-lock/CLI paths with no package, generic
   command, listener, new durable schema, or fifteenth path. A numeric PID alone
   is insufficient for the stated no-wrong-process guarantee.
3. Add focused tests for a valid owner whose birth and acquisition are inside
   the coarse-time window, and for exit/reap/PID reuse after the second
   observation but before signaling, in addition to the already-listed races.
4. If the exact primitive cannot be supplied inside the 14-path/no-schema lock,
   return `HOLD` through the Advisor under the handoff's escalation trigger.

Disposition: `PARTIAL`; F05 is not closed.

## Required delta-review summary

| Original finding | Status | Independent result |
|---|---|---|
| F01 frozen authority/live control | `CLOSED` | Frozen evidence hashes and live predicate are separate; unchanged equality is testable. |
| F02 exact pointer bytes | `PARTIAL` | Pin/no-reopen/stdin safety is present; exact stored encoding, digest filename, mode, and size contract still drift. |
| F03 destination/profile binding | `REGRESSION` | Full profile/all-field precommit comparison is present, but the patch removes the fresh pre-paste destination check. |
| F04 executable incident kill | `CLOSED_AS_CONTRACT` | Closed zero-operand SIGUSR2 durable-kill action is specified; safe owner signaling remains dependent on F05. |
| F05 exact process ownership | `PARTIAL` | Two observations are strong, but coarse-time proof can reject the real owner and numeric-PID signaling retains a final reuse race. |

Aggregate: `NOT_CLOSED/REGRESSION >= 1`; by the required delta-review protocol,
the design remains `NEEDS_PATCH`.

## Scope and private-pilot locks

- **Exact implementation map — PASS.** The map contains exactly 14 named paths.
  `exact-authority.ts` is not added. F02-D1, F03-R1, and F05-D1 can be described
  in the already-listed exact-transport and writer-lock/lifecycle paths unless
  the required process-incarnation primitive proves otherwise.
- **Private scope — PASS.** One configured workspace, Leo only, two fixed Apps/
  channels/profiles, one manually started foreground profile at a time, and one
  root-to-result round trip per channel in strict sequence remain explicit.
- **Absence audit — PASS.** No DB/Registry/schema, framework, systemd/service,
  UI/admin/HA, VibeNews, external product change, simultaneous profiles,
  multi-user/workspace rollout, package/lockfile change, generic command, or
  broad enterprise test program enters the design delta.
- **Unaffected prior gates — PRESERVED.** Per delta-review scope, prior accepted
  Socket quarantine, Git provenance, same-thread evidence/outbox, profile state
  containment, and sequential operator procedure were not reopened. No changed
  text regressed those axes.

## Provenance and reviewed artifacts

- Mission: `AGENT_OFFICE_AS1_MULTI_TEAM_SLACK_PILOT_001`
- Review pass: `DESIGN_REVIEW` / `PHASE_B_SECURITY_TRANSPORT_DESIGN_DELTA_REVIEW`
- Governance handoff commit:
  `a80cd6bbb6d4f5aee3a4aafb8ff5f74b6ec4e6d8`
- Handoff SHA-256:
  `625c270f6e414a4a955188a0e5af207b5cd8599429b81e2e9cd364e1f09fe335`
- Original review result commit:
  `b84393ecfa2989b5e832f7dfc32a823ccda7126f`
- Original result SHA-256:
  `5b195c9aaab3e8d884757989e2675674bb8678072cb89bf55c6ac8a79ba9e8f7`
- Designer patch authority:
  `ab0e4123a4faeb3e3abc7472542d2a2e92389435`
- Patch-handoff SHA-256:
  `3e2cacf7c4aca689f8296fec8c75c332c78f3ae7fd3f29e349c177323d7dee78`
- Previously reviewed design:
  `3d359639c4d819f1c601481245daa81d5de9d5fc`
- Exact patched candidate:
  `7ed79bbfd7deea0f8458a3965734ebd1de98eb35`
- Patched design SHA-256:
  `339b31114e7c11ed43817b6d373ebf793cb1a76a8926363bf1d70c7fb029e6e4`
- Designer result SHA-256:
  `e97b40b62050fcc73a5e5989b4d57a75b4d9b601e843735cf8198c4b9e9aa1ae`
- Designer pointer SHA-256:
  `13fc5bbdd823babfdaafe0c787faea44b923d8fb502f6ad549179f6e7519901b`

The candidate directly descends from the reviewed design. The exact delta
modifies only the design, Designer result, and Designer pointer: 472 insertions
and 146 deletions. No source, test, configuration, package, lockfile, or live
state changed. `git diff --check` passed. At review completion the candidate was
clean and `HEAD == upstream == 7ed79bbfd7deea0f8458a3965734ebd1de98eb35`.
The governance branch was clean/upstream-equal before these two authorized
uncommitted outputs; the original result and patch authority are ancestors of
the exact handoff commit.

## Authority, skill, and runtime entry

- Actor/session: Agent Office Independent SOL Sentinel Reviewer /
  `agent-office-reviewer`
- Live binding: `$28/@28/%28`, pane PID `2381134`, workspace
  `/home/leo/Project/agent-office`, pane live, input on, synchronized panes off
- Direct child: `codex -m gpt-5.6-sol -c model_reasoning_effort=max
  --no-alt-screen`; no delegated context
- Required `fable-sentinel` skill SHA-256:
  `429aa2397e917e89e7b8770c3a22bf26a60d1337401760db3010fbcaa3b489d7`
- Required reference hashes:
  - `contract-review.md`:
    `344ac717c4279ce0f98914babac5e26c32700827bb545e8dd24182bb3e0d16f1`
  - `provenance-review.md`:
    `d655a42de1fe2e1a2284766abefb33182a5d9234d21da6f75c2110a1c98023fe`
  - `review-classification.md`:
    `23f8a56c59f2a32f076998bad81ab59c85279b38f1f7b9275c5bcd9e9ab0759e`
  - `delta-review.md`:
    `31965d290395f16ca64939d1d755d587ed460ff828586538eafa58fa8de70749`
- Current Reviewer authority hashes:
  - `AGENTS.md`:
    `df680fcee5f22c66c9ff56d15017d720dd547350bd5a5a7a29377759ac21b79e`
  - `CLAUDE.md`:
    `bba0b496f0305d28d66712e82b4f77aac9394693b05938668f9525b2d8871043`
  - `TEAM_OPERATING_MODEL.md`:
    `810d1884a90e3351097350e5d77e568e2aab6f544188d73ae44b4ee5d79efe17`
  - `roles/reviewer.md`:
    `40fd0a0530e5270997fe24a080823555a37b9f630f623f61eeda5e1625f78188`

The skill-linked V2 role boundary was read directly and identifies itself as
`SUPERSEDED_HISTORICAL_EVIDENCE`; current Agent Office operating/Reviewer docs
and the exact committed handoff control. They agree on reviewer independence,
candidate read-only operation, exactly two uncommitted governance outputs,
return to Advisor, and stop. No authority conflict was found.

## Independent checks and execution disclosure

- Read the exact committed handoff, complete original F01-F05 result, complete
  patch authority, complete patched design, exact before/after diff, Designer
  result/pointer, and only the Phase A source/contracts needed for closure.
- Reproduced candidate ancestry, exact three-path delta, hashes, clean/upstream
  equality, 14-row map count, and whitespace check.
- Traced frozen control hashes through the unchanged evidence equality; traced
  pointer bytes from `putScopedCanonicalJson` through raw receipt hashing;
  traced destination observations through capability creation, buffer load, and
  paste; traced writer-lock acquisition metadata into the proposed process proof.
- Target-host read-only `/proc/stat` and `getconf CLK_TCK` checks confirmed
  integer `btime` and 100-Hz process ticks. No process was signaled.

No product test, typecheck, build, dependency install, candidate write, secret or
environment-value access, network/fetch, Slack call, tmux input/mutation, live
process start, state-root write, broad suite, or external-system action was
performed. This is a design-only delta review based on immutable static
contracts; implementation tests remain a later Worker/reviewer gate.

## Conflicts, residual risk, and excluded scope

No provenance, branch, actor, or governing-authority conflict exists. F02-D1,
F03-R1, and F05-D1 are unresolved implementation-readiness/security defects;
none is accepted, deferred to live rehearsal, or reclassified as risk. The
Designer result's claim that every F01-F05 item is closed is therefore not
supported by the actual design/source comparison.

Candidate patching, implementation, secrets, owner state, Slack, tmux input,
runtime activation, staging/commit/push, risk acceptance, final approval, merge,
release, and next-mission selection were excluded and not performed.

## Routing and stop

RETURN_TO: `agent-office-advisor`

NEXT_REQUIRED_ACTION: Advisor-routed narrow Designer delta closing F02-D1,
F03-R1, and F05-D1, followed by exact same-Reviewer delta re-review. If exact
incarnation-safe signaling cannot remain inside the unchanged-schema 14-path
boundary, apply the handoff escalation trigger rather than broadening scope.
No Worker or live phase is authorized.

STOP
