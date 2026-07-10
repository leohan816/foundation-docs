# Advisor Worker Result Validation

Date: 2026-07-10

Validation verdict: `VALIDATED_FOR_FABLE5_DESIGN_REVIEW_WITH_EXPLICIT_QUESTIONS`

Phase 2A execution status: `NOT_APPROVED`

## Evidence Inspected Directly

- Cosmile commit `0ec8667a66b7d6973bb4508a234d638a81d69b2c`.
- foundation-docs commit `03d856562ee1d97726a28125de0e9733a0480cd2`.
- Actual design document and the complete `453b6c9..0ec8667` diff.
- foundation-docs mirror, Worker result, and result pointer.
- Prior approved query plan, Fable5 re-review PASS, and final HOLD closure.
- Cosmile Prisma schema, active migrations, security/env policies, and active role
  instructions.
- Current branch, upstream, staged state, and working-tree scope.

## Mechanical and Scope Validation

| Check | Result |
|---|---|
| Cosmile commit changes one design Markdown file only | PASS |
| Cosmile HEAD equals upstream; staged files are empty | PASS |
| Six pre-existing unrelated untracked docs remain excluded | PASS |
| foundation-docs commit contains mirror, Worker result, and pointer only | PASS |
| Repo-local plan and mirror are byte-identical | PASS |
| Both design copies have SHA-256 `834244632a850e36dc85b60ce4e9e507abaa2517a2f2595dd56b30f67bf11915` | PASS |
| Design/result files are valid UTF-8 | PASS |
| Credential-bearing URI pattern found in the plan | NONE |
| DB/query/migration/role/permission/secret/runtime action | NOT PERFORMED |
| Phase 2A execution launcher | NOT CREATED |

## Required Content Validation

The package contains all nine required areas:

1. candidate alias, source label, and owner-attestation template;
2. schema evidence rules with `public` and `cosmile` inference rejected;
3. read-only role alias, role attributes, and permission matrix;
4. future provisioning evidence contract;
5. dedicated read-only credential-source recommendation;
6. mode `664` observation and separate `600` remediation proposal;
7. pointer-only reference to C-1/C-2/C-3;
8. design/admin/execution review and STOP routing;
9. exact Leo/GPT approval fields.

The plan keeps target identity, schema, role existence, and credential source
unproven. Its recommendation remains Option C HOLD and authorizes nothing.

## Explicit Independent Review Questions

Advisor validation confirms completeness and scope; it does not establish that
the proposed privilege or credential model is safe. Fable5 must decide:

1. **Effective PUBLIC privileges:** PostgreSQL grants such as database CONNECT or
   TEMP may be inherited from PUBLIC and cannot be denied to one role with a
   simple role-specific REVOKE. Does the plan define a feasible, non-disruptive
   method to prove the stated target-only/no-TEMP boundary, or must it be patched?
2. **Role ownership and inheritance:** Are `NOINHERIT`, zero memberships, zero
   ownership, safe role attributes, schema CREATE denial, default privileges, and
   future-object behavior specified strongly enough to prove no write path?
3. **Catalog visibility:** Is the C-2 catalog-read assumption sufficiently
   constrained and included in the evidence contract for the target environment?
4. **Provisioning credential safety:** The inert SQL shows a password placeholder.
   Would a later admin following this pattern risk exposing the credential in SQL
   text, logs, history, process arguments, or evidence? Must the plan define a
   safer secret-setting/provisioning channel before design PASS?
5. **Execution credential safety:** Is the recommended process-local URL source
   precise enough to prevent exposure through command arguments, process
   inspection, shell history, debug output, child processes, or logs?
6. **Attestation and schema proof:** Are the attestation signer, evidence path,
   expiry trigger, and approved-schema evidence sufficient and non-circular?
7. **Gate separation:** Does the plan cleanly prevent design PASS from becoming
   role provisioning, hygiene execution, or Phase 2A approval?

## Routing Decision

Route to the existing separate Fable5 Reviewer session for Level 3
`DESIGN_REVIEW`. Do not route to Worker rework unless Fable5 returns
`NEEDS_PATCH`. Do not route to Leo/GPT unless the result is `PASS_WITH_RISK`,
`FAIL`, or requires an authority decision.

