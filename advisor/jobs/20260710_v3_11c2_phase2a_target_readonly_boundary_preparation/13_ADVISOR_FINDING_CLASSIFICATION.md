# Advisor Finding Classification - Fable5 Level 3 Design Review

Date: 2026-07-10

Fable5 verdict: `NEEDS_PATCH`

Advisor decision: `IN_SCOPE_DESIGN_REWORK`

Admin and Phase 2A status: `NOT_APPROVED`

## Finding Classification

| Finding | Classification | Blocks design PASS | Patch authority |
|---|---|---:|---|
| P-1 / Q1: effective PUBLIC CONNECT/TEMP and public-schema CREATE paths have no feasible decision/remediation route | Least-privilege proof gap | yes | Cosmile Worker design-only rework |
| P-2 / Q4: password literal template can lead to SQL/history/log/process exposure | Provisioning secret-channel gap | yes | Cosmile Worker design-only rework |
| P-3 / Q5: process-local credential recommendation does not block history/argv/echo/process leakage | Execution credential-injection gap | yes | Cosmile Worker design-only rework |
| Q2 minor: `NOINHERIT` is preferred rather than required | Role-shape precision gap | no alone; patch with P-1 | Cosmile Worker design-only rework |
| Q3 minor: catalog-read evidence lacks an explicit boolean | Evidence-contract precision gap | no alone; patch with P-1 | Cosmile Worker design-only rework |

All findings are patchable inside the approved prerequisite-plan scope. No DB
connection, query, migration, role/permission action, secret access, or Leo/GPT
risk acceptance is required before the document rework.

## Required Rework

### P-1 - Effective PUBLIC Privilege Paths

The plan must:

1. State that PostgreSQL PUBLIC privileges are effective privileges and are not
   neutralized by `NOINHERIT` or a role-specific denial.
2. Add future admin evidence for effective database CONNECT/TEMP, schema CREATE,
   role membership, ownership, default privileges, and PUBLIC grants.
3. Make `NOINHERIT` required and add `catalog_read_verified` to the evidence
   contract.
4. Define a STOP/decision path when PUBLIC TEMP, unintended other-DB CONNECT, or
   public-schema CREATE is effective.
5. Keep every remediation separate and unapproved. Potential remediation such as
   database-wide `REVOKE ... FROM PUBLIC`, explicit grants to legitimate roles,
   a dedicated DB/cluster, or acceptance of a narrowed residual boundary requires
   blast-radius analysis, independent review, and Leo/GPT approval.
6. Never auto-select or execute a broad PUBLIC revoke in this mission.

### P-2 - Provisioning Secret Channel

The plan must:

1. Remove the password literal from the inert `CREATE ROLE` template.
2. Prohibit raw passwords in SQL text, command arguments, shell history, psql
   history, logs, evidence, and result artifacts.
3. Separate role creation from credential setting.
4. Require a reviewed no-echo interactive/client-side SCRAM provisioning method
   such as `psql` `\password` or a verified equivalent, with no raw password sent
   as SQL text.
5. Treat a SCRAM verifier as sensitive and prevent its output/logging.
6. Require boolean/status evidence that client history and server statement
   logging did not capture credential material.

No provisioning command may run in this mission.

### P-3 - Execution Credential Injection

The plan must explicitly prohibit:

- typing a credential literal in an inline `VAR=value command`;
- passing a credential-bearing URL in argv;
- command echo/xtrace, URL output, env dump, or debug logging;
- broad child-process inheritance or leaving the value set after the command.

It must require an approved no-echo secret-manager prompt, `read -s`-style input,
or owner-only `600` source; the secret must be injected without appearing in
history or argv, live only for the minimum process scope, and be unset/cleaned up.
The design must acknowledge same-user/root process-environment visibility and
define the mitigation or STOP decision.

## Re-Review Contract

After Worker rework, Advisor validates the exact diff and routes the **same
existing Fable5 Reviewer session** to answer:

1. Is there an executable, non-automatic decision path for PUBLIC
   TEMP/CONNECT/public-schema CREATE?
2. Is provisioning specified without raw password exposure in SQL, logs, history,
   argv, or evidence?
3. Is execution credential injection blocked across history, argv, echo/debug,
   process inheritance, and cleanup paths?

A re-review PASS still does not approve admin work or Phase 2A execution.

