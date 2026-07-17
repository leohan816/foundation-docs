# AS1 F02 Launcher Compatibility Design Patch Handoff

MISSION_ID: `AGENT_OFFICE_AS1_MULTI_TEAM_SLACK_PILOT_001`

WORK_UNIT: `PHASE_B_R2_RECOVERY_F02_FIXED_LAUNCHER_COMPATIBILITY_PATCH`

TARGET_ACTOR: `agent-office-designer`

## Exact coordinates

- product worktree:
  `/home/leo/Project/.worktrees/agent-office/AGENT_OFFICE_AS1_PHASE_B_LIVE_PILOT_001`
- branch: `feature/as1-phase-b-live-pilot-001`
- exact patch base: `e8c8f529e08ea547e1504d425c80fc8a2216b51b`
- prior design review: governance commit
  `3df77ffba0d95dac96abfdbabe1b0e897d273313`
- failed Worker preflight: governance record 109

## Profile

- SELECTED_MODEL: `gpt-5.6-sol`
- SELECTED_MODE: bounded security/transport design patch
- SELECTED_EFFORT: max
- REQUIRED_SKILL: active Designer role protocol
- WHY_NOT_LOWER: the change affects bytes executed around setuid sudo and the
  pre-execution trust/manifest boundary
- WHY_NOT_HIGHER: the host mismatch and preferred fixed-path resolution are
  concrete; no architecture redesign is permitted
- ESCALATION_TRIGGER: inability to close the mismatch without generic path
  resolution, caller input, package/config change, or weakening pre-root trust

## Exact output scope

Edit exactly the same three product design evidence paths:

1. `docs/integration/AGENT_OFFICE_AS1_PHASE_B_R2_RECOVERY_DESIGN_DELTA.md`
2. `artifacts/as1-multi-team-slack-pilot/PHASE_B_R2_RECOVERY_F02_DESIGNER_RESULT.md`
3. `artifacts/as1-multi-team-slack-pilot/PHASE_B_R2_RECOVERY_F02_DESIGNER_RESULT_POINTER.txt`

No implementation, setup source, test source, package, config, host, root,
journal, scratch, secret, Slack, descriptor, or tmux action is authorized.

## Required bounded correction

Patch only the fixed launcher-object contract needed for this host:

1. Replace executable use of symlink aliases with fixed resolved regular-file
   literals:
   - env: `/usr/lib/cargo/bin/coreutils/env`
   - sudo: `/usr/lib/cargo/bin/sudo`
2. Keep `/usr/bin/setsid`, `/usr/bin/python3.14`, `/usr/bin/git`, and the exact
   Node path unchanged where already fixed and regular.
3. Do not add runtime symlink discovery, `realpath`, PATH search, alternatives
   lookup, caller path, environment selector, fallback, or generic launcher
   abstraction.
4. Define the launcher trust requirement as: exact fixed path; no-follow-opened
   final regular inode; root owner/group; no group/other write; exact executable
   and setuid mode by role; fixed device/inode/mode/link-count/size/content hash
   in M; retained descriptor and drift reproof before root access.
5. Permit the fixed env multicall inode's manifest-pinned link count greater
   than one only because inode ownership/mode are shared across every hard link,
   no non-root writer exists, and exact nlink/inode/content are authenticated.
   Any drift is HOLD. Do not relax the one-link rule for original-root evidence
   files or arbitrary objects.
6. Update the exact manifest schema/grammar, bootstrap command, generator,
   reproducer, synthetic vectors, command-construction tests, and S/M/J/E text
   only as required by these literals and the role-specific nlink rule.
7. Require tests that reject the original symlink aliases, a changed resolved
   path, writable/non-root target, wrong mode, unexpected link-count drift,
   target replacement, and content/hash drift before helper/root access.
8. Preserve D1-D6, the exact four-path future implementation allowlist, the
   single preservation invocation, disabled descriptor, no-root execution,
   private single-user scope, and all later separate gates.

Explicitly judge whether fixed resolved-path invocation still provides a
non-circular pre-execution trust boundary. If not, return `HOLD` rather than
inventing another wrapper or host installation.

## Completion

Run only docs/scope/hash checks. Commit and non-force push exactly the three
paths. Return the candidate commit, hashes, and launcher compatibility
disposition to `agent-office-advisor`, then STOP. Same-Reviewer delta PASS is
required before reissuing Worker handoff 108.
