# Slack Pilot Reuse Map

## One Safe Path

```text
Slack Socket Mode envelope
-> verify envelope type and acknowledge Slack transport receipt
-> enforce exact workspace + Leo user + channel allowlist
-> accept only bounded app mention/query grammar
-> dedupe by Slack event/envelope ID and canonical requestId/content hash
-> persist immutable Slack correlation artifact
-> call existing Advisor Inbox message persistence
-> append existing canonical events/evidence
-> queue existing canonical Advisor pointer notification
-> exact fixed-destination TmuxAdvisorGateway
-> Advisor ACK artifact/event
-> Advisor canonical intake / decision / result artifact
-> select only a Founder-facing accepted structured result
-> post idempotently to the original Slack thread
-> persist Slack reply receipt and redacted audit record
```

## Boundary Rules

1. A Slack Socket ACK means only that Slack transport delivery was received. It
   is not Advisor acknowledgement, mission creation, decision acceptance, or
   work resumption.
2. Slack message text is input, not evidence of execution or completion.
3. The immutable Agent Office message artifact is written before Advisor
   delivery is attempted.
4. Slack never receives a pane, session, command, launcher, Worker, or Reviewer
   target.
5. The exact Advisor gateway retains its fixed destination, one-use authority,
   no-shell implementation, kill switch, ambiguity handling, and no-blind-resend
   behavior. The current registry locator is `foundation-advisor` at
   `$9 / @9 / %9`, but it must be revalidated live and must never be inferred
   from this inventory alone.
6. Status replies read deterministic canonical projections. Unknown and stale
   values stay unknown/stale.
7. Same-thread output is permitted only for an accepted structured
   Founder-facing result that links to the original request/correlation.
8. Full launchers, raw tmux text, secrets, private prompts, repetitive patch
   chatter, and unverified summaries are never default Slack output.

## Canonical-to-Slack Mapping

| Slack concern | Reused canonical capability | Additive pilot element |
|---|---|---|
| Incoming identity | Agent Office message actor/authority validation | exact workspace/user/channel allowlist |
| Message immutability | artifact store and Advisor Inbox | Slack envelope/correlation artifact |
| Duplicate prevention | requestId/content hash and durable receipts | Slack `event_id`/envelope ID key |
| Mission intake | existing Advisor Inbox lifecycle | strict message/command parser |
| Advisor delivery | `AdvisorGateway` / fixed tmux implementation | none; fresh authority only |
| Advisor acknowledgement | existing Advisor ACK artifact/event | thread status projection |
| Status | mission/runtime projections | concise Slack formatter |
| Agents | reconciled organization registry | concise Slack formatter |
| Missions | Mission Manifest/current projection | concise Slack formatter |
| Result | existing result/evidence pointers | Founder-facing result selector and thread reply receipt |
| Audit | security audit/event chain | redacted Slack transport events |

## Explicit Non-Reuse

- Living Office visual state is not used as canonical Slack state.
- foundation-docs prose ledgers are not parsed as live work status.
- the Hermes stub is not activated.
- LocalBootstrap browser authentication is not repurposed as Slack auth.
- Slack is not implemented as a second `AdvisorGateway` destination selector.
