# Implementation Routing Recommendation

This is a recommendation only. No session is dispatched by AS0.

## Design Actor Decision

No Designer is needed. The work has no visual product decision.

Do not route `foundation-control`; it has been removed from Agent Office work.
The existing canonical contracts already define Mission, Event, Evidence,
Decision, projection, gateway, audit, and recovery boundaries. The future
Advisor handoff should contain a short Slack edge-adapter design delta and exact
file/contract mapping, followed by independent Level 3 review. A new canonical
architecture or second operational model is neither required nor permitted.

## Worker Route

- Session: `agent-office-opus`
- Role: implementation Worker
- Model: verify actual runtime before dispatch; intended `Opus 4.8`
- Effort: `Ultracode`
- Required skill: `/fable-builder`
- Reason: the slice crosses an external API, durable event/artifact boundaries,
  secret injection, restart/idempotency, and existing exact Advisor transport.
  This is a bounded implementation, but not a low-risk mechanical patch.
- Branch/worktree: create a clean hidden worktree under
  `/home/leo/Project/.worktrees/agent-office/` after exact baseline approval.

The Worker must not receive Slack credentials until fake-client tests and the
independent pre-rehearsal review pass.

## Reviewer Routing Decision

- Target actor: Sentinel
- Selected reviewer: Codex SOL / Codex 5.6 SOL Sentinel
- Target session: `foundation-reviewer-sol`
- Required skill: `/fable-sentinel`
- Intended model: verify actual `GPT-5.6 SOL`
- Intended effort: `max`
- Review level: `Level 3`
- Reason: Slack introduces external authentication tokens, external message
  identity, an allowlist, same-thread outbound delivery, and a path into the
  exact Advisor authority boundary. `max` is justified by the actual security
  and command-authority risk, not by routine UI complexity.
- Independence: separate workspace/session, no Worker context reuse, read-only
  candidate inspection, no patching.
- Not selected: the preserved Fable5-lineage session is not required when the
  registered SOL Reviewer is available; Opus Reviewer is not preferred because
  the Worker is already Opus; Designer and Advisor cannot self-review.
- Return result to: Advisor
- Status: `NEEDS_LEO_DECISION`

## Review Sequence

1. Review the bounded adapter design and exact file scope before real Slack
   connection.
2. Review implementation/security/recovery against the actual diff and fake
   tests before credentials are injected.
3. After a real rehearsal, perform a narrow delta/evidence review only. Do not
   repeat the full implementation review when no relevant code changed.

Routine `NEEDS_PATCH` returns to the same Worker and same Reviewer. Any
`PASS_WITH_RISK`, authority expansion, public endpoint, new identity model,
secret-storage change, or exact-transport change returns to Leo/GPT.

## Likely Affected Areas

- new bounded Slack adapter/config/correlation modules under `src/adapters/`
  and/or a thin `src/application/` edge service;
- existing runtime composition only as needed to inject the adapter;
- existing Advisor Inbox and projection ports, preferably unchanged;
- reconciled reviewed organization module from Batch A;
- additive event/artifact types only where existing vocabulary is insufficient;
- security audit redaction;
- focused integration, recovery, security, and fixture tests;
- canonical docs and `docs/FEATURE_INDEX.md`.

Do not modify Living Office rendering, tmux target selection, browser dispatch,
Hermes, DB/schema, public networking, or Worker/Reviewer authority.

## Expected WorkUnits

Use `AS0-SP-01` through `AS0-SP-08` exactly as defined in
`06_24_48_HOUR_VERTICAL_SLICE.md`. Estimated implementation duration is 24-48
hours if Slack app creation and credential gates are available when requested.
