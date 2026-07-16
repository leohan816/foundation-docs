# AS1 Phase B Independent Sentinel Design Review Result

## Verdict

`NEEDS_PATCH`

The candidate is provenance-clean and remains within the private Leo-only pilot
boundary, but five concrete design-to-contract defects prevent implementation.
All five are narrow, document-level defects that can be removed without a new
schema, Registry change, database, framework, product expansion, or second
authority/transport model. This verdict returns to the same Designer. It does
not authorize implementation or live operation.

## Findings

### F01 — HIGH — the fresh delivery control hash cannot satisfy the unchanged evidence contract

`[contract] 3d359639c4d819f1c601481245daa81d5de9d5fc:docs/integration/AGENT_OFFICE_AS1_PHASE_B_LIVE_COMPOSITION_DESIGN_DELTA.md:285-292,320-347 ↔ 0dfb4398be2ecd9295b35a94e3b461e25dad6f7c:src/operations/readiness/as1-slack-control.ts:48-55,85-92,293-318 and src/application/slack-pilot/evidence-ingress.ts:577-589 — receive S0 is frozen before the first transition while delivery S1 is freshly hashed after state/slug/updatedAt mutations, but the evidence builder requires S0 == S1 — the first successful live delivery is quarantined when evidence authority is built, so no root-to-result round trip can complete.`

The design freezes the receive-grant control snapshot before its first live
transition, then requires a fresh control-record hash immediately before
delivery acceptance. The actual control transition changes `state`,
`activeProfileSlug`, and `updatedAt`. The unchanged evidence contract requires
the receive grant, pointer-delivery grant, and delivery facts to carry one equal
`globalControlSnapshotHash`. Those requirements are mutually incompatible once
startup reaches `RECEIVING_ONE_PROFILE`.

Required closure:

1. Keep the receive-grant's frozen `globalControlSnapshotHash` in the
   pointer-delivery grant and delivery facts, as the existing schema requires.
2. Separately require the construction-bound live control/latch predicate or a
   stable live projection immediately before grant acceptance and every delivery
   side effect. Do not encode that changing live fact in the frozen authority
   field.
3. Add a focused test that starts from distinct pre-transition and live control
   records, proves current control is actionable, and completes unchanged
   `buildEvidenceAuthority` without weakening any equality.
4. If the Designer instead concludes that a second durable snapshot field is
   necessary, stop: that is the handoff's material schema/authority-redesign
   escalation trigger rather than a Phase B implementation detail.

### F02 — HIGH — the unchanged transport never proves the bytes loaded into tmux equal the granted pointer hash

`[security] 3d359639c4d819f1c601481245daa81d5de9d5fc:docs/integration/AGENT_OFFICE_AS1_PHASE_B_LIVE_COMPOSITION_DESIGN_DELTA.md:80-84,445-480 ↔ 0dfb4398be2ecd9295b35a94e3b461e25dad6f7c:src/adapters/gateways/slack-pilot/exact-transport.ts:50-58,94-100,137-155,189-200,272-283 and src/adapters/gateways/slack-pilot/authority-provenance.ts:163-192 — the grant contains G = pointerHash, but the port receives only a file path and no code computes H(actual loaded bytes) == G; the provenance gate verifies the grant artifact, not the local pointer bytes — a replaced, corrupted, symlinked, or path-swapped pointer file can load different bytes P into the leased pane while the reviewed grant for G passes.`

`assertDeliveryChainConsistent(grant, lease, grant.pointerHash, ...)` only echoes
the grant's own hash into the consistency check. `GitAs1DeliveryProvenanceGate`
proves the committed pointer-delivery-grant artifact. The transport then passes
the derived path directly to `loadBuffer`; it neither opens the pointer with
no-follow semantics nor hashes and pins its bytes. Calling this transport
"unchanged" therefore cannot establish the candidate's promised exact-pointer
property.

Required closure:

