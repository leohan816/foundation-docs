# Cross-Repo Agent Protocol Verification Audit - Intake

Date: 2026-07-09

## Leo/GPT Instruction Summary

Verify that the completed Cross-Repo Agent Protocol Patch is actually reflected in each target repository.

This is a read-only verification audit. It is not implementation work, not file patching of protocol files, not Worker/Sentinel/Service Reviewer execution, not runtime repository modification, and not V3-11C2 next-step execution.

## Goal

Directly re-read each target repo entry file and protocol files, then determine whether the new Agent Run Protocol and Result Reporting Protocol are present and sufficient.

## Target Files Checked

Cosmile:

- `../Cosmile/CLAUDE.md`
- `../Cosmile/docs/agent/RUN_PROTOCOL.md`
- `../Cosmile/docs/agent/RESULT_REPORTING_PROTOCOL.md`

SIASIU:

- `../SIASIU/CLAUDE.md`
- `../SIASIU/docs/agent/RUN_PROTOCOL.md`
- `../SIASIU/docs/agent/RESULT_REPORTING_PROTOCOL.md`

foundation-control:

- `../foundation-control/CLAUDE.md`
- `../foundation-control/docs/agent/RUN_PROTOCOL.md`
- `../foundation-control/docs/agent/RESULT_REPORTING_PROTOCOL.md`

foundation-docs:

- `../foundation-docs/README.md`
- `../foundation-docs/docs/agent/RUN_PROTOCOL.md`
- `../foundation-docs/docs/agent/RESULT_REPORTING_PROTOCOL.md`

## Verification Criteria

1. Entry file references both `docs/agent/RUN_PROTOCOL.md` and `docs/agent/RESULT_REPORTING_PROTOCOL.md`.
2. `RUN_PROTOCOL.md` exists.
3. `RESULT_REPORTING_PROTOCOL.md` exists.
4. `RUN_PROTOCOL.md` includes target fields, role boundary, Advisor orchestration, return-to-Advisor behavior, Leo/GPT final approval, launcher-first behavior, `READ_AND_EXECUTE`, `DO_NOT_EXECUTE_FROM_MEMORY`, `DO_NOT_BROADEN_SCOPE`, skill prefix rules, and STOP conditions.
5. `RESULT_REPORTING_PROTOCOL.md` includes no long chat output, result archive path, Advisor pointer path, three-block chat output, foundation-docs commit hash, runtime commit status, and no secrets/PII/raw IDs/prod-live details.
6. Repo boundaries are correct.
7. The protocol patch did not touch runtime source code.
8. Existing Cosmile V3-11C2 runtime diff was not staged or committed by the protocol patch.

## Allowed Write

Advisor audit report only:

- `../foundation-docs/advisor/jobs/20260709_cross_repo_agent_protocol_verification_audit/00_INTAKE.md`
- `../foundation-docs/advisor/jobs/20260709_cross_repo_agent_protocol_verification_audit/01_ADVISOR_BRIEF.md`
- `../foundation-docs/advisor/jobs/20260709_cross_repo_agent_protocol_verification_audit/index.md`

## Forbidden Actions

- Modify protocol files.
- Modify `CLAUDE.md` or `README.md`.
- Edit runtime source code.
- Edit schema/migrations.
- Write DB data.
- Access prod/live/main/secret.
- Execute Worker/Sentinel/Service Reviewer roles.
- Start V3-11C2 next-step execution.
- Stage unrelated files.

## Initial Assumptions

- The verification should judge file presence and content sufficiency only.
- Existing uncommitted runtime diff in `../Cosmile` is expected from V3-11C2 Worker work and must remain untouched.
- Because the user explicitly warned that current `../Cosmile` runtime diff may conflict with Advisor publish rules, this audit report should be held from commit/push unless Leo/GPT grants an exception.
