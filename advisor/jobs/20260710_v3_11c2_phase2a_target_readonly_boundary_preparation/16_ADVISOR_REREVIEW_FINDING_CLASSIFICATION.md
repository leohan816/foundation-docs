# Advisor Finding Classification - Fable5 Re-Review Round 2

Date: 2026-07-10

Fable5 verdict: `NEEDS_PATCH`

Advisor decision: `IN_SCOPE_P2_PRECISION_REWORK`

Admin and Phase 2A status: `NOT_APPROVED`

## Closed Findings

- P-1 / Q1 effective PUBLIC privilege path: closed.
- P-3 / Q3 execution credential injection: closed.
- `NOINHERIT` and catalog evidence minor items: closed.

These areas must not be redesigned or broadened in round 2.

## Remaining Findings

### F-A - `createuser --pwprompt` Two-Step Conflict

The plan separates role creation from credential setting, but lists
`createuser --pwprompt` as if it could set a credential on an already-created
role. It creates a role and therefore conflicts with the selected two-step flow.

Required patch:

- remove `createuser --pwprompt` from the selected separate credential-setting
  path and all approval/evidence text that presents it as an equivalent second
  step;
- keep the selected existing-role credential-setting method limited to
  `psql \password <ROLE>` or another independently verified method that operates
  on an existing role;
- do not introduce a combined createuser path in this patch. A combined creation
  alternative would require separate version/flag/role-attribute review and is
  unnecessary for the approved two-step design.

### F-B - SCRAM Verifier Statement-Log Decision Route

The plan detects verifier capture with booleans but does not define a STOP and
decision route when server statement logging could capture, or has captured, the
SCRAM verifier.

Required patch:

1. Before credential setting, require evidence that the approved provisioning
   channel will not record raw password or SCRAM verifier material in server
   statement logs. If this cannot be proven, STOP before provisioning.
2. Extend STOP conditions to raw password **or SCRAM verifier** capture risk.
3. Any logging-mode change, session-scoped suppression, or alternate channel must
   be a separate approved admin decision with audit-policy and blast-radius review;
   do not auto-change logging.
4. If credential material was captured, STOP, classify the log/verifier as
   sensitive, and require Leo/GPT decisions for log handling and credential
   reset/rotation before any continuation. Never auto-delete logs.
5. Add count/boolean/status-only evidence for safe logging state and any capture
   incident. Do not print settings that contain sensitive material or log content.

## Round-3 Re-Review Contract

The same Fable5 Reviewer session must answer:

1. Is the selected two-step credential path internally consistent, with
   `createuser --pwprompt` removed from the existing-role setting step?
2. Does verifier logging risk now STOP before provisioning, and does actual
   capture route to a sensitive-incident/reset decision without automatic log or
   credential action?

No DB, role, permission, logging, credential, or runtime action is approved.

