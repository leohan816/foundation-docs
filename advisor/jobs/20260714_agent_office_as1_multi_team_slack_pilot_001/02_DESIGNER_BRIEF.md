# Designer Brief

TARGET_ACTOR: `agent-office-designer`

MODE: `BOUNDED_SECURITY_TRANSPORT_DESIGN_MODE`

The mission-specific mode authorizes design documentation about authentication,
transport, and secret boundaries. It does not authorize runtime/config
activation, secret access, package changes, source code, tests, or live Slack.

## Target

- Worktree:
  `/home/leo/Project/.worktrees/agent-office/AGENT_OFFICE_AS1_MULTI_TEAM_SLACK_PILOT_001`
- Branch: `feature/as1-multi-team-slack-pilot-001`
- Design base: `50124a1ea720e162e906c04c6f6fb2591c4974b8`

## Exact allowed files

1. `config/slack/agent-office-advisor.manifest.yaml`
2. `config/slack/foundation-advisor.manifest.yaml`
3. `config/slack/as1-slack-pilot.env.example`
4. `docs/integration/AGENT_OFFICE_AS1_MULTI_TEAM_SLACK_DESIGN.md`
5. `docs/security/AGENT_OFFICE_AS1_SLACK_SECURITY_AUTHORITY_MODEL.md`
6. `docs/operations/AGENT_OFFICE_AS1_SLACK_SETUP.md`
7. `artifacts/as1-multi-team-slack-pilot/DESIGNER_RESULT.md`
8. `artifacts/as1-multi-team-slack-pilot/DESIGNER_RESULT_POINTER.txt`

No other target-repository path may change.

Use only the assigned existing Designer session. Do not create or use agents,
sub-agents, delegated contexts, substitute actors, or additional tmux sessions.

## Setup Pack checkpoint

Within 30-45 minutes, commit and non-force push files 1-3 and 6. Print a compact
`SETUP_PACK_COMMITTED` block with commit and exact paths, then continue the same
assignment without waiting for tokens.

Both manifests must use Socket Mode, app-level `connections:write`, only the
minimum private-channel bot event/scopes required by the accepted design, no DM
event, no App Home command surface, no public Request URL, and no interactive
command surface. Each manifest has its own app/bot display name.

The environment template must contain exactly these empty keys:

```text
SLACK_WORKSPACE_ID=
SLACK_LEO_USER_ID=U0BD3523C1F
SLACK_AGENT_OFFICE_APP_ID=
SLACK_AGENT_OFFICE_CHANNEL_ID=
SLACK_AGENT_OFFICE_BOT_TOKEN=
SLACK_AGENT_OFFICE_APP_TOKEN=
SLACK_FOUNDATION_APP_ID=
SLACK_FOUNDATION_CHANNEL_ID=
SLACK_FOUNDATION_BOT_TOKEN=
SLACK_FOUNDATION_APP_TOKEN=
```

The setup runbook must name the external secret path, ownership/modes, exact
owner steps, redacted validation output, and planned start/stop/restart/status/
redacted-check commands. It must say the commands remain unavailable until Phase
A implementation lands. No real ID other than Leo's approved user ID and no
secret value may appear.

## Design delta requirements

The design must be implementation-deterministic and cover:

- one shared gateway service with two separately authenticated clients;
- exact startup token-pair/App-ID/workspace validation and swapped-credential
  rejection;
- strict exact-key secret parsing as data, never shell evaluation;
- closed route profile union with exact Actor lineage, Team, channel, workspace,
  and destination; no generic target input;
- additive compatibility strategy that leaves Exact Delivery v2 behavior and
  historical journals/evidence unchanged;
- profile-specific activation, one-use lease/capability, consumption, delivery
  journal, evidence ingress, dedupe namespace, and failure latch;
- durable inbound order: validate envelope shape -> persist immutable receipt and
  dedupe identity -> ACK within Slack's deadline -> asynchronous processing;
- top-level `NEW_MISSION` intake semantics versus canonical Mission creation;
- thread continuation classification and exactly one root correlation;
- bot/edit/delete/hidden/retry/echo/DM/App Home/wrong-identity rejection;
- outbound ACK/question/result schema, redaction, durable outbox, same-thread
  binding, and ambiguous-send manual reconciliation without blind resend;
- Agent Office and Foundation structured ACK/intake/result evidence contracts;
- explicit Foundation profile roleInstanceId separation from historical Agent
  Office evidence;
- restart-safe replay, bounded retry classes, global kill switch plus
  profile-local failure isolation, clean shutdown, and rollback;
- no status/agents/missions commands in AS1;
- exact source-area proposal, WorkUnits, dependency order, tests, and completion
  criteria for the Worker;
- Setup Pack traceability and current unresolved owner-only values.

If an additive closed-profile design cannot be specified without weakening v2,
return `DESIGN_NOT_READY` rather than inventing a generic selector.

## Required reads

- root `AGENTS.md` and `CLAUDE.md`;
- `docs/agent/TEAM_OPERATING_MODEL.md`;
- `docs/agent/roles/designer.md`;
- `docs/agent/RUN_PROTOCOL.md` and `RESULT_REPORTING_PROTOCOL.md`;
- `src/application/organization/{types,registry}.ts`;
- `src/adapters/gateways/tmux-advisor/{exact-config,exact-authority,exact-transport}.ts`;
- `src/application/advisor-inbox/{types,service,evidence-ingress}.ts`;
- `src/operations/readiness/delivery-control.ts`;
- `src/runtime/{operational-config,composition,composition-core}.ts`;
- focused exact-delivery and Advisor Inbox tests;
- this job's `00_INTAKE.md`, `01_ADVISOR_BRIEF.md`, and this brief.

## Completion

Commit and non-force push the complete design package after the Setup Pack
checkpoint. Result evidence must state exact commits, paths, checks, unresolved
unknowns, rollback, zero runtime/source/test/package/secret/live changes, and
return to Advisor. Do not dispatch Reviewer or Worker.
