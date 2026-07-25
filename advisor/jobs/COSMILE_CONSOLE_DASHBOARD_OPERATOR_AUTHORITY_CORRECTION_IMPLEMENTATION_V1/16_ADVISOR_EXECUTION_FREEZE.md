# Advisor Execution Freeze

```text
P0_VERDICT: PASS
PRODUCT_BASE: 3dc5129b573237a85f34bfa65a329a299d31fef2
SCHEMA: MINIMUM_ADDITIVE_NONPRODUCTION
GOLDEN_COMMERCE_SEMANTICS: UNCHANGED
PRODUCT_WRITE_ADMITTED: MODULE_BY_MODULE_ONLY
```

## Corrected authority decision

- Canonical runtime root is one provider-neutral `OperatorPrincipal`.
- One active Console credential binding and one active structurally valid/allowlisted Google operator binding must resolve to the same active principal. Neither binding grants a capability.
- Customer `AuthIdentity`, shopper session, email, display name and session ID never resolve operator authority.
- Every protected request re-reads active principal, bindings and exact active/unexpired/unrevoked grant. Source catalog membership grants nothing.
- Sensitive step-up remains exactly the current in-process, action/scope/role/reason-bound, single-use, expiring, restart-fail-closed mechanism. Only refund and reconciliation recovery use it in the current route set. Support acknowledgement and record-only shipment gain no new step-up requirement.
- Transactional `ConsoleAuditLog` receives nullable `operatorPrincipalId`; system/customer audit rows remain null. No second audit system.
- Clean schema/migration creates no principal, binding or grant. No runtime grant-management route, UI or seed is authorized.

## Frozen additive schema

One migration: `app/prisma/migrations/20260724160000_console_operator_authority/`.

Models/fields:

1. `OperatorPrincipal`: cuid `id`; `state` (`active|suspended|revoked`); non-authority `displayLabel?`; created/updated, suspended/revoked timestamps and bounded revocation reason.
2. `OperatorCredentialBinding`: cuid `id`; FK principal `onDelete Restrict`; kind `console|google_oidc`; unique nullable `consoleUserId` FK `onDelete Restrict`; nullable Google `issuer`+`subject`; state; created/updated/revoked evidence. DB check requires exactly the fields valid for its kind; Google tuple unique; principal/state index.
3. `OperatorCapabilityGrant`: cuid `id`; FK principal and nullable granting principal, both `onDelete Restrict`; exact capability string; closed `global|order` scope kind and optional scope ref; source/reason; activation/optional expiry; state `active|suspended|revoked|expired`; revocation time/evidence; principal/capability/state index.
4. Nullable `ConsoleAuditLog.operatorPrincipalId` FK `onDelete Restrict` plus index and reverse relation.

No backfill. Down migration aborts if any new authority row or non-null audit attribution exists, then drops only these additive objects. No existing table/column rename or semantic change.

## Frozen module sequence and path ceilings

### M1 — spaces and truthful Console labels

Exact paths:

- `app/src/app/console/layout.tsx`
- `app/src/app/console/page.tsx`
- `app/src/app/console/jobs/page.tsx`
- `app/src/components/console/ConsoleWorkspace.tsx`
- `app/src/components/console/ConsoleNav.tsx`
- `app/src/components/operator/OperatorShell.tsx`
- `app/src/app/dashboard/layout.tsx`
- `app/src/app/dashboard/page.tsx`
- `app/src/app/lab/layout.tsx`
- `app/src/app/lab/page.tsx`
- `app/scripts/o1_console_space_contract.vitest.ts`

No operational data/action moves yet. New Dashboard/Lab roots are truthful placeholders; `/console` loses the operational-home claim and persistently says mock/non-live.

### M2A — additive schema and migration only

Exact paths: `app/prisma/schema.prisma`; the migration `migration.sql` and `down.sql`; `app/scripts/operator_authority_migration.dbtest.py`. Disposable loopback PostgreSQL only.

### M2B — principal, credential, catalog and grant evaluation substrate

Exact paths:

- `app/src/lib/operator/contracts.ts`
- `app/src/lib/operator/capability.ts`
- `app/src/lib/operator/repository.ts`
- `app/src/lib/operator/principal.ts`
- `app/src/lib/operator/evaluate.ts`
- `app/src/lib/operator/authorize.ts`
- `app/scripts/operator_authority_contract.vitest.ts`
- `app/scripts/operator_authority_repository.dbtest.py`

`authorize.ts` may read the current Console session through the existing exported session API but does not edit the session implementation. It requires both bindings and independent existing Google allowlist eligibility, then the exact grant. It returns a canonical `OperatorContext` whose `operatorRef` is the principal ID.

### M2C — exact operator route enforcement

Exact paths:

- `app/src/lib/runtime/o1CommerceRuntime.ts`
- all six existing `app/src/app/api/o1/operator/**/route.ts` files, individually listed in the module handoff;
- `app/scripts/o1_operator_route_authority.vitest.ts`

Remove the operator use of `o1OperatorForCustomer`; do not query customer identity/session. Preserve flag, opaque denial, route shapes, nonce, step-up, provider/economic calls and all closed outcomes. Support/shipment remain non-step-up; refund/recovery retain step-up.

### M2D — transactional operator attribution

Exact paths:

- `app/src/lib/order/repository.ts`
- `app/src/lib/order/serviceRequestContracts.ts`
- `app/src/lib/order/serviceRequestService.ts`
- `app/src/lib/order/serviceRequestRepository.ts`
- `app/scripts/operator_audit_attribution.dbtest.py`

Existing operator `actorRef` becomes nullable audit FK attribution only for operator actions. System/customer rows stay null. Audit failure still rolls back the mutation.

### M3A — Dashboard read surfaces

Exact paths:

- `app/src/app/dashboard/page.tsx`
- `app/src/app/dashboard/requests/page.tsx`
- `app/src/app/dashboard/fulfillment/page.tsx`
- `app/src/app/dashboard/finance/page.tsx`
- `app/src/app/dashboard/activity/page.tsx`
- `app/src/app/dashboard/settings/page.tsx`
- `app/src/components/console/O1ConsoleQueue.tsx`
- `app/src/components/console/O1ConsoleFulfillment.tsx`
- `app/src/components/console/O1ConsoleFinance.tsx`
- `app/scripts/o1_dashboard_reads.vitest.ts`

Main contains D01/D03/D04/D05/D07 only. D04 and D07 are `UNAVAILABLE`, never zero. Every read requires exact capabilities.

### M3B — Dashboard detail/actions and safe transition surfaces

Exact paths:

- `app/src/app/dashboard/requests/[orderId]/page.tsx`
- `app/src/components/commerce/O1OperatorPanel.tsx`
- `app/src/app/console/orders/page.tsx`
- `app/src/app/console/orders/[orderId]/page.tsx`
- `app/src/app/console/fulfillment/page.tsx`
- `app/src/app/console/finance/page.tsx`
- `app/src/app/console/settings/page.tsx`
- `app/src/app/o1/operator/page.tsx`
- `app/src/app/o1/operator/orders/[orderId]/page.tsx`
- `app/scripts/o1_dashboard_actions_transition.vitest.ts`

Old operational pages retain a truthful non-mutating transition surface to Dashboard; they no longer read or invoke O1 operations. No redirect/delete. Detail reuses the reviewed panel and already-hardened APIs.

### M4 — read-only Lab registry

Exact paths:

- `app/src/lib/dashboard/capabilityRegistry.ts`
- `app/src/app/lab/page.tsx`
- `app/src/app/lab/[capabilityId]/page.tsx`
- `app/scripts/o1_lab_registry.vitest.ts`

Only the reviewed rows/classifications may appear. Inspect/filter/navigation/copyable evidence reference only; no endpoint or mutation.

### M5 — candidate integration evidence

One new focused integration test path may be frozen after M4. Exactly one generate-first typecheck, one non-production build, focused module tests, and bounded Korean/mobile/accessibility/browser evidence on an isolated runtime/DB. No live/public preview switch and no provider call.

## Stop conditions

Stop before any broader schema, customer-identity authority, grant seed/admin API, durable step-up redesign, new step-up requirement, Golden Commerce semantic change, product feature, public runtime mutation, or path outside a frozen module.

