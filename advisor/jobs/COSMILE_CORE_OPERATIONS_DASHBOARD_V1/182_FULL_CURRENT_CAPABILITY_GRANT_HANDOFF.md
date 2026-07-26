# Full current capability grant — exact Worker handoff

MISSION: `COSMILE_CORE_OPERATIONS_DASHBOARD_V1`
ACTOR: existing `cosmile:claude.0` only (`Claude Opus 5/xhigh`)
SKILL: `/home/leo/Project/skill/fable-builder/SKILL.md`; use `implementation-execution`, `contract-to-code-mapping`, then `implementation-report-template`
VERDICT: `PROCEED_EXACT_GRANT_ONLY`

## Pinned state

- Product: `/home/leo/Project/.worktrees/Cosmile/COSMILE_CORE_OPERATIONS_DASHBOARD_V1`
- Branch/HEAD: `implementation/cosmile-core-operations-dashboard-v1-20260725@2ccde154618f1bf31f48727ad33d4964495dc763`
- Active candidate: exact product app on `127.0.0.1:3000`, server PID `1033479`; its environment is the only DB/allowlist source and values must never be emitted.
- DB: existing `cosmile-o1-existing-domain-preview-pg-20260724`, loopback-only synthetic non-production.
- Existing authority: exactly one active Leo `OperatorPrincipal`, active Console+Google bindings, protected allowlist, and five active global grants from reviewed M2.
- Preserved M5 delta: exact nine paths, aggregate SHA256 `6dbed0dc08f0d01aecdd7954e3271e7f6afd4532069f3cb5831520f03aaa7299`; do not touch it.

## Exact capability contract

Reconcile the existing principal to these current catalog definitions, no others:

`console.workspace.read`, `console.workspace.request_mock`, `dashboard.operations.read`, `orders.read`, `customers.read`, `catalog.read`, `service_requests.read`, `service_requests.support_acknowledge`, `fulfillment.read`, `shipment.record`, `inventory_hold.read`, `reconciliation.read`, `reconciliation.recover`, `refund.full_execute`, `audit.sensitive_read`, `settings.boundary_read`.

Catalog membership grants no execution by itself. `console.workspace.request_mock` remains non-live. Sensitive commands still require their existing step-up, nonce, audit, idempotency and command checks. Default-deny remains unchanged.

## Allowed path and algorithm

Only one temporary file may be authored with `apply_patch`, then `leo:leo 0600`:

`/home/leo/Project/.mission-tmp/COSMILE_CORE_OPERATIONS_DASHBOARD_V1/grants/grant-current-capability-catalog.mjs`

1. Load `/fable-builder` and the three references above; pin this handoff commit/blob/SHA.
2. Fail closed unless product status is the same exact nine-path M5 delta and its aggregate SHA matches; server PID/CWD, loopback DB container, runtime env key names, protected allowlist metadata, one active principal, one exact active Leo Console binding, one same-principal active Google binding, and the current source catalog are exact.
3. Read `DATABASE_URL` and allowlist only inside the process from `/proc/1033479/environ`; never print, persist, hash, place in argv, or copy either value. Prove the runtime allowlist matches the stored Google binding internally.
4. Parse the current `OPERATOR_CAPABILITIES` source and require exact equality with the 16 names above. Reject duplicate/unknown/non-global/scoped/expired active grants.
5. In one Prisma transaction, leave the existing principal/bindings/grants unchanged, add only missing global/unscoped/no-expiry active grants with null grantor and categorical source/reason, and add exactly one category-only `ConsoleAuditLog` row for this Founder-authorized non-production full-current-catalog reconciliation. No identifier or capability payload in audit JSON.
6. Post-check: one active principal; two active bindings; exactly 16 distinct active grants; exact 16/16 set; no grant outside catalog; all global/unscoped/no-expiry; source catalog unchanged; customer/account/session counts unchanged; no commerce row count/state change.
7. Verify the current Dashboard authorization predicate using the exact active Console user/session, runtime allowlist, same principal/bindings, and persisted grants: `dashboard.operations.read` and every catalog capability evaluate `ALLOW`; output capability names plus `SET`, counts/booleans only. Do not read/replay/emit any cookie/token/hash/identifier. Because the runtime repository re-reads DB per request, record `CURRENT_DASHBOARD_DENIED_BY_CAPABILITY=false`; do not make a provider/economic request.
8. Recompute the M5 aggregate SHA and exact nine-path status; require unchanged. Delete only the temporary grant file with `apply_patch`; leave the protected allowlist and active runtime intact.
9. Write only:
   - `183_FULL_CURRENT_CAPABILITY_GRANT_RESULT.md`
   - `184_FULL_CURRENT_CAPABILITY_GRANT_POINTER.md`
   Commit/non-force-push those two docs files, return compactly, and STOP. Do not resume M5.

## Mapping / effects / STOP

| Authority | Existing landing | This action |
|---|---|---|
| identity | existing principal + bindings + allowlist | verify only |
| catalog | `capability.ts` definitions | exact 16-name equality |
| runtime grants | `OperatorCapabilityGrant` | add missing rows only |
| audit | `ConsoleAuditLog` | one categorical row |
| command safety | existing step-up/nonce/audit/idempotency | unchanged |

No product tracked write, schema/migration, identity/principal/binding creation, grant revocation, runtime restart, test/build/install/generate, browser/provider/payment/refund/inventory/order mutation, production/shared DB, real PII, secret output, or M5 action. Any precondition mismatch, duplicate/unknown grant, non-loopback DB, secret exposure, product delta change, authorization predicate failure, or non-16 result => `HOLD`, no M5 resume.

RETURN_TO: `foundation-advisor`
STOP