1. Change the already-listed AS1 exact-transport path narrowly: boundedly open
   the contained pointer with no-follow/type/ownership checks, validate its exact
   pointer grammar and correlations, and compare the bytes to
   `grant.pointerHash` before authority consumption or any tmux mutation.
2. Load the verified bytes themselves through a closed stdin/private-buffer
   operation, or provide an equivalent race-free proof. Do not re-open the path
   after verification.
3. Keep the buffer name, target, argv, and source path construction-bound; do not
   add a caller file or generic tmux operation.
4. Extend the focused exact-transport test for hash mismatch, symlink/non-regular
   input, and verify-to-load path replacement. The tests must prove zero tmux
   mutation and unconsumed authority on pre-mutation rejection.

### F03 — HIGH — “every lease field” and cross-profile destination binding are not provided by the reused transport

`[security] 3d359639c4d819f1c601481245daa81d5de9d5fc:docs/integration/AGENT_OFFICE_AS1_PHASE_B_LIVE_COMPOSITION_DESIGN_DELTA.md:73-84,462-481 ↔ 0dfb4398be2ecd9295b35a94e3b461e25dad6f7c:src/adapters/gateways/slack-pilot/exact-authority.ts:185-201,242-261,316-364; src/adapters/gateways/slack-pilot/exact-transport.ts:36-48,142-155,218-234; src/application/slack-pilot/profiles.ts:29-45,48-88 — lease fields sessionName/windowName/windowIndex/paneIndex/activityTime are absent from live preflight comparison, and lease destination sessionName/workspace/currentCommand is not required to equal the selected static profile — a Foundation-labelled grant/lease can authorize Agent Office destination facts, or omitted destination facts can diverge, while both existing preflights accept their subset.`

The lease parser validates Team/Actor/role lineage for `profileId`, but it does
not bind the lease destination to that profile's immutable session, workspace,
and command. The reused preflight interface and comparator also omit five fields
from the parsed destination. Pane/session/window IDs reduce accidental ambiguity,
but they do not repair the explicit cross-profile contract or make the claim
"against every lease field" true.

Required closure:

1. Specify one exact destination invariant: the lease destination's immutable
   session/workspace/command fields must equal the selected closed profile before
   capability creation.
2. Enumerate which destination fields are authority metadata and which are live
   facts. Every security-relevant live fact must be returned by both preflights
   and compared with defined freshness semantics; do not claim all fields if a
   field such as activity time is intentionally evaluated by a different rule.
3. Keep the destination construction-bound and reject any cross-profile lease
   before `PREPARED`. The existing composition and exact-transport paths can
   carry this correction; if the Designer chooses to place the invariant in
   `exact-authority.ts`, it must be named as the load-bearing fifteenth path.
4. Add wrong-profile destination, omitted-field divergence, and two-preflight
   change cases to the focused tests.

### F04 — HIGH — the required durable global-kill rollback action has no operator path

`[contract] 3d359639c4d819f1c601481245daa81d5de9d5fc:docs/integration/AGENT_OFFICE_AS1_PHASE_B_LIVE_COMPOSITION_DESIGN_DELTA.md:523-568,736-751 ↔ 0dfb4398be2ecd9295b35a94e3b461e25dad6f7c:src/runtime/as1-slack-pilot/cli.ts:19-20,61-93 and src/operations/readiness/as1-slack-control.ts:275-289 — live rollback step 1 requires “engage durable global kill,” but the only verbs are start/stop/restart/status/redacted-check and the kill method is not exposed to an operator — during a live incident Leo cannot perform the mandated first admission-closing action before revocation and audit.`

The design retains the existing closed CLI grammar, installs only SIGINT and
SIGTERM shutdown handlers, and defines `stop` as clean drain. Automatic
contradiction paths may call `engageGlobalKill`, but that does not make the
operator rollback procedure implementable.

Required closure:

