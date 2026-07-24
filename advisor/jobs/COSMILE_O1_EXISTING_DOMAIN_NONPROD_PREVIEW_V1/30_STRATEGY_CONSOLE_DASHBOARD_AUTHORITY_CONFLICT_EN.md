# Cosmile Console, Dashboard, and O1 Operator-Authority Conflict

```text
MISSION_CONTEXT: COSMILE_O1_EXISTING_DOMAIN_NONPROD_PREVIEW_V1
DOCUMENT_ROLE: STRATEGY ISSUE RECORD
DATE: 2026-07-24
STATUS: OPEN — DESIGN_AND_AUTHORITY_CORRECTION_REQUIRED
IMPLEMENTATION_AUTHORIZED_BY_THIS_DOCUMENT: NO
```

## Executive summary

The reviewed Cosmile storefront candidate is live at
`https://cosmile.leohan.net` as a non-production preview. The storefront,
customer-account surfaces, isolated database, and synthetic product data are
working at the approved evidence ceiling.

However, Leo's first use of the newly exposed internal interface identified two
separate but related defects:

1. A valid Cosmile Console login does not grant access to the O1 operator
   surfaces because the two surfaces use different identity and authorization
   systems.
2. The route and product-language boundary between **Console** and
   **Dashboard** no longer matches the intended product architecture.

The current `/console` route was repurposed as an O1 operations-dashboard home,
while the older AI chat workspace still exists under `/console/c/[id]`. This
mixes two distinct products and leaves the AI Console without a usable first
conversation entry point.

No Golden Commerce economic invariant, order, payment, refund, inventory, or
shipment state was damaged by this issue.

## Evidence pins

```text
PRODUCT_REPOSITORY: leohan816/Cosmile
PRODUCT_BRANCH: implementation/cosmile-o1-storefront-customer-account-v1-20260724
REVIEWED_STOREFRONT_COMMIT: 71e05266086639b4b1ff1f5a277a7f836dc3e5ab
CURRENT_PREVIEW_COMMIT: 3dc5129b573237a85f34bfa65a329a299d31fef2
CURRENT_PREVIEW_DOMAIN: https://cosmile.leohan.net
RUNTIME_CLASS: NON_PRODUCTION_NEXT_DEV
DATABASE_CLASS: DISPOSABLE_SYNTHETIC_POSTGRESQL
```

Commit `3dc5129b573237a85f34bfa65a329a299d31fef2` differs from the reviewed
storefront commit only by adding `cosmile.leohan.net` to the existing Next.js
development-origin allowlist. That correction fixed browser hydration on the
current domain; it did not change product behavior or authorization semantics.

## What Leo observed

1. Leo successfully authenticated at `/console/login` using the newly created
   synthetic non-production Console owner account.
2. The browser entered the "Cosmile Console" shell.
3. The root page then displayed:

   `이 계정에는 O1 운영 권한이 없습니다.`

   Meaning: "This account does not have O1 operator authority."
4. Leo also identified that the screen called "Console" was an operations
   navigation/dashboard, whereas the intended Console is the AI conversation
   workspace through which the service will eventually be controlled.

## Current authorization conflict

### Authorization system A — Cosmile Console session

The `/console/login` flow authenticates against `ConsoleUser` and creates a
`cosmile_console_session` cookie.

The synthetic preview account is correctly present as:

```text
USERNAME: leo
DISPLAY_NAME: Leo
ROLE: owner
ACTIVE: true
```

This authentication completed successfully.

### Authorization system B — O1 operator authority

The new O1 pages under `/console`, including `/console/orders`, perform an
additional independent authorization check:

1. resolve the current shopper/customer identity;
2. require an authenticated Google OIDC identity;
3. compare its immutable Google subject against the server-only O1 operator
   allowlist.

A `ConsoleUser` owner session does not satisfy this check. Possessing the
Console password correctly does not mint Google OIDC operator authority.

The current preview was intentionally started without Google authentication
execution because the current approved preview mission did not have the
required Google runtime configuration. Therefore, the O1 denial is fail-closed
and expected under the present code, but it makes the dashboard unusable to the
authenticated Console owner.

### Why simply bypassing the check is not acceptable

The O1 operator gate protects refund, inventory, recovery, and other sensitive
operations. Removing it or treating any Console login as sufficient authority
would weaken an independently reviewed security boundary.

The correction must explicitly define an operator identity and capability model
for Console users while preserving:

- least privilege;
- explicit owner/admin authorization;
- sensitive-action step-up;
- single-use and action-bound authorization;
- audit evidence;
- separation between customer and operator identities;
- fail-closed behavior.

## Current information-architecture conflict

### Leo's intended product boundary

```text
CONSOLE:
AI conversation and control workspace.
Leo collaborates with AI, reviews plans and evidence, approves bounded actions,
and eventually controls the service through conversation.

DASHBOARD:
Operational visibility and manual management.
Orders, customers, inventory, fulfillment, finance, analytics, settings, and
later agent-operating status are displayed here.
```

The Dashboard may eventually show AI-agent decisions and automation, but it is
not itself the conversational Console.

### Current route reality

