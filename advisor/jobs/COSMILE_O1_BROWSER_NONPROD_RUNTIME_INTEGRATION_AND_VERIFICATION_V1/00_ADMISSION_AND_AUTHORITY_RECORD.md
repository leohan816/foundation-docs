# Advisor Admission and Authority Record

```text
MISSION_ID: COSMILE_O1_BROWSER_NONPROD_RUNTIME_INTEGRATION_AND_VERIFICATION_V1
RESPONSIBLE_ADVISOR: foundation-advisor
SOURCE: foundation-strategy-sol under explicit Leo authority dated 2026-07-18
MISSION_TYPE: BOUNDED_NON_PRODUCTION_RUNTIME_INTEGRATION_AND_VERIFICATION
INSTRUCTION_GATE: PROCEED_WITH_LIMITS
IMPLEMENTATION_SCOPE: COSMILE_ONLY
FOUNDATION_WRITE: NOT_AUTHORIZED
NEW_SCHEMA_OR_MIGRATION: NOT_AUTHORIZED
PRODUCTION_OR_LIVE: NOT_AUTHORIZED
HARD_STOP_AFTER_REVIEWED_BROWSER_EVIDENCE: ACTIVE
```

## Current authority and predecessor pins

The current Agent Office authority was re-read from:

- `/home/leo/Project/agent-office/docs/agent/TEAM_OPERATING_MODEL.md`
- `/home/leo/Project/agent-office/docs/agent/roles/advisor.md`
- `/home/leo/Project/agent-office/docs/agent/roles/worker.md`
- `/home/leo/Project/agent-office/docs/agent/roles/reviewer.md`
- `/home/leo/Project/Cosmile/AGENTS.md`
- `/home/leo/Project/Cosmile/CLAUDE.md`

The predecessor is verified from Git, not conversation memory:

```text
FOUNDATION_RESULT_HEAD: 73ff00361d9fa88ab57c17858210c1e080dfde1a
COSMILE_RESULT_BRANCH: implementation/cosmile-o1-korea-golden-commerce-v1-20260717
COSMILE_RESULT_HEAD: 63fdd2d507357861aec582b980006baa7d7045a4
COSMILE_UPSTREAM_STATE: EQUAL_0_0
COSMILE_WORKTREE_STATE: CLEAN
FOUNDATION_DOCS_FINAL_POINTER_COMMIT: 250f72d387b494974c46c7b8c7bbb692c103ee3e
FINAL_POINTER: runs/shared/COSMILE_O1_KOREA_GOLDEN_COMMERCE_IMPLEMENTATION_V1/119_FINAL_POINTER.md
INTEGRATED_REVIEW: PASS
BLOCKING_FINDINGS: 0
PREDECESSOR_CLAIM: REVIEWED_NON_PRODUCTION_GOLDEN_COMMERCE_IMPLEMENTATION_WITH_SANDBOX_WALKING_SKELETON_EVIDENCE
```

The Cosmile predecessor draft PR is open and remains a draft. Its head is the exact predecessor head. This mission will use a new isolated branch/worktree and will not rewrite the reviewed predecessor history.

## Direct as-built admission findings

1. The reviewed O1 schema and service/repository lanes exist for Google OIDC, Foundation snapshot import/catalog gating, inventory reservation, Toss payment/refund, webhook inbox/pull verification, order lifecycle, record-only shipment/tracking, reconciliation, and test-only step-up.
2. The reviewed migrations already contain the additive O1 substrate, including `CustomerAccount`, `AuthIdentity`, `CustomerSession`, `PaymentIntent`, `PaymentTransaction`, `Refund`, `InventoryReservation`, `WebhookEventInbox`, `OrderStatusHistory`, `ReconciliationTask`, `FoundationProductSnapshot`, `SkuBinding`, and `ShipmentRecord`. No new schema has been shown necessary.
3. Browser readiness is not present at the predecessor head. The existing cart still calls `/api/checkout/start` followed by `/api/checkout/mock-complete`; `completeMockOrder` directly changes `Order.status` to `paid`. Existing customer order pages label the order as mock. Existing admin order mutation directly patches the legacy order status.
4. The current O1 service lanes are not composed by the storefront, checkout, customer-order, webhook, or operator browser routes. The mission therefore requires a bounded runtime composition and minimal UI connection, not a new commerce architecture.
5. The existing storefront, cart, product, account, and order surfaces can be reused. A separate O1 non-production operator projection can avoid rewriting the legacy console.
6. The current Google OIDC seam is default OFF and stores only issuer/subject as the immutable identity key. It is suitable for separate dedicated customer and operator test accounts. Operator authority must be derived by comparing the authenticated identity's immutable Google subject to a server-only allowlist; email is never an authority key.
7. The reviewed WU-E step-up implementation is explicitly test/harness-only and fail-closed. This mission may bind it to one test-only action request using a server-only step-up secret, separate from customer authentication, without claiming production step-up readiness.
8. The host has an already-installed PostgreSQL 16 Alpine image, Docker, `cloudflared`, and an already-installed Playwright/Chromium toolchain. No image pull or dependency installation is necessary. Use is still gated by the committed Worker handoff and runtime-safety checks.
9. The only current repository secret convention evidenced by project policy is an owner-only (`0600`) ignored env file or no-echo/approved secret-manager injection. No existing `.env.local` value was read. The predecessor worktree contains no mission secrets.
10. A restricted TLS preview can be constructed only if the application itself denies general access with a server-verified preview gate and exposes only the exact Google/Toss callbacks. A random tunnel URL alone is not access control.

## Primary provider facts verified for this admission

The following were checked against official primary documentation:

- Google web-server OIDC requires exact redirect-URI registration, state/CSRF protection, code exchange, ID-token verification, and HTTPS for non-localhost redirect URIs.
- Toss Payments V2 uses the official V2 SDK, a server confirmation call, and server-side binding of `paymentKey`, merchant `orderId`, and integer KRW amount.
- General-payment webhook notification is not treated as money truth. The server re-queries the Payment API and compares the durable internal binding before changing internal state.
- A full Toss cancel omits `cancelAmount`; Idempotency-Key is used on the POST provider effects.

Primary references:

- https://developers.google.com/identity/openid-connect/openid-connect
- https://developers.google.com/identity/protocols/oauth2/web-server
- https://docs.tosspayments.com/guides/v2/get-started/llms-quick-reference

## Admission limits

`PROCEED_WITH_LIMITS` means credential-independent implementation, build, isolated-DB rehearsal, and local browser verification may continue. Official Google/Toss execution and the external TLS preview may begin only after all of these pass:

- the exact names-only checklist is satisfied by Leo or an approved owner without placing values in chat, tmux text, Git, logs, screenshots, or evidence;
- every key is test/sandbox only and the runtime refuses live keys/modes;
- the preview gate is verified before tunnel exposure;
- the disposable database identity and cleanup ownership are proven;
- command output and browser capture are sanitized.

If a new schema/migration, Foundation write, broad storefront rewrite, public exposure, real PII, real payment, or production/shared service becomes necessary, stop and return to Strategy.
