# AS1 Phase B Live Composition Designer Handoff

MISSION_ID: `AGENT_OFFICE_AS1_MULTI_TEAM_SLACK_PILOT_001`
PASS: `PHASE_B_SECURITY_TRANSPORT_DESIGN_DELTA`
ASSIGNED_ACTOR: `agent-office-designer`
ROLE: `Agent Office Designer`
MODEL: `gpt-5.6-sol`
EFFORT: `max`

## Frozen coordinates

- product baseline: `0dfb4398be2ecd9295b35a94e3b461e25dad6f7c`
- product worktree:
  `/home/leo/Project/.worktrees/agent-office/AGENT_OFFICE_AS1_PHASE_B_LIVE_PILOT_001`
- branch: `feature/as1-phase-b-live-pilot-001`
- governance handoff branch: `advisor/as1-multi-team-slack-pilot-001`
- Phase A final audit:
  `advisor/jobs/20260714_agent_office_as1_multi_team_slack_pilot_001/45_ADVISOR_PHASE_A_FINAL_AUDIT.md`
- Phase B intake:
  `advisor/jobs/20260714_agent_office_as1_multi_team_slack_pilot_001/46_PHASE_B_INTAKE.md`

## Required entry reads

Read the product worktree's `AGENTS.md`, `CLAUDE.md`,
`docs/agent/TEAM_OPERATING_MODEL.md`, `docs/agent/roles/designer.md`, the Phase A
design/security/as-built/setup documents, and the actual load-bearing Phase A
source/tests. Read the two governance files above directly from the governance
worktree. Historical summaries are not authority.

## Design objective

Produce the smallest implementable design delta that safely composes the
already-reviewed Phase A modules into one real live composition. It must enable
exactly one fixed profile at a time, perform the complete immutable Slack
identity proof, receive one bounded Leo root conversation, create the canonical
Mission intake, and permit same-thread Advisor ACK/question/result projection.
Any tmux pointer delivery remains separately gated by the exact post-intake
grant, one-use readiness lease, and one-use capability.

The design must specify, concretely:

1. exact composition/component map and allowed source paths;
2. startup ordering: state-root lock/integrity -> grant provenance -> owner-only
   secret parse -> Web identity checks -> Socket hello identity -> receive;
3. how the fixed profile comes only from an immutable committed receive grant,
   never CLI/Slack/environment user input;
4. how Agent Office and Foundation keep independent state roots, dedupe,
   journals, latches, receive grants, delivery grants, leases, and capabilities;
5. profile-local one-root/one-conversation limits and exclusive expiry;
6. actual Socket/Web composition and outbound same-thread projection;
7. post-intake authority creation/verification and exact tmux runner reuse,
   including fresh live destination verification and no historical fallback;
8. evidence-ingress rules for Advisor ACK/question/result without raw terminal
   or prompt exposure;
9. kill/latch/stop/drain/restart and crash/replay behavior;
10. exact sequential pilot procedure: Agent Office -> stop/audit -> Foundation
    -> stop/audit, never simultaneous;
11. `AS1_SLACK_STATE_ROOT` owner instruction and safe state-root locations;
12. focused unit/integration/security/live rehearsal gates;
13. exact rollback, token-revocation order, and zero-process/listener checks;
14. explicit proof that no database/schema/Registry/systemd/UI/VibeNews or
    external product-code change is needed.

If the existing reviewed contracts cannot support this without a material
schema, authority, or security redesign, return `HOLD` before proposing a
workaround.

## Allowed design files

Create or modify only:

- `docs/integration/AGENT_OFFICE_AS1_PHASE_B_LIVE_COMPOSITION_DESIGN_DELTA.md`
- `artifacts/as1-multi-team-slack-pilot/PHASE_B_DESIGNER_RESULT.md`
- `artifacts/as1-multi-team-slack-pilot/PHASE_B_DESIGNER_RESULT_POINTER.txt`

Do not modify runtime source, tests, package files, configuration, secrets,
existing Phase A evidence, or any external project.

## Result and Git contract

Record actual files inspected, unresolved unknowns, proposed allowed files,
tests, rollback, and whether the design is implementation-ready. Stage only the
three allowed paths, verify the staged diff, commit once, non-force push the
authorized branch, verify clean/upstream-equal, return the exact commit and
pointer to `agent-office-advisor`, then STOP. Do not self-review or dispatch.
