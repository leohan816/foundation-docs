# Patch Scope and Commit Register

Status: `PATCH_CONTENT_PREPARED__COMMIT_PENDING`

## Foundation-Docs Patch Scope

- canonical V2 protocol;
- `advisor/_system/tmux_transport/**`;
- this Advisor maintenance job;
- prior decision-request status pointer only.

## Local Advisor Active Instruction Scope

- `/home/leo/Project/foundation-advisor/AGENTS.md`
- `/home/leo/Project/foundation-advisor/CLAUDE.md`

These local files are not in a Git repository. Their exact post-patch SHA-256 and
diff evidence will be recorded before review.

## Explicit Exclusions

- existing unrelated dirty `foundation-docs/advisor/_system/AGENTS.md`;
- existing unrelated dirty `foundation-docs/advisor/_system/README.md`;
- existing unrelated V3 run-prompt modification;
- existing untracked protocol job directories not created by this mission;
- all runtime repo tracked and untracked files;
- tmux input delivery;
- session creation or rename.

## Commit Evidence

PATCH_COMMIT: `PENDING`

PATCH_PUSH_STATUS: `PENDING`

LOCAL_ADVISOR_AGENTS_SHA256:
`c6a3d58c23f9e7a5772ae573b3b78433ac7f9a9d516b6a9acf8a5804dfeb5846`

LOCAL_ADVISOR_CLAUDE_SHA256:
`446dcd191d14b98a454c9e54d0a8f73b036f968d45cf5e89d6c309cfd163b36f`

CANONICAL_V2_SHA256:
`54df4cbed78aba282b4ee1d6f6abe66868bc0b562520ab724758076a85220b05`

TRANSPORT_PROTOCOL_SHA256:
`5cc14ac0d2ec84a3502c41024a41b453360120e8de841fc0f28cdb5d1f820846`

SESSION_REGISTRY_SHA256:
`f31564bf5eeacbe8317812b1430b62bc265754aac7756d150db2df2757542bd0`

## Read-Only tmux Inventory Evidence

- registered sessions exist with the recorded session IDs and pane IDs;
- current workspaces and processes match the registry;
- effective window option is `synchronize-panes off`;
- no tmux input was sent;
- no session, window, pane, agent, or sub-agent was created.
