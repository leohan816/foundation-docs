# Existing tmux Role Session Registry

Registry status: `ACTIVE_LOCATOR__REVALIDATE_BEFORE_EVERY_DISPATCH`

Observed: 2026-07-11 UTC

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
| Fable5 Reviewer | `reviewer-fable5` | `$5` | 0 | `@5` | 0 | `%5` | `/home/leo/Project/foundation-control` | `claude` | latest pane record declares Fable5 Reviewer and `/fable-sentinel` review | eligible only after live role-evidence verification |
| Agent Office Worker | `agent-office` | `$13` | 0 | `@13` | 0 | `%13` | `/home/leo/Project/agent-office` | `codex` (live PID and version revalidated before each dispatch) | Leo/GPT Agent Office assignment; exact tmux ancestry; pane history confirms `gpt-5.6-sol ultra`; active repo-local role instructions | eligible for exact committed Agent Office mission dispatch after live verification; mission branch is specified by each handoff |

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