1. Define one closed, lock-bound, fixed-action operator kill path, including its
   exact verb or fixed signal, ownership proof, durable kill-before-new-side-
   effect ordering, stable redacted result codes, and bounded process shutdown.
   It must accept no caller PID, signal, profile, path, or reason text.
2. Alternatively, if manual global kill is intentionally out of scope, remove
   the impossible rollback step and make the actual clean-stop/automatic-kill
   division explicit. Criterion 10 still requires global kill and rollback to be
   coherent, so an automatic-only choice must identify every trigger and the
   operator's exact incident action.
3. Extend the focused lifecycle test for the selected behavior and prove no
   generic command or reset surface is introduced.

### F05 — HIGH — the manual stop proof can signal a reused PID that never owned the lock

`[security] 3d359639c4d819f1c601481245daa81d5de9d5fc:docs/integration/AGENT_OFFICE_AS1_PHASE_B_LIVE_COMPOSITION_DESIGN_DELTA.md:532-538,671-676 ↔ 0dfb4398be2ecd9295b35a94e3b461e25dad6f7c:src/persistence/file-store/writer-lock.ts:19-27,45-61 and src/runtime/as1-slack-pilot/cli.ts:19-52 — the v1 lock binds pid/bootId/buildId/stateRootId/acquiredAt/token but no OS process-birth identity, while the proposed observer proves only current same-boot/same-UID/live/exact-CLI facts — after an AS1 crash leaves a stale lock and the PID is reused by a matching same-UID command, `stop` can send SIGTERM to a non-owner process.`

The exact CLI-entry check is useful but does not prove that the live process is
the process that created the lock. PID reuse remains possible within one boot,
including reuse by a later AS1 invocation with the same entry point.

Required closure:

1. Without widening caller input, bind the observation to OS process birth
   (for example, a boot-relative `/proc/<pid>/stat` start time and executable
   identity) and prove it is consistent with the lock acquisition. Re-read the
   lock and process facts immediately before the one fixed SIGTERM.
2. If any ownership fact is missing, races, or cannot be reconciled, fail closed
   with a stable stale/ambiguous-lock status and send no signal. Stale-lock
   recovery remains separately authorized and must not be implicit in `stop`.
3. Preserve `agent-office.writer-lock.v1`; if process ownership cannot be proven
   without a schema change, escalate rather than silently weakening the stop
   contract.
4. Add PID-reuse, process-exit/reuse between observations, wrong executable,
   wrong UID, wrong boot, and successful exact-owner cases to the focused
   lifecycle test.

## Required review-order disposition

1. **Candidate provenance and three-path design-only diff — PASS.** Base
   `0dfb4398be2ecd9295b35a94e3b461e25dad6f7c` to candidate
   `3d359639c4d819f1c601481245daa81d5de9d5fc` adds exactly the design, Designer
   result, and pointer (1,204 insertions); no source, config, package, lockfile,
   or hidden path changed. `git diff --check` passed.
2. **Smallest coherent implementation map — NEEDS_PATCH.** Fourteen paths are
   bounded and no retained path is gratuitous, but the exact-transport and
   lifecycle descriptions omit F02-F05. The existing fourteen paths can carry
   the corrections if profile-destination binding lives in composition; an
   explicit `exact-authority.ts` correction would be a justified fifteenth path
   and remains within the committed `<=15` scope lock.
3. **Compose Phase A rather than create a second model — PASS WITH PATCH
   DEPENDENCIES.** The selected module set is coherent. F01-F03 require honest
   alignment with the existing contracts, not a second authority/storage/
   workflow/transport model.
4. **Fixed workspace/user/App/channel/profile identity — PASS.** The design binds
   one workspace, the Leo singleton, two fixed Apps/channels, and one grant-
   selected closed profile. No CLI, environment, Slack input, or fallback is a
   profile/destination selector. F03 must close destination-to-profile equality.
