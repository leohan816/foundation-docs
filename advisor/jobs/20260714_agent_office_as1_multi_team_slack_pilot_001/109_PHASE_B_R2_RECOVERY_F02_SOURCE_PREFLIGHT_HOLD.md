# AS1 Phase B R2 Recovery F02 Source Preflight HOLD

MISSION_ID: `AGENT_OFFICE_AS1_MULTI_TEAM_SLACK_PILOT_001`

WORK_UNIT: `PHASE_B_R2_RECOVERY_F02_SOURCE_AND_MANIFEST_S_M`

WORKER_HANDOFF: `108`

WORKER_DISPOSITION: `HOLD_BEFORE_EDIT`

## Verified blocker

The Opus Worker correctly stopped before editing because two fixed launcher
aliases in the reviewed design are symlinks on this server while the design
requires every launcher manifest object to be a no-follow-openable regular
file:

| logical path | lstat | resolved target |
| --- | --- | --- |
| `/usr/bin/env` | root-owned symlink, one link | `/usr/lib/cargo/bin/coreutils/env` |
| `/usr/bin/sudo` | root-owned symlink via `/etc/alternatives/sudo` | `/usr/lib/cargo/bin/sudo` |

The resolved `env` target is a root-owned, mode `0755`, regular multicall inode
with link count 115. The resolved `sudo` target is a root-owned, mode `4755`,
regular one-link file. `/usr/bin/setsid`, `/usr/bin/python3.14`, `/usr/bin/git`,
and the pinned Node object are regular files.

The current exact manifest schema and bootstrap cannot faithfully hash or
execute the two symlink aliases under its no-follow regular-file contract.
Following them implicitly or fabricating M would weaken the reviewed trust
boundary. The Worker therefore made no product edit, commit, manifest, helper,
privileged, root, journal, scratch, secret, Slack, descriptor, network, signal,
or tmux action. Product HEAD/upstream remain exact and clean at
`e8c8f529e08ea547e1504d425c80fc8a2216b51b`.

## Advisor routing decision

This is a bounded host-compatibility design defect, not a Founder product or
authority decision. Return only the launcher-object portion to the same
Designer and same independent Reviewer. Prefer fixed resolved regular-file
paths over generic symlink resolution. Preserve every original-root no-follow
rule and every accepted F02-D1 through D6 invariant.

No implementation is authorized until the patch receives the same Reviewer's
PASS.
