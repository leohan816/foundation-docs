# 40 — M2B Worker Handoff: Default-Deny Operator Authority Substrate

```text
MISSION: COSMILE_CONSOLE_DASHBOARD_OPERATOR_AUTHORITY_CORRECTION_IMPLEMENTATION_V1
MODULE: M2B
BASE: e570e0bb5be0fcdd2222a8e76f6146640a8a0752
WORKTREE: /home/leo/Project/.worktrees/Cosmile/COSMILE_CONSOLE_DASHBOARD_OPERATOR_AUTHORITY_CORRECTION_IMPLEMENTATION_V1
ACTOR: existing Cosmile Worker; Claude Opus 4.8 / xhigh
SKILL: /fable-builder
REFERENCES: implementation-execution, contract-to-code-mapping, test-design-before-code; implementation-report-template only at return
SCHEMA_CHANGE: NONE
ECONOMIC_PROVIDER_RUNTIME_EFFECT: 0
STOP_AFTER: M2B result
```

## Exact path ceiling

1. `app/src/lib/operator/contracts.ts`
2. `app/src/lib/operator/capability.ts`
3. `app/src/lib/operator/repository.ts`
4. `app/src/lib/operator/principal.ts`
5. `app/src/lib/operator/evaluate.ts`
6. `app/src/lib/operator/authorize.ts`
7. `app/scripts/operator_authority_contract.vitest.ts`
8. `app/scripts/operator_authority_repository.dbtest.py`

No ninth path. Do not edit schema/migration/session/auth/O1 runtime/route/UI/audit repository. No principal/binding/grant seed, grant-management API/UI, customer identity read, step-up/nonce change, provider/network/economic action or existing-preview mutation. M2C is blocked.

## Frozen contract-to-code mapping

### Closed source catalog

`capability.ts` exports one immutable exact 14-name catalog and a membership predicate:

```text
console.workspace.read
console.workspace.request_mock
dashboard.operations.read
orders.read
service_requests.read
service_requests.support_acknowledge
fulfillment.read
shipment.record
inventory_hold.read
reconciliation.read
reconciliation.recover
refund.full_execute
audit.sensitive_read
settings.boundary_read
```

Catalog membership is definition only. It must never create/read a grant, principal, session, nonce or authority. `console.workspace.request_mock` stays explicitly non-live.

### Closed internal types

`contracts.ts` defines:

- `OperatorCapability` from the exact catalog;
- `OperatorScope = {kind:"global"} | {kind:"order"; orderId:string}`;
- structural persisted snapshot rows for one Console binding, its principal, all same-principal Google bindings and exact-capability grants;
- a repository interface that loads that snapshot by `consoleUserId + requested capability`;
- one closed result union: authorized context or categorical deny. Denies include unauthenticated, missing/inactive/ambiguous binding, inactive principal, Google eligibility denial, unknown capability, missing/inactive/not-yet-active/expired/ambiguous grant, scope denial and repository error. No raw identifier, email, token, secret or DB/provider error is returned.

Authorized `OperatorContext.operatorRef` is the internal principal ID, never Google subject/email/display/session/customer ID. Preserve the existing compatibility role `admin`; the grant, not that role string, is authority.

### Repository snapshot

`repository.ts` exports the Prisma-backed repository and uses only the new authority tables plus the supplied Console user ID. Every call re-reads current binding, principal, same-principal credential bindings and exact-capability grants. It must:

- resolve the unique Console credential binding by `consoleUserId`;
- load its principal and all same-principal Google bindings;
- load only grants for that principal and requested capability;
- return structural data only, with no mutation, cache, logging or swallowed DB error;
- never query/import `CustomerAccount`, `AuthIdentity`, shopper/session cookies, email, or `o1OperatorForCustomer`.

### Principal and independent eligibility

`principal.ts` is pure over the loaded snapshot + env:

1. require the Console binding active;
2. require the bound principal active;
3. require exactly one active `google_oidc` binding on that same principal; zero or more than one fails closed;
4. validate its stored issuer/subject using the unchanged `resolveOperatorFromIdentity` allowlist/issuer/immutable-subject boundary from `lib/auth/o1Operator.ts`;
5. use only the eligibility verdict; replace its subject-based context with the canonical internal principal ID.

Suspended/revoked bindings/principals deny before grant evaluation. A Console login alone, Google allowlist alone, source catalog alone and customer identity all grant nothing.

### Grant evaluation

`evaluate.ts` is pure and evaluates only an already-resolved active principal:

- unknown/non-catalog capability denies;
- state must be exactly active;
- `activeAt <= now`; expiry absent or strictly later than `now`;
- global grants may cover global or order requests; order grants cover only the exact nonblank order scope;
- after state/time/scope filtering, exactly one eligible grant is required; zero denies and more than one fails closed as ambiguous;
- never mutate an expired row or infer authority from a stale/other-capability/other-principal grant.

### Server authorization boundary

`authorize.ts` exports:

1. an injected/testable authorization function taking `consoleUserId|null`, env, capability, scope, repository and optional `now`;
2. a server wrapper using only existing `getConsoleUser()` plus the Prisma repository.

Evaluation order is session → repository snapshot → principal/binding/Google eligibility → exact grant/scope. Catch repository failures into the closed repository-error deny. Do not expose DB error text. Screen access does not call this module automatically; M2C/M3 will wire it later.

## Tests first and focused execution

1. Add both tests before source implementation.
2. Run only:
   `./node_modules/.bin/vitest run scripts/operator_authority_contract.vitest.ts`
   Require meaningful RED from missing contract exports, not collection/tooling failure.
3. Run only:
   `python3 scripts/operator_authority_repository.dbtest.py`
   Require meaningful RED from missing repository/contract implementation, not infra/tooling failure.
4. Implement only the six source paths.
5. Re-run the identical two commands; require GREEN.

The Vitest contract must adversarially prove the exact catalog, catalog≠grant, unauthenticated/default-deny, Console-only/allowlist-only/customer-shaped input denial, same-principal binding requirement, zero/multiple Google binding denial, malformed issuer/subject/allowlist denial, suspended/revoked principal or binding denial, all grant state/time/scope/ambiguity cases, repository-error redaction, and canonical principal-based `operatorRef`. It must statically reject customer/shopper authority imports in all six source files.

The Python DB test may start one already-local `postgres:16-alpine` on loopback only, tmpfs/no volume, synthetic categorical data, no PII/secrets, and unconditional cleanup. Apply only the committed initial schema plus M2A migration. It may invoke the exact focused Vitest file once in an explicit DB-adapter mode against that disposable DB, using the generated candidate client, to prove actual Prisma snapshot reads, revocation effective on the next call, mismatch/ambiguity/default-deny and zero writes. No direct SQL may be counted as repository PASS. `SKIP` is not PASS.

Before focused GREEN, one worktree-local ignored-client refresh is allowed:

`DATABASE_URL=postgresql://localhost:1/o1_schema_validation CHECKPOINT_DISABLE=1 PRISMA_GENERATE_SKIP_AUTOINSTALL=1 ./node_modules/.bin/prisma generate --schema prisma/schema.prisma`

Run once, no install/network/DB/shared tree/tracked change. If generation needs another writable/external path or changes package/lock/product paths, STOP. No typecheck/build/full suite.

## Closure and return

Verify `git diff --check`, exact eight-path containment, package/lock unchanged, disposable DB/container/port absent, and existing public preview unchanged. One truthful commit and non-force push. Write one compact result and pointer in this job directory, then STOP before M2C.
