# Independent Design Review Brief

MISSION_ID: `AGENT_OFFICE_AS1_MULTI_TEAM_SLACK_PILOT_001`

TARGET_ACTOR: Agent Office Independent SOL Sentinel Reviewer

REQUIRED_SKILL: `/home/leo/Project/skill/fable-sentinel/SKILL.md`

This brief is not executable until the later exact handoff pins the candidate
commit, base, launcher evidence, and result paths. Review only the frozen
Designer candidate. Do not patch it, implement runtime code, connect Slack,
access secrets, dispatch another actor, or accept risk.

## Review order

1. Product mission and exact two-Team pilot scope.
2. Security and authority boundaries.
3. Slack protocol correctness and recovery semantics.
4. Exact Delivery v2 additive compatibility.
5. Implementability, testability, and rollback.
6. Setup Pack correctness and non-secret status.

Use current official Slack documentation only where protocol behavior or app
manifest semantics must be verified. Record source pointers without copying
large passages.

## Mandatory gates

- Both app and bot identities are exactly `agent-office-advisor` and
  `foundation-advisor`; no impersonation or per-message override is designed.
- The manifests use Socket Mode with app-level `connections:write`, only the
  necessary private-channel message event and bot scopes, and no DM, App Home
  command surface, public Request URL, slash command, shortcut, or interactive
  command path.
- The environment template has exactly the ten approved keys and no value other
  than the approved Leo user ID.
- `/home/leo/.config/agent-office/as1-slack-pilot.env` is parsed as exact-key
  data, never sourced/evaluated, with directory `0700` and file `0600`.
- Startup validates immutable workspace, Leo user, App, channel, token/App, and
  profile correspondence and rejects swapped credentials.
- Channel IDs map to a closed two-profile union. Slack input cannot select or
  override Team, Actor, session, pane, workspace, model, effort, command, or
  path. VibeNews and every other route remain fail closed.
- A fixed profile is routing identity only. Each profile independently receives
  a fresh one-use lease/capability, consumption state, journal, evidence ingress,
  dedupe namespace, and failure latch. There is no standing authority, generic
  selector, blind resend, cross-Team fallback, or credential swapping.
- Exact Delivery v2, historical journals, artifacts, and immutable
  `roleInstanceId` evidence joins remain unchanged. Current routing uses the
  canonical Actor identity only.
- Inbound validation and immutable receipt/dedupe persistence precede Slack ACK;
  durable asynchronous processing follows. Restart/replay cannot create a
  second intake or reuse consumed authority.
- A top-level authorized Leo channel message creates one immutable `NEW_MISSION`
  intake, not a canonical Mission directly. A correlated Leo thread reply is
  classified only as `CLARIFICATION` or `DECISION_RESPONSE`.
- Deferred `status`, `agents`, and `missions` queries create no Mission. DMs,
  wrong users/workspaces/channels/apps, bot/app messages, edits/deletes, hidden
  events, retries, and outbound echoes fail closed without recursive intake.
- Outbound content is structured and redacted, remains in the originating
  thread, and uses a durable outbox with bounded retry classes and manual
  reconciliation for ambiguous sends; no blind resend is possible.
- The Foundation profile uses the new Foundation Advisor identity and a fresh
  live destination verification. It never acquires historical Agent Office
  evidence or uses Agent Office authority material.
- Global kill switch, per-profile isolation, clean shutdown, restart-safe
  replay, failure recovery, and rollback are deterministic.
- The proposed source areas, WorkUnits, focused tests, setup gate, and completion
  criteria are sufficiently exact for one Worker without hidden architecture or
  Batch expansion.
- The Designer changed only its eight allowed paths and made zero runtime,
  package, test, existing-contract, feature-index, secret, tmux, or live-Slack
  changes.

## Required reproduction

- Inspect the exact base-to-candidate diff and changed files.
- Parse both YAML manifests with an available safe parser or equivalent strict
  structural check.
- Verify the exact environment-template key set and empty-value policy.
- Run `git diff --check` for the candidate range.
- Compare the design against the load-bearing Exact Delivery, Advisor Inbox,
  organization, readiness, and runtime composition surfaces named by the
  Designer brief.
- Verify the Designer result claims and all failed commands.

## Verdict

Return exactly one of:

- `PASS`
- `PASS_WITH_RISK`
- `NEEDS_PATCH`
- `FAIL`

Any unresolved security uncertainty, authority broadening, generic destination,
standing capability, historical-evidence transfer, or Slack identity ambiguity
cannot receive `PASS`. `PASS_WITH_RISK` returns to Leo/GPT. Routine patchable
findings return `NEEDS_PATCH` through the same Designer and same Reviewer.
