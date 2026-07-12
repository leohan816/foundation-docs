# Grok Bounded Implementation Handoff

TARGET_ACTOR: Worker
TARGET_SESSION: same existing qualified `agent-office-grok/$16/%16` session
SOURCE_ADVISOR_JOB: `../foundation-docs/advisor/jobs/20260712_agent_office_grok_worker_pilot_001`
DO_NOT_PASTE_INTO: Advisor, `agent-office`, or Reviewer
RETURN_RESULT_TO: Advisor
GPT_DIRECT_USE: inspect only

Start only after Advisor records the qualification as accepted. Directly read
artifacts `00`, `01`, `02`, the accepted qualification result/pointer, all active
repo instructions, relevant actual source/tests/docs, and current Git state.

Implement exactly `READ_ONLY_TMUX_SESSION_DISCOVERY_AND_RUNTIME_CLASSIFICATION_SLICE`
in the isolated worktree and branch. Follow the exact allowlist, behavior,
fixtures, checks, forbidden scope, evidence requirements, result paths, commit,
push, rollback, and STOP rules in `02_WORKER_BRIEF.md`.

Advisor qualification acceptance is recorded at
`05_ADVISOR_QUALIFICATION_VALIDATION.md`. The isolated worktree has no initial
`node_modules`; use only the bounded `npm ci` allowance in the Worker brief.

Do not use an agent/sub-agent/delegated context. Do not contact or inspect the
excluded `agent-office` session. Do not self-review or invoke Fable5. Return the
durable result/pointer to Advisor and stop.
