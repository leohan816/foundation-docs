# FOUNDATION ADVISOR HANDOFF — CONTROL OPERATOR AUTHORITY CONTRACT

- MISSION: `COSMILE_DASHBOARD_CAPABILITY_REGISTRY_AND_OPERATOR_AUTHORITY_DESIGN_V1`
- ROLE: existing Foundation Control; return only to `foundation-advisor`.
- MODE: targeted security/authority contract analysis only; no architecture expansion and no implementation.
- PRODUCT: `/home/leo/Project/.worktrees/Cosmile/COSMILE_O1_STOREFRONT_AND_CUSTOMER_ACCOUNT_COMPLETION_V1` at `3dc5129b573237a85f34bfa65a329a299d31fef2`.
- DOCS: `/home/leo/Project/.worktrees/foundation-docs/COSMILE_O1_EXISTING_DOMAIN_NONPROD_PREVIEW_V1`.
- INPUTS: mission files `00`, `11`, `12`, `14` and Strategy issue `advisor/jobs/COSMILE_O1_EXISTING_DOMAIN_NONPROD_PREVIEW_V1/30_STRATEGY_CONSOLE_DASHBOARD_AUTHORITY_CONFLICT_EN.md`.
- EXECUTION BINDING: preserve the existing Control process/CWD; use exact absolute paths only.

## Exact authority question

Inspect only load-bearing current source for ConsoleUser/session/permission/admin-write/audit, Google OIDC identity/session, `o1Operator`, O1 operator routes/runtime commands, step-up nonce/verifier, refund/reconciliation, inventory/shipment/support command enforcement, and relevant Prisma models/tests.

Define a frozen design contract for:

1. canonical `OperatorPrincipal` and strict customer/operator separation;
2. capability catalog definitions versus persistent/runtime grants;
3. grant source, activation, expiry, suspension/revocation and fail-closed evaluation;
4. action-bound step-up, nonce single-use/expiry/replay/freshness and restart behavior;
5. audit subject/actor/action/scope/outcome evidence;
6. command-bound enforcement for reviewed O1 read and sensitive write actions;
7. explicit rule that Git/source registry defines capabilities but never grants runtime authority.

Map current authority systems A and B to the contract. Distinguish present behavior, safe reuse, incompatibility, deferred persistence, and Founder decisions. Do not propose schema/migration/code changes or weaken Google subject matching, O1 step-up, idempotency, audit, refund, inventory, or reconciliation truth. A Console login must not silently mint O1 economic authority.

## Output ceiling

Write only in this mission directory:

- `31_CONTROL_OPERATOR_AUTHORITY_CONTRACT.md`;
- `32_CONTROL_RESULT.md` (<=80 lines);
- `33_CONTROL_POINTER.md`.

No product/runtime/DB/env/auth/preview write, test, build, provider/network action, commit, or push. STOP on any canonical policy choice that requires Founder risk acceptance; preserve it as an explicit unresolved decision.
