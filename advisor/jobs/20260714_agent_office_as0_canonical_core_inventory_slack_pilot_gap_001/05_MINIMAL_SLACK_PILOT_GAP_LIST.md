# Minimal Slack Pilot Gap List

## Required Before First Connection

- Reconcile the exact implementation baseline so the reviewed organization
  module is present without making the deferred visual product a pilot
  dependency.
- Record the existing Advisor as `AGENT_OFFICE_ADVISOR` and keep
  `FOUNDATION_ADVISOR` absent.
- Create one Slack app in Socket Mode with minimum scopes and no public request
  URL.
- Inject app and bot tokens from owner-controlled runtime state; never commit
  them or include them in artifacts/logs.
- Add exact workspace, Leo user, and one channel allowlists.
- Add the Socket Mode lifecycle adapter, schema validation, redacted logging,
  bounded reconnect/backoff, and an immediate transport ACK path.
- Add deterministic Slack envelope/event dedupe and restart persistence.

## Required Before Read-Only Status

- Define bounded commands or app-mention grammar for `status`, `agents`, and
  `missions`; ignore ordinary channel conversation.
- Read only current Agent Office projections and the reconciled organization
  registry.
- Preserve `UNKNOWN`, stale, conflict, offline, and unavailable states.
- Bound response size and redact internal paths/content not intended for Leo.
- Persist query/audit receipts without treating queries as Mission events.

## Required Before Real Advisor Round Trip

- Convert one validated Slack mission message into an immutable existing
  Advisor Inbox artifact plus a Slack correlation artifact.
- Reuse the fixed Advisor pointer gateway without adding a target selector.
- Obtain fresh one-use exact Advisor delivery authority and revalidate the live
  registered Agent Office Advisor pane immediately before the rehearsal.
- Record Slack receipt, Agent Office persistence, Advisor delivery receipt,
  Advisor ACK, canonical intake/result, and Slack reply as separate stages.
- Return only a structured Founder-facing result to the same channel/thread.
- Prove duplicate Slack envelopes, retries, restarts, and changed-content reuse
  cannot cause duplicate Advisor delivery or duplicate thread replies.
- Keep manual fallback visible and non-destructive for every ambiguous state.

## Deferred Until Worker/Reviewer Automation

- Worker or Reviewer dispatch from Slack.
- staffing, Reviewer selection, patch-loop commands, or role reassignment.
- automatic consumption of dispatch/result/review ledgers as action authority.
- automatic Foundation Advisor creation.
- multi-Team channel mapping or general mission routing.

## Deferred Until Security Hardening

- token rotation UI or managed secret store;
- multiple Slack workspaces/users/channels;
- admin delegation and multi-user authorization;
- granular data-retention policy beyond pilot-local bounded artifacts;
- production availability/SLA, public endpoints, remote deployment, or DB;
- Slack file uploads, rich interactive modals, links with private previews, or
  broad message-history access;
- Hermes or remote Agent Office nodes.

## Owner Gates

The future implementation mission requires Leo to create/install the Slack app,
provide the exact workspace/user/channel IDs, and inject fresh tokens at run
time. The implementation and tests must use fakes until that owner gate.
