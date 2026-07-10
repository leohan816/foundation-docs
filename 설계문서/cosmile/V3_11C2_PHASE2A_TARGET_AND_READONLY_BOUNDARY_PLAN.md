# V3-11C2 Phase 2A — Target and Read-Only Boundary Preparation Plan (Design)

Date: 2026-07-10
Author actor: Cosmile Worker (DESIGN_AND_ADMIN_PREPARATION_ONLY)
Status: `DESIGN_DRAFT_PATCHED_AFTER_FABLE5_NEEDS_PATCH_PENDING_REREVIEW`

Canonical mirror: `../foundation-docs/설계문서/cosmile/V3_11C2_PHASE2A_TARGET_AND_READONLY_BOUNDARY_PLAN.md`
Canonical role authority: `../foundation-docs/설계문서/shared/AGENT_ROLE_BOUNDARY_AND_RELEASE_TRAIN_PROTOCOL_V2.md` (`ACTIVE_CANONICAL_V2`)
Canonical commerce design: `../foundation-docs/설계문서/cosmile/COSMILE_V3_11C2_COMMERCE_MEMORY_DESIGN.md` (`APPROVED_WITH_ACCEPTED_RISKS`)
Query package (do not copy/execute): `V3_11C2_PHASE2A_READONLY_PREFLIGHT_EXECUTION_PLAN.md` (Fable5 re-review `PASS`, execution `HOLD`)

> Prerequisite design/admin **preparation** package only. It does NOT connect to a DB, run a query/migration, create/alter a role, grant/revoke privileges, change file permissions, read secret values, edit runtime files, or create a Phase 2A execution launcher. Phase 2A execution status remains `NOT_APPROVED`.
> No secret value, `DATABASE_URL`, host, username, password, or token appears here. Evidence is boolean / count / status / key-name only (per `docs/security/SECURITY_AND_SECRET_GUARDRAILS.md`, `docs/security/ENV_AND_MIGRATION_POLICY.md`). Every admin SQL template is inert and marked `DO_NOT_EXECUTE__SEPARATE_ADMIN_APPROVAL_REQUIRED`.

---

## 1. Target Identity Package

- Alias: **`COSMILE_CURRENT_DEV_DB`** (candidate, not an approved target).
- Source mechanism label: **`COSMILE_APP_LOCAL_ENV_DATABASE_URL_SOURCE`** (a local, Git-ignored env source consumed by Prisma via `env("DATABASE_URL")`). No value, URL, host, username, password, or token is recorded; none was read.
- Classification (all currently **unproven**): `development_only`, `non_prod`, `non_live`, `non_customer_facing`.
- Current status: `CANDIDATE_ONLY__LEO_ENVIRONMENT_OWNER_ATTESTATION_MISSING`. Branch name, `.env.local`, `COSMILE_ENV`, application defaults, and the word "development" are explicitly rejected as proof.

Attestation template (to be completed and approved by Leo / the environment owner; boolean/label only):

```text
DO_NOT_TREAT_AS_APPROVED_UNTIL_SIGNED_AND_LEO_APPROVED
attestation_id:                <label>
attesting_actor:               Leo | environment owner (named)
attestation_date:              <YYYY-MM-DD>
target_alias:                  COSMILE_CURRENT_DEV_DB
source_mechanism_label:        COSMILE_APP_LOCAL_ENV_DATABASE_URL_SOURCE
is_development_only:           true | false
is_non_prod:                   true | false
is_non_live:                   true | false
is_non_customer_facing:        true | false
approved_schema:               <schema name>            # see section 2
evidence_reference_path:       <non-secret provisioning/inventory/attestation path>
expiry_or_revalidation_trigger:<date or event that voids this attestation>
```

Status rule: the target remains **unapproved** until this attestation is completed with all four classification booleans `true`, an `approved_schema`, and a non-secret `evidence_reference_path`, and is then approved by Leo/GPT. Absent that, no Phase 2A execution may target `COSMILE_CURRENT_DEV_DB`.

## 2. Approved Schema Package

