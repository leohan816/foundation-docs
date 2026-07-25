# M2 Advisor admission — HOLD

MISSION_ID: `COSMILE_CORE_OPERATIONS_DASHBOARD_V1`
MODULE: `M2_NONPRODUCTION_OPERATOR_AUTHORITY_PROVISIONING`
VERDICT: `HOLD_WITH_NAMED_BLOCKER`
BLOCKER: `PROTECTED_OPERATOR_ALLOWLIST_IDENTITY_UNAVAILABLE`

## Exact evidence

- Product mission HEAD remains `6486019e0968de5671e43521e5cfb40d03b0bdca`; product worktree clean.
- Public candidate runtime remains bound to the dedicated synthetic non-production DB on loopback; rollback predecessor remains `3dc5129b573237a85f34bfa65a329a299d31fef2`.
- Exact Console user category: total 1; exact `username=leo`, `displayName=Leo`, `role=owner`, active row count 1.
- `AuthIdentity` total 0; `CustomerAccount` total 0.
- `OperatorPrincipal`, `OperatorCredentialBinding`, and `OperatorCapabilityGrant` tables present count 0 because the authorized migration has not been applied.
- Current runtime environment: Google auth enabled; `COSMILE_O1_OPERATOR_SUB_ALLOWLIST` unset; step-up secret unset.
- Approved durable non-production secret directory contains the protected Toss TEST store only. No operator allowlist store exists.
- No accessible running process contains a nonblank `COSMILE_O1_OPERATOR_SUB_ALLOWLIST`.
- No value, subject, token, cookie, email, hash, credential, or identifier was printed, copied, transmitted, or stored.

## Why the module cannot safely proceed

The reviewed resolver requires exactly one active Google OIDC binding on the same internal principal and validates its immutable subject against `COSMILE_O1_OPERATOR_SUB_ALLOWLIST`. Creating the principal, binding, or five grants without that protected source would fabricate identity or weaken default-deny authorization. Console login alone grants nothing.

## Smallest authority needed

Authorize one owner-controlled, non-production-only allowlist setup:

1. durable path `/home/leo/Project/Cosmile/.secrets/nonproduction/operator-authority.env`;
2. parent `0700`; file regular, non-symlink, `leo:leo 0600`;
3. silent owner-local entry plus confirmation of one Google immutable subject matching the existing allowlisted operator account;
4. atomic exact-key write for `COSMILE_O1_OPERATOR_SUB_ALLOWLIST`; no value in argv/history/output/log/chat/docs/hash;
5. read-only reuse by this mission's M2 provisioning and candidate runtime only;
6. no step-up secret, refund/write capability, customer identity, provider call, or economic action.

After owner completion, Advisor will verify only file/type/owner/mode, exact key count 1, allowed digit/length shape, and runtime/database categorical booleans. The Worker may then apply only migration `20260724160000_console_operator_authority`, create one principal, two bindings, and the five frozen global read grants transactionally, with exact revoke/rollback proof.

No product write, migration application, DB mutation, runtime restart, provider action, or browser action occurred in this HOLD.
