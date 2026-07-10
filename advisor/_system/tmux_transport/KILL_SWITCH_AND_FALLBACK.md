# tmux Transport Kill Switch and Manual Fallback

Current kill-switch state: `DISENGAGED`

Current fallback: `MANUAL_ROUTING_ACTIVE`

Final activation approval does not remove the kill switch. Advisor must engage it
immediately on any trigger below.

## Engage Immediately When

- a target/session/pane mismatch appears;
- a prompt was sent to the wrong or uncertain target;
- synchronized panes or broadcast behavior is detected;
- an unexpected approval, authentication, privilege, DB, secret,
  protected-branch, production, live, destructive Git, or scope prompt appears;
- launcher checksum or committed-source evidence fails;
- parallel isolation or same-branch serialization fails;
- output suggests actor-role drift, self-review, or new-agent delegation;
- timeout, stall, result, or Git evidence cannot be resolved safely.

## Kill-Switch Effect

1. Send no new tmux input to any role session.
2. Send no retry, clarification, approval, `Ctrl-C`, or termination key.
3. Mark active dispatches `STOPPED_TRANSPORT_KILL_SWITCH` in the ledgers.
4. Capture non-secret metadata and durable file/Git evidence.
5. Return the exception to Advisor or Leo/GPT under canonical routing.
6. Use manual copy/paste only after the recipient and exact prompt are revalidated.

The kill switch stops transport. It does not terminate model processes or undo
work. Process termination, reset, cleanup, or rollback requires separate authority.

## Re-enable Conditions

Transport may resume only when:

- the triggering issue is documented and resolved;
- active dispatch ledgers are reconciled;
- live registry and launcher evidence pass again;
- no approval or authority decision remains pending;
- the activation record is still valid;
- Advisor records `KILL_SWITCH_DISENGAGED_AFTER_REVALIDATION`.

The initial Leo/GPT final activation was approved on 2026-07-10 UTC. Any future
re-enable after a kill-switch event still requires the revalidation conditions
above and any escalation required by the triggering event.