- The schema is **not** inferred. `public` and `cosmile` are both rejected as guesses.
- Tracked **hints** (not target-specific proof): `schema.prisma` declares `postgresql` + `env("DATABASE_URL")` with no fixed schema; the initial migration creates `public`, but unqualified object placement still depends on the connection/search_path; the prior disposable Phase 1 rehearsal used `cosmile`, which does not bind the current development target.
- Acceptable non-secret **proof** (any one): an approved provisioning record naming the schema, an environment inventory record, or the Leo/environment-owner attestation `approved_schema` field.
- Current status: **`UNRESOLVED_WITHOUT_NON_SECRET_TARGET_EVIDENCE`**. It stays `UNRESOLVED` until such evidence exists; it must never be filled by inference. All Phase 2A queries use `<APPROVED_SCHEMA>` bound only at approval time from this evidence.

## 3. Least-Privilege Read-Only Role Specification

Role alias (non-secret): **`COSMILE_PHASE2A_READONLY_ROLE`** (to be provisioned by a **separate approved admin mission**, not here).

Permission matrix (minimum required by C-1/C-2/C-3):

| Privilege | Scope | Required | Forbidden |
|---|---|---|---|
| `CONNECT` | target database only | yes (as required) | connect to any other DB |
| `USAGE` | `<APPROVED_SCHEMA>` only | yes | USAGE on any other schema |
| `SELECT` | `<APPROVED_SCHEMA>."RecOutcomeEvent"` (C-1) | yes | any write |
| `SELECT` | `<APPROVED_SCHEMA>."_prisma_migrations"` (C-3) | yes | any write |
| catalog read | `pg_catalog` views needed by C-2 (`pg_index`, `pg_class`, `pg_namespace`, `pg_attribute`) | yes (normally visible to any login role) | — |
| `SELECT` | any other application table | no | broad table SELECT |
| `INSERT`/`UPDATE`/`DELETE`/`TRUNCATE` | any | no | all |
| `REFERENCES`/`TRIGGER`/`EXECUTE` | any | no | all |
| `CREATE`/DDL/`TEMP` | database or schema | no | all |
| ownership | any object | no | must own nothing relevant |

Role attributes (all must be absent): `SUPERUSER`, `CREATEDB`, `CREATEROLE`, `REPLICATION`, `BYPASSRLS`; login only, `NOINHERIT` **required** so it cannot silently absorb privileges from any granted role. (Note: `NOINHERIT` limits *inherited role-grant* privileges; it does **not** neutralize `PUBLIC` privileges — see "Effective PUBLIC privileges" below.)

Explicitly accounted-for privilege paths (must be assessed, not assumed zero):
- role **membership** (no membership in any write-capable or owning role);
- object **ownership** (owns none of `RecOutcomeEvent` / `_prisma_migrations` / schema);
- **inherited** privileges via granted roles;
- **PUBLIC** grants (e.g. a PUBLIC write grant would defeat the role — must be checked);
- **default privileges** (`ALTER DEFAULT PRIVILEGES`) that could grant future write.

Transaction/session read-only (`SET default_transaction_read_only = on`, `SET TRANSACTION READ ONLY` + `ROLLBACK`) is **defense in depth only**, never a substitute for the least-privilege role, and does not constrain a self-connecting full-privilege command.

Inert admin SQL template (placeholders only; not to be run here):

```sql
-- DO_NOT_EXECUTE__SEPARATE_ADMIN_APPROVAL_REQUIRED
-- <ROLE>, <DB>, <APPROVED_SCHEMA> are placeholders; no real value here.
-- P-2: role creation is SEPARATE from credential setting. NO password literal appears here.
CREATE ROLE <ROLE> LOGIN NOSUPERUSER NOCREATEDB NOCREATEROLE NOREPLICATION NOBYPASSRLS NOINHERIT;
-- The login credential is set SEPARATELY by a reviewed no-echo client-side method that sends
-- only a SCRAM verifier (never a raw password as SQL): e.g. psql `\password <ROLE>` or
-- `createuser --pwprompt`. See "Provisioning credential channel (P-2)" below.
GRANT CONNECT ON DATABASE <DB> TO <ROLE>;
GRANT USAGE ON SCHEMA <APPROVED_SCHEMA> TO <ROLE>;
GRANT SELECT ON <APPROVED_SCHEMA>."RecOutcomeEvent"     TO <ROLE>;
GRANT SELECT ON <APPROVED_SCHEMA>."_prisma_migrations"  TO <ROLE>;
-- No other GRANT. No ALTER DEFAULT PRIVILEGES granting writes. No role membership.
```

