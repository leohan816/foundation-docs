# Frozen Scope, Path Allowlist, and Execution Plan

```text
MISSION_ID: COSMILE_O1_BROWSER_NONPROD_RUNTIME_INTEGRATION_AND_VERIFICATION_V1
GATE: PROCEED_WITH_LIMITS
PRODUCT_REPOSITORY: /home/leo/Project/Cosmile
START_BRANCH: implementation/cosmile-o1-korea-golden-commerce-v1-20260717
START_HEAD: 63fdd2d507357861aec582b980006baa7d7045a4
MISSION_BRANCH: implementation/cosmile-o1-browser-nonprod-runtime-v1-20260718
MISSION_WORKTREE: /home/leo/Project/.worktrees/Cosmile/COSMILE_O1_BROWSER_NONPROD_RUNTIME_INTEGRATION_AND_VERIFICATION_V1
AUTHORIZED_PRODUCT_ACTOR: cosmile
REQUIRED_SKILL: /fable-builder
REQUIRED_EFFORT: max
```

## Exact product-path allowlist

Only the following paths may be created or modified. A path not listed here requires an Advisor scope check before any write; material expansion returns to Strategy.

Existing paths:

```text
app/.env.example
app/src/middleware.ts
app/src/lib/slice/flags.ts
app/src/lib/checkout.ts
app/src/lib/foundationProductClient.ts
app/src/app/shop/page.tsx
app/src/app/products/[id]/page.tsx
app/src/app/cart/page.tsx
app/src/components/product/CartList.tsx
app/src/app/orders/[orderId]/page.tsx
app/src/app/account/orders/page.tsx
app/src/app/api/auth/google/start/route.ts
app/src/app/api/auth/google/callback/route.ts
app/docs/FEATURE_INDEX.md
```

New bounded runtime, route, UI, evidence, and test paths:

```text
app/src/lib/runtime/o1NonprodConfig.ts
app/src/lib/runtime/o1CommerceRuntime.ts
app/src/lib/runtime/o1FixtureSetup.ts
app/src/lib/payment/tossSandboxTransport.ts
app/src/lib/auth/o1Operator.ts
app/src/lib/auth/o1PreviewAccess.ts
app/src/components/commerce/O1TossCheckout.tsx
app/src/components/commerce/O1OrderStatus.tsx
app/src/components/commerce/O1OperatorPanel.tsx
app/src/app/preview/page.tsx
app/src/app/api/preview/access/route.ts
app/src/app/api/o1/checkout/start/route.ts
app/src/app/api/o1/checkout/toss/success/route.ts
app/src/app/api/o1/checkout/toss/fail/route.ts
app/src/app/api/o1/webhooks/toss/route.ts
app/src/app/api/o1/orders/[orderId]/route.ts
app/src/app/api/o1/operator/orders/route.ts
app/src/app/api/o1/operator/orders/[orderId]/route.ts
app/src/app/api/o1/operator/orders/[orderId]/shipment/route.ts
app/src/app/api/o1/operator/orders/[orderId]/refund/route.ts
app/src/app/o1/operator/page.tsx
app/src/app/o1/operator/orders/[orderId]/page.tsx
app/scripts/o1_browser_runtime_contract.vitest.ts
app/scripts/o1_browser_runtime_property.vitest.ts
app/scripts/o1_browser_runtime.dbtest.py
app/scripts/o1_browser_golden_order.playwright.mjs
app/scripts/o1_browser_golden_reversal.playwright.mjs
app/scripts/o1_nonprod_fixture_setup.ts
app/docs/COSMILE_O1_BROWSER_NONPROD_RUNTIME_INTEGRATION.md
```

The Worker may leave an allowlisted file unchanged. Existing mock paths must remain available when the new non-production flag is OFF. No legacy console rewrite is authorized.

## Action allowlist

- add a single server-side, non-production-only runtime flag that is forced OFF in production;
- connect the reviewed service/repository lanes to minimal O1 checkout, callback, webhook, customer projection, operator projection, shipment, and full-refund routes;
- filter the O1 browser catalog to snapshot-eligible synthetic ELT evidence and fail closed when the local bundle, binding, price, stock, or approval/gate contract is absent;
- preserve `resolveUnitPrice` as the Cosmile KRW authority and bind order lines to the approved snapshot;
- require an authenticated Google customer and deny guest/mock checkout in O1 mode;
- derive operator access from a separate authenticated Google subject and a server-only exact allowlist; never use email as authority;
- implement a test-only, action-bound, single-use step-up bridge into the reviewed WU-E verifier for refund and any sensitive recovery action; never call it production step-up;
- use the reviewed Toss services and a bounded official TEST transport; never let browser return or webhook payload establish money truth;
- use a preview-access gate before any TLS tunnel is started; provider callback paths remain minimal and still perform their own fail-closed verification;
- use only the two predecessor-reviewed migrations against one mission-owned disposable PostgreSQL instance;
- use synthetic fixtures and the reviewed asynchronous local Foundation bundle contract only;
- add focused tests, isolated DB tests, existing-gate regressions, and browser scripts without dependency installation;
- commit intentionally on the mission branch and push only reviewed results.

## Runtime and teardown plan

```text
DATABASE: unique mission-owned postgres:16-alpine container, tmpfs data, loopback-only random host port
DATABASE_DATA: synthetic only
DEPENDENCY_INSTALL: NO
NODE_MODULES: reuse existing repository installation without modifying it
BROWSER: existing Playwright + cached Chromium only
TLS_PREVIEW: cloudflared only after application preview gate verification
SECRET_SOURCE: owner-only 0600 mission env file or no-echo approved injection; values never inspected or captured by Advisor
PRODUCT_RUNTIME: one non-production Next process
PUBLIC_ACCESS: preview-gated browser paths plus exact Google/Toss callback paths only
CLEANUP: stop Next, stop tunnel, remove callback registrations when owner-controlled, remove disposable DB, remove mission env/temp files, verify process/container absence
```

## Completion gates

1. Prisma generate, typecheck, and non-production build pass without schema change.
2. Reviewed migrations apply to the isolated database; runtime starts with synthetic data and no production contact.
3. Preview access denies an unauthenticated general request before tunnel start.
4. Official Google test-mode OIDC proves separate customer/operator identities without exposing identifiers.
5. Toss TEST capture is server-confirmed and durable binding matches internal order, positive integer KRW amount, payment key, and current state.
6. General-payment webhook is recorded as untrusted, pull-verified, replay-safe, and creates no duplicate economic effect.
7. Browser Golden Order reaches confirmed customer and operator projections and record-only shipment/tracking.
8. Separate browser Golden Reversal completes one full sandbox refund, leaves inventory committed/HOLD, and replays with zero second effect.
9. Evidence is sanitized and the environment is fully shut down.
10. Independent Reviewer returns PASS or bounded corrections are completed and re-reviewed.
11. Advisor final audit holds the claim ceiling and activates HARD STOP.
