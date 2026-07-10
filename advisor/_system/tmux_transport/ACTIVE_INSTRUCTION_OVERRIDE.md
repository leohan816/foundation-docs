# Advisor tmux Transport Active-Instruction Override

Status: `ACTIVE_AFTER_LEO_GPT_FINAL_APPROVAL`

This file provides the GitHub-visible transport-specific instruction that is
mirrored in the local Advisor `AGENTS.md` and `CLAUDE.md`.

## Pre-Activation Rule

Leo/GPT manually transports launchers. Advisor may prepare launchers and inspect
read-only tmux metadata but may not send tmux input under this mode.

## Post-Activation Rule

Only after the exact activation gates in canonical V2 Section 20 and
`ACTIVATION_STATE.md` pass, Advisor may:

- transport the exact committed launcher to the exact verified existing role pane;
- observe progress and STOP conditions;
- collect result artifacts and pointers;
- validate files, diffs, tests, commits, pushes, and upstream state;
- route already-authorized steps inside the active mission.

This post-activation rule supersedes only older Advisor wording that requires
Leo/GPT to paste every launcher manually. It does not supersede actor separation,
mission scope, independent review, risk acceptance, final approval, DB, secret,
protected-branch, production, live, or other safety restrictions.

If activation, registry, readiness, isolation, launcher evidence, observation, or
result evidence is missing or ambiguous, manual routing is mandatory.
