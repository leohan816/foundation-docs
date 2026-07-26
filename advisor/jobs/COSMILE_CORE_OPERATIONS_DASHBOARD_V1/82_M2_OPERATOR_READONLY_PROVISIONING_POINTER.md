# M2 operator read-only provisioning — Pointer

```text
WORKER_RESULT_POINTER
MISSION: COSMILE_CORE_OPERATIONS_DASHBOARD_V1
MODULE: M2_OPERATOR_READONLY_PROVISIONING
ACTOR: existing Cosmile Worker (cosmile:claude.0), claude-opus-5/xhigh, /fable-builder
RESULT_FILE: advisor/jobs/COSMILE_CORE_OPERATIONS_DASHBOARD_V1/81_M2_OPERATOR_READONLY_PROVISIONING_RESULT.md
HANDOFF: 80_M2_OPERATOR_READONLY_PROVISIONING_HANDOFF.md (docs 3c6c0429, blob 13f85e25, SHA256 f74e9bb9)
OUTCOME: PROVISIONED (no HOLD, no revoke-on-failure path taken)
MIGRATION: reviewed migration applied exactly once, exit 0; it was the only pending migration
PRINCIPAL: 1 active
BINDINGS: 2 active (console 1, google_oidc 1)
GRANTS: 5 active, exact grant-set match YES, all global/unscoped, no expiry, no grantor impersonation
MUTATION_STEPUP_ECONOMIC_GRANTS: 0
AUDIT: 1 category-only provisioning row, attributed to principal and Console owner
ALLOWLIST_STORE: regular non-symlink, 0600 leo:leo, single key, 1 entry, sole-subject match YES
CUSTOMER_CARDINALITY: unchanged 1/1/1
RUNTIME: candidate still running on its original PID with pre-provision environment; allowlist absent from that environment until Advisor restart
PRODUCT: HEAD/upstream unchanged, tracked delta 0, no product commit or push
REVOCATION_TARGET: proved not executed — principals 1, bindings 2, grants 5; audit preserved 1
DISCLOSURE: counts/booleans/categories only; no identifier, subject, issuer value, secret, DB URL, cookie, token or provider payload emitted or stored
NOT_PROVEN: no restart, request, browser or runtime authorization outcome
REVIEWER: not dispatched
RETURN_TO: foundation-advisor
PROPOSED_NEXT_ACTOR: foundation-advisor
STOP
```
