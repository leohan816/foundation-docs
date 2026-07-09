# 00 Intake - Cross-Repo Agent Protocol Presence Audit

## Job

`20260709_cross_repo_agent_protocol_presence_audit`

## Leo/GPT Instruction Summary

Audit whether Cosmile, SIASIU, foundation-control, and foundation-docs/Foundation coordination have Agent Run Protocol and Result Reporting Protocol files in place, and whether each repo entry document references those protocol files.

This is a read-only current-state audit plus Advisor report writing. It is not an implementation task and does not create or patch the missing protocol files.

## Goal

- Check presence of `docs/agent/RUN_PROTOCOL.md`.
- Check presence of `docs/agent/RESULT_REPORTING_PROTOCOL.md`.
- Check whether repo entry files reference both protocol documents.
- Evaluate whether protocol content is sufficient when present.
- Evaluate repo boundary correctness from existing entry docs.
- Report missing or insufficient files.

## Non-Goals

- Do not create protocol files.
- Do not update `CLAUDE.md` or `README.md`.
- Do not edit runtime source code.
- Do not start Worker, Sentinel, or Service Reviewer sessions.
- Do not execute V3-11C2 next steps.
- Do not stage unrelated files.

## Allowed Read

Checked target files:

- `../Cosmile/CLAUDE.md`
- `../Cosmile/docs/agent/RUN_PROTOCOL.md`
- `../Cosmile/docs/agent/RESULT_REPORTING_PROTOCOL.md`
- `../SIASIU/CLAUDE.md`
- `../SIASIU/docs/agent/RUN_PROTOCOL.md`
- `../SIASIU/docs/agent/RESULT_REPORTING_PROTOCOL.md`
- `../foundation-control/CLAUDE.md`
- `../foundation-control/docs/agent/RUN_PROTOCOL.md`
- `../foundation-control/docs/agent/RESULT_REPORTING_PROTOCOL.md`
- `../foundation-docs/CLAUDE.md`
- `../foundation-docs/README.md`
- `../foundation-docs/docs/agent/RUN_PROTOCOL.md`
- `../foundation-docs/docs/agent/RESULT_REPORTING_PROTOCOL.md`

Also checked current git status for:

- `../Cosmile`
- `../SIASIU`
- `../foundation-control`
- `../foundation-docs`

## Allowed Write

Advisor audit report only:

- `../foundation-docs/advisor/jobs/20260709_cross_repo_agent_protocol_presence_audit/00_INTAKE.md`
- `../foundation-docs/advisor/jobs/20260709_cross_repo_agent_protocol_presence_audit/01_ADVISOR_BRIEF.md`
- `../foundation-docs/advisor/jobs/20260709_cross_repo_agent_protocol_presence_audit/index.md`

## Forbidden Actions

- Protocol file creation or modification.
- `CLAUDE.md` modification.
- Runtime source code edits.
- Schema or migration edits.
- DB write.
- prod/live/main/secret access.
- Worker, Sentinel, or Service Reviewer execution.
- V3-11C2 next-step execution.
- Staging unrelated files.

## Initial Assumptions

- Missing protocol files make content sufficiency fail for that repo.
- A repo entry file must explicitly reference both `docs/agent/RUN_PROTOCOL.md` and `docs/agent/RESULT_REPORTING_PROTOCOL.md` to pass the reference check.
- Existing runtime diffs in `../Cosmile` block Advisor publish under the current Advisor publish rule unless Leo/GPT grants an exception.