### Effective PUBLIC privileges (P-1)

PostgreSQL `PUBLIC` grants are **effective privileges** held by every role. They are **not** neutralized by the role's `NOINHERIT` or by any role-specific denial. By default PostgreSQL grants `PUBLIC`:
- `CONNECT` and `TEMP` (temporary-object creation — a **write capability**) on every database;
- `CREATE` on the `public` schema in PostgreSQL **< 15** (removed by default in PG 15+).

Therefore a positive least-privilege role spec is **not sufficient proof** of a read-only boundary: the effective boundary = role grants **minus nothing** **plus** all `PUBLIC` grants. The admin-evidence step (section 4) must assess these as effective privileges, and this plan defines a **non-automatic STOP/decision path** for any residual write path found:

- If effective `PUBLIC TEMP`, unintended other-database `CONNECT`, or public-schema `CREATE` (PG < 15 with `approved_schema = public`) is present → **STOP** and return to Advisor; require a **separately reviewed Leo/GPT decision** among safe remediation options. This plan does **not** auto-select or execute any of them:
  - (a) inert, separately-approved `REVOKE TEMP ON DATABASE <DB> FROM PUBLIC` / `REVOKE CREATE ON SCHEMA public FROM PUBLIC` — requires blast-radius analysis (affects **all** roles on that DB), independent review, and Leo/GPT approval;
  - (b) explicit re-grant of any legitimately-needed privilege to the specific legitimate roles;
  - (c) a dedicated database/cluster for Phase 2A so PUBLIC scope is isolated;
  - (d) documented acceptance of a **narrowed** residual boundary that scopes the no-write claim to **durable/catalog objects only**, explicitly acknowledging temp-namespace residue, mitigated by session `default_transaction_read_only = on` as defense in depth (not a substitute).
- A broad database-wide `REVOKE ... FROM PUBLIC` is **never** auto-selected or executed in this mission; each option above is a separate, unapproved admin decision.

```sql
-- DO_NOT_EXECUTE__SEPARATE_ADMIN_APPROVAL_REQUIRED
-- Illustrative remediation option (a) ONLY; requires blast-radius analysis + Leo/GPT approval.
-- REVOKE TEMP ON DATABASE <DB> FROM PUBLIC;
-- REVOKE CREATE ON SCHEMA public FROM PUBLIC;   -- only if approved_schema = public and PG < 15
```

### Provisioning credential channel (P-2)

Role creation and credential setting are **separate** steps. When the separately-approved admin mission sets `<ROLE>`'s login credential, it must use a reviewed **no-echo, client-side SCRAM** method so only a SCRAM verifier reaches the server and **no raw password** appears in SQL text, command argv, shell history, psql history, server statement logs, evidence, or result artifacts:
- use `psql` `\password <ROLE>` (client computes the SCRAM verifier; only the verifier is sent) or `createuser --pwprompt`, or a verified equivalent;
- **never** `CREATE ROLE … PASSWORD '<literal>'` or `ALTER ROLE … PASSWORD '<literal>'` with a raw literal;
- the SCRAM verifier is itself sensitive — it must not be printed, logged, or copied into evidence;
- confirm `log_statement` / `log_min_duration_statement` did not capture credential material and that client (`psql`/shell) history did not record it (booleans in section 4). Any provisioning command is a separate approved admin step; none runs in this mission.

## 4. Provisioning Evidence Contract

A later, separately approved admin mission must return **boolean / count / status only** (no DB rows, no raw grant text containing sensitive identifiers, no credentials):

