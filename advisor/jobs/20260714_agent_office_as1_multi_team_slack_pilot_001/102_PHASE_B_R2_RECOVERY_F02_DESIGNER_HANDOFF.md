# AS1 Phase B R2 Recovery F02 Designer Handoff

MISSION_ID: `AGENT_OFFICE_AS1_MULTI_TEAM_SLACK_PILOT_001`

WORK_UNIT: `PHASE_B_R2_RECOVERY_F02_FIXED_ORIGINAL_ROOT_PRESERVATION_DESIGN`

ADVISOR_DECISION: `PROCEED_WITH_LIMITS`

## Authority and objective

Leo/GPT authorized F02 on 2026-07-17: preserve the original latched state root
permanently as read-only forensic evidence, use only the fixed R2 root, complete
the minimum fixed-path recovery and focused verification, obtain the same
independent Reviewer verdict, then reopen exactly one Agent Office Slack round
trip.

This handoff closes only the concrete helper/invocation gap left by the accepted
R2 design. Do not redesign F01, Exact Delivery, Slack routing, identities, or
the two-profile architecture.

## Actor and runtime

- Actor/session: `agent-office-designer`
- Role: Agent Office Designer, bounded security/transport design delta
- Verified workspace: `/home/leo/Project/agent-office`
- Verified runtime: GPT-5.6 SOL, max
- Responsible Advisor: `agent-office-advisor`
- Product worktree:
  `/home/leo/Project/.worktrees/agent-office/AGENT_OFFICE_AS1_PHASE_B_LIVE_PILOT_001`
- Product branch: `feature/as1-phase-b-live-pilot-001`
- Exact baseline: `d0b14949181d89c2caeb4e93bca91a2ea1647c80`

Profile record:

- SELECTED_MODEL: `gpt-5.6-sol`
- SELECTED_MODE: `design-only`
- SELECTED_EFFORT: `max`
- REQUIRED_SKILL: none; use the active Designer role protocol
- WHY_NOT_LOWER: fixed no-follow traversal, immutable filesystem flags,
  process/lock races, install provenance, and irreversible sealing require
  security-sensitive cross-boundary reasoning.
- WHY_NOT_HIGHER: the accepted R2 design already fixes the algorithm and
  invariants; this is a narrow concrete-artifact delta, not a new architecture.
- ESCALATION_TRIGGER: a required new authority model, dynamic root selection,
  schema/Registry change, or inability to implement without weakening the
  immutable forensic guarantee.

## Required reads

Read the current repository entry instructions and Designer role, then inspect
only:

1. accepted design commit `a837bbf9d4072638a6dac676fb5ccc8da9bfa1ff`;
2. current candidate `d0b14949181d89c2caeb4e93bca91a2ea1647c80`;
3. the F02 HOLD in Advisor audit 101;
4. the existing seam algorithm in
   `src/persistence/file-store/writer-lock.ts`;
5. the bounded setup/CLI/build/test surfaces needed to name the helper.

## Exact design output scope

Edit exactly these three product paths and no others:

1. `docs/integration/AGENT_OFFICE_AS1_PHASE_B_R2_RECOVERY_DESIGN_DELTA.md`
2. `artifacts/as1-multi-team-slack-pilot/PHASE_B_R2_RECOVERY_F02_DESIGNER_RESULT.md`
3. `artifacts/as1-multi-team-slack-pilot/PHASE_B_R2_RECOVERY_F02_DESIGNER_RESULT_POINTER.txt`

The design delta must name:

1. exactly one repository-owned production preservation helper artifact;
2. exactly one fixed, no-argument operator invocation surface;
3. the smallest exact implementation file allowlist, target at most six
   source/script/doc/test paths before result/pointer evidence;
4. the build/install manifest and byte/hash provenance check that must pass
   while the Slack descriptor remains disabled and before opening the original
   root;
5. fixed literals only:
   - original: `/home/leo/.local/state/agent-office/as1-slack-pilot`
   - R2: `/home/leo/.local/state/agent-office/as1-slack-pilot-r2`;
6. no root/path/environment/CLI operand, discovery, fallback, copy, migration,
   repair, or unseal input;
7. retained descriptor-relative no-follow traversal, mount/device/inode/type/
   link/entry-set pinning, rejection of symlinks/hard-link ambiguity/special
   files/mount transitions/path escape, exact owner/old-lock quiescence, and
   race rechecks;
8. zero-write sealing and supported `FS_IMMUTABLE_FL` establishment and
   verification for every retained entry, with no weaker fallback;
9. final canonical byte/path digest equality and a durable redacted result;
10. exact HOLD behavior when privilege, filesystem support, provenance,
    quiescence, identity, traversal, sealing, or digest cannot be proven;
11. focused synthetic helper tests and the separately sequenced real-filesystem
    privilege validation on this server;
12. the one-way activation order: reviewed build -> disabled descriptor proof ->
    preserve original -> reverify seal/digest -> initialize only R2 -> reverify
    live Agent Office destination -> one Agent Office pilot -> stop/audit.

The design must explicitly say that rollback never modifies or unseals the
original root. Rollback may only stop the R2 owner, keep the descriptor disabled,
and retain both roots.

## Forbidden

- No implementation or runtime code change.
- No access, stat, traversal, chmod, ioctl, digest, or mutation of either real
  state root.
- No secret loading, Slack connection/post, descriptor activation, owner start,
  live destination observation, process signal, or tmux input.
- No database, schema, Registry, framework, systemd, UI, VibeNews, external
  project, package, dependency, or general-purpose path abstraction.
- No Worker or Reviewer dispatch, self-review, risk acceptance, or next mission.

## Completion

Commit and non-force push exactly the three design paths. Return the candidate
commit and pointer to `agent-office-advisor`, then STOP. A Reviewer PASS is
required before the Worker handoff.
