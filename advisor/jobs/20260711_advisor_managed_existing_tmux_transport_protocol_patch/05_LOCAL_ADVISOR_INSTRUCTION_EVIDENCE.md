# Local Advisor Active-Instruction Evidence

Status: `PATCHED_LOCALLY__REVIEW_REQUIRED`

`/home/leo/Project/foundation-advisor` is not a Git repository. The active entry
files are therefore verified by direct read, line evidence, and SHA-256 rather than
a repository commit.

## Files and Hashes

- `/home/leo/Project/foundation-advisor/AGENTS.md`
  - SHA-256:
    `c6a3d58c23f9e7a5772ae573b3b78433ac7f9a9d516b6a9acf8a5804dfeb5846`
- `/home/leo/Project/foundation-advisor/CLAUDE.md`
  - SHA-256:
    `446dcd191d14b98a454c9e54d0a8f73b036f968d45cf5e89d6c309cfd163b36f`

## Applied Instruction Changes

`AGENTS.md` now:

- describes Advisor as Hermes-style controller within the active transport state;
- requires direct reads of transport protocol, activation state, and registry;
- forbids tmux transport unless activation state and final record are active;
- preserves manual copy/paste while inactive;
- permits only exact committed launcher transport when active;
- replaces unconditional manual-paste routing steps with activation-gated routing;
- preserves Worker/Reviewer/Control separation and Leo/GPT final approval.

`CLAUDE.md` now:

- preserves manual launcher paste while transport is inactive;
- permits exact committed launcher transport only when reviewed and active;
- requires reading protocol, activation state, and registry;
- requires manual fallback and STOP on failed preflight.

## GitHub-Visible Equivalent

`../foundation-docs/advisor/_system/tmux_transport/ACTIVE_INSTRUCTION_OVERRIDE.md`
records the same narrow override for review and future reload.

## Excluded Published Mirrors

Existing unrelated user changes in:

- `../foundation-docs/advisor/_system/AGENTS.md`
- `../foundation-docs/advisor/_system/README.md`

were not staged, committed, or overwritten. Canonical V2 and the clean
GitHub-visible override define precedence. Manual routing remains active until final
activation.