| Current route | Current purpose | Problem |
|---|---|---|
| `/console` | New O1 operations navigation/dashboard home | Reuses the name and root intended for AI control |
| `/console/orders` | O1 order and customer-support queue | Requires a separate Google operator identity |
| `/console/fulfillment` | O1 fulfillment surface | Lives inside the Console namespace |
| `/console/finance` | O1 finance/reconciliation surface | Lives inside the Console namespace |
| `/console/settings` | O1 operational settings | Lives inside the Console namespace |
| `/console/commerce` | Older commerce analytics Dashboard | A second dashboard exists inside the same namespace |
| `/console/admin` | Older manual administrator/write surface | Separate legacy authorization and semantics coexist |
| `/console/c/[id]` | Existing AI conversation workspace | Not the root and lacks a usable first-conversation entry path |

## Actual state of the existing AI Console

The AI Console is not absent. Its existing code includes:

- `ConsoleWorkspace`;
- conversations and messages;
- file attachments;
- jobs and artifacts;
- plan, validation, preview, diff, and approval cards;
- owner/admin/editor/viewer permissions;
- audit records.

However, its current behavior is explicitly a **v0 mock planning flow**:

- a message creates a mock Foundation product-intake plan;
- the assistant response explicitly states that it is a mock;
- execution/deployment is disabled;
- it does not currently control Cosmile services;
- it does not provide a clean `/console` entry that creates or selects the
  first conversation.

Therefore, the current evidence ceiling is:

```text
AI_CONSOLE_UI_AND_PERSISTENCE_SKELETON:
PARTIAL_V0_MOCK

AI_SERVICE_CONTROL:
NOT_IMPLEMENTED
```

## What is not broken

This conflict does not invalidate the reviewed Golden Commerce work.

```text
STOREFRONT_PREVIEW: AVAILABLE
CUSTOMER_ACCOUNT_CORE: AVAILABLE
ORDER_PAYMENT_REFUND_INVENTORY_ECONOMIC_SEMANTICS: UNCHANGED
TOSS_PROVIDER_CALL_FROM_THIS_DIAGNOSIS: NONE
DATABASE_SCHEMA_CHANGE: NONE
PRODUCTION_OR_CONTROLLED_LIVE: NOT_AUTHORIZED
```

## Recommended target boundary

The recommended route and responsibility model is:

```text
/console
  AI conversation and control workspace

/console/c/[id]
  Individual conversation

/dashboard
  Operational overview

/dashboard/orders
/dashboard/fulfillment
/dashboard/inventory
/dashboard/finance
/dashboard/customers
/dashboard/analytics
/dashboard/settings
  Bounded operational views and manual controls
```

The existing `/console/commerce` and `/console/admin` functionality should be
assessed for reuse and bounded migration. It should not be rewritten by
default.

## Recommended authorization model

The corrected design should separate three concepts:

1. **Console identity**
   - authenticates a human operator;
   - provider-neutral;
   - may later support Google, passkeys, or another provider.

2. **Operator capabilities**
   - explicitly assigned to the internal operator identity;
   - examples: dashboard read, order support, fulfillment update, refund
     request, inventory adjustment, approval, and agent supervision;
   - not derived from a customer/shopper session.

3. **Sensitive-action step-up**
   - still required for refunds, inventory adjustment, recovery, and other
     high-impact operations;
   - remains action-bound, scoped, auditable, and fail-closed.

Customer Google identity must not silently become operator authority. Likewise,
a generic Console login must not silently gain every O1 capability.

## Recommended bounded correction process

This should not be handled as an improvised route rename.

### Phase 1 — Designer information architecture

- freeze the meanings of Console, Dashboard, Admin, and Agent Control Center;
- define desktop and mobile navigation;
- define the first-conversation Console entry;
- define how the Dashboard links to the Console and vice versa;
- preserve a future AI-operated commerce model without implementing it now.

### Phase 2 — technical and authority design

- inventory the existing `/console/*` routes;
- identify reuse, redirect, migration, and retirement candidates;
- define internal operator identity and capability records;
- define how Console authentication maps to O1 operator capabilities;
- preserve the current economic and step-up boundaries.

### Phase 3 — bounded implementation

- restore `/console` as the AI chat entry;
- establish `/dashboard` as the operations root;
- migrate only the reviewed operational surfaces;
- add compatibility redirects where safe;
- add a real first-conversation path;
- correct O1 authorization without bypassing sensitive controls.

### Phase 4 — independent review

- review route compatibility;
- review identity and privilege separation;
- review sensitive-action step-up preservation;
- review that no customer identity grants operator authority;
- review that no Golden Commerce economic semantics changed.

## Decisions for Leo and GPT

1. Confirm that `/console` must exclusively mean the AI conversation/control
   workspace.
2. Confirm that `/dashboard` must be the primary operational interface.
3. Confirm whether `/console/admin` should become `/dashboard/admin` or be
   decomposed into domain-specific dashboard controls.
4. Confirm that the first correction should restore navigation and authority
   boundaries only, without adding new dashboard modules or AI automation.
5. Confirm that Console operator identity must be provider-neutral and separate
   from customer Google identity.
6. Confirm that sensitive actions continue to require explicit step-up even for
   owner/admin users.

## Strategy recommendation

```text
RECOMMENDATION:
PROCEED_WITH_A_BOUNDED_DESIGN_AND_AUTHORITY_CORRECTION

DO_NOT:
- bypass the O1 operator gate;
- grant operator authority from a customer session;
- expand the Dashboard;
- implement AI automation;
- redesign the storefront;
- change Golden Commerce economic semantics;
- merge or deploy automatically.
```

The immediate preview can remain available for storefront inspection. The O1
operations pages should be treated as authorization-blocked until the corrected
Console/Dashboard identity and routing contract is approved.
