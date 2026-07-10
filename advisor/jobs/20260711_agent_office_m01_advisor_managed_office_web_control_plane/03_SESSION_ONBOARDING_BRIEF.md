# Agent Office Existing-Session Onboarding Brief

Status: `READY_AFTER_REGISTRY_COMMIT`

## Exact Existing Target

- actor: Agent Office Worker
- session: `agent-office`
- session ID: `$13`
- window/pane: `0/0`
- pane ID: `%13`
- workspace: `/home/leo/Project/agent-office`
- current process: `codex` (`v0.144.1`, PID `2754606` at verification)
- process ancestry: child of existing tmux pane shell PID `2703903`
- model: `gpt-5.6-sol`
- effort: `ultra`
- delegation: forbidden by launcher and mission; no agent/sub-agent use permitted

## Bootstrap Scope

The Worker must:

1. verify the empty directory and private empty remote without reading secrets;
2. initialize Git on branch `shadow/agent-office-m01`;
3. configure origin `https://github.com/leohan816/agent-office`;
4. write repo-local `AGENTS.md`, `CLAUDE.md`, README, and active run/result protocol;
5. define Agent Office Worker as repo-local design/implementation actor returning
   all work to Advisor;
6. preserve Fable5 as independent Reviewer and Leo/GPT as final approver;
7. forbid sub-agents, DB/secrets/public exposure, direct browser role dispatch,
   self-review, and automatic next mission;
8. commit and push bootstrap docs/config only;
9. return an evidence-bearing result to foundation-docs.

No product design or implementation is performed in bootstrap.

## Completion Evidence

- exact files and diff;
- branch and origin;
- commit and push ancestry;
- active instruction contents;
- model/effort/delegation status;
- no runtime code;
- no new session or sub-agent.
