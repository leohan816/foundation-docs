# Advisor Brief - LocalBootstrap Private-Run Gate

## Decision validation

Verdict: `PROCEED_WITH_LIMITS`.

The authorization closes the exact AO-WU-14 authority gap. It does not authorize
real Advisor delivery, public/private-network exposure, production deployment,
or another Agent Office product mission.

## Current facts

1. `AuthenticationProvider` and `BrowserSessionRegistry` already define proof
   exchange, server-side sessions, expiry, revocation, CSRF, capability, cookie,
   and SSE-revocation boundaries.
2. Only `TestAuthenticationProvider` exists. The production composition injects
   no provider and is correctly `AUTH_BLOCKED / READ_ONLY`.
3. The HTTP server has protected projection/SSE/mutation routes but no production
   LocalBootstrap exchange/login/logout route.
4. Deployment configuration permits only `NONE_READ_ONLY` and `DISABLED`.
5. Operational runtime config already rejects group/other writable mode. Any new
   auth/deployment/credential control file must enforce an equivalent or stronger
   owner/no-follow/regular/bounded policy.
6. Real tmux delivery remains default-off and must have no delivery port or usable
   capability in the private run.
7. A Mac SSH tunnel preserves loopback only when its browser origin/Host matches
   the configured server origin. The expected private-run port is 4317.

## Required release sequence

1. Worker implements code, tests, canonical as-built docs, and a non-secret
   private-run preparation/runbook. No real credential is created in this step.
2. Advisor verifies code, tests, Git, and absence of credential material.
3. Fable5 performs separate design-delta and implementation/security reviews.
4. Only after both reviews return `PASS`, Advisor creates the real owner-only
   LocalBootstrap runtime material outside Git and runs the loopback private
   verification.
5. Fable5 reviews the operational evidence delta.
6. Advisor completes AO-WU-14 and returns a separate real-delivery activation
   decision package to Leo/GPT. Delivery is never activated automatically.

## Safe default

Until all gates pass, production remains `AUTH_BLOCKED / READ_ONLY`, manual
fallback remains visible, and no credential or real delivery port exists.
