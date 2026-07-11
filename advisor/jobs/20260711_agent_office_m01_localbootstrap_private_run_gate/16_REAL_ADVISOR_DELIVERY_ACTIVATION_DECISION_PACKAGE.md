# Leo/GPT Decision Package - Real Agent Office to Advisor Delivery

Status: `NEEDS_LEO_GPT_DECISION__NO_DELIVERY_ACTIVE`

## Confirmed Facts

- LocalBootstrap code, design, implementation/security review, and actual private
  run all passed.
- Agent Office can authenticate Leo locally and persist a typed `leo_input`
  message while showing manual fallback.
- LocalBootstrap currently rejects any injected gateway capability or delivery
  port before bind. Real delivery therefore cannot be enabled by config alone.
- The active Advisor-managed tmux transport protocol supports exact committed
  launcher transport to verified existing role panes, but browser code does not
  inherit that authority.
- Remote/Mac/Tailscale/public access is not approved by this package.

## Decision Question

Should Leo/GPT open a separate Level-3 M01 mission to design, implement, and
review the exact Agent Office-to-Advisor delivery bridge?

## Option A - Open Exact Advisor Delivery Activation Mission

Recommended.

The new mission would be limited to:

- immutable operational message artifact and exact pointer delivery;
- fixed target: existing Advisor role session only;
- requestId/content-hash idempotency and no blind resend;
- Advisor acknowledgement and canonical intake/decision evidence;
- manual kill switch and manual fallback;
- no Worker/Reviewer pane choice or direct dispatch from the browser;
- no arbitrary terminal command, shell interpolation, broadcast, wildcard, or
  automatic approval response;
- loopback-only server scope unless a separate network decision is approved;
- Fable5 Level-3 design plus implementation/security review;
- actual delivery rehearsal with synthetic non-sensitive content before any
  operational use.

This requires an explicit code/design patch because the reviewed LocalBootstrap
branch intentionally rejects capability/port injection.

## Option B - Keep Manual Fallback

Agent Office remains an authenticated private projection and local message
preparation tool. Leo continues to relay Advisor decisions manually. No delivery
code or runtime authority changes.

## Advisor Recommendation

`OPTION_A__OPEN_SEPARATE_EXACT_ADVISOR_DELIVERY_ACTIVATION_MISSION`

Reason: LocalBootstrap and recovery boundaries are now proven, while the next
missing M01 capability is narrowly identifiable. Keeping it as a separate
reviewed gate preserves the browser/transport authority separation.

## Safe Default

Until Leo/GPT explicitly selects Option A, keep:

- server stopped;
- `MANUAL_FALLBACK_REQUIRED`;
- gateway capability absent;
- no delivery port;
- no remote access;
- no next product mission.

## Not Part of This Decision

- Tailscale, SSH forwarding, Mac access, public exposure, TLS/proxy, or remote
  host trust;
- DB or multi-user auth;
- Hermes;
- Worker/Reviewer dispatch;
- production deployment.
