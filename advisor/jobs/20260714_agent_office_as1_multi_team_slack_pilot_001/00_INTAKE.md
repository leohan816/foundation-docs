# AS1 Multi-Team Slack Pilot Intake

MISSION_ID: `AGENT_OFFICE_AS1_MULTI_TEAM_SLACK_PILOT_001`

DECISION: `PROCEED_WITH_LIMITS`

RISK_LEVEL: `LEVEL_3_SECURITY_AUTHORITY_AND_EXTERNAL_TRANSPORT`

Accepted at: `2026-07-14T19:03:46Z`

## Founder authority

The mission authorizes a private Socket Mode pilot for exactly two fixed routes:

| Slack channel | Team | Routable Actor |
|---|---|---|
| `team-agent-office` by immutable channel ID | `AGENT_OFFICE_ADVISOR_TEAM` | `agent-office-advisor` |
| `team-foundation` by immutable channel ID | `FOUNDATION_ADVISOR_TEAM` | `foundation-advisor` |

VibeNews, DMs, App Home commands, status/agents/missions queries, additional
users, direct Worker/Reviewer dispatch, arbitrary terminal input, public ingress,
DB, Hermes, production, and broad rollout remain forbidden.

## Accepted corrections

1. Fixed profiles are routing identity only; every real pilot requires a fresh,
   single-use lease and capability consumed exactly once.
2. Identity lineage is exact:
   - `foundation-advisor` / `agent-office-advisor` is the continuing Agent Office
     Actor (immutable roleInstanceId / current actorId).
   - `foundation-advisor-20260714-01` / `foundation-advisor` is the new Foundation
     Actor and receives no historical evidence.
3. Both Slack App IDs are exact configuration inputs and credential pairs must
   fail closed when swapped or mismatched.
4. A top-level Leo message creates an immutable `NEW_MISSION` intake only. The
   responsible Advisor, not Slack, creates any canonical Mission Manifest.
5. Existing Agent Office Exact Delivery v2 behavior remains unchanged. Two-team
   support is additive and closed, never a generic target selector.
6. Designer -> independent design review -> Worker -> independent implementation
   review is mandatory.
7. Setup Pack target is 30-45 minutes; Phase A target is 8-12 hours with a
   16-hour hard stop.

## Repository and Git evidence

- Implementation baseline: `d240d8992f69327b712c9fa4a1dea97194edd1ae`.
- Isolated worktree:
  `/home/leo/Project/.worktrees/agent-office/AGENT_OFFICE_AS1_MULTI_TEAM_SLACK_PILOT_001`.
- Branch: `feature/as1-multi-team-slack-pilot-001`.
- Accepted documentation convergence commit:
  `50124a1ea720e162e906c04c6f6fb2591c4974b8`.
- That commit copies exactly the accepted `c837af5` blobs for `AGENTS.md`,
  `CLAUDE.md`, and `docs/agent/ACTOR_PROJECT_BINDING_MIGRATION.md`; no broad
  merge was performed.
- Target worktree is clean, pushed, and upstream-equal at intake.
- Dirty files in the main Agent Office checkout and the main foundation-docs
  checkout are unrelated and excluded.

## Current direct observations

- Designer: `agent-office-designer/$24/@24/%24`, Agent Office canonical
  workspace, Codex 0.144.3, GPT-5.6 SOL max, idle.
- Worker: `agent-office-opus/$16/@16/%16`, Agent Office canonical workspace,
  Claude Opus 4.8 Ultracode, idle after STOP.
- Reviewer: `agent-office-reviewer/$25/@25/%25`, Agent Office canonical
  workspace, Codex 0.144.3, GPT-5.6 SOL xhigh, idle after PASS.
- Agent Office Advisor: `agent-office-advisor/$26/@26/%26`, Agent Office
  canonical workspace, GPT-5.6 SOL max.
- Foundation Advisor: `foundation-advisor/$27/@27/%27`,
  `/home/leo/Project/FOUNDATION`, foreground `codex`, GPT-5.6 SOL max.

Every observation is temporary evidence, not standing authority. Revalidate
immediately before every dispatch and live pilot.

## Material implementation facts

- No Slack runtime or Slack dependency exists at the baseline.
- Exact Delivery v2 is intentionally single-destination and hard-codes the Agent
  Office Advisor through `exact-config.ts`, `exact-transport.ts`, and
  `evidence-ingress.ts`.
- Current evidence ingress supports ACK/intake/decision/resume but has no generic
  Slack final-result ingestion contract.
- The Advisor Inbox is bound to one loaded Mission Manifest. AS1 must persist a
  `NEW_MISSION` intake without allowing Slack to mint a canonical Mission.

These facts require an additive design. If closed-profile separation cannot be
implemented without weakening v2 or creating a generic destination selector,
the Designer returns `DESIGN_NOT_READY` and the train stops before runtime code.

## Unknowns and safe defaults

| Unknown | Owner | Safe default |
|---|---|---|
| Workspace, channel, and App IDs | Leo owner setup | unset; no connection |
| Bot and App tokens | Leo owner setup | absent; never print or commit |
| Final SDK versions | Worker under reviewed design | no dependency change before design PASS |
| Live pane locators at pilot time | Advisor preflight | no capability issuance on mismatch |
| Slack outbound ambiguity | reviewed design | no blind resend; manual reconciliation |
| Foundation exact evidence namespace | reviewed design | no reuse of Agent Office state or evidence |

No Worker, Reviewer, Slack connection, usable capability, or secret operation is
authorized before the required preceding gate.
