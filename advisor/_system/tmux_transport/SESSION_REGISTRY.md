# Existing tmux Role Session Registry

Registry status: `ACTIVE_LOCATOR__REVALIDATE_BEFORE_EVERY_DISPATCH`

Observed: 2026-07-12 UTC

Observed effective tmux window option: `synchronize-panes off` for the registered
sessions. This must be checked again before every dispatch.

This registry records current locators. It never replaces live pre-dispatch
verification. Pane IDs and processes can change.

| Actor | Session | Observed session ID | Window index | Observed window ID | Pane index | Observed pane ID | Workspace | Observed process | Role evidence | Dispatch status |
|---|---|---|---:|---|---:|---|---|---|---|---|
| Advisor | `foundation-advisor` | `$9` | 0 | `@9` | 0 | `%9` | `/home/leo/Project/foundation-advisor` | `codex` | active Advisor conversation and local `AGENTS.md` | fixed Agent Office pointer destination only under the separately reviewed exact-delivery activation; otherwise never a target for its own routed work |
| Control | `foundation-control` | `$4` | 0 | `@4` | 0 | `%4` | `/home/leo/Project/foundation-control` | `claude` | latest pane record declares `ACTOR: Control` and Control mode separation | eligible only after live verification |
| Foundation Worker | `foundation` | `$3` | 0 | `@3` | 0 | `%3` | `/home/leo/Project/FOUNDATION` | `claude` | latest pane record declares Foundation Worker | eligible only after live verification |
| Cosmile Worker | `cosmile` | `$1` | 0 | `@1` | 0 | `%1` | `/home/leo/Project/Cosmile` | `claude` | latest pane record declares Cosmile Worker | eligible only after live verification |
| SIASIU Worker | `siasiu` | `$0` | 0 | `@0` | 0 | `%0` | `/home/leo/Project/SIASIU` | `claude` | latest pane record declares SIASIU Worker | eligible only after live verification |
| Foundation Independent Reviewer | `foundation-reviewer` | `$5` | 0 | `@5` | 0 | `%5` | `/home/leo/Project/foundation-control` | `claude` | same existing independent Reviewer session formerly named `reviewer-fable5`; live model changed by Leo to `Opus 4.8 (1M context)` with `max` effort; `/fable-sentinel` remains required when available | eligible only after live model, effort, role, skill, and readiness verification; session name is model-neutral and result provenance must identify the actual model |
| Agent Office SOL Reviewer | `agent-office-sol` | `$13` | 0 | `@13` | 0 | `%13` | `/home/leo/Project/agent-office` | `codex` (live PID and version revalidated before each dispatch) | same existing Agent Office Codex session formerly named `agent-office`; assigned by Leo as an independent SOL Sentinel for future Opus-authored changes; required target is `GPT-5.6 SOL` with `max` effort | reviewer-only for a future exact committed Sentinel launcher after live model, max effort, role, workspace, target commit, and readiness verification; must not implement or patch the reviewed candidate |
| Agent Office Opus Worker | `agent-office-opus` | `$16` | 0 | `@16` | 0 | `%16` | `/home/leo/Project/agent-office` | `claude` | same existing user-created tmux session formerly named `agent-office-grok`; Grok exited; live Claude Code shows `Opus 4.8 (1M context)` and `ultracode`; `/fable-builder` and Agent Office Worker role must be loaded from the exact mission worktree before dispatch | primary Agent Office implementation Worker for future exact committed missions after live model, effort, role, workspace, branch, and readiness verification; no review or final approval authority |

## Required Live Checks

Before dispatch, record all of the following:

- current session name and tmux session ID;
- current window and pane indexes;
- current pane ID;
- current working directory;
- current process;
- synchronized-panes state;
- recent captured role marker and current prompt/readiness;
- absence of unrelated pending input or approval;
- launcher target actor and job ID match.

Any mismatch sets dispatch status to `HOLD_REGISTRY_MISMATCH`. Do not guess, rename,
clear, interrupt, or retarget automatically.
