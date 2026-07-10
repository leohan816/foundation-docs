# tmux Dispatch Ledger

Transport state: `ACTIVE`

The first product dispatch under generally active transport is prepared below.
Five earlier read-only reload launchers were dispatched under the one-time Leo
bootstrap delegation recorded later in this file.

## Active-Mode Product Dispatches

### AO-M01-BOOTSTRAP-20260710T192635Z

```text
DISPATCH_ID: AO-M01-BOOTSTRAP-20260710T192635Z
MISSION_ID: AGENT_OFFICE_M01_ADVISOR_MANAGED_OFFICE_WEB_CONTROL_PLANE
AUTHORIZATION: LEO_GPT_APPROVED_AGENT_OFFICE_M01
TARGET_ACTOR: Agent Office Worker
TARGET_SESSION: agent-office
TARGET_WINDOW: 0
TARGET_PANE: 0
OBSERVED_PANE_ID: %13
WORKSPACE: /home/leo/Project/agent-office
PROCESS: codex v0.144.1, gpt-5.6-sol ultra
ROLE_EVIDENCE: Leo/GPT M01 assignment plus exact existing tmux ancestry and pane banner
READINESS_EVIDENCE: empty Codex prompt; no approval or unrelated work
SYNCHRONIZED_PANES_OFF: true
LAUNCHER_ABSOLUTE_PATH: /home/leo/Project/foundation-docs/advisor/jobs/20260711_agent_office_m01_advisor_managed_office_web_control_plane/07_WORKER_BOOTSTRAP_RUN_PROMPT.md
LAUNCHER_REPO_RELATIVE_PATH: advisor/jobs/20260711_agent_office_m01_advisor_managed_office_web_control_plane/07_WORKER_BOOTSTRAP_RUN_PROMPT.md
LAUNCHER_COMMIT_SHA: 38cbffcf3d1c2f91fb1990c999e93124cf493682
LAUNCHER_GIT_BLOB: c89a4d8fcef9e4401da9ff05c3ba8b4042ee1152
LAUNCHER_SHA256_WORKTREE: b1d971920649424be8f78b27c2411175241dc546f0c20264ea1a47d887af4a8c
LAUNCHER_SHA256_COMMITTED: b1d971920649424be8f78b27c2411175241dc546f0c20264ea1a47d887af4a8c
UPSTREAM_EVIDENCE: foundation-docs main equals origin/main at 38cbffcf3d1c2f91fb1990c999e93124cf493682
RESULT_PATH: ../foundation-docs/runs/agent-office/20260711_agent_office_m01_advisor_managed_office_web_control_plane/WORKER_BOOTSTRAP_RESULT.md
POINTER_PATH: ../foundation-docs/advisor/jobs/20260711_agent_office_m01_advisor_managed_office_web_control_plane/12_WORKER_BOOTSTRAP_RESULT_POINTER.md
WRITE_REPO_BRANCHES: agent-office/shadow/agent-office-m01 then foundation-docs/main, serial
DEPENDENCY_LOCKS: clear; no active product dispatch; bootstrap precedes design
BLIND_INDEPENDENCE_RULE: Reviewer receives no dispatch until Worker bootstrap and design are validated
PARALLEL_ISOLATION_EVIDENCE: not applicable; serial dispatch
SOFT_STALL_SECONDS: 900
HARD_TIMEOUT_SECONDS_OR_NONE: 3600
PREFLIGHT_VERDICT: PASS_READY_TO_SEND
SENT_AT: 2026-07-10T19:26:35Z
STATUS: COMPLETED_REPORTED_AND_DURABLE_EVIDENCE_VERIFIED
```

The entries below are a one-time Leo-directed manual bootstrap delegation, not
general transport activation. Global mode remains `NOT_ACTIVE` and the kill switch
remains `ENGAGED`.

## Bootstrap Reload Dispatches

### BOOTSTRAP-RELOAD-CONTROL-20260710T184743Z

