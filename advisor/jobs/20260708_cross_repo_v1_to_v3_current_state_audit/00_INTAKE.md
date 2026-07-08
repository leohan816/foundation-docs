# 00 Intake - Cross-Repo V1 to V3 Current-State Audit

Job id: `20260708_cross_repo_v1_to_v3_current_state_audit`

Date: 2026-07-08

Advisor role: cross-repo Advisor for Leo + ChatGPT. Not Worker, not Independent Reviewer, not final approver.

## Leo/GPT Instruction Summary

Run an Advisor system smoke test and a repo-grounded current-state audit across Foundation, Cosmile, SIASIU, foundation-docs, and skills for V1 through V3.

This task is status discovery only. It is not implementation work and must not create Worker briefs or implementation instructions.

## Task Goal

1. Read the Advisor operating files and follow Advisor role boundaries.
2. Inventory candidate V1/V2/V3 documents, reports, snapshots, commits, and runtime files.
3. Deeply verify only load-bearing files that determine current status.
4. Separate status layers:
   - reported status
   - document-backed status
   - code-backed status
   - test-backed status
   - runtime/prod status
5. Audit current V1, V2, V3 state without inferring undocumented definitions.
6. Write durable Advisor artifacts only under this job folder.

## Non-Goals

- No runtime implementation.
- No schema or migration changes.
- No DB writes.
- No prod/live/main/secret access.
- No Worker brief.
- No Reviewer brief.
- No final approval.
- No commit or push.

## Allowed Read

- `../Cosmile`
- `../foundation-control`
- `../foundation-docs`
- `../SIASIU`
- `../skills`
- `./AGENTS.md`
- `./CLAUDE.md`
- `./README.md`
- `./templates`

Observed note: `../skills` does not exist in the current filesystem. A similarly named `../skill` directory exists, but it is outside the explicitly allowed read scope and was not inspected.

## Allowed Write

- `../foundation-docs/advisor/jobs/20260708_cross_repo_v1_to_v3_current_state_audit/**`

## Forbidden Actions

- Modify `../Cosmile`.
- Modify `../foundation-control`.
- Modify `../SIASIU`.
- Modify skills repos.
- Modify runtime code.
- Modify schemas or migrations.
- Write DB data.
- Access prod/live/main/secret.
- Create Worker briefs.
- Mark implementation ready as final.
- Commit or push.

## Initial Assumptions

- `foundation-docs` is evidence/archive, not runtime source-of-truth.
- Runtime behavior must be verified in actual runtime repos.
- Foundation canonical docs/contracts define reasoning, product, ingredient, safety, and structured semantic authority.
- Cosmile and SIASIU are service/runtime layers.
- If V1/V2 terms are overloaded or not explicitly defined in docs, the audit must mark them `UNKNOWN_NEEDS_VERIFICATION` instead of merging meanings.
- Because this job explicitly forbids Worker briefs, this smoke-test job intentionally creates only `00_INTAKE.md`, `01_ADVISOR_BRIEF.md`, and `index.md`.

