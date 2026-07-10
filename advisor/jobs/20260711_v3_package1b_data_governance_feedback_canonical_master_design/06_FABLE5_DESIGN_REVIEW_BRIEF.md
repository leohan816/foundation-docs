# Fable5 Package 1B Canonical Design Review Brief

Date: 2026-07-11

Target actor: `Fable5 Reviewer`

Target session: same existing independent Fable5 Reviewer session.

Required skill: `/fable-sentinel`

Model and effort: `<Fable5:Max>`

Review pass: `DESIGN_REVIEW__V3_PACKAGE1B_CANONICAL_MASTER_DESIGN`

Review level: `LEVEL_3`

Status: `WAIT_FOR_CONTROL_AND_REPO_VALIDATION_RECONCILIATION`

## Reviewer Routing Decision

- **Selected reviewer:** Fable5 Reviewer.
- **Reason:** Leo/GPT explicitly requires the existing Fable5 session; the candidate spans identity, privacy, retention, safety, order provenance, cross-repo contracts, memory/learning, and future schema/migration risk.
- **Not selected:** Dedicated SOL Reviewer, because the mission requires existing sessions only and explicitly selects Fable5. Control cannot review its own design. Foundation/Cosmile validators are feasibility validators, not the independent canonical design reviewer.
- **One reviewer or dual:** One independent Fable5 design reviewer is the required route for this mission. Repo-local validations provide separate feasibility evidence but do not replace Fable5.
- **Return result to:** Advisor.

## Required Inputs

Fable5 must directly read the final reconciled versions and exact commits of:

- all four Control candidate documents;
- completed Advisor V3 entry checklist;
- frozen design-question register;
- Foundation and Cosmile validation results;
- Advisor comparison/reconciliation record;
- any same-session Control patch and affected revalidation;
- actual referenced repo files;
- actual commits/diffs;
- all six V3 canonical documents and role protocol V2.

Do not trust Control, Worker, or Advisor summaries.

## Required Explicit Coverage

1. D1 through D5-ii are exact and not expanded.
2. U-01 through U-09 and every impacted addendum remain visible.
3. Legal, experiment, operational, deployed, DB, provider, and credential unknowns remain unresolved where required.
4. Initial scope works without free text, provider, semantic API, identity linking, ranking, durable memory, or Foundation signal use.
5. Positive and adverse axes remain independent.
6. No destructive re-key or silent overwrite exists.
7. Correction is append/supersede and auditable.
8. Provenance is captured at creation time.
9. Retention design does not invent legal periods.
10. D5-i does not waive D5-ii.
11. Outbox design does not rely on absent consumer.
12. Foundation receives no raw commerce/order/payment/customer identity.
13. Initial design remains usable while all extensions are disabled.
14. All twelve extension points are additive and backward-compatible.
15. Scenarios 1-8 are fully mapped with modifications preserved.
16. Failure, rollback, deletion, correction, abuse, and kill-switch behavior is testable.
17. U-09 and absent human review remain honest.
18. No runtime/schema/API/DB implementation is hidden.
19. Package 2/3/4, implementation, and production remain unauthorized.
20. A future implementation brief would not require Workers to invent product policy.

## Verdict Contract

- `PASS`
- `PASS_WITH_RISK`
- `NEEDS_PATCH`
- `FAIL`

`PASS_WITH_RISK` returns to Leo/GPT and does not advance. `NEEDS_PATCH` returns to Advisor for same-Control-session patch and same-Fable5-session delta review. `FAIL` stops.

## Result Paths

Full result:

`../foundation-docs/runs/shared/20260711_v3_package1b_data_governance_feedback_canonical_master_design/FABLE5_PACKAGE1B_DESIGN_REVIEW_RESULT.md`

Pointer:

`../foundation-docs/advisor/jobs/20260711_v3_package1b_data_governance_feedback_canonical_master_design/16_FABLE5_DESIGN_REVIEW_POINTER.md`

Commit/push only result and pointer. Return to Advisor.

## Forbidden

- Patching candidate or runtime files.
- Control/Worker work or final approval.
- DB/query/migration, secret/env, provider/live-model, customer data.
- New session/sub-agent/delegation.
- Product/legal policy selection.
- Package 1 implementation or Package 2/3/4 start.