- `role_attributes_safe` = true (no superuser/createdb/createrole/replication/bypassrls);
- `noinherit_set` = true;
- `write_capable_membership_absent` = true; `relevant_object_ownership_absent` = true;
- `connect_present` = true; `schema_usage_present` = true;
- `select_present_recoutcomeevent` = true; `select_present_prisma_migrations` = true;
- `catalog_read_verified` = true (C-2 `pg_catalog` visibility confirmed);
- `forbidden_privileges_absent` = true (no INSERT/UPDATE/DELETE/TRUNCATE/REFERENCES/TRIGGER/EXECUTE/DDL/CREATE/TEMP granted directly to the role);
- effective-`PUBLIC` assessment (as **effective** privileges, not just role grants): `public_temp_assessed` = true; `public_connect_scope_assessed` = true (no unintended other-database CONNECT); `public_schema_create_assessed` = true (PG < 15 + `approved_schema = public` case); `public_write_path_resolution` = one of `none_found` | `stop_pending_leo_decision` (if any residual PUBLIC write path exists, status is `stop_pending_leo_decision` and provisioning does **not** proceed — see P-1);
- `inherited_paths_assessed` = true; `default_privileges_assessed` = true (each = "no write path found");
- provisioning credential channel (P-2): `role_created_without_password_literal` = true; `credential_set_via_no_echo_scram` = true; `raw_password_in_sql_absent` = true; `client_history_captured_credential` = false; `server_statement_log_captured_credential` = false; `scram_verifier_exposed_or_logged` = false;
- execution credential (P-3): `readonly_credential_source_created` = true; `credential_value_exposed` = false;
- `evidence_contains_no_rows_or_credentials` = true.

Role provisioning itself is **out of scope** here and is a separate approved admin execution mission with its own post-action independent review.

## 5. Masked Credential Injection

- Recommend a **dedicated Phase 2A read-only credential source** for `COSMILE_PHASE2A_READONLY_ROLE`; **do not reuse or expose** the full-privilege raw `DATABASE_URL`.
- Proposed key name / source label only (metadata, requires Leo/GPT approval before creation): **`COSMILE_PHASE2A_READONLY_DATABASE_URL`** (source label `COSMILE_PHASE2A_READONLY_CRED_SOURCE`). No value is proposed or recorded.

Options compared:

| Option | Masking / lifetime / cleanup | Fit for local dev |
|---|---|---|
| Secret manager (Vault etc.) | strong masking, managed lifetime, audited retrieval; heavier setup | strongest but often unavailable locally |
| Process-local env (single command scope) | value lives only in one process env, not written to a file; cleared on process exit | good; recommended for local dev |
| Owner-restricted local env file (`600`) | persists on disk; needs strict perms + explicit cleanup | acceptable fallback if a persistent source is required |

Recommended local-development path: **process-local env for a single approved read-only command**, so the credential (a) is never written to a repo/tracked file, (b) exists only for the command's lifetime, (c) needs no separate cleanup file, and (d) is not echoed (commands must avoid printing the connection string; output stays count/boolean/status). Any source creation or value injection is a **separate approval** step.

Execution injection rules (P-3) — the credential must be blocked on **every** leak path:
- **No inline literal:** never type `VAR=value command` or paste a credential/URL literal on the command line (shell-history capture). Inject via a no-echo prompt (`read -s`), an approved secret-manager fetch, or an owner-only `600` env-file `source`.
- **No argv exposure:** never pass a credential-bearing URL as a command argument (e.g. `psql "<URL>"`) — it is visible in `/proc/<pid>/cmdline`; pass it through the process environment only.
- **No echo/trace/output:** keep `set -x`/xtrace off; never `echo`/log the URL, never `env`-dump; command output stays count/boolean/status only.
- **Minimal scope + cleanup:** inject only for the single command's process scope, minimize child-process inheritance, and `unset` the variable afterward (or use a subshell); a `600` source file, if used, is never committed and is cleaned up.
- **Same-user/root visibility:** a process's environment is readable by the same user and by root via `/proc/<pid>/environ`; this residual visibility must be acknowledged and either mitigated (short-lived process on a trusted single-user host) or raised as a **STOP** for a Leo/GPT decision if the host trust boundary is insufficient.
No credential source creation or value injection occurs in this mission.

