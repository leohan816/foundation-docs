# Existing tmux Role Session Registry

Registry status: `ACTIVE_LOCATOR__REVALIDATE_BEFORE_EVERY_DISPATCH`

Observed: 2026-07-14 19:03 UTC

Observed effective tmux window option: `synchronize-panes off` for the registered
sessions. This must be checked again before every dispatch.

This registry records current locators. It never replaces live pre-dispatch
verification. Pane IDs and processes can change.

| Actor | Session | Observed session ID | Window index | Observed window ID | Pane index | Observed pane ID | Workspace | Observed process | Role evidence | Dispatch status |
|---|---|---|---:|---|---:|---|---|---|---|---|
| Agent Office Advisor | `agent-office-advisor` | `$26` | 0 | `@26` | 0 | `%26` | `/home/leo/Project/agent-office` | `codex` v0.144.3; live launch record identifies `gpt-5.6-sol` / `max` at this observation | Agent Office Advisor role is stored under `foundation-docs/advisor/_system/roles/agent-office-advisor/`; no role-named project folder | Agent Office field manager; pre-AS1 physical destination migration is independently reviewed `PASS`; any AS1 delivery still requires a fresh one-use authority gate |
| Foundation Advisor | `foundation-advisor` | `$27` | 0 | `@27` | 0 | `%27` | `/home/leo/Project/FOUNDATION` | `codex` v0.144.3; live process identifies `gpt-5.6-sol` / `max` at this observation | Foundation Advisor role is stored under `foundation-docs/advisor/_system/roles/foundation-advisor/`; no role-named project folder; effort remains dynamically selected under canonical policy; no standing Agent Office inbox or exact-delivery authority | responsible Advisor for Foundation Control, Foundation Worker, Cosmile Worker, SIASIU Worker, Foundation Designer, and Foundation Reviewer routing after live verification; AS1 profile remains design-only until reviewed and one-use-authorized |
| Control | `foundation-control` | `$4` | 0 | `@4` | 0 | `%4` | `/home/leo/Project/foundation-control` | `claude` | Control for Foundation, SIASIU, Cosmile, and their cross-project architecture/contracts; reports to `foundation-advisor` | eligible only for exact Foundation Advisor handoffs after live verification; excluded from Agent Office work |
| Foundation Worker | `foundation` | `$3` | 0 | `@3` | 0 | `%3` | `/home/leo/Project/FOUNDATION` | `claude` | latest pane record declares Foundation Worker | eligible only after live verification |
| Cosmile Worker | `cosmile` | `$1` | 0 | `@1` | 0 | `%1` | `/home/leo/Project/Cosmile` | `claude` | latest pane record declares Cosmile Worker | eligible only after live verification |
| SIASIU Worker | `siasiu` | `$0` | 0 | `@0` | 0 | `%0` | `/home/leo/Project/SIASIU` | `claude` | latest pane record declares SIASIU Worker | eligible only after live verification |
| Foundation Fable5-lineage Reviewer | `foundation-reviewer-fable5` | `$5` | 0 | `@5` | 0 | `%5` | `/home/leo/Project/foundation-control` | `claude`; current pane evidence shows Opus 4.8 Max, not Fable5 | preserved Foundation/SIASIU/Cosmile independent Reviewer lineage; current model/effort must be verified before every dispatch; `/fable-sentinel` remains required when available | reports review results to `foundation-advisor`; no Agent Office review routing; result provenance must identify the actual model rather than infer it from the session name |
| Agent Office Reviewer | `agent-office-reviewer` | `$25` | 0 | `@25` | 0 | `%25` | `/home/leo/Project/agent-office` | `codex` v0.144.3; live launch record identifies `gpt-5.6-sol` / `xhigh` at this observation | model-neutral Reviewer session; role stored under `foundation-docs/advisor/_system/roles/agent-office-reviewer/`; read-only by default | reports to `agent-office-advisor`; idle until an exact committed Sentinel launcher; no implementation, patch, or final approval authority; AS1 design/security review may use xhigh or max after live verification |
| Agent Office SOL Reviewer (legacy project-specific locator) | `agent-office-sol` | `$13` | 0 | `@13` | 0 | `%13` | `/home/leo/Project/agent-office` | `codex` (live PID and version revalidated before each dispatch) | same existing Agent Office Codex session formerly named `agent-office`; previously assigned as an independent SOL Sentinel | do not auto-select while `agent-office-reviewer` is available; any reuse requires explicit routing, live model/effort verification, and conflict check |
| Agent Office Opus Worker | `agent-office-opus` | `$16` | 0 | `@16` | 0 | `%16` | `/home/leo/Project/agent-office` | `claude` | same existing user-created tmux session formerly named `agent-office-grok`; Grok exited; live Claude Code shows `Opus 4.8 (1M context)` and `ultracode`; `/fable-builder` and Agent Office Worker role must be loaded from the exact mission worktree before dispatch | primary Agent Office implementation Worker for future exact committed missions after live model, effort, role, workspace, branch, and readiness verification; no review or final approval authority |
| Foundation Designer | `foundation-designer` | `$23` | 0 | `@23` | 0 | `%23` | `/home/leo/Project/FOUNDATION` when idle; exact active `FOUNDATION`, `SIASIU`, or `Cosmile` repository/worktree when dispatched | `codex` v0.144.3; configured `gpt-5.6-sol` / `max` baseline | role stored under `foundation-docs/advisor/_system/roles/foundation-designer/`; reports to `foundation-advisor`; no role-named project folder; `ultra` requires documented high complexity | eligible only after exact project/worktree, Git state, model, effort, and role verification; no implementation or independent review authority |
| Agent Office Product Designer | `agent-office-designer` | `$24` | 0 | `@24` | 0 | `%24` | `/home/leo/Project/agent-office` | `codex` v0.144.3; configured `gpt-5.6-sol` / `max` baseline | role stored under `foundation-docs/advisor/_system/roles/agent-office-designer/`; recreated as tmux context only after Founder workspace correction; A-1R remains complete and deferred | `IDLE_NO_MISSION`; no implementation or design dispatch is authorized by session creation alone |

