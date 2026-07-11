# Frozen Delivery Design Question Register

Status: `FROZEN_BEFORE_WORKER_DESIGN`

## DQ-01 Authority Source

- Question: Which Git-visible authority, activation, registry, and kill-switch
  snapshots are required to mint a bounded runtime capability?
- Safe default: capability absent, manual fallback.
- Owner: technical design; Leo/GPT if current authority cannot be represented.

## DQ-02 Exact Destination Preflight

- Question: How does the adapter prove exact session/window/pane, workspace,
  process, role, readiness, non-synchronized state, and mission identity
  immediately before the sole send?
- Safe default: any mismatch stops before input.
- Owner: technical design.

## DQ-03 Pointer Envelope and Transport

- Question: What exact canonical pointer envelope and argv/no-shell buffer
  sequence can reach Advisor without carrying browser text or command syntax?
- Safe default: no tmux input.
- Owner: technical design.

## DQ-04 Idempotency and No Blind Resend

- Question: How are requestId, message hash, notificationId, durable receipt,
  lookup, crash boundaries, ambiguous results, and process restart reconciled?
- Safe default: ambiguity -> manual fallback, no resend.
- Owner: technical design.

## DQ-05 Advisor ACK and Canonical Evidence Ingress

- Question: How can the existing Advisor session record acknowledgement,
  canonical intake, decision, and resume evidence that Agent Office verifies,
  without browser-granted `advisor_operator`, arbitrary commands, secrets, or
  self-attested chat prose?
- Safe default: delivered does not mean acknowledged or resumed.
- Owner: technical design. Return to Leo/GPT if an authority choice is needed.

## DQ-06 Kill Switch and Manual Fallback

- Question: How are external transport kill switch, local delivery disable,
  capability expiry, stale registry, unexpected prompt, timeout, and process
  restart projected and recovered without auto-enable?
- Safe default: delivery disabled/manual fallback.
- Owner: technical design.

## DQ-07 Rehearsal Proof

- Question: Which synthetic message, pointer, Advisor receipt, canonical evidence,
  negative cases, Git proof, and cleanup prove the bridge without real product
  work or another mission?
- Safe default: no rehearsal until dual review PASS.
- Owner: Advisor after implementation/security PASS.

## DQ-08 Scope Isolation

- Question: How is loopback-only auth preserved while public/remote/Tailscale,
  DB, Hermes, Worker/Reviewer routing, and terminal execution remain absent?
- Safe default: exact LocalBootstrap loopback and fixed Advisor route only.
- Owner: technical design and Fable5 review.

No question may be silently removed. New material product/risk decisions return
to Leo/GPT before implementation.