```text
DISPATCH_ID: BOOTSTRAP-RELOAD-CONTROL-20260710T184743Z
MISSION_ID: ADVISOR_MANAGED_EXISTING_TMUX_TRANSPORT_PROTOCOL_PATCH
AUTHORIZATION: LEO_ONE_TIME_BOOTSTRAP_RELOAD
TARGET_ACTOR: Control
TARGET_SESSION: foundation-control
TARGET_WINDOW: 0
TARGET_PANE: 0
OBSERVED_PANE_ID: %4
WORKSPACE: /home/leo/Project/foundation-control
PROCESS: claude
ROLE_EVIDENCE: prior Control reload block plus exact session/workspace/process
READINESS_EVIDENCE: empty Claude prompt; no pending input
SYNCHRONIZED_PANES_OFF: effective off
LAUNCHER_REPO_RELATIVE_PATH: advisor/jobs/20260711_advisor_managed_existing_tmux_transport_protocol_patch/08_CONTROL_RELOAD_RUN_PROMPT.md
LAUNCHER_COMMIT_SHA: 8fc4d6df1059a99c2a8645c194af4dfd05f4c671
LAUNCHER_GIT_BLOB: 4b46937877657ab2cd10fb549298cdea588d29d6
LAUNCHER_SHA256_WORKTREE: 848fc2874a95c02fd116230cb70437a2870ef81ce394fdaeef1e646add1846b8
LAUNCHER_SHA256_COMMITTED: 848fc2874a95c02fd116230cb70437a2870ef81ce394fdaeef1e646add1846b8
RESULT_PATH: inline pane response; central 14_ROLE_RELOAD_STATUS.md
POINTER_PATH: none; central reload status
WRITE_REPO_BRANCHES: none
DEPENDENCY_LOCKS: clear; read-only independent reload
PARALLEL_ISOLATION_EVIDENCE: no writes and distinct target pane
SOFT_STALL_SECONDS: 600
HARD_TIMEOUT_SECONDS_OR_NONE: 1800
PREFLIGHT_VERDICT: PASS_READY_TO_SEND
SENT_AT: PENDING_AFTER_COMMITTED_LEDGER
STATUS: READY_TO_SEND
```

### BOOTSTRAP-RELOAD-COSMILE-20260710T184743Z

```text
DISPATCH_ID: BOOTSTRAP-RELOAD-COSMILE-20260710T184743Z
MISSION_ID: ADVISOR_MANAGED_EXISTING_TMUX_TRANSPORT_PROTOCOL_PATCH
AUTHORIZATION: LEO_ONE_TIME_BOOTSTRAP_RELOAD
TARGET_ACTOR: Cosmile Worker
TARGET_SESSION: cosmile
TARGET_WINDOW: 0
TARGET_PANE: 0
OBSERVED_PANE_ID: %1
WORKSPACE: /home/leo/Project/Cosmile
PROCESS: claude
ROLE_EVIDENCE: prior Cosmile Worker result plus exact session/workspace/process
READINESS_EVIDENCE: empty Claude prompt; no pending input
SYNCHRONIZED_PANES_OFF: effective off
LAUNCHER_REPO_RELATIVE_PATH: advisor/jobs/20260711_advisor_managed_existing_tmux_transport_protocol_patch/08_COSMILE_WORKER_RELOAD_RUN_PROMPT.md
LAUNCHER_COMMIT_SHA: 8fc4d6df1059a99c2a8645c194af4dfd05f4c671
LAUNCHER_GIT_BLOB: 1bf59ae6e5235c49b9078d770a6e7eee75cdb3fb
LAUNCHER_SHA256_WORKTREE: 5c30cb4682e04578aa3a6849457e24b978669ed6ad362deb2e2cbb008b376cc9
LAUNCHER_SHA256_COMMITTED: 5c30cb4682e04578aa3a6849457e24b978669ed6ad362deb2e2cbb008b376cc9
RESULT_PATH: inline pane response; central 14_ROLE_RELOAD_STATUS.md
POINTER_PATH: none; central reload status
WRITE_REPO_BRANCHES: none
DEPENDENCY_LOCKS: clear; read-only independent reload
PARALLEL_ISOLATION_EVIDENCE: no writes and distinct target pane
SOFT_STALL_SECONDS: 600
HARD_TIMEOUT_SECONDS_OR_NONE: 1800
PREFLIGHT_VERDICT: PASS_READY_TO_SEND
SENT_AT: PENDING_AFTER_COMMITTED_LEDGER
STATUS: READY_TO_SEND
```

### BOOTSTRAP-RELOAD-FOUNDATION-20260710T184743Z

```text
DISPATCH_ID: BOOTSTRAP-RELOAD-FOUNDATION-20260710T184743Z
TARGET_ACTOR: Foundation Worker
TARGET_SESSION: foundation
OBSERVED_PANE_ID: %3
LAUNCHER_COMMIT_SHA: 8fc4d6df1059a99c2a8645c194af4dfd05f4c671
LAUNCHER_GIT_BLOB: 3caca0625fa63d97aebddd3f2dc12f9f65c184b1
LAUNCHER_SHA256_WORKTREE: 48cdad6bbc3371ad399c1af1064acb373a17c653e77685adea1c5d69d6b7ac85
LAUNCHER_SHA256_COMMITTED: 48cdad6bbc3371ad399c1af1064acb373a17c653e77685adea1c5d69d6b7ac85
PREFLIGHT_VERDICT: HOLD_TARGET_BUSY_OR_AMBIGUOUS
HOLD_REASON: Claude reports one prior shell still running
SENT_AT: NOT_SENT
STATUS: HOLD
```

### BOOTSTRAP-RELOAD-SHASHU-20260710T184743Z

