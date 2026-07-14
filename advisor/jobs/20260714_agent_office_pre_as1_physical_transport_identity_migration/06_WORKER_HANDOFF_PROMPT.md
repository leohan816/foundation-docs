TARGET_ACTOR: Worker
TARGET_SESSION: separate Agent Office Worker session, never Advisor session
SOURCE_ADVISOR_JOB: advisor/jobs/20260714_agent_office_pre_as1_physical_transport_identity_migration
DO_NOT_PASTE_INTO: Advisor session
RETURN_RESULT_TO: Agent Office Advisor
GPT_DIRECT_USE: inspect only, do not execute unless acting as the target session

# Exact Worker Handoff

Read and execute, in order:

1. repository `AGENTS.md` and `CLAUDE.md`;
2. `/home/leo/Project/skill/fable-builder/SKILL.md` and its relevant references;
3. this job's `00_INTAKE.md`, `01_ADVISOR_BRIEF.md`, and `02_WORKER_BRIEF.md`;
4. the actual exact-delivery source and focused tests.

Work only in:

`/home/leo/Project/.worktrees/agent-office/AGENT_OFFICE_PRE_AS1_PHYSICAL_TRANSPORT_IDENTITY_MIGRATION_001`

Branch:

`config/pre-as1-physical-transport-identity-migration-001`

Exact baseline:

`88c6cbd757ed205eb1aadd68d8ea7629865d5765`

Do not execute from memory. Inspect before editing. Preserve historical v1
artifacts. Implement the smallest versioned, fail-closed current binding for
`agent-office-advisor/$26/@26/%26` in `/home/leo/Project/agent-office` without
sending tmux input or activating Slack. Commit and push only this branch, write
the result under `artifacts/pre-as1-physical-transport-identity-migration/`,
return its exact pointer to Advisor, and STOP.