## 6. `.env.local` Hygiene

- Current metadata (values unread): mode `664`, owner `leo:leo`.
- Recommendation: tighten to **owner-only (`600`)** as a separate approved hardening/admin step before any Phase 2A that resolves `DATABASE_URL` from this source.
- Verification is **permission metadata / status only** (e.g. mode == `600` boolean). Value reads, copies, logs, and Git changes are prohibited.
- This plan performs **no** `chmod`; the actual permission change requires separate approval.

## 7. Query Package Pointer

Phase 2A read-only checks remain exactly **C-1 / C-2 / C-3** as specified in `V3_11C2_PHASE2A_READONLY_PREFLIGHT_EXECUTION_PLAN.md` (C-1 duplicate `RecOutcomeEvent.orderItemId` group count; C-2 exact D-O1 index-shape via `pg_index`; C-3 full migration-ledger comparison with drift/state/checksum). This document does **not** copy, broaden, execute, or convert those queries into an execution prompt. The role/schema/credential/hygiene prerequisites here exist to make those queries runnable **read-only** against an **approved** target later.

## 8. Review and STOP Routing

Review gates (in order):
1. **Fable5 `DESIGN_REVIEW`** of this preparation plan (Level 3: DB privilege / secret / schema / customer-data boundary) before any admin step.
2. **Separate post-admin review** of the provisioning-evidence package (section 4) before Phase 2A approval.
3. **Fable5 `IMPLEMENTATION_REVIEW`** after any later Phase 2A execution result.
Independence: Worker cannot self-review; use the existing separate Fable5 Reviewer session; Control prohibited.

STOP conditions (return to Advisor):
- target identity/classification attestation missing or incomplete (any classification boolean not `true`);
- `<APPROVED_SCHEMA>` unresolved (no non-secret evidence);
- least-privilege role cannot be specified without unexamined inherited / PUBLIC / default-privilege / ownership / membership paths;
- credential masking source undefined or would reuse the full-privilege `DATABASE_URL`;
- `.env.local` hygiene precondition unresolved;
- provisioning-evidence contract would require DB rows, raw grants, or credential exposure;
- effective `PUBLIC` `TEMP`, unintended other-database `CONNECT`, or public-schema `CREATE` (PG < 15 + `approved_schema = public`) is present -> STOP for a separately reviewed Leo/GPT remediation decision (no automatic or broad PUBLIC revoke);
- provisioning would place a raw password in SQL text, command argv, shell/psql history, or server statement logs;
- an execution credential would appear in shell history, argv, or echo/trace, would persist beyond the command, or same-user/root process-environment visibility is unacceptable for the host trust boundary;
- any write outside the four allowed files, any DB/query/migration/role/permission action, or any execution-launcher creation would be needed.

Expected final recommendation state: **A / B / C** (below), stated without granting approval.

## 9. Exact Leo/GPT Approval Fields

Before **(1) role/permission or hygiene admin preparation**:
- target identity attestation signed (alias, four classification booleans, `approved_schema`, `evidence_reference_path`, expiry/revalidation);
- `<APPROVED_SCHEMA>` value (from non-secret evidence);
- read-only role alias + permission matrix (section 3) approved for a separate admin mission;
- provisioning-evidence contract (section 4) approved, including the effective-`PUBLIC` assessment booleans;
- **P-1 PUBLIC remediation decision** (option a/b/c/d) with blast-radius analysis + independent review — required only if a residual PUBLIC write path (`TEMP` / other-database `CONNECT` / public-schema `CREATE`) is found;
- **P-2 provisioning credential channel** = no-echo client-side SCRAM (`psql \password` / `createuser --pwprompt`), with no raw password literal in SQL/argv/history/logs;
- dedicated read-only credential source label (section 5) approved for creation;
- **P-3 execution credential injection method** = no shell-history / no argv / no echo-trace, minimal process scope + cleanup, and a same-user/root process-visibility decision;
- `.env.local` `600` hardening approved as a separate step.

