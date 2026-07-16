# AS1 Phase B Designer Patch 2 Handoff

MISSION_ID: `AGENT_OFFICE_AS1_MULTI_TEAM_SLACK_PILOT_001`

TARGET_ACTOR: `agent-office-designer`

PATCH_CLASS: `BOUNDED_F02_D1_F03_R1_F05_D1_SECURITY_CONTRACT_REPAIR`

SELECTED_MODEL: `GPT-5.6 SOL`

SELECTED_EFFORT: `max`

WHY_NOT_LOWER: The remaining HIGH defects concern exact persisted bytes, the
last live destination observation before paste, and an incarnation-safe signal
primitive. All three must be unambiguous before implementation authority exists.

WHY_NOT_HIGHER: The same Reviewer found these defects remain document-level and
potentially closeable in the same three artifacts and 14 implementation paths.
`max` is sufficient unless the exact process primitive proves unavailable.

ESCALATION_TRIGGER: The safe signaling primitive requires a package, new source
path, durable schema, generic command/listener, or implementation map above 14
paths; or any repair changes the approved authority model or private-pilot lock.

## Exact inputs

- Product worktree:
  `/home/leo/Project/.worktrees/agent-office/AGENT_OFFICE_AS1_PHASE_B_LIVE_PILOT_001`
- Branch: `feature/as1-phase-b-live-pilot-001`
- Exact Phase A base: `0dfb4398be2ecd9295b35a94e3b461e25dad6f7c`
- First patched design: `7ed79bbfd7deea0f8458a3965734ebd1de98eb35`
- Exact same-Reviewer `NEEDS_PATCH` result governance commit:
  `66deeebe234ddd65e8737e4fd2d1887e8c3a6cf7`
- Complete result:
  `advisor/jobs/20260714_agent_office_as1_multi_team_slack_pilot_001/52_PHASE_B_DESIGN_DELTA_REVIEW_RESULT.md`
- Private single-user scope lock:
  `b159f5c33d6b07468d98253db39807fd0f7d15f1`

Read the complete committed review result. Preserve F01 and F04 as closed. Do
not rewrite their contracts except where a direct consistency edit is necessary
for F02-D1, F03-R1, or F05-D1.

## Exact repair requirements

### F02-D1 — persisted pointer representation

1. Define the one accepted raw byte formula exactly as
   `Buffer.concat([canonicalBytes(strictlyParsedPointer), Buffer.from("\n")])`.
2. Require on-disk bytes to equal that formula byte-for-byte.
3. Require both `grant.pointerHash` and the content-addressed filename digest to
   equal SHA-256 of those same raw bytes.
4. Use the unchanged scoped pointer writer's 32-KiB ceiling, not the generic
   one-megabyte durable-file ceiling.
5. Use one exact private-file rule: `(mode & 0o077) === 0`, or an explicitly
   stronger exact mode consistently everywhere. Do not mix owner-only and
   non-owner-nonwritable wording.
6. Specify focused cases for one terminal LF, missing/double LF,
   noncanonical-but-JSON-equivalent bytes, content-address filename mismatch,
   group/other read permission, and the exact size boundary.
7. Preserve the accepted no-follow, pin/no-reopen, closed-stdin load, replacement
   race, and zero-precommit-side-effect rules.

### F03-R1 — final fresh destination proof

1. Keep the two complete exact-key/all-15-field observations before commitment.
2. Add a third complete destination revalidation after buffer load and
   immediately before `PASTE_STARTED`/paste.
3. The third observation must use the same construction-derived pane query,
   selected-profile equalities, exact-key decoder, complete live field set,
   trusted clock, and lease expiry.
4. A third-observation divergence occurs after `PREPARED`/consumption: record the
   existing manual-reconciliation terminal state and perform no paste or Enter.
   Do not describe it as a clean precommit rejection.
5. Add focused target-change cases after the second observation and during/after
   buffer load, proving no paste or Enter and no retry.
6. Make every preflight count/order statement, implementation map entry, test
   gate, and live rehearsal step agree on this exact three-observation sequence.

### F05-D1 — exact process incarnation

1. Replace the coarse ambiguous birth/acquisition proof with an exact,
   implementable owner invariant that accepts every legitimate fast startup.
   If time conversion remains part of the proof, define its bounded uncertainty
   formula and the startup condition that makes a legitimate owner provable.
2. Name an incarnation-stable observation-and-signal primitive that cannot
   retarget a reused numeric PID after verification. A final numeric
   `process.kill(pid, signal)` is not sufficient.
3. Prove the primitive is available on the authorized Linux target and can be
   implemented only in the already-listed writer-lock/lifecycle paths, with
   fixed inputs, no package or fifteenth path, no generic command/listener, and
   no caller PID/signal/profile/path/reason.
4. Keep the exact executable/UID/boot/entry/root/build/lock checks and bind them
   to the same process incarnation used for the fixed signal.
5. Specify focused cases for fast valid acquisition and exit/reap/PID reuse
   after verification but before signaling, plus the existing stale/race/wrong
   executable/UID/boot cases.
6. If no exact primitive satisfies all these conditions, return `HOLD` without
   inventing a package, schema, helper path, or weaker guarantee.

Read-only host capability checks required to prove the named OS primitive are
authorized. Do not signal any process, alter runtime state, connect Slack,
inspect secrets, or perform tmux mutation.

## Scope lock

Modify only these same three product design artifacts:

1. `docs/integration/AGENT_OFFICE_AS1_PHASE_B_LIVE_COMPOSITION_DESIGN_DELTA.md`
2. `artifacts/as1-multi-team-slack-pilot/PHASE_B_DESIGNER_RESULT.md`
3. `artifacts/as1-multi-team-slack-pilot/PHASE_B_DESIGNER_RESULT_POINTER.txt`

The implementation map must remain exactly 14 paths. Do not add a source path,
package/lockfile, framework, Registry/schema/database, authority redesign,
systemd/service, UI/admin/HA, multi-user/workspace rollout, VibeNews, external
product change, simultaneous profiles, or broad/exhaustive tests.

Do not implement, access secrets, connect Slack, send tmux input, or run product
tests. Run docs-only scope/content checks, commit the exact three-file delta,
non-force push, verify clean/upstream-equal, return the exact patch commit and
updated hashes to `agent-office-advisor`, then STOP.
