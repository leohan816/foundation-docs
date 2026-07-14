# Worker Patch Completeness Correction Run Prompt

TARGET_ACTOR: Worker-Rework
TARGET_SESSION: `agent-office-opus`
SOURCE_ADVISOR_JOB: `/home/leo/Project/foundation-docs/advisor/jobs/20260714_agent_office_actor_project_binding_normalization_001`
RETURN_RESULT_TO: `agent-office-advisor`

========
/fable-builder
TARGET_ACTOR: Agent Office Worker-Rework
TARGET_PROJECT: Agent Office actor/project binding normalization
TARGET_SESSION_NAME: agent-office-opus
REQUIRED_SKILL: /fable-builder
TASK: Close one missed active-reference defect from brief 31. In FOUNDATION/CLAUDE.md, SIASIU/CLAUDE.md, and Cosmile/CLAUDE.md, the Agent Run / Result Protocol list still requires reading the superseded foundation-docs V2 file. Remove that V2 item from the mandatory pre-read lists. Preserve each repo-local RUN_PROTOCOL.md and RESULT_REPORTING_PROTOCOL.md read and all product/domain/safety rules. Update WORKER_RESULT.md so its validation claim is accurate and include the three new commits. Do not modify any other file or broaden the patch. Run only targeted diff-check, exact-reference search, status, push, and upstream-equality checks. No product tests, registry, Slack, tmux, VibeNews, Agent Office docs, protected merge, or force push. Return result path and SHA-256 to agent-office-advisor; do not dispatch Reviewer.
SOURCE_BRIEF: /home/leo/Project/foundation-docs/advisor/jobs/20260714_agent_office_actor_project_binding_normalization_001/31_AUTHORITY_CHAIN_PATCH_BRIEF.md
RETURN_RESULT_TO: agent-office-advisor
DO_NOT_EXECUTE_FROM_MEMORY: true
DO_NOT_BROADEN_SCOPE: true
========
