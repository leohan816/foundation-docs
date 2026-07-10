# Patch Scope and Commit Register

Status: `PATCH_PUBLISHED__REVIEW_ROUTING_PENDING`

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

PATCH_COMMIT: `2f5f99da35e4509ff535fc2818d4665245a59ade`

PATCH_PUSH_STATUS: `PUSHED__LOCAL_EQUALS_ORIGIN_MAIN`

LOCAL_ADVISOR_AGENTS_SHA256:
`c6a3d58c23f9e7a5772ae573b3b78433ac7f9a9d516b6a9acf8a5804dfeb5846`

LOCAL_ADVISOR_CLAUDE_SHA256:
`446dcd191d14b98a454c9e54d0a8f73b036f968d45cf5e89d6c309cfd163b36f`

CANONICAL_V2_SHA256:
`54df4cbed78aba282b4ee1d6f6abe66868bc0b562520ab724758076a85220b05`

TRANSPORT_PROTOCOL_SHA256:
`6c4fa59c74fe40a712027d5e8ee99bdf55649ed5c7d144aab83b1cac5a6fa35f`

SESSION_REGISTRY_SHA256:
`f31564bf5eeacbe8317812b1430b62bc265754aac7756d150db2df2757542bd0`

## Read-Only tmux Inventory Evidence

- registered sessions exist with the recorded session IDs and pane IDs;
- current workspaces and processes match the registry;
- effective window option is `synchronize-panes off`;
- no tmux input was sent;
- no session, window, pane, agent, or sub-agent was created.

## Patch Commit Scope

- 19 files;
- 975 insertions, 3 deletions;
- canonical/config/Advisor artifacts only;
- no runtime, schema, migration, API, test, package, flag, or secret file;
- staged set empty after push;
- unrelated dirty files preserved unstaged/untracked.

## Follow-Up Routing Commit

The Fable5 handoff, local-instruction evidence record, and this commit metadata are
published in a follow-up routing commit. Fable5 must review the full diff from
parent of `2f5f99d` through the routing commit.

ROUTING_AND_REFINEMENT_COMMIT:
`0c22c713d1fe173f1e6f0b4349af855f45956b77`
