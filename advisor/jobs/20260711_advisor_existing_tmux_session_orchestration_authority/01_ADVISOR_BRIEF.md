# Advisor Brief: Existing tmux Session Orchestration Authority

Status: `NEEDS_LEO_GPT_DECISION`

## Instruction Validation

Verdict: `NEEDS_LEO_DECISION`

The requested behavior is technically feasible and operationally useful, but it
conflicts with the active manual-paste rule in
`../foundation-docs/advisor/_system/AGENTS.md`. Because this changes cross-role
routing authority, Advisor must not activate it unilaterally.

## Sources Read

- `../foundation-docs/설계문서/shared/AGENT_ROLE_BOUNDARY_AND_RELEASE_TRAIN_PROTOCOL_V2.md`
- `../foundation-docs/advisor/_system/AGENTS.md`
- current user request in the existing Advisor session

## Current Rule

- Advisor writes briefs, launchers, loop state, and routing decisions.
- Leo/GPT manually pastes the selected short launcher into the target role session.
- Hermes may transport exact prompts and pointers but may not exercise judgment.

## Requested Rule

After Leo/GPT approves a mission and Advisor publishes an exact launcher, Advisor
may use existing tmux sessions to perform the transport and observation functions
currently assigned to manual copy/paste or future Hermes:

1. verify the exact target session and pane;
2. deliver the exact published launcher without editing it in transit;
3. start the role task;
4. monitor output and STOP conditions;
5. read the result artifact and pointer directly;
6. validate files, diffs, tests, commits, pushes, and branch state;
7. route the next already-authorized step or escalate an exception.

This authority does not make Advisor the Worker, Reviewer, Control author, risk
acceptor, or final approver.

## Safety Controls

### Existing sessions only

- No new tmux session, temporary session, agent, or sub-agent.
- The target must be an existing role session named by an Advisor launcher.
- If the expected role identity cannot be verified from the session and its active
  instructions, STOP.

### Exact prompt transport

- The launcher must already be committed and pushed unless the mission explicitly
  authorizes a local-only prompt.
- Advisor sends one exact `READ_AND_EXECUTE` launcher to one exact pane.
- No prompt rewriting, truncation, inference, or memory-based substitution.
- Multiline input uses a tmux buffer or equivalent exact-paste mechanism; shell
  interpolation is forbidden.

### No broadcast

- Never use synchronized panes, wildcard targets, or broadcast input.
- Record the tmux session, window, and pane target before sending.
- Include a unique mission/job ID in every dispatch.

### Concurrency policy

- Serial execution is the default.
- Tasks with dependencies are always serialized.
- Sessions that write to the same repository or branch are always serialized
  unless isolated worktrees/branches and a merge protocol are separately approved.
- Parallel dispatch is allowed only for independent, read-only tasks or explicitly
  isolated write targets, and only when each session has a separate prompt, result
  path, pointer path, and completion condition.
- Before parallel dispatch, Advisor records a dispatch matrix and verifies that no
  actor reads another actor's result when blind independence is required.

### Session-state preflight

Before each send, Advisor verifies:

- exact session/window/pane identity;
- expected actor and workspace;
- pane is not processing an unrelated task;
- no pending approval prompt or partial command;
- active role protocol has been loaded when required;
- target job ID and return path match the launcher.

If any check fails, Advisor does not clear, interrupt, or overwrite the session;
Advisor stops and reports the mismatch.

### Execution observation

- Advisor captures pane output at intervals and watches for STOP, approval, scope,
  conflict, encoding, authentication, and Git errors.
- Advisor never auto-confirms an unexpected interactive approval.
- Advisor may send a follow-up only when it is already authorized by the mission
  and does not require new judgment.
- Any high-risk or ambiguous prompt returns to Leo/GPT.

### Result collection

Chat output is not treated as sufficient evidence. Advisor must read:

- the role result artifact;
- the Advisor pointer;
- the actual changed-file list and diff where applicable;
- test evidence;
- commit, branch, upstream, and push state.

If tmux scrollback is unavailable, file and Git evidence remains authoritative.

### Separation and approval

- Author and independent Reviewer remain separate existing sessions.
- Advisor cannot review its own authored work as the independent Reviewer.
- `PASS_WITH_RISK`, material decisions, final approval, and next-mission selection
  still return to Leo/GPT.
- Existing DB, secret, protected-branch, production/live, and runtime restrictions
  remain unchanged.

## Recommended Decision

Approve a canonical V2.x protocol maintenance mission that:

1. adds `ADVISOR_MANAGED_EXISTING_TMUX_TRANSPORT` as an approved routing mode;
2. replaces the mandatory manual-paste wording in active Advisor instructions;
3. adds the safety controls above;
4. receives independent Fable5 DESIGN_REVIEW and IMPLEMENTATION/CONFIG_REVIEW;
5. reloads existing Advisor, Control, Worker, and Reviewer sessions only after
   review PASS;
6. does not activate direct tmux routing until the patch, review, and reload are
   complete.

## Current Safe Default

Until Leo/GPT approves and the protocol patch passes independent review, manual
copy/paste remains active.
