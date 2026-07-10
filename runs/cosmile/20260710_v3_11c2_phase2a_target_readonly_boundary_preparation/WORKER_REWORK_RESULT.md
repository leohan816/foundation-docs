# Worker Rework Result — V3-11C2 Phase 2A Target/Boundary Plan (Fable5 P-1/P-2/P-3)

> Actor: Cosmile Worker (DESIGN_ONLY_REWORK) · Project: Cosmile · Date: 2026-07-10 · Return to: Advisor.
> In-scope design patch only (P-1/P-2/P-3 + two minor items). No DB/query/migration/role/permission/secret/runtime access. Phase 2A + admin remain NOT_APPROVED.
> Rework handoff: `.../09_REWORK_HANDOFF_PROMPT.md` · Finding classification: `.../13_ADVISOR_FINDING_CLASSIFICATION.md` · Fable5 result: `.../FABLE5_DESIGN_REVIEW_RESULT.md` (`NEEDS_PATCH`).

## 1. Findings addressed
| # | Fable5 finding | Patch applied |
|---|---|---|
| P-1 / Q1 | Effective `PUBLIC` `CONNECT`/`TEMP` and PG<15 public-schema `CREATE` have no decision/remediation route | New "Effective PUBLIC privileges" subsection: `PUBLIC` grants are effective and not neutralized by `NOINHERIT`; documented defaults; **non-automatic STOP/decision path** (options a-d, each requiring blast-radius analysis + independent review + Leo/GPT approval); no automatic/broad PUBLIC revoke; section-4 effective-`PUBLIC` booleans + `public_write_path_resolution` = `none_found` \| `stop_pending_leo_decision`; STOP condition + §9 field added. |
| P-2 / Q4 | Raw `PASSWORD '<literal>'` template can leak via SQL/history/log/process | Removed the password literal from the inert `CREATE ROLE` template (now no password); "Provisioning credential channel (P-2)" subsection requiring no-echo client-side SCRAM (`psql \password` / `createuser --pwprompt`, only a SCRAM verifier sent); prohibited raw passwords in SQL/argv/history/logs/evidence; SCRAM verifier treated as sensitive; section-4 booleans for history/log non-capture. |
| P-3 / Q5 | Process-local recommendation didn't block history/argv/echo/inheritance leakage | Section-5 execution injection rules: no inline `VAR=value`, no argv URL (`/proc/<pid>/cmdline`), no echo/xtrace/env-dump, minimal scope + `unset` cleanup, and explicit same-user/root `/proc/<pid>/environ` visibility acknowledgment with a mitigate-or-STOP decision; STOP condition + §9 field added. |
| Q2 minor | `NOINHERIT` preferred, not required | Promoted to **required** (with a note that it does not neutralize `PUBLIC`). |
| Q3 minor | Catalog-read evidence lacked a boolean | Added `catalog_read_verified` to section 4. |

## 2. Re-review contract coverage (the three fixed questions)
1. Executable, non-automatic decision path for `PUBLIC` `TEMP`/`CONNECT`/public-schema `CREATE`: **yes** — P-1 STOP + options a-d + `public_write_path_resolution = stop_pending_leo_decision`, no auto-revoke.
2. Provisioning specified without raw password exposure in SQL/logs/history/argv/evidence: **yes** — password literal removed; no-echo client-side SCRAM; prohibitions + evidence booleans.
3. Execution credential injection blocked across history/argv/echo/inheritance/cleanup: **yes** — section-5 rules + same-user/root visibility decision.

## 3. Files patched + byte-identical mirror proof
| File | Note |
|---|---|
| `../Cosmile/app/docs/V3_11C2_PHASE2A_TARGET_AND_READONLY_BOUNDARY_PLAN.md` | patched design doc |
| `../foundation-docs/설계문서/cosmile/V3_11C2_PHASE2A_TARGET_AND_READONLY_BOUNDARY_PLAN.md` | byte-identical mirror (re-synced via `cp`) |
Mirror proof: `cmp` IDENTICAL; both 23308 bytes; single sha256. The inert `CREATE ROLE` template carries **no** password; the only `PASSWORD` occurrences are a prohibition line and the rework-log description. `NOINHERIT` is required (no leftover "preferred"). Status header updated. Zero secret/credential/URI literals.

## 4. Git status
- Cosmile branch `shadow/m4-cosmile-memory`; pre-rework HEAD `0ec8667`.
- Patch committed `41e53949a88d96791a2e5fce07f752f32056dae5` (`docs(v3-11c2): patch Phase 2A target/boundary plan for Fable5 P-1/P-2/P-3 …`), 1 file, `+67 / -7`, pushed `0ec8667..41e5394`.
- Only the design artifact was staged/committed; six pre-existing `app/docs/**` untracked files were NOT staged. No runtime source/schema/migration/test/package/config/flag change.

## 5. Zero-access confirmation
- DB connection / query / migration / role creation / grant-revoke / permission change / `chmod` / credential creation: **zero**.
- Secret / env value / `DATABASE_URL` / password / SCRAM verifier / credential-bearing URI read, output, copied, logged, or constructed: **zero**.
- No admin or Phase 2A execution prompt created. No Phase 2B work. No Control. No new sub-agent. No automatic acceptance of residual PUBLIC/TEMP/CONNECT/CREATE. Unrelated files preserved.

## 6. Proved / not proved
- Proved: all three Fable5 patch findings and both minor items are resolved in-scope; the plan now (a) treats `PUBLIC` as effective privilege with a non-automatic STOP/Leo-decision remediation path, (b) provisions credentials via no-echo client-side SCRAM with no raw-password exposure, (c) blocks execution-credential leakage across history/argv/echo/inheritance/cleanup, plus `NOINHERIT` required and `catalog_read_verified`; repo-local plan and mirror byte-identical.
- Not proved / out of scope: any live DB/PUBLIC configuration, target identity, schema, or role existence — unchanged; admin and Phase 2A execution remain `NOT_APPROVED`; recommendation stays Option C (HOLD).

`RETURN_TO: Advisor`. Next: Advisor validates the exact diff, then routes the **same** existing Fable5 Reviewer session to answer the three fixed re-review questions.
