# 01 Advisor Brief - Advisor Rules Mirror

## Verdict

`ADVISOR_RULES_MIRROR_READY`

Instruction validation result: `PROCEED`.

## Executive Summary

The current local Advisor operating rules from `./AGENTS.md` were mirrored to `../foundation-docs/advisor/_system/AGENTS.md` so they are readable through the `foundation-docs` GitHub repository.

This mirror is not runtime source-of-truth and does not replace the local cockpit at `~/Project/foundation-advisor`.

## Files Read

- `./AGENTS.md`
- `./CLAUDE.md`
- `./README.md`

## Files Written

- `../foundation-docs/advisor/_system/AGENTS.md`
- `../foundation-docs/advisor/_system/README.md`
- `../foundation-docs/advisor/jobs/20260708_advisor_rules_mirror/00_INTAKE.md`
- `../foundation-docs/advisor/jobs/20260708_advisor_rules_mirror/01_ADVISOR_BRIEF.md`
- `../foundation-docs/advisor/jobs/20260708_advisor_rules_mirror/index.md`

## Mirror Content

The mirrored `AGENTS.md` includes the current Advisor operating rules:

- Advisor is not Worker, Independent Reviewer, or final approver.
- Runtime repos are read-only unless a future task explicitly authorizes otherwise.
- Durable Advisor artifacts live under `../foundation-docs/advisor/`.
- `../skill` is conditional read scope only for skill boundary, skill behavior, template maintenance, and workflow rule maintenance tasks.
- Skill boundaries:
  - `fable-builder` = approved implementation batch.
  - `fable-sentinel` = independent review/audit/readiness/delta review; implementation forbidden.
  - `fable-debugger` = non-contract/general debugging; not a replacement for builder or sentinel.
  - `shared-reasoning-core` = shared reference only; no skill prefix.
- Advisor reports should be committed/pushed in the same task when runtime repo changes are 0 and staged files are only under `../foundation-docs/advisor/`, except when Leo/GPT forbids publishing, staged files escape Advisor scope, runtime repo changes are present, or the report is HOLD/incomplete.

## Source-of-Truth Note

`../foundation-docs/advisor/_system/` is a mirror/archive for GitHub readability. It is not runtime source-of-truth.

The local cockpit remains:

`~/Project/foundation-advisor`

If the local cockpit, mirror, runtime code, Foundation canonical contracts, or current Leo/GPT instruction conflict, Advisor must STOP and report to Leo/GPT.

## Scope Check

- Runtime repos were not modified.
- No Worker brief was created.
- No implementation instruction was created.
- No V3-11C2 work was started.
- No schema/migration/DB/prod/live/main/secret was accessed.

## Next Recommended Action

Use `../foundation-docs/advisor/_system/AGENTS.md` only as a GitHub-readable mirror when sharing Advisor operating rules outside the local cockpit.
