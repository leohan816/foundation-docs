# AS1 Phase B R2 Recovery Design Patch Handoff

MISSION_ID: `AGENT_OFFICE_AS1_MULTI_TEAM_SLACK_PILOT_001`
PASS: `PHASE_B_R2_RECOVERY_DESIGN_PATCH_1`
ASSIGNED_ACTOR: `agent-office-designer`
ROLE: `Agent Office Designer`
MODEL: `gpt-5.6-sol`
EFFORT: `max`
REQUIRED_SKILL: `NONE_AVAILABLE_FOR_THIS_BOUNDED_SECURITY_DESIGN`

## Dispatch profile record

- `TASK_COMPLEXITY`: narrow crash-recovery and forensic-preservation contract
  correction
- `RISK_LEVEL`: high because an incorrect design can execute after a truthful
  failure notice or falsely claim immutable forensic preservation
- `FAILURE_COST`: unauthorized later tmux delivery, contradictory Slack output,
  or loss of trustworthy incident evidence
- `REVERSIBILITY`: design artifacts are reversible; neither state root may be
  touched in this pass
- `CONTEXT_REQUIREMENT`: the exact R2 design candidate, independent findings,
  and only the cited load-bearing source contracts
- `SELECTED_MODEL`: `gpt-5.6-sol`
- `SELECTED_MODE`: code/design
- `SELECTED_EFFORT`: `max`
- `WHY_NOT_LOWER`: the patch must close cross-restart authority gaps and a
  filesystem race without broadening the accepted security architecture
- `WHY_NOT_HIGHER`: no higher profile is needed; four exact findings bound the
  task and no implementation is authorized
- `ESCALATION_TRIGGER`: return `HOLD` if any finding requires a database,
  Registry/schema change, generic framework, new authority model, extra
  implementation path, or mutation of either live state root

## Frozen coordinates

- product worktree:
  `/home/leo/Project/.worktrees/agent-office/AGENT_OFFICE_AS1_PHASE_B_LIVE_PILOT_001`
- product branch: `feature/as1-phase-b-live-pilot-001`
- patch base and current candidate:
  `e2c9d002e030eefae0f67081653fab28f6500d4d`
- frozen reviewed implementation source:
  `cca0cb5e2485c029b6d1715e37abf9bc55c548bd`
- governance branch: `advisor/as1-multi-team-slack-pilot-001`
- governance patch authority:
  `5711729fd06d2f0a589fed7934fc4ac0136256ff`
- exact independent review result:
  `advisor/jobs/20260714_agent_office_as1_multi_team_slack_pilot_001/90_PHASE_B_R2_RECOVERY_INDEPENDENT_DESIGN_REVIEW_RESULT.md`
- original Designer handoff:
  `advisor/jobs/20260714_agent_office_as1_multi_team_slack_pilot_001/88_PHASE_B_R2_RECOVERY_DESIGNER_HANDOFF.md`

The product and governance worktrees were clean and upstream-equal when this
patch was issued. The implementation, preservation, R2 initialization, Slack
activation, and live pilot remain blocked.

## Patch objective

Correct only independent findings F01-F04. Preserve every accepted part of the
R2 design, including the socket-local depth contract, exact R2 path and root
identity, sealed bridge identity, closed Korean status vocabulary, validated
same-thread target, one-profile operation, and exact 12-path implementation
allowlist.

### F01 — Durable DELIVERY_FAILED terminal barrier

Specify a durable invariant under which any existing `DELIVERY_FAILED` outbox
record, in every phase including `PREPARED`, `REQUEST_STARTED`,
`RESPONSE_RECORDED`, and `MANUAL_RECONCILIATION_REQUIRED`, blocks all future:

- tmux observation, paste, Enter, or other delivery side effect;
- grant, lease, or capability reuse;
- contradictory delivery-confirmed or business-result output; and
- blind status retry after an ambiguous request.

The barrier must be checked during startup recovery and immediately before any
delivery observation or mutation. Define the deterministic authority/latch
transition that survives a crash between status recording and process stop.
Recovery of `PREPARED` may complete only that same failure status; it must never
resume tmux delivery.

Add exact synthetic restart proofs for every durable `DELIVERY_FAILED` phase,
showing zero tmux observation/mutation, zero authority reuse, and zero
contradictory outbound.

### F02 — Durable PROCESSING_FAILED terminal barrier

Specify a durable invariant under which any existing `PROCESSING_FAILED`
record, in every durable phase, blocks all later:

- `DELIVERY_CONFIRMED` status;
- evidence/ACK progression;
- INTAKE or RESULT projection;
- business output or alternate failure status; and
- retry that could resume processing.

