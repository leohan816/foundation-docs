# 00 Intake - Cross-Repo Agent Protocol Patch

## Job

`20260709_cross_repo_agent_protocol_patch`

## Leo/GPT Instruction Summary

Patch Cosmile, SIASIU, foundation-control, and foundation-docs according to the Cross-Repo Agent Protocol Presence Audit.

Create missing Agent Run and Result Reporting protocol files, and add short references from each repo entry file.

## Audit Basis

- Advisor audit: `../foundation-docs/advisor/jobs/20260709_cross_repo_agent_protocol_presence_audit/01_ADVISOR_BRIEF.md`
- Audit verdict: `PROTOCOLS_MISSING_NEEDS_PATCH`
- Audit commit: `2f9cbabc6d3bd74c90bdc65671dfd89fcd6af54b`

## Goal

- Add `docs/agent/RUN_PROTOCOL.md` to each target repo area.
- Add `docs/agent/RESULT_REPORTING_PROTOCOL.md` to each target repo area.
- Add short entry-file references to those protocols.
- Preserve runtime source code untouched.
- Do not execute V3-11C2 next steps.

## Non-Goals

- Do not modify runtime source code.
- Do not edit app logic.
- Do not edit tests.
- Do not edit schema or migrations.
- Do not write DB data.
- Do not access prod/live/main/secret.
- Do not execute Worker, Sentinel, or Service Reviewer roles.
- Do not stage or commit existing unrelated untracked files.
- Do not stage or commit current Cosmile V3-11C2 runtime diff.

## Target Files

Cosmile:

- update `../Cosmile/CLAUDE.md`
- create `../Cosmile/docs/agent/RUN_PROTOCOL.md`
- create `../Cosmile/docs/agent/RESULT_REPORTING_PROTOCOL.md`

SIASIU:

- update `../SIASIU/CLAUDE.md`
- create `../SIASIU/docs/agent/RUN_PROTOCOL.md`
- create `../SIASIU/docs/agent/RESULT_REPORTING_PROTOCOL.md`

foundation-control:

- update `../foundation-control/CLAUDE.md`
- create `../foundation-control/docs/agent/RUN_PROTOCOL.md`
- create `../foundation-control/docs/agent/RESULT_REPORTING_PROTOCOL.md`

foundation-docs / Foundation coordination:

- update `../foundation-docs/README.md`
- create `../foundation-docs/docs/agent/RUN_PROTOCOL.md`
- create `../foundation-docs/docs/agent/RESULT_REPORTING_PROTOCOL.md`

Advisor report:

- `../foundation-docs/advisor/jobs/20260709_cross_repo_agent_protocol_patch/00_INTAKE.md`
- `../foundation-docs/advisor/jobs/20260709_cross_repo_agent_protocol_patch/01_ADVISOR_BRIEF.md`
- `../foundation-docs/advisor/jobs/20260709_cross_repo_agent_protocol_patch/index.md`

## Initial Assumptions

- Creating `../foundation-docs/CLAUDE.md` is unnecessary because `../foundation-docs/README.md` exists and can carry the short reference.
- Existing Cosmile V3-11C2 runtime diffs are intentional Worker output and must remain uncommitted.
- Existing unrelated untracked docs in runtime repos must remain unstaged.
