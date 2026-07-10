# Fable5 Review Brief: Advisor-Managed Existing tmux Transport

Status: `WAIT_FOR_PATCH_COMMIT`

## Reviewer Routing Decision

- Target actor: Fable5 Reviewer
- Selected reviewer: existing Fable5 Reviewer session
- Target session: `dev`
- Required skill: `/fable-sentinel`
- Review level: Level 3
- Return result to: Advisor
- Status: `WAIT_FOR_PATCH_COMMIT`

Reason: the patch changes cross-role transport authority and introduces automation
around session targeting, prompt delivery, concurrency, interaction handling, and
result collection. Independent adversarial review is mandatory.

Not selected:

- Control: author/coordination role, not independent reviewer for this protocol.
- Worker sessions: actor-role conflict.
- Advisor-SOL: self-review is forbidden.

## Pass 1: DESIGN_REVIEW

Verify:

1. transport authority is narrower than Worker/Control/Reviewer authority;
2. activation is fail-closed and manual routing remains active now;
3. exact target and launcher evidence prevents misdelivery;
4. serial and parallel rules prevent dependency, branch, and blindness hazards;
5. unexpected interactions cannot be auto-approved;
6. timeout/stall behavior cannot silently interrupt or broaden work;
7. kill switch and fallback are immediate and unambiguous;
8. result collection distrusts pane summaries and requires durable evidence;
9. final approval and escalation boundaries remain Leo/GPT-owned;
10. no hidden runtime or product authorization exists.

## Pass 2: IMPLEMENTATION_OR_CONFIG_REVIEW

Verify actual files, diffs, commits, hashes, and live read-only metadata:

1. every required control is represented in canonical/config files;
2. `MODE_STATUS` is `NOT_ACTIVE` and `KILL_SWITCH` is `ENGAGED`;
3. registry observations match current tmux metadata and include live revalidation;
4. generic `dev` Reviewer session cannot be trusted without role evidence;
5. tmux buffer transport shape uses exact file loading and exact pane targeting;
6. no shell interpolation, broadcast, synchronize, wildcard, or multi-pane path;
7. ledger templates contain required dispatch, observation, timeout, stall, result,
   commit, push, and upstream fields;
8. local Advisor instruction hashes and text align with canonical V2;
9. all other workspaces already reference canonical V2;
10. unrelated dirty files and all runtime repo files are excluded;
11. no tmux input, session creation, DB, secret, production, or live action occurred;
12. activation record template cannot activate by itself.

## Required Separate Artifacts

- `FABLE5_DESIGN_REVIEW_RESULT.md`
- `FABLE5_IMPLEMENTATION_CONFIG_REVIEW_RESULT.md`

Each pass has an independent verdict:

- `PASS`
- `PASS_WITH_RISK`
- `NEEDS_PATCH`
- `FAIL`

The Reviewer may read tmux metadata and capture pane output for identity evidence,
but may not send input, patch files, create sessions/agents, or activate transport.
