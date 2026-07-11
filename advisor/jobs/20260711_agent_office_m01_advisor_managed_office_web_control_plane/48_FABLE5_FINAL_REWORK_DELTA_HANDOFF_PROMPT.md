TARGET_ACTOR: Fable5 Reviewer Re-Review
TARGET_SESSION: same existing reviewer-fable5 session, never Advisor or Worker
SOURCE_ADVISOR_JOB: ../foundation-docs/advisor/jobs/20260711_agent_office_m01_advisor_managed_office_web_control_plane
DO_NOT_PASTE_INTO: Advisor session or Agent Office Worker session
RETURN_RESULT_TO: Advisor
GPT_DIRECT_USE: inspect only, do not execute unless acting as the target Reviewer session

# Agent Office M01 Final Rework Delta Review

Use the same existing independent Fable5 Reviewer session that returned the prior final dual `NEEDS_PATCH` verdicts.

## Required role and effort

- Skill: `/fable-sentinel`
- Model/effort: `Fable5:Max`
- Passes: two separate verdicts and artifacts
  - `DESIGN_REVIEW__AGENT_OFFICE_M01_FINAL_REWORK_DELTA`
  - `IMPLEMENTATION_REVIEW__AGENT_OFFICE_M01_FINAL_REWORK_DELTA`
- Review level: Level 3
- No sub-agent, delegated context, or new session

## Read directly

1. This handoff file.
2. `../foundation-docs/advisor/jobs/20260711_agent_office_m01_advisor_managed_office_web_control_plane/47_ADVISOR_POST_REWORK_VALIDATION.md`
3. Prior review artifacts:
   - `../foundation-docs/runs/agent-office/20260711_agent_office_m01_advisor_managed_office_web_control_plane/FABLE5_FINAL_DESIGN_REVIEW_RESULT.md`
   - `../foundation-docs/runs/agent-office/20260711_agent_office_m01_advisor_managed_office_web_control_plane/FABLE5_FINAL_IMPLEMENTATION_REVIEW_RESULT.md`
4. Worker rework result and pointer:
   - `../foundation-docs/runs/agent-office/20260711_agent_office_m01_advisor_managed_office_web_control_plane/WORKER_FINAL_REWORK_RESULT.md`
   - `../foundation-docs/advisor/jobs/20260711_agent_office_m01_advisor_managed_office_web_control_plane/46_WORKER_FINAL_REWORK_RESULT_POINTER.md`
5. Original mission intake/brief, exact mission manifest, canonical Agent Office documents, and current repo-local instructions.
6. Actual Agent Office commits and diffs:
   - base `72c24fe`
   - code/config/tests `0f90e39d3995ffca97eb7a05ef051d8f9a3719c1`
   - canonical docs `3bd0e8f8cf10ecd53b917ba6cc1da45b9410b57b`
7. Actual current source, tests, scripts, package configuration, Git/upstream status, and canonical Advisor manifest.

Do not trust Worker or Advisor summaries as proof.

## Mandatory review scope

### Original findings

- Independently determine whether AO-E-R1 and AO-E-R2 are closed.
- Re-run focused tests and any broader checks needed for a Level 3 verdict.
- Verify code-to-design and code-to-mission conformance.

### AO-E-R3 operational conformance challenge

Independently inspect and classify all of the following:

1. The executable CLI hard-coded fixture manifest versus the current canonical Advisor manifest.
2. Static manifest plus fresh local ledger versus current Git/tmux/artifact observation.
3. The unconditional `CURRENT` / `VERIFIED_LOCAL_EVENT_PROJECTION` labels.
4. Durable alert projection versus `communication.alerts: []`.
5. Production authenticated projection versus `showOfficeScene={false}`.
6. Executable composition selecting disabled `HermesAdvisorGateway` instead of an injected `TmuxAdvisorGateway` or other approved Advisor gateway port.
7. Absence or presence of an operational observation/import coordinator for the already-built read-only Git/tmux/artifact adapters.
8. Ability or inability to deliver a browser decision pointer to the actual Advisor, record acknowledgement/intake/decision, and prove work resumption.
9. Accuracy of all related as-built canonical documentation.

Judge against the original M01 objective and final expected state, including:

- current initiative/package/mission/WorkUnit progress;
- current actor status based on structured evidence;
- structured Advisor alerts and details;
- event-backed animated office scene;
- Advisor-only communication, acknowledgement, and work resumption;
- `OFFICE_WEB_APP: RUNNING_PRIVATE`;
- `ADVISOR_COMMUNICATION: ACTIVE`;
- `TMUX_OBSERVABILITY: ACTIVE`;
- browser direct Worker/Reviewer dispatch remains forbidden.

Distinguish carefully:

- a secure fail-closed executable shell;
- a test/synthetic composition;
- the required operational private control plane;
- features blocked only by a legitimate Leo/GPT security gate.

Do not require credentials, real secrets, public/private-network exposure, DB access, production/live use, browser terminal execution, or weakened authentication merely to obtain PASS. Identify exact in-scope patches that can be completed without those forbidden actions. Return any genuinely sensitive authority decision separately.

## Verdict and classification contract

For each pass use exactly one:

- `PASS`
- `PASS_WITH_RISK`
- `NEEDS_PATCH`
- `FAIL`

Classify divergence as applicable:

- `CODE_DEFECT`
- `DESIGN_DEFECT`
- `DOCUMENTATION_STALE`
- `DEFERRED_WITH_GATE`
- `NEEDS_LEO_GPT_DECISION`

Separate each distinct finding. Do not merge patchable defects into a broad auth/provider gate.

## Forbidden

- patching any Agent Office or Advisor file;
- changing a verdict manually;
- implementation, commit, or push in Agent Office;
- DB, secret, credential, auth-provider, privilege, production/live, or public-exposure access;
- new session, agent, sub-agent, or delegated context;
- granting final approval;
- starting another mission.

## Required outputs

Write and push only:

1. `../foundation-docs/runs/agent-office/20260711_agent_office_m01_advisor_managed_office_web_control_plane/FABLE5_FINAL_DESIGN_DELTA_REREVIEW_RESULT.md`
2. `../foundation-docs/runs/agent-office/20260711_agent_office_m01_advisor_managed_office_web_control_plane/FABLE5_FINAL_IMPLEMENTATION_DELTA_REREVIEW_RESULT.md`
3. `../foundation-docs/advisor/jobs/20260711_agent_office_m01_advisor_managed_office_web_control_plane/49_FABLE5_FINAL_REWORK_DELTA_RESULT_POINTER.md`

Each result must list reviewed commits/files/diffs/tests, excluded scope, exact finding disposition, unresolved risks, rationale, and its own verdict. The pointer must preserve the two separate verdicts and return to Advisor.

Terminal output must be ASCII-only. Markdown files may preserve their normal UTF-8 language and paths.

Report the pointer to Advisor and STOP.