Agent Office routing correction effective 2026-07-14:
`agent-office-advisor`, `agent-office-reviewer`, and `agent-office-designer`
are tmux role contexts rooted in `/home/leo/Project/agent-office`; they are not
project workspaces. Session creation does not reopen the completed and deferred
A-1R visual track or authorize a mission.
`foundation-control` is excluded from all further Agent Office work. Control is
reserved for Foundation, SIASIU, Cosmile, and their authorized cross-project
architecture, contract, boundary, coding-design, and release-design work.

Foundation Team binding effective 2026-07-14:
`foundation-advisor` is the responsible Advisor. `foundation-control`,
`foundation`, `cosmile`, `siasiu`, `foundation-designer`, and
`foundation-reviewer-fable5` return their authorized results to that Advisor.
The Reviewer remains independent; reporting ownership does not grant Control or
the Advisor power to alter its verdict.

Agent Office exact-delivery safety status effective 2026-07-14:
the pre-AS1 physical destination migration to
`agent-office-advisor/$26/@26/%26` in `/home/leo/Project/agent-office` passed
independent review and Advisor final audit. Historical physical destinations are
non-authoritative. No standing capability exists: every live delivery remains
disabled unless its current mission supplies a fresh, exact, one-use authority
and the live destination is revalidated immediately before use.

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

Configured model and effort values are observed baselines, not permanent role
bindings. Before every dispatch, the responsible Advisor applies
`ADVISOR_ORCHESTRATION_MODEL_EFFORT_SKILL_AND_DELTA_PROTOCOL.md`, selects the
lowest effort that safely covers the proven task complexity and risk, changes
only the exact target pane when needed, and verifies and records the resulting
live model/effort. Difficult or unresolved work is escalated; simple bounded work
may be lowered. Cost or speed alone never justifies reducing required coverage.
