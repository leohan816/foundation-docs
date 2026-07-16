# AS1 Phase B Designer Patch Handoff

MISSION_ID: `AGENT_OFFICE_AS1_MULTI_TEAM_SLACK_PILOT_001`

TARGET_ACTOR: `agent-office-designer`

PATCH_CLASS: `BOUNDED_F01_F05_SECURITY_CONTRACT_REPAIR`

SELECTED_MODEL: `GPT-5.6 SOL`

SELECTED_EFFORT: `max`

WHY_NOT_LOWER: Five HIGH findings affect exact pointer bytes, physical
destination binding, authority/evidence equality, incident kill, and process
ownership. A weak design patch could authorize the wrong live side effect.

WHY_NOT_HIGHER: The independent Reviewer proved all five findings are
document-level and closeable inside the existing private pilot and at most 15
paths, without schema or authority redesign. `max` is sufficient.

ESCALATION_TRIGGER: Any repair requiring a new durable field/schema, Registry,
authority model, generic transport, or more than 15 implementation paths.

## Exact inputs

- Product worktree:
  `/home/leo/Project/.worktrees/agent-office/AGENT_OFFICE_AS1_PHASE_B_LIVE_PILOT_001`
- Branch: `feature/as1-phase-b-live-pilot-001`
- Exact Phase A base: `0dfb4398be2ecd9295b35a94e3b461e25dad6f7c`
- Reviewed design commit: `3d359639c4d819f1c601481245daa81d5de9d5fc`
- Independent `NEEDS_PATCH` result at governance commit: `b84393e`
- Exact result:
  `advisor/jobs/20260714_agent_office_as1_multi_team_slack_pilot_001/49_PHASE_B_DESIGN_REVIEW_RESULT.md`
- Scope correction: `e070ee25b2f22635459bd8abf8841ab4f1925d0f`
- Private single-user lock: `b159f5c33d6b07468d98253db39807fd0f7d15f1`

Read the complete committed review result directly. Patch all F01-F05; do not
reinterpret or defer them.

## Exact repair requirements

### F01 — frozen authority versus live control

- Preserve the receive-grant's frozen `globalControlSnapshotHash` unchanged in
  the delivery grant/facts so the existing evidence equality remains valid.
- Require a separate construction-bound live control/latch predicate before
  grant acceptance and every delivery side effect.
- Do not add a second durable snapshot field or change the schema.
- Specify a focused test with different frozen/live control records that still
  completes unchanged evidence authority only while live control is actionable.

### F02 — exact pointer bytes

- In the already-listed AS1 exact-transport path, boundedly open the contained
  pointer with no-follow, regular-file, ownership, size, grammar, correlation,
  and hash checks before authority consumption or tmux mutation.
- Pin the verified bytes in memory and load those bytes through a closed stdin /
  private-buffer operation; do not re-open the path after verification.
- Keep buffer name, argv, target, and source path construction-bound.
- Specify zero-mutation/unconsumed-authority tests for hash mismatch, symlink,
  non-regular input, and verify-to-load path replacement.

### F03 — complete destination/profile binding

- Bind the lease destination's immutable session, workspace, and command to the
  selected closed profile before capability creation.
- Enumerate authority metadata versus live facts. Return and compare every
  security-relevant live fact in both preflights with explicit freshness rules.
- Reject wrong-profile, omitted-field, and between-preflight divergence before
  `PREPARED` or tmux mutation.
- Prefer carrying this in the existing composition/exact-transport paths. If
  `exact-authority.ts` is genuinely load-bearing, add it as the justified
  fifteenth path and no other path.

### F04 — executable incident kill

- Define one closed, lock-bound, fixed operator kill action using an exact verb
  or fixed signal.
- Accept no caller PID, signal, profile, path, destination, or free-form reason.
- Persist global kill before any new side effect, return only stable redacted
  reason codes, and perform bounded shutdown.
- Keep clean `stop` distinct from incident kill; neither may reset or clear
  durable state.
- Specify focused lifecycle tests and no generic command/reset surface.

### F05 — PID ownership

- Bind stop/kill observation to OS process birth and executable identity without
  changing `agent-office.writer-lock.v1`.
- Re-read lock and process facts immediately before the one fixed signal.
- Missing, raced, reused, or inconsistent ownership must return a stable
  stale/ambiguous status and send no signal.
- Specify PID reuse, exit/reuse race, wrong executable/UID/boot, and exact-owner
  cases.
- If exact owner proof cannot be achieved without schema change, return `HOLD`.

## Scope lock

Modify only the same three product design artifacts already committed:

1. `docs/integration/AGENT_OFFICE_AS1_PHASE_B_LIVE_COMPOSITION_DESIGN_DELTA.md`
2. `artifacts/as1-multi-team-slack-pilot/PHASE_B_DESIGNER_RESULT.md`
3. `artifacts/as1-multi-team-slack-pilot/PHASE_B_DESIGNER_RESULT_POINTER.txt`

The implementation map remains 14 paths unless F03 requires exactly one
additional `src/adapters/gateways/slack-pilot/exact-authority.ts` path. No other
path increase is authorized.

Do not add a framework, Registry/schema/database, authority redesign, package,
systemd/permanent service, UI/admin/HA, multi-user/workspace rollout, VibeNews,
external product change, simultaneous profiles, or broad/exhaustive tests.

Do not implement, access secrets, connect Slack, send tmux input, or run product
tests. Run docs-only scope/content checks, commit the exact three-file delta,
non-force push, verify clean/upstream-equal, return the exact patch commit and
updated hashes to `agent-office-advisor`, then STOP.