```text
DISPATCH_ID: BOOTSTRAP-RELOAD-SHASHU-20260710T184743Z
TARGET_ACTOR: Shashu Worker
TARGET_SESSION: siasiu
OBSERVED_PANE_ID: %0
LAUNCHER_COMMIT_SHA: 8fc4d6df1059a99c2a8645c194af4dfd05f4c671
LAUNCHER_GIT_BLOB: b43105a07360c20cee5706687fa7f51e308ed89c
LAUNCHER_SHA256_WORKTREE: 0d26f45996451251d04c545a56eb4537dcc16107f8b16a0db11aa17df3cffd35
LAUNCHER_SHA256_COMMITTED: 0d26f45996451251d04c545a56eb4537dcc16107f8b16a0db11aa17df3cffd35
PREFLIGHT_VERDICT: HOLD_TARGET_BUSY_OR_AMBIGUOUS
HOLD_REASON: pending unsubmitted input is present at the Claude prompt
SENT_AT: NOT_SENT
STATUS: HOLD
```

### BOOTSTRAP-RELOAD-FABLE5-20260710T184743Z

```text
DISPATCH_ID: BOOTSTRAP-RELOAD-FABLE5-20260710T184743Z
TARGET_ACTOR: Fable5 Reviewer
TARGET_SESSION: reviewer-fable5
OBSERVED_PANE_ID: %5
LAUNCHER_COMMIT_SHA: 8fc4d6df1059a99c2a8645c194af4dfd05f4c671
LAUNCHER_GIT_BLOB: 4e59170b77e6affefdef43abaa5bf9b75c101e3e
LAUNCHER_SHA256_WORKTREE: 735a1645bc82fbfad4660e8dcbb2781be617c0a2a7af14eb1d0025d504ce28d2
LAUNCHER_SHA256_COMMITTED: 735a1645bc82fbfad4660e8dcbb2781be617c0a2a7af14eb1d0025d504ce28d2
PREFLIGHT_VERDICT: HOLD_TARGET_BUSY_OR_AMBIGUOUS
HOLD_REASON: pending unsubmitted generic reload input is present at the Claude prompt
SENT_AT: NOT_SENT
STATUS: HOLD
```

## Entry Template

```text
DISPATCH_ID:
MISSION_ID:
TARGET_ACTOR:
TARGET_SESSION:
TARGET_WINDOW:
TARGET_PANE:
OBSERVED_PANE_ID:
WORKSPACE:
PROCESS:
ROLE_EVIDENCE:
READINESS_EVIDENCE:
SYNCHRONIZED_PANES_OFF:
LAUNCHER_ABSOLUTE_PATH:
LAUNCHER_REPO_RELATIVE_PATH:
LAUNCHER_COMMIT_SHA:
LAUNCHER_GIT_BLOB:
LAUNCHER_SHA256_WORKTREE:
LAUNCHER_SHA256_COMMITTED:
UPSTREAM_EVIDENCE:
RESULT_PATH:
POINTER_PATH:
WRITE_REPO_BRANCHES:
DEPENDENCY_LOCKS:
BLIND_INDEPENDENCE_RULE:
PARALLEL_ISOLATION_EVIDENCE:
SOFT_STALL_SECONDS:
HARD_TIMEOUT_SECONDS_OR_NONE:
PREFLIGHT_VERDICT:
SENT_AT:
STATUS:
```

Valid preflight verdicts:

- `PASS_READY_TO_SEND`
- `HOLD_MODE_INACTIVE`
- `HOLD_KILL_SWITCH`
- `HOLD_REGISTRY_MISMATCH`
- `HOLD_TARGET_BUSY_OR_AMBIGUOUS`
- `HOLD_LAUNCHER_EVIDENCE`
- `HOLD_DEPENDENCY_OR_WRITE_CONFLICT`
- `HOLD_INTERACTIVE_OR_AUTH_RISK`

## Bootstrap Completion Reconciliation

Recorded: 2026-07-10T19:01:39Z

| Dispatch | Initial preflight | Resolution before send | Final status |
|---|---|---|---|
| Control | PASS | exact pane and launcher rechecked | `COMPLETED_REPORTED_AND_CAPTURED` |
| Cosmile | PASS | exact pane and launcher rechecked | `COMPLETED_REPORTED_AND_CAPTURED` |
| Foundation | HOLD: stale background shell | Foundation identified and stopped its stale read-only polling loop; process tree then showed no child shell | `COMPLETED_REPORTED_AND_CAPTURED` |
| Shashu | HOLD: visible prior prompt text | Leo confirmed no active work; exact launcher was accepted and produced the required reload block | `COMPLETED_REPORTED_AND_CAPTURED` |
| Fable5 | HOLD: visible prior prompt text | cursor evidence showed an empty editable position with history/ghost text; exact launcher replaced it and produced the required reload block | `COMPLETED_REPORTED_AND_CAPTURED` |

Dispatch order was Control, Cosmile, Shashu, Foundation, Fable5. Exact seconds for
each paste were not captured; all occurred between the committed bootstrap record
and 2026-07-10T19:01:39Z. No dependent or write task ran in parallel.

At the time of these bootstrap reloads, general mode was `NOT_ACTIVE` and the
global kill switch was `ENGAGED`. Final activation occurred later and is recorded
in `FINAL_ACTIVATION_RECORD.md`.
