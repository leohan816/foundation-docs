# Advisor AO12-D Direct Validation

Status: `NEEDS_IN_SCOPE_REWORK_BEFORE_FABLE5`

## Scope verified

- Agent Office branch `shadow/agent-office-m1-2-spatial-office` is clean at
  `da5ecc9d1ecd0d331b20724a1f5bfca03d783a10` and equals its upstream.
- The exact AO12-D delta from accepted base
  `f9d0533437c0cf9efa7be76650ad79f0cb0d9353` contains the declared 30 paths.
- The Worker result and pointer are published at Foundation Docs commits
  `6974704e0a9555e9dde91cf50595f36f70f648ed` and
  `76b0478f562b6109133d190bdce903e06dcb27d6`.
- Advisor directly inspected the authenticated projection, compatibility and
  runtime-client paths, all seven new AO12-D images, the relevant session/SSE
  lifecycle, the exact Git delta, and the production bundle.

## Accepted direct evidence

The seven new desktop, tablet, mobile, 320px, 200-percent-text, reduced-motion,
and forced-colors images are legible and preserve the intended semantic state.
The session-expiry behavior is not an AO12-D regression: the server SSE broker
revalidates the session on each heartbeat, emits `session_revoked`, closes the
connection, and the client clears projection and private cue state. The
integration test exercises revocation and expiry and verifies zero remaining
SSE connection, projection, spatial state, and mutation capability.

## Blocking finding AO12-D-A1

Classification: `CODE_DEFECT`

The AO12-D acceptance criterion says `no synthetic fixture in production`, but
the committed production dashboard bundle contains all of the following:

- `SYNTHETIC_NON_OPERATIONAL_STATIC`;
- `SYNTHETIC_STRUCTURED_EVENT_MOTION`;
- `AO12-C synthetic accepted-event motion fixture`; and
- `ao12-b-static-shared-floor`.

The direct source cause is the production-rendered `SpatialOffice` module's
static import of `STATIC_SPATIAL_OFFICE_FIXTURE` and its default `projection`
prop. The authenticated runtime supplies an explicit validated projection and
does not render the fixture, so no false activity was observed. Nevertheless,
the synthetic fixture is part of the production JavaScript and the exact
acceptance claim is false.

This finding must be corrected before Fable5 review. It requires no product,
authority, security, or scope decision.

## Required correction

1. Remove the static/demo fixture dependency from the production-rendered
   `SpatialOffice` module and production dashboard bundle.
2. Keep synthetic fixtures available only through explicit demo/test-only
   composition.
3. Add a deterministic production-bundle regression gate for the exact fixture
   markers and IDs above, plus any equivalent fixture import marker selected by
   the Worker.
4. Preserve authenticated explicit projection behavior, M1 fallback,
   LocalBootstrap/session lifecycle, Advisor delivery, all 19 prior baseline
   bytes, and all seven AO12-D image meanings.
5. Rerun focused tests, full Vitest, build, both Playwright suites, audit, and
   exact bundle/baseline/Git checks.
6. Publish a factual rework result and pointer. The original result remains
   immutable history and is superseded for this finding by the rework result.

## Decision

```text
ADVISOR_VALIDATION: NEEDS_IN_SCOPE_REWORK
FINDING: AO12-D-A1_PRODUCTION_BUNDLE_CONTAINS_SYNTHETIC_SPATIAL_FIXTURE
PATCHABLE_WITHIN_APPROVED_SCOPE: true
FABLE5_REVIEW_STATUS: NOT_ROUTED
NEXT_ACTOR: Agent Office Worker
RETURN_TO: Advisor
```
