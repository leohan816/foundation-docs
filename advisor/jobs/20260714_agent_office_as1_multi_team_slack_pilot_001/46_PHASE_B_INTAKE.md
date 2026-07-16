# AS1 Phase B Live Pilot Intake

MISSION_ID: `AGENT_OFFICE_AS1_MULTI_TEAM_SLACK_PILOT_001`
PHASE: `BOUNDED_PHASE_B_LIVE_PILOT`
STATUS: `DESIGN_DISPATCH_AUTHORIZED`

## Authority

Leo/GPT approved the smallest reviewed Phase B delta needed to compose the
reviewed Phase A modules into one real fail-closed live Slack composition and
then run exactly two sequential pilots:

1. `team-agent-office` -> `agent-office-advisor` -> stop and audit;
2. `team-foundation` -> `foundation-advisor` -> stop and audit.

The frozen Phase A candidate is
`0dfb4398be2ecd9295b35a94e3b461e25dad6f7c`. Phase B uses the isolated product
worktree `/home/leo/Project/.worktrees/agent-office/AGENT_OFFICE_AS1_PHASE_B_LIVE_PILOT_001`
on branch `feature/as1-phase-b-live-pilot-001` created exactly from that commit.

## Verified owner gate

- secret directory: owner-controlled real directory, mode `0700`;
- secret file: owner-controlled regular file, mode `0600`;
- exact-key parser: `LOCAL_SYNTAX_PASS` with no values printed;
- profile IDs/token classes: grammar-valid and locally distinct;
- live identity proof: not yet performed;
- Slack/tmux connection: not attempted;
- runtime: safely stopped.

The documented `redacted-check` command currently fails before parsing unless
`AS1_SLACK_STATE_ROOT` is supplied, while the Setup Pack omits that required
owner instruction. Phase B must correct that documentation and make the closed
CLI behavior internally consistent.

## Scope lock

Phase B may add only the live composition, fixed operator activation material,
focused tests, setup/as-built documentation, mission evidence, and the exact
one-use authority artifacts needed for the two reviewed pilots. It must reuse
the existing AS1 contracts, Registry, Exact Delivery, Phase A profile modules,
and security invariants.

Forbidden: database/schema/Registry changes, systemd/permanent service, generic
workflow/UI, VibeNews, changes to FOUNDATION/SIASIU/Cosmile product code,
simultaneous profiles, dynamic profile/destination/command input, standing
authority, secret disclosure, or tmux delivery without the exact reviewed
post-intake grant, one-use lease, and capability.

## Role train and profiles

- Designer: `agent-office-designer`, GPT-5.6 SOL `max`.
  - WHY_NOT_LOWER: live credentials, network identity, durable authority, and
    tmux side effects make xhigh insufficiently conservative for this design.
  - WHY_NOT_HIGHER: bounded additive composition over reviewed contracts; max
    is sufficient and ultra is unnecessary.
- Design/implementation Reviewer: same independent `agent-office-reviewer`,
  GPT-5.6 SOL `max`, direct `/fable-sentinel` fallback when needed.
- Worker after design PASS: `agent-office-opus`, Opus 4.8 `Ultracode`, required
  `/fable-builder`.

No implementation may begin before the independent design verdict is `PASS`
and the Advisor accepts the exact reviewed design.
