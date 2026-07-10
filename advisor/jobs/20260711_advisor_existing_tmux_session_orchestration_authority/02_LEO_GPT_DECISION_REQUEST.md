# Leo/GPT Decision Request: Advisor-Managed Existing tmux Routing

Status: `NEEDS_LEO_GPT_DECISION`

## Decision Requested

Authorize a protocol maintenance mission to allow Advisor to deliver approved
launchers directly to existing tmux role sessions, monitor execution, collect
result artifacts, and verify Git evidence without requiring Leo to copy every
prompt and result manually.

## Recommended Selection

`APPROVE_PROTOCOL_PATCH_FOR_ADVISOR_MANAGED_EXISTING_TMUX_TRANSPORT`

## Proposed Authority

Advisor may:

- use existing tmux sessions only;
- verify the exact actor, workspace, pane, and job before dispatch;
- send the exact committed launcher to the exact target pane;
- execute independent tasks in parallel only under the recorded isolation rules;
- serialize dependent tasks and all tasks writing to the same repo/branch;
- monitor output and interactive STOP conditions;
- read result artifacts and pointers without user relay;
- validate actual files, diffs, tests, commits, pushes, and upstream state;
- route already-authorized rework/re-review/commit/push steps;
- stop and return exceptions or material decisions to Leo/GPT.

Advisor may not:

- create new sessions, agents, sub-agents, or delegated contexts;
- broadcast input or use synchronized panes;
- edit a launcher during transport or execute from memory;
- send work to an unverified or busy pane;
- parallelize tasks that share a write repo/branch;
- auto-approve unexpected tool, privilege, DB, secret, production, or Git prompts;
- act as Worker, Control author, independent Reviewer, risk acceptor, or final
  approver;
- bypass any mission-specific restriction.

## Activation Gate

Approval of this request authorizes documentation/config migration only. Direct
tmux routing becomes active only after:

1. canonical protocol and active Advisor instruction patch;
2. Fable5 independent design and implementation/config review PASS;
3. existing role-session reload confirmations;
4. Advisor final mission audit;
5. Leo/GPT final activation approval.

## Decision Options

### Option A - Approve protocol patch

Approve the recommended maintenance mission and safeguards. Manual copy/paste
continues until final activation.

### Option B - Approve a limited pilot

Allow one read-only, single-session transport pilot after a minimal reviewed patch,
then decide whether to activate full routing.

### Option C - Keep manual routing

Do not change the protocol. Leo continues to copy launchers and results manually.

## Requested Leo/GPT Response

Return one explicit decision:

- `APPROVE_PROTOCOL_PATCH_FOR_ADVISOR_MANAGED_EXISTING_TMUX_TRANSPORT`
- `APPROVE_LIMITED_READONLY_SINGLE_SESSION_PILOT`
- `KEEP_MANUAL_ROUTING`

No role session will be operated from this request alone.
