# 30 — M2A Worker Handoff: Additive Operator Authority Schema

```text
MISSION: COSMILE_CONSOLE_DASHBOARD_OPERATOR_AUTHORITY_CORRECTION_IMPLEMENTATION_V1
MODULE: M2A
BASE: 00029eb6efdb5de4402219963b91de1c03889b98
WORKTREE: /home/leo/Project/.worktrees/Cosmile/COSMILE_CONSOLE_DASHBOARD_OPERATOR_AUTHORITY_CORRECTION_IMPLEMENTATION_V1
ACTOR: existing Cosmile Worker; Claude Opus 4.8 / xhigh
SKILL: /fable-builder
REFERENCES: implementation-execution, contract-to-code-mapping, test-design-before-code; implementation-report-template only at return
ECONOMIC_PROVIDER_RUNTIME_EFFECT: 0
STOP_AFTER: M2A result
```

## Exact path ceiling

1. `app/prisma/schema.prisma`
2. `app/prisma/migrations/20260724160000_console_operator_authority/migration.sql`
3. `app/prisma/migrations/20260724160000_console_operator_authority/down.sql`
4. `app/scripts/operator_authority_migration.dbtest.py`

No fifth path. No runtime/caller/session/API/UI/catalog/grant seed. No existing row rewrite, backfill, schema rename/drop, DB outside the one disposable test, provider/network/economic action, generate/build/typecheck/full suite.

## Exact additive mapping

Use Prisma `String` state/kind/scope fields plus named SQL CHECKs; do not add Prisma enums.

### `OperatorPrincipal`

- `id` cuid PK; `state` default `active`, closed to `active|suspended|revoked`.
- nullable non-authority `displayLabel`; created/updated; nullable `suspendedAt`, `revokedAt`, `revocationReason`.
- lifecycle CHECK: active has no suspension/revocation evidence; suspended has `suspendedAt` and no revocation evidence; revoked has `revokedAt` plus nonblank bounded reason (prior `suspendedAt` may remain).
- relations to credential bindings, subject grants, nullable grantor grants and audit rows; `@@index([state])`.

### `OperatorCredentialBinding`

- cuid PK; required principal FK `onDelete: Restrict`; `kind` closed to `console|google_oidc`.
- nullable unique `consoleUserId` FK `onDelete: Restrict`; nullable `issuer`, `subject`; required `state` default active; created/updated; nullable `revokedAt`, `revocationReason`.
- exact-kind CHECK: console requires only `consoleUserId`; Google requires only nonblank `issuer`+`subject`.
- state closed to `active|suspended|revoked`; only revoked requires timestamp plus nonblank bounded reason, while non-revoked states have neither.
- unique Google `(issuer, subject)`; `@@index([principalId, state])`. Add the single optional reverse relation on `ConsoleUser` required by Prisma.

### `OperatorCapabilityGrant`

- cuid PK; required subject-principal FK and nullable `grantedByPrincipalId` self-FK, both `onDelete: Restrict`.
- nonblank bounded `capability`; `scopeKind` closed to `global|order`; nullable `scopeRef`.
- scope CHECK: global requires null scope; order requires nonblank bounded scope.
- nonblank bounded `grantSource` and `reasonCategory`; `activeAt` default now; nullable `expiresAt`; state default active, closed to `active|suspended|revoked|expired`; created/updated; nullable `revokedAt`, `revocationReason`.
- expiry must be later than activation when present. Only revoked requires timestamp plus nonblank bounded reason; non-revoked states have no revocation evidence; expired requires an expiry.
- `@@index([principalId, capability, state])`.

### Existing audit

- Add nullable `ConsoleAuditLog.operatorPrincipalId` FK to `OperatorPrincipal`, `onDelete: Restrict`, plus `@@index([operatorPrincipalId])` and reverse relation.
- Existing rows become null only. Do not alter `userId`, actor fields, action fields, defaults or existing relations.

Use bounded lengths consistently in SQL checks: label/capability/source/reason category/scope reference max 200, revocation reason max 240, issuer/subject max 512; required strings reject empty/whitespace-only values.

## Migration/down requirements

- Forward creates exactly three empty tables and one nullable audit column/FK/index. Prisma relation/index names and SQL must match.
- No principal, binding or grant is created. Console login/customer identity/source catalog grants nothing.
- `down.sql` first aborts if any row exists in any new authority table or any audit row has non-null `operatorPrincipalId`; only then remove the audit relation objects and the three new tables in FK-safe reverse order.
- Do not touch any other existing object.

## Tests first and focused commands

1. Add the disposable PostgreSQL test first and run only:
   `python3 scripts/operator_authority_migration.dbtest.py`
   Require meaningful RED from the absent schema/migration, not collection/infra failure.
2. Implement the three allowed schema/migration paths.
3. Run the identical command; require GREEN.
4. Run exactly one process-local schema check:
   `DATABASE_URL=postgresql://localhost:1/o1_schema_validation ./node_modules/.bin/prisma validate --schema prisma/schema.prisma`
   This is validation only; if it attempts a DB connection or fails, STOP.
5. `git diff --check` and exact four-path containment only.

The DB test may use only the already-local `postgres:16-alpine`, unique container name, tmpfs data, no host port/volume, `docker exec`, synthetic rows and unconditional cleanup. Prove forward over nonempty minimal `ConsoleUser`/`ConsoleAuditLog`; exact columns/defaults/checks/FKs/RESTRICT/uniques/index order; zero backfill/default grants; customer identity absent; every illegal lifecycle/kind/scope/expiry case rejected; existing audit preserved; each non-pristine down class aborts independently; pristine down succeeds; forward/down/forward; no container residue. `SKIP` is not PASS.

## Return

One truthful commit and non-force push. Compact result/pointer in this job directory only, then STOP. Report exact paths, RED/GREEN counts/categories, Prisma validation, cleanup, Git state, schema effect, economic effect 0, skill/references, and any first failure. Do not start M2B.
