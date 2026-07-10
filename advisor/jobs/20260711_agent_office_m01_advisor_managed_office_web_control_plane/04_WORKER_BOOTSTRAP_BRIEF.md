# Agent Office Worker Bootstrap Brief

Status: `READY_TO_ROUTE_AFTER_REGISTRY_PUBLISH`

Target repo: `/home/leo/Project/agent-office`

Target branch: `shadow/agent-office-m01`

Remote: `https://github.com/leohan816/agent-office`

Allowed files:

- `AGENTS.md`
- `CLAUDE.md`
- `README.md`
- `docs/agent/RUN_PROTOCOL.md`
- `docs/agent/RESULT_REPORTING_PROTOCOL.md`
- `.gitignore`

Allowed Git actions:

- `git init -b shadow/agent-office-m01`;
- add the approved origin;
- commit only the bootstrap files;
- push only `shadow/agent-office-m01` non-force.

Forbidden:

- application/runtime/package files;
- design candidate files;
- DB, secret, public deployment, main branch, or force push;
- new session, agent, or sub-agent;
- Worker self-review or final approval.

Result file:

`../foundation-docs/runs/agent-office/20260711_agent_office_m01_advisor_managed_office_web_control_plane/WORKER_BOOTSTRAP_RESULT.md`

Pointer:

`../foundation-docs/advisor/jobs/20260711_agent_office_m01_advisor_managed_office_web_control_plane/12_WORKER_BOOTSTRAP_RESULT_POINTER.md`
