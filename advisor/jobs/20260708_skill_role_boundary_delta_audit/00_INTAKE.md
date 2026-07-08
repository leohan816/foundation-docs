# 00 Intake - Skill Role Boundary Delta Audit

Job id: `20260708_skill_role_boundary_delta_audit`

Date: 2026-07-08

Advisor role: cross-repo Advisor for Leo + ChatGPT. Not Worker, not Independent Reviewer, not final approver.

## Instruction Summary

Run a narrow, read-only Advisor delta audit of `../skill` role boundaries so future Advisor Worker/Reviewer briefs use correct skill names and role boundaries.

This is not skill execution, implementation, or Worker brief creation.

## Goal

Confirm only:

1. Whether `fable-builder` is implementation role.
2. Whether `fable-sentinel` is review-only role.
3. Whether `fable-debugger` is non-contract/general debugging role.
4. Whether `shared-reasoning-core` is a shared reference, not an active skill.
5. Which skill prefix Advisor should use in future role-specific briefs.
6. Whether Advisor `AGENTS.md` allowed read scope should be corrected from `../skills` to `../skill`, as a finding only.

## Allowed Read

- `../skill`
- `./AGENTS.md`
- `./CLAUDE.md`
- `../foundation-docs/advisor/jobs/20260708_cross_repo_v1_to_v3_current_state_audit/`

## Allowed Write

- `../foundation-docs/advisor/jobs/20260708_skill_role_boundary_delta_audit/**`

## Forbidden

- Modify `../skill`.
- Modify runtime repos.
- Execute or apply any skill.
- Create Worker briefs.
- Create implementation instructions.
- Commit or push.
- Modify `AGENTS.md` in this job.

## Method

Read-only file inspection only. No skill was invoked or applied.

Files inspected:

- `./AGENTS.md`
- `./CLAUDE.md`
- `../foundation-docs/advisor/jobs/20260708_cross_repo_v1_to_v3_current_state_audit/`
- `../skill/README.md`
- `../skill/fable-builder/SKILL.md`
- `../skill/fable-builder/references/*` via targeted role grep
- `../skill/fable-sentinel/SKILL.md`
- `../skill/fable-sentinel/references/*` via targeted role grep
- `../skill/fable-debugger/SKILL.md`
- `../skill/fable-debugger/README.md`
- `../skill/shared-reasoning-core/README.md`
- `../skill/shared-reasoning-core/references/failure-escalation.md` via targeted role grep

## Assumptions

- The folder name and `SKILL.md` frontmatter name define the skill prefix.
- Advisor should not run these skills. Advisor should reference the correct skill in future briefs for the Worker or Reviewer session.

