# M2 operator read-only provisioning — Worker handoff

MISSION: `COSMILE_CORE_OPERATIONS_DASHBOARD_V1`
ACTOR: existing Cosmile Worker (`cosmile:claude.0`)
SKILL: `/home/leo/Project/skill/fable-builder/SKILL.md` (implementation-execution and implementation-report-template only)
VERDICT: `PROCEED_WITH_LIMITS`

## Exact subject

- Product: `/home/leo/Project/.worktrees/Cosmile/COSMILE_CORE_OPERATIONS_DASHBOARD_V1`
- Branch/HEAD: `implementation/cosmile-core-operations-dashboard-v1-20260725@c5b7edd79dfe995c5be5e1fdc84cccf696f6b8a9`
- Public candidate: exact product app on `127.0.0.1:3000`; preserve it until the final restart boundary.
- DB: existing dedicated synthetic non-production PostgreSQL container `cosmile-o1-existing-domain-preview-pg-20260724`, loopback only.
- Captured identity precondition: exactly one `AuthIdentity`, one `CustomerAccount`, one `CustomerSession`; never emit their identifiers.
- Existing Console owner precondition: exactly one active `ConsoleUser` matching username `leo`, display name `Leo`, role `owner`.

## Allowed writes

1. Apply only committed migration `app/prisma/migrations/20260724160000_console_operator_authority/migration.sql` through the pinned local Prisma CLI. Before deploy prove it is the only pending migration.
2. Create only:
   - one active `OperatorPrincipal`;
   - one active Console binding to the exact existing Console owner;
   - one active Google OIDC binding to the sole captured Google identity;
   - exactly five active global grants:
     - `dashboard.operations.read`
     - `service_requests.read`
     - `orders.read`
     - `fulfillment.read`
     - `reconciliation.read`
   - one category-only provisioning audit row attributed to the principal and Console owner.
3. Atomically create `/home/leo/Project/Cosmile/.secrets/nonproduction/operator-authority.env` as a regular non-symlink `leo:leo 0600` file under its existing owner-only parent. It contains only `COSMILE_O1_OPERATOR_SUB_ALLOWLIST` bound internally to the sole captured immutable Google subject.
4. Author only one temporary execution file:
   `/home/leo/Project/.mission-tmp/COSMILE_CORE_OPERATIONS_DASHBOARD_V1/m2/provision-readonly-operator.mjs`
   using `apply_patch`, then enforce `leo:leo 0600`.
5. Author compact result/pointer:
   - `81_M2_OPERATOR_READONLY_PROVISIONING_RESULT.md`
   - `82_M2_OPERATOR_READONLY_PROVISIONING_POINTER.md`

## Mandatory algorithm

1. Re-verify product clean/upstream-equal, candidate process/CWD, DB container/loopback binding, generated local Prisma client, and protected Google/Toss stores by names/status only.
2. Obtain `DATABASE_URL` only from the exact candidate process environment inside the executing shell; never print, persist, hash, or pass it in argv.
3. Before any write, fail closed unless the identity/account/session/Console cardinalities above are exact, the sole identity issuer is the reviewed Google issuer, its subject satisfies the existing immutable-subject structural rule, all authority tables are absent, the reviewed migration is the only pending migration, and the operator-authority store is absent.
4. Run the pinned local `prisma migrate deploy` once. No generate/install/schema edit/other migration/DB.
5. Re-check empty authority tables, then use one DB transaction for the principal, two bindings, five grants, and one category-only audit row. Source/reason categories must state non-production owner bootstrap/read-only Dashboard activation. No grantor impersonation is required; leave `grantedByPrincipalId` null.
6. The allowlist file write is a separate fail-closed atomic filesystem operation. Prepare it owner-only without output, complete the DB transaction, atomically install it, then verify exact match to the sole captured subject without emitting either value. If any post-transaction file step fails, revoke the just-created authority rows transactionally before returning HOLD.
7. Prove the exact non-mutating revocation target: one principal, two bindings, five grants, one provisioning audit; revocation would set grants/bindings/principal to `revoked` with categorical reason and preserve audit history. Do not execute revocation.
8. Emit only counts/booleans/status categories. Never emit/copy/log/hash/store in docs or pane any cookie, token, subject, issuer value, customer/account/session/user/principal/binding/grant/audit identifier, email, secret, DB URL, or provider payload.

## Forbidden

- No product tracked file, schema, migration source, fixture, test, config, manifest, lockfile, dependency, build, typecheck, browser, provider, Google, payment, refund, shipment, inventory, or economic action.
- No mutation/step-up/economic capabilities, expiry invention, customer/operator conflation, direct SQL bypass of the reviewed authority shape, shared/production DB, real PII, session/runtime restart, public request, or unrelated read.
- No product commit. Commit/push only the two result files to the existing docs branch, non-force.

## Completion evidence

- migration applied exactly once and recorded;
- principal `1`, active bindings `2` (`console=1`, `google_oidc=1`), active grants `5`, exact grant-set match `YES`;
- mutation/economic/step-up grants `0`;
- customer/account/session cardinalities unchanged at `1/1/1`;
- protected allowlist boundary and sole-subject match `YES`;
- runtime still running with its pre-provision environment until Advisor restart;
- product clean/upstream-equal; docs commit/push; exact reversible/revocation plan ready;
- `RETURN_TO: foundation-advisor`; `STOP`.
