# Worker Handoff — P0 Mapping Correction

```text
MISSION: COSMILE_CONSOLE_DASHBOARD_OPERATOR_AUTHORITY_CORRECTION_IMPLEMENTATION_V1
MODE: READ_ONLY_CORRECTION
PRODUCT_WRITE/TEST/DB/RUNTIME/PROVIDER: PROHIBITED
RETURN_TO: foundation-advisor
```

Read `14_ADVISOR_MAPPING_GATE.md`. The current mission explicitly closes the implementation authority for the following decisions:

1. Canonical authority root is one provider-neutral internal `OperatorPrincipal`, never `CustomerAccount`, customer `AuthIdentity`/session, `ConsoleUser`, session ID, display name, email, or a source capability.
2. `ConsoleUser` and an approved Google operator credential may bind to that principal through a separate credential-binding record. A binding authenticates only; it grants no capability.
3. The existing exact Google issuer/subject structural validation and env allowlist remain an independent eligibility requirement. The new runtime resolver must not read customer `AuthIdentity` or use a customer session.
4. The exact 14-name reviewed source catalog is frozen. A separately persisted exact grant with scope/lifecycle/revocation is required; evaluation reads current principal/binding/grant state on every protected request and defaults to deny.
5. Existing step-up secret comparison and in-process single-use/expiry/action/scope/role/reason nonce remain unchanged and fail closed. Do not propose `StepUpFreshness` persistence in this non-production mission; record multi-instance durability as a Controlled Live residual.
6. Sensitive transactional audit adds nullable attribution to the exact existing economic-audit model. Inspect and name it; do not propose an alternative new audit system.
7. No runtime grant-management UI/API/seed is added. Tests may create synthetic principal/binding/grant rows in a disposable DB. A clean candidate therefore grants nobody by source or migration.
8. Wrong-namespace routes are retained as transition evidence until parity. No delete/redirect in this mission unless the reviewed mapping explicitly requires a safe non-mutating transition and the exact route is named.

Update the same three result files in place. Produce an executable module plan with:

- exact additive schema fields, enums, FKs, indexes and fail-closed down/no-backfill behavior;
- exact current audit model;
- exact route, session, resolver, repository and test paths with no wildcards;
- exact capability-to-read/command matrix for all reviewed Dashboard endpoints;
- exact compatibility handling for current O1 operator routes while removing customer-session authority;
- exact module ceilings small enough for tests-first Advisor gates;
- exact final gates and residuals.

STOP only if direct source proves these frozen choices cannot be implemented without weakening O1 semantics, a broader schema, or an unapproved authority/economic decision. Author only the same three docs result files; then return compactly.
