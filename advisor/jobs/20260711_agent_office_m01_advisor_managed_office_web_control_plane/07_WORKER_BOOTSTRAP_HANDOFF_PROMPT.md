# Agent Office Worker Bootstrap Handoff

TARGET_ACTOR: Agent Office Worker
TARGET_SESSION: existing `agent-office` session, never Advisor or Reviewer
SOURCE_ADVISOR_JOB: ../foundation-docs/advisor/jobs/20260711_agent_office_m01_advisor_managed_office_web_control_plane
DO_NOT_PASTE_INTO: Advisor session or reviewer-fable5
RETURN_RESULT_TO: Advisor
GPT_DIRECT_USE: inspect only

## Work Mode

`BOOTSTRAP_ONLY__NO_PRODUCT_DESIGN__NO_PRODUCT_IMPLEMENTATION`

Model and effort: `<GPT-5.6-Sol:Ultra>`

Use the existing session and context only. Do not create or use an agent,
sub-agent, delegated context, temporary session, or a second Worker.

## Required Reads

Read directly:

- `../foundation-docs/advisor/jobs/20260711_agent_office_m01_advisor_managed_office_web_control_plane/00_INTAKE.md`
- `../foundation-docs/advisor/jobs/20260711_agent_office_m01_advisor_managed_office_web_control_plane/01_ADVISOR_ENTRY_GATE.md`
- `../foundation-docs/advisor/jobs/20260711_agent_office_m01_advisor_managed_office_web_control_plane/03_SESSION_ONBOARDING_BRIEF.md`
- `../foundation-docs/advisor/jobs/20260711_agent_office_m01_advisor_managed_office_web_control_plane/04_WORKER_BOOTSTRAP_BRIEF.md`
- `../foundation-docs/advisor/jobs/20260711_agent_office_m01_advisor_managed_office_web_control_plane/10_MISSION_MANIFEST.json`
- `../foundation-docs/설계문서/shared/AGENT_ROLE_BOUNDARY_AND_RELEASE_TRAIN_PROTOCOL_V2.md`
- active tmux transport protocol only as needed to understand the return boundary

## Exact Task

1. Verify `/home/leo/Project/agent-office` is the empty target workspace and
   `https://github.com/leohan816/agent-office` is the approved private empty remote.
2. Initialize Git on `shadow/agent-office-m01` if still required.
3. Configure the approved origin.
4. Create only these bootstrap files:
   - `AGENTS.md`
   - `CLAUDE.md`
   - `README.md`
   - `.gitignore`
   - `docs/agent/RUN_PROTOCOL.md`
   - `docs/agent/RESULT_REPORTING_PROTOCOL.md`
5. The active instructions must define Agent Office Worker as a repo-local
   design/implementation actor that returns all results to Advisor. Preserve
   Fable5 as independent Reviewer and Leo/GPT as final approver.
6. Explicitly forbid sub-agents/delegated contexts, DB/secrets/public exposure,
   direct browser dispatch to Workers/Reviewers, arbitrary terminal execution,
   self-review, force push, main merge, and automatic next mission.
7. Commit only those six bootstrap files and push only
   `shadow/agent-office-m01` non-force.
8. Write the durable result and pointer at the exact paths below. Commit and push
   only those two foundation-docs result files, using explicit-path staging and
   leaving unrelated dirty files untouched.

## Forbidden

- no product design, source code, package manifest, app scaffold, or tests;
- no DB, secret/env value, production/live, public deployment, protected branch,
  auth prompt response, or force push;
- no new session, agent, sub-agent, delegated context, or temporary context;
- no self-review or final approval;
- no unrelated foundation-docs staging.

## Completion Evidence

Report exact branch, remote, changed files, commit, push/upstream ancestry,
instruction coverage, model/effort, and absence of runtime/product changes.

RESULT_FILE:
`../foundation-docs/runs/agent-office/20260711_agent_office_m01_advisor_managed_office_web_control_plane/WORKER_BOOTSTRAP_RESULT.md`

POINTER_FILE:
`../foundation-docs/advisor/jobs/20260711_agent_office_m01_advisor_managed_office_web_control_plane/12_WORKER_BOOTSTRAP_RESULT_POINTER.md`

Terminal output must be ASCII-only. Markdown files may use normal UTF-8.
Return the pointer block to Advisor and STOP.
