# Existing tmux Role Session Registry

Registry status: `ACTIVE_LOCATOR__REVALIDATE_BEFORE_EVERY_DISPATCH`

Observed: 2026-07-14 UTC

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
| Foundation Fable5-lineage Reviewer | `foundation-reviewer-fable5` | `$5` | 0 | `@5` | 0 | `%5` | `/home/leo/Project/foundation-control` | `claude` | same existing independent Reviewer session formerly named `reviewer-fable5`, then `foundation-reviewer`; current model/effort must be verified before every dispatch; `/fable-sentinel` remains required when available | eligible only after live model, effort, role, skill, and readiness verification; result provenance must identify the actual model rather than infer it from the session name |
| Foundation SOL Reviewer | `foundation-reviewer-sol` | `$20` | 0 | `@20` | 0 | `%20` | `/home/leo/Project/foundation-reviewer` | `codex` (v0.144.1 at onboarding) | user-authorized independent SOL Reviewer session; current resource-conscious baseline is `GPT-5.6 SOL` with `xhigh` effort in the dedicated neutral reviewer workspace; Advisor may require `max` for a specific Level 3 review after live verification | primary cross-repo SOL Sentinel candidate; idle until an exact committed launcher instructs it to read the applicable Sentinel contract; must not implement, patch, or grant final approval |
| Agent Office SOL Reviewer (legacy project-specific locator) | `agent-office-sol` | `$13` | 0 | `@13` | 0 | `%13` | `/home/leo/Project/agent-office` | `codex` (live PID and version revalidated before each dispatch) | same existing Agent Office Codex session formerly named `agent-office`; previously assigned as an independent SOL Sentinel | do not auto-select while `foundation-reviewer-sol` is available; any reuse requires explicit routing, live model/effort verification, and conflict check |
| Agent Office Opus Worker | `agent-office-opus` | `$16` | 0 | `@16` | 0 | `%16` | `/home/leo/Project/agent-office` | `claude` | same existing user-created tmux session formerly named `agent-office-grok`; Grok exited; live Claude Code shows `Opus 4.8 (1M context)` and `ultracode`; `/fable-builder` and Agent Office Worker role must be loaded from the exact mission worktree before dispatch | primary Agent Office implementation Worker for future exact committed missions after live model, effort, role, workspace, branch, and readiness verification; no review or final approval authority |
| Agent Office Product Designer (deferred) | `agent-office-designer` (retired locator) | `NONE` | - | `NONE` | - | `NONE` | `/home/leo/Project/.worktrees/agent-office/designer` (future authorized recreation only) | `NONE` | A-1R visual track is `COMPLETE_AND_DEFERRED`; prior role instructions are archived under the cleanup job and accepted Designer records remain in Git | `INACTIVE`; no dispatch target exists; a future mission must explicitly authorize recreation and perform full live onboarding under the hidden worktree root |

Agent Office routing decision effective 2026-07-14:
the prior `agent-office-designer` locator is retired after A-1R visual-track
closure. A future authorized Agent Office Designer may own product-experience
and visual design only after recreation and onboarding under
`/home/leo/Project/.worktrees/agent-office/designer`.
`foundation-control` is excluded from all further Agent Office work. Control is
reserved for Foundation, SIASIU, Cosmile, and their authorized cross-project
architecture, contract, boundary, coding-design, and release-design work.

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
