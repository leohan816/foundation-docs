# AS1 F02 Launcher Compatibility Independent Delta Review Handoff

MISSION_ID: `AGENT_OFFICE_AS1_MULTI_TEAM_SLACK_PILOT_001`

REVIEW_PASS: `F02_FIXED_LAUNCHER_COMPATIBILITY_DELTA_REVIEW`

TARGET_REVIEWER: same independent `agent-office-reviewer`

## Profile and coordinates

- model: GPT-5.6 SOL
- effort: max
- required skill: `/home/leo/Project/skill/fable-sentinel/SKILL.md`
- product worktree:
  `/home/leo/Project/.worktrees/agent-office/AGENT_OFFICE_AS1_PHASE_B_LIVE_PILOT_001`
- branch: `feature/as1-phase-b-live-pilot-001`
- exact base: `e8c8f529e08ea547e1504d425c80fc8a2216b51b`
- exact candidate: `453d697905592ea0b6a4580be289957f05f0f283`
- candidate parent: `e8c8f529e08ea547e1504d425c80fc8a2216b51b`
- design SHA-256:
  `70d711e724169f10a6b5c62a3e56dd17726ed3630844d2b55d69f6cc83678a0f`
- Designer result SHA-256:
  `e3db31af5920b1a8128551b6a7e54b8fc2920e8b21644974a81987a3f7f014bb`
- Designer pointer SHA-256:
  `9ac4f24bf0fce6077ea8de4be9dd09cba55408e438247a4fe6621c7bbe87b7ec`
- patch authority: governance commit
  `9ed0d1d256dd8ea62949a0509cd5e25acd66df13`

SELECTED_MODEL: `gpt-5.6-sol`

SELECTED_MODE: independent Sentinel design delta review

SELECTED_EFFORT: max

REQUIRED_SKILL: `/fable-sentinel`

WHY_NOT_LOWER: the patch changes the fixed objects executed around setuid sudo
and the pre-execution manifest trust boundary.

WHY_NOT_HIGHER: the same Reviewer already passed D1-D6; this is one concrete
three-path host-compatibility delta.

ESCALATION_TRIGGER: any remaining pre-execution trust gap, generic path
resolution, caller input, or weakening of original-root invariants.

## Exact review scope

Review only `e8c8f52..453d697`, host-preflight record 109, and load-bearing
launcher sections. Do not repeat the prior D1-D6, F01, Slack, product, or broad
security review.

Return one verdict: `PASS | PASS_WITH_RISK | NEEDS_PATCH | FAIL`.

Directly determine whether:

1. every executable command now uses only fixed final regular-file literals
   `/usr/lib/cargo/bin/coreutils/env` and `/usr/lib/cargo/bin/sudo`, with no
   `/usr/bin` alias execution;
2. no runtime symlink discovery, `realpath`, PATH search, alternatives lookup,
   caller path, environment selector, fallback, wrapper, or generic resolver is
   introduced;
3. M authenticates exact device/inode/uid/gid/mode/nlink/size/content for every
   final launcher and retained descriptors are reproved before helper/root
   access;
4. the env multicall inode's greater-than-one link count is allowed only for
   that exact root-owned non-writable mode-0755 fixed object, is manifest-pinned,
   and any nlink/inode/mode/content drift is HOLD;
5. sudo remains exact root-owned, non-writable, one-link mode 4755 and every
   other launcher remains role-correct;
6. fixed resolved-path invocation preserves the non-circular trust boundary
   and does not merely verify already-untrusted caller-selected bytes;
7. tests are required to reject original aliases, changed target, writable or
   non-root object, wrong mode, link-count drift, replacement, and hash drift
   before helper/root access;
8. original-root no-follow/one-link traversal, D1-D6, four-path implementation
   scope, disabled descriptor, no-root/no-live boundary, and later gate order
   remain unchanged;
9. the candidate changes exactly the same three design-evidence paths and no
   implementation or host action occurred.

If a defect exists, return the smallest exact same-Designer patch. Do not
invent a host installation or weaken the trust invariant.

## Prohibitions and output

Read-only review. Do not patch/stage/commit/push product, access either state
root, host journal, scratch or secret, run launcher/helper/privileged/live
commands, connect Slack, inspect/mutate a destination, signal, or send tmux
input.

Write only:

1. `advisor/jobs/20260714_agent_office_as1_multi_team_slack_pilot_001/112_PHASE_B_R2_RECOVERY_F02_LAUNCHER_COMPATIBILITY_INDEPENDENT_DELTA_REVIEW_RESULT.md`
2. `advisor/jobs/20260714_agent_office_as1_multi_team_slack_pilot_001/112_PHASE_B_R2_RECOVERY_F02_LAUNCHER_COMPATIBILITY_INDEPENDENT_DELTA_REVIEW_RESULT_POINTER.md`

Return to `agent-office-advisor`, then STOP.