`DELIVERY_CONFIRMED` must require both `DELIVERY_FAILED` and
`PROCESSING_FAILED` to be absent in every durable phase. Startup recovery must
inspect terminal-status siblings before tmux, evidence, status, or business
outbound work and recover/latch deterministically.

Add exact crash/restart proofs at every `PROCESSING_FAILED` phase showing no
later confirmation, evidence progression, INTAKE/RESULT projection, business
output, or alternate status.

### F03 — Race-safe original-root preservation

Replace the preservation and rollout sequence with a design that proves the
original root remains byte/path identical and cannot be reacquired during the
full preservation interval.

The patched design must:

1. install and verify the exact reviewed R2-only executable while the descriptor
   remains disabled, before original-root preservation begins;
2. prove the active executable/source contains only the fixed R2 root and root
   identity and cannot select or fall back to the original root;
3. prove no AS1 process and no original-root writer lock are active;
4. pin parent/root identity for the full operation and reject inode changes;
5. use a no-follow, descriptor-relative, or equivalently race-safe traversal
   for type/link checks and permission changes;
6. establish exclusive quiescence before the remainder of the tree is changed,
   with immediate process/lock/identity/digest rechecks;
7. reject symlinks, hard-link ambiguity, mount or root substitution, and any
   path escape;
8. compute the final byte/path digest only after final process, lock, identity,
   and traversal proofs;
9. define how permanent read-only forensic status is maintained rather than
   relying only on a narrative or a single reversible mode-bit check; and
10. keep every original evidence byte and relative path unchanged, with no
    reset, deletion, repair, copy-forward, or reuse.

Add one synthetic race proof that attempts a concurrent process/lock or path
identity change and fails closed. It must never run against either real root.
If this cannot be done with the existing 12 implementation paths and bounded
operator procedure, return `HOLD` rather than expand scope.

### F04 — Accurate attempt disclosure

Update the Designer result to disclose the shell-only helper failure:

`/bin/bash: line 12: test: : integer expected`

Record that it wrote no product artifact, identify the corrected exact-path
validation retry, and record the successful result. Do not call it a product
test failure. Recompute the design and result SHA-256 values and update the
pointer. Record all new attempts honestly.

## Non-expansion requirements

Keep the exact implementation allowlist at these 12 paths:

1. `src/adapters/gateways/slack-pilot/socket-frame.ts`
2. `src/application/slack-pilot/outbox.ts`
3. `src/runtime/as1-slack-pilot/composition.ts`
4. `src/runtime/as1-slack-pilot/cli.ts`
5. `src/persistence/file-store/writer-lock.ts`
6. `docs/operations/AGENT_OFFICE_AS1_SLACK_SETUP.md`
7. `tests/adapters/as1-slack-socket-frame.test.ts`
8. `tests/adapters/as1-slack-socket-client.test.ts`
9. `tests/integration/as1-slack-outbound.test.ts`
10. `tests/integration/as1-slack-live-composition.test.ts`
11. `tests/operations/as1-slack-lifecycle.test.ts`
12. `tests/recovery/as1-slack-recovery.test.ts`

Do not introduce a database, Registry/schema change, framework, systemd unit,
UI, VibeNews work, external product change, generic destination, simultaneous
profiles, standing delivery authority, or new status text.

## Required reads

Read the exact review result 90, original handoff 88, all three candidate
artifacts at `e2c9d00`, and only the frozen load-bearing source/tests directly
cited by result 90. Re-read current `AGENTS.md`, `CLAUDE.md`, Designer role, and
Team operating model. Historical material is evidence, not permission.

## Allowed Designer files

Modify exactly these existing three paths and no others:

- `docs/integration/AGENT_OFFICE_AS1_PHASE_B_R2_RECOVERY_DESIGN_DELTA.md`
- `artifacts/as1-multi-team-slack-pilot/PHASE_B_R2_RECOVERY_DESIGNER_RESULT.md`
- `artifacts/as1-multi-team-slack-pilot/PHASE_B_R2_RECOVERY_DESIGNER_RESULT_POINTER.txt`

Do not modify runtime source, tests, package files, configuration, secrets,
descriptor state, either state root, accepted prior evidence, or another
project.

## Validation and return

Use delta-only document, hash, exact-path, and Git checks. Run no product suite,
connect to no live system, inspect no secret value, and send no tmux input to
another Actor.

Stage only the three allowed paths, inspect the staged diff, commit once,
non-force push, verify clean/upstream-equal, and return:

- exact patch commit and parent;
- exact changed paths and diff summary;
- F01-F04 closure map;
- unchanged 12-path implementation allowlist;
- every command failure and retry;
- updated artifact hashes and pointer;
- unresolved unknowns or `NONE`;
- `READY_FOR_SAME_REVIEWER_DELTA_REVIEW` or `HOLD`.

Return to `agent-office-advisor`, then STOP. Do not self-review or implement.