5. **Web identity and authenticated Socket quarantine — PASS at design level.**
   Exact Web proofs precede one Socket; `hello` stays in authenticated quarantine;
   durable `RECEIVING_ONE_PROFILE` and one-use arm precede parsing/ACK/intake.
6. **Fixed-path Git observation — PASS at design level.** The source is fixed-
   root, read-only, shell-free, bounded, non-fetching, unique-first-addition,
   exact-blob, pushed-ancestral, and latches accepted-artifact divergence.
7. **Exact post-intake delivery — NEEDS_PATCH.** Grant/lease/capability one-use,
   two preflights, no retry, and closed argv are present, but F02 and F03 leave
   the actual pointer bytes and full/profile-correct destination unproved.
8. **Immutable evidence-only same-thread outbound — CONTRACT PASS, COMPLETION
   BLOCKED.** The origin, stage order, same-thread projection, and sensitive-data
   exclusions are narrow. F01 makes the unchanged evidence authority reject the
   otherwise successful delivery.
9. **Profile containment and common writer lock — PASS.** The common root lock,
   non-aliasing profile roots, separate records/indexes, and no cross-profile
   reuse are explicit. F03 remains the destination-edge exception.
10. **Foreground lifecycle, stop, drain, kill, rollback, ambiguity — NEEDS_PATCH.**
    Drain and no-retry ambiguity are coherent; F04 leaves the documented global
    kill unavailable, and F05 leaves stop ownership ambiguous under PID reuse.
11. **Focused tests — NEEDS_PATCH.** The proposed suite is proportionate and
    avoids broad matrices/frameworks, but its assertions must cover the exact
    F01-F05 closure cases above. No new test framework or unrelated full suite is
    warranted.
12. **Owner instruction and sequential live procedure — PASS at design level.**
    The missing state-root instruction, one-round-trip sequence, stop/audit
    boundary, live gates, rollback token order, and unset owner facts are
    directly actionable after F01-F05 are closed and implementation is reviewed.

## Explicit absence audit

`PASS`. The active design introduces no framework, Registry/schema/database,
systemd/permanent service, UI/admin plane, HA, external product change,
simultaneous profiles, multi-user/multi-workspace rollout, package/lockfile
change, or unrelated exhaustive test program. The required corrections do not
need any of those additions.

## Review coordinates and provenance

- Mission: `AGENT_OFFICE_AS1_MULTI_TEAM_SLACK_PILOT_001`
- Review pass: `PHASE_B_SECURITY_TRANSPORT_DESIGN_REVIEW`
- Actor/session: Agent Office Independent SOL Sentinel Reviewer /
  `agent-office-reviewer`
- Runtime binding observed: `$28/@28/%28`; direct Codex child used
  `gpt-5.6-sol` with `model_reasoning_effort=max`; workspace
  `/home/leo/Project/agent-office`; no delegated context
- Governance authority commit: `5e8da2f`
- Exact run-prompt SHA-256:
  `4c9de8dea9bef18005a9344ddd89f21435b3778bb0a825811fe42a01607105d9`
- Exact review-handoff SHA-256:
  `f549761fe3ee48eca6c569bbacc0b3479055c4dbc11ea41bc03f5c01117bab60`
- Scope correction: `e070ee25b2f22635459bd8abf8841ab4f1925d0f`
- Private single-user lock: `b159f5c33d6b07468d98253db39807fd0f7d15f1`
- Candidate base: `0dfb4398be2ecd9295b35a94e3b461e25dad6f7c`
- Candidate: `3d359639c4d819f1c601481245daa81d5de9d5fc`
- Design SHA-256:
  `fb1241a76e11e2dba3501f020db86e876dfdd4536382c9a85c3f23734b86b829`
- Designer-result SHA-256:
  `781899563ad465ff204a2eacd655ac16f70b772bdbcdc922e9281a28f213db60`

