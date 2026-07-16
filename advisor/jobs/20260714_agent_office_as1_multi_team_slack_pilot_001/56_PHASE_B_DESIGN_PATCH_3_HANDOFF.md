# AS1 Phase B Designer Patch 3 Handoff

MISSION_ID: `AGENT_OFFICE_AS1_MULTI_TEAM_SLACK_PILOT_001`

TARGET_ACTOR: `agent-office-designer`

PATCH_CLASS: `BOUNDED_F05_D1_EXACT_BRIDGE_CONTRACT_REPAIR`

TASK_COMPLEXITY: `HIGH`

RISK_LEVEL: `HIGH`

FAILURE_COST: `HIGH` -- an underspecified owner-signal bridge could target the
wrong process or mutate startup state before discovering an unusable primitive.

REVERSIBILITY: `HIGH` -- this pass changes only three committed design/evidence
artifacts and performs no live or product mutation.

CONTEXT_REQUIREMENT: `TARGETED` -- read the exact current design, the complete
same-Reviewer result, and only the load-bearing Phase A lock/lifecycle source.

SELECTED_MODEL: `GPT-5.6 SOL`

SELECTED_MODE: `security/transport design delta`

SELECTED_EFFORT: `max`

REQUIRED_SKILL: `Agent Office Designer role protocol`; no separate Designer
skill is registered for this mission.

WHY_NOT_LOWER: The sole open HIGH finding is an exact process-incarnation and
fixed-signal security contract. The prior max review proved that leaving even
one bridge constant or ordering boundary implicit blocks safe implementation.

WHY_NOT_HIGHER: The same Reviewer found the pidfd design viable and the defect
closeable inside the same three artifacts and exact 14-path map. No capability
limitation of max has been demonstrated.

ESCALATION_TRIGGER: The correction requires a package, helper/source path,
durable schema, generic command/listener, dynamic PID/signal input, fifteenth
implementation path, or any authority/private-pilot expansion.

## Exact inputs

- Product worktree:
  `/home/leo/Project/.worktrees/agent-office/AGENT_OFFICE_AS1_PHASE_B_LIVE_PILOT_001`
- Branch: `feature/as1-phase-b-live-pilot-001`
- Exact Phase A base: `0dfb4398be2ecd9295b35a94e3b461e25dad6f7c`
- Exact patch-2 design candidate:
  `1fad9734e83c751b911accffbb12d65df9e775c8`
- Exact same-Reviewer result governance commit:
  `fea560eaea284e0b84d864d470cddd331568cdc8`
- Complete result:
  `advisor/jobs/20260714_agent_office_as1_multi_team_slack_pilot_001/55_PHASE_B_DESIGN_DELTA_REVIEW_2_RESULT.md`
- Private single-user scope lock:
  `b159f5c33d6b07468d98253db39807fd0f7d15f1`

Read the complete committed result. Preserve F01, F02-D1, F03-R1, and F04 as
closed. Do not rewrite those contracts except for a direct consistency edit
required by this F05-D1 repair.

## Sole repair requirement: F05-D1

Patch only the missing exact bridge contract identified by the Reviewer:

1. Define the normative interpreter acceptance and per-use execution binding.
   Fix the exact path, file type, owner, mode, device, inode, version, and
   SHA-256 requirements. State precisely when each is checked, how the opened
   executable is pinned against replacement, and how execution is guaranteed
   to use that verified object rather than a later pathname resolution.
2. Define the full compile-time bridge literal and exact-key input/output
   schemas. Fix every allowed key, value type, enumeration, and success/error
   outcome. Reject missing, extra, duplicate, malformed, oversized, or trailing
   data.
3. Fix the complete environment key/value set and all stdin, stdout, stderr,
   request, response, FD-enumeration, and execution timeout/deadline bounds.
   `4,096` matching-FD entries is already fixed; decide every other numeric
   bound explicitly and use it consistently in design, map, tests, and result.
4. Run the interpreter identity/API/no-signal capability preflight before
   fresh state-root initialization, writer-lock creation, or any other startup
   mutation. Preflight failure must leave zero state-root or lock residue.
5. Preserve one retained original O_EXCL lock descriptor, one pidfd for both
   complete observations and the fixed signal, no `acquiredAt`/btime ordering
   inference, and no numeric-PID signal fallback.
6. Add focused contract cases for interpreter device/inode/hash/replacement
   drift, unavailable APIs, exact request/result key violations, every byte/
   time/count boundary, bridge timeout, and preflight failure with zero startup
   mutation, while preserving the accepted fast-owner and PID exit/reuse cases.
7. If exact executable pinning and bounded bridge execution cannot be stated and
   implemented inside the existing paths without weakening the guarantee,
   return `HOLD` instead of adding scope or inventing a weaker fallback.

Read-only host capability checks are authorized. Do not signal any process,
alter runtime state, connect Slack, inspect secrets, or mutate tmux.

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
