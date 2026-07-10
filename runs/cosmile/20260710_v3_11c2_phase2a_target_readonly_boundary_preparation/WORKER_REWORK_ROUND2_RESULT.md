# Worker Rework Round 2 Result — V3-11C2 Phase 2A Target/Boundary Plan (Fable5 F-A/F-B)

> Actor: Cosmile Worker (DESIGN_ONLY_REWORK_ROUND2) · Project: Cosmile · Date: 2026-07-10 · Return to: Advisor.
> Narrow in-scope patch (F-A/F-B only). No DB/query/migration/role/permission/logging/secret/runtime access. Admin + Phase 2A remain NOT_APPROVED.
> Round-2 handoff: `.../09_REWORK_ROUND2_HANDOFF_PROMPT.md` · Finding classification: `.../16_ADVISOR_REREVIEW_FINDING_CLASSIFICATION.md` · Fable5 re-review: `.../FABLE5_DESIGN_REREVIEW_RESULT.md` (`NEEDS_PATCH`, scope = F-A/F-B; P-1/P-3 + minors CLOSED).

## 1. Findings addressed
| # | Finding | Patch applied |
|---|---|---|
| F-A | `createuser --pwprompt` presented as an equivalent second step, but it creates a role and cannot set a credential on an already-created role (two-step conflict) | Removed `createuser --pwprompt` from the separate credential-setting step in all four places (section 3 template comment, "Provisioning credential channel (P-2)" subsection, section 4 evidence, section 9 approval field). Existing-role setting is now limited to `psql \password <ROLE>` or an independently verified existing-role equivalent; `createuser --pwprompt` marked **excluded**. **No combined-create path introduced.** |
| F-B | SCRAM verifier could be captured by server statement logging with no STOP/decision route | Added "SCRAM verifier statement-log safety gate": (1) **pre-provisioning gate** requiring proof the channel will not record raw-password/verifier material in statement logs, else STOP before provisioning; (2) STOP extended to raw password **or SCRAM verifier** capture; (3) logging-mode change/suppression/alternate channel = separate approved admin decision, no auto logging change; (4) **sensitive-incident STOP** on capture -> classify sensitive, Leo/GPT decides log handling + credential reset/rotation, never auto-delete/reset/rotate; (5) section-4 booleans `pre_provisioning_statement_log_verifier_safe` + `credential_capture_incident_resolution` (`none` \| `stop_sensitive_incident_pending_leo_decision`). |

## 2. Round-3 re-review contract coverage
1. Two-step credential path internally consistent with `createuser --pwprompt` removed from the existing-role step: **yes** — every `createuser` occurrence is now an exclusion/removal note; existing-role setting = `\password` (or verified existing-role equivalent).
2. Verifier logging risk STOPs before provisioning, and actual capture routes to a sensitive-incident/reset decision without automatic log or credential action: **yes** — pre-provisioning gate + sensitive-incident STOP/Leo route; no auto logging change, no auto delete/reset/rotate.

## 3. Scope discipline
- Closed P-1 (effective PUBLIC privilege path) and P-3 (execution credential injection) mechanisms were **not** reopened or broadened; only references needed to keep the F-B STOP/evidence text internally consistent were touched.
- No combined-`createuser` flow introduced. No logging change, credential reset, credential rotation, or log deletion designed or performed.

## 4. Files patched + byte-identical mirror proof
| File | Note |
|---|---|
| `../Cosmile/app/docs/V3_11C2_PHASE2A_TARGET_AND_READONLY_BOUNDARY_PLAN.md` | round-2 patched design doc |
| `../foundation-docs/설계문서/cosmile/V3_11C2_PHASE2A_TARGET_AND_READONLY_BOUNDARY_PLAN.md` | byte-identical mirror (re-synced via `cp`) |
Mirror proof: `cmp` IDENTICAL; both 27763 bytes; single sha256. Active status header = `DESIGN_DRAFT_PATCHED_AFTER_FABLE5_REREVIEW_NEEDS_PATCH_PENDING_ROUND3` (the single remaining round-2 status string is the honest round-1 rework-log history entry). Zero secret/credential/verifier literals.

## 5. Git status
- Cosmile branch `shadow/m4-cosmile-memory`; pre-round-2 HEAD `41e5394`.
- Patch committed `e4ed6680fee2a2e55117fb406cae8714e3680465` (`docs(v3-11c2): round-2 patch … F-A/F-B …`), 1 file, `+25 / -12`, pushed `41e5394..e4ed668`.
- Only the design artifact staged/committed; six pre-existing `app/docs/**` untracked files NOT staged. No runtime source/schema/migration/test/package/config/flag change.

## 6. Zero-access confirmation
- DB connection / query / migration / role / grant-revoke / logging / permission / chmod / credential action: **zero**.
- Secret / password / SCRAM verifier / env value / log content / credential URI read, output, copied, logged, or constructed: **zero**.
- No admin or Phase 2A execution prompt. No Phase 2B / main / prod / live / Control / new sub-agent. Unrelated files preserved.

## 7. Proved / not proved
- Proved: F-A (two-step credential path is internally consistent; `createuser --pwprompt` removed, no combined-create path) and F-B (verifier statement-log pre-provisioning gate + sensitive-incident STOP/Leo route, no auto logging/credential action) are resolved in-scope; repo-local plan and mirror byte-identical; P-1/P-3 mechanisms intact.
- Not proved / out of scope: actual server `log_statement` setting, PG version, and target DB state (intentionally not accessed — the F-B gate makes these an execution-time evaluation/decision item). Admin + Phase 2A remain `NOT_APPROVED`; recommendation stays Option C (HOLD).

`RETURN_TO: Advisor`. Next: Advisor validates the exact diff, then routes the **same** existing Fable5 Reviewer session (round 3, scope = F-A/F-B only) to answer the two fixed questions.
