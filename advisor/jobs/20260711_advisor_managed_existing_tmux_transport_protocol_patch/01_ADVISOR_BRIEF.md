# Advisor Brief: Existing tmux Transport Protocol Patch

Status: `PROCEED_WITH_LIMITS`

## Instruction Validation

Verdict: `PROCEED_WITH_LIMITS`

The Leo/GPT decision is internally consistent with canonical V2. It treats tmux as
a transport/evidence mechanism, preserves actor and approval boundaries, requires
independent review, and keeps manual routing active until a separate final
activation decision.

## Exact Scope

Advisor is temporarily acting as protocol/config migration operator for:

- canonical V2 activation-gated transport rules;
- persistent existing-session registry;
- exact-paste, checksum, dispatch, observation, result, timeout, stall, kill-switch,
  and fallback controls;
- local Advisor active-instruction alignment;
- review and reload artifacts.

Advisor is not authorized to send a role prompt through tmux in this mission.

## Design Decisions Implemented

- existing named sessions only;
- live preflight overrides stale registry observations;
- pane IDs are never trusted after a mismatch;
- exact committed launcher path, commit, blob, and SHA-256 are recorded;
- file-based tmux buffer delivery, no shell interpolation;
- no broadcast, synchronized panes, wildcard targets, or multi-pane send;
- serial execution by default;
- dependent and same-repo/same-branch write tasks always serialized;
- parallel execution only with explicit isolation and separate result/pointer paths;
- unexpected sensitive or privileged interaction is never auto-approved;
- pane output is progress evidence only; durable artifacts and Git are authoritative;
- kill switch stops transport, not the role process;
- manual routing is always available;
- final activation remains Leo/GPT-only.

## Current Registry Evidence

Read-only tmux metadata and pane context identified:

- Advisor: `foundation-advisor:0.0`, observed pane `%9`;
- Control: `foundation-control:0.0`, observed pane `%4`;
- Foundation Worker: `foundation:0.0`, observed pane `%3`;
- Cosmile Worker: `cosmile:0.0`, observed pane `%1`;
- Shashu Worker: `siasiu:0.0`, observed pane `%0`;
- Fable5 Reviewer: `reviewer-fable5:0.0`, observed pane `%5`.

These are registry observations, not permanent identities. Every future dispatch
must revalidate live state. The Fable5 session was renamed from `dev` to
`reviewer-fable5` by Leo for clearer actor targeting; its session ID `$5`, pane
`%5`, workspace, and process remained unchanged.

## Active Instruction Strategy

All role workspaces already read canonical V2. Therefore no runtime-repository
instruction patch is needed. The canonical V2 patch propagates the transport
boundary to Control, Workers, and Reviewer on reload.

The local Advisor `AGENTS.md` and `CLAUDE.md` are patched in place and will be
reviewed by content hash. Existing unrelated dirty files under
`foundation-docs/advisor/_system/` are not staged or rewritten. Canonical V2 states
that any older manual-paste wording is superseded only after final activation and
only for transport satisfying the new protocol.

## Review Route

Selected reviewer: Fable5 Reviewer, same existing independent session
`reviewer-fable5`.

Required skill: `/fable-sentinel`.

Review level: Level 3 because this is cross-role authority and automation safety.

Two separate passes, artifacts, and verdicts are required:

1. `DESIGN_REVIEW`
2. `IMPLEMENTATION_OR_CONFIG_REVIEW`

`PASS_WITH_RISK` returns to Leo/GPT. `NEEDS_PATCH` returns to Advisor for patch and
same-session re-review. `FAIL` stops.