Before **(2) Phase 2A execution consideration**:
- post-admin provisioning-evidence review `PASS` (all section-4 booleans true);
- confirmation the credential in use is the read-only source, not the full-privilege `DATABASE_URL`;
- duplicate-preflight expectation and STOP routing acknowledged;
- explicit Phase 2A execution approval (still separate from this package).

Before **(3) post-result routing**:
- Fable5 `IMPLEMENTATION_REVIEW` route for the Phase 2A result;
- risk-acceptance owner for any `PASS_WITH_RISK`.

## Recommendation (authorizes nothing)

- **Option A — approve `COSMILE_CURRENT_DEV_DB` for read-only Phase 2A:** possible only after sections 1-6 are all satisfied (attestation + schema + provisioned least-privilege role + masked credential + `600` hygiene). **Not currently supportable.**
- **Option B — prepare a separate non-prod DB with the read-only role first:** safe, but (per the query plan) re-confirms the migration graph rather than validating the real target.
- **Option C — `HOLD` until the section-9 (1) fields are approved and the admin preparation completes.** **Primary recommendation** — this package defines exactly what must be attested/provisioned; none of it is proven yet, and execution remains `NOT_APPROVED`.

## Rework log — Fable5 `NEEDS_PATCH` (P-1 / P-2 / P-3 + minor)

- **P-1 (effective PUBLIC privileges):** added the "Effective PUBLIC privileges" subsection stating `PUBLIC` grants are effective privileges not neutralized by `NOINHERIT`; documented default `PUBLIC` `CONNECT`+`TEMP` and PG<15 public-schema `CREATE`; defined a **non-automatic STOP/decision path** (options a-d each requiring blast-radius analysis + independent review + Leo/GPT approval) and explicitly forbade any automatic/broad PUBLIC revoke; added effective-`PUBLIC` assessment booleans + `public_write_path_resolution` to section 4; added the STOP condition and the §9 approval field.
- **P-2 (provisioning secret channel):** removed the raw `PASSWORD '<literal>'` from the inert `CREATE ROLE` template; separated role creation from credential setting; required a no-echo client-side SCRAM method (`\password` / `createuser --pwprompt`) sending only a SCRAM verifier; prohibited raw passwords in SQL/argv/history/logs/evidence; added the "Provisioning credential channel (P-2)" subsection + section-4 booleans (`role_created_without_password_literal`, `credential_set_via_no_echo_scram`, `raw_password_in_sql_absent`, `*_captured_credential` = false, `scram_verifier_exposed_or_logged` = false).
- **P-3 (execution credential injection):** added the four-plus-line injection rules to section 5 — no inline `VAR=value`, no argv URL, no echo/trace/output, minimal scope + `unset` cleanup — plus explicit same-user/root `/proc/<pid>/environ` visibility acknowledgment with a mitigate-or-STOP decision; added STOP condition and §9 approval field.
- **Minor:** `NOINHERIT` promoted from *preferred* to **required**; `catalog_read_verified` boolean added to section 4.
- Status -> `DESIGN_DRAFT_PATCHED_AFTER_FABLE5_NEEDS_PATCH_PENDING_REREVIEW`. No DB/query/migration/role/permission/secret access; no runtime/schema/migration/test/package/config/flag change; no execution launcher; scope limited to P-1/P-2/P-3 + the two minor precision items.

## Boundaries reaffirmed

`COSMILE_REC_OUTCOME_ENABLED` remains default OFF. No DB connection, query, migration, role creation, grant/revoke, permission change, `chmod`, secret read, runtime/schema/migration/test/package/flag change, execution launcher, Phase 2B work, main merge, or prod/live access is designed or authorized here. Role provisioning, credential creation, and `.env.local` hardening are each separate approved admin missions with their own review. `RETURN_TO: Advisor`.
