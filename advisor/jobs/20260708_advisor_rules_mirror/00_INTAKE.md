# 00 Intake - Advisor Rules Mirror

## Job

`20260708_advisor_rules_mirror`

## Leo/GPT Instruction Summary

Create a GitHub-readable mirror of the current `foundation-advisor/AGENTS.md` operating rules under `../foundation-docs/advisor/_system/`, and write a small Advisor report for this mirror operation.

## Task Goal

- Read the local Advisor operating files.
- Mirror current `./AGENTS.md` into `../foundation-docs/advisor/_system/AGENTS.md`.
- Add `_system/README.md` explaining that the folder is a mirror, not runtime source-of-truth.
- Create this Advisor job report.
- Commit and push in `foundation-docs` if staged files are confined to allowed Advisor paths and runtime repos are not changed.

## Non-Goals

- No runtime implementation.
- No Worker brief.
- No V3-11C2 work.
- No runtime repo modification.
- No schema/migration/DB/prod/live/main/secret work.

## Allowed Read

- `./AGENTS.md`
- `./CLAUDE.md`
- `./README.md`

## Allowed Write

- `../foundation-docs/advisor/_system/AGENTS.md`
- `../foundation-docs/advisor/_system/README.md`
- `../foundation-docs/advisor/jobs/20260708_advisor_rules_mirror/00_INTAKE.md`
- `../foundation-docs/advisor/jobs/20260708_advisor_rules_mirror/01_ADVISOR_BRIEF.md`
- `../foundation-docs/advisor/jobs/20260708_advisor_rules_mirror/index.md`

## Forbidden Actions

- Do not modify, commit, or push `../Cosmile`.
- Do not modify, commit, or push `../foundation-control`.
- Do not modify, commit, or push `../SIASIU`.
- Do not modify, commit, or push `../skill`.
- Do not modify, commit, or push `../foundation-advisor` beyond reading local files.
- Do not modify runtime code.
- Do not modify schema or migrations.
- Do not write DB data.
- Do not access prod/live/main/secret.
- Do not create a Worker brief.
- Do not create implementation instructions.
- Do not start V3-11C2 work.

## Initial Assumptions

- The local cockpit remains `~/Project/foundation-advisor`.
- The `_system` folder in foundation-docs is a mirror for GitHub readability only.
- If local Advisor operating rules and the mirror conflict later, Advisor must STOP and report to Leo/GPT.