The candidate branch was clean, pushed, upstream-equal, and a direct descendant
of the exact base at review completion. The governance worktree was clean and
upstream-equal before these two authorized uncommitted outputs. Both scope-lock
commits are ancestors of the governance authority commit and were inspected
directly.

## Authority and skill entry

- Required `fable-sentinel` skill loaded directly in Sentinel mode; SHA-256:
  `429aa2397e917e89e7b8770c3a22bf26a60d1337401760db3010fbcaa3b489d7`
- Required references loaded directly:
  - `contract-review.md`:
    `344ac717c4279ce0f98914babac5e26c32700827bb545e8dd24182bb3e0d16f1`
  - `provenance-review.md`:
    `d655a42de1fe2e1a2284766abefb33182a5d9234d21da6f75c2110a1c98023fe`
  - `review-classification.md`:
    `23f8a56c59f2a32f076998bad81ab59c85279b38f1f7b9275c5bcd9e9ab0759e`
- Current Reviewer authority hashes:
  - `AGENTS.md`:
    `df680fcee5f22c66c9ff56d15017d720dd547350bd5a5a7a29377759ac21b79e`
  - `CLAUDE.md`:
    `bba0b496f0305d28d66712e82b4f77aac9394693b05938668f9525b2d8871043`
  - `docs/agent/TEAM_OPERATING_MODEL.md`:
    `810d1884a90e3351097350e5d77e568e2aab6f544188d73ae44b4ee5d79efe17`
  - `docs/agent/roles/reviewer.md`:
    `40fd0a0530e5270997fe24a080823555a37b9f630f623f61eeda5e1625f78188`

The skill-linked V2 role boundary was read as the superseded historical evidence
it identifies itself to be. The current repository role documents and exact
Advisor handoff agree: candidate read-only, two uncommitted governance outputs,
return to Advisor, then stop. No authority conflict was found.

## Independent checks and execution disclosure

- Immutable `git show` inspection of the exact run prompt, handoff, both scope
  locks, intake, Designer handoff, candidate design, Designer result/pointer, and
  Phase A load-bearing contracts/source: completed.
- Base-to-candidate ancestry, exact three-path name/status/numstat diff, design
  and result hashes, candidate branch/upstream equality, and clean status: PASS.
- `git diff --check 0dfb4398..3d359639`: PASS.
- Static source-contract reproduction for control transitions/evidence equality,
  pointer byte loading/provenance, destination/preflight fields, CLI/control
  reachability, and writer-lock metadata: reproduced F01-F05.
- Governance authority, scope-lock ancestry, pre-output clean/upstream equality,
  and absence of pre-existing result paths: PASS.
- Runtime/session/process binding: inspected read-only.

No product test, dependency install, secret access, network/fetch, Slack call,
tmux input/mutation, live process start, state-root write, candidate write, broad
suite, or external-system operation was performed. A docs-only design candidate
did not warrant executing implementation tests; the defects are direct static
contract contradictions.

One exploratory immutable `git show` used two guessed Phase A paths and one
guessed Designer-pointer path that did not exist; exact paths were then located
with `rg --files` and inspected. These reviewer path guesses changed no state and
are not candidate failures.

## Conflicts, unresolved risks, and excluded scope

No governing-authority conflict or provenance conflict exists. F01-F05 are the
unresolved risks; none is accepted or deferred. They block Worker dispatch,
owner setup, and live rehearsal.

Candidate patching or implementation, secrets, owner state, Slack, tmux input,
runtime activation, staging/commit/push, final approval, risk acceptance, merge,
release, and next-mission selection were excluded and not performed.

## Routing and stop

RETURN_TO: `agent-office-advisor`

NEXT_REQUIRED_ACTION: Advisor-routed narrow Designer patch closing F01-F05,
followed by exact independent design-delta re-review. No Worker, owner setup,
Slack connection, tmux input, or live pilot is authorized.

STOP
