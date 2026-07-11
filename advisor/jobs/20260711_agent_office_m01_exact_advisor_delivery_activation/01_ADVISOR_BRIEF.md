# Advisor Brief - Exact Agent Office to Advisor Delivery Bridge

## Objective

Complete the reviewed design, implementation, independent review, and one
synthetic non-sensitive actual rehearsal for the exact Agent Office-to-existing
Advisor-session pointer bridge.

## Authority Boundary

The bridge is not a browser terminal. Browser input remains a typed Leo message
that is first persisted as an immutable Agent Office artifact. Only a canonical
pointer envelope derived from that durable artifact may reach the one fixed
Advisor pane. The Advisor independently reads evidence and records canonical
acknowledgement/intake/decision/resume evidence. No work resumes from delivery
alone.

## Required Train

1. Agent Office Worker design-only canonical candidate.
2. Fable5 Level-3 design review.
3. Same Worker implementation of the reviewed design.
4. Fable5 Level-3 implementation/security review.
5. Advisor actual rehearsal with non-sensitive synthetic content.
6. Advisor final M01 audit.

Dependent steps are strictly serial. `PASS_WITH_RISK` returns to Leo/GPT.

## Non-Negotiable Invariants

- fixed destination is only `foundation-advisor/$9/%9` after live preflight;
- destination is selected by trusted server configuration, never browser input;
- exact pointer-only payload; no body text, command, key sequence, role target,
  pane ID, path override, or shell syntax from browser input enters tmux;
- transport uses argv/no-shell and exact buffer semantics;
- no broadcast, wildcard, synchronized pane, or multi-pane send;
- requestId plus content hash and notificationId enforce no duplicate delivery;
- ambiguous outcome never blind-resends;
- kill switch and capability mismatch fail to manual fallback before input;
- Advisor ACK is separate from transport receipt;
- canonical intake/decision evidence is required before resume;
- LocalBootstrap remains exact loopback-only;
- Worker/Reviewer dispatch and arbitrary terminal authority remain impossible.

## Current Technical Evidence

The existing `TmuxAdvisorGateway` already defines a short-lived authority
capability, pointer-only envelope, receipt lookup, idempotent notification cache,
ambiguous/manual fallback behavior, and an injectable `TmuxPointerDeliveryPort`.
Production LocalBootstrap intentionally rejects capability/port injection. The
new design must establish a reviewed trusted selection and production delivery
port without weakening that default.

The existing Advisor Inbox persists immutable message artifacts before events
and models delivery receipt, acknowledgement, canonical intake, decision, and
resume. The design must prove a production evidence ingress route for the
Advisor side rather than relying on test-only `advisor_operator` authentication
or treating tmux delivery as acknowledgement.

## Completion Standard

All nine Leo/GPT success criteria must map to implementation paths, tests,
review evidence, and actual rehearsal evidence. Agent Office M01 is not complete
until AO-WU-15 final audit is accepted by Leo/GPT.
