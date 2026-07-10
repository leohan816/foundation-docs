# V3-11C2 Phase 2A — Target and Read-Only Boundary Preparation Plan (Design)

Date: 2026-07-10
Author actor: Cosmile Worker (DESIGN_AND_ADMIN_PREPARATION_ONLY)
Status: `DESIGN_DRAFT_PENDING_FABLE5_REVIEW_AND_LEO_GPT_APPROVAL`

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

Role attributes (all must be absent): `SUPERUSER`, `CREATEDB`, `CREATEROLE`, `REPLICATION`, `BYPASSRLS`; login only, `NOINHERIT` preferred so it cannot silently absorb group privileges.

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
CREATE ROLE <ROLE> LOGIN NOSUPERUSER NOCREATEDB NOCREATEROLE NOREPLICATION NOBYPASSRLS NOINHERIT PASSWORD '<INJECT_AT_RUNTIME_NEVER_IN_REPO>';
GRANT CONNECT ON DATABASE <DB> TO <ROLE>;
GRANT USAGE ON SCHEMA <APPROVED_SCHEMA> TO <ROLE>;
GRANT SELECT ON <APPROVED_SCHEMA>."RecOutcomeEvent"     TO <ROLE>;
GRANT SELECT ON <APPROVED_SCHEMA>."_prisma_migrations"  TO <ROLE>;
-- No other GRANT. No ALTER DEFAULT PRIVILEGES granting writes. No role membership.
```

## 4. Provisioning Evidence Contract

A later, separately approved admin mission must return **boolean / count / status only** (no DB rows, no raw grant text containing sensitive identifiers, no credentials):

- `role_attributes_safe` = true (no superuser/createdb/createrole/replication/bypassrls);
- `write_capable_membership_absent` = true; `relevant_object_ownership_absent` = true;
- `connect_present` = true; `schema_usage_present` = true;
- `select_present_recoutcomeevent` = true; `select_present_prisma_migrations` = true;
- `forbidden_privileges_absent` = true (no INSERT/UPDATE/DELETE/TRUNCATE/REFERENCES/TRIGGER/EXECUTE/DDL/TEMP/CREATE);
- `inherited_paths_assessed` = true; `public_grants_assessed` = true; `default_privileges_assessed` = true (each = "no write path found");
- `readonly_credential_source_created` = true, with `credential_value_exposed` = false;
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
- any write outside the four allowed files, any DB/query/migration/role/permission action, or any execution-launcher creation would be needed.

Expected final recommendation state: **A / B / C** (below), stated without granting approval.

## 9. Exact Leo/GPT Approval Fields

Before **(1) role/permission or hygiene admin preparation**:
- target identity attestation signed (alias, four classification booleans, `approved_schema`, `evidence_reference_path`, expiry/revalidation);
- `<APPROVED_SCHEMA>` value (from non-secret evidence);
- read-only role alias + permission matrix (section 3) approved for a separate admin mission;
- provisioning-evidence contract (section 4) approved;
- dedicated read-only credential source label (section 5) approved for creation;
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

## Boundaries reaffirmed

`COSMILE_REC_OUTCOME_ENABLED` remains default OFF. No DB connection, query, migration, role creation, grant/revoke, permission change, `chmod`, secret read, runtime/schema/migration/test/package/flag change, execution launcher, Phase 2B work, main merge, or prod/live access is designed or authorized here. Role provisioning, credential creation, and `.env.local` hardening are each separate approved admin missions with their own review. `RETURN_TO: Advisor`.
