# Advisor Prerequisite Record - Exact Advisor Delivery

## P-A: refreshed fixed destination registry

On 2026-07-11 UTC, Advisor directly revalidated all active role panes with
structured tmux metadata. The exact delivery destination is:

```text
SESSION_NAME: foundation-advisor
SESSION_ID: $9
WINDOW_INDEX: 0
WINDOW_ID: @9
PANE_INDEX: 0
PANE_ID: %9
WORKSPACE: /home/leo/Project/foundation-advisor
PROCESS: codex
PANE_DEAD: 0
PANE_IN_MODE: 0
SYNCHRONIZED_PANES: 0
```

`advisor/_system/tmux_transport/SESSION_REGISTRY.md` now carries exact window IDs
for every registered role session. This is a locator snapshot only; immediate
structured preflight remains mandatory before any actual send.

## P-B: narrow Advisor inbox-artifact read rule

The existing Advisor instruction files were patched and directly re-read in the
same existing `foundation-advisor/$9/@9/%9` session:

```text
FILE: /home/leo/Project/foundation-advisor/AGENTS.md
SHA256: e4e4f5f676c3455fffd8da3f128fd026d5496d29d7c8cb8e784728cc42da11aa

FILE: /home/leo/Project/foundation-advisor/CLAUDE.md
SHA256: a8dd0ab0ca5ce04bc5e75a7161dc906285f71a4ee71086822d696b86c0ab661f

RELOAD_STATUS: ROLE_SCOPE_RELOADED_IN_EXISTING_ADVISOR_SESSION
```

The exception permits reading exactly one pointer-derived, containment-safe,
owner-regular, size-bounded, hash-matching Agent Office inbox artifact under the
reviewed loopback activation. It does not permit broad Agent Office repository or
state-root reads, execution of message content, browser-to-role dispatch, material
decisions, or final approval. Any mismatch means no ACK and manual fallback.

## Status

These are reviewed-implementation prerequisites, not a capability or activation
grant. No readiness lease, activation descriptor, credential, server, Agent Office
delivery, or tmux input was created by this record.
